/* -------------------------------------------------------------------------------------------- */
/* -----------------------------------------   图文列表助手   --------------------------------- */
/* -------------------------------------------------------------------------------------------- */

function ListModule() {
    var that = this;

    // 属性
    this.focusPos = 0;
    this.listItemNum = 0;
    this.listItemTitleArray = [];

    this.boardLeft = 880;
    this.boardTop = 134;
    this.boardWidth = 380;
    this.boardHeight = 300;

    this.itemLeft = 888;
    this.itemTop = 182;
    this.itemWidth = 365;
    this.itemHeight = 42;

    this.itemMoreLeft = 1088;
    this.itemMoreTop = 390;
    this.itemMoreWidth = 158;
    this.itemMoreHeight = 42;

    this.listItemTop = 50;
    this.interval = 35;
    this.marqueeCount = 13;

    this.noticesBoardBarWidth = 380;
    this.noticesBoardBarHeight = 40;
    this.noticesBoardBarBgSrc = 'url(../images/list/list-item-bar.png) no-repeat';

    this.resourceId = '';

    this.init = function (callback) {
        var that = this,
            noticesBoard,
            noticesBoardBar;

        if (cmsConfig.environment === 'DEBUG') {
            var test = [
                {assetid: 611, title: '城厢区是福建省莆田市辖区，亦称...', img: '', flag: 0, id: 111},
                {assetid: 611, title: '仙游县地处福建东南沿海中部，湄...', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '荔城区位于福建东南沿海中部，北...', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '城厢区是福建省莆田市辖区，亦称...', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '涵江区位于福建省莆田市东部沿海...', flag: 0, id: 111},
                {assetid: 611, title: '秀屿区位于福建东南沿海中部，与...', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111}

            ];
            this.addListItem(test);
        } else {
            if (this.resourceId !== '') {
                cmsApi.getListItems(this.resourceId, this.listItemNum + 1, 1, function (response) {
                    if (response.hasOwnProperty('code')) {
                        if ('1' === response.code || 1 === response.code) {
                            that.addListItem(response.dataArray);
                        }
                    }
                    callback();
                });
            }
        }
        noticesBoard = document.getElementById('notices_board');
        noticesBoard.style.left = this.boardLeft + 'px';
        noticesBoard.style.top = this.boardTop + 'px';
        noticesBoard.style.width = this.boardWidth + 'px';
        noticesBoard.style.height = this.boardHeight + 'px';

        noticesBoardBar = document.getElementById('notices_board_bar');
        noticesBoardBar.style.background = this.noticesBoardBarBgSrc;
        noticesBoardBar.style.width = this.noticesBoardBarWidth + 'px';
        noticesBoardBar.style.height = this.noticesBoardBarHeight + 'px';

        if (cmsConfig.environment === 'DEBUG') {
            callback();
        }
    };

    this.removeAllListItem = function () {
        while (this.listItemTitleArray.length > 0) {
            this.listItemTitleArray.pop();
        }
    };

    this.addListItem = function (array) {
        var j,
            length,
            newListItem,
            newListItemText;

        this.removeAllListItem();

        for (j = 0, length = array.length; (j < length) && (j < this.listItemNum); j++) {
            newListItem = document.createElement('div');
            newListItem.className = 'list_item';
            newListItem.style.width = (this.itemWidth - 10) + 'px';
            newListItem.style.top = this.listItemTop + (j * this.interval) + 'px';
            newListItemText = document.createElement('div');
            newListItemText.id = 'list_item_text_' + j;
            newListItemText.className = 'list_item_text';
            newListItemText.innerHTML = array[j].title;
            newListItemText.style.color = '#000000';
            newListItemText.style.width = (this.itemWidth - 20) + 'px';
            newListItem.appendChild(newListItemText);
            document.getElementById('notices_board').appendChild(newListItem);

            this.listItemTitleArray.push({
                assetID: array[j].assetid,
                title: array[j].title,
                img: array[j].img,
                flag: 0,
                id: array[j].id,
                left: this.itemLeft,
                top: this.itemTop + (j * this.interval),
                width: this.itemWidth,
                height: this.itemHeight
            });
        }

        if (array.length > this.listItemNum) {
            this.listItemTitleArray.push({
                assetID: 0,
                title: '',
                img: '',
                flag: -1,
                id: 0,
                left: this.itemMoreLeft,
                top: this.itemMoreTop,
                width: this.itemMoreWidth,
                height: this.itemMoreHeight
            });
        }
    };

    this.focusOn = function (cursor) {

        if (this.listItemTitleArray.length > 0 &&
            this.focusPos < this.listItemTitleArray.length) {
            cursor.style.visibility = 'visible';
            cursor.style.left = this.listItemTitleArray[this.focusPos].left + 'px';
            cursor.style.top = this.listItemTitleArray[this.focusPos].top + 'px';
            cursor.style.width = this.listItemTitleArray[this.focusPos].width + 'px';
            cursor.style.height = this.listItemTitleArray[this.focusPos].height + 'px';

            var _focusListItem = document.getElementById('list_item_text_' + this.focusPos);
            if ((typeof(_focusListItem) !== 'undefined') && (this.listItemTitleArray[this.focusPos].flag === 0)) {
                showTitleForMarquee(this.listItemTitleArray[this.focusPos].title, _focusListItem, this.marqueeCount);
            }
        }
    };

    this.focusOut = function (cursor) {
        var _focusListItem = document.getElementById('list_item_text_' + this.focusPos);

        cursor.style.visibility = 'hidden';
        if ((typeof (_focusListItem) !== 'undefined') && (that.listItemTitleArray[that.focusPos].flag === 0)) {
            _focusListItem.innerHTML = that.listItemTitleArray[that.focusPos].title;
        }
    };

    this.moveX = function (_direction) {
        return -1;
    };

    this.moveY = function (_direction) {
        this.focusPos += _direction;
        if (this.focusPos >= 0 && this.focusPos < this.listItemTitleArray.length) {
            return 0;
        } else if (this.focusPos < 0) {
            this.focusPos = 0;
            return -1;
        } else {
            this.focusPos = this.listItemTitleArray.length - 1;
            return -1;
        }
    };

    this.doSelect = function (postfix) {
        if (this.listItemTitleArray[this.focusPos].flag === 0) {           // 图文详情
            window.location.href = 'textures.html' + postfix;
        } else {                                                            // 更多内容
            window.location.href = 'more.html' + postfix;
        }
    };
}