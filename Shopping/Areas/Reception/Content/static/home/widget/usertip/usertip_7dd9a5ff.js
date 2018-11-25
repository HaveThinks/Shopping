define("home:widget/usertip/usertip.js", function() {
    ({ init: function() {
            var n = this;
            n.$changePwd = $("#changePwd"), n.event() }, event: function() {
            var n = this;
            n.$changePwd.on("click", function() { n._gomodpwd() }) }, _gomodpwd: function() { location.href = "//account.niu.com/modify?service=shop&callback=" + encodeURIComponent(location.href) } }).init() });
