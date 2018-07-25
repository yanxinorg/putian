function TransferComponent(cursor) {
    var that = this,
        postfix = '',
        params = [];

    TransferModule.call(this);
    // 属性
    this.cursor = cursor;

    // 方法
    this.moveX = function (direction) {
        this.cursor.focusOut();
        switch (this.cursor.focusArea) {
            case 0:         // 菜单
                if (this.cursor.menu.moveX(direction) === -1) {
                    this.cursor.focusArea = 6;
                }
                break;
            case 5:         // 栏目
                this.cursor.bar.moveX(direction);
                this.remove('PG-ONE');              // 清除同一级的路径记录
                params = {
                    'PG-ONE': {
                        focusArea: this.cursor.focusArea,
                        focusPos: this.cursor.bar.focusPos
                    }
                };
                postfix = this.package(params);     //  跳转
                window.location.href = this.cursor.bar.barItemArray[this.cursor.bar.focusPos].url + postfix;
                break;
            case 6:         //  滚动图片
                if (-1 === this.cursor.swiper.moveX(direction)) {
                    this.cursor.swiper.triggerTimer();
                    this.cursor.focusArea = 0;
                }
                break;
            default:
                break;
        }
        this.cursor.focusOn();
    };

    this.moveY = function (direction) {
        this.cursor.focusOut();
        switch (this.cursor.focusArea) {
            case 0:         // 菜单
                if (-1 === this.cursor.menu.moveY(direction)) {
                    this.cursor.focusArea = 5;
                }
                break;
            case 5:         // 栏目
                this.cursor.focusArea = 0;
                if (direction < 0) {
                    this.cursor.menu.focusPosY = this.cursor.menu.itemsPerLine.length - 1;
                } else {
                    this.cursor.menu.focusPosY = 0;
                }
                break;
            case 6:         //  滚动图片
                this.cursor.focusArea = 5;
                break;
            default:
                break;
        }
        this.cursor.focusOn();
    };

    this.doBack = function () {
        this.remove(this.cursor.fileName);
        this.package([]);
        if (cmsConfig.environment === 'DEBUG') {
            window.location.href = '../view/index.html';
        }
    };

    this.doSelect = function () {
        this.remove(this.cursor.fileName);
    };

    this.turnPage = function (_direction) {
        if (0 === this.cursor.menu.turnPage(_direction)) {
            this.cursor.menu.destroy();
            this.cursor.menu.init();
        }
    };

    this.onKeyDown = function (event) {
        var code = getKeyCode(event);

        switch (code) {
            case 'KEY_NUMBER1':
                that.toggle();
                return false;
            case 'KEY_UP':
                that.moveY(-1);
                return false;
            case 'KEY_DOWN':
                that.moveY(1);
                return false;
            case 'KEY_LEFT':
                that.moveX(-1);
                return false;
            case 'KEY_RIGHT':
                that.moveX(1);
                return false;
            case 'KEY_SELECT':
                that.doSelect();
                return false;
            case 'KEY_EXIT':
            case 'KEY_BACK':
                that.doBack();
                return false;
            case 'KEY_PAGE_UP':
                that.turnPage(-1);
                break;
            case 'KEY_PAGE_DOWN':
                that.turnPage(1);
                break;
            default:
                break;
        }
    };
}