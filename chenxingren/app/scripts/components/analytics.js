
import Apihelper from  '../components/apihelper.js'

var analytics =(function(){
        function init(params) {
                innerInit(params);
        }
        var conf = null;
        function innerInit(params) {
                conf = params;
                if (params.hasOwnProperty("huami")) {
                        var message = new Object({
                                t: 'pageview',
                                sid: params.huami.siteid,
                                sc: window.screen.width + "_" + window.screen.height
                        });
                        addScript('//' + params.huami.url + "?t=" + message.t + "&sid=" + message.sid + "&sc=" + message.sc + "&u=" + Apihelper.helper.getUid(), function () {});
                }
                //baidu initon innerInit(params) {
                if (params.hasOwnProperty("baidu")) {
                        //window._hmt = _hmt || [];
                        (function () {
                                var hm = document.createElement("script");
                                hm.src = params.baidu.url + "?" + params.baidu.siteid;
                                var s = document.getElementsByTagName("script")[0];
                                s.parentNode.insertBefore(hm, s);
                        })();
                }
                //cnzz init

                if (params.hasOwnProperty("cnzz")) {
                        //window._czc = _czc || [];
                        (function () {
                                var cnzz = document.createElement("script");
                                cnzz.src = params.cnzz.url + "?id=" + params.cnzz.siteid;
                                var s = document.getElementsByTagName("script")[0];
                                s.parentNode.insertBefore(cnzz, s);
                        })();
                }
        }
        function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                        return unescape(r[2]);
                return null;
        }
        function getCookie(name) {
                //获得cookie  
                var bikky = document.cookie;
                name += "=";
                var i = 0;
                //如果cookie 不为空则 循环截取出 相应 名称 的cookie值  
                while (i < bikky.length) {
                        var offset = i + name.length;
                        if (bikky.substring(i, offset) == name) {
                                var endstr = bikky.indexOf(";", offset);
                                if (endstr == -1)
                                        endstr = bikky.length;
                                return unescape(bikky.substring(offset, endstr));
                        }
                        i = bikky.indexOf(" ", i) + 1;
                        if (i == 0)
                                break;
                }
                return null;
        }
        //all event                 

        function push(data) {
                if (conf.hasOwnProperty("huami")) {
                        if (data[0] === '_trackPageview') {
                                addScript('//' + conf.huami.url + '?t=event&sid=' + conf.huami.siteid + "&sc=" + window.screen.width + "_" + window.screen.height + "&iw=" + window.innerWidth + "&ih=" + Const.innerHeight + "&eventCategory=_trackPageview&page="+window.location.protocol+"//" + encodeURIComponent(window.location.host + window.location.pathname + window.location.hash), function () {
                                });
                        } else if (data[0] === '_trackEvent') {
                                addScript('//' + conf.huami.url + '?t=event&sid=' + conf.huami.siteid + "&sc=" + window.screen.width + "_" + window.screen.height + "&iw=" + window.innerWidth + "&ih=" + Const.innerHeight + "&eventCategory=" + data[0] + "%2C" + data[1] + "%2C" + data[2] + "%2C" + data[3] + "%2C" + data[4] + "%2C" + data[5], function () {
                                });
                        }

                }
                if (conf.hasOwnProperty("baidu")) {
                        if (data[0] === '_trackPageview') {
                                var pageURL = window.location.pathname + window.location.hash; 
                               setTimeout(function () {
                                        _hmt.push(['_trackPageview', pageURL, Apihelper.helper.appversion()])
                                }, 1000);
                        } else if (data[0] === '_trackEvent') {
                                _hmt.push(data);
                        }

                }
                if (conf.hasOwnProperty("cnzz")) {
                        if (data[0] === '_trackPageview') {
                                var pageURL = window.location.pathname + window.location.hash;
                                setTimeout(function () {
                                        _czc.push(['_trackPageview', pageURL, Apihelper.helper.appversion()]);
                                }, 1000);
                        } else if (data[0] === '_trackEvent') {
                                _czc.push(data);
                        }
                }
        }
        function addScript(url, callback) {
                var script = document.createElement("script"),
                        scriptLoaded = 0;

                // IE和opera支持onreadystatechange
                // safari、chrome、opera支持onload
                script.onload = script.onreadystatechange = function () {
                        // 避免opera下的多次调用
                        if (scriptLoaded) {
                                return;
                        }
                        var readyState = script.readyState;
                        if ('undefined' == typeof readyState || readyState == "loaded" || readyState == "complete") {
                                scriptLoaded = 1;
                                try {
                                        callback();
                                } finally {
                                        script.onload = script.onreadystatechange = null;
                                        script.parentNode.removeChild(script);
                                }
                        }
                };
                script.asyn = 0;
                script.src = url;
                var lastScript = document.getElementsByTagName("script")[0];
                lastScript.parentNode.insertBefore(script, lastScript);
        }
        //gulp anlytics return {push: push, init: init};
        return {push: push, init: init};
        })();

        export default analytics;



