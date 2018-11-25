define("home:widget/shopping_cart/shopping_cart.js", function(t) {
    var o = t("common:widget/plugin/dialog/dialog.js");
    ({ init: function() {
            var t = this;
            t.$sub = $(".subbtn"), t.$add = $(".addbtn"), t.$select = $(".com-select"), t.$delcom = $(".delcom"), t.cartItem = { id: "", num: "" }, t.$dialogConfirm = $(".niu-dialog-confirm"), t.$dialogCancel = $(".niu-dialog-cancel"), t.$niudialog = $(".niu-dialog"), t.$niumask = $(".niu-mask"), t.$dialogclose = $(".niu-dialog-close"), t.$goappy = $("#goappy"), t.m1skus = ["106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "126", "127", "128", "129", "130", "142", "143", "144", "145", "146", "206", "207", "208", "209", "210", "211", "212", "213"], t.coverskus = ["197", "198", "196", "199", "189", "190", "191", "193", "194", "195", "202", "203"], t.m1tocoverskus = { 117: "197", 115: "198", 111: "198", 112: "198", 113: "198", 114: "198", 142: "198", 143: "198", 144: "198", 145: "198", 146: "198", 110: "196", 106: "196", 107: "196", 108: "196", 109: "196", 130: "199", 126: "199", 127: "199", 128: "199", 129: "199" }, t.m1toDoubleCoverskus = { 106: "190", 107: "190", 108: "190", 109: "190", 110: "190", 111: "193", 112: "193", 113: "193", 114: "193", 115: "193", 117: "191", 126: "189", 127: "189", 128: "189", 129: "189", 130: "189", 142: "193", 143: "193", 144: "193", 145: "193", 146: "193" }, t.n1stocoverskus = { 206: "202", 208: "202", 211: "202", 212: "202", 210: "203", 207: "203", 209: "203", 213: "203" }, t.n1stoDoublecoverskus = { 206: "194", 208: "194", 211: "194", 212: "194", 210: "195", 207: "195", 209: "195", 213: "195" }, t.TYPE = t.getQueryString().t || "", console.log("1" == t.TYPE), t.cartId = null, t.event() }, event: function() {
            var t = this;
            t.$sub.on("click", function() {
                var o = $(this),
                    e = t._getInput(o),
                    s = parseInt(e.val()) - 1,
                    a = o.data("id");
                return 0 >= s ? !1 : (t.cartItem.num = s, t.cartItem.id = a, t._setCart(), void e.val(s)) }), t.$add.on("click", function() {
                var o = $(this),
                    e = t._getInput(o),
                    s = parseInt(e.val()) + 1,
                    a = o.data("id");
                t.cartItem.num = s, t.cartItem.id = a, t._setCart(), e.val(s) }), t.$select.on("click", function() {
                var o = $(this),
                    e = o.data("skuid").toString(); - 1 != t.m1skus.indexOf(e) ? ($(".com-select-" + t.m1tocoverskus[e]).toggleClass("on"), $(".com-select-" + t.m1toDoubleCoverskus[e]).toggleClass("on"), $(".com-select-" + t.n1stocoverskus[e]).toggleClass("on"), $(".com-select-" + t.n1stoDoublecoverskus[e]).toggleClass("on")) : -1 != t.coverskus.indexOf(e) && ($.each(t.m1tocoverskus, function(t, o) { o == e && $(".com-select-" + t).toggleClass("on") }), $.each(t.m1toDoubleCoverskus, function(t, o) { o == e && $(".com-select-" + t).toggleClass("on") }), $.each(t.n1stocoverskus, function(t, o) { o == e && $(".com-select-" + t).toggleClass("on") }), $.each(t.n1stoDoublecoverskus, function(t, o) { o == e && $(".com-select-" + t).toggleClass("on") })), o.toggleClass("on") }), t.$delcom.on("click", function() {
                var e = $(this).data("skuid").toString(),
                    s = $(this).data("id");
                o.confirm({ title: "确认删除该商品吗？", content: "可能会失去本次购买的机会", leftBtn: "取消", rightBtn: "确定:!", rightBtnCallback: function() {
                        var o = [];
                        o.push(s), 1 == t.TYPE, -1 != t.m1skus.indexOf(e) && $(".com-item-" + t.m1tocoverskus[e]).data("id") && o.push($(".com-item-" + t.m1tocoverskus[e]).data("id")), -1 != t.m1skus.indexOf(e) && $(".com-item-" + t.m1toDoubleCoverskus[e]).data("id") && o.push($(".com-item-" + t.m1toDoubleCoverskus[e]).data("id")), -1 != t.m1skus.indexOf(e) && $(".com-item-" + t.n1stocoverskus[e]).data("id") && o.push($(".com-item-" + t.n1stocoverskus[e]).data("id")), -1 != t.m1skus.indexOf(e) && $(".com-item-" + t.n1stoDoublecoverskus[e]).data("id") && o.push($(".com-item-" + t.n1stoDoublecoverskus[e]).data("id")), t._delCart(o.toString()) } }) }), t.$goappy.on("click", function() {
                var e = [];
                return t.$select.each(function(t, o) { $(o).hasClass("on") && e.push($(o).data("id")) }), 0 == e.length ? (o.alert("请选择商品"), !1) : void(window.location.href = "/order/confirm?items=" + t._base64encode(e.toString())) }) }, _getInput: function(t) {
            return t.parent().find(".countinput") }, _setCart: function() {
            var t = this;
            $.ajax({ type: "post", url: "/api/cart/setQuantity", data: { itemId: t.cartItem.id, quantity: t.cartItem.num }, dataType: "json", success: function(t) {
                    var e = "";
                    return t.head && "999999" == t.head.rtnCode ? (G_gologin(), !1) : (t.status && "1" == t.status ? window.location.reload() : e = t.status && "2" == t.status ? "库存不足" : t.status && "3" == t.status ? "此商品限购" : "网络不异常,请稍候再试", void o.alert(e, function() { window.location.reload() })) }, error: function() {} }) }, _delCart: function(t) { $.ajax({ type: "post", url: "/api/cart/delete", data: { itemId: t }, dataType: "json", success: function(t) {
                    return t.head && "999999" == t.head.rtnCode ? (G_gologin(), !1) : void(t.status && "1" == t.status && window.location.reload()) }, error: function() {} }) }, _base64encode: function(t) {
            var o, e, s, a, n, i, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (s = t.length, e = 0, o = ""; s > e;) {
                if (a = 255 & t.charCodeAt(e++), e == s) { o += c.charAt(a >> 2), o += c.charAt((3 & a) << 4), o += "==";
                    break }
                if (n = t.charCodeAt(e++), e == s) { o += c.charAt(a >> 2), o += c.charAt((3 & a) << 4 | (240 & n) >> 4), o += c.charAt((15 & n) << 2), o += "=";
                    break }
                i = t.charCodeAt(e++), o += c.charAt(a >> 2), o += c.charAt((3 & a) << 4 | (240 & n) >> 4), o += c.charAt((15 & n) << 2 | (192 & i) >> 6), o += c.charAt(63 & i) }
            return o }, getQueryString: function() {
            var t = location.search,
                o = new Object;
            if (-1 != t.indexOf("?")) {
                var e = t.substr(1);
                strs = e.split("&");
                for (var s = 0; s < strs.length; s++) o[strs[s].split("=")[0]] = strs[s].split("=")[1] }
            return o } }).init() });
