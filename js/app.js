/* ============================================================.js";

import { ItemFactory } from "./items/itemFactory.js";

window.addEventListener("DOMContentLoaded", () => {
    console.log("App starting…");

    // Core engines
    PointerEngine.init(document.body);
    DragEngine.init();
    ResizeEngine.init();
    CanvasEngine.init();

    // UI
    PanelManager.init();
    Toolbar.init();

    // Visual on‑screen proof that JS executed:
    const badge = document.createElement("div");
    badge.textContent = "JS running ✅";
    badge.style.cssText =
      "position:fixed;right:10px;top:10px;background:#22aa22;color:#fff;padding:6px 10px;border-radius:4px;font:12px/1.2 system-ui;z-index:99999";
    document.body.appendChild(badge);

    // Test item (make it visible immediately)
    ItemFactory.createItem("text", { text: "Hello world", left: 260, top: 120 });
});
   APP ENTRY POINT – MODULAR REBUILD
   ============================================================ */

import { PointerEngine } from "./pointer/pointerEngine.js";
import { DragEngine } from "./pointer/dragEngine.js";
import { ResizeEngine } from "./pointer/resizeEngine.js";
import { CanvasEngine } from "./drawing/canvasEngine.js";

import { PanelManager } from "./ui/panelManager.js";
