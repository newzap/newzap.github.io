"use strict";

  $(function() {
    var r = window.sessionStorage;
    ({
      cartList: [],
      cartToken: "",
      coupon_code: "",
      autoDiscount: "",
      amountProduct: "",
      cartProductRes: [],
      subTotalAmount: "",
      discountAmount: "",
      head_rate_value: "",
      pagelocation: "",
      init: function() {
        var e = this;
        (e.pagelocation = $(".sail-event-page-location").val()),
          (e.head_rate_value = $(".J-currency-code").data("rate-value")),
          "orders" != e.pagelocation && e.getCartInfo(),
          e.addCart(),
          e.addGroupCart(),
          e.addRecommendCart(),
          e.event();
      },
      event: function() {
        var o = this;
        $(".J-openSlideCart").click(function() {
          o.getCartInfo(),
            SAIL_ENV.config.show_buycart
              ? ((SAIL_ENV.config.show_buycart = !1),
                SAIL_ENV.config.mask_layer("hide"),
                $(".J-BuyCart--Box").removeClass("buy-cart--right"))
              : ((SAIL_ENV.config.show_buycart = !0),
                SAIL_ENV.config.mask_layer("show"),
                $(".J-BuyCart--Box").addClass("buy-cart--right"));
        }),
          $(".J-DiscountTips").on("mouseover", function() {
            $(this)
              .siblings(".cartlist-discount-tips")
              .addClass("discount-tips--show");
          }),
          $(".J-DiscountTips").on("mouseout", function() {
            $(this)
              .siblings(".cartlist-discount-tips")
              .removeClass("discount-tips--show");
          }),
          $(document).on("click", ".J-Add, .J-Reduce", function() {
            var e = {
              index: parseInt(
                $(this)
                  .parents(".J-BuyCart")
                  .index()
              ),
              target: $(this).hasClass("J-Add") ? "add" : "reduce",
              quantity: parseInt(
                $(this)
                  .siblings(".jh-input-box")
                  .find("input")
                  .val()
              )
            };
            $(".J-Add,.J-Reduce")
              .addClass("disabled")
              .attr("disabled", "disabled"),
              "reduce" == e.target &&
                e.quantity <= 1 &&
                (o.cartList.splice(e.index, 1), o.save()),
              ("add" == e.target || ("reduce" == e.target && 1 < e.quantity)) &&
                ((e.quantity =
                  "add" == e.target ? e.quantity + 1 : e.quantity - 1),
                (o.cartList[e.index]._quantity = e.quantity));
          }),
          $(document).on("click", ".J-ProductAdd", function() {
            var e = parseInt(
                $(this)
                  .parents(".J-Product")
                  .find(".J-ProductNumber")
                  .data("inventory-quantity")
              ),
              t =
                parseInt(
                  $(this)
                    .parents(".J-Product")
                    .find(".J-ProductNumber")
                    .val() || 1
                ) + 1;
            if (
              ($(this)
                .parents(".J-Product")
                .find(".J-InventoryQuantity")
                .text(""),
              e < t)
            ) {
              var i = e <= 0 ? 1 : e;
              $(this)
                .parents(".J-Product")
                .find(".J-InventoryQuantity")
                .text("Maximum quantity available reached."),
                $(this)
                  .parents(".J-Product")
                  .find(".J-ProductNumber")
                  .val(i);
            } else
              $(this)
                .parents(".J-Product")
                .find(".J-ProductNumber")
                .val(t);
          }),
          $(document).on("click", ".J-ProductReduce", function() {
            var e = parseInt(
                $(this)
                  .parents(".J-Product")
                  .find(".J-ProductNumber")
                  .data("inventory-quantity")
              ),
              t = parseInt(
                $(this)
                  .parents(".J-Product")
                  .find(".J-ProductNumber")
                  .val()
              );
            $(this)
              .parents(".J-Product")
              .find(".J-InventoryQuantity")
              .text(""),
              e < t &&
                $(this)
                  .parents(".J-Product")
                  .find(".J-InventoryQuantity")
                  .text("Maximum quantity available reached."),
              (t = 0 < --t ? t : 1),
              $(this)
                .parents(".J-Product")
                .find(".J-ProductNumber")
                .val(t);
          });
      },
      getCartInfo: function(e, t) {
        "result" == this.pagelocation &&
          (window.localStorage.removeItem("coupon_code"),
          window.sessionStorage.removeItem("coupon_code"),
          window.sessionStorage.removeItem("order_number"),
          window.localStorage.removeItem("flip_clock_stamp")),
          localStorage.getItem("coupon_code") &&
            ((this.coupon_code = localStorage.getItem("coupon_code") || ""),
            $(".J-CartCouponOpen").addClass("cart-coupon-open--show"),
            $(".J-CartCouponOpen")
              .next("div")
              .slideDown());
        var i = this,
          a = {
            cart: { cart_token: i.cartToken },
            coupon: { coupon_code: i.coupon_code || "" }
          },
          n = $.extend(a, e);
      },
      addCart: function() {
        var f = this;
        if ($(".J-Product").length < 0) return !1;
        $(".JH-BuyCart, .JH-BuyPayCart").click(function() {
          var e = $(this),
            t = 0,
            i = {
              content_ids: [],
              content_type: "product_group",
              content_name: $.trim(
                e
                  .parents(".J-Product")
                  .find(".title")
                  .eq(0)
                  .text()
              ),
              content_category: "",
              currency: $(".J-currency-code").val(),
              value: parseFloat(
                e
                  .parents(".J-Product")
                  .find(".pay-price")
                  .attr("data-seller-price")
              ),
              num_items: 0,
              sendout: !!e.hasClass("JH-BuyCart")
            };
          if (
            (0 < e.parents(".product-types-box").length
              ? (t = parseInt(
                  e.parents(".product-types-box").data("product-id")
                ))
              : !(t =
                  "index" == f.pagelocation
                    ? parseInt(
                        e
                          .parents(".JH-Columns")
                          .find(".product-id")
                          .val()
                      )
                    : parseInt($(".product-id").val())) &&
                e.parents(".J-PopupContainer").length &&
                (t = parseInt(
                  e
                    .parents(".J-PopupContainer")
                    .find(".J-ProductInfo")
                    .find(".title.sl-main-title")
                    .attr("data-id")
                )),
            i.content_ids.push(t),
            "recommend" == $plug.query().origin)
          ) {
            var a = [];
            window.sessionStorage.getItem("product_ids") &&
              (a = JSON.parse(window.sessionStorage.getItem("product_ids")));
            var n = { event_name: "add_to_cart", params: { ids: [] } };
            a.push($(".product-id").val()),
              window.sessionStorage.setItem("product_ids", JSON.stringify(a)),
              n.params.ids.push($(".product-id").val());
          }
          $(this).addClass("jh-btn-loading"),
            setTimeout(function() {
              e.removeClass("jh-btn-loading");
            }, 5e3),
            (SAIL_ENV.config.cartType = "1");
          var o = $(this).parents(".pl40"),
            r =
              $(this).hasClass("JH-BuyPayCart") &&
              "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val()
                ? $(this)
                    .parents(".J-PageContainer")
                    .find(".J-Product")
                : $(this)
                    .parents(".JH-Columns")
                    .find(".paddL80"),
            s = { sku_id: "", quantity: "1", attribute: {} },
            d = "",
            c = "",
            l = "",
            p = $(".J-SwitchType").val();
          if (
            ($(this).hasClass("JH-BuyPayCart") &&
              (SAIL_ENV.config.cartType = "2"),
            $(this).hasClass("JH-BuyPayCart") &&
              $(".buy-now-main").length &&
              (s.quantity = $(".buy-now-main")
                .find(".buy-now-img")
                .find(".fr")
                .data("number")),
            (s.quantity =
              "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val() &&
              $(this).hasClass("JH-BuyPayCart")
                ? $(this)
                    .parents(".J-PageContainer")
                    .find(".J-ProductNumber")
                    .val() || "1"
                : $(this)
                    .parents(".J-Product")
                    .find(".J-ProductNumber")
                    .val() ||
                  $(".J-PageContainer")
                    .find(".J-QtySelect")
                    .find("option:selected")
                    .val() ||
                  "1"),
            (i.num_items = s.quantity),
            "select" == p
              ? $(".paddL80").length &&
                r.find(".J-Attribute").each(function() {
                  (s.attribute[
                    $(this)
                      .find(".J-Type")
                      .data("type")
                  ] = $(this)
                    .find(".J-Value")
                    .find("option:selected")
                    .data("title")),
                    (c += $.trim(
                      $(this)
                        .find(".J-Value")
                        .find("option:selected")
                        .data("title-code")
                    ));
                })
              : $(".paddL80").length &&
                r.find(".J-Attribute").each(function() {
                  (s.attribute[
                    $(this)
                      .find(".J-Type")
                      .data("type")
                  ] = $(this)
                    .find(".J-Value")
                    .find(".active")
                    .data("title")),
                    (c += $.trim(
                      $(this)
                        .find(".J-Value")
                        .find(".active")
                        .data("title-code")
                    ));
                }),
            $(".pl40").length &&
              o.find(".J-Attribute").each(function() {
                (s.attribute[
                  $(this)
                    .find(".J-Type")
                    .data("type")
                ] = $(this)
                  .find(".J-Value")
                  .find(".active")
                  .data("title")),
                  (l += $.trim(
                    $(this)
                      .find(".J-Value")
                      .find(".active")
                      .data("title-code")
                  ));
              }),
            0 < $(".JH-page-location").length &&
              "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val())
          )
            $(".J-SkuList").length &&
              $(".J-SkuList")
                .find("span")
                .each(function() {
                  $.trim(c) == $.trim($(this).data("title-code")) &&
                    ((d = $(this).data("id")),
                    (SAIL_ENV.Product.imgSrc = $(this).data("image-url")));
                }),
              1 < $(".J-SkuList").find("span").length && (s.sku_id = d || ""),
              1 == $(".J-SkuList").find("span").length &&
                (s.sku_id = $(".J-SkuList")
                  .find("span")
                  .eq(0)
                  .data("id"));
          else {
            var u =
              ".J-SkuList-" +
              $(this)
                .parents(".JH-Columns.recommend")
                .find(".product-code")
                .val();
            $(u)
              .find("span")
              .each(function() {
                $.trim(c) == $.trim($(this).data("title-code")) &&
                  (d = $(this).data("id"));
              }),
              1 < $(u).find("span").length && (s.sku_id = d || ""),
              1 == $(u).find("span").length &&
                (s.sku_id = $(u)
                  .find("span")
                  .eq(0)
                  .data("id"));
          }
          if (
            (SAIL_ENV.Product.skuDetail &&
              0 < SAIL_ENV.Product.skuDetail.sku_list.length &&
              (SAIL_ENV.Product.skuDetail.sku_list.map(function(e, t) {
                $.trim(e.title_code) == l &&
                  ((s.sku_id = e.id),
                  (SAIL_ENV.Product.imgSrc = e.image.file_preview));
              }),
              (SAIL_ENV.Product.skuDetail = null)),
            !s.sku_id || "" == s.sku_id)
          )
            return !1;
          if ($(this).hasClass("JH-BuyPayCart"))
            return (
              (n = []).push(s), f.save({ obj: n, track: !0, track_obj: i }), !1
            );
          if (f.cartList.length) {
            var h = !0;
            f.cartList.map(function(e, t, i) {
              h && e.sku_id == s.sku_id
                ? ((e.quantity = parseInt(e.quantity) + parseInt(s.quantity)),
                  (h = !1))
                : t == f.cartList.length - 1 && h && f.cartList.splice(0, 0, s);
            });
          } else f.cartList.splice(0, 0, s);
          f.save({
            type: "add",
            track: !0,
            side: "showcart",
            sku_id: s.sku_id,
            track_obj: i
          }),
            (s = null);
        });
      },
      addGroupCart: function() {
        var i = this;
        $(this);
        if ($(".J-Product").length < 0) return !1;
        $(document).on("click", ".J-BuyGroupCart", function() {
          var n = {},
            a = [];
          if (
            ($(".product-groups-info")
              .find("li")
              .each(function(e, t) {
                var i = {
                  content_ids: [],
                  content_type: "product_group",
                  content_name: $.trim(
                    $(this)
                      .find(".product-groups-title")
                      .text()
                  ),
                  content_category: "",
                  currency: $(".J-currency-code").val(),
                  value: parseFloat(
                    $(this)
                      .find(".pay-price")
                      .attr("data-seller-price")
                  ),
                  num_items: 1
                };
                i.content_ids.push(parseInt($(this).data("product-id"))),
                  a.push(i);
              }),
            0 == $(".product-groups-info").find(".checked").length)
          )
            return !1;
          $(".product-groups-info")
            .find(".checked")
            .each(function() {
              var e = $(this)
                  .find(".product-groups-type")
                  .find("option:selected")
                  .data("sku-desc")
                  .split("·"),
                i = $(this)
                  .find(".product-groups-type")
                  .find("option:selected")
                  .data("title")
                  .split("·"),
                a = {};
              e.map(function(e, t) {
                e && (a[e] = i[t]);
              });
              var t = {
                quantity: "1",
                attribute: a,
                sku_id:
                  $(this)
                    .find(".product-groups-type")
                    .find("option:selected")
                    .data("id") + ""
              };
              n[
                $(this)
                  .find(".product-groups-type")
                  .find("option:selected")
                  .data("id")
              ] = t;
            }),
            i.cartList.length &&
              i.cartList.map(function(e, t, i) {
                n[e.sku_id] &&
                  ((e.quantity = parseInt(e.quantity) + 1 + ""),
                  delete n[e.sku_id]);
              }),
            Object.keys(n).forEach(function(e, t) {
              i.cartList.splice(0, 0, n[e]);
            }),
            i.save({ side: "showcart", track: !0, track_obj: a }),
            $(".J-PageContainer")
              .find(".JH-Columns")
              .show(),
            $(".J-Popup").removeClass("sece--show");
        });
      },
      addRecommendCart: function() {
        var s = this;
        if ($(".J-Product").length < 0) return !1;
        $(document).on("click", ".J-BuyRecommendCart", function() {
          var e = [],
            t = {
              content_ids: [],
              content_type: "product_group",
              content_name: $.trim(
                $(this)
                  .parents(".swiper-slide")
                  .find(".title")
                  .eq(0)
                  .text()
              ),
              content_category: "",
              currency: $(".J-currency-code").val(),
              value: parseFloat(
                $(this)
                  .parents(".swiper-slide")
                  .find(".pay-price")
                  .attr("data-seller-price")
              ),
              num_items: 1,
              sendout: !0
            };
          t.content_ids.push(
            parseInt(
              $(this)
                .parents(".swiper-slide")
                .data("product-id")
            )
          ),
            window.sessionStorage.getItem("product_ids") &&
              (e = JSON.parse(window.sessionStorage.getItem("product_ids")));
          var i = { event_name: "add_to_cart", params: { ids: [] } };
          e.push(
            $(this)
              .parents(".swiper-slide")
              .data("product-id")
          ),
            window.sessionStorage.setItem("product_ids", JSON.stringify(e)),
            i.params.ids.push(
              $(this)
                .parents(".swiper-slide")
                .data("product-id")
            ),
            false,
            (SAIL_ENV.Product.imgSrc = $(this)
              .siblings(".grid-picture")
              .find("img")
              .attr("src")),
            (SAIL_ENV.config.scrollPosition = $(window).scrollTop());
          var a =
              $(this).siblings(".attribute").length &&
              $(this)
                .siblings(".attribute")
                .find("option:selected")
                .data("desc")
                .split("·"),
            n =
              $(this).siblings(".attribute").length &&
              $(this)
                .siblings(".attribute")
                .find("option:selected")
                .data("title")
                .split("·"),
            o = {};
          a.length &&
            a.map(function(e, t) {
              e && (o[e] = n[t]);
            });
          i = {
            quantity: "1",
            attribute: o,
            sku_id:
              $(this)
                .siblings(".attribute")
                .find("option:selected")
                .data("id") || $(this).data("sku-id")
          };
          if (s.cartList.length) {
            var r = !0;
            s.cartList.map(function(e, t) {
              r && e.sku_id == i.sku_id
                ? ((e.quantity =
                    parseInt(e.quantity) + parseInt(i.quantity) + ""),
                  (r = !1))
                : t == s.cartList.length - 1 && r && s.cartList.splice(0, 0, i);
            });
          } else s.cartList.splice(0, 0, i);
          s.save({
            type: "add",
            track: !0,
            side: "showcart",
            addrecommend: "recommend",
            track_obj: t
          });
        });
      },
      extend: function(e, i) {
        var a = [],
          n = {};
        return (
          e.map(function(e, t) {
            n[e.sku_id]
              ? (n[e.sku_id].quantity =
                  parseInt(n[e.sku_id].quantity) + parseInt(e.quantity))
              : (n[e.sku_id] = e);
          }),
          Object.keys(n).forEach(function(e, t) {
            "check" == i &&
              n[e].quantity > parseInt(n[e].inventory_quantity) &&
              0 < n[e].inventory_quantity &&
              1 != n[e].is_lower &&
              1 != n[e].is_remove &&
              (n[e].quantity = parseInt(n[e].inventory_quantity)),
              a.push(n[e]);
          }),
          a
        );
      },
      save: function(e) {
        var t = $.extend(
          {
            obj: null,
            track: !1,
            type: "",
            side: "",
            sku_id: "",
            addrecommend: ""
          },
          e
        );
        $("body").hasClass("template5-body") &&
          (SAIL_ENV.config.show_buycart = !0);
        var i = this,
          a = t.obj
            ? JSON.parse(JSON.stringify(t.obj))
            : JSON.parse(JSON.stringify(i.cartList)),
          n = i.extend(a, "save");
      },
      makeCartPriceHtml: function(e, t) {
        var i,
          a = this;
        (i =
          "0.00" != t && e.discount.length
            ? "-" +
              SAIL_ENV.config.currencyEntity.symbol +
              (
                (e.discount[0].fee.split(SAIL_ENV.config.headsymbol)[1] /
                  a.head_rate_value) *
                SAIL_ENV.config.currencyEntity.rate_value
              ).toFixed(2)
            : "0.00" == t && e.discount.length
            ? e.discount[0].fee
            : ""),
          $(".J-Total").attr(
            "data-price",
            (e.total / a.head_rate_value).toFixed(2)
          ),
          $(".J-Subtotal").attr(
            "data-price",
            (e.product_amount / a.head_rate_value).toFixed(2)
          ),
          $(".J-CartDiscount").attr(
            "data-price",
            (t / a.head_rate_value).toFixed(2)
          ),
          $(".J-CartDiscount").html("<strong>" + i + "</strong> "),
          $(".buy-cart-total .J-Total ,.cart-total-price .J-Total").html(
            SAIL_ENV.config.currencyEntity.currency_code +
              " <strong>" +
              SAIL_ENV.config.currencyEntity.symbol +
              (
                (e.total / a.head_rate_value) *
                SAIL_ENV.config.currencyEntity.rate_value
              ).toFixed(2) +
              "</strong> "
          ),
          $(".buy-cart-total .J-Subtotal ,.subtotal-price .J-Subtotal").html(
            "<strong>" +
              SAIL_ENV.config.currencyEntity.symbol +
              (
                (e.product_amount / a.head_rate_value) *
                SAIL_ENV.config.currencyEntity.rate_value
              ).toFixed(2) +
              "</strong> "
          ),
          a.cartList.length <= 0 &&
            ($(".J-CartEmpty").show(), $(".J-CartList").hide()),
          "0.00" != t || 0 < e.discount.length
            ? $(".cart-discount,.subtotal-price").addClass("discount--show")
            : $(".cart-discount,.subtotal-price").removeClass("discount--show");
      },
      makeCartCouponHtml: function(e, t) {
        var i = "";
        if (
          (e.is_open && $(".model-discount-tips-bottom").length
            ? $(".model-discount-tips-bottom")
                .addClass("model-discount-tips-bottom--show")
                .find("span")
                .text(e.matched + " " + e.next)
            : $(".model-discount-tips-bottom").removeClass(
                "model-discount-tips-bottom--show"
              ),
          e.is_open && e.is_applicable_match
            ? $(".J-CartDiscountTips")
                .addClass("cart-discount-tips-show")
                .find("em")
                .text(e.matched + " " + e.next)
            : $(".J-CartDiscountTips").removeClass("cart-discount-tips-show"),
          !e.is_auto && e.has_auto
            ? $(".J-DiscountTips").show()
            : $(".J-DiscountTips").hide(),
          0 == e.error_code &&
            t &&
            window.localStorage.setItem("coupon_code", t),
          0 == e.detail.length && 0 == e.error_code)
        )
          return (
            $(".J-CartCouponTips").empty(),
            $(".J-Discount-Info").empty(),
            $(".J-GetCartCouponVal").removeClass("invalid"),
            !1
          );
        0 < e.detail.length && 0 == e.error_code
          ? ($(".J-CartCouponTips").empty(),
            $(".J-Discount-Info").empty(),
            e.detail.map(function(e, t) {
              ((0 == e.is_auto && 1 == e.type) ||
                (0 == e.is_auto && 1 == e.type && 3 == e.coupon_type)) &&
                (i +=
                  '<div class="cart-coupon-item"><span class="iconfont icon-yduizhekou"><i class="coupon-close J-CartCouponClose">×</i>' +
                  e.desc +
                  "</div>");
            }),
            $(".J-GetCartCouponVal")
              .val("")
              .attr("placeholder", "Discount code"),
            $(".J-GetCartCoupon")
              .addClass("jh-btn-disabled")
              .attr("disabled", "disabled"),
            $(".J-GetCartCouponVal").removeClass("invalid"),
            $(".J-CartCouponTips").append(i))
          : 1 == e.error_code
          ? ($(".J-CartCouponTips").find(".erro-tips") &&
              $(".J-CartCouponTips")
                .find(".erro-tips,.error-coupon-box")
                .remove(),
            $(".J-GetCartCouponVal").addClass("invalid"),
            $(".J-CartCouponTips").append(
              '<p class="erro-tips">This code did not match any active gift card or discount. Was it entered correctly?</p>'
            ))
          : 2 == e.error_code
          ? ($(".J-CartCouponTips").find(".erro-tips") &&
              $(".J-CartCouponTips")
                .find(".erro-tips,.error-coupon-box")
                .remove(),
            $(".J-CartCouponTips").append(
              '<div class="error-coupon-box"><span class="iconfont icon-gantanhao"></span><div><strong>' +
                t +
                '</strong> discount code isn’t valid for the items in your cart </div><span class="iconfont icon-close J-RemoveCoupon" ></span></div>'
            ),
            $(".J-GetCartCouponVal")
              .val("")
              .attr("placeholder", "Discount code"),
            $(".J-GetCartCoupon")
              .addClass("jh-btn-disabled")
              .attr("disabled", "disabled"))
          : 3 == e.error_code &&
            ($(".J-CartCouponTips").find(".erro-tips") &&
              $(".J-CartCouponTips")
                .find(".erro-tips,.error-coupon-box")
                .remove(),
            $(".J-CartCouponTips").append(
              '<p class="erro-tips">Your cart does not meet the requirements for the <strong>' +
                $(".J-GetCouponVal").val() +
                "</strong> discount code</p>"
            ));
      },
      makeCartHtml: function(e) {
        var u = "",
          h = "";
        this.cartList.map(function(t, e) {
          var i,
            a = "",
            n =
              SAIL_ENV.config.headcode ==
              SAIL_ENV.config.currencyEntity.currency_code
                ? t.price
                : (
                    parseFloat(t.price / SAIL_ENV.config.headRateValue).toFixed(
                      2
                    ) * SAIL_ENV.config.currencyEntity.rate_value
                  ).toFixed(2);
          if (
            (t.is_remove || parseInt(t.quantity),
            Object.keys(t.attribute).forEach(function(e) {
              a = a ? a + "/" + t.attribute[e] : a + t.attribute[e];
            }),
            (i = t.quantity <= 50 ? 50 : t.quantity),
            0 < $(".J-Cartpag").length)
          ) {
            for (var o = "", r = "", s = "", d = 1; d <= i; d++)
              t.quantity == d
                ? (s +=
                    '<option value="' +
                    d +
                    '" selected="selected"> ' +
                    d +
                    "</option>")
                : (s += '<option value="' + d + '"> ' + d + "</option>");
            0 == t.is_limitoffer ||
            (1 == t.is_limitoffer &&
              t.limitoffer_product_total <= t.limitoffer_product_discount_total)
              ? (o = $("body").hasClass("template5-body")
                  ? ((r =
                      '<div class="types-item quantity "><label>Qty: </label> <span class="iconfont icon-31xiala"></span><select class="J-QtySelect">' +
                      s +
                      "</select> </div>"),
                    '<span class="J-DelCartItem">Remove</span>')
                  : ((r =
                      '<div class="jh-input-number jh-input-number-min">\n                          <span role="button" class="jh-input-number-decrease is-disabled iconfont icon-move J-Reduce"></span>\n                          <span role="button" class="jh-input-number-increase iconfont icon-add J-Add"></span>\n                          <div class="jh-input-box">\n                             <input type="text" class="jh-input J-CartNumber sl-subhead-title" pattern="[0-9]*" data-number="' +
                      t.inventory_quantity +
                      '" value="' +
                      t.quantity +
                      '">\n                          </div>\n                        </div>'),
                    '<span class="iconfont icon-close J-DelCartItem"></span>'))
              : $("body").hasClass("template5-body")
              ? (r =
                  '<div class="types-item quantity "><label>Qty: </label> <span class="iconfont icon-31xiala"></span><select disabled="disabled" class="J-QtySelect"><option value="' +
                  d +
                  '" selected="selected">' +
                  t.quantity +
                  "</option></select> </div>")
              : (r +=
                  '<div class="jh-input-number jh-input-number-min"><div class="jh-input-box">\n                            <input type="text" disabled="disabled" class="jh-input J-CartNumber sl-subhead-title"  data-number="' +
                  t.inventory_quantity +
                  '" value="' +
                  t.quantity +
                  '">\n                          </div></div>');
            var c =
                parseInt(t.inventory_quantity) <= 0
                  ? '<li class="cart-item J-BuyCart product-invalid"><div class="cart-img"><div class="sold-out">Sold Out</div><div class="cart-text">'
                  : '<li class="cart-item J-BuyCart"><div class="cart-img"><div class="cart-text">',
              l =
                "1" == t.is_lower || "1" == t.is_remove
                  ? '<li class="cart-item J-BuyCart product-invalid"><div class="cart-img"><div class="sold-out cart-unav">Unavailable</div><div class="cart-text">'
                  : "";
            h +=
              (l = "" != l ? l : c) +
              '  <a href="' +
              t.preview_url +
              "?handler=" +
              t.product_handler +
              '">    <img src="' +
              (t.image && t.image.file_preview_resize) +
              '" /></a></div>  </div>  <div class="cart-info">    <div class="cart-name"> <a href="' +
              t.preview_url +
              "?handler=" +
              t.product_handler +
              '">' +
              t.product_title +
              '</a></div>    <div class="cart-types">' +
              a +
              '</div>    <div class="cart-price sl-subhead-title" data-price="' +
              parseFloat(t.price / SAIL_ENV.config.headRateValue).toFixed(2) +
              '">' +
              SAIL_ENV.config.currencyEntity.symbol +
              n +
              '</div>    <div class="cart-number">' +
              r +
              '    </div>    <div class="cart-del J-Delcart">' +
              o +
              "    </div>  </div></li>";
          }
          if (0 < $(".J-BuyCart--Box").length) {
            c =
              parseInt(t.inventory_quantity) <= 0
                ? '<li class="buy-product-item J-BuyCart product-invalid"><div class="buy-prod-img"><div class="sold-out">Sold Out</div><div class="buy-text">'
                : '<li class="buy-product-item J-BuyCart"><div class="buy-prod-img"><div class="buy-text">';
            var p = "";
            (l =
              "" !=
              (l =
                "1" == t.is_lower || "1" == t.is_remove
                  ? '<li class="buy-product-item J-BuyCart product-invalid"><div class="buy-prod-img"><div class="sold-out buy-unav">Unavailable</div><div class="buy-text">'
                  : "")
                ? l
                : c),
              0 == t.is_limitoffer ||
              (1 == t.is_limitoffer &&
                t.limitoffer_product_total <=
                  t.limitoffer_product_discount_total)
                ? (p +=
                    '<div class="jh-input-number jh-input-number-min">\n                            <span class="jh-input-number-decrease is-disabled iconfont icon-move J-Reduce"></span>\n                            <span class="jh-input-number-increase iconfont icon-add J-Add"></span>\n                            <div class="jh-input-box">\n                              <input type="text" pattern="[0-9]*" class="jh-input J-CartNumber sl-subhead-title" data-number="' +
                    t.inventory_quantity +
                    '" value="' +
                    t.quantity +
                    '">\n                            </div>\n                          </div>\n                          <div class="product-del"><span class="iconfont icon-close J-DelCartItem"></span></div>')
                : (p +=
                    '<div class="jh-input-number jh-input-number-min"><div class="jh-input-box">\n                              <input type="text" disabled="disabled" class="jh-input J-CartNumber sl-subhead-title" data-number="' +
                    t.inventory_quantity +
                    '" value="' +
                    t.quantity +
                    '">\n                            </div></div>'),
              (u +=
                l +
                '  <a href="' +
                t.preview_url +
                "?handler=" +
                t.product_handler +
                '">    <img src="' +
                (t.image && t.image.file_preview_resize) +
                '" /></a></div>  </div>  <div class="buy-prod-inform">    <div class="product-name"><a href="' +
                t.preview_url +
                "?handler=" +
                t.product_handler +
                '">' +
                t.product_title +
                '</a></div>    <div class="product-type">' +
                a +
                '</div>    <div class="product-price sl-subhead-title" data-price="' +
                parseFloat(t.price / SAIL_ENV.config.headRateValue).toFixed(2) +
                '">' +
                SAIL_ENV.config.currencyEntity.symbol +
                n +
                " </div>" +
                p +
                "  </div></li>");
          }
        }),
          0 < $(".J-BuyProduct").length &&
            $(".J-BuyProduct")
              .empty()
              .append(u),
          0 < $(".J-Cartpag").length &&
            $(".J-Cartpag")
              .empty()
              .append(h),
          0 < e
            ? (99 < e
                ? $(".J-openSlideCart,.head-buycart")
                    .find("i")
                    .show()
                    .text("99+")
                : $(".J-openSlideCart,.head-buycart")
                    .find("i")
                    .show()
                    .text(e),
              $(".J-CartEmpty").hide(),
              $(".J-CartList").show(),
              0 < $(".J-Cartpag li.product-invalid").length &&
                $(".J-Cartpag")
                  .siblings(".total-tips")
                  .show())
            : ($(".J-openSlideCart,.head-buycart")
                .find("i")
                .hide(),
              $(".J-CartEmpty").show(),
              $(".J-CartList").hide());
      }
    }.init());
  }),
  $(function() {
    var i,
      a,
      e,
      n = 0,
      o = !1;
    $(".good-info")
      .find(".add-to-cart")
      .each(function() {
        $(this).hasClass("jh-btn-disabled")
          ? $(this).text("SOLD OUT")
          : $(this).text("ADD TO CART");
      }),
      (i =
        0 < $(".head-notice").length && !$(".head-notice").is(":hidden")
          ? $(".head-notice").outerHeight()
          : 0),
      (e =
        0 < $(".J-NavMenuWidth").length && !$(".J-NavMenuWidth").is(":hidden")
          ? $(".J-NavMenuWidth").outerHeight()
          : 0),
      (a = $(".J-Header").outerHeight() + i - e),
      $(".head-cart-popup").css("top", a),
      $(".headerIndex").length
        ? ((o = !0),
          200 < $(window).scrollTop() &&
            $(".J-HeaderType").removeClass("headerIndex"))
        : $(".J-HeaderType").length &&
          $(".header-main").css("height", $(".J-HeaderType").outerHeight()),
      $(window).scroll(function() {
        var e = $(this).scrollTop();
        0 < $(".J-Header").length &&
          (i < e
            ? ($(".J-Header").addClass("fixed-top"),
              $(".head-cart-popup").css({ top: $(".J-Header").outerHeight() }),
              0 < $(".J-Header").length &&
                $(".J-PageContainer").css(
                  "padding-top",
                  $(".J-Header").outerHeight()
                ),
              !$(".J-Header")
                .find(".head")
                .hasClass("mobile") &&
                768 < window.screen.availWidth &&
                (n =
                  (n <= e
                    ? $(".J-NavWidth").addClass("invisible")
                    : $(".J-NavWidth").removeClass("invisible"),
                  e)))
            : ($(".J-Header").removeClass("fixed-top"),
              $(".head-cart-popup").length &&
                $(".head-cart-popup").css({ top: a }),
              0 < $(".J-Header").length &&
                $(".J-PageContainer").css("padding-top", 0))),
          0 < $(".J-HeaderType").length &&
            (200 < e
              ? ($(".head-notice").hide(),
                (n =
                  (n <= e
                    ? ($(".J-HeaderType").removeClass("fixed-top"),
                      o && $(".J-HeaderType").addClass("headerIndex"))
                    : ($(".J-HeaderType").addClass("fixed-top"),
                      o && $(".J-HeaderType").removeClass("headerIndex")),
                  e)))
              : ($("html, body").hasClass("hidden")
                  ? $(".J-HeaderType").removeClass("headerIndex fixed-top")
                  : ($(".J-HeaderType").addClass("fixed-top"),
                    o && $(".J-HeaderType").addClass("headerIndex")),
                $(".head-notice").show()));
        var t =
          ($(".J-modelAddToCart").is(":hidden")
            ? 0
            : $(".J-modelAddToCart").outerHeight()) +
          ($(".model-discount-tips-bottom").is(":hidden")
            ? 0
            : $(".model-discount-tips-bottom").outerHeight());
        $(".J-footer").css("padding-bottom", t + "px");
      });
  }),
  $(function() {
    window.sessionStorage;
    (window.SAIL_ENV.Product = {
      sku_id: "",
      imgSrc: "",
      skuDetail: null,
      referrer_url: "",
      bannerSlides: null,
      bannerSlideModel: null,
      isClick: !1,
      init: function() {
        this.event();
      },
      event: function() {
        var i = this;
        if (
          ($(".pop-close,.product-types-box .jh-btn-cart,.J-Mask").click(
            function() {
              $(".product-types-box").removeClass("product-types-box--show"),
                SAIL_ENV.config.mask_layer("hide");
            }
          ),
          $(document).on("click", ".J-openProductPopup", function() {
            $(".head-cart-popup").removeClass("head-cart-popup--show"),
              (SAIL_ENV.config.scrollPosition = $(window).scrollTop()),
              i.getProductDetail({
                product_id: $(this)
                  .closest(".grid-item")
                  .data("id")
              });
          }),
          window.screen.availWidth <= 768)
        ) {
          if (
            ($(".product-details-banner").removeClass("view-large-image"),
            $(".product-banner").length)
          )
            if (1 < $(".swiper-slide").length) {
              var e = $(".gallery-top .swiper-slide"),
                a = new Swiper(".gallery-top", {
                  autoHeight: !0,
                  spaceBetween: 1,
                  slidesPerView: 1,
                  pagination: { el: ".swiper-pagination", type: "fraction" }
                });
              i.bannerSlideModel = function(i) {
                e.each(function(e, t) {
                  $(this).data("id") == i && a.slideTo(e, 500, !1);
                });
              };
            } else
              $(".banner")
                .children(".swiper-pagination")
                .hide();
        } else
          $(".J-Popup").click(function(e) {
            var t = $(".product-details-popup");
            t.is(e.target) || 0 !== t.has(e.target).length || i.closePopup();
          });
        $(".J-close-popup,.J-PopupContainer .jh-btn-cart").click(function() {
          i.closePopup();
        }),
          $(".JH-FixedBuyCart").click(function() {
            $(".product .JH-BuyCart").click();
          }),
          $(".J-Overview")
            .addClass("active")
            .siblings()
            .removeClass("active");
      },
      closePopup: function() {
        SAIL_ENV.config.mask_layer("hide"),
          $(".flipclock")
            .empty()
            .removeClass(SAIL_ENV.config.holidayStyle),
          $(".J-sharePopup").length && $(".J-sharePopup").remove(),
          $(".J-PopupContainer")
            .find(".JH-BuyCart")
            .removeClass("jh-disabled")
            .removeAttr("disabled"),
          $(".J-PopupContainer")
            .find(".btn-text")
            .text("BUY"),
          $(".J-PageContainer")
            .find(".JH-Columns")
            .show(),
          $(".J-Popup").removeClass("sece--show"),
          $(".J-PopupContainer")
            .find(
              ".J-PopupGroupProductBottom,.J-PopupGroupProductTop,.J-PopupComment,.J-productList"
            )
            .empty(),
          $(".J-PopupContainer")
            .find(".J-QtySelect")
            .val("1"),
          $(".product-details-popup,.sece").animate({ scrollTop: 0 }),
          window.history.replaceState({}, 0, this.referrer_url);
      },
      productTyle: function() {
        var e = this;
        $(".J-ProductTypes").click(function() {
          (e.isClick = !0),
            $(this)
              .parents("ul")
              .siblings("p")
              .children(".J-TypeVal")
              .text($(this).text()),
            $(this)
              .addClass("active")
              .siblings()
              .removeClass("active"),
            e.getProductPrices($(this).parents(".J-Product"));
        });
      },
      getProductPrices: function(o) {
        var r = this,
          s = "",
          d = "",
          e = o,
          c = "",
          t = "";
        if (
          ("select" ==
          (0 < $(".J-SwitchType").length ? $(".J-SwitchType").val() : "tag")
            ? e.find(".J-Attribute").each(function() {
                (c += $.trim(
                  $(this)
                    .find(".J-Value")
                    .find("option:selected")
                    .data("title-code")
                )),
                  (t +=
                    "" == t
                      ? $.trim(
                          $(this)
                            .find(".J-Value")
                            .find("option:selected")
                            .data("title")
                        )
                      : "/" +
                        $.trim(
                          $(this)
                            .find(".J-Value")
                            .find("option:selected")
                            .data("title")
                        ));
              })
            : e.find(".J-Attribute").each(function() {
                (c += $.trim(
                  $(this)
                    .find(".J-Value")
                    .find(".active")
                    .data("title-code")
                )),
                  (t +=
                    "" == t
                      ? $.trim(
                          $(this)
                            .find(".J-Value")
                            .find(".active")
                            .data("title")
                        )
                      : "/" +
                        $.trim(
                          $(this)
                            .find(".J-Value")
                            .find(".active")
                            .data("title")
                        ));
              }),
          (!$(".product-types-box").hasClass("product-types-box--show") &&
            $(".product-details-popup").is(":hidden")) ||
            (r.skuDetail &&
              0 < r.skuDetail.sku_list.length &&
              r.skuDetail.sku_list.map(function(e, t) {
                var i =
                    SAIL_ENV.config.headcode ==
                    SAIL_ENV.config.currencyEntity.currency_code
                      ? e.price
                      : (
                          e.jsPrice * SAIL_ENV.config.currencyEntity.rate_value
                        ).toFixed(2),
                  a =
                    SAIL_ENV.config.headcode ==
                    SAIL_ENV.config.currencyEntity.currency_code
                      ? e.compare_at_price
                      : (
                          e.jsCompareAtPrice *
                          SAIL_ENV.config.currencyEntity.rate_value
                        ).toFixed(2);
                if ($.trim(e.title_code) == c) {
                  (s = e.id || ""),
                    (d = s),
                    (r.imgSrc =
                      e.image.file_preview ||
                      r.skuDetail.default_image.file_preview),
                    1 == e.data_limitoffer_open
                      ? o
                          .find(".J-ProductsTisp")
                          .show()
                          .find("span")
                          .text(
                            "Discount for the first " +
                              e.data_limitoffer_num +
                              " items"
                          )
                      : o
                          .find(".J-ProductsTisp")
                          .hide()
                          .find("span")
                          .text(""),
                    o.parents().hasClass("product-types-box") &&
                      ((s = r.isStock(e, $(".product-types-box"), !0)),
                      $(".J-Pay-Price")
                        .text(SAIL_ENV.config.currencyEntity.symbol + i)
                        .attr("data-price", e.jsPrice),
                      $(".J-Pay-Price").attr("data-seller-price", e.price),
                      0 == a || parseFloat(a) <= parseFloat(i)
                        ? $(".J-Orig-Price").text(" ")
                        : $(".J-Orig-Price")
                            .text(SAIL_ENV.config.currencyEntity.symbol + a)
                            .attr("data-price", e.compare_at_price),
                      $(".J-Product-Img img").attr(
                        "src",
                        e.image.file_preview
                      ));
                  var n = "";
                  o.parents().hasClass("product-details-popup") &&
                    ((n = o || o.parents(".J-Popup").find(".fixed-add-cart")),
                    (s = r.isStock(e, $(".product-details-popup"), !0)),
                    n
                      .find(".pay-price")
                      .text(
                        SAIL_ENV.config.currencyEntity.currency_code +
                          " " +
                          SAIL_ENV.config.currencyEntity.symbol +
                          i
                      )
                      .attr("data-price", e.jsPrice),
                    n.find(".pay-price").attr("data-seller-price", e.price),
                    0 == a
                      ? n.find(".orig-price").text(" ")
                      : n
                          .find(".orig-price")
                          .text(
                            SAIL_ENV.config.currencyEntity.currency_code +
                              " " +
                              SAIL_ENV.config.currencyEntity.symbol +
                              a
                          )
                          .attr("data-price", e.jsCompareAtPrice)),
                    "function" == typeof r.bannerSlides &&
                      r.bannerSlides(e.image_id);
                }
              })),
          !$(".product-types-box").length ||
            !$(".product-types-box").hasClass("product-types-box--show"))
        )
          if (
            0 < $(".JH-page-location").length &&
            "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val()
          )
            $(".J-SkuList").length &&
              $(".J-SkuList")
                .find("span")
                .each(function() {
                  $.trim(c) == $.trim($(this).data("title-code")) &&
                    ((s = $(this).data("id") || ""),
                    (d = s),
                    (s = r.isStock($(this), o)),
                    window.paypalisremembered &&
                    window.paypalisremembered.paypal &&
                    0 < parseFloat($(this).data("price"))
                      ? ($(".J-BuyNowBtn").hide(), $(".J-PaypalBtn").show())
                      : ($(".J-BuyNowBtn").show(), $(".J-PaypalBtn").hide()));
                }),
              1 == $(".J-SkuList").find("span").length &&
                ((s = $(".J-SkuList")
                  .find("span")
                  .eq(0)
                  .data("id")),
                (s = r.isStock(
                  $(".J-SkuList")
                    .find("span")
                    .eq(0),
                  o
                )),
                window.paypalisremembered &&
                window.paypalisremembered.paypal &&
                0 <
                  parseFloat(
                    $(".J-SkuList")
                      .find("span")
                      .eq(0)
                      .data("price")
                  )
                  ? ($(".J-BuyNowBtn").hide(), $(".J-PaypalBtn").show())
                  : ($(".J-BuyNowBtn").show(), $(".J-PaypalBtn").hide()));
          else {
            var i = o
              .parents(".JH-Columns")
              .find(".product-code")
              .val();
            $(".J-SkuList-" + i).length &&
              $(".J-SkuList-" + i)
                .find("span")
                .each(function() {
                  $.trim(c) == $.trim($(this).data("title-code")) &&
                    ((s = $(this).data("id") || ""),
                    (d = s),
                    (s = r.isStock($(this), o)),
                    window.paypalisremembered &&
                    window.paypalisremembered.paypal &&
                    0 < parseFloat($(this).data("price"))
                      ? ($(".J-BuyNowBtn").hide(), $(".J-PaypalBtn").show())
                      : ($(".J-BuyNowBtn").show(), $(".J-PaypalBtn").hide()));
                }),
              1 == $(".J-SkuList-" + i).find("span").length &&
                ((s = $(".J-SkuList-" + i)
                  .find("span")
                  .eq(0)
                  .data("id")),
                (d = s),
                (s = r.isStock(
                  $(".J-SkuList-" + i)
                    .find("span")
                    .eq(0),
                  o
                )),
                window.paypalisremembered &&
                window.paypalisremembered.paypal &&
                0 <
                  parseFloat(
                    $(".J-SkuList-" + i)
                      .find("span")
                      .eq(0)
                      .data("price")
                  )
                  ? ($(".J-BuyNowBtn").hide(), $(".J-PaypalBtn").show())
                  : ($(".J-BuyNowBtn").show(), $(".J-PaypalBtn").hide()));
          }
        if (
          ($(".J-SkuList")
            .find("span")
            .each(function() {
              var e, t;
              if (
                ((e =
                  SAIL_ENV.config.headcode ==
                  SAIL_ENV.config.currencyEntity.currency_code
                    ? $(this).data("orig-price")
                    : (
                        $(this).data("price") *
                        SAIL_ENV.config.currencyEntity.rate_value
                      ).toFixed(2)),
                (t =
                  SAIL_ENV.config.headcode ==
                  SAIL_ENV.config.currencyEntity.currency_code
                    ? $(this).data("orig-compare-at-price")
                    : (
                        $(this).data("compare-at-price") *
                        SAIL_ENV.config.currencyEntity.rate_value
                      ).toFixed(2)),
                c == $.trim($(this).data("title-code")))
              ) {
                (r.sku_id = $.trim($(this).data("id"))),
                  (r.imgSrc =
                    $(this).data("image-url") ||
                    o
                      .siblings(".recom-item")
                      .find(".gallery-top")
                      .find("img")
                      .first()
                      .attr("src")),
                  1 == $.trim($(this).data("limitoffer-open"))
                    ? $(".J-ProductsTisp")
                        .show()
                        .find("span")
                        .text(
                          "Discount for the first " +
                            $(this).data("limitoffer-num") +
                            " items"
                        )
                    : $(".J-ProductsTisp")
                        .hide()
                        .find("span")
                        .text(""),
                  "0" == $(".J-isPreview").val() &&
                    r.isClick &&
                    $plug.replaceParam(
                      window.location.href,
                      "variant",
                      r.sku_id
                    ),
                  $(".J-SingleProductImg")
                    .children()
                    .find("img")
                    .attr("src", $(this).data("image-url")),
                  $(".J-modelAddToCart")
                    .find(".product-img")
                    .children("img")
                    .attr("src", $(this).data("image-url")),
                  $(".paddL80")
                    .children(".price")
                    .find(".pay-price")
                    .text(
                      e +
                        " " +
                        SAIL_ENV.config.currencyEntity.currency_code +
                        SAIL_ENV.config.currencyEntity.symbol
                    )
                    .attr("data-price", $(this).data("price")),
                  $(".J-modelAddToCart")
                    .find(".pay-price")
                    .text(
                      SAIL_ENV.config.currencyEntity.currency_code +
                        " " +
                        SAIL_ENV.config.currencyEntity.symbol +
                        e
                    )
                    .attr("data-price", $(this).data("price")),
                  $(".paddL80")
                    .children(".price")
                    .find(".pay-price")
                    .attr("data-seller-price", $(this).data("orig-price")),
                  $(".J-modelAddToCart")
                    .find(".pay-price")
                    .attr("data-seller-price", $(this).data("orig-price")),
                  0 == t || parseFloat(t) <= parseFloat(e)
                    ? $(".J-modelAddToCart")
                        .find(".orig-price")
                        .text(" ")
                    : $(".J-modelAddToCart")
                        .find(".orig-price")
                        .text(
                          SAIL_ENV.config.currencyEntity.currency_code +
                            " " +
                            SAIL_ENV.config.currencyEntity.symbol +
                            t
                        )
                        .attr("data-price", $(this).data("compare-at-price")),
                  0 == t || parseFloat(t) <= parseFloat(e)
                    ? $(".paddL80")
                        .children(".price")
                        .find(".orig-price")
                        .text(" ")
                    : $(".paddL80")
                        .children(".price")
                        .find(".orig-price")
                        .text(
                          t +
                            " " +
                            SAIL_ENV.config.currencyEntity.currency_code +
                            SAIL_ENV.config.currencyEntity.symbol
                        )
                        .attr("data-price", $(this).data("compare-at-price"));
                var i = $(this).attr("banner-id");
                if (
                  768 < window.screen.availWidth &&
                  $(".product-banner").length
                ) {
                  var a = $(".product-banner .gallery-top")
                    .find(".swiper-slide")
                    .eq(0)
                    .data("id");
                  $(".product-banner .gallery-top")
                    .find(".swiper-slide")
                    .each(function() {
                      $(this).data("id") == i &&
                        a != i &&
                        ($(this)
                          .children("img")
                          .attr(
                            "src",
                            $(this)
                              .children("img")
                              .data("original")
                          ),
                        $(".product-banner .gallery-top")
                          .find(".swiper-wrapper")
                          .prepend($(this)));
                    });
                }
                0 != i &&
                  ($(".recommend")
                    .children()
                    .hasClass("J-ProductSwiper") &&
                    "function" == typeof bannerSlide &&
                    bannerSlide($(this).attr("banner-id")),
                  window.screen.availWidth < 768 &&
                    $(".product-banner").length &&
                    r.bannerSlideModel &&
                    r.bannerSlideModel($(this).attr("banner-id")));
              }
            }),
          -1 == s)
        )
          return !1;
        if (s && "" != s)
          "0" == $(".J-isPreview").val() &&
            (0 < $(".product-types-box").length &&
              $(".product-types-box")
                .find(".JH-BuyCart")
                .removeClass("jh-disabled")
                .removeAttr("disabled"),
            0 < $(".product-types-box").length &&
              $(".product-types-box")
                .find(".btn-text")
                .text("ADD TO CART"),
            0 < $(".J-modelAddToCart").length &&
              $(".J-modelAddToCart")
                .find(".jh-btn")
                .removeClass("jh-disabled")
                .removeAttr("disabled"),
            0 < o.find(".JH-BuyCart").length &&
              o
                .find(".JH-BuyCart")
                .removeClass("jh-disabled")
                .removeAttr("disabled"),
            0 < o.find(".JH-BuyCart").length &&
            $("body").hasClass("template5-body")
              ? o.find(".btn-text").text("BUY")
              : o.find(".btn-text").text("ADD TO CART"),
            0 < o.find(".JH-BuyPayCart").length &&
              o
                .find(".JH-BuyPayCart")
                .removeClass("jh-disabled")
                .removeAttr("disabled"),
            o.find(".Paypal-buy-now").length &&
              o.find(".Paypal-buy-now").show(),
            o.find(".payment-options").length &&
              o.find(".payment-options").show(),
            $(".fixed-add-cart").length &&
              $(".fixed-add-cart")
                .find(".JH-FixedBuyCart")
                .removeClass("jh-disabled")
                .removeAttr("disabled"),
            $(".fixed-add-cart").length &&
              $(".fixed-add-cart")
                .find(".jh-btn")
                .text("BUY"));
        else if ("0" == $(".J-isPreview").val()) {
          var a = 0 == s ? "SOLD OUT" : "Unavailable";
          return (
            "" == d && (a = "Unavailable"),
            0 < $(".product-types-box").length &&
              $(".product-types-box")
                .find(".JH-BuyCart")
                .addClass("jh-disabled")
                .attr("disabled", "disabled"),
            0 < $(".product-types-box").length &&
              $(".product-types-box")
                .find(".btn-text")
                .text(a),
            0 < $(".J-modelAddToCart").length &&
              $(".J-modelAddToCart")
                .find(".jh-btn")
                .addClass("jh-disabled")
                .attr("disabled", "disabled"),
            0 < o.find(".JH-BuyCart").length &&
              o
                .find(".JH-BuyCart")
                .addClass("jh-disabled")
                .attr("disabled", "disabled"),
            0 < o.find(".JH-BuyCart").length && o.find(".btn-text").text(a),
            0 < o.find(".JH-BuyPayCart").length &&
              o
                .find(".JH-BuyPayCart")
                .addClass("jh-disabled")
                .attr("disabled", "disabled"),
            o.find(".Paypal-buy-now").length &&
              o.find(".Paypal-buy-now").hide(),
            o.find(".payment-options").length &&
              o.find(".payment-options").hide(),
            o.find(".J-BuyNowBtn").length && o.find(".J-BuyNowBtn").hide(),
            $(".fixed-add-cart").length &&
              $(".fixed-add-cart")
                .find(".JH-FixedBuyCart")
                .addClass("jh-disabled")
                .attr("disabled", "disabled"),
            $(".fixed-add-cart").length &&
              $(".fixed-add-cart")
                .find(".jh-btn")
                .text(a),
            !1
          );
        }
        if (
          0 < $(".JH-page-location").length &&
          "" == $(".JH-page-location").val() &&
          0 < $(".main.recommend.JH-Columns").length
        ) {
          var n =
            "bannerSlide_" +
            (i = o
              .parents(".JH-Columns")
              .find(".product-code")
              .val());
          $(".J-SkuList-" + i)
            .find("span")
            .each(function() {
              var e =
                  SAIL_ENV.config.headcode ==
                  SAIL_ENV.config.currencyEntity.currency_code
                    ? $(this).data("orig-price")
                    : (
                        $(this).data("price") *
                        SAIL_ENV.config.currencyEntity.rate_value
                      ).toFixed(2),
                t =
                  SAIL_ENV.config.headcode ==
                  SAIL_ENV.config.currencyEntity.currency_code
                    ? $(this).data("orig-compare-at-price")
                    : (
                        $(this).data("compare-at-price") *
                        SAIL_ENV.config.currencyEntity.rate_value
                      ).toFixed(2);
              if (c == $.trim($(this).data("title-code"))) {
                (r.sku_id = $.trim($(this).data("id"))),
                  o
                    .find(".pay-price")
                    .text(
                      SAIL_ENV.config.currencyEntity.currency_code +
                        " " +
                        SAIL_ENV.config.currencyEntity.symbol +
                        e
                    )
                    .attr("data-price", $(this).data("price")),
                  o
                    .find(".pay-price")
                    .attr("data-seller-price", $(this).data("orig-price")),
                  0 == t || parseFloat(t) <= parseFloat(e)
                    ? o.find(".orig-price").text(" ")
                    : o
                        .find(".orig-price")
                        .text(
                          SAIL_ENV.config.currencyEntity.currency_code +
                            " " +
                            SAIL_ENV.config.currencyEntity.symbol +
                            t
                        )
                        .attr("data-price", $(this).data("compare-at-price"));
                var i = $(this).attr("banner-id") || $(this).prop("banner-id");
                0 != i && window[n] && window[n](i),
                  1 == $.trim($(this).data("limitoffer-open"))
                    ? o
                        .parents(".JH-Columns")
                        .find(".J-ProductsTisp")
                        .show()
                        .find("span")
                        .text(
                          "Discount for the first " +
                            $.trim($(this).data("limitoffer-num")) +
                            " items"
                        )
                    : o
                        .parents(".JH-Columns")
                        .find(".J-ProductsTisp")
                        .hide()
                        .find("span")
                        .text("");
              }
            });
        }
        $(".J-HeadcartImg")
          .find("img")
          .attr("src", r.imgSrc),
          $(".J-modelAddToCart")
            .find(".attribute")
            .text(t);
      },
      replaceImg: function(e) {
        return e.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(e, t) {
          return e.replace(
            /src/gi,
            'class="J-LazyLoad" src="img/default.png"  data-original'
          );
        });
      },
      sliderbannerJs: function() {
        var e = new Swiper(".gallery-thumbs", {
            watchOverflow: !0,
            slidesPerView: 6,
            spaceBetween: 10,
            watchSlidesVisibility: !0,
            breakpointsInverse: !0,
            breakpoints: {
              768: { direction: "vertical", slidesPerColumnFill: "column" }
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          }),
          i = new Swiper(".gallery-top", {
            watchOverflow: !0,
            autoplay: !1,
            slidesPerView: 1,
            autoHeight: !1,
            breakpoints: { 768: { autoHeight: !0 } },
            pagination: { el: ".swiper-pagination", type: "fraction" },
            thumbs: { swiper: e }
          }),
          a = $(".gallery-top .swiper-slide");
        this.bannerSlides = function(t) {
          a.each(function(e) {
            $(this).data("id") == t && i.slideTo(e, 500, !1);
          });
        };
      },
      isStock: function(e, t, i) {
        if (
          (0 < t.find(".J-InventoryQuantity").length &&
            t.find(".J-InventoryQuantity").text(""),
          i)
        ) {
          var a =
            t
              .find(".J-Product")
              .find(".J-ProductNumber")
              .val() ||
            t
              .children()
              .find(".J-QtySelect")
              .find("option:selected")
              .val();
          return (
            t
              .find(".J-Product")
              .find(".J-ProductNumber")
              .data("inventory-quantity", e.inventory_quantity),
            t
              .children()
              .find(".J-QtySelect")
              .data("inventory-quantity", e.inventory_quantity),
            e.inventory_quantity <= 0
              ? 0
              : a > parseInt(e.inventory_quantity)
              ? ($plug.testModal(
                  e.inventory_quantity,
                  !$(".J-Mask").is(":hidden")
                ),
                t
                  .find(".J-Product")
                  .find(".J-ProductNumber")
                  .val(parseInt(e.inventory_quantity)),
                t
                  .parents(".JH-Columns")
                  .find(".J-QtySelect")
                  .val(parseInt(e.inventory_quantity)),
                -1)
              : e.id
          );
        }
        a =
          t
            .parents(".JH-Columns")
            .find(".J-ProductNumber")
            .val() ||
          t
            .children()
            .find(".J-QtySelect")
            .find("option:selected")
            .val();
        return (
          t
            .parents(".JH-Columns")
            .find(".J-ProductNumber")
            .data("inventory-quantity", e.data("inventory-quantity")),
          t
            .children()
            .find(".J-QtySelect")
            .data("inventory-quantity", e.data("inventory-quantity")),
          e.data("inventory-quantity") <= 0
            ? 0
            : a > e.data("inventory-quantity")
            ? ($plug.testModal(
                e.data("inventory-quantity"),
                !$(".J-Mask").is(":hidden")
              ),
              t
                .parents(".JH-Columns")
                .find(".J-ProductNumber")
                .val(e.data("inventory-quantity")),
              t
                .parents(".JH-Columns")
                .find(".J-QtySelect")
                .val(e.data("inventory-quantity")),
              -1)
            : e.data("id")
        );
      }
    }),
      SAIL_ENV.Product.init();
  }),
  $(function() {
    window.sessionStorage;
    var e = !1,
      t = !1;
    if (
      (
      0 < $(".JH-page-location").length &&
        "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val())
    ) {
      if (
        ($(".J-ShareSource").length &&
          "" != $(".J-ShareSource").val() &&
          window.sessionStorage.setItem(
            "share_source",
            $(".J-ShareSource").val()
          ),
        -1 < window.location.href.indexOf("variant"))
      ) {
        var i = window.location.href.split("variant=")[1];
        $(".J-SkuList").length &&
          $(".J-SkuList")
            .find("span")
            .each(function() {
              if ($.trim(i) == $.trim($(this).data("id"))) {
                var e = $(this).attr("banner-id");
                0 != e &&
                  "function" == typeof bannerSlide &&
                  bannerSlide($(this).attr("banner-id")),
                  768 < window.screen.availWidth &&
                    $(".product-banner").length &&
                    $(".product-banner .gallery-top")
                      .find(".swiper-slide")
                      .each(function() {
                        $(this).data("id") == e &&
                          ($(this)
                            .children("img")
                            .attr(
                              "src",
                              $(this)
                                .children("img")
                                .data("original")
                            ),
                          $(".product-banner .gallery-top")
                            .find(".swiper-wrapper")
                            .prepend($(this)));
                      });
              }
            });
      }
      $(".J-Product").find(".J-ProductNumber").length &&
        "" == $(".J-ProductNumber").val() &&
        $(".J-ProductNumber").val(1);
    }
    ("PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val() ||
      -1 < $("body").hasClass("template5-body")) &&
      $(".product-details").append(window.DetallesHtml),
      $(document).on(
        "click",
        ".J-PopupContainer .J-quickToReview,.J-PopupContainer .J-Pages span",
        function() {
          768 < window.screen.availWidth
            ? $(".sece").animate(
                {
                  scrollTop:
                    $(".sece").scrollTop() + $(".J-PopupComment").position().top
                },
                500
              )
            : $(".product-details-popup").animate(
                {
                  scrollTop:
                    $(".product-details-popup").scrollTop() +
                    $(".J-PopupComment").position().top
                },
                500
              );
        }
      ),
      $(document).on("click", ".J-Overview", function() {
        $(".product-details-popup").animate({ scrollTop: 0 }, 500),
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
      }),
      $(document).on("click", ".J-Detail", function() {
        $(".product-details-popup").animate(
          { scrollTop: $(".J-Productdetails").position().top },
          500
        ),
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
      }),
      $(document).on("click", ".J-Related", function() {
        $(".product-details-popup").animate(
          {
            scrollTop:
              $(".product-details-popup").scrollTop() +
              $(".model-recommend").position().top
          },
          500
        ),
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
      }),
      $(".J-isCartPage").length &&
        window.screen.availWidth < 768 &&
        ($(".J-backPrev").show(),
        $(".J-backPrev").click(function() {
          window.history.back(-1);
        })),
      $(document).on(
        "click",
        ".J-TestModalClose, .J-TestModalMask",
        function() {
          $(".J-TestModalMask")
            .hide()
            .remove(),
            0 < $(".J-TestModal").length &&
              $(".J-TestModal")
                .hide()
                .remove();
        }
      ),
      $(".J-Tips").on("mouseover", function() {
        $(this)
          .parent(".order-write-item")
          .find(".phone-tips")
          .addClass("phone-tips--show");
      }),
      $(".J-Tips").on("mouseout", function() {
        $(this)
          .parent(".order-write-item")
          .find(".phone-tips")
          .removeClass("phone-tips--show");
      }),
      $(".J-CloseCartPopup").click(function() {
        $(".head-cart-popup").removeClass("head-cart-popup--show");
      }),
      768 < window.screen.availWidth
        ? ($(".J-TestModalClose").click(function() {
            SAIL_ENV.config.mask_layer("hide"),
              0 < $(".J-TestModal").length && $(".J-TestModal").hide();
          }),
          $(document).on("click", ".close", function() {
            SAIL_ENV.config.show_buycart &&
              ((SAIL_ENV.config.show_buycart = !1),
              SAIL_ENV.config.mask_layer("hide"),
              $(".J-BuyCart--Box").removeClass("buy-cart--right"));
          }))
        : ($(".J-Mask").click(function() {
            SAIL_ENV.config.mask_layer("hide"),
              0 < $(".J-TestModal").length && $(".J-TestModal").hide(),
              (t = !1),
              $(".J-HeadSearchBox").removeClass("head-search--show"),
              $(".J-Mask").removeClass("white-opacity"),
              SAIL_ENV.config.mask_layer("hide"),
              screen.width < 768 &&
                $(".header,.head-notice").removeClass("zindex");
          }),
          $(".close").click(function() {
            SAIL_ENV.config.mask_layer("hide"),
              $(".J-NavShow").removeClass("close"),
              $(".J-PageContainer").removeClass("PageContainer--show"),
              $(".J-Nav-Drawer").removeClass("drawer--left"),
              0 < $(".J-TestModalMask").length &&
                ($(".J-TestModal")
                  .hide()
                  .remove(),
                $(".J-TestModalMask")
                  .hide()
                  .remove());
          }),
          ($.fn.grooveshark = function() {
            return this.each(function() {
              var i = this,
                a = $(this).width();
              $(".J-MenuPanel", i)
                .css("left", a + "px")
                .hide(),
                $(".J-Menu span", i).click(function() {
                  var e = $(this).attr("rel");
                  $(".J-Menu li", i).each(function() {
                    var e = $(this);
                    e.hasClass("active") && e.removeClass("active");
                  }),
                    $(this)
                      .parents("li")
                      .addClass("active"),
                    $(".nav-menu-title h3").text(
                      $(this)
                        .parents("li")
                        .text()
                    ),
                    $(".J-MenuTitle span").show();
                  var t = $(".J-Menu").height();
                  $("." + e, i)
                    .css({ "z-index": 2, "min-height": t })
                    .show()
                    .animate({ left: "0px" }, 500, function() {
                      $(".J-MenuPanel", i).each(function() {
                        0 == $(this).hasClass(e) &&
                          $(this)
                            .css({ left: a + "px", "z-index": 1 })
                            .hide();
                      });
                    });
                });
            });
          }),
          ($.fn.backhome = function() {
            return this.each(function() {
              var e = $(this).width();
              $(".active", this).each(function() {
                $(this).removeClass(".active");
              }),
                $(".J-MenuTitle h3").text("Menu"),
                $(".J-MenuTitle span").hide(),
                $(".J-MenuPanel", this).each(function() {
                  $(this).animate({ left: e + "px" }, 500, function() {
                    $(this).hide();
                  });
                });
            });
          }),
          $(".J-MenuMain").grooveshark(),
          $(".J-backhome").click(function() {
            $(".J-MenuMain").backhome();
          }),
          $(".close").click(function() {
            SAIL_ENV.config.show_buycart &&
              ((SAIL_ENV.config.show_buycart = !1),
              SAIL_ENV.config.mask_layer("hide"),
              $(".J-BuyCart--Box").removeClass("buy-cart--right"));
          })),
      $(".J-NavMenuWidth")
        .find(".nav-item")
        .each(function(e) {
          $(this)
            .children()
            .hasClass("nav-item-down-menu")
            ? $(this)
                .children(":first")
                .attr("href", "javascript:;")
            : $(this).addClass("nav-single");
        }),
      $(".nav-drawer .nav-item").each(function(e) {
        1 < $(this).children().length &&
          $(this)
            .children(":first")
            .attr("href", "javascript:;");
      });
    function a(e, t) {
      (this.el = e || {}),
        (this.multiple = t || !1),
        this.el
          .find(".nav-item > a")
          .on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
    }
    if (
      ((a.prototype.dropdown = function(e) {
        var t = e.data.el,
          i = $(this),
          a = i.next();
        a.slideToggle(),
          i.parent().toggleClass("active"),
          e.data.multiple ||
            t
              .find(".nav-item-down-menu")
              .not(a)
              .slideUp()
              .parent()
              .removeClass("active");
      }),
      new a($(".nav-drawer"), !1),
      $(document).on("click", ".J-HeadSearch", function() {
        screen.width < 768
          ? $(".J-HeadSearchBox").css({ top: 0 })
          : $(".J-HeadSearchBox").css({
              top: $(".J-HeadSearch")
                .parents(".header")
                .height()
            }),
          t
            ? ((t = !1),
              $(".J-HeadSearchBox").removeClass("head-search--show"),
              $(".J-HeadSearchBox").css({
                top:
                  $(".J-HeadSearch")
                    .parents(".header")
                    .height() - 1
              }))
            : ((t = !0),
              $(".J-HeadSearchBox").addClass("head-search--show"),
              $(".J-HeadSearchBox")
                .find("input")
                .focus(),
              screen.width < 768 &&
                ($(this)
                  .parents()
                  .find(".header,.head-notice")
                  .addClass("zindex"),
                $("body").hasClass("template4-body") &&
                  $(".J-Mask").addClass("white-opacity"),
                SAIL_ENV.config.mask_layer("show")));
      }),
      "0" == $(".J-HeadSearchBox").height() &&
        $(".J-HeadSearchBox")
          .find("input")
          .val(""),
      $(".J-openSearchBox").click(function() {
        $(".mobile-search-box").addClass("mobile-search-box--show"),
          $(".mobile-search-box")
            .find("input")
            .focus();
      }),
      $(".J-closeSearchBox").click(function() {
        $(".mobile-search-box").removeClass("mobile-search-box--show");
      }),
      $(".J-OrderBuy").click(function() {
        e
          ? ((e = !1),
            $(this).removeClass("order-buy-cart--show"),
            $(".J-OrderListBox").slideUp(500),
            $(".show-order").text("Show order summary"))
          : ((e = !0),
            $(this).addClass("order-buy-cart--show"),
            $(".J-OrderListBox").slideDown(500),
            $(".show-order").text("Hide order summary"));
      }),
      $(".newsletter-email").focus(function() {
        $(".newsletter-email")
          .removeClass("disable-input")
          .val("");
      }),
      $(".J-modelAddToCart").length)
    ) {
      $(".J-modelAddToCart")
        .find(".product-img")
        .children("img")
        .attr(
          "src",
          $(".J-SkuList")
            .find("span:first")
            .data("image-url")
        );
      var n =
        $(".product-details-box").length &&
        $(".product-details-box").offset().top - 40;
      $(window).on("scroll", function() {
        var e = $(document).scrollTop();
        n <= e
          ? $(".J-modelAddToCart")
              .addClass("fixed-bottom")
              .css(
                "bottom",
                $(".model-discount-tips-bottom").is(":hidden")
                  ? 0
                  : $(".model-discount-tips-bottom").height()
              )
          : $(".J-modelAddToCart").removeClass("fixed-bottom");
      }),
        $(".J-modelAddToCart .jh-btn").click(function() {
          $(".product .JH-BuyCart").click();
        });
    }
    if (
      ($(document).on("click", ".payment-options", function() {
        var e,
          t = $(this).parents(".JH-Columns"),
          i = "",
          a = "",
          n = null,
          o = 0,
          r = 0;
        if (
          ($(".template2-body")
            .find(".J-Product")
            .addClass("relative"),
          0 < $(".JH-page-location").length &&
          "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val()
            ? (SAIL_ENV.config.mask_layer("show"),
              768 < window.screen.availWidth
                ? $(".buy-now-main").show()
                : $(".buy-now-main").addClass("buy-now-main--show"))
            : (SAIL_ENV.config.mask_layer("show"),
              768 < window.screen.availWidth
                ? t.find(".buy-now-main").show()
                : t.find(".buy-now-main").addClass("buy-now-main--show")),
          (e =
            0 < t.find(".J-ProductNumber").length
              ? t.find(".J-ProductNumber").val()
              : 1),
          0 < t.find(".J-Attribute").find("select").length
            ? t
                .find(".J-Product")
                .find(".J-Attribute")
                .each(function() {
                  (i += $.trim(
                    $(this)
                      .find(".J-Value")
                      .find("option:selected")
                      .data("title-code")
                  )),
                    (a +=
                      "" == a
                        ? $.trim(
                            $(this)
                              .find(".J-Value")
                              .find("option:selected")
                              .data("title")
                          )
                        : "/" +
                          $.trim(
                            $(this)
                              .find(".J-Value")
                              .find("option:selected")
                              .data("title")
                          ));
                })
            : t
                .find(".J-Product")
                .find(".J-Attribute")
                .each(function() {
                  (i += $.trim(
                    $(this)
                      .find(".J-Value")
                      .find(".active")
                      .data("title-code")
                  )),
                    (a +=
                      "" == a
                        ? $.trim(
                            $(this)
                              .find(".J-Value")
                              .find(".active")
                              .data("title")
                          )
                        : "/" +
                          $.trim(
                            $(this)
                              .find(".J-Value")
                              .find(".active")
                              .data("title")
                          ));
                }),
          0 < $(".J-SkuList").length)
        )
          $(".J-SkuList")
            .find("span")
            .each(function() {
              i == $.trim($(this).data("title-code")) &&
                ((r =
                  SAIL_ENV.config.headcode ==
                  SAIL_ENV.config.currencyEntity.currency_code
                    ? $(this).data("orig-price")
                    : (
                        parseFloat(
                          $(this).data("orig-price") /
                            SAIL_ENV.config.headRateValue
                        ).toFixed(2) * SAIL_ENV.config.currencyEntity.rate_value
                      ).toFixed(2)),
                (o = SAIL_ENV.config.currencyEntity.symbol + r),
                (n =
                  SAIL_ENV.config.currencyEntity.currency_code +
                  " " +
                  SAIL_ENV.config.currencyEntity.symbol +
                  (r * e).toFixed(2)));
            });
        else {
          var s = t.find(".product-code").val();
          0 < $(".J-SkuList-" + s).length &&
            $(".J-SkuList-" + s)
              .find("span")
              .each(function() {
                i == $.trim($(this).data("title-code")) &&
                  ((r =
                    SAIL_ENV.config.headcode ==
                    SAIL_ENV.config.currencyEntity.currency_code
                      ? $(this).data("orig-price")
                      : (
                          parseFloat(
                            $(this).data("orig-price") /
                              SAIL_ENV.config.headRateValue
                          ).toFixed(2) *
                          SAIL_ENV.config.currencyEntity.rate_value
                        ).toFixed(2)),
                  (o = SAIL_ENV.config.currencyEntity.symbol + r),
                  (n =
                    SAIL_ENV.config.currencyEntity.currency_code +
                    " " +
                    SAIL_ENV.config.currencyEntity.symbol +
                    (r * e).toFixed(2)));
              });
        }
        0 < $(".JH-page-location").length &&
        "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val()
          ? ($(".J-GetBuyNowCouponVal").val(""),
            $(".buy-now-main")
              .find(".buy-now-types")
              .text(a),
            $(".buy-now-main")
              .find(".buy-now-img")
              .find(".fr")
              .text(e),
            $(".buy-now-main")
              .find(".buy-now-img")
              .find(".fr")
              .data("number", e),
            $(".buy-now-main")
              .find(".buy-now-total")
              .find("div")
              .eq(1)
              .text(n),
            $(".buy-now-main")
              .find(".buy-now-total")
              .find("div")
              .eq(1)
              .data("price", n),
            $(".J-GetBuyNowCoupon")
              .attr("disabled", "disabled")
              .addClass("jh-btn-disabled"),
            $(".buy-now-main")
              .find(".buy-now-iform")
              .find(".buy-now-price")
              .text(o))
          : (t.find(".J-GetBuyNowCouponVal").val(""),
            t
              .find(".buy-now-main")
              .find(".buy-now-types")
              .text(a),
            t
              .find(".buy-now-main")
              .find(".buy-now-img")
              .find(".fr")
              .text(e),
            t
              .find(".buy-now-main")
              .find(".buy-now-img")
              .find(".fr")
              .data("number", e),
            t
              .find(".buy-now-main")
              .find(".buy-now-total")
              .find("div")
              .eq(1)
              .text(n),
            t
              .find(".buy-now-main")
              .find(".buy-now-total")
              .find("div")
              .eq(1)
              .data("price", n),
            t
              .find(".J-GetBuyNowCoupon")
              .attr("disabled", "disabled")
              .addClass("jh-btn-disabled"),
            t
              .find(".buy-now-main")
              .find(".buy-now-iform")
              .find(".buy-now-price")
              .text(o));
      }),
      $(document).on("click", ".buy-now-tips", function() {
        $(this).hide(),
          $(this)
            .next("div")
            .show();
      }),
      $(document).on("click", ".J-BuyNowClose,.J-Mask", function() {
        $(".template2-body")
          .find(".J-Product")
          .removeClass("relative"),
          SAIL_ENV.config.mask_layer("hide"),
          $(".J-BuyNowCouponTips").empty(),
          $(".J-BuyNowDiscountInfo").empty(),
          768 < window.screen.availWidth
            ? $(".buy-now-main").hide()
            : $(".buy-now-main").removeClass("buy-now-main--show"),
          $(".buy-now-main")
            .find(".buy-now-tips-box")
            .find(".buy-now-tips")
            .show(),
          $(".buy-now-main")
            .find(".buy-now-tips-box")
            .children("div")
            .hide();
      }),
      $(document).on("click", ".J-GetBuyNowCoupon", function() {
        var n = "",
          o = "",
          e = (function(e) {
            var t = $(".JH-page-location").val(),
              i = "",
              a = "",
              n =
                "" == t
                  ? e
                      .parents(".JH-Columns.recommend")
                      .find(".product-code")
                      .val()
                  : "",
              o =
                "" == t ? e.parents(".JH-Columns.recommend") : $(".JH-Columns"),
              r =
                "" == t
                  ? e.parents(".JH-Columns.recommend").find(".J-SkuList-" + n)
                  : $(".J-SkuList");
            0 < o.find(".J-Attribute").find("select").length
              ? o
                  .find(".J-Product")
                  .find(".J-Attribute")
                  .each(function() {
                    a += $.trim(
                      $(this)
                        .find(".J-Value")
                        .find("option:selected")
                        .data("title-code")
                    );
                  })
              : o
                  .find(".J-Product")
                  .find(".J-Attribute")
                  .each(function() {
                    a += $.trim(
                      $(this)
                        .find(".J-Value")
                        .find(".active")
                        .data("title-code")
                    );
                  });
            0 < r.find("span").length &&
              (r.find("span").each(function() {
                $.trim(a) == $.trim($(this).data("title-code")) &&
                  (i = $(this).data("id") || "");
              }),
              1 < r.find("span").length &&
                (i = i || $plug.query().variant || ""),
              1 == r.find("span").length &&
                (i = r
                  .find("span")
                  .eq(0)
                  .data("id")));
            return i;
          })($(this)),
          t = {
            coupon_code:
              "" == $(".JH-page-location").val()
                ? $(this)
                    .parents(".JH-Columns.recommend")
                    .find(".J-GetBuyNowCouponVal")
                    .val()
                : $(".J-GetBuyNowCouponVal").val(),
            sku_id: e,
            quantity:
              "" == $(".JH-page-location").val()
                ? $(this)
                    .parents(".JH-Columns.recommend")
                    .find(".buy-now-main")
                    .find(".buy-now-img")
                    .find(".fr")
                    .text()
                : $(".buy-now-main")
                    .find(".buy-now-img")
                    .find(".fr")
                    .text()
          };
        $.trim(t.coupon_code)
          ? true
          : $(".J-BuyNowCouponTips").append(
              '<p class="erro-tips">This code did not match any active gift card or discount. Was it entered correctly?</p>'
            );
      }),
      0 < $(".JH-page-location").length &&
        "PAGE_PRODUCT_DETAIL" == $(".JH-page-location").val())
    ) {
      $(document).on(
        "click",
        ".product .J-quickToReview,.J-Pages span",
        function() {
          $("body,html").animate(
            { scrollTop: $(".reviews").offset().top },
            500
          );
        }
      );
      $(".product-code").val();
      SAIL_ENV.Product.getProductPrices($(".JH-Columns").find(".J-Product"));
    }
    if (768 < window.screen.availWidth) {
      if (
        ($(document).on("click", ".J-ProductTypes", function() {
          (SAIL_ENV.Product.isClick = !0),
            $(this)
              .parents("ul")
              .siblings("p")
              .children(".J-TypeVal")
              .text($(this).text()),
            $(this)
              .addClass("active")
              .siblings()
              .removeClass("active"),
            SAIL_ENV.Product.getProductPrices($(this).parents(".J-Product"));
        }),
        $(document).on("change", ".J-Value", function() {
          (SAIL_ENV.Product.isClick = !0),
            $(this)
              .siblings(".specification-name")
              .find(".J-TypeVal")
              .text(
                $(this)
                  .find("option:selected")
                  .text()
              ),
            SAIL_ENV.Product.getProductPrices($(this).parents(".J-Product"));
        }),
        0 < $(".view-large-image").length)
      ) {
        var o,
          r,
          s,
          d = $(".gallery-top .swiper-slide").length;
        $(document).on("click", ".gallery-top img", function() {
          $("#Paypal-buy-now").hide(),
            $(".layer-img")
              .children("img")
              .attr("src", $(this).attr("src")),
            $(".product-big-img").addClass("product-big-img--show"),
            $(".J-Mask").addClass("white"),
            SAIL_ENV.config.mask_layer("show"),
            (r = $(this)
              .parent()
              .index()),
            (o = r),
            $(".J-bigImgPrev").click(function() {
              0 == o
                ? (o = d - 1)
                : (--o,
                  (s = $(".gallery-top .swiper-slide")
                    .eq(o)
                    .find("img")
                    .attr("src")),
                  $(".layer-img")
                    .children("img")
                    .attr("src", s));
            }),
            $(".J-bigImgNext").click(function() {
              o == d - 1
                ? (o = 0)
                : ((o += 1),
                  (s = $(".gallery-top .swiper-slide")
                    .eq(o)
                    .find("img")
                    .attr("src")),
                  $(".layer-img")
                    .children("img")
                    .attr("src", s));
            });
        }),
          $(".J-bigImgClose,.layer-img").click(function() {
            $("#Paypal-buy-now").show(),
              $(".product-big-img").removeClass("product-big-img--show"),
              $(".layer-img")
                .children("img")
                .attr("src", ""),
              $(".J-Mask").removeClass("white"),
              SAIL_ENV.config.mask_layer("hide");
          });
      }
    } else
      SAIL_ENV.Product.productTyle(),
        $(".J-Value").change(function() {
          (SAIL_ENV.Product.isClick = !0),
            $(this)
              .siblings(".specification-name")
              .find(".J-TypeVal")
              .text(
                $(this)
                  .find("option:selected")
                  .text()
              ),
            SAIL_ENV.Product.getProductPrices($(this).parents(".J-Product"));
        });
  });

