/* ============================================================
   TOOLBAR ASSET ENHANCER
   Injects a Drag Items dropdown into the existing #topControls bar
   and places image items onto the existing stage.
   ============================================================ */

const DRAGGABLE_ASSET_GROUPS = [
  {
    id: "planets",
    label: "🪐 Planets",
    items: [
      { name: "Jupiter", src: "./assets/images/draggables/planets/jupiter.png", alt: "Jupiter planet" },
      { name: "Uranus", src: "./assets/images/draggables/planets/uranus.png", alt: "Uranus planet" },
      { name: "Mercury", src: "./assets/images/draggables/planets/mercury.png", alt: "Mercury planet" },
      { name: "Venus", src: "./assets/images/draggables/planets/venus.png", alt: "Venus planet" },
      { name: "Earth", src: "./assets/images/draggables/planets/earth.png", alt: "Earth planet" },
      { name: "Mars", src: "./assets/images/draggables/planets/mars.png", alt: "Mars planet" },
      { name: "Saturn", src: "./assets/images/draggables/planets/saturn.png", alt: "Saturn planet" },
      { name: "Neptune", src: "./assets/images/draggables/planets/neptune.png", alt: "Neptune planet" }
    ]
  },
  {
    id: "info-cards",
    label: "🗂 Info Cards",
    items: [
      { name: "Mercury Facts", src: "./assets/images/draggables/info-cards/mercury-facts-card.png", alt: "Mercury facts card" },
      { name: "Neptune Facts", src: "./assets/images/draggables/info-cards/neptune-facts-card.png", alt: "Neptune facts card" },
      { name: "Earth Facts", src: "./assets/images/draggables/info-cards/earth-facts-card.png", alt: "Earth facts card" },
      { name: "Mars Facts", src: "./assets/images/draggables/info-cards/mars-facts-card.png", alt: "Mars facts card" },
      { name: "Jupiter Facts", src: "./assets/images/draggables/info-cards/jupiter-facts-card.png", alt: "Jupiter facts card" },
      { name: "Saturn Facts", src: "./assets/images/draggables/info-cards/saturn-facts-card.png", alt: "Saturn facts card" },
      { name: "Uranus Facts", src: "./assets/images/draggables/info-cards/uranus-facts-card.png", alt: "Uranus facts card" },
      { name: "Venus Facts", src: "./assets/images/draggables/info-cards/venus-facts-card.png", alt: "Venus facts card" }
    ]
  },
  {
    id: "nametags",
    label: "🏷 Nametags",
    items: [
      { name: "Neptune Nametag", src: "./assets/images/draggables/nametags/neptune-nametag.png", alt: "Neptune nametag" },
      { name: "Uranus Nametag", src: "./assets/images/draggables/nametags/uranus-nametag.png", alt: "Uranus nametag" },
      { name: "Saturn Nametag", src: "./assets/images/draggables/nametags/saturn-nametag.png", alt: "Saturn nametag" },
      { name: "Jupiter Nametag", src: "./assets/images/draggables/nametags/jupiter-nametag.png", alt: "Jupiter nametag" },
      { name: "Mars Nametag", src: "./assets/images/draggables/nametags/mars-nametag.png", alt: "Mars nametag" },
      { name: "Earth Nametag", src: "./assets/images/draggables/nametags/earth-nametag.png", alt: "Earth nametag" },
      { name: "Venus Nametag", src: "./assets/images/draggables/nametags/venus-nametag.png", alt: "Venus nametag" },
      { name: "Mercury Nametag", src: "./assets/images/draggables/nametags/mercury-nametag.png", alt: "Mercury nametag" }
    ]
  }
];

