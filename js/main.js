(function () {
  "use strict";

  var cfg = window.__JOHNHOST_CONFIG__ || {};
  var STOCK = parseInt(cfg.availableServers, 10) || 0;
  var PANEL = cfg.panelUrl || "";
  var FORM = cfg.applicationFormUrl || "";

  function getCookie(name) {
    var re = new RegExp("(?:^|; )" + name + "=([^;]*)");
    var m = document.cookie.match(re);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + d.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
  }

  function wireApply(btn) {
    if (STOCK > 0) {
      btn.href = FORM;
      btn.textContent = "Apply for a free server";
      btn.classList.remove("disabled");
      btn.removeAttribute("aria-disabled");
    } else {
      btn.textContent = "Out of stock";
      btn.classList.add("disabled");
      btn.setAttribute("aria-disabled", "true");
      btn.removeAttribute("href");
      if (!btn.__jhBlocked) {
        btn.__jhBlocked = true;
        btn.addEventListener("click", function (e) {
          e.preventDefault();
        });
      }
    }
  }

  function wirePanel(btn) {
    if (PANEL) {
      btn.href = PANEL;
      btn.target = "_blank";
      btn.rel = "noopener";
    }
  }

  function renderStock(widget) {
    var num = widget.querySelector("[data-stock-num]");
    var apply = widget.querySelector("[data-apply]");
    var out = widget.querySelector("[data-stock-out]");

    if (num) num.textContent = STOCK;
    if (out) out.classList.toggle("hidden", STOCK > 0);

    if (apply) {
      if (STOCK > 0) {
        apply.classList.remove("hidden");
        wireApply(apply);
      } else {
        apply.classList.add("hidden");
      }
    }

    if (widget.classList.contains("stock-badge")) {
      widget.classList.toggle("out", STOCK <= 0);
    }
  }

  function updateConsole() {
    var capEl = document.querySelector("[data-console-cap]");
    var meterEl = document.querySelector("[data-console-meter]");
    var total = 6;
    var used = Math.max(total - STOCK, 0);
    if (capEl) capEl.textContent = used + " / " + total + " slots";
    if (meterEl) meterEl.style.width = Math.round((used / total) * 100) + "%";
  }

  function runCookieBanner(banner) {
    var saved = getCookie("jh_consent");
    if (saved === "yes" || saved === "no") {
      banner.remove();
      return;
    }
    document.getElementById("cookie-yes").addEventListener("click", function () {
      setCookie("jh_consent", "yes", 120);
      banner.remove();
    });
    document.getElementById("cookie-no").addEventListener("click", function () {
      banner.remove();
    });
    window.setTimeout(function () {
      banner.classList.add("show");
    }, 400);
  }

  function wireConsole() {
    updateConsole();
    var traffic = document.querySelector("[data-console-traffic]");
    if (traffic) {
      var lines = ["IDLE", "MITIGATING", "BACKUP", "SCANNING", "NODES SYNCED"];
      var i = 0;
      window.setInterval(function () {
        i = (i + 1) % lines.length;
        traffic.textContent = lines[i];
      }, 4200);
    }
  }

  var anchor = document.getElementById("stock-widget-anchor");
  if (anchor) {
    var widgetHtml =
      '<div class="top-right">' +
      '<span class="stock-badge" role="status">' +
      '<span class="dot" aria-hidden="true"></span>' +
      '<span class="label">Servers available:</span> ' +
      '<span class="num" data-stock-num>0</span>' +
      "</span>";
    if (PANEL) {
      widgetHtml +=
        '<a class="btn btn-panel" href="' + PANEL + '" target="_blank" rel="noopener">Panel</a>';
    }
    widgetHtml += "</div>";
    anchor.innerHTML = widgetHtml;
    renderStock(anchor.querySelector(".stock-badge"));
  }

  var cookieHost = document.getElementById("cookie-anchor");
  if (cookieHost) {
    cookieHost.innerHTML =
      '<div class="cookie-pop" id="cookie-banner" role="dialog" ' +
      'aria-modal="false" aria-labelledby="cookie-title">' +
      '<h4 id="cookie-title">Cookie consent</h4>' +
      "<p>" +
      "JohnHost stores a small cookie to remember this choice and session " +
      "essentials for the control panel. No tracking scripts or third-party " +
      'advertising are used. Selecting "Decline" stores nothing.' +
      "</p>" +
      '<div class="actions">' +
      '<button type="button" class="btn btn-primary" id="cookie-yes">Accept</button>' +
      '<button type="button" class="btn btn-secondary" id="cookie-no">Decline</button>' +
      "</div>" +
      "</div>";
    runCookieBanner(cookieHost.querySelector("#cookie-banner"));
  }

  document.querySelectorAll("[data-panel]").forEach(wirePanel);
  document.querySelectorAll("[data-stock-card]").forEach(function (card) {
    renderStock(card);
  });
  document.querySelectorAll("[data-apply]").forEach(wireApply);

  updateConsole();
  wireConsole();
})();