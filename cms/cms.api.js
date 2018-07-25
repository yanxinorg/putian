var cmsApi = {
    doGet: function (url, response) {
        var postman = new Postman();

        document.getElementById("debug-message").innerHTML += "<br/>" + " URL ==> " + url;
        postman.createXmlHttpRequest(
            function (result) {
                var json = eval('(' + result + ')');
                document.getElementById("debug-message").innerHTML += "<br/>" + " Response:" + result;
                response(json);
            },
            function (err) {
                document.getElementById("debug-message").innerHTML += "<br/>" + " Error ==> " + err;
                response(err);
            });
        postman.sendRequest(
            "GET",
            url,
            null
        );
    },

    /**
     * 不对返回结果作JSON化处理
     * @param url
     * @param response
     */
    doGet2: function (url, response) {
        var postman = new Postman();

        document.getElementById("debug-message").innerHTML += "<br/>" + " URL ==> " + url;
        postman.createXmlHttpRequest(
            function (result) {
                document.getElementById("debug-message").innerHTML += "<br/>" + " Response:" + result;
                response(result);
            },
            function (err) {
                document.getElementById("debug-message").innerHTML += "<br/>" + " Error ==> " + err;
                response(err);
            });
        postman.sendRequest(
            "GET",
            url,
            null
        );
    },

    doPost: function (url, data, response) {
        var postman = new Postman();

        postman.createXmlHttpRequest(
            function (result) {
                response(result);

            },
            function (err) {
                response(err);
            }
        );
        postman.sendRequest(
            "POST",
            url,
            data);
    },

    /**
     * 获取图文列表项
     * @param resoureId
     * @param num
     * @param curPage
     * @param response
     */
    getListItems: function (resoureId, num, curPage, response) {
        var url = cmsConfig.serverUrl +
            "queryTitleListMobile.shtml?resourceId=" + resoureId + "&num=" + num + "&cur_page=" + curPage;

        this.doGet(url, response);
    },

    /**
     * 获取图文详情
     * @param id
     * @param response
     */
    getListItemDetails: function (id, response) {
        var url = cmsConfig.serverUrl +
            "queryTitleByIdMobile.shtml?id=" + id;

        document.getElementById("debug-message").innerHTML += "<br/>" + "getListItemDetails   ==>  URL ==> " + url;

        this.doGet(url, response);
    },

    /**
     * CMS后台管理系统
     * 获取视频播放的AssetId
     * @param resourceId
     * @param response
     */
    fetchVideoAssetId: function (resourceId, response) {
        var url = cmsConfig.serverUrl +
            "queryTitleListMobile.shtml?resourceId=" + resourceId + "&num=1&cur_page=1";

        document.getElementById("debug-message").innerHTML += "<br/>" + "fetchVideoAssetId  ==>  URL ==> " + url;

        this.doGet(url, response);
    },

    /**
     * 根据AssetId获取视频的详细参数
     * @param ip
     * @param port
     * @param assetId
     * @param client
     * @param account
     * @param response
     */
    fetchVideoDetails: function (ip, port, assetId, client, account, response) {
        var url = "http://" + ip + ":" + port + "/GetItemData",
            data = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><GetItemData titleAssetId='" + assetId
                + "' portalId='1' client='" + client
                + "' account='" + account
                + "' languageCode='Zh-CN' profile='1'/>";

        document.getElementById("debug-message").innerHTML += "<br/>" + "fetchVideoDetails  ==>  URL ==> " + url;
        document.getElementById("debug-message").innerHTML += "<br/>" + "Data ==> " + encodeURI(data);

        this.doPost(url, data, response);
    },

    /**
     * 获取RTSP流
     * @param ip
     * @param port
     * @param assetId
     * @param client
     * @param account
     * @param serviceId
     * @param response
     */
    fetchRtspStream: function (ip, port, assetId, client, account, serviceId, response) {
        var url,
            data;

        url = "http://" + ip + ":" + port + "/SelectionStart";
        data = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><SelectionStart titleAssetId='" + assetId
            + "' folderAssetId='" + assetId
            + "' portalId='1'  client='" + client
            + "' account='" + account
            + "' serviceId='" + serviceId + "'/>";

        document.getElementById("debug-message").innerHTML += "<br/>" + "fetchRtspStream    ==>   URL ==> " + url;
        document.getElementById("debug-message").innerHTML += "<br/>" + "Data ==> " + encodeURI(data);

        this.doPost(url, data, response);
    },

    /**
     * 播放视频
     * @param rtsp
     * @param previewAssetId
     * @param startTime
     * @param purchaseToken
     * @param assetId
     * @param video
     * @param resumePoint
     * @param backURL
     */
    playVideo: function (rtsp, previewAssetId, startTime, purchaseToken, assetId, video, resumePoint, backURL) {
        var
            _link,
            playUrl = rtsp[0] + ";" + rtsp[1] + ";" + rtsp[2] + ";areacode=" + VOD.areaCode + ";client=" + CAManager.cardSerialNumber;

        GlobalVarManager.setItemStr("vodPlayUrl", playUrl);
        // playUrl
        // rtsp://10.215.0.50:554/;purchaseToken=2264654112;serverID=10.215.0.12:8080;areacode=3069;client=8350310392603009

        document.getElementById("debug-message").innerHTML += "<br/>" + "GlobalVarManager.setItemStr ==> vodPlayUrl ==> " + playUrl;

        _link =
            "http://vod.fjgdwl.com:80/gldb/NEW_UI/vodPlay/vodPlay.htm?previewId=" + previewAssetId +
            "&startTime=" + startTime + "&purchaseToken=" + purchaseToken +
            "&playCurrName=" + video.titleFull + "&assetId=" + assetId +
            "&rentDateTime=" + video.RentalInfo[0].rentDateTime + "&providerId=" + video.providerId +
            "&displayRunTime=" + video.displayRunTime + "&folderAssetId=" + video.folderAssetId +
            "&resumePoint=" + resumePoint + "&from=" + backURL;

        document.getElementById("debug-message").innerHTML += "<br/>" + "playVideo ==> =" + _link;
        window.location.href = _link;
    },

    fetchWeatherReport: function (response) {
        var _url = "http://10.215.0.36/weather/sy/PUTIAN.js";

        this.doGet2(_url, response);
    }
};