import Const from  '../components/baseConst.js'
var react_apiHelper=(function(){
        function apiHelper() {
                this.uid = '';
                this.access_token = '';
                this.activityId = '';
                this.postfix = '';
                this.bearer_token = '';
                this.setCookie('auth_in_header', 'true');
                if (Const.cascade_auth) {
                        if (this.getCookie('auth_in')) {
                                var Days = 2;
                                var exp = new Date();
                                this.setCookie('auth_in_header', 'false', exp.getTime() / 1000 + Days * 24 * 60 * 60);
                        } else {

                        }
                }
                this.checkAuth();
        }
        apiHelper.prototype.getQueryStringByName = function (name) {
                var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1) {
                        return "";
                }
                return result[1];
        }
        apiHelper.prototype.getCookie = function (name) {
                var bikky = document.cookie;
                name += "=";
                var i = 0;
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
        };
        apiHelper.prototype.setCookie = function (name, value, expstr) {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                if (expstr) {
                        exp.setTime(expstr * 1000);
                }
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
        apiHelper.prototype.os = function () {
                var explorer = navigator.userAgent, browse;
                if (explorer.indexOf("iPhone") >= 0) {
                        return("ios");
                } else if (explorer.indexOf("Android") >= 0) {
                        return("android");
                } else {
                        return("otheros");
                }
        }
        apiHelper.prototype.getURLParameter = function (name) {
                return decodeURI(
                        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
                        );
        }
        apiHelper.prototype.setActivityId = function (id) {
                this.activityId = id;
        };
        apiHelper.prototype.getUid = function () {
                return this.uid;
        };
        apiHelper.prototype.getAccessToken = function () {
                return this.access_token;
        };
        apiHelper.prototype.setActivityId = function (id) {
                this.activityId = id;
        };
        apiHelper.prototype.getActivityId = function () {
                return this.activityId;
        };
        apiHelper.prototype.getActivityNick = function () {
                var nick = ''
                if (this.activityId == '2d29202638') {
                        nick = 'january';
                } else if (this.activityId == '87cbc20255') {
                        nick = 'february';
                } else if (this.activityId == '5289e69491') {
                        nick = 'march';
                } else if (this.activityId == '10200104') {
                        nick = 'april';
                } else {
                        nick = 'unknown_month'
                }
                return nick;
        };
        apiHelper.prototype.makePath = function (route) {
                return window.location.origin + window.location.port + window.location.pathname + window.location.search + route;
        }
        //type: 枚举(string|int), 决定返回值类型是string，还是int
        apiHelper.prototype.appversion = function (type) {
                var useragent = navigator.userAgent;
                var appversion = useragent.split("com.xiaomi.hm.health/");
                appversion = appversion[1];
                var ios_regexp = /^\d.*\.\d.*\.\d.*/;
                var android_regexp = /^\d{1,4}_\d.*\.\d.*\.\d.*/;
                if (appversion) {
                        if (this.os() == 'ios') {
                                var matched_ios = appversion.match(ios_regexp);
                                if (matched_ios == appversion) {
                                        if (type == 'int') {
                                                return versiontoInt(appversion, "ios");
                                        } else if (type == 'string') {
                                                return appversion;
                                        }
                                }
                        } else if (this.os() == 'android') {
                                var matched_android = appversion.match(android_regexp);
                                if (matched_android == appversion) {
                                        if (type == 'int') {
                                                return versiontoInt(appversion, "android");
                                        } else if (type == 'string') {
                                                return appversion;
                                        }
                                }
                        }
                }
                function versiontoInt(appversion, os) {
                        var appver = 0;
                        var originver = appversion.split('.');
                        if (os == 'ios') {
                                appver = originver[0].split("_")[1];
                        } else if (os == 'android') {
                                var bigversion = originver[0].split("_")[1];
                                appver = Math.round(((bigversion) * 10 + parseInt(originver[1])) / 10);
                        }
                        return appver;
                }
                return 1;

        }
        apiHelper.prototype.getCommonParams = function () {
                var result = {
                        app_key: this.getActivityId(),
                        uid: this.uid,
                        access_token: this.access_token,
                        auth: mi_auth
                }
                return result;
        }
        apiHelper.prototype.checkAuth = function () {
                var urlhash = window.location.hash;
                if (urlhash.match("#my365/shared/") || urlhash.match("#my365/notice")) {
                        return;
                }
                var that = this;
                if (this.getCookie('auth') == null && that.getCookie('auth_in_header') == "true") {
                        var loginApi = new Backbone.Model;
                        loginApi.url = Const.api_base_url + 'v1/auth';
                        loginApi.save(this.getCommonParams(), {
                                async: false,
                                success: function (e) {
                                        that.setCookie('auth', 'Bearer ' + e.get('access_token'));
                                },
                                error: function (a, b) {
                                        var access_token = '';
                                        if (a.get('access_token') == '') {
                                                access_token = 'null';
                                        } else {
                                                access_token = a.get('access_token');
                                        }
                                        that.setCookie('auth', 'Bearer ' + access_token);
                                        var error_code = parseInt(eval("(" + b.responseText + ")").error_code);
                                        var error_message = encodeURIComponent(parseInt(eval("(" + b.responseText + ")").error_message));
                                        setTimeout(function () {
                                                if (Const.cascade_auth) {
                                                        window.location.reload();
                                                } else {
                                                        if (error_code == 40500) {
                                                                window.location.reload();
                                                        } else if (error_code == 40301 || error_code == 40302) {
                                                                makeiframe("bracelet://cn.com.hm.health/invalid_login?response="+error_message);
                                                        } else if (error_code == 40303) {
                                                                makeiframe("bracelet://cn.com.hm.health/login");
                                                        }
                                                }
                                        }, 500)
                                }
                        });
                }
        }
        var myApiHelper = new apiHelper();
        var parent = myApiHelper.constructor.prototype;
        var mi_uid = myApiHelper.getCookie('userid');
        var mi_token = myApiHelper.getCookie('security');
        var mi_auth = myApiHelper.getCookie('auth');
        /*build change with gulp start*/
        myApiHelper.uid = mi_uid;
        myApiHelper.access_token = mi_token;
        /*build change with gulp end*/
//        alert(mi_uid+": " + myApiHelper.access_token);
        //for test
        myApiHelper.uid = '' + '623680719'
        myApiHelper.access_token = '' + '2cDN5MjM5UDNxYSR0kTN2E0MyAjQ4cTL0UDOB1SMFNzMtQTQGBTL3EDRxQ0NzQjJ5EzNwgjNzIjN';
        //for test
        mi_uid = myApiHelper.uid;
        mi_token = myApiHelper.access_token;
        if (myApiHelper.getQueryStringByName("userid")) {
                mi_uid = myApiHelper.uid = myApiHelper.getQueryStringByName("userid");
        }
        if (myApiHelper.getQueryStringByName("security")) {
                mi_token = myApiHelper.access_token = myApiHelper.getQueryStringByName("security");
        }
        parent.uid = mi_uid;
        parent.mi_token = mi_token;
        return {
                helper: myApiHelper
        };

})();

export default react_apiHelper
