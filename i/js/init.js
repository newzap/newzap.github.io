"use strict";
!(function(t) {
  function e() {
    var e = l.getBoundingClientRect().width;
    640 < e / i && (e = 640 * i),
      (t.rem = e / 16),
      40 <= t.rem && (t.rem = 40),
      (l.style.fontSize = t.rem + "px");
  }
  var i,
    a,
    n,
    r,
    o = t.document,
    l = o.documentElement,
    d = o.querySelector('meta[name="viewport"]'),
    m = o.querySelector('meta[name="flexible"]');
  d
    ? (r = d
        .getAttribute("content")
        .match(/initial\-scale=(["']?)([\d\.]+)\1?/)) &&
      ((a = parseFloat(r[2])), (i = parseInt(1 / a)))
    : m &&
      (r = m
        .getAttribute("content")
        .match(/initial\-dpr=(["']?)([\d\.]+)\1?/)) &&
      ((i = parseFloat(r[2])), (a = parseFloat((1 / i).toFixed(2))));
  if (!i && !a) {
    var c =
        (t.navigator.appVersion.match(/android/gi),
        t.navigator.appVersion.match(/iphone/gi)),
      s = t.devicePixelRatio;
    a = 1 / (i = c ? (3 <= s ? 3 : 2 <= s ? 2 : 1) : s);
  }
  if ((l.setAttribute("data-dpr", i), !d))
    if (
      ((d = o.createElement("meta")).setAttribute("name", "viewport"),
      d.setAttribute(
        "content",
        "initial-scale=" +
          a +
          ", maximum-scale=" +
          a +
          ", minimum-scale=" +
          a +
          ", user-scalable=no"
      ),
      l.firstElementChild)
    )
      l.firstElementChild.appendChild(d);
    else {
      var u = o.createElement("div");
      u.appendChild(d), o.write(u.innerHTML);
    }
  (t.dpr = i),
    t.addEventListener(
      "resize",
      function() {
        clearTimeout(n), (n = setTimeout(e, 300));
      },
      !1
    ),
    o.readyState,
    o.addEventListener("DOMContentLoaded", function() {}, !1),
    e();
})(window);
