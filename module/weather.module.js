/*-----------------------------------------------------------------------------------*/
/*------------------------------------- 天气预报  -----------------------------------*/
/*-----------------------------------------------------------------------------------*/
function WeatherModule() {
    var that = this;

    // 属性
    this.weather = '';
    this.temperature = '';
    this.windScale = '';

    // 方法
    this.init = function (callback) {
        document.getElementById('debug-message').innerHTML += '<br/>' + ' weather ==> init ';
        cmsApi.fetchWeatherReport(function (response) {
            if ('错误' !== response) {
                eval(response);
                that.weather = iPanel.misc.getUserCharsetStr(mainArray[0].t0[0].weather, 'UTF8');
                that.temperature = iPanel.misc.getUserCharsetStr(mainArray[0].t0[0].temperature, 'UTF8');
                that.windScale = iPanel.misc.getUserCharsetStr(mainArray[0].t0[0].wind, 'UTF8');
                document.getElementById('debug-message').innerHTML += '<br/>' + '  weather ==> ' + that.weather;
                document.getElementById('debug-message').innerHTML += '<br/>' + '  temperature ==> ' + that.temperature;
                document.getElementById('debug-message').innerHTML += '<br/>' + '  windScale ==> ' + that.windScale;
                callback();
            }
        });
    };
}
