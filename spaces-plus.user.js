// ==UserScript==
// @name            Spaces+
// @namespace       https://github.com/spaces-dev/SpacesPlus
// @description     The script is designed to extend the functionality Spaces.ru
// @author          Creator: Maximoff, Updated: crashmax & molimawka
// @icon            https://spaces-dev.github.io/favicon.png
// @include         /^(http|https):\/\/(spaces\.ru|spac\.me|spcs\.me|spaces\.im|gdespaces\.com).*$/
// @match           *://(spaces.ru|spac.me|spcs.me|spaces.im|gdespaces.com)/*
// @version         2.1.7
// @grant           none
// @require         https://spaces-dev.github.io/colorpicker.js
// @downloadURL     https://spaces-dev.github.io/spaces-plus.user.js
// @updateURL       https://spaces-dev.github.io/spaces-plus.meta.js
// ==/UserScript==

(function() {
    function spacesPlus() {
        var _PROTOCOL = document.location.protocol.toString();
        var _DOMAIN = document.location.hostname.toString();
        var VERSION = 20;
        var BUILD = 217;
        var onlineLock = null;
        var favLock = null;
        var favRLock = null;
        var banLock = null;
        var eventsCounter = 0;
        var countFriends = 0;
        var commentsLength = 0;
        var friendsForce = 0;
        var playerId = -1;
        var _X77hgg = 1;
        var reCount = 0;
        var gitPages = "spaces-dev.github.io";
        var ICON48 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMEElEQVR42sVaCVRURxaNiWSfSXJOEo1RR4MZFzIqETegQQzRMZyZMRIVohgFFUWQHUGa7qYBUXFBFAwuQBABEUT2rbsBh01FHYk5xi1KHBfimjBGhK7cqfq90E3/bjSSpM+5h8/v+lX3vnrv1av6/cwzT/sB+s3NyXluQnKzGfvbW3O9tvTZZ/6wj0Ty7DRJdX++r+j9VwUxR96xi6odzsCu2T0jbfuzvv5Q4rZi2V/tI2uWTIus/lIQqaixF8svCMTyNnuJ4h4Dd83u0e9YG9aWPfO7C2FTr2tlSsTNTqKooCTbKfCEaOeepX3MiKt4hW+Mvvuo/VxzPU1avcJOLD+nS8hOrPhFIJaRxwFrq/+s/BzrUxMT3Gz0VXzoBqaDVDHZLlLRpB1YoiDUNbq4v084A3zPCiLlTWwMvrGfmjy1kJ99pEKpHVwiU/4KtzECmVIrhI4hkMj9nlqE7oP2YkWSdjBmtR4u0Bfg+qR9a/63FVV++etF6GQD2tl+jdWZ//Y18Z7gYkQ9GwJRZSal0O/JROgEDw2unT075cP02FpMi+Jmxyixj8UKzIttwKfRdZgm6j0+NMayDS9L1oh4rMDW5Hi7SJmvpjNe8pTs9PW1WFl1HSEnHiCg4Ue45Zzn7tnpCqHXn0UeQVrKbZRkdqFwXwd27LqGL2KPYpoJwapxa2jGksE6vChAl1uveZ4uPJM0AWvcbaqwvPIG1pwhegg59RBuuRfguLGOtpHDQViJxO3XULKP6KF0fxd27WqDe2wzHE24EycmolI5NeCgtel1QsfvqQWbNAHLS55abta2Bvj/5xGCviYGCKYIaP4ZbocuwyPuOPJTOlCcTnhRlN6FlD23sCT2GBzEPG6o5mATVnKMUnu2J1dD1xHJPLVTaCTbUIvArbgV/i3EJAJbuvDd1VycbaxDZfZPKEojRlG8T4mMvfexIvYkHHWEMA6cK4mqMDUo15vfldSKJkiKXqY+d06Tm41Z/6PNR+B9qhM+p4lJ7Pj2IpR314NQ/O9aIi42V6Ai80cUpipRmEL4kdaF1N334LOhBR+Ju9cJLqDXFp0fsUDyZ4NZ0CiyDS93616ojAQXtb7L4StYeYoYxYqTSiypvImshjzUn9jO4XorExKJn29sQktNPQ7vJaaRosSunTfhGFGlDmrVLEzyzfLQnwWd1CSIqKzozfenb6yBe+PPWHaSGIVr8U3MXFcNt6hCLKL4NLoMqeV78eiWCOSOEJ0/SKDIbUX+bmIShyi8JEdV7qTmNDUkX6aNBcZds0BMDs59nzZqNzUDVCDm5F3GkhPEJJzzr2KZOB+nw6PxrVCKaNE+rN6Ti/YbYSC3gzmcrS9BXjLpFYFhx7lZ5zhFVkMQXtY+btkWC+3ipklLNmHFHtol3Yj17dcpsLCpA27HiUm4Hr6AleI8XBGK0RYejv0RiVi9Owft1wNBbvlyOCWX4+BOYhLZOzqwYHUJJ0BVJ1X/wtxoovdXXtqUqpkBm7Ulu03lfTtRJZyyL8DlGDHA/KYuzKvv4OBS/xCiknIeAdlou+yPe9+vxs2LYcjedZcSVOLADmIUCdLLsPfP1WYkVSkuxyT/rDS2OuuWF/3okv1vkwsXtf6c2gf4rInowbmhiwq7AsctTZhJMWtrA9y2FWIVFdAaLuIEZFEBzhtK4Lkjl4N7fDHmRx9H9KYbyE4gvNi39SGWepfTzFNqsLBNDcproJy7U6mFV+KrdqKKC8YEsGlzTDuDfzUQAziV3cXH62ohpX5eEJGghVy4CTeEQk4AiwXd7xhWiA/Bc91ZZMYTXmwWXYaDby4dW2YgwCa04NJQp5VvaAWMW7HzXbuIqpvGBAgiZZgl/wmf1BMDzCy9g9lRVTgTHsWRfVxEiTLgGXMWGVuIAdI3dWKZTxUEYSW8pYVNaFHbKJfQYd010PJkczuJ/C6fAM4Ce7/GjDrCC8fiO/gkSo70iCQURWzTQqEzAy3CaL3vGMJEWVgefRbpccQAWyJa4eCTw808nwDb8JJ7f3OVjNIKGL942/vGBAikVAB1E4cjhB+VD2Cf1AKnzQosTcjCsoRMLI4/AG9xrl4MzNlQiIUbS+EsbeQwJ7IRvtGXkLaB6CElthMrvCnJsGKjxR0TMMZ5jUV3DCxaP5TugNp6CmDWt911GoIaJQUxDkUnko6n4t6ljznkVwUYZCGvpAxkJH2DnTEdWuyiZFNiiR7iI9ow0ztPz/cNXCis6IcRs33MtQKG2n7+hiCi3CCIbUUVmFp6H1OqiUk41LTj2nf/ALk6kUOBbJWBgEUbZUhe9xB7oolR7I5WwtuL7ifWFJksr61D8i8NGDvjbd1y7gU6ZXV6Ami+tYlvhJVCSUFMIuZYDsj3Y7UokHkaCJgnPY4kaSd2S4lRxIffwQyvg90LlxEBU/yzmyjnl3ULuf7WwXmpPTYRGJd4AuNlBOPlppF+MgakdZQWBVUe+EJcwAVynXADgkXZmC85iURJJ5IlhBdfirvgt7IBtmsKjW5NNQvZxFWpGZSzGcddXUr0s/JK8dbW3wxUgIW0FBZlHfigipiEsDEb5MpwLY42OGHB5ix8vj4XrrF5+GekHH7iViSJldgpIryIC7mFWSvyjFqfK3FoKcHqsXFumwIZZ71SYoxzqKVAVPmjzqETJgbl4i9xCrx/6A5GVigxspLwYlzVA5z+9u+U/LsclFcG4+rXlmhtmYBTtS7YLG1DvPARkoSEF4lCJXxXHoVdSIFR61PLc8UcDeCfRjgunaLyHkl/3XL6VeuQQwrdclogrMCEgCy8F7QfQ+LrMTz3NszLlRhRQQzgqDiHmjPO6PxuIMjlt9V4C5WpB7BjLTGJuOD7cPLMNWp9XU4TV++rpVxf09sKaOLA0n2bD/MxjRtpygib0EJ86Lcf7/l9hXe31mFIdhuGlXRiWBnRw4jyDnxa3YDS0wvQfvEd/LdxNBLC7mJ7KMH2MH4khCrh59kM2+DDpqyvdp8KfOAaxdynv/62Ur09e2mQ+RDr0KLzBltKJooTUgRL3wyY+6ZhYFwNBh34AYNLujCEktfFcBo3TqUVWLQ2EAtc8yH0PIctQR1IWEMMEBfYjtmehaatr+YyJSDnwosDhw3j3dirFb041n3LWnYWw9XePHsDJoStkhP8s2C+OhUDoqswIOM6BhV1YlAJUaG4C4Pij2FS0EHYBOZhmkca5rscROiyb7Ap4AHig5WID6ElQ9AjrHanO66AfBPWV3Rb3yVGzDjynw91K3pnSlBes8mtpY4Qq4Bsbkbekpbjzb0X8Vb6Vby58QjGBGZxMcSICYTlsA7Kgz0VMm/+AfgubEDIktPwcCmDw/JM7vvefT/9JOU2WHVYOvc5U6dyL5jPWDnbJrz0kcnTCd1yg9bskwNzMNo7FSO99uBD/0xVHd/jhI4Jsgk5DNtV+yFYng5r/4Mq8kZP6OjYNPNYhxY8Gjp98VzGjRaeZo9ztPj62EXrY1jOVbmSvPdDXRYntD0jyVfH6MeTTFVpmjpaVKXNX5hAC1fpBsap16PF7p0+N0WDLJcm7ecGimRnlPLf/GRan3wN4RatxfHZjAvH6bHf2qjigU3VcCvP5EL1TKBvX2ooTLoNG/NDj8RiyuE9josxv+/lBccLFOaW7gmZnK8yEdwLDvlv8IJDrnrBwcjTscYt3sosP4JxUK24v+KjfpCJGGbhKtlgG1rYoTne6CshOsS5vmzWFHSMmS/ayMZ8KvJ67mRh8TzzwyG2C10n+aQ1a9NetxDyJK+dVCu9nOgSZ32yvgfbfL6A83k25pO6janAtpgrYSLYScDo0fOE0sl+2ed1hHAQUFK9v2ZVFWWqmFIRZ32NnhcexWpKNgY31m/xMwR1DmYuNdDs5dctx8wJXmvltbvWes3h+4wIt4JrLK0hqUNWZX0Z2KpKc/t9K689tawP1hfr87HyfF/MhnqQlygGUIwcON7ByeKz0AhLj4RsK++vmljNMjXk0A1K8jYDu54SmHPByju9ibVhbdkz9NlR6j5e4vr8g34zwcT8WU2EBd5os9fenPD6MEv7tz+wm8HArtk99p26zQD1M2a//489eGaEZQoLSc7z6jjRzA77/cOf1HhFfc+MtWE7KS679IGf/x9lFv30I5KrAgAAAABJRU5ErkJggg==";
        var _SETTINGS = {
            'comments': false,
            'blogsd': false,
            'readersd': false,
            'favorite': true,
            'blocked': true,
            'rscroll': false,
            'hrightbar': false,
            'playerdn': true,
            'coins': true,
            'karma': true,
            'darkMode': false,
            'darkModeNav': false,
            'online': true,
            'ads': true,
            'myEvents': true,
            'friendsOn': true,
            'sticker': true,
            'fixes': true,
            'bodystyle': true,
            'upVersion': null,
            'bodystyleSetting': {
                "url": "https://" + gitPages + "/src/backgrounds/default.jpg",
                "color": '#DAE1E8',
                "urlchecked": true,
                "colorchecked": false
            },
            'events': {
                'url': "https://" + gitPages + "/src/sounds/default.ogg",
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
            'msgAlert': true,
            'msgAlertSettings': {
                "alertPosition": 4,
                "maxAlert": 3,
                "animDelay": 3,
                "alertDelay": 3
            }
        };
        var _SETSTRINGS = {
            'comments': "Пакетное удаление комментариев",
            'blogsd': "Пакетное удаление блогов",
            'readersd': "Пакетное удаление читателей",
            'darkMode': "Темная тема",
            'friendsOn': "Панель друзей онлайн",
            'myEvents': "Звук уведомлений",
            'online': "Точное время онлайн в анкетах",
            'ads': "Скрывать рекламу",
            'favorite': "Возможность добавить пользователя в закладки",
            'playerdn': "Кнопка загрузки трека из плеера",
            'rscroll': "Прокрутка страницы справа",
            'hrightbar': "Скрыть правое меню",
            'blocked': "Открытые разделы удаленных пользователей",
            'coins': "Собирать бонусные монеты",
            'karma': "Собирать карму",
            'bodystyle': "Фон сайта",
            'msgAlert': "Уведомления почты",
            'sticker': "Бесплатные стикеры",
            'fixes': "Незначительные исправления"
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
                                callback(xhr.responseText);
                            }
                        } else {
                            return false;
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
                            main.console.error('Ошибка (NEWBEE_JSON): ' + e.name + ":" + e.message + "\n" + e.stack);
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
                                    var rVer = main.rever(VERSION);
                                    if (prnt.id == "main") {
                                        var hp = main.qs("#header_path");
                                        if (hp) {
                                            hp.innerHTML = hp.innerHTML.replace("Настройки", '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/settings/" style="margin-bottom: 1px;">Настройки</a><span class="location-bar__sep ico"></span><span id="SP_PLUS_SETHEAD2">Spaces+</span>');
                                        }
                                        prnt.innerHTML = '<div class="widgets-group widgets-group_top js-container__block"><div class="b-title cl b-title_center b-title_first oh"><div class="b-title__item">Настройки Spaces+<span class="js-cnt cnt cnt_title hide"></span></div></div><div class="content"><div class="list f-c_fll"> <div id="SP_PLUS_SETAREA"></div></div></div></div> <div id="SP_PLUS_ABOUT"></div> <a id="SP_PLUS_SETBACK" href="http://' + _DOMAIN + '/settings/?" class="link-return full_link"><span class="ico ico_arrow-back" style="margin: 0px 6px -1px 0px;"></span><span class="m">Назад</span></a>';
                                    } else if (prnt.className == "main") {
                                        prnt.innerHTML = prnt.firstElementChild.outerHTML.replace("Настройки", 'Настройки <span style="color: #0000FF;">Spaces+</span>') + '<div class="start_page_padd light_blue_bg"><b id="SP_PLUS_SETHEAD">Настройки <span style="color: #0000FF;">Spaces+ ' + rVer + '</span></b></div><div id="SP_PLUS_SETAREA"></div><a id="SP_PLUS_SETBACK" href="http://' + _DOMAIN + '/settings/?" class="link-return full_link"><span class="ico ico_arrow-back" style="margin: 0px 6px -1px 0px;"></span><span class="m">Назад</span></a>';
                                    }
                                    var setArea = main.qs("#SP_PLUS_SETAREA");
                                    if (setArea) {
                                        for (var i in _SETTINGS) {
                                            if (typeof _SETSTRINGS[i] != "undefined") {
                                                var tmpCkb = main.ce("input", {
                                                    id: "sp_set_" + i,
                                                    type: "checkbox",
                                                    class: "sp_plus_checkbox_el",
                                                    checked: _SETTINGS[i],
                                                    onclick: function(e) {
                                                        var id = e.target.id.split("_")[2];
                                                        _SETTINGS[id] = e.target.checked;
                                                        var jsonSet = JSON.stringify(_SETTINGS);
                                                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                                                        if (e.target.id == "sp_set_rscroll") {
                                                            main.scrollMove(e.target.checked);
                                                        } else if (e.target.id == "sp_set_darkMode") {
                                                            main.darkMode(e.target.checked);
                                                            if (e.target.checked) {
                                                                main.darkModeNav(e.target);
                                                            } else {
                                                                var dmWrap = main.qs("#SP_DARKMODE_WRAP");
                                                                if (dmWrap) {
                                                                    main.remove(dmWrap);
                                                                }
                                                            }
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
                                                                var eventAlert = main.qs("#SP_PLUS_ALERT");
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
                                                            main.comments(e.target.checked);
                                                        } else if (e.target.id == "sp_set_msgAlert") {
                                                            if (e.target.checked) {
                                                                main.msgAlertSettings(e.target);
                                                            } else {
                                                                var msgAS = main.qs("#SP_PLUS_MSGALERTSETTINGS");
                                                                if (msgAS) {
                                                                    main.remove(msgAS);
                                                                }
                                                            }
                                                        } else if (e.target.id == "sp_set_sticker") {
                                                            main.freeSticker(e.target.checked);
                                                        } else if (e.target.id == "sp_set_fixes") {
                                                            if (e.target.checked) {
                                                                main.allFixes();
                                                                main.alert("Незначительные исправления<div class='pad_t_a'></div><small class='pad_t_a grey'>Данная функция необходима для исправления неудачных обновлений сайта.<div class='pad_t_a'></div>Исправлено: <ul><li>Кнопка почты/ленты в шапке</li></ul></div>", 1, 1);
                                                            } else {
                                                                var eventAlert = main.qs("#SP_PLUS_ALERT");
                                                                if (eventAlert) {
                                                                    main.remove(eventAlert);
                                                                }
                                                                document.location.reload();
                                                            }
                                                        }
                                                    }
                                                });
                                                var tmpLbl = main.ce("label", {
                                                    html: _SETSTRINGS[i],
                                                    attr: {
                                                        "for": "sp_set_" + i
                                                    }
                                                });
                                                var bstlWrap2 = main.ce("label", {
                                                    class: "stnd-link bstrwrap"
                                                });
                                            }
                                            if (typeof _SETSTRINGS[i] != "undefined") {
                                                bstlWrap2.appendChild(tmpCkb);
                                                bstlWrap2.appendChild(tmpLbl);
                                                setArea.appendChild(bstlWrap2);
                                                setArea.appendChild(bstlWrap2);
                                            }
                                        }
                                        if (_SETTINGS.friendsOn) {
                                            main.setFriend(main.qs("#sp_set_friendsOn"));
                                        }
                                        if (_SETTINGS.darkMode) {
                                            main.darkModeNav(main.qs("#sp_set_darkMode"));
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
                                            html: "<span class='b'><span class='ico ico_edit_dim'></span> Редактор cookies<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small; border-bottom: unset;",
                                            onclick: function() {
                                                var head = main.qs("#SP_PLUS_SETHEAD");
                                                var head2 = main.qs("#SP_PLUS_SETHEAD2");
                                                var back = main.qs("#SP_PLUS_SETBACK");
                                                if (head) {
                                                    head.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> Редактор cookies';
                                                }
                                                if (head2) {
                                                    head2.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> Редактор cookies';
                                                }
                                                if (back) {
                                                    back.href = _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1";
                                                }
                                                if (!/(\?|&)sp_cookie_editor=1/i.test(lct)) {
                                                    main.historyPush({
                                                        'sp_plus_settings': urlSett,
                                                        'sp_cookie_editor': urlSettEditor
                                                    }, _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_cookie_editor=1", "Spaces+: Редактор Cookies");
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
                                            html: "<span class='b' style='color: #4c9d4c;'><span class='ico_backup'></span> Импорт и экспорт настроек<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small;",
                                            onclick: function() {
                                                var head = main.qs("#SP_PLUS_SETHEAD");
                                                var head2 = main.qs("#SP_PLUS_SETHEAD2");
                                                var back = main.qs("#SP_PLUS_SETBACK");
                                                if (head) {
                                                    head.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> Импорт и экспорт';
                                                }
                                                if (head2) {
                                                    head2.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> Импорт и экспорт';
                                                }
                                                if (back) {
                                                    back.href = _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1";
                                                }
                                                if (!/(\?|&)sp_backup=1/i.test(lct)) {
                                                    main.historyPush({
                                                        'sp_plus_settings': urlSett,
                                                        'sp_backup': urlSettBackup
                                                    }, _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_backup=1", "Spaces+: Импорт и экспорт");
                                                }
                                                main.backup("#SP_PLUS_SETAREA");
                                                return false;
                                            }
                                        });
                                        setArea.appendChild(spBackup);
                                        var isChangeLog = main.ce("a", {
                                            href: _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_changelog=1",
                                            class: "stnd-link stnd-link_arr",
                                            id: "sp_changelog",
                                            html: "<span class='b' style='color: #57a3ea;'><span class='ico ico_history_blue'></span> История обновлений<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small;",
                                            onclick: function() {
                                                var head = main.qs("#SP_PLUS_SETHEAD");
                                                var head2 = main.qs("#SP_PLUS_SETHEAD2");
                                                var back = main.qs("#SP_PLUS_SETBACK");
                                                if (head) {
                                                    head.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> История обновлений';
                                                }
                                                if (head2) {
                                                    head2.innerHTML = '<a href="http://' + _DOMAIN + '/settings/?sp_plus_settings=1" style="margin-bottom: 1px;">Spaces+</a><span class="location-bar__sep ico"></span> История обновлений';
                                                }
                                                if (back) {
                                                    back.href = _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1";
                                                }
                                                if (!/(\?|&)sp_changelog=1/i.test(lct)) {
                                                    main.historyPush({
                                                        'sp_plus_settings': urlSett,
                                                        'sp_changelog': urlSettChangeLog
                                                    }, _PROTOCOL + "//" + _DOMAIN + "/settings/?sp_plus_settings=1&sp_changelog=1", "Spaces+: История обновлений");
                                                }
                                                main.changeLog("#SP_PLUS_SETAREA");
                                                return false;
                                            }
                                        });
                                        setArea.appendChild(isChangeLog);
                                        var resetLink = main.ce("a", {
                                            href: "#",
                                            class: "stnd-link stnd-link_arr",
                                            id: "sp_plus_reset",
                                            html: "<span class='b' style='color: #f86934;'><span class='ico ico_alert'></span> Сброс настроек<span class='ico ico_arr ico_m'></span></span>",
                                            style: "font-size: small;",
                                            onclick: function() {
                                                main.confirmm("Вы действительно хотите сбросить настройки?", 0, function() {
                                                    main.delCookie("SP_PLUS_SET");
                                                    main.delCookie("SP_PLUS_ONLINE");
                                                    main.delCookie("gp_left_btn");
                                                    main.delCookie("force_ajax_transport");
                                                    main.delCookie("beta");
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
                                            html: 'v' + main.rever(BUILD)
                                        });
                                        var target = main.qs("#SP_PLUS_ABOUT");
                                        aboutWidget.appendChild(content);
                                        content.appendChild(title)
                                        title.appendChild(ver)
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
                                clickEvent.initEvent("click", true, true);
                                settLink.dispatchEvent(clickEvent);
                                if (/#([da-z0-9\_]+)$/i.test(lct)) {
                                    var seid = /#([da-z0-9\_]+)$/i.exec(lct)[0];
                                    var seidel = main.qs(seid);
                                    if (seidel) {
                                        if (seid == "#sp_protocol_togl" || seid == "#sp_plus_reset" || seid == "#sp_cookie_editor" || seid == "#wrap_spaces_option") {
                                            seidel.style.backgroundColor = "#FFC107";
                                        } else {
                                            seidel.nextElementSibling.style.backgroundColor = "#FFC107";
                                        }
                                        setTimeout(function() {
                                            window.scrollTo(0, seidel.offsetTop);
                                        }, 100);
                                    }
                                } else if (urlSettEditor) {
                                    document.title = "Spaces+: Редактор Cookies";
                                    var clickEvent2 = document.createEvent("MouseEvent");
                                    clickEvent2.initEvent("click", true, true);
                                    main.qs("#sp_cookie_editor").dispatchEvent(clickEvent2);
                                } else if (urlSettChangeLog) {
                                    document.title = "Spaces+: История обновлений";
                                    var clickEvent2 = document.createEvent("MouseEvent");
                                    clickEvent2.initEvent("click", true, true);
                                    main.qs("#sp_changelog").dispatchEvent(clickEvent2);
                                } else if (urlSettBackup) {
                                    document.title = "Spaces+: Импорт и экспорт настроек";
                                    var clickEvent2 = document.createEvent("MouseEvent");
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
                    } else if (Notification.permission.toLowerCase() === "granted") {
                        main.notificationShow(title, option, url);
                    } else if (Notification.permission.toLowerCase() !== "denied") {
                        Notification.requestPermission(function(permission) {
                            if (permission.toLowerCase() === "granted") {
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
                    main.console.error('Ошибка (NOTIFICATION_SHOW): ' + e.name + ":" + e.message + "\n" + e.stack);
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
                        value: _SETTINGS.friendsOnMax
                    });
                    frMax.onchange = frMax.oninput = function(e) {
                        if (!isNaN(e.target.value)) {
                            var frMaxVal = parseInt(e.target.value, 10);
                            if (frMaxVal > 15 || frMaxVal < 1) {
                                frMaxVal = 10;
                            }
                            countFriends = 0;
                            _SETTINGS.friendsOnMax = frMaxVal;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.friendsOnline(1);
                        }
                    };
                    var frMaxLbl = main.ce("label", {
                        html: 'Выводить друзей:<div class="label__desc">от 1 до 15</div>',
                        class: "label"
                    });
                    var frListSH = main.ce("input", {
                        type: "checkbox",
                        id: "sp_friends_list_sh",
                        class: "sp_plus_checkbox_el",
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
                    main.console.error('Ошибка (FRIENDS_MAX_SUPPORT): ' + e.name + ":" + e.message + "\n" + e.stack);
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
                        value: _SETTINGS.bodystyleSetting.url,
                        style: "margin-bottom: 7px;",
                        class: "text-input"
                    });
                    bstyle.onchange = bstyle.oninput = function(a) {
                        if (main.isValidUrl(a.target.value) || a.target.value == '') {
                            a.target.style.backgroundColor = "";
                            _SETTINGS.bodystyleSetting.url = main.trim(a.target.value);
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.setStyle();
                        } else {
                            a.target.style.backgroundColor = "#FF7C7C";
                        }
                    };
                    var bstylec = main.ce("input", {
                        type: "text",
                        class: "text-input",
                        id: 'color-input',
                        value: _SETTINGS.bodystyleSetting.color
                    });
                    bstylec.onchange = bstylec.oninput = function(a) {
                        if (/^\#([A-Za-z0-9]{3}|[A-Za-z0-9]{6})$/i.test(a.target.value) || a.target.value == '') {
                            a.target.style.backgroundColor = "";
                            _SETTINGS.bodystyleSetting.color = main.trim(a.target.value);
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            main.setStyle();
                        } else {
                            a.target.style.backgroundColor = "#FF7C7C";
                        }
                    };
                    var inbstyle = main.ce("input", {
                        type: "radio",
                        id: "sp_set_bodystyle_URL",
                        checked: _SETTINGS.bodystyleSetting.urlchecked,
                        class: "sp_plus_checkbox_radio",
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
                        class: "sp_plus_checkbox_radio",
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
                    main.console.error('Ошибка (BODYSTYLE_SET): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            bgColor: function() {
                var rev = main.service(1);
                try {
                    if (!main.qs("#SP_WRAP_COLOR")) {
                        if (main.qs("#SP_WRAP_IMAGE")) {
                            main.remove(main.qs("#SP_WRAP_IMAGE"))
                            main.remove(main.qs("#SP_PLUS_IMAGE_STYLE"))
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
                        td1.appendChild(td1div)
                        tr.appendChild(td1)
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

                        var container = td2div1div1
                        setTimeout(function() {
                            var picker = new CP(container, false, container);
                            document.getElementById("color-input").onchange = document.getElementById("color-input").oninput = function(a) {
                                if (/^\#([A-Za-z0-9]{3}|[A-Za-z0-9]{6})$/i.test(a.target.value) || a.target.value == '') {
                                    a.target.style.backgroundColor = '';
                                    _SETTINGS.bodystyleSetting.color = main.trim(a.target.value);
                                    var jsonSet = JSON.stringify(_SETTINGS);
                                    main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    main.setStyle();
                                    picker.set(_SETTINGS.bodystyleSetting.color)
                                } else {
                                    a.target.style.backgroundColor = "#FF7C7C";
                                    picker.set("FF7C7C")
                                }
                            }
                            picker.enter();
                            picker.set(_SETTINGS.bodystyleSetting.color);
                            picker.on("change", function(color) {
                                document.getElementsByClassName("text-input")[3].value = '#' + color
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
                                    var color = e.target.getAttribute('data-val')
                                    document.getElementsByClassName("text-input")[3].value = color
                                    document.querySelector("input[name=color]").value = color;
                                    document.getElementsByClassName("colorpicker-color")[0].style.backgroundColor = color;
                                    _SETTINGS.bodystyleSetting.color = color;
                                    var jsonSet = JSON.stringify(_SETTINGS);
                                    main.setCookie("SP_PLUS_SET", jsonSet, null);
                                    main.setStyle();
                                    picker.set(color)
                                }
                            }
                        }, 25)
                    }
                } catch (e) {
                    main.console.error('Ошибка (BODYSTYLE_COLOR_SET): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            bgImage: function() {
                try {
                    if (!main.qs("#SP_WRAP_IMAGE")) {
                        if (main.qs("#SP_WRAP_COLOR")) {
                            main.remove(main.qs("#SP_WRAP_COLOR"))
                            main.remove(main.qs("#SP_PLUS_CP_STYLE"))
                        }
                        var style = main.ce("link", {
                            rel: "stylesheet",
                            type: "text/css",
                            id: "SP_PLUS_IMAGE_STYLE",
                            href: "https://" + gitPages + "/src/attaches/css/bodystyle.css?r=" + main.service(1)
                        })
                        document.getElementsByTagName('head')[0].appendChild(style)
                        var SPB = main.qs("#SP_PLUS_BODYSTYLE");
                        var stdnI = main.ce("div", {
                            id: "SP_WRAP_IMAGE",
                            style: "border-top: 1px solid #cdd4e1;"
                        });
                        var gd = main.ce("div", {
                            class: "js-gallery_skip wbg oh tiles_block tiles_wrapper"
                        });
                        main.ajax('https://' + gitPages + '/data.json?r=' + main.service(1), 'GET', null, function(data) {
                            var data = JSON.parse(data)
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
                                        document.getElementsByClassName('text-input')[2].value = e.target.src
                                        _SETTINGS.bodystyleSetting.url = e.target.src;
                                        var jsonSet = JSON.stringify(_SETTINGS);
                                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                                        main.setStyle();
                                    }
                                });
                                ds1.appendChild(img)
                                s3.appendChild(ds1);
                                d2.appendChild(s3)
                                d1.appendChild(d2)
                                gd.appendChild(d1)
                            }
                            stdnI.appendChild(gd);
                            SPB.appendChild(stdnI);
                        }, 4);
                    }
                } catch (e) {
                    main.console.error('Ошибка (BODYSTYLE_IMAGE_SET): ' + e.name + ":" + e.message + "\n" + e.stack);
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
                        class: "sp_plus_checkbox_el",
                        checked: _SETTINGS.events.notifications,
                        onclick: function(e) {
                            if (!("Notification" in window)) {
                                main.alert("Ваш браузер не поддерживает уведомления!", 1, null);
                                return false;
                            } else if (Notification.permission.toLowerCase() === "granted") {
                                _SETTINGS.events.notifications = e.target.checked;
                                var jsonSet = JSON.stringify(_SETTINGS);
                                main.setCookie("SP_PLUS_SET", jsonSet, null);
                            } else if (Notification.permission.toLowerCase() !== "denied") {
                                Notification.requestPermission(function(permission) {
                                    if (permission.toLowerCase() === "granted") {
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
                        } else {
                            e.target.style.backgroundColor = "#FF7C7C";
                        }
                    };
                    var testPlay = main.ce("span", {
                        class: "text-input__btn",
                        html: '<span class="js-ico ico ico_demo"></span>',
                        style: "margin-left: 7px; font-size: small; top: 23px",
                        title: "Прослушать",
                        onclick: function() {
                            main.sound(_SETTINGS.events.url + "?r=" + main.rand(1000, 9999), _SETTINGS.events.volume);
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
                        class: "sp_plus_checkbox_el",
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
                        class: "sp_plus_checkbox_el",
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
                        class: "sp_plus_checkbox_el",
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
                    main.console.error('Ошибка (EVENTS_SUP): ' + e.name + ":" + e.message + "\n" + e.stack);
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
            isInteger: function(n) {
                return (n ^ 0) === n;
            },
            wrap: function(toWrap, wrapper) {
                wrapper = wrapper || main.ce("div", null);
                if (toWrap.nextSibling) {
                    main.inBefore(wrapper, toWrap.nextSibling);
                } else {
                    toWrap.parentNode.appendChild(wrapper);
                }
                return wrapper.appendChild(toWrap);
            },
            is_array: function(v) {
                return (v instanceof Array);
            },
            scrollMove: function(t) {
                try {
                    var scroller = main.qs("#scroll_page");
                    if (scroller && !scroller.hasAttribute("sp-replace") && t) {
                        scroller.style.left = "auto";
                        scroller.style.right = "0";
                        scroller.setAttribute("sp-replace", "1");
                    } else if (!_SETTINGS.rscroll && scroller && scroller.hasAttribute("sp-replace") && !t) {
                        scroller.style.left = "0";
                        scroller.style.right = "auto";
                        scroller.removeAttribute("sp-replace");
                    }
                } catch (e) {
                    main.console.error('Ошибка (SCROLLER): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            hiddenRightbar: function(t) {
                try {
                    var rightbar = main.qs("#page_rightbar");
                    if (rightbar && !rightbar.hasAttribute("sp-hidden-rightbar") && t) {
                        rightbar.style.display = "none";
                        rightbar.setAttribute("sp-hidden-rightbar", "1");
                    } else if (!_SETTINGS.hrightbar && rightbar && rightbar.hasAttribute("sp-hidden-rightbar") && !t) {
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
                            var hideNotyf = main.ce("img", {
                                class: "p16 m pointer right close_h",
                                style: "padding: 10px;",
                                src: _PROTOCOL + "//spac.me/i/remove.png",
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
                                html: '<span class="ico ico_alert"></span>Внимание!</br></br><div style="font-size: small;">Никому не сообщайте значения ваших cookies! Не делайте скриншот этой страницы, на котором будут видны эти значения! От этого зависит безопасность вашего аккаунта!</div>'
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
                            html: '<span class="sp_plus_ico_okb"></span> Добавить',
                            class: "black",
                            style: "max-width: 30%; margin: 3px; padding: 5px 3px 3px 7px; font-size: 14px;",
                            onclick: function(e) {
                                var prev = (e.target.nodeName == "SPAN" ? e.target.parentNode.previousElementSibling : e.target.previousElementSibling);
                                var name = main.htmlspecialchars(main.trim(prev.previousElementSibling.value));
                                var val = main.htmlspecialchars(main.trim(prev.value));
                                if ((name == "SP_PLUS_ONLINE" || name == "SP_PLUS_SET") && _X77hgg) {
                                    main.alert("Это служебное значение скрипта, не изменяйте его!", 1, null);
                                } else if (name != "") {
                                    main.confirmm((name == "SP_PLUS_ONLINE" || name == "SP_PLUS_SET" ? "Внимание, <b>" + name + "</b> является служебным значение скрипта, не стоит его изменять!<br/>" : "") + "Вы действительно хотите добавить куку <b>" + name + "</b> со значением <b>" + val + "</b>?", 1, function() {
                                        main.setCookie(prev.previousElementSibling.value, prev.value, null);
                                        main.cookieEditor("#SP_PLUS_SETAREA");
                                    });
                                } else {
                                    main.alert("Задайте имя cookie!", 1, null);
                                }
                            }
                        });
                        wrap1.appendChild(inp1);
                        wrap1.appendChild(inp2);
                        wrap1.appendChild(inp3);
                        target.appendChild(wrap1)
                        target.appendChild(main.ce("div", {
                            class: "sp_plus_line",
                            html: '<span class="sp_plus_text">Список существующий cookies</span>'
                        }));
                        for (var i in cookie) {
                            if ((i == "SP_PLUS_ONLINE" || i == "SP_PLUS_SET") && _X77hgg) {
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
                                html: "<span class='sp_plus_ico_del'></span>",
                                title: "Удалить",
                                style: "max-width: 15%; margin: 3px; padding: 5px 3px 3px 7px; font-size: 14px;",
                                onclick: function(e) {
                                    var prev = (e.target.nodeName == "SPAN" ? e.target.parentNode.previousElementSibling.previousElementSibling : e.target.previousElementSibling.previousElementSibling);
                                    var name = main.htmlspecialchars(main.trim(prev.value));
                                    if ((name == "SP_PLUS_ONLINE" || name == "SP_PLUS_SET") && _X77hgg) {
                                        main.alert("Это служебное значение скрипта, не удаляйте его!", 1, null);
                                    } else if (name != "") {
                                        main.confirmm((name == "SP_PLUS_ONLINE" || name == "SP_PLUS_SET" ? "Внимание, <b>" + name + "</b> является служебным значение скрипта, не стоит его удалять!<br/>" : "") + "Вы действительно хотите удалить куку <b>" + name + "</b>?", 0, function() {
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
                                html: "<span class='sp_plus_ico_okb'></span>",
                                style: "max-width: 15%; margin: 3px; padding: 5px 3px 3px 7px; font-size: 14px;",
                                onclick: function(e) {
                                    var prev = (e.target.nodeName == "SPAN" ? e.target.parentNode.previousElementSibling.previousElementSibling : e.target.previousElementSibling.previousElementSibling);
                                    var name = main.htmlspecialchars(main.trim(prev.previousElementSibling.value));
                                    var val = main.htmlspecialchars(main.trim(prev.value));
                                    if ((name == "SP_PLUS_ONLINE" || name == "SP_PLUS_SET") && _X77hgg) {
                                        main.alert("Это служебное значение скрипта, не изменяйте его!", 1, null);
                                    } else if (name != "") {
                                        main.confirmm((name == "SP_PLUS_ONLINE" || name == "SP_PLUS_SET" ? "Внимание, \"" + name + "\"</b> является служебным значение скрипта, не стоит его изменять!<br/>" : "") + "Вы действительно хотите задать куке <b>\"" + name + "\"</b> значение <b>\"" + val + "\"</b>?", function() {
                                            main.setCookie(prev.previousElementSibling.value, prev.value, null);
                                            main.cookieEditor("#SP_PLUS_SETAREA");
                                        });
                                    } else {
                                        main.alert("Имя не должно быть пустым!", 1, null);
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
                        main.console.error('Ошибка (COOKIE_EDITOR): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            spacesAction: function(root) {
                var wrap = main.ce("div", {
                    id: "wrap_spaces_option"
                });
                var apidebug = main.ce("a", {
                    href: 'javascript:var Arr=[\'<div class="time-block" style="text-align: left;" id="wrap_spacesAction_AD"><a href="#" id="api_debug-button">API-Debugger</a><div id="api_debug-place"></div></div>\',"append","parent","#navi","debugger"];$(Arr[3])[Arr[2]]()[Arr[1]](Arr[0]),require(Arr[4]);void(0);',
                    class: "stnd-link stnd-link_arr",
                    id: "sp_spacesAction_AD",
                    html: '<span class="b"><span class="ico ico_settings"></span> API-Отладчик<span class="ico ico_arr ico_m"></span></span>',
                    style: "font-size: small;",
                    onclick: function() {
                        var check = main.qs("#wrap_spacesAction_AD");
                        if (check) {
                            main.remove(check);
                            main.setLocation(document.location.href);
                            return false;
                        }
                        return true;
                    }
                });
                var beta = main.getCookie("beta");
                var sndbeta = main.ce("a", {
                    href: '#',
                    class: "stnd-link stnd-link_arr",
                    id: "sp_spacesAction_beta",
                    html: (beta ? "<span class='b'><span class='ico ico_exit'></span> Выйти из песочницы<span class='ico ico_arr ico_m'></span></span>" : "<span class='b'><span class='ico ico_enter_grey'></span> Beta-песочница<span> - открытое тестирование нововведений сайта<span class='ico ico_arr ico_m'></span></span></span>"),
                    style: "font-size: small;",
                    onclick: function() {
                        if (beta) {
                            main.delCookie("beta");
                        } else {
                            main.setCookie("beta", "1", null);
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
                    html: (fat ? "<span class='b'><span class='ico' style='background-image: url(\"//spac.me/i/remove.png\");'></span> Убрать полосу загрузки<span class='ico ico_arr ico_m'></span></span>" : "<span class='b'><span class='ico ico_ok_grey'></span> Добавить полосу загрузки страницы<span class='ico ico_arr ico_m'></span><span>"),
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
                    html: (glb ? "<span class='b'><span class='ico' style='background-image: url(\"//spac.me/i/remove.png\");'></span> Убрать плеер из панели<span class='ico ico_arr ico_m'></span></span>" : "<span class='b'><span class='ico ico_ok_grey'></span> Переместить плеер - переносит кнопку открытия плеера в левую панель<span class='ico ico_arr ico_m'></span></span>"),
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
                    href: _PROTOCOL + "//" + _DOMAIN + "/newbequest/?r=newbequest/delete",
                    style: "border-bottom: unset; display: none; font-size: small;",
                    id: "sp_newbequest_togl",
                    class: "stnd-link stnd-link_arr sp_plus_liness",
                    html: "<span class='b'><span class='ico' style='background-image: url(\"//spac.me/i/remove.png\");'></span> Скрыть квест новичка<span class='ico ico_arr ico_m'></span></span>",
                    onclick: function() {
                        var CK = main.getCK(0);
                        main.confirmm("Хотите удалить квест новичка?", function() {
                            main.ajax(_PROTOCOL + "//" + _DOMAIN + "/newbequest/delete/?CK=" + CK + "&link_id=0", "GET", null, function() {
                                main.alert("Квест новичка скрыт!", 1, null);
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
            rand: function(min, max) {
                return Math.round(Math.random() * (max - min)) + min;
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
                var data = data.split(".");
                var list = new Array(),
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
            setSelection: function(target) {
                var rng, sel;
                if (document.createRange) {
                    rng = document.createRange();
                    rng.selectNode(target)
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(rng);
                } else {
                    rng = document.body.createTextRange();
                    rng.moveToElementText(target);
                    rng.select();
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
            events: function() {
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
                        if (tabActive == "false") {
                            main.sound(_SETTINGS.events.url + "?r=" + main.rand(1000, 9999), _SETTINGS.events.volume);
                            if (_SETTINGS.events.notifications) {
                                var string = main.declOfNum(counter, ["новое событие", "новых события", "новых событий"]);
                                main.notifications("Новые события на Spaces!", {
                                    body: "У Вас " + counter + " " + string + "!",
                                    icon: ICON48,
                                    tag: "events"
                                }, null);
                            }
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
                                                var displayN = main.getClassName('span.s_i s_i_friends');
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
                                                        html: '<span class="comm_ava m for_avatar ' + displayN + '"><img src="' + friendsList[i].avatar.previewURL + '" alt="" class="preview s21_20"></span><span class="online-status m"><img class="p14 online_status_ico" src="' + _PROTOCOL + '//spac.me/i/' + friendsList[i].online_status.on_img + '" alt="(ON)"></span><span class="block-item__title m break-word">' + friendsList[i].name + '</span>'
                                                    }));
                                                }
                                                frCount.parentNode.removeAttribute("sp-click-el");
                                                main.console.info("[S+] Обновили список друзей!");
                                            });
                                        } else {
                                            main.remove(frOnDiv);
                                        }
                                    } catch (e) {
                                        main.console.error('Ошибка (FRIENDS_ONLINE_JSON): ' + e.name + ":" + e.message + "\n" + e.stack);
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
                        main.console.error('Ошибка (FRIENDS_ONLINE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            online: function() {
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
                                        main.console.error('Ошибка (JSON_ONLINE): ' + e.name + ":" + e.message + "\n" + e.stack);
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        main.console.error('Ошибка (ONLINE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                } else if (path != target) {
                    onlineLock = null;
                }
            },
            favorite: function() {
                var locationHref = document.location.href;
                var path = document.location.pathname.toString();
                if (locationHref == _PROTOCOL + "//" + _DOMAIN + "/bookmarks/add/?irb526786=1" && !favRLock) {
                    favRLock = locationHref;
                    main.setLocation(_PROTOCOL + "//" + _DOMAIN + "/bookmarks/?irb526786=1");
                }
                var checkfv1 = null;
                if (path == '/anketa/') {
                    var dlnk = document.links;
                    checkfv1 = main.find(dlnk, {
                        href: _PROTOCOL + "//" + _DOMAIN + "/bookmarks/add/?"
                    });
                    if (!checkfv1) {
                        checkfv1 = main.find(dlnk, {
                            href: _PROTOCOL + "//" + _DOMAIN + "/bookmarks/edit/?"
                        });
                    }
                }
                if ((path == '/mysite/' || path == '/anketa/' || path == '/activity/') && !checkfv1 && favLock != locationHref) {
                    var fvtools = main.qs("#SP_PLUS_INFAVORITE");
                    favLock = locationHref;
                    try {
                        var nick = main.getQuery("user");
                        if (!nick) {
                            nick = main.getQuery("name") || main.service(0);
                        }
                        var tbBlock = main.getClassName("td.table__cell table__cell_last", 1);
                        if (nick && tbBlock && tbBlock[0].innerHTML.indexOf("Вперёд") < 0 && !fvtools) {
                            main.jajax(_PROTOCOL + '//' + _DOMAIN + '/anketa/?user=' + nick, function(data) {
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
                                            favLink.innerHTML = '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/bookmarks/add/?object_id=' + json.user_widget.id + '&object_type=11" class="' + lClass + '" title="Добавить в закладки"><span class="ico ico_fav_grey js-ico"></span> B закладки</a>';
                                            main.isFav(json.user_widget.id, favLink, nick, '<span class="ico ico_fav_on js-ico"></span><span style="color: #61a961;"> В закладках</span>');
                                            if (!fvtools) {
                                                main.inBefore(favLink, tbBlock[0]);
                                            }
                                            var clds = tbBlock[0].parentNode.childNodes;
                                            for (var x in clds) {
                                                if (clds[x].nodeName == "TD") clds[x].width = "25%";
                                            }
                                        }
                                    } catch (e) {
                                        main.console.error('Ошибка (JSON_FAVORITE): ' + e.name + ":" + e.message + "\n" + e.stack);
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        main.console.error('Ошибка (FAVORITE): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                } else if (path != '/mysite/' && path != '/anketa/' && path != '/activity/') {
                    favLock = null;
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
                                    main.confirmm("Хотите удалить пользователя " + nm + " из закладок?", function() {
                                        main.setLocation(dlink);
                                    });
                                    return false;
                                };
                            }
                        } catch (e) {
                            main.console.error('Ошибка (JSON_ISFAVORITE): ' + e.name + ":" + e.message + "\n" + e.stack);
                        }
                    }
                });
            },
            bannedHTML: function(nick, type, blocked, id) {
                var out = type ? '<div class="widgets-group links-group">' + (id ? '<span id="SP_PLUS_INFAV"><a href="' + _PROTOCOL + '//' + _DOMAIN + '/bookmarks/add/?object_id=' + id + '&object_type=11" id="SP_PLUS_INFAV" class="list-link list-link_arrow list-link_first"><span class="ico ico_fav_grey js-ico"></span> Добавить в закладки<span class="ico ico_arr"></span></a></span>' : '') + '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/gifts/user_list/?user=' + nick + '" class="list-link list-link_arrow list-link_first"><span class="ico ico_gifts_blue"></span> Подарки<span class="ico ico_arr"></span></a>' + (!blocked ? '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/guestbook/?name=' + nick + '" class="list-link list-link_arrow list-link_first"><span class="ico ico_gb"></span> Гостевая<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/diary/?name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_blog"></span> Личный блог<span class="ico ico_arr"></span></a>' : '') + '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/forums/search_user/?Comm=0&Ext=1&Link_id=363467&query=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_forum"></span> Темы и комментарии <span class="ico ico_arr"></span></a>' + (!blocked ? '<div class="sep-item"></div><a href="' + _PROTOCOL + '//' + _DOMAIN + '/pictures/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_photo"></span> Фотографии<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/music/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_music"></span> Музыка<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/video/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_video"></span> Видео<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/files/?P=1&amp;name=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_file"></span> Файлы<span class="ico ico_arr"></span></a>' : '') + '<div class="sep-item"></div><a href="' + _PROTOCOL + '//' + _DOMAIN + '/comm/?List=1&user=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_comm"></span> Сообщества<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/friends/?name=' + nick + '&amp;p=1" class="list-link list-link_arrow"><span class="ico ico_friends"></span> Друзья<span class="ico ico_arr"></span></a><a href="' + _PROTOCOL + '//' + _DOMAIN + '/lenta/readers/?user=' + nick + '" class="list-link list-link_arrow"><span class="ico ico_readers"></span> Читатели<span class="ico ico_arr"></span></a></div>' : '<div class="no_underline_block start_page_padd light_border_bottom" style="padding-top:1px;">' + (id ? '<div id="SP_PLUS_INFAV"><a href="' + _PROTOCOL + '//' + _DOMAIN + '/bookmarks/add/?object_id=' + id + '&object_type=11"><img src="' + _PROTOCOL + '//spac.me/i/action_fav_gray.gif" alt="" class="m p16"> <span class="m"> Добавить в закладки</span></a></div>' : '') + '<div><a href="' + _PROTOCOL + '//' + _DOMAIN + '/gifts/user_list/?user=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/sendgift.gif" alt="" class="m p16"> <span class="m">Подарки</span></a></div>' + (!blocked ? '<div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/guestbook/?name=' + nick + '&amp;p=0"><img src="' + _PROTOCOL + '//spac.me/i/guestbook.gif" alt="" class="m p16"> <span class="m">Гостевая</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/diary/?name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/diary.gif" alt="" class="m p16"> <span class="m">Блог</span></a></div>' : '') + '</div><div class="no_underline_block start_page_padd light_blue light_border_bottom">' + (!blocked ? '<div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/pictures/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/PhotoIcon.gif" alt="" class="m p16"> <span class="m">Фото</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/music/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/file_mp3.gif" alt="" class="m p16"> <span class="m">Музыка</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/video/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/icon_video.gif" alt="" class="m p16"> <span class="m">Видео</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/files/?P=1&amp;name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/film.gif" alt="" class="m p16"> <span class="m">Файлы</span></a></div>' : '') + '<div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/forums/search_user/?Comm=0&Ext=1&word=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/Forum.gif" alt="" class="m p16"> <span class="m">Темы и комментарии</span></a> </div></div><div class="no_underline_block start_page_padd light_border_bottom"><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/friends/?name=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/friends.gif" alt="" class="m p16"> <span class="m">Друзья</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/comm/?List=1&user=' + nick + '"> <img src="' + _PROTOCOL + '//spac.me/i/soo.gif" alt="" class="m p16"> <span class="m">Сообщества</span></a></div><div> <a href="' + _PROTOCOL + '//' + _DOMAIN + '/lenta/readers/?user=' + nick + '"><img src="' + _PROTOCOL + '//spac.me/i/icon_readers.gif" alt="" class="m p16"> <span class="m">Читатели</span></a></div></div>';
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
                                            var uid = json.owner_id;
                                            if (json.owner_widget.ban_info.deleted) {
                                                main.console.info("[S+] Аккаунт удален!");
                                            } else if (json.owner_widget.ban_info.frozen) {
                                                main.console.info("[S+] Аккаунт покинут!");
                                            } else if (json.owner_widget.ban_info.blocked) {
                                                main.console.info("[S+] Аккаунт забанен!");
                                                blckg = true;
                                            }
                                            var tBlock = btools || main.ce("div", {
                                                id: "SP_PLUS_BNDBLOCK"
                                            });
                                            tBlock.innerHTML = main.bannedHTML(nick, type, blckg, uid);
                                            if (!btools) {
                                                sContent.appendChild(tBlock);
                                            }
                                            if (uid) {
                                                main.isFav(uid, main.qs("#SP_PLUS_INFAV"), nick, (type ? '<span class="ico ico_fav_on js-ico"></span> Удалить из закладок<span class="ico ico_arr"></span>' : '<img src="' + _PROTOCOL + '//spac.me/i/action_fav_color.gif" alt="" class="m p16"> <span class="m"> Удалить из закладок</span>'));
                                            }
                                        }
                                    }
                                } catch (e) {
                                    main.console.error('Ошибка (JSON_BLOCKED): ' + e.name + ":" + e.message + "\n" + e.stack);
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
            getCK: function(a) {
                var Sid = main.getCookie("sid");
                return a ? Sid : Sid.substr(-4);
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
                            var CK = main.getCK(0);
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
                                    class: "sp_plus_checkbox"
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
                                    html: '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">Выбрать все</span>',
                                    onclick: function(e) {
                                        var parent = (e.target.nodeName == "SPAN" ? e.target.parentNode : e.target);
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (parent.innerHTML.indexOf('Выбрать все') >= 0) {
                                                chbxArr[i].checked = true;
                                            } else {
                                                chbxArr[i].checked = false;
                                            }
                                        }
                                        parent.innerHTML = '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">' + (parent.innerHTML.indexOf('Выбрать все') >= 0 ? "Снять отметки" : "Выбрать все") + '</span>';
                                        return false;
                                    }
                                });
                                var delSubm = main.ce("button", {
                                    class: "user__tools-link table__cell sp_btn_line",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="sp_plus_ico_del"></span><span style="color: #F86934;">Удалить выбранных</span>',
                                    onclick: function() {
                                        var delCount = 0,
                                            dArr = new Array();
                                        chSubm.innerHTML = '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">Выбрать все</span>';
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
                                                    main.ajax(_PROTOCOL + '//' + _DOMAIN + '/lenta/reader_delete/?user=' + dIdBl, 'POST', '&CK=' + CK + '&cfms=Удалить', function(r) {
                                                        main.console.info("[S+] Удалили читателей: " + dIdBl);
                                                    }, 2);
                                                    if (delCount < 1) {
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
                                for (var i = 0; i < chbxArr.length; i++) {
                                    chbxArr[i].style.display = "none";
                                }
                                var btnDiv = main.ce("div", {
                                    style: "display: none;",
                                    id: "SP_PLUS_BOTTOM_DIVB"
                                });
                                document.body.appendChild(btnDiv);
                            }
                        }
                    } catch (e) {
                        main.console.error('Ошибка (READERS): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            blogsDelete: function() {
                var path = document.location.pathname.toString();
                var p = path.split('/');
                if ((p[1] == 'diary' && p[2] == null) || (p[1] == 'diary' && p[2] == 'view') && !main.qs("#SP_PLUS_BOTTOM_DIVB")) {
                    try {
                        var edLinks = main.find(document.links, {
                            href: _PROTOCOL + "//" + _DOMAIN + "/diary/editaccess/?id="
                        });
                        if (edLinks && !main.qs("#SP_PLUS_BOTTOM_DIVB")) {
                            var CK = main.getCK(0);
                            var chbxArr = new Array();
                            for (var i = 0; i < edLinks.length; i++) {
                                if (edLinks[i].className) {
                                    edLinks[i].style.textDecoration = "none";
                                    var bChbx = main.ce("input", {
                                        type: "checkbox",
                                        id: "SP_DB_" + /\?id=([0-9]+)/i.exec(edLinks[i].href)[1],
                                        class: "sp_plus_checkbox"
                                    });
                                    var ckbxlb = main.ce("label", {
                                        attr: {
                                            "for": "SP_DB_" + /\?id=([0-9]+)/i.exec(edLinks[i].href)[1]
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
                                    html: '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">Выбрать все</span>',
                                    onclick: function(e) {
                                        var parent = (e.target.nodeName == "SPAN" ? e.target.parentNode : e.target);
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (parent.innerHTML.indexOf('Выбрать все') >= 0) {
                                                chbxArr[i].checked = true;
                                            } else {
                                                chbxArr[i].checked = false;
                                            }
                                        }
                                        parent.innerHTML = '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">' + (parent.innerHTML.indexOf('Выбрать все') >= 0 ? "Снять отметки" : "Выбрать все") + '</span>';
                                        return false;
                                    }
                                });
                                var delSubm = main.ce("button", {
                                    class: "user__tools-link table__cell sp_btn_line",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="sp_plus_ico_del"></span><span style="color: #F86934;">Удалить выбранные</span>',
                                    onclick: function() {
                                        var delCount = 0,
                                            dArr = new Array();
                                        chSubm.innerHTML = '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">Выбрать все</span>';
                                        for (var i = 0; i < chbxArr.length; i++) {
                                            if (chbxArr[i].checked == true) {
                                                var delId = /^SP_DB_([0-9]+)$/i.exec(chbxArr[i].id)[1];
                                                dArr.push(delId);
                                                chbxArr[i].checked = false;
                                                delCount++;
                                            }
                                        }
                                        if (delCount > 0) {
                                            var ololo = main.declOfNum(delCount, ["", "а", "ов"]);
                                            main.confirmm("Хотите удалить " + delCount + " блог" + ololo + "?", function() {
                                                var cancel = null;
                                                var intr = setInterval(function() {
                                                    main.alert("Удаляем блоги: <span style='color: #1cc61c;'>" + delCount + "</span><br/><a href='#' onclick='return false;' id='SP_PLUS_CANCEL' class='sp_plus_a'>Отмена</a>", 0, null);
                                                    delCount--;
                                                    var dIdBl = dArr[delCount];
                                                    main.ajax(_PROTOCOL + '//' + _DOMAIN + '/diary/delete/?r=diary/delete', 'POST', 'CK=' + CK + '&id=' + dIdBl + '&Sure=1', function(r) {
                                                        main.console.info("[S+] Блог удален: " + dIdBl);
                                                    }, 2);
                                                    cancel = main.qs("#SP_PLUS_CANCEL");
                                                    cancel.onclick = function() {
                                                        dArr = null;
                                                        clearInterval(intr);
                                                        main.alert("Отменено!<br/><a href='" + document.location.href.replace(/\#.*$/i, '') + "' onclick='document.body.removeChild(this.parentNode); return true;' class='sp_plus_a'>Обновить страницу</a>", 1, null);
                                                    };
                                                    if (delCount < 1) {
                                                        dArr = null;
                                                        clearInterval(intr);
                                                        main.alert("Готово!<br/><a href='" + document.location.href.replace(/\#.*$/i, '') + "' onclick='document.body.removeChild(this.parentNode); return true;' class='sp_plus_a'>Обновить страницу</a>", 1, null);
                                                    }
                                                }, 500);
                                            });
                                        } else {
                                            main.alert("Не выбрано ни одного блога!", 1, null);
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
                                var btnDiv = main.ce("div", {
                                    style: "display: none;",
                                    id: "SP_PLUS_BOTTOM_DIVB"
                                });
                                document.body.appendChild(btnDiv);
                            }
                        }
                    } catch (e) {
                        main.console.error('Ошибка (BLOGS): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            prompt: function(a, b) {
                a = a || "";
                b = b || "";
                var ret = prompt(a, b);
                return ret == null ? "" : ret;
            },
            icon: function(c) {
                if (c) {
                    return '<span class="sp_plus_ico_info"></span> ';
                } else {
                    return '<span class="sp_plus_ico_alert"></span> ';
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
                }
                var Main = main.qs("#SP_PLUS_CONFIRM");
                if (Main) {
                    // TODO: Refactoring
                } else {
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
                if (Main) {
                    // TODO: Refactoring
                } else {
                    Main = main.ce("div", {
                        class: "content-item3 wbg oh",
                        id: "SP_PLUS_ALERT",
                        html: (close ? '<img src="' + _PROTOCOL + '//spac.me/i/remove.png" class="pointer right notif_close close_h" onclick="document.body.removeChild(this.parentNode.parentNode);" title="Закрыть" />' : '') + html
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
            comments: function() {
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
                                        modrs[x].className = "sp_plus_checkbox";
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
                                            class: "sp_plus_checkbox",
                                            id: "DC_" + childs[k].parentNode.parentNode.parentNode.parentNode.parentNode.id
                                        });
                                        var ckbxlb = main.ce("label", {
                                            attr: {
                                                "for": "DC_" + childs[k].parentNode.parentNode.parentNode.parentNode.parentNode.id
                                            }
                                        });
                                        childs[k].appendChild(ckbx);
                                        childs[k].appendChild(ckbxlb);
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
                                    html: '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">Выбрать все</span>',
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
                                        parent.innerHTML = '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">' + (parent.innerHTML.indexOf('Выбрать все') >= 0 ? "Снять отметки" : "Выбрать все") + '</span>';
                                        return false;
                                    }
                                });
                                var delSubm = main.ce("button", {
                                    class: "user__tools-link table__cell sp_btn_line",
                                    style: "width: 50%; display: inline-block; box-sizing: border-box;",
                                    html: '<span class="sp_plus_ico_del"></span><span style="color: #F86934;">Удалить выбранные</span>',
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
                    main.console.error('Ошибка (COMMENTS): ' + e.name + ":" + e.message + "\n" + e.stack);
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
                    main.console.error('Ошибка (PLAYER_DOWN): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            coins: function() {
                var coinsLink = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/services/gift_get/?id="
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
                    href: _PROTOCOL + "//" + _DOMAIN + "/mysite/rate_n_karma/karma/?Accept=" // fucking http protocol
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
                var s = main.qs("#SP_PLUS_ADBLOCK")
                var reklama = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/index/main/"
                });
                try {
                    if (!s) {
                        var script = main.ce("script", {
                            type: "text/javascript",
                            id: "SP_PLUS_ADBLOCK",
                            html: "var rawOpen = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function() { if (!this._hooked) { this._hooked = true; setupHook(this); }; rawOpen.apply(this, arguments); }; function setupHook(xhr) { function getter() { delete xhr.responseText; var ret = xhr.responseText; var json = JSON.parse(ret); json.reklama = ''; json.rightbar_reklama = ''; json.rightbar_app = ''; json.sidebar_reklama = ''; ret = JSON.stringify(json); setup(); return ret; }; function setup() { Object.defineProperty(xhr, 'responseText', { get: getter, configurable: true }); } setup(); };"
                        })
                        document.getElementsByTagName('head')[0].appendChild(script);
                    } else if (reklama) {
                        main.remove(reklama[0].parentNode);
                    }
                } catch (e) {
                    main.console.error('Ошибка (ADBLOCK): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            allFixes: function() {
                var mail = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/mail/?Link_id="
                });
                var lenta = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/lenta/?Link_id="
                });
                if (mail && lenta) {
                    var pmail = mail[0].parentNode
                    var plenta = lenta[0].parentNode

                    mail[0].href = _PROTOCOL + "//" + _DOMAIN + "/mail/"
                    lenta[0].href = _PROTOCOL + "//" + _DOMAIN + "/lenta/"

                    pmail.removeChild(mail[0])
                    plenta.removeChild(lenta[0])

                    pmail.appendChild(lenta[0])
                    plenta.appendChild(mail[0])
                }
            },
            darkMode: function(t) {
                var parent = document.getElementsByTagName('head').item(0);
                var sdm = main.qs("#SP_PLUS_DARKMODE") || main.ce("style", {
                    id: "SP_PLUS_DARKMODE",
                    type: "text/css"
                });
                try {
                    if (sdm && !sdm.hasAttribute("sp-darkmode") && t) {
                        sdm.innerHTML = ".border{border:1px solid #344047!important}.sp_plus_checkbox_radio+label{color:#fff!important}input[type=range]{background:transparent;height:0;-webkit-appearance:none;margin:10px 0;width:100%}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;animate:.2s;background:#9ab2cc!important;border-radius:32px;border:0 solid #000}input[type=range]::-webkit-slider-thumb{border:0 solid #2497e3;height:10px;width:10px;border-radius:4px;background:#9ab2cc!important;cursor:pointer;-webkit-appearance:none;margin-top:0}input[type=range]:focus::-webkit-slider-runnable-track{background:#d2e3f4}input[type=range]::-moz-range-track{width:100%;height:10px;cursor:pointer;animate:.2s;background:#d2e3f4;border-radius:32px;border:0 solid #000}input[type=range]::-moz-range-thumb{border:0 solid #2497e3;height:10px;width:10px;border-radius:4px;background:#9ab2cc!important;cursor:pointer}input[type=range]::-ms-track{width:100%;height:10px;cursor:pointer;animate:.2s;background:0;border-color:transparent;color:transparent}input[type=range]::-ms-fill-lower{background:#d2e3f4;border:0 solid #000;border-radius:64px}input[type=range]::-ms-fill-upper{background:#d2e3f4;border:0 solid #000;border-radius:64px}input[type=range]::-ms-thumb{margin-top:1px;border:0 solid #2497e3;height:10px;width:10px;border-radius:4px;background:#9ab2cc!important;cursor:pointer}input[type=range]:focus::-ms-fill-lower{background:#d2e3f4}input[type=range]:focus::-ms-fill-upper{background:#d2e3f4}input[type=range]::-moz-range-progress{border-radius:4px;height:10px;background-color:#9ab2cc!important}input[type=range]::-ms-fill-lower{border-radius:4px;height:10px;background-color:#9ab2cc!important}.brdtop{border-top:1px solid #344047!important}.adv_user_link{background:#404a51!important;border:unset}.grey{color:#fff}.light_item{color:#7a90a0!important}.about_separator::before{border-bottom:1px solid #404a51}.about_separator>span{color:#fff!important;background:#404a51}.error__item .text-input_error{background:unset}.lgrey{color:#fff}body .user__tools-link_disabled,body .user__tools-link_disabled:hover,body .user__tools-link_disabled.clicked,body .stnd-link_disabled:active,.dropdown-menu .list-link.user__tools-link_disabled,.dropdown-menu .list-link.user__tools-link_disabled:hover{cursor:not-allowed;background:unset!important}.s-city__pagination-btn:hover{background:#596671}.s-city__pagination{background:#4d5961!important}.calendar-head{background-color:#344047}.mailBox{border:1px solid #344047!important;background:#4d5961!important}.mailBox .text{color:#fff!important}.message-block_foreign.message-block_personal .message__description::before{border-right-color:#61a961}.message__date,.message__place{color:#fff}.message-block_personal .message__description{background:#61a961}.message-block_foreign.message-block_system .message__description::before{border-right-color:#344047}.message-block_my.message-block_system .message__description,.message-block_system .message__description{background:#344047}.message__user,.message__text{color:#fff}.message-block_foreign .message__description::before{border-right-color:#344047}.message__description{background:#344047}.message-block_my .message__description::before{border-left-color:#404a51}.message-block_my .message__description{background:#404a51}.list-link_sep{border:1px solid#344047}.bordered{border:1px solid#344047}.cnt_title{border-color:#4d5961!important;color:#57a3ea}.s-property::after{content:unset!important}.s-property::before{background:transparent}.s-property__inner{border:1px solid #344047}.s-property{background:#4d5961}.switch__item_cnt{color:#64a3eb}.switch{background:unset}.system-message_service{color:#404a51!important;background:#f9edbf!important}.system-message{border-right:1px solid #344047;color:#fff;background:#4d5961}.time-block{background:#4d5961;border:1px solid #344047;border-top:unset}.i_busi{color:#000}content-item{background:#4d5961}.un,#scroll_page_toTop,#scroll_page_toBottom{color:#fff}label.user__tools-link.clicked{background:#4d5961!important}.user__tools-link:active,.user-tile__btn:active,.user-tile__btn.js-clicked,.user__tools-link.clicked{color:#fff!important}.colorpicker-spectrum_cursor{background:#344047}.colorpicker-color,.colorpicker-rect,.colorpicker-spectrum,.toolbar-color,.colorpicker-spectrum_cursor{border:1px solid #344047}#scroll_page_place{background:#344047}a.link-blue:hover{color:#00a5ed!important}.gp-right_btn .gp-content{background-color:#404a51}.gp-right_btn .gp-content:hover{background:#818f99}.gp-right_btn .gp-active .gp-content{background:#344047}body,#main_wrap{color:#fff}.warning,.code_tag{background:#404a51;border:1px solid #333f45}.text_input,.friends_access_list,.button_block input,.form_button{border:1px solid #344047}.attach_block{background:#4d5961}.link_active,.item_clicked,.strong_clicked,.clicked .stnd-link,.stnd-link:active,.list-link-blue.clicked,body .stnd-link_active,.links-group .sublink .list-link:active,.links-group .stnd-link_arr.list-link-blue:active{color:#fff!important}.tabs__item:hover .tabs__link{color:#fff;background:#596671}.w_ava .mail__dialog_message::before{border-right-color:#404a51}.w_ava .mail__dialog_answer::before{border-right-color:#344047}.block-item__online{color:#31bf0f}.lenta_item,.poll_block{border:1px solid #344047}.att_size{color:#57a3ea}.mail__dialog_wrapper .blog-item_short_shared,.mail__dialog_wrapper .att_wrap{border:1px solid #344047}.error__item.list-link{border-bottom:1px solid #344047}.gallery_fileselector .gallery__image-wrapper{background:#404a51}.perimeter-border{border:1px solid #344047}.sp_btn_line{border-right:1px solid #344047!important}.btn-tools_centered .icon-link{border:1px solid #344047!important}.sp_plus_alert_y{border:1px solid #344047!important;background:#4d5961!important;color:#fff!important;-webkit-box-shadow:0 3px 5px #293238!important;-moz-box-shadow:0 3px 5px #293238!important;box-shadow:0 3px 5px #293238!important}#copy_url{color:#888}.sv b,.site-versions b{color:#fff}#sandbox_indicator{background:#4d5961 none repeat scroll 0 0!important;color:#a4b7c4}#page_counters>div{background-color:#404a51!important}#copy_url{background:#404a51!important}.bottom_fix{background:#404a51}.karma__plus,.karma__minus{border-bottom:1px solid #344047!important}.pc .mail__msg_checked:hover,.pc .mail__msg_checked.mail__new_msg:hover,.pc .mail__msg_checked.mail__new_msg_bg:hover,.mail__msg_checked{background:#344047!important}.location-bar a:hover{color:#fff}.bstrwrap{border-top:1px solid #344047!important}.stnd-block-yellow{background:#f9edbf!important}.content-bl__sep3{border-bottom:unset}.triangle-show.js-clicked::after{border-bottom-color:#344047}.dropdown-menu_top .table__cell .js-clicked::after{border-top-color:#344047}.table__cell .clicked::after{border-bottom-color:#344047}.table_cell_border{border-right:1px solid #344047!important}.btn-tools.js-clicked::after{border-bottom-color:#344047}.user__change-btn.js-clicked::after{border-bottom-color:#344047}.tabs .clicked .tabs__link::after{border-top-color:#344047}.triangle-show.triangle-block::after,.triangle-show.triangle-block::before{border-bottom-color:#344047}.action-bar-info .triangle-show::after{border-bottom-color:#404a51}.link_top-border{border-top:1px solid #344047}.f__title{color:#fff}.b-title_in-window{background:#4d5961!important;color:#fff}button,input[type='button'],input[type='submit'],input[type='reset'],.button{border:1px solid #344047;background:#4d5961}button:hover,input[type='button']:hover,input[type='submit']:hover,input[type='reset']:hover,.button:hover{background-color:#818f99}.sp_plus_line>span{background:#404a51!important}.sp_plus_line::before{border-bottom:1px solid #344047!important}.sp_plus_text{color:#7a90a0!important}div.main{border-left:1px solid #344047;border-right:1px solid #344047}.s_title{background:unset}#left_nav ul li.li{border-top:unset;border-bottom:unset}.location-bar a::after,.location-bar__title::after,.location-bar_no-break::after{background:unset}.carousel-bg{border-bottom:1px solid #344047}a.region_link:visited,.author_settings,a.region_link,.t-strong_special .gr{color:#57a3ea!important}.smiles_menu-back{border-top:1px solid #344047}.smiles_menu-header{background:#344047}.smiles_menu{border:1px solid #344047}.smiles_menu-body{background:#4d5961}.busi_switcher table .active_item,.busi_switcher table a:active{background:#4d5961}.busi_switcher table a,.busi_switcher table span.active_item{text-shadow:unset}.busi_switcher table a,.busi_switcher table span.active_item{border:1px solid #344047}.file_name,.search_bar,.more_link,.list_item,.edit_title_block,.busi_switcher table a,.edit_button{background:#344047}.busi_switcher table a:hover{background:#4d5961}.light_blue_bg{color:#fff}.vlight_border_bottom{border-bottom:1px solid #344047}.bubble-message{color:#fff}.text-block5,.text-block6,.text-block7{color:#fff}.replace_widget_wrapper+.list-link,.replace_widget_wrapper+.content-item3{border-top:1px solid #344047}.list-link__more-users{background:#404a51;color:#fff}.toolbar__wrap{background:unset}.stnd-block.error__msg{background:unset}.tile{background:#344047;color:#fff}.select_custom{color:#fff}.cnt-link:focus{color:#fff;background:#5b676f}.cnt-link:hover{background:#5b676f}.hover_bg:hover{background:#818f99}.suggest__item{background:#434b5a}a.service_link,a.service_link span,.service_item{color:#fff}.t-link_no_underline_block,.t-link_no_underline_block:hover{color:#fff}.t-link_no_underline:hover,.t-link_no_underline:hover span,.t-link_no_underline_block:hover .t-link_item_hover{color:#57a3ea}a.region_link:hover,.ewb:hover span,a.title_link:hover span,a.grey_link:hover,span.grey_link a:hover,.list_item div a:hover,.author_link:hover,.edit_label a:hover,a.user_link:hover,a.service_link:hover,a.service_link:hover span,.busi a:hover,a.arrow_link:hover span,.pag .pgar .page:hover,.edit_link,.sub_menu a:hover,a.icolink:hover,.neutral_link span,.tools_block a:hover,.url-btn-blue:hover,.file_comments_info a:hover,.sub_block a:hover,a.name_link:hover,.response:hover,.green_box a:hover span,.ufi a:hover span,.ufi a:hover{color:#57a3ea!important}a.region_link:hover,.ewb:hover span,a.title_link:hover,a.title_link:hover span,a.grey_link:hover,span.grey_link a:hover,.list_item div a:hover,.author_link:hover,.edit_label a:hover,a.user_link:hover,a.service_link:hover,a.service_link:hover span,.busi a:hover,a.arrow_link:hover span,.pag .pgar .page:hover,.edit_link,.sub_menu a:hover,a.icolink:hover,.neutral_link span,.tools_block a:hover,.url-btn-blue:hover,.file_comments_info a:hover,.sub_block a:hover,a.name_link:hover,.response:hover,.green_box a:hover span,.ufi a:hover span,.ufi a:hover{color:#57a3ea}.tab_title{color:#fff}.table__cell_last,.table_no_borders .table__cell{border-right:unset!important}.service_links_block_top,.pad_t_a{border-top:unset!important}.block-item__btn-wrap>div>a{border:1px solid #344047}.spo_desc{color:#57a3ea}a.red_link,a.red_link span,.red_item{color:red}.light_border_top{border-top:1px solid #344047}.text-input[readonly]{background:unset!important}.stnd-link,.stnd-block{color:#fff}.tabs_line{border-top:1px solid #344047}.tabs_block a:hover{background:#818f99}.tabs_block .tab_item{border:1px solid #344047;background:#404a51;color:#fff}.tabs_block .tab_active,.tabs_block .tab_active:hover{background:#4d5961!important;color:#fff}.list_item{background:#4d5961!important}.bottom_link_block,.search_bar,div.backlink,body .blue_bg{background:#4d5961}.user__tools_horiz-mode{border:1px solid #344047}.form-checkbox_w_descr .form-checkbox__label{color:#fff}.content-item_info{color:#344047!important}.sp_plus_checkbox_el+label{color:#fff!important}.chb-icons .ico_photo,.ico_photo_gray{background-position:-288px -180px!important}.sep-chb .form-checkbox,.form-checkbox_dropdown-menu{background:#4d5961;border-bottom:1px solid #344047}.drop-down-list_inner .drop-down-label{background:unset}.darkblue{color:#fff}.text-block7{color:#fff}.normal-stnd{color:#fff}.list-link:hover,.me6d43f28:hover,.list-link__wrap_hover .list-link,.tabs__item:hover,.btn-main:hover,.btn-block:hover,.user__tools-link:hover,a.user__tools-link:hover,.user-tile__btn:hover,a.hover-item:hover,.tile__bottom-link:hover,.btn-link:hover,.stnd-link:hover,.s-city__item:hover,.s-chb:hover,a:hover .bordered,.pgn__link_hover:hover,.links-group_grey .list-link.strong_clicked,.form-checkbox_dropdown-menu:hover,.dropdown-menu .list-link:hover,.dropdown-menu .list-link__wrap_hover .list-link{background:#596671!important}.gp-active .gp-content{background-color:#344047}#gp_playlist{background:#4d5961}#gp_window{border:unset}.att_wrap{background:#404a51}.quote,.blog-item_short_shared{background:#596771;color:#fff;border:1px solid #344047}.links-group .stnd-link,.links-group .list-link_arrow{border-bottom:1px solid #344047}.soc-separator{background:#4d5961}.sub-tabs{background:#4d5961}.message{background:#4d5961}.table__cell_block{background:#4d5961}.light_blue{background:#404a51}.user__tools-link{color:#fff!important}.flot-text{color:#fff!important}.site-link__wrapper{border-bottom:1px solid #344047}.stnd-link_profile,.stnd-block_profile{color:#7a90a0!important}.pgn__go,.pgn__go:hover{background-position:-396px -306px!important}.pgn__search_input:focus{background:#4d5961}.blue_border_bottom{border-bottom:1px solid #344047}.light_blue_bg{background:#404a51;border-bottom:1px solid #344047}.t-padd_right{padding-right:unset}#e0437eeb07,.pag,.search_bar,.bottom_link_block,.list_item,.button_block,.title_block,.sub_menu,.strong_border{border-bottom:1px solid #344047}.blue_wrap_block{background:#404a51}.pgn-wrapper .pgn{border-top:1px solid #344047}.sup_block{background:#4d5961}#main_shadow,#top_info_block{border-left:1px solid #344047}.list-link_online{color:#fff!important}.ico_services{background:url(https://" + gitPages + "/src/darkmode/ico_services.png) no-repeat}.ico_services_nick{background-position:0 -34px}.ico_services_stickers{background-position:-34px -34px}.ico_services_ads{background-position:0 0}.ico_services_nick{background-position:0 -34px}.ico_services_ghost{background-position:-34px 0}.ico_services_storage{background-position:-68px 0}.ico_services_head_icons{background-position:-68px -34px}.ico{background:url(https://" + gitPages + "/src/darkmode/ico.png) no-repeat}.ico_history_blue{background-position:-306px -18px}.ico_history_black,a:hover .ico_history_blue,a:active .ico_history{background-position:-306px -18px}.ico_info_b{background-position:-136px -146px}.ico_sites_b{background-position:-200px -102px}.ico_dating_b{background-position:-166px -102px}.clicked .ico_man{background-position:-288px -364px}.clicked .ico_woman{background-position:-324px -364px}.list-link:hover .ico_info{background-position:-234px -180px}.ico_lock_darkblue{background-position:-378px -126px}.inl-link .ico_arr{background-position:-414px -385px}.link-blue .ico_arr{background-position:-414px -385px!important}.link-stnd:hover .ico_arr7,.nl a:hover .ico_arr,.ico_arr8,.link-imp .ico_arr,.link-blue .ico_arr,.inl-link:hover .ico_arr{background-position:-414px -385px}.ico_forum_darkblue{background-position:-126px -274px}.ico_diary_darkblue{background-position:-288px 0}.ico_key_white{background-position:-378px 0}a:active .ico_exit,.link_active .ico_exit,a:active .ico_exit_blue{background-position:-306px -54px!important}.ico_photo_selected{background-position:-136px -112px}.ico_ac_all{background-position:-306px -310px}.ico_photo_select{background-position:-170px -146px}.ico_mode_na{background-position:-360px -72px}.ico_rate_up{background-position:-80px -198px}.ico_demo{background-position:-414px -130px}.ico_ban_list{background-position:-180px -310px}.ico_darr_left{background-position:-90px -364px}.ico_question_light{background-position:-234px -144px}.ico_ok,.ico_ok_green{background-position:-252px -108px!important}.ico_darr_right{background-position:-108px -364px}.ico_rotate_left{background-position:-54px -364px}.ico_rotate_right{background-position:-72px -364px}.ico_note{background-position:-198px -364px}.ico_ok_grey{background-position:-18px -364px}.ico_speaker{background-position:-72px -256px}.ico_close_btn_invers{background-position:0 -198px}.ico_locked{background-position:-378px -36px}.ico_status{background-position:-128px -180px}.ico_read_blue{background-position:-270px -292px}.ico_place{background-position:-396px -162px}.ico_arr4{background-position:-414px -321px}.ico_att{background-position:-144px -310px}.ico_mess,.chb-icons .form-checkbox_checked .ico_mess{background-position:-198px -274px}.ico_more_b{background-position:-54px -292px}.ico_no_results{background-position:-34px -146px}.ico_users_blue{background-position:-162px -328px}.ico_shared_grey{background-position:-198px -220px}.ico_shared_darkblue{background-position:-252px -18px}.ico_ac_all_grey,.drop-down-list_inner .drop-down-label .ico_ac_all{background-position:-324px -310px}.ico_filter{background-position:-396px -198px}.ico_search_people_blue{background-position:-378px -198px}.ico_mode_froffr{background-position:-71px -180px}.ico_delete_g{background-position:-324px -180px}.ico_plane_blue{background-position:-288px -310px}.ico_alert{background-position:-216px -364px}.ico_people_darkblue{background-position:-378px -270px}.ico_locked_large{background-position:-68px -146px}.ico_a{background-position:-126px -364px}.ico_plus_blue{background-position:-324px -270px}.ico_ac_group{background-position:-54px -328px}.ico_ac_password{background-position:-342px -288px}.ico_eye{background-position:-252px -310px}.ico_ac_fof,.ico_ac_fof_black,.ico_ac_fof_darkblue{background-position:-342px -198px}.ico_ac_friends{background-position:-342px -126px}.ico_ac_user{background-position:-342px -36px}.ico_mode_fronl{background-position:-162px -256px}.ico_extended,.ico_extended_on,.ico_extended_off{background-position:-396px -342px}.ico_short,.ico_short_on,.ico_short_off{background-position:-396px -324px}.ico_mobile_blue{background-position:-324px -126px}.ico_mail_blue{background-position:-324px -108px}.ico_enter_grey,body a.stnd-link_disabled .ico_enter_grey{background-position:-306px -144px}a.inl-link:hover .ico_shared_darkblue,.ico_shared_blue{background-position:-252px -18px}.ico_checked{background-position:-180px -364px}.ico_upload_blue{background-position:-396px -90px}.ico_shared_white{background-position:-198px -220px}.ico_befriends_blue{background-position:-144px -292px}.ico_ac_friends_darkblue,.ico-menu-toggle.js-clicked .ico_ac_friends,.drop-down-label.js-clicked .ico_ac_friends_black{background-position:-378px -270px}.ico_delete{background-position:-180px -256px}.ico_rate_down{background-position:-324px -72px}.ico_close_btn{background-position:-22px -198px}.ico_enter_blue{background-position:-306px -126px}.ico_add_darkblue{background-position:-396px -54px}.ico_profile,.ico_edit_dim{background-position:0 -292px}.site-link__wrapper{background:#4d5961}.ico_service_b{background-position:-200px -34px}.ico_career_b{background-position:-200px -68px}.ico_high_b{background-position:-102px -146px}.ico_ed_b{background-position:-132px 0}.ico_up{background-position:-360px 0}.ico_down{background-position:-360px -36px}.ico_plane{background-position:-234px -292px}.ico_read_on{background-position:-324px -18px}.ico_ac_fof_darkblue,.ico-menu-toggle.js-clicked .ico_ac_fof,.drop-down-label.js-clicked .ico_ac_fof_black{background-position:-342px -234px}.ico_edit_b,a:hover .ico_edit_darkblue,a:hover .no-text .ico_profile,.link-normal:hover .ico_profile,.inline-link:hover .ico_edit_dim,.link-grey:hover .ico_edit_dim,.link-dim:hover .ico_edit_dim{background-position:-324px -216px}.block-item{border-bottom:1px solid #344047;background:#4d5961!important}.ico_main_b{background-position:-200px -136px}.ico_befriends{background-position:-378px -288px}.ico_man{background-position:-288px -364px}.ico_woman{background-position:-324px -364px}.user__tools_horiz-mode .table__cell{border-right:1px solid #344047}.text-input:focus{background:#4d5961}.ico_compass{background-position:-166px -68px}.s-city__item_light:active,.s-city__item_light.clicked{color:#fff}.s-city__item_city.clicked,.s-city__item_light.clicked,.s-city__item_country.clicked{background:#4d5961}.s-city__item_light{color:#fff}.s-city__item{border-bottom:1px solid #344047}.s-city__wrap{background:#4d5961}.drop-down-label_single.js-clicked,.drop-down-label_single.js-clicked .t,.drop-down-label.js-clicked,.drop-down-label.js-clicked .t{color:#57a3ea!important}.list-link{color:#fff}.drop-down-label:hover,.drop-down-label:hover .t,.drop-down-label.js-clicked:hover,.drop-down-label.js-clicked:hover .t{color:#57a3ea!important}.drop-down-label{color:#fff}.ico_arr5,.ico_arr_bottom{background-position:-180px -238px}.ico_search_blue{background-position:-378px -162px}.b-title__spoiler{background:#4d5961}.attention{background:#4d5961;border:1px solid #344047}.ico_add_univer{background-position:0 -112px}.ico_add_school{background-position:-68px -112px}.ico_gifts_blue{background-position:-306px -198px}.ico_write,body a.stnd-link_disabled .ico_write,body a.stnd-link_disabled:active .ico_write,body .list-link.user__tools-link_disabled .ico_write,body .user__tools-link.user__tools-link_disabled .ico_write{background-position:-324px -54px!important}.ico_befriends_inprocess{background-position:-198px -292px}.ico_gifts,.stnd-link_disabled:active .ico_gifts,body .user__tools-link.user__tools-link_disabled .ico_gifts{background-position:-306px -180px}.ico_tort{background-position:-198px -256px}.ico_add_blue{background-position:-396px -36px}.ico_ed_middle{background-position:-360px -162px}.ico_settings_light{background-position:-234px -274px}.ico_ok_blue{background-position:-116px -198px}.ico_download,.ico_down_blue{background-position:-170px -198px}.ico_complaint{background-position:-288px -36px}.ico_read,body .list-link.user__tools-link_disabled:hover .ico_read,body .user__tools-link.user__tools-link_disabled .ico_read,body a.stnd-link_disabled .ico_read,body a.stnd-link_disabled:active .ico_read{background-position:-306px -292px}.ico_write,body a.stnd-link_disabled .ico_write,body a.stnd-link_disabled:active .ico_write,body .list-link.user__tools-link_disabled .ico_write,body .user__tools-link.user__tools-link_disabled .ico_write{background-position:-324px -54px}.ico_befriends_on{background-position:-162px -292px}.ico_question_grey{background-position:-126px -220px}.ico_download2_grey{background-position:-234px 0}.links-group .ico_arr_bottom,.drop-down-label_single.drop-down-label .ico_arr_bottom,.drop-down-list_inner .drop-down-label .ico_arr_bottom,.ico_arr_bottom_grey{background-position:-270px -180px}.ico_download2_blue{background-position:-206px -198px}.ico_plus_white{background-position:-360px -108px}.ico_galoom_white,.ico_galoom{background-position:-198px -346px}.ico_mail_white{background-position:-324px -90px}.ico_mymir_white,.soc-link .ico_mymir,.soc-link:active .ico_mymir,.soc-button .ico_mymir{background-position:-162px -346px}.ico_twitter_white{background-position:-108px -346px}.ico_fb_white,.soc-link .ico_fb,.soc-link:active .ico_fb,.soc-button .ico_fb{background-position:-180px -346px}.ico_odnk_white,.soc-link .ico_odnk,.soc-link:active .ico_odnk,.soc-button .ico_odnk{background-position:-144px -346px}.ico_vk_white,.soc-link .ico_vk,.soc-link:active .ico_vk,.soc-button .ico_vk{background-position:-126px -346px}.ico_rating{background-position:-36px -220px}.ico_info{background-position:-234px -180px}.ico_forum,.chb-icons .form-checkbox_checked .ico_forum{background-position:-144px -274px}.ico_user{background-position:-234px -72px}.ico_arrow{background-position:-414px -321px}.ico_com{background-position:-414px -166px}.ico_users_group{background-position:-90px -180px}.ico_user_online{background-position:-162px -220px}.ico_pause,.playing .p_i_t_pb_image{background-position:-414px -58px}.ico_reload_gray{background-position:0 -238px}.ico_download2{background-position:-188px -198px}.ico_plus_darkblue,.js-clicked .ico_plus_grey{background-position:-324px -288px}.ico_player_next{background-position:0 -364px}.ico_player_prev{background-position:-234px -90px}a:hover .ico_lenta_comments,.ico_soo_down,.ico_weather_xlarge,.ico_spacesru{background-position:0 -66px}.ico_play,body .p_i_t_pb_image{background-position:-414px -148px}.ico_ok_active{background-position:-252px -124px}.ico_arr,.ico_arr2{background-position:-414px -265px}.ico_arr3{background-position:-414px -237px}.ico_arr_bottom_white{background-position:-270px -162px}.location-bar__home-link{background-position:-396px 0}.ico_reload_darkblue{background-position:-252px -216px}.ico_remove,body input[type='submit'].delete-btn{background-position:-378px -306px}.help-block{border-bottom:1px solid #344047}.p_i_p_progressLine{background-color:#9ab2cc}.ico_friends_grey{background-position:-252px -364px}.ico_settings{background-position:-98px -198px}.ico_fav,.ico_fav_grey{background-position:-216px -256px}.ico_more{background-position:-36px -292px}.ico_fav_on{background-position:-252px -256px}.ico_add{background-position:-270px -274px}.ico_history{background-position:-306px 0}.ico_exit{background-position:-306px -54px}.ico_plus_grey{background-position:-180px -328px}.ico_smile{background-position:-396px -126px}.ico_plus{background-position:-62px -198px}.ico_arrow-back,.ico_arr11{background-position:-414px -349px}.ico_upload{background-position:-396px -72px}.ico_gb{background-position:-126px -256px}.ico_blog{background-position:-144px -256px}.ico_game{background-position:-288px -90px}.ico_photo,.chb-icons .form-checkbox_checked .ico_photo{background-position:-288px -162px}.ico_music,.chb-icons .form-checkbox_checked .ico_music{background-position:-288px -252px}.ico_video,.chb-icons .form-checkbox_checked .ico_video{background-position:-36px -274px}.ico_file,.chb-icons .form-checkbox_checked .ico_file{background-position:-90px -274px}.ico_comm{background-position:-52px -180px}.ico_friends{background-position:-306px -234px}.ico_readers{background-position:-109px -180px}.ico_readers{background-position:-109px -180px}.ico_int_people{background-position:-306px -270px}.ico_add_user{background-position:-166px 0}.ico_wait{background-position:-252px -198px}.player_item{color:#fff!important}.gp-playlist_active{background:#344047!important}.stnd_padd{background:#4d5961}.light_border_bottom{border-bottom:1px solid #344047;background:#4d5961!important}.upper_case{color:#a7b8c6}.gp-info_wrap{color:#fff}.gp-content:hover{background-color:#818f99}.gp-content{background-color:#4d5961}.user__tools{border-bottom:1px solid #344047}.user__details{color:#a7b8c6}.blog-toolbar{color:#a7b8c6}.switch__item{background:#344047}.switch__item_current{background:#4d5961!important;color:#fff}.text-input{border:1px solid #344047;background:#4d5961;color:#fff}.btn-min{border:1px solid #344047}.text-input-wrapper_inline{border:1px solid #344047}.tabs__item_disabled,.tabs__item_disabled:active{background:#4d5961!important}.dropdown-menu_text{background:#4d5961}.pgn__button:active,.pgn__button_press,.pgn__button_press:hover,.mail__button:active{color:#7a90a0!important;background:#344047!important;-webkit-box-shadow:inset 0 3px 5px #293238!important;-moz-box-shadow:inset 0 3px 5px #293238!important;box-shadow:inset 0 3px 5px #293238!important}.pgn__search_input{background:#4d5961;border:1px solid #373f46;-webkit-box-shadow:inset 0 3px 5px #374047;-moz-box-shadow:inset 0 3px 5px #374047;box-shadow:inset 0 3px 5px #374047}.mail__dialog_message{background:#404a51}.mail__dialog_answer{background:#344047}.mail__dialog_text{color:#fff!important}.comm_selected .comm{background:#344047}.system-message_alert{color:#ff6837!important;background:#f9edbf}.info-item{color:#fff}.content-bl{color:#fff}.b-title__all::before{content:unset}a:hover .b-title__all{background:#344047}.file_name,.search_bar,.more_link,.list_item,.edit_title_block,.busi_switcher table a,.edit_button{color:#fff}.links-group_sections .list-link:hover{color:#fff!important}.list-link-grey:active,.inl-link.js-clicked,.l-gr .list-link:active,.links-group .list-link:active,.list-link:active .lgrey2,body .links-group .list-link-blue:active{color:#fff!important}.bubble::after,.user__status::after{border-bottom-color:#404a51}.bubble,.user__status{background:#404a51;color:#a7b8c6}#wrap_all{background:#4d5961}.ico_mail{background:url(https://" + gitPages + "/src/darkmode/ico_mail.png) no-repeat}.ico_mail_inbox{background-position:0 -126px}.ico_mail_fav{background-position:-90px -54px}.ico_mail_write{background-position:-32px -126px}.ico_mail_restore_grey{background-position:-17px -108px}.ico_mail_spoiler{background-position:-72px -54px}.ico_mail_message{background-position:-68px -108px}.ico_mail_fav_blue{background-position:-90px -18px}.ico_mail_archive_blue{background-position:-126px -54px}.ico_mail_spam_blue{background-position:-18px -90px}.ico_mail_garbage_blue{background-position:-126px 0}.ico_mail_cog_blue{background-position:-54px -18px}a.inl-link:hover .ico_cats_city,.ico_cats_city_black,.ico_leads,.ico_mail_quote,#present_link span{background-position:-36px -36px}.ico_cats_news_black,a:active .ico_cats_news,a.stnd-link_active .ico_cats_news,.ico_cats_news_black,.ico_mail_link{background-position:-18px -72px}.ico_cats_subculture_black,a:active .ico_cats_subculture,a.stnd-link_active .ico_cats_subculture,.ico_cats_subculture_black,.ico_chat_journal_blue,.ico_mail_color,.pc .voteDownCnt:hover span,.voteDownCnt span.on,.pc .voteDownCnt:hover span.on{background-position:-18px -54px}.ico_settings_black_blue,.ico_mail_bold,.voteDownCnt span{background-position:-18px 0}.ico_rules,.ico_mail_italic,.voteUpCnt span{background-position:0 -18px}.ico_journal,.ico_mail_underline,#mail_link span{background-position:-36px 0}.ico_cats_rpg_black,a:active .ico_cats_rpg,a.stnd-link_active .ico_cats_rpg,.ico_cats_rpg_black,.ico_people_in_viktorina,.ico_mail_strike,#bookmark_link span{background-position:0 -36px}.ico_mail_code{background-position:-18px -126px}.ico_mail_background,#comment_link span{background-position:-72px 0}.ico_mail_picture{background-position:0 0}.ico_mail_music{background-position:-90px -36px}.ico_mail_video{background-position:-108px -52px}.f__ico_contacts,.ico_files_zip,.ico_mail_file{background-position:-126px -72px}.ico_mail_spam,.mail__button.disabled:active .ico_mail_spam{background-position:-36px -90px}.ico_mail_garbage_red{background-position:-108px -88px}.ico_mail_attach{background-position:-54px -72px}.ico_attaches{background:url(https://" + gitPages + "/src/darkmode/ico_attaches.png) no-repeat}.ico_attaches_picture{background-position:-18px -18px}.ico_attaches_poll{background-position:-36px 0}.ico_attaches_file{background-position:-18px -36px}.ico_attaches_music{background-position:0 -18px}.ico_attaches_attach{background-position:-18px 0}#sidebar_wrap{background:#4d5961}.ico_mail_receive{background-position:-104px -108px!important}.ico_mail_archive{background-position:-126px -36px!important}.ico_mail_garbage{background-position:-51px -108px!important}#left_nav ul li.li a,.s_title{color:#fff}.s_i{background:url(https://" + gitPages + "/src/darkmode/ico_sidebar_pc.png)no-repeat!important;width:16px;height:16px}.s_i_spaceplus{background-position:-126px -128px!important}.s_i_cake{background-position:-18px 0!important}.s_i_exchange{background-position:-36px -36px!important}.s_i_love{background-position:0 -72px!important}.s_i_music{background-position:-72px -36px!important}.s_i_diary{background-position:-36px 0!important}.s_i_community{background-position:0 -18px!important}.s_i_forum{background-position:-36px -54px!important}.s_i_chat{background-position:0 -36px!important}.s_i_games{background-position:-54px -18px!important}.s_i_announcement{background-position:-72px 0!important}.s_i_people{background-position:0 -54px!important}.s_i_guestbook{background-position:0 -126px!important}.s_i_files{background-position:-126px -18px!important}.s_i_videos{background-position:-126px -54px!important}.s_i_photos{background-position:-126px -90px!important}.s_i_city{background-position:-108px -36px!important}.s_i_mobiles{background-position:-72px -72px!important}.s_i_info{background-position:-90px -18px!important}.s_i_favorites{background-position:-72px -126px!important}.s_i_friends{background-position:0 -108px!important}.s_i_history{background-position:-36px -126px!important}.s_i_links{background-position:-108px -108px!important}.s_i_options,.s_i_menu{background-position:-108px -72px!important}.s_i_allservices_gray{background-position:-72px -108px!important}.s_i_help{background-position:-90px -54px!important}.s_i_exit{background-position:-36px -108px!important}.left_nav_search_input,.reg_text_input{background:#434b5a;border:1px solid #232833}#left_nav ul li.li a:hover{background:#818f99}.s_title,#left_nav ul li.li a.title_link{color:#fff}.left_nav_search_input:hover{background:#434b5a}#main_search_input{color:#c4ccda}body #left_nav ul li.li a:active{color:#fff;background:#344047;-webkit-box-shadow:inset 0 3px 5px #192228;-moz-box-shadow:inset 0 3px 5px #192228;box-shadow:inset 0 3px 5px #192228}.left_nav_padding input.search__btn:focus{background:#434b5a}.main,#logo_panel,.item_head_bg{background:#404a51}.location-bar{color:#fff;background:#4d5961;-webkit-box-shadow:0 3px 5px #293238;-moz-box-shadow:0 3px 5px #293238;box-shadow:0 3px 5px #293238}.location-bar::after{background:#4d5961}.tile-menu__title{color:#fff}.tile-menu__link{background:#4d5961;-webkit-box-shadow:0 3px 5px #293238;-moz-box-shadow:0 3px 5px #293238;box-shadow:0 3px 5px #293238}.pc .tile-menu__link:hover{background:#596671}.tile-menu__link:active{background:#344047!important;-webkit-box-shadow:inset 0 3px 4px #293238;-moz-box-shadow:inset 0 3px 4px #293238;box-shadow:inset 0 3px 4px #293238}.search__input:focus{background:#434b5a}.search__input{background:#434b5a;border:1px solid #232833;color:#fff}.b-title__link,.b-title__item{color:#fff!important}.widgets-group,.m44f47fd1,.spoiler_inject::before,.our_spo_inj::before,.content-item,.dropdown-menu_text,.btn-single,.tabs::before,.spaced-group a,.user-tile__similarity-wrapper,.pgn,.shdw,.ma74074b9{-webkit-box-shadow:0 3px 5px #293238;-moz-box-shadow:0 3px 5px #293238;box-shadow:0 3px 5px #293238}.b-title{background:#344047}.b-title__link:hover,.header_links_fixer a:hover{background:#4d5961}.page_fixer{background:#404a51}.b-title__all{background:#344047}.carousel-bg{background:#4d5961}.b-title__all::before,.b-title__edit-link::before{background:#344047}.carousel-prev .carousel-edges_shadow{left:10px}.list-link{background:#4d5961;border-bottom:1px solid #344047}.blog-item__author,.blog-item__time,.normal-light{color:#fff}.list-link:hover,.me6d43f28:hover,.list-link__wrap_hover .list-link,.tabs__item:hover,.btn-main:hover,.btn-block:hover,.user__tools-link:hover,a.user__tools-link:hover,.user-tile__btn:hover,a.hover-item:hover,.tile__bottom-link:hover,.btn-link:hover,.stnd-link:hover,.s-city__item:hover,.s-chb:hover,a:hover .bordered,.pgn__link_hover:hover,.links-group_grey .list-link.strong_clicked,.form-checkbox_dropdown-menu:hover,.dropdown-menu .list-link:hover,.dropdown-menu .list-link__wrap_hover .list-link{background:#818f99}.list-link-darkblue,.links-group .list-link_arrow,.links-group .list-link-darkblue,.links-group .stnd-link_profile{color:#fff!important}.list-link-darkblue .cnt{color:#57a3ea}.wbg{background:#4d5961!important}.block-item__descr{color:#fff}.content-usr{background:#4d5961;-webkit-box-shadow:0 3px 5px #293238;-moz-box-shadow:0 3px 5px #293238;box-shadow:0 3px 5px #293238}.black{color:#fff}.table__cell{border-right:1px solid #344047}.stnd-link,.stnd-block{color:#fff;background:#4d5961}.user__tools{border-top:1px solid #344047}.list-link_online{-webkit-box-shadow:0 3px 4px #293238;-moz-box-shadow:0 3px 4px #293238;box-shadow:0 3px 4px #293238}.no-break::before{display:none}.blog-item__subject,.blog-item__channel,.blog-item_short_shared .black{color:#fff}.blog-item__title{color:#fff}.content-bl{background:#4d5961}#main_page a:visited,a,a.edit_link:visited,a.user_link:visited,.tools_block a,.sub_menu a,.inl-link,.link-stnd,.text-title,.nl a,.link-darkblue,.anketa__rate-link,.info-item__descr a,.info-item__descr-link,.drop-down-label.drop-down-label_spoiler,.t-strong_item,.blog-item__title,.list-link__name,.md77b4724,.f_descr_text,a.arrow_link span,.ufi a span,.response,.url-btn,.edit_widget_title,.ewb span{color:#57a3ea}.list-link__text{color:#fff}.mysite-nick{color:#fff}.text-color,.links-group_important .list-link.clicked{color:#fff!important}.link-return{color:#57a3ea!important}.comm{background:#4d5961;border-bottom:1px solid #344047}.text,.text_anketa{color:#fff}.spoiler_inject,.our_spo_inj{background:#404a51}.dropdown-menu__wrap{background:#344047;-webkit-box-shadow:0 3px 5px #293238;-moz-box-shadow:0 3px 5px #293238;box-shadow:0 3px 5px #293238}.links-group_grey .list-link,.links-group_grey .stnd-link{color:#fff!important}.list .stnd-link{border-bottom:1px solid #344047}.tabs{background:#4d5961}.tabs__link{color:#fff}.list-link:active,.me6d43f28:active,.soc-links .list-link_soc.clicked,.soc-links .list-link_soc:active,.dropdown-menu .list-link:active,.user__tools-link:active,a.user__tools-link:active,a.user__tools-link.clicked,button.user__tools-link:active,.tabs__item:active,.btn-link:active,.user-tile__btn:active,.clicked,.tabs__item.clicked,.stnd-link.clicked,.header_links_fixer a:active,.clicked .stnd-link,.list-link.clicked,.dropdown-menu .list-link.clicked,label.user__tools-link.clicked,label.user__tools-link.clicked:hover,a.hover-item:active,.js-clicked .btn-single,.js-clicked .btn-single:hover,a.hover-item.clicked,.stnd-link:active,.stnd-link.attention_block:active,body .stnd-link_active,body .stnd-link_active:hover,.s-chb:active,.tile__bottom-link:active,.s-city__item:active,.c-letter__more-btn,.form-checkbox_dropdown-menu:active,.pgn__link_hover:active,.b-title__link:active,.s-city__item_city.clicked:active,.s-city__item_light.clicked:active,.s-city__item_country.clicked:active,.dropdown-menu .list-link.strong_clicked_active,.btn-main:active,.btn-block:active,a.item_clicked,a.item_clicked:hover,.js-dd_menu_link.strong_clicked,.user-tile__btn.js-clicked{background:#344047;-webkit-box-shadow:inset 0 3px 5px #293238;-moz-box-shadow:inset 0 3px 5px #293238;box-shadow:inset 0 3px 5px #293238}.tabs .clicked::before{display:none}.content-widget{background:#4d5961}.cnt_tabs{border:1px solid #becedd;color:#57a3ea}.drop-down-label:hover,.drop-down-label:hover .t,.drop-down-label.js-clicked:hover,.drop-down-label.js-clicked:hover .t{color:#61a961}.static-bl{background:#4d5961;border-bottom:1px solid #344047;color:#fff}.bg-white,.dropdown-menu .list-link{background:#4d5961}.sep-item{border-bottom:2px solid #344047}.table__cell_block{border-bottom:1px solid #344047}.btn-link{border:1px solid #344047;background:#4d5961}.anketa__rate-cnt,.sub-title{color:#fff}.cnt{border:1px solid #344047}.sub-title .cnt,.list-link-darkblue:active .cnt,.stnd-link_profile:active .cnt{color:#57a3ea}.btn-single{background:#4d5961;color:#fff}.stnd-link_important,.links-group .stnd-link_arr.list-link-blue{color:#fff!important}.block-item{background:#404a51}.pgn{background:#4d5961}.table_top_border{border-top:1px solid #344047!important}.oh break-word{color:#fff}.content,.list_spaced{background:#4d5961}.content-item3{color:#fff}.form-checkbox_full,.f-c_fll .form-checkbox{border-bottom:1px solid #344047}.user__tools-link{background:#4d5961}.list-link-blue,.stnd-link_important,.links-group .stnd-link_arr.list-link-blue{color:#fff}.stnd_padd{color:#fff}.form-checkbox_checked{color:#fff!important}.content-bl__sep,.content-bl__sep2,.text_anketa_sep{border-bottom:1px solid #344047}.action-bar{border-top:1px solid #344047}button.btn-main,input[type='submit'].btn-main,.btn-main:visited,.btn-main,.btn-block{background:#4d5961;color:#fff}.light_bg{background:#404a51}.toolbar td,.toolbar .hide td:last-child{border-right:1px solid #344047}.toolbar__wrap table{border:1px solid #344047}.toolbar .list-link{border-bottom:1px solid #344047}.text_distinguish{color:#57a3ea!important}.green,.green_link,.link-green,a.green_link span,#e0437eeb07 a{color:#56e456}.mail__button{background:#4d5961!important}.mail__button.disabled,.mail__button.disabled:focus,.mail__button.disabled:hover{background:#4d5961!important;color:#fff!important;opacity:unset}.mail__message_text.m_my_not_read{background:#344047}.pgn__button:hover,.mail__button:hover{background:#4d5961!important;color:#fff}.pgn__button,.mail__button{color:#fff}.color-black-light{color:#fff}.content-bl__top_sep{border-top:1px solid #344047}.b-title__edit-link::after,.b-title__edit-link::before{background:#344047}.ico_cats{background:url(https://" + gitPages + "/src/darkmode/ico_cats.png) no-repeat}.ico_cats_news,.ico_cats_news_black{background-position:-80px -54px}.ico_cats_game,.ico_cats_game_black{background-position:-36px -178px}.ico_cats_humor,.ico_cats_humor_black{background-position:-134px 0}.ico_cats_programm,.ico_cats_programm_black{background-position:0 -144px}.ico_cats_internet,.ico_cats_internet_black{background-position:-18px -90px}.ico_cats_science,.ico_cats_science_black{background-position:-134px -72px}.ico_cats_auto,.ico_cats_auto_black{background-position:-169px -96px}.ico_cats_sport,.ico_cats_sport_black{background-position:-116px 0}.ico_cats_business,.ico_cats_business_black{background-position:-144px -144px}.ico_cats_hobby,.ico_cats_hobby_black{background-position:-126px -144px}.ico_cats_video,.ico_cats_cinema,.ico_cats_cinema_black{background-position:-152px -36px}.ico_cats_music,.ico_cats_music_black{background-position:-17px -126px}.ico_cats_design,.ico_cats_design_black{background-position:-34px -126px}.ico_cats_book,.ico_cats_book_black{background-position:-159px -160px}.ico_cats_philosophy,.ico_cats_philosophy_black{background-position:-152px -90px}.ico_cats_relationship,.ico_cats_relationship_black{background-position:0 -108px}.ico_cats_politic,.ico_cats_politic_black{background-position:-72px -144px}.ico_cats_education,.ico_cats_education_black{background-position:-134px -36px}.ico_cats_remont,.ico_cats_remont_black{background-position:-36px -72px}.ico_cats_remont,.ico_cats_remont_black{background-position:-36px -72px}.ico_cats_animal,.ico_cats_animal_black{background-position:-62px -18px}.ico_cats_cook,.ico_cats_cook_black{background-position:-187px 0}.ico_cats_moda,.ico_cats_moda_black{background-position:-98px 0}.ico_cats_health,.ico_cats_health_black{background-position:-54px -108px}.ico_cats_travel,.ico_cats_travel_black{background-position:-98px -54px}.ico_cats_spaces,.ico_cats_spaces_black{background-position:-33px -160px}.ico_cats_other,.ico_cats_other_black{background-position:-44px -18px}.ico_cats_dating,.ico_cats_dating_black{background-position:-169px -32px}.ico_cats_rpg,.ico_cats_rpg_black{background-position:-80px -18px}.ico_cats_house,.ico_cats_house_black{background-position:-124px -126px}.ico_cats_sex,.ico_cats_sex_black{background-position:-87px -160px}.ico_cats_photo,.ico_cats_photo_black{background-position:-116px -54px}.ico_cats_profession,.ico_cats_profession_black{background-position:-169px -141px}.ico_cats_subculture,.ico_cats_subculture_black{background-position:-54px -54px}.ico_cats_city,.ico_cats_city_black{background-position:-18px -36px}.ico_cats_gadget,.ico_cats_gadget_black{background-position:-187px -88px}.ico_chat{background:url(https://" + gitPages + "/src/darkmode/ico_chat.png) no-repeat}.ico_journal,.ico_mail_underline,#mail_link span{background-position:-36px 0}.ico_rules,.ico_mail_italic,.voteUpCnt span{background-position:0 -18px}.ico_settings_black_blue,.ico_mail_bold,.voteDownCnt span{background-position:-18px 0}.ico_lock_open,#shared_link span.on{background-position:-54px -36px}.ico_lock,#shared_link span{background-position:-54px -18px}.ico_rings{background-position:0 -54px}";
                        sdm.setAttribute("sp-darkmode", "1  ");
                        parent.appendChild(sdm);
                        if (_SETTINGS.darkModeNav) {
                            var sdm = main.qs("#SP_PLUS_DARKMODE_NAV") || main.ce("style", {
                                id: "SP_PLUS_DARKMODE_NAV",
                                type: "text/css"
                            });
                            sdm.innerHTML = "#left_nav{border-top: 1px solid #344047;}#navi,.sidebar-logo,.unauth_header,.horiz-placeholder,.horiz-menu_bottom{color:#fff;background:#344047;border-bottom:1px solid #344047;border-left:1px solid #344047;border-right:1px solid #344047}.footer{background-color:#344047}.footer__link{border-color:#283238}.footer__link_edit .footer__link,.footer__link_tool .footer__link,.footer__link_moder .footer__link{border-color:#283238}";
                            sdm.setAttribute("sp-darkmode-nav", "1");
                            parent.appendChild(sdm);
                        }
                    } else if (!_SETTINGS.darkMode && sdm && sdm.hasAttribute("sp-darkmode") && !t) {
                        sdm.removeAttribute("sp-darkmode");
                        parent.removeChild(sdm);
                        var nav = document.getElementById('SP_PLUS_DARKMODE_NAV');
                        if (nav) {
                            parent.removeChild(nav)
                        }
                    }
                } catch (e) {
                    main.console.error('Ошибка (DARKMODE): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            },
            darkModeNav: function(t) {
                try {
                    var parent = document.getElementsByTagName('head').item(0);
                    var sdm = main.qs("#SP_PLUS_DARKMODE_NAV") || main.ce("style", {
                        id: "SP_PLUS_DARKMODE_NAV",
                        type: "text/css"
                    });
                    var dmNav = main.ce("div", {
                        id: "SP_DARKMODE_WRAP",
                        class: "stnd-link",
                        style: "border-bottom: unset;"
                    });
                    var dm = main.ce("input", {
                        type: "checkbox",
                        id: "sp_darkMode_nav",
                        class: "sp_plus_checkbox_el",
                        checked: _SETTINGS.darkModeNav,
                        onclick: function(t) {
                            _SETTINGS.darkModeNav = t.target.checked;
                            var jsonSet = JSON.stringify(_SETTINGS);
                            main.setCookie("SP_PLUS_SET", jsonSet, null);
                            if (sdm && !sdm.hasAttribute("sp-darkmode-nav") && t) {
                                sdm.innerHTML = "#left_nav{border-top: 1px solid #344047;}#navi,.sidebar-logo,.unauth_header,.horiz-placeholder,.horiz-menu_bottom{color:#fff;background:#344047;border-bottom:1px solid #344047;border-left:1px solid #344047;border-right:1px solid #344047}.footer{background-color:#344047}.footer__link{border-color:#283238}.footer__link_edit .footer__link,.footer__link_tool .footer__link,.footer__link_moder .footer__link{border-color:#283238}";
                                sdm.setAttribute("sp-darkmode-nav", "1");
                                parent.appendChild(sdm);
                            } else if (!_SETTINGS.darkModeNav && sdm && sdm.hasAttribute("sp-darkmode-nav")) {
                                sdm.removeAttribute("sp-darkmode-nav");
                                parent.removeChild(sdm);
                            }
                        }
                    });
                    var dmCheck = main.ce("label", {
                        attr: {
                            "for": "sp_darkMode_nav"
                        },
                        html: "Темный цвет шапки и подвала"
                    });
                    dmNav.appendChild(dm);
                    dmNav.appendChild(dmCheck);
                    main.insertAfter(dmNav, t.parentNode);
                } catch (t) {
                    main.console.error('Ошибка (DARKMODE-NAV): ' + t.name + ":" + t.message + "\n" + t.stack);
                }
            },
            setStyle: function() {
                var rev = main.service(1);
                var parent = document.getElementsByTagName('head').item(0);
                var stl = main.qs("#SP_PLUS_INJSTYLE") || main.ce("style", {
                    id: "SP_PLUS_INJSTYLE",
                    type: "text/css"
                });
                stl.innerHTML = ".sp_plus_line_c:before{content:'';display:block;border-bottom:1px solid #cdd4e1;left:48px;right:80px;top:50%;position:absolute}.sp_plus_line_c{position:relative;}ul>li{margin: 10px;}.close_h:hover{opacity: 0.8;}@media (min-width: 1024px){.w400{max-width: 400px;}}#main_shadow, #top_info_block{border-left:unset}.border{border:1px solid #b4bed1}#check_point_full_info{background:#4d5961;box-shadow: 0 3px 5px #293238}.tree_element:hover > .ns, #debug .check_point:hover{background:#818f99}#debug{border:unset;background:#4d5961;}.disabled{cursor:not-allowed;}div.row4{color:#000}input[type=range]{background:transparent;height:0;-webkit-appearance:none;margin:10px 0;width:100%}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;animate:.2s;background:#395387;border-radius:32px;border:0 solid #000}input[type=range]::-webkit-slider-thumb{border:0 solid #2497E3;height:10px;width:10px;border-radius:4px;background:#395387;cursor:pointer;-webkit-appearance:none;margin-top:0}input[type=range]:focus::-webkit-slider-runnable-track{background:#D2E3F4}input[type=range]::-moz-range-track{-webkit-box-shadow:inset 0 1px 2px #7690c7;-moz-box-shadow:inset 0 1px 2px #7690c7;box-shadow:inset 0 1px 2px #7690c7;width:100%;height:10px;cursor:pointer;animate:.2s;background:#D2E3F4;border-radius:32px;border:0 solid #000}input[type=range]::-moz-range-thumb{border:0 solid #2497E3;height:10px;width:10px;border-radius:4px;background:#395387;cursor:pointer}input[type=range]::-ms-track{width:100%;height:10px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}input[type=range]::-ms-fill-lower{background:#D2E3F4;border:0 solid #000;border-radius:64px}input[type=range]::-ms-fill-upper{background:#D2E3F4;border:0 solid #000;border-radius:64px}input[type=range]::-ms-thumb{margin-top:1px;border:0 solid #2497E3;height:10px;width:10px;border-radius:4px;background:#395387;cursor:pointer}input[type=range]:focus::-ms-fill-lower{background:#D2E3F4}input[type=range]:focus::-ms-fill-upper{background:#D2E3F4}input[type=range]::-moz-range-progress{border-radius:4px;height:10px;background-color:#395387}input[type=range]::-ms-fill-lower{border-radius:4px;height:10px;background-color:#395387}.brdtop{border-top:1px solid #c5d3e1}#SP_PLUS_SETAREA{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}details summary:hover{cursor:pointer}.sp_plus_alert_y{border:1px solid #cdd4e1;border-radius:5px;color:#7a90a0;display:block;font-family:sans-serif;font-weight:700;height:auto;padding:17px;position:fixed;text-align:center;margin-left:-156px;top:10%;left:50%;max-height:80%;width:275px;z-index:99999;background:#fff;-webkit-box-shadow:0 3px 5px rgba(93,109,157,.3);-moz-box-shadow:0 3px 5px rgba(93,109,157,.3);box-shadow:0 3px 5px rgba(93,109,157,.3)}.null{display:none!important}.sp_plus_alertg,.sp_plus_small{background-color:#ddebf7}.sp_plus_small{margin:2px;color:#000;display:block;padding:3px;border-radius:2px}.sp_plus_small img{height:auto!important}.sp_plus_a{text-decoration:none!important;border-bottom:1px dashed}.sp_plus_alertr{background-color:#f9e1d9;color:#ff6837}.sp_plus_alertg,.sp_plus_alertr{background-clip:border-box;background-image:none;background-origin:padding-box;box-shadow:rgba(57,83,135,.3) 0 3px 5px 0;display:block;padding:10px;position:relative;font-size:13px}.ico_history_black,a:hover .ico_history_blue,a:active .ico_history{background-position:-306px -54px}.sp_plus_ico_alert,.sp_plus_ico_del,.sp_plus_ico_info,.sp_plus_ico_okb,.sp_plus_ico_fav_off,.sp_plus_ico_fav_on{background-color:transparent;background-image:url(" + _PROTOCOL + "//spac.me/i/ico.png?r=" + rev + ");cursor:pointer;display:inline-block;height:16px;margin-bottom:2px;margin-right:4px;vertical-align:middle;text-align:center;width:16px}.sp_plus_ico_del{background-position:-198px -256px}.sp_plus_ico_okb{background-position:-122px -198px}.sp_plus_ico_alert{background-position:-108px -364px;cursor:default}.sp_plus_ico_info{background-position:-142px -52px;cursor:default}.sp_plus_ico_fav_off{background-position:-216px -256px}.sp_plus_ico_fav_on{background-position:-252px -256px}.sp_plus_button{cursor:pointer;background:#fff}.sp_plus_button:hover{background:#ecf5fd}.sp_plus_checkbox+label,.sp_plus_checkbox_el+label,.sp_plus_checkbox_radio+label{position:relative;overflow:hidden;cursor:pointer;text-decoration:none!important}.sp_plus_checkbox+label{margin-left:5px;padding:0 4px;vertical-align:top;width:16px;height:16px;display:inline-block}.sp_plus_checkbox_el+label,.sp_plus_checkbox_radio+label{padding:12px 5px 12px 25px}.sp_plus_checkbox+label:before,.sp_plus_checkbox_el+label:before{position:absolute;display:inline-block;content:'';background-position:-72px -220px;width:16px;height:16px;background-color:transparent;background-image:url(" + _PROTOCOL + "//spac.me/i/ico.png?r=" + rev + ")}.sp_plus_checkbox+label:before,.sp_plus_checkbox_radio+label:before{position:absolute;display:inline-block;content:'';background-position:-252px -36px;width:16px;height:16px;background-color:transparent;background-image:url(" + _PROTOCOL + "//spac.me/i/ico.png?r=" + rev + ")}.sp_plus_checkbox_el+label:before{left:3px;top:12px}.sp_plus_checkbox_radio+label:before{left:3px;top:12px}.sp_plus_checkbox+label:before{top:8px;margin-top:-8px}.sp_plus_checkbox:checked+label:before,.sp_plus_checkbox_el:checked+label:before,.sp_plus_checkbox_radio:checked+label:before{background-position:-252px -108px}.sp_plus_checkbox,.sp_plus_checkbox_el,.sp_plus_checkbox_radio{position:absolute;left:-10000px}.sp_plus_line>span{background:#fff;padding:0 5px;position:relative;margin:0 10px;display:inline-block}.sp_plus_line:before{content:'';display:block;border-bottom:1px solid #cdd4e1;left:0;right:0;top:50%;position:absolute}.sp_plus_line{text-align:center;position:relative;font-weight:700}.sp_plus_text{color:#395387}.sp_plus_liness{border-top:1px solid #344047!important}.bstrwrap{border-bottom:unset!important;border-top:1px solid #cdd4e1}.ico_demo{background-position:-414px -130px}input[type='color']{opacity:0;cursor:pointer}.sp_btn_line{border-right:1px solid #cdd4e1}.ico_backup{display:inline-block;background:url(data:image/png;base64,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) no-repeat;width:16px;height:16px;margin:0 4px -3px 0}.sp_plus_ico_ref{display:inline-block;background:url(data:image/png;base64,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)no-repeat;width:16px;height:16px;margin:0 4px -3px 0}";
                if (_SETTINGS.bodystyle) {
                    if (_SETTINGS.bodystyleSetting.url && _SETTINGS.bodystyleSetting.urlchecked) stl.innerHTML += 'body,#main_wrap{background-image:url(' + _SETTINGS.bodystyleSetting.url + ')}';
                    if (_SETTINGS.bodystyleSetting.color && _SETTINGS.bodystyleSetting.colorchecked) stl.innerHTML += 'body,#main_wrap{background-color:' + _SETTINGS.bodystyleSetting.color + '}';
                }
                if (_SETTINGS.msgAlert) {
                    if (_SETTINGS.msgAlertSettings.animDelay && _SETTINGS.msgAlertSettings.alertPosition) {
                        var mailContainer;
                        var mailBox;
                        switch (_SETTINGS.msgAlertSettings.alertPosition) {
                            case "1":
                                mailContainer = 'bottom: 0px; right: 0px; top:0px; left:0px; height: 1px; width: 1px;'
                                mailBox = 'margin-bottom: 10px;'
                                break;
                            case "2":
                                mailContainer = 'top: 0px; right: 0px; height: 1px;'
                                mailBox = 'margin-bottom: 10px;'
                                break;
                            case "3":
                                mailContainer = 'bottom: 0px; left: 0px; width: 1px;'
                                mailBox = 'margin-top: 10px;'
                                break;
                            default:
                                mailContainer = 'bottom: 0px; right: 0px;'
                                mailBox = 'margin-top: 10px;'
                                break;
                        }
                        stl.innerHTML += '.mailBox{background:#fff; box-shadow: 0 0 5px rgba(93,109,157,.3); text-decoration:none !important; display:block; width:280px; height:auto; ' + mailBox + ' -webkit-animation: create 0.' + _SETTINGS.msgAlertSettings.animDelay + 's; animation: create 0.' + _SETTINGS.msgAlertSettings.animDelay + 's} .mailContainer {z-index: 99999; position: fixed; ' + mailContainer + ' padding: 10px} .mailBox .data {display: inline-block; position: absolute; padding-top: 5px;} .mailBox .avatar {width: 64px; padding-right: 5px; border-radius:2px; margin-bottom: -3px;} .text>img {display: inline-block;}.text>div.image_limit {width: 28px; display: inline-block;} .mailBox .name {line-height: 20px; font-weight: bold;} .mailBox .text {white-space: nowrap; text-overflow: ellipsis; overflow: hidden; color: #323232; width: 195px; font-size: small;} @-webkit-keyframes create {0% {opacity: 0;} 100% {opacity: 1;}} @-webkit-keyframes destroy {0% {opacity: 1;} 100% {opacity: 0;}}}'
                    }
                    parent.appendChild(stl);
                }
            },
            backup: function(id) {
                window.scrollTo(0, 0);
                var target = main.qs(id);
                this.console.log(target)
                if (target) {
                    try {
                        target.innerHTML = "";
                        var textarea
                        var wrap = main.ce("div", {
                            class: "content-bl"
                        });
                        if (!_SETTINGS.hideNotyf.configImport) {
                            var hideNotyf = main.ce("img", {
                                class: "p16 m pointer right close_h",
                                style: "padding: 10px;",
                                src: _PROTOCOL + "//spac.me/i/remove.png",
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
                                html: '<span class="ico ico_alert"></span>Внимание!</br></br><div style="font-size: small;">Редактирование только для опытных пользователей, если что-то пошло не так, следует сделать полный сброс настроек.</div>'
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
                            html: '<span class="ico ico_alert"></span> Invalid JSON!<br /><br />'
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
                            html: '<span class="sp_plus_ico_ref"></span><span style="color: #3ca93c;">Сбросить</span>',
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
                            html: '<span class="sp_plus_ico_okb"></span><span style="color: #57A3EA;">Сохранить</span>',
                            onclick: function() {
                                var params = 'value=' + textarea.value
                                main.ajax("https://crashmax.ru/api/getJSON", "POST", params, function(r) {
                                    if (r) {
                                        var _json = {
                                            'result': {
                                                'valid': 0,
                                                'jsoncopy': "",
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
                                                })
                                                err.appendChild(error);
                                            }
                                        }
                                    }
                                });
                                return false;
                            }
                        });
                        var params = 'value=' + JSON.stringify(_SETTINGS)
                        main.ajax("https://crashmax.ru/api/getJSON", "POST", params, function(r) {
                            if (r) {
                                var _json = {
                                    'result': {
                                        'valid': 0,
                                        'jsoncopy': "",
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
                                    rows: "50",
                                    html: json.result.jsoncopy
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
                                        error.innerHTML = '<b>Error:</b> ' + json.result.errors[i].message + ' [Code: ' + json.result.errors[i].code + ', Sctructure: ' + json.result.errors[i].element + ']<br />'
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
                        main.console.error('Ошибка (BACKUP_SETTINGS): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            changeLog: function(id) {
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
                        main.ajax("https://" + gitPages + "/updater.json?r=" + main.service(1), "GET", null, function(r) {
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
                        main.console.error('Ошибка (CHANGELOG_ALERT): ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }
            },
            update: function() {
                main.ajax("https://" + gitPages + "/updater.json?r=" + main.service(1), "GET", null, function(r) {
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
                        BUILD = Math.max(hideVer, BUILD);
                        if (json.history[0].build > BUILD) {
                            main.alert('Доступна новая версия Spaces+ <sup>' + main.rever(json.history[0].build) + '</sup><div class="pad_t_a"></div><small class="grey">' + json.history[0].changes + '</small><div id="SP_UPDATER_BUTTONS" class="pad_t_a"><a class="btn btn_green btn_input" href="http://' + gitPages + '/spaces_plus.user.js?r=' + main.service(1) + '" onclick="document.body.removeChild(this.parentNode.parentNode.parentNode); return true;"> Обновить</a></div>', 1, 1);
                            if (main.qs("#SP_PLUS_ALERT")) {
                                var hide = main.ce("a", {
                                    href: "#",
                                    class: "btn btn_white btn_input right sticker-close_btn",
                                    html: "Больше не показывать",
                                    onclick: function(e) {
                                        _SETTINGS['upVersion'] = json.history[0].build;
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
                    value: _SETTINGS.msgAlertSettings.maxAlert
                });
                mAlert.onchange = mAlert.oninput = function(e) {
                    if (e.target.value != '') {
                        _SETTINGS.msgAlertSettings.maxAlert = e.target.value;
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                    }
                };
                var alertPos = main.ce("input", {
                    type: "text",
                    class: "text-input",
                    size: 4,
                    value: _SETTINGS.msgAlertSettings.alertPosition
                });
                alertPos.onchange = alertPos.oninput = function(e) {
                    if (e.target.value != '') {
                        _SETTINGS.msgAlertSettings.alertPosition = e.target.value;
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
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
                    value: _SETTINGS.msgAlertSettings.alertDelay
                });
                alertTime.onchange = alertTime.oninput = function(e) {
                    if (e.target.value != '') {
                        _SETTINGS.msgAlertSettings.alertDelay = e.target.value;
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
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
                    value: _SETTINGS.msgAlertSettings.animDelay
                });
                animTime.onchange = animTime.oninput = function(e) {
                    if (e.target.value != '') {
                        _SETTINGS.msgAlertSettings.animDelay = e.target.value;
                        var jsonSet = JSON.stringify(_SETTINGS);
                        main.setCookie("SP_PLUS_SET", jsonSet, null);
                        main.setStyle();
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
                    params = 'Contact=' + data.data.contact.nid + '&MeSsages=' + data.data.nid + '&Pag=0&_origin=' + encodeURI(_PROTOCOL + '//' + _DOMAIN) + '&method=getMessagesByIds'
                    main.ajax(_PROTOCOL + '//' + _DOMAIN + '/neoapi/mail', 'POST', params, function(res) {
                        if (window.location.href.indexOf(_PROTOCOL + '//' + _DOMAIN + '/mail/message_list/?Contact=' + data.data.contact.nid) != -1) {
                            return false
                        }
                        var res = JSON.parse(res)
                        var name
                        var avatar
                        var messageKey = Object.keys(res.messages)[0]
                        if (data.data.contact.user != undefined) {
                            if (res.messages[messageKey].contact.avatar == null) {
                                main.jajax(_PROTOCOL + '//' + _DOMAIN + '/mysite/index/' + data.data.contact.user + '/', function(j) {
                                    var j = JSON.parse(j)
                                    avatar = j.owner_widget.photo_widget.previewURL
                                })
                            } else {
                                avatar = res.messages[messageKey].contact.avatar.previewURL
                            }
                            name = data.data.contact.user
                        } else {
                            if (res.messages[messageKey].subject) {
                                avatar = "https://" + gitPages + "/src/attaches/ico/email.png"
                                name = res.messages[messageKey].contact.name
                            } else {
                                avatar = "https://" + gitPages + "/src/attaches/ico/groups_chat.png"
                                name = res.messages[messageKey].contact.widget.siteLink.user_name + ' [' + res.messages[messageKey].contact.name + ']'
                            }
                        }
                        var check = setInterval(function() {
                            if (avatar != undefined) {
                                clearInterval(check)
                                var div = main.ce("div", {
                                    class: "mailContainer"
                                });
                                if (document.getElementsByClassName('mailContainer')[0]) {
                                    div = document.getElementsByClassName('mailContainer')[0]
                                } else {
                                    document.body.appendChild(div)
                                }
                                var del
                                var isClosed = false
                                var animDelay = _SETTINGS.msgAlertSettings.animDelay * 1000
                                var alertDelay = _SETTINGS.msgAlertSettings.alertDelay * 1000
                                var maxAlert = _SETTINGS.msgAlertSettings.maxAlert

                                var a = main.ce("a", {
                                    class: "mailBox",
                                    href: "#",
                                    id: data.data.nid,
                                    onclick: function() {
                                        if (!isClosed) {
                                            main.setLocation(_PROTOCOL + '//' + _DOMAIN + '/mail/message_list/?Contact=' + data.data.contact.nid)
                                            div.removeChild(a)
                                            isClosed = true
                                            return false
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
                                var hide = main.ce("img", {
                                    src: _PROTOCOL + '//spac.me/i/remove.png',
                                    style: "padding: 5px;",
                                    class: "right notif_close close_h",
                                    onclick: function() {
                                        if (!isClosed) {
                                            clearTimeout(del)
                                            div.removeChild(a)
                                            isClosed = true
                                        }
                                    }
                                });
                                if (document.querySelectorAll('.mailContainer a').length > maxAlert - 1) {
                                    div.removeChild(div.firstChild)
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
                                            isClosed = true
                                            a.style = 'animation: destroy ' + animDelay / 1000 + 's;'
                                            setTimeout(function() {
                                                div.removeChild(a)
                                            }, animDelay)
                                        }
                                    }, alertDelay)
                                }
                            }
                        }, 500)
                    }, 4, true);
                }
            },
            preloadModifer: function() {
                var isFirefox = false;
                var w = window
                if (typeof(unsafeWindow) != "undefined" && unsafeWindow.Device.browser == 'firefox' && unsafeWindow.Device.type == "desktop") {
                    w = unsafeWindow
                    isFirefox = true
                }
                if (_SETTINGS.msgAlert) {
                    var start = setInterval(function() {
                        if (typeof(w.pushstream._keepConnected) == "boolean" && w.pushstream._keepConnected) {
                            clearInterval(start)
                            var proxy = new Proxy(w.Spaces.PushStream.prototype._onmessage, {
                                apply: function(target, targetArgs, args) {
                                    main.msgAlert(args[0])
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
                    }, 500)
                }
            },
            fastAccess: function() {
                var fastClick = main.find(document.links, {
                    href: _PROTOCOL + "//" + _DOMAIN + "/services/?"
                });
                if (fastClick) {
                    var setLink = main.ce("li", {
                        class: "li",
                        html: '<a href="' + _PROTOCOL + '//' + _DOMAIN + '/settings/?sp_plus_settings=1" title="Настройки Spaces+"><span class="s_i s_i_spaceplus s_i_options"></span><span class="m s_i_text"> Spaces+</span></a>'
                    });
                    fastClick = fastClick[0].parentNode;
                    main.insertAfter(setLink, fastClick);
                    if (fastClick.nextElementSibling.nodeName == "BR") {
                        main.insertAfter(main.ce("br", null), setLink);
                    }
                }
            },
            freeSticker: function() {
                var script = main.qs("#SP_PLUS_STICKER");
                if (script) {
                    document.getElementsByTagName('head')[0].removeChild(script);
                    document.location.reload();
                } else {
                    var e = main.ce("script", {
                        type: "text/javascript",
                        id: "SP_PLUS_STICKER",
                        html: 'var open=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,o,t){var n=open.apply(this,arguments);return-1==o.indexOf("mail/sendMessage")&&-1==o.indexOf("diary/new")&&-1==o.indexOf("comments/add")||this.setRequestHeader("X-Proxy","spaces"),n};'
                    })
                    document.getElementsByTagName('head')[0].appendChild(e);
                }
            },
            start: function() {
                if (_SETTINGS.blocked) main.bannedTools();
                if (_SETTINGS.comments) main.comments();
                if (_SETTINGS.blogsd) main.blogsDelete();
                if (_SETTINGS.readersd) main.readersDelete();
                if (_SETTINGS.online) main.online();
                if (_SETTINGS.fixes) main.allFixes();
                if (_SETTINGS.ads) main.adsRemove();
                if (_SETTINGS.favorite) main.favorite();
                if (_SETTINGS.friendsOn) main.friendsOnline(1);
                if (_SETTINGS.rscroll) main.scrollMove(1);
                if (_SETTINGS.hrightbar) main.hiddenRightbar(1);
                if (_SETTINGS.coins) main.coins();
                if (_SETTINGS.karma) main.karmaAccept();
                if (_SETTINGS.darkMode) main.darkMode(1);
                if (_SETTINGS.myEvents) main.events();
                if (_SETTINGS.playerdn) {
                    main.playerDown();
                } else if (!_SETTINGS.playerdn && playerId >= 0) {
                    playerId = -1;
                    var downPlace = main.qs("#SP_MUSIC_DOWN");
                    if (downPlace) {
                        main.remove(downPlace);
                    }
                }
                main.settings();
            },
            init: function() {
                main.readSettings();
                main.setStyle();
                main.update();
                main.start();
                main.fastAccess();
                if (_SETTINGS.sticker) main.freeSticker();
                w = setInterval(function() {
                    if (window.Device != undefined || unsafeWindow.Device != undefined) {
                        clearInterval(w)
                        main.preloadModifer();
                    }
                }, 500);
                setInterval(function() {
                    main.start();
                }, 200);
            }
        };
        main.init();
    }
    spacesPlus();
})()