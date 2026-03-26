/* ============================================================
   PROPERTIES PANEL
   ------------------------------------------------------------
   Displays editable properties for selected items.
   This version is lightweight and will be expanded later.
   ============================================================ */

import { PanelManager } from "./panelManager.js";

export const PropertiesPanel = (() => {

    function openForItem(item) {
        const type = item.dataset.type;

        let html = `
            <h3>Item Properties</h3>
            <p>ID: ${item.dataset.id}</p>
            <p>Type: ${type}</p>
        `;

        // Future: add editable fields based on type

        PanelManager.setPropertiesContent(html);
        PanelManager.showPropertiesPanel();
    }

    function close() {
        PanelManager.hidePropertiesPanel();
    }

    return {
        openForItem,
        close
    };

})();
``