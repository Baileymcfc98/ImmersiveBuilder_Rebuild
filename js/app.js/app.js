/* ============================================================
   APP ENTRY POINT – MODULAR REBUILD
   ============================================================ */

import { PointerEngine } from "./js/pointer/pointerEngine.js";
import { DragEngine } from "./js/pointer/dragEngine.js";
import { ResizeEngine } from "./js/pointer/resizeEngine.js";
import { CanvasEngine } from "./js/drawing/canvasEngine.js";

import { PanelManager } from "./js/ui/panelManager.js";
import { Toolbar } from "./js/ui/toolbar.js";

import { ItemFactory } from "./js/items/itemFactory.js";
``
window.addEventListener("DOMContentLoaded", () => {
    console.log("App starting…");

    PointerEngine.init(document.body);
    DragEngine.init();
    ResizeEngine.init();
    CanvasEngine.init();

    PanelManager.init();
    Toolbar.init();

    // Test item (optional)
    ItemFactory.createItem("text", { text: "Hello world" });
});
