/* ============================================================
   CANVAS ENGINE (Single‑Touch Drawing)
   ------------------------------------------------------------
   Handles pen drawing + erasing with excellent performance on
   older WebViews (Immersive Studio).
   ============================================================ */

import { PointerEngine } from "../pointer/pointerEngine.js";

export const CanvasEngine = (() => {

    let canvas, ctx;
    let drawing = false;
    let mode = "draw"; // "draw" or "erase"
    let lastX = 0, lastY = 0;

    function init() {
        canvas = document.getElementById("draw-layer");
        ctx = canvas.getContext("2d");

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        // Attach pointer events
        PointerEngine.onDown(handleDown);
        PointerEngine.onMove(handleMove);
        PointerEngine.onUp(handleUp);
    }


    /* -----------------------------
       Canvas sizing
    ------------------------------ */
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#1e5eff"; // default blue pen
    }


    /* -----------------------------
       Pointer Handlers
    ------------------------------ */
    function handleDown(e) {
        drawing = true;
        lastX = e.x - canvas.getBoundingClientRect().left;
        lastY = e.y - canvas.getBoundingClientRect().top;
    }

    function handleMove(e) {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.x - rect.left;
        const y = e.y - rect.top;

        requestAnimationFrame(() => {
            if (mode === "erase") {
                ctx.save();
                ctx.globalCompositeOperation = "destination-out";
                ctx.beginPath();
                ctx.arc(x, y, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else {
                ctx.globalCompositeOperation = "source-over";
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            lastX = x;
            lastY = y;
        });
    }

    function handleUp() {
        drawing = false;
    }


    /* -----------------------------
       Public Controls
    ------------------------------ */
    function setPenColor(color) {
        ctx.strokeStyle = color;
    }

    function setMode(newMode) {
        mode = newMode;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return {
        init,
        setPenColor,
        setMode,
        clearCanvas
    };

})();
