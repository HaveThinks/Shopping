define("home:widget/promoter/appointment/appointment.js", function() {
    ({ init: function() {
            var t = this;
            t.name = $(".name"), t.date = $(".date"), t.dateDiv = $(".dateDiv"), t.time = $(".time"), t.timeDiv = $(".timeDiv"), t.mobile = $(".mobile"), t.address = $(".address"), t.city = $(".city"), t.cityDiv = $(".cityDiv"), t.item = $(".item"), t.addressDiv = $(".addressDiv"), t.Div = $(".Div"), t.map = $(".map"), t.btn = $(".btn"), t.icon = $(".icon"), t.event() }, event: function() {
            var t = this;
            t.icon.click(function() { $("#container").show();
                var i = $(".address").attr("data-x"),
                    e = $(".address").attr("data-y");
                t.dotGps(i, e), console.log(i), console.log(e) }), t.city.click(function() { t.addressDiv.hide(), t.address.text(""), t.dateDiv.hide(), t.date.text(""), t.cityDiv.show(), $(this).addClass("click") }), t.address.click(function() { "" == t.city.text() ? (t.cityDiv.show(), t.city.addClass("click")) : (t.dateDiv.hide(), t.date.text(""), t.addressDiv.show(), $(this).addClass("click")) }), t.date.click(function() { "" == t.city.text() ? (t.cityDiv.show(), t.city.addClass("click")) : "" == t.address.text() ? (t.addressDiv.show(), t.address.addClass("click")) : (t.dateDiv.show(), $(this).addClass("click")) }), t.time.click(function() { t.timeDiv.show(), $(this).addClass("click") }), t.Div.delegate(".item", "click", function() {
                var i = $(this);
                i.parent().prev().html(i.html()).attr("data-id", i.attr("data-id")).removeClass("click"), i.parent().hide();
                var e = i.parent().attr("class");
                if ("cityDiv Div" == e) {
                    var a = i.attr("data-id");
                    t.serviceList(a) } else if ("addressDiv Div" == e) {
                    var d = i.attr("data-id");
                    t.timeGps(d) } }), t.btn.click(function() { t.saveAppointment() }) }, timeGps: function() {
            var t = this,
                i = { addressId: t.address.attr("data-id") };
            t.remote("/api/promoter/time", i, function(t) {
                if (2e3 == t.code) {
                    var i = t.data.ex_date,
                        e = t.data.jingdu,
                        a = t.data.weidu;
                    $(".address").attr("data-x", e).attr("data-y", a);
                    for (var d = "", n = 0; n < i.length; n++) d += '<div class="item" data-id="">' + i[n] + "</div>";
                    $(".dateDiv").html("").append(d) } }) }, dotGps: function(t, i) {
            function e() { new AMap.Geocoder({ radius: 1e3, extensions: "all" }), new AMap.Marker({ map: a, position: d });
                a.setFitView() }
            var a = new AMap.Map("container", { zoom: 18, resizeEnable: !0 }),
                d = [t, i];
            a.plugin(["AMap.ToolBar"], function() { a.addControl(new AMap.ToolBar) }), e() }, serviceList: function(t) {
            var i = this,
                e = { cityCode: t };
            i.remote("/api/promoter/serviceList", e, function(t) {
                if (2e3 == t.code) {
                    for (var i = "", e = t.data, a = 0; a < e.length; a++) i += '<div class="item" data-id="' + e[a].addressid + '">' + e[a].alias + "</div>";
                    $(".addressDiv").html("").append(i) } }) }, saveAppointment: function() {
            var t = this;
            if ("" == t.name.val() || "" == t.date.html() || "" == t.address.html()) return void Dialog.dialog({ txtHead: "提示", txtBody: "请将信息填写完整!" }).confirm(function(t) { t.__hide() }).cancel(function(t) { t.__hide() });
            if (t.mobile.val().length < 11) return void Dialog.dialog({ txtHead: "提示", txtBody: "手机号为11位数字!" }).confirm(function(t) { t.__hide() }).cancel(function(t) { t.__hide() });
            var i = { name: t.name.val(), date: t.date.html(), addressid: t.address.attr("data-id"), full_address: t.address.html(), mobile: t.mobile.val() };
            t.remote("/m/promoter/appointment", i, function(t) { 2e3 == t.code ? (Dialog.dialog({ txtHead: "提示", txtBody: "预约成功" }).confirm(function(t) { t.__hide() }).cancel(function(t) { t.__hide() }), setTimeout(function() { window.location.href = "/service/subscribe" }, 1e3)) : Dialog.dialog({ txtHead: "提示", txtBody: t.message }).confirm(function(t) { t.__hide() }).cancel(function(t) { t.__hide() }) }) }, remote: function(t, i, e) { $.ajax({ type: "post", url: t, data: i, dataType: "json", success: function(t) {
                    return t.head && "999999" == t.head.rtnCode ? (G_gologin(), !1) : void e(t) }, error: function() {} }) } }).init() });
