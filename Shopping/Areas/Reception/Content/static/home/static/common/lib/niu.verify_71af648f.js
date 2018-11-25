! function(e, t, i) {
    function s(e) {
        var i = f + (e.attr("name") || "lucker_") + e.attr("verify") + (e.attr("id") || "lucker"),
            s = u[i] || new t.Verify(e);
        return u[i] = s, s.Reflush(e.val()), s }

    function r(e) {
        return e = "string" === t.type(e) ? parseFloat(e) : e, isNaN(e) ? "X" : e }

    function a(e) {
        var s = t.extend({}, t.Verify.Default),
            a = e.split(":");
        a = a.reverse();
        var h = t.trim(a.pop());
        if (0 == h.indexOf("!") && (h = h.slice(1), s.not = !0), s.regex = n[h] || console.log("@ERROR :: @verify : 没有找到相应的类型"), s.type = h, (h = a.pop()) === i) return s;
        var u, f = t.trim(h);
        if ("!" === f) {
            if (s.require = !0, (h = a.pop()) === i) return s;
            u = t.trim(h) } else u = f;
        return /^\[.*\]$/.test(u) ? s.checkValue = !0 : /^\{.*\}$/.test(u) && (s.checkLength = !0), u = u.slice(1, u.length - 1), u = u.split(","), 1 === u.length ? s.min = s.max = r(u[0]) : (s.min = r(u[0]), s.max = r(u[1])), s }

    function h(e, t) {
        var i, s = {};
        return i = e.split(":"), i = i.reverse(), s.regexMsg = i.pop() || t, s.requireMsg = i.pop() || t, s.checkVLMsg = i.pop() || t, s }
    var n = { str: /^.+$/, zhenname: /^[\u4e00-\u9fa5a-zA-Z]{2,24}$/, fullname: /^[\u4e00-\u9fa5a-zA-Z]{2,7}$/, addressname: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$/, addresstag: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,5}$/, addressline: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/, letterstr: /^([a-zA-Z]+)?$/, numandstr: /^([0-9a-zA-Z\-]+)?$/, numstr: /^(\d*)?$/, string: /^([^'<>]+)?$/, minusint: /^(\-([1-9])(\d*))?$/, "float": /^((\.([0-9]\d*))|(([0-9]\d*)\.\d+$)|([0-9]\d*))?$/, date: /^((([1-9]\d{3})|([1-9]\d{1}))-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1]))?$/, time: /^((0[1-9]|1[0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))?$/, datetime: /^((?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29))(\s*(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)?$/, year: /^(\d{4})?$/, month: /^([1-9]|0[1-9]|1[0-2])?$/, day: /^([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])?$/, postcode: /^\d{6}$/, email: /^(.+\@.+\..+)?$/, phone: /^[0-9\\_-]*$/, mobiletel: /^1\d{10}$/, ip: /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5]))?$/, idcard: /^(1[12345]|2[123]|3[1234567]|4[123456]|5[1234]|6[12345]|[789]1|[82])\d{4}(19|20)\d{2}((0[13578]|1[02])([0][1-9]|[12]\d|3[01])|((0[469]|11)([0][1-9]|[12]\d|30))|(02([0][1-9]|[1]\d|2[0-9])))\d{3}(\d|X)$/i, tabledefine: /^(([A-Za-z])([A-Za-z0-9|_]){1,18})?$/, integer: /^(\d{1,9})?$/, number: /^(\d*)?$/, url: /^(http:\/\/)/, znAnden: /^([a-zA-Z]?[\u4E00-\u9FA5]?[a-zA-Z]?){2,10}$/, chinese: /^[\u4E00-\u9FA5]*$/, notsstring: /^([^'<>\s]+)?$/, persent: /^(?:100|[0-9]\d?)?$/, fpersent: /^(?:100|[1-9]\d?)(?:\.00)?$/, tint: /^(?:|[1-9]\d?)(?:|[1-9]\d?)(?:|[1-9]\d?)?$/, placeStr: /[\u4E00-\u9FA5]{2,10}/, zifu: /^(\w){6,20}$/, ffzf: /^\w?(\w*\d*)*$/, car: /^[0-9a-zA-Z]{7}$/, persentNo: /^[0-9a-zA-Z]{7,15}$/, CARDNUM: /^[0-9a-zA-Z]{9}$/ },
        u = {},
        f = "lucker_";
    t.Verify = function(e) {
        var t = e.attr("verify"),
            i = e.attr("msg") || ":::",
            s = e.attr("placeholder") || "";
        this.flag = 1, this.message = "";
        var r = a(t);
        this.not = r.not, this.regex = r.regex, this.require = r.require, this.checkValue = r.checkValue, this.checkLength = r.checkLength, this.min = r.min, this.max = r.max, r = h(i), this.regexMsg = r.regexMsg || s, this.requireMsg = r.requireMsg || s, this.checkVLMsg = r.checkVLMsg || s }, t.Verify.prototype = { constructor: t.Verify, verison: "3.2.16" }, t.Verify.prototype.Niudialog = require("common:widget/plugin/dialog/dialog.js"), t.Verify.prototype.CheckVL = function(e) {
        var t;
        if ("L" === e) {
            if (!this.checkLength) return;
            t = this.value.length } else {
            if (!this.checkValue) return;
            t = this.value }("X" === this.min && t > this.max || "X" === this.max && t < this.min || t < this.min || t > this.max) && (this.flag = 0, this.message = this.checkVLMsg) }, t.Verify.prototype.CheckRequire = function() { this.require && 0 === this.value.length && (this.flag = 0, this.message = this.requireMsg) }, t.Verify.prototype.CheckRegex = function() { this.regex.test(this.value) || (this.flag = 0, this.message = this.regexMsg) }, t.Verify.prototype.Check = function() {
        return this.require || 0 !== this.value.length ? (this.CheckRequire(), this.ShowMsg(), 0 === this.flag ? this.flag : (this.CheckRegex(), this.ShowMsg(), 0 === this.flag ? this.flag : (this.CheckVL("V"), this.ShowMsg(), 0 === this.flag ? this.flag : (this.CheckVL("L"), this.ShowMsg(), 0 === this.flag ? this.flag : this.flag = 1)))) : (this.flag = 1, this.message = "", this.flag) }, t.Verify.prototype.Reflush = function(e) { this.value = t.trim(e), this.flag = 1, this.message = "" }, t.Verify.prototype.ShowMsg = function() { 0 === this.flag && this.Niudialog.alert(this.message) }, t.Verify.Default = { not: !1, require: !1, checkValue: !1, checkLength: !1 }, t.fn.validation = function() {
        var e = 1,
            i = t(this),
            r = i.attr("verify") ? i : i.find(":input[verify]");
        return t.each(r, function(i, r) {
            var a = t(r),
                h = s(a),
                n = h.Check();
            return e = 1 === e && 1 === n ? 1 : 0, 0 === e ? !1 : void 0 }), e } }(window, jQuery);
