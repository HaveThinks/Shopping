define("home:widget/address/manage/manage.js", function(t) {
    var e = t("common:widget/plugin/dialog/dialog.js");
    ({ init: function() {
            var t = this;
            t.addressConf = { abbreviation: "", country: "", city: "" }, t.addBtn = $("#J_add"), t.cancelBtn = $("#J_cancel"), t.saveBtn = $("#J_save"), t.$J_province = $("#J_province"), t.$J_city = $("#J_city"), t.$J_street = $("#J_street"), t.$T_province = $("#T_province"), t.$T_city = $("#T_city"), t.$T_street = $("#T_street"), t.$sele_input_province = $(".sele-input-province"), t.$sele_input_city = $(".sele-input-city"), t.$sele_input_street = $(".sele-input-street"), t.$selectList = $(".select-list"), t.$provinceContent = $(".province-content"), t.$cityContent = $(".city-content"), t.$streetContent = $(".street-content"), t.$input_addressId = $("input[name=addressId]"), t.$input_province = $("input[name=subDivision]"), t.$input_provinceLocalName = $("input[name=subDivisionLocalName]"), t.$input_city = $("input[name=city]"), t.$input_cityLocalName = $("input[name=cityLocalName]"), t.$input_district = $("input[name=district]"), t.$input_districtLocalName = $("input[name=districtLocalName]"), t.$body = $("body"), t.addressWrap = $(".address-wrap"), t.addressEditWrap = $(".address-edit-wrap"), t.addressForm = $("form", t.addressEditWrap), t.formTitle = $("#formTitle"), t.addressBox = $("#addressbox"), t.addressInfo = $(".addressInfo"), t.htmlAddressInfo(), t.event() }, htmlAddressInfo: function() {
            var t = this;
            t.addressInfo.each(function() {
                for (var t = $(this), e = t.children("span"), i = e.text(); e.height() > t.height();) i = i.substr(0, i.length - 4).concat("..."), e.text(i) }).children("span").css("opacity", 1) }, event: function() {
            var t = this;
            t.addBtn.click(function() { t.openEditWrap("添加收货地址", "保存收货地址") }), t.addressWrap.on("click", ".modaddressbtn", function() { t.openEditWrap("修改收货地址", "修改地址", $(this).data("id")) }), t.cancelBtn.click(function() { t.addressEditWrap.hide() }), t.saveBtn.click(function() {
                if (!t.addressForm.validation()) return !1;
                var e, i, a = t.addressForm.serializeArray();
                t.$input_addressId.val() ? (e = "修改成功", i = "/api/address/mod") : (e = "添加成功", i = "/api/address/add"), t.httpConfirm("保存地址", "确定要保存此地址吗？", function() { t.remote(i, a, e) }) }), t.addressWrap.on("click", ".deladdressbtn", function() {
                var e = $(this).data("id");
                t.httpConfirm("删除地址", "确定要删除此地址吗？", function() { t.remote("/api/address/del", { id: e }, "删除成功") }, "确认删除:!") }), t.addressWrap.on("click", ".set-default-btn", function() {
                var e = $(this).data("id");
                t.httpConfirm("设置默认地址", "确定要设置此地址为默认的吗？", function() { t.remote("/api/address/default", { id: e }, "设置成功") }) }), t.$J_province.on("click", function() { t.$selectList.hide(), t.$sele_input_province.trigger("focus"), t.remote("/api/address/province", {}, function(e) { T().clear(!0).target(".province-content").template("#T_province").list(e).doEach(function(t, e, i) { i.data("abbreviation", e.abbreviation), i.data("country", e.country), i.text(e.localName) }), t.$provinceContent.show() }) }), t.$J_city.on("click", function() {
                return t.$selectList.hide(), t.$sele_input_city.trigger("focus"), t.addressConf.abbreviation ? void t.remote("/api/address/city", { province: t.addressConf.abbreviation }, function(i) {
                    return 0 == i.length ? (e.alert("此地暂送不到,请您更换修改地址"), !1) : (T().clear(!0).target(".city-content").template("#T_city").list(i).doEach(function(t, e, i) { i.data("city", e.name), i.data("state", e.state), i.text(e.localName) }), void t.$cityContent.show()) }) : (t.$J_province.trigger("click"), !1) }), t.$J_street.on("click", function() {
                return t.$selectList.hide(), t.$sele_input_street.trigger("focus"), t.addressConf.abbreviation ? t.addressConf.city ? void t.remote("/api/address/district", { province: t.addressConf.abbreviation, city: t.addressConf.city }, function(i) {
                    return 0 == i.length ? (e.alert("抱歉！此地区暂时无法送达"), !1) : (T().clear(!0).target(".street-content").template("#T_street").list(i).doEach(function(t, e, i) { i.removeClass("hide"), i.text(e.localName), i.data("street", e.name) }), void t.$streetContent.show()) }) : (t.$J_city.trigger("click"), !1) : (t.$J_province.trigger("click"), !1) }), t.$T_province.on("click", function() {
                var e = $(this);
                return t.addressConf.abbreviation !== e.data("abbreviation") && (t.$sele_input_city.val(""), t.$sele_input_street.val("")), t.$sele_input_province.trigger("focus"), t.addressConf.abbreviation = e.data("abbreviation"), t.addressConf.country = e.data("country"), t.$sele_input_province.val(e.text()), t.$input_provinceLocalName.val(e.text()), t.$input_province.val(e.data("abbreviation")), t.$provinceContent.hide(), !1 }), t.$T_city.on("click", function() {
                var e = $(this);
                return t.addressConf.city !== e.data("city") && t.$sele_input_street.val(""), t.$sele_input_city.trigger("focus"), t.addressConf.city = e.data("city"), t.$sele_input_city.val(e.text()), t.$input_cityLocalName.val(e.text()), t.$input_city.val(e.data("city")), t.$cityContent.hide(), !1 }), t.$T_street.on("click", function() {
                var e = $(this);
                return t.$sele_input_street.trigger("focus"), t.$sele_input_street.val(e.text()), t.$input_districtLocalName.val(e.text()), t.$input_district.val(e.data("street")), t.$streetContent.hide(), !1 }), t.$body.on("click", function() { t.$selectList.hide() }) }, remote: function(t, i, a) { $.ajax({ type: "POST", url: t, data: i, dataType: "JSON", success: function(t) {
                    return t.status && 500 == t.status ? void e.alert(t.msg || "添加失败") : void(t.head && "999999" == t.head.rtnCode ? G_gologin() : "function" == typeof a ? a(t) : "ok" == t.message ? e.alert(a, function() { window.location.reload() }) : t.error && t.error.message && e.alert(t.error.message)) } }) }, openEditWrap: function(t, e, i) {
            var a = this;
            a.addressForm[0].reset(), a.formTitle.text(t), a.saveBtn.text(e), i ? a.remote("/api/address/getone", { id: i }, function(t) { a.bindaddress(t, i), a.addressConf.abbreviation = t.address.addressInfo.subDivision, a.addressConf.country = t.address.addressInfo.country, a.addressConf.city = t.address.addressInfo.city, a.addressEditWrap.show() }) : a.addressEditWrap.show() }, httpConfirm: function(t, i, a, n) { e.confirm({ title: t, content: i, leftBtn: "取消", rightBtn: n || "确定:!", autoClose: !1, showLoaderOnConfirm: !0, rightBtnCallback: a }) }, bindaddress: function(t, e) {
            var i = this;
            i.$sele_input_province.val(t.address.addressInfo.subDivisionLocalName), i.$sele_input_city.val(t.address.addressInfo.cityLocalName), i.$sele_input_street.val(t.address.addressInfo.districtLocalName), i.$input_addressId.val(e), i.$input_province.val(t.address.addressInfo.subDivision), i.$input_provinceLocalName.val(t.address.addressInfo.subDivisionLocalName), i.$input_city.val(t.address.addressInfo.cityLocalName), i.$input_cityLocalName.val(t.address.addressInfo.cityLocalName), i.$input_district.val(t.address.addressInfo.districtLocalName), i.$input_districtLocalName.val(t.address.addressInfo.districtLocalName), $("input[name=fullName]").val(t.address.fullName), $("input[name=mobile]").val(t.address.mobile), $("input[name=addressLine1]").val(t.address.addressLine.addressLine1), $("input[name=phone]").val(t.address.phone), $("input[name=postalCode]").val(t.address.postalCode), $("input[name=addressName]").val(t.address.addressName) } }).init() });