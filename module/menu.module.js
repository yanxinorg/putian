/**
 *   按矩阵的形式进行排列
 *   分为 X 行 每行有 Y 列
 *   menuItemArray 里的数据需按页面元素次序进行排列
 *   页面上第一行第一列在第一位，第一行第二列在第二位
 *   换行后按同样的次序
 * @constructor
 */
function MenuModule() {
    this.focusPosX = 0;                   // 记录光标在区域内的位置
    this.focusPosY = 0;                   // 记录光标在区域内的所在行
    this.curMenuPageIndex = 0;            // 默认选择第一页的菜单
    this.itemsPerLine = [];               // 每行所包含的元素数量
    this.menuItemArray = [];
    this.menuPageArray = [];

    this.init = function () {
        var i,
            length,
            menu;

        this.itemsPerLine = this.menuPageArray[this.curMenuPageIndex].itemsPerLine;
        this.menuItemArray = this.menuPageArray[this.curMenuPageIndex].menuItemArray;

        menu = document.getElementById('menu');
        for (i = 0, length = this.menuItemArray.length; i < length; i++) {
            var menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.style.left = this.menuItemArray[i].left + 'px';
            menuItem.style.top = this.menuItemArray[i].top + 'px';
            menuItem.style.width = this.menuItemArray[i].width + 'px';
            menuItem.style.height = this.menuItemArray[i].height + 'px';
            menuItem.style.background = this.menuItemArray[i].bgImageSrc;
            menu.appendChild(menuItem);
        }
    };

    this.destroy = function () {
        var menu = document.getElementById('menu');
        while (menu.hasChildNodes()) {
            menu.removeChild(menu.firstChild);
        }
    };

    this.focusOn = function (cursor) {
        var i,
            _num = 0;

        for (i = 0; i < this.focusPosY; i++) {
            _num += this.itemsPerLine[i];
        }
        _num += this.focusPosX;
        console.info('menu.module.js | focusX:' + this.focusPosX + ' focusY:' + this.focusPosY + ' num:' + _num);

        cursor.style.visibility = 'visible';
        cursor.style.left = this.menuItemArray[_num].left + 'px';
        cursor.style.top = this.menuItemArray[_num].top + 'px';
        cursor.style.width = this.menuItemArray[_num].width + 'px';
        cursor.style.height = this.menuItemArray[_num].height + 'px';
    };

    this.focusOut = function (cursor) {
        cursor.style.visibility = 'hidden';
    };

    this.moveX = function (_direction) {
        this.focusPosX += _direction;
        if (this.focusPosX >= 0 && this.focusPosX < this.itemsPerLine[this.focusPosY]) {
            return 0;
        } else if (this.focusPosX < 0) {
            this.focusPosX = 0;
            return -1;
        } else {
            this.focusPosX = this.itemsPerLine[this.focusPosY] - 1;
            return -1;
        }
    };

    this.moveY = function (_direction) {
        this.focusPosY += _direction;
        if (this.focusPosY >= 0 && this.focusPosY < this.itemsPerLine.length) {
            if (this.focusPosX >= this.itemsPerLine[this.focusPosY]) {
                this.focusPosX = this.itemsPerLine[this.focusPosY] - 1;
            }
            return 0;
        } else if (this.focusPosY < 0) {
            this.focusPosY = 0;
            return -1;
        } else {
            this.focusPosY = this.itemsPerLine.length - 1;
            return -1;
        }
    };

    this.turnPage = function (_direction) {
        this.curMenuPageIndex += _direction;
        if (this.curMenuPageIndex >= 0 && this.curMenuPageIndex < this.menuPageArray.length) {
            return 0;
        } else if (this.curMenuPageIndex < 0) {
            this.curMenuPageIndex = 0;
            return -1;
        } else {
            this.curMenuPageIndex = this.menuPageArray.length - 1;
            return -1;
        }
    };

    this.doSelect = function (postfix) {
        window.location.href = 'more.html' + postfix;
    };
}
