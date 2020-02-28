"use strict";
(window.SAIL_ENV = {
  PAYPAL_ENV: "production",
  PAYPAL_CLIENT: { production: "prod" },
  API_HOST: ""
}),
  $(function() {
    window.SAIL_ENV.config = {
      host: location.host,
      href: location.href,
      cartType: "1",
      cartToken: "",
      copyCouponCode: "",
      coupon_code: "",
      location: "",
      show_buycart: !1,
      currencyList: null,
      currencyEntity: {
        currency_code: $(".J-currency-code").val(),
        symbol: $(".J-currency-code").data("symbol"),
        rate_value: $(".J-currency-code").data("rate-value"),
        currency_text: ""
      },
      headcode: $(".J-currency-code").val(),
      headsymbol: $(".J-currency-code").data("symbol"),
      headRateValue: $(".J-currency-code").data("rate-value"),
      headCurrencyText: "",
      navigator: navigator.userAgent.toLowerCase(),
      scrollPosition: 0,
      holidayStyle: "default",
      index: {},
      products: {},
      collections: {},
      cart: {},
      orders: {},
      coupon_tips: function(e, a) {
        var s = "";
        switch ((e += "")) {
          case "1":
            s =
              '<p class="erro-tips">This code did not match any active gift card or discount. Was it entered correctly?</p>';
            break;
          case "2":
          case "3":
            s =
              '<p class="erro-tips">Your cart does not meet the requirements for the <strong>' +
              a +
              "</strong> discount code</p>";
        }
        return s;
      },
      mask_layer: function(e) {
        "hide" == e
          ? ($(".J-Mask").hide(),
            $("html, body")
              .removeClass("hidden")
              .css("top", ""),
            $("html, body").animate(
              { scrollTop: SAIL_ENV.config.scrollPosition },
              0
            ))
          : "show" == e &&
            ($(".J-Mask").show(),
            (SAIL_ENV.config.scrollPosition = $(window).scrollTop()),
            $("html, body")
              .addClass("hidden")
              .css("top", "-" + SAIL_ENV.config.scrollPosition + "px"));
      }
    };
  }),
  $(function() {
    var win_navigator = navigator.userAgent.toLowerCase();
    (window.$plug = {
      loading: function(e) {
        var a = { title: "load", test: "正在加载..." },
          s = "",
          t = "string" == typeof e ? e : e ? this.merge(a, e) : a;
        0 < $(".J-MaskLoad").length
          ? $(".J-Loading").text(t.test)
          : ((s +=
              '<div class="nav-model-mask J-MaskLoad"><span class="nav-model-mask-close iconfont icon-close J-MaskLoadClose"></span></div>'),
            (s +=
              '<div class="jh-loading J-Loading"><div class="load-icon"><img class="load-rotate" src="img/load.png" /></div><div class="load-test">' +
              ("string" == typeof e ? t : t.test) +
              "</div></div>")),
          $("body").append(s),
          $(".J-MaskLoad, .J-Loading").show();
      },
      load: function(e) {
        $(e).length &&
          $(e).append(
            '<div class="ajax-loading J-AjaxLoad"><em class="load iconfont icon-jiazai"></em></div>'
          );
      },
      closeLoad: function(e) {
        $(e).find(".J-AjaxLoad").length &&
          $(e)
            .find(".J-AjaxLoad")
            .remove();
      },
      closeLoading: function(e) {
        $(".J-MaskLoad, .J-Loading").hide(),
          e &&
            $(".J-MaskLoad")
              .removeClass("payment-model-mask")
              .remove("span");
      },
      alert: function() {},
      modal: function(e) {
        var a = { title: "提示", test: "", isOK: !0, iscancel: !0 };
        e && this.merge(a, e);
        $(".J-Mask").length
          ? $(".J-Mask").is(":hidden")
            ? $(".J-Mask")
                .css("overflow", "hidden")
                .show()
            : $(".J-Mask").hide()
          : $("body")
              .css("overflow", "hidden")
              .append('<div class=""></div>');
      },
      testModal: function(e, a) {
        var s = a
          ? '<div class="jh-test-modal-mask J-TestModalMask"></div>'
          : '<div class="jh-test-modal-mask gray J-TestModalMask"></div>';
        (s +=
          '  <div class="jh-test-modal J-TestModal"><span class="iconfont icon-close J-TestModalClose"></span>'),
          "string" == typeof e || "number" == typeof e
            ? (s += "<p>You can only add " + e + " to the cart. </p>")
            : 0 < e.length &&
              e.map(function(e, a) {
                s += "<p>" + e + " </p>";
              }),
          (s += "</div>"),
          $("body").append(s);
      },
      tooltip: function() {},
      merge: function(e, a) {
        for (var s in a) e[s] = a[s];
        return e;
      },
      message: {
        timeS: null,
        timeR: null,
        success: function(e) {
          this.init(
            '<div class="jh-message-item msg-success J-MsgItem"><span class="iconfont icon-chenggong"></span><span>' +
              e +
              "</span></div>"
          );
        },
        info: function(e) {
          this.init(
            '<div class="jh-message-item msg-info J-MsgItem"><span class="iconfont icon-tishi_icon"></span><span>' +
              e +
              "</span></div>"
          );
        },
        warning: function(e) {
          this.init(
            '<div class="jh-message-item msg-warning J-MsgItem"><span class="iconfont icon-icon"></span><span>' +
              e +
              "</span></div>"
          );
        },
        error: function(e) {
          this.init(
            '<div class="jh-message-item msg-error J-MsgItem"><span class="iconfont icon-shibai"></span><span>' +
              e +
              "</span></div>"
          );
        },
        init: function(e) {
          clearTimeout(this.timeS),
            clearTimeout(this.timeR),
            $(".J-Msg").length
              ? ($(".J-Msg").empty(), $(".J-Msg").append(e))
              : ((e = '<div class="jh-message J-Msg">' + e + "</div>"),
                $("body").append(e)),
            (this.timeS = setTimeout(function() {
              $(".J-MsgItem").addClass("show");
            }, 300)),
            (this.timeR = setTimeout(function() {
              $(".J-MsgItem").removeClass("show");
            }, 3e3));
        }
      },
      lazyLoad: function(e) {
        var i,
          r = "",
          c =
            (window.screen.availWidth,
            navigator.userAgent.match(
              /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )
              ? "WAP"
              : "PC");
        "WAP" == c && (r = "?x-oss-process=image/resize,w_640"),
          (i = $(document).scrollTop()
            ? parseInt($(document).scrollTop()) +
              parseInt($(window).height()) +
              10
            : parseInt($("html, body").scrollTop()) +
              parseInt($(window).height()) +
              10),
          e.map(function(e, a) {
            var s = $(a).offset().top,
              t = a.tagName;
            if (s < i && $(a).hasClass("lazy-load"))
              if ("IMG" == t)
                $(a).attr("src", $(a).data("original")),
                  $(a)
                    .addClass("blur-img")
                    .removeClass("lazy-load");
              else {
                var n = "";
                $(a).parents(".banner") &&
                $(a)
                  .parents(".banner")
                  .hasClass("swiper-container")
                  ? "WAP" == c &&
                    0 < $(".template4-body").length &&
                    (n = "?x-oss-process=image/crop,w_640,g_center")
                  : (n = r);
                var o = new Image();
                (o.src = $(a).data("original") + n),
                  (o.onload = function() {
                    $(a).attr(
                      "style",
                      "background-image: url('" +
                        $(a).data("original") +
                        n +
                        "');background-size: cover"
                    ),
                      $(a)
                        .addClass("blur-img")
                        .removeClass("lazy-load");
                  });
              }
          });
      },
      goTop: function() {
        $(document).on("click", ".J-GoTop", function() {
          $("html, body").animate({ scrollTop: "0" }, 300);
        });
      },
      query: function() {
        var s = new Object();
        window.location.search &&
          window.location.search
            .substr(1)
            .split("&")
            .forEach(function(e, a) {
              s[e.split("=")[0]] = e.split("=")[1];
            });
        return s;
      },
      Pages: function(e, a, s) {
        if (0 == s.length || s.length <= e) return $(".J-Pages").empty(), !1;
        var t = "",
          n = parseInt(s / e),
          o = !1;
        (n = s % e == 0 ? n : n + 1),
          1 == a ? $(".J-PagesPrev").hide() : $(".J-PagesPrev").show(),
          a == n ? $(".J-PagesLast").hide() : $(".J-PagesLast").show();
        for (var i = 1; i <= n; i++)
          i <= a &&
            1 != a &&
            (5 <= a
              ? (2 == i &&
                  (t +=
                    '<span class="pages-item J-PagesItem" data-index="">...</span>'),
                i != a ||
                  o ||
                  ((t +=
                    '<span class="pages-item J-PagesItem pages-item-active" data-index="' +
                    i +
                    '">' +
                    i +
                    "</span>"),
                  (o = !0)),
                (1 != i && i != a - 2 && i != a - 1) ||
                  (t +=
                    '<span class="pages-item J-PagesItem" data-index="' +
                    i +
                    '">' +
                    i +
                    "</span>"))
              : (i != a ||
                  o ||
                  ((t +=
                    '<span class="pages-item J-PagesItem pages-item-active" data-index="' +
                    i +
                    '">' +
                    i +
                    "</span>"),
                  (o = !0)),
                i != a &&
                  (t +=
                    '<span class="pages-item J-PagesItem" data-index="' +
                    i +
                    '">' +
                    i +
                    "</span>"))),
            a <= i &&
              (4 <= n - a
                ? (i != a ||
                    o ||
                    ((t +=
                      '<span class="pages-item J-PagesItem pages-item-active" data-index="' +
                      i +
                      '">' +
                      i +
                      "</span>"),
                    (o = !0)),
                  (i != a + 1 && i != a + 2 && i != n) ||
                    (t +=
                      '<span class="pages-item J-PagesItem" data-index="' +
                      i +
                      '">' +
                      i +
                      "</span>"),
                  i == a + 3 &&
                    (t +=
                      '<span class="pages-item J-PagesItem" data-index="">...</span>'))
                : (i != a ||
                    o ||
                    ((t +=
                      '<span class="pages-item J-PagesItem pages-item-active" data-index="' +
                      i +
                      '">' +
                      i +
                      "</span>"),
                    (o = !0)),
                  i != a &&
                    (t +=
                      '<span class="pages-item J-PagesItem" data-index="' +
                      i +
                      '">' +
                      i +
                      "</span>")));
        $(".J-PagesList")
          .empty()
          .append(t);
      },
      toRawType: function(e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
      getToKen: function() {
        var e = window.location.href.split("checkouts/")[1];
        return (e = -1 < e.indexOf("?") ? e.split("?")[0] : e);
      },
      replaceParam: function replaceParam(url, arg, arg_val) {
        var href = "",
          pattern = arg + "=([^&]*)",
          replaceText = arg + "=" + arg_val;
        if (url.match(pattern)) {
          var tmp = "/(" + arg + "=)([^&]*)/gi";
          (tmp = url.replace(eval(tmp), replaceText)),
            window.history.replaceState({}, 0, tmp);
        } else
          (href = url.match("[?]")
            ? url + "&" + replaceText
            : url + "?" + replaceText),
            window.history.replaceState({}, 0, href);
      }
    });
  });
