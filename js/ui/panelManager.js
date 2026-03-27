/* ============================================================/* ================================================= panels including:
   - Left dock (resource folders)
   - Properties panel (right side)
   - Showing/hiding panels cleanly
   ============================================================ */

export const PanelManager = (() => {

    let leftDock = null;
    let propertiesPanel = null;

    function init() {
        leftDock = document.getElementById("left-dock");
        propertiesPanel = document.getElementById("properties-panel");
/* ============================================================
   PANELS: Left dock + Properties panel
   ============================================================ */

export const PanelManager = (() => {

    let leftDock = null;
    let propertiesPanel = null;

    function init() {
        leftDock = document.getElementById("left-dock");
        propertiesPanel = document.getElementById("properties-panel");

        renderLeftDock();
    }

    /* -----------------------------
       LEFT DOCK (RESOURCE FOLDERS)
    ------------------------------ */
    function renderLeftDock() {

        leftDock.innerHTML = `
            <div class="dock-section">
                <div class="dock-title">Resources</div>
                <button class="dock-btn" data-folder="planets">📁 Planets</button>
                <button class="dock-btn" data-folder="infocards">📁 InfoCards</button>
                <button class="dock-btn" data-folder="nametags">📁 NameTags</button>
            </div>

            <div class="dock-section">
                <div class="dock-title">Widgets</div>
                <button class="dock-btn" data-folder="widgets">📁 Widget Library</button>
            </div>
        `;

        leftDock.querySelectorAll(".dock-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.folder;
                console.log("Open folder:", target);
            });
        });
    }

    /* -----------------------------
       PROPERTIES PANEL
    ------------------------------ */
    function showPropertiesPanel() {
        propertiesPanel.classList.remove("hidden");
    }

    function hidePropertiesPanel() {
        propertiesPanel.classList.add("hidden");
    }

    function setPropertiesContent(html) {
        propertiesPanel.innerHTML = html;
    }

    return {
        init,
        showPropertiesPanel,
        hidePropertiesPanel,
        setPropertiesContent
    };

})();
        renderLeftDock();
    }

    /* -----------------------------
       LEFT DOCK (RESOURCE FOLDERS)
    ------------------------------ */
    function renderLeftDock() {

        leftDock.innerHTML = `
            <div class="dock-section">
                <div class="dock-title">Resources</div>
                <button class="dock-btn" data-folder="planets">📁 Planets</button>
                <button class="dock-btn" data-folder="infocards">📁 InfoCards</button>
                <button class="dock-btn" data-folder="nametags">📁 NameTags</button>
            </div>

            <div class="dock-section">
                <div class="dock-title">Widgets</div>
                <button class="dock-btn" data-folder="widgets">📁 Widget Library</button>
            </div>
        `;

        leftDock.querySelectorAll(".dock-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.folder;
                console.log("Open folder:", target);
                // Later: load preview items dynamically
            });
        });
    }

    /* -----------------------------
       PROPERTIES PANEL
    ------------------------------ */
    function showPropertiesPanel() {
        propertiesPanel.classList.remove("hidden");
    }

    function hidePropertiesPanel() {
        propertiesPanel.classList.add("hidden");
    }

    function setPropertiesContent(html) {
        propertiesPanel.innerHTML = html;
    }

    return {
        init,
        showPropertiesPanel,
        hidePropertiesPanel,
        setPropertiesContent
    };

})();
   PANEL MANAGER
   ------------------------------------------------------------
