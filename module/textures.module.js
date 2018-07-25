function TexturesModule() {
    // this.position = 0;
    // this.size = 0;
    // this.album = [];
    this.swiper = null;
    this.pager = null;
    /**
     *  滚动时间间隔
     */
    this.marqueeCount = 13;
    /**
     *  模块初始化参数
     */
    this.isShowGraphics = 'show';
    this.backURL = '';
    this.logoImageSrc = '';
    this.id = '';

    /**
     *  数据加载
     */
    this.render = function (data) {
        var that = this;

        this.pager = new PagerModule();

        if (data.hasOwnProperty('imgArr') && data.imgArr.length > 0
            && data.imgArr[0].hasOwnProperty('img') && data.imgArr[0].img !== '') {
            this.swiper = new SwiperModule();
            this.swiper.swiperTop = 225;
            this.swiper.swiperLeft = 130;
            this.swiper.swiperWidth = 500;
            this.swiper.swiperHeight = 332;
            this.swiper.remoteImage = true;

            document.getElementById('textures-trapper').className = 'textures-trapper';
            document.getElementById('textures-text').className = 'textures-text';
            showTitleForMarquee(data.title, document.getElementById('textures-title'), this.marqueeCount);
            document.getElementById('textures-text').innerHTML = data.content;
            // 加载滚动图片
            this.swiper.album = data.imgArr;
            this.swiper.init();
        } else {
            document.getElementById('textures-trapper').className = 'textures-trapper-alone';
            document.getElementById('textures-text').className = 'textures-text-alone';
            showTitleForMarquee(data.title, document.getElementById('textures-title'), this.marqueeCount);
            document.getElementById('textures-text').innerHTML = data.content;
        }
        setTimeout(function () {
            that.pager.setParameters();
        }, 500);
    };
}