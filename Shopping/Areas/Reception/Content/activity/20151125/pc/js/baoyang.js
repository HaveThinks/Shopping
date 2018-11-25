
({
    init:function(){
        var me = this;
        me.vodeoBtn = $(".vodeoBtn");
        me.overlay = $(".overlay");
        me.showVideo = $(".showVideo");
        me.secondary_nav = $(".secondary_nav");

        me.videoPlay();
        me.btnStyle();
        me.showtab();
        me.nav();
    },
    videoPlay:function(){
        var me = this;
        me.vodeoBtn.on("click",function(){
            me.overlay.fadeIn();
            me.showVideo.fadeIn();
        });

        $(document).mouseup(function(e){
            var _con = $('.showVideo');
            if(!_con.is(e.target) && _con.has(e.target).length === 0){
                me.overlay.fadeOut();
                me.showVideo.fadeOut();
            }
        });

        player = new YKU.Player('youkuplayer',{
            styleid: '0',
            client_id: '078b1cc127ba41a7',
            vid: "XMTM5NDgxMDkyOA",
            autoplay: true
        });
    },
    btnStyle:function(){
        $(".block1-btn").hover(function() {
            $(this).css({
                "border": "0",
                "background": "#df001f",
                "color": "#fff"
            })
        }, function() {
            $(this).css({
                "border": "1px solid #df001f",
                "background": "none",
                "color": "#df001f"
            })
        });
        $(".block8-btn").hover(function() {
            $(this).css({
                "border": "0",
                "background": "#df001f",
                "color": "#fff"
            })
        }, function() {
            $(this).css({
                "border": "1px solid #fff",
                "background": "none",
                "color": "#fff"
            })
        })
    },
    showtab:function(){
        //点击切换图片
        for (var i = 0; i < $(".con-nav > li").length; i++) {
            $(".con-nav > li").eq(i).click(function() {
                var index = $(this).index();
                $(this).addClass("block5-select").siblings().removeClass("block5-select").parent().siblings().children().eq(index).addClass("block5-show").siblings().removeClass("block5-show");
                $(".block5-arrow").css({
                    "left": (7 + index * 16.7) + "%"
                })
            });
        };
    },
    nav:function(){
        var me = this;
        $(document).scroll(function(){
            var scrollTOP = $(document).scrollTop();
            if(scrollTOP >= 66){
                me.secondary_nav.addClass("active");
            }else{
                me.secondary_nav.removeClass("active");
            }
        })
    }

}).init();


