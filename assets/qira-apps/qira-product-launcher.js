/*! Qira Product Launcher v1.0.0 — generated from canonical registry 1a4cc4e6f2335060e2253c0bdc027c77d974dae8
 * Do not edit by hand. Run: node packages/qira-navigation/scripts/generate.mjs
 */
(function () {
  "use strict";
  if (customElements.get("qira-product-launcher")) return;

  var LAUNCHER_VERSION = "1.0.0";
  var ALLOWED = ["flows","oort","qev","lolm","aex","ledger"];
  var BUNDLED = {"products":[{"id":"flows","name":"Flows","shortDescription":"Build · verify · recover","tooltip":"Builds software through controlled steps and tracks the evidence supporting the result.","url":"https://flows.oortstack.com","icon":"flows","status":"live","order":1,"visibleInLauncher":true},{"id":"oort","name":"Oort","shortDescription":"Account · models · usage","tooltip":"Manages your Qira account, AI providers, models, access, and usage.","url":"https://oortstack.com","icon":"oort","status":"live","order":2,"visibleInLauncher":true},{"id":"qev","name":"QEV","shortDescription":"Protect · prove · verify","tooltip":"Protects digital files and provides evidence that they remain unchanged.","url":"https://secure.imagineqira.com","icon":"qev","status":"live","order":3,"visibleInLauncher":true},{"id":"lolm","name":"LOLM","shortDescription":"Persistent AI operations","tooltip":"Keeps operational context and failed-attempt memory across long-running AI work.","url":"https://lolm.imagineqira.com","icon":"lolm","status":"research","order":4,"visibleInLauncher":true},{"id":"ledger","name":"Ledger","shortDescription":"AI work · usage · records","tooltip":"Records AI work, usage, and operational history across Qira products.","url":"https://ledger.imagineqira.com","icon":"ledger","status":"live","order":5,"visibleInLauncher":true},{"id":"aex","name":"AEX","shortDescription":"AI efficiency infrastructure","tooltip":"A planned system for measuring and verifying AI compute efficiency.","url":null,"icon":"aex","status":"coming_soon","order":6,"visibleInLauncher":true}],"allowlist":["https://flows.oortstack.com","https://oortstack.com","https://secure.imagineqira.com","https://lolm.imagineqira.com","https://ledger.imagineqira.com"]};
  var STYLES = "/* Generated for shadow DOM host isolation — classes use qira-launcher__ prefix */\n/**\n * Qira Apps launcher — self-contained styles for light (Oort) and dark (Flows) hosts.\n * No Tailwind dependency. Hosts may override via CSS variables.\n */\n\n.qira-launcher {\n  --ql-bg: #ffffff;\n  --ql-panel: #ffffff;\n  --ql-border: #dde2e8;\n  --ql-text: #111827;\n  --ql-muted: #536072;\n  --ql-muted2: #7a8696;\n  --ql-hover: #f7f8fa;\n  --ql-scrim: rgba(17, 24, 39, 0.4);\n  --ql-focus: #2563eb;\n  --ql-here-bg: rgba(37, 99, 235, 0.12);\n  --ql-here-fg: #1d4ed8;\n  --ql-soon-bg: rgba(122, 134, 150, 0.16);\n  --ql-soon-fg: #536072;\n  --ql-tile-border: #dde2e8;\n  --ql-icon-bg: #f2f4f7;\n  --ql-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);\n  --ql-radius: 16px;\n  --ql-trigger-border: #dde2e8;\n  --ql-trigger-fg: #536072;\n  --ql-trigger-hover-bg: #f7f8fa;\n  --ql-trigger-hover-fg: #111827;\n  position: relative;\n  flex-shrink: 0;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", sans-serif;\n}\n\n.qira-launcher[data-theme=\"dark\"] {\n  --ql-bg: #0f1419;\n  --ql-panel: #151b22;\n  --ql-border: #2a3441;\n  --ql-text: #f3f4f6;\n  --ql-muted: #9aa3af;\n  --ql-muted2: #6b7280;\n  --ql-hover: #1c2430;\n  --ql-scrim: rgba(0, 0, 0, 0.55);\n  --ql-focus: #60a5fa;\n  --ql-here-bg: rgba(37, 99, 235, 0.22);\n  --ql-here-fg: #93c5fd;\n  --ql-soon-bg: rgba(156, 163, 175, 0.18);\n  --ql-soon-fg: #9ca3af;\n  --ql-tile-border: #2a3441;\n  --ql-icon-bg: #1c2430;\n  --ql-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);\n  --ql-trigger-border: #2a3441;\n  --ql-trigger-fg: #9aa3af;\n  --ql-trigger-hover-bg: #1c2430;\n  --ql-trigger-hover-fg: #f3f4f6;\n}\n\n/* Trigger */\n.qira-launcher__trigger {\n  display: inline-flex;\n  height: 2.25rem;\n  width: 2.25rem;\n  min-height: 2.25rem;\n  min-width: 2.25rem;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.5rem;\n  border: 1px solid var(--ql-trigger-border);\n  background: transparent;\n  color: var(--ql-trigger-fg);\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  touch-action: manipulation;\n  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;\n}\n\n.qira-launcher__trigger:hover {\n  background: var(--ql-trigger-hover-bg);\n  color: var(--ql-trigger-hover-fg);\n}\n\n.qira-launcher__trigger:focus-visible {\n  outline: 2px solid var(--ql-focus);\n  outline-offset: 2px;\n}\n\n/* Desktop panel */\n.qira-launcher__panel {\n  position: absolute;\n  right: 0;\n  top: calc(100% + 0.5rem);\n  z-index: 50;\n  width: min(100vw - 1.5rem, 22rem);\n  max-width: calc(100vw - 1.5rem);\n  overflow: hidden;\n  border-radius: var(--ql-radius);\n  border: 1px solid var(--ql-border);\n  background: var(--ql-panel);\n  box-shadow: var(--ql-shadow);\n  box-sizing: border-box;\n}\n\n.qira-launcher__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  border-bottom: 1px solid var(--ql-border);\n  padding: 0.75rem 1rem;\n}\n\n.qira-launcher__title {\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  color: var(--ql-muted);\n}\n\n.qira-launcher__close {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  height: 44px;\n  width: 44px;\n  min-height: 44px;\n  min-width: 44px;\n  padding: 0;\n  border: 0;\n  border-radius: 0.5rem;\n  background: transparent;\n  color: var(--ql-muted);\n  cursor: pointer;\n  box-sizing: border-box;\n}\n\n.qira-launcher__close:hover {\n  background: var(--ql-hover);\n  color: var(--ql-text);\n}\n\n.qira-launcher__close:focus-visible {\n  outline: 2px solid var(--ql-focus);\n  outline-offset: 2px;\n}\n\n.qira-launcher__grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.5rem;\n  padding: 0.5rem;\n}\n\n/* Tile */\n.qira-launcher__tile {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.45rem;\n  min-height: 5.5rem;\n  padding: 0.75rem;\n  border-radius: 0.75rem;\n  border: 1px solid var(--ql-tile-border);\n  background: transparent;\n  color: inherit;\n  text-align: left;\n  text-decoration: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease;\n}\n\na.qira-launcher__tile:hover {\n  background: var(--ql-hover);\n  border-color: var(--ql-muted2);\n}\n\n.qira-launcher__tile:focus-visible {\n  outline: 2px solid var(--ql-focus);\n  outline-offset: 2px;\n}\n\n.qira-launcher__tile--current {\n  border-color: color-mix(in srgb, var(--ql-focus) 45%, var(--ql-tile-border));\n  background: color-mix(in srgb, var(--ql-focus) 8%, transparent);\n}\n\n.qira-launcher__tile--disabled {\n  cursor: not-allowed;\n  opacity: 0.72;\n}\n\n.qira-launcher__tile--disabled:hover {\n  background: transparent;\n  border-color: var(--ql-tile-border);\n}\n\n.qira-launcher__tile-top {\n  display: flex;\n  width: 100%;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.35rem;\n}\n\n.qira-launcher__icon {\n  display: inline-flex;\n  height: 2rem;\n  width: 2rem;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.5rem;\n  background: var(--ql-icon-bg);\n  color: var(--ql-text);\n}\n\n.qira-launcher__badge {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: 0.125rem 0.4rem;\n  font-size: 0.625rem;\n  font-weight: 600;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n\n.qira-launcher__badge--here {\n  background: var(--ql-here-bg);\n  color: var(--ql-here-fg);\n}\n\n.qira-launcher__badge--soon {\n  background: var(--ql-soon-bg);\n  color: var(--ql-soon-fg);\n}\n\n.qira-launcher__badge--research {\n  background: color-mix(in srgb, #7c3aed 16%, transparent);\n  color: #7c3aed;\n}\n\n.qira-launcher[data-theme=\"dark\"] .qira-launcher__badge--research {\n  background: color-mix(in srgb, #a78bfa 22%, transparent);\n  color: #c4b5fd;\n}\n\n.qira-launcher__name {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--ql-text);\n  line-height: 1.25;\n}\n\n.qira-launcher__desc {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--ql-muted);\n  line-height: 1.3;\n}\n\n/* Tooltip */\n.qira-launcher__tooltip-wrap {\n  position: relative;\n}\n\n.qira-launcher__tooltip {\n  position: absolute;\n  z-index: 60;\n  left: 50%;\n  bottom: calc(100% + 0.4rem);\n  transform: translateX(-50%);\n  width: max-content;\n  max-width: 14rem;\n  padding: 0.45rem 0.6rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--ql-border);\n  background: var(--ql-panel);\n  color: var(--ql-text);\n  font-size: 0.6875rem;\n  line-height: 1.35;\n  box-shadow: var(--ql-shadow);\n  pointer-events: none;\n}\n\n.qira-launcher__tooltip[hidden] {\n  display: none !important;\n}\n\n/* Mobile sheet\n *\n * Host ancestors often apply transform/filter/backdrop-filter (sticky navs),\n * which turns position:fixed into a trap relative to that ancestor. When open\n * on mobile we promote the launcher root (or :host) to a full-viewport layer\n * so the sheet is always on-screen.\n */\n.qira-launcher__scrim {\n  display: none;\n}\n\n/*\n * Body-portal surface (Web Component mobile open).\n * Escapes sticky/backdrop-filter containing blocks.\n */\n.qira-launcher--portal {\n  position: fixed;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  max-width: none;\n  z-index: 2147483000;\n  pointer-events: none;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", sans-serif;\n}\n\n.qira-launcher--portal .qira-launcher__scrim,\n.qira-launcher--portal .qira-launcher__panel {\n  pointer-events: auto;\n}\n\n/* React root open layer (portal-equivalent when data-open) */\n.qira-launcher[data-open=\"true\"].qira-launcher--portal {\n  position: fixed !important;\n  inset: 0 !important;\n  z-index: 2147483000 !important;\n}\n\n@media (max-width: 640px) {\n  .qira-launcher__trigger {\n    height: 44px;\n    width: 44px;\n    min-height: 44px;\n    min-width: 44px;\n  }\n\n  .qira-launcher__scrim {\n    display: block;\n    position: fixed;\n    inset: 0;\n    z-index: 2147483000;\n    border: 0;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%;\n    background: var(--ql-scrim);\n    cursor: pointer;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .qira-launcher--portal .qira-launcher__scrim {\n    position: absolute;\n    z-index: 1;\n  }\n\n  .qira-launcher__panel {\n    position: fixed;\n    left: 0;\n    right: 0;\n    top: auto;\n    bottom: 0;\n    z-index: 2147483001;\n    width: 100%;\n    max-width: 100%;\n    max-height: min(88dvh, 36rem);\n    border-radius: 1rem 1rem 0 0;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n    overscroll-behavior: contain;\n    padding-bottom: env(safe-area-inset-bottom, 0px);\n    box-sizing: border-box;\n  }\n\n  .qira-launcher--portal .qira-launcher__panel {\n    position: absolute;\n    z-index: 2;\n  }\n\n  .qira-launcher__header {\n    flex-shrink: 0;\n    padding-left: max(1rem, env(safe-area-inset-left, 0px));\n    padding-right: max(0.5rem, env(safe-area-inset-right, 0px));\n  }\n\n  .qira-launcher__close {\n    display: inline-flex;\n  }\n\n  .qira-launcher__grid {\n    flex: 1 1 auto;\n    min-height: 0;\n    overflow-y: auto;\n    overflow-x: hidden;\n    -webkit-overflow-scrolling: touch;\n    overscroll-behavior: contain;\n    grid-template-columns: 1fr 1fr;\n    gap: 0.6rem;\n    padding: 0.75rem;\n    padding-left: max(0.75rem, env(safe-area-inset-left, 0px));\n    padding-right: max(0.75rem, env(safe-area-inset-right, 0px));\n    padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));\n    box-sizing: border-box;\n  }\n\n  .qira-launcher__tile {\n    min-width: 0;\n    /* Comfortable touch target without forcing huge cards */\n    min-height: 72px;\n  }\n\n  .qira-launcher__name,\n  .qira-launcher__desc {\n    overflow-wrap: anywhere;\n    word-break: break-word;\n  }\n\n  .qira-launcher__tooltip {\n    max-width: min(14rem, 70vw);\n  }\n}\n\n/* Very narrow phones: single-column grid so tiles never clip */\n@media (max-width: 360px) {\n  .qira-launcher__grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .qira-launcher__trigger,\n  .qira-launcher__tile,\n  .qira-launcher__close {\n    transition: none;\n  }\n}\n";

  function isAllowed(id) { return ALLOWED.indexOf(id) !== -1; }

  function sanitize(products, allowlist) {
    if (!products || products.length !== 6) throw new Error("need 6 products");
    var seen = {};
    var out = [];
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      if (!isAllowed(p.id)) throw new Error("unknown id");
      if (seen[p.id]) throw new Error("dup");
      seen[p.id] = 1;
      var blob = (p.name + p.shortDescription + p.tooltip + (p.icon||"")).toLowerCase();
      if (blob.indexOf("we" + "search") !== -1) throw new Error("forbidden product name");
      if (p.id === "aex") {
        if (p.url != null) throw new Error("aex url");
        if (p.status !== "coming_soon") throw new Error("aex status");
      }
      if (p.url) {
        var u = new URL(p.url);
        if (u.protocol !== "https:") throw new Error("proto");
        if (u.hostname === "ledger.com" || u.hostname === "www.ledger.com") throw new Error("blocked");
        if (p.id === "ledger" && u.hostname.indexOf("ledger.com") !== -1) throw new Error("ledger.com");
        var ok = false;
        for (var j = 0; j < allowlist.length; j++) {
          if (allowlist[j] === u.origin || allowlist[j] === p.url) ok = true;
        }
        if (!ok) throw new Error("allowlist");
      }
      out.push({
        id: p.id,
        name: String(p.name||"").replace(/<[^>]*>/g,""),
        shortDescription: String(p.shortDescription||"").replace(/<[^>]*>/g,""),
        tooltip: String(p.tooltip||"").replace(/<[^>]*>/g,""),
        url: p.url,
        icon: p.icon,
        status: p.status,
        order: p.order,
        visibleInLauncher: p.visibleInLauncher !== false
      });
    }
    for (var k = 0; k < ALLOWED.length; k++) if (!seen[ALLOWED[k]]) throw new Error("missing");
    out.sort(function(a,b){ return a.order - b.order; });
    return out;
  }

  function clickable(p) {
    if (p.status === "coming_soon" || p.status === "unavailable") return false;
    return typeof p.url === "string" && p.url.indexOf("https://") === 0;
  }

  function deviceClass() {
    try { return window.matchMedia("(max-width:640px)").matches ? "mobile" : "desktop"; }
    catch(e) { return "unknown"; }
  }

  function emit(name, meta) {
    try {
      var detail = Object.assign({ launcherVersion: LAUNCHER_VERSION }, meta || {});
      window.dispatchEvent(new CustomEvent(name, { detail: detail, bubbles: true }));
      if (typeof window.gtag === "function") window.gtag("event", name, detail);
    } catch (e) {}
  }

  var ICONS = {"flows":"<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"6\" r=\"2.25\"/><circle cx=\"12\" cy=\"12\" r=\"2.25\"/><circle cx=\"19\" cy=\"18\" r=\"2.25\"/><path d=\"M7.2 7.2L9.8 10.2\"/><path d=\"M14.2 13.8L16.8 16.8\"/></svg>","oort":"<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><ellipse cx=\"12\" cy=\"12\" rx=\"9\" ry=\"4.5\" transform=\"rotate(-25 12 12)\"/><ellipse cx=\"12\" cy=\"12\" rx=\"9\" ry=\"4.5\" transform=\"rotate(55 12 12)\"/></svg>","qev":"<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3.5l7 2.5v5.2c0 4.4-2.9 7.6-7 9.3-4.1-1.7-7-4.9-7-9.3V6L12 3.5z\"/><path d=\"M9 12.2l2 2 4-4.5\"/></svg>","lolm":"<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"4\" rx=\"1.2\"/><rect x=\"4\" y=\"10\" width=\"16\" height=\"4\" rx=\"1.2\"/><rect x=\"4\" y=\"15\" width=\"12\" height=\"4\" rx=\"1.2\"/></svg>","ledger":"<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"3.5\" width=\"14\" height=\"17\" rx=\"1.5\"/><path d=\"M9 8h6M9 12h6M9 16h4\"/></svg>","aex":"<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5.5 17.5a8 8 0 1113 0\"/><path d=\"M12 14.5l3.5-5.5\"/><circle cx=\"12\" cy=\"14.5\" r=\"1.25\" fill=\"currentColor\" stroke=\"none\"/></svg>"};

  function gridIcon() {
    return '<svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.55"/><circle cx="9" cy="3" r="1.55"/><circle cx="15" cy="3" r="1.55"/><circle cx="3" cy="9" r="1.55"/><circle cx="9" cy="9" r="1.55"/><circle cx="15" cy="9" r="1.55"/><circle cx="3" cy="15" r="1.55"/><circle cx="9" cy="15" r="1.55"/><circle cx="15" cy="15" r="1.55"/></svg>';
  }

  function resolveTheme(attr) {
    if (attr === "dark" || attr === "light") return attr;
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (e) { return "light"; }
  }

  class QiraProductLauncher extends HTMLElement {
    constructor() {
      super();
      this._open = false;
      this._root = this.attachShadow({ mode: "open" });
      this._products = null;
      this._onDoc = this._onDoc.bind(this);
      this._onKey = this._onKey.bind(this);
    }

    static get observedAttributes() {
      return ["current-product", "theme"];
    }

    connectedCallback() {
      try {
        this._products = sanitize(BUNDLED.products, BUNDLED.allowlist);
      } catch (e) {
        console.error("[qira-product-launcher] registry failed", e);
        this._products = [];
      }
      this._render();
    }

    disconnectedCallback() {
      document.removeEventListener("mousedown", this._onDoc);
      document.removeEventListener("keydown", this._onKey);
      document.body.style.overflow = this._prevOverflow || "";
      this._teardownPortal();
    }

    attributeChangedCallback() {
      if (this.isConnected) this._render();
    }

    get currentProduct() {
      var v = this.getAttribute("current-product");
      return isAllowed(v) ? v : null;
    }

    _isMobile() {
      try { return window.matchMedia("(max-width:640px)").matches; }
      catch (e) { return false; }
    }

    _teardownPortal() {
      if (this._portal && this._portal.parentNode) {
        this._portal.parentNode.removeChild(this._portal);
      }
      this._portal = null;
    }

    _panelMarkup(theme, current, products, panelId) {
      var html = "";
      html += '<button type="button" class="qira-launcher__scrim" aria-label="Close Qira Apps" tabindex="-1" data-close></button>';
      html += '<div id="' + panelId + '" class="qira-launcher__panel" role="dialog" aria-modal="true" aria-label="Qira Apps" data-qira-panel part="panel">';
      html += '<div class="qira-launcher__header"><h2 class="qira-launcher__title">Qira Apps</h2>';
      html += '<button type="button" class="qira-launcher__close" aria-label="Close Qira Apps" data-close>';
      html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>';
      html += "</button></div>";
      html += '<div class="qira-launcher__grid" data-qira-grid="">';
      for (var i = 0; i < products.length; i++) {
        html += this._tile(products[i], current);
      }
      html += "</div></div>";
      return html;
    }

    _wirePanel(root, current) {
      var self = this;
      root.querySelectorAll("[data-close]").forEach(function (el) {
        el.addEventListener("click", function () { self._close(); });
      });
      root.querySelectorAll("[data-product-id]").forEach(function (el) {
        el.addEventListener("click", function (ev) {
          if (el.getAttribute("data-disabled") === "true") {
            ev.preventDefault();
            return;
          }
          var id = el.getAttribute("data-product-id");
          emit("qira_product_selected", {
            currentProductId: current,
            destinationProductId: id,
            deviceClass: deviceClass(),
          });
        });
        var tip = el.getAttribute("data-tooltip");
        if (tip) {
          el.addEventListener("mouseenter", function () { self._showTip(el, tip); });
          el.addEventListener("mouseleave", function () { self._hideTip(); });
          el.addEventListener("focus", function () { self._showTip(el, tip); });
          el.addEventListener("blur", function () { self._hideTip(); });
        }
      });
    }

    _render() {
      var theme = resolveTheme(this.getAttribute("theme") || "auto");
      var current = this.currentProduct;
      var products = this._products || [];
      var panelId = "qira-apps-panel-" + Math.random().toString(36).slice(2, 9);
      var mobile = this._isMobile();
      this._teardownPortal();
      this.removeAttribute("data-open");

      // Host always keeps the trigger in-place (nav position).
      var hostHtml = "";
      hostHtml += "<style>" + STYLES + "</style>";
      hostHtml += '<div class="qira-launcher" data-theme="' + theme + '" data-qira-launcher="">';
      hostHtml += '<button type="button" class="qira-launcher__trigger" aria-label="Open Qira Apps" aria-expanded="' +
        (this._open ? "true" : "false") + '" aria-controls="' + panelId + '" aria-haspopup="dialog" part="trigger">' +
        gridIcon() + "</button>";

      // Desktop: panel lives next to the trigger.
      if (this._open && !mobile) {
        hostHtml += this._panelMarkup(theme, current, products, panelId);
      }
      hostHtml += "</div>";
      this._root.innerHTML = hostHtml;

      var self = this;
      var trigger = this._root.querySelector(".qira-launcher__trigger");
      if (trigger) {
        trigger.addEventListener("click", function (e) {
          e.stopPropagation();
          self._toggle();
        });
      }
      if (this._open && !mobile) {
        this._wirePanel(this._root, current);
      }

      // Mobile: portal overlay to document.body so sticky/backdrop-filter
      // ancestors cannot trap position:fixed.
      if (this._open && mobile) {
        this.setAttribute("data-open", "");
        var portal = document.createElement("div");
        portal.setAttribute("data-qira-apps-portal", "");
        portal.style.cssText = "all:initial;position:fixed;inset:0;z-index:2147483000;";
        var shadow = portal.attachShadow({ mode: "open" });
        var portalHtml = "";
        portalHtml += "<style>" + STYLES + "</style>";
        portalHtml += '<div class="qira-launcher qira-launcher--portal" data-theme="' + theme + '" data-open="true" data-qira-launcher="">';
        portalHtml += this._panelMarkup(theme, current, products, panelId);
        portalHtml += "</div>";
        shadow.innerHTML = portalHtml;
        document.body.appendChild(portal);
        this._portal = portal;
        this._wirePanel(shadow, current);
        // Focus close button for a11y (trigger stays in nav)
        var closeBtn = shadow.querySelector(".qira-launcher__close");
        if (closeBtn) {
          try { closeBtn.focus(); } catch (e) {}
        }
      }
    }

    _tile(p, current) {
      var isCurrent = current && p.id === current;
      var disabled = !clickable(p);
      var badge = "";
      if (isCurrent) badge = '<span class="qira-launcher__badge qira-launcher__badge--here" aria-hidden="true">Here</span>';
      else if (p.status === "coming_soon") badge = '<span class="qira-launcher__badge qira-launcher__badge--soon">Soon</span>';
      else if (p.status === "research") badge = '<span class="qira-launcher__badge qira-launcher__badge--research">Research</span>';
      var desc = p.shortDescription || "";
      var icon = ICONS[p.id] || "";
      var cls = "qira-launcher__tile" + (isCurrent ? " qira-launcher__tile--current" : "") + (disabled ? " qira-launcher__tile--disabled" : "");
      var tip = p.tooltip.replace(/"/g, "&quot;");
      var body = '<div class="qira-launcher__tile-top"><span class="qira-launcher__icon" aria-hidden="true">' + icon + "</span></div>";
      body += '<div class="qira-launcher__meta"><p class="qira-launcher__name">' + p.name + "</p>";
      if (badge) body += badge;
      body += '<p class="qira-launcher__desc">' + desc + "</p></div>";
      var ariaExtra = isCurrent ? ", current app" : (disabled ? ", Coming Soon" : (desc ? ", " + desc : ""));
      if (disabled) {
        return '<div class="' + cls + '" role="link" aria-disabled="true" aria-label="' + p.name + ariaExtra + '" title="' + tip + '" data-product-id="' + p.id + '" data-disabled="true" data-tooltip="' + tip + '" tabindex="0">' + body + "</div>";
      }
      if (isCurrent || !p.url) {
        return '<div class="' + cls + '" role="link" aria-current="page" aria-label="' + p.name + ariaExtra + '" title="' + tip + '" data-product-id="' + p.id + '" data-current="true" data-tooltip="' + tip + '" tabindex="0">' + body + "</div>";
      }
      return '<a class="' + cls + '" href="' + p.url + '" aria-label="' + p.name + ariaExtra + '" title="' + tip + '" data-product-id="' + p.id + '" data-tooltip="' + tip + '">' + body + "</a>";
    }

    _showTip(el, text) {
      this._hideTip();
      var t = document.createElement("div");
      t.className = "qira-launcher__tooltip";
      t.setAttribute("role", "tooltip");
      t.textContent = text;
      t.style.position = "fixed";
      t.style.zIndex = "9999";
      var r = el.getBoundingClientRect();
      t.style.left = Math.max(8, Math.min(window.innerWidth - 220, r.left)) + "px";
      t.style.top = Math.max(8, r.top - 8) + "px";
      t.style.transform = "translateY(-100%)";
      this._root.appendChild(t);
      this._tip = t;
    }

    _hideTip() {
      if (this._tip && this._tip.parentNode) this._tip.parentNode.removeChild(this._tip);
      this._tip = null;
    }

    _toggle() {
      if (this._open) this._close();
      else this._openPanel();
    }

    _openPanel() {
      this._open = true;
      this._render();
      emit("qira_launcher_opened", {
        currentProductId: this.currentProduct,
        deviceClass: deviceClass(),
      });
      document.addEventListener("mousedown", this._onDoc);
      document.addEventListener("keydown", this._onKey);
      try {
        if (window.matchMedia("(max-width:640px)").matches) {
          this._prevOverflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
        }
      } catch (e) {}
      var t = this._root.querySelector(".qira-launcher__trigger");
      if (t) t.focus();
    }

    _close() {
      if (!this._open) return;
      this._open = false;
      this._hideTip();
      this._teardownPortal();
      document.removeEventListener("mousedown", this._onDoc);
      document.removeEventListener("keydown", this._onKey);
      document.body.style.overflow = this._prevOverflow || "";
      this._render();
      emit("qira_launcher_closed", {
        currentProductId: this.currentProduct,
        deviceClass: deviceClass(),
      });
      var t = this._root.querySelector(".qira-launcher__trigger");
      if (t) t.focus();
    }

    _onDoc(e) {
      var path = e.composedPath ? e.composedPath() : [];
      if (path.indexOf(this) !== -1) return;
      if (this._portal && path.indexOf(this._portal) !== -1) return;
      // mobile scrim handles close inside portal
      try {
        if (window.matchMedia("(max-width:640px)").matches) return;
      } catch (err) {}
      this._close();
    }

    _onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        this._close();
      }
    }
  }

  customElements.define("qira-product-launcher", QiraProductLauncher);
})();
