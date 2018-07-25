function BarComponent() {
    BarModule.call(this);

    this.barItemArray = [
        {
            title: '最新动态',
            resourceId: 0,
            url: 'index.html',
            left: 0,
            width: 154
        },
        {
            title: '明星楼盘',
            resourceId: 0,
            url: 'house.html',
            left: 132,
            width: 132
        },
        {
            title: '家居建材',
            resourceId: 0,
            url: '',
            left: 260,
            width: 138
        },
        {
            title: '二手房市场',
            resourceId: 0,
            url: '',
            left: 393,
            width: 142
        },
        {
            title: '土地拍卖',
            resourceId: 0,
            url: '',
            left: 525,
            width: 148
        }
    ];
}