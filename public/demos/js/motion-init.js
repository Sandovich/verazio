/* ==========================================================================
   VERAZIO — Motion (scroll-reveal only; no scroll-jacking, no parallax toys)

   Loaded as a CLASSIC script (not type="module"): Chromium refuses to load
   type="module" scripts at all over file:// (it treats the local origin as
   "null" and CORS-blocks the module fetch), which would leave every
   [data-reveal] element stuck hidden when this site is opened by double-click
   instead of through a local server. A classic script has no such
   restriction; Motion itself is pulled in via a dynamic import(), which only
   needs CORS headers from the CDN, not from the local page.

   Visibility contract (css/style.css): [data-reveal] elements are VISIBLE
   BY DEFAULT. This script only ever adds a temporary "reveal-armed" (hidden)
   class to an element, and only when both are true: (a) Motion has already
   loaded successfully, and (b) the element is still below the fold at that
   moment, so an inView() callback is guaranteed to fire for it. Content
   already on screen — or the whole page, if the CDN is slow/unreachable —
   is never hidden while waiting on JS. A final unconditional timeout clears
   any leftover "armed" state no matter what goes wrong, so a blank block is
   never a possible outcome.
   ========================================================================== */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAllImmediately() {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.remove("reveal-armed");
      el.classList.add("is-revealed");
    });
  }

  async function setupReveals() {
    var armed = [];
    try {
      var mod = await import("https://cdn.jsdelivr.net/npm/motion@latest/+esm");
      var animate = mod.animate, inView = mod.inView, stagger = mod.stagger;

      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var stillBelowFold = rect.top >= window.innerHeight;
        // Only arm (hide) elements the user has not had any chance to see
        // yet. Anything already visible, or already scrolled past, is left
        // alone — never hidden retroactively.
        if (stillBelowFold) {
          el.classList.add("reveal-armed");
          armed.push(el);
        }
        inView(el, function () {
          el.classList.remove("reveal-armed");
          el.classList.add("is-revealed");
        }, { margin: "0px 0px -10% 0px" });
      });

      document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
        var items = group.querySelectorAll("[data-reveal-item]");
        inView(group, function () {
          animate(
            items,
            { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0)"] },
            { duration: 0.6, delay: stagger(0.08), easing: [0.22, 0.61, 0.36, 1] }
          );
        }, { margin: "0px 0px -10% 0px" });
      });
    } catch (err) {
      // CDN unreachable, blocked, or import failed for any other reason —
      // fail open: show everything now rather than leaving it hidden.
      console.warn("Verazio: Motion CDN unavailable, showing content without scroll-reveal.", err);
      revealAllImmediately();
      return;
    }

    // Absolute safety net: guarantee visibility no matter what edge case
    // slips through (observer margin math, a zero-height ancestor at arm
    // time, a library quirk). Worst case an element simply appears without
    // its entrance animation — which this whole contract treats as a normal,
    // acceptable outcome, never as a blank hole.
    setTimeout(function () {
      armed.forEach(function (el) {
        el.classList.remove("reveal-armed");
        el.classList.add("is-revealed");
      });
    }, 6000);
  }

  if (reduceMotion) {
    revealAllImmediately();
  } else {
    setupReveals();
  }

  /* --- Golden Canon Grid diagnostic overlay -------------------------------
     Internal QA only: press "g" to verify layout against the same key-lines
     the grid system (css/golden-grid.css) is built on. Not a visible affordance. */
  var V_LINES = [3.1, 6.2, 12.5, 16.7, 20, 25, 33.3, 40, 50, 60, 66.6, 75, 80, 83.3, 87.5, 93.8, 96.9];
  var H_LINES = [6.2, 25, 33.3, 50, 66.6, 75, 93.8];
  var overlay = null;

  function buildOverlay() {
    var el = document.createElement("div");
    el.id = "gc-overlay";
    V_LINES.forEach(function (pct) {
      var i = document.createElement("i");
      i.style.left = pct + "%";
      el.appendChild(i);
    });
    H_LINES.forEach(function (pct) {
      var b = document.createElement("b");
      b.style.top = pct + "%";
      el.appendChild(b);
    });
    document.body.appendChild(el);
    return el;
  }

  window.addEventListener("keydown", function (e) {
    if (e.key !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (!overlay) overlay = buildOverlay();
    overlay.classList.toggle("is-visible");
  });
})();
