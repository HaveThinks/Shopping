define("home:widget/my_order/my_order.js", function() {
    ({ init: function() {
            var r = this;
            r.orderGroupItem = $(".orderGroup-title-item"), r.loadinggif = $(".loadinggif"), r.orderGroupList = $("#orderGroupList"), r.getOrderItems(), r.orderGroup = { daifukuan: "CREATED,WAIT_FOR_PAYMENT,PAID_FAILURE", wancheng: "RECEIVED", tuihuanhuo: "TMS_FAILED,WAIT_FOR_REFUND,REFUND_CHECKING,REFUND_CHECK_PASSED,REFUND_CHECK_NO_PASSED,REFUNDED,REFUNDED_FAILURE" }, r.event() }, event: function() {
            var r = this;
            r.orderGroupItem.on("click", function() { r.orderGroupItem.removeClass("active");
                var e = $(this);
                e.addClass("active");
                var o = r.orderGroup[e.data("group")];
                r.getOrderItems(o) }) }, getOrderItems: function(r) {
            var e = this;
            e.loadinggif.show();
            var o = "/order/my?statuses=" + (r || "");
            BigPipe.load({ pagelets: "orderItem", url: o, container: "orderGroupList", cb: function() { e.loadinggif.hide() } }) } }).init() });
