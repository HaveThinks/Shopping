({
    init:function(){
        var me = this;
        me.showimg = $(".showimg");
        me.list = $(".list");

        me.event();
    },
    event:function(){
        var me = this;
        me.list.each(function(){
            var _self = $(this);

            _self.hover(function(){
                me.showimg.eq(_self.index()).fadeOut();
            },function(){
                me.showimg.eq(_self.index()).fadeIn();
            })
        });

    }
}).init();


jQuery(document).ready(function () {
    var $ = jQuery;
    var leftBtn = $(".leftBtn");
    var rightBtn = $(".rightBtn");
    var imgSmallBorder = $(".imgSmallBorder");
    var imgBigBorder = $(".imgBigBorder");
    var aLi = $(".imgBigBorder li");
    var aLiOne = $(".imgBigBorder li").eq(0);
    var aLiOneOfsetWidth = $(aLiOne).innerWidth();
    var allLiLength = (aLi.length + 1) * aLiOneOfsetWidth;
    var oUlWidth = -allLiLength;

     rightBtn.on("click", function () {
        var iLeft = parseInt(imgBigBorder.css("left")) - aLiOneOfsetWidth + "px";
        var minwidth = oUlWidth - parseInt(iLeft);

        //leftBtn.fadeIn();
        leftBtn.find("img").attr("src","images/leftBtnActive.png")

        if (minwidth >= -aLiOneOfsetWidth ) {
            //rightBtn.fadeOut();
            rightBtn.find("img").attr("src","images/rightBtn.png");
            return false;
        }
        if (!imgBigBorder.is(":animated")) {
            imgBigBorder.animate({left: iLeft})
        }
    });

    leftBtn.on("click", function () {
        var iLeft = parseInt(imgBigBorder.css("left")) + aLiOneOfsetWidth + "px";
        //rightBtn.fadeIn();
        rightBtn.find("img").attr("src","images/rightBtnActive.png")

        if (parseInt(iLeft) - aLiOneOfsetWidth >= 0) {
            //leftBtn.fadeOut();
            leftBtn.find("img").attr("src","images/leftBtn.png")
            return false;
        }
        if (!imgBigBorder.is(":animated")) {
            imgBigBorder.animate({left: iLeft})
        }
    });
});
