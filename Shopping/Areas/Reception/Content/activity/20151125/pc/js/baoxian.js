//按钮样式

({
    init:function() {
        var me = this;

        me.$block7Btn = $(".block7-btn");
        me.$blockBg = $(".block-bg");
        me.$blockBox = $(".block-box");
        me.$block7Tongguo = $(".block7-tongguo span");
        me.$block7Butongguo = $(".block7-butongguo span");
        me.$closeBg = $(".close-bg");
        me.$blockBox = $(".block-box");

        me.secondary_nav = $(".secondary_nav");

        me.event();
        me.nav();
    },
    event: function() {
        var me = this;

        me.$block7Tongguo.on("click", function() {
            me.tanchuang();
        });
        me.$block7Butongguo.on("click", function() {
            me.tanchuang();
        });
        me.$closeBg.on("click", function() {
            me.close_tanchuang();
        });
        me.$block7Btn.hover(function() {
            $(this).css({
                "border": "1px solid #df001f",
                "background": "#fff",
                "color": "#df001f"
            })
        },function() {
            $(this).css({
                "border": "1px solid #fff",
                "background": "#df001f",
                "color": "#fff"
            })
        });
        me.$blockBox.scroll(function() {
            me.$closeBg.css({
                "top": me.$blockBox.scrollTop() + "px"
            });
        })
    },
    tanchuang: function() {
        var me = this;

        me.$blockBox.css({
            "display": "block"
        });
        me.$blockBg.css({
            "display": "block"
        })
    },
    close_tanchuang: function() {
        var me = this;

        me.$blockBox.css({
            "display": "none"
        });
        me.$blockBg.css({
            "display": "none"
        })
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