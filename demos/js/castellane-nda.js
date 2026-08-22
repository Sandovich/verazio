/* ==========================================================================
   CASTELLANE PARTNERS — inline NDA gesture
   Concept-demo interaction only: no server, no real data. Each tombstone
   plaque carries a "sealed" mandate-notes strip. Typing initials and
   submitting "unseals" that one card's note, client-side, styled as an
   access-logged acknowledgment rather than a generic gate/modal — this is
   the case's second required mechanic, alongside the redacted plaques
   themselves.
   Loaded as a classic script (matches the project-wide file:// constraint
   documented in ../../js/motion-init.js): no build step, no CORS risk.
   ========================================================================== */
(function () {
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function timestamp() {
    var d = new Date();
    // Hardcoded to en-GB rather than the visitor's locale (toLocaleDateString
    // with undefined): the whole site is English copy, so a Cyrillic/other
    // system locale must not silently swap the date into a different
    // language mid-page (e.g. "22 апр. 2026 г." instead of "22 Apr 2026").
    return pad(d.getHours()) + ":" + pad(d.getMinutes()) + " · " +
      d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  document.querySelectorAll("[data-seal]").forEach(function (seal) {
    var form = seal.querySelector("[data-seal-form]");
    var input = form ? form.querySelector("input") : null;
    var revealed = seal.querySelector("[data-seal-revealed]");
    if (!form || !input || !revealed) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var initials = input.value.trim();
      if (!initials) {
        form.classList.remove("is-shake");
        // force reflow so the animation can re-trigger on repeated empty submits
        void form.offsetWidth;
        form.classList.add("is-shake");
        input.focus();
        return;
      }
      var whoEl = revealed.querySelector("[data-seal-who]");
      var timeEl = revealed.querySelector("[data-seal-time]");
      if (whoEl) whoEl.textContent = initials.toUpperCase();
      if (timeEl) timeEl.textContent = timestamp();
      form.hidden = true;
      revealed.hidden = false;
    });
  });
})();
