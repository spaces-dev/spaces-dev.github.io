// ==UserScript==
// @name            Spaces+
// @namespace       https://github.com/spaces-dev/SpacesPlus
// @description     The script is designed to extend the functionality Spaces.ru
// @author          Creator: Maximoff, Updated: crashmax & molimawka
// @icon            https://spaces-dev.github.io/favicon.png
// @include         /^(http|https):\/\/(spaces\.ru|spac\.me|spcs\.me|spaces\.im|gdespaces\.com|spac1\.com|spac1\.net).*$/
// @match           *://(spaces.ru|spac.me|spcs.me|spaces.im|gdespaces.com|spac1.com|spac1.net)/*
// @version         2.3.0
// @grant           none
// @require         https://spaces-dev.github.io/src/attaches/js/colorpicker.js
// @downloadURL     https://spaces-dev.github.io/spaces-plus.user.js
// @updateURL       https://spaces-dev.github.io/spaces-plus.meta.js
// ==/UserScript==

(function() {
    function spacesPlus() {
        var _PROTOCOL = document.location.protocol.toString();
        var _DOMAIN = document.location.hostname.toString();
        var VERSION = 230;
        var BETA = false;
        var Device = window.Device || unsafeWindow.Device;
        var onlineLock = null;
        var favLock = null;
        var favRLock = null;
        var banLock = null;
        var eventsCounter = 0;
        var countFriends = 0;
        var commentsLength = 0;
        var friendsForce = 0;
        var playerId = -1;
        var reCount = 0;
        var angleI = 0;
        var angleV = 0;
        var videoPlayback = 1;
        var gitPages = 'spaces-dev.github.io';
        var ICON48 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMEElEQVR42sVaCVRURxaNiWSfSXJOEo1RR4MZFzIqETegQQzRMZyZMRIVohgFFUWQHUGa7qYBUXFBFAwuQBABEUT2rbsBh01FHYk5xi1KHBfimjBGhK7cqfq90E3/bjSSpM+5h8/v+lX3vnrv1av6/cwzT/sB+s3NyXluQnKzGfvbW3O9tvTZZ/6wj0Ty7DRJdX++r+j9VwUxR96xi6odzsCu2T0jbfuzvv5Q4rZi2V/tI2uWTIus/lIQqaixF8svCMTyNnuJ4h4Dd83u0e9YG9aWPfO7C2FTr2tlSsTNTqKooCTbKfCEaOeepX3MiKt4hW+Mvvuo/VxzPU1avcJOLD+nS8hOrPhFIJaRxwFrq/+s/BzrUxMT3Gz0VXzoBqaDVDHZLlLRpB1YoiDUNbq4v084A3zPCiLlTWwMvrGfmjy1kJ99pEKpHVwiU/4KtzECmVIrhI4hkMj9nlqE7oP2YkWSdjBmtR4u0Bfg+qR9a/63FVV++etF6GQD2tl+jdWZ//Y18Z7gYkQ9GwJRZSal0O/JROgEDw2unT075cP02FpMi+Jmxyixj8UKzIttwKfRdZgm6j0+NMayDS9L1oh4rMDW5Hi7SJmvpjNe8pTs9PW1WFl1HSEnHiCg4Ue45Zzn7tnpCqHXn0UeQVrKbZRkdqFwXwd27LqGL2KPYpoJwapxa2jGksE6vChAl1uveZ4uPJM0AWvcbaqwvPIG1pwhegg59RBuuRfguLGOtpHDQViJxO3XULKP6KF0fxd27WqDe2wzHE24EycmolI5NeCgtel1QsfvqQWbNAHLS55abta2Bvj/5xGCviYGCKYIaP4ZbocuwyPuOPJTOlCcTnhRlN6FlD23sCT2GBzEPG6o5mATVnKMUnu2J1dD1xHJPLVTaCTbUIvArbgV/i3EJAJbuvDd1VycbaxDZfZPKEojRlG8T4mMvfexIvYkHHWEMA6cK4mqMDUo15vfldSKJkiKXqY+d06Tm41Z/6PNR+B9qhM+p4lJ7Pj2IpR314NQ/O9aIi42V6Ai80cUpipRmEL4kdaF1N334LOhBR+Ju9cJLqDXFp0fsUDyZ4NZ0CiyDS93616ojAQXtb7L4StYeYoYxYqTSiypvImshjzUn9jO4XorExKJn29sQktNPQ7vJaaRosSunTfhGFGlDmrVLEzyzfLQnwWd1CSIqKzozfenb6yBe+PPWHaSGIVr8U3MXFcNt6hCLKL4NLoMqeV78eiWCOSOEJ0/SKDIbUX+bmIShyi8JEdV7qTmNDUkX6aNBcZds0BMDs59nzZqNzUDVCDm5F3GkhPEJJzzr2KZOB+nw6PxrVCKaNE+rN6Ti/YbYSC3gzmcrS9BXjLpFYFhx7lZ5zhFVkMQXtY+btkWC+3ipklLNmHFHtol3Yj17dcpsLCpA27HiUm4Hr6AleI8XBGK0RYejv0RiVi9Owft1wNBbvlyOCWX4+BOYhLZOzqwYHUJJ0BVJ1X/wtxoovdXXtqUqpkBm7Ulu03lfTtRJZyyL8DlGDHA/KYuzKvv4OBS/xCiknIeAdlou+yPe9+vxs2LYcjedZcSVOLADmIUCdLLsPfP1WYkVSkuxyT/rDS2OuuWF/3okv1vkwsXtf6c2gf4rInowbmhiwq7AsctTZhJMWtrA9y2FWIVFdAaLuIEZFEBzhtK4Lkjl4N7fDHmRx9H9KYbyE4gvNi39SGWepfTzFNqsLBNDcproJy7U6mFV+KrdqKKC8YEsGlzTDuDfzUQAziV3cXH62ohpX5eEJGghVy4CTeEQk4AiwXd7xhWiA/Bc91ZZMYTXmwWXYaDby4dW2YgwCa04NJQp5VvaAWMW7HzXbuIqpvGBAgiZZgl/wmf1BMDzCy9g9lRVTgTHsWRfVxEiTLgGXMWGVuIAdI3dWKZTxUEYSW8pYVNaFHbKJfQYd010PJkczuJ/C6fAM4Ce7/GjDrCC8fiO/gkSo70iCQURWzTQqEzAy3CaL3vGMJEWVgefRbpccQAWyJa4eCTw808nwDb8JJ7f3OVjNIKGL942/vGBAikVAB1E4cjhB+VD2Cf1AKnzQosTcjCsoRMLI4/AG9xrl4MzNlQiIUbS+EsbeQwJ7IRvtGXkLaB6CElthMrvCnJsGKjxR0TMMZ5jUV3DCxaP5TugNp6CmDWt911GoIaJQUxDkUnko6n4t6ljznkVwUYZCGvpAxkJH2DnTEdWuyiZFNiiR7iI9ow0ztPz/cNXCis6IcRs33MtQKG2n7+hiCi3CCIbUUVmFp6H1OqiUk41LTj2nf/ALk6kUOBbJWBgEUbZUhe9xB7oolR7I5WwtuL7ifWFJksr61D8i8NGDvjbd1y7gU6ZXV6Ami+tYlvhJVCSUFMIuZYDsj3Y7UokHkaCJgnPY4kaSd2S4lRxIffwQyvg90LlxEBU/yzmyjnl3ULuf7WwXmpPTYRGJd4AuNlBOPlppF+MgakdZQWBVUe+EJcwAVynXADgkXZmC85iURJJ5IlhBdfirvgt7IBtmsKjW5NNQvZxFWpGZSzGcddXUr0s/JK8dbW3wxUgIW0FBZlHfigipiEsDEb5MpwLY42OGHB5ix8vj4XrrF5+GekHH7iViSJldgpIryIC7mFWSvyjFqfK3FoKcHqsXFumwIZZ71SYoxzqKVAVPmjzqETJgbl4i9xCrx/6A5GVigxspLwYlzVA5z+9u+U/LsclFcG4+rXlmhtmYBTtS7YLG1DvPARkoSEF4lCJXxXHoVdSIFR61PLc8UcDeCfRjgunaLyHkl/3XL6VeuQQwrdclogrMCEgCy8F7QfQ+LrMTz3NszLlRhRQQzgqDiHmjPO6PxuIMjlt9V4C5WpB7BjLTGJuOD7cPLMNWp9XU4TV++rpVxf09sKaOLA0n2bD/MxjRtpygib0EJ86Lcf7/l9hXe31mFIdhuGlXRiWBnRw4jyDnxa3YDS0wvQfvEd/LdxNBLC7mJ7KMH2MH4khCrh59kM2+DDpqyvdp8KfOAaxdynv/62Ur09e2mQ+RDr0KLzBltKJooTUgRL3wyY+6ZhYFwNBh34AYNLujCEktfFcBo3TqUVWLQ2EAtc8yH0PIctQR1IWEMMEBfYjtmehaatr+YyJSDnwosDhw3j3dirFb041n3LWnYWw9XePHsDJoStkhP8s2C+OhUDoqswIOM6BhV1YlAJUaG4C4Pij2FS0EHYBOZhmkca5rscROiyb7Ap4AHig5WID6ElQ9AjrHanO66AfBPWV3Rb3yVGzDjynw91K3pnSlBes8mtpY4Qq4Bsbkbekpbjzb0X8Vb6Vby58QjGBGZxMcSICYTlsA7Kgz0VMm/+AfgubEDIktPwcCmDw/JM7vvefT/9JOU2WHVYOvc5U6dyL5jPWDnbJrz0kcnTCd1yg9bskwNzMNo7FSO99uBD/0xVHd/jhI4Jsgk5DNtV+yFYng5r/4Mq8kZP6OjYNPNYhxY8Gjp98VzGjRaeZo9ztPj62EXrY1jOVbmSvPdDXRYntD0jyVfH6MeTTFVpmjpaVKXNX5hAC1fpBsap16PF7p0+N0WDLJcm7ecGimRnlPLf/GRan3wN4RatxfHZjAvH6bHf2qjigU3VcCvP5EL1TKBvX2ooTLoNG/NDj8RiyuE9josxv+/lBccLFOaW7gmZnK8yEdwLDvlv8IJDrnrBwcjTscYt3sosP4JxUK24v+KjfpCJGGbhKtlgG1rYoTne6CshOsS5vmzWFHSMmS/ayMZ8KvJ67mRh8TzzwyG2C10n+aQ1a9NetxDyJK+dVCu9nOgSZ32yvgfbfL6A83k25pO6janAtpgrYSLYScDo0fOE0sl+2ed1hHAQUFK9v2ZVFWWqmFIRZ32NnhcexWpKNgY31m/xMwR1DmYuNdDs5dctx8wJXmvltbvWes3h+4wIt4JrLK0hqUNWZX0Z2KpKc/t9K689tawP1hfr87HyfF/MhnqQlygGUIwcON7ByeKz0AhLj4RsK++vmljNMjXk0A1K8jYDu54SmHPByju9ibVhbdkz9NlR6j5e4vr8g34zwcT8WU2EBd5os9fenPD6MEv7tz+wm8HArtk99p26zQD1M2a//489eGaEZQoLSc7z6jjRzA77/cOf1HhFfc+MtWE7KS679IGf/x9lFv30I5KrAgAAAABJRU5ErkJggg==';
        var _SETTINGS = {
            'comments': false,
            'blogsd': false,
            'readersd': false,
            'favorite': true,
            'rotate': true,
            'playback': true,
            'blocked': true,
            'rscroll': false,
            'hrightbar': false,
            'apidebug': false,
            'playerdn': true,
            'nredirect': true,
            'coins': true,
            'karma': true,
            'online': true,
            'ads': true,
            'myEvents': false,
            'friendsOn': true,
            'sticker': true,
            'fixes': true,
            'bodystyle': true,
            'upVersion': VERSION,
            'bodystyleSetting': {
                'url': 'https://' + gitPages + '/src/backgrounds/default.jpg',
                'color': '#DAE1E8',
                'urlchecked': true,
                'colorchecked': false
            },
            'events': {
                'url': 'https://' + gitPages + '/src/sounds/default.ogg',
                'volume': 70,
                'mail': true,
                'journal': true,
                'feed': false,
                'notifications': false
            },
            'friendsOnMax': 10,
            'friendsListSH': true,
            'friendsDisplay': true,
            'hideNotyf': {
                "cookieEditor": false,
                "configImport": false
            },
            'msgAlert': false,
            'msgAlertSettings': {
                'alertPosition': 4,
                'maxAlert': 3,
                'animDelay': 3,
                'alertDelay': 3
            },
            'weatherWidget': false,
            'weatherSettings': {
                'interval': 36000,
                'time': 0,
                'city': null,
                'language': 'ru',
                'units': 'metric',
                'key': '5f11ea40424990937175d20a072e0c72'
            }
        };
        var _SETSTRINGS = {
            'comments': 'Пакетное удаление комментариев',
            'blogsd': 'Пакетное удаление блогов',
            'readersd': 'Пакетное удаление читателей',
            'friendsOn': 'Панель друзей онлайн',
            'myEvents': 'Звук уведомлений',
            'online': 'Точное время онлайн в анкетах',
            'ads': 'Скрывать рекламу',
            'favorite': 'Возможность добавить пользователя в закладки',
            'rotate': 'Кнопка поворота фото/видео в просмотрщике',
            'playback': 'Кнопка ускорения видео',
            'playerdn': 'Кнопка загрузки трека из плеера',
            'nredirect': 'Внешние ссылки без редиректа',
            'rscroll': 'Прокрутка страницы справа',
            'hrightbar': 'Скрыть правое меню',
            'blocked': 'Открытые разделы удаленных пользователей',
            'coins': 'Собирать бонусные монеты',
            'karma': 'Собирать карму',
            'bodystyle': 'Фон сайта',
            'msgAlert': 'Виджет почты',
            'weatherWidget': 'Виджет погоды',
            'sticker': 'Бесплатные стикеры',
            'fixes': 'Незначительные исправления'
        };
        var main = {
            ajax: function(url, method, data, callback, rstate, json) {
                rstate = (typeof rstate != "undefined" ? rstate : 4);
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                if (json) {
                    xhr.setRequestHeader("X-Proxy", "spaces");
                }
                if (method == "POST") {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send(data);
                } else {
                    xhr.send();
                }
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == rstate) {
                        if (xhr.status == 200) {
                            if (callback) {
                                callback(xhr.status, xhr.responseText);
                            }
                        } else {
                            if (callback) {
                                callback(xhr.status, xhr.responseText);
                            } else {
                                return false;
                            }
                        }
                    }
                };
            },
            jajax: function(url, callback) {
                url = url.replace(/\#.*$/i, '') + (url.indexOf("?") >= 1 ? "&json=1" : "?json=1");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.setRequestHeader("X-Proxy", "spaces");
                xhr.send(null);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (callback) {
                                callback(xhr.responseText);
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                };
            },
            getQuery: function(name) {
                var query = document.location.search;
                var resp = null;
                try {
                    name = name.toLowerCase();
                    if (query.toLowerCase().indexOf(name) >= 1) {
                        query.substring(1).split("&").forEach(function(param) {
                            var params = param.split("=");
                            if (params[0].toLowerCase() == name) {
                                resp = params[1];
                            }
                        });
                    }
                    return resp;
                } catch (e) {
                    main.console.error('Ошибка (GETQUERY): ' + e.name + ":" + e.message + "\n" + e.stack);
                    return null;
                }
            },
            getPath: function(name) {
                var path = document.location.pathname.toString();
                var string;
                try {
                    var array = path.replace(/\/\s*$/, '').split('/');
                    switch (name) {
                        case 'method':
                            string = array[1];
                            break;
                        case 'index':
                            string = array[2];
                            break;
                        case 'target':
                            string = array[3];
                            break;
                    }
                    return string;
                } catch (e) {
                    main.console.error('Ошибка (GETPATH): ' + e.name + ":" + e.message + "\n" + e.stack);
                    return null;
                }
            },
            getParams: function(url) {
                var params = {};
                var parser = document.createElement('a');
                parser.href = url;
                var query = parser.search.substring(1);
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    params[pair[0]] = decodeURIComponent(pair[1]);
                }
                return params;
            },
            css: function(elem, css) {
                var tList = css.split(";");
                for (var i in tList) {
                    if (main.trim(tList[i]) != "") {
                        var valList = main.trim(tList[i]).split(":");
                        if (valList[0].indexOf("-") >= 0) {
                            valList[0] = valList[0].replace(/\-([a-z]{1})/g, function(a, b) {
                                return b.toUpperCase();
                            });
                        }
                        if (typeof valList[1] != "undefined") {
                            elem.style[main.trim(valList[0])] = main.trim(valList[1]);
                        }
                    }
                }
            },
            htmlspecialchars: function(str) {
                if (typeof(str) == "string") {
                    str = str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace("\n", "br/>");
                }
                return str;
            },
            rever: function(s) {
                return s ? s.toString().split("").join(".") : s;
            },
            ce: function(name, param) {
                var newEl = document.createElement(name);
                if (param) {
                    for (var i in param) {
                        if (i == "style") {
                            main.css(newEl, param[i]);
                        } else if (i == "attr") {
                            for (var j in param[i]) {
                                newEl.setAttribute(j, param[i][j]);
                            }
                        } else if (i == "html") {
                            newEl.innerHTML = param[i];
                        } else if (i == "class") {
                            newEl.className = param[i];
                        } else {
                            newEl[i] = param[i];
                        }
                    }
                }
                return newEl;
            },
            readSettings: function() {
                var cookieSet = main.getCookie("SP_PLUS_SET");
                try {
                    if (cookieSet) {
                        cookieSet = JSON.parse(cookieSet);
                        _SETTINGS = main.extend(_SETTINGS, cookieSet);
                    }
                } catch (e) {
                    main.console.error('Ошибка (READSETTINGS): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            newbequest: function() {
                var nbqLink = main.qs("#sp_newbequest_togl");
                if (nbqLink) {
                    main.jajax(_PROTOCOL + "//" + _DOMAIN + "/mysite/", function(r) {
                        try {
                            if (r) {
                                var _json = {
                                    'owner_widget': {
                                        'newbee_quest_widget': null
                                    }
                                };
                                var json = main.extend(_json, JSON.parse(r));
                                if (json.owner_widget.newbee_quest_widget) {
                                    nbqLink.style.display = "";
                                } else {
                                    nbqLink.style.display = "none";
                                }
                            }
                        } catch (e) {
                            main.console.error('Ошибка (NEWBEE-JSON): ' + e.name + ":" + e.message + "\n" + e.stack);
                        }
                    });
                }
            },
            settings: function() {
                var path = document.location.pathname.toString();
                var lct = document.location.href.toString();
                if (path == '/settings/' && !main.qs("#SP_PLUS_SETLINK")) {
                    try {
                        var chLink = main.find(document.links, {
                            href: _PROTOCOL + "//" + _DOMAIN + "/settings/notification/?"
                        });
                        if (chLink) {
                            chLink = chLink[0];
                            var urlSett = main.getQuery("sp_plus_settings");
                            var urlSettEditor = main.getQuery("sp_cookie_editor");
                            var urlSettChangeLog = main.getQuery("sp_changelog");
                            var urlSettBackup = main.getQuery("sp_backup");
                            var settLink = main.ce("a", {
                                href: _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1",
                                id: "SP_PLUS_SETLINK",
                                class: chLink.className,
                                html: '<span>Настройки Spaces+</span><span class="ico ico_arr ico_m"></span>',
                                onclick: function() {
                                    var prnt = main.qs("#SP_PLUS_SETLINK").parentNode.parentNode.parentNode.parentNode;
                                    if (prnt.id == "main") {
                                        var hp = main.qs("#header_path");
                                        if (hp) {
                                            hp.innerHTML = hp.innerHTML.replace("Настройки", '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/settings/" style="margin-bottom: 1px;">Настройки</a><span class="location-bar__sep ico"></span><span id="SP_PLUS_SETHEAD2">Spaces+</span>');
                                        }
                                        prnt.innerHTML = '<div class="widgets-group widgets-group_top js-container__block"><div class="b-title cl b-title_center b-title_first oh"><div class="b-title__item" id="SP_PLUS_SETHEAD">Настройки Spaces+</div></div><div class="content"><div class="list f-c_fll"> <div id="SP_PLUS_SETAREA"></div></div></div></div> <div id="SP_PLUS_ABOUT"></div> <a id="SP_PLUS_SETBACK" href="http://' + _DOMAIN + '/settings/?" class="link-return full_link"><span class="ico ico_arrow-back" style="margin: 0px 6px -1px 0px;"></span><span class="m">Назад</span></a>';
                                    }
                                    var setArea = main.qs("#SP_PLUS_SETAREA");
                                    if (setArea) {
                                        for (var i in _SETTINGS) {
                                            if (typeof _SETSTRINGS[i] != "undefined") {
                                                var eventAlert = main.qs("#SP_PLUS_ALERT");
                                                var tmpCkb = main.ce("input", {
                                                    id: "sp_set_" + i,
                                                    type: "checkbox",
                                                    class: "sp-checkbox-square",
                                                    checked: _SETTINGS[i],
                                                    onclick: function(e) {
                                                        var id = e.target.id.split("_")[2];
                                                        _SETTINGS[id] = e.target.checked;
                                                        var jsonSet = JSON.stringify(_SETTINGS);
                                                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                                                        if (e.target.id == "sp_set_rscroll") {
                                                            main.scrollMove(e.target.checked);
                                                        } else if (e.target.id == "sp_set_hrightbar") {
                                                            main.hiddenRightbar(e.target.checked);
                                                        } else if (e.target.id == "sp_set_bodystyle") {
                                                            if (e.target.checked) {
                                                                main.bgSettings(e.target);
                                                            } else {
                                                                var bsWrap = main.qs("#SP_PLUS_BODYSTYLE");
                                                                if (bsWrap) {
                                                                    main.remove(bsWrap);
                                                                }
                                                            }
                                                        } else if (e.target.id == "sp_set_myEvents") {
                                                            if (e.target.checked) {
                                                                main.evenstSupport(e.target);
                                                                main.alert("Звук уведомлений<div class='pad_t_a'></div><small class='pad_t_a grey'>В настройках сайта должен быть звук уведомлений <p style='color: #f86934;display: inline;font-weight: bold;'>выключен</p>. Разрешены аудиофайлы в форматах <b>.ogg</b>, <b>.mp3</b> или <b>.wav</b> Указывайте прямую ссылку на аудиофайл!<div class='pad_t_a'></small>Список фонов и звуков: <a href='https://" + gitPages + "' target='_blank'>https://" + gitPages + "</a></div>", 1, 1);
                                                            } else {
                                                                eventsCounter = 0;
                                                                var eventDiv = main.qs("#SP_PLUS_EVENTS");
                                                                if (eventAlert) {
                                                                    main.remove(eventAlert);
                                                                }
                                                                if (eventDiv) {
                                                                    main.remove(eventDiv);
                                                                }
                                                            }
                                                        } else if (e.target.id == "sp_set_friendsOn") {
                                                            main.friendsOnline(e.target.checked);
                                                            if (e.target.checked) {
                                                                main.setFriend(e.target);
                                                            } else {
                                                                var frMaxWrap = main.qs("#SP_PLUS_MAXFRIENDS");
                                                                if (frMaxWrap) {
                                                                    main.remove(frMaxWrap);
                                                                }
                                                            }
                                                        } else if (e.target.id == "sp_set_comments") {
                                                            main.commentsDelete(e.target.checked);
                                                        } else if (e.target.id == "sp_set_msgAlert") {
                                                            if (e.target.checked) {
                                                                main.msgAlertSettings(e.target);
                                                            } else {
                                                                var msgAS = main.qs("#SP_PLUS_MSGALERTSETTINGS");
                                                                if (msgAS) {
                                                                    main.remove(msgAS);
                                                                }
                                                            }
                                                        } else if (e.target.id == "sp_set_weatherWidget") {
                                                            if (e.target.checked) {
                                                                main.weatherSettings(e.target);
                                                            } else {
                                                                var spWW = main.qs("#SP_WIDGET_WEATHER");
                                                                var spWS = main.qs("#SP_WEATHER_SETTINGS");
                                                                if (spWW) main.remove(spWW);
                                                                if (spWS) main.remove(spWS);
                                                            }
                                                        } else if (e.target.id == "sp_set_sticker") {
                                                            if (e.target.checked) {
                                                                main.freeStickers();
                                                            } else {
                                                                document.location.reload();
                                                            }
                                                        } else if (e.target.id == "sp_set_fixes") {
                                                            if (e.target.checked) {
                                                                main.tinyFix();
                                                                main.alert("Незначительные исправления<div class='pad_t_a'></div><small class='pad_t_a grey'>Данная функция необходима для исправления неудачных обновлений сайта.<div class='pad_t_a'></div>Исправлено: <ul><li>Кнопка почты/ленты в шапке</li></ul></div>", 1, 1);
                                                            } else {
                                                                if (eventAlert) {
                                                                    main.remove(eventAlert);
                                                                }
                                                                document.location.reload();
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            if (typeof _SETSTRINGS[i] != "undefined") {
                                                var tmpLbl = main.ce("label", {
                                                    html: _SETSTRINGS[i],
                                                    attr: {
                                                        "for": "sp_set_" + i
                                                    }
                                                });
                                                var bstlWrap2 = main.ce("label", {
                                                    class: "stnd-link bstrwrap"
                                                });
                                                bstlWrap2.appendChild(tmpCkb);
                                                bstlWrap2.appendChild(tmpLbl);
                                                setArea.appendChild(bstlWrap2);
                                                setArea.appendChild(bstlWrap2);
                                            }
                                        }
                                        if (_SETTINGS.friendsOn) {
                                            main.setFriend(main.qs("#sp_set_friendsOn"));
                                        }
                                        if (_SETTINGS.myEvents) {
                                            main.evenstSupport(main.qs("#sp_set_myEvents"));
                                        }
                                        if (_SETTINGS.bodystyle) {
                                            main.bgSettings(main.qs("#sp_set_bodystyle"));
                                        }
                                        if (_SETTINGS.msgAlert) {
                                            main.msgAlertSettings(main.qs("#sp_set_msgAlert"));
                                        }
                                        if (_SETTINGS.weatherWidget) {
                                            main.weatherSettings(main.qs("#sp_set_weatherWidget"));
                                        }
                                        var spActLbl = main.ce("div", {
                                            class: "sp_plus_line",
                                            html: "<span class='sp_plus_text'>Встроенные возможности сайта</span>"
                                        });
                                        var spActLbl2 = main.ce("div", {
                                            class: "sp_plus_line",
                                            html: "<span class='sp_plus_text'>Дополнительные функции</span>"
                                        });
                                        var spActLbl3 = main.ce("div", {
                                            class: "sp_plus_line",
                                            html: "<span class='sp_plus_text'>Прочее</span>"
                                        });
                                        setArea.appendChild(spActLbl);
                                        main.spacesAction(setArea);
                                        main.newbequest();
                                        setArea.appendChild(spActLbl2);
                                        var cookEdit = main.ce("a", {
                                            href: _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_cookie_editor=1",
                                            class: "stnd-link stnd-link_arr",
                                            id: "sp_cookie_editor",
                                            html: "<span class='b'><span class='sp sp-write-grey'></span> Редактор cookies<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small; border-bottom: unset;",
                                            onclick: function() {
                                                var head = main.qs("#SP_PLUS_SETHEAD");
                                                var head2 = main.qs("#SP_PLUS_SETHEAD2");
                                                var back = main.qs("#SP_PLUS_SETBACK");
                                                if (head) {
                                                    head.innerHTML = 'Редактор cookies';
                                                }
                                                if (head2) {
                                                    head2.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> Редактор cookies';
                                                }
                                                if (back) {
                                                    back.href = _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1";
                                                }
                                                if (!/(\&)sp_cookie_editor=1/i.test(lct)) {
                                                    main.historyPush({
                                                        'sp_plus_settings': urlSett,
                                                        'sp_cookie_editor': urlSettEditor
                                                    }, _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_cookie_editor=1", "Spaces+: Редактор cookies");
                                                }
                                                main.cookieEditor("#SP_PLUS_SETAREA");
                                                return false;
                                            }
                                        });
                                        setArea.appendChild(cookEdit);
                                        setArea.appendChild(spActLbl3);
                                        var spBackup = main.ce("a", {
                                            href: _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_backup=1",
                                            class: "stnd-link stnd-link_arr",
                                            id: "sp_backup",
                                            html: "<span class='b' style='color: #2e7d32'><span class='sp sp-backup-g'></span> Импорт и экспорт параметров<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small;",
                                            onclick: function() {
                                                var head = main.qs("#SP_PLUS_SETHEAD");
                                                var head2 = main.qs("#SP_PLUS_SETHEAD2");
                                                var back = main.qs("#SP_PLUS_SETBACK");
                                                if (head) {
                                                    head.innerHTML = 'Импорт и экспорт параметров';
                                                }
                                                if (head2) {
                                                    head2.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> Импорт и экспорт параметров';
                                                }
                                                if (back) {
                                                    back.href = _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1";
                                                }
                                                if (!/(\&)sp_backup=1/i.test(lct)) {
                                                    main.historyPush({
                                                        'sp_plus_settings': urlSett,
                                                        'sp_backup': urlSettBackup
                                                    }, _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_backup=1", "Spaces+: Импорт и экспорт параметров");
                                                }
                                                main.spacesBackup("#SP_PLUS_SETAREA");
                                                return false;
                                            }
                                        });
                                        setArea.appendChild(spBackup);
                                        var isChangeLog = main.ce("a", {
                                            href: _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_changelog=1",
                                            class: "stnd-link stnd-link_arr",
                                            id: "sp_changelog",
                                            html: "<span class='b' style='color: #2196f3'><span class='sp sp-restore-blue'></span> История обновлений<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small;",
                                            onclick: function() {
                                                var head = main.qs("#SP_PLUS_SETHEAD");
                                                var head2 = main.qs("#SP_PLUS_SETHEAD2");
                                                var back = main.qs("#SP_PLUS_SETBACK");
                                                if (head) {
                                                    head.innerHTML = 'История обновлений';
                                                }
                                                if (head2) {
                                                    head2.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> История обновлений';
                                                }
                                                if (back) {
                                                    back.href = _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1";
                                                }
                                                if (!/(\&)sp_changelog=1/i.test(lct)) {
                                                    main.historyPush({
                                                        'sp_plus_settings': urlSett,
                                                        'sp_changelog': urlSettChangeLog
                                                    }, _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_changelog=1", "Spaces+: История обновлений");
                                                }
                                                main.spacesChangelog("#SP_PLUS_SETAREA");
                                                return false;
                                            }
                                        });
                                        setArea.appendChild(isChangeLog);
                                        var resetLink = main.ce("a", {
                                            href: "#",
                                            class: "stnd-link stnd-link_arr",
                                            id: "sp_plus_reset",
                                            html: "<span class='b' style='color: #f86934;'><span class='sp sp-alert'></span> Сброс настроек<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small;",
                                            onclick: function() {
                                                main.confirmm("Вы действительно хотите сбросить настройки?", 0, function() {
                                                    main.delCookie("SP_PLUS_SET");
                                                    main.delCookie("gp_left_btn");
                                                    main.delCookie("force_ajax_transport");
                                                    main.delCookie("sandbox");
                                                    document.location.reload();
                                                });
                                                return false;
                                            }
                                        });
                                        setArea.appendChild(resetLink);
                                        var aboutWidget = main.ce("div", {
                                            class: "widgets-group widgets-group_top nl wbg"
                                        });
                                        var content = main.ce("div", {
                                            class: "content-item3"
                                        });
                                        var title = main.ce("div", {
                                            class: "grey",
                                            html: "Developed by <a href='https://crashmax.ru' target='_blank'>crashmax</a> with love ❤️"
                                        });
                                        var ver = main.ce("div", {
                                            style: "float: right;",
                                            html: 'v' + main.rever(VERSION)
                                        });
                                        var target = main.qs("#SP_PLUS_ABOUT");
                                        aboutWidget.appendChild(content);
                                        content.appendChild(title);
                                        title.appendChild(ver);
                                        target.appendChild(aboutWidget);
                                    }
                                    return false;
                                }
                            });
                            main.inBefore(settLink, chLink);
                            if (chLink.nextElementSibling.nodeName == "BR") {
                                main.insertAfter(main.ce("br", null), settLink);
                            }
                            if (urlSett) {
                                document.title = "Настройки Spaces+";
                                var clickEvent = document.createEvent("MouseEvent");
                                var clickEvent2 = document.createEvent("MouseEvent");
                                clickEvent.initEvent("click", true, true);
                                settLink.dispatchEvent(clickEvent);
                                if (urlSettEditor) {
                                    document.title = "Spaces+: Редактор cookies";
                                    clickEvent2.initEvent("click", true, true);
                                    main.qs("#sp_cookie_editor").dispatchEvent(clickEvent2);
                                } else if (urlSettChangeLog) {
                                    document.title = "Spaces+: История обновлений";
                                    clickEvent2.initEvent("click", true, true);
                                    main.qs("#sp_changelog").dispatchEvent(clickEvent2);
                                } else if (urlSettBackup) {
                                    document.title = "Spaces+: Импорт и экспорт параметров";
                                    clickEvent2.initEvent("click", true, true);
                                    main.qs("#sp_backup").dispatchEvent(clickEvent2);
                                }
                            }
                        }
                    } catch (e) {
                        main.console.error('Ошибка (SETTINGS): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            notifications: function(title, option, url) {
                try {
                    if (!("Notification" in window)) {
                        main.alert("Ваш браузер не поддерживает уведомления!", 1, null);
                    } else if (Notification.permission.toLowerCase() == "granted") {
                        main.notificationShow(title, option, url);
                    } else if (Notification.permission.toLowerCase() != "denied") {
                        Notification.requestPermission(function(permission) {
                            if (permission.toLowerCase() == "granted") {
                                main.notificationShow(title, option, url);
                            } else {
                                main.alert("Вы <b style='color: #800;'>запретили</b> показывать уведомления для сайта " + _DOMAIN + "!<br/>Зайдите в настройки браузера и настройте доступ.", 1, null);
                            }
                        });
                    } else {
                        main.alert("Разрешите браузеру показывать уведомления с сайта " + _DOMAIN + ", чтобы пользоваться функцией!", 1, null);
                    }
                } catch (e) {
                    main.console.error('Ошибка (NOTIFICATIONS): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            notificationShow: function(title, option, url) {
                try {
                    var notification = new Notification(title, option);
                    if (url != null) {
                        notification.onclick = function(e) {
                            e.preventDefault();
                            main.setLocation(url);
                            e.target.close();
                        };
                    }
                } catch (e) {
                    main.console.error('Ошибка (NOTIFICATION-SHOW): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            setFriend: function(e) {
                try {
                    var frMaxWrap = main.ce("div", {
                        id: "SP_PLUS_MAXFRIENDS"
                    });
                    var div = main.ce("div", {
                        style: "padding: 11px 15px;"
                    });
                    var label = main.ce("label", {
                        class: "stnd-link",
                        style: "border-top: unset;"
                    });
                    var frMax = main.ce("input", {
                        type: "text",
                        class: "text-input",
                        size: 4,
                        attr: {
                            maxlength: 2
                        },
                        value: _SETTINGS.friendsOnMax
                    });
                    frMax.onchange = frMax.oninput = function(e) {
                        if (!isNaN(e.target.value)) {
                            var frMaxVal = parseInt(e.target.value, 10);
                            frMax.className = "text-input";
                            if (frMaxVal > 15 || frMaxVal < 1) {
                                frMaxVal = 10;
                                frMax.className = "text-input sp-input-error";
                            }
                            countFriends = 0;
                            _SETTINGS.friendsOnMax = frMaxVal;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.friendsOnline(1);
                        } else {
                            frMax.className = "text-input sp-input-error";
                        }
                    };
                    var frMaxLbl = main.ce("label", {
                        html: 'Выводить друзей:<div class="label__desc">от 1 до 15</div>',
                        class: "label"
                    });
                    var frListSH = main.ce("input", {
                        type: "checkbox",
                        id: "sp_friends_list_sh",
                        class: "sp-checkbox-square",
                        checked: _SETTINGS.friendsListSH,
                        onclick: function(e) {
                            _SETTINGS.friendsListSH = e.target.checked;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                        }
                    });
                    var frListSHLbl = main.ce("label", {
                        attr: {
                            "for": "sp_friends_list_sh"
                        },
                        html: "Скрывать/показывать по клику на счётчике"
                    });
                    div.appendChild(frMaxLbl);
                    div.appendChild(frMax);
                    label.appendChild(frListSH);
                    label.appendChild(frListSHLbl);
                    frMaxWrap.appendChild(div);
                    frMaxWrap.appendChild(label);
                    main.insertAfter(frMaxWrap, e.parentNode);
                } catch (e) {
                    main.console.error('Ошибка (FRIENDS-MAX-SUPPORT): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            bgSettings: function(e) {
                try {
                    var bgWrap = main.ce("div", {
                        id: "SP_PLUS_BODYSTYLE"
                    });
                    var bstlWrap = main.ce("div", {
                        class: "bstrwrap",
                        style: "border-bottom: unset; padding: 15px;",
                    });
                    var div = main.ce("div", {
                        class: "text-input__wrap"
                    });
                    var label = main.ce("label", {
                        class: "stnd-link",
                        style: "border-bottom: unset;"
                    });
                    var label1 = main.ce("label", {
                        class: "stnd-link",
                        style: "border-bottom: unset;"
                    });
                    var descInp = main.ce("label", {
                        html: 'Ссылка на изображение:<div class="label__desc">.jpg или .png</div>',
                        style: "margin-right: -17px;",
                        class: "label"
                    });
                    var descCol = main.ce("label", {
                        html: 'Цвет фона:<div class="label__desc">#RRGGBB</div>',
                        style: "margin-right: -17px;",
                        class: "label"
                    });
                    var bstyle = main.ce("input", {
                        type: "text",
                        id: "image-input",
                        value: _SETTINGS.bodystyleSetting.url,
                        style: "margin-bottom: 7px;",
                        class: "text-input"
                    });
                    bstyle.onchange = bstyle.oninput = function(a) {
                        if ((main.isValidUrl(a.target.value) && /\.(jpg|jpeg|png|gif)$/i.test(a.target.value)) || main.trim(a.target.value) == "") {
                            _SETTINGS.bodystyleSetting.url = main.trim(a.target.value);
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.setStyle();
                            bstyle.className = "text-input";
                        } else {
                            bstyle.className = "text-input sp-input-error";
                        }
                    };
                    var bstylec = main.ce("input", {
                        type: "text",
                        class: "text-input",
                        id: "color-input",
                        value: _SETTINGS.bodystyleSetting.color
                    });
                    bstylec.onchange = bstylec.oninput = function(a) {
                        if (/^\#([A-Za-z0-9]{3}|[A-Za-z0-9]{6})$/i.test(a.target.value) || a.target.value == '') {
                            _SETTINGS.bodystyleSetting.color = main.trim(a.target.value);
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.setStyle();
                            bstylec.className = "text-input";
                        } else {
                            bstylec.className = "text-input sp-input-error";
                        }
                    };
                    var inbstyle = main.ce("input", {
                        type: "radio",
                        id: "sp_set_bodystyle_URL",
                        checked: _SETTINGS.bodystyleSetting.urlchecked,
                        class: "sp-checkbox-circle",
                        onclick: function(a) {
                            _SETTINGS.bodystyleSetting.urlchecked = a.target.checked;
                            if (a.target.checked && inbstylec.checked) {
                                inbstylec.checked = false;
                                _SETTINGS.bodystyleSetting.colorchecked = false;
                            }
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            if (_SETTINGS.bodystyleSetting.urlchecked == true) {
                                main.setStyle();
                                main.bgImage(a.target);
                            } else {
                                var swc = main.qs("#SP_WRAP_IMAGE");
                                if (swc) {
                                    main.remove(swc);
                                }
                            }
                        }
                    });
                    var inbstylec = main.ce("input", {
                        type: "radio",
                        id: "sp_set_bodystyle_color",
                        checked: _SETTINGS.bodystyleSetting.colorchecked,
                        class: "sp-checkbox-circle",
                        onclick: function(a) {
                            _SETTINGS.bodystyleSetting.colorchecked = a.target.checked;
                            if (a.target.checked && inbstyle.checked) {
                                inbstyle.checked = false;
                                _SETTINGS.bodystyleSetting.urlchecked = false;
                            }
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            if (_SETTINGS.bodystyleSetting.colorchecked == true) {
                                main.setStyle();
                                main.bgColor(a.target);
                            } else {
                                var swi = main.qs("#SP_WRAP_COLOR");
                                if (swi) {
                                    main.remove(swi);
                                }
                            }
                        }
                    });
                    var lblstylelbl = main.ce("label", {
                        attr: {
                            "for": "sp_set_bodystyle_URL"
                        },
                        html: "Выбрать изображение"
                    });
                    var lblstyleclbl = main.ce("label", {
                        attr: {
                            "for": "sp_set_bodystyle_color"
                        },
                        html: "Подобрать цвет"
                    });
                    div.appendChild(descInp);
                    div.appendChild(bstyle);
                    div.appendChild(descCol);
                    div.appendChild(bstylec);
                    label.appendChild(inbstyle);
                    label.appendChild(lblstylelbl);
                    label1.appendChild(inbstylec);
                    label1.appendChild(lblstyleclbl);
                    bstlWrap.appendChild(div);
                    bgWrap.appendChild(bstlWrap);
                    bgWrap.appendChild(label);
                    bgWrap.appendChild(label1);
                    main.insertAfter(bgWrap, e.parentNode);
                    if (_SETTINGS.bodystyleSetting.urlchecked) {
                        main.bgImage();
                    }
                    if (_SETTINGS.bodystyleSetting.colorchecked) {
                        main.bgColor()
                    }
                } catch (e) {
                    main.console.error('Ошибка (BODYSTYLE-SET): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            bgColor: function() {
                var rev = main.service(1);
                try {
                    if (!main.qs("#SP_WRAP_COLOR")) {
                        if (main.qs("#SP_WRAP_IMAGE")) {
                            main.remove(main.qs("#SP_WRAP_IMAGE"));
                            main.remove(main.qs("#SP_PLUS_IMAGE_STYLE"));
                        }
                        var style = main.ce("link", {
                            rel: "stylesheet",
                            type: "text/css",
                            id: "SP_PLUS_CP_STYLE",
                            href: "https://" + gitPages + "/src/attaches/css/toolbar.css?r=" + rev
                        });
                        var style2 = main.ce("link", {
                            rel: "stylesheet",
                            type: "text/css",
                            id: "SP_PLUS_CP_STYLE_2",
                            href: "https://" + gitPages + "/src/attaches/css/user-content.css?r=" + rev
                        });
                        document.getElementsByTagName('head')[0].appendChild(style);
                        document.getElementsByTagName('head')[0].appendChild(style2);
                        var SPB = main.qs("#SP_PLUS_BODYSTYLE");
                        var stdnC = main.ce("div", {
                            id: "SP_WRAP_COLOR",
                            style: "border-top: 1px solid #cdd4e1;"
                        });
                        var table = main.ce("table", {
                            class: "table__wrap bb-colorpicker"
                        });
                        var tbody = main.ce("tbody");
                        var tr = main.ce("tr");
                        var td1 = main.ce("td", {
                            class: "table__cell"
                        });
                        var td1div = main.ce("div", {
                            class: "stnd-block",
                            html: '<div><div style="background-color:#90CAF9" data-tag="fon" data-val="#90CAF9" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#80DEEA" data-tag="fon" data-val="#80DEEA" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#A5D6A7" data-tag="fon" data-val="#A5D6A7" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#FFF59D" data-tag="fon" data-val="#FFF59D" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#FFCC80" data-tag="fon" data-val="#FFCC80" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#FFAB91" data-tag="fon" data-val="#FFAB91" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#CE93D8" data-tag="fon" data-val="#CE93D8" class="js-bb_color toolbar-color pointer"></div> </div> <div> <div style="background-color:#2196F3" data-tag="fon" data-val="#2196F3" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#00BCD4" data-tag="fon" data-val="#00BCD4" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#4CAF50" data-tag="fon" data-val="#4CAF50" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#FFEB3B" data-tag="fon" data-val="#FFEB3B" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#FF9800" data-tag="fon" data-val="#FF9800" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#F44336" data-tag="fon" data-val="#F44336" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#9C27B0" data-tag="fon" data-val="#9C27B0" class="js-bb_color toolbar-color pointer"></div> </div> <div> <div style="background-color:#1565C0" data-tag="fon" data-val="#1565C0" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#00838F" data-tag="fon" data-val="#00838F" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#2E7D32" data-tag="fon" data-val="#2E7D32" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#F9A825" data-tag="fon" data-val="#F9A825" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#EF6C00" data-tag="fon" data-val="#EF6C00" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#C62828" data-tag="fon" data-val="#C62828" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#6A1B9A" data-tag="fon" data-val="#6A1B9A" class="js-bb_color toolbar-color pointer"></div> </div> <div> <div style="background-color:#ECF0F1" data-tag="fon" data-val="#ECF0F1" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#CFD8DC" data-tag="fon" data-val="#CFD8DC" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#B0BEC5" data-tag="fon" data-val="#B0BEC5" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#97A6B0" data-tag="fon" data-val="#97A6B0" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#546E7A" data-tag="fon" data-val="#546E7A" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#44565E" data-tag="fon" data-val="#44565E" class="js-bb_color toolbar-color pointer"></div> <div style="background-color:#3A474C" data-tag="fon" data-val="#3A474C" class="js-bb_color toolbar-color pointer"></div></div>'
                        });
                        td1.appendChild(td1div);
                        tr.appendChild(td1);
                        var td2 = main.ce("td", {
                            class: "table__cell table__cell_last"
                        });
                        var td2div1 = main.ce("div", {
                            class: "stnd-block"
                        });
                        var td2div1div1 = main.ce("div", {
                            class: "js-bb_colorpicker"
                        });
                        td2div1.appendChild(td2div1div1);
                        td2.appendChild(td2div1);
                        tr.appendChild(td2);
                        tbody.appendChild(tr);
                        table.appendChild(tbody);
                        stdnC.appendChild(table);
                        SPB.appendChild(stdnC);
                        var container = td2div1div1;
                        setTimeout(function() {
                            var picker = new CP(container, false, container);
                            document.getElementById("color-input").onchange = document.getElementById("color-input").oninput = function(a) {
                                if (/^\#([A-Za-z0-9]{3}|[A-Za-z0-9]{6})$/i.test(a.target.value) || a.target.value == '') {
                                    a.target.className = "text-input";
                                    _SETTINGS.bodystyleSetting.color = main.trim(a.target.value);
                                    var jsonSet = JSON.stringify(_SETTINGS);
                                    main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    main.setStyle();
                                    picker.set(_SETTINGS.bodystyleSetting.color);
                                } else {
                                    a.target.className = "text-input sp-input-error";
                                }
                            };
                            picker.enter();
                            picker.set(_SETTINGS.bodystyleSetting.color);
                            picker.on("change", function(color) {
                                document.getElementById("color-input").value = '#' + color;
                                document.querySelector("input[name=color]").value = '#' + color;
                                document.getElementsByClassName("colorpicker-color")[0].style.backgroundColor = '#' + color;
                                _SETTINGS.bodystyleSetting.color = '#' + color;
                                var jsonSet = JSON.stringify(_SETTINGS);
                                main.setCookie("SP_PLUS_SET", jsonSet, null);
                                main.setStyle();
                            });
                            var colors = document.getElementsByClassName('js-bb_color toolbar-color pointer');
                            for (var i = 0; i < colors.length; i++) {
                                colors[i].onclick = function(e) {
                                    var color = e.target.getAttribute('data-val');
                                    document.getElementById("color-input").value = color;
                                    document.querySelector("input[name=color]").value = color;
                                    document.getElementsByClassName("colorpicker-color")[0].style.backgroundColor = color;
                                    _SETTINGS.bodystyleSetting.color = color;
                                    var jsonSet = JSON.stringify(_SETTINGS);
                                    main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    main.setStyle();
                                    picker.set(color);
                                }
                            }
                        }, 1);
                    }
                } catch (e) {
                    main.console.error('Ошибка (BODYSTYLE-COLOR-SET): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            bgImage: function() {
                var rev = main.service(1);
                try {
                    if (!main.qs("#SP_WRAP_IMAGE")) {
                        if (main.qs("#SP_WRAP_COLOR")) {
                            main.remove(main.qs("#SP_WRAP_COLOR"));
                            main.remove(main.qs("#SP_PLUS_CP_STYLE"));
                        }
                        var style = main.ce("link", {
                            rel: "stylesheet",
                            type: "text/css",
                            id: "SP_PLUS_IMAGE_STYLE",
                            href: "https://" + gitPages + "/src/attaches/css/bodystyle.css?r=" + rev
                        });
                        document.getElementsByTagName('head')[0].appendChild(style);
                        var SPB = main.qs("#SP_PLUS_BODYSTYLE");
                        var stdnI = main.ce("div", {
                            id: "SP_WRAP_IMAGE",
                            style: "border-top: 1px solid #cdd4e1;"
                        });
                        var gd = main.ce("div", {
                            class: "js-gallery_skip wbg oh tiles_block tiles_wrapper"
                        });
                        main.ajax('https://' + gitPages + '/data.json?r=' + rev, 'GET', null, function(s, data) {
                            var data = JSON.parse(data);
                            for (var i = 0; i < data.backgrounds.length; i++) {
                                var d1 = main.ce("div", {
                                    class: "js-file_item tiled_item tiled_item-200"
                                });
                                var d2 = main.ce("div", {
                                    class: "tiled_inner t_center relative"
                                });
                                var s3 = main.ce("span", {
                                    class: "relative",
                                    style: "display: inline-block;max-width: 100%; width: 100%;"
                                });
                                var ds1 = main.ce("div", {
                                    class: "tiled-preview border"
                                });
                                var img = main.ce("img", {
                                    class: "preview s201_200",
                                    style: "cursor: pointer;",
                                    src: data.backgrounds[i].url,
                                    onclick: function(e) {
                                        document.getElementById("image-input").value = e.target.src;
                                        _SETTINGS.bodystyleSetting.url = e.target.src;
                                        var jsonSet = JSON.stringify(_SETTINGS);
                                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                                        main.setStyle();
                                    }
                                });
                                ds1.appendChild(img);
                                s3.appendChild(ds1);
                                d2.appendChild(s3);
                                d1.appendChild(d2);
                                gd.appendChild(d1);
                            }
                            stdnI.appendChild(gd);
                            SPB.appendChild(stdnI);
                        }, 4);
                    }
                } catch (e) {
                    main.console.error('Ошибка (BODYSTYLE-IMAGE-SET): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            evenstSupport: function(e) {
                try {
                    var eventsWrap = main.ce("div", {
                        id: "SP_PLUS_EVENTS"
                    });
                    var notifEvent = main.ce("input", {
                        type: "checkbox",
                        id: "sp_event_notif",
                        class: "sp-checkbox-square",
                        checked: _SETTINGS.events.notifications,
                        onclick: function(e) {
                            if (!("Notification" in window)) {
                                main.alert("Ваш браузер не поддерживает уведомления!", 1, null);
                                return false;
                            } else if (Notification.permission.toLowerCase() == "granted") {
                                _SETTINGS.events.notifications = e.target.checked;
                                var jsonSet = JSON.stringify(_SETTINGS);
                                main.setCookie("SP_PLUS_SET", jsonSet, null);
                            } else if (Notification.permission.toLowerCase() != "denied") {
                                Notification.requestPermission(function(permission) {
                                    if (permission.toLowerCase() == "granted") {
                                        _SETTINGS.events.notifications = e.target.checked;
                                        var jsonSet = JSON.stringify(_SETTINGS);
                                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    } else {
                                        main.alert("Разрешите браузеру показывать уведомления с сайта " + _DOMAIN + ", чтобы пользоваться функцией!", 1, null);
                                        return false;
                                    }
                                });
                            } else {
                                main.alert("Вы <b style='color: #800;'>запретили</b> показывать уведомления для сайта " + _DOMAIN + "!<br/>Зайдите в настройки браузера и настройте доступ (для Google Chrome включите HTTPS-протокол).", 1, null);
                                return false;
                            }
                        }
                    });
                    var notifEventLbl = main.ce("label", {
                        attr: {
                            "for": "sp_event_notif"
                        },
                        html: "Уведомления в браузере"
                    });
                    var descInp = main.ce("label", {
                        html: 'Ссылка на аудиофайл:<div class="label__desc">.ogg или .wav</div>',
                        style: "margin-right: -17px;",
                        class: "label"
                    });
                    var descRange = main.ce("label", {
                        html: 'Громкость:',
                        class: "label"
                    });
                    var divInp = main.ce("div", {
                        class: "text-input__wrap",
                        style: "margin: 15px;"
                    });
                    var div = main.ce("div", {
                        style: "margin: 15px;"
                    });
                    var label = main.ce("label", {
                        class: "stnd-link",
                        style: "border-top: unset; border-bottom: unset;"
                    });
                    var label1 = main.ce("label", {
                        class: "stnd-link",
                        style: "border-top: unset; border-bottom: unset;"
                    });
                    var label2 = main.ce("label", {
                        class: "stnd-link",
                        style: "border-top: unset; border-bottom: unset;"
                    });
                    var label3 = main.ce("label", {
                        class: "stnd-link",
                        style: "border-top: unset; border-bottom: unset;"
                    });
                    var eventsUrl = main.ce("input", {
                        type: "text",
                        value: _SETTINGS.events.url,
                        class: "text-input"
                    });
                    eventsUrl.onchange = eventsUrl.oninput = function(e) {
                        if ((main.isValidUrl(e.target.value) && /\.(ogg|mp3|wav)$/i.test(e.target.value)) || main.trim(e.target.value) == "") {
                            _SETTINGS.events.url = main.trim(e.target.value);
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            eventsUrl.className = "text-input";
                        } else {
                            eventsUrl.className = "text-input sp-input-error";
                        }
                    };
                    var testPlay = main.ce("span", {
                        class: "text-input__btn",
                        html: '<span class="js-ico sp sp-play-green"></span>',
                        style: "margin-left: 7px; font-size: small; top: 23px",
                        title: "Прослушать",
                        onclick: function() {
                            main.sound(_SETTINGS.events.url, _SETTINGS.events.volume);
                            return false;
                        }
                    });
                    var volum = main.ce("div", {
                        class: "label__desc",
                        html: _SETTINGS.events.volume + "%"
                    });
                    var volRange = main.ce("input", {
                        type: "range",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: _SETTINGS.events.volume
                    });
                    volRange.onchange = volRange.oninput = function(e) {
                        if (!isNaN(e.target.value)) {
                            var setVol = parseInt(e.target.value, 10);
                            if (setVol < 0 || setVol > 100) {
                                setVol = 70;
                            }
                            volum.innerHTML = setVol + "%";
                            _SETTINGS.events.volume = setVol;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                        }
                    };
                    var mailEvent = main.ce("input", {
                        type: "checkbox",
                        id: "sp_event_mail",
                        class: "sp-checkbox-square",
                        checked: _SETTINGS.events.mail,
                        onclick: function(e) {
                            _SETTINGS.events.mail = e.target.checked;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                        }
                    });
                    var mailEventLbl = main.ce("label", {
                        attr: {
                            "for": "sp_event_mail"
                        },
                        html: "Уведомлять о почте"
                    });
                    var jourEvent = main.ce("input", {
                        type: "checkbox",
                        id: "sp_event_journal",
                        class: "sp-checkbox-square",
                        checked: _SETTINGS.events.journal,
                        onclick: function(e) {
                            _SETTINGS.events.journal = e.target.checked;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                        }
                    });
                    var jourEventLbl = main.ce("label", {
                        attr: {
                            "for": "sp_event_journal"
                        },
                        html: "Уведомлять о журнале"
                    });
                    var feedEvent = main.ce("input", {
                        type: "checkbox",
                        id: "sp_event_feed",
                        class: "sp-checkbox-square",
                        checked: _SETTINGS.events.feed,
                        onclick: function(e) {
                            _SETTINGS.events.feed = e.target.checked;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                        }
                    });
                    var feedEventLbl = main.ce("label", {
                        attr: {
                            "for": "sp_event_feed"
                        },
                        html: "Уведомлять о ленте"
                    });
                    divInp.appendChild(descInp);
                    divInp.appendChild(eventsUrl);
                    divInp.appendChild(testPlay);
                    descRange.appendChild(volum);
                    div.appendChild(descRange);
                    div.appendChild(volRange);
                    eventsWrap.appendChild(divInp);
                    eventsWrap.appendChild(div);
                    label.appendChild(notifEvent);
                    label.appendChild(notifEventLbl);
                    label1.appendChild(mailEvent);
                    label1.appendChild(mailEventLbl);
                    label2.appendChild(jourEvent);
                    label2.appendChild(jourEventLbl);
                    label3.appendChild(feedEvent);
                    label3.appendChild(feedEventLbl);
                    eventsWrap.appendChild(label);
                    eventsWrap.appendChild(label1);
                    eventsWrap.appendChild(label2);
                    eventsWrap.appendChild(label3);
                    main.insertAfter(eventsWrap, e.parentNode);
                } catch (e) {
                    main.console.error('Ошибка (EVENTS-SUP): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            historyPush: function(state, url, title) {
                try {
                    document.title = title;
                    history.pushState(state, title, url);
                } catch (e) {
                    main.console.error('Ошибка (HISTORY): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            remove: function(e) {
                return e.parentNode.removeChild(e);
            },
            scrollMove: function() {
                try {
                    var scroller = main.qs("#scroll_page");
                    if (scroller && !scroller.hasAttribute("sp-replace")) {
                        scroller.style.left = "auto";
                        scroller.style.right = "0";
                        scroller.setAttribute("sp-replace", "1");
                    } else if (!_SETTINGS.rscroll && scroller && scroller.hasAttribute("sp-replace")) {
                        scroller.style.left = "0";
                        scroller.style.right = "auto";
                        scroller.removeAttribute("sp-replace");
                    }
                } catch (e) {
                    main.console.error('Ошибка (SCROLLER): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            hiddenRightbar: function() {
                try {
                    var rightbar = main.qs("#page_rightbar");
                    if (rightbar && !rightbar.hasAttribute("sp-hidden-rightbar")) {
                        rightbar.style.display = "none";
                        rightbar.setAttribute("sp-hidden-rightbar", "1");
                    } else if (!_SETTINGS.hrightbar && rightbar && rightbar.hasAttribute("sp-hidden-rightbar")) {
                        rightbar.style.display = "block";
                        rightbar.removeAttribute("sp-hidden-rightbar");
                    }
                } catch (e) {
                    main.console.error('Ошибка (HRIGHTBAT): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            cookieEditor: function(id) {
                window.scrollTo(0, 0);
                var cookie = main.allCookie();
                var target = main.qs(id);
                if (target) {
                    try {
                        target.innerHTML = "";
                        if (!_SETTINGS.hideNotyf.cookieEditor) {
                            var hideNotyf = main.ce("span", {
                                class: "sp sp-remove-grey pointer right notif_close close_h",
                                style: "margin: 10px",
                                title: "Понятно, больше не показывать.",
                                onclick: function() {
                                    _SETTINGS.hideNotyf.cookieEditor = true;
                                    var jsonSet = JSON.stringify(_SETTINGS);
                                    main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    main.cookieEditor("#SP_PLUS_SETAREA");
                                }
                            });
                            var smallInfo = main.ce("div", {
                                class: "stnd-block-yellow",
                                style: "padding: 15px;",
                                html: '<span class="sp sp-alert"></span>Внимание!</br></br><div style="font-size: small;">Никому не сообщайте значения ваших cookies! Не делайте скриншот этой страницы, на котором будут видны эти значения! От этого зависит безопасность вашего аккаунта!</div>'
                            });
                            var infoDiv = main.ce("div");
                            infoDiv.appendChild(hideNotyf);
                            target.appendChild(infoDiv);
                            infoDiv.appendChild(smallInfo);
                        }
                        var wrap1 = main.ce("div", {
                            style: "text-align: center; padding-top: 10px;",
                        });
                        var inp1 = main.ce("input", {
                            type: "text",
                            class: "text-input",
                            placeholder: "Имя",
                            style: "width: 30%; margin: 3px;"
                        });
                        var inp2 = main.ce("input", {
                            type: "text",
                            class: "text-input",
                            placeholder: "Значение",
                            style: "width: 30%; margin: 3px;"
                        });
                        var inp3 = main.ce("button", {
                            html: '<span class="sp sp-ok-blue"></span> Добавить',
                            class: "black",
                            style: "max-width: 30%; margin: 3px; padding: 5px 3px 3px 7px; font-size: 14px;",
                            onclick: function(e) {
                                var prev = (e.target.nodeName == "SPAN" ? e.target.parentNode.previousElementSibling : e.target.previousElementSibling);
                                var name = main.htmlspecialchars(main.trim(prev.previousElementSibling.value));
                                var val = main.htmlspecialchars(main.trim(prev.value));
                                if (name == "SP_PLUS_SET") {
                                    main.alert("Внимание!<div class='pad_t_a'></div><small>Это служебное значение скрипта, не изменяйте его!</small>", 1, null);
                                } else if (name != "" && val != "") {
                                    main.confirmm(name == "SP_PLUS_SET" ? "Внимание, <b>" + name + "</b> является служебным значение скрипта, не стоит его изменять!<br/>" : "" + "Вы действительно хотите добавить куку <b>" + name + "</b> со значением <b>" + val + "</b>?", 1, function() {
                                        main.setCookie(prev.previousElementSibling.value, prev.value, null);
                                        main.cookieEditor("#SP_PLUS_SETAREA");
                                    });
                                } else {
                                    main.alert("Внимание!<div class='pad_t_a'></div><small>Отсутсвует имя или значение!</small>", 1, null);
                                }
                            }
                        });
                        wrap1.appendChild(inp1);
                        wrap1.appendChild(inp2);
                        wrap1.appendChild(inp3);
                        target.appendChild(wrap1);
                        target.appendChild(main.ce("div", {
                            class: "sp_plus_line",
                            html: '<span class="sp_plus_text">Список существующий cookies</span>'
                        }));
                        for (var i in cookie) {
                            if (i == "SP_PLUS_SET") {
                                continue;
                            }
                            var wrap = main.ce("div", {
                                class: "text-input__wrap",
                                style: "text-align: center;"
                            });
                            var tmp = main.ce("input", {
                                type: "text",
                                class: "text-input",
                                placeholder: "Имя",
                                attr: {
                                    readonly: "readonly"
                                },
                                value: i,
                                style: "width: 30%; margin: 3px;",
                                onclick: function(e) {
                                    e.target.select();
                                }
                            });
                            var tmp2 = main.ce("input", {
                                type: "text",
                                class: "text-input",
                                placeholder: "Значение",
                                value: cookie[i],
                                style: "width: 30%; margin: 3px;"
                            });
                            var tmp3 = main.ce("button", {
                                html: "<span class='ico ico_delete'></span>",
                                title: "Удалить",
                                style: "max-width: 15%; margin: 3px; padding: 5px 3px 3px 7px; font-size: 14px;",
                                onclick: function(e) {
                                    var prev = (e.target.nodeName == "SPAN" ? e.target.parentNode.previousElementSibling.previousElementSibling : e.target.previousElementSibling.previousElementSibling);
                                    var name = main.htmlspecialchars(main.trim(prev.value));
                                    if (name == "SP_PLUS_SET") {
                                        main.alert("Внимание!<div class='pad_t_a'></div><small>Это служебное значение скрипта, не изменяйте его!</small>", 1, null);
                                    } else if (name != "") {
                                        main.confirmm(name == "SP_PLUS_SET" ? "Внимание, <b>" + name + "</b> является служебным значение скрипта, не стоит его удалять!<br/>" : "" + "Вы действительно хотите удалить куку <b>" + name + "</b>?", 0, function() {
                                            main.delCookie(prev.value);
                                            main.cookieEditor("#SP_PLUS_SETAREA");
                                        });
                                    } else {
                                        main.alert("Пустую куку удалить?! Ты, блять, серьёзно???", 1, null);
                                    }
                                }
                            });
                            var tmp4 = main.ce("button", {
                                title: "Сохранить",
                                html: "<span class='sp sp-ok-blue'></span>",
                                style: "max-width: 15%; margin: 3px; padding: 5px 3px 3px 7px; font-size: 14px;",
                                onclick: function(e) {
                                    var prev = (e.target.nodeName == "SPAN" ? e.target.parentNode.previousElementSibling.previousElementSibling : e.target.previousElementSibling.previousElementSibling);
                                    var name = main.htmlspecialchars(main.trim(prev.previousElementSibling.value));
                                    var val = main.htmlspecialchars(main.trim(prev.value));
                                    if (name == "SP_PLUS_SET") {
                                        main.alert("Внимание!<div class='pad_t_a'></div><small>Это служебное значение скрипта, не изменяйте его!</small>", 1, null);
                                    } else if (name != "" && val != "") {
                                        main.confirmm(name == "SP_PLUS_SET" ? "Внимание, " + name + "</b> является служебным значение скрипта, не стоит его изменять!<br/>" : "" + "Вы действительно хотите задать куке <b>" + name + "</b> значение <b>" + val + "</b>?", 1, function() {
                                            main.setCookie(prev.previousElementSibling.value, prev.value, null);
                                            main.cookieEditor("#SP_PLUS_SETAREA");
                                        });
                                    } else {
                                        main.alert("Внимание!<div class='pad_t_a'></div><small>Отсутсвует имя или значение!</small>", 1, null);
                                    }
                                }
                            });
                            wrap.appendChild(tmp);
                            wrap.appendChild(tmp2);
                            wrap.appendChild(tmp3);
                            wrap.appendChild(tmp4);
                            target.appendChild(wrap);
                        }
                    } catch (e) {
                        main.console.error('Ошибка (COOKIE-EDITOR): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            spacesAction: function(root) {
                var wrap = main.ce("div", {
                    id: "wrap_spaces_option"
                });
                var apidebug = main.ce("a", {
                    href: "#",
                    class: "stnd-link stnd-link_arr",
                    html: (_SETTINGS.apidebug ? '<span class="b"><span class="sp sp-remove-grey"></span> Убрать отладчик<span class="ico ico_arr ico_m"></span></span>' : '<span class="b"><span class="ico ico_settings"></span> Включить отладчик<span class="ico ico_arr ico_m"></span></span>'),
                    style: "font-size: small;",
                    onclick: function() {
                        if (!_SETTINGS.apidebug) {
                            _SETTINGS.apidebug = true;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.apiDebugger();
                            main.setLocation(document.location.href);
                        } else {
                            var panel = main.qs("#spaces_api_debugger");
                            _SETTINGS.apidebug = false;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.remove(panel);
                            main.setLocation(document.location.href);
                        }
                        return false;
                    }
                });
                var beta = main.getCookie("sandbox");
                var sndbeta = main.ce("a", {
                    href: '#',
                    class: "stnd-link stnd-link_arr",
                    id: "sp_spacesAction_beta",
                    html: (beta ? "<span class='b'><span class='sp sp-exit-grey'></span> Выйти из песочницы<span class='ico ico_arr ico_m'></span></span>" : "<span class='b'><span class='sp sp-enter-grey'></span> Beta-песочница<span> - открытое тестирование нововведений сайта<span class='ico ico_arr ico_m'></span></span></span>"),
                    style: "font-size: small;",
                    onclick: function() {
                        if (beta) {
                            main.delCookie("sandbox");
                        } else {
                            main.setCookie("sandbox", "beta", null);
                        }
                        document.location.reload();
                        return false;
                    }
                });
                var fat = main.getCookie("force_ajax_transport");
                var fatWrap = main.ce("a", {
                    href: '#',
                    class: "stnd-link stnd-link_arr",
                    id: "sp_spacesFAT",
                    html: (fat ? "<span class='b'><span class='sp sp-remove-grey'></span> Убрать полосу загрузки<span class='ico ico_arr ico_m'></span></span>" : "<span class='b'><span class='ico ico_ok_grey'></span> Добавить полосу загрузки страницы<span class='ico ico_arr ico_m'></span><span>"),
                    style: "font-size: small;",
                    onclick: function() {
                        if (fat) {
                            main.delCookie("force_ajax_transport");
                        } else {
                            main.setCookie("force_ajax_transport", "1", null);
                        }
                        document.location.reload();
                        return false;
                    }
                });
                var glb = main.getCookie("gp_left_btn");
                var glbWrap = main.ce("a", {
                    href: '#',
                    class: "stnd-link stnd-link_arr",
                    id: "sp_spacesGLB",
                    html: (glb ? "<span class='b'><span class='sp sp-remove-grey'></span> Убрать плеер из панели<span class='ico ico_arr ico_m'></span></span>" : "<span class='b'><span class='ico ico_ok_grey'></span> Переместить плеер - переносит кнопку открытия плеера в левую панель<span class='ico ico_arr ico_m'></span></span>"),
                    style: "border-bottom: unset; font-size: small;",
                    onclick: function() {
                        if (glb) {
                            main.delCookie("gp_left_btn");
                        } else {
                            main.setCookie("gp_left_btn", "1", null);
                        }
                        document.location.reload();
                        return false;
                    }
                });
                var nbqLink = main.ce("a", {
                    href: "#",
                    style: "border-bottom: unset; display: none; font-size: small;",
                    id: "sp_newbequest_togl",
                    class: "stnd-link stnd-link_arr sp_line",
                    html: "<span class='b'><span class='sp sp-remove-grey'></span> Скрыть квест новичка<span class='ico ico_arr ico_m'></span></span>",
                    onclick: function() {
                        var CK = main.getCK();
                        main.confirmm("Вы действительно хотите скрыть квест новичка?", 0, function() {
                            main.ajax(_PROTOCOL + "//" + _DOMAIN + "/newbequest/?CK=" + CK, "GET", null, function() {
                                main.alert("Успех!<div class='pad_t_a'></div><small>Квест новичка скрыт</small>", 1, null);
                            }, 2);
                            setTimeout(function() {
                                main.newbequest();
                            }, 1000);
                        });
                        return false;
                    }
                });
                wrap.appendChild(apidebug);
                wrap.appendChild(sndbeta);
                wrap.appendChild(fatWrap);
                wrap.appendChild(glbWrap);
                wrap.appendChild(nbqLink);
                root.appendChild(wrap);
            },
            setLocation: function(url) {
                url = url || document.location.href.toString();
                var setLink = main.qs("#SP_PLUS_SETLOCATIONLINK");
                var clickEvent = document.createEvent("MouseEvent");
                clickEvent.initEvent("click", true, true);
                if (setLink) {
                    setLink.href = url;
                    setLink.dispatchEvent(clickEvent);
                } else {
                    setLink = main.ce("a", {
                        href: url,
                        style: "display: none;",
                        id: "SP_PLUS_SETLOCATIONLINK"
                    });
                    document.body.appendChild(setLink);
                    setLink.dispatchEvent(clickEvent);
                }
            },
            isValidUrl: function(url) {
                var regURLrf = /^(?:(?:https?|ftp|telnet):\/\/(?:[а-я0-9_-]{1,32}(?::[а-я0-9_-]{1,32})?@)?)?(?:(?:[а-я0-9-]{1,128}\.)+(?:рф)|(?! 0)(?:(?! 0[^.]|255)[ 0-9]{1,3}\.){3}(?! 0|255)[ 0-9]{1,3})(?:\/[a-zа-я0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
                var regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?! 0)(?:(?! 0[^.]|255)[ 0-9]{1,3}\.){3}(?! 0|255)[ 0-9]{1,3})(?:\/[a-zа-я0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
                return regURLrf.test(url) || regURL.test(url);
            },
            trim: function(str) {
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                return str.replace(rtrim, '');
            },
            inBefore: function(elem, refElem) {
                var parent = refElem.parentNode;
                return parent.insertBefore(elem, refElem);
            },
            insertAfter: function(elem, refElem) {
                var parent = refElem.parentNode,
                    next = refElem.nextSibling;
                if (parent) {
                    if (next) {
                        return parent.insertBefore(elem, next);
                    } else {
                        return parent.appendChild(elem);
                    }
                }
            },
            qs: function(e) {
                return document.querySelector(e);
            },
            getClassName: function(data, t) {
                var list = new Array(),
                    data = data.split("."),
                    nodes = document.getElementsByTagName(data[0]);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].className.indexOf(data[1]) >= 0 && !t) {
                        list.push(nodes[i]);
                    } else if (nodes[i].className == data[1] && t) {
                        list.push(nodes[i]);
                    }
                }
                return list[0] ? list : null;
            },
            declOfNum: function(number, titles) {
                var cases = [2, 0, 1, 1, 1, 2];
                return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            },
            console: {
                info: function(str) {
                    var date = new Date();
                    str = "(" + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ") " + str;
                    console.info(str);
                    date = null;
                },
                error: function(str) {
                    var date = new Date();
                    str = "(" + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ") " + str;
                    console.error(str);
                    date = null;
                },
                log: function(str) {
                    var date = new Date();
                    str = "(" + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ") " + str;
                    console.log(str);
                    date = null;
                },
                debug: function(str) {
                    var date = new Date();
                    str = "(" + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ") " + str;
                    console.debug(str);
                    date = null;
                }
            },
            time2str: function(t) {
                var time = parseInt(t, 10);
                if (!isNaN(time)) {
                    var str = parseFloat(time / 3600).toFixed(2).toString();
                    str = str.split(".");
                    return str[0] + " ч, " + parseInt(str[1] / (100 / 60), 10) + " мин";
                } else {
                    main.console.info(time);
                    return null;
                }
            },
            sound: function(f, v) {
                try {
                    var audio = new Audio(f);
                    audio.volume = v / 100;
                    audio.play();
                } catch (e) {
                    main.console.error('Ошибка (SOUND): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            soundEvents: function() {
                try {
                    var ev = {
                        'mail': main.qs("#mail_notif_cnt"),
                        'journal': main.qs("#jour_notif_cnt"),
                        'feed': main.qs("#lent_notif_cnt")
                    };
                    var tabActive = main.getCookie("spacesactive");
                    var counter = 0;
                    for (var i in ev) {
                        if (ev[i] && _SETTINGS.events[i] && ev[i].innerHTML != "" && !isNaN(ev[i].innerHTML)) {
                            counter = counter + parseInt(ev[i].innerHTML, 10);
                        }
                    }
                    if (counter > eventsCounter) {
                        main.sound(_SETTINGS.events.url, _SETTINGS.events.volume);
                        if (_SETTINGS.events.notifications) {
                            var string = main.declOfNum(counter, ["новое событие", "новых события", "новых событий"]);
                            main.notifications("Новые события на Spaces!", {
                                body: "У Вас " + counter + " " + string + "!",
                                icon: ICON48,
                                tag: "events"
                            }, null);
                        }
                        eventsCounter = counter;
                        main.console.info("Новые события: " + counter + ", вкладка активна: " + tabActive);
                    } else if (counter < eventsCounter) {
                        eventsCounter = counter;
                        main.console.info("Скидываем счётчик до: " + counter);
                    }
                } catch (e) {
                    main.console.error('Ошибка (EVENTS): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            friendsOnline: function(t) {
                var frCount = main.qs("#friends_cnt");
                var frOnDiv = main.qs("#SP_PLUS_FRIENDSSB");
                var count = 0;
                if (frCount && !isNaN(frCount.innerHTML)) {
                    count = parseInt(frCount.innerHTML, 10);
                }
                if (frCount) {
                    try {
                        if (_SETTINGS.friendsListSH) {
                            if (frOnDiv) {
                                if (!frCount.parentNode.title) {
                                    frCount.parentNode.title = "Скрыть список";
                                }
                                if (!frCount.parentNode.hasAttribute("sp-click-el")) {
                                    frCount.parentNode.onclick = function(e) {
                                        if (frOnDiv.style.display != "none") {
                                            frOnDiv.style.display = "none";
                                            e.target.parentNode.title = "Показать список";
                                        } else {
                                            frOnDiv.style.display = "";
                                            e.target.parentNode.title = "Скрыть список";
                                        }
                                        return false;
                                    };
                                    frCount.parentNode.setAttribute("sp-click-el", "1");
                                }
                            }
                        } else {
                            frCount.parentNode.title = "";
                            frCount.parentNode.removeAttribute("sp-click-el");
                            frCount.parentNode.onclick = null;
                            if (frOnDiv && frOnDiv.style.display == "none") {
                                frOnDiv.style.display = "";
                            }
                        }
                        if (!t) {
                            if (frOnDiv) {
                                main.remove(frOnDiv);
                                countFriends = 0;
                                main.console.info("[S+] Убрали панель друзей!");
                            }
                            frCount.parentNode.onclick = null;
                            frCount.parentNode.removeAttribute("sp-click-el");
                            friendsForce = 0;
                        } else if (count > 0) {
                            friendsForce++;
                            if (count != countFriends || (count > 0 && !frOnDiv) || friendsForce >= 700) {
                                if (friendsForce >= 700) {
                                    friendsForce = 0;
                                    main.console.info("[S+] Принудительно обновляем друзей!");
                                }
                                countFriends = count;
                                var parent = frCount.parentNode.parentNode.parentNode;
                                frOnDiv = frOnDiv || main.ce("div", {
                                    id: "SP_PLUS_FRIENDSSB",
                                    class: "list-link__wrap"
                                });
                                main.jajax(_PROTOCOL + '//' + _DOMAIN + '/friends/?S=3', function(res) {
                                    try {
                                        var _json = {
                                            'tabbed_panel': {
                                                'tabs': [null, {
                                                    'content': {
                                                        'list': null
                                                    }
                                                }]
                                            }
                                        };
                                        var json = main.extend(_json, JSON.parse(res));
                                        var tmPfriendsList = json.tabbed_panel.tabs[1].content.list;
                                        if (tmPfriendsList) {
                                            main.jajax(_PROTOCOL + '//' + _DOMAIN + '/friends/?P=2&S=3', function(res2) {
                                                var _json2 = {
                                                    'tabbed_panel': {
                                                        'tabs': [null, {
                                                            'content': {
                                                                'list': {
                                                                    'avatar': [null, {
                                                                        'previewURL': null,
                                                                        'name': null
                                                                    }],
                                                                    'online_label': [null, {
                                                                        'online_status': null,
                                                                        'on_img': null
                                                                    }],
                                                                }
                                                            }
                                                        }]
                                                    }
                                                };
                                                var disableAvatar = main.find(document.getElementsByTagName('span'), {
                                                    className: "s_i s_i_exit"
                                                });
                                                var json2 = main.extend(_json2, JSON.parse(res2));
                                                var friendsList = json2.tabbed_panel.tabs[1].content.list;
                                                if (friendsList) {
                                                    friendsList = main.extend(tmPfriendsList, friendsList);
                                                } else {
                                                    friendsList = tmPfriendsList;
                                                }
                                                frOnDiv.innerHTML = "";
                                                var lenList = (_SETTINGS.friendsOnMax > friendsList.length ? friendsList.length : _SETTINGS.friendsOnMax);
                                                if (countFriends != friendsList.length && reCount < 3) {
                                                    reCount++;
                                                    setTimeout(function() {
                                                        countFriends = friendsList.length;
                                                        main.console.info("[S+] Количество друзей не точное, пробуем еще раз (" + reCount + " из 3)");
                                                    }, 1000);
                                                } else if (countFriends == friendsList.length) {
                                                    reCount = 0;
                                                }
                                                for (var i = 0; i < lenList; i++) {
                                                    frOnDiv.appendChild(main.ce("a", {
                                                        href: _PROTOCOL + '//' + _DOMAIN + '/mysite/index/' + friendsList[i].name + '/',
                                                        class: "li",
                                                        html: (disableAvatar ? '<span class="comm_ava m for_avatar"><img src="' + friendsList[i].avatar.previewURL + '" class="preview s21_20"></span>' : '') + '<span class="online-status m"><img class="p14 online_status_ico" src="' + _PROTOCOL + '//spac.me/i/' + friendsList[i].online_status.on_img + '" alt="(ON)"></span><span class="block-item__title m break-word">' + friendsList[i].name + '</span>'
                                                    }));
                                                }
                                                frCount.parentNode.removeAttribute("sp-click-el");
                                                main.console.info("[S+] Обновили список друзей!");
                                            });
                                        } else {
                                            main.remove(frOnDiv);
                                        }
                                    } catch (e) {
                                        main.console.error('Ошибка (FRIENDS-ONLINE-JSON): ' + e.name + ":" + e.message + "\n" + e.stack);
                                    }
                                });
                                parent.appendChild(frOnDiv);
                            }
                        } else if (count == 0) {
                            if (frOnDiv) {
                                main.remove(frOnDiv);
                            }
                        }
                    } catch (e) {
                        main.console.error('Ошибка (FRIENDS-ONLINE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            onlineWidget: function() {
                var path = document.location.pathname.toString();
                var nick = main.getPath("target");
                var target = '/anketa/index/' + nick + '/';
                if (path == target) {
                    try {
                        var onBlock = main.getClassName("div.info-item__title", 1);
                        if (nick && onBlock && onlineLock != nick) {
                            onlineLock = nick;
                            main.jajax(_PROTOCOL + '//' + _DOMAIN + '/anketa/index/' + nick + '/', function(data) {
                                if (data) {
                                    try {
                                        var _json = {
                                            'user_widget': {
                                                'online_time': null
                                            }
                                        };
                                        var json = main.extend(_json, JSON.parse(data));
                                        if (json.user_widget.online_time) {
                                            var online = main.time2str(json.user_widget.online_time);
                                            for (var i in onBlock) {
                                                if (onBlock[i].innerHTML == "Время онлайн:") {
                                                    var inblock = onBlock[i].nextElementSibling || onBlock[i].nextSibling;
                                                    if (inblock.nodeType == 3) {
                                                        inblock.data = " " + online;
                                                    } else {
                                                        inblock.innerHTML = online;
                                                    }
                                                    main.console.info("[S+] Время онлайн: " + online);
                                                }
                                            }
                                        }
                                    } catch (e) {
                                        main.console.error('Ошибка (JSON-ONLINE): ' + e.name + ":" + e.message + "\n" + e.stack);
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        main.console.error('Ошибка (ONLINE-WIDGET): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                } else if (path != target) {
                    onlineLock = null;
                }
            },
            favoriteAdd: function() {
                var locationHref = document.location.href;
                var path = main.getPath("method");
                var path2 = main.getPath("index");
                if (locationHref == _PROTOCOL + "//" + _DOMAIN + "/bookmarks/add/?irb526786=1" && !favRLock) {
                    favRLock = locationHref;
                    main.setLocation(_PROTOCOL + "//" + _DOMAIN + "/bookmarks/?irb526786=1");
                }
                if ((path == 'mysite' || (path == 'anketa' && path2 != 'edit') || path == 'activity') && favLock != locationHref) {
                    var fvtools = main.qs("#SP_PLUS_INFAVORITE");
                    favLock = locationHref;
                    try {
                        var nick = main.getPath("target");
                        if (!nick) {
                            nick = main.getQuery("user") || main.service(0);
                        }
                        var tbBlock = main.getClassName("td.table__cell table__cell_last", 1);
                        if (nick && tbBlock && tbBlock[0].innerHTML.indexOf("Вперёд") < 0 && !fvtools) {
                            main.jajax(_PROTOCOL + '//' + _DOMAIN + '/anketa/index/' + nick, function(data) {
                                if (data) {
                                    try {
                                        var _json = {
                                            'user_widget': {
                                                'id': null
                                            }
                                        };
                                        var json = main.extend(_json, JSON.parse(data));
                                        var lClass;
                                        if (json.user_widget.id) {
                                            if (tbBlock[0].firstElementChild.nodeName == "A") {
                                                lClass = tbBlock[0].firstElementChild.className.split(" ")[0];
                                            } else {
                                                lClass = 'stnd-link';
                                            }
                                            var favLink = fvtools || main.ce("td", {
                                                class: "table__cell",
                                                id: "SP_PLUS_INFAVORITE"
                                            });
                                            favLink.innerHTML = '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/bookmarks/add/?object_id=' + json.user_widget.id + '&object_type=11" class="' + lClass + '" title="Добавить в закладки"><span class="sp sp-fav"></span> B закладки</a>';
                                            main.isFav(json.user_widget.id, favLink, nick, '<span class="sp sp-fav-on"></span><span style="color: #61a961;"> В закладках</span>');
                                            if (!fvtools) {
                                                main.inBefore(favLink, tbBlock[0]);
                                            }
                                            var clds = tbBlock[0].parentNode.childNodes;
                                            for (var x in clds) {
                                                if (clds[x].nodeName == "TD") clds[x].width = "25%";
                                            }
                                        }
                                    } catch (e) {
                                        main.console.error('Ошибка (JSON-FAVORITE): ' + e.name + ":" + e.message + "\n" + e.stack);
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        main.console.error('Ошибка (FAVORITE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                } else if (path != 'mysite' && path != 'anketa' && path != 'activity') {
                    favLock = null;
                }
            },
            rotateMedia: function() {
                var Image = main.qs("#gallery-container");
                var Video = main.qs("#galleryVideo");
                var Rotate = main.qs("#SP_IMAGE_ROTATE");
                try {
                    if (Image != null && Rotate == null && Video) {
                        var target_button = main.qs("#g_dloadlink");
                        var button_rotate = main.ce("a", {
                            class: "gallery__tools_button",
                            id: "SP_IMAGE_ROTATE",
                            title: "Повернуть",
                            html: "<span class='ico_gallery ico_gallery_reload m'></span>",
                            onclick: function() {
                                var beta = main.getCookie("sandbox");
                                var ImageOrVideo = main.find(Image.getElementsByTagName("img"), {
                                    src: _PROTOCOL + "//" + beta == 1 ? "beta.spac.me" : "spac.me" + "/i/pixel.png"
                                });
                                if (ImageOrVideo != null) {
                                    if (!Player) {
                                        angleI = (angleI + 90) % 360;
                                        Image.className = "accel-3d rotate" + angleI;
                                    } else {
                                        angleV = (angleV + 90) % 360;
                                        Player[0].className = "jwvideo rotate" + angleV;
                                    }
                                } else {
                                    angleI = (angleI + 90) % 360;
                                    Image.className = "accel-3d rotate" + angleI;
                                }
                                return false;
                            }
                        });
                        target_button.after(button_rotate);
                    }
                } catch (e) {
                    main.console.error('Ошибка (ROTATE-MEDIA): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            videoPlayback: function() {
                var target = main.qs("#main_wrap");
                var playback = main.qs("#SP_PLAYBACK_VIDEO");
                try {
                    if (target) {
                        var jwcontrols = main.find(target.getElementsByTagName("span"), {
                            className: "jwcontrols"
                        });
                    }
                    if (jwcontrols != null && playback == null) {
                        var target_button = main.find(target.getElementsByTagName("span"), {
                            className: "jwtext jwduration jwhidden"
                        });
                        var button_rotate = main.ce("span", {
                            class: "jwtext jwduration jwhidden",
                            id: "SP_PLAYBACK_VIDEO",
                            html: "x" + videoPlayback,
                            onclick: function() {
                                videoPlayback = (videoPlayback + 0.25) % 2.25;
                                if (videoPlayback == 0) videoPlayback = 0.5;
                                button_rotate.innerHTML = "x" + videoPlayback;
                                document.querySelector('video').playbackRate = videoPlayback;
                                return false;
                            }
                        });
                        target_button[0].after(button_rotate);
                    }
                } catch (e) {
                    main.console.error('Ошибка (VIDEO-PLAYBACK): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            isFav: function(id, el, nm, html) {
                main.jajax(_PROTOCOL + '//' + _DOMAIN + '/bookmarks/add/?object_id=' + id + '&object_type=11', function(data) {
                    if (data) {
                        try {
                            var _json = {
                                'delete_link': {
                                    'delete_URL': null
                                }
                            };
                            var json = main.extend(_json, JSON.parse(data));
                            if (json.delete_link.delete_URL) {
                                var dlink = json.delete_link.delete_URL.replace(/&amp;/g, '&');
                                el.firstElementChild.href = dlink;
                                el.firstElementChild.title = "Удалить из закладок";
                                el.firstElementChild.innerHTML = html;
                                el.firstElementChild.onclick = function() {
                                    main.confirmm("Вы действительно хотите удалить пользователя <b>" + nm + "</b> из закладок?", 0, function() {
                                        main.jajax(dlink, function() {
                                            document.location.reload();
                                        });
                                    });
                                    return false;
                                };
                            }
                        } catch (e) {
                            main.console.error('Ошибка (JSON-ISFAVORITE): ' + e.name + ":" + e.message + "\n" + e.stack);
                        }
                    }
                });
            },
            bannedHTML: function(nick, type, blocked) {
                var out = type ? '<div class="widgets-group links-group"><a href="' + _PROTOCOL + '//' + _DOMAIN + '/gifts/user_list/' + nick + '" class="list-link list-link_arrow list-link_first"><span class="ico ico_gifts_blue"></span> Подарки<span class="ico ico_arr"></span></a>' + (!blocked ? '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/guestbook/?name=' + nick + '" class="list-link list-link_arrow list-link_first"><span class="ico ico_gb"></span> Гостевая<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/diary/?name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_blog"></span> Личный блог<span class="ico ico_arr"></span></a>' : '') + '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/forums/search_user/?Comm=0&Ext=1&Link_id=363467&query=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_forum"></span> Темы и комментарии <span class="ico ico_arr"></span></a>' + (!blocked ? '<div class="sep-item"></div><a href="' + _PROTOCOL + '//' + _DOMAIN + '/pictures/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_photo"></span> Фотографии<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/music/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_music"></span> Музыка<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/video/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_video"></span> Видео<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/files/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_file"></span> Файлы<span class="ico ico_arr"></span></a>' : '') + '<div class="sep-item"></div><a href="' + _PROTOCOL + '//' + _DOMAIN + '/comm/?List=1&user=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_comm"></span> Сообщества<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/friends/?name=' + nick + '&amp;p=1" class="list-link list-link_arrow"><span class="ico ico_friends"></span> Друзья<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/lenta/readers/?user=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_readers"></span> Читатели<span class="ico ico_arr"></span></a></div>' : '<div class="no_underline_block start_page_padd light_border_bottom" style="padding-top:1px;"><div><a href="' + _PROTOCOL + '//' + _DOMAIN + '/gifts/user_list/' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/sendgift.gif" alt="" class="m p16"> <span class="m">Подарки</span></a></div>' + (!blocked ? '<div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/guestbook/?name=' + nick + '&amp;p=0"><img src="' + _PROTOCOL + '//spac.me/i/guestbook.gif" alt="" class="m p16"> <span class="m">Гостевая</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/diary/?name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/diary.gif" alt="" class="m p16"> <span class="m">Блог</span></a></div>' : '') + '</div><div class="no_underline_block start_page_padd light_blue light_border_bottom">' + (!blocked ? '<div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/pictures/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/PhotoIcon.gif" alt="" class="m p16"> <span class="m">Фото</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/music/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/file_mp3.gif" alt="" class="m p16"> <span class="m">Музыка</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/video/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/icon_video.gif" alt="" class="m p16"> <span class="m">Видео</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/files/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/film.gif" alt="" class="m p16"> <span class="m">Файлы</span></a></div>' : '') + '<div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/forums/search_user/?Comm=0&Ext=1&word=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/Forum.gif" alt="" class="m p16"> <span class="m">Темы и комментарии</span></a> </div></div><div class="no_underline_block start_page_padd light_border_bottom"><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/friends/?name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/friends.gif" alt="" class="m p16"> <span class="m">Друзья</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/comm/?List=1&user=' + nick + '"> <img src="' + _PROTOCOL + '//spac.me/i/soo.gif" alt="" class="m p16"> <span class="m">Сообщества</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/lenta/readers/?user=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/icon_readers.gif" alt="" class="m p16"> <span class="m">Читатели</span></a></div></div>';
                return out;
            },
            bannedTools: function() {
                var locationHref = document.location.href.replace(/\#.*$/i, ''),
                    path = document.location.pathname.toString(),
                    nick = main.getPath("target"),
                    target = '/mysite/index/' + nick + '/',
                    type = true;
                var btools = main.qs("#SP_PLUS_BNDBLOCK");
                if (path == target && banLock != locationHref) {
                    try {
                        if (!nick) {
                            nick = main.getPath("target") || main.service(0);
                        }
                        banLock = locationHref;
                        if (btools) main.remove(btools);
                        if (nick) {
                            main.jajax(_PROTOCOL + '//' + _DOMAIN + '/mysite/index/' + nick + '/', function(res) {
                                try {
                                    if (res) {
                                        var sContent = main.qs("#siteContent");
                                        if (!sContent) {
                                            sContent = main.getClassName("div.main", null);
                                            if (sContent) {
                                                sContent = sContent[0];
                                                type = false;
                                            }
                                        }
                                        var _json = {
                                            'owner_id': null,
                                            'owner_widget': {
                                                'ban_info': {
                                                    'deleted': null,
                                                    'frozen': null,
                                                    'blocked': null
                                                }
                                            }
                                        };
                                        var json = main.extend(_json, JSON.parse(res));
                                        if (json.owner_widget.ban_info && json.owner_id && sContent) {
                                            var blckg = false;
                                            var bl = json.owner_widget.ban_info.in_blacklist_result;
                                            if (json.owner_widget.ban_info.deleted) {
                                                main.console.info("[S+] Аккаунт удален!");
                                            } else if (bl) {
                                                switch (bl) {
                                                    case "1":
                                                        main.console.info("[S+] Аккаунт у вас в черном списке!");
                                                        break;
                                                    case "2":
                                                        main.console.info("[S+] Вы в черном списке!");
                                                        break;
                                                }
                                            } else if (json.owner_widget.ban_info.frozen) {
                                                main.console.info("[S+] Аккаунт покинут!");
                                            } else if (json.owner_widget.ban_info.blocked) {
                                                main.console.info("[S+] Аккаунт забанен!");
                                                blckg = true;
                                            }
                                            var tBlock = btools || main.ce("div", {
                                                id: "SP_PLUS_BNDBLOCK"
                                            });
                                            tBlock.innerHTML = main.bannedHTML(nick, type, blckg);
                                            if (!btools) {
                                                sContent.appendChild(tBlock);
                                            }
                                        }
                                    }
                                } catch (e) {
                                    main.console.error('Ошибка (JSON-BLOCKED): ' + e.name + ":" + e.message + "\n" + e.stack);
                                }
                            });
                        }
                    } catch (e) {
                        main.console.error('Ошибка (BLOCKED): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                } else if (path != target) {
                    if (btools) main.remove(btools);
                    banLock = null;
                }
            },
            extend: function(obj1, obj2) {
                if (obj2) {
                    for (var i in obj2) {
                        if (obj2.hasOwnProperty(i)) {
                            obj1[i] = obj2[i];
                        }
                    }
                }
                return obj1;
            },
            service: function(r) {
                try {
                    var nscr = document.getElementsByTagName('script').item(0);
                    if (r) {
                        if (/REVISION\s?=\s?'(.*?)'/i.test(nscr.innerHTML)) {
                            var rev = main.trim(/REVISION\s?=\s?'(.*?)'/i.exec(nscr.innerHTML)[1]);
                            return rev == "" ? null : rev;
                        } else {
                            return null;
                        }
                    } else {
                        if (/name:'(.*?)'/i.test(nscr.innerHTML)) {
                            var name = main.trim(/name:'(.*?)'/i.exec(nscr.innerHTML)[1]);
                            return name == "" ? null : name;
                        } else {
                            return null;
                        }
                    }
                } catch (e) {
                    return null;
                }
            },
            unixTime: function() {
                return Math.round(new Date().getTime() / 1000.0);
            },
            toUpper: function(str) {
                return str[0].toUpperCase() + str.substring(1);
            },
            getCK: function() {
                var logout = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/logout/?"
                });
                return main.getParams(logout[0].href)["CK"];
            },
            allCookie: function() {
                var obj = new Object();
                var cook = document.cookie;
                if (cook && main.trim(cook) != "") {
                    var v1 = cook.split(";");
                    for (var i = 0; i < v1.length; i++) {
                        var tr = main.trim(v1[i]);
                        if (tr != "") {
                            var v2 = tr.split("=");
                            obj[decodeURIComponent(v2[0])] = decodeURIComponent(v2[1]);
                        }
                    }
                }
                return obj;
            },
            getCookie: function(name) {
                var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            },
            delCookie: function(name) {
                main.setCookie(name, null, {
                    expires: -1
                });
            },
            setCookie: function(key, value, opts) {
                opts = main.extend({
                    path: '/',
                    expires: 365,
                    secure: false,
                    domain: '.' + _DOMAIN
                }, opts);
                if (opts.expires && !(opts.expires instanceof Date)) opts.expires = new Date(+new Date + 1000 * 3600 * 24 * opts.expires);
                var query = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                if (opts.expires) query += "; expires=" + opts.expires.toUTCString();
                if (opts.domain) query += "; domain=" + opts.domain;
                if (opts.path) query += "; path=" + opts.path;
                if (opts.secure) query += "; secure";
                document.cookie = query;
            },
            find: function(obj, obj2) {
                var list = new Array();
                for (var i = 0; i < obj.length; i++) {
                    for (var j in obj2) {
                        if (obj[i][j].indexOf(obj2[j]) >= 0) {
                            list.push(obj[i]);
                        }
                    }
                }
                return list[0] ? list : null;
            },
            readersDelete: function() {
                var path = document.location.pathname.toString();
                if (path == '/lenta/readers/' && !main.qs("#SP_PLUS_BOTTOM_DIVB")) {
                    try {
                        var edLinks = main.find(document.links, {
                            href: _PROTOCOL + "//" + _DOMAIN + "/lenta/reader_delete/?"
                        });
                        if (edLinks && !main.qs("#SP_PLUS_BOTTOM_DIVB")) {
                            var CK = main.getCK();
                            var chbxArr = new Array();
                            for (var i in edLinks) {
                                edLinks[i].style.textAlign = "center";
                                var chWrap = main.ce("label", {
                                    class: "stnd-link icon-link",
                                    style: "right: 50px; top: -42px; padding-left: 8px; padding-right: 8px;",
                                });
                                var bChbx = main.ce("input", {
                                    type: "checkbox",
                                    id: "SP_DR_" + /(\?|&)user=([A-Za-z0-9\_]+)/i.exec(edLinks[i].href)[2],
                                    class: "sp-cbfr sp-checkbox-square"
                                });
                                var ckbxlb = main.ce("label", {
                                    style: "margin-left: 0px;",
                                    attr: {
                                        "for": "SP_DR_" + /(\?|&)user=([A-Za-z0-9\_]+)/i.exec(edLinks[i].href)[2]
                                    }
                                });
                                chWrap.appendChild(bChbx);
                                chWrap.appendChild(ckbxlb);
                                main.insertAfter(chWrap, edLinks[i]);
                                chbxArr.push(bChbx);
                            }
                            var lastParent = edLinks[edLinks.length - 1].parentNode;
                            if (lastParent) lastParent = lastParent.parentNode;
                            if (lastParent) {
                                var btnDiv = main.ce("div", {
                                    class: "user__tools_last",
                                    id: "SP_PLUS_BOTTOM_DIVB"
                                });
                                var chSubm = main.ce("button", {
                                    class: "user__tools-link table__cell",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">Выбрать все</span>',
                                    onclick: function(e) {
                                        var parent = (e.target.nodeName == "SPAN" ? e.target.parentNode : e.target);
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (parent.innerHTML.indexOf('Выбрать все') >= 0) {
                                                chbxArr[i].checked = true;
                                            } else {
                                                chbxArr[i].checked = false;
                                            }
                                        }
                                        parent.innerHTML = '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">' + (parent.innerHTML.indexOf('Выбрать все') >= 0 ? "Снять отметки" : "Выбрать все") + '</span>';
                                        return false;
                                    }
                                });
                                var delSubm = main.ce("button", {
                                    class: "user__tools-link table__cell sp_btn_line",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="ico ico_delete"></span><span style="color: #F86934;">Удалить выбранных</span>',
                                    onclick: function() {
                                        var delCount = 0,
                                            dArr = new Array();
                                        chSubm.innerHTML = '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">Выбрать все</span>';
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (chbxArr[i].checked == true) {
                                                var delId = /^SP_DR_([A-Za-z0-9\_]+)$/i.exec(chbxArr[i].id)[1];
                                                dArr.push(delId);
                                                chbxArr[i].checked = false;
                                                delCount++;
                                            }
                                        }
                                        if (delCount > 0) {
                                            var con = main.declOfNum(delCount, ["я", "я", "ей"]);
                                            main.confirmm("Вы действительно хотите удалить " + delCount + " читател" + con + "?", 0, function() {
                                                var intr = setInterval(function() {
                                                    main.alert("Процесс...<div class='pad_t_a'></div><small>Удаляем читателей <span class='ico ico_spinner'></span></small>", 0, null);
                                                    delCount--;
                                                    var dIdBl = dArr[delCount];
                                                    main.ajax(_PROTOCOL + '//' + _DOMAIN + '/lenta/reader_delete/?user=' + dIdBl, 'POST', '&CK=' + CK + '&cfms=Удалить', "GET", function() {
                                                        main.console.info("[S+] Удалили читателей: " + dIdBl);
                                                    }, 2);
                                                    if (delCount < 0) {
                                                        dArr = null;
                                                        clearInterval(intr);
                                                        document.location.reload();
                                                    }
                                                }, 500);
                                            });
                                        } else {
                                            main.alert("Ошибка!<div class='pad_t_a'></div><small>Не выбрано ни одного читателя.</small>", 1, null);
                                        }
                                        return false;
                                    }
                                });
                                btnDiv.appendChild(delSubm);
                                btnDiv.appendChild(chSubm);
                                main.insertAfter(btnDiv, lastParent);
                            } else {
                                for (i = 0; i < chbxArr.length; i++) {
                                    chbxArr[i].style.display = "none";
                                }
                                var btnDivNone = main.ce("div", {
                                    style: "display: none;",
                                    id: "SP_PLUS_BOTTOM_DIVB"
                                });
                                document.body.appendChild(btnDivNone);
                            }
                        }
                    } catch (e) {
                        main.console.error('Ошибка (READERS-DELETE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            blogsDelete: function() {
                var path = document.location.pathname.toString();
                var p = path.split('/');
                if ((p[1] == 'diary' && p[2] == null) || (p[1] == 'diary' && p[2] == 'view') && !main.qs("#SP_PLUS_BOTTOM_DIVB")) {
                    try {
                        var edLinks = main.find(document.links, {
                            href: _PROTOCOL + "//" + _DOMAIN + "/diary/editaccess/?Link_id="
                        });
                        if (edLinks && !main.qs("#SP_PLUS_BOTTOM_DIVB")) {
                            var CK = main.getCK();
                            var chbxArr = new Array();
                            for (var i = 0; i < edLinks.length; i++) {
                                if (edLinks[i].className) {
                                    edLinks[i].style.textDecoration = "none";
                                    var bChbx = main.ce("input", {
                                        type: "checkbox",
                                        id: "SP_DB_" + /\&id=([0-9]+)/i.exec(edLinks[i].href)[1],
                                        class: "sp-cbfb sp-checkbox-square"
                                    });
                                    var ckbxlb = main.ce("label", {
                                        style: "margin: 1px",
                                        attr: {
                                            "for": "SP_DB_" + /\&id=([0-9]+)/i.exec(edLinks[i].href)[1]
                                        }
                                    });
                                    main.insertAfter(bChbx, edLinks[i]);
                                    main.insertAfter(ckbxlb, bChbx);
                                    chbxArr.push(bChbx);
                                }
                            }
                            var lastParent = chbxArr[chbxArr.length - 1].parentNode;
                            if (lastParent) lastParent = lastParent.parentNode;
                            if (lastParent) lastParent = lastParent.parentNode;
                            if (lastParent) lastParent = lastParent.parentNode.parentNode;
                            if (lastParent) {
                                var btnDiv = main.ce("div", {
                                    class: "widgets-group user__tools_last",
                                    id: "SP_PLUS_BOTTOM_DIVB"
                                });
                                var chSubm = main.ce("button", {
                                    class: "user__tools-link table__cell",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">Выбрать все</span>',
                                    onclick: function(e) {
                                        var parent = (e.target.nodeName == "SPAN" ? e.target.parentNode : e.target);
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (parent.innerHTML.indexOf('Выбрать все') >= 0) {
                                                chbxArr[i].checked = true;
                                            } else {
                                                chbxArr[i].checked = false;
                                            }
                                        }
                                        parent.innerHTML = '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">' + (parent.innerHTML.indexOf('Выбрать все') >= 0 ? "Снять отметки" : "Выбрать все") + '</span>';
                                        return false;
                                    }
                                });
                                var delSubm = main.ce("button", {
                                    class: "user__tools-link table__cell sp_btn_line",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="ico ico_delete"></span><span style="color: #F86934;">Удалить выбранные</span>',
                                    onclick: function() {
                                        var delCount = 0,
                                            dArr = new Array();
                                        chSubm.innerHTML = '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">Выбрать все</span>';
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (chbxArr[i].checked == true) {
                                                var delId = /^SP_DB_([0-9]+)$/i.exec(chbxArr[i].id)[1];
                                                dArr.push(delId);
                                                chbxArr[i].checked = false;
                                                delCount++;
                                            }
                                        }
                                        if (delCount > 0) {
                                            var con = main.declOfNum(delCount, ["", "а", "ов"]);
                                            main.confirmm("Вы уверены что хотите удалить " + delCount + " блог" + con + "?", 0, function() {
                                                var intr = setInterval(function() {
                                                    main.alert("Процесс...<div class='pad_t_a'></div><small>Удаляем блоги <span class='ico ico_spinner'></span></small>", 0, null);
                                                    delCount--;
                                                    var dIdBl = dArr[delCount];
                                                    main.ajax(_PROTOCOL + '//' + _DOMAIN + '/diary/delete/?CK=' + CK + '&id=' + dIdBl + '&Sure=1', "GET", null, null, 2);
                                                    if (delCount < 0) {
                                                        clearInterval(intr);
                                                        document.location.reload();
                                                    }
                                                }, 500);
                                            });
                                        } else {
                                            main.alert("Внимание!<div class='pad_t_a'></div><small>Не выбрано ни одного блога!</small>", 1, null);
                                        }
                                        return false;
                                    }
                                });
                                btnDiv.appendChild(delSubm);
                                btnDiv.appendChild(chSubm);
                                main.insertAfter(btnDiv, lastParent);
                            } else {
                                for (var i = 0; i < chbxArr.length; i++) {
                                    chbxArr[i].style.display = "none";
                                }
                                var btnDivNone = main.ce("div", {
                                    style: "display: none;",
                                    id: "SP_PLUS_BOTTOM_DIVB"
                                });
                                document.body.appendChild(btnDivNone);
                            }
                        }
                    } catch (e) {
                        main.console.error('Ошибка (BLOGS-DELETE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            confirmm: function(html, warn, callback) {
                var Yes = main.ce("button", {
                    html: "Да",
                    href: "#",
                    class: "btn btn_red btn_input",
                });
                var No = main.ce("a", {
                    html: "Отмена",
                    href: "#",
                    class: "btn btn_white btn_input right sticker-close_btn"
                });
                var Warning = main.ce("small", {
                    class: "pad_t_a grey",
                    html: "Это действие нельзя будет отменить."
                });
                var Container = main.ce("div", {
                    class: "content-item3 wbg oh",
                    html: html + "<div class='pad_t_a'></div>"
                });
                var Br = main.ce("div", {
                    class: "pad_t_a"
                });
                Yes.onclick = function() {
                    var check = main.qs("#SP_PLUS_CONFIRM");
                    if (check) {
                        callback();
                        main.remove(check);
                        return false;
                    }
                    return true;
                };
                No.onclick = function() {
                    var check = main.qs("#SP_PLUS_CONFIRM");
                    if (check) {
                        main.remove(check);
                        return false;
                    }
                    return true;
                };
                var Main = main.qs("#SP_PLUS_CONFIRM");
                if (!Main) {
                    Main = main.ce("div", {
                        class: "sticker",
                        style: "-webkit-animation: create 0.3s; animation: create 0.3s;",
                        id: "SP_PLUS_CONFIRM"
                    });
                    if (!warn) {
                        Container.appendChild(Warning);
                    }
                    Container.appendChild(Br);
                    Container.appendChild(Yes);
                    Container.appendChild(No);

                    Main.appendChild(Container);
                    document.body.appendChild(Main);
                }
            },
            alert: function(html, close, timer) {
                var Container = main.ce("div", {
                    class: "sticker w400",
                    style: "-webkit-animation: create 0.3s; animation: create 0.3s;"
                });
                var Main = main.qs("#SP_PLUS_ALERT");
                if (!Main) {
                    Main = main.ce("div", {
                        class: "content-item3 wbg oh",
                        id: "SP_PLUS_ALERT",
                        html: (close ? '<span class="sp sp-remove-grey pointer right notif_close close_h" onclick="document.body.removeChild(this.parentNode.parentNode);" title="Закрыть"></span>' : '') + html
                    });
                    Container.appendChild(Main);
                    document.body.appendChild(Container);
                }
                if (!timer) {
                    setTimeout(function() {
                        if (main.qs("#SP_PLUS_ALERT")) main.qs("#SP_PLUS_ALERT").parentNode.parentNode.removeChild(Container);
                    }, 4000);
                }
            },
            commentsDelete: function() {
                var childs = main.getClassName("span.comment_date", null);
                var bttlDiv = main.qs("#SP_PLUS_BOTTOM_DIV");
                try {
                    if (childs) {
                        if (!bttlDiv || childs.length != commentsLength) {
                            commentsLength = childs.length;
                            var delLink = null;
                            var refDiv = main.qs("div.js-comments-pgn");
                            var modrs = main.find(document.getElementsByTagName("input"), {
                                name: "del_comment_"
                            });
                            if (modrs) {
                                var testlink = main.find(modrs[0].parentNode.parentNode.parentNode.getElementsByTagName("a"), {
                                    innerHTML: "Удалить"
                                });
                                for (var x = 0; x < modrs.length; x++) {
                                    if (!modrs[x].id || !/^DC_\d+$/i.test(modrs[x].id)) {
                                        var ckbxlb = main.ce("label", {
                                            attr: {
                                                "for": "DC_" + modrs[x].value
                                            }
                                        });
                                        modrs[x].id = "DC_" + modrs[x].value;
                                        modrs[x].className = "sp-checkbox-square";
                                        main.insertAfter(ckbxlb, modrs[x]);
                                    }
                                }
                            } else {
                                for (var k = 0; k < childs.length; k++) {
                                    delLink = main.find(childs[k].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("a"), {
                                        innerHTML: "Удалить"
                                    });
                                    if (delLink && childs[k].getElementsByTagName("input").length == 0) {
                                        var ckbx = main.ce("input", {
                                            type: "checkbox",
                                            class: "sp-cbfc sp-checkbox-square",
                                            id: "DC_" + childs[k].parentNode.parentNode.parentNode.parentNode.parentNode.id
                                        });
                                        var ckbxlb2 = main.ce("label", {
                                            attr: {
                                                "for": "DC_" + childs[k].parentNode.parentNode.parentNode.parentNode.parentNode.id
                                            }
                                        });
                                        childs[k].appendChild(ckbx);
                                        childs[k].appendChild(ckbxlb2);
                                    }
                                    if (k == (childs.length - 1) && !refDiv) {
                                        refDiv = childs[k].parentNode.parentNode.parentNode.parentNode;
                                    }
                                }
                            }
                            if (((modrs && testlink) || delLink) && !bttlDiv) {
                                var inputs = document.getElementsByTagName("input");
                                var exDiv = main.ce("div", {
                                    class: "widgets-group user__tools_last",
                                    id: "SP_PLUS_BOTTOM_DIV"
                                });
                                var chSubm = main.ce("button", {
                                    class: "user__tools-link table__cell",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">Выбрать все</span>',
                                    onclick: function(e) {
                                        var parent = (e.target.nodeName == "SPAN" ? e.target.parentNode : e.target);
                                        for (var i = 0; i < inputs.length; i++) {
                                            if (inputs[i].type == "checkbox" && /DC_([0-9]+)/gi.test(inputs[i].id) && inputs[i].parentNode.parentNode.parentNode.style.display != "none") {
                                                if (parent.innerHTML.indexOf('Выбрать все') >= 0) {
                                                    inputs[i].checked = true;
                                                } else {
                                                    inputs[i].checked = false;
                                                }
                                            }
                                        }
                                        parent.innerHTML = '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">' + (parent.innerHTML.indexOf('Выбрать все') >= 0 ? "Снять отметки" : "Выбрать все") + '</span>';
                                        return false;
                                    }
                                });
                                var delSubm = main.ce("button", {
                                    class: "user__tools-link table__cell sp_btn_line",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="ico ico_delete"></span><span style="color: #F86934;">Удалить выбранные</span>',
                                    onclick: function() {
                                        var delCount = 0,
                                            dArr = new Array(),
                                            dArr2 = new Array();
                                        for (var i = 0; i < inputs.length; i++) {
                                            if (inputs[i].type == "checkbox" && /DC_([0-9]+)/gi.test(inputs[i].id) && inputs[i].checked == true) {
                                                if (modrs) {
                                                    var delLink = main.find(inputs[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("a"), {
                                                        innerHTML: "Удалить"
                                                    });
                                                } else {
                                                    var delLink = main.find(inputs[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("a"), {
                                                        innerHTML: "Удалить"
                                                    });
                                                }
                                                dArr.push(delLink[0]);
                                                dArr2.push(inputs[i]);
                                                delCount++;
                                            }
                                        }
                                        if (delCount > 0) {
                                            var con = main.declOfNum(delCount, ["й", "я", "ев"]);
                                            main.confirmm("Вы действительно хотите удалить " + delCount + " комментари" + con + "?", 0, function() {
                                                var intr = setInterval(function() {
                                                    main.alert("Процесс...<div class='pad_t_a'></div><small>Удаляем комментарии <span class='ico ico_spinner'></span></small>", 0, null);
                                                    delCount--;
                                                    if (dArr[delCount].href) {
                                                        main.ajax(dArr[delCount].href, "GET", null, null, 2);
                                                    } else {
                                                        var clickEvent = document.createEvent("MouseEvent");
                                                        clickEvent.initEvent("click", true, true);
                                                        dArr[delCount].dispatchEvent(clickEvent);
                                                    }
                                                    dArr2[delCount].checked = false;
                                                    dArr2[delCount].className += " sp_plus_ch_cd";

                                                    if (delCount < 1) {
                                                        clearInterval(intr);
                                                        document.location.reload();
                                                    }
                                                }, 500);
                                            });
                                        } else {
                                            main.alert("Ошибка!<div class='pad_t_a'></div><small>Не выбрано ни одного комментария.</small>", 1, null);
                                        }
                                        return false;
                                    }
                                });
                                exDiv.appendChild(delSubm);
                                exDiv.appendChild(chSubm);
                                if (refDiv) {
                                    main.insertAfter(exDiv, refDiv);
                                } else if (main.qs("#page-down")) {
                                    main.inBefore(exDiv, main.qs("#page-down"));
                                } else {
                                    main.console.error("[S+] Не смогли найти ориентир для вставки!");
                                }
                            }
                        }
                    } else {
                        commentsLength = 0;
                    }
                } catch (e) {
                    main.console.error('Ошибка (COMMENTS-DELETE): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            playerDown: function() {
                var downPlace = main.qs("#SP_MUSIC_DOWN");
                try {
                    var trId = 0;
                    var track = sessionStorage.getItem('music:track');
                    var data = sessionStorage.getItem('music:playlist');
                    var player = main.qs("#gp_main_player");
                    if (player && track && data) {
                        var jstr = JSON.parse(track);
                        trId = parseInt(jstr.id, 10);
                        var jspl = JSON.parse(data);
                        var trScr = jspl.playlist.playlist[trId].src;
                        var tdIc = main.find(player.getElementsByTagName("td"), {
                            className: "ico_td"
                        });
                        if (tdIc && !downPlace) {
                            playerId = trId;
                            var dwnTd = main.ce("td", {
                                id: "SP_MUSIC_DOWN",
                                class: "ico_td",
                                innerHTML: '<a href="' + trScr + '" target="_blank" class="tdn"></span><span class="ico ico_download2" title="Скачать"></span></a>'
                            });
                            main.insertAfter(dwnTd, tdIc[0]);
                        } else if (downPlace && playerId != trId) {
                            playerId = trId;
                            main.console.info("[S+] Обновили трек!");
                            downPlace.innerHTML = '<a href="' + trScr + '" target="_blank" class="tdn"></span><span class="ico ico_download2" title="Скачать"></span></a>';
                        }
                    }
                } catch (e) {
                    if (downPlace) {
                        main.remove(downPlace);
                    }
                    main.console.error('Ошибка (PLAYER-DOWN): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            coinsAccept: function() {
                var coinsLink = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/services/gift_get/?Link_id="
                });
                if (coinsLink) {
                    try {
                        main.ajax(coinsLink[0].href, 'GET', null, null, 2);
                        main.remove(coinsLink[0].parentNode);
                        main.console.info("[S+] Собрали монетку!");
                    } catch (e) {
                        main.console.error('Ошибка (COINS): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            karmaAccept: function() {
                var karmaLink = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/mysite/rate_n_karma/karma/?Accept="
                });
                if (karmaLink) {
                    try {
                        main.ajax(karmaLink[0].href, 'GET', null, null, 2);
                        main.remove(karmaLink[0].parentNode);
                        main.console.info("[S+] Собрали карму!");
                    } catch (e) {
                        main.console.error('Ошибка (KARMA): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            adsRemove: function() {
                var s = main.qs("#SP_PLUS_ADBLOCK");
                var reklama = main.find(document.links, {
                    title: "Реклама"
                });
                var tracker = main.find(document.getElementsByTagName('img'), {
                    src: "mobiads_plank_big.png"
                });
                var xbet = main.find(document.getElementsByTagName('a'), {
                    href: "https://tracker.ma-static.ru/tracker.php"
                });
                try {
                    if (tracker) {
                        main.remove(tracker[0].parentNode.parentNode.parentNode.parentNode);
                    }
                    if (xbet) {
                        main.remove(xbet[0].parentNode);
                    }
                    if (!s) {
                        var script = main.ce("script", {
                            type: "text/javascript",
                            id: "SP_PLUS_ADBLOCK",
                            html: "var rawOpen = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function() { if (!this._hooked) { this._hooked = true; setupHook(this); }; rawOpen.apply(this, arguments); }; function setupHook(xhr) { function getter() { delete xhr.responseText; var ret = xhr.responseText; var json = JSON.parse(ret); json.reklama = ''; json.rightbar_reklama = ''; json.rightbar_app = ''; json.sidebar_reklama = ''; ret = JSON.stringify(json); setup(); return ret; }; function setup() { Object.defineProperty(xhr, 'responseText', { get: getter, configurable: true }); } setup(); };"
                        });
                        document.getElementsByTagName('head')[0].appendChild(script);
                    } else if (reklama) {
                        main.remove(reklama[0].parentNode);
                    }
                } catch (e) {
                    main.console.error('Ошибка (ADBLOCK): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            tinyFix: function() {
                try {
                    var navi = main.find(document.links, {
                        className: 'horiz-menu__link'
                    });
                    if (navi) {
                        var mail = navi[2].cloneNode(true);
                        var lenta = navi[4].cloneNode(true);
                        navi[2].replaceWith(lenta);
                        navi[4].replaceWith(mail);
                    }
                } catch (e) {
                    main.console.error('Ошибка (TINY-FIX): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            apiDebugger: function() {
                try {
                    if (!main.qs("#spaces_api_debugger")) {
                        var apidebug = main.ce("script", {
                            type: "text/javascript",
                            html: 'var Arr=[\'<div class="time-block" style="text-align: left; padding: 4px; background: #cddae7; border-bottom: 1px solid #a7b4c7;" id="spaces_api_debugger"><a href="#" id="api_debug-button" style="color: #0e3c87; margin-left: 5px"><span class="ico_cats" style="background-position: -55px -54px;margin: 0 4px -4px 0;"></span> Debugger</a><a href="https://spaces-dev.github.io/api" style="color: #0e3c87; float: right" target="_blank">API Methods</a><div id="api_debug-place" style="display: none; margin-top: 5px"></div></div>\',"append","parent","#navi","debugger"];$(Arr[3])[Arr[2]]()[Arr[1]](Arr[0]),require(Arr[4]);void(0);'
                        });
                        document.getElementsByTagName('head')[0].appendChild(apidebug);
                    }
                } catch (e) {
                    main.console.error('Ошибка (SPACES-API-DEBUGGER): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            setStyle: function() {
                var rev = main.service(1);
                var stl = main.qs("#SP_PLUS_INJSTYLE") || main.ce("style", {
                    id: "SP_PLUS_INJSTYLE",
                    type: "text/css"
                });
                if (!main.qs("#SP_PLUS_MENU")) {
                    var menu = main.qs("#SP_PLUS_MENU") || main.ce("link", {
                        rel: "stylesheet",
                        type: "text/css",
                        id: "SP_PLUS_MENU",
                        href: "https://" + gitPages + "/src/attaches/css/menu.css?r=" + rev
                    });
                    document.getElementsByTagName('head')[0].appendChild(menu);
                }
                if (_SETTINGS.bodystyle) {
                    if (_SETTINGS.bodystyleSetting.url && _SETTINGS.bodystyleSetting.urlchecked) stl.innerHTML = 'body,#main_wrap{background-image:url(' + _SETTINGS.bodystyleSetting.url + ')}';
                    if (_SETTINGS.bodystyleSetting.color && _SETTINGS.bodystyleSetting.colorchecked) stl.innerHTML = 'body,#main_wrap{background-color:' + _SETTINGS.bodystyleSetting.color + '}';
                }
                if (_SETTINGS.msgAlert) {
                    var msg = _SETTINGS.msgAlertSettings;
                    if (msg.alertPosition || msg.animDelay) {
                        var mailBox, mailContainer;
                        switch (msg.alertPosition) {
                            case 1:
                                mailContainer = 'bottom: 0px; right: 0px; top:0px; left:0px; height: 1px; width: 1px;';
                                mailBox = 'margin-bottom: 10px;';
                                break;
                            case 2:
                                mailContainer = 'top: 0px; right: 0px; height: 1px;';
                                mailBox = 'margin-bottom: 10px;';
                                break;
                            case 3:
                                mailContainer = 'bottom: 0px; left: 0px; width: 1px;';
                                mailBox = 'margin-top: 10px;';
                                break;
                            default:
                                mailContainer = 'bottom: 0px; right: 0px;';
                                mailBox = 'margin-top: 10px;';
                                break;
                        }
                        stl.innerHTML += '.mailBox{background:#fff; box-shadow: 0 0 5px rgba(93,109,157,.3); text-decoration:none !important; display:block; width:280px; height:auto; ' + mailBox + ' -webkit-animation: create 0.' + _SETTINGS.msgAlertSettings.animDelay + 's; animation: create 0.' + _SETTINGS.msgAlertSettings.animDelay + 's} .mailContainer {z-index: 99999; position: fixed; ' + mailContainer + ' padding: 10px} .mailBox .data {display: inline-block; position: absolute;} .mailBox .avatar {width: 64px; padding-right: 5px; border-radius:2px; margin-bottom: -3px;} .text>img {display: inline-block;}.text>div.image_limit {width: 28px; display: inline-block;} .mailBox .name {line-height: 20px; font-weight: bold; width: 185px; overflow: hidden;} .mailBox .text {white-space: nowrap; text-overflow: ellipsis; overflow: hidden; color: #323232; width: 195px; font-size: small; height: 44px;} @-webkit-keyframes create {0% {opacity: 0;} 100% {opacity: 1;}} @-webkit-keyframes destroy {0% {opacity: 1;} 100% {opacity: 0;}}}';
                    }
                }
                document.getElementsByTagName('head')[0].appendChild(stl);
            },
            spacesBackup: function(id) {
                window.scrollTo(0, 0);
                var target = main.qs(id);
                if (target) {
                    try {
                        target.innerHTML = "";
                        var textarea;
                        var wrap = main.ce("div", {
                            class: "content-bl"
                        });
                        if (!_SETTINGS.hideNotyf.configImport) {
                            var hideNotyf = main.ce("span", {
                                class: "sp sp-remove-grey pointer right notif_close close_h",
                                style: "margin: 10px",
                                title: "Понятно, больше не показывать.",
                                onclick: function() {
                                    _SETTINGS.hideNotyf.configImport = true;
                                    var jsonSet = JSON.stringify(_SETTINGS);
                                    main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    main.remove(main.qs("#SP_CONFIG_JSON"));
                                }
                            });
                            var smallInfo = main.ce("div", {
                                class: "stnd-block-yellow",
                                style: "padding: 15px;",
                                html: '<span class="sp sp-alert"></span>Внимание!</br></br><div style="font-size: small;">Редактирование только для опытных пользователей, если что-то пошло не так, следует сделать полный сброс настроек.</div>'
                            });
                            var infoDiv = main.ce("div", {
                                id: "SP_CONFIG_JSON"
                            });
                            infoDiv.appendChild(hideNotyf);
                            target.appendChild(infoDiv);
                            infoDiv.appendChild(smallInfo);
                        }
                        var preloader = main.ce("div", {
                            class: "t_center",
                            id: "SP_JSON_PRELOADER",
                            html: "<img src='https://beta.spac.me/i/preloader.gif'>"
                        });
                        target.appendChild(wrap);
                        wrap.appendChild(preloader);
                        var tiw = main.ce("div", {
                            class: "text-input__wrap"
                        });
                        var err = main.ce("div", {
                            id: "JSON_ERROR_BLOCK",
                            class: "stnd-block-yellow",
                            style: "padding: 15px;",
                            html: '<span class="sp sp-alert"></span> Invalid JSON!<br /><br />'
                        });
                        var cl = main.ce("div", {
                            class: "cl"
                        });
                        var btnDiv = main.ce("div", {
                            class: "widgets-group user__tools_last",
                            id: "SP_PLUS_BOTTOM_DIVB"
                        });
                        var delSubm = main.ce("button", {
                            class: "user__tools-link table__cell sp_btn_line",
                            style: "width: 50%; display: inline-block; box-sizing: border-box;",
                            html: '<span class="sp sp-restore-g"></span><span style="color: #3ca93c;">Сбросить</span>',
                            onclick: function() {
                                main.confirmm("Сбросить файл конфигурации?", 0, function() {
                                    main.delCookie("SP_PLUS_SET");
                                    document.location.reload();
                                });
                                return false;
                            }
                        });
                        var chSubm = main.ce("button", {
                            class: "user__tools-link",
                            style: "width: 50%; display: inline-block; box-sizing: border-box;",
                            html: '<span class="sp sp-ok-blue"></span><span style="color: #57A3EA;">Сохранить</span>',
                            onclick: function() {
                                var params = 'value=' + textarea.value;
                                main.ajax("https://crashmax.ru/api/getJSON", "POST", params, function(s, r) {
                                    if (r) {
                                        var _json = {
                                            'result': {
                                                'valid': 0,
                                                'data': "",
                                                'errors': {
                                                    'code': 0,
                                                    'message': "",
                                                    'element': 0
                                                }
                                            }
                                        };
                                        var json = main.extend(_json, JSON.parse(r));
                                        if (json.result.valid == 1) {
                                            main.setCookie("SP_PLUS_SET", textarea.value, null);
                                            document.location.reload();
                                            var jsonerr = main.qs("#JSON_ERROR_BLOCK");
                                            if (jsonerr) main.remove(jsonerr);
                                        } else {
                                            target.appendChild(err);
                                            for (var i = 0; i < json.result.errors.length; i++) {
                                                var error = main.ce("div", {
                                                    style: "padding-left: 30px; font-size: small;",
                                                    html: '<b>Error:</b> ' + json.result.errors[i].message + ' [Code: ' + json.result.errors[i].code + ', Sctructure: ' + json.result.errors[i].element + ']<br />'
                                                });
                                                err.appendChild(error);
                                            }
                                        }
                                    }
                                });
                                return false;
                            }
                        });
                        var params = 'value=' + JSON.stringify(_SETTINGS);
                        main.ajax("https://crashmax.ru/api/getJSON", "POST", params, function(s, r) {
                            if (r) {
                                var _json = {
                                    'result': {
                                        'valid': 0,
                                        'data': "",
                                        'errors': {
                                            'code': 0,
                                            'message': "",
                                            'element': 0
                                        }
                                    }
                                };
                                var json = main.extend(_json, JSON.parse(r));
                                textarea = main.ce("textarea", {
                                    class: "text-input",
                                    id: "SP_BACKUP_JSON",
                                    cols: "17",
                                    rows: "61",
                                    html: json.result.data
                                });
                                if (json.result.valid == 1) {
                                    target.appendChild(wrap);
                                    wrap.appendChild(tiw);
                                    tiw.appendChild(cl);
                                    cl.appendChild(textarea);
                                    var tloader = main.qs("#SP_JSON_PRELOADER");
                                    main.remove(tloader);
                                } else {
                                    target.appendChild(err);
                                    for (var i = 0; i < json.result.errors.length; i++) {
                                        var error = document.createElement('div');
                                        error.style = "padding-left: 30px; font-size: small;";
                                        error.innerHTML = '<b>Error:</b> ' + json.result.errors[i].message + ' [Code: ' + json.result.errors[i].code + ', Sctructure: ' + json.result.errors[i].element + ']<br />';
                                        err.appendChild(error);
                                    }
                                }
                                target.appendChild(wrap);
                                wrap.appendChild(tiw);
                                tiw.appendChild(cl);
                                cl.appendChild(textarea);
                                btnDiv.appendChild(delSubm);
                                btnDiv.appendChild(chSubm);
                                main.inBefore(btnDiv, main.qs("#SP_PLUS_ABOUT"));
                            }
                        });
                    } catch (e) {
                        main.console.error('Ошибка (BACKUP-SETTINGS): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            spacesChangelog: function(id) {
                window.scrollTo(0, 0);
                var target = main.qs(id);
                if (target) {
                    try {
                        target.innerHTML = "";
                        var wrap = main.ce("div", {
                            class: "wbg error__item_wrapper",
                            style: "padding: 5px 15px 5px 16px; display: block;"
                        });
                        var div = main.ce("div", {
                            class: "pad_t_a"
                        });
                        var container = main.ce("div", {
                            class: "js-input_error_wrap"
                        });
                        var preloader = main.ce("div", {
                            class: "t_center",
                            id: "SP_JSON_PRELOADER",
                            html: "<img src='https://beta.spac.me/i/preloader.gif'>"
                        });
                        container.appendChild(div);
                        wrap.appendChild(container);
                        target.appendChild(wrap);
                        wrap.appendChild(preloader);
                        main.ajax("https://" + gitPages + "/updater.json?r=" + main.service(1), "GET", null, function(s, r) {
                            if (r) {
                                var _json = {
                                    'history': {
                                        'build': 0,
                                        'date': "",
                                        'changes': ""
                                    }
                                };
                                var json = main.extend(_json, JSON.parse(r));
                                var tloader = main.qs("#SP_JSON_PRELOADER");
                                main.remove(tloader);
                                for (var i = 0; i < json.history.length; i++) {
                                    var label = main.ce("label", {
                                        class: "label sp_plus_line_c",
                                        html: 'v' + main.rever(json.history[i].build) + '<div class="label__desc">' + json.history[i].date + '</div>'
                                    });
                                    var changes = main.ce("div", {
                                        class: "grey",
                                        style: "font-size: small; margin-left: 3rem;",
                                        html: json.history[i].changes
                                    });
                                    div.appendChild(label);
                                    div.appendChild(changes);
                                }
                            }
                        });
                    } catch (e) {
                        main.console.error('Ошибка (CHANGELOG-ALERT): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            spacesUpdater: function() {
                main.ajax("https://" + gitPages + "/updater.json?r=" + main.service(1), "GET", null, function(s, r) {
                    if (r) {
                        var _json = {
                            'history': {
                                'build': 0,
                                'date': "",
                                'changes': ""
                            }
                        };
                        var json = main.extend(_json, JSON.parse(r));
                        var hideVer = 0;
                        if (_SETTINGS.upVersion) hideVer = parseInt(_SETTINGS.upVersion, 10);
                        VERSION = Math.max(hideVer, VERSION);
                        if (json.history[0].build > VERSION) {
                            main.alert('Доступна новая версия Spaces+ <sup>' + main.rever(json.history[0].build) + '</sup><div class="pad_t_a"></div><small class="grey">' + json.history[0].changes + '</small><div id="SP_UPDATER_BUTTONS" class="pad_t_a"><a class="btn btn_green btn_input" href="https://github.com/spaces-dev/' + gitPages + '/raw/master/spaces-plus.user.js?r=' + main.service(1) + '" onclick="document.body.removeChild(this.parentNode.parentNode.parentNode); return true"> Обновить</a></div>', 1, 1);
                            if (main.qs("#SP_PLUS_ALERT")) {
                                var hide = main.ce("a", {
                                    href: "#",
                                    class: "btn btn_white btn_input right sticker-close_btn",
                                    html: "Больше не показывать",
                                    onclick: function(e) {
                                        _SETTINGS.upVersion = parseInt(json.history[0].build);
                                        var jsonSet = JSON.stringify(_SETTINGS);
                                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                                        document.body.removeChild(e.target.parentNode.parentNode.parentNode);
                                        return false;
                                    }
                                });
                                main.qs("#SP_UPDATER_BUTTONS").appendChild(hide);
                            }
                        }
                    }
                }, 4);
            },
            msgAlertSettings: function(e) {
                var masWarp = main.ce("div", {
                    id: "SP_PLUS_MSGALERTSETTINGS",
                    style: "padding: 11px 15px;"
                });
                var mAlert = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    size: 4,
                    attr: {
                        maxlength: 1
                    },
                    value: _SETTINGS.msgAlertSettings.maxAlert
                });
                mAlert.onchange = mAlert.oninput = function(e) {
                    if (/^[1-5]{1}$/i.test(e.target.value)) {
                        _SETTINGS.msgAlertSettings.maxAlert = parseInt(e.target.value);
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                        main.setStyle();
                        mAlert.className = "text-input";
                    } else {
                        mAlert.className = "text-input sp-input-error";
                    }
                };
                var alertPos = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    size: 4,
                    attr: {
                        maxlength: 1
                    },
                    value: _SETTINGS.msgAlertSettings.alertPosition
                });
                alertPos.onchange = alertPos.oninput = function(e) {
                    if (/^[1-4]{1}$/i.test(e.target.value)) {
                        _SETTINGS.msgAlertSettings.alertPosition = parseInt(e.target.value);
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                        main.setStyle();
                        alertPos.className = "text-input";
                    } else {
                        alertPos.className = "text-input sp-input-error";
                    }
                };
                var alertPositionLbl = main.ce("label", {
                    html: 'Расположение на экране:<div class="label__desc">от 1 до 4</div>',
                    class: "label"
                });
                var mAlertLbl = main.ce("label", {
                    html: 'Максимум сообщений на экране:<div class="label__desc">от 1 до 5</div>',
                    class: "label"
                });
                var alertTime = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    size: 4,
                    attr: {
                        maxlength: 1
                    },
                    value: _SETTINGS.msgAlertSettings.alertDelay
                });
                alertTime.onchange = alertTime.oninput = function(e) {
                    if (/^[0-5]{1}$/i.test(e.target.value)) {
                        _SETTINGS.msgAlertSettings.alertDelay = parseInt(e.target.value);
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                        main.setStyle();
                        alertTime.className = "text-input";
                    } else {
                        alertTime.className = "text-input sp-input-error";
                    }
                };
                var alertTimeLbl = main.ce("label", {
                    html: 'Время отображения сообщения (0 - бесконечно):<div class="label__desc">от 0 до 5</div>',
                    class: "label"
                });
                var animTime = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    size: 4,
                    attr: {
                        maxlength: 1
                    },
                    value: _SETTINGS.msgAlertSettings.animDelay
                });
                animTime.onchange = animTime.oninput = function(e) {
                    if (/^[1-9]{1}$/i.test(e.target.value)) {
                        _SETTINGS.msgAlertSettings.animDelay = parseInt(e.target.value);
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                        main.setStyle();
                        animTime.className = "text-input";
                    } else {
                        animTime.className = "text-input sp-input-error";
                    }
                };
                var animTimeLbl = main.ce("label", {
                    html: 'Время появления и исчезания сообщения:<div class="label__desc">от 1 до 9</div>',
                    class: "label"
                });
                masWarp.appendChild(mAlertLbl);
                masWarp.appendChild(mAlert);
                masWarp.appendChild(alertPositionLbl);
                masWarp.appendChild(alertPos);
                masWarp.appendChild(animTimeLbl);
                masWarp.appendChild(animTime);
                masWarp.appendChild(alertTimeLbl);
                masWarp.appendChild(alertTime);
                main.insertAfter(masWarp, e.parentNode);
            },
            msgAlert: function(data) {
                if (data.act == 1) {
                    params = 'Contact=' + data.data.contact.nid + '&MeSsages=' + data.data.nid + '&Pag=0&_origin=' + encodeURI(_PROTOCOL + '//' + _DOMAIN) + '&method=getMessagesByIds';
                    main.ajax(_PROTOCOL + '//' + _DOMAIN + '/neoapi/mail', 'POST', params, function(s, res) {
                        if (window.location.href.indexOf(_PROTOCOL + '//' + _DOMAIN + '/mail/message_list/?Contact=' + data.data.contact.nid) != -1) {
                            return false;
                        }
                        res = JSON.parse(res);
                        var name;
                        var avatar;
                        var messageKey = Object.keys(res.messages)[0];
                        if (data.data.contact.user != undefined) {
                            if (res.messages[messageKey].contact.avatar == null) {
                                main.jajax(_PROTOCOL + '//' + _DOMAIN + '/mysite/index/' + data.data.contact.user + '/', function(j) {
                                    j = JSON.parse(j);
                                    avatar = j.owner_widget.photo_widget.previewURL;
                                });
                            } else {
                                avatar = res.messages[messageKey].contact.avatar.previewURL;
                            }
                            name = data.data.contact.user;
                        } else {
                            if (res.messages[messageKey].subject) {
                                avatar = "https://" + gitPages + "/src/attaches/ico/email.png";
                                name = res.messages[messageKey].contact.name;
                            } else {
                                avatar = "https://" + gitPages + "/src/attaches/ico/groups_chat.png";
                                name = res.messages[messageKey].contact.widget.siteLink.user_name + ' [' + res.messages[messageKey].contact.name + ']';
                            }
                        }
                        var check = setInterval(function() {
                            if (avatar != undefined) {
                                clearInterval(check);
                                var div = main.ce("div", {
                                    class: "mailContainer"
                                });
                                if (document.getElementsByClassName('mailContainer')[0]) {
                                    div = document.getElementsByClassName('mailContainer')[0];
                                } else {
                                    document.body.appendChild(div);
                                }
                                var del;
                                var isClosed = false;
                                var animDelay = _SETTINGS.msgAlertSettings.animDelay * 1000;
                                var alertDelay = _SETTINGS.msgAlertSettings.alertDelay * 1000;
                                var maxAlert = _SETTINGS.msgAlertSettings.maxAlert;
                                var a = main.ce("a", {
                                    class: "mailBox",
                                    href: "#",
                                    id: data.data.nid,
                                    onclick: function() {
                                        if (!isClosed) {
                                            main.setLocation(_PROTOCOL + '//' + _DOMAIN + '/mail/message_list/?Contact=' + data.data.contact.nid);
                                            div.removeChild(a);
                                            isClosed = true;
                                            return false;
                                        }
                                    }
                                });
                                var gDiv = main.ce("div", {
                                    class: "data"
                                });
                                var nameDiv = main.ce("div", {
                                    class: "name",
                                    html: name
                                });
                                var textDiv = main.ce("div", {
                                    class: "text",
                                    html: res.messages[messageKey].text
                                });
                                var img = main.ce("img", {
                                    class: "avatar",
                                    src: avatar
                                });
                                var hide = main.ce("span", {
                                    class: "sp sp-remove-grey pointer right notif_close close_h",
                                    style: "margin: 5px",
                                    onclick: function() {
                                        if (!isClosed) {
                                            clearTimeout(del);
                                            div.removeChild(a);
                                            isClosed = true;
                                        }
                                    }
                                });
                                if (document.querySelectorAll('.mailContainer a').length > maxAlert - 1) {
                                    div.removeChild(div.firstChild);
                                }
                                gDiv.appendChild(nameDiv);
                                gDiv.appendChild(textDiv);
                                a.appendChild(hide);
                                a.appendChild(img);
                                a.appendChild(gDiv);
                                div.appendChild(a);
                                if (alertDelay != 0) {
                                    del = setTimeout(function() {
                                        if (document.getElementById(a.id)) {
                                            isClosed = true;
                                            a.style = 'animation: destroy ' + animDelay / 1000 + 's;';
                                            setTimeout(function() {
                                                div.removeChild(a);
                                            }, animDelay);
                                        }
                                    }, alertDelay);
                                }
                            }
                        }, 500);
                    }, 4, true);
                }
            },
            preloadModifer: function() {
                var isFirefox = false;
                var w = window;
                if (typeof(unsafeWindow) != "undefined" && unsafeWindow.Device.browser == 'firefox' && unsafeWindow.Device.type == "desktop") {
                    w = unsafeWindow;
                    isFirefox = true;
                }
                if (_SETTINGS.msgAlert) {
                    var start = setInterval(function() {
                        if (typeof(w.pushstream._keepConnected) == "boolean" && w.pushstream._keepConnected) {
                            clearInterval(start);
                            var proxy = new Proxy(w.Spaces.PushStream.prototype._onmessage, {
                                apply: function(target, targetArgs, args) {
                                    main.msgAlert(args[0]);
                                }
                            });
                            if (isFirefox) {
                                exportFunction(proxy, w.Spaces.PushStream.prototype, {
                                    defineAs: "_onmessage"
                                });
                            } else {
                                w.Spaces.PushStream.prototype._onmessage = proxy;
                            }
                        }
                    }, 500);
                }
            },
            spacesButton: function() {
                var button = main.qs("#SP_SETTINGS_BUTTON");
                var target = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/services/?"
                });
                var disableIcons = main.find(document.getElementsByTagName('span'), {
                    className: "s_i s_i_exit"
                });
                if (target && !button) {
                    var setLink = main.ce("li", {
                        class: "li",
                        id: "SP_SETTINGS_BUTTON",
                        html: '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/settings/?sp_plus_settings=1" title="Настройки Spaces+">' + (disableIcons ? '<span class="sp sp-ico"></span>' : '') + '<span class="m s_i_text"> Spaces+</span></a>'
                    });
                    target = target[0].parentNode;
                    main.insertAfter(setLink, target);
                    if (target.nextElementSibling.nodeName == "BR") {
                        main.insertAfter(main.ce("br", null), setLink);
                    }
                }
            },
            nonRedirect: function() {
                var urls = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/redirect/?"
                });
                try {
                    if (urls) {
                        for (var i = 0; i < urls.length; i++) {
                            urls[i].setAttribute("href", main.getParams(urls[i])['redirect']);
                        }
                    }
                } catch (e) {
                    main.console.error('Ошибка (NON-REDIRECT): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            freeStickers: function() {
                var script = main.qs("#SP_PLUS_STICKERS");
                try {
                    if (!script) {
                        var s = main.ce("script", {
                            type: "text/javascript",
                            id: "SP_PLUS_STICKERS",
                            html: 'var open=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,o,t){var n=open.apply(this,arguments);return-1==o.indexOf("mail/sendMessage")&&-1==o.indexOf("diary/new")&&-1==o.indexOf("comments/add")||this.setRequestHeader("X-Proxy","spaces"),n};'
                        });
                        document.getElementsByTagName('head')[0].appendChild(s);
                    }
                } catch (e) {
                    main.console.error('Ошибка (FREE-STICKERS): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            spacesAPI: function(method, params, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", _PROTOCOL + "//" + _DOMAIN + "/api/" + method, true);
                if (params) {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send(params);
                } else {
                    xhr.send(null);
                }
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            callback(xhr.status, xhr.response);
                        }
                    } else {
                        return null;
                    }
                };
            },
            userStatus: function(code) {
                try {
                    var notAuthorized = main.ce('div', {
                        html: 'Для работы <b>Spaces+</b> необходима авторизация!'
                    });
                    if ((Device.id == 3 || Device.id == 4) && code == '01001') {
                        var message = main.ce('div', {
                            class: 'oh nl system-message',
                            style: 'border: 1px solid #ff9a95;background: #fdf3ef'
                        });
                        message.prepend(notAuthorized);
                        main.qs('#top_info_block').prepend(message);
                    } else if (Device.id == 1 || Device.id == 2) {
                        var unSupported = main.ce('div', {
                            class: 'oh busi',
                            style: 'border: 1px solid #ff9a95;background: #fdf3ef',
                            html: 'Используемая версия сайта не поддерживается для работы <b>Spaces+</b>'
                        });
                        if (code == '01001') unSupported.prepend(notAuthorized);
                        main.qs('#main_wrap').prepend(unSupported);
                        return false;
                    } else {
                        return true;
                    }
                } catch (e) {
                    main.console.error('Ошибка (USER-STATUS): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            easyBeta: function() {
                var progress_label = main.find(document.getElementsByTagName('div'), {
                    className: 'progress-item__label'
                });
                var progress_runner = main.find(document.getElementsByTagName('div'), {
                    className: 'progress-item__runner'
                });
                if (progress_label && progress_runner) {
                    var item = progress_label[0].textContent.split('/');
                    var summ = Math.round(Number(item[0]) / Number(item[1]) * 100);
                    if (summ > 30) {
                        progress_label[0].style = 'color: #f5f5f5';
                    }
                    progress_runner[0].style = 'width: ' + summ + '%';
                }
            },
            weatherSettings: function(e) {
                if (_SETTINGS.hrightbar) {
                    alert("Отключите пункт настроект «‎Скрыть правое меню» для работы виджета!");
                }

                if (_SETTINGS.weatherSettings.city == null) {
                    main.ajax("https://ipwhois.app/json/", "GET", null, function(s, r) {
                        var json = JSON.parse(r);

                        _SETTINGS.weatherSettings.city = json.city;
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                        main.getWeather();
                    })
                }

                var masWarp = main.ce("div", {
                    id: "SP_WEATHER_SETTINGS",
                    style: "padding: 11px 15px"
                });
                var apiKey = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    style: "margin-bottom: 7px",
                    size: "32",
                    id: "key-input",
                    value: _SETTINGS.weatherSettings.key
                });
                var locationLbl = main.ce("label", {
                    html: 'API-Ключ:<div class="label__desc"><a href="https://openweathermap.org/appid" target="_blank">Получить ключ</a></div>',
                    class: "label"
                });
                apiKey.onchange = apiKey.input = function(e) {
                    if (/^[a-f0-9]{32}$/i.test(e.target.value) || main.trim(e.target.value) == "") {
                        main.getWeather(null, e.target.value);
                        apiKey.className = "text-input";
                    } else {
                        apiKey.className = "text-input sp-input-error";
                    }
                };
                var cityLbl = main.ce("label", {
                    html: 'Город:',
                    class: "label"
                });
                var cityInp = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    style: "margin-bottom: 7px",
                    size: "32",
                    id: "city-input",
                    value: _SETTINGS.weatherSettings.city
                });
                cityInp.onchange = cityInp.input = function(e) {
                    if (/^([a-zA-Zа-яА-ЯёЁ]+[-]?[a-zA-Zа-яА-ЯёЁ]*[-]?[a-zA-Zа-яА-ЯёЁ]*[-]?[a-zA-Zа-яА-ЯёЁ]*)$/i.test(e.target.value) || main.trim(e.target.value) == "") {
                        main.getWeather(e.target.value, null);
                        cityInp.className = "text-input";
                    } else {
                        cityInp.className = "text-input sp-input-error";
                    }
                };

                masWarp.appendChild(cityLbl);
                masWarp.appendChild(cityInp);
                masWarp.appendChild(locationLbl);
                masWarp.appendChild(apiKey);
                main.insertAfter(masWarp, e.parentNode);
            },
            getWeather: function(city, key) {
                var w = _SETTINGS.weatherSettings;

                try {
                    var url = `https://api.openweathermap.org/data/2.5/weather?lang=${w.language}&units=${w.units}&q=${city == null ? w.city : city}&appid=${key == null ? w.key : key}`;
                    main.ajax(url, "GET", null, function(s, r) {
                        var json = JSON.parse(r);
                        if (json.cod == 200) {
                            document.getElementById("key-input").value = key == null ? w.key : key;
                            document.getElementById("city-input").value = json.name;
                            _SETTINGS.weatherSettings.time = main.unixTime();
                            _SETTINGS.weatherSettings.city = json.name;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            var jsonSet2 = JSON.stringify(json);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.setCookie("SP_WEATHER", jsonSet2, null);
                            var wd = main.qs("#SP_WIDGET_WEATHER");
                            wd.remove();
                        } else {
                            alert(json.message);
                        }
                    })
                } catch (e) {
                    main.console.error('Ошибка (GET-WEATHER): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            weatherWidget: function() {
                var widget = main.qs("#SP_WIDGET_WEATHER");
                var page_rightbar = main.qs("#page_rightbar");

                if (main.unixTime() - _SETTINGS.weatherSettings.time > _SETTINGS.weatherWidget.interval && _SETTINGS.weatherSettings.city != null) {
                    main.getWeather();
                }

                try {
                    if (!widget && page_rightbar) {
                        w = JSON.parse(main.getCookie("SP_WEATHER"));
                        var widgets_group = main.ce("div", {
                            class: "widgets-group_top js-container__block",
                            style: "box-shadow: 0px 3px 5px rgba(93,109,157,0.3)",
                            id: "SP_WIDGET_WEATHER"
                        });
                        var widget_header = main.ce("div", {
                            class: "b-title cl b-title_first oh",
                            html: '<a href="https://openweathermap.org/city/' + w.id + '" target="_blank" class="b-title__link"><h6 class="span">Погода в г. ' + w.name + '</h6></span></a>'
                        });
                        var content = main.ce("div", {
                            class: "content",
                            style: "padding: 0px 16px 16px 16px",
                            html: '<img src="https://openweathermap.org/img/wn/' + w.weather[0].icon + '@2x.png" style="display: block; margin-left: auto; margin-right: auto"><div class="grey" style="text-align: center; font-size: 18px"><p>' + Math.round(w.main.temp, 2) + '°C</p><p>' + main.toUpper(w.weather[0].description) + '</p></div><table style="padding-top: 12px" class="grey"><tbody><tr><td>Облачность: </td><td>' + w.clouds.all + '%</td></tr><tr><td>Влажность: </td><td>' + w.main.humidity + '%</td></tr><tr><td>Давление: </td><td>' + Math.round(w.main.pressure * 0.75, 1) + 'mmHg</td></tr><tr><td>Ветер: </td><td>' + w.wind.speed + 'm/sec</td></tr></tbody></table>'
                        });

                        widgets_group.appendChild(widget_header);
                        widgets_group.appendChild(content);
                        page_rightbar.appendChild(widgets_group);
                    }
                } catch (e) {
                    main.console.error('Ошибка (WEATHER-WIDGET): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            start: function() {
                if (_SETTINGS.weatherWidget) main.weatherWidget();
                if (_SETTINGS.hrightbar) main.hiddenRightbar();
                if (_SETTINGS.comments) main.commentsDelete();
                if (_SETTINGS.readersd) main.readersDelete();
                if (_SETTINGS.playback) main.videoPlayback();
                if (_SETTINGS.nredirect) main.nonRedirect();
                if (_SETTINGS.apidebug) main.apiDebugger();
                if (_SETTINGS.myEvents) main.soundEvents();
                if (_SETTINGS.favorite) main.favoriteAdd();
                if (_SETTINGS.sticker) main.freeStickers();
                if (_SETTINGS.blocked) main.bannedTools();
                if (_SETTINGS.online) main.onlineWidget();
                if (_SETTINGS.blogsd) main.blogsDelete();
                if (_SETTINGS.rotate) main.rotateMedia();
                if (_SETTINGS.rscroll) main.scrollMove();
                if (_SETTINGS.karma) main.karmaAccept();
                if (_SETTINGS.coins) main.coinsAccept();
                if (_SETTINGS.ads) main.adsRemove();
                if (_SETTINGS.friendsOn) main.friendsOnline(1);
                if (_SETTINGS.playerdn) {
                    main.playerDown();
                } else if (!_SETTINGS.playerdn && playerId >= 0) {
                    playerId = -1;
                    var downPlace = main.qs("#SP_MUSIC_DOWN");
                    if (downPlace) {
                        main.remove(downPlace);
                    }
                }
                if (BETA) main.easyBeta();
                main.spacesButton();
                main.settings();
            },
            init: function() {
                if (_SETTINGS.fixes) main.tinyFix();
                main.spacesUpdater();
                main.readSettings();
                main.setStyle();
                main.start();
                var w = setInterval(function() {
                    if (Device != undefined) {
                        clearInterval(w);
                        main.preloadModifer();
                    }
                }, 500);
                setInterval(function() {
                    main.start();
                }, 200);
            }
        };
        if (main.qs("#main_wrap")) {
            main.spacesAPI("session/check", null, function(s, r) {
                r = JSON.parse(r);
                if (s == 200 && main.userStatus(r.code)) main.init();
            });
        }
    }
    spacesPlus();
})();