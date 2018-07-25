/**
 * 所谓热键
 */
function HotKeyModule() {
    this.mainFocusPos = 0;          //  定位位置
    this.subFocusPos = 0;          //  定位位置
    this.hotAreaLeft = 56;
    this.hotAreaTop = 164;
    this.hotAreaWidth = 120;
    this.hotAreaHeight = 450;
    this.hotKeyParams = [];

    this.init = function () {
        var i,
            j,
            index = 0,
            mainHotKeyWrapper,
            mainHotKey,
            subHotKeyWrapper,
            subHotKey,
            hotArea = document.getElementById('hot');

        //  设置热键区的样式
        hotArea.style.left = this.hotAreaLeft + 'px';
        hotArea.style.top = this.hotAreaTop + 'px';
        hotArea.style.width = this.hotAreaWidth + 'px';
        hotArea.style.height = this.hotAreaHeight + 'px';
        //  初始化数据
        for (i = 0; i < this.hotKeyParams.length; i++) {
            //  设置主键
            mainHotKeyWrapper = document.createElement('div');
            mainHotKey = document.createElement('div');
            mainHotKey.innerHTML = this.hotKeyParams[i].district;
            mainHotKey.id = 'main-hot-key-' + i;
            mainHotKey.className = 'main-hot-key';
            mainHotKeyWrapper.appendChild(mainHotKey);

            //  设置附属键
            subHotKeyWrapper = document.createElement('div');
            subHotKeyWrapper.className = 'sub-hot-key-wrapper';
            subHotKeyWrapper.style.display = 'none';
            for (j = 0; j < this.hotKeyParams[i].countries.length; j++) {
                subHotKey = document.createElement('div');
                subHotKey.innerHTML = this.hotKeyParams[i].countries[j].name;
                subHotKey.id = 'sub-hot-key-' + index++;
                subHotKey.className = 'sub-hot-key';
                subHotKeyWrapper.appendChild(subHotKey);
            }

            mainHotKeyWrapper.appendChild(subHotKeyWrapper);
            hotArea.appendChild(mainHotKeyWrapper);
        }
    };

    this.focusOn = function () {
        for (var k = 0, collection = document.getElementsByClassName('sub-hot-key-wrapper'); k < collection.length; k++) {
            collection[k].style.display = 'none';
        }
        var mainElement = document.getElementById('main-hot-key-' + this.mainFocusPos);
        mainElement.nextElementSibling.style.display = 'block';


        for (var i = 0, total = 0; i < this.mainFocusPos; i++) {
            total += this.hotKeyParams[i].countries.length;
        }
        var subElement = document.getElementById('sub-hot-key-' + (total + this.subFocusPos));
        subElement.style.background = 'url(../images/bar/highlight.png) center no-repeat';
        subElement.style.color = '#FFF';
    };

    this.focusOut = function () {
        for (var i = 0, total = 0; i < this.mainFocusPos; i++) {
            total += this.hotKeyParams[i].countries.length;
        }
        var subElement = document.getElementById('sub-hot-key-' + (total + this.subFocusPos));
        subElement.style.background = '';
        subElement.style.color = '#000';
    };

    this.moveX = function () {
        return -1;
    };

    this.moveY = function (direction) {
        this.subFocusPos += direction;
        if (this.subFocusPos >= 0 && this.subFocusPos < this.hotKeyParams[this.mainFocusPos].countries.length) {

        } else if (this.subFocusPos < 0) {
            this.subFocusPos = 0;
            if (this.mainFocusPos - 1 >= 0) {
                --this.mainFocusPos;
            } else {
                return -1;
            }
        } else {
            if (this.mainFocusPos + 1 < this.hotKeyParams.length) {
                ++this.mainFocusPos;
                this.subFocusPos = 0;
            } else {
                this.subFocusPos = this.hotKeyParams[this.mainFocusPos].countries.length - 1;
            }
        }

        return 0;
    };

    this.doSelect = function () {

    };

}