export const Toolbar = (() => {
  let topControls = null;

  function init() {
    topControls = document.getElementById("topControls");
    if (!topControls) {
      console.warn("Toolbar asset enhancer skipped: #topControls not found.");
      return;
    }

    injectToolbarStyles();
    renderAssetsDropdown();
    bindEvents();
  }

  function renderAssetsDropdown() {
    let wrap = document.getElementById("assetLibraryWrap");
    if (wrap) return;

    const groupedAssets = DRAGGABLE_ASSET_GROUPS.map((group) => {
      const itemButtons = group.items.map((asset) => `
        <button
          class="dropdownItem asset-add-btn"
          type="button"
          data-src="${asset.src}"
          data-alt="${asset.alt}"
          data-name="${asset.name}"
          data-group="${group.id}"
        >${asset.name}</button>
      `).join("");

      return `
        <section class="assetsGroup" data-group-section="${group.id}">
          <div class="assetsGroupTitle">${group.label}</div>
          <div class="assetsGroupItems">${itemButtons}</div>
        </section>
      `;
    }).join("");

    wrap = document.createElement("div");
    wrap.className = "dropdownWrap assetsDropdownWrap";
    wrap.id = "assetLibraryWrap";
    wrap.innerHTML = `
      <button class="dropdownBtn" type="button" data-toggle="assetsMenu" aria-expanded="false">
        <span>🖼 Drag items</span>
        <span>▾</span>
      </button>
      <div class="dropdownMenu assetsMenu" id="assetsMenu">
        <div class="assetsMenuHeader">Drag Items Library</div>
        <div class="assetsMenuHint">Choose an item to place it on the stage.</div>
        ${groupedAssets}
      </div>
    `;

    topControls.appendChild(wrap);
  }

  function bindEvents() {
    const toggleBtn = topControls.querySelector('[data-toggle="assetsMenu"]');
    const menu = document.getElementById("assetsMenu");
    if (!toggleBtn || !menu) return;

    if (!toggleBtn.dataset.bound) {
      toggleBtn.dataset.bound = "true";
      toggleBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !menu.classList.contains("open");
        closeMenu();
        if (willOpen) {
          menu.classList.add("open");
          toggleBtn.setAttribute("aria-expanded", "true");
        }
      });
    }

    menu.querySelectorAll(".asset-add-btn").forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";
      btn.addEventListener("click", () => {
        addImageToStage({
          src: btn.dataset.src,
          alt: btn.dataset.alt || btn.dataset.name || "draggable image"
        });
        closeMenu();
      });
    });

    if (!document.body.dataset.assetMenuBound) {
      document.body.dataset.assetMenuBound = "true";
      document.addEventListener("click", closeMenu);
    }
  }

  function closeMenu() {
    const menu = document.getElementById("assetsMenu");
    const toggleBtn = topControls?.querySelector('[data-toggle="assetsMenu"]');
    menu?.classList.remove("open");
    toggleBtn?.setAttribute("aria-expanded", "false");
  }

  function addImageToStage({ src, alt }) {
    const stage = document.getElementById("stage");
    if (!stage) {
      console.warn("Cannot add image: #stage not found.");
      return;
    }

    const item = document.createElement("div");
    item.className = "item draggable-item";
    item.dataset.type = "image";
    item.style.position = "absolute";
    item.style.left = "260px";
    item.style.top = "140px";
    item.style.width = "160px";
    item.style.minWidth = "80px";
    item.style.cursor = "move";
    item.style.zIndex = "30";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.draggable = false;
    img.style.display = "block";
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.pointerEvents = "none";
    img.style.userSelect = "none";
    img.style.touchAction = "none";

    item.appendChild(img);
    stage.appendChild(item);
  }

  function injectToolbarStyles() {
    if (document.getElementById("toolbarAssetMenuStyles")) return;
    const style = document.createElement("style");
    style.id = "toolbarAssetMenuStyles";
    style.textContent = `
      .assetsDropdownWrap .assetsMenu {
        min-width: 360px;
        max-width: 420px;
        max-height: min(70vh, 620px);
        overflow: auto;
        gap: 10px;
      }
      .assetsMenuHeader {
        font-size: 15px;
        font-weight: 800;
        color: rgba(255,255,255,.96);
        padding: 4px 2px 0;
      }
      .assetsMenuHint {
        font-size: 12px;
        color: rgba(255,255,255,.72);
        padding: 0 2px 2px;
      }
      .assetsGroup {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 4px;
        border-top: 1px solid rgba(255,255,255,.08);
      }
      .assetsGroup:first-of-type {
        border-top: none;
        padding-top: 0;
      }
      .assetsGroupTitle {
        font-size: 13px;
        font-weight: 800;
        color: rgba(255,255,255,.88);
        padding: 0 2px;
      }
      .assetsGroupItems {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      }
      .asset-add-btn {
        min-height: 44px;
        font-size: 13px;
        line-height: 1.2;
      }
    `;
    document.head.appendChild(style);
  }

  return { init };
})();
