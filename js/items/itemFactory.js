/* ============================================================
   ITEM FACTORY
   ------------------------------------------------------------
   Creates new items (images, text, widgets) in a clean,
   modular way. Each item returned will work automatically with
   the drag & resize engines.
   ============================================================ */

import { renderItem } from "./itemRenderer.js";

export const ItemFactory = (() => {

    let idCounter = 0;

    function createItem(type, options = {}) {
        const item = document.createElement("div");
        item.classList.add("stage-item", "draggable-item", "resizable-item");

        // Unique ID
        idCounter++;
        item.dataset.id = "item-" + idCounter;
        item.dataset.type = type;

        // Apply default position
        item.style.left = (options.left || 200) + "px";
        item.style.top = (options.top || 200) + "px";
        item.style.position = "absolute";

        // Render the inside layout
        renderItem(item, type, options);

        // Add to stage
        const stage = document.getElementById("stage");
        stage.appendChild(item);

        return item;
    }

    return { createItem };
})();