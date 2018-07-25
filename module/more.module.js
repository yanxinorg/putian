function MoreModule() {
    // 属性
    this.perRowsInPage = 2;         //  每页最多显示两行
    this.perItemsInRow = 5;         //  每行最多显示四项
    this.focusPosX = 0;             //  默认定位在第一行第一项
    this.focusPosY = 0;
    this.totalRows = 0;
    this.totalColumns = 0;

    this.pageIndex = 0;
    this.totalPages = 0;

    this.moreItemArray = [];
    this.logoImageSrc = '';
    this.contentLeft = 57;
    this.contentTop = 136;
    this.contentWidth = 1171;
    this.contentHeight = 515;
    this.cardLeft = 10;
    this.cardTop = 10;
    this.cardWidth = 182;
    this.cardHeight = 247;
    this.cardPadding = 192;
    this.lineSpacing = 267;
    this.marqueeNumber = 10;

    this.resourceId = '';
    this.resourceType = 'textures';
    this.backURL = '';

    this.testData = [
        [
            {assetid: 111, img: '../images/fun/eat/1.jpg', title: '春卷', flag: 0, id: 21, url: ''},
            {assetid: 111, img: '../images/fun/eat/2.jpg', title: '煎包', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/3.jpg', title: '荔枝肉', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/4.jpg', title: '红烧猪蹄', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/5.jpg', title: '拌面', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/6.jpg', title: '红团', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/7.jpg', title: '土笋冻', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/8.jpg', title: '蟹炖软豆腐', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/9.jpg', title: '兴化焖豆腐', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/10.jpg', title: '金钱粿', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/11.jpg', title: '兴化米粉', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/12.jpg', title: '手抓面', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/13.jpg', title: '海砺饼', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/14.jpg', title: '鱼丸', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/15.jpg', title: '虾菇', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/16.jpg', title: '温汤羊肉', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/17.jpg', title: '豆笋丁', flag: 0, id: 21},
            {assetid: 111, img: '../images/fun/eat/18.jpg', title: '葱饼', flag: 0, id: 21}
        ],
        []
    ];

    // 方法
    this.init = function (resourceId, pageIndex, callback) {
        var that = this;

        if (cmsConfig.environment === 'DEBUG') {
            this.resourceId = resourceId;
            this.pageIndex = pageIndex;
            this.totalPages = 1;
            // document.getElementById('more-page-index-current').innerText = this.pageIndex.toString();
            // document.getElementById('more-page-index-total').innerText = this.totalPages.toString();
            this.addMoreItem(this.testData[this.pageIndex]);
            callback();
        } else {
            if (this.resourceId !== '') {
                cmsApi.getListItems(this.resourceId, 8, pageIndex, function (response) {
                    if ('1' === response.code || 1 === response.code) {
                        if (response.dataArray.length > 0) {
                            that.pageIndex = pageIndex;
                            that.totalPages = response.total_page;
                            document.getElementById('debug-message').innerHTML += '<br/>' + 'Page index ==> ' + that.pageIndex + ' Total pages: ' + that.totalPages;
                            // document.getElementById('more-page-index-text').innerHTML = that.pageIndex + ' / ' + that.totalPages;
                            that.addMoreItem(response.dataArray);
                            callback();
                        }
                    }
                });
            }
        }
    };

    this.MathFloor = function (number, division) {
        var i = 1;
        while (number >= (i * division)) {
            i++;
        }

        return i - 1;
    };

    this.changePage = function (direction, callback) {
        var index;

        index = this.pageIndex + direction;
        if (index >= 1 && index <= this.totalPages) {
            this.focusOut();
            this.focusPosX = 0;
            this.focusPosY = 0;
            document.getElementById('debug-message').innerHTML += '<br/>' + 'changePage ==> direction = ' + direction + ' | page index = ' + index;
            this.init(this.resourceId, index, callback);
        }
    };

    this.addMoreItem = function (data) {
        var i,
            maxItems = this.perRowsInPage * this.perItemsInRow,
            length,
            card,
            cardImage,
            cardText,
            row,
            column,
            parent = document.getElementById('content'),
            children = parent.childNodes;

        // 设置页面标题图片
        // document.getElementById('self-define-logo').children[0].src = this.logoImageSrc;
        //  初始化卡片数组
        for (i = 0; i <= this.MathFloor(data.length, this.perItemsInRow); i++) {
            this.moreItemArray[i] = [];
        }
        //  移除内容下的元素
        for (i = children.length - 1; i >= 0; i--) {
            parent.removeChild(children[i]);
        }
        parent.style.left = this.contentLeft + 'px';
        parent.style.top = this.contentTop + 'px';
        parent.style.width = this.contentWidth + 'px';
        parent.style.height = this.contentHeight + 'px';

        for (i = 0, length = data.length; i < length && i < maxItems; i++) {
            //  构建新的卡片
            card = document.createElement('div');
            card.className = 'more-page-item';

            cardImage = document.createElement('img');
            if (cmsConfig.environment === 'DEBUG') {
                cardImage.src = data[i].img;
            } else {
                cardImage.src = cmsConfig.imgUrl + data[i].img;
            }
            cardImage.style.width = this.cardWidth + 'px';
            cardImage.style.height = this.cardHeight + 'px';


            cardText = document.createElement('div');
            cardText.id = 'more-page-item-text-' + i;
            cardText.className = 'more-page-item-text';
            cardText.innerHTML = data[i].title;
            // cardText.style.top = this.cardTop + 'px';
            cardText.style.width = this.cardWidth + 'px';

            card.appendChild(cardImage);
            card.appendChild(cardText);

            row = this.MathFloor(i, this.perItemsInRow);
            column = i % this.perItemsInRow;

            this.totalRows = row + 1;
            this.totalColumns = column + 1;
            card.style.left = this.cardLeft + (column * this.cardPadding) + 'px';
            card.style.top = this.cardTop + (row * this.lineSpacing) + 'px';
            card.style.width = this.cardWidth + 'px';
            card.style.height = this.cardHeight + 'px';

            this.moreItemArray[row][column] = {
                assetid: data[i].assetid,
                img: data[i].img,
                title: data[i].title,
                flag: parseInt(data[i].flag),
                id: data[i].id,
                date: data[i].date,
                url: data[i].url,
                left: this.contentLeft + this.cardLeft + (column * this.cardPadding),
                top: this.contentTop + this.cardTop + (row * this.lineSpacing),
                width: this.cardWidth,
                height: this.cardHeight
            };

            document.getElementById('content').appendChild(card);
        }
    };

    this.focusOn = function (cursor) {
        var _num = this.focusPosY * this.perItemsInRow + this.focusPosX;

        if (this.moreItemArray[0].length > 0) {
            cursor.style.visibility = 'visible';
            cursor.style.left = this.moreItemArray[this.focusPosY][this.focusPosX].left + 'px';
            cursor.style.top = this.moreItemArray[this.focusPosY][this.focusPosX].top + 'px';
            cursor.style.width = this.moreItemArray[this.focusPosY][this.focusPosX].width + 'px';
            cursor.style.height = this.moreItemArray[this.focusPosY][this.focusPosX].height + 'px';

            showTitleForMarquee(this.moreItemArray[this.focusPosY][this.focusPosX].title, document.getElementById('more-page-item-text-' + _num), this.marqueeNumber);
        }

    };

    this.focusOut = function (cursor) {
        cursor.style.visibility = 'hidden';

        var _num = this.focusPosY * this.perItemsInRow + this.focusPosX;
        if (this.moreItemArray[0].length > 0) {
            document.getElementById('more-page-item-text-' + _num).innerHTML = this.moreItemArray[this.focusPosY][this.focusPosX].title;
        }
    };

    this.moveX = function (_direction) {
        this.focusPosX += _direction;
        if (this.focusPosX >= 0 && this.focusPosX < this.moreItemArray[this.focusPosY].length) {

        } else if (this.focusPosX < 0) {
            if (this.focusPosY > 0) {
                this.focusPosY--;
                this.focusPosX = this.moreItemArray[this.focusPosY].length - 1;
            } else {
                this.focusPosX = 0;
                return -1;
            }
        } else {
            if (this.focusPosY < this.totalRows - 1) {
                this.focusPosY++;
                this.focusPosX = 0;
            } else {
                this.focusPosX = this.moreItemArray[this.focusPosY].length - 1;
                return -1;
            }

        }
        return 0;
    };

    this.moveY = function (_direction) {
        this.focusPosY += _direction;
        if (this.focusPosY >= 0 && this.focusPosY < this.totalRows) {
            if (this.focusPosX > this.moreItemArray[this.focusPosY].length - 1) {
                this.focusPosY = 0;
            }

        } else if (this.focusPosY < 0) {
            this.focusPosY = 0;
            return -1;
        } else {
            this.focusPosY = this.totalRows - 1;
            return -1;
        }
        return 0;
    };

    this.doSelect = function (postfix) {
        switch (this.resourceType) {
            case 'textures':
                window.location.href = 'detail.html' + postfix;
                break;
            case 'monitor':
                window.location.href = 'monitor.html' + postfix;
                break;
            default:
                break;
        }
    };
}