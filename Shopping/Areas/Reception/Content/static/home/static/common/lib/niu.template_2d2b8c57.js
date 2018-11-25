! function(t, i) { i.fn.removeId = function() {
        return this.each(function() { i(this).removeAttr("id") }) };
    var e = {},
        n = function(t) {
            return "string" == typeof t },
        r = function(t) {
            return new r.fn.init(t) };
    r.fn = r.prototype = { verison: "0.1.13", constructor: r, init: function(t) {
            return t = t || e, this.template_ = n(t.template) ? i(t.template) : t.template, this.list_ = t.list || [], this.target_ = n(t.target) ? i(t.target) : t.target, this.initShow_ = t.initShow || !0, this.clear_ = t.clear || !1, this } }, r.fn.init.prototype = r.fn, i.each(["template", "list", "target", "initShow", "clear"], function(t, e) { r.fn[e] = function(t) {
            return this[e + "_"] = n(t) ? i(t) : t, this } }), r.fn["do"] = r.fn.doEach = function(t) {
        var e, n, o = i("<div>"),
            h = this.template_.hide(),
            s = this.initShow_;
        this.clear_ && this.target_.children().remove(), i.isArray(this.list_) && (i.each(this.list_, function(i, a) {
            return e = h.clone(!0).removeId(), n = t.call(this, i, a, e), n === !1 ? !1 : void(n !== r.CONTINUE && (e.find("*[id]").removeId(), o.append(s ? e.show() : e))) }), this.target_.append(o.children())) }, r.BREAK = !1, r.CONTINUE = -1, t.T = r }(window, jQuery);
