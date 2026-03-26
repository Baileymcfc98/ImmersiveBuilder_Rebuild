/* ============================================================
   APP ENTRY POINT – MODULAR REBUILD
   ============================================================ */

import { PointerEngine } from "./pointer/pointerEngine.js";
import { DragEngine } from "./pointer/dragEngine.js";
import { ResizeEngine } from "./pointer/resizeEngine.js";
import { CanvasEngine } from "./drawing/canvasEngine.js";

import { PanelManager } from "./ui/panelManager.js";
import { Toolbar } from "./ui/toolbar.js";

import { ItemFactory } from "./items/itemFactory.js";

window.addEventListener("DOMContentLoaded", () => {
    console.log("App starting…");

    PointerEngine.init(document.body);
    DragEngine.init();
    ResizeEngine.init();
    CanvasEngine.init();

    PanelManager.init();
    Toolbar.init();

    // Test item (optional)
    // ItemFactory.createItem("text", { text: "Hello" });
});