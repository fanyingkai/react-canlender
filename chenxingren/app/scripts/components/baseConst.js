import $ from './jquery.js';

var api_base_url = '//aos-dev.mi-ae.cn/';//   '//365-qa-v2.mi-ae.com.cn/';////365-dev.mi-ae.com.cn/';////365-qa-v2.mi-ae.com.cn/';

function getCookie(name) {
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
}
function setCookie(name, value, expstr) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        if (expstr) {
                exp.setTime(expstr * 1000);
        }
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function makeiframe(url) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('class', 'ifm_bracelet');
        iframe.setAttribute('src', url);
        iframe.setAttribute('class', 'hide');
        iframe.setAttribute('frameBorder', 0);
        iframe.setAttribute('scrolling', 'yes');
        (document.getElementsByTagName("body"))[0].appendChild(iframe);
}

var pageinnerHeight = getCookie("pageinnerHeight") ? getCookie("pageinnerHeight") : window;
if (getCookie("pageinnerHeight")) {
        pageinnerHeight = getCookie("pageinnerHeight");
} else {
        pageinnerHeight = window.innerHeight;
        setCookie('pageinnerHeight', window.innerHeight);
}
var Const = {
        //定义项目信息
        /*build change with gulp start*/
        'api_base_url': api_base_url,
        /*build change with gulp end*/
        'base_url': window.location.origin,
        'share_base_url': window.location.origin + window.location.pathname + '%23my365/',
        'share_base_url_2': window.location.origin + window.location.pathname + '#my365/',
        'app_id': '10200104',
        'auth_in_header': 'true',
        'cascade_auth': false,
        'innerHeight': parseInt(pageinnerHeight) + 45
}
makeiframe('bracelet://cn.com.hm.health/set_title_visible?visible=false');
var al_init = {
        'cnzz': {
                'siteid': '1258281920',
                'url': '//s95.cnzz.com/z_stat.php'
        },
        'baidu': {
                'siteid': '5a8600aaf18f35c77ca2e278e514d7cd',
                'url': "//hm.baidu.com/hm.js"
        },
        'huami': {
                'siteid': '2d29202638',
                'url': "//hfe-log-api.mi-ae.cn/u.gif"
        }
};
var monthawards = [
        {
                worth: 100,
                name: '无门槛使用'
        },
        {
                worth: 30,
                name: '满100元可用'
        },
        {
                worth: 20,
                name: '满80元可用'
        },
        {
                worth: 10,
                name: '无门槛使用'
        }
];

var getProfile=function(remoteurl, data) {
  var type = "get";
  if (data) {
          type = "post";
  }
  if (type === "get") {
          var va = $.ajax({
                  url: remoteurl,
                  async: false,
                  type: type,
                  dataType: "json",
                  success: function () {
                  }
          });
  } else {
          var va = $.ajax({
                  url: remoteurl,
                  async: false,
                  type: type,
                  data: data,
                  dataType: "json",
                  success: function () {
                  }
          });
  }
  var cur_profile = va.responseText;
  return cur_profile;
}