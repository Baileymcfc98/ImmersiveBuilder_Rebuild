/* ============================================================
   POINTER ENGINE (Single‑Touch Version)
   ============================================================ */

export const PointerEngine = (() => {

    let activePointerId = null;
    let isPointerActive = false;

    const subscribers = {
        down: [],
        move: [],
        up: []
    };

    const frameQueue = {
        move: null
    };

    function onPointer(type, callback) {
        if (subscribers[type]) {
            subscribers[type].push(callback);
        }
    }

    function emit(type, eventData) {
        if (!subscribers[type]) return;
        subscribers[type].forEach(cb => cb(eventData));
    }

    function handlePointerDown(e) {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;

        activePointerId = e.pointerId;
        isPointerActive = true;

        const data = normaliseEvent(e);
        emit("down", data);
    }

    function handlePointerMove(e) {
        if (!isPointerActive || e.pointerId !== activePointerId) return;

        frameQueue.move = e;

        requestAnimationFrame(() => {
            if (!frameQueue.move) return;

            const data = normaliseEvent(frameQueue.move);
            emit("move", data);
            frameQueue.move = null;
        });
    }

    function handlePointerUp(e) {
        if (e.pointerId !== activePointerId) return;

        const data = normaliseEvent(e);
        emit("up", data);

        activePointerId = null;
        isPointerActive = false;
    }

    function normaliseEvent(e) {
        return {
            x: e.clientX,
            y: e.clientY,
            target: e.target,
            original: e
        };
    }

    function initPointerEngine(rootElement = document.body) {
        rootElement.style.touchAction = "none";

        rootElement.addEventListener("pointerdown", handlePointerDown, { passive: true });
        rootElement.addEventListener("pointermove", handlePointerMove, { passive: true });
        rootElement.addEventListener("pointerup", handlePointerUp, { passive: true });
        rootElement.addEventListener("pointercancel", handlePointerUp, { passive: true });
    }

    return {
        init: initPointerEngine,
        onDown: cb => onPointer("down", cb),
        onMove: cb => onPointer("move", cb),
        onUp: cb => onPointer("up", cb)
    };

})();
``
