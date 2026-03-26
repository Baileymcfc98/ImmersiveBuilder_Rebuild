/* ============================================================
   DRAG ENGINE (Single‑Touch Version)
   ------------------------------------------------------------
   Handles dragging items on the stage.
   Uses the PointerEngine for stable single‑touch movement.
   Keeps DOM writes to a minimum to avoid choking older WebViews.
   ============================================================ */

import { PointerEngine } from "./pointerEngine.js";

export const DragEngine = (() => {

    let activeItem = null;
    let offsetX = 0;
    let offsetY = 0;

    function init() {
        // When pointer goes down, check if it hit an item
        PointerEngine.onDown(e => {
            const item = e.target.closest?.(".draggable-item");
            if (!item) return;

            activeItem = item;

            // Compute movement offset
            const rect = item.getBoundingClientRect();
            offsetX = e.x - rect.left;
            offsetY = e.y - rect.top;
        });

        // Movement handler
        PointerEngine.onMove(e => {
            if (!activeItem) return;

            const stageRect = document
                .getElementById("stage")
                .getBoundingClientRect();

            // New coordinates relative to stage
            const newLeft = e.x - stageRect.left - offsetX;
            const newTop = e.y - stageRect.top - offsetY;

            // Apply transform (fastest for old Chromium)
            activeItem.style.transform = `translate(${newLeft}px, ${newTop}px)`;
        });

        // Release handler
        PointerEngine.onUp(() => {
            if (activeItem) {
                // Convert transform back to left/top to store position
                const transform = activeItem.style.transform;
                const match = /translate\\((.+?)px, (.+?)px\\)/.exec(transform);

                if (match) {
                    activeItem.style.left = match[1] + "px";
                    activeItem.style.top = match[2] + "px";
                }

                activeItem.style.transform = "";

                activeItem = null;
            }
        });
    }

    return { init };
})();
