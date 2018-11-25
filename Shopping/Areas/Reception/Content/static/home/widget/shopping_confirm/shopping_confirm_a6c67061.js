define("home:widget/shopping_confirm/shopping_confirm.js", function(e, t, a) {
    var n = e("common:widget/plugin/dialog/dialog.js");
    ({ init: function(e) {
            var t = this;
            t.items = t.getQueryString().items, t.$body = $("body"), t.$J_addaddress = $("#J_addaddress"), t.$J_addressbox = $("#J_addressbox"), t.$J_additem = $("#J_additem"), t.$J_canceladdbtn = $("#J_canceladdaddressbtn"), t.$J_addaddressbtn = $("#J_addaddressbtn"), t.$J_modaddressbtn = $("#J_modaddressbtn"), t.$J_subaddress = $("#J_subaddress"), t.$J_openAddresses = $("#J_openAddresses"), t.$deladdressbtn = $(".deladdressbtn"), t.$modaddressbtn = $(".modaddressbtn"), t.$J_province = $("#J_province"), t.$J_city = $("#J_city"), t.$J_street = $("#J_street"), t.$addcon = $(".addcon"), t.$provinceContent = $(".province-content"), t.$cityContent = $(".city-content"), t.$streetContent = $(".street-content"), t.$addressitem = $(".addressitem"), t.$edit = $(".btngroup"), t.$input_country = $("#input_country"), t.$input_province = $("#input_province"), t.$input_city = $("#input_city"), t.$input_district = $("#input_district"), t.$input_addressName = $("#input_addressName"), t.$input_provinceLocalName = $("#input_provinceLocalName"), t.$input_cityLocalName = $("#input_cityLocalName"), t.$input_districtLocalName = $("#input_districtLocalName"), t.$sele_input_province = $(".sele-input-province"), t.$sele_input_city = $(".sele-input-city"), t.$sele_input_street = $(".sele-input-street"), t.$input_taitou = $("#input_taxTitle"), t.$goapply = $("#goapply"), t.$taitou = $(".taitou"), t.$T_province = $("#T_province"), t.$T_city = $("#T_city"), t.$T_street = $("#T_street"), t.$dianzi_des = $(".dianzi_des"), t.$input_taxTitle_remark = $("#input_taxTitle_remark"), t.addressConf = { abbreviation: "", country: "", city: "" }, t.addressName = e.fullName, t.productID = null, t.orderConf = { addressId: e.fid, fulfillmentType: "1001", lineItems: [], taxItems: [{ taxTitle: window.fullName, taxType: 3, invoiceRemark: "" }], voucherId: window.youhuiquancode }, t.globalCart = window.globalCart;
            for (var a = 0; a < t.globalCart.length; a++) t.orderConf.lineItems.push({ skuId: t.globalCart[a].skuId + "", quantity: parseInt(t.globalCart[a].quantity) });
            t.event(), t.serializeObject() }, serializeObject: function() { $.fn.serializeObject = function() {
                var e = {},
                    t = this.serializeArray();
                return $.each(t, function() { e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || "" }), e } }, event: function() {
            var e = this;
            e.$body.on("click", function() { e.$addcon.hide() });
            var t = 0;
            e.$J_openAddresses.click(function() { t++ % 2 == 0 ? (e.$addressitem.css("display", "block"), $(this).text("收起收货地址").addClass("opened")) : (e.$addressitem.each(function() { $(this).index() > 2 && $(this).css("display", "none") }), $(this).text("展开收货地址").removeClass("opened")) }), e.select("address", function(t, a) { t.removeClass("onselect"), a.addClass("onselect"), e.orderConf.addressId = a.data("id") + "", e.addressName = a.data("name"), e.orderConf.taxItems[0].taxTitle = a.data("name"), $(".fapiaotaitou").val(a.data("name")) }), e.select("time", function(t, a) { t.removeClass("onselect"), a.addClass("onselect"), e.orderConf.fulfillmentType = a.data("fulfillmenttype") + "" }), e.select("fapiaotype", function(t, a) { t.removeClass("onselect"), a.addClass("onselect");
                var n = a.data("taxtype");
                if ("1" == n) {
                    var i = $(".putongfapiao").find(".onselect").data("taxtype");
                    e.orderConf.taxItems[0].taxType = i, $(".putongfapiao").removeClass("hide"), $(".dianzifapiao").addClass("hide"), $(".dianzi_des").addClass("hide") } else {
                    var i = $(".dianzifapiao").find(".onselect").data("taxtype");
                    e.orderConf.taxItems[0].taxType = i, $(".dianzifapiao").removeClass("hide"), $(".putongfapiao").addClass("hide"), $(".dianzi_des").removeClass("hide") } }), e.select("fapiao", function(t, a) { t.removeClass("onselect"), a.addClass("onselect"), e.orderConf.taxItems[0].taxType = a.data("taxtype"), 2 == a.data("taxtype") ? ($(".fapiaotaitou").val("").attr("placeholder", "请填写单位名称"), e.orderConf.taxItems[0].taxTitle = "") : ($(".fapiaotaitou").val(e.addressName).attr("placeholder", "为了方便上牌照，请您填写真实姓名"), e.orderConf.taxItems[0].taxTitle = e.$input_taitou.val()) }), e.select("fapiao2", function(t, a) { t.removeClass("onselect"), a.addClass("onselect"), e.orderConf.taxItems[0].taxType = a.data("taxtype"), e.orderConf.taxItems[0].taxTitle = "", 4 == a.data("taxtype") ? $(".fapiaotaitou").val("").attr("placeholder", "请填写单位名称") : ($(".fapiaotaitou").val(e.addressName).attr("placeholder", "为了方便上牌照，请您填写真实姓名"), e.orderConf.taxItems[0].taxTitle = e.$input_taitou.val()) }), e.$input_taitou.on("keyup", function() {
                var t = $(this);
                e.orderConf.taxItems[0].taxTitle = $.trim(t.val()) }), e.$J_additem.on("click", function() { e.addStatus() }), e.$J_canceladdbtn.on("click", function() { e.cancelStatus() }), e.$addressitem.on("mouseenter", function() { $(this).find(".btngroup").show() }).on("mouseleave", function() { $(this).find(".btngroup").hide() }), e.$T_province.on("click", function() {
                var t = $(this);
                e.addressConf.abbreviation !== t.data("abbreviation") && (e.$sele_input_city.val(""), e.$sele_input_street.val("")), e.$sele_input_province.trigger("focus"), e.addressConf.abbreviation = t.data("abbreviation"), e.addressConf.country = t.data("country"), e.$sele_input_province.val(t.text()), e.$input_provinceLocalName.val(t.text()), e.$input_province.val(t.data("abbreviation")), e.$provinceContent.hide() }), e.$T_city.on("click", function() {
                var t = $(this);
                e.addressConf.city !== t.data("city") && e.$sele_input_street.val(""), e.$sele_input_city.trigger("focus"), e.addressConf.city = t.data("city"), e.$sele_input_city.val(t.text()), e.$input_cityLocalName.val(t.text()), e.$input_city.val(t.data("city")), e.$cityContent.hide() }), e.$T_street.on("click", function() {
                var t = $(this);
                e.$sele_input_street.trigger("focus"), e.$sele_input_street.val(t.text()), e.$input_districtLocalName.val(t.text()), e.$input_district.val(t.data("street")), e.$streetContent.hide() }), e.$J_province.on("click", function() { e.$addcon.hide(), e.$sele_input_province.trigger("focus"), e.remote("/api/address/province", {}, function(t) { T().clear(!0).target(".province-content").template("#T_province").list(t).doEach(function(e, t, a) { a.attr("data-abbreviation", t.abbreviation), a.attr("data-country", t.country), a.text(t.localName) }), e.$provinceContent.show() }) }), e.$J_city.on("click", function() {
                return e.$addcon.hide(), e.$sele_input_city.trigger("focus"), e.addressConf.abbreviation ? void e.remote("/api/address/city", { province: e.addressConf.abbreviation }, function(t) {
                    return 0 == t.length ? (n.alert("此地暂送不到,请您更换修改地址"), !1) : (T().clear(!0).target(".city-content").template("#T_city").list(t).doEach(function(e, t, a) { a.attr("data-city", t.name), a.attr("data-state", t.state), a.text(t.localName) }), void e.$cityContent.show()) }) : (e.$J_province.trigger("click"), !1) }), e.$J_street.on("click", function() {
                return e.$addcon.hide(), e.$sele_input_street.trigger("focus"), e.addressConf.abbreviation ? e.addressConf.city ? void e.remote("/api/address/district", { province: e.addressConf.abbreviation, city: e.addressConf.city }, function(t) {
                    return 0 == t.length ? (n.alert("抱歉！此地区暂时无法送达"), !1) : (T().clear(!0).target(".street-content").template("#T_street").list(t).doEach(function(e, t, a) { a.removeClass("hide"), a.text(t.localName), a.attr("data-street", t.name) }), void e.$streetContent.show()) }) : (e.$J_city.trigger("click"), !1) : (e.$J_province.trigger("click"), !1) }), e.$J_addaddressbtn.on("click", function() {
                if (!e.$J_subaddress.validation()) return !1;
                var t = e.$J_subaddress.serializeObject();
                e.remote("/api/address/add", t, function(e) { "ok" == e.message ? window.location.reload() : n.alert(e.message) }) }), e.$deladdressbtn.on("click", function() { e.productID = $(this).data("id"), n.confirm({ title: "删除地址", content: "确定要删除此地址吗？", leftBtn: "取消", rightBtn: "确定:!", rightBtnCallback: function() { $.ajax({ type: "post", url: "/api/address/del", data: { id: e.productID }, dataType: "json", success: function(e) {
                                return e.head && "999999" == e.head.rtnCode ? (G_gologin(), !1) : void("ok" == e.message && window.location.reload()) } }) } }) }), e.$modaddressbtn.on("click", function() {
                var t = $(this).data("id");
                e.remote("/api/address/getone", { id: t }, function(a) { e.bindaddress(a, t), e.addressConf.abbreviation = a.address.addressInfo.subDivision, e.addressConf.country = a.address.addressInfo.country, e.addressConf.city = a.address.addressInfo.city, e.modStatus() }) }), e.$J_modaddressbtn.on("click", function() {
                if (!e.$J_subaddress.validation()) return !1;
                var t = e.$J_subaddress.serializeObject();
                e.remote("/api/address/mod", t, function(e) {
                    return e.head && "999999" == e.head.rtnCode ? (G_gologin(), !1) : void("ok" == e.message && window.location.reload()) }) }), e.$goapply.on("click", function() {
                if (0 == e.orderConf.addressId) return window.scrollTo(0, 0), n.alert("请选择一个地址，或者添加地址"), !1;
                if (0 == e.orderConf.lineItems.length) return window.scrollTo(0, 0), n.alert("您的购物车没有东西，请先去添加购物车吧", function() { window.location.href = "/cart" }), !1;
                if ("" == e.orderConf.taxItems[0].taxTitle) return window.scrollTo(0, 0), n.alert("请您填写发票抬头"), !1;
                if (3 == e.orderConf.taxItems[0].taxType || 4 == e.orderConf.taxItems[0].taxType) {
                    if (!$(".fapiaoemail").validation()) return !1;
                    e.orderConf.taxItems[0].invoiceRemark = $(".fapiaoemail").val() }
                e.orderConf.voucherId = window.youhuiquancode || "", $.ajax({ type: "post", url: "/api/order/create", data: { order: e.orderConf, items: e.items }, dataType: "json", success: function(t) {
                        if (t.head && "999999" == t.head.rtnCode) return G_gologin(), !1;
                        var a = t.orderId;
                        t.rtnCode && "500" == t.rtnCode ? (window.scrollTo(0, 0), n.alert(t.message, function() { window.location.href = "/cart" })) : t.rtnCode && "501" == t.rtnCode ? (window.scrollTo(0, 0), n.alert(t.message)) : t.status && "CREATED" == t.status ? (e.orderConf.lineItems = [], window.location.href = "/order/pay?id=" + a) : n.alert("订单创建失败!", function() { window.location.href = "/cart" }) }, error: function() {} }) }) }, getQueryString: function() {
            var e = location.search,
                t = new Object;
            if (-1 != e.indexOf("?")) {
                var a = e.substr(1);
                strs = a.split("&");
                for (var n = 0; n < strs.length; n++) t[strs[n].split("=")[0]] = strs[n].split("=")[1] }
            return t }, clearCart: function(e) {
            var t = this;
            $.ajax({ type: "post", url: "/api/cart/clear", dataType: "json", success: function(a) {
                    return a.head && "999999" == a.head.rtnCode ? (G_gologin(), !1) : void("created" == a.message && (t.orderConf.lineItems = [], e())) }, error: function() {} }) }, addStatus: function() {
            var e = this;
            e.$J_subaddress[0].reset(), e.$J_addaddress.show(), e.$J_addressbox.hide(), e.$J_addaddressbtn.css("display", "inline-block"), e.$J_modaddressbtn.hide() }, modStatus: function() {
            var e = this;
            e.$J_addaddress.show(), e.$J_addressbox.hide(), e.$J_addaddressbtn.hide(), e.$J_modaddressbtn.css("display", "inline-block") }, cancelStatus: function() {
            var e = this;
            e.$J_addaddress.hide(), e.$J_addressbox.show() }, bindaddress: function(e, t) {
            var a = this;
            $("#input_fullName").val(e.address.fullName), $("#input_mobile").val(e.address.mobile), $("#input_phone").val(e.address.phone), $("#input_emailAddress").val(e.address.emailAddress), a.$input_addressName.val(e.address.addressName), a.$sele_input_province.val(e.address.addressInfo.subDivisionLocalName), a.$sele_input_city.val(e.address.addressInfo.cityLocalName), a.$sele_input_street.val(e.address.addressInfo.districtLocalName), a.$input_provinceLocalName.val(e.address.addressInfo.subDivisionLocalName), a.$input_cityLocalName.val(e.address.addressInfo.cityLocalName), a.$input_districtLocalName.val(e.address.addressInfo.districtLocalName), $("#input_addressId").val(t), $("#input_isDefault").prop("checked", e.address.isDefault), a.$input_province.val(e.address.addressInfo.subDivision), a.$input_city.val(e.address.addressInfo.cityLocalName), a.$input_district.val(e.address.addressInfo.districtLocalName), $("#input_addressLine1").val(e.address.addressLine.addressLine1), $("#input_postalCode").val(e.address.postalCode) }, select: function(e, t) {
            var a = e.split(" ");
            $.each(a, function(e, a) {
                var n = $("*[group='" + a + "']");
                n.on("click", function() { t(n, $(this)) }) }) }, setAddressDefault: function(e) {
            var t = this;
            t.remote("/api/address/default", { id: e }, function() {}) }, remote: function(e, t, a) { $.ajax({ type: "post", url: e, data: t, dataType: "json", success: function(e) {
                    return e.head && "999999" == e.head.rtnCode ? (G_gologin(), !1) : void a(e) }, error: function() {} }) } }).init(window), a.exports = { init: function() {
            var e = this;
            e.items = e.getQueryString().items, e.$confirmCouponSelect = $(".confirm-coupon-select"), e.$couponSelectInput = $(".coupon-select-input"), e.$couponContent = $(".coupon-content"), e.$couponItem = $(".couponItem"), e.$couponcardimg = $("#couponcardimg"), e.$checkcoupon = $("#checkcoupon"), e.$coupon = $(".couponinput"), e.$couponcard = $(".couponcard"), e.$yingfujine = $(".yingfujine"), e.$youhuiquan = $(".youhuiquan"), e.event() }, event: function() {
            var e = this;
            e.$checkcoupon.on("click", function() {
                var t = e.$coupon.val();
                e.verifyCode(t, function(a) { a ? (e.setLottery(a), window.youhuiquancode = t) : n.alert("优惠券无效，请重新输入"), e.$couponContent.hide() }) }), e.$couponItem.on("click", function() {
                var t = $(this),
                    a = t.data("code");
                e.verifyCode(a, function(t) { t ? (e.setLottery(t), window.youhuiquancode = a) : n.alert("优惠券无效或已使用") }), e.$couponContent.hide() }), e.$couponSelectInput.on("click", function() { "none" == e.$couponContent.css("display") ? e.$couponContent.show() : e.$couponContent.hide() }) }, setLottery: function(e) {
            var t = this;
            t.$couponSelectInput.val(e.orderPrice.OFFER + "元优惠券"), $(".J_itemTotal").html("商品合计：" + e.orderPrice.ITEMS_TOTAL + "元"), $(".J_shippingTotal").html("配送费用：" + e.orderPrice.SHIPPING_TOTAL + "元"), $(".J_orderTotal").html("费用总计：" + e.orderPrice.ORDER_TOTAL + "元"), $(".J_shipping").html("优惠金额：-" + e.orderPrice.OFFER + "元") }, verifyCode: function(e, t) {
            var a = this;
            a.remote("/api/coupon/orderprice", { code: e, items: a.items }, function(e) {
                if (console.log(e), 500 == e.status) n.alert("请稍候重试");
                else if (405 == e.status) n.alert("购物车为空", function() { window.location.href = "/cart" });
                else {
                    if (0 == e.orderPrice.OFFER) return n.alert(e.orderPrice.OFFER_MESSAGE || "优惠券无效"), !1;
                    t(e) } }) }, remote: function(e, t, a) { $.ajax({ type: "post", url: e, data: t, dataType: "json", success: function(e) {
                    return e.head && "999999" == e.head.rtnCode ? (G_gologin(), !1) : void a(e) }, error: function() {} }) }, getQueryString: function() {
            var e = location.search,
                t = new Object;
            if (-1 != e.indexOf("?")) {
                var a = e.substr(1);
                strs = a.split("&");
                for (var n = 0; n < strs.length; n++) t[strs[n].split("=")[0]] = strs[n].split("=")[1] }
            return t } } });
