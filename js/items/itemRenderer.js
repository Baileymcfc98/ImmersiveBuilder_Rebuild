/* ============================================================
   ITEM RENDERER
   ------------------------------------------------------------
   Defines how items look inside. The factory creates the outer
   shell; this creates the inner HTML & resize handles.
   ============================================================ */

export function renderItem(item, type, options) {

    // --- BASE WRAPPER ---
    const content = document.createElement("div");
    content.classList.add("item-content");

    // --- TYPE HANDLING ---
    if (type === "image") {
        const img = document.createElement("img");
        img.src = options.src || "";
        img.alt = options.alt || "image";
        img.classList.add("item-image");
        content.appendChild(img);
    }

    if (type === "text") {
        const box = document.createElement("div");
        box.classList.add("item-text");
        box.textContent = options.text || "Text";
        content.appendChild(box);
    }

    if (type === "widget") {
        const w = document.createElement("div");
        w.classList.add("item-widget");
        w.textContent = options.label || "Widget";
        content.appendChild(w);
    }

    // --- RESIZE HANDLES ---
    const nw = document.createElement("div");
    nw.classList.add("resize-handle", "resize-nw");

    const ne = document.createElement("div");
    ne.classList.add("resize-handle", "resize-ne");

    const sw = document.createElement("div");
    sw.classList.add("resize-handle", "resize-sw");

    const se = document.createElement("div");
    se.classList.add("resize-handle", "resize-se");

    // --- BUILD STRUCTURE ---
    item.appendChild(content);
   item.style.border = "2px solid red";
item.style.background = "rgba(255,0,0,0.2)";
item.style.width = "200px";
item.style.height = "100px";
    item.appendChild(nw);
    item.appendChild(ne);
    item.appendChild(sw);
    item.appendChild(se);
}
