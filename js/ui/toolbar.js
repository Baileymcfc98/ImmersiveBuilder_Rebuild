/* ============================================================
   TOOLBAR CONTROLLER
   ------------------------------------------------------------
   Controls the top bar:
   - Build mode
   - Live mode
   - Annotate mode
   ============================================================ */

export const Toolbar = (() => {

    let topControls = null;

    function init() {
        topControls = document.getElementById("top-controls");

        renderButtons();
    }

    function renderButtons() {
        topControls.innerHTML = `
            <button class="top-btn" data-mode="build">🛠 Build</button>
            <button class="top-btn" data-mode="live">🎬 Live</button>
            <button class="top-btn" data-mode="annotate">✏️ Annotate</button>

            background🖼 Background</button>
            scenes🎞 Scenes</button>
        `;

        topControls.querySelectorAll(".top-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const mode = btn.dataset.mode;
                const action = btn.dataset.action;

                if (mode) {
                    console.log("Switch to mode:", mode);
                    // Later: integrate CanvasEngine + Build/Live logic
                }

                if (action) {
                    console.log("Action triggered:", action);
                    // Later: open background/scenes panels
                }
            });
        });
    }

    return { init };

})();