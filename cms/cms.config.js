/**
 * 参数配置 *
 */

var cmsConfig = {
    //serverUrl : "http://localhost:8080/manage/web/",
    //imgUrl : "http://localhost:8080/manage/",
    //serverUrl : "http://192.168.55.10:8080/manage/web/",		//  给电脑用的
    //imgUrl : "http://192.168.55.10:8080/manage/",
    serverUrl: 'http://10.184.255.10:8080/manage/web/',		    //  给机顶盒用的
    imgUrl: 'http://10.184.255.10:8080/manage/',
    backUrl: '',
    index_back_url: '',
    environment: 'DEBUG',

    /**
     * 富美秀屿
     */
    indexResourceIdArray: [
        {title: '富美秀屿', resourceId: ''},
        // ---------------  菜单  ---------------  //


        // ---------------  海报（播放视频）  ---------------  //
        {title: '左侧海报', resourceId: '768'}
    ],

    /**
     * 秀屿新闻
     */
    newsResourceIdArray: [
        {title: '秀屿新闻', resourceId: ''},
        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '769'}
    ],

    /**
     * 部门荟萃
     */
    apartmentResourceIdArray: [
        {title: '部门荟萃', resourceId: ''},
        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //
        {title: '最新信息', resourceId: '770'}
    ],


    /**
     * 便民服务
     */
    serviceResourceIdArray: [
        {title: '便民服务', resourceId: ''},
        // ---------------  菜单  ---------------  //
        {title: '政策法规', resourceId: '771'}

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //
    ],

    operator: '',
    weather: '',
    temperature: '',
    windScale: ''
};