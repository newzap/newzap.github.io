"use strict";
$(function() {
  var a = null,
    t =
      (window.location.href,
      navigator.userAgent.toLowerCase(),
      $(".sail-event-page-location").val());
  if (
    ("product-detail" == $(".JH-Event-Name").val()
      ? "function" == typeof stag &&
        stag("page_load", "page_view", {
          page_name: t,
          handler: $(".sail-event-page-handler").val()
        })
      : "function" == typeof stag &&
        stag("page_load", "page_view", { page_name: t }),
    "orders" == t &&
      ("function" == typeof stag &&
        stag("page_load", "checkout", {
          page_name: $(".sail-event-page-location").val()
        }),
      $(".J-OrderVal").blur(function() {
        var t = a ? a.prop("name") : "";
        (a = $(this)),
          "function" == typeof stag &&
            stag("page_click", "user_behavior", {
              type: "input",
              additional: t,
              button_pos: $(this).val(),
              button_name: $(this).prop("name")
            });
      })),
    ("index" != t && "orders" != t && "collections" != t) ||
      ("undefined" == typeof paypal &&
        "function" == typeof stag &&
        stag("page_click", "user_behavior", {
          type: "check",
          additional: "paypal is undefined",
          button_pos: "",
          button_name: "payment"
        })),
    "function" == typeof stag &&
      stag("page_load", "user_behavior", {
        type: "view",
        additional: "",
        button_name: ""
      }),
    "result" == $(".sail-event-page-location").val() &&
      window.sessionStorage.getItem("product_ids"))
  ) {
    var e = JSON.parse(window.sessionStorage.getItem("product_ids")),
      o = [];
    $(".J-OrderResults")
      .find(".order-item")
      .each(function() {
        e.indexOf($(this).data("product-id")) &&
          o.push($(this).data("product-id"));
      });
    var n = { event_name: "purchase", params: { ids: o } };
    $http.post(
      "",
      JSON.stringify(n),
      function(t) {
        0 == t.code && window.sessionStorage.removeItem("product_ids");
      }
    );
  }
  if ("PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val()) {
    if (
      (window.sessionStorage.getItem("share_source") &&
        "function" == typeof sharetag &&
        sharetag("visit", window.sessionStorage.getItem("share_source")),
      "recommend" == $plug.query().origin)
    )
      (n = { event_name: "goods_click", params: { ids: [] } }).params.ids.push(
        $(".product-id").val()
      ),
        $http.post("", JSON.stringify(n));
    0 < $(".model-discount-save").length &&
      "function" == typeof stag &&
      stag("page_load", "user_behavior", {
        type: "popup_view",
        additional: "",
        button_name: ""
      }),
      0 < $(".model-discount-tips-bottom").length &&
        0 < $(".model-discount-tips-bottom").find("a").length &&
        ("function" == typeof stag &&
          stag("page_load", "user_behavior", {
            type: "tran_view",
            additional: "",
            button_name: ""
          }),
        $(document).on("click", ".model-discount-tips-bottom > a", function() {
          "function" == typeof stag &&
            stag("page_load", "user_behavior", {
              type: "tran_click",
              additional: "",
              button_name: ""
            });
        }));
  }
  768 < screen.availWidth
    ? ($(document).on(
        "click",
        ".JH-BuyCart, .JH-Pixel-BuyCart, .jh-btn-cart",
        function() {
          var t = "",
            a = $(this).closest(".JH-Columns");
          $(this).parents(".model-add-to-cart").length
            ? (t = "bottom_sidebar_popup")
            : $(this).parents(".product-types-box").length && (t = "list"),
            "function" == typeof stag &&
              stag("page_click", "user_behavior", {
                type: "trace",
                additional:
                  $plug.query().variant || a.find(".product-id").val(),
                button_pos: t,
                button_name: "add_to_cart"
              }),
            window.sessionStorage.getItem("share_source") &&
              "function" == typeof sharetag &&
              sharetag(
                "add_to_cart",
                window.sessionStorage.getItem("share_source")
              );
        }
      ),
      $(document).on("click", ".J-Gopay", function() {
        var t = $(this).parents(".cart-box").length
          ? ""
          : "right_sidebar_popup";
        "function" == typeof stag &&
          stag("page_click", "user_behavior", {
            type: "trace",
            additional: "",
            button_pos: t,
            button_name: "checkout"
          });
      }),
      $(".JH-Event-AddCart").click(function() {
        "function" == typeof stag &&
          stag("page_click", "group_add_cart", {
            product_id: $(".product-id").val()
          }),
          "function" == typeof stag &&
            stag("page_click", "user_behavior", {
              type: "trace",
              additional: $plug.query().variant,
              button_name: "add_to_cart"
            });
      }),
      $(".return-cart").click(function() {
        "function" == typeof stag &&
          stag("page_click", "user_behavior", {
            type: "trace",
            additional: "",
            button_name: "return_to_cart"
          });
      }),
      $(".J-UserLogOut").click(function() {
        "function" == typeof stag &&
          stag("page_click", "user_behavior", {
            type: "trace",
            additional: "",
            button_name: "log_in"
          });
      }))
    : ($(".JH-BuyCart, .JH-Pixel-BuyCart, .jh-btn-cart").click(function() {
        var t = "",
          a = $(this).closest(".JH-Columns");
        $(this).parents(".model-add-to-cart").length
          ? (t = "bottom_sidebar_popup")
          : $(this).parents(".product-types-box").length && (t = "list"),
          "function" == typeof stag &&
            stag("page_click", "add_to_cart", {
              handler: $(".sail-event-page-handler").val()
            }),
          "function" == typeof stag &&
            stag("page_click", "user_behavior", {
              type: "trace",
              additional: $plug.query().variant || a.find(".product-id").val(),
              button_pos: t,
              button_name: "add_to_cart"
            }),
          window.sessionStorage.getItem("share_source") &&
            "function" == typeof sharetag &&
            sharetag(
              "add_to_cart",
              window.sessionStorage.getItem("share_source")
            );
      }),
      $(".J-Gopay").click(function() {
        var t = $(this).parents(".cart-box").length
          ? ""
          : "right_sidebar_popup";
        "function" == typeof stag &&
          stag("page_click", "user_behavior", {
            type: "trace",
            additional: "",
            button_pos: t,
            button_name: "checkout"
          });
      }),
      $(".JH-Event-AddCart").click(function() {
        "function" == typeof stag &&
          stag("page_click", "add_group_goods_to_cart"),
          "function" == typeof stag &&
            stag("page_click", "user_behavior", {
              type: "trace",
              additional: $plug.query().variant,
              button_name: "add_to_cart"
            });
      }));
});
