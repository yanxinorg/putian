/**
 * ----------------------------------------------------------------------------------------------
 * ----------------------------------------- 滑块视图容器 ---------------------------------------
 * ----------------------------------------------------------------------------------------------
 */

function SwiperModule() {
    this.swiperTop = 0;             //  上边距
    this.swiperLeft = 0;            //  左边距
    this.swiperWidth = 0;           //  宽度
    this.swiperHeight = 0;          //  高度
    this.album = [];                //  图集
    this.position = 0;              //  当前图片在图集内的位置
    this.interval = 3000;           //  图片滚动的时间间隔
    this.timerId = 0;               //  timer ID
    this.remoteImage = false;       //  图片是否存在CMS上

    /**
     *  初始化
     */
    this.init = function () {
        var swiper = document.getElementById('swiper');
        // 初始化滑块视图容器
        swiper.style.top = this.swiperTop + 'px';
        swiper.style.left = this.swiperLeft + 'px';
        swiper.style.width = this.swiperWidth + 'px';
        swiper.style.height = this.swiperHeight + 'px';
        // 创建滑块图片下标组
        var swiperIndexGroup = document.createElement('div');
        swiperIndexGroup.className = 'swiper-index-group';
        // 生成滑块图片下标
        var i, length, swiperIndexItem;
        for (i = 0, length = this.album.length; i < length; i++) {
            swiperIndexItem = document.createElement('div');
            swiperIndexItem.innerHTML = i + 1;
            swiperIndexItem.id = 'swiper-index-' + i;
            swiperIndexItem.className = 'swiper-index';
            swiperIndexGroup.appendChild(swiperIndexItem);
        }
        swiper.appendChild(swiperIndexGroup);
        // 启动图片循环播放
        this.triggerTimer();
    };

    /**
     *  聚焦
     */
    this.focusOn = function () {
        clearInterval(this.timerId);
        document.getElementById("swiper").style.backgroundImage =
            this.remoteImage ? cmsConfig.imgUrl + this.album[this.position].img : this.album[this.position].img;
        document.getElementById('swiper-index-' + this.position).style.backgroundColor = '#13934F';
        document.getElementById('swiper-index-' + this.position).style.borderColor = '#FFFF00';
    };

    /**
     *  失焦
     */
    this.focusOut = function () {
        document.getElementById('swiper-index-' + this.position).style.backgroundColor = '';
        document.getElementById('swiper-index-' + this.position).style.borderColor = '#FFFFFF';
    };

    /**
     *  横向移动光标
     * @param direction
     */
    this.moveX = function (direction) {
        this.position += direction;
        if (this.position >= 0 && this.position < this.album.length) {
            return 0;
        } else if (this.position < 0) {
            this.position = 0;
            return -1;
        } else {
            this.position = this.album.length - 1;
            return -1;
        }
    };

    /**
     *  纵向移动光标
     * @returns {number}
     */
    this.moveY = function () {
        return -1;
    };

    /**
     *  依次显示图集内的图片
     */
    this.triggerTimer = function () {
        var that = this;
        document.getElementById("swiper").style.backgroundImage =
            this.remoteImage ? cmsConfig.imgUrl + this.album[this.position].img : this.album[this.position].img;
        document.getElementById('swiper-index-' + this.position).style.backgroundColor = '#13934F';

        this.timerId = setInterval(function () {
            document.getElementById('swiper-index-' + that.position).style.backgroundColor = '';
            that.position = (that.position + 1) % that.album.length;
            document.getElementById("swiper").style.backgroundImage =
                that.remoteImage ? cmsConfig.imgUrl + that.album[that.position].img : that.album[that.position].img;
            document.getElementById('swiper-index-' + that.position).style.backgroundColor = '#13934F';
        }, that.interval);
    };
}