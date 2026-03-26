/* ============================================================
   RESIZE ENGINE (Single‑Touch Version)
   ------------------------------------------------------------
   Handles resizing items using resize handles.
   Uses CSS transform during resizing for immersive-suite speed.
   ============================================================ */

import { PointerEngine } from "./pointerEngine.js";

export const ResizeEngine = (() => {

    let activeItem = null;
    let activeHandle = null;
    let startWidth = 0;
    let startHeight = 0;
    let startX = 0;
    let startY = 0;

    function init() {

        // Pointer down — check for resize handle
        PointerEngine.onDown(e => {
            const handle = e.target.closest?.(".resize-handle");
            if (!handle) return;

            activeHandle = handle;
            activeItem = handle.closest(".resizable-item");
            if (!activeItem) return;

            const rect = activeItem.getBoundingClientRect();

            startWidth = rect.width;
            startHeight = rect.height;
            startX = e.x;
            startY = e.y;
        });

        // Movement
        PointerEngine.onMove(e => {
            if (!activeItem || !activeHandle) return;

            const dx = e.x - startX;
            const dy = e.y - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            // Determine which handle is being dragged
            if (activeHandle.classList.contains("resize-se")) {
                newWidth += dx;
                newHeight += dy;
            }
            if (activeHandle.classList.contains("resize-ne")) {
                newWidth += dx;
                newHeight -= dy;
            }
            if (activeHandle.classList.contains("resize-sw")) {
                newWidth -= dx;
                newHeight += dy;
            }
            if (activeHandle.classList.contains("resize-nw")) {
                newWidth -= dx;
                newHeight -= dy;
            }

            // Minimum size check
            newWidth = Math.max(40, newWidth);
            newHeight = Math.max(40, newHeight);

            // Apply transform
            activeItem.style.transform = `scale(${newWidth / startWidth}, ${newHeight / startHeight})`;
        });

        // Pointer up — convert transform to real width/height
        PointerEngine.onUp(() => {
            if (!activeItem) return;

            const transform = activeItem.style.transform;
            const match = /scale\\((.+?), (.+?)\\)/.exec(transform);

            if (match) {
                const scaleX = parseFloat(match[1]);
                const scaleY = parseFloat(match[2]);

                // Apply final size
                activeItem.style.width = (startWidth * scaleX) + "px";
                activeItem.style.height = (startHeight * scaleY) + "px";
            }

            activeItem.style.transform = "";

            activeItem = null;
            activeHandle = null;
        });
    }

    return { init };
})();