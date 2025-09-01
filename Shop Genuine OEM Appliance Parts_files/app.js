    ! function (t) {
        var e = {};

        function i(s) {
            if (e[s]) return e[s].exports;
            var n = e[s] = {
                i: s,
                l: !1,
                exports: {}
            };
            return t[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports
        }
        i.m = t, i.c = e, i.d = function (t, e, s) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: s
            })
        }, i.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, i.t = function (t, e) {
            if (1 & e && (t = i(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var s = Object.create(null);
            if (i.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
                for (var n in t) i.d(s, n, function (e) {
                    return t[e]
                }.bind(null, n));
            return s
        }, i.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return i.d(e, "a", e), e
        }, i.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, i.p = "", i(i.s = 0)
    }([function (t, e, i) {
        t.exports = i(20)
    }, function (t, e) {
        ! function (t) {
            const e = "resize-active";
            let i = !1,
                s = null;
            const n = () => {
                i = !1, document.documentElement.classList.remove(e)
            };
            t.addEventListener("resize", (() => {
                i || (i = !0, document.documentElement.classList.add(e)), clearTimeout(s), s = setTimeout(n, 500)
            }))
        }(window)
    }, function (t, e) {
        window.ResponsiveHelper = function (t) {
            var e, i = [],
                s = t(window),
                n = !1;

            function o() {
                var n = s.width();
                n !== e && (e = n, t.each(i, (function (e, i) {
                    t.each(i.data, (function (t, e) {
                        e.currentActive && !r(e.range[0], e.range[1]) && (e.currentActive = !1, "function" == typeof e.disableCallback && e.disableCallback())
                    })), t.each(i.data, (function (t, e) {
                        !e.currentActive && r(e.range[0], e.range[1]) && (e.currentActive = !0, "function" == typeof e.enableCallback && e.enableCallback())
                    }))
                })))
            }

            function r(t, i) {
                var s = "";
                return t > 0 && (s += "(min-width: " + t + "px)"), i < 1 / 0 && (s += (s ? " and " : "") + "(max-width: " + i + "px)"),
                    function (t, i, s) {
                        return window.matchMedia && n ? matchMedia(t).matches : window.styleMedia ? styleMedia.matchMedium(t) : window.media ? media.matchMedium(t) : e >= i && e <= s
                    }(s, t, i)
            }

            function a(t) {
                var e = t.split("..");
                return [parseInt(e[0], 10) || -1 / 0, parseInt(e[1], 10) || 1 / 0].sort((function (t, e) {
                    return t - e
                }))
            }
            return window.matchMedia && (window.Window && window.matchMedia === Window.prototype.matchMedia || window.matchMedia.toString().indexOf("native") > -1) && (n = !0), s.bind("load resize orientationchange", o), {
                addRange: function (s) {
                    var n = {
                        data: {}
                    };
                    t.each(s, (function (t, e) {
                        n.data[t] = {
                            range: a(t),
                            enableCallback: e.on,
                            disableCallback: e.off
                        }
                    })), i.push(n), e = null, o()
                }
            }
        }(jQuery)
    }, function (t, e) {
        ! function (t, e) {
            "use strict";

            function i(t, e) {
                this.$holder = t, this.options = e, this.container = this.$holder.closest(".tabs-container"), this.init()
            }
            i.prototype = {
                init: function () {
                    this.$tabLinks = this.$holder.find(this.options.tabLinks), this.setStartActiveIndex(), this.setActiveTab(), this.options.autoHeight && (this.$tabHolder = t(this.$tabLinks.eq(0).attr(this.options.attrib)).parent()), this.makeCallback("onInit", this), this.container.length && this.container.addClass("tabs-initialized")
                },
                setStartActiveIndex: function () {
                    var t, e = this.getClassTarget(this.$tabLinks),
                        i = e.filter("." + this.options.activeClass),
                        s = this.$tabLinks.filter("[" + this.options.attrib + '="' + location.hash + '"]');
                    this.options.checkHash && s.length && (i = s), t = e.index(i), this.activeTabIndex = this.prevTabIndex = -1 === t ? this.options.defaultTab ? 0 : null : t
                },
                setActiveTab: function () {
                    var e = this;
                    this.$tabLinks.each((function (i, s) {
                        var n = t(s),
                            o = e.getClassTarget(n),
                            r = t(n.attr(e.options.attrib));
                        i !== e.activeTabIndex ? (o.removeClass(e.options.activeClass), r.addClass(e.options.tabHiddenClass).removeClass(e.options.activeClass)) : (o.addClass(e.options.activeClass), r.removeClass(e.options.tabHiddenClass).addClass(e.options.activeClass)), e.attachTabLink(n, i)
                    }))
                },
                attachTabLink: function (t, e) {
                    var i = this;
                    t.on(this.options.event + ".tabset", (function (t) {
                        t.preventDefault(), i.activeTabIndex === i.prevTabIndex && i.activeTabIndex !== e && (i.activeTabIndex = e, i.switchTabs()), i.options.checkHash && (location.hash = jQuery(this).attr("href").split("#")[1])
                    }))
                },
                resizeHolder: function (t) {
                    var e = this;
                    t ? (this.$tabHolder.height(t), setTimeout((function () {
                        e.$tabHolder.addClass("transition")
                    }), 10)) : e.$tabHolder.removeClass("transition").height("")
                },
                switchTabs: function () {
                    var t = this,
                        e = this.$tabLinks.eq(this.prevTabIndex),
                        i = this.$tabLinks.eq(this.activeTabIndex),
                        s = this.getTab(e),
                        n = this.getTab(i);
                    s.removeClass(this.options.activeClass), t.haveTabHolder() && this.resizeHolder(s.outerHeight()), setTimeout((function () {
                        t.getClassTarget(e).removeClass(t.options.activeClass), s.addClass(t.options.tabHiddenClass), n.removeClass(t.options.tabHiddenClass).addClass(t.options.activeClass), t.getClassTarget(i).addClass(t.options.activeClass), t.haveTabHolder() ? (t.resizeHolder(n.outerHeight()), setTimeout((function () {
                            t.resizeHolder(), t.prevTabIndex = t.activeTabIndex
                        }), t.options.animSpeed)) : t.prevTabIndex = t.activeTabIndex, t.makeCallback("onChange", t)
                    }), this.options.autoHeight ? this.options.animSpeed : 1)
                },
                getClassTarget: function (t) {
                    return this.options.addToParent ? t.parent() : t
                },
                getActiveTab: function () {
                    return this.getTab(this.$tabLinks.eq(this.activeTabIndex))
                },
                getTab: function (e) {
                    return t(e.attr(this.options.attrib))
                },
                haveTabHolder: function () {
                    return this.$tabHolder && this.$tabHolder.length
                },
                destroy: function () {
                    var e = this;
                    this.$tabLinks.off(".tabset").each((function () {
                        var i = t(this);
                        e.getClassTarget(i).removeClass(e.options.activeClass), t(i.attr(e.options.attrib)).removeClass(e.options.activeClass + " " + e.options.tabHiddenClass)
                    })), this.$holder.removeData("Tabset")
                },
                makeCallback: function (t) {
                    if ("function" == typeof this.options[t]) {
                        var e = Array.prototype.slice.call(arguments);
                        e.shift(), this.options[t].apply(this, e)
                    }
                }
            }, t.fn.tabset = function (e) {
                var s = Array.prototype.slice.call(arguments),
                    n = s[0],
                    o = t.extend({
                        activeClass: "active",
                        addToParent: !1,
                        autoHeight: !1,
                        checkHash: !1,
                        defaultTab: !0,
                        animSpeed: 500,
                        tabLinks: "a",
                        attrib: "href",
                        event: "click",
                        tabHiddenClass: "js-tab-hidden"
                    }, e);
                return o.autoHeight = o.autoHeight, this.each((function () {
                    var t = jQuery(this),
                        r = t.data("Tabset");
                    "object" == typeof e || void 0 === e ? t.data("Tabset", new i(t, o)) : "string" == typeof n && r && "function" == typeof r[n] && (s.shift(), r[n].apply(r, s))
                }))
            }
        }(jQuery, jQuery(window))
    }, function (t, e) {
        ! function (t) {
            function e(e) {
                this.options = t.extend({
                    addClassBeforeAnimation: !0,
                    activeClass: "active",
                    opener: ".opener",
                    slider: ".slide",
                    altSlider: ".alt-slider",
                    animSpeed: 400,
                    mobileLines: 2,
                    desktopLines: 6,
                    isMobile: !1,
                    btnText: "(more...)",
                    btnOpenedText: "(less)",
                    event: "click",
                    truncatedClass: "truncated"
                }, e), this.init()
            }
            e.prototype = {
                init: function () {
                    this.options.holder && (this.findElements(), this.checkHeight(), this.attachEvents(), this.refreshState(), this.makeCallback("onInit", this))
                },
                findElements: function () {
                    this.holder = t(this.options.holder), this.opener = this.holder.find(this.options.opener), this.slider = this.holder.find(this.options.slider), this.altSlider = this.holder.find(this.options.altSlider), this.sliderHeight = this.slider.height(), this.lineHeight = parseFloat(this.slider.css("line-height"))
                },
                checkHeight: function () {
                    this.options.isMobile ? this.collapsedHeight = this.options.mobileLines * this.lineHeight : this.collapsedHeight = this.options.desktopLines * this.lineHeight
                },
                attachEvents: function () {
                    var e = this;
                    this.eventHandler = function (t) {
                        t.preventDefault(), e.holder.hasClass(e.options.activeClass) ? e.hideSlide(!0) : e.showSlide(!0)
                    }, this.opener.on(this.options.event, this.eventHandler), t(window).on("refreshMultiline", this.makeaRefresh.bind(this))
                },
                makeaRefresh: function () {
                    this.slider.css("height", ""), this.sliderHeight = this.slider.height(), this.lineHeight = parseFloat(this.slider.css("line-height")), this.checkHeight(), this.refreshState()
                },
                refreshState: function () {
                    this.slider.height() <= this.collapsedHeight ? this.opener.hide() : (this.opener.show(), this.holder.hasClass(this.options.activeClass) ? this.showSlide(!1) : this.hideSlide(!1))
                },
                showSlide: function (t) {
                    var e = this;
                    this.opener.text(this.options.btnOpenedText), this.holder.addClass(this.options.activeClass), this.altSlider.length && (this.altSlider.removeClass(i), this.options.isMobile ? s.slide.show({
                        box: e.altSlider,
                        speed: t ? e.options.animSpeed : 0,
                        complete: function () {
                            e.altSlider.removeClass(i)
                        }
                    }) : this.altSlider.show()), this.slider.stop().animate({
                        height: this.sliderHeight
                    }, t ? this.options.animSpeed : 0), this.slider.removeClass(this.options.truncatedClass), this.options.isMobile && this.altSlider.length && this.altSlider.removeClass(i)
                },
                hideSlide: function (t) {
                    var e = this;
                    this.opener.text(this.options.btnText), this.holder.removeClass(this.options.activeClass), this.altSlider.length && (this.options.isMobile ? s.slide.hide({
                        box: e.altSlider,
                        speed: t ? e.options.animSpeed : 0,
                        complete: function () {
                            e.altSlider.addClass(i)
                        }
                    }) : (this.altSlider.removeClass(i), e.altSlider.show())), this.slider.stop().animate({
                        height: this.collapsedHeight
                    }, t ? this.options.animSpeed : 0), this.slider.addClass(this.options.truncatedClass)
                },
                destroy: function () {
                    this.slider.removeClass(i).css({
                        display: ""
                    }), this.opener.off(this.options.event, this.eventHandler), this.holder.removeClass(this.options.activeClass).removeData("customOpenClose"), t(document).off("click touchstart", this.outsideClickHandler)
                },
                makeCallback: function (t) {
                    if ("function" == typeof this.options[t]) {
                        var e = Array.prototype.slice.call(arguments);
                        e.shift(), this.options[t].apply(this, e)
                    }
                }
            };
            var i = "js-hidden";
            ! function () {
                var e = t('<style type="text/css">')[0],
                    s = "." + i;
                s += "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}", e.styleSheet ? e.styleSheet.cssText = s : e.appendChild(document.createTextNode(s)), t("head").append(e)
            }();
            var s = {
                slide: {
                    show: function (t) {
                        t.box.stop(!0).hide().slideDown(t.speed, t.complete)
                    },
                    hide: function (t) {
                        t.box.stop(!0).slideUp(t.speed, t.complete)
                    }
                },
                fade: {
                    show: function (t) {
                        t.box.stop(!0).hide().fadeIn(t.speed, t.complete)
                    },
                    hide: function (t) {
                        t.box.stop(!0).fadeOut(t.speed, t.complete)
                    }
                },
                none: {
                    show: function (t) {
                        t.box.hide().show(0, t.complete)
                    },
                    hide: function (t) {
                        t.box.hide(0, t.complete)
                    }
                }
            };
            t.fn.customOpenClose = function (i) {
                return this.each((function () {
                    jQuery(this).data("CustomOpenClose", new e(t.extend(i, {
                        holder: this
                    })))
                }))
            }
        }(jQuery)
    }, function (t, e) {
        ! function (t) {
            function e(e) {
                this.options = t.extend({
                    addClassBeforeAnimation: !0,
                    hideOnClickOutside: !1,
                    activeClass: "active",
                    opener: ".opener",
                    slider: ".slide",
                    animSpeed: 400,
                    effect: "fade",
                    event: "click"
                }, e), this.init()
            }
            e.prototype = {
                init() {
                    this.options.holder && (this.findElements(), this.attachEvents(), this.makeCallback("onInit", this))
                },
                findElements() {
                    this.holder = t(this.options.holder), this.opener = this.holder.find(this.options.opener), this.slider = this.holder.find(this.options.slider)
                },
                attachEvents() {
                    const e = this;
                    this.eventHandler = function (t) {
                        t.preventDefault(), e.slider.hasClass(i) ? e.showSlide() : e.hideSlide();
                    }, e.opener.on(e.options.event, this.eventHandler), "hover" === e.options.event && (e.opener.on("mouseenter", (function () {
                        e.holder.hasClass(e.options.activeClass) || e.showSlide();
                    })), e.holder.on("mouseleave", (function () {
                        e.hideSlide()
                    }))), e.outsideClickHandler = function (i) {
                        if (e.options.hideOnClickOutside) {
                            const s = t(i.target);
                            s.is(e.holder) || s.closest(e.holder).length || e.hideSlide()
                        }
                    }, this.holder.hasClass(this.options.activeClass) ? t(document).on("click touchstart", e.outsideClickHandler) : this.slider.addClass(i)
                },
                showSlide() {
                    const e = this;
                    e.options.addClassBeforeAnimation && e.holder.addClass(e.options.activeClass), e.slider.removeClass(i), t(document).on("click touchstart", e.outsideClickHandler), e.makeCallback("animStart", !0), s[e.options.effect].show({
                        box: e.slider,
                        speed: e.options.animSpeed,
                        complete() {
                            e.options.addClassBeforeAnimation || e.holder.addClass(e.options.activeClass), e.makeCallback("animEnd", !0)
                        }
                    })
                },
                hideSlide() {
                    const e = this;
                    e.options.addClassBeforeAnimation && e.holder.removeClass(e.options.activeClass), t(document).off("click touchstart", e.outsideClickHandler), e.makeCallback("animStart", !1), s[e.options.effect].hide({
                        box: e.slider,
                        speed: e.options.animSpeed,
                        complete() {
                            e.options.addClassBeforeAnimation || e.holder.removeClass(e.options.activeClass), e.slider.addClass(i), e.makeCallback("animEnd", !1)
                        }
                    })
                },
                destroy() {
                    this.slider.removeClass(i).css({
                        display: ""
                    }), this.opener.off(this.options.event, this.eventHandler), this.holder.removeClass(this.options.activeClass).removeData("OpenClose"), t(document).off("click touchstart", this.outsideClickHandler)
                },
                makeCallback(t) {
                    if ("function" == typeof this.options[t]) {
                        const e = Array.prototype.slice.call(arguments);
                        e.shift(), this.options[t].apply(this, e)
                    }
                }
            };
            var i = "js-slide-hidden";
            ! function () {
                const e = t('<style type="text/css">')[0];
                let s = '.${i}';
                s += "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}", e.styleSheet ? e.styleSheet.cssText = s : e.appendChild(document.createTextNode(s)), t("head").append(e)
            }();
            var s = {
                slide: {
                    show(t) {
                        t.box.stop(!0).hide().slideDown(t.speed, t.complete)
                    },
                    hide(t) {
                        t.box.stop(!0).slideUp(t.speed, t.complete)
                    }
                },
                fade: {
                    show(t) {
                        t.box.stop(!0).hide().fadeIn(t.speed, t.complete)
                    },
                    hide(t) {
                        t.box.stop(!0).fadeOut(t.speed, t.complete)
                    }
                },
                none: {
                    show(t) {
                        t.box.hide().show(0, t.complete)
                    },
                    hide(t) {
                        t.box.hide(0, t.complete)
                    }
                }
            };
            t.fn.openClose = function (i) {
                const s = Array.prototype.slice.call(arguments),
                    n = s[0];
                return this.each((function () {
                    const o = jQuery(this),
                        r = o.data("OpenClose");
                    "object" == typeof i || void 0 === i ? o.data("OpenClose", new e(t.extend({
                        holder: this
                    }, i))) : "string" == typeof n && r && "function" == typeof r[n] && (s.shift(), r[n].apply(r, s))
                }))
            }
        }(jQuery)
    }, function (t, e, i) {
        var s, n, o;
        ! function (r) {
            n = [i(7)], s = function (t) {
                var e, i, s, n, o, r, a, l, c, d, h, u, p, f, m = ((x = t && t.fn && t.fn.select2 && t.fn.select2.amd ? t.fn.select2.amd : x) && x.requirejs || (x ? i = x : x = {}, l = {}, c = {}, d = {}, h = {}, u = Object.prototype.hasOwnProperty, p = [].slice, f = /\.js$/, r = function (t, e) {
                    var i, s, n = w(t),
                        o = n[0];
                    e = e[1];
                    return t = n[1], o && (i = y(o = v(o, e))), o ? t = i && i.normalize ? i.normalize(t, (s = e, function (t) {
                        return v(t, s)
                    })) : v(t, e) : (o = (n = w(t = v(t, e)))[0], t = n[1], o && (i = y(o))), {
                        f: o ? o + "!" + t : t,
                        n: t,
                        pr: o,
                        p: i
                    }
                }, a = {
                    require: function (t) {
                        return b(t)
                    },
                    exports: function (t) {
                        var e = l[t];
                        return void 0 !== e ? e : l[t] = {}
                    },
                    module: function (t) {
                        return {
                            id: t,
                            uri: "",
                            exports: l[t],
                            config: (e = t, function () {
                                return d && d.config && d.config[e] || {}
                            })
                        };
                        var e
                    }
                }, n = function (t, e, i, n) {
                    var o, d, u, p, f, m = [],
                        v = typeof i,
                        w = S(n = n || t);
                    if ("undefined" == v || "function" == v) {
                        for (e = !e.length && i.length ? ["require", "exports", "module"] : e, p = 0; p < e.length; p += 1)
                            if ("require" === (d = (u = r(e[p], w)).f)) m[p] = a.require(t);
                            else if ("exports" === d) m[p] = a.exports(t), f = !0;
                            else if ("module" === d) o = m[p] = a.module(t);
                            else if (g(l, d) || g(c, d) || g(h, d)) m[p] = y(d);
                            else {
                                if (!u.p) throw new Error(t + " missing " + d);
                                u.p.load(u.n, b(n, !0), function (t) {
                                    return function (e) {
                                        l[t] = e
                                    }
                                }(d), {}), m[p] = l[d]
                            }
                        v = i ? i.apply(l[t], m) : void 0, t && (o && o.exports !== s && o.exports !== l[t] ? l[t] = o.exports : v === s && f || (l[t] = v))
                    } else t && (l[t] = i)
                }, e = i = o = function (t, e, i, l, c) {
                    if ("string" == typeof t) return a[t] ? a[t](e) : y(r(t, S(e)).f);
                    if (!t.splice) {
                        if ((d = t).deps && o(d.deps, d.callback), !e) return;
                        e.splice ? (t = e, e = i, i = null) : t = s
                    }
                    return e = e || function () { }, "function" == typeof i && (i = l, l = c), l ? n(s, t, e, i) : setTimeout((function () {
                        n(s, t, e, i)
                    }), 4), o
                }, o.config = function (t) {
                    return o(t)
                }, e._defined = l, (m = function (t, e, i) {
                    if ("string" != typeof t) throw new Error("See almond README: incorrect module build, no module name");
                    e.splice || (i = e, e = []), g(l, t) || g(c, t) || (c[t] = [t, e, i])
                }).amd = {
                        jQuery: !0
                    }, x.requirejs = e, x.require = i, x.define = m), x.define("almond", (function () { })), x.define("jquery", [], (function () {
                        var e = t || $;
                        return null == e && console && console.error, e
                    })), x.define("select2/utils", ["jquery"], (function (t) {
                        var e = {};

                        function i(t) {
                            var e, i = t.prototype,
                                s = [];
                            for (e in i) "function" == typeof i[e] && "constructor" !== e && s.push(e);
                            return s
                        }

                        function s() {
                            this.listeners = {}
                        }
                        e.Extend = function (t, e) {
                            var i, s = {}.hasOwnProperty;

                            function n() {
                                this.constructor = t
                            }
                            for (i in e) s.call(e, i) && (t[i] = e[i]);
                            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
                        }, e.Decorate = function (t, e) {
                            var s = i(e),
                                n = i(t);

                            function o() {
                                var i = Array.prototype.unshift,
                                    s = e.prototype.constructor.length,
                                    n = t.prototype.constructor;
                                0 < s && (i.call(arguments, t.prototype.constructor), n = e.prototype.constructor), n.apply(this, arguments)
                            }
                            e.displayName = t.displayName, o.prototype = new function () {
                                this.constructor = o
                            };
                            for (var r = 0; r < n.length; r++) {
                                var a = n[r];
                                o.prototype[a] = t.prototype[a]
                            }
                            for (var l = 0; l < s.length; l++) {
                                var c = s[l];
                                o.prototype[c] = function (t) {
                                    var i = function () { };
                                    t in o.prototype && (i = o.prototype[t]);
                                    var s = e.prototype[t];
                                    return function () {
                                        return Array.prototype.unshift.call(arguments, i), s.apply(this, arguments)
                                    }
                                }(c)
                            }
                            return o
                        }, s.prototype.on = function (t, e) {
                            this.listeners = this.listeners || {}, t in this.listeners ? this.listeners[t].push(e) : this.listeners[t] = [e]
                        }, s.prototype.trigger = function (t) {
                            var e = Array.prototype.slice,
                                i = e.call(arguments, 1);
                            this.listeners = this.listeners || {}, 0 === (i = null == i ? [] : i).length && i.push({}), (i[0]._type = t) in this.listeners && this.invoke(this.listeners[t], e.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                        }, s.prototype.invoke = function (t, e) {
                            for (var i = 0, s = t.length; i < s; i++) t[i].apply(this, e)
                        }, e.Observable = s, e.generateChars = function (t) {
                            for (var e = "", i = 0; i < t; i++) e += Math.floor(36 * Math.random()).toString(36);
                            return e
                        }, e.bind = function (t, e) {
                            return function () {
                                t.apply(e, arguments)
                            }
                        }, e._convertData = function (t) {
                            for (var e in t) {
                                var i = e.split("-"),
                                    s = t;
                                if (1 !== i.length) {
                                    for (var n = 0; n < i.length; n++) {
                                        var o = i[n];
                                        (o = o.substring(0, 1).toLowerCase() + o.substring(1)) in s || (s[o] = {}), n == i.length - 1 && (s[o] = t[e]), s = s[o]
                                    }
                                    delete t[e]
                                }
                            }
                            return t
                        }, e.hasScroll = function (e, i) {
                            var s = t(i),
                                n = i.style.overflowX,
                                o = i.style.overflowY;
                            return (n !== o || "hidden" !== o && "visible" !== o) && ("scroll" === n || "scroll" === o || s.innerHeight() < i.scrollHeight || s.innerWidth() < i.scrollWidth)
                        }, e.escapeMarkup = function (t) {
                            var e = {
                                "\\": "&#92;",
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#39;",
                                "/": "&#47;"
                            };
                            return "string" != typeof t ? t : String(t).replace(/[&<>"'\/\\]/g, (function (t) {
                                return e[t]
                            }))
                        }, e.__cache = {};
                        var n = 0;
                        return e.GetUniqueElementId = function (t) {
                            var i = t.getAttribute("data-select2-id");
                            return null != i || (i = t.id ? "select2-data-" + t.id : "select2-data-" + (++n).toString() + "-" + e.generateChars(4), t.setAttribute("data-select2-id", i)), i
                        }, e.StoreData = function (t, i, s) {
                            t = e.GetUniqueElementId(t), e.__cache[t] || (e.__cache[t] = {}), e.__cache[t][i] = s
                        }, e.GetData = function (i, s) {
                            var n = e.GetUniqueElementId(i);
                            return s ? e.__cache[n] && null != e.__cache[n][s] ? e.__cache[n][s] : t(i).data(s) : e.__cache[n]
                        }, e.RemoveData = function (t) {
                            var i = e.GetUniqueElementId(t);
                            null != e.__cache[i] && delete e.__cache[i], t.removeAttribute("data-select2-id")
                        }, e.copyNonInternalCssClasses = function (t, e) {
                            var i = (i = t.getAttribute("class").trim().split(/\s+/)).filter((function (t) {
                                return 0 === t.indexOf("select2-")
                            }));
                            e = (e = e.getAttribute("class").trim().split(/\s+/)).filter((function (t) {
                                return 0 !== t.indexOf("select2-")
                            })), e = i.concat(e);
                            t.setAttribute("class", e.join(" "))
                        }, e
                    })), x.define("select2/results", ["jquery", "./utils"], (function (t, e) {
                        function i(t, e, s) {
                            this.$element = t, this.data = s, this.options = e, i.__super__.constructor.call(this)
                        }
                        return e.Extend(i, e.Observable), i.prototype.render = function () {
                            var e = t('<ul class="select2-results__options" role="listbox"></ul>');
                            return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), this.$results = e
                        }, i.prototype.clear = function () {
                            this.$results.empty()
                        }, i.prototype.displayMessage = function (e) {
                            var i = this.options.get("escapeMarkup");
                            this.clear(), this.hideLoading();
                            var s = t('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),
                                n = this.options.get("translations").get(e.message);
                            s.append(i(n(e.args))), s[0].className += " select2-results__message", this.$results.append(s)
                        }, i.prototype.hideMessages = function () {
                            this.$results.find(".select2-results__message").remove()
                        }, i.prototype.append = function (t) {
                            this.hideLoading();
                            var e = [];
                            if (null != t.results && 0 !== t.results.length) {
                                t.results = this.sort(t.results);
                                for (var i = 0; i < t.results.length; i++) {
                                    var s = t.results[i];
                                    s = this.option(s);
                                    e.push(s)
                                }
                                this.$results.append(e)
                            } else 0 === this.$results.children().length && this.trigger("results:message", {
                                message: "noResults"
                            })
                        }, i.prototype.position = function (t, e) {
                            e.find(".select2-results").append(t)
                        }, i.prototype.sort = function (t) {
                            return this.options.get("sorter")(t)
                        }, i.prototype.highlightFirstItem = function () {
                            var t = this.$results.find(".select2-results__option--selectable"),
                                e = t.filter(".select2-results__option--selected");
                            (0 < e.length ? e : t).first().trigger("mouseenter"), this.ensureHighlightVisible()
                        }, i.prototype.setClasses = function () {
                            var i = this;
                            this.data.current((function (s) {
                                var n = s.map((function (t) {
                                    return t.id.toString()
                                }));
                                i.$results.find(".select2-results__option--selectable").each((function () {
                                    var i = t(this),
                                        s = e.GetData(this, "data"),
                                        o = "" + s.id;
                                    null != s.element && s.element.selected || null == s.element && -1 < n.indexOf(o) ? (this.classList.add("select2-results__option--selected"), i.attr("aria-selected", "true")) : (this.classList.remove("select2-results__option--selected"), i.attr("aria-selected", "false"))
                                }))
                            }))
                        }, i.prototype.showLoading = function (t) {
                            this.hideLoading(), t = {
                                disabled: !0,
                                loading: !0,
                                text: this.options.get("translations").get("searching")(t)
                            }, (t = this.option(t)).className += " loading-results", this.$results.prepend(t)
                        }, i.prototype.hideLoading = function () {
                            this.$results.find(".loading-results").remove()
                        }, i.prototype.option = function (i) {
                            var s = document.createElement("li");
                            s.classList.add("select2-results__option"), s.classList.add("select2-results__option--selectable");
                            var n, o = {
                                role: "option"
                            },
                                r = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
                            for (n in (null != i.element && r.call(i.element, ":disabled") || null == i.element && i.disabled) && (o["aria-disabled"] = "true", s.classList.remove("select2-results__option--selectable"), s.classList.add("select2-results__option--disabled")), null == i.id && s.classList.remove("select2-results__option--selectable"), null != i._resultId && (s.id = i._resultId), i.title && (s.title = i.title), i.children && (o.role = "group", o["aria-label"] = i.text, s.classList.remove("select2-results__option--selectable"), s.classList.add("select2-results__option--group")), o) {
                                var a = o[n];
                                s.setAttribute(n, a)
                            }
                            if (i.children) {
                                var l = t(s),
                                    c = document.createElement("strong");
                                c.className = "select2-results__group", this.template(i, c);
                                for (var d = [], h = 0; h < i.children.length; h++) {
                                    var u = i.children[h];
                                    u = this.option(u);
                                    d.push(u)
                                } (r = t("<ul></ul>", {
                                    class: "select2-results__options select2-results__options--nested",
                                    role: "none"
                                })).append(d), l.append(c), l.append(r)
                            } else this.template(i, s);
                            return e.StoreData(s, "data", i), s
                        }, i.prototype.bind = function (i, s) {
                            var n = this,
                                o = i.id + "-results";
                            this.$results.attr("id", o), i.on("results:all", (function (t) {
                                n.clear(), n.append(t.data), i.isOpen() && (n.setClasses(), n.highlightFirstItem())
                            })), i.on("results:append", (function (t) {
                                n.append(t.data), i.isOpen() && n.setClasses()
                            })), i.on("query", (function (t) {
                                n.hideMessages(), n.showLoading(t)
                            })), i.on("select", (function () {
                                i.isOpen() && (n.setClasses(), n.options.get("scrollAfterSelect") && n.highlightFirstItem())
                            })), i.on("unselect", (function () {
                                i.isOpen() && (n.setClasses(), n.options.get("scrollAfterSelect") && n.highlightFirstItem())
                            })), i.on("open", (function () {
                                n.$results.attr("aria-expanded", "true"), n.$results.attr("aria-hidden", "false"), n.setClasses(), n.ensureHighlightVisible()
                            })), i.on("close", (function () {
                                n.$results.attr("aria-expanded", "false"), n.$results.attr("aria-hidden", "true"), n.$results.removeAttr("aria-activedescendant")
                            })), i.on("results:toggle", (function () {
                                var t = n.getHighlightedResults();
                                0 !== t.length && t.trigger("mouseup")
                            })), i.on("results:select", (function () {
                                var t, i = n.getHighlightedResults();
                                0 !== i.length && (t = e.GetData(i[0], "data"), i.hasClass("select2-results__option--selected") ? n.trigger("close", {}) : n.trigger("select", {
                                    data: t
                                }))
                            })), i.on("results:previous", (function () {
                                var t, e = n.getHighlightedResults(),
                                    i = n.$results.find(".select2-results__option--selectable"),
                                    s = i.index(e);
                                s <= 0 || (t = s - 1, 0 === e.length && (t = 0), (s = i.eq(t)).trigger("mouseenter"), e = n.$results.offset().top, i = s.offset().top, s = n.$results.scrollTop() + (i - e), 0 === t ? n.$results.scrollTop(0) : i - e < 0 && n.$results.scrollTop(s))
                            })), i.on("results:next", (function () {
                                var t, e = n.getHighlightedResults(),
                                    i = n.$results.find(".select2-results__option--selectable"),
                                    s = i.index(e) + 1;
                                s >= i.length || ((t = i.eq(s)).trigger("mouseenter"), e = n.$results.offset().top + n.$results.outerHeight(!1), i = t.offset().top + t.outerHeight(!1), t = n.$results.scrollTop() + i - e, 0 === s ? n.$results.scrollTop(0) : e < i && n.$results.scrollTop(t))
                            })), i.on("results:focus", (function (t) {
                                t.element[0].classList.add("select2-results__option--highlighted"), t.element[0].setAttribute("aria-selected", "true")
                            })), i.on("results:message", (function (t) {
                                n.displayMessage(t)
                            })), t.fn.mousewheel && this.$results.on("mousewheel", (function (t) {
                                var e = n.$results.scrollTop(),
                                    i = n.$results.get(0).scrollHeight - e + t.deltaY;
                                e = 0 < t.deltaY && e - t.deltaY <= 0, i = t.deltaY < 0 && i <= n.$results.height();
                                e ? (n.$results.scrollTop(0), t.preventDefault(), t.stopPropagation()) : i && (n.$results.scrollTop(n.$results.get(0).scrollHeight - n.$results.height()), t.preventDefault(), t.stopPropagation())
                            })), this.$results.on("mouseup", ".select2-results__option--selectable", (function (i) {
                                var s = t(this),
                                    o = e.GetData(this, "data");
                                s.hasClass("select2-results__option--selected") ? n.options.get("multiple") ? n.trigger("unselect", {
                                    originalEvent: i,
                                    data: o
                                }) : n.trigger("close", {}) : n.trigger("select", {
                                    originalEvent: i,
                                    data: o
                                })
                            })), this.$results.on("mouseenter", ".select2-results__option--selectable", (function (i) {
                                var s = e.GetData(this, "data");
                                n.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false"), n.trigger("results:focus", {
                                    data: s,
                                    element: t(this)
                                })
                            }))
                        }, i.prototype.getHighlightedResults = function () {
                            return this.$results.find(".select2-results__option--highlighted")
                        }, i.prototype.destroy = function () {
                            this.$results.remove()
                        }, i.prototype.ensureHighlightVisible = function () {
                            var t, e, i, s, n = this.getHighlightedResults();
                            0 !== n.length && (t = this.$results.find(".select2-results__option--selectable").index(n), s = this.$results.offset().top, e = n.offset().top, i = this.$results.scrollTop() + (e - s), s = e - s, i -= 2 * n.outerHeight(!1), t <= 2 ? this.$results.scrollTop(0) : (s > this.$results.outerHeight() || s < 0) && this.$results.scrollTop(i))
                        }, i.prototype.template = function (e, i) {
                            var s = this.options.get("templateResult"),
                                n = this.options.get("escapeMarkup");
                            null == (e = s(e, i)) ? i.style.display = "none" : "string" == typeof e ? i.innerHTML = n(e) : t(i).append(e)
                        }, i
                    })), x.define("select2/keys", [], (function () {
                        return {
                            BACKSPACE: 8,
                            TAB: 9,
                            ENTER: 13,
                            SHIFT: 16,
                            CTRL: 17,
                            ALT: 18,
                            ESC: 27,
                            SPACE: 32,
                            PAGE_UP: 33,
                            PAGE_DOWN: 34,
                            END: 35,
                            HOME: 36,
                            LEFT: 37,
                            UP: 38,
                            RIGHT: 39,
                            DOWN: 40,
                            DELETE: 46
                        }
                    })), x.define("select2/selection/base", ["jquery", "../utils", "../keys"], (function (t, e, i) {
                        function s(t, e) {
                            this.$element = t, this.options = e, s.__super__.constructor.call(this)
                        }
                        return e.Extend(s, e.Observable), s.prototype.render = function () {
                            var i = t('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                            return this._tabindex = 0, null != e.GetData(this.$element[0], "old-tabindex") ? this._tabindex = e.GetData(this.$element[0], "old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), i.attr("title", this.$element.attr("title")), i.attr("tabindex", this._tabindex), i.attr("aria-disabled", "false"), this.$selection = i
                        }, s.prototype.bind = function (t, e) {
                            var s = this,
                                n = t.id + "-results";
                            this.container = t, this.$selection.on("focus", (function (t) {
                                s.trigger("focus", t)
                            })), this.$selection.on("blur", (function (t) {
                                s._handleBlur(t)
                            })), this.$selection.on("keydown", (function (t) {
                                s.trigger("keypress", t), t.which === i.SPACE && t.preventDefault()
                            })), t.on("results:focus", (function (t) {
                                s.$selection.attr("aria-activedescendant", t.data._resultId)
                            })), t.on("selection:update", (function (t) {
                                s.update(t.data)
                            })), t.on("open", (function () {
                                s.$selection.attr("aria-expanded", "true"), s.$selection.attr("aria-owns", n), s._attachCloseHandler(t)
                            })), t.on("close", (function () {
                                s.$selection.attr("aria-expanded", "false"), s.$selection.removeAttr("aria-activedescendant"), s.$selection.removeAttr("aria-owns"), s.$selection.trigger("focus"), s._detachCloseHandler(t)
                            })), t.on("enable", (function () {
                                s.$selection.attr("tabindex", s._tabindex), s.$selection.attr("aria-disabled", "false")
                            })), t.on("disable", (function () {
                                s.$selection.attr("tabindex", "-1"), s.$selection.attr("aria-disabled", "true")
                            }))
                        }, s.prototype._handleBlur = function (e) {
                            var i = this;
                            window.setTimeout((function () {
                                document.activeElement == i.$selection[0] || t.contains(i.$selection[0], document.activeElement) || i.trigger("blur", e)
                            }), 1)
                        }, s.prototype._attachCloseHandler = function (i) {
                            t(document.body).on("mousedown.select2." + i.id, (function (i) {
                                var s = t(i.target).closest(".select2");
                                t(".select2.select2-container--open").each((function () {
                                    this != s[0] && e.GetData(this, "element").select2("close")
                                }))
                            }))
                        }, s.prototype._detachCloseHandler = function (e) {
                            t(document.body).off("mousedown.select2." + e.id)
                        }, s.prototype.position = function (t, e) {
                            e.find(".selection").append(t)
                        }, s.prototype.destroy = function () {
                            this._detachCloseHandler(this.container)
                        }, s.prototype.update = function (t) {
                            throw new Error("The `update` method must be defined in child classes.")
                        }, s.prototype.isEnabled = function () {
                            return !this.isDisabled()
                        }, s.prototype.isDisabled = function () {
                            return this.options.get("disabled")
                        }, s
                    })), x.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], (function (t, e, i, s) {
                        function n() {
                            n.__super__.constructor.apply(this, arguments)
                        }
                        return i.Extend(n, e), n.prototype.render = function () {
                            var t = n.__super__.render.call(this);
                            return t[0].classList.add("select2-selection--single"), t.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), t
                        }, n.prototype.bind = function (t, e) {
                            var i = this;
                            n.__super__.bind.apply(this, arguments);
                            var s = t.id + "-container";
                            this.$selection.find(".select2-selection__rendered").attr("id", s).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", s), this.$selection.attr("aria-controls", s), this.$selection.on("mousedown", (function (t) {
                                1 === t.which && i.trigger("toggle", {
                                    originalEvent: t
                                })
                            })), this.$selection.on("focus", (function (t) { })), this.$selection.on("blur", (function (t) { })), t.on("focus", (function (e) {
                                t.isOpen() || i.$selection.trigger("focus")
                            }))
                        }, n.prototype.clear = function () {
                            var t = this.$selection.find(".select2-selection__rendered");
                            t.empty(), t.removeAttr("title")
                        }, n.prototype.display = function (t, e) {
                            var i = this.options.get("templateSelection");
                            return this.options.get("escapeMarkup")(i(t, e))
                        }, n.prototype.selectionContainer = function () {
                            return t("<span></span>")
                        }, n.prototype.update = function (t) {
                            var e, i;
                            0 !== t.length ? (i = t[0], e = this.$selection.find(".select2-selection__rendered"), t = this.display(i, e), e.empty().append(t), (i = i.title || i.text) ? e.attr("title", i) : e.removeAttr("title")) : this.clear()
                        }, n
                    })), x.define("select2/selection/multiple", ["jquery", "./base", "../utils"], (function (t, e, i) {
                        function s(t, e) {
                            s.__super__.constructor.apply(this, arguments)
                        }
                        return i.Extend(s, e), s.prototype.render = function () {
                            var t = s.__super__.render.call(this);
                            return t[0].classList.add("select2-selection--multiple"), t.html('<ul class="select2-selection__rendered"></ul>'), t
                        }, s.prototype.bind = function (e, n) {
                            var o = this;
                            s.__super__.bind.apply(this, arguments);
                            var r = e.id + "-container";
                            this.$selection.find(".select2-selection__rendered").attr("id", r), this.$selection.on("click", (function (t) {
                                o.trigger("toggle", {
                                    originalEvent: t
                                })
                            })), this.$selection.on("click", ".select2-selection__choice__remove", (function (e) {
                                var s;
                                o.isDisabled() || (s = t(this).parent(), s = i.GetData(s[0], "data"), o.trigger("unselect", {
                                    originalEvent: e,
                                    data: s
                                }))
                            })), this.$selection.on("keydown", ".select2-selection__choice__remove", (function (t) {
                                o.isDisabled() || t.stopPropagation()
                            }))
                        }, s.prototype.clear = function () {
                            var t = this.$selection.find(".select2-selection__rendered");
                            t.empty(), t.removeAttr("title")
                        }, s.prototype.display = function (t, e) {
                            var i = this.options.get("templateSelection");
                            return this.options.get("escapeMarkup")(i(t, e))
                        }, s.prototype.selectionContainer = function () {
                            return t('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>')
                        }, s.prototype.update = function (t) {
                            if (this.clear(), 0 !== t.length) {
                                for (var e = [], s = this.$selection.find(".select2-selection__rendered").attr("id") + "-choice-", n = 0; n < t.length; n++) {
                                    var o = t[n],
                                        r = this.selectionContainer(),
                                        a = this.display(o, r),
                                        l = s + i.generateChars(4) + "-";
                                    o.id ? l += o.id : l += i.generateChars(4), r.find(".select2-selection__choice__display").append(a).attr("id", l);
                                    var c = o.title || o.text;
                                    c && r.attr("title", c), a = this.options.get("translations").get("removeItem"), (c = r.find(".select2-selection__choice__remove")).attr("title", a()), c.attr("aria-label", a()), c.attr("aria-describedby", l), i.StoreData(r[0], "data", o), e.push(r)
                                }
                                this.$selection.find(".select2-selection__rendered").append(e)
                            }
                        }, s
                    })), x.define("select2/selection/placeholder", [], (function () {
                        function t(t, e, i) {
                            this.placeholder = this.normalizePlaceholder(i.get("placeholder")), t.call(this, e, i)
                        }
                        return t.prototype.normalizePlaceholder = function (t, e) {
                            return "string" == typeof e ? {
                                id: "",
                                text: e
                            } : e
                        }, t.prototype.createPlaceholder = function (t, e) {
                            var i = this.selectionContainer();
                            return i.html(this.display(e)), i[0].classList.add("select2-selection__placeholder"), i[0].classList.remove("select2-selection__choice"), e = e.title || e.text || i.text(), this.$selection.find(".select2-selection__rendered").attr("title", e), i
                        }, t.prototype.update = function (t, e) {
                            var i = 1 == e.length && e[0].id != this.placeholder.id;
                            if (1 < e.length || i) return t.call(this, e);
                            this.clear(), e = this.createPlaceholder(this.placeholder), this.$selection.find(".select2-selection__rendered").append(e)
                        }, t
                    })), x.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], (function (t, e, i) {
                        function s() { }
                        return s.prototype.bind = function (t, e, i) {
                            var s = this;
                            t.call(this, e, i), null == this.placeholder && this.options.get("debug") && window.console && console.error, this.$selection.on("mousedown", ".select2-selection__clear", (function (t) {
                                s._handleClear(t)
                            })), e.on("keypress", (function (t) {
                                s._handleKeyboardClear(t, e)
                            }))
                        }, s.prototype._handleClear = function (t, e) {
                            if (!this.isDisabled()) {
                                var s = this.$selection.find(".select2-selection__clear");
                                if (0 !== s.length) {
                                    e.stopPropagation();
                                    var n = i.GetData(s[0], "data"),
                                        o = this.$element.val();
                                    this.$element.val(this.placeholder.id);
                                    var r = {
                                        data: n
                                    };
                                    if (this.trigger("clear", r), r.prevented) this.$element.val(o);
                                    else {
                                        for (var a = 0; a < n.length; a++)
                                            if (r = {
                                                data: n[a]
                                            }, this.trigger("unselect", r), r.prevented) return void this.$element.val(o);
                                        this.$element.trigger("input").trigger("change"), this.trigger("toggle", {})
                                    }
                                }
                            }
                        }, s.prototype._handleKeyboardClear = function (t, i, s) {
                            s.isOpen() || i.which != e.DELETE && i.which != e.BACKSPACE || this._handleClear(i)
                        }, s.prototype.update = function (e, s) {
                            var n, o;
                            e.call(this, s), this.$selection.find(".select2-selection__clear").remove(), this.$selection[0].classList.remove("select2-selection--clearable"), 0 < this.$selection.find(".select2-selection__placeholder").length || 0 === s.length || (n = this.$selection.find(".select2-selection__rendered").attr("id"), o = this.options.get("translations").get("removeAllItems"), (e = t('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>')).attr("title", o()), e.attr("aria-label", o()), e.attr("aria-describedby", n), i.StoreData(e[0], "data", s), this.$selection.prepend(e), this.$selection[0].classList.add("select2-selection--clearable"))
                        }, s
                    })), x.define("select2/selection/search", ["jquery", "../utils", "../keys"], (function (t, e, i) {
                        function s(t, e, i) {
                            t.call(this, e, i)
                        }
                        return s.prototype.render = function (e) {
                            var i = this.options.get("translations").get("search"),
                                s = t('<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>');
                            return this.$searchContainer = s, this.$search = s.find("textarea"), this.$search.prop("autocomplete", this.options.get("autocomplete")), this.$search.attr("aria-label", i()), e = e.call(this), this._transferTabIndex(), e.append(this.$searchContainer), e
                        }, s.prototype.bind = function (t, s, n) {
                            var o = this,
                                r = s.id + "-results",
                                a = s.id + "-container";
                            t.call(this, s, n), o.$search.attr("aria-describedby", a), s.on("open", (function () {
                                o.$search.attr("aria-controls", r), o.$search.trigger("focus")
                            })), s.on("close", (function () {
                                o.$search.val(""), o.resizeSearch(), o.$search.removeAttr("aria-controls"), o.$search.removeAttr("aria-activedescendant"), o.$search.trigger("focus")
                            })), s.on("enable", (function () {
                                o.$search.prop("disabled", !1), o._transferTabIndex()
                            })), s.on("disable", (function () {
                                o.$search.prop("disabled", !0)
                            })), s.on("focus", (function (t) {
                                o.$search.trigger("focus")
                            })), s.on("results:focus", (function (t) {
                                t.data._resultId ? o.$search.attr("aria-activedescendant", t.data._resultId) : o.$search.removeAttr("aria-activedescendant")
                            })), this.$selection.on("focusin", ".select2-search--inline", (function (t) {
                                o.trigger("focus", t)
                            })), this.$selection.on("focusout", ".select2-search--inline", (function (t) {
                                o._handleBlur(t)
                            })), this.$selection.on("keydown", ".select2-search--inline", (function (t) {
                                var s;
                                t.stopPropagation(), o.trigger("keypress", t), o._keyUpPrevented = t.isDefaultPrevented(), t.which !== i.BACKSPACE || "" !== o.$search.val() || 0 < (s = o.$selection.find(".select2-selection__choice").last()).length && (s = e.GetData(s[0], "data"), o.searchRemoveChoice(s), t.preventDefault())
                            })), this.$selection.on("click", ".select2-search--inline", (function (t) {
                                o.$search.val() && t.stopPropagation()
                            }));
                            var l = (s = document.documentMode) && s <= 11;
                            this.$selection.on("input.searchcheck", ".select2-search--inline", (function (t) {
                                l ? o.$selection.off("input.search input.searchcheck") : o.$selection.off("keyup.search")
                            })), this.$selection.on("keyup.search input.search", ".select2-search--inline", (function (t) {
                                var e;
                                l && "input" === t.type ? o.$selection.off("input.search input.searchcheck") : (e = t.which) != i.SHIFT && e != i.CTRL && e != i.ALT && e != i.TAB && o.handleSearch(t)
                            }))
                        }, s.prototype._transferTabIndex = function (t) {
                            this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1")
                        }, s.prototype.createPlaceholder = function (t, e) {
                            this.$search.attr("placeholder", e.text)
                        }, s.prototype.update = function (t, e) {
                            var i = this.$search[0] == document.activeElement;
                            this.$search.attr("placeholder", ""), t.call(this, e), this.resizeSearch(), i && this.$search.trigger("focus")
                        }, s.prototype.handleSearch = function () {
                            var t;
                            this.resizeSearch(), this._keyUpPrevented || (t = this.$search.val(), this.trigger("query", {
                                term: t
                            })), this._keyUpPrevented = !1
                        }, s.prototype.searchRemoveChoice = function (t, e) {
                            this.trigger("unselect", {
                                data: e
                            }), this.$search.val(e.text), this.handleSearch()
                        }, s.prototype.resizeSearch = function () {
                            this.$search.css("width", "25px");
                            var t = "100%";
                            "" === this.$search.attr("placeholder") && (t = .75 * (this.$search.val().length + 1) + "em"), this.$search.css("width", t)
                        }, s
                    })), x.define("select2/selection/selectionCss", ["../utils"], (function (t) {
                        function e() { }
                        return e.prototype.render = function (e) {
                            var i = e.call(this);
                            return -1 !== (e = this.options.get("selectionCssClass") || "").indexOf(":all:") && (e = e.replace(":all:", ""), t.copyNonInternalCssClasses(i[0], this.$element[0])), i.addClass(e), i
                        }, e
                    })), x.define("select2/selection/eventRelay", ["jquery"], (function (t) {
                        function e() { }
                        return e.prototype.bind = function (e, i, s) {
                            var n = this,
                                o = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
                                r = ["opening", "closing", "selecting", "unselecting", "clearing"];
                            e.call(this, i, s), i.on("*", (function (e, i) {
                                var s; - 1 !== o.indexOf(e) && (i = i || {}, s = t.Event("select2:" + e, {
                                    params: i
                                }), n.$element.trigger(s), -1 !== r.indexOf(e) && (i.prevented = s.isDefaultPrevented()))
                            }))
                        }, e
                    })), x.define("select2/translation", ["jquery", "require"], (function (t, e) {
                        function i(t) {
                            this.dict = t || {}
                        }
                        return i.prototype.all = function () {
                            return this.dict
                        }, i.prototype.get = function (t) {
                            return this.dict[t]
                        }, i.prototype.extend = function (e) {
                            this.dict = t.extend({}, e.all(), this.dict)
                        }, i._cache = {}, i.loadPath = function (t) {
                            var s;
                            return t in i._cache || (s = e(t), i._cache[t] = s), new i(i._cache[t])
                        }, i
                    })), x.define("select2/diacritics", [], (function () {
                        return {
                            "â’¶": "A",
                            "ï¼¡": "A",
                            "Ã€": "A",
                            "Ã": "A",
                            "Ã‚": "A",
                            "áº¦": "A",
                            "áº¤": "A",
                            "áºª": "A",
                            "áº¨": "A",
                            "Ãƒ": "A",
                            "Ä€": "A",
                            "Ä‚": "A",
                            "áº°": "A",
                            "áº®": "A",
                            "áº´": "A",
                            "áº²": "A",
                            "È¦": "A",
                            "Ç ": "A",
                            "Ã„": "A",
                            "Çž": "A",
                            "áº¢": "A",
                            "Ã…": "A",
                            "Çº": "A",
                            "Ç": "A",
                            "È€": "A",
                            "È‚": "A",
                            "áº ": "A",
                            "áº¬": "A",
                            "áº¶": "A",
                            "á¸€": "A",
                            "Ä„": "A",
                            "Èº": "A",
                            "â±¯": "A",
                            "êœ²": "AA",
                            "Ã†": "AE",
                            "Ç¼": "AE",
                            "Ç¢": "AE",
                            "êœ´": "AO",
                            "êœ¶": "AU",
                            "êœ¸": "AV",
                            "êœº": "AV",
                            "êœ¼": "AY",
                            "â’·": "B",
                            "ï¼¢": "B",
                            "á¸‚": "B",
                            "á¸„": "B",
                            "á¸†": "B",
                            "Éƒ": "B",
                            "Æ‚": "B",
                            "Æ": "B",
                            "â’¸": "C",
                            "ï¼£": "C",
                            "Ä†": "C",
                            "Äˆ": "C",
                            "ÄŠ": "C",
                            "ÄŒ": "C",
                            "Ã‡": "C",
                            "á¸ˆ": "C",
                            "Æ‡": "C",
                            "È»": "C",
                            "êœ¾": "C",
                            "â’¹": "D",
                            "ï¼¤": "D",
                            "á¸Š": "D",
                            "ÄŽ": "D",
                            "á¸Œ": "D",
                            "á¸": "D",
                            "á¸’": "D",
                            "á¸Ž": "D",
                            "Ä": "D",
                            "Æ‹": "D",
                            "ÆŠ": "D",
                            "Æ‰": "D",
                            "ê¹": "D",
                            "Ç±": "DZ",
                            "Ç„": "DZ",
                            "Ç²": "Dz",
                            "Ç…": "Dz",
                            "â’º": "E",
                            "ï¼¥": "E",
                            "Ãˆ": "E",
                            "Ã‰": "E",
                            "ÃŠ": "E",
                            "á»€": "E",
                            "áº¾": "E",
                            "á»„": "E",
                            "á»‚": "E",
                            "áº¼": "E",
                            "Ä’": "E",
                            "á¸”": "E",
                            "á¸–": "E",
                            "Ä”": "E",
                            "Ä–": "E",
                            "Ã‹": "E",
                            "áºº": "E",
                            "Äš": "E",
                            "È„": "E",
                            "È†": "E",
                            "áº¸": "E",
                            "á»†": "E",
                            "È¨": "E",
                            "á¸œ": "E",
                            "Ä˜": "E",
                            "á¸˜": "E",
                            "á¸š": "E",
                            "Æ": "E",
                            "ÆŽ": "E",
                            "â’»": "F",
                            "ï¼¦": "F",
                            "á¸ž": "F",
                            "Æ‘": "F",
                            "ê»": "F",
                            "â’¼": "G",
                            "ï¼§": "G",
                            "Ç´": "G",
                            "Äœ": "G",
                            "á¸ ": "G",
                            "Äž": "G",
                            "Ä ": "G",
                            "Ç¦": "G",
                            "Ä¢": "G",
                            "Ç¤": "G",
                            "Æ“": "G",
                            "êž ": "G",
                            "ê½": "G",
                            "ê¾": "G",
                            "â’½": "H",
                            "ï¼¨": "H",
                            "Ä¤": "H",
                            "á¸¢": "H",
                            "á¸¦": "H",
                            "Èž": "H",
                            "á¸¤": "H",
                            "á¸¨": "H",
                            "á¸ª": "H",
                            "Ä¦": "H",
                            "â±§": "H",
                            "â±µ": "H",
                            "êž": "H",
                            "â’¾": "I",
                            "ï¼©": "I",
                            "ÃŒ": "I",
                            "Ã": "I",
                            "ÃŽ": "I",
                            "Ä¨": "I",
                            "Äª": "I",
                            "Ä¬": "I",
                            "Ä°": "I",
                            "Ã": "I",
                            "á¸®": "I",
                            "á»ˆ": "I",
                            "Ç": "I",
                            "Èˆ": "I",
                            "ÈŠ": "I",
                            "á»Š": "I",
                            "Ä®": "I",
                            "á¸¬": "I",
                            "Æ—": "I",
                            "â’¿": "J",
                            "ï¼ª": "J",
                            "Ä´": "J",
                            "Éˆ": "J",
                            "â“€": "K",
                            "ï¼«": "K",
                            "á¸°": "K",
                            "Ç¨": "K",
                            "á¸²": "K",
                            "Ä¶": "K",
                            "á¸´": "K",
                            "Æ˜": "K",
                            "â±©": "K",
                            "ê€": "K",
                            "ê‚": "K",
                            "ê„": "K",
                            "êž¢": "K",
                            "â“": "L",
                            "ï¼¬": "L",
                            "Ä¿": "L",
                            "Ä¹": "L",
                            "Ä½": "L",
                            "á¸¶": "L",
                            "á¸¸": "L",
                            "Ä»": "L",
                            "á¸¼": "L",
                            "á¸º": "L",
                            "Å": "L",
                            "È½": "L",
                            "â±¢": "L",
                            "â± ": "L",
                            "êˆ": "L",
                            "ê†": "L",
                            "êž€": "L",
                            "Ç‡": "LJ",
                            "Çˆ": "Lj",
                            "â“‚": "M",
                            "ï¼­": "M",
                            "á¸¾": "M",
                            "á¹€": "M",
                            "á¹‚": "M",
                            "â±®": "M",
                            "Æœ": "M",
                            "â“ƒ": "N",
                            "ï¼®": "N",
                            "Ç¸": "N",
                            "Åƒ": "N",
                            "Ã‘": "N",
                            "á¹„": "N",
                            "Å‡": "N",
                            "á¹†": "N",
                            "Å…": "N",
                            "á¹Š": "N",
                            "á¹ˆ": "N",
                            "È ": "N",
                            "Æ": "N",
                            "êž": "N",
                            "êž¤": "N",
                            "ÇŠ": "NJ",
                            "Ç‹": "Nj",
                            "â“„": "O",
                            "ï¼¯": "O",
                            "Ã’": "O",
                            "Ã“": "O",
                            "Ã”": "O",
                            "á»’": "O",
                            "á»": "O",
                            "á»–": "O",
                            "á»”": "O",
                            "Ã•": "O",
                            "á¹Œ": "O",
                            "È¬": "O",
                            "á¹Ž": "O",
                            "ÅŒ": "O",
                            "á¹": "O",
                            "á¹’": "O",
                            "ÅŽ": "O",
                            "È®": "O",
                            "È°": "O",
                            "Ã–": "O",
                            "Èª": "O",
                            "á»Ž": "O",
                            "Å": "O",
                            "Ç‘": "O",
                            "ÈŒ": "O",
                            "ÈŽ": "O",
                            "Æ ": "O",
                            "á»œ": "O",
                            "á»š": "O",
                            "á» ": "O",
                            "á»ž": "O",
                            "á»¢": "O",
                            "á»Œ": "O",
                            "á»˜": "O",
                            "Çª": "O",
                            "Ç¬": "O",
                            "Ã˜": "O",
                            "Ç¾": "O",
                            "Æ†": "O",
                            "ÆŸ": "O",
                            "êŠ": "O",
                            "êŒ": "O",
                            "Å’": "OE",
                            "Æ¢": "OI",
                            "êŽ": "OO",
                            "È¢": "OU",
                            "â“…": "P",
                            "ï¼°": "P",
                            "á¹”": "P",
                            "á¹–": "P",
                            "Æ¤": "P",
                            "â±£": "P",
                            "ê": "P",
                            "ê’": "P",
                            "ê”": "P",
                            "â“†": "Q",
                            "ï¼±": "Q",
                            "ê–": "Q",
                            "ê˜": "Q",
                            "ÉŠ": "Q",
                            "â“‡": "R",
                            "ï¼²": "R",
                            "Å”": "R",
                            "á¹˜": "R",
                            "Å˜": "R",
                            "È": "R",
                            "È’": "R",
                            "á¹š": "R",
                            "á¹œ": "R",
                            "Å–": "R",
                            "á¹ž": "R",
                            "ÉŒ": "R",
                            "â±¤": "R",
                            "êš": "R",
                            "êž¦": "R",
                            "êž‚": "R",
                            "â“ˆ": "S",
                            "ï¼³": "S",
                            "áºž": "S",
                            "Åš": "S",
                            "á¹¤": "S",
                            "Åœ": "S",
                            "á¹ ": "S",
                            "Å ": "S",
                            "á¹¦": "S",
                            "á¹¢": "S",
                            "á¹¨": "S",
                            "È˜": "S",
                            "Åž": "S",
                            "â±¾": "S",
                            "êž¨": "S",
                            "êž„": "S",
                            "â“‰": "T",
                            "ï¼´": "T",
                            "á¹ª": "T",
                            "Å¤": "T",
                            "á¹¬": "T",
                            "Èš": "T",
                            "Å¢": "T",
                            "á¹°": "T",
                            "á¹®": "T",
                            "Å¦": "T",
                            "Æ¬": "T",
                            "Æ®": "T",
                            "È¾": "T",
                            "êž†": "T",
                            "êœ¨": "TZ",
                            "â“Š": "U",
                            "ï¼µ": "U",
                            "Ã™": "U",
                            "Ãš": "U",
                            "Ã›": "U",
                            "Å¨": "U",
                            "á¹¸": "U",
                            "Åª": "U",
                            "á¹º": "U",
                            "Å¬": "U",
                            "Ãœ": "U",
                            "Ç›": "U",
                            "Ç—": "U",
                            "Ç•": "U",
                            "Ç™": "U",
                            "á»¦": "U",
                            "Å®": "U",
                            "Å°": "U",
                            "Ç“": "U",
                            "È”": "U",
                            "È–": "U",
                            "Æ¯": "U",
                            "á»ª": "U",
                            "á»¨": "U",
                            "á»®": "U",
                            "á»¬": "U",
                            "á»°": "U",
                            "á»¤": "U",
                            "á¹²": "U",
                            "Å²": "U",
                            "á¹¶": "U",
                            "á¹´": "U",
                            "É„": "U",
                            "â“‹": "V",
                            "ï¼¶": "V",
                            "á¹¼": "V",
                            "á¹¾": "V",
                            "Æ²": "V",
                            "êž": "V",
                            "É…": "V",
                            "ê ": "VY",
                            "â“Œ": "W",
                            "ï¼·": "W",
                            "áº€": "W",
                            "áº‚": "W",
                            "Å´": "W",
                            "áº†": "W",
                            "áº„": "W",
                            "áºˆ": "W",
                            "â±²": "W",
                            "â“": "X",
                            "ï¼¸": "X",
                            "áºŠ": "X",
                            "áºŒ": "X",
                            "â“Ž": "Y",
                            "ï¼¹": "Y",
                            "á»²": "Y",
                            "Ã": "Y",
                            "Å¶": "Y",
                            "á»¸": "Y",
                            "È²": "Y",
                            "áºŽ": "Y",
                            "Å¸": "Y",
                            "á»¶": "Y",
                            "á»´": "Y",
                            "Æ³": "Y",
                            "ÉŽ": "Y",
                            "á»¾": "Y",
                            "â“": "Z",
                            "ï¼º": "Z",
                            "Å¹": "Z",
                            "áº": "Z",
                            "Å»": "Z",
                            "Å½": "Z",
                            "áº’": "Z",
                            "áº”": "Z",
                            "Æµ": "Z",
                            "È¤": "Z",
                            "â±¿": "Z",
                            "â±«": "Z",
                            "ê¢": "Z",
                            "â“": "a",
                            "ï½": "a",
                            "áºš": "a",
                            "Ã ": "a",
                            "Ã¡": "a",
                            "Ã¢": "a",
                            "áº§": "a",
                            "áº¥": "a",
                            "áº«": "a",
                            "áº©": "a",
                            "Ã£": "a",
                            "Ä": "a",
                            "Äƒ": "a",
                            "áº±": "a",
                            "áº¯": "a",
                            "áºµ": "a",
                            "áº³": "a",
                            "È§": "a",
                            "Ç¡": "a",
                            "Ã¤": "a",
                            "ÇŸ": "a",
                            "áº£": "a",
                            "Ã¥": "a",
                            "Ç»": "a",
                            "ÇŽ": "a",
                            "È": "a",
                            "Èƒ": "a",
                            "áº¡": "a",
                            "áº­": "a",
                            "áº·": "a",
                            "á¸": "a",
                            "Ä…": "a",
                            "â±¥": "a",
                            "É": "a",
                            "êœ³": "aa",
                            "Ã¦": "ae",
                            "Ç½": "ae",
                            "Ç£": "ae",
                            "êœµ": "ao",
                            "êœ·": "au",
                            "êœ¹": "av",
                            "êœ»": "av",
                            "êœ½": "ay",
                            "â“‘": "b",
                            "ï½‚": "b",
                            "á¸ƒ": "b",
                            "á¸…": "b",
                            "á¸‡": "b",
                            "Æ€": "b",
                            "Æƒ": "b",
                            "É“": "b",
                            "â“’": "c",
                            "ï½ƒ": "c",
                            "Ä‡": "c",
                            "Ä‰": "c",
                            "Ä‹": "c",
                            "Ä": "c",
                            "Ã§": "c",
                            "á¸‰": "c",
                            "Æˆ": "c",
                            "È¼": "c",
                            "êœ¿": "c",
                            "â†„": "c",
                            "â““": "d",
                            "ï½„": "d",
                            "á¸‹": "d",
                            "Ä": "d",
                            "á¸": "d",
                            "á¸‘": "d",
                            "á¸“": "d",
                            "á¸": "d",
                            "Ä‘": "d",
                            "ÆŒ": "d",
                            "É–": "d",
                            "É—": "d",
                            "êº": "d",
                            "Ç³": "dz",
                            "Ç†": "dz",
                            "â“”": "e",
                            "ï½…": "e",
                            "Ã¨": "e",
                            "Ã©": "e",
                            "Ãª": "e",
                            "á»": "e",
                            "áº¿": "e",
                            "á»…": "e",
                            "á»ƒ": "e",
                            "áº½": "e",
                            "Ä“": "e",
                            "á¸•": "e",
                            "á¸—": "e",
                            "Ä•": "e",
                            "Ä—": "e",
                            "Ã«": "e",
                            "áº»": "e",
                            "Ä›": "e",
                            "È…": "e",
                            "È‡": "e",
                            "áº¹": "e",
                            "á»‡": "e",
                            "È©": "e",
                            "á¸": "e",
                            "Ä™": "e",
                            "á¸™": "e",
                            "á¸›": "e",
                            "É‡": "e",
                            "É›": "e",
                            "Ç": "e",
                            "â“•": "f",
                            "ï½†": "f",
                            "á¸Ÿ": "f",
                            "Æ’": "f",
                            "ê¼": "f",
                            "â“–": "g",
                            "ï½‡": "g",
                            "Çµ": "g",
                            "Ä": "g",
                            "á¸¡": "g",
                            "ÄŸ": "g",
                            "Ä¡": "g",
                            "Ç§": "g",
                            "Ä£": "g",
                            "Ç¥": "g",
                            "É ": "g",
                            "êž¡": "g",
                            "áµ¹": "g",
                            "ê¿": "g",
                            "â“—": "h",
                            "ï½ˆ": "h",
                            "Ä¥": "h",
                            "á¸£": "h",
                            "á¸§": "h",
                            "ÈŸ": "h",
                            "á¸¥": "h",
                            "á¸©": "h",
                            "á¸«": "h",
                            "áº–": "h",
                            "Ä§": "h",
                            "â±¨": "h",
                            "â±¶": "h",
                            "É¥": "h",
                            "Æ•": "hv",
                            "â“˜": "i",
                            "ï½‰": "i",
                            "Ã¬": "i",
                            "Ã­": "i",
                            "Ã®": "i",
                            "Ä©": "i",
                            "Ä«": "i",
                            "Ä­": "i",
                            "Ã¯": "i",
                            "á¸¯": "i",
                            "á»‰": "i",
                            "Ç": "i",
                            "È‰": "i",
                            "È‹": "i",
                            "á»‹": "i",
                            "Ä¯": "i",
                            "á¸­": "i",
                            "É¨": "i",
                            "Ä±": "i",
                            "â“™": "j",
                            "ï½Š": "j",
                            "Äµ": "j",
                            "Ç°": "j",
                            "É‰": "j",
                            "â“š": "k",
                            "ï½‹": "k",
                            "á¸±": "k",
                            "Ç©": "k",
                            "á¸³": "k",
                            "Ä·": "k",
                            "á¸µ": "k",
                            "Æ™": "k",
                            "â±ª": "k",
                            "ê": "k",
                            "êƒ": "k",
                            "ê…": "k",
                            "êž£": "k",
                            "â“›": "l",
                            "ï½Œ": "l",
                            "Å€": "l",
                            "Äº": "l",
                            "Ä¾": "l",
                            "á¸·": "l",
                            "á¸¹": "l",
                            "Ä¼": "l",
                            "á¸½": "l",
                            "á¸»": "l",
                            "Å¿": "l",
                            "Å‚": "l",
                            "Æš": "l",
                            "É«": "l",
                            "â±¡": "l",
                            "ê‰": "l",
                            "êž": "l",
                            "ê‡": "l",
                            "Ç‰": "lj",
                            "â“œ": "m",
                            "ï½": "m",
                            "á¸¿": "m",
                            "á¹": "m",
                            "á¹ƒ": "m",
                            "É±": "m",
                            "É¯": "m",
                            "â“": "n",
                            "ï½Ž": "n",
                            "Ç¹": "n",
                            "Å„": "n",
                            "Ã±": "n",
                            "á¹…": "n",
                            "Åˆ": "n",
                            "á¹‡": "n",
                            "Å†": "n",
                            "á¹‹": "n",
                            "á¹‰": "n",
                            "Æž": "n",
                            "É²": "n",
                            "Å‰": "n",
                            "êž‘": "n",
                            "êž¥": "n",
                            "ÇŒ": "nj",
                            "â“ž": "o",
                            "ï½": "o",
                            "Ã²": "o",
                            "Ã³": "o",
                            "Ã´": "o",
                            "á»“": "o",
                            "á»‘": "o",
                            "á»—": "o",
                            "á»•": "o",
                            "Ãµ": "o",
                            "á¹": "o",
                            "È­": "o",
                            "á¹": "o",
                            "Å": "o",
                            "á¹‘": "o",
                            "á¹“": "o",
                            "Å": "o",
                            "È¯": "o",
                            "È±": "o",
                            "Ã¶": "o",
                            "È«": "o",
                            "á»": "o",
                            "Å‘": "o",
                            "Ç’": "o",
                            "È": "o",
                            "È": "o",
                            "Æ¡": "o",
                            "á»": "o",
                            "á»›": "o",
                            "á»¡": "o",
                            "á»Ÿ": "o",
                            "á»£": "o",
                            "á»": "o",
                            "á»™": "o",
                            "Ç«": "o",
                            "Ç­": "o",
                            "Ã¸": "o",
                            "Ç¿": "o",
                            "É”": "o",
                            "ê‹": "o",
                            "ê": "o",
                            "Éµ": "o",
                            "Å“": "oe",
                            "Æ£": "oi",
                            "È£": "ou",
                            "ê": "oo",
                            "â“Ÿ": "p",
                            "ï½": "p",
                            "á¹•": "p",
                            "á¹—": "p",
                            "Æ¥": "p",
                            "áµ½": "p",
                            "ê‘": "p",
                            "ê“": "p",
                            "ê•": "p",
                            "â“ ": "q",
                            "ï½‘": "q",
                            "É‹": "q",
                            "ê—": "q",
                            "ê™": "q",
                            "â“¡": "r",
                            "ï½’": "r",
                            "Å•": "r",
                            "á¹™": "r",
                            "Å™": "r",
                            "È‘": "r",
                            "È“": "r",
                            "á¹›": "r",
                            "á¹": "r",
                            "Å—": "r",
                            "á¹Ÿ": "r",
                            "É": "r",
                            "É½": "r",
                            "ê›": "r",
                            "êž§": "r",
                            "êžƒ": "r",
                            "â“¢": "s",
                            "ï½“": "s",
                            "ÃŸ": "s",
                            "Å›": "s",
                            "á¹¥": "s",
                            "Å": "s",
                            "á¹¡": "s",
                            "Å¡": "s",
                            "á¹§": "s",
                            "á¹£": "s",
                            "á¹©": "s",
                            "È™": "s",
                            "ÅŸ": "s",
                            "È¿": "s",
                            "êž©": "s",
                            "êž…": "s",
                            "áº›": "s",
                            "â“£": "t",
                            "ï½”": "t",
                            "á¹«": "t",
                            "áº—": "t",
                            "Å¥": "t",
                            "á¹­": "t",
                            "È›": "t",
                            "Å£": "t",
                            "á¹±": "t",
                            "á¹¯": "t",
                            "Å§": "t",
                            "Æ­": "t",
                            "Êˆ": "t",
                            "â±¦": "t",
                            "êž‡": "t",
                            "êœ©": "tz",
                            "â“¤": "u",
                            "ï½•": "u",
                            "Ã¹": "u",
                            "Ãº": "u",
                            "Ã»": "u",
                            "Å©": "u",
                            "á¹¹": "u",
                            "Å«": "u",
                            "á¹»": "u",
                            "Å­": "u",
                            "Ã¼": "u",
                            "Çœ": "u",
                            "Ç˜": "u",
                            "Ç–": "u",
                            "Çš": "u",
                            "á»§": "u",
                            "Å¯": "u",
                            "Å±": "u",
                            "Ç”": "u",
                            "È•": "u",
                            "È—": "u",
                            "Æ°": "u",
                            "á»«": "u",
                            "á»©": "u",
                            "á»¯": "u",
                            "á»­": "u",
                            "á»±": "u",
                            "á»¥": "u",
                            "á¹³": "u",
                            "Å³": "u",
                            "á¹·": "u",
                            "á¹µ": "u",
                            "Ê‰": "u",
                            "â“¥": "v",
                            "ï½–": "v",
                            "á¹½": "v",
                            "á¹¿": "v",
                            "Ê‹": "v",
                            "êŸ": "v",
                            "ÊŒ": "v",
                            "ê¡": "vy",
                            "â“¦": "w",
                            "ï½—": "w",
                            "áº": "w",
                            "áºƒ": "w",
                            "Åµ": "w",
                            "áº‡": "w",
                            "áº…": "w",
                            "áº˜": "w",
                            "áº‰": "w",
                            "â±³": "w",
                            "â“§": "x",
                            "ï½˜": "x",
                            "áº‹": "x",
                            "áº": "x",
                            "â“¨": "y",
                            "ï½™": "y",
                            "á»³": "y",
                            "Ã½": "y",
                            "Å·": "y",
                            "á»¹": "y",
                            "È³": "y",
                            "áº": "y",
                            "Ã¿": "y",
                            "á»·": "y",
                            "áº™": "y",
                            "á»µ": "y",
                            "Æ´": "y",
                            "É": "y",
                            "á»¿": "y",
                            "â“©": "z",
                            "ï½š": "z",
                            "Åº": "z",
                            "áº‘": "z",
                            "Å¼": "z",
                            "Å¾": "z",
                            "áº“": "z",
                            "áº•": "z",
                            "Æ¶": "z",
                            "È¥": "z",
                            "É€": "z",
                            "â±¬": "z",
                            "ê£": "z",
                            "Î†": "Î‘",
                            "Îˆ": "Î•",
                            "Î‰": "Î—",
                            "ÎŠ": "Î™",
                            "Îª": "Î™",
                            "ÎŒ": "ÎŸ",
                            "ÎŽ": "Î¥",
                            "Î«": "Î¥",
                            "Î": "Î©",
                            "Î¬": "Î±",
                            "Î­": "Îµ",
                            "Î®": "Î·",
                            "Î¯": "Î¹",
                            "ÏŠ": "Î¹",
                            "Î": "Î¹",
                            "ÏŒ": "Î¿",
                            "Ï": "Ï…",
                            "Ï‹": "Ï…",
                            "Î°": "Ï…",
                            "ÏŽ": "Ï‰",
                            "Ï‚": "Ïƒ",
                            "â€™": "'"
                        }
                    })), x.define("select2/data/base", ["../utils"], (function (t) {
                        function e(t, i) {
                            e.__super__.constructor.call(this)
                        }
                        return t.Extend(e, t.Observable), e.prototype.current = function (t) {
                            throw new Error("The `current` method must be defined in child classes.")
                        }, e.prototype.query = function (t, e) {
                            throw new Error("The `query` method must be defined in child classes.")
                        }, e.prototype.bind = function (t, e) { }, e.prototype.destroy = function () { }, e.prototype.generateResultId = function (e, i) {
                            return e = e.id + "-result-", e += t.generateChars(4), null != i.id ? e += "-" + i.id.toString() : e += "-" + t.generateChars(4), e
                        }, e
                    })), x.define("select2/data/select", ["./base", "../utils", "jquery"], (function (t, e, i) {
                        function s(t, e) {
                            this.$element = t, this.options = e, s.__super__.constructor.call(this)
                        }
                        return e.Extend(s, t), s.prototype.current = function (t) {
                            var e = this;
                            t(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"), (function (t) {
                                return e.item(i(t))
                            })))
                        }, s.prototype.select = function (t) {
                            var e, i = this;
                            if (t.selected = !0, null != t.element && "option" === t.element.tagName.toLowerCase()) return t.element.selected = !0, void this.$element.trigger("input").trigger("change");
                            this.$element.prop("multiple") ? this.current((function (e) {
                                var s = [];
                                (t = [t]).push.apply(t, e);
                                for (var n = 0; n < t.length; n++) {
                                    var o = t[n].id; - 1 === s.indexOf(o) && s.push(o)
                                }
                                i.$element.val(s), i.$element.trigger("input").trigger("change")
                            })) : (e = t.id, this.$element.val(e), this.$element.trigger("input").trigger("change"))
                        }, s.prototype.unselect = function (t) {
                            var e = this;
                            if (this.$element.prop("multiple")) {
                                if (t.selected = !1, null != t.element && "option" === t.element.tagName.toLowerCase()) return t.element.selected = !1, void this.$element.trigger("input").trigger("change");
                                this.current((function (i) {
                                    for (var s = [], n = 0; n < i.length; n++) {
                                        var o = i[n].id;
                                        o !== t.id && -1 === s.indexOf(o) && s.push(o)
                                    }
                                    e.$element.val(s), e.$element.trigger("input").trigger("change")
                                }))
                            }
                        }, s.prototype.bind = function (t, e) {
                            var i = this;
                            (this.container = t).on("select", (function (t) {
                                i.select(t.data)
                            })), t.on("unselect", (function (t) {
                                i.unselect(t.data)
                            }))
                        }, s.prototype.destroy = function () {
                            this.$element.find("*").each((function () {
                                e.RemoveData(this)
                            }))
                        }, s.prototype.query = function (t, e) {
                            var s = [],
                                n = this;
                            this.$element.children().each((function () {
                                var e;
                                "option" !== this.tagName.toLowerCase() && "optgroup" !== this.tagName.toLowerCase() || (e = i(this), e = n.item(e), null !== (e = n.matches(t, e)) && s.push(e))
                            })), e({
                                results: s
                            })
                        }, s.prototype.addOptions = function (t) {
                            this.$element.append(t)
                        }, s.prototype.option = function (t) {
                            var s;
                            return t.children ? (s = document.createElement("optgroup")).label = t.text : void 0 !== (s = document.createElement("option")).textContent ? s.textContent = t.text : s.innerText = t.text, void 0 !== t.id && (s.value = t.id), t.disabled && (s.disabled = !0), t.selected && (s.selected = !0), t.title && (s.title = t.title), (t = this._normalizeItem(t)).element = s, e.StoreData(s, "data", t), i(s)
                        }, s.prototype.item = function (t) {
                            var s = {};
                            if (null != (s = e.GetData(t[0], "data"))) return s;
                            var n = t[0];
                            if ("option" === n.tagName.toLowerCase()) s = {
                                id: t.val(),
                                text: t.text(),
                                disabled: t.prop("disabled"),
                                selected: t.prop("selected"),
                                title: t.prop("title")
                            };
                            else if ("optgroup" === n.tagName.toLowerCase()) {
                                s = {
                                    text: t.prop("label"),
                                    children: [],
                                    title: t.prop("title")
                                };
                                for (var o = t.children("option"), r = [], a = 0; a < o.length; a++) {
                                    var l = i(o[a]);
                                    l = this.item(l);
                                    r.push(l)
                                }
                                s.children = r
                            }
                            return (s = this._normalizeItem(s)).element = t[0], e.StoreData(t[0], "data", s), s
                        }, s.prototype._normalizeItem = function (t) {
                            return t !== Object(t) && (t = {
                                id: t,
                                text: t
                            }), null != (t = i.extend({}, {
                                text: ""
                            }, t)).id && (t.id = t.id.toString()), null != t.text && (t.text = t.text.toString()), null == t._resultId && t.id && null != this.container && (t._resultId = this.generateResultId(this.container, t)), i.extend({}, {
                                selected: !1,
                                disabled: !1
                            }, t)
                        }, s.prototype.matches = function (t, e) {
                            return this.options.get("matcher")(t, e)
                        }, s
                    })), x.define("select2/data/array", ["./select", "../utils", "jquery"], (function (t, e, i) {
                        function s(t, e) {
                            this._dataToConvert = e.get("data") || [], s.__super__.constructor.call(this, t, e)
                        }
                        return e.Extend(s, t), s.prototype.bind = function (t, e) {
                            s.__super__.bind.call(this, t, e), this.addOptions(this.convertToOptions(this._dataToConvert))
                        }, s.prototype.select = function (t) {
                            var e = this.$element.find("option").filter((function (e, i) {
                                return i.value == t.id.toString()
                            }));
                            0 === e.length && (e = this.option(t), this.addOptions(e)), s.__super__.select.call(this, t)
                        }, s.prototype.convertToOptions = function (t) {
                            for (var e = this, s = this.$element.find("option"), n = s.map((function () {
                                return e.item(i(this)).id
                            })).get(), o = [], r = 0; r < t.length; r++) {
                                var a, l, c = this._normalizeItem(t[r]);
                                0 <= n.indexOf(c.id) ? (a = s.filter(function (t) {
                                    return function () {
                                        return i(this).val() == t.id
                                    }
                                }(c)), l = this.item(a), l = i.extend(!0, {}, c, l), l = this.option(l), a.replaceWith(l)) : (l = this.option(c), c.children && (c = this.convertToOptions(c.children), l.append(c)), o.push(l))
                            }
                            return o
                        }, s
                    })), x.define("select2/data/ajax", ["./array", "../utils", "jquery"], (function (t, e, i) {
                        function s(t, e) {
                            this.ajaxOptions = this._applyDefaults(e.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), s.__super__.constructor.call(this, t, e)
                        }
                        return e.Extend(s, t), s.prototype._applyDefaults = function (t) {
                            var e = {
                                data: function (t) {
                                    return i.extend({}, t, {
                                        q: t.term
                                    })
                                },
                                transport: function (t, e, s) {
                                    return (t = i.ajax(t)).then(e), t.fail(s), t
                                }
                            };
                            return i.extend({}, e, t, !0)
                        }, s.prototype.processResults = function (t) {
                            return t
                        }, s.prototype.query = function (t, e) {
                            var s = this;
                            null != this._request && ("function" == typeof this._request.abort && this._request.abort(), this._request = null);
                            var n = i.extend({
                                type: "GET"
                            }, this.ajaxOptions);

                            function o() {
                                var i = n.transport(n, (function (i) {
                                    i = s.processResults(i, t), s.options.get("debug") && window.console && console.error && i && i.results && Array.isArray(i.results), e(i)
                                }), (function () {
                                    "status" in i && (0 === i.status || "0" === i.status) || s.trigger("results:message", {
                                        message: "errorLoading"
                                    })
                                }));
                                s._request = i
                            }
                            "function" == typeof n.url && (n.url = n.url.call(this.$element, t)), "function" == typeof n.data && (n.data = n.data.call(this.$element, t)), this.ajaxOptions.delay && null != t.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(o, this.ajaxOptions.delay)) : o()
                        }, s
                    })), x.define("select2/data/tags", ["jquery"], (function (t) {
                        function e(t, e, i) {
                            var s = i.get("tags"),
                                n = i.get("createTag");
                            if (void 0 !== n && (this.createTag = n), void 0 !== (n = i.get("insertTag")) && (this.insertTag = n), t.call(this, e, i), Array.isArray(s))
                                for (var o = 0; o < s.length; o++) {
                                    var r = s[o];
                                    r = this._normalizeItem(r), r = this.option(r);
                                    this.$element.append(r)
                                }
                        }
                        return e.prototype.query = function (t, e, i) {
                            var s = this;
                            this._removeOldTags(), null != e.term && null == e.page ? t.call(this, e, (function t(n, o) {
                                for (var r = n.results, a = 0; a < r.length; a++) {
                                    var l = r[a],
                                        c = null != l.children && !t({
                                            results: l.children
                                        }, !0);
                                    if ((l.text || "").toUpperCase() === (e.term || "").toUpperCase() || c) return !o && (n.data = r, void i(n))
                                }
                                if (o) return !0;
                                var d, h = s.createTag(e);
                                null != h && ((d = s.option(h)).attr("data-select2-tag", "true"), s.addOptions([d]), s.insertTag(r, h)), n.results = r, i(n)
                            })) : t.call(this, e, i)
                        }, e.prototype.createTag = function (t, e) {
                            return null == e.term || "" === (e = e.term.trim()) ? null : {
                                id: e,
                                text: e
                            }
                        }, e.prototype.insertTag = function (t, e, i) {
                            e.unshift(i)
                        }, e.prototype._removeOldTags = function (e) {
                            this.$element.find("option[data-select2-tag]").each((function () {
                                this.selected || t(this).remove()
                            }))
                        }, e
                    })), x.define("select2/data/tokenizer", ["jquery"], (function (t) {
                        function e(t, e, i) {
                            var s = i.get("tokenizer");
                            void 0 !== s && (this.tokenizer = s), t.call(this, e, i)
                        }
                        return e.prototype.bind = function (t, e, i) {
                            t.call(this, e, i), this.$search = e.dropdown.$search || e.selection.$search || i.find(".select2-search__field")
                        }, e.prototype.query = function (e, i, s) {
                            var n = this;
                            i.term = i.term || "";
                            var o = this.tokenizer(i, this.options, (function (e) {
                                var i, s = n._normalizeItem(e);
                                n.$element.find("option").filter((function () {
                                    return t(this).val() === s.id
                                })).length || ((i = n.option(s)).attr("data-select2-tag", !0), n._removeOldTags(), n.addOptions([i])), i = s, n.trigger("select", {
                                    data: i
                                })
                            }));
                            o.term !== i.term && (this.$search.length && (this.$search.val(o.term), this.$search.trigger("focus")), i.term = o.term), e.call(this, i, s)
                        }, e.prototype.tokenizer = function (e, i, s, n) {
                            for (var o = s.get("tokenSeparators") || [], r = i.term, a = 0, l = this.createTag || function (t) {
                                return {
                                    id: t.term,
                                    text: t.term
                                }
                            }; a < r.length;) {
                                var c = r[a]; - 1 !== o.indexOf(c) ? (c = r.substr(0, a), null != (c = l(t.extend({}, i, {
                                    term: c
                                }))) ? (n(c), r = r.substr(a + 1) || "", a = 0) : a++) : a++
                            }
                            return {
                                term: r
                            }
                        }, e
                    })), x.define("select2/data/minimumInputLength", [], (function () {
                        function t(t, e, i) {
                            this.minimumInputLength = i.get("minimumInputLength"), t.call(this, e, i)
                        }
                        return t.prototype.query = function (t, e, i) {
                            e.term = e.term || "", e.term.length < this.minimumInputLength ? this.trigger("results:message", {
                                message: "inputTooShort",
                                args: {
                                    minimum: this.minimumInputLength,
                                    input: e.term,
                                    params: e
                                }
                            }) : t.call(this, e, i)
                        }, t
                    })), x.define("select2/data/maximumInputLength", [], (function () {
                        function t(t, e, i) {
                            this.maximumInputLength = i.get("maximumInputLength"), t.call(this, e, i)
                        }
                        return t.prototype.query = function (t, e, i) {
                            e.term = e.term || "", 0 < this.maximumInputLength && e.term.length > this.maximumInputLength ? this.trigger("results:message", {
                                message: "inputTooLong",
                                args: {
                                    maximum: this.maximumInputLength,
                                    input: e.term,
                                    params: e
                                }
                            }) : t.call(this, e, i)
                        }, t
                    })), x.define("select2/data/maximumSelectionLength", [], (function () {
                        function t(t, e, i) {
                            this.maximumSelectionLength = i.get("maximumSelectionLength"), t.call(this, e, i)
                        }
                        return t.prototype.bind = function (t, e, i) {
                            var s = this;
                            t.call(this, e, i), e.on("select", (function () {
                                s._checkIfMaximumSelected()
                            }))
                        }, t.prototype.query = function (t, e, i) {
                            var s = this;
                            this._checkIfMaximumSelected((function () {
                                t.call(s, e, i)
                            }))
                        }, t.prototype._checkIfMaximumSelected = function (t, e) {
                            var i = this;
                            this.current((function (t) {
                                t = null != t ? t.length : 0, 0 < i.maximumSelectionLength && t >= i.maximumSelectionLength ? i.trigger("results:message", {
                                    message: "maximumSelected",
                                    args: {
                                        maximum: i.maximumSelectionLength
                                    }
                                }) : e && e()
                            }))
                        }, t
                    })), x.define("select2/dropdown", ["jquery", "./utils"], (function (t, e) {
                        function i(t, e) {
                            this.$element = t, this.options = e, i.__super__.constructor.call(this)
                        }
                        return e.Extend(i, e.Observable), i.prototype.render = function () {
                            var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                            return e.attr("dir", this.options.get("dir")), this.$dropdown = e
                        }, i.prototype.bind = function () { }, i.prototype.position = function (t, e) { }, i.prototype.destroy = function () {
                            this.$dropdown.remove()
                        }, i
                    })), x.define("select2/dropdown/search", ["jquery"], (function (t) {
                        function e() { }
                        return e.prototype.render = function (e) {
                            var i = e.call(this),
                                s = this.options.get("translations").get("search");
                            e = t('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
                            return this.$searchContainer = e, this.$search = e.find("input"), this.$search.prop("autocomplete", this.options.get("autocomplete")), this.$search.attr("aria-label", s()), i.prepend(e), i
                        }, e.prototype.bind = function (e, i, s) {
                            var n = this,
                                o = i.id + "-results";
                            e.call(this, i, s), this.$search.on("keydown", (function (t) {
                                n.trigger("keypress", t), n._keyUpPrevented = t.isDefaultPrevented()
                            })), this.$search.on("input", (function (e) {
                                t(this).off("keyup")
                            })), this.$search.on("keyup input", (function (t) {
                                n.handleSearch(t)
                            })), i.on("open", (function () {
                                n.$search.attr("tabindex", 0), n.$search.attr("aria-controls", o), n.$search.trigger("focus"), window.setTimeout((function () {
                                    n.$search.trigger("focus")
                                }), 0)
                            })), i.on("close", (function () {
                                n.$search.attr("tabindex", -1), n.$search.removeAttr("aria-controls"), n.$search.removeAttr("aria-activedescendant"), n.$search.val(""), n.$search.trigger("blur")
                            })), i.on("focus", (function () {
                                i.isOpen() || n.$search.trigger("focus")
                            })), i.on("results:all", (function (t) {
                                null != t.query.term && "" !== t.query.term || (n.showSearch(t) ? n.$searchContainer[0].classList.remove("select2-search--hide") : n.$searchContainer[0].classList.add("select2-search--hide"))
                            })), i.on("results:focus", (function (t) {
                                t.data._resultId ? n.$search.attr("aria-activedescendant", t.data._resultId) : n.$search.removeAttr("aria-activedescendant")
                            }))
                        }, e.prototype.handleSearch = function (t) {
                            var e;
                            this._keyUpPrevented || (e = this.$search.val(), this.trigger("query", {
                                term: e
                            })), this._keyUpPrevented = !1
                        }, e.prototype.showSearch = function (t, e) {
                            return !0
                        }, e
                    })), x.define("select2/dropdown/hidePlaceholder", [], (function () {
                        function t(t, e, i, s) {
                            this.placeholder = this.normalizePlaceholder(i.get("placeholder")), t.call(this, e, i, s)
                        }
                        return t.prototype.append = function (t, e) {
                            e.results = this.removePlaceholder(e.results), t.call(this, e)
                        }, t.prototype.normalizePlaceholder = function (t, e) {
                            return "string" == typeof e ? {
                                id: "",
                                text: e
                            } : e
                        }, t.prototype.removePlaceholder = function (t, e) {
                            for (var i = e.slice(0), s = e.length - 1; 0 <= s; s--) {
                                var n = e[s];
                                this.placeholder.id === n.id && i.splice(s, 1)
                            }
                            return i
                        }, t
                    })), x.define("select2/dropdown/infiniteScroll", ["jquery"], (function (t) {
                        function e(t, e, i, s) {
                            this.lastParams = {}, t.call(this, e, i, s), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                        }
                        return e.prototype.append = function (t, e) {
                            this.$loadingMore.remove(), this.loading = !1, t.call(this, e), this.showLoadingMore(e) && (this.$results.append(this.$loadingMore), this.loadMoreIfNeeded())
                        }, e.prototype.bind = function (t, e, i) {
                            var s = this;
                            t.call(this, e, i), e.on("query", (function (t) {
                                s.lastParams = t, s.loading = !0
                            })), e.on("query:append", (function (t) {
                                s.lastParams = t, s.loading = !0
                            })), this.$results.on("scroll", this.loadMoreIfNeeded.bind(this))
                        }, e.prototype.loadMoreIfNeeded = function () {
                            var e = t.contains(document.documentElement, this.$loadingMore[0]);
                            !this.loading && e && (e = this.$results.offset().top + this.$results.outerHeight(!1), this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1) <= e + 50 && this.loadMore())
                        }, e.prototype.loadMore = function () {
                            this.loading = !0;
                            var e = t.extend({}, {
                                page: 1
                            }, this.lastParams);
                            e.page++, this.trigger("query:append", e)
                        }, e.prototype.showLoadingMore = function (t, e) {
                            return e.pagination && e.pagination.more
                        }, e.prototype.createLoadingMore = function () {
                            var e = t('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),
                                i = this.options.get("translations").get("loadingMore");
                            return e.html(i(this.lastParams)), e
                        }, e
                    })), x.define("select2/dropdown/attachBody", ["jquery", "../utils"], (function (t, e) {
                        function i(e, i, s) {
                            this.$dropdownParent = t(s.get("dropdownParent") || document.body), e.call(this, i, s)
                        }
                        return i.prototype.bind = function (t, e, i) {
                            var s = this;
                            t.call(this, e, i), e.on("open", (function () {
                                s._showDropdown(), s._attachPositioningHandler(e), s._bindContainerResultHandlers(e)
                            })), e.on("close", (function () {
                                s._hideDropdown(), s._detachPositioningHandler(e)
                            })), this.$dropdownContainer.on("mousedown", (function (t) {
                                t.stopPropagation()
                            }))
                        }, i.prototype.destroy = function (t) {
                            t.call(this), this.$dropdownContainer.remove()
                        }, i.prototype.position = function (t, e, i) {
                            e.attr("class", i.attr("class")), e[0].classList.remove("select2"), e[0].classList.add("select2-container--open"), e.css({
                                position: "absolute",
                                top: -999999
                            }), this.$container = i
                        }, i.prototype.render = function (e) {
                            var i = t("<span></span>");
                            e = e.call(this);
                            return i.append(e), this.$dropdownContainer = i
                        }, i.prototype._hideDropdown = function (t) {
                            this.$dropdownContainer.detach()
                        }, i.prototype._bindContainerResultHandlers = function (t, e) {
                            var i;
                            this._containerResultsHandlersBound || (i = this, e.on("results:all", (function () {
                                i._positionDropdown(), i._resizeDropdown()
                            })), e.on("results:append", (function () {
                                i._positionDropdown(), i._resizeDropdown()
                            })), e.on("results:message", (function () {
                                i._positionDropdown(), i._resizeDropdown()
                            })), e.on("select", (function () {
                                i._positionDropdown(), i._resizeDropdown()
                            })), e.on("unselect", (function () {
                                i._positionDropdown(), i._resizeDropdown()
                            })), this._containerResultsHandlersBound = !0)
                        }, i.prototype._attachPositioningHandler = function (i, s) {
                            var n = this,
                                o = "scroll.select2." + s.id,
                                r = "resize.select2." + s.id,
                                a = "orientationchange.select2." + s.id;
                            (s = this.$container.parents().filter(e.hasScroll)).each((function () {
                                e.StoreData(this, "select2-scroll-position", {
                                    x: t(this).scrollLeft(),
                                    y: t(this).scrollTop()
                                })
                            })), s.on(o, (function (i) {
                                var s = e.GetData(this, "select2-scroll-position");
                                t(this).scrollTop(s.y)
                            })), t(window).on(o + " " + r + " " + a, (function (t) {
                                n._positionDropdown(), n._resizeDropdown()
                            }))
                        }, i.prototype._detachPositioningHandler = function (i, s) {
                            var n = "scroll.select2." + s.id,
                                o = "resize.select2." + s.id;
                            s = "orientationchange.select2." + s.id;
                            this.$container.parents().filter(e.hasScroll).off(n), t(window).off(n + " " + o + " " + s)
                        }, i.prototype._positionDropdown = function () {
                            var e = t(window),
                                i = this.$dropdown[0].classList.contains("select2-dropdown--above"),
                                s = this.$dropdown[0].classList.contains("select2-dropdown--below"),
                                n = null,
                                o = this.$container.offset();
                            o.bottom = o.top + this.$container.outerHeight(!1);
                            var r = {
                                height: this.$container.outerHeight(!1)
                            };
                            r.top = o.top, r.bottom = o.top + r.height;
                            var a = this.$dropdown.outerHeight(!1),
                                l = e.scrollTop(),
                                c = e.scrollTop() + e.height(),
                                d = l < o.top - a;
                            e = c > o.bottom + a, l = {
                                left: o.left,
                                top: r.bottom
                            };
                            "static" === (c = this.$dropdownParent).css("position") && (c = c.offsetParent()), o = {
                                top: 0,
                                left: 0
                            }, (t.contains(document.body, c[0]) || c[0].isConnected) && (o = c.offset()), l.top -= o.top, l.left -= o.left, i || s || (n = "below"), e || !d || i ? !d && e && i && (n = "below") : n = "above", ("above" == n || i && "below" !== n) && (l.top = r.top - o.top - a), null != n && (this.$dropdown[0].classList.remove("select2-dropdown--below"), this.$dropdown[0].classList.remove("select2-dropdown--above"), this.$dropdown[0].classList.add("select2-dropdown--" + n), this.$container[0].classList.remove("select2-container--below"), this.$container[0].classList.remove("select2-container--above"), this.$container[0].classList.add("select2-container--" + n)), this.$dropdownContainer.css(l)
                        }, i.prototype._resizeDropdown = function () {
                            var t = {
                                width: this.$container.outerWidth(!1) + "px"
                            };
                            this.options.get("dropdownAutoWidth") && (t.minWidth = t.width, t.position = "relative", t.width = "auto"), this.$dropdown.css(t)
                        }, i.prototype._showDropdown = function (t) {
                            this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                        }, i
                    })), x.define("select2/dropdown/minimumResultsForSearch", [], (function () {
                        function t(t, e, i, s) {
                            this.minimumResultsForSearch = i.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), t.call(this, e, i, s)
                        }
                        return t.prototype.showSearch = function (t, e) {
                            return !(function t(e) {
                                for (var i = 0, s = 0; s < e.length; s++) {
                                    var n = e[s];
                                    n.children ? i += t(n.children) : i++
                                }
                                return i
                            }(e.data.results) < this.minimumResultsForSearch) && t.call(this, e)
                        }, t
                    })), x.define("select2/dropdown/selectOnClose", ["../utils"], (function (t) {
                        function e() { }
                        return e.prototype.bind = function (t, e, i) {
                            var s = this;
                            t.call(this, e, i), e.on("close", (function (t) {
                                s._handleSelectOnClose(t)
                            }))
                        }, e.prototype._handleSelectOnClose = function (e, i) {
                            if (i && null != i.originalSelect2Event) {
                                var s = i.originalSelect2Event;
                                if ("select" === s._type || "unselect" === s._type) return
                            } (s = this.getHighlightedResults()).length < 1 || null != (s = t.GetData(s[0], "data")).element && s.element.selected || null == s.element && s.selected || this.trigger("select", {
                                data: s
                            })
                        }, e
                    })), x.define("select2/dropdown/closeOnSelect", [], (function () {
                        function t() { }
                        return t.prototype.bind = function (t, e, i) {
                            var s = this;
                            t.call(this, e, i), e.on("select", (function (t) {
                                s._selectTriggered(t)
                            })), e.on("unselect", (function (t) {
                                s._selectTriggered(t)
                            }))
                        }, t.prototype._selectTriggered = function (t, e) {
                            var i = e.originalEvent;
                            i && (i.ctrlKey || i.metaKey) || this.trigger("close", {
                                originalEvent: i,
                                originalSelect2Event: e
                            })
                        }, t
                    })), x.define("select2/dropdown/dropdownCss", ["../utils"], (function (t) {
                        function e() { }
                        return e.prototype.render = function (e) {
                            var i = e.call(this);
                            return -1 !== (e = this.options.get("dropdownCssClass") || "").indexOf(":all:") && (e = e.replace(":all:", ""), t.copyNonInternalCssClasses(i[0], this.$element[0])), i.addClass(e), i
                        }, e
                    })), x.define("select2/dropdown/tagsSearchHighlight", ["../utils"], (function (t) {
                        function e() { }
                        return e.prototype.highlightFirstItem = function (e) {
                            if (0 < (i = this.$results.find(".select2-results__option--selectable:not(.select2-results__option--selected)")).length) {
                                var i, s = i.first();
                                if ((i = t.GetData(s[0], "data").element) && i.getAttribute && "true" === i.getAttribute("data-select2-tag")) return void s.trigger("mouseenter")
                            }
                            e.call(this)
                        }, e
                    })), x.define("select2/i18n/en", [], (function () {
                        return {
                            errorLoading: function () {
                                return "The results could not be loaded."
                            },
                            inputTooLong: function (t) {
                                var e = t.input.length - t.maximum;
                                t = "Please delete " + e + " character";
                                return 1 != e && (t += "s"), t
                            },
                            inputTooShort: function (t) {
                                return "Please enter " + (t.minimum - t.input.length) + " or more characters"
                            },
                            loadingMore: function () {
                                return "Loading more results..."
                            },
                            maximumSelected: function (t) {
                                var e = "You can only select " + t.maximum + " item";
                                return 1 != t.maximum && (e += "s"), e
                            },
                            noResults: function () {
                                return "No results found"
                            },
                            searching: function () {
                                return "Searching..."
                            },
                            removeAllItems: function () {
                                return "Remove all items"
                            },
                            removeItem: function () {
                                return "Remove item"
                            },
                            search: function () {
                                return "Search"
                            }
                        }
                    })), x.define("select2/defaults", ["jquery", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/selectionCss", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./dropdown/dropdownCss", "./dropdown/tagsSearchHighlight", "./i18n/en"], (function (t, e, i, s, n, o, r, a, l, c, d, h, u, p, f, m, g, v, b, y, w, S, x, C, k, T, E, A, O, P, $) {
                        function M() {
                            this.reset()
                        }
                        return M.prototype.apply = function (d) {
                            var h;
                            null == (d = t.extend(!0, {}, this.defaults, d)).dataAdapter && (null != d.ajax ? d.dataAdapter = f : null != d.data ? d.dataAdapter = p : d.dataAdapter = u, 0 < d.minimumInputLength && (d.dataAdapter = c.Decorate(d.dataAdapter, v)), 0 < d.maximumInputLength && (d.dataAdapter = c.Decorate(d.dataAdapter, b)), 0 < d.maximumSelectionLength && (d.dataAdapter = c.Decorate(d.dataAdapter, y)), d.tags && (d.dataAdapter = c.Decorate(d.dataAdapter, m)), null == d.tokenSeparators && null == d.tokenizer || (d.dataAdapter = c.Decorate(d.dataAdapter, g))), null == d.resultsAdapter && (d.resultsAdapter = e, null != d.ajax && (d.resultsAdapter = c.Decorate(d.resultsAdapter, C)), null != d.placeholder && (d.resultsAdapter = c.Decorate(d.resultsAdapter, x)), d.selectOnClose && (d.resultsAdapter = c.Decorate(d.resultsAdapter, E)), d.tags && (d.resultsAdapter = c.Decorate(d.resultsAdapter, P))), null == d.dropdownAdapter && (d.multiple ? d.dropdownAdapter = w : (h = c.Decorate(w, S), d.dropdownAdapter = h), 0 !== d.minimumResultsForSearch && (d.dropdownAdapter = c.Decorate(d.dropdownAdapter, T)), d.closeOnSelect && (d.dropdownAdapter = c.Decorate(d.dropdownAdapter, A)), null != d.dropdownCssClass && (d.dropdownAdapter = c.Decorate(d.dropdownAdapter, O)), d.dropdownAdapter = c.Decorate(d.dropdownAdapter, k)), null == d.selectionAdapter && (d.multiple ? d.selectionAdapter = s : d.selectionAdapter = i, null != d.placeholder && (d.selectionAdapter = c.Decorate(d.selectionAdapter, n)), d.allowClear && (d.selectionAdapter = c.Decorate(d.selectionAdapter, o)), d.multiple && (d.selectionAdapter = c.Decorate(d.selectionAdapter, r)), null != d.selectionCssClass && (d.selectionAdapter = c.Decorate(d.selectionAdapter, a)), d.selectionAdapter = c.Decorate(d.selectionAdapter, l)), d.language = this._resolveLanguage(d.language), d.language.push("en");
                            for (var $ = [], M = 0; M < d.language.length; M++) {
                                var L = d.language[M]; - 1 === $.indexOf(L) && $.push(L)
                            }
                            return d.language = $, d.translations = this._processTranslations(d.language, d.debug), d
                        }, M.prototype.reset = function () {
                            function e(t) {
                                return t.replace(/[^\u0000-\u007E]/g, (function (t) {
                                    return h[t] || t
                                }))
                            }
                            this.defaults = {
                                amdLanguageBase: "./i18n/",
                                autocomplete: "off",
                                closeOnSelect: !0,
                                debug: !1,
                                dropdownAutoWidth: !1,
                                escapeMarkup: c.escapeMarkup,
                                language: {},
                                matcher: function i(s, n) {
                                    if (null == s.term || "" === s.term.trim()) return n;
                                    if (n.children && 0 < n.children.length) {
                                        for (var o = t.extend(!0, {}, n), r = n.children.length - 1; 0 <= r; r--) null == i(s, n.children[r]) && o.children.splice(r, 1);
                                        return 0 < o.children.length ? o : i(s, o)
                                    }
                                    var a = e(n.text).toUpperCase(),
                                        l = e(s.term).toUpperCase();
                                    return -1 < a.indexOf(l) ? n : null
                                },
                                minimumInputLength: 0,
                                maximumInputLength: 0,
                                maximumSelectionLength: 0,
                                minimumResultsForSearch: 0,
                                selectOnClose: !1,
                                scrollAfterSelect: !1,
                                sorter: function (t) {
                                    return t
                                },
                                templateResult: function (t) {
                                    return t.text
                                },
                                templateSelection: function (t) {
                                    return t.text
                                },
                                theme: "default",
                                width: "resolve"
                            }
                        }, M.prototype.applyFromElement = function (t, e) {
                            var i = t.language,
                                s = this.defaults.language,
                                n = e.prop("lang");
                            e = e.closest("[lang]").prop("lang"), e = Array.prototype.concat.call(this._resolveLanguage(n), this._resolveLanguage(i), this._resolveLanguage(s), this._resolveLanguage(e));
                            return t.language = e, t
                        }, M.prototype._resolveLanguage = function (e) {
                            if (!e) return [];
                            if (t.isEmptyObject(e)) return [];
                            if (t.isPlainObject(e)) return [e];
                            for (var i, s = Array.isArray(e) ? e : [e], n = [], o = 0; o < s.length; o++) n.push(s[o]), "string" == typeof s[o] && 0 < s[o].indexOf("-") && (i = s[o].split("-")[0], n.push(i));
                            return n
                        }, M.prototype._processTranslations = function (e, i) {
                            for (var s = new d, n = 0; n < e.length; n++) {
                                var o = new d,
                                    r = e[n];
                                if ("string" == typeof r) try {
                                    o = d.loadPath(r)
                                } catch (e) {
                                    try {
                                        r = this.defaults.amdLanguageBase + r, o = d.loadPath(r)
                                    } catch (e) {
                                        i && window.console && console.warn
                                    }
                                } else o = t.isPlainObject(r) ? new d(r) : r;
                                s.extend(o)
                            }
                            return s
                        }, M.prototype.set = function (e, i) {
                            var s = {};
                            s[t.camelCase(e)] = i, s = c._convertData(s), t.extend(!0, this.defaults, s)
                        }, new M
                    })), x.define("select2/options", ["jquery", "./defaults", "./utils"], (function (t, e, i) {
                        function s(t, i) {
                            this.options = t, null != i && this.fromElement(i), null != i && (this.options = e.applyFromElement(this.options, i)), this.options = e.apply(this.options)
                        }
                        return s.prototype.fromElement = function (e) {
                            var s = ["select2"];
                            null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.autocomplete && e.prop("autocomplete") && (this.options.autocomplete = e.prop("autocomplete")), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), i.GetData(e[0], "select2Tags") && (this.options.debug && window.console && console.warn, i.StoreData(e[0], "data", i.GetData(e[0], "select2Tags")), i.StoreData(e[0], "tags", !0)), i.GetData(e[0], "ajaxUrl") && (this.options.debug && window.console && console.warn, e.attr("ajax--url", i.GetData(e[0], "ajaxUrl")), i.StoreData(e[0], "ajax-Url", i.GetData(e[0], "ajaxUrl")));
                            var n = {};

                            function o(t, e) {
                                return e.toUpperCase()
                            }
                            for (var r = 0; r < e[0].attributes.length; r++) {
                                var a = e[0].attributes[r].name,
                                    l = "data-";
                                a.substr(0, l.length) == l && (a = a.substring(l.length), l = i.GetData(e[0], a), n[a.replace(/-([a-z])/g, o)] = l)
                            }
                            t.fn.jquery && "1." == t.fn.jquery.substr(0, 2) && e[0].dataset && (n = t.extend(!0, {}, e[0].dataset, n));
                            var c, d = t.extend(!0, {}, i.GetData(e[0]), n);
                            for (c in d = i._convertData(d)) - 1 < s.indexOf(c) || (t.isPlainObject(this.options[c]) ? t.extend(this.options[c], d[c]) : this.options[c] = d[c]);
                            return this
                        }, s.prototype.get = function (t) {
                            return this.options[t]
                        }, s.prototype.set = function (t, e) {
                            this.options[t] = e
                        }, s
                    })), x.define("select2/core", ["jquery", "./options", "./utils", "./keys"], (function (t, e, i, s) {
                        var n = function (t, s) {
                            null != i.GetData(t[0], "select2") && i.GetData(t[0], "select2").destroy(), this.$element = t, this.id = this._generateId(t), s = s || {}, this.options = new e(s, t), n.__super__.constructor.call(this);
                            var o = t.attr("tabindex") || 0;
                            i.StoreData(t[0], "old-tabindex", o), t.attr("tabindex", "-1"), s = this.options.get("dataAdapter"), this.dataAdapter = new s(t, this.options), o = this.render(), this._placeContainer(o), s = this.options.get("selectionAdapter"), this.selection = new s(t, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, o), s = this.options.get("dropdownAdapter"), this.dropdown = new s(t, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, o), o = this.options.get("resultsAdapter"), this.results = new o(t, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                            var r = this;
                            this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current((function (t) {
                                r.trigger("selection:update", {
                                    data: t
                                })
                            })), t[0].classList.add("select2-hidden-accessible"), t.attr("aria-hidden", "true"), this._syncAttributes(), i.StoreData(t[0], "select2", this), t.data("select2", this)
                        };
                        return i.Extend(n, i.Observable), n.prototype._generateId = function (t) {
                            return "select2-" + (null != t.attr("id") ? t.attr("id") : null != t.attr("name") ? t.attr("name") + "-" + i.generateChars(2) : i.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "")
                        }, n.prototype._placeContainer = function (t) {
                            t.insertAfter(this.$element);
                            var e = this._resolveWidth(this.$element, this.options.get("width"));
                            null != e && t.css("width", e)
                        }, n.prototype._resolveWidth = function (t, e) {
                            var i = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                            if ("resolve" == e) {
                                var s = this._resolveWidth(t, "style");
                                return null != s ? s : this._resolveWidth(t, "element")
                            }
                            if ("element" == e) return (s = t.outerWidth(!1)) <= 0 ? "auto" : s + "px";
                            if ("style" != e) return "computedstyle" != e ? e : window.getComputedStyle(t[0]).width;
                            if ("string" != typeof (t = t.attr("style"))) return null;
                            for (var n = t.split(";"), o = 0, r = n.length; o < r; o += 1) {
                                var a = n[o].replace(/\s/g, "").match(i);
                                if (null !== a && 1 <= a.length) return a[1]
                            }
                            return null
                        }, n.prototype._bindAdapters = function () {
                            this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                        }, n.prototype._registerDomEvents = function () {
                            var t = this;
                            this.$element.on("change.select2", (function () {
                                t.dataAdapter.current((function (e) {
                                    t.trigger("selection:update", {
                                        data: e
                                    })
                                }))
                            })), this.$element.on("focus.select2", (function (e) {
                                t.trigger("focus", e)
                            })), this._syncA = i.bind(this._syncAttributes, this), this._syncS = i.bind(this._syncSubtree, this), this._observer = new window.MutationObserver((function (e) {
                                t._syncA(), t._syncS(e)
                            })), this._observer.observe(this.$element[0], {
                                attributes: !0,
                                childList: !0,
                                subtree: !1
                            })
                        }, n.prototype._registerDataEvents = function () {
                            var t = this;
                            this.dataAdapter.on("*", (function (e, i) {
                                t.trigger(e, i)
                            }))
                        }, n.prototype._registerSelectionEvents = function () {
                            var t = this,
                                e = ["toggle", "focus"];
                            this.selection.on("toggle", (function () {
                                t.toggleDropdown()
                            })), this.selection.on("focus", (function (e) {
                                t.focus(e)
                            })), this.selection.on("*", (function (i, s) {
                                -1 === e.indexOf(i) && t.trigger(i, s)
                            }))
                        }, n.prototype._registerDropdownEvents = function () {
                            var t = this;
                            this.dropdown.on("*", (function (e, i) {
                                t.trigger(e, i)
                            }))
                        }, n.prototype._registerResultsEvents = function () {
                            var t = this;
                            this.results.on("*", (function (e, i) {
                                t.trigger(e, i)
                            }))
                        }, n.prototype._registerEvents = function () {
                            var t = this;
                            this.on("open", (function () {
                                t.$container[0].classList.add("select2-container--open")
                            })), this.on("close", (function () {
                                t.$container[0].classList.remove("select2-container--open")
                            })), this.on("enable", (function () {
                                t.$container[0].classList.remove("select2-container--disabled")
                            })), this.on("disable", (function () {
                                t.$container[0].classList.add("select2-container--disabled")
                            })), this.on("blur", (function () {
                                t.$container[0].classList.remove("select2-container--focus")
                            })), this.on("query", (function (e) {
                                t.isOpen() || t.trigger("open", {}), this.dataAdapter.query(e, (function (i) {
                                    t.trigger("results:all", {
                                        data: i,
                                        query: e
                                    })
                                }))
                            })), this.on("query:append", (function (e) {
                                this.dataAdapter.query(e, (function (i) {
                                    t.trigger("results:append", {
                                        data: i,
                                        query: e
                                    })
                                }))
                            })), this.on("keypress", (function (e) {
                                var i = e.which;
                                t.isOpen() ? i === s.ESC || i === s.UP && e.altKey ? (t.close(e), e.preventDefault()) : i === s.ENTER || i === s.TAB ? (t.trigger("results:select", {}), e.preventDefault()) : i === s.SPACE && e.ctrlKey ? (t.trigger("results:toggle", {}), e.preventDefault()) : i === s.UP ? (t.trigger("results:previous", {}), e.preventDefault()) : i === s.DOWN && (t.trigger("results:next", {}), e.preventDefault()) : (i === s.ENTER || i === s.SPACE || i === s.DOWN && e.altKey) && (t.open(), e.preventDefault())
                            }))
                        }, n.prototype._syncAttributes = function () {
                            this.options.set("disabled", this.$element.prop("disabled")), this.isDisabled() ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {})
                        }, n.prototype._isChangeMutation = function (t) {
                            var e = this;
                            if (t.addedNodes && 0 < t.addedNodes.length) {
                                for (var i = 0; i < t.addedNodes.length; i++)
                                    if (t.addedNodes[i].selected) return !0
                            } else {
                                if (t.removedNodes && 0 < t.removedNodes.length) return !0;
                                if (Array.isArray(t)) return t.some((function (t) {
                                    return e._isChangeMutation(t)
                                }))
                            }
                            return !1
                        }, n.prototype._syncSubtree = function (t) {
                            t = this._isChangeMutation(t);
                            var e = this;
                            t && this.dataAdapter.current((function (t) {
                                e.trigger("selection:update", {
                                    data: t
                                })
                            }))
                        }, n.prototype.trigger = function (t, e) {
                            var i = n.__super__.trigger;
                            if (void 0 === e && (e = {}), t in (o = {
                                open: "opening",
                                close: "closing",
                                select: "selecting",
                                unselect: "unselecting",
                                clear: "clearing"
                            })) {
                                var s = o[t],
                                    o = {
                                        prevented: !1,
                                        name: t,
                                        args: e
                                    };
                                if (i.call(this, s, o), o.prevented) return void (e.prevented = !0)
                            }
                            i.call(this, t, e)
                        }, n.prototype.toggleDropdown = function () {
                            this.isDisabled() || (this.isOpen() ? this.close() : this.open())
                        }, n.prototype.open = function () {
                            this.isOpen() || this.isDisabled() || this.trigger("query", {})
                        }, n.prototype.close = function (t) {
                            this.isOpen() && this.trigger("close", {
                                originalEvent: t
                            })
                        }, n.prototype.isEnabled = function () {
                            return !this.isDisabled()
                        }, n.prototype.isDisabled = function () {
                            return this.options.get("disabled")
                        }, n.prototype.isOpen = function () {
                            return this.$container[0].classList.contains("select2-container--open")
                        }, n.prototype.hasFocus = function () {
                            return this.$container[0].classList.contains("select2-container--focus")
                        }, n.prototype.focus = function (t) {
                            this.hasFocus() || (this.$container[0].classList.add("select2-container--focus"), this.trigger("focus", {}))
                        }, n.prototype.enable = function (t) {
                            this.options.get("debug") && window.console && console.warn, t = !(t = null == t || 0 === t.length ? [!0] : t)[0], this.$element.prop("disabled", t)
                        }, n.prototype.data = function () {
                            this.options.get("debug") && 0 < arguments.length && window.console && console.warn;
                            var t = [];
                            return this.dataAdapter.current((function (e) {
                                t = e
                            })), t
                        }, n.prototype.val = function (t) {
                            if (this.options.get("debug") && window.console && console.warn, null == t || 0 === t.length) return this.$element.val();
                            t = t[0], Array.isArray(t) && (t = t.map((function (t) {
                                return t.toString()
                            }))), this.$element.val(t).trigger("input").trigger("change")
                        }, n.prototype.destroy = function () {
                            i.RemoveData(this.$container[0]), this.$container.remove(), this._observer.disconnect(), this._observer = null, this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", i.GetData(this.$element[0], "old-tabindex")), this.$element[0].classList.remove("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), i.RemoveData(this.$element[0]), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                        }, n.prototype.render = function () {
                            var e = t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                            return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container[0].classList.add("select2-container--" + this.options.get("theme")), i.StoreData(e[0], "element", this.$element), e
                        }, n
                    })), x.define("jquery-mousewheel", ["jquery"], (function (t) {
                        return t
                    })), x.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], (function (t, e, i, s, n) {
                        var o;
                        return null == t.fn.select2 && (o = ["open", "close", "destroy"], t.fn.select2 = function (e) {
                            if ("object" == typeof (e = e || {})) return this.each((function () {
                                var s = t.extend(!0, {}, e);
                                new i(t(this), s)
                            })), this;
                            if ("string" != typeof e) throw new Error("Invalid arguments for Select2: " + e);
                            var s, r = Array.prototype.slice.call(arguments, 1);
                            return this.each((function () {
                                var t = n.GetData(this, "select2");
                                null == t && window.console && console.error, s = t[e].apply(t, r)
                            })), -1 < o.indexOf(e) ? this : s
                        }), null == t.fn.select2.defaults && (t.fn.select2.defaults = s), i
                    })), {
                    define: x.define,
                    require: x.require
                });

                function g(t, e) {
                    return u.call(t, e)
                }

                function v(t, e) {
                    var i, s, n, o, r, a, l, c, h, u, p = e && e.split("/"),
                        m = d.map,
                        g = m && m["*"] || {};
                    if (t) {
                        for (e = (t = t.split("/")).length - 1, d.nodeIdCompat && f.test(t[e]) && (t[e] = t[e].replace(f, "")), "." === t[0].charAt(0) && p && (t = p.slice(0, p.length - 1).concat(t)), c = 0; c < t.length; c++) "." === (u = t[c]) ? (t.splice(c, 1), --c) : ".." === u && (0 === c || 1 === c && ".." === t[2] || ".." === t[c - 1] || 0 < c && (t.splice(c - 1, 2), c -= 2));
                        t = t.join("/")
                    }
                    if ((p || g) && m) {
                        for (c = (i = t.split("/")).length; 0 < c; --c) {
                            if (s = i.slice(0, c).join("/"), p)
                                for (h = p.length; 0 < h; --h)
                                    if (n = (n = m[p.slice(0, h).join("/")]) && n[s]) {
                                        o = n, r = c;
                                        break
                                    } if (o) break;
                            !a && g && g[s] && (a = g[s], l = c)
                        } !o && a && (o = a, r = l), o && (i.splice(0, r, o), t = i.join("/"))
                    }
                    return t
                }

                function b(t, e) {
                    return function () {
                        var i = p.call(arguments, 0);
                        return "string" != typeof i[0] && 1 === i.length && i.push(null), o.apply(s, i.concat([t, e]))
                    }
                }

                function y(t) {
                    var e;
                    if (g(c, t) && (e = c[t], delete c[t], h[t] = !0, n.apply(s, e)), !g(l, t) && !g(h, t)) throw new Error("No " + t);
                    return l[t]
                }

                function w(t) {
                    var e, i = t ? t.indexOf("!") : -1;
                    return -1 < i && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
                }

                function S(t) {
                    return t ? w(t) : []
                }
                var x = m.require("jquery.select2");
                return t.fn.select2.amd = m, x
            }, void 0 === (o = "function" == typeof s ? s.apply(e, n) : s) || (t.exports = o)
        }()
    }, function (t, e) {
        t.exports = jQuery
    }, function (t, e) {
        ! function (t, e) {
            "use strict";
            window.jcf = function (t) {
                var e = "1.1.3",
                    i = [],
                    s = {
                        optionsKey: "jcf",
                        dataKey: "jcf-instance",
                        rtlClass: "jcf-rtl",
                        focusClass: "jcf-focus",
                        pressedClass: "jcf-pressed",
                        disabledClass: "jcf-disabled",
                        hiddenClass: "jcf-hidden",
                        resetAppearanceClass: "jcf-reset-appearance",
                        unselectableClass: "jcf-unselectable"
                    },
                    n = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                    o = /Windows Phone/.test(navigator.userAgent);
                s.isMobileDevice = !(!n && !o);
                var r = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
                r && (r = parseFloat(r[2].replace(/_/g, ".")));
                s.ios = r;
                var a = function () {
                    var e = t("<style>").appendTo("head"),
                        i = e.prop("sheet") || e.prop("styleSheet"),
                        n = function (t, e, s) {
                            i.insertRule ? i.insertRule(t + "{" + e + "}", s) : i.addRule(t, e, s)
                        };
                    n("." + s.hiddenClass, "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"), n("." + s.rtlClass + " ." + s.hiddenClass, "right:-9999px !important; left: auto !important"), n("." + s.unselectableClass, "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"), n("." + s.resetAppearanceClass, "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");
                    var o = t("html"),
                        r = t("body");
                    "rtl" !== o.css("direction") && "rtl" !== r.css("direction") || o.addClass(s.rtlClass), o.on("reset", (function () {
                        setTimeout((function () {
                            c.refreshAll()
                        }), 0)
                    })), s.styleSheetCreated = !0
                };
                (function () {
                    var e, i = navigator.pointerEnabled || navigator.msPointerEnabled,
                        s = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                        n = {},
                        o = "jcf-";
                    e = i ? {
                        pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
                        pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
                        pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
                        pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp"
                    } : {
                        pointerover: "mouseover",
                        pointerdown: "mousedown" + (s ? " touchstart" : ""),
                        pointermove: "mousemove" + (s ? " touchmove" : ""),
                        pointerup: "mouseup" + (s ? " touchend" : "")
                    }, t.each(e, (function (e, i) {
                        t.each(i.split(" "), (function (t, i) {
                            n[i] = e
                        }))
                    })), t.each(e, (function (e, i) {
                        i = i.split(" "), t.event.special[o + e] = {
                            setup: function () {
                                var e = this;
                                t.each(i, (function (t, i) {
                                    e.addEventListener ? e.addEventListener(i, l, !1) : e["on" + i] = l
                                }))
                            },
                            teardown: function () {
                                var e = this;
                                t.each(i, (function (t, i) {
                                    e.addEventListener ? e.removeEventListener(i, l, !1) : e["on" + i] = null
                                }))
                            }
                        }
                    }));
                    var r = null,
                        a = function (t) {
                            var e = Math.abs(t.pageX - r.x),
                                i = Math.abs(t.pageY - r.y),
                                s = 25;
                            if (e <= s && i <= s) return !0
                        },
                        l = function (e) {
                            var i = e || window.event,
                                s = null,
                                l = n[i.type];
                            if ((e = t.event.fix(i)).type = o + l, i.pointerType) switch (i.pointerType) {
                                case 2:
                                    e.pointerType = "touch";
                                    break;
                                case 3:
                                    e.pointerType = "pen";
                                    break;
                                case 4:
                                    e.pointerType = "mouse";
                                    break;
                                default:
                                    e.pointerType = i.pointerType
                            } else e.pointerType = i.type.substr(0, 5);
                            return e.pageX || e.pageY || (s = i.changedTouches ? i.changedTouches[0] : i, e.pageX = s.pageX, e.pageY = s.pageY), "touchend" === i.type && (r = {
                                x: e.pageX,
                                y: e.pageY
                            }), "mouse" === e.pointerType && r && a(e) ? void 0 : (t.event.dispatch || t.event.handle).call(this, e)
                        }
                })(),
                    function () {
                        var e = ("onwheel" in document || document.documentMode >= 9 ? "wheel" : "mousewheel DOMMouseScroll").split(" "),
                            i = "jcf-mousewheel";
                        t.event.special[i] = {
                            setup: function () {
                                var i = this;
                                t.each(e, (function (t, e) {
                                    i.addEventListener ? i.addEventListener(e, s, !1) : i["on" + e] = s
                                }))
                            },
                            teardown: function () {
                                var i = this;
                                t.each(e, (function (t, e) {
                                    i.addEventListener ? i.removeEventListener(e, s, !1) : i["on" + e] = null
                                }))
                            }
                        };
                        var s = function (e) {
                            var s = e || window.event;
                            if ((e = t.event.fix(s)).type = i, "detail" in s && (e.deltaY = -s.detail), "wheelDelta" in s && (e.deltaY = -s.wheelDelta), "wheelDeltaY" in s && (e.deltaY = -s.wheelDeltaY), "wheelDeltaX" in s && (e.deltaX = -s.wheelDeltaX), "deltaY" in s && (e.deltaY = s.deltaY), "deltaX" in s && (e.deltaX = s.deltaX), e.delta = e.deltaY || e.deltaX, 1 === s.deltaMode) {
                                var n = 16;
                                e.delta *= n, e.deltaY *= n, e.deltaX *= n
                            }
                            return (t.event.dispatch || t.event.handle).call(this, e)
                        }
                    }();
                var l = {
                    fireNativeEvent: function (e, i) {
                        t(e).each((function () {
                            var t, e = this;
                            e.dispatchEvent ? ((t = document.createEvent("HTMLEvents")).initEvent(i, !0, !0), e.dispatchEvent(t)) : document.createEventObject && ((t = document.createEventObject()).target = e, e.fireEvent("on" + i, t))
                        }))
                    },
                    bindHandlers: function () {
                        var e = this;
                        t.each(e, (function (i, s) {
                            0 === i.indexOf("on") && t.isFunction(s) && (e[i] = function () {
                                return s.apply(e, arguments)
                            })
                        }))
                    }
                },
                    c = {
                        version: e,
                        modules: {},
                        getOptions: function () {
                            return t.extend({}, s)
                        },
                        setOptions: function (e, i) {
                            arguments.length > 1 ? this.modules[e] && t.extend(this.modules[e].prototype.options, i) : t.extend(s, e)
                        },
                        addModule: function (e) {
                            var n = function (e) {
                                e.element.data(s.dataKey) || e.element.data(s.dataKey, this), i.push(this), this.options = t.extend({}, s, this.options, o(e.element), e), this.bindHandlers(), this.init.apply(this, arguments)
                            },
                                o = function (e) {
                                    var i = e.data(s.optionsKey),
                                        n = e.attr(s.optionsKey);
                                    if (i) return i;
                                    if (n) try {
                                        return t.parseJSON(n)
                                    } catch (t) { }
                                };
                            n.prototype = e, t.extend(e, l), e.plugins && t.each(e.plugins, (function (e, i) {
                                t.extend(i.prototype, l)
                            }));
                            var r = n.prototype.destroy;
                            n.prototype.destroy = function () {
                                this.options.element.removeData(this.options.dataKey);
                                for (var t = i.length - 1; t >= 0; t--)
                                    if (i[t] === this) {
                                        i.splice(t, 1);
                                        break
                                    } r && r.apply(this, arguments)
                            }, this.modules[e.name] = n
                        },
                        getInstance: function (e) {
                            return t(e).data(s.dataKey)
                        },
                        replace: function (e, i, n) {
                            var o, r = this;
                            return s.styleSheetCreated || a(), t(e).each((function () {
                                var e, a = t(this);
                                (o = a.data(s.dataKey)) ? o.refresh() : (i || t.each(r.modules, (function (t, e) {
                                    if (e.prototype.matchElement.call(e.prototype, a)) return i = t, !1
                                })), i && (e = t.extend({
                                    element: a
                                }, n), o = new r.modules[i](e)))
                            })), o
                        },
                        refresh: function (e) {
                            t(e).each((function () {
                                var e = t(this).data(s.dataKey);
                                e && e.refresh()
                            }))
                        },
                        destroy: function (e) {
                            t(e).each((function () {
                                var e = t(this).data(s.dataKey);
                                e && e.destroy()
                            }))
                        },
                        replaceAll: function (e) {
                            var i = this;
                            t.each(this.modules, (function (s, n) {
                                t(n.prototype.selector, e).each((function () {
                                    this.className.indexOf("jcf-ignore") < 0 && i.replace(this, s)
                                }))
                            }))
                        },
                        refreshAll: function (e) {
                            if (e) t.each(this.modules, (function (i, n) {
                                t(n.prototype.selector, e).each((function () {
                                    var e = t(this).data(s.dataKey);
                                    e && e.refresh()
                                }))
                            }));
                            else
                                for (var n = i.length - 1; n >= 0; n--) i[n].refresh()
                        },
                        destroyAll: function (e) {
                            if (e) t.each(this.modules, (function (i, n) {
                                t(n.prototype.selector, e).each((function (e, i) {
                                    var n = t(i).data(s.dataKey);
                                    n && n.destroy()
                                }))
                            }));
                            else
                                for (; i.length;) i[0].destroy()
                        }
                    };
                return window.jcf = c, c
            }(jQuery)
        }(),
            function (t, e) {
                "use strict";

                function i(e) {
                    this.options = t.extend({
                        holder: null,
                        vertical: !0,
                        inactiveClass: "jcf-inactive",
                        verticalClass: "jcf-scrollbar-vertical",
                        horizontalClass: "jcf-scrollbar-horizontal",
                        scrollbarStructure: '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
                        btnDecSelector: ".jcf-scrollbar-dec",
                        btnIncSelector: ".jcf-scrollbar-inc",
                        sliderSelector: ".jcf-scrollbar-slider",
                        handleSelector: ".jcf-scrollbar-handle",
                        scrollInterval: 300,
                        scrollStep: 400
                    }, e), this.init()
                }
                jcf.addModule({
                    name: "Scrollable",
                    selector: ".jcf-scrollable",
                    plugins: {
                        ScrollBar: i
                    },
                    options: {
                        mouseWheelStep: 150,
                        handleResize: !0,
                        alwaysShowScrollbars: !1,
                        alwaysPreventMouseWheel: !1,
                        scrollAreaStructure: '<div class="jcf-scrollable-wrapper"></div>'
                    },
                    matchElement: function (t) {
                        return t.is(".jcf-scrollable")
                    },
                    init: function () {
                        this.initStructure(), this.attachEvents(), this.rebuildScrollbars()
                    },
                    initStructure: function () {
                        this.doc = t(document), this.win = t(e), this.realElement = t(this.options.element), this.scrollWrapper = t(this.options.scrollAreaStructure).insertAfter(this.realElement), this.scrollWrapper.css("position", "relative"), this.realElement.css("overflow", this.options.ios && this.options.ios >= 10 ? "auto" : "hidden"), this.vBarEdge = 0
                    },
                    attachEvents: function () {
                        var t = this;
                        this.vBar = new i({
                            holder: this.scrollWrapper,
                            vertical: !0,
                            onScroll: function (e) {
                                t.realElement.scrollTop(e)
                            }
                        }), this.hBar = new i({
                            holder: this.scrollWrapper,
                            vertical: !1,
                            onScroll: function (e) {
                                t.realElement.scrollLeft(e)
                            }
                        }), this.realElement.on("scroll", this.onScroll), this.options.handleResize && this.win.on("resize orientationchange load", this.onResize), this.realElement.on("jcf-mousewheel", this.onMouseWheel), this.realElement.on("jcf-pointerdown", this.onTouchBody)
                    },
                    onScroll: function () {
                        this.redrawScrollbars()
                    },
                    onResize: function () {
                        t(document.activeElement).is(":input") || this.rebuildScrollbars()
                    },
                    onTouchBody: function (t) {
                        "touch" === t.pointerType && (this.touchData = {
                            scrollTop: this.realElement.scrollTop(),
                            scrollLeft: this.realElement.scrollLeft(),
                            left: t.pageX,
                            top: t.pageY
                        }, this.doc.on({
                            "jcf-pointermove": this.onMoveBody,
                            "jcf-pointerup": this.onReleaseBody
                        }))
                    },
                    onMoveBody: function (t) {
                        var e, i, s = this.verticalScrollActive,
                            n = this.horizontalScrollActive;
                        "touch" === t.pointerType && (e = this.touchData.scrollTop - t.pageY + this.touchData.top, i = this.touchData.scrollLeft - t.pageX + this.touchData.left, this.verticalScrollActive && (e < 0 || e > this.vBar.maxValue) && (s = !1), this.horizontalScrollActive && (i < 0 || i > this.hBar.maxValue) && (n = !1), this.realElement.scrollTop(e), this.realElement.scrollLeft(i), s || n ? t.preventDefault() : this.onReleaseBody(t))
                    },
                    onReleaseBody: function (t) {
                        "touch" === t.pointerType && (delete this.touchData, this.doc.off({
                            "jcf-pointermove": this.onMoveBody,
                            "jcf-pointerup": this.onReleaseBody
                        }))
                    },
                    onMouseWheel: function (t) {
                        var e, i, s, n = this.realElement.scrollTop(),
                            o = this.realElement.scrollLeft(),
                            r = this.realElement.prop("scrollHeight") - this.embeddedDimensions.innerHeight,
                            a = this.realElement.prop("scrollWidth") - this.embeddedDimensions.innerWidth;
                        (this.options.alwaysPreventMouseWheel || (this.verticalScrollActive && t.deltaY && (n <= 0 && t.deltaY < 0 || n >= r && t.deltaY > 0 || (s = !0)), this.horizontalScrollActive && t.deltaX && (o <= 0 && t.deltaX < 0 || o >= a && t.deltaX > 0 || (s = !0)), this.verticalScrollActive || this.horizontalScrollActive)) && (s || this.options.alwaysPreventMouseWheel) && (t.preventDefault(), e = t.deltaX / 100 * this.options.mouseWheelStep, i = t.deltaY / 100 * this.options.mouseWheelStep, this.realElement.scrollTop(n + i), this.realElement.scrollLeft(o + e))
                    },
                    setScrollBarEdge: function (t) {
                        this.vBarEdge = t || 0, this.redrawScrollbars()
                    },
                    saveElementDimensions: function () {
                        return this.savedDimensions = {
                            top: this.realElement.width(),
                            left: this.realElement.height()
                        }, this
                    },
                    restoreElementDimensions: function () {
                        return this.savedDimensions && this.realElement.css({
                            width: this.savedDimensions.width,
                            height: this.savedDimensions.height
                        }), this
                    },
                    saveScrollOffsets: function () {
                        return this.savedOffsets = {
                            top: this.realElement.scrollTop(),
                            left: this.realElement.scrollLeft()
                        }, this
                    },
                    restoreScrollOffsets: function () {
                        return this.savedOffsets && (this.realElement.scrollTop(this.savedOffsets.top), this.realElement.scrollLeft(this.savedOffsets.left)), this
                    },
                    getContainerDimensions: function () {
                        var t, e, i, s;
                        return this.isModifiedStyles ? t = {
                            width: this.realElement.innerWidth() + this.vBar.getThickness(),
                            height: this.realElement.innerHeight() + this.hBar.getThickness()
                        } : (this.saveElementDimensions().saveScrollOffsets(), this.realElement.insertAfter(this.scrollWrapper), this.scrollWrapper.detach(), e = this.realElement.prop("style"), s = parseFloat(e.width), i = parseFloat(e.height), this.embeddedDimensions && s && i && (this.isModifiedStyles |= s !== this.embeddedDimensions.width || i !== this.embeddedDimensions.height, this.realElement.css({
                            overflow: "",
                            width: "",
                            height: ""
                        })), t = {
                            width: this.realElement.outerWidth(),
                            height: this.realElement.outerHeight()
                        }, this.scrollWrapper.insertAfter(this.realElement), this.realElement.css("overflow", this.options.ios && this.options.ios >= 10 ? "auto" : "hidden").prependTo(this.scrollWrapper), this.restoreElementDimensions().restoreScrollOffsets()), t
                    },
                    getEmbeddedDimensions: function (e) {
                        var i, s = this.vBar.getThickness(),
                            n = this.hBar.getThickness(),
                            o = this.realElement.outerWidth() - this.realElement.width(),
                            r = this.realElement.outerHeight() - this.realElement.height();
                        return this.options.alwaysShowScrollbars ? (this.verticalScrollActive = !0, this.horizontalScrollActive = !0, i = {
                            innerWidth: e.width - s,
                            innerHeight: e.height - n
                        }) : (this.saveElementDimensions(), this.verticalScrollActive = !1, this.horizontalScrollActive = !1, this.realElement.css({
                            width: e.width - o,
                            height: e.height - r
                        }), this.horizontalScrollActive = this.realElement.prop("scrollWidth") > this.containerDimensions.width, this.verticalScrollActive = this.realElement.prop("scrollHeight") > this.containerDimensions.height, this.restoreElementDimensions(), i = {
                            innerWidth: e.width - (this.verticalScrollActive ? s : 0),
                            innerHeight: e.height - (this.horizontalScrollActive ? n : 0)
                        }), t.extend(i, {
                            width: i.innerWidth - o,
                            height: i.innerHeight - r
                        }), i
                    },
                    rebuildScrollbars: function () {
                        this.containerDimensions = this.getContainerDimensions(), this.embeddedDimensions = this.getEmbeddedDimensions(this.containerDimensions), this.scrollWrapper.css({
                            width: this.containerDimensions.width,
                            height: this.containerDimensions.height
                        }), this.realElement.css({
                            overflow: this.options.ios && this.options.ios >= 10 ? "auto" : "hidden",
                            width: this.embeddedDimensions.width,
                            height: this.embeddedDimensions.height
                        }), this.redrawScrollbars()
                    },
                    redrawScrollbars: function () {
                        var t, e;
                        this.verticalScrollActive ? (t = this.vBarEdge ? this.containerDimensions.height - this.vBarEdge : this.embeddedDimensions.innerHeight, e = Math.max(this.realElement.prop("offsetHeight"), this.realElement.prop("scrollHeight")) - this.vBarEdge, this.vBar.show().setMaxValue(e - t).setRatio(t / e).setSize(t), this.vBar.setValue(this.realElement.scrollTop())) : this.vBar.hide(), this.horizontalScrollActive ? (t = this.embeddedDimensions.innerWidth, (e = this.realElement.prop("scrollWidth")) === t && (this.horizontalScrollActive = !1), this.hBar.show().setMaxValue(e - t).setRatio(t / e).setSize(t), this.hBar.setValue(this.realElement.scrollLeft())) : this.hBar.hide();
                        var i = "";
                        this.verticalScrollActive && this.horizontalScrollActive ? i = "none" : this.verticalScrollActive ? i = "pan-x" : this.horizontalScrollActive && (i = "pan-y"), this.realElement.css("touchAction", i)
                    },
                    refresh: function () {
                        this.rebuildScrollbars()
                    },
                    destroy: function () {
                        this.win.off("resize orientationchange load", this.onResize), this.realElement.off({
                            "jcf-mousewheel": this.onMouseWheel,
                            "jcf-pointerdown": this.onTouchBody
                        }), this.doc.off({
                            "jcf-pointermove": this.onMoveBody,
                            "jcf-pointerup": this.onReleaseBody
                        }), this.saveScrollOffsets(), this.vBar.destroy(), this.hBar.destroy(), this.realElement.insertAfter(this.scrollWrapper).css({
                            touchAction: "",
                            overflow: "",
                            width: "",
                            height: ""
                        }), this.scrollWrapper.remove(), this.restoreScrollOffsets()
                    }
                }), t.extend(i.prototype, {
                    init: function () {
                        this.initStructure(), this.attachEvents()
                    },
                    initStructure: function () {
                        this.doc = t(document), this.isVertical = !!this.options.vertical, this.sizeProperty = this.isVertical ? "height" : "width", this.fullSizeProperty = this.isVertical ? "outerHeight" : "outerWidth", this.invertedSizeProperty = this.isVertical ? "width" : "height", this.thicknessMeasureMethod = "outer" + this.invertedSizeProperty.charAt(0).toUpperCase() + this.invertedSizeProperty.substr(1), this.offsetProperty = this.isVertical ? "top" : "left", this.offsetEventProperty = this.isVertical ? "pageY" : "pageX", this.value = this.options.value || 0, this.maxValue = this.options.maxValue || 0, this.currentSliderSize = 0, this.handleSize = 0, this.holder = t(this.options.holder), this.scrollbar = t(this.options.scrollbarStructure).appendTo(this.holder), this.btnDec = this.scrollbar.find(this.options.btnDecSelector), this.btnInc = this.scrollbar.find(this.options.btnIncSelector), this.slider = this.scrollbar.find(this.options.sliderSelector), this.handle = this.slider.find(this.options.handleSelector), this.scrollbar.addClass(this.isVertical ? this.options.verticalClass : this.options.horizontalClass).css({
                            touchAction: this.isVertical ? "pan-x" : "pan-y",
                            position: "absolute"
                        }), this.slider.css({
                            position: "relative"
                        }), this.handle.css({
                            touchAction: "none",
                            position: "absolute"
                        })
                    },
                    attachEvents: function () {
                        this.bindHandlers(), this.handle.on("jcf-pointerdown", this.onHandlePress), this.slider.add(this.btnDec).add(this.btnInc).on("jcf-pointerdown", this.onButtonPress)
                    },
                    onHandlePress: function (t) {
                        "mouse" === t.pointerType && t.button > 1 || (t.preventDefault(), this.handleDragActive = !0, this.sliderOffset = this.slider.offset()[this.offsetProperty], this.innerHandleOffset = t[this.offsetEventProperty] - this.handle.offset()[this.offsetProperty], this.doc.on("jcf-pointermove", this.onHandleDrag), this.doc.on("jcf-pointerup", this.onHandleRelease))
                    },
                    onHandleDrag: function (t) {
                        t.preventDefault(), this.calcOffset = t[this.offsetEventProperty] - this.sliderOffset - this.innerHandleOffset, this.setValue(this.calcOffset / (this.currentSliderSize - this.handleSize) * this.maxValue), this.triggerScrollEvent(this.value)
                    },
                    onHandleRelease: function () {
                        this.handleDragActive = !1, this.doc.off("jcf-pointermove", this.onHandleDrag), this.doc.off("jcf-pointerup", this.onHandleRelease)
                    },
                    onButtonPress: function (t) {
                        var e, i;
                        "mouse" === t.pointerType && t.button > 1 || (t.preventDefault(), this.handleDragActive || (this.slider.is(t.currentTarget) ? (e = this.handle.offset()[this.offsetProperty] > t[this.offsetEventProperty] ? -1 : 1, i = t[this.offsetEventProperty] - this.slider.offset()[this.offsetProperty], this.startPageScrolling(e, i)) : (e = this.btnDec.is(t.currentTarget) ? -1 : 1, this.startSmoothScrolling(e)), this.doc.on("jcf-pointerup", this.onButtonRelease)))
                    },
                    onButtonRelease: function () {
                        this.stopPageScrolling(), this.stopSmoothScrolling(), this.doc.off("jcf-pointerup", this.onButtonRelease)
                    },
                    startPageScrolling: function (t, e) {
                        var i = this,
                            s = t * i.currentSize,
                            n = function () {
                                i.value += s, i.setValue(i.value), i.triggerScrollEvent(i.value),
                                    function () {
                                        var s = i.value / i.maxValue * (i.currentSliderSize - i.handleSize);
                                        return t > 0 ? s + i.handleSize >= e : s <= e
                                    }() && clearInterval(i.pageScrollTimer)
                            };
                        this.pageScrollTimer = setInterval(n, this.options.scrollInterval), n()
                    },
                    stopPageScrolling: function () {
                        clearInterval(this.pageScrollTimer)
                    },
                    startSmoothScrolling: function (t) {
                        var i, s = this;
                        this.stopSmoothScrolling();
                        var n = e.requestAnimationFrame || function (t) {
                            setTimeout(t, 16)
                        },
                            o = function () {
                                return Date.now ? Date.now() : (new Date).getTime()
                            },
                            r = function () {
                                var e = (o() - i) / 1e3 * s.options.scrollStep;
                                s.smoothScrollActive && (s.value += e * t, s.setValue(s.value), s.triggerScrollEvent(s.value), function () {
                                    return t > 0 ? s.value >= s.maxValue : s.value <= 0
                                }() || (i = o(), n(r)))
                            };
                        s.smoothScrollActive = !0, i = o(), n(r)
                    },
                    stopSmoothScrolling: function () {
                        this.smoothScrollActive = !1
                    },
                    triggerScrollEvent: function (t) {
                        this.options.onScroll && this.options.onScroll(t)
                    },
                    getThickness: function () {
                        return this.scrollbar[this.thicknessMeasureMethod]()
                    },
                    setSize: function (t) {
                        var e = this.btnDec[this.fullSizeProperty](),
                            i = this.btnInc[this.fullSizeProperty]();
                        return this.currentSize = t, this.currentSliderSize = t - e - i, this.scrollbar.css(this.sizeProperty, t), this.slider.css(this.sizeProperty, this.currentSliderSize), this.currentSliderSize = this.slider[this.sizeProperty](), this.handleSize = Math.round(this.currentSliderSize * this.ratio), this.handle.css(this.sizeProperty, this.handleSize), this.handleSize = this.handle[this.fullSizeProperty](), this
                    },
                    setRatio: function (t) {
                        return this.ratio = t, this
                    },
                    setMaxValue: function (t) {
                        return this.maxValue = t, this.setValue(Math.min(this.value, this.maxValue)), this
                    },
                    setValue: function (t) {
                        this.value = t, this.value < 0 ? this.value = 0 : this.value > this.maxValue && (this.value = this.maxValue), this.refresh()
                    },
                    setPosition: function (t) {
                        return this.scrollbar.css(t), this
                    },
                    hide: function () {
                        return this.scrollbar.detach(), this
                    },
                    show: function () {
                        return this.scrollbar.appendTo(this.holder), this
                    },
                    refresh: function () {
                        0 === this.value || 0 === this.maxValue ? this.calcOffset = 0 : this.calcOffset = this.value / this.maxValue * (this.currentSliderSize - this.handleSize), this.handle.css(this.offsetProperty, this.calcOffset), this.btnDec.toggleClass(this.options.inactiveClass, 0 === this.value), this.btnInc.toggleClass(this.options.inactiveClass, this.value === this.maxValue), this.scrollbar.toggleClass(this.options.inactiveClass, 0 === this.maxValue)
                    },
                    destroy: function () {
                        this.btnDec.add(this.btnInc).off("jcf-pointerdown", this.onButtonPress), this.handle.off("jcf-pointerdown", this.onHandlePress), this.doc.off("jcf-pointermove", this.onHandleDrag), this.doc.off("jcf-pointerup", this.onHandleRelease), this.doc.off("jcf-pointerup", this.onButtonRelease), this.stopSmoothScrolling(), this.stopPageScrolling(), this.scrollbar.remove()
                    }
                })
            }(jQuery, window),
            function (t) {
                "use strict";
                jcf.addModule({
                    name: "Number",
                    selector: 'input[type="number"]',
                    options: {
                        realElementClass: "jcf-real-element",
                        fakeStructure: '<span class="jcf-number"><span class="jcf-btn-inc"></span><span class="jcf-btn-dec"></span></span>',
                        btnIncSelector: ".jcf-btn-inc",
                        btnDecSelector: ".jcf-btn-dec",
                        pressInterval: 150
                    },
                    matchElement: function (t) {
                        return t.is(this.selector)
                    },
                    init: function () {
                        this.initStructure(), this.attachEvents(), this.refresh()
                    },
                    initStructure: function () {
                        this.page = t("html"), this.realElement = t(this.options.element).addClass(this.options.realElementClass), this.fakeElement = t(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement), this.btnDec = this.fakeElement.find(this.options.btnDecSelector), this.btnInc = this.fakeElement.find(this.options.btnIncSelector), this.initialValue = parseFloat(this.realElement.val()) || 0, this.minValue = parseFloat(this.realElement.attr("min")), this.maxValue = parseFloat(this.realElement.attr("max")), this.stepValue = parseFloat(this.realElement.attr("step")) || 1, this.minValue = isNaN(this.minValue) ? -1 / 0 : this.minValue, this.maxValue = isNaN(this.maxValue) ? 1 / 0 : this.maxValue, isFinite(this.maxValue) && (this.maxValue -= (this.maxValue - this.minValue) % this.stepValue)
                    },
                    attachEvents: function () {
                        this.realElement.on({
                            focus: this.onFocus
                        }), this.btnDec.add(this.btnInc).on("jcf-pointerdown", this.onBtnPress)
                    },
                    onBtnPress: function (t) {
                        var e, i = this;
                        this.realElement.is(":disabled") || (e = this.btnInc.is(t.currentTarget), i.step(e), clearInterval(this.stepTimer), this.stepTimer = setInterval((function () {
                            i.step(e)
                        }), this.options.pressInterval), this.page.on("jcf-pointerup", this.onBtnRelease))
                    },
                    onBtnRelease: function () {
                        clearInterval(this.stepTimer), this.page.off("jcf-pointerup", this.onBtnRelease)
                    },
                    onFocus: function () {
                        this.fakeElement.addClass(this.options.focusClass), this.realElement.on({
                            blur: this.onBlur,
                            keydown: this.onKeyPress
                        })
                    },
                    onBlur: function () {
                        this.fakeElement.removeClass(this.options.focusClass), this.realElement.off({
                            blur: this.onBlur,
                            keydown: this.onKeyPress
                        })
                    },
                    onKeyPress: function (t) {
                        38 !== t.which && 40 !== t.which || (t.preventDefault(), this.step(38 === t.which))
                    },
                    step: function (t) {
                        var e = parseFloat(this.realElement.val()),
                            i = e || 0,
                            s = this.stepValue * (t ? 1 : -1),
                            n = isFinite(this.minValue) ? this.minValue : this.initialValue - Math.abs(i * this.stepValue),
                            o = Math.abs(n - i) % this.stepValue;
                        o ? t ? i += s - o : i -= o : i += s, i < this.minValue ? i = this.minValue : i > this.maxValue && (i = this.maxValue), i !== e && (this.realElement.val(i).trigger("change"), this.refresh())
                    },
                    refresh: function () {
                        var t = this.realElement.is(":disabled"),
                            e = parseFloat(this.realElement.val());
                        this.fakeElement.toggleClass(this.options.disabledClass, t), this.btnDec.toggleClass(this.options.disabledClass, e === this.minValue), this.btnInc.toggleClass(this.options.disabledClass, e === this.maxValue)
                    },
                    destroy: function () {
                        this.realElement.removeClass(this.options.realElementClass).insertBefore(this.fakeElement), this.fakeElement.remove(), clearInterval(this.stepTimer), this.page.off("jcf-pointerup", this.onBtnRelease), this.realElement.off({
                            keydown: this.onKeyPress,
                            focus: this.onFocus,
                            blur: this.onBlur
                        })
                    }
                })
            }(jQuery)
    }, function (t, e) {
        ! function (t, e) {
            "use strict";

            function i(t, e) {
                this.options = e, this.$stickyBox = t, this.init()
            }
            var s = {
                init: function () {
                    this.findElements(), this.attachEvents(), this.makeCallback("onInit")
                },
                findElements: function () {
                    this.$container = this.$stickyBox.closest(this.options.container), this.isWrap = "fixed" === this.options.positionType && this.options.setBoxHeight, this.moveInContainer = !!this.$container.length, this.isWrap && (this.$stickyBoxWrap = this.$stickyBox.wrap('<div class="' + this.getWrapClass() + '"/>').parent()), this.parentForActive = this.getParentForActive(), this.isInit = !0
                },
                attachEvents: function () {
                    var t = this;
                    this.onResize = function () {
                        t.isInit && (t.resetState(), t.recalculateOffsets(), t.checkStickyPermission(), t.scrollHandler())
                    }, this.onScroll = function () {
                        t.scrollHandler()
                    }, this.onResize(), e.on("load resize orientationchange", this.onResize).on("scroll", this.onScroll)
                },
                defineExtraTop: function () {
                    var t;
                    "number" == typeof this.options.extraTop ? t = this.options.extraTop : "function" == typeof this.options.extraTop && (t = this.options.extraTop()), this.extraTop = "absolute" === this.options.positionType ? t : Math.min(this.winParams.height - this.data.boxFullHeight, t)
                },
                checkStickyPermission: function () {
                    this.isStickyEnabled = !this.moveInContainer || this.data.containerOffsetTop + this.data.containerHeight > this.data.boxFullHeight + this.data.boxOffsetTop + this.options.extraBottom
                },
                getParentForActive: function () {
                    return this.isWrap ? this.$stickyBoxWrap : this.$container.length ? this.$container : this.$stickyBox
                },
                getWrapClass: function () {
                    try {
                        return this.$stickyBox.attr("class").split(" ").map((function (t) {
                            return "sticky-wrap-" + t
                        })).join(" ")
                    } catch (t) {
                        return "sticky-wrap"
                    }
                },
                resetState: function () {
                    this.stickyFlag = !1, this.$stickyBox.css({
                        "-webkit-transition": "",
                        "-webkit-transform": "",
                        transition: "",
                        transform: "",
                        position: "",
                        width: "",
                        left: "",
                        top: ""
                    }).removeClass(this.options.activeClass), this.isWrap && this.$stickyBoxWrap.removeClass(this.options.activeClass).removeAttr("style"), this.moveInContainer && this.$container.removeClass(this.options.activeClass)
                },
                recalculateOffsets: function () {
                    this.winParams = this.getWindowParams(), this.data = t.extend(this.getBoxOffsets(), this.getContainerOffsets()), this.defineExtraTop()
                },
                getBoxOffsets: function () {
                    var t = "fixed" === this.$stickyBox.css("position") ? function (t) {
                        return t.top = 0, t
                    }(this.$stickyBox.offset()) : this.$stickyBox.offset(),
                        e = this.$stickyBox.position();
                    return {
                        boxOffsetLeft: t.left,
                        boxOffsetTop: t.top,
                        boxTopPosition: e.top,
                        boxLeftPosition: e.left,
                        boxFullHeight: this.$stickyBox.outerHeight(!0),
                        boxHeight: this.$stickyBox.outerHeight(),
                        boxWidth: this.$stickyBox.outerWidth()
                    }
                },
                getContainerOffsets: function () {
                    var t = this.moveInContainer ? this.$container.offset() : null;
                    return t ? {
                        containerOffsetLeft: t.left,
                        containerOffsetTop: t.top,
                        containerHeight: this.$container.outerHeight()
                    } : {}
                },
                getWindowParams: function () {
                    return {
                        height: window.innerHeight || document.documentElement.clientHeight
                    }
                },
                makeCallback: function (t) {
                    if ("function" == typeof this.options[t]) {
                        var e = Array.prototype.slice.call(arguments);
                        e.shift(), this.options[t].apply(this, e)
                    }
                },
                destroy: function () {
                    this.isInit = !1, e.off("load resize orientationchange", this.onResize).off("scroll", this.onScroll), this.resetState(), this.$stickyBox.removeData("StickyScrollBlock"), this.isWrap && this.$stickyBox.unwrap(), this.makeCallback("onDestroy")
                }
            },
                n = {
                    fixed: {
                        scrollHandler: function () {
                            this.winScrollTop = e.scrollTop(), this.winScrollTop - (this.options.showAfterScrolled ? this.extraTop : 0) - (this.options.showAfterScrolled ? this.data.boxHeight + this.extraTop : 0) > this.data.boxOffsetTop - this.extraTop ? this.isStickyEnabled && this.stickyOn() : this.stickyOff()
                        },
                        stickyOn: function () {
                            this.stickyFlag || (this.stickyFlag = !0, this.parentForActive.addClass(this.options.activeClass), this.$stickyBox.css({
                                width: this.data.boxWidth,
                                position: this.options.positionType
                            }), this.isWrap && this.$stickyBoxWrap.css({
                                height: this.data.boxFullHeight
                            }), this.makeCallback("fixedOn")), this.setDynamicPosition()
                        },
                        stickyOff: function () {
                            this.stickyFlag && (this.stickyFlag = !1, this.resetState(), this.makeCallback("fixedOff"))
                        },
                        setDynamicPosition: function () {
                            this.$stickyBox.css({
                                top: this.getTopPosition(),
                                left: this.data.boxOffsetLeft - e.scrollLeft()
                            })
                        },
                        getTopPosition: function () {
                            if (this.moveInContainer) {
                                var t = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;
                                return Math.min(this.extraTop, this.data.containerHeight + this.data.containerOffsetTop - t)
                            }
                            return this.extraTop
                        }
                    },
                    absolute: {
                        scrollHandler: function () {
                            this.winScrollTop = e.scrollTop(), this.winScrollTop > this.data.boxOffsetTop - this.extraTop ? this.isStickyEnabled && this.stickyOn() : this.stickyOff()
                        },
                        stickyOn: function () {
                            this.stickyFlag || (this.stickyFlag = !0, this.parentForActive.addClass(this.options.activeClass), this.$stickyBox.css({
                                width: this.data.boxWidth,
                                transition: "transform " + this.options.animSpeed + "s ease",
                                "-webkit-transition": "transform " + this.options.animSpeed + "s ease"
                            }), this.isWrap && this.$stickyBoxWrap.css({
                                height: this.data.boxFullHeight
                            }), this.makeCallback("fixedOn")), this.clearTimer(), this.timer = setTimeout(function () {
                                this.setDynamicPosition()
                            }.bind(this), 1e3 * this.options.animDelay)
                        },
                        stickyOff: function () {
                            this.stickyFlag && (this.clearTimer(), this.stickyFlag = !1, this.timer = setTimeout(function () {
                                this.setDynamicPosition(), setTimeout(function () {
                                    this.resetState()
                                }.bind(this), 1e3 * this.options.animSpeed)
                            }.bind(this), 1e3 * this.options.animDelay), this.makeCallback("fixedOff"))
                        },
                        clearTimer: function () {
                            clearTimeout(this.timer)
                        },
                        setDynamicPosition: function () {
                            var t = Math.max(0, this.getTopPosition());
                            this.$stickyBox.css({
                                transform: "translateY(" + t + "px)",
                                "-webkit-transform": "translateY(" + t + "px)"
                            })
                        },
                        getTopPosition: function () {
                            var t = this.winScrollTop - this.data.boxOffsetTop + this.extraTop;
                            if (this.moveInContainer) {
                                var e = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;
                                return t - Math.abs(Math.min(0, this.data.containerHeight + this.data.containerOffsetTop - e - this.extraTop))
                            }
                            return t
                        }
                    }
                };
            t.fn.stickyScrollBlock = function (e) {
                var o = Array.prototype.slice.call(arguments),
                    r = o[0],
                    a = t.extend({
                        container: null,
                        positionType: "fixed",
                        activeClass: "fixed-position",
                        setBoxHeight: !0,
                        showAfterScrolled: !1,
                        extraTop: 0,
                        extraBottom: 15,
                        animDelay: .1,
                        animSpeed: .2
                    }, e);
                return this.each((function () {
                    var l = jQuery(this),
                        c = l.data("StickyScrollBlock");
                    "object" == typeof e || void 0 === e ? (i.prototype = t.extend(n[a.positionType], s), l.data("StickyScrollBlock", new i(l, a))) : "string" == typeof r && c && "function" == typeof c[r] && (o.shift(), c[r].apply(c, o))
                }))
            }, window.StickyScrollBlock = i
        }(jQuery, jQuery(window))
    }, function (t, e) {
        ! function (t, e) {
            var i, s, n, o = t(window),
                r = "onwheel" in document || document.documentMode >= 9 ? "wheel" : "mousewheel DOMMouseScroll";

            function a(e, o, a) {
                var l;
                document.body && (o = "number" == typeof o ? {
                    duration: o
                } : o || {}, i = i || t("html, body"), l = o.container || i, "number" == typeof e && (e = {
                    top: e
                }), s && n && s.off(r, n), o.wheelBehavior && "none" !== o.wheelBehavior && (n = function (t) {
                    "stop" === o.wheelBehavior ? (l.off(r, n), l.stop()) : "ignore" === o.wheelBehavior && t.preventDefault()
                }, s = l.on(r, n)), l.stop().animate({
                    scrollLeft: e.left,
                    scrollTop: e.top
                }, o.duration, (function () {
                    n && l.off(r, n), t.isFunction(a) && a()
                })))
            }

            function l(e) {
                this.options = t.extend({
                    anchorLinks: 'a[href^="#"]',
                    container: null,
                    extraOffset: null,
                    activeClasses: null,
                    easing: "swing",
                    animMode: "duration",
                    animDuration: 800,
                    animSpeed: 1500,
                    anchorActiveClass: "anchor-active",
                    sectionActiveClass: "section-active",
                    wheelBehavior: "stop",
                    useNativeAnchorScrolling: !1
                }, e), this.init()
            }
            l.prototype = {
                init: function () {
                    this.initStructure(), this.attachEvents(), this.isInit = !0
                },
                initStructure: function () {
                    var e = this;
                    this.container = this.options.container ? t(this.options.container) : t("html,body"), this.scrollContainer = this.options.container ? this.container : o, this.anchorLinks = jQuery(this.options.anchorLinks).filter((function () {
                        return jQuery(e.getAnchorTarget(jQuery(this))).length
                    }))
                },
                getId: function (t) {
                    try {
                        return "#" + t.replace(/^.*?(#|$)/, "")
                    } catch (t) {
                        return null
                    }
                },
                getAnchorTarget: function (e) {
                    var i = this.getId(t(e).attr("href"));
                    return t(i.length > 1 ? i : "html")
                },
                getTargetOffset: function (t) {
                    var e = t.offset().top;
                    return this.options.container && (e -= this.container.offset().top - this.container.prop("scrollTop")), "number" == typeof this.options.extraOffset ? e -= this.options.extraOffset : "function" == typeof this.options.extraOffset && (e -= this.options.extraOffset(t)), {
                        top: e
                    }
                },
                attachEvents: function () {
                    var e = this;
                    if (this.options.activeClasses && this.anchorLinks.length) {
                        this.anchorData = [];
                        for (var i = 0; i < this.anchorLinks.length; i++) {
                            var s = jQuery(this.anchorLinks[i]),
                                n = e.getAnchorTarget(s),
                                r = null;
                            t.each(e.anchorData, (function (t, e) {
                                e.block[0] === n[0] && (r = e)
                            })), r ? r.link = r.link.add(s) : e.anchorData.push({
                                link: s,
                                block: n
                            })
                        }
                        this.resizeHandler = function () {
                            e.isInit && e.recalculateOffsets()
                        }, this.scrollHandler = function () {
                            e.refreshActiveClass()
                        }, this.recalculateOffsets(), this.scrollContainer.on("scroll", this.scrollHandler), o.on("resize.SmoothScroll load.SmoothScroll orientationchange.SmoothScroll refreshAnchor.SmoothScroll", this.resizeHandler)
                    }
                    this.clickHandler = function (t) {
                        e.onClick(t)
                    }, this.options.useNativeAnchorScrolling || this.anchorLinks.on("click", this.clickHandler)
                },
                recalculateOffsets: function () {
                    var e = this;
                    t.each(this.anchorData, (function (t, i) {
                        i.offset = e.getTargetOffset(i.block), i.height = i.block.outerHeight()
                    })), this.refreshActiveClass()
                },
                toggleActiveClass: function (e, i, s) {
                    e.toggleClass(this.options.anchorActiveClass, s), i.toggleClass(this.options.sectionActiveClass, s), s && e.offset().left > t(window).width() && e[0].scrollIntoView()
                },
                refreshActiveClass: function () {
                    var e = this,
                        i = !1,
                        s = this.container.prop("scrollHeight"),
                        n = this.scrollContainer.height(),
                        r = this.options.container ? this.container.prop("scrollTop") : o.scrollTop();
                    this.options.customScrollHandler ? this.options.customScrollHandler.call(this, r, this.anchorData) : (this.anchorData.sort((function (t, e) {
                        return t.offset.top - e.offset.top
                    })), t.each(this.anchorData, (function (t) {
                        var o = e.anchorData.length - t - 1,
                            a = e.anchorData[o],
                            l = "parent" === e.options.activeClasses ? a.link.parent() : a.link;
                        r >= s - n ? o === e.anchorData.length - 1 ? e.toggleActiveClass(l, a.block, !0) : e.toggleActiveClass(l, a.block, !1) : !i && (r >= a.offset.top - 1 || 0 === o) ? (i = !0, e.toggleActiveClass(l, a.block, !0)) : e.toggleActiveClass(l, a.block, !1)
                    })))
                },
                calculateScrollDuration: function (t) {
                    return "speed" === this.options.animMode ? Math.abs(this.scrollContainer.scrollTop() - t.top) / this.options.animSpeed * 1e3 : this.options.animDuration
                },
                onClick: function (t) {
                    var e = this.getAnchorTarget(t.currentTarget),
                        i = this.getTargetOffset(e);
                    t.preventDefault(), a(i, {
                        container: this.container,
                        wheelBehavior: this.options.wheelBehavior,
                        duration: this.calculateScrollDuration(i)
                    }), this.makeCallback("onBeforeScroll", t.currentTarget)
                },
                makeCallback: function (t) {
                    if ("function" == typeof this.options[t]) {
                        var e = Array.prototype.slice.call(arguments);
                        e.shift(), this.options[t].apply(this, e)
                    }
                },
                destroy: function () {
                    var e = this;
                    this.isInit = !1, this.options.activeClasses && (o.off("resize.SmoothScroll load.SmoothScroll orientationchange.SmoothScroll refreshAnchor.SmoothScroll", this.resizeHandler), this.scrollContainer.off("scroll", this.scrollHandler), t.each(this.anchorData, (function (t) {
                        var i = e.anchorData.length - t - 1,
                            s = e.anchorData[i],
                            n = "parent" === e.options.activeClasses ? s.link.parent() : s.link;
                        e.toggleActiveClass(n, s.block, !1)
                    }))), this.anchorLinks.off("click", this.clickHandler)
                }
            }, t.extend(l, {
                scrollTo: function (t, e, i) {
                    a(t, e, i)
                }
            }), e.SmoothScroll = l
        }(jQuery, window)
    }, function (t, e, i) {
        var s, n, o;
        ! function (r) {
            "use strict";
            n = [i(7)], s = function (t) {
                var e = window.Slick || {};
                (e = function () {
                    var e = 0;

                    function i(i, s) {
                        var n, o = this;
                        o.defaults = {
                            accessibility: !0,
                            adaptiveHeight: !1,
                            appendArrows: t(i),
                            appendDots: t(i),
                            arrows: !0,
                            asNavFor: null,
                            prevArrow: '<div class="slick-prev" aria-label="Previous" type="button">Previous</div>',
                            nextArrow: '<div class="slick-next" aria-label="Next" type="button">Next</div>',
                            autoplay: !1,
                            autoplaySpeed: 3e3,
                            centerMode: !1,
                            centerPadding: "50px",
                            cssEase: "ease",
                            customPaging: function (e, i) {
                                return t('<button type="button" />').text(i + 1)
                            },
                            dots: !1,
                            dotsClass: "slick-dots",
                            draggable: !0,
                            easing: "linear",
                            edgeFriction: .35,
                            fade: !1,
                            focusOnSelect: !1,
                            focusOnChange: !1,
                            infinite: !0,
                            initialSlide: 0,
                            lazyLoad: "ondemand",
                            mobileFirst: !1,
                            pauseOnHover: !0,
                            pauseOnFocus: !0,
                            pauseOnDotsHover: !1,
                            respondTo: "window",
                            responsive: null,
                            rows: 1,
                            rtl: !1,
                            slide: "",
                            slidesPerRow: 1,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            speed: 500,
                            swipe: !0,
                            swipeToSlide: !1,
                            touchMove: !0,
                            touchThreshold: 5,
                            useCSS: !0,
                            useTransform: !0,
                            variableWidth: !1,
                            vertical: !1,
                            verticalSwiping: !1,
                            waitForAnimate: !0,
                            zIndex: 1e3
                        }, o.initials = {
                            animating: !1,
                            dragging: !1,
                            autoPlayTimer: null,
                            currentDirection: 0,
                            currentLeft: null,
                            currentSlide: 0,
                            direction: 1,
                            $dots: null,
                            listWidth: null,
                            listHeight: null,
                            loadIndex: 0,
                            $nextArrow: null,
                            $prevArrow: null,
                            scrolling: !1,
                            slideCount: null,
                            slideWidth: null,
                            $slideTrack: null,
                            $slides: null,
                            sliding: !1,
                            slideOffset: 0,
                            swipeLeft: null,
                            swiping: !1,
                            $list: null,
                            touchObject: {},
                            transformsEnabled: !1,
                            unslicked: !1
                        }, t.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = t(i), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, n = t(i).data("slick") || {}, o.options = t.extend({}, o.defaults, s, n), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = t.proxy(o.autoPlay, o), o.autoPlayClear = t.proxy(o.autoPlayClear, o), o.autoPlayIterator = t.proxy(o.autoPlayIterator, o), o.changeSlide = t.proxy(o.changeSlide, o), o.clickHandler = t.proxy(o.clickHandler, o), o.selectHandler = t.proxy(o.selectHandler, o), o.setPosition = t.proxy(o.setPosition, o), o.swipeHandler = t.proxy(o.swipeHandler, o), o.dragHandler = t.proxy(o.dragHandler, o), o.keyHandler = t.proxy(o.keyHandler, o), o.instanceUid = e++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
                    }
                    return i
                }()).prototype.activateADA = function () {
                    this.$slideTrack.find(".slick-active").attr({
                        "aria-hidden": "false"
                    }).find("a, input, button, select").attr({
                        tabindex: "0"
                    })
                }, e.prototype.addSlide = e.prototype.slickAdd = function (e, i, s) {
                    var n = this;
                    if ("boolean" == typeof i) s = i, i = null;
                    else if (i < 0 || i >= n.slideCount) return !1;
                    n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : s ? t(e).insertBefore(n.$slides.eq(i)) : t(e).insertAfter(n.$slides.eq(i)) : !0 === s ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each((function (e, i) {
                        t(i).attr("data-slick-index", e)
                    })), n.$slidesCache = n.$slides, n.reinit()
                }, e.prototype.animateHeight = function () {
                    var t = this;
                    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                        var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                        t.$list.animate({
                            height: e
                        }, t.options.speed)
                    }
                }, e.prototype.animateSlide = function (e, i) {
                    var s = {},
                        n = this;
                    n.animateHeight(), !0 === n.options.rtl && !1 === n.options.vertical && (e = -e), !1 === n.transformsEnabled ? !1 === n.options.vertical ? n.$slideTrack.animate({
                        left: e
                    }, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({
                        top: e
                    }, n.options.speed, n.options.easing, i) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), t({
                        animStart: n.currentLeft
                    }).animate({
                        animStart: e
                    }, {
                        duration: n.options.speed,
                        easing: n.options.easing,
                        step: function (t) {
                            t = Math.ceil(t), !1 === n.options.vertical ? (s[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(s)) : (s[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(s))
                        },
                        complete: function () {
                            i && i.call()
                        }
                    })) : (n.applyTransition(), e = Math.ceil(e), !1 === n.options.vertical ? s[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : s[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(s), i && setTimeout((function () {
                        n.disableTransition(), i.call()
                    }), n.options.speed))
                }, e.prototype.getNavTarget = function () {
                    var e = this,
                        i = e.options.asNavFor;
                    return i && null !== i && (i = t(i).not(e.$slider)), i
                }, e.prototype.asNavFor = function (e) {
                    var i = this.getNavTarget();
                    null !== i && "object" == typeof i && i.each((function () {
                        var i = t(this).slick("getSlick");
                        i.unslicked || i.slideHandler(e, !0)
                    }))
                }, e.prototype.applyTransition = function (t) {
                    var e = this,
                        i = {};
                    !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
                }, e.prototype.autoPlay = function () {
                    var t = this;
                    t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
                }, e.prototype.autoPlayClear = function () {
                    var t = this;
                    t.autoPlayTimer && clearInterval(t.autoPlayTimer)
                }, e.prototype.autoPlayIterator = function () {
                    var t = this,
                        e = t.currentSlide + t.options.slidesToScroll;
                    t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
                }, e.prototype.buildArrows = function () {
                    var e = this;
                    !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                        "aria-disabled": "true",
                        tabindex: "-1"
                    }))
                }, e.prototype.buildDots = function () {
                    var e, i, s = this;
                    if (!0 === s.options.dots && s.slideCount > s.options.slidesToShow) {
                        for (s.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(s.options.dotsClass), e = 0; e <= s.getDotCount(); e += 1) i.append(t("<li />").append(s.options.customPaging.call(this, s, e)));
                        s.$dots = i.appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active")
                    }
                }, e.prototype.buildOut = function () {
                    var e = this;
                    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each((function (e, i) {
                        t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
                    })), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
                }, e.prototype.buildRows = function () {
                    var t, e, i, s, n, o, r, a = this;
                    if (s = document.createDocumentFragment(), o = a.$slider.children(), a.options.rows > 0) {
                        for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(o.length / r), t = 0; t < n; t++) {
                            var l = document.createElement("div");
                            for (e = 0; e < a.options.rows; e++) {
                                var c = document.createElement("div");
                                for (i = 0; i < a.options.slidesPerRow; i++) {
                                    var d = t * r + (e * a.options.slidesPerRow + i);
                                    o.get(d) && c.appendChild(o.get(d))
                                }
                                l.appendChild(c)
                            }
                            s.appendChild(l)
                        }
                        a.$slider.empty().append(s), a.$slider.children().children().children().css({
                            width: 100 / a.options.slidesPerRow + "%",
                            display: "inline-block"
                        })
                    }
                }, e.prototype.checkResponsive = function (e, i) {
                    var s, n, o, r = this,
                        a = !1,
                        l = r.$slider.width(),
                        c = window.innerWidth || t(window).width();
                    if ("window" === r.respondTo ? o = c : "slider" === r.respondTo ? o = l : "min" === r.respondTo && (o = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                        for (s in n = null, r.breakpoints) r.breakpoints.hasOwnProperty(s) && (!1 === r.originalSettings.mobileFirst ? o < r.breakpoints[s] && (n = r.breakpoints[s]) : o > r.breakpoints[s] && (n = r.breakpoints[s]));
                        null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || i) && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = n), e || !1 === a || r.$slider.trigger("breakpoint", [r, a])
                    }
                }, e.prototype.changeSlide = function (e, i) {
                    var s, n, o = this,
                        r = t(e.currentTarget);
                    switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), s = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, e.data.message) {
                        case "previous":
                            n = 0 === s ? o.options.slidesToScroll : o.options.slidesToShow - s, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - n, !1, i);
                            break;
                        case "next":
                            n = 0 === s ? o.options.slidesToScroll : s, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + n, !1, i);
                            break;
                        case "index":
                            var a = 0 === e.data.index ? 0 : e.data.index || r.index() * o.options.slidesToScroll;
                            o.slideHandler(o.checkNavigable(a), !1, i), r.children().trigger("focus");
                            break;
                        default:
                            return
                    }
                }, e.prototype.checkNavigable = function (t) {
                    var e, i;
                    if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
                    else
                        for (var s in e) {
                            if (t < e[s]) {
                                t = i;
                                break
                            }
                            i = e[s]
                        }
                    return t
                }, e.prototype.cleanUpEvents = function () {
                    var e = this;
                    e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
                }, e.prototype.cleanUpSlideEvents = function () {
                    var e = this;
                    e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
                }, e.prototype.cleanUpRows = function () {
                    var t, e = this;
                    e.options.rows > 0 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
                }, e.prototype.clickHandler = function (t) {
                    !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
                }, e.prototype.destroy = function (e) {
                    var i = this;
                    i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function () {
                        t(this).attr("style", t(this).data("originalStyling"))
                    })), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
                }, e.prototype.disableTransition = function (t) {
                    var e = this,
                        i = {};
                    i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
                }, e.prototype.fadeSlide = function (t, e) {
                    var i = this;
                    !1 === i.cssTransitions ? (i.$slides.eq(t).css({
                        zIndex: i.options.zIndex
                    }), i.$slides.eq(t).animate({
                        opacity: 1
                    }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
                        opacity: 1,
                        zIndex: i.options.zIndex
                    }), e && setTimeout((function () {
                        i.disableTransition(t), e.call()
                    }), i.options.speed))
                }, e.prototype.fadeSlideOut = function (t) {
                    var e = this;
                    !1 === e.cssTransitions ? e.$slides.eq(t).animate({
                        opacity: 0,
                        zIndex: e.options.zIndex - 2
                    }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                        opacity: 0,
                        zIndex: e.options.zIndex - 2
                    }))
                }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
                    var e = this;
                    null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
                }, e.prototype.focusHandler = function () {
                    var e = this;
                    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function (i) {
                        i.stopImmediatePropagation();
                        var s = t(this);
                        setTimeout((function () {
                            e.options.pauseOnFocus && (e.focussed = s.is(":focus"), e.autoPlay())
                        }), 0)
                    }))
                }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
                    return this.currentSlide
                }, e.prototype.getDotCount = function () {
                    var t = this,
                        e = 0,
                        i = 0,
                        s = 0;
                    if (!0 === t.options.infinite)
                        if (t.slideCount <= t.options.slidesToShow) ++s;
                        else
                            for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                    else if (!0 === t.options.centerMode) s = t.slideCount;
                    else if (t.options.asNavFor)
                        for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                    else s = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
                    return s - 1
                }, e.prototype.getLeft = function (t) {
                    var e, i, s, n, o = this,
                        r = 0;
                    return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, n = -1, !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? n = -1.5 : 1 === o.options.slidesToShow && (n = -2)), r = i * o.options.slidesToShow * n), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + r, !0 === o.options.variableWidth && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, !0 === o.options.centerMode && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (o.$list.width() - s.outerWidth()) / 2)), e
                }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
                    return this.options[t]
                }, e.prototype.getNavigableIndexes = function () {
                    var t, e = this,
                        i = 0,
                        s = 0,
                        n = [];
                    for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, s = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) n.push(i), i = s + e.options.slidesToScroll, s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                    return n
                }, e.prototype.getSlick = function () {
                    return this
                }, e.prototype.getSlideCount = function () {
                    var e, i, s = this;
                    return i = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each((function (n, o) {
                        if (o.offsetLeft - i + t(o).outerWidth() / 2 > -1 * s.swipeLeft) return e = o, !1
                    })), Math.abs(t(e).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
                }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
                    this.changeSlide({
                        data: {
                            message: "index",
                            index: parseInt(t)
                        }
                    }, e)
                }, e.prototype.init = function (e) {
                    var i = this;
                    t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
                }, e.prototype.initADA = function () {
                    var e = this,
                        i = Math.ceil(e.slideCount / e.options.slidesToShow),
                        s = e.getNavigableIndexes().filter((function (t) {
                            return t >= 0 && t < e.slideCount
                        }));
                    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                        "aria-hidden": "true",
                        tabindex: "-1"
                    }).find("a, input, button, select").attr({
                        tabindex: "-1"
                    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each((function (i) {
                        var n = s.indexOf(i);
                        if (t(this).attr({
                            role: "tabpanel",
                            id: "slick-slide" + e.instanceUid + i,
                            tabindex: -1
                        }), -1 !== n) {
                            var o = "slick-slide-control" + e.instanceUid + n;
                            t("#" + o).length && t(this).attr({
                                "aria-describedby": o
                            })
                        }
                    })), e.$dots.attr("role", "tablist").find("li").each((function (n) {
                        var o = s[n];
                        t(this).attr({
                            role: "presentation"
                        }), t(this).find("button").first().attr({
                            role: "tab",
                            id: "slick-slide-control" + e.instanceUid + n,
                            "aria-controls": "slick-slide" + e.instanceUid + o,
                            "aria-label": n + 1 + " of " + i,
                            "aria-selected": null,
                            tabindex: "-1"
                        })
                    })).eq(e.currentSlide).find("button").attr({
                        "aria-selected": "true",
                        tabindex: "0"
                    }).end());
                    for (var n = e.currentSlide, o = n + e.options.slidesToShow; n < o; n++) e.options.focusOnChange ? e.$slides.eq(n).attr({
                        tabindex: "0"
                    }) : e.$slides.eq(n).removeAttr("tabindex");
                    e.activateADA()
                }, e.prototype.initArrowEvents = function () {
                    var t = this;
                    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                        message: "previous"
                    }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                        message: "next"
                    }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
                }, e.prototype.initDotEvents = function () {
                    var e = this;
                    !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (t("li", e.$dots).on("click.slick", {
                        message: "index"
                    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
                }, e.prototype.initSlideEvents = function () {
                    var e = this;
                    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
                }, e.prototype.initializeEvents = function () {
                    var e = this;
                    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                        action: "start"
                    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                        action: "move"
                    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                        action: "end"
                    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                        action: "end"
                    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition)
                }, e.prototype.initUI = function () {
                    var t = this;
                    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
                }, e.prototype.keyHandler = function (t) {
                    var e = this;
                    t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                        data: {
                            message: !0 === e.options.rtl ? "next" : "previous"
                        }
                    }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                        data: {
                            message: !0 === e.options.rtl ? "previous" : "next"
                        }
                    }))
                }, e.prototype.lazyLoad = function () {
                    var e, i, s, n = this;

                    function o(e) {
                        t("img[data-lazy]", e).each((function () {
                            var e = t(this),
                                i = t(this).attr("data-lazy"),
                                s = t(this).attr("data-srcset"),
                                o = t(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                                r = document.createElement("img");
                            r.onload = function () {
                                e.animate({
                                    opacity: 0
                                }, 100, (function () {
                                    s && (e.attr("srcset", s), o && e.attr("sizes", o)), e.attr("src", i).animate({
                                        opacity: 1
                                    }, 200, (function () {
                                        e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                    })), n.$slider.trigger("lazyLoaded", [n, e, i])
                                }))
                            }, r.onerror = function () {
                                e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, i])
                            }, r.src = i
                        }))
                    }
                    if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (i = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (i = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (i = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(i + n.options.slidesToShow), !0 === n.options.fade && (i > 0 && i--, s <= n.slideCount && s++)), e = n.$slider.find(".slick-slide").slice(i, s), "anticipated" === n.options.lazyLoad)
                        for (var r = i - 1, a = s, l = n.$slider.find(".slick-slide"), c = 0; c < n.options.slidesToScroll; c++) r < 0 && (r = n.slideCount - 1), e = (e = e.add(l.eq(r))).add(l.eq(a)), r--, a++;
                    o(e), n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
                }, e.prototype.loadSlider = function () {
                    var t = this;
                    t.setPosition(), t.$slideTrack.css({
                        opacity: 1
                    }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
                }, e.prototype.next = e.prototype.slickNext = function () {
                    this.changeSlide({
                        data: {
                            message: "next"
                        }
                    })
                }, e.prototype.orientationChange = function () {
                    var t = this;
                    t.checkResponsive(), t.setPosition()
                }, e.prototype.pause = e.prototype.slickPause = function () {
                    var t = this;
                    t.autoPlayClear(), t.paused = !0
                }, e.prototype.play = e.prototype.slickPlay = function () {
                    var t = this;
                    t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
                }, e.prototype.postSlide = function (e) {
                    var i = this;
                    i.unslicked || (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
                }, e.prototype.prev = e.prototype.slickPrev = function () {
                    this.changeSlide({
                        data: {
                            message: "previous"
                        }
                    })
                }, e.prototype.preventDefault = function (t) {
                    t.preventDefault()
                }, e.prototype.progressiveLazyLoad = function (e) {
                    e = e || 1;
                    var i, s, n, o, r, a = this,
                        l = t("img[data-lazy]", a.$slider);
                    l.length ? (i = l.first(), s = i.attr("data-lazy"), n = i.attr("data-srcset"), o = i.attr("data-sizes") || a.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
                        n && (i.attr("srcset", n), o && i.attr("sizes", o)), i.attr("src", s).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, s]), a.progressiveLazyLoad()
                    }, r.onerror = function () {
                        e < 3 ? setTimeout((function () {
                            a.progressiveLazyLoad(e + 1)
                        }), 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, s]), a.progressiveLazyLoad())
                    }, r.src = s) : a.$slider.trigger("allImagesLoaded", [a])
                }, e.prototype.refresh = function (e) {
                    var i, s, n = this;
                    s = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > s && (n.currentSlide = s), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), i = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {
                        currentSlide: i
                    }), n.init(), e || n.changeSlide({
                        data: {
                            message: "index",
                            index: i
                        }
                    }, !1)
                }, e.prototype.registerBreakpoints = function () {
                    var e, i, s, n = this,
                        o = n.options.responsive || null;
                    if ("array" === t.type(o) && o.length) {
                        for (e in n.respondTo = n.options.respondTo || "window", o)
                            if (s = n.breakpoints.length - 1, o.hasOwnProperty(e)) {
                                for (i = o[e].breakpoint; s >= 0;) n.breakpoints[s] && n.breakpoints[s] === i && n.breakpoints.splice(s, 1), s--;
                                n.breakpoints.push(i), n.breakpointSettings[i] = o[e].settings
                            } n.breakpoints.sort((function (t, e) {
                                return n.options.mobileFirst ? t - e : e - t
                            }))
                    }
                }, e.prototype.reinit = function () {
                    var e = this;
                    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
                }, e.prototype.resize = function () {
                    var e = this;
                    t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout((function () {
                        e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
                    }), 50))
                }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
                    var s = this;
                    if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : s.slideCount - 1 : !0 === e ? --t : t, s.slideCount < 1 || t < 0 || t > s.slideCount - 1) return !1;
                    s.unload(), !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, s.reinit()
                }, e.prototype.setCSS = function (t) {
                    var e, i, s = this,
                        n = {};
                    !0 === s.options.rtl && (t = -t), e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", n[s.positionProp] = t, !1 === s.transformsEnabled ? s.$slideTrack.css(n) : (n = {}, !1 === s.cssTransitions ? (n[s.animType] = "translate(" + e + ", " + i + ")", s.$slideTrack.css(n)) : (n[s.animType] = "translate3d(" + e + ", " + i + ", 0px)", s.$slideTrack.css(n)))
                }, e.prototype.setDimensions = function () {
                    var t = this;
                    !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
                        padding: "0px " + t.options.centerPadding
                    }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
                        padding: t.options.centerPadding + " 0px"
                    })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
                    var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                    !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
                }, e.prototype.setFade = function () {
                    var e, i = this;
                    i.$slides.each((function (s, n) {
                        e = i.slideWidth * s * -1, !0 === i.options.rtl ? t(n).css({
                            position: "relative",
                            right: e,
                            top: 0,
                            zIndex: i.options.zIndex - 2,
                            opacity: 0
                        }) : t(n).css({
                            position: "relative",
                            left: e,
                            top: 0,
                            zIndex: i.options.zIndex - 2,
                            opacity: 0
                        })
                    })), i.$slides.eq(i.currentSlide).css({
                        zIndex: i.options.zIndex - 1,
                        opacity: 1
                    })
                }, e.prototype.setHeight = function () {
                    var t = this;
                    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                        var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                        t.$list.css("height", e)
                    }
                }, e.prototype.setOption = e.prototype.slickSetOption = function () {
                    var e, i, s, n, o, r = this,
                        a = !1;
                    if ("object" === t.type(arguments[0]) ? (s = arguments[0], a = arguments[1], o = "multiple") : "string" === t.type(arguments[0]) && (s = arguments[0], n = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) r.options[s] = n;
                    else if ("multiple" === o) t.each(s, (function (t, e) {
                        r.options[t] = e
                    }));
                    else if ("responsive" === o)
                        for (i in n)
                            if ("array" !== t.type(r.options.responsive)) r.options.responsive = [n[i]];
                            else {
                                for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === n[i].breakpoint && r.options.responsive.splice(e, 1), e--;
                                r.options.responsive.push(n[i])
                            } a && (r.unload(), r.reinit())
                }, e.prototype.setPosition = function () {
                    var t = this;
                    t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
                }, e.prototype.setProps = function () {
                    var t = this,
                        e = document.body.style;
                    t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
                }, e.prototype.setSlideClasses = function (t) {
                    var e, i, s, n, o = this;
                    if (i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(t).addClass("slick-current"), !0 === o.options.centerMode) {
                        var r = o.options.slidesToShow % 2 == 0 ? 1 : 0;
                        e = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (t >= e && t <= o.slideCount - 1 - e ? o.$slides.slice(t - e + r, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = o.options.slidesToShow + t, i.slice(s - e + 1 + r, s + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : t === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(t).addClass("slick-center")
                    } else t >= 0 && t <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(t, t + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, s = !0 === o.options.infinite ? o.options.slidesToShow + t : t, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - t < o.options.slidesToShow ? i.slice(s - (o.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                    "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
                }, e.prototype.setupInfinite = function () {
                    var e, i, s, n = this;
                    if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (i = null, n.slideCount > n.options.slidesToShow)) {
                        for (s = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - s; e -= 1) i = e - 1, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
                        for (e = 0; e < s + n.slideCount; e += 1) i = e, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
                        n.$slideTrack.find(".slick-cloned").find("[id]").each((function () {
                            t(this).attr("id", "")
                        }))
                    }
                }, e.prototype.interrupt = function (t) {
                    var e = this;
                    t || e.autoPlay(), e.interrupted = t
                }, e.prototype.selectHandler = function (e) {
                    var i = this,
                        s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                        n = parseInt(s.attr("data-slick-index"));
                    n || (n = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(n, !1, !0) : i.slideHandler(n)
                }, e.prototype.slideHandler = function (t, e, i) {
                    var s, n, o, r, a, l = null,
                        c = this;
                    if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t))
                        if (!1 === e && c.asNavFor(t), s = t, l = c.getLeft(s), r = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (s = c.currentSlide, !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(r, (function () {
                            c.postSlide(s)
                        })) : c.postSlide(s));
                        else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (s = c.currentSlide, !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(r, (function () {
                            c.postSlide(s)
                        })) : c.postSlide(s));
                        else {
                            if (c.options.autoplay && clearInterval(c.autoPlayTimer), n = s < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + s : s >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : s - c.slideCount : s, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, n]), o = c.currentSlide, c.currentSlide = n, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(o), c.fadeSlide(n, (function () {
                                c.postSlide(n)
                            }))) : c.postSlide(n), void c.animateHeight();
                            !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(l, (function () {
                                c.postSlide(n)
                            })) : c.postSlide(n)
                        }
                }, e.prototype.startLoad = function () {
                    var t = this;
                    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
                }, e.prototype.swipeDirection = function () {
                    var t, e, i, s, n = this;
                    return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(e, t), (s = Math.round(180 * i / Math.PI)) < 0 && (s = 360 - Math.abs(s)), s <= 45 && s >= 0 || s <= 360 && s >= 315 ? !1 === n.options.rtl ? "left" : "right" : s >= 135 && s <= 225 ? !1 === n.options.rtl ? "right" : "left" : !0 === n.options.verticalSwiping ? s >= 35 && s <= 135 ? "down" : "up" : "vertical"
                }, e.prototype.swipeEnd = function (t) {
                    var e, i, s = this;
                    if (s.dragging = !1, s.swiping = !1, s.scrolling) return s.scrolling = !1, !1;
                    if (s.interrupted = !1, s.shouldClick = !(s.touchObject.swipeLength > 10), void 0 === s.touchObject.curX) return !1;
                    if (!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe) {
                        switch (i = s.swipeDirection()) {
                            case "left":
                            case "down":
                                e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount(), s.currentDirection = 0;
                                break;
                            case "right":
                            case "up":
                                e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount(), s.currentDirection = 1
                        }
                        "vertical" != i && (s.slideHandler(e), s.touchObject = {}, s.$slider.trigger("swipe", [s, i]))
                    } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), s.touchObject = {})
                }, e.prototype.swipeHandler = function (t) {
                    var e = this;
                    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                        case "start":
                            e.swipeStart(t);
                            break;
                        case "move":
                            e.swipeMove(t);
                            break;
                        case "end":
                            e.swipeEnd(t)
                    }
                }, e.prototype.swipeMove = function (t) {
                    var e, i, s, n, o, r, a = this;
                    return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || a.scrolling || o && 1 !== o.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && r > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, t.preventDefault()), n = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1), s = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (s = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + s * n : a.swipeLeft = e + s * (a.$list.height() / a.listWidth) * n, !0 === a.options.verticalSwiping && (a.swipeLeft = e + s * n), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
                }, e.prototype.swipeStart = function (t) {
                    var e, i = this;
                    if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
                    void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
                }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
                    var t = this;
                    null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
                }, e.prototype.unload = function () {
                    var e = this;
                    t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
                }, e.prototype.unslick = function (t) {
                    var e = this;
                    e.$slider.trigger("unslick", [e, t]), e.destroy()
                }, e.prototype.updateArrows = function () {
                    var t = this;
                    Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode || t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode) && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
                }, e.prototype.updateDots = function () {
                    var t = this;
                    null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
                }, e.prototype.visibility = function () {
                    var t = this;
                    t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
                }, t.fn.slick = function () {
                    var t, i, s = this,
                        n = arguments[0],
                        o = Array.prototype.slice.call(arguments, 1),
                        r = s.length;
                    for (t = 0; t < r; t++)
                        if ("object" == typeof n || void 0 === n ? s[t].slick = new e(s[t], n) : i = s[t].slick[n].apply(s[t].slick, o), void 0 !== i) return i;
                    return s
                }
            }, void 0 === (o = "function" == typeof s ? s.apply(e, n) : s) || (t.exports = o)
        }()
    }, function (t, e, i) {
        var s, n, o;
        ! function (r, a) {
            "use strict";
            n = [i(7)], s = function (t) {
                var e = "js-acc-hidden";

                function i(e) {
                    this.options = t.extend(!0, {
                        allowClickWhenExpanded: !1,
                        activeClass: "active",
                        opener: ".opener",
                        slider: ".slide",
                        animSpeed: 300,
                        collapsible: !0,
                        event: "click",
                        scrollToActiveItem: {
                            enable: !1,
                            breakpoint: 767,
                            animSpeed: 600,
                            extraOffset: null
                        }
                    }, e), this.init()
                }
                return i.prototype = {
                    init: function () {
                        this.options.holder && (this.findElements(), this.setStateOnInit(), this.attachEvents(), this.makeCallback("onInit"))
                    },
                    findElements: function () {
                        this.$holder = t(this.options.holder).data("SlideAccordion", this), this.$items = this.$holder.find(":has(" + this.options.slider + ")")
                    },
                    setStateOnInit: function () {
                        var i = this;
                        this.$items.each((function () {
                            t(this).hasClass(i.options.activeClass) || t(this).find(i.options.slider).addClass(e)
                        }))
                    },
                    attachEvents: function () {
                        var t = this;
                        this.accordionToggle = function (e) {
                            var i = jQuery(this).closest(t.$items),
                                s = t.getActiveItem(i);
                            t.options.allowClickWhenExpanded && i.hasClass(t.options.activeClass) || (e.preventDefault(), t.toggle(i, s))
                        }, this.$items.on(this.options.event, this.options.opener, this.accordionToggle)
                    },
                    toggle: function (t, e) {
                        t.hasClass(this.options.activeClass) ? this.options.collapsible && this.hide(t) : this.show(t), !t.is(e) && e.length && this.hide(e), this.makeCallback("beforeToggle")
                    },
                    show: function (t) {
                        var i = t.find(this.options.slider);
                        t.addClass(this.options.activeClass), i.stop().hide().removeClass(e).slideDown({
                            duration: this.options.animSpeed,
                            complete: function () {
                                i.removeAttr("style"), this.options.scrollToActiveItem.enable && window.innerWidth <= this.options.scrollToActiveItem.breakpoint && this.goToItem(t), this.makeCallback("onShow", t)
                            }.bind(this)
                        }), this.makeCallback("beforeShow", t)
                    },
                    hide: function (t) {
                        var i = t.find(this.options.slider);
                        t.removeClass(this.options.activeClass), i.stop().show().slideUp({
                            duration: this.options.animSpeed,
                            complete: function () {
                                i.addClass(e), i.removeAttr("style"), this.makeCallback("onHide", t)
                            }.bind(this)
                        }), this.makeCallback("beforeHide", t)
                    },
                    goToItem: function (e) {
                        var i = e.offset().top;
                        i < t(window).scrollTop() && ("number" == typeof this.options.scrollToActiveItem.extraOffset ? i -= this.options.scrollToActiveItem.extraOffset : "function" == typeof this.options.scrollToActiveItem.extraOffset && (i -= this.options.scrollToActiveItem.extraOffset()), t("body, html").animate({
                            scrollTop: i
                        }, this.options.scrollToActiveItem.animSpeed))
                    },
                    getActiveItem: function (t) {
                        return t.siblings().filter("." + this.options.activeClass)
                    },
                    makeCallback: function (t) {
                        if ("function" == typeof this.options[t]) {
                            var e = Array.prototype.slice.call(arguments);
                            e.shift(), this.options[t].apply(this, e)
                        }
                    },
                    destroy: function () {
                        this.$holder.removeData("SlideAccordion"), this.$items.off(this.options.event, this.options.opener, this.accordionToggle), this.$items.removeClass(this.options.activeClass).each(function (i, s) {
                            t(s).find(this.options.slider).removeAttr("style").removeClass(e)
                        }.bind(this)), this.makeCallback("onDestroy")
                    }
                }, t.fn.slideAccordion = function (e) {
                    var s = Array.prototype.slice.call(arguments),
                        n = s[0];
                    return this.each((function () {
                        var o = jQuery(this).data("SlideAccordion");
                        "object" == typeof e || void 0 === e ? new i(t.extend(!0, {
                            holder: this
                        }, e)) : "string" == typeof n && o && "function" == typeof o[n] && (s.shift(), o[n].apply(o, s))
                    }))
                },
                    function () {
                        var i = t('<style type="text/css">')[0],
                            s = "." + e;
                        s += "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important; width: 100% !important;}", i.styleSheet ? i.styleSheet.cssText = s : i.appendChild(document.createTextNode(s)), t("head").append(i)
                    }(), i
            }, void 0 === (o = "function" == typeof s ? s.apply(e, n) : s) || (t.exports = o)
        }(window)
    }, function (t, e) {
        ! function (t) {
            function e(e) {
                this.options = t.extend({
                    container: null,
                    hideOnClickOutside: !1,
                    menuActiveClass: "nav-active",
                    menuOpener: ".nav-opener",
                    menuDrop: ".nav-drop",
                    toggleEvent: "click",
                    outsideClickEvent: "click touchstart pointerdown MSPointerDown"
                }, e), this.initStructure(), this.attachEvents()
            }
            e.prototype = {
                initStructure: function () {
                    this.page = t("html"), this.container = t(this.options.container), this.opener = this.container.find(this.options.menuOpener), this.drop = this.container.find(this.options.menuDrop)
                },
                attachEvents: function () {
                    var e = this;
                    i && (i(), i = null), this.outsideClickHandler = function (i) {
                        if (e.isOpened()) {
                            var s = t(i.target);
                            s.closest(e.opener).length || s.closest(e.drop).length || e.hide()
                        }
                    }, this.openerClickHandler = function (t) {
                        t.preventDefault(), e.toggle()
                    }, this.opener.on(this.options.toggleEvent, this.openerClickHandler)
                },
                isOpened: function () {
                    return this.container.hasClass(this.options.menuActiveClass)
                },
                show: function () {
                    this.container.addClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.on(this.options.outsideClickEvent, this.outsideClickHandler)
                },
                hide: function () {
                    this.container.removeClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.off(this.options.outsideClickEvent, this.outsideClickHandler)
                },
                toggle: function () {
                    this.isOpened() ? this.hide() : this.show()
                },
                destroy: function () {
                    this.container.removeClass(this.options.menuActiveClass), this.opener.off(this.options.toggleEvent, this.clickHandler), this.page.off(this.options.outsideClickEvent, this.outsideClickHandler)
                }
            };
            var i = function () {
                var e, i, s = t(window),
                    n = t("html"),
                    o = "resize-active",
                    r = function () {
                        e = !1, n.removeClass(o)
                    };
                s.on("resize orientationchange", (function () {
                    e || (e = !0, n.addClass(o)), clearTimeout(i), i = setTimeout(r, 500)
                }))
            };
            t.fn.mobileNav = function (i) {
                var s = Array.prototype.slice.call(arguments),
                    n = s[0];
                return this.each((function () {
                    var o = jQuery(this),
                        r = o.data("MobileNav");
                    "object" == typeof i || void 0 === i ? o.data("MobileNav", new e(t.extend({
                        container: this
                    }, i))) : "string" == typeof n && r && "function" == typeof r[n] && (s.shift(), r[n].apply(r, s))
                }))
            }
        }(jQuery)
    }, function (t, e) {
        ! function (t) {
            function e(e) {
                this.options = t.extend({
                    holder: null,
                    popup: ".popup",
                    btnOpen: ".open",
                    btnClose: ".close",
                    openClass: "popup-active",
                    clickEvent: "click",
                    mode: "click",
                    hideOnClickLink: !0,
                    hideOnClickOutside: !0,
                    delay: 50
                }, e), this.options.holder && (this.holder = t(this.options.holder), this.init())
            }
            e.prototype = {
                init: function () {
                    this.findElements(), this.attachEvents()
                },
                findElements: function () {
                    this.popup = this.holder.find(this.options.popup), this.btnOpen = this.holder.find(this.options.btnOpen), this.btnClose = this.holder.find(this.options.btnClose)
                },
                attachEvents: function () {
                    var t = this;
                    if (this.clickMode = i || t.options.mode === t.options.clickEvent, this.clickMode) this.btnOpen.bind(t.options.clickEvent + ".popup", (function (e) {
                        t.holder.hasClass(t.options.openClass) ? t.options.hideOnClickLink && t.hidePopup() : t.showPopup(), e.preventDefault()
                    })), this.outsideClickHandler = this.bind(this.outsideClickHandler, this);
                    else {
                        var e, s = function (i) {
                            clearTimeout(e), e = setTimeout((function () {
                                i.call(t)
                            }), t.options.delay)
                        };
                        this.btnOpen.on("mouseover.popup", (function () {
                            s(t.showPopup)
                        })).on("mouseout.popup", (function () {
                            s(t.hidePopup)
                        })), this.popup.on("mouseover.popup", (function () {
                            s(t.showPopup)
                        })).on("mouseout.popup", (function () {
                            s(t.hidePopup)
                        }))
                    }
                    this.btnClose.on(t.options.clickEvent + ".popup", (function (e) {
                        t.hidePopup(), e.preventDefault()
                    }))
                },
                outsideClickHandler: function (e) {
                    var i = t((e.changedTouches ? e.changedTouches[0] : e).target);
                    i.closest(this.popup).length || i.closest(this.btnOpen).length || this.hidePopup()
                },
                showPopup: function () {
                    this.holder.addClass(this.options.openClass), this.clickMode && this.options.hideOnClickOutside && !this.outsideHandlerActive && (this.outsideHandlerActive = !0, t(document).on("click touchstart", this.outsideClickHandler)), this.makeCallback("onShow", this)
                },
                hidePopup: function () {
                    this.holder.removeClass(this.options.openClass), this.clickMode && this.options.hideOnClickOutside && this.outsideHandlerActive && (this.outsideHandlerActive = !1, t(document).off("click touchstart", this.outsideClickHandler)), this.makeCallback("onHide", this)
                },
                bind: function (t, e, i) {
                    return function () {
                        return t.apply(e, i ? [i] : arguments)
                    }
                },
                destroy: function () {
                    this.popup.removeAttr("style"), this.holder.removeClass(this.options.openClass), this.btnOpen.add(this.btnClose).add(this.popup).off(".popup"), t(document).off("click touchstart", this.outsideClickHandler)
                },
                makeCallback(t) {
                    if ("function" == typeof this.options[t]) {
                        const e = Array.prototype.slice.call(arguments);
                        e.shift(), this.options[t].apply(this, e)
                    }
                }
            };
            var i = /Windows Phone/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
            t.fn.contentPopup = function (i) {
                var s = Array.prototype.slice.call(arguments),
                    n = s[0];
                return this.each((function () {
                    var o = jQuery(this),
                        r = o.data("ContentPopup");
                    "object" == typeof i || void 0 === i ? o.data("ContentPopup", new e(t.extend({
                        holder: this
                    }, i))) : "string" == typeof n && r && "function" == typeof r[n] && (s.shift(), r[n].apply(r, s))
                }))
            }
        }(jQuery)
    }, function (t, e) {
        ! function (t) {
            t.fn.hoverTooltip = function (i) {
                var s, n, o = t.extend({
                    tooltipStructure: '<div class="hover-tooltip"><div class="tooltip-text"></div></div>',
                    tooltipSelector: ".tooltip-text",
                    positionTypeX: "right",
                    positionTypeY: "top",
                    attribute: "title",
                    extraOffsetX: 10,
                    extraOffsetY: 10,
                    showOnTouchDevice: !0
                }, i),
                    r = t("<div>").html(o.tooltipStructure).children().css({
                        position: "absolute"
                    }),
                    a = r.find(o.tooltipSelector);

                function l(t, e, i) {
                    a.html(e), r.appendTo(document.body).show(), s = r.outerWidth(!0), n = r.outerHeight(!0), d(i)
                }

                function c() {
                    r.remove()
                }

                function d(t) {
                    var e, i, a = t.pageX,
                        l = t.pageY;
                    switch (o.positionTypeY) {
                        case "top":
                            e = l - n - o.extraOffsetY;
                            break;
                        case "center":
                            e = l - n / 2;
                            break;
                        case "bottom":
                            e = l + o.extraOffsetY
                    }
                    switch (o.positionTypeX) {
                        case "left":
                            i = a - s - o.extraOffsetX;
                            break;
                        case "center":
                            i = a - s / 2;
                            break;
                        case "right":
                            i = a + o.extraOffsetX
                    }
                    r.css({
                        top: e,
                        left: i
                    })
                }
                return this.each((function () {
                    ! function (t) {
                        var i = t.attr(o.attribute);
                        t.removeAttr(o.attribute), i && (e ? o.showOnTouchDevice && t.bind("touchstart", (function (t) {
                            l(0, i, function (t) {
                                return t.originalEvent.changedTouches ? t.originalEvent.changedTouches[0] : t
                            }(t)), jQuery(document).one("touchend", c)
                        })) : t.bind("mouseenter", (function (t) {
                            l(0, i, t)
                        })).bind("mouseleave", c).bind("mousemove", d))
                    }(t(this))
                }))
            };
            var e = function () {
                try {
                    return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
                } catch (t) {
                    return !1
                }
            }()
        }(jQuery)
    }, function (t, e) {
        ! function (t, e) {
            "use strict";
            var i = {
                attachEvents: function () {
                    var t = this;
                    e.on("load.ScrollLoader resize.ScrollLoader orientationchange.ScrollLoader", (function () {
                        t.onResizeHandler()
                    })), e.on("scroll.ScrollLoader", (function () {
                        t.onScrollHandler()
                    })), this.$holder.on("ContentLoader/loaded.ScrollLoader", (function () {
                        t.onResizeHandler()
                    })), this.winProps = {}, this.holderProps = {}, this.onResizeHandler()
                },
                onResizeHandler: function () {
                    this.winProps.height = e.height(), this.holderProps.height = this.$holder.outerHeight(), this.holderProps.offset = this.$holder.offset().top, this.onScrollHandler()
                },
                onScrollHandler: function () {
                    this.winProps.scroll = e.scrollTop(), this.winProps.scroll + this.winProps.height + Math.min(1, this.options.additionBottomOffset) > this.holderProps.height + this.holderProps.offset && this.loadInclude()
                },
                destroySubEvents: function () {
                    e.off(".ScrollLoader"), this.$holder.off(".ScrollLoader")
                }
            },
                s = {
                    attachEvents: function () {
                        var t = this;
                        this.$holder.on("click.ClickLoader", this.options.linkSelector, (function (e) {
                            t.onClickHandler(e)
                        }))
                    },
                    onClickHandler: function (t) {
                        t.preventDefault(), this.loadInclude()
                    },
                    destroySubEvents: function () {
                        this.$holder.off(".ClickLoader")
                    }
                },
                n = function (t, e) {
                    this.$holder = t, this.options = e, this.init()
                },
                o = {
                    init: function () {
                        this.$link = this.$holder.find(this.options.linkSelector), this.$newContentTarget = this.options.newContentTarget ? this.$holder.find(this.options.newContentTarget) : this.$holder, this.$link.length ? this.attachEvents() : this.removeInstance()
                    },
                    loadInclude: function () {
                        if (!this.isBusy) {
                            var e = this;
                            this.toggleBusyMode(!0), t.get(e.$link.attr("href"), (function (t) {
                                e.successHandler(t)
                            }))
                        }
                    },
                    successHandler: function (t) {
                        var e = jQuery("<div>").html(t),
                            i = e.find(this.options.linkSelector);
                        i.length ? this.refreshLink(i) : this.destroy(), this.appendItems(e.children())
                    },
                    appendItems: function (t) {
                        var e = this;
                        this.$newContentTarget.append(t.addClass(this.options.preAppendClass)), setTimeout((function () {
                            t.removeClass(e.options.preAppendClass), e.toggleBusyMode(!1), e.$holder.trigger("ContentLoader/loaded")
                        }), 100), window.picturefill && window.picturefill()
                    },
                    refreshLink: function (t) {
                        this.$link.attr("href", t.attr("href")), t.remove()
                    },
                    toggleBusyMode: function (t) {
                        this.$holder.toggleClass(this.options.busyClass, t), this.isBusy = t
                    },
                    removeInstance: function () {
                        this.$holder.removeData("ContentLoader")
                    },
                    destroy: function () {
                        this.removeInstance(), this.destroySubEvents(), this.$link.remove()
                    }
                };
            t.fn.loadMore = function (e) {
                var r = Array.prototype.slice.call(arguments),
                    a = r[0],
                    l = t.extend({
                        scroll: !1,
                        linkSelector: ".load-more",
                        newContentTarget: null,
                        busyClass: "is-busy",
                        additionBottomOffset: 50,
                        preAppendClass: "new-item"
                    }, e);
                return this.each((function () {
                    var c = jQuery(this),
                        d = c.data("ContentLoader");
                    "object" == typeof e || void 0 === e ? (n.prototype = t.extend(l.scroll ? i : s, o), c.data("ContentLoader", new n(c, l))) : "string" == typeof a && d && "function" == typeof d[a] && (r.shift(), d[a].apply(d, r))
                }))
            }
        }(jQuery, jQuery(window))
    }, function (t, e) {
        document.addEventListener("DOMContentLoaded", (function () {
            (() => {
                const t = document.getElementById("ctl00_cphMain_cbCreateAccount"),
                    e = document.querySelector("#create-an-account-group");
                (t || e) && t.addEventListener("change", (function () {
                    this.checked ? e.style.display = "flex" : e.style.display = "none"
                }))
            })(), (t => {
                const e = document.querySelectorAll(t);
                e.length && e.forEach(((t, e) => {
                    let i = 0,
                        s = null;
                    t.querySelectorAll(".js-radio").forEach((t => {
                        const e = t.querySelector('input[type="radio"]'),
                            n = t.querySelector(".js-group-content");
                        e.checked && (s = n, n.classList.add("active")), e.addEventListener("click", (function (t) {
                            t.stopPropagation(), s && s.classList.remove("active"), s = n, this !== i && (i = this, n.classList.add("active"))
                        }))
                    }))
                }))
            })(".js-radio-group")
        }))
    }, , , function (t, e, i) {
        "use strict";
        i.r(e);
        i(1);
        const s = document.documentElement;
        document.body;
        var n = Document.prototype.ready = t => {
            t && "function" == typeof t && document.addEventListener("DOMContentLoaded", (() => {
                if ("interactive" === document.readyState || "complete" === document.readyState) return t()
            }))
        };
        i(2), i(3), i(4);
        i(5);
        const o = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e),
            r = function (t) {
                if (!(t && t instanceof Element && t.offsetParent)) return !1;
                const e = t.scrollHeight > t.clientHeight,
                    i = window.getComputedStyle(t).overflowY,
                    s = -1 !== i.indexOf("hidden"),
                    n = -1 !== i.indexOf("visible");
                return e && !s && !n
            },
            a = function (t, e = void 0) {
                return !(!t || t === document.body || e && t === e) && (r(t) ? t : a(t.parentElement, e))
            },
            l = function (t) {
                var e = (new DOMParser).parseFromString(t, "text/html").body;
                if (e.childElementCount > 1) {
                    for (var i = document.createElement("div"); e.firstChild;) i.appendChild(e.firstChild);
                    return i
                }
                return e.firstChild
            },
            c = t => `${t || ""}`.split(" ").filter((t => !!t)),
            d = (t, e, i) => {
                t && c(e).forEach((e => {
                    t.classList.toggle(e, i || !1)
                }))
            };
        class h {
            constructor(t) {
                Object.defineProperty(this, "pageX", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "pageY", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "clientX", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "clientY", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "id", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "time", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "nativePointer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now()
            }
        }
        const u = {
            passive: !1
        };
        class p {
            constructor(t, {
                start: e = (() => !0),
                move: i = (() => { }),
                end: s = (() => { })
            }) {
                Object.defineProperty(this, "element", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "startCallback", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "moveCallback", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "endCallback", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "currentPointers", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "startPointers", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = s;
                for (const t of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[t] = this[t].bind(this);
                this.element.addEventListener("mousedown", this.onPointerStart, u), this.element.addEventListener("touchstart", this.onTouchStart, u), this.element.addEventListener("touchmove", this.onMove, u), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd)
            }
            onPointerStart(t) {
                if (!t.buttons || 0 !== t.button) return;
                const e = new h(t);
                this.currentPointers.some((t => t.id === e.id)) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur))
            }
            onTouchStart(t) {
                for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new h(e), t);
                window.addEventListener("blur", this.onWindowBlur)
            }
            onMove(t) {
                const e = this.currentPointers.slice(),
                    i = "changedTouches" in t ? Array.from(t.changedTouches || []).map((t => new h(t))) : [new h(t)],
                    s = [];
                for (const t of i) {
                    const e = this.currentPointers.findIndex((e => e.id === t.id));
                    e < 0 || (s.push(t), this.currentPointers[e] = t)
                }
                s.length && this.moveCallback(t, this.currentPointers.slice(), e)
            }
            onPointerEnd(t) {
                t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new h(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur))
            }
            onTouchEnd(t) {
                for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new h(e))
            }
            triggerPointerStart(t, e) {
                return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), !0)
            }
            triggerPointerEnd(t, e) {
                const i = this.currentPointers.findIndex((t => t.id === e.id));
                i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()))
            }
            onWindowBlur() {
                this.clear()
            }
            clear() {
                for (; this.currentPointers.length;) {
                    const t = this.currentPointers[this.currentPointers.length - 1];
                    this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
                        bubbles: !0,
                        cancelable: !0,
                        clientX: t.clientX,
                        clientY: t.clientY
                    }), t, this.currentPointers.slice())
                }
            }
            stop() {
                this.element.removeEventListener("mousedown", this.onPointerStart, u), this.element.removeEventListener("touchstart", this.onTouchStart, u), this.element.removeEventListener("touchmove", this.onMove, u), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur)
            }
        }

        function f(t, e) {
            return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0
        }

        function m(t, e) {
            return e ? {
                clientX: (t.clientX + e.clientX) / 2,
                clientY: (t.clientY + e.clientY) / 2
            } : t
        }
        const g = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
            v = (t, ...e) => {
                const i = e.length;
                for (let s = 0; s < i; s++) {
                    const i = e[s] || {};
                    Object.entries(i).forEach((([e, i]) => {
                        const s = Array.isArray(i) ? [] : {};
                        t[e] || Object.assign(t, {
                            [e]: s
                        }), g(i) ? Object.assign(t[e], v(s, i)) : Array.isArray(i) ? Object.assign(t, {
                            [e]: [...i]
                        }) : Object.assign(t, {
                            [e]: i
                        })
                    }))
                }
                return t
            },
            b = function (t, e) {
                return t.split(".").reduce(((t, e) => "object" == typeof t ? t[e] : void 0), e)
            };
        class y {
            constructor(t = {}) {
                Object.defineProperty(this, "options", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t
                }), Object.defineProperty(this, "events", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: new Map
                }), this.setOptions(t);
                for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this))
            }
            setOptions(t) {
                this.options = t ? v({}, this.constructor.defaults, t) : {};
                for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e)
            }
            option(t, ...e) {
                let i = b(t, this.options);
                return i && "function" == typeof i && (i = i.call(this, this, ...e)), i
            }
            optionFor(t, e, i, ...s) {
                let n = b(e, t);
                var o;
                "string" != typeof (o = n) || isNaN(o) || isNaN(parseFloat(o)) || (n = parseFloat(n)), "true" === n && (n = !0), "false" === n && (n = !1), n && "function" == typeof n && (n = n.call(this, this, t, ...s));
                let r = b(e, this.options);
                return r && "function" == typeof r ? n = r.call(this, this, t, ...s, n) : void 0 === n && (n = r), void 0 === n ? i : n
            }
            cn(t) {
                const e = this.options.classes;
                return e && e[t] || ""
            }
            localize(t, e = []) {
                t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, ((t, e, i) => {
                    let s = "";
                    return i ? s = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (s = this.option(`l10n.${e}`)), s || (s = t), s
                }));
                for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
                return t.replace(/\{\{(.*?)\}\}/g, ((t, e) => e))
            }
            on(t, e) {
                let i = [];
                "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), i.forEach((t => {
                    let i = this.events.get(t);
                    i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i)
                }))
            }
            off(t, e) {
                let i = [];
                "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach((t => {
                    const i = this.events.get(t);
                    if (Array.isArray(i)) {
                        const t = i.indexOf(e);
                        t > -1 && i.splice(t, 1)
                    }
                }))
            }
            emit(t, ...e) {
                [...this.events.get(t) || []].forEach((t => t(this, ...e))), "*" !== t && this.emit("*", t, ...e)
            }
        }
        Object.defineProperty(y, "version", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "5.0.36"
        }), Object.defineProperty(y, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {}
        });
        class w extends y {
            constructor(t = {}) {
                super(t), Object.defineProperty(this, "plugins", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                })
            }
            attachPlugins(t = {}) {
                const e = new Map;
                for (const [i, s] of Object.entries(t)) {
                    const t = this.option(i),
                        n = this.plugins[i];
                    n || !1 === t ? n && !1 === t && (n.detach(), delete this.plugins[i]) : e.set(i, new s(this, t || {}))
                }
                for (const [t, i] of e) this.plugins[t] = i, i.attach()
            }
            detachPlugins(t) {
                t = t || Object.keys(this.plugins);
                for (const e of t) {
                    const t = this.plugins[e];
                    t && t.detach(), delete this.plugins[e]
                }
                return this.emit("detachPlugins"), this
            }
        }
        var S;
        ! function (t) {
            t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy"
        }(S || (S = {}));
        const x = ["a", "b", "c", "d", "e", "f"],
            C = {
                PANUP: "Move up",
                PANDOWN: "Move down",
                PANLEFT: "Move left",
                PANRIGHT: "Move right",
                ZOOMIN: "Zoom in",
                ZOOMOUT: "Zoom out",
                TOGGLEZOOM: "Toggle zoom level",
                TOGGLE1TO1: "Toggle zoom level",
                ITERATEZOOM: "Toggle zoom level",
                ROTATECCW: "Rotate counterclockwise",
                ROTATECW: "Rotate clockwise",
                FLIPX: "Flip horizontally",
                FLIPY: "Flip vertically",
                FITX: "Fit horizontally",
                FITY: "Fit vertically",
                RESET: "Reset",
                TOGGLEFS: "Toggle fullscreen"
            },
            k = {
                content: null,
                width: "auto",
                height: "auto",
                panMode: "drag",
                touch: !0,
                dragMinThreshold: 3,
                lockAxis: !1,
                mouseMoveFactor: 1,
                mouseMoveFriction: .12,
                zoom: !0,
                pinchToZoom: !0,
                panOnlyZoomed: "auto",
                minScale: 1,
                maxScale: 2,
                friction: .25,
                dragFriction: .35,
                decelFriction: .05,
                click: "toggleZoom",
                dblClick: !1,
                wheel: "zoom",
                wheelLimit: 7,
                spinner: !0,
                bounds: "auto",
                infinite: !1,
                rubberband: !0,
                bounce: !0,
                maxVelocity: 75,
                transformParent: !1,
                classes: {
                    content: "f-panzoom__content",
                    isLoading: "is-loading",
                    canZoomIn: "can-zoom_in",
                    canZoomOut: "can-zoom_out",
                    isDraggable: "is-draggable",
                    isDragging: "is-dragging",
                    inFullscreen: "in-fullscreen",
                    htmlHasFullscreen: "with-panzoom-in-fullscreen"
                },
                l10n: C
            },
            T = '<circle cx="25" cy="25" r="20"></circle>',
            E = '<div class="f-spinner"><svg viewBox="0 0 50 50">' + T + T + "</svg></div>",
            A = t => t && null !== t && t instanceof Element && "nodeType" in t,
            O = (t, e) => {
                t && c(e).forEach((e => {
                    t.classList.remove(e)
                }))
            },
            P = (t, e) => {
                t && c(e).forEach((e => {
                    t.classList.add(e)
                }))
            },
            $ = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            },
            M = 1e4,
            L = "mousemove",
            D = "drag",
            I = "content",
            j = "auto";
        let H = null,
            _ = null;
        class z extends w {
            get fits() {
                return this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1
            }
            get isTouchDevice() {
                return null === _ && (_ = window.matchMedia("(hover: none)").matches), _
            }
            get isMobile() {
                return null === H && (H = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), H
            }
            get panMode() {
                return this.options.panMode !== L || this.isTouchDevice ? D : L
            }
            get panOnlyZoomed() {
                const t = this.options.panOnlyZoomed;
                return t === j ? this.isTouchDevice : t
            }
            get isInfinite() {
                return this.option("infinite")
            }
            get angle() {
                return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0
            }
            get targetAngle() {
                return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0
            }
            get scale() {
                const {
                    a: t,
                    b: e
                } = this.current;
                return Math.sqrt(t * t + e * e) || 1
            }
            get targetScale() {
                const {
                    a: t,
                    b: e
                } = this.target;
                return Math.sqrt(t * t + e * e) || 1
            }
            get minScale() {
                return this.option("minScale") || 1
            }
            get fullScale() {
                const {
                    contentRect: t
                } = this;
                return t.fullWidth / t.fitWidth || 1
            }
            get maxScale() {
                return this.fullScale * (this.option("maxScale") || 1) || 1
            }
            get coverScale() {
                const {
                    containerRect: t,
                    contentRect: e
                } = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
                return Math.min(this.fullScale, i)
            }
            get isScaling() {
                return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting
            }
            get isContentLoading() {
                const t = this.content;
                return !!(t && t instanceof HTMLImageElement) && !t.complete
            }
            get isResting() {
                if (this.isBouncingX || this.isBouncingY) return !1;
                for (const t of x) {
                    const e = "e" == t || "f" === t ? 1e-4 : 1e-5;
                    if (Math.abs(this.target[t] - this.current[t]) > e) return !1
                }
                return !(!this.ignoreBounds && !this.checkBounds().inBounds)
            }
            constructor(t, e = {}, i = {}) {
                var s;
                if (super(e), Object.defineProperty(this, "pointerTracker", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "resizeObserver", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "updateTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "clickTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "rAF", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "isTicking", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "ignoreBounds", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "isBouncingX", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "isBouncingY", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "clicks", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "trackingPoints", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "pwt", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "cwd", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "pmme", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "friction", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: S.Init
                }), Object.defineProperty(this, "isDragging", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "content", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "spinner", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "containerRect", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0
                    }
                }), Object.defineProperty(this, "contentRect", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        fullWidth: 0,
                        fullHeight: 0,
                        fitWidth: 0,
                        fitHeight: 0,
                        width: 0,
                        height: 0
                    }
                }), Object.defineProperty(this, "dragStart", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        x: 0,
                        y: 0,
                        top: 0,
                        left: 0,
                        time: 0
                    }
                }), Object.defineProperty(this, "dragOffset", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        x: 0,
                        y: 0,
                        time: 0
                    }
                }), Object.defineProperty(this, "current", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: Object.assign({}, $)
                }), Object.defineProperty(this, "target", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: Object.assign({}, $)
                }), Object.defineProperty(this, "velocity", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        a: 0,
                        b: 0,
                        c: 0,
                        d: 0,
                        e: 0,
                        f: 0
                    }
                }), Object.defineProperty(this, "lockedAxis", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), !t) throw new Error("Container Element Not Found");
                this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, z.Plugins), i)), this.emit("attachPlugins"), this.emit("init");
                const n = this.content;
                if (n.addEventListener("load", this.onLoad), n.addEventListener("error", this.onError), this.isContentLoading) {
                    if (this.option("spinner")) {
                        t.classList.add(this.cn("isLoading"));
                        const e = l(E);
                        !t.contains(n) || n.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(e) : this.spinner = (null === (s = n.parentElement) || void 0 === s ? void 0 : s.insertBefore(e, n)) || null
                    }
                    this.emit("beforeLoad")
                } else queueMicrotask((() => {
                    this.enable()
                }))
            }
            initContent() {
                const {
                    container: t
                } = this, e = this.cn(I);
                let i = this.option(I) || t.querySelector(`.${e}`);
                if (i || (i = t.querySelector("img,picture") || t.firstElementChild, i && P(i, e)), i instanceof HTMLPictureElement && (i = i.querySelector("img")), !i) throw new Error("No content found");
                this.content = i
            }
            onLoad() {
                const {
                    spinner: t,
                    container: e,
                    state: i
                } = this;
                t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), i === S.Init ? this.enable() : this.updateMetrics()
            }
            onError() {
                this.state !== S.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = S.Error, this.emit("error"))
            }
            getNextScale(t) {
                const {
                    fullScale: e,
                    targetScale: i,
                    coverScale: s,
                    maxScale: n,
                    minScale: o
                } = this;
                let r = o;
                switch (t) {
                    case "toggleMax":
                        r = i - o < .5 * (n - o) ? n : o;
                        break;
                    case "toggleCover":
                        r = i - o < .5 * (s - o) ? s : o;
                        break;
                    case "toggleZoom":
                        r = i - o < .5 * (e - o) ? e : o;
                        break;
                    case "iterateZoom":
                        let t = [1, e, n].sort(((t, e) => t - e)),
                            a = t.findIndex((t => t > i + 1e-5));
                        r = t[a] || 1
                }
                return r
            }
            attachObserver() {
                var t;
                const e = () => {
                    const {
                        container: t,
                        containerRect: e
                    } = this;
                    return Math.abs(e.width - t.getBoundingClientRect().width) > .1 || Math.abs(e.height - t.getBoundingClientRect().height) > .1
                };
                this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver((() => {
                    this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout((() => {
                        e() && this.onResize(), this.updateTimer = null
                    }), 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null))
                }))), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container)
            }
            detachObserver() {
                var t;
                null === (t = this.resizeObserver) || void 0 === t || t.disconnect()
            }
            attachEvents() {
                const {
                    container: t
                } = this;
                t.addEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), t.addEventListener("wheel", this.onWheel, {
                    passive: !1
                }), this.pointerTracker = new p(t, {
                    start: this.onPointerDown,
                    move: this.onPointerMove,
                    end: this.onPointerUp
                }), document.addEventListener(L, this.onMouseMove)
            }
            detachEvents() {
                var t;
                const {
                    container: e
                } = this;
                e.removeEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), e.removeEventListener("wheel", this.onWheel, {
                    passive: !1
                }), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, document.removeEventListener(L, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null)
            }
            animate() {
                this.setTargetForce();
                const t = this.friction,
                    e = this.option("maxVelocity");
                for (const i of x) t ? (this.velocity[i] *= 1 - t, e && !this.isScaling && (this.velocity[i] = Math.max(Math.min(this.velocity[i], e), -1 * e)), this.current[i] += this.velocity[i]) : this.current[i] = this.target[i];
                this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame((() => this.animate())) : this.stop("current")
            }
            setTargetForce() {
                for (const t of x) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
            }
            checkBounds(t = 0, e = 0) {
                const {
                    current: i
                } = this, s = i.e + t, n = i.f + e, o = this.getBounds(), {
                    x: r,
                    y: a
                } = o, l = r.min, c = r.max, d = a.min, h = a.max;
                let u = 0,
                    p = 0;
                return l !== 1 / 0 && s < l ? u = l - s : c !== 1 / 0 && s > c && (u = c - s), d !== 1 / 0 && n < d ? p = d - n : h !== 1 / 0 && n > h && (p = h - n), Math.abs(u) < 1e-4 && (u = 0), Math.abs(p) < 1e-4 && (p = 0), Object.assign(Object.assign({}, o), {
                    xDiff: u,
                    yDiff: p,
                    inBounds: !u && !p
                })
            }
            clampTargetBounds() {
                const {
                    target: t
                } = this, {
                    x: e,
                    y: i
                } = this.getBounds();
                e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max))
            }
            calculateContentDim(t = this.current) {
                const {
                    content: e,
                    contentRect: i
                } = this, {
                    fitWidth: s,
                    fitHeight: n,
                    fullWidth: o,
                    fullHeight: r
                } = i;
                let a = o,
                    l = r;
                if (this.option("zoom") || 0 !== this.angle) {
                    const i = !(e instanceof HTMLImageElement || "none" !== window.getComputedStyle(e).maxWidth && "none" !== window.getComputedStyle(e).maxHeight),
                        c = i ? o : s,
                        d = i ? r : n,
                        h = this.getMatrix(t),
                        u = new DOMPoint(0, 0).matrixTransform(h),
                        p = new DOMPoint(0 + c, 0).matrixTransform(h),
                        f = new DOMPoint(0 + c, 0 + d).matrixTransform(h),
                        m = new DOMPoint(0, 0 + d).matrixTransform(h),
                        g = Math.abs(f.x - u.x),
                        v = Math.abs(f.y - u.y),
                        b = Math.abs(m.x - p.x),
                        y = Math.abs(m.y - p.y);
                    a = Math.max(g, b), l = Math.max(v, y)
                }
                return {
                    contentWidth: a,
                    contentHeight: l
                }
            }
            setEdgeForce() {
                if (this.ignoreBounds || this.isDragging || this.panMode === L || this.targetScale < this.scale) return this.isBouncingX = !1, void (this.isBouncingY = !1);
                const {
                    target: t
                } = this, {
                    x: e,
                    y: i,
                    xDiff: s,
                    yDiff: n
                } = this.checkBounds(), o = this.option("maxVelocity");
                let r = this.velocity.e,
                    a = this.velocity.f;
                0 !== s ? (this.isBouncingX = !0, s * r <= 0 ? r += .14 * s : (r = .14 * s, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingX = !1, 0 !== n ? (this.isBouncingY = !0, n * a <= 0 ? a += .14 * n : (a = .14 * n, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingY = !1, this.isBouncingX && (this.velocity.e = r), this.isBouncingY && (this.velocity.f = a)
            }
            enable() {
                const {
                    content: t
                } = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
                for (const t of x) this.current[t] = this.target[t] = e[t];
                this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = S.Ready, this.emit("ready")
            }
            onClick(t) {
                var e;
                "click" === t.type && 0 === t.detail && (this.dragOffset.x = 0, this.dragOffset.y = 0), this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), this.trackingPoints = [], this.startDecelAnim());
                const i = t.target;
                if (!i || t.defaultPrevented) return;
                if (i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
                if ((() => {
                    const t = window.getSelection();
                    return t && "Range" === t.type
                })() && !i.closest("button")) return;
                const s = i.closest("[data-panzoom-action]"),
                    n = i.closest("[data-panzoom-change]"),
                    o = s || n,
                    r = o && A(o) ? o.dataset : null;
                if (r) {
                    const e = r.panzoomChange,
                        i = r.panzoomAction;
                    if ((e || i) && t.preventDefault(), e) {
                        let i = {};
                        try {
                            i = JSON.parse(e)
                        } catch (t) {
                            console
                        }
                        return void this.applyChange(i)
                    }
                    if (i) return void (this[i] && this[i]())
                }
                if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
                if (i.closest("[data-fancybox]")) return;
                const a = this.content.getBoundingClientRect(),
                    l = this.dragStart;
                if (l.time && !this.canZoomOut() && (Math.abs(a.x - l.x) > 2 || Math.abs(a.y - l.y) > 2)) return;
                this.dragStart.time = 0;
                const c = e => {
                    this.option("zoom", t) && e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), this[e]({
                        event: t
                    }))
                },
                    d = this.option("click", t),
                    h = this.option("dblClick", t);
                h ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout((() => {
                    1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && d && c(d)) : (this.emit("dblClick", t), t.defaultPrevented || c(h)), this.clicks = 0, this.clickTimer = null
                }), 350))) : (this.emit("click", t), !t.defaultPrevented && d && c(d))
            }
            addTrackingPoint(t) {
                const e = this.trackingPoints.filter((t => t.time > Date.now() - 100));
                e.push(t), this.trackingPoints = e
            }
            onPointerDown(t, e, i) {
                var s;
                if (!1 === this.option("touch", t)) return !1;
                this.pwt = 0, this.dragOffset = {
                    x: 0,
                    y: 0,
                    time: 0
                }, this.trackingPoints = [];
                const n = this.content.getBoundingClientRect();
                if (this.dragStart = {
                    x: n.x,
                    y: n.y,
                    top: n.top,
                    left: n.left,
                    time: Date.now()
                }, this.clickTimer) return !1;
                if (this.panMode === L && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), !1;
                const o = t.composedPath()[0];
                if (!i.length) {
                    if (["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(o.nodeName) || o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return !1;
                    null === (s = window.getSelection()) || void 0 === s || s.removeAllRanges()
                }
                if ("mousedown" === t.type) ["A", "BUTTON"].includes(o.nodeName) || t.preventDefault();
                else if (Math.abs(this.velocity.a) > .3) return !1;
                return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), this.isDragging || (this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t)), !0
            }
            onPointerMove(t, e, i) {
                if (!1 === this.option("touch", t)) return;
                if (!this.isDragging) return;
                if (e.length < 2 && this.panOnlyZoomed && o(this.targetScale) <= o(this.minScale)) return;
                if (this.emit("touchMove", t), t.defaultPrevented) return;
                this.addTrackingPoint(e[0]);
                const {
                    content: s
                } = this, n = m(i[0], i[1]), r = m(e[0], e[1]);
                let l = 0,
                    c = 0;
                if (e.length > 1) {
                    const t = s.getBoundingClientRect();
                    l = n.clientX - t.left - .5 * t.width, c = n.clientY - t.top - .5 * t.height
                }
                const d = f(i[0], i[1]),
                    h = f(e[0], e[1]);
                let u = d ? h / d : 1,
                    p = r.clientX - n.clientX,
                    g = r.clientY - n.clientY;
                this.dragOffset.x += p, this.dragOffset.y += g, this.dragOffset.time = Date.now() - this.dragStart.time;
                let v = o(this.targetScale) === o(this.minScale) && this.option("lockAxis");
                if (v && !this.lockedAxis)
                    if ("xy" === v || "y" === v || "touchmove" === t.type) {
                        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void t.preventDefault();
                        const e = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                        this.lockedAxis = e > 45 && e < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, p = 0, g = 0
                    } else this.lockedAxis = v;
                if (a(t.target, this.content) && (v = "x", this.dragOffset.y = 0), v && "xy" !== v && this.lockedAxis !== v && o(this.targetScale) === o(this.minScale)) return;
                t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"));
                const b = this.checkBounds(p, g);
                this.option("rubberband") ? ("x" !== this.isInfinite && (b.xDiff > 0 && p < 0 || b.xDiff < 0 && p > 0) && (p *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * b.xDiff))), "y" !== this.isInfinite && (b.yDiff > 0 && g < 0 || b.yDiff < 0 && g > 0) && (g *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * b.yDiff)))) : (b.xDiff && (p = 0), b.yDiff && (g = 0));
                const y = this.targetScale,
                    w = this.minScale,
                    S = this.maxScale;
                y < .5 * w && (u = Math.max(u, w)), y > 1.5 * S && (u = Math.min(u, S)), "y" === this.lockedAxis && o(y) === o(w) && (p = 0), "x" === this.lockedAxis && o(y) === o(w) && (g = 0), this.applyChange({
                    originX: l,
                    originY: c,
                    panX: p,
                    panY: g,
                    scale: u,
                    friction: this.option("dragFriction"),
                    ignoreBounds: !0
                })
            }
            onPointerUp(t, e, i) {
                if (i.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
                this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), a(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== S.Destroy && (t.defaultPrevented || this.startDecelAnim()))
            }
            startDecelAnim() {
                var t;
                const e = this.isScaling;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
                for (const t of x) this.velocity[t] = 0;
                this.target.e = this.current.e, this.target.f = this.current.f, O(this.container, "is-scaling"), O(this.container, "is-animating"), this.isTicking = !1;
                const {
                    trackingPoints: i
                } = this, s = i[0], n = i[i.length - 1];
                let r = 0,
                    a = 0,
                    l = 0;
                n && s && (r = n.clientX - s.clientX, a = n.clientY - s.clientY, l = n.time - s.time);
                const c = (null === (t = window.visualViewport) || void 0 === t ? void 0 : t.scale) || 1;
                1 !== c && (r *= c, a *= c);
                let d = 0,
                    h = 0,
                    u = 0,
                    p = 0,
                    f = this.option("decelFriction");
                const m = this.targetScale;
                if (l > 0) {
                    u = Math.abs(r) > 3 ? r / (l / 30) : 0, p = Math.abs(a) > 3 ? a / (l / 30) : 0;
                    const t = this.option("maxVelocity");
                    t && (u = Math.max(Math.min(u, t), -1 * t), p = Math.max(Math.min(p, t), -1 * t))
                }
                u && (d = u / (1 / (1 - f) - 1)), p && (h = p / (1 / (1 - f) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && o(m) === this.minScale) && (d = u = 0), ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && o(m) === this.minScale) && (h = p = 0);
                const g = this.dragOffset.x,
                    v = this.dragOffset.y,
                    b = this.option("dragMinThreshold") || 0;
                Math.abs(g) < b && Math.abs(v) < b && (d = h = 0, u = p = 0), (this.option("zoom") && (m < this.minScale - 1e-5 || m > this.maxScale + 1e-5) || e && !d && !h) && (f = .35), this.applyChange({
                    panX: d,
                    panY: h,
                    friction: f
                }), this.emit("decel", u, p, g, v)
            }
            onWheel(t) {
                var e = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce((function (t, e) {
                    return Math.abs(e) > Math.abs(t) ? e : t
                }));
                const i = Math.max(-1, Math.min(1, e));
                if (this.emit("wheel", t, i), this.panMode === L) return;
                if (t.defaultPrevented) return;
                const s = this.option("wheel");
                "pan" === s ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                    panX: 2 * -t.deltaX,
                    panY: 2 * -t.deltaY,
                    bounce: !1
                })) : "zoom" === s && !1 !== this.option("zoom") && this.zoomWithWheel(t)
            }
            onMouseMove(t) {
                this.panWithMouse(t)
            }
            onKeydown(t) {
                "Escape" === t.key && this.toggleFS()
            }
            onResize() {
                this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
            }
            setTransform() {
                this.emit("beforeTransform");
                const {
                    current: t,
                    target: e,
                    content: i,
                    contentRect: s
                } = this, n = Object.assign({}, $);
                for (const i of x) {
                    const s = "e" == i || "f" === i ? M : 1e5;
                    n[i] = o(t[i], s), Math.abs(e[i] - t[i]) < ("e" == i || "f" === i ? .51 : .001) && (t[i] = e[i])
                }
                let {
                    a: r,
                    b: a,
                    c: l,
                    d: c,
                    e: d,
                    f: h
                } = n, u = `matrix(${r}, ${a}, ${l}, ${c}, ${d}, ${h})`, p = i.parentElement instanceof HTMLPictureElement ? i.parentElement : i;
                if (this.option("transformParent") && (p = p.parentElement || p), p.style.transform === u) return;
                p.style.transform = u;
                const {
                    contentWidth: f,
                    contentHeight: m
                } = this.calculateContentDim();
                s.width = f, s.height = m, this.emit("afterTransform")
            }
            updateMetrics(t = !1) {
                var e;
                if (!this || this.state === S.Destroy) return;
                if (this.isContentLoading) return;
                const i = Math.max(1, (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1),
                    {
                        container: s,
                        content: n
                    } = this,
                    r = n instanceof HTMLImageElement,
                    a = s.getBoundingClientRect(),
                    l = getComputedStyle(this.container);
                let c = a.width * i,
                    d = a.height * i;
                const h = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom),
                    u = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)),
                    p = d - h;
                this.containerRect = {
                    width: c,
                    height: d,
                    innerWidth: u,
                    innerHeight: p
                };
                const f = parseFloat(n.dataset.width || "") || (t => {
                    let e = 0;
                    return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : Math.max(t.offsetWidth, t.scrollWidth), e || 0
                })(n),
                    m = parseFloat(n.dataset.height || "") || (t => {
                        let e = 0;
                        return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : Math.max(t.offsetHeight, t.scrollHeight), e || 0
                    })(n);
                let g = this.option("width", f) || j,
                    v = this.option("height", m) || j;
                const b = g === j,
                    y = v === j;
                "number" != typeof g && (g = f), "number" != typeof v && (v = m), b && (g = f * (v / m)), y && (v = m / (f / g));
                let w = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
                this.option("transformParent") && (w = w.parentElement || w);
                const x = w.getAttribute("style") || "";
                w.style.setProperty("transform", "none", "important"), r && (w.style.width = "", w.style.height = ""), w.offsetHeight;
                const C = n.getBoundingClientRect();
                let k = C.width * i,
                    T = C.height * i,
                    E = k,
                    A = T;
                k = Math.min(k, g), T = Math.min(T, v), r ? ({
                    width: k,
                    height: T
                } = ((t, e, i, s) => {
                    const n = i / t,
                        o = s / e,
                        r = Math.min(n, o);
                    return {
                        width: t *= r,
                        height: e *= r
                    }
                })(g, v, k, T)) : (k = Math.min(k, g), T = Math.min(T, v));
                let O = .5 * (A - T),
                    P = .5 * (E - k);
                this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                    top: C.top - a.top + O,
                    bottom: a.bottom - C.bottom + O,
                    left: C.left - a.left + P,
                    right: a.right - C.right + P,
                    fitWidth: k,
                    fitHeight: T,
                    width: k,
                    height: T,
                    fullWidth: g,
                    fullHeight: v
                }), w.style.cssText = x, r && (w.style.width = `${k}px`, w.style.height = `${T}px`), this.setTransform(), !0 !== t && this.emit("refresh"), this.ignoreBounds || (o(this.targetScale) < o(this.minScale) ? this.zoomTo(this.minScale, {
                    friction: 0
                }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                    friction: 0
                }) : this.state === S.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls()
            }
            calculateBounds() {
                const {
                    contentWidth: t,
                    contentHeight: e
                } = this.calculateContentDim(this.target), {
                    targetScale: i,
                    lockedAxis: s
                } = this, {
                    fitWidth: n,
                    fitHeight: r
                } = this.contentRect;
                let a = 0,
                    l = 0,
                    c = 0,
                    d = 0;
                const h = this.option("infinite");
                if (!0 === h || s && h === s) a = -1 / 0, c = 1 / 0, l = -1 / 0, d = 1 / 0;
                else {
                    let {
                        containerRect: s,
                        contentRect: h
                    } = this, u = o(n * i, M), p = o(r * i, M), {
                        innerWidth: f,
                        innerHeight: m
                    } = s;
                    if (s.width === u && (f = s.width), s.width === p && (m = s.height), t > f) {
                        c = .5 * (t - f), a = -1 * c;
                        let e = .5 * (h.right - h.left);
                        a += e, c += e
                    }
                    if (n > f && t < f && (a -= .5 * (n - f), c -= .5 * (n - f)), e > m) {
                        d = .5 * (e - m), l = -1 * d;
                        let t = .5 * (h.bottom - h.top);
                        l += t, d += t
                    }
                    r > m && e < m && (a -= .5 * (r - m), c -= .5 * (r - m))
                }
                return {
                    x: {
                        min: a,
                        max: c
                    },
                    y: {
                        min: l,
                        max: d
                    }
                }
            }
            getBounds() {
                const t = this.option("bounds");
                return t !== j ? t : this.calculateBounds()
            }
            updateControls() {
                const t = this,
                    e = t.container,
                    {
                        panMode: i,
                        contentRect: s,
                        targetScale: n,
                        minScale: r
                    } = t;
                let a = r,
                    l = t.option("click") || !1;
                l && (a = t.getNextScale(l));
                let c = t.canZoomIn(),
                    h = t.canZoomOut(),
                    u = i === D && !!this.option("touch"),
                    p = h && u;
                if (u && (o(n) < o(r) && !this.panOnlyZoomed && (p = !0), (o(s.width, 1) > o(s.fitWidth, 1) || o(s.height, 1) > o(s.fitHeight, 1)) && (p = !0)), o(s.width * n, 1) < o(s.fitWidth, 1) && (p = !1), i === L && (p = !1), d(e, this.cn("isDraggable"), p), !this.option("zoom")) return;
                let f = c && o(a) > o(n),
                    m = !f && !p && h && o(a) < o(n);
                d(e, this.cn("canZoomIn"), f), d(e, this.cn("canZoomOut"), m);
                for (const t of e.querySelectorAll("[data-panzoom-action]")) {
                    let e = !1,
                        i = !1;
                    switch (t.dataset.panzoomAction) {
                        case "zoomIn":
                            c ? e = !0 : i = !0;
                            break;
                        case "zoomOut":
                            h ? e = !0 : i = !0;
                            break;
                        case "toggleZoom":
                        case "iterateZoom":
                            c || h ? e = !0 : i = !0;
                            const s = t.querySelector("g");
                            s && (s.style.display = c ? "" : "none")
                    }
                    e ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : i && (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"))
                }
            }
            panTo({
                x: t = this.target.e,
                y: e = this.target.f,
                scale: i = this.targetScale,
                friction: s = this.option("friction"),
                angle: n = 0,
                originX: o = 0,
                originY: r = 0,
                flipX: a = !1,
                flipY: l = !1,
                ignoreBounds: c = !1
            }) {
                this.state !== S.Destroy && this.applyChange({
                    panX: t - this.target.e,
                    panY: e - this.target.f,
                    scale: i / this.targetScale,
                    angle: n,
                    originX: o,
                    originY: r,
                    friction: s,
                    flipX: a,
                    flipY: l,
                    ignoreBounds: c
                })
            }
            applyChange({
                panX: t = 0,
                panY: e = 0,
                scale: i = 1,
                angle: s = 0,
                originX: n = -this.current.e,
                originY: r = -this.current.f,
                friction: a = this.option("friction"),
                flipX: l = !1,
                flipY: c = !1,
                ignoreBounds: d = !1,
                bounce: h = this.option("bounce")
            }) {
                const u = this.state;
                if (u === S.Destroy) return;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = a || 0, this.ignoreBounds = d;
                const {
                    current: p
                } = this, f = p.e, m = p.f, g = this.getMatrix(this.target);
                let v = (new DOMMatrix).translate(f, m).translate(n, r).translate(t, e);
                if (this.option("zoom")) {
                    if (!d) {
                        const t = this.targetScale,
                            e = this.minScale,
                            s = this.maxScale;
                        t * i < e && (i = e / t), t * i > s && (i = s / t)
                    }
                    v = v.scale(i)
                }
                v = v.translate(-n, -r).translate(-f, -m).multiply(g), s && (v = v.rotate(s)), l && (v = v.scale(-1, 1)), c && (v = v.scale(1, -1));
                for (const t of x) "e" !== t && "f" !== t && (v[t] > this.minScale + 1e-5 || v[t] < this.minScale - 1e-5) ? this.target[t] = v[t] : this.target[t] = o(v[t], M);
                (this.targetScale < this.scale || Math.abs(i - 1) > .1 || this.panMode === L || !1 === h) && !d && this.clampTargetBounds(), u === S.Init ? this.animate() : this.isResting || (this.state = S.Panning, this.requestTick())
            }
            stop(t = !1) {
                if (this.state === S.Init || this.state === S.Destroy) return;
                const e = this.isTicking;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
                for (const e of x) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
                this.setTransform(), O(this.container, "is-scaling"), O(this.container, "is-animating"), this.isTicking = !1, this.state = S.Ready, e && (this.emit("endAnimation"), this.updateControls())
            }
            requestTick() {
                this.isTicking || (this.emit("startAnimation"), this.updateControls(), P(this.container, "is-animating"), this.isScaling && P(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame((() => this.animate())))
            }
            panWithMouse(t, e = this.option("mouseMoveFriction")) {
                if (this.pmme = t, this.panMode !== L || !t) return;
                if (o(this.targetScale) <= o(this.minScale)) return;
                this.emit("mouseMove", t);
                const {
                    container: i,
                    containerRect: s,
                    contentRect: n
                } = this, r = s.width, a = s.height, l = i.getBoundingClientRect(), c = (t.clientX || 0) - l.left, d = (t.clientY || 0) - l.top;
                let {
                    contentWidth: h,
                    contentHeight: u
                } = this.calculateContentDim(this.target);
                const p = this.option("mouseMoveFactor");
                p > 1 && (h !== r && (h *= p), u !== a && (u *= p));
                let f = .5 * (h - r) - c / r * 100 / 100 * (h - r);
                f += .5 * (n.right - n.left);
                let m = .5 * (u - a) - d / a * 100 / 100 * (u - a);
                m += .5 * (n.bottom - n.top), this.applyChange({
                    panX: f - this.target.e,
                    panY: m - this.target.f,
                    friction: e
                })
            }
            zoomWithWheel(t) {
                if (this.state === S.Destroy || this.state === S.Init) return;
                const e = Date.now();
                if (e - this.pwt < 45) return void t.preventDefault();
                this.pwt = e;
                var i = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce((function (t, e) {
                    return Math.abs(e) > Math.abs(t) ? e : t
                }));
                const s = Math.max(-1, Math.min(1, i)),
                    {
                        targetScale: n,
                        maxScale: r,
                        minScale: a
                    } = this;
                let l = n * (100 + 45 * s) / 100;
                o(l) < o(a) && o(n) <= o(a) ? (this.cwd += Math.abs(s), l = a) : o(l) > o(r) && o(n) >= o(r) ? (this.cwd += Math.abs(s), l = r) : (this.cwd = 0, l = Math.max(Math.min(l, r), a)), this.cwd > this.option("wheelLimit") || (t.preventDefault(), o(l) !== o(n) && this.zoomTo(l, {
                    event: t
                }))
            }
            canZoomIn() {
                return this.option("zoom") && (o(this.contentRect.width, 1) < o(this.contentRect.fitWidth, 1) || o(this.targetScale) < o(this.maxScale))
            }
            canZoomOut() {
                return this.option("zoom") && o(this.targetScale) > o(this.minScale)
            }
            zoomIn(t = 1.25, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomOut(t = .8, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomToFit(t) {
                this.zoomTo("fit", t)
            }
            zoomToCover(t) {
                this.zoomTo("cover", t)
            }
            zoomToFull(t) {
                this.zoomTo("full", t)
            }
            zoomToMax(t) {
                this.zoomTo("max", t)
            }
            toggleZoom(t) {
                this.zoomTo(this.getNextScale("toggleZoom"), t)
            }
            toggleMax(t) {
                this.zoomTo(this.getNextScale("toggleMax"), t)
            }
            toggleCover(t) {
                this.zoomTo(this.getNextScale("toggleCover"), t)
            }
            iterateZoom(t) {
                this.zoomTo("next", t)
            }
            zoomTo(t = 1, {
                friction: e = j,
                originX: i = j,
                originY: s = j,
                event: n
            } = {}) {
                if (this.isContentLoading || this.state === S.Destroy) return;
                const {
                    targetScale: o,
                    fullScale: r,
                    maxScale: a,
                    coverScale: l
                } = this;
                if (this.stop(), this.panMode === L && (n = this.pmme || n), n || i === j || s === j) {
                    const t = this.content.getBoundingClientRect(),
                        e = this.container.getBoundingClientRect(),
                        o = n ? n.clientX : e.left + .5 * e.width,
                        r = n ? n.clientY : e.top + .5 * e.height;
                    i = o - t.left - .5 * t.width, s = r - t.top - .5 * t.height
                }
                let c = 1;
                "number" == typeof t ? c = t : "full" === t ? c = r : "cover" === t ? c = l : "max" === t ? c = a : "fit" === t ? c = 1 : "next" === t && (c = this.getNextScale("iterateZoom")), c = c / o || 1, e = e === j ? c > 1 ? .15 : .25 : e, this.applyChange({
                    scale: c,
                    originX: i,
                    originY: s,
                    friction: e
                }), n && this.panMode === L && this.panWithMouse(n, e)
            }
            rotateCCW() {
                this.applyChange({
                    angle: -90
                })
            }
            rotateCW() {
                this.applyChange({
                    angle: 90
                })
            }
            flipX() {
                this.applyChange({
                    flipX: !0
                })
            }
            flipY() {
                this.applyChange({
                    flipY: !0
                })
            }
            fitX() {
                this.stop("target");
                const {
                    containerRect: t,
                    contentRect: e,
                    target: i
                } = this;
                this.applyChange({
                    panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                    panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
                    scale: t.width / e.fitWidth / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: !0
                })
            }
            fitY() {
                this.stop("target");
                const {
                    containerRect: t,
                    contentRect: e,
                    target: i
                } = this;
                this.applyChange({
                    panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                    panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - i.f,
                    scale: t.height / e.fitHeight / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: !0
                })
            }
            toggleFS() {
                const {
                    container: t
                } = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
                t.classList.toggle(e);
                const s = t.classList.contains(e);
                s ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), this.emit(s ? "enterFS" : "exitFS")
            }
            getMatrix(t = this.current) {
                const {
                    a: e,
                    b: i,
                    c: s,
                    d: n,
                    e: o,
                    f: r
                } = t;
                return new DOMMatrix([e, i, s, n, o, r])
            }
            reset(t) {
                if (this.state !== S.Init && this.state !== S.Destroy) {
                    this.stop("current");
                    for (const t of x) this.target[t] = $[t];
                    this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = S.Panning, this.requestTick())
                }
            }
            destroy() {
                this.stop(), this.state = S.Destroy, this.detachEvents(), this.detachObserver();
                const {
                    container: t,
                    content: e
                } = this, i = this.option("classes") || {};
                for (const e of Object.values(i)) t.classList.remove(e + "");
                e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins()
            }
        }
        Object.defineProperty(z, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: k
        }), Object.defineProperty(z, "Plugins", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {}
        });
        const R = function (t, e) {
            let i = !0;
            return (...s) => {
                i && (i = !1, t(...s), setTimeout((() => {
                    i = !0
                }), e))
            }
        },
            F = (t, e) => {
                let i = [];
                return t.childNodes.forEach((t => {
                    t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t)
                })), i
            };
        var N;
        ! function (t) {
            t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy"
        }(N || (N = {}));
        const B = t => {
            if ("string" == typeof t || t instanceof HTMLElement) t = {
                html: t
            };
            else {
                const e = t.thumb;
                void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb)
            }
            return Object.assign({
                html: "",
                el: null,
                isDom: !1,
                class: "",
                customClass: "",
                index: -1,
                dim: 0,
                gap: 0,
                pos: 0,
                transition: !1
            }, t)
        },
            q = (t = {}) => Object.assign({
                index: -1,
                slides: [],
                dim: 0,
                pos: -1
            }, t);
        class W extends y {
            constructor(t, e) {
                super(e), Object.defineProperty(this, "instance", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t
                })
            }
            attach() { }
            detach() { }
        }
        class Y extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "isDynamic", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "list", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            onRefresh() {
                this.refresh()
            }
            build() {
                let t = this.list;
                if (!t) {
                    t = document.createElement("ul"), P(t, this.cn("list")), t.setAttribute("role", "tablist");
                    const e = this.instance.container;
                    e.appendChild(t), P(e, this.cn("hasDots")), this.list = t
                }
                return t
            }
            refresh() {
                var t;
                const e = this.instance.pages.length,
                    i = Math.min(2, this.option("minCount")),
                    s = Math.max(2e3, this.option("maxCount")),
                    n = this.option("dynamicFrom");
                if (e < i || e > s) return void this.cleanup();
                const o = "number" == typeof n && e > 5 && e >= n,
                    r = !this.list || this.isDynamic !== o || this.list.children.length !== e;
                r && this.cleanup();
                const a = this.build();
                if (d(a, this.cn("isDynamic"), !!o), r)
                    for (let t = 0; t < e; t++) a.append(this.createItem(t));
                let l, c = 0;
                for (const e of [...a.children]) {
                    const i = c === this.instance.page;
                    i && (l = e), d(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
                    for (const t of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) O(e, this.cn(t));
                    c++
                }
                if (l = l || a.firstChild, o && l) {
                    const t = l.previousElementSibling,
                        e = t && t.previousElementSibling;
                    P(t, this.cn("isPrev")), P(e, this.cn("isBeforePrev"));
                    const i = l.nextElementSibling,
                        s = i && i.nextElementSibling;
                    P(i, this.cn("isNext")), P(s, this.cn("isAfterNext"))
                }
                this.isDynamic = o
            }
            createItem(t = 0) {
                var e;
                const i = document.createElement("li");
                i.setAttribute("role", "presentation");
                const s = l(this.instance.localize(this.option("dotTpl"), [
                    ["%d", t + 1]
                ]).replace(/\%i/g, t + ""));
                return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), i
            }
            cleanup() {
                this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, O(this.instance.container, this.cn("hasDots"))
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        }
        Object.defineProperty(Y, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                classes: {
                    list: "f-carousel__dots",
                    isDynamic: "is-dynamic",
                    hasDots: "has-dots",
                    dot: "f-carousel__dot",
                    isBeforePrev: "is-before-prev",
                    isPrev: "is-prev",
                    isCurrent: "is-current",
                    isNext: "is-next",
                    isAfterNext: "is-after-next"
                },
                dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
                dynamicFrom: 11,
                maxCount: 1 / 0,
                minCount: 2
            }
        });
        const X = "disabled",
            U = "next",
            V = "prev";
        class Q extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "prev", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "next", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "isDom", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                })
            }
            onRefresh() {
                const t = this.instance,
                    e = t.pages.length,
                    i = t.page;
                if (e < 2) return void this.cleanup();
                this.build();
                let s = this.prev,
                    n = this.next;
                s && n && (s.removeAttribute(X), n.removeAttribute(X), t.isInfinite || (i <= 0 && s.setAttribute(X, ""), i >= e - 1 && n.setAttribute(X, "")))
            }
            addBtn(t) {
                var e;
                const i = this.instance,
                    s = document.createElement("button");
                s.setAttribute("tabindex", "0"), s.setAttribute("title", i.localize(`{{${t.toUpperCase()}}}`)), P(s, this.cn("button") + " " + this.cn(t === U ? "isNext" : "isPrev"));
                const n = i.isRTL ? t === U ? V : U : t;
                var o;
                return s.innerHTML = i.localize(this.option(`${n}Tpl`)), s.dataset[`carousel${o = t, o ? o.match("^[a-z]") ? o.charAt(0).toUpperCase() + o.substring(1) : o : ""}`] = "true", null === (e = this.container) || void 0 === e || e.appendChild(s), s
            }
            build() {
                const t = this.instance.container,
                    e = this.cn("container");
                let {
                    container: i,
                    prev: s,
                    next: n
                } = this;
                i || (i = t.querySelector("." + e), this.isDom = !!i), i || (i = document.createElement("div"), P(i, e), t.appendChild(i)), this.container = i, n || (n = i.querySelector("[data-carousel-next]")), n || (n = this.addBtn(U)), this.next = n, s || (s = i.querySelector("[data-carousel-prev]")), s || (s = this.addBtn(V)), this.prev = s
            }
            cleanup() {
                this.isDom || (this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove()), this.prev = null, this.next = null, this.container = null, this.isDom = !1
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        }
        Object.defineProperty(Q, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                classes: {
                    container: "f-carousel__nav",
                    button: "f-button",
                    isNext: "is-next",
                    isPrev: "is-prev"
                },
                nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
                prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
            }
        });
        class G extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "selectedIndex", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "target", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "nav", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            addAsTargetFor(t) {
                this.target = this.instance, this.nav = t, this.attachEvents()
            }
            addAsNavFor(t) {
                this.nav = this.instance, this.target = t, this.attachEvents()
            }
            attachEvents() {
                const {
                    nav: t,
                    target: e
                } = this;
                t && e && (t.options.initialSlide = e.options.initialPage, t.state === N.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady), e.state === N.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady))
            }
            onNavReady(t) {
                t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange()
            }
            onTargetReady(t) {
                t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
            }
            onNavClick(t, e, i) {
                this.onNavTouch(t, t.panzoom, i)
            }
            onNavTouch(t, e, i) {
                var s, n;
                if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
                const o = i.target,
                    {
                        nav: r,
                        target: a
                    } = this;
                if (!r || !a || !o) return;
                const l = o.closest("[data-index]");
                if (i.stopPropagation(), i.preventDefault(), !l) return;
                const c = parseInt(l.dataset.index || "", 10) || 0,
                    d = a.getPageForSlide(c),
                    h = r.getPageForSlide(c);
                r.slideTo(h), a.slideTo(d, {
                    friction: (null === (n = null === (s = this.nav) || void 0 === s ? void 0 : s.plugins) || void 0 === n ? void 0 : n.Sync.option("friction")) || 0
                }), this.markSelectedSlide(c)
            }
            onNavCreateSlide(t, e) {
                e.index === this.selectedIndex && this.markSelectedSlide(e.index)
            }
            onTargetChange() {
                var t, e;
                const {
                    target: i,
                    nav: s
                } = this;
                if (!i || !s) return;
                if (s.state !== N.Ready || i.state !== N.Ready) return;
                const n = null === (e = null === (t = i.pages[i.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index,
                    o = s.getPageForSlide(n);
                this.markSelectedSlide(n), s.slideTo(o, null === s.prevPage && null === i.prevPage ? {
                    friction: 0
                } : void 0)
            }
            markSelectedSlide(t) {
                const e = this.nav;
                e && e.state === N.Ready && (this.selectedIndex = t, [...e.slides].map((e => {
                    e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected")
                })))
            }
            attach() {
                const t = this;
                let e = t.options.target,
                    i = t.options.nav;
                e ? t.addAsNavFor(e) : i && t.addAsTargetFor(i)
            }
            detach() {
                const t = this,
                    e = t.nav,
                    i = t.target;
                e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, i && (i.off("ready", t.onTargetReady), i.off("refresh", t.onTargetChange), i.off("change", t.onTargetChange)), t.target = null
            }
        }
        Object.defineProperty(G, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                friction: .35
            }
        });
        const K = {
            Navigation: Q,
            Dots: Y,
            Sync: G
        },
            Z = "animationend",
            J = "isSelected",
            tt = "slide";
        class et extends w {
            get axis() {
                return this.isHorizontal ? "e" : "f"
            }
            get isEnabled() {
                return this.state === N.Ready
            }
            get isInfinite() {
                let t = !1;
                const {
                    contentDim: e,
                    viewportDim: i,
                    pages: s,
                    slides: n
                } = this, o = n[0];
                return s.length >= 2 && o && e + o.dim >= i && (t = this.option("infinite")), t
            }
            get isRTL() {
                return "rtl" === this.option("direction")
            }
            get isHorizontal() {
                return "x" === this.option("axis")
            }
            constructor(t, e = {}, i = {}) {
                if (super(), Object.defineProperty(this, "bp", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: ""
                }), Object.defineProperty(this, "lp", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "userOptions", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }), Object.defineProperty(this, "userPlugins", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: N.Init
                }), Object.defineProperty(this, "page", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "prevPage", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "viewport", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "track", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "slides", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "pages", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "panzoom", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "inTransition", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: new Set
                }), Object.defineProperty(this, "contentDim", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "viewportDim", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), "string" == typeof t && (t = document.querySelector(t)), !t || !A(t)) throw new Error("No Element found");
                this.container = t, this.slideNext = R(this.slideNext.bind(this), 150), this.slidePrev = R(this.slidePrev.bind(this), 150), this.userOptions = e, this.userPlugins = i, queueMicrotask((() => {
                    this.processOptions()
                }))
            }
            processOptions() {
                var t, e;
                const i = v({}, et.defaults, this.userOptions);
                let s = "";
                const n = i.breakpoints;
                if (n && g(n))
                    for (const [t, e] of Object.entries(n)) window.matchMedia(t).matches && g(e) && (s += t, v(i, e));
                s === this.bp && this.state !== N.Init || (this.bp = s, this.state === N.Ready && (i.initialSlide = (null === (e = null === (t = this.pages[this.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index) || 0), this.state !== N.Init && this.destroy(), super.setOptions(i), !1 === this.option("enabled") ? this.attachEvents() : setTimeout((() => {
                    this.init()
                }), 0))
            }
            init() {
                this.state = N.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, et.Plugins), this.userPlugins)), this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = N.Ready, this.emit("ready")
            }
            initLayout() {
                const {
                    container: t
                } = this, e = this.option("classes");
                P(t, this.cn("container")), d(t, e.isLTR, !this.isRTL), d(t, e.isRTL, this.isRTL), d(t, e.isVertical, !this.isHorizontal), d(t, e.isHorizontal, this.isHorizontal);
                let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
                i || (i = document.createElement("div"), P(i, e.viewport), i.append(...F(t, `.${e.slide}`)), t.prepend(i)), i.addEventListener("scroll", this.onScroll);
                let s = this.option("track") || t.querySelector(`.${e.track}`);
                s || (s = document.createElement("div"), P(s, e.track), s.append(...Array.from(i.childNodes))), s.setAttribute("aria-live", "polite"), i.contains(s) || i.prepend(s), this.viewport = i, this.track = s, this.emit("initLayout")
            }
            initSlides() {
                const {
                    track: t
                } = this;
                if (!t) return;
                const e = [...this.slides],
                    i = [];
                [...F(t, `.${this.cn(tt)}`)].forEach((t => {
                    if (A(t)) {
                        const e = B({
                            el: t,
                            isDom: !0,
                            index: this.slides.length
                        });
                        i.push(e)
                    }
                }));
                for (let t of [...this.option("slides", []) || [], ...e]) i.push(B(t));
                this.slides = i;
                for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
                for (const t of i) this.emit("beforeInitSlide", t, t.index), this.emit("initSlide", t, t.index);
                this.emit("initSlides")
            }
            setInitialPage() {
                const t = this.option("initialSlide");
                this.page = "number" == typeof t ? this.getPageForSlide(t) : parseInt(this.option("initialPage", 0) + "", 10) || 0
            }
            setInitialPosition() {
                const {
                    track: t,
                    pages: e,
                    isHorizontal: i
                } = this;
                if (!t || !e.length) return;
                let s = this.page;
                e[s] || (this.page = s = 0);
                const n = (e[s].pos || 0) * (this.isRTL && i ? 1 : -1),
                    o = i ? `${n}px` : "0",
                    r = i ? "0" : `${n}px`;
                t.style.transform = `translate3d(${o}, ${r}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight()
            }
            initPanzoom() {
                this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
                const t = this.option("Panzoom") || {};
                this.panzoom = new z(this.viewport, v({}, {
                    content: this.track,
                    zoom: !1,
                    panOnlyZoomed: !1,
                    lockAxis: this.isHorizontal ? "x" : "y",
                    infinite: this.isInfinite,
                    click: !1,
                    dblClick: !1,
                    touch: t => !(this.pages.length < 2 && !t.options.infinite),
                    bounds: () => this.getBounds(),
                    maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
                }, t)), this.panzoom.on("*", ((t, e, ...i) => {
                    this.emit(`Panzoom.${e}`, t, ...i)
                })), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation)
            }
            attachEvents() {
                const t = this.container;
                t && (t.addEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize)
            }
            createPages() {
                let t = [];
                const {
                    contentDim: e,
                    viewportDim: i
                } = this;
                let s = this.option("slidesPerPage");
                s = ("auto" === s || e <= i) && !1 !== this.option("fill") ? 1 / 0 : parseFloat(s + "");
                let n = 0,
                    o = 0,
                    r = 0;
                for (const e of this.slides) (!t.length || o + e.dim - i > .05 || r >= s) && (t.push(q()), n = t.length - 1, o = 0, r = 0), t[n].slides.push(e), o += e.dim + e.gap, r++;
                return t
            }
            processPages() {
                const t = this.pages,
                    {
                        contentDim: e,
                        viewportDim: i,
                        isInfinite: s
                    } = this,
                    n = this.option("center"),
                    r = this.option("fill"),
                    a = r && n && e > i && !s;
                if (t.forEach(((t, s) => {
                    var o;
                    t.index = s, t.pos = (null === (o = t.slides[0]) || void 0 === o ? void 0 : o.pos) || 0, t.dim = 0;
                    for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
                    a && t.pos + .5 * t.dim < .5 * i ? t.pos = 0 : a && t.pos + .5 * t.dim >= e - .5 * i ? t.pos = e - i : n && (t.pos += -.5 * (i - t.dim))
                })), t.forEach((t => {
                    r && !s && e > i && (t.pos = Math.max(t.pos, 0), t.pos = Math.min(t.pos, e - i)), t.pos = o(t.pos, 1e3), t.dim = o(t.dim, 1e3), Math.abs(t.pos) <= .1 && (t.pos = 0)
                })), s) return t;
                const l = [];
                let c;
                return t.forEach((t => {
                    const e = Object.assign({}, t);
                    c && e.pos === c.pos ? (c.dim += e.dim, c.slides = [...c.slides, ...e.slides]) : (e.index = l.length, c = e, l.push(e))
                })), l
            }
            getPageFromIndex(t = 0) {
                const e = this.pages.length;
                let i;
                return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), i
            }
            getSlideMetrics(t) {
                var e, i;
                const s = this.isHorizontal ? "width" : "height";
                let n = 0,
                    r = 0,
                    a = t.el;
                const l = !(!a || a.parentNode);
                if (a ? n = parseFloat(a.dataset[s] || "") || 0 : (a = document.createElement("div"), a.style.visibility = "hidden", (this.track || document.body).prepend(a)), P(a, this.cn(tt) + " " + t.class + " " + t.customClass), n) a.style[s] = `${n}px`, a.style["width" === s ? "height" : "width"] = "";
                else {
                    l && (this.track || document.body).prepend(a), n = a.getBoundingClientRect()[s] * Math.max(1, (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1);
                    let t = a[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
                    t - 1 > n && (n = t)
                }
                const c = getComputedStyle(a);
                return "content-box" === c.boxSizing && (this.isHorizontal ? (n += parseFloat(c.paddingLeft) || 0, n += parseFloat(c.paddingRight) || 0) : (n += parseFloat(c.paddingTop) || 0, n += parseFloat(c.paddingBottom) || 0)), r = parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, l ? null === (i = a.parentElement) || void 0 === i || i.removeChild(a) : t.el || a.remove(), {
                    dim: o(n, 1e3),
                    gap: o(r, 1e3)
                }
            }
            getBounds() {
                const {
                    isInfinite: t,
                    isRTL: e,
                    isHorizontal: i,
                    pages: s
                } = this;
                let n = {
                    min: 0,
                    max: 0
                };
                if (t) n = {
                    min: -1 / 0,
                    max: 1 / 0
                };
                else if (s.length) {
                    const t = s[0].pos,
                        o = s[s.length - 1].pos;
                    n = e && i ? {
                        min: t,
                        max: o
                    } : {
                        min: -1 * o,
                        max: -1 * t
                    }
                }
                return {
                    x: i ? n : {
                        min: 0,
                        max: 0
                    },
                    y: i ? {
                        min: 0,
                        max: 0
                    } : n
                }
            }
            repositionSlides() {
                let t, {
                    isHorizontal: e,
                    isRTL: i,
                    isInfinite: s,
                    viewport: n,
                    viewportDim: r,
                    contentDim: a,
                    page: l,
                    pages: c,
                    slides: d,
                    panzoom: h
                } = this,
                    u = 0,
                    p = 0,
                    f = 0,
                    m = 0;
                h ? m = -1 * h.current[this.axis] : c[l] && (m = c[l].pos || 0), t = e ? i ? "right" : "left" : "top", i && e && (m *= -1);
                for (const e of d) {
                    const i = e.el;
                    i ? ("top" === t ? (i.style.right = "", i.style.left = "") : i.style.top = "", e.index !== u ? i.style[t] = 0 === p ? "" : `${o(p, 1e3)}px` : i.style[t] = "", f += e.dim + e.gap, u++) : p += e.dim + e.gap
                }
                if (s && f && n) {
                    let i = getComputedStyle(n),
                        s = "padding",
                        l = e ? "Right" : "Bottom",
                        c = parseFloat(i[s + (e ? "Left" : "Top")]);
                    m -= c, r += c, r += parseFloat(i[s + l]);
                    for (const e of d) e.el && (o(e.pos) < o(r) && o(e.pos + e.dim + e.gap) < o(m) && o(m) > o(a - r) && (e.el.style[t] = `${o(p + f, 1e3)}px`), o(e.pos + e.gap) >= o(a - r) && o(e.pos) > o(m + r) && o(m) < o(r) && (e.el.style[t] = `-${o(f, 1e3)}px`))
                }
                let g, v, b = [...this.inTransition];
                if (b.length > 1 && (g = c[b[0]], v = c[b[1]]), g && v) {
                    let e = 0;
                    for (const i of d) i.el ? this.inTransition.has(i.index) && g.slides.indexOf(i) < 0 && (i.el.style[t] = `${o(e + (g.pos - v.pos), 1e3)}px`) : e += i.dim + i.gap
                }
            }
            createSlideEl(t) {
                const {
                    track: e,
                    slides: i
                } = this;
                if (!e || !t) return;
                if (t.el && t.el.parentNode) return;
                const s = t.el || document.createElement("div");
                P(s, this.cn(tt)), P(s, t.class), P(s, t.customClass);
                const n = t.html;
                n && (n instanceof HTMLElement ? s.appendChild(n) : s.innerHTML = t.html + "");
                const o = [];
                i.forEach(((t, e) => {
                    t.el && o.push(e)
                }));
                const r = t.index;
                let a = null;
                o.length && (a = i[o.reduce(((t, e) => Math.abs(e - r) < Math.abs(t - r) ? e : t))]);
                const l = a && a.el && a.el.parentNode ? a.index < t.index ? a.el.nextSibling : a.el : null;
                e.insertBefore(s, e.contains(l) ? l : null), t.el = s, this.emit("createSlide", t)
            }
            removeSlideEl(t, e = !1) {
                const i = null == t ? void 0 : t.el;
                if (!i || !i.parentNode) return;
                const s = this.cn(J);
                if (i.classList.contains(s) && (O(i, s), this.emit("unselectSlide", t)), t.isDom && !e) return i.removeAttribute("aria-hidden"), i.removeAttribute("data-index"), void (i.style.left = "");
                this.emit("removeSlide", t);
                const n = new CustomEvent(Z);
                i.dispatchEvent(n), t.el && (t.el.remove(), t.el = null)
            }
            transitionTo(t = 0, e = this.option("transition")) {
                var i, s, n, o;
                if (!e) return !1;
                const r = this.page,
                    {
                        pages: a,
                        panzoom: l
                    } = this;
                t = parseInt((t || 0).toString()) || 0;
                const c = this.getPageFromIndex(t);
                if (!l || !a[c] || a.length < 2 || Math.abs(((null === (s = null === (i = a[r]) || void 0 === i ? void 0 : i.slides[0]) || void 0 === s ? void 0 : s.dim) || 0) - this.viewportDim) > 1) return !1;
                let d = t > r ? 1 : -1;
                this.isInfinite && (0 === r && t === a.length - 1 && (d = -1), r === a.length - 1 && 0 === t && (d = 1));
                const h = a[c].pos * (this.isRTL ? 1 : -1);
                if (r === c && Math.abs(h - l.target[this.axis]) < 1) return !1;
                this.clearTransitions();
                const u = l.isResting;
                P(this.container, this.cn("inTransition"));
                const p = (null === (n = a[r]) || void 0 === n ? void 0 : n.slides[0]) || null,
                    f = (null === (o = a[c]) || void 0 === o ? void 0 : o.slides[0]) || null;
                this.inTransition.add(f.index), this.createSlideEl(f);
                let m = p.el,
                    g = f.el;
                u || e === tt || (e = "fadeFast", m = null);
                const v = this.isRTL ? "next" : "prev",
                    b = this.isRTL ? "prev" : "next";
                return m && (this.inTransition.add(p.index), p.transition = e, m.addEventListener(Z, this.onAnimationEnd), m.classList.add(`f-${e}Out`, `to-${d > 0 ? b : v}`)), g && (f.transition = e, g.addEventListener(Z, this.onAnimationEnd), g.classList.add(`f-${e}In`, `from-${d > 0 ? v : b}`)), l.current[this.axis] = h, l.target[this.axis] = h, l.requestTick(), this.onChange(c), !0
            }
            manageSlideVisiblity() {
                const t = new Set,
                    e = new Set,
                    i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
                for (const s of this.slides) i.has(s) ? t.add(s) : e.add(s);
                for (const e of this.inTransition) t.add(this.slides[e]);
                for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
                for (const i of e) t.has(i) || this.removeSlideEl(i);
                this.markSelectedSlides(), this.repositionSlides()
            }
            markSelectedSlides() {
                if (!this.pages[this.page] || !this.pages[this.page].slides) return;
                const t = "aria-hidden";
                let e = this.cn(J);
                if (e)
                    for (const i of this.slides) {
                        const s = i.el;
                        s && (s.dataset.index = `${i.index}`, s.classList.contains("f-thumbs__slide") ? this.getVisibleSlides(0).has(i) ? s.removeAttribute(t) : s.setAttribute(t, "true") : this.pages[this.page].slides.includes(i) ? (s.classList.contains(e) || (P(s, e), this.emit("selectSlide", i)), s.removeAttribute(t)) : (s.classList.contains(e) && (O(s, e), this.emit("unselectSlide", i)), s.setAttribute(t, "true")))
                    }
            }
            flipInfiniteTrack() {
                const {
                    axis: t,
                    isHorizontal: e,
                    isInfinite: i,
                    isRTL: s,
                    viewportDim: n,
                    contentDim: o
                } = this, r = this.panzoom;
                if (!r || !i) return;
                let a = r.current[t],
                    l = r.target[t] - a,
                    c = 0,
                    d = .5 * n;
                s && e ? (a < -d && (c = -1, a += o), a > o - d && (c = 1, a -= o)) : (a > d && (c = 1, a -= o), a < -o + d && (c = -1, a += o)), c && (r.current[t] = a, r.target[t] = a + l)
            }
            lazyLoadImg(t, e) {
                const i = this,
                    s = "f-fadeIn",
                    n = "is-preloading";
                let o = !1,
                    r = null;
                const a = () => {
                    o || (o = !0, r && (r.remove(), r = null), O(e, n), e.complete && (P(e, s), setTimeout((() => {
                        O(e, s)
                    }), 350)), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (i.updateMetrics(), i.setViewportHeight()), this.emit("load", t))
                };
                P(e, n), e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.addEventListener("error", (() => {
                    a()
                })), e.addEventListener("load", (() => {
                    a()
                })), setTimeout((() => {
                    const i = e.parentNode;
                    i && t.el && (e.complete ? a() : o || (r = l(E), i.insertBefore(r, e)))
                }), 300)
            }
            lazyLoadSlide(t) {
                const e = t && t.el;
                if (!e) return;
                const i = new Set;
                let s = Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"));
                e.dataset.lazySrc && s.push(e), s.map((t => {
                    t instanceof HTMLImageElement ? i.add(t) : t instanceof HTMLElement && t.dataset.lazySrc && (t.style.backgroundImage = `url('${t.dataset.lazySrc}')`, delete t.dataset.lazySrc)
                }));
                for (const e of i) this.lazyLoadImg(t, e)
            }
            onAnimationEnd(t) {
                var e;
                const i = t.target,
                    s = i ? parseInt(i.dataset.index || "", 10) || 0 : -1,
                    n = this.slides[s],
                    o = t.animationName;
                if (!i || !n || !o) return;
                const r = !!this.inTransition.has(s) && n.transition;
                r && o.substring(0, r.length + 2) === `f-${r}` && this.inTransition.delete(s), this.inTransition.size || this.clearTransitions(), s === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle")
            }
            onDecel(t, e = 0, i = 0, s = 0, n = 0) {
                if (this.option("dragFree")) return void this.setPageFromPosition();
                const {
                    isRTL: o,
                    isHorizontal: r,
                    axis: a,
                    pages: l
                } = this, c = l.length, d = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
                let h = 0;
                if (h = d > 45 && d < 135 ? r ? 0 : i : r ? e : 0, !c) return;
                let u = this.page,
                    p = o && r ? 1 : -1;
                const f = t.current[a] * p;
                let {
                    pageIndex: m
                } = this.getPageFromPosition(f);
                Math.abs(h) > 5 ? (l[u].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (u = m), u = o && r ? h < 0 ? u - 1 : u + 1 : h < 0 ? u + 1 : u - 1) : u = 0 === s && 0 === n ? u : m, this.slideTo(u, {
                    transition: !1,
                    friction: t.option("decelFriction")
                })
            }
            onClick(t) {
                const e = t.target,
                    i = e && A(e) ? e.dataset : null;
                let s, n;
                i && (void 0 !== i.carouselPage ? (n = "slideTo", s = i.carouselPage) : void 0 !== i.carouselNext ? n = "slideNext" : void 0 !== i.carouselPrev && (n = "slidePrev")), n ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[n](s)) : this.emit("click", t)
            }
            onSlideTo(t) {
                const e = t.detail || 0;
                this.slideTo(this.getPageForSlide(e), {
                    friction: 0
                })
            }
            onChange(t, e = 0) {
                const i = this.page;
                this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e))
            }
            onRefresh() {
                let t = this.contentDim,
                    e = this.viewportDim;
                this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
                    friction: 0,
                    transition: !1
                })
            }
            onScroll() {
                var t;
                null === (t = this.viewport) || void 0 === t || t.scroll(0, 0)
            }
            onResize() {
                this.option("breakpoints") && this.processOptions()
            }
            onBeforeTransform(t) {
                this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), this.lp = t.current.e
            }
            onEndAnimation() {
                this.inTransition.size || this.emit("settle")
            }
            reInit(t = null, e = null) {
                this.destroy(), this.state = N.Init, this.prevPage = null, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions()
            }
            slideTo(t = 0, {
                friction: e = this.option("friction"),
                transition: i = this.option("transition")
            } = {}) {
                if (this.state === N.Destroy) return;
                t = parseInt((t || 0).toString()) || 0;
                const s = this.getPageFromIndex(t),
                    {
                        axis: n,
                        isHorizontal: o,
                        isRTL: r,
                        pages: a,
                        panzoom: l
                    } = this,
                    c = a.length,
                    d = r && o ? 1 : -1;
                if (!l || !c) return;
                if (this.page !== s) {
                    const e = new Event("beforeChange", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    if (this.emit("beforeChange", e, t), e.defaultPrevented) return
                }
                if (this.transitionTo(t, i)) return;
                let h = a[s].pos;
                if (this.isInfinite) {
                    const e = this.contentDim,
                        i = l.target[n] * d;
                    2 === c ? h += e * Math.floor(parseFloat(t + "") / 2) : h = [h, h - e, h + e].reduce((function (t, e) {
                        return Math.abs(e - i) < Math.abs(t - i) ? e : t
                    }))
                }
                h *= d, Math.abs(l.target[n] - h) < 1 || (l.panTo({
                    x: o ? h : 0,
                    y: o ? 0 : h,
                    friction: e
                }), this.onChange(s))
            }
            slideToClosest(t) {
                if (this.panzoom) {
                    const {
                        pageIndex: e
                    } = this.getPageFromPosition();
                    this.slideTo(e, t)
                }
            }
            slideNext() {
                this.slideTo(this.page + 1)
            }
            slidePrev() {
                this.slideTo(this.page - 1)
            }
            clearTransitions() {
                this.inTransition.clear(), O(this.container, this.cn("inTransition"));
                const t = ["to-prev", "to-next", "from-prev", "from-next"];
                for (const e of this.slides) {
                    const i = e.el;
                    if (i) {
                        i.removeEventListener(Z, this.onAnimationEnd), i.classList.remove(...t);
                        const s = e.transition;
                        s && i.classList.remove(`f-${s}Out`, `f-${s}In`)
                    }
                }
                this.manageSlideVisiblity()
            }
            addSlide(t, e) {
                var i, s, n, o;
                const r = this.panzoom,
                    a = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0,
                    l = (null === (s = this.pages[this.page]) || void 0 === s ? void 0 : s.dim) || 0,
                    c = this.contentDim < this.viewportDim;
                let d = Array.isArray(e) ? e : [e];
                const h = [];
                for (const t of d) h.push(B(t));
                this.slides.splice(t, 0, ...h);
                for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
                for (const t of h) this.emit("beforeInitSlide", t, t.index);
                if (this.page >= t && (this.page += h.length), this.updateMetrics(), r) {
                    const e = (null === (n = this.pages[this.page]) || void 0 === n ? void 0 : n.pos) || 0,
                        i = (null === (o = this.pages[this.page]) || void 0 === o ? void 0 : o.dim) || 0,
                        s = this.pages.length || 1,
                        d = this.isRTL ? l - i : i - l,
                        h = this.isRTL ? a - e : e - a;
                    c && 1 === s ? (t <= this.page && (r.current[this.axis] -= d, r.target[this.axis] -= d), r.panTo({
                        [this.isHorizontal ? "x" : "y"]: -1 * e
                    })) : h && t <= this.page && (r.target[this.axis] -= h, r.current[this.axis] -= h, r.requestTick())
                }
                for (const t of h) this.emit("initSlide", t, t.index)
            }
            prependSlide(t) {
                this.addSlide(0, t)
            }
            appendSlide(t) {
                this.addSlide(this.slides.length, t)
            }
            removeSlide(t) {
                const e = this.slides.length;
                t = (t % e + e) % e;
                const i = this.slides[t];
                if (i) {
                    this.removeSlideEl(i, !0), this.slides.splice(t, 1);
                    for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
                    this.updateMetrics(), this.slideTo(this.page, {
                        friction: 0,
                        transition: !1
                    }), this.emit("destroySlide", i)
                }
            }
            updateMetrics() {
                const {
                    panzoom: t,
                    viewport: e,
                    track: i,
                    slides: s,
                    isHorizontal: n,
                    isInfinite: r
                } = this;
                if (!i) return;
                const a = n ? "width" : "height",
                    l = n ? "offsetWidth" : "offsetHeight";
                if (e) {
                    let t = Math.max(e[l], o(e.getBoundingClientRect()[a], 1e3)),
                        i = getComputedStyle(e),
                        s = "padding",
                        r = n ? "Right" : "Bottom";
                    t -= parseFloat(i[s + (n ? "Left" : "Top")]) + parseFloat(i[s + r]), this.viewportDim = t
                }
                let c, d = 0;
                for (const [t, e] of s.entries()) {
                    let i = 0,
                        n = 0;
                    !e.el && c ? (i = c.dim, n = c.gap) : (({
                        dim: i,
                        gap: n
                    } = this.getSlideMetrics(e)), c = e), i = o(i, 1e3), n = o(n, 1e3), e.dim = i, e.gap = n, e.pos = d, d += i, (r || t < s.length - 1) && (d += n)
                }
                d = o(d, 1e3), this.contentDim = d, t && (t.contentRect[a] = d, t.contentRect[n ? "fullWidth" : "fullHeight"] = d), this.pages = this.createPages(), this.pages = this.processPages(), this.state === N.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), this.emit("refresh")
            }
            getProgress(t, e = !1, i = !1) {
                void 0 === t && (t = this.page);
                const s = this,
                    n = s.panzoom,
                    r = s.contentDim,
                    a = s.pages[t] || 0;
                if (!a || !n) return t > this.page ? -1 : 1;
                let l = -1 * n.current.e,
                    c = o((l - a.pos) / (1 * a.dim), 1e3),
                    d = c,
                    h = c;
                this.isInfinite && !0 !== i && (d = o((l - a.pos + r) / (1 * a.dim), 1e3), h = o((l - a.pos - r) / (1 * a.dim), 1e3));
                let u = [c, d, h].reduce((function (t, e) {
                    return Math.abs(e) < Math.abs(t) ? e : t
                }));
                return e ? u : u > 1 ? 1 : u < -1 ? -1 : u
            }
            setViewportHeight() {
                const {
                    page: t,
                    pages: e,
                    viewport: i,
                    isHorizontal: s
                } = this;
                if (!i || !e[t]) return;
                let n = 0;
                s && this.track && (this.track.style.height = "auto", e[t].slides.forEach((t => {
                    t.el && (n = Math.max(n, t.el.offsetHeight))
                }))), i.style.height = n ? `${n}px` : ""
            }
            getPageForSlide(t) {
                for (const e of this.pages)
                    for (const i of e.slides)
                        if (i.index === t) return e.index;
                return -1
            }
            getVisibleSlides(t = 0) {
                var e;
                const i = new Set;
                let {
                    panzoom: s,
                    contentDim: n,
                    viewportDim: o,
                    pages: r,
                    page: a
                } = this;
                if (o) {
                    n = n + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
                    let l = 0;
                    l = s && s.state !== S.Init && s.state !== S.Destroy ? -1 * s.current[this.axis] : r[a] && r[a].pos || 0, this.isInfinite && (l -= Math.floor(l / n) * n), this.isRTL && this.isHorizontal && (l *= -1);
                    const c = l - o * t,
                        d = l + o * (t + 1),
                        h = this.isInfinite ? [-1, 0, 1] : [0];
                    for (const t of this.slides)
                        for (const e of h) {
                            const s = t.pos + e * n,
                                o = s + t.dim + t.gap;
                            s < d && o > c && i.add(t)
                        }
                }
                return i
            }
            getPageFromPosition(t) {
                const {
                    viewportDim: e,
                    contentDim: i,
                    slides: s,
                    pages: n,
                    panzoom: o
                } = this, r = n.length, a = s.length, l = s[0], c = s[a - 1], d = this.option("center");
                let h = 0,
                    u = 0,
                    p = 0,
                    f = void 0 === t ? -1 * ((null == o ? void 0 : o.target[this.axis]) || 0) : t;
                d && (f += .5 * e), this.isInfinite ? (f < l.pos - .5 * c.gap && (f -= i, p = -1), f > c.pos + c.dim + .5 * c.gap && (f -= i, p = 1)) : f = Math.max(l.pos || 0, Math.min(f, c.pos));
                let m = c,
                    g = s.find((t => {
                        const e = t.pos - .5 * m.gap,
                            i = t.pos + t.dim + .5 * t.gap;
                        return m = t, f >= e && f < i
                    }));
                return g || (g = c), u = this.getPageForSlide(g.index), h = u + p * r, {
                    page: h,
                    pageIndex: u
                }
            }
            setPageFromPosition() {
                const {
                    pageIndex: t
                } = this.getPageFromPosition();
                this.onChange(t)
            }
            destroy() {
                if ([N.Destroy].includes(this.state)) return;
                this.state = N.Destroy;
                const {
                    container: t,
                    viewport: e,
                    track: i,
                    slides: s,
                    panzoom: n
                } = this, o = this.option("classes");
                t.removeEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), n && (n.destroy(), this.panzoom = null), s && s.forEach((t => {
                    this.removeSlideEl(t)
                })), this.detachPlugins(), e && (e.removeEventListener("scroll", this.onScroll), e.offsetParent && i && i.offsetParent && e.replaceWith(...i.childNodes));
                for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
                this.track = null, this.viewport = null, this.page = 0, this.slides = [];
                const r = this.events.get("ready");
                this.events = new Map, r && this.events.set("ready", r)
            }
        }
        Object.defineProperty(et, "Panzoom", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: z
        }), Object.defineProperty(et, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                viewport: null,
                track: null,
                enabled: !0,
                slides: [],
                axis: "x",
                transition: "fade",
                preload: 1,
                slidesPerPage: "auto",
                initialPage: 0,
                friction: .12,
                Panzoom: {
                    decelFriction: .12
                },
                center: !0,
                infinite: !0,
                fill: !0,
                dragFree: !1,
                adaptiveHeight: !1,
                direction: "ltr",
                classes: {
                    container: "f-carousel",
                    viewport: "f-carousel__viewport",
                    track: "f-carousel__track",
                    slide: "f-carousel__slide",
                    isLTR: "is-ltr",
                    isRTL: "is-rtl",
                    isHorizontal: "is-horizontal",
                    isVertical: "is-vertical",
                    inTransition: "in-transition",
                    isSelected: "is-selected"
                },
                l10n: {
                    NEXT: "Next slide",
                    PREV: "Previous slide",
                    GOTO: "Go to slide #%d"
                }
            }
        }), Object.defineProperty(et, "Plugins", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: K
        });
        const it = function (t) {
            if (!A(t)) return 0;
            const e = window.scrollY,
                i = window.innerHeight,
                s = e + i,
                n = t.getBoundingClientRect(),
                o = n.y + e,
                r = n.height,
                a = o + r;
            if (e > a || s < o) return 0;
            if (e < o && s > a) return 100;
            if (o < e && a > s) return 100;
            let l = r;
            o < e && (l -= e - o), a > s && (l -= a - s);
            const c = l / i * 100;
            return Math.round(c)
        },
            st = !("undefined" == typeof window || !window.document || !window.document.createElement);
        let nt;
        const ot = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),
            rt = t => {
                if (t && st) {
                    void 0 === nt && document.createElement("div").focus({
                        get preventScroll() {
                            return nt = !0, !1
                        }
                    });
                    try {
                        if (nt) t.focus({
                            preventScroll: !0
                        });
                        else {
                            const e = window.scrollY || document.body.scrollTop,
                                i = window.scrollX || document.body.scrollLeft;
                            t.focus(), document.body.scrollTo({
                                top: e,
                                left: i,
                                behavior: "auto"
                            })
                        }
                    } catch (t) { }
                }
            },
            at = () => {
                const t = document;
                let e, i = "",
                    s = "",
                    n = "";
                return t.fullscreenEnabled ? (i = "requestFullscreen", s = "exitFullscreen", n = "fullscreenElement") : t.webkitFullscreenEnabled && (i = "webkitRequestFullscreen", s = "webkitExitFullscreen", n = "webkitFullscreenElement"), i && (e = {
                    request: function (e = t.documentElement) {
                        return "webkitRequestFullscreen" === i ? e[i](Element.ALLOW_KEYBOARD_INPUT) : e[i]()
                    },
                    exit: function () {
                        return t[n] && t[s]()
                    },
                    isFullscreen: function () {
                        return t[n]
                    }
                }), e
            },
            lt = {
                animated: !0,
                autoFocus: !0,
                backdropClick: "close",
                Carousel: {
                    classes: {
                        container: "fancybox__carousel",
                        viewport: "fancybox__viewport",
                        track: "fancybox__track",
                        slide: "fancybox__slide"
                    }
                },
                closeButton: "auto",
                closeExisting: !1,
                commonCaption: !1,
                compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
                contentClick: "toggleZoom",
                contentDblClick: !1,
                defaultType: "image",
                defaultDisplay: "flex",
                dragToClose: !0,
                Fullscreen: {
                    autoStart: !1
                },
                groupAll: !1,
                groupAttr: "data-fancybox",
                hideClass: "f-fadeOut",
                hideScrollbar: !0,
                idle: 3500,
                keyboard: {
                    Escape: "close",
                    Delete: "close",
                    Backspace: "close",
                    PageUp: "next",
                    PageDown: "prev",
                    ArrowUp: "prev",
                    ArrowDown: "next",
                    ArrowRight: "next",
                    ArrowLeft: "prev"
                },
                l10n: Object.assign(Object.assign({}, C), {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    MODAL: "You can close this modal content with the ESC key",
                    ERROR: "Something Went Wrong, Please Try Again Later",
                    IMAGE_ERROR: "Image Not Found",
                    ELEMENT_NOT_FOUND: "HTML Element Not Found",
                    AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                    AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                    IFRAME_ERROR: "Error Loading Page",
                    TOGGLE_ZOOM: "Toggle zoom level",
                    TOGGLE_THUMBS: "Toggle thumbnails",
                    TOGGLE_SLIDESHOW: "Toggle slideshow",
                    TOGGLE_FULLSCREEN: "Toggle full-screen mode",
                    DOWNLOAD: "Download"
                }),
                parentEl: null,
                placeFocusBack: !0,
                showClass: "f-zoomInUp",
                startIndex: 0,
                tpl: {
                    closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
                    main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
                },
                trapFocus: !0,
                wheel: "zoom"
            };
        var ct, dt;
        ! function (t) {
            t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy"
        }(ct || (ct = {})),
            function (t) {
                t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", t[t.Closing = 3] = "Closing"
            }(dt || (dt = {}));
        let ht = "",
            ut = !1,
            pt = !1,
            ft = null;
        const mt = () => {
            let t = "",
                e = "";
            const i = Oe.getInstance();
            if (i) {
                const s = i.carousel,
                    n = i.getSlide();
                if (s && n) {
                    let o = n.slug || void 0,
                        r = n.triggerEl || void 0;
                    e = o || i.option("slug") || "", !e && r && r.dataset && (e = r.dataset.fancybox || ""), e && "true" !== e && (t = "#" + e + (!o && s.slides.length > 1 ? "-" + (n.index + 1) : ""))
                }
            }
            return {
                hash: t,
                slug: e,
                index: 1
            }
        },
            gt = () => {
                const t = new URL(document.URL).hash,
                    e = t.slice(1).split("-"),
                    i = e[e.length - 1],
                    s = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
                return {
                    hash: t,
                    slug: e.join("-"),
                    index: s
                }
            },
            vt = () => {
                const {
                    slug: t,
                    index: e
                } = gt();
                if (!t) return;
                let i = document.querySelector(`[data-slug="${t}"]`);
                if (i && i.dispatchEvent(new CustomEvent("click", {
                    bubbles: !0,
                    cancelable: !0
                })), Oe.getInstance()) return;
                const s = document.querySelectorAll(`[data-fancybox="${t}"]`);
                s.length && (i = s[e - 1], i && i.dispatchEvent(new CustomEvent("click", {
                    bubbles: !0,
                    cancelable: !0
                })))
            },
            bt = () => {
                if (!1 === Oe.defaults.Hash) return;
                const t = Oe.getInstance();
                if (!1 === (null == t ? void 0 : t.options.Hash)) return;
                const {
                    slug: e,
                    index: i
                } = gt(), {
                    slug: s
                } = mt();
                t && (e === s ? t.jumpTo(i - 1) : (ut = !0, t.close())), vt()
            },
            yt = () => {
                ft && clearTimeout(ft), queueMicrotask((() => {
                    bt()
                }))
            },
            wt = () => {
                window.addEventListener("hashchange", yt, !1), setTimeout((() => {
                    bt()
                }), 500)
            };
        st && (/complete|interactive|loaded/.test(document.readyState) ? wt() : document.addEventListener("DOMContentLoaded", wt));
        const St = "is-zooming-in";
        class xt extends W {
            onCreateSlide(t, e, i) {
                const s = this.instance.optionFor(i, "src") || "";
                i.el && "image" === i.type && "string" == typeof s && this.setImage(i, s)
            }
            onRemoveSlide(t, e, i) {
                i.panzoom && i.panzoom.destroy(), i.panzoom = void 0, i.imageEl = void 0
            }
            onChange(t, e, i, s) {
                O(this.instance.container, St);
                for (const t of e.slides) {
                    const e = t.panzoom;
                    e && t.index !== i && e.reset(.35)
                }
            }
            onClose() {
                var t;
                const e = this.instance,
                    i = e.container,
                    s = e.getSlide();
                if (!i || !i.parentElement || !s) return;
                const {
                    el: n,
                    contentEl: o,
                    panzoom: r,
                    thumbElSrc: a
                } = s;
                if (!n || !a || !o || !r || r.isContentLoading || r.state === S.Init || r.state === S.Destroy) return;
                r.updateMetrics();
                let l = this.getZoomInfo(s);
                if (!l) return;
                this.instance.state = ct.CustomClosing, i.classList.remove(St), i.classList.add("is-zooming-out"), o.style.backgroundImage = `url('${a}')`;
                const c = i.getBoundingClientRect();
                1 === ((null === (t = window.visualViewport) || void 0 === t ? void 0 : t.scale) || 1) && Object.assign(i.style, {
                    position: "absolute",
                    top: `${i.offsetTop + window.scrollY}px`,
                    left: `${i.offsetLeft + window.scrollX}px`,
                    bottom: "auto",
                    right: "auto",
                    width: `${c.width}px`,
                    height: `${c.height}px`,
                    overflow: "hidden"
                });
                const {
                    x: d,
                    y: h,
                    scale: u,
                    opacity: p
                } = l;
                if (p) {
                    const t = ((t, e, i, s) => {
                        const n = e - t;
                        return e => 1 + ((e - t) / n * -1 || 0)
                    })(r.scale, u);
                    r.on("afterTransform", (() => {
                        o.style.opacity = t(r.scale) + ""
                    }))
                }
                r.on("endAnimation", (() => {
                    e.destroy()
                })), r.target.a = u, r.target.b = 0, r.target.c = 0, r.target.d = u, r.panTo({
                    x: d,
                    y: h,
                    scale: u,
                    friction: p ? .2 : .33,
                    ignoreBounds: !0
                }), r.isResting && e.destroy()
            }
            setImage(t, e) {
                const i = this.instance;
                t.src = e, this.process(t, e).then((e => {
                    const {
                        contentEl: s,
                        imageEl: n,
                        thumbElSrc: o,
                        el: r
                    } = t;
                    if (i.isClosing() || !s || !n) return;
                    s.offsetHeight;
                    const a = !!i.isOpeningSlide(t) && this.getZoomInfo(t);
                    if (this.option("protected") && r) {
                        r.addEventListener("contextmenu", (t => {
                            t.preventDefault()
                        }));
                        const t = document.createElement("div");
                        P(t, "fancybox-protected"), s.appendChild(t)
                    }
                    if (o && a) {
                        const n = e.contentRect,
                            r = Math.max(n.fullWidth, n.fullHeight);
                        let c = null;
                        !a.opacity && r > 1200 && (c = document.createElement("img"), P(c, "fancybox-ghost"), c.src = o, s.appendChild(c));
                        const d = () => {
                            c && (P(c, "f-fadeFastOut"), setTimeout((() => {
                                c && (c.remove(), c = null)
                            }), 200))
                        };
                        (l = o, new Promise(((t, e) => {
                            const i = new Image;
                            i.onload = t, i.onerror = e, i.src = l
                        }))).then((() => {
                            i.hideLoading(t), t.state = dt.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then((() => {
                                d(), this.instance.done(t)
                            }), (() => { })), c && setTimeout((() => {
                                d()
                            }), r > 2500 ? 800 : 200)
                        }), (() => {
                            i.hideLoading(t), i.revealContent(t)
                        }))
                    } else {
                        const s = this.optionFor(t, "initialSize"),
                            n = this.optionFor(t, "zoom"),
                            o = {
                                event: i.prevMouseMoveEvent || i.options.event,
                                friction: n ? .12 : 0
                            };
                        let r = i.optionFor(t, "showClass") || void 0,
                            a = !0;
                        i.isOpeningSlide(t) && ("full" === s ? e.zoomToFull(o) : "cover" === s ? e.zoomToCover(o) : "max" === s ? e.zoomToMax(o) : a = !1, e.stop("current")), a && r && (r = e.isDragging ? "f-fadeIn" : ""), i.hideLoading(t), i.revealContent(t, r)
                    }
                    var l
                }), (() => {
                    i.setError(t, "{{IMAGE_ERROR}}")
                }))
            }
            process(t, e) {
                return new Promise(((i, s) => {
                    var n;
                    const o = this.instance,
                        r = t.el;
                    o.clearContent(t), o.showLoading(t);
                    let a = this.optionFor(t, "content");
                    if ("string" == typeof a && (a = l(a)), !a || !A(a)) {
                        if (a = document.createElement("img"), a instanceof HTMLImageElement) {
                            let i = "",
                                s = t.caption;
                            i = "string" == typeof s && s ? s.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index + 1} of ${(null === (n = o.carousel) || void 0 === n ? void 0 : n.pages.length) || 1}`, a.src = e || "", a.alt = i, a.draggable = !1, t.srcset && a.setAttribute("srcset", t.srcset), this.instance.isOpeningSlide(t) && (a.fetchPriority = "high")
                        }
                        t.sizes && a.setAttribute("sizes", t.sizes)
                    }
                    P(a, "fancybox-image"), t.imageEl = a, o.setContent(t, a, !1), t.panzoom = new z(r, v({
                        transformParent: !0
                    }, this.option("Panzoom") || {}, {
                        content: a,
                        width: (e, i) => o.optionFor(t, "width", "auto", i) || "auto",
                        height: (e, i) => o.optionFor(t, "height", "auto", i) || "auto",
                        wheel: () => {
                            const t = o.option("wheel");
                            return ("zoom" === t || "pan" == t) && t
                        },
                        click: (e, i) => {
                            var s, n;
                            if (o.isCompact || o.isClosing()) return !1;
                            if (t.index !== (null === (s = o.getSlide()) || void 0 === s ? void 0 : s.index)) return !1;
                            if (i) {
                                const t = i.composedPath()[0];
                                if (["A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(t.nodeName)) return !1
                            }
                            let r = !i || i.target && (null === (n = t.contentEl) || void 0 === n ? void 0 : n.contains(i.target));
                            return o.option(r ? "contentClick" : "backdropClick") || !1
                        },
                        dblClick: () => o.isCompact ? "toggleZoom" : o.option("contentDblClick") || !1,
                        spinner: !1,
                        panOnlyZoomed: !0,
                        wheelLimit: 1 / 0,
                        on: {
                            ready: t => {
                                i(t)
                            },
                            error: () => {
                                s()
                            },
                            destroy: () => {
                                s()
                            }
                        }
                    }))
                }))
            }
            zoomIn(t) {
                return new Promise(((e, i) => {
                    const s = this.instance,
                        n = s.container,
                        {
                            panzoom: o,
                            contentEl: r,
                            el: a
                        } = t;
                    o && o.updateMetrics();
                    const l = this.getZoomInfo(t);
                    if (!(l && a && r && o && n)) return void i();
                    const {
                        x: c,
                        y: d,
                        scale: h,
                        opacity: u
                    } = l, p = () => {
                        t.state !== dt.Closing && (u && (r.style.opacity = Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - h)), 0) + ""), o.scale >= 1 && o.scale > o.targetScale - .1 && e(o))
                    }, f = t => {
                        (t.scale < .99 || t.scale > 1.01) && !t.isDragging || (O(n, St), r.style.opacity = "", t.off("endAnimation", f), t.off("touchStart", f), t.off("afterTransform", p), e(t))
                    };
                    o.on("endAnimation", f), o.on("touchStart", f), o.on("afterTransform", p), o.on(["error", "destroy"], (() => {
                        i()
                    })), o.panTo({
                        x: c,
                        y: d,
                        scale: h,
                        friction: 0,
                        ignoreBounds: !0
                    }), o.stop("current");
                    const m = {
                        event: "mousemove" === o.panMode ? s.prevMouseMoveEvent || s.options.event : void 0
                    },
                        g = this.optionFor(t, "initialSize");
                    P(n, St), s.hideLoading(t), "full" === g ? o.zoomToFull(m) : "cover" === g ? o.zoomToCover(m) : "max" === g ? o.zoomToMax(m) : o.reset(.172)
                }))
            }
            getZoomInfo(t) {
                const {
                    el: e,
                    imageEl: i,
                    thumbEl: s,
                    panzoom: n
                } = t, o = this.instance, r = o.container;
                if (!e || !i || !s || !n || it(s) < 3 || !this.optionFor(t, "zoom") || !r || o.state === ct.Destroy) return !1;
                if ("0" === getComputedStyle(r).getPropertyValue("--f-images-zoom")) return !1;
                const a = window.visualViewport || null;
                if (1 !== (a ? a.scale : 1)) return !1;
                let {
                    top: l,
                    left: c,
                    width: d,
                    height: h
                } = s.getBoundingClientRect(), {
                    top: u,
                    left: p,
                    fitWidth: f,
                    fitHeight: m
                } = n.contentRect;
                if (!(d && h && f && m)) return !1;
                const g = n.container.getBoundingClientRect();
                p += g.left, u += g.top;
                const v = -1 * (p + .5 * f - (c + .5 * d)),
                    b = -1 * (u + .5 * m - (l + .5 * h)),
                    y = d / f;
                let w = this.option("zoomOpacity") || !1;
                return "auto" === w && (w = Math.abs(d / h - f / m) > .1), {
                    x: v,
                    y: b,
                    scale: y,
                    opacity: w
                }
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose)
            }
            detach() {
                const t = this,
                    e = t.instance;
                e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose)
            }
        }
        Object.defineProperty(xt, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                initialSize: "fit",
                Panzoom: {
                    maxScale: 1
                },
                protected: !1,
                zoom: !0,
                zoomOpacity: "auto"
            }
        }), "function" == typeof SuppressedError && SuppressedError;
        const Ct = "html",
            kt = "image",
            Tt = "map",
            Et = "youtube",
            At = "vimeo",
            Ot = "html5video",
            Pt = (t, e = {}) => {
                const i = new URL(t),
                    s = new URLSearchParams(i.search),
                    n = new URLSearchParams;
                for (const [t, i] of [...s, ...Object.entries(e)]) {
                    let e = i + "";
                    if ("t" === t) {
                        let t = e.match(/((\d*)m)?(\d*)s?/);
                        t && n.set("start", 60 * parseInt(t[2] || "0") + parseInt(t[3] || "0") + "")
                    } else n.set(t, e)
                }
                let o = n + "",
                    r = t.match(/#t=((.*)?\d+s)/);
                return r && (o += `#t=${r[1]}`), o
            },
            $t = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo"];
        class Mt extends W {
            onBeforeInitSlide(t, e, i) {
                this.processType(i)
            }
            onCreateSlide(t, e, i) {
                this.setContent(i)
            }
            onClearContent(t, e) {
                e.xhr && (e.xhr.abort(), e.xhr = null);
                const i = e.iframeEl;
                i && (i.onload = i.onerror = null, i.src = "//about:blank", e.iframeEl = null);
                const s = e.contentEl,
                    n = e.placeholderEl;
                if ("inline" === e.type && s && n) s.classList.remove("fancybox__content"), "none" !== getComputedStyle(s).getPropertyValue("display") && (s.style.display = "none"), setTimeout((() => {
                    n && (s && n.parentNode && n.parentNode.insertBefore(s, n), n.remove())
                }), 0), e.contentEl = void 0, e.placeholderEl = void 0;
                else
                    for (; e.el && e.el.firstChild;) e.el.removeChild(e.el.firstChild)
            }
            onSelectSlide(t, e, i) {
                i.state === dt.Ready && this.playVideo()
            }
            onUnselectSlide(t, e, i) {
                var s, n;
                if (i.type === Ot) {
                    try {
                        null === (n = null === (s = i.el) || void 0 === s ? void 0 : s.querySelector("video")) || void 0 === n || n.pause()
                    } catch (t) { }
                    return
                }
                let o;
                i.type === At ? o = {
                    method: "pause",
                    value: "true"
                } : i.type === Et && (o = {
                    event: "command",
                    func: "pauseVideo"
                }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), i.poller && clearTimeout(i.poller)
            }
            onDone(t, e) {
                t.isCurrentSlide(e) && !t.isClosing() && this.playVideo()
            }
            onRefresh(t, e) {
                e.slides.forEach((t => {
                    t.el && (this.resizeIframe(t), this.setAspectRatio(t))
                }))
            }
            onMessage(t) {
                try {
                    let e = JSON.parse(t.data);
                    if ("https://player.vimeo.com" === t.origin) {
                        if ("ready" === e.event)
                            for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true")
                    } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === e.event) {
                        const t = document.getElementById(e.id);
                        t && (t.dataset.ready = "true")
                    }
                } catch (t) { }
            }
            loadAjaxContent(t) {
                const e = this.instance.optionFor(t, "src") || "";
                this.instance.showLoading(t);
                const i = this.instance,
                    s = new XMLHttpRequest;
                i.showLoading(t), s.onreadystatechange = function () {
                    s.readyState === XMLHttpRequest.DONE && i.state === ct.Ready && (i.hideLoading(t), 200 === s.status ? i.setContent(t, s.responseText) : i.setError(t, 404 === s.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
                };
                const n = t.ajax || null;
                s.open(n ? "POST" : "GET", e + ""), s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.send(n), t.xhr = s
            }
            setInlineContent(t) {
                let e = null;
                if (A(t.src)) e = t.src;
                else if ("string" == typeof t.src) {
                    const i = t.src.split("#", 2).pop();
                    e = i ? document.getElementById(i) : null
                }
                if (e) {
                    if ("clone" === t.type || e.closest(".fancybox__slide")) {
                        e = e.cloneNode(!0);
                        const i = e.dataset.animationName;
                        i && (e.classList.remove(i), delete e.dataset.animationName);
                        let s = e.getAttribute("id");
                        s = s ? `${s}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", s)
                    } else if (e.parentNode) {
                        const i = document.createElement("div");
                        i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i
                    }
                    this.instance.setContent(t, e)
                } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            setIframeContent(t) {
                const {
                    src: e,
                    el: i
                } = t;
                if (!e || "string" != typeof e || !i) return;
                i.classList.add("is-loading");
                const s = this.instance,
                    n = document.createElement("iframe");
                n.className = "fancybox__iframe", n.setAttribute("id", `fancybox__iframe_${s.id}_${t.index}`);
                for (const [e, i] of Object.entries(this.optionFor(t, "iframeAttr") || {})) n.setAttribute(e, i);
                n.onerror = () => {
                    s.setError(t, "{{IFRAME_ERROR}}")
                }, t.iframeEl = n;
                const o = this.optionFor(t, "preload");
                if ("iframe" !== t.type || !1 === o) return n.setAttribute("src", t.src + ""), s.setContent(t, n, !1), this.resizeIframe(t), void s.revealContent(t);
                s.showLoading(t), n.onload = () => {
                    if (!n.src.length) return;
                    const e = "true" !== n.dataset.ready;
                    n.dataset.ready = "true", this.resizeIframe(t), e ? s.revealContent(t) : s.hideLoading(t)
                }, n.setAttribute("src", e), s.setContent(t, n, !1)
            }
            resizeIframe(t) {
                const {
                    type: e,
                    iframeEl: i
                } = t;
                if (e === Et || e === At) return;
                const s = null == i ? void 0 : i.parentElement;
                if (!i || !s) return;
                let n = t.autoSize;
                void 0 === n && (n = this.optionFor(t, "autoSize"));
                let o = t.width || 0,
                    r = t.height || 0;
                o && r && (n = !1);
                const a = s && s.style;
                if (!1 !== t.preload && !1 !== n && a) try {
                    const t = window.getComputedStyle(s),
                        e = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
                        n = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom),
                        l = i.contentWindow;
                    if (l) {
                        const t = l.document,
                            i = t.getElementsByTagName(Ct)[0],
                            s = t.body;
                        a.width = "", s.style.overflow = "hidden", o = o || i.scrollWidth + e, a.width = `${o}px`, s.style.overflow = "", a.flex = "0 0 auto", a.height = `${s.scrollHeight}px`, r = i.scrollHeight + n
                    }
                } catch (t) { }
                if (o || r) {
                    const t = {
                        flex: "0 1 auto",
                        width: "",
                        height: ""
                    };
                    o && "auto" !== o && (t.width = `${o}px`), r && "auto" !== r && (t.height = `${r}px`), Object.assign(a, t)
                }
            }
            playVideo() {
                const t = this.instance.getSlide();
                if (!t) return;
                const {
                    el: e
                } = t;
                if (!e || !e.offsetParent) return;
                if (!this.optionFor(t, "videoAutoplay")) return;
                if (t.type === Ot) try {
                    const t = e.querySelector("video");
                    if (t) {
                        const e = t.play();
                        void 0 !== e && e.then((() => { })).catch((e => {
                            t.muted = !0, t.play()
                        }))
                    }
                } catch (t) { }
                if (t.type !== Et && t.type !== At) return;
                const i = () => {
                    if (t.iframeEl && t.iframeEl.contentWindow) {
                        let e;
                        if ("true" === t.iframeEl.dataset.ready) return e = t.type === Et ? {
                            event: "command",
                            func: "playVideo"
                        } : {
                            method: "play",
                            value: "true"
                        }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
                        t.type === Et && (e = {
                            event: "listening",
                            id: t.iframeEl.getAttribute("id")
                        }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"))
                    }
                    t.poller = setTimeout(i, 250)
                };
                i()
            }
            processType(t) {
                if (t.html) return t.type = Ct, t.src = t.html, void (t.html = "");
                const e = this.instance.optionFor(t, "src", "");
                if (!e || "string" != typeof e) return;
                let i = t.type,
                    s = null;
                if (s = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                    const n = this.optionFor(t, Et),
                        {
                            nocookie: o
                        } = n,
                        r = function (t, e) {
                            var i = {};
                            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (i[s] = t[s]);
                            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                                var n = 0;
                                for (s = Object.getOwnPropertySymbols(t); n < s.length; n++) e.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[n]) && (i[s[n]] = t[s[n]])
                            }
                            return i
                        }(n, ["nocookie"]),
                        a = `www.youtube${o ? "-nocookie" : ""}.com`,
                        l = Pt(e, r),
                        c = encodeURIComponent(s[2]);
                    t.videoId = c, t.src = `https://${a}/embed/${c}?${l}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, i = Et
                } else if (s = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
                    const n = Pt(e, this.optionFor(t, At)),
                        o = encodeURIComponent(s[1]),
                        r = s[4] || "";
                    t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${r ? `h=${r}${n ? "&" : ""}` : ""}${n}`, i = At
                }
                if (!i && t.triggerEl) {
                    const e = t.triggerEl.dataset.type;
                    $t.includes(e) && (i = e)
                }
                i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (s = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = Ot, t.videoFormat = t.videoFormat || "video/" + ("ogv" === s[1] ? "ogg" : s[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = kt : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf")), (s = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${s[1]}/?ll=${(s[2] ? s[2] + "&z=" + Math.floor(parseFloat(s[3])) + (s[4] ? s[4].replace(/^\//, "&") : "") : s[4] + "").replace(/\?/, "&")}&output=${s[4] && s[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, i = Tt) : (s = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${s[1]}/maps?q=${s[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, i = Tt), i = i || this.instance.option("defaultType"), t.type = i, i === kt && (t.thumbSrc = t.thumbSrc || t.src)
            }
            setContent(t) {
                const e = this.instance.optionFor(t, "src") || "";
                if (t && t.type && e) {
                    switch (t.type) {
                        case Ct:
                            this.instance.setContent(t, e);
                            break;
                        case Ot:
                            const i = this.option("videoTpl");
                            i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                            break;
                        case "inline":
                        case "clone":
                            this.setInlineContent(t);
                            break;
                        case "ajax":
                            this.loadAjaxContent(t);
                            break;
                        case "pdf":
                        case Tt:
                        case Et:
                        case At:
                            t.preload = !1;
                        case "iframe":
                            this.setIframeContent(t)
                    }
                    this.setAspectRatio(t)
                }
            }
            setAspectRatio(t) {
                const e = t.contentEl;
                if (!(t.el && e && t.type && [Et, At, Ot].includes(t.type))) return;
                let i, s = t.width || "auto",
                    n = t.height || "auto";
                if ("auto" === s || "auto" === n) {
                    i = this.optionFor(t, "videoRatio");
                    const e = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
                    i = e && e.length > 2 ? parseFloat(e[1]) / parseFloat(e[2]) : parseFloat(i + "")
                } else s && n && (i = s / n);
                if (!i) return;
                e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
                const o = e.getBoundingClientRect(),
                    r = o.width || 1,
                    a = o.height || 1;
                e.style.aspectRatio = i + "", i < r / a ? (n = "auto" === n ? a : Math.min(a, n), e.style.width = "auto", e.style.height = `${n}px`) : (s = "auto" === s ? r : Math.min(r, s), e.style.width = `${s}px`, e.style.height = "auto")
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), window.addEventListener("message", t.onMessage)
            }
            detach() {
                const t = this,
                    e = t.instance;
                e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), window.removeEventListener("message", t.onMessage)
            }
        }
        Object.defineProperty(Mt, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                ajax: null,
                autoSize: !0,
                iframeAttr: {
                    allow: "autoplay; fullscreen",
                    scrolling: "auto"
                },
                preload: !0,
                videoAutoplay: !0,
                videoRatio: 16 / 9,
                videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
                videoFormat: "",
                vimeo: {
                    byline: 1,
                    color: "00adef",
                    controls: 1,
                    dnt: 1,
                    muted: 0
                },
                youtube: {
                    controls: 1,
                    enablejsapi: 1,
                    nocookie: 1,
                    rel: 0,
                    fs: 1
                }
            }
        });
        const Lt = "play",
            Dt = "pause",
            It = "ready";
        class jt extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: It
                }), Object.defineProperty(this, "inHover", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "timer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "progressBar", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            get isActive() {
                return this.state !== It
            }
            onReady(t) {
                this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
            }
            onChange() {
                this.removeProgressBar(), this.pause()
            }
            onSettle() {
                this.resume()
            }
            onVisibilityChange() {
                "visible" === document.visibilityState ? this.resume() : this.pause()
            }
            onMouseEnter() {
                this.inHover = !0, this.pause()
            }
            onMouseLeave() {
                var t;
                this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume()
            }
            onTimerEnd() {
                const t = this.instance;
                "play" === this.state && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0))
            }
            removeProgressBar() {
                this.progressBar && (this.progressBar.remove(), this.progressBar = null)
            }
            createProgressBar() {
                var t;
                if (!this.option("showProgress")) return null;
                this.removeProgressBar();
                const e = this.instance,
                    i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
                let s = this.option("progressParentEl");
                if (s || (s = (1 === i.length ? i[0].el : null) || e.viewport), !s) return null;
                const n = document.createElement("div");
                return P(n, "f-progress"), s.prepend(n), this.progressBar = n, n.offsetHeight, n
            }
            set() {
                const t = this,
                    e = t.instance;
                if (e.pages.length < 2) return;
                if (t.timer) return;
                const i = t.option("timeout");
                t.state = Lt, P(e.container, "has-autoplay");
                let s = t.createProgressBar();
                s && (s.style.transitionDuration = `${i}ms`, s.style.transform = "scaleX(1)"), t.timer = setTimeout((() => {
                    t.timer = null, t.inHover || t.onTimerEnd()
                }), i), t.emit("set")
            }
            clear() {
                const t = this;
                t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar()
            }
            start() {
                const t = this;
                if (t.set(), t.state !== It) {
                    if (t.option("pauseOnHover")) {
                        const e = t.instance.container;
                        e.addEventListener("mouseenter", t.onMouseEnter, !1), e.addEventListener("mouseleave", t.onMouseLeave, !1)
                    }
                    document.addEventListener("visibilitychange", t.onVisibilityChange, !1), t.emit("start")
                }
            }
            stop() {
                const t = this,
                    e = t.state,
                    i = t.instance.container;
                t.clear(), t.state = It, i.removeEventListener("mouseenter", t.onMouseEnter, !1), i.removeEventListener("mouseleave", t.onMouseLeave, !1), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), O(i, "has-autoplay"), e !== It && t.emit("stop")
            }
            pause() {
                const t = this;
                t.state === Lt && (t.state = Dt, t.clear(), t.emit(Dt))
            }
            resume() {
                const t = this,
                    e = t.instance;
                if (e.isInfinite || e.page !== e.pages.length - 1)
                    if (t.state !== Lt) {
                        if (t.state === Dt && !t.inHover) {
                            const e = new Event("resume", {
                                bubbles: !0,
                                cancelable: !0
                            });
                            t.emit("resume", e), e.defaultPrevented || t.set()
                        }
                    } else t.set();
                else t.stop()
            }
            toggle() {
                this.state === Lt || this.state === Dt ? this.stop() : this.start()
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), e.on("Panzoom.touchMove", t.onChange)
            }
            detach() {
                const t = this,
                    e = t.instance;
                e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), e.off("Panzoom.touchMove", t.onChange), t.stop()
            }
        }
        Object.defineProperty(jt, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                autoStart: !0,
                pauseOnHover: !0,
                progressParentEl: null,
                showProgress: !0,
                timeout: 3e3
            }
        });
        class Ht extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "ref", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            onPrepare(t) {
                const e = t.carousel;
                if (!e) return;
                const i = t.container;
                i && (e.options.Autoplay = v({
                    autoStart: !1
                }, this.option("Autoplay") || {}, {
                    pauseOnHover: !1,
                    timeout: this.option("timeout"),
                    progressParentEl: () => this.option("progressParentEl") || null,
                    on: {
                        start: () => {
                            t.emit("startSlideshow")
                        },
                        set: e => {
                            var s;
                            i.classList.add("has-slideshow"), (null === (s = t.getSlide()) || void 0 === s ? void 0 : s.state) !== dt.Ready && e.pause()
                        },
                        stop: () => {
                            i.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow")
                        },
                        resume: (e, i) => {
                            var s, n, o;
                            !i || !i.cancelable || (null === (s = t.getSlide()) || void 0 === s ? void 0 : s.state) === dt.Ready && (null === (o = null === (n = t.carousel) || void 0 === n ? void 0 : n.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault()
                        }
                    }
                }), e.attachPlugins({
                    Autoplay: jt
                }), this.ref = e.plugins.Autoplay)
            }
            onReady(t) {
                const e = t.carousel,
                    i = this.ref;
                i && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start()
            }
            onDone(t, e) {
                const i = this.ref,
                    s = t.carousel;
                if (!i || !s) return;
                const n = e.panzoom;
                n && n.on("startAnimation", (() => {
                    t.isCurrentSlide(e) && i.stop()
                })), t.isCurrentSlide(e) && i.resume()
            }
            onKeydown(t, e) {
                var i;
                const s = this.ref;
                s && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && s.toggle()
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), e.on("keydown", t.onKeydown)
            }
            detach() {
                const t = this,
                    e = t.instance;
                e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), e.off("keydown", t.onKeydown)
            }
        }
        Object.defineProperty(Ht, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                key: " ",
                playOnStart: !1,
                progressParentEl: t => {
                    var e;
                    return (null === (e = t.instance.container) || void 0 === e ? void 0 : e.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || t.instance.container
                },
                timeout: 3e3
            }
        });
        const _t = {
            classes: {
                container: "f-thumbs f-carousel__thumbs",
                viewport: "f-thumbs__viewport",
                track: "f-thumbs__track",
                slide: "f-thumbs__slide",
                isResting: "is-resting",
                isSelected: "is-selected",
                isLoading: "is-loading",
                hasThumbs: "has-thumbs"
            },
            minCount: 2,
            parentEl: null,
            thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
            type: "modern"
        };
        var zt;
        ! function (t) {
            t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden"
        }(zt || (zt = {}));
        const Rt = "isResting",
            Ft = "thumbWidth",
            Nt = "thumbHeight",
            Bt = "thumbClipWidth";
        let qt = class extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "type", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: "modern"
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "track", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "carousel", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "thumbWidth", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbClipWidth", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbHeight", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbGap", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbExtraGap", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: zt.Init
                })
            }
            get isModern() {
                return "modern" === this.type
            }
            onInitSlide(t, e) {
                const i = e.el ? e.el.dataset : void 0;
                i && (e.thumbSrc = i.thumbSrc || e.thumbSrc || "", e[Bt] = parseFloat(i[Bt] || "") || e[Bt] || 0, e[Nt] = parseFloat(i.thumbHeight || "") || e[Nt] || 0), this.addSlide(e)
            }
            onInitSlides() {
                this.build()
            }
            onChange() {
                var t;
                if (!this.isModern) return;
                const e = this.container,
                    i = this.instance,
                    s = i.panzoom,
                    n = this.carousel,
                    o = n ? n.panzoom : null,
                    r = i.page;
                if (s && n && o) {
                    if (s.isDragging) {
                        O(e, this.cn(Rt));
                        let s = (null === (t = n.pages[r]) || void 0 === t ? void 0 : t.pos) || 0;
                        s += i.getProgress(r) * (this[Bt] + this.thumbGap);
                        let a = o.getBounds(); - 1 * s > a.x.min && -1 * s < a.x.max && o.panTo({
                            x: -1 * s,
                            friction: .12
                        })
                    } else d(e, this.cn(Rt), s.isResting);
                    this.shiftModern()
                }
            }
            onRefresh() {
                this.updateProps();
                for (const t of this.instance.slides || []) this.resizeModernSlide(t);
                this.shiftModern()
            }
            isDisabled() {
                const t = this.option("minCount") || 0;
                if (t) {
                    const e = this.instance;
                    let i = 0;
                    for (const t of e.slides || []) t.thumbSrc && i++;
                    if (i < t) return !0
                }
                const e = this.option("type");
                return ["modern", "classic"].indexOf(e) < 0
            }
            getThumb(t) {
                const e = this.option("thumbTpl") || "";
                return {
                    html: this.instance.localize(e, [
                        ["%i", t.index],
                        ["%d", t.index + 1],
                        ["%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]
                    ])
                }
            }
            addSlide(t) {
                const e = this.carousel;
                e && e.addSlide(t.index, this.getThumb(t))
            }
            getSlides() {
                const t = [];
                for (const e of this.instance.slides || []) t.push(this.getThumb(e));
                return t
            }
            resizeModernSlide(t) {
                this.isModern && (t[Ft] = t[Bt] && t[Nt] ? Math.round(this[Nt] * (t[Bt] / t[Nt])) : this[Ft])
            }
            updateProps() {
                const t = this.container;
                if (!t) return;
                const e = e => parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-" + e)) || 0;
                this.thumbGap = e("gap"), this.thumbExtraGap = e("extra-gap"), this[Ft] = e("width") || 40, this[Bt] = e("clip-width") || 40, this[Nt] = e("height") || 40
            }
            build() {
                const t = this;
                if (t.state !== zt.Init) return;
                if (t.isDisabled()) return void t.emit("disabled");
                const e = t.instance,
                    i = e.container,
                    s = t.getSlides(),
                    n = t.option("type");
                t.type = n;
                const o = t.option("parentEl"),
                    r = t.cn("container"),
                    a = t.cn("track");
                let l = null == o ? void 0 : o.querySelector("." + r);
                l || (l = document.createElement("div"), P(l, r), o ? o.appendChild(l) : i.after(l)), P(l, `is-${n}`), P(i, t.cn("hasThumbs")), t.container = l, t.updateProps();
                let c = l.querySelector("." + a);
                c || (c = document.createElement("div"), P(c, t.cn("track")), l.appendChild(c)), t.track = c;
                const d = v({}, {
                    track: c,
                    infinite: !1,
                    center: !0,
                    fill: "classic" === n,
                    dragFree: !0,
                    slidesPerPage: 1,
                    transition: !1,
                    preload: .25,
                    friction: .12,
                    Panzoom: {
                        maxVelocity: 0
                    },
                    Dots: !1,
                    Navigation: !1,
                    classes: {
                        container: "f-thumbs",
                        viewport: "f-thumbs__viewport",
                        track: "f-thumbs__track",
                        slide: "f-thumbs__slide"
                    }
                }, t.option("Carousel") || {}, {
                    Sync: {
                        target: e
                    },
                    slides: s
                }),
                    h = new e.constructor(l, d);
                h.on("createSlide", ((e, i) => {
                    t.setProps(i.index), t.emit("createSlide", i, i.el)
                })), h.on("ready", (() => {
                    t.shiftModern(), t.emit("ready")
                })), h.on("refresh", (() => {
                    t.shiftModern()
                })), h.on("Panzoom.click", ((e, i, s) => {
                    t.onClick(s)
                })), t.carousel = h, t.state = zt.Ready
            }
            onClick(t) {
                t.preventDefault(), t.stopPropagation();
                const e = this.instance,
                    {
                        pages: i,
                        page: s
                    } = e,
                    n = t => {
                        if (t) {
                            const e = t.closest("[data-carousel-index]");
                            if (e) return [parseInt(e.dataset.carouselIndex || "", 10) || 0, e]
                        }
                        return [-1, void 0]
                    },
                    o = (t, e) => {
                        const i = document.elementFromPoint(t, e);
                        return i ? n(i) : [-1, void 0]
                    };
                let [r, a] = n(t.target);
                if (r > -1) return;
                const l = this[Bt],
                    c = t.clientX,
                    d = t.clientY;
                let [h, u] = o(c - l, d), [p, f] = o(c + l, d);
                u && f ? (r = Math.abs(c - u.getBoundingClientRect().right) < Math.abs(c - f.getBoundingClientRect().left) ? h : p, r === s && (r = r === h ? p : h)) : u ? r = h : f && (r = p), r > -1 && i[r] && e.slideTo(r)
            }
            getShift(t) {
                var e;
                const i = this,
                    {
                        instance: s
                    } = i,
                    n = i.carousel;
                if (!s || !n) return 0;
                const o = i[Ft],
                    r = i[Bt],
                    a = i.thumbGap,
                    l = i.thumbExtraGap;
                if (!(null === (e = n.slides[t]) || void 0 === e ? void 0 : e.el)) return 0;
                const c = .5 * (o - r),
                    d = s.pages.length - 1;
                let h = s.getProgress(0),
                    u = s.getProgress(d),
                    p = s.getProgress(t, !1, !0),
                    f = 0,
                    m = c + l + a;
                const g = h < 0 && h > -1,
                    v = u > 0 && u < 1;
                return 0 === t ? (f = m * Math.abs(h), v && 1 === h && (f -= m * Math.abs(u))) : t === d ? (f = m * Math.abs(u) * -1, g && -1 === u && (f += m * Math.abs(h))) : g || v ? (f = -1 * m, f += m * Math.abs(h), f += m * (1 - Math.abs(u))) : f = m * p, f
            }
            setProps(t) {
                var e;
                const i = this;
                if (!i.isModern) return;
                const {
                    instance: s
                } = i, n = i.carousel;
                if (s && n) {
                    const r = null === (e = n.slides[t]) || void 0 === e ? void 0 : e.el;
                    if (r && r.childNodes.length) {
                        let e = o(1 - Math.abs(s.getProgress(t))),
                            n = o(i.getShift(t));
                        r.style.setProperty("--progress", e ? e + "" : ""), r.style.setProperty("--shift", n + "")
                    }
                }
            }
            shiftModern() {
                const t = this;
                if (!t.isModern) return;
                const {
                    instance: e,
                    track: i
                } = t, s = e.panzoom, n = t.carousel;
                if (!(e && i && s && n)) return;
                if (s.state === S.Init || s.state === S.Destroy) return;
                for (const i of e.slides) t.setProps(i.index);
                let o = (t[Bt] + t.thumbGap) * (n.slides.length || 0);
                i.style.setProperty("--width", o + "")
            }
            cleanup() {
                const t = this;
                t.carousel && t.carousel.destroy(), t.carousel = null, t.container && t.container.remove(), t.container = null, t.track && t.track.remove(), t.track = null, t.state = zt.Init, O(t.instance.container, t.cn("hasThumbs"))
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.on("initSlide", t.onInitSlide), e.state === N.Init ? e.on("initSlides", t.onInitSlides) : t.onInitSlides(), e.on(["change", "Panzoom.afterTransform"], t.onChange), e.on("Panzoom.refresh", t.onRefresh)
            }
            detach() {
                const t = this,
                    e = t.instance;
                e.off("initSlide", t.onInitSlide), e.off("initSlides", t.onInitSlides), e.off(["change", "Panzoom.afterTransform"], t.onChange), e.off("Panzoom.refresh", t.onRefresh), t.cleanup()
            }
        };
        Object.defineProperty(qt, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: _t
        });
        const Wt = Object.assign(Object.assign({}, _t), {
            key: "t",
            showOnStart: !0,
            parentEl: null
        }),
            Yt = "is-masked",
            Xt = "aria-hidden";
        class Ut extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "ref", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "hidden", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                })
            }
            get isEnabled() {
                const t = this.ref;
                return t && !t.isDisabled()
            }
            get isHidden() {
                return this.hidden
            }
            onClick(t, e) {
                e.stopPropagation()
            }
            onCreateSlide(t, e) {
                var i, s, n;
                const o = (null === (n = null === (s = null === (i = this.instance) || void 0 === i ? void 0 : i.carousel) || void 0 === s ? void 0 : s.slides[e.index]) || void 0 === n ? void 0 : n.type) || "",
                    r = e.el;
                if (r && o) {
                    let t = `for-${o}`;
                    ["video", "youtube", "vimeo", "html5video"].includes(o) && (t += " for-video"), P(r, t)
                }
            }
            onInit() {
                var t;
                const e = this,
                    i = e.instance,
                    s = i.carousel;
                if (e.ref || !s) return;
                const n = e.option("parentEl") || i.footer || i.container;
                if (!n) return;
                const o = v({}, e.options, {
                    parentEl: n,
                    classes: {
                        container: "f-thumbs fancybox__thumbs"
                    },
                    Carousel: {
                        Sync: {
                            friction: i.option("Carousel.friction") || 0
                        }
                    },
                    on: {
                        ready: t => {
                            const i = t.container;
                            i && this.hidden && (e.refresh(), i.style.transition = "none", e.hide(), i.offsetHeight, queueMicrotask((() => {
                                i.style.transition = "", e.show()
                            })))
                        }
                    }
                });
                o.Carousel = o.Carousel || {}, o.Carousel.on = v((null === (t = e.options.Carousel) || void 0 === t ? void 0 : t.on) || {}, {
                    click: this.onClick,
                    createSlide: this.onCreateSlide
                }), s.options.Thumbs = o, s.attachPlugins({
                    Thumbs: qt
                }), e.ref = s.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = zt.Hidden, e.hidden = !0)
            }
            onResize() {
                var t;
                const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
                e && (e.style.maxHeight = "")
            }
            onKeydown(t, e) {
                const i = this.option("key");
                i && i === e && this.toggle()
            }
            toggle() {
                const t = this.ref;
                if (t && !t.isDisabled()) return t.state === zt.Hidden ? (t.state = zt.Init, void t.build()) : void (this.hidden ? this.show() : this.hide())
            }
            show() {
                const t = this.ref;
                if (!t || t.isDisabled()) return;
                const e = t.container;
                e && (this.refresh(), e.offsetHeight, e.removeAttribute(Xt), e.classList.remove(Yt), this.hidden = !1)
            }
            hide() {
                const t = this.ref,
                    e = t && t.container;
                e && (this.refresh(), e.offsetHeight, e.classList.add(Yt), e.setAttribute(Xt, "true")), this.hidden = !0
            }
            refresh() {
                const t = this.ref;
                if (!t || !t.state) return;
                const e = t.container,
                    i = (null == e ? void 0 : e.firstChild) || null;
                e && i && i.childNodes.length && (e.style.maxHeight = `${i.getBoundingClientRect().height}px`)
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.state === ct.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), e.on("keydown", t.onKeydown)
            }
            detach() {
                var t;
                const e = this,
                    i = e.instance;
                i.off("Carousel.init", e.onInit), i.off("resize", e.onResize), i.off("keydown", e.onKeydown), null === (t = i.carousel) || void 0 === t || t.detachPlugins(["Thumbs"]), e.ref = null
            }
        }
        Object.defineProperty(Ut, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: Wt
        });
        const Vt = {
            panLeft: {
                icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
                change: {
                    panX: -100
                }
            },
            panRight: {
                icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
                change: {
                    panX: 100
                }
            },
            panUp: {
                icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
                change: {
                    panY: -100
                }
            },
            panDown: {
                icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
                change: {
                    panY: 100
                }
            },
            zoomIn: {
                icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
                action: "zoomIn"
            },
            zoomOut: {
                icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "zoomOut"
            },
            toggle1to1: {
                icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
                action: "toggleZoom"
            },
            toggleZoom: {
                icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "toggleZoom"
            },
            iterateZoom: {
                icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "iterateZoom"
            },
            rotateCCW: {
                icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
                action: "rotateCCW"
            },
            rotateCW: {
                icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
                action: "rotateCW"
            },
            flipX: {
                icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
                action: "flipX"
            },
            flipY: {
                icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
                action: "flipY"
            },
            fitX: {
                icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
                action: "fitX"
            },
            fitY: {
                icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
                action: "fitY"
            },
            reset: {
                icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
                action: "reset"
            },
            toggleFS: {
                icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
                action: "toggleFS"
            }
        };
        var Qt;
        ! function (t) {
            t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled"
        }(Qt || (Qt = {}));
        const Gt = {
            tabindex: "-1",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        },
            Kt = "has-toolbar",
            Zt = "fancybox__toolbar";
        class Jt extends W {
            constructor() {
                super(...arguments), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: Qt.Init
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            onReady(t) {
                var e;
                if (!t.carousel) return;
                let i = this.option("display"),
                    s = this.option("absolute"),
                    n = this.option("enabled");
                if ("auto" === n) {
                    const t = this.instance.carousel;
                    let e = 0;
                    if (t)
                        for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
                    e || (n = !1)
                }
                n || (i = void 0);
                let o = 0;
                const r = {
                    left: [],
                    middle: [],
                    right: []
                };
                if (i)
                    for (const t of ["left", "middle", "right"])
                        for (const s of i[t]) {
                            const i = this.createEl(s);
                            i && (null === (e = r[t]) || void 0 === e || e.push(i), o++)
                        }
                let a = null;
                if (o && (a = this.createContainer()), a) {
                    for (const [t, e] of Object.entries(r)) {
                        const i = document.createElement("div");
                        P(i, Zt + "__column is-" + t);
                        for (const t of e) i.appendChild(t);
                        "auto" !== s || "middle" !== t || e.length || (s = !0), a.appendChild(i)
                    } !0 === s && P(a, "is-absolute"), this.state = Qt.Ready, this.onRefresh()
                } else this.state = Qt.Disabled
            }
            onClick(t) {
                var e, i;
                const s = this.instance,
                    n = s.getSlide(),
                    o = null == n ? void 0 : n.panzoom,
                    r = t.target,
                    a = r && A(r) ? r.dataset : null;
                if (!a) return;
                if (void 0 !== a.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), void (null === (e = s.plugins.Thumbs) || void 0 === e || e.toggle());
                if (void 0 !== a.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen();
                if (void 0 !== a.fancyboxToggleSlideshow) {
                    t.preventDefault(), t.stopPropagation();
                    const e = null === (i = s.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
                    let n = e.isActive;
                    return o && "mousemove" === o.panMode && !n && o.reset(), void (n ? e.stop() : e.start())
                }
                const l = a.panzoomAction,
                    c = a.panzoomChange;
                if ((c || l) && (t.preventDefault(), t.stopPropagation()), c) {
                    let e = {};
                    try {
                        e = JSON.parse(c)
                    } catch (t) { }
                    o && o.applyChange(e)
                } else l && o && o[l] && o[l]()
            }
            onChange() {
                this.onRefresh()
            }
            onRefresh() {
                if (this.instance.isClosing()) return;
                const t = this.container;
                if (!t) return;
                const e = this.instance.getSlide();
                if (!e || e.state !== dt.Ready) return;
                const i = e && !e.error && e.panzoom;
                for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
                let s = i && i.canZoomIn(),
                    n = i && i.canZoomOut();
                for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) s ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
                for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
                for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                    n || s ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
                    const t = e.querySelector("g");
                    t && (t.style.display = s ? "" : "none")
                }
            }
            onDone(t, e) {
                var i;
                null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", (() => {
                    this.instance.isCurrentSlide(e) && this.onRefresh()
                })), this.instance.isCurrentSlide(e) && this.onRefresh()
            }
            createContainer() {
                const t = this.instance.container;
                if (!t) return null;
                const e = this.option("parentEl") || t;
                let i = e.querySelector("." + Zt);
                return i || (i = document.createElement("div"), P(i, Zt), e.prepend(i)), i.addEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !0
                }), t && P(t, Kt), this.container = i, i
            }
            createEl(t) {
                const e = this.instance,
                    i = e.carousel;
                if (!i) return null;
                if ("toggleFS" === t) return null;
                if ("fullscreen" === t && !at()) return null;
                let s = null;
                const n = i.slides.length || 0;
                let o = 0,
                    r = 0;
                for (const t of i.slides) (t.panzoom || "image" === t.type) && o++, ("image" === t.type || t.downloadSrc) && r++;
                if (n < 2 && ["infobar", "prev", "next"].includes(t)) return s;
                if (void 0 !== Vt[t] && !o) return null;
                if ("download" === t && !r) return null;
                if ("thumbs" === t) {
                    const t = e.plugins.Thumbs;
                    if (!t || !t.isEnabled) return null
                }
                if ("slideshow" === t && (!i.plugins.Autoplay || n < 2)) return null;
                if (void 0 !== Vt[t]) {
                    const e = Vt[t];
                    s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), P(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), s.appendChild(l(this.instance.localize(e.icon)))
                } else {
                    const e = (this.option("items") || [])[t];
                    e && (s = l(this.instance.localize(e.tpl)), "function" == typeof e.click && s.addEventListener("click", (t => {
                        t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click.call(this, this, t)
                    })))
                }
                const a = null == s ? void 0 : s.querySelector("svg");
                if (a)
                    for (const [t, e] of Object.entries(Gt)) a.getAttribute(t) || a.setAttribute(t, String(e));
                return s
            }
            removeContainer() {
                const t = this.container;
                t && t.remove(), this.container = null, this.state = Qt.Disabled;
                const e = this.instance.container;
                e && O(e, Kt)
            }
            attach() {
                const t = this,
                    e = t.instance;
                e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on(["reveal", "Carousel.change"], t.onChange), t.onReady(t.instance)
            }
            detach() {
                const t = this,
                    e = t.instance;
                e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off(["reveal", "Carousel.change"], t.onChange), t.removeContainer()
            }
        }
        Object.defineProperty(Jt, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: {
                absolute: "auto",
                display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"]
                },
                enabled: "auto",
                items: {
                    infobar: {
                        tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
                    },
                    download: {
                        tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
                    },
                    prev: {
                        tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
                    },
                    next: {
                        tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
                    },
                    slideshow: {
                        tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
                    },
                    fullscreen: {
                        tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
                    },
                    thumbs: {
                        tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
                    },
                    close: {
                        tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
                    }
                },
                parentEl: null
            }
        });
        const te = {
            Hash: class extends W {
                onReady() {
                    ut = !1
                }
                onChange(t) {
                    ft && clearTimeout(ft);
                    const {
                        hash: e
                    } = mt(), {
                        hash: i
                    } = gt(), s = t.isOpeningSlide(t.getSlide());
                    s && (ht = i === e ? "" : i), e && e !== i && (ft = setTimeout((() => {
                        try {
                            if (t.state === ct.Ready) {
                                let t = "replaceState";
                                s && !pt && (t = "pushState", pt = !0), window.history[t]({}, document.title, window.location.pathname + window.location.search + e)
                            }
                        } catch (t) { }
                    }), 300))
                }
                onClose(t) {
                    if (ft && clearTimeout(ft), !ut && pt) return pt = !1, ut = !1, void window.history.back();
                    if (!ut) try {
                        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (ht || ""))
                    } catch (t) { }
                }
                attach() {
                    const t = this.instance;
                    t.on("ready", this.onReady), t.on(["Carousel.ready", "Carousel.change"], this.onChange), t.on("close", this.onClose)
                }
                detach() {
                    const t = this.instance;
                    t.off("ready", this.onReady), t.off(["Carousel.ready", "Carousel.change"], this.onChange), t.off("close", this.onClose)
                }
                static parseURL() {
                    return gt()
                }
                static startFromUrl() {
                    vt()
                }
                static destroy() {
                    window.removeEventListener("hashchange", yt, !1)
                }
            },
            Html: Mt,
            Images: xt,
            Slideshow: Ht,
            Thumbs: Ut,
            Toolbar: Jt
        },
            ee = "with-fancybox",
            ie = "hide-scrollbar",
            se = "--fancybox-scrollbar-compensate",
            ne = "--fancybox-body-margin",
            oe = "aria-hidden",
            re = "is-using-tab",
            ae = "is-animated",
            le = "is-compact",
            ce = "is-loading",
            de = "is-opening",
            he = "has-caption",
            ue = "disabled",
            pe = "tabindex",
            fe = "download",
            me = "href",
            ge = "src",
            ve = t => "string" == typeof t,
            be = function () {
                var t = window.getSelection();
                return !!t && "Range" === t.type
            };
        let ye, we = null,
            Se = null,
            xe = 0,
            Ce = 0,
            ke = 0,
            Te = 0;
        const Ee = new Map;
        let Ae = 0;
        class Oe extends w {
            get isIdle() {
                return this.idle
            }
            get isCompact() {
                return this.option("compact")
            }
            constructor(t = [], e = {}, i = {}) {
                super(e), Object.defineProperty(this, "userSlides", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "userPlugins", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }), Object.defineProperty(this, "idle", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "idleTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "clickTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "pwt", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "ignoreFocusChange", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "startedFs", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: ct.Init
                }), Object.defineProperty(this, "id", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "caption", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "footer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "carousel", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "lastFocus", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "prevMouseMoveEvent", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), ye || (ye = at()), this.id = e.id || ++Ae, Ee.set(this.id, this), this.userSlides = t, this.userPlugins = i, queueMicrotask((() => {
                    this.init()
                }))
            }
            init() {
                if (this.state === ct.Destroy) return;
                this.state = ct.Init, this.attachPlugins(Object.assign(Object.assign({}, Oe.Plugins), this.userPlugins)), this.emit("init"), this.emit("attachPlugins"), !0 === this.option("hideScrollbar") && (() => {
                    if (!st) return;
                    const t = document,
                        e = t.body,
                        i = t.documentElement;
                    if (e.classList.contains(ie)) return;
                    let s = window.innerWidth - i.getBoundingClientRect().width;
                    const n = parseFloat(window.getComputedStyle(e).marginRight);
                    s < 0 && (s = 0), i.style.setProperty(se, `${s}px`), n && e.style.setProperty(ne, `${n}px`), e.classList.add(ie)
                })(), this.initLayout(), this.scale();
                const t = () => {
                    this.initCarousel(this.userSlides), this.state = ct.Ready, this.attachEvents(), this.emit("ready"), setTimeout((() => {
                        this.container && this.container.setAttribute(oe, "false")
                    }), 16)
                };
                this.option("Fullscreen.autoStart") && ye && !ye.isFullscreen() ? ye.request().then((() => {
                    this.startedFs = !0, t()
                })).catch((() => t())) : t()
            }
            initLayout() {
                var t, e;
                const i = this.option("parentEl") || document.body,
                    s = l(this.localize(this.option("tpl.main") || ""));
                if (s) {
                    if (s.setAttribute("id", `fancybox-${this.id}`), s.setAttribute("aria-label", this.localize("{{MODAL}}")), s.classList.toggle(le, this.isCompact), P(s, this.option("mainClass") || ""), P(s, de), this.container = s, this.footer = s.querySelector(".fancybox__footer"), i.appendChild(s), P(document.documentElement, ee), we && Se || (we = document.createElement("span"), P(we, "fancybox-focus-guard"), we.setAttribute(pe, "0"), we.setAttribute(oe, "true"), we.setAttribute("aria-label", "Focus guard"), Se = we.cloneNode(), null === (t = s.parentElement) || void 0 === t || t.insertBefore(we, s), null === (e = s.parentElement) || void 0 === e || e.append(Se)), s.addEventListener("mousedown", (t => {
                        xe = t.pageX, Ce = t.pageY, O(s, re)
                    })), this.option("closeExisting"))
                        for (const t of Ee.values()) t.id !== this.id && t.close();
                    else this.option("animated") && (P(s, ae), setTimeout((() => {
                        this.isClosing() || O(s, ae)
                    }), 350));
                    this.emit("initLayout")
                }
            }
            initCarousel(t) {
                const e = this.container;
                if (!e) return;
                const i = e.querySelector(".fancybox__carousel");
                if (!i) return;
                const s = this.carousel = new et(i, v({}, {
                    slides: t,
                    transition: "fade",
                    Panzoom: {
                        lockAxis: this.option("dragToClose") ? "xy" : "x",
                        infinite: !!this.option("dragToClose") && "y"
                    },
                    Dots: !1,
                    Navigation: {
                        classes: {
                            container: "fancybox__nav",
                            button: "f-button",
                            isNext: "is-next",
                            isPrev: "is-prev"
                        }
                    },
                    initialPage: this.option("startIndex"),
                    l10n: this.option("l10n")
                }, this.option("Carousel") || {}));
                s.on("*", ((t, e, ...i) => {
                    this.emit(`Carousel.${e}`, t, ...i)
                })), s.on(["ready", "change"], (() => {
                    this.manageCaption()
                })), this.on("Carousel.removeSlide", ((t, e, i) => {
                    this.clearContent(i), i.state = void 0
                })), s.on("Panzoom.touchStart", (() => {
                    var t, e;
                    this.isCompact || this.endIdle(), (null === (t = document.activeElement) || void 0 === t ? void 0 : t.closest(".f-thumbs")) && (null === (e = this.container) || void 0 === e || e.focus())
                })), s.on("settle", (() => {
                    this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus()
                })), this.option("dragToClose") && (s.on("Panzoom.afterTransform", ((t, e) => {
                    const i = this.getSlide();
                    if (i && r(i.el)) return;
                    const s = this.container;
                    if (s) {
                        const t = Math.abs(e.current.f),
                            i = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / e.contentRect.fitHeight * 1.5));
                        s.style.setProperty("--fancybox-ts", i ? "0s" : ""), s.style.setProperty("--fancybox-opacity", i + "")
                    }
                })), s.on("Panzoom.touchEnd", ((t, e, i) => {
                    var s;
                    const n = this.getSlide();
                    if (n && r(n.el)) return;
                    if (e.isMobile && document.activeElement && -1 !== ["TEXTAREA", "INPUT"].indexOf(null === (s = document.activeElement) || void 0 === s ? void 0 : s.nodeName)) return;
                    const o = Math.abs(e.dragOffset.y);
                    "y" === e.lockedAxis && (o >= 200 || o >= 50 && e.dragOffset.time < 300) && (i && i.cancelable && i.preventDefault(), this.close(i, "f-throwOut" + (e.current.f < 0 ? "Up" : "Down")))
                }))), s.on("change", (t => {
                    var e;
                    let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
                    if (i) {
                        const e = new CustomEvent("slideTo", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: t.page
                        });
                        i.dispatchEvent(e)
                    }
                })), s.on(["refresh", "change"], (t => {
                    const e = this.container;
                    if (!e) return;
                    for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
                    for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
                    if (!t.isInfinite) {
                        for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute(ue), i.removeAttribute(pe)) : (i.setAttribute(ue, ""), i.setAttribute(pe, "-1"));
                        for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute(ue), i.removeAttribute(pe)) : (i.setAttribute(ue, ""), i.setAttribute(pe, "-1"))
                    }
                    const i = this.getSlide();
                    if (!i) return;
                    let s = i.downloadSrc || "";
                    s || "image" !== i.type || i.error || !ve(i[ge]) || (s = i[ge]);
                    for (const t of e.querySelectorAll("[data-fancybox-download]")) {
                        const e = i.downloadFilename;
                        s ? (t.removeAttribute(ue), t.removeAttribute(pe), t.setAttribute(me, s), t.setAttribute(fe, e || s), t.setAttribute("target", "_blank")) : (t.setAttribute(ue, ""), t.setAttribute(pe, "-1"), t.removeAttribute(me), t.removeAttribute(fe))
                    }
                })), this.emit("initCarousel")
            }
            attachEvents() {
                const t = this,
                    e = t.container;
                if (!e) return;
                e.addEventListener("click", t.onClick, {
                    passive: !1,
                    capture: !1
                }), e.addEventListener("wheel", t.onWheel, {
                    passive: !1,
                    capture: !1
                }), document.addEventListener("keydown", t.onKeydown, {
                    passive: !1,
                    capture: !0
                }), document.addEventListener("visibilitychange", t.onVisibilityChange, !1), document.addEventListener("mousemove", t.onMousemove), t.option("trapFocus") && document.addEventListener("focus", t.onFocus, !0), window.addEventListener("resize", t.onResize);
                const i = window.visualViewport;
                i && (i.addEventListener("scroll", t.onResize), i.addEventListener("resize", t.onResize))
            }
            detachEvents() {
                const t = this,
                    e = t.container;
                if (!e) return;
                document.removeEventListener("keydown", t.onKeydown, {
                    passive: !1,
                    capture: !0
                }), e.removeEventListener("wheel", t.onWheel, {
                    passive: !1,
                    capture: !1
                }), e.removeEventListener("click", t.onClick, {
                    passive: !1,
                    capture: !1
                }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
                const i = window.visualViewport;
                i && (i.removeEventListener("resize", t.onResize), i.removeEventListener("scroll", t.onResize)), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), document.removeEventListener("focus", t.onFocus, !0)
            }
            scale() {
                const t = this.container;
                if (!t) return;
                const e = window.visualViewport,
                    i = Math.max(1, (null == e ? void 0 : e.scale) || 1);
                let s = "",
                    n = "",
                    o = "";
                if (e && i > 1) {
                    let t = `${e.offsetLeft}px`,
                        r = `${e.offsetTop}px`;
                    s = e.width * i + "px", n = e.height * i + "px", o = `translate3d(${t}, ${r}, 0) scale(${1 / i})`
                }
                t.style.transform = o, t.style.width = s, t.style.height = n
            }
            onClick(t) {
                var e;
                const {
                    container: i,
                    isCompact: s
                } = this;
                if (!i || this.isClosing()) return;
                !s && this.option("idle") && this.resetIdle();
                const n = t.composedPath()[0];
                if (n.closest(".fancybox-spinner") || n.closest("[data-fancybox-close]")) return t.preventDefault(), void this.close(t);
                if (n.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
                if (n.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
                if ("click" === t.type && 0 === t.detail) return;
                if (Math.abs(t.pageX - xe) > 30 || Math.abs(t.pageY - Ce) > 30) return;
                const o = document.activeElement;
                if (be() && o && i.contains(o)) return;
                if (s && "image" === (null === (e = this.getSlide()) || void 0 === e ? void 0 : e.type)) return void (this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout((() => {
                    this.toggleIdle(), this.clickTimer = null
                }), 350));
                if (this.emit("click", t), t.defaultPrevented) return;
                let r = !1;
                if (n.closest(".fancybox__content")) {
                    if (o) {
                        if (o.closest("[contenteditable]")) return;
                        n.matches(ot) || o.blur()
                    }
                    if (be()) return;
                    r = this.option("contentClick")
                } else n.closest(".fancybox__carousel") && !n.matches(ot) && (r = this.option("backdropClick"));
                "close" === r ? (t.preventDefault(), this.close(t)) : "next" === r ? (t.preventDefault(), this.next()) : "prev" === r && (t.preventDefault(), this.prev())
            }
            onWheel(t) {
                const e = t.target;
                let i = this.option("wheel", t);
                e.closest(".fancybox__thumbs") && (i = "slide");
                const s = "slide" === i,
                    n = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce((function (t, e) {
                        return Math.abs(e) > Math.abs(t) ? e : t
                    })),
                    o = Math.max(-1, Math.min(1, n)),
                    r = Date.now();
                this.pwt && r - this.pwt < 300 ? s && t.preventDefault() : (this.pwt = r, this.emit("wheel", t, o), t.defaultPrevented || ("close" === i ? (t.preventDefault(), this.close(t)) : "slide" === i && (a(e) || (t.preventDefault(), this[o > 0 ? "prev" : "next"]()))))
            }
            onScroll() {
                window.scrollTo(ke, Te)
            }
            onKeydown(t) {
                if (!this.isTopmost()) return;
                this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
                const e = t.key,
                    i = this.option("keyboard");
                if (!i) return;
                const s = t.composedPath()[0],
                    n = document.activeElement && document.activeElement.classList,
                    o = n && n.contains("f-button") || s.dataset.carouselPage || s.dataset.carouselIndex;
                if ("Escape" !== e && !o && A(s) && (s.isContentEditable || -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(s.nodeName))) return;
                if ("Tab" === t.key ? P(this.container, re) : O(this.container, re), t.ctrlKey || t.altKey || t.shiftKey) return;
                this.emit("keydown", e, t);
                const r = i[e];
                r && "function" == typeof this[r] && (t.preventDefault(), this[r]())
            }
            onResize() {
                const t = this.container;
                if (!t) return;
                const e = this.isCompact;
                t.classList.toggle(le, e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.scale(), this.emit("resize")
            }
            onFocus(t) {
                this.isTopmost() && this.checkFocus(t)
            }
            onMousemove(t) {
                this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle()
            }
            onVisibilityChange() {
                "visible" === document.visibilityState ? this.checkFocus() : this.endIdle()
            }
            manageCloseBtn(t) {
                const e = this.optionFor(t, "closeButton") || !1;
                if ("auto" === e) {
                    const t = this.plugins.Toolbar;
                    if (t && t.state === Qt.Ready) return
                }
                if (!e) return;
                if (!t.contentEl || t.closeBtnEl) return;
                const i = this.option("tpl.closeButton");
                if (i) {
                    const e = l(this.localize(i));
                    t.closeBtnEl = t.contentEl.appendChild(e), t.el && P(t.el, "has-close-btn")
                }
            }
            manageCaption(t = void 0) {
                var e, i;
                const s = "fancybox__caption",
                    n = this.container;
                if (!n) return;
                O(n, he);
                const o = this.isCompact || this.option("commonCaption"),
                    r = !o;
                if (this.caption && this.stop(this.caption), r && this.caption && (this.caption.remove(), this.caption = null), o && !this.caption)
                    for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), t.captionEl = void 0, O(t.el, he), null === (i = t.el) || void 0 === i || i.removeAttribute("aria-labelledby"));
                if (t || (t = this.getSlide()), !t || o && !this.isCurrentSlide(t)) return;
                const a = t.el;
                let l = this.optionFor(t, "caption", "");
                if (!l) return void (o && this.caption && this.animate(this.caption, "f-fadeOut", (() => {
                    this.caption && (this.caption.innerHTML = "")
                })));
                let c = null;
                if (r) {
                    if (c = t.captionEl || null, a && !c) {
                        const e = s + `_${this.id}_${t.index}`;
                        c = document.createElement("div"), P(c, s), c.setAttribute("id", e), t.captionEl = a.appendChild(c), P(a, he), a.setAttribute("aria-labelledby", e)
                    }
                } else c = this.caption, c || (c = n.querySelector("." + s)), c || (c = document.createElement("div"), c.dataset.fancyboxCaption = "", P(c, s), (this.footer || n).prepend(c)), P(n, he), this.caption = c;
                c && (c.innerHTML = "", ve(l) || "number" == typeof l ? c.innerHTML = l + "" : l instanceof HTMLElement && c.appendChild(l))
            }
            checkFocus(t) {
                this.focus(t)
            }
            focus(t) {
                var e;
                if (this.ignoreFocusChange) return;
                const i = document.activeElement || null,
                    s = (null == t ? void 0 : t.target) || null,
                    n = this.container,
                    o = null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport;
                if (!n || !o) return;
                if (!t && i && n.contains(i)) return;
                const r = this.getSlide(),
                    a = r && r.state === dt.Ready ? r.el : null;
                if (!a || a.contains(i) || n === i) return;
                t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
                const l = Array.from(n.querySelectorAll(ot));
                let c = [],
                    d = null;
                for (let t of l) {
                    const e = !t.offsetParent || !!t.closest('[aria-hidden="true"]'),
                        i = a && a.contains(t),
                        s = !o.contains(t);
                    if (t === n || (i || s) && !e) {
                        c.push(t);
                        const e = t.dataset.origTabindex;
                        void 0 !== e && e && (t.tabIndex = parseFloat(e)), t.removeAttribute("data-orig-tabindex"), !t.hasAttribute("autoFocus") && d || (d = t)
                    } else {
                        const e = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || "" : t.dataset.origTabindex;
                        e && (t.dataset.origTabindex = e), t.tabIndex = -1
                    }
                }
                let h = null;
                t ? (!s || c.indexOf(s) < 0) && (h = d || n, c.length && (i === Se ? h = c[0] : this.lastFocus !== n && i !== we || (h = c[c.length - 1]))) : h = r && "image" === r.type ? n : d || n, h && rt(h), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1
            }
            next() {
                const t = this.carousel;
                t && t.pages.length > 1 && t.slideNext()
            }
            prev() {
                const t = this.carousel;
                t && t.pages.length > 1 && t.slidePrev()
            }
            jumpTo(...t) {
                this.carousel && this.carousel.slideTo(...t)
            }
            isTopmost() {
                var t;
                return (null === (t = Oe.getInstance()) || void 0 === t ? void 0 : t.id) == this.id
            }
            animate(t = null, e = "", i) {
                if (!t || !e) return void (i && i());
                this.stop(t);
                const s = n => {
                    n.target === t && t.dataset.animationName && (t.removeEventListener("animationend", s), delete t.dataset.animationName, i && i(), O(t, e))
                };
                t.dataset.animationName = e, t.addEventListener("animationend", s), P(t, e)
            }
            stop(t) {
                t && t.dispatchEvent(new CustomEvent("animationend", {
                    bubbles: !1,
                    cancelable: !0,
                    currentTarget: t
                }))
            }
            setContent(t, e = "", i = !0) {
                if (this.isClosing()) return;
                const s = t.el;
                if (!s) return;
                let n = null;
                if (A(e) ? n = e : (n = l(e + ""), A(n) || (n = document.createElement("div"), n.innerHTML = e + "")), ["img", "picture", "iframe", "video", "audio"].includes(n.nodeName.toLowerCase())) {
                    const t = document.createElement("div");
                    t.appendChild(n), n = t
                }
                A(n) && t.filter && !t.error && (n = n.querySelector(t.filter)), n && A(n) ? (P(n, "fancybox__content"), t.id && n.setAttribute("id", t.id), s.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`), s.prepend(n), "none" === n.style.display && (n.style.display = ""), "none" === getComputedStyle(n).getPropertyValue("display") && (n.style.display = t.display || this.option("defaultDisplay") || "flex"), t.contentEl = n, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            revealContent(t, e) {
                const i = t.el,
                    s = t.contentEl;
                i && s && (this.emit("reveal", t), this.hideLoading(t), t.state = dt.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(s, e, (() => {
                    this.done(t)
                })) : this.done(t))
            }
            done(t) {
                this.isClosing() || (t.state = dt.Ready, this.emit("done", t), P(t.el, "is-done"), this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask((() => {
                    var e;
                    null === (e = t.panzoom) || void 0 === e || e.updateControls(), this.option("autoFocus") && this.focus()
                })), this.isOpeningSlide(t) && (O(this.container, de), !this.isCompact && this.option("idle") && this.setIdle()))
            }
            isCurrentSlide(t) {
                const e = this.getSlide();
                return !(!t || !e) && e.index === t.index
            }
            isOpeningSlide(t) {
                var e, i;
                return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index)
            }
            showLoading(t) {
                t.state = dt.Loading;
                const e = t.el;
                e && (P(e, ce), this.emit("loading", t), t.spinnerEl || setTimeout((() => {
                    if (!this.isClosing() && !t.spinnerEl && t.state === dt.Loading) {
                        let i = l(E);
                        P(i, "fancybox-spinner"), t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn")
                    }
                }), 250))
            }
            hideLoading(t) {
                const e = t.el;
                if (!e) return;
                const i = t.spinnerEl;
                this.isClosing() ? null == i || i.remove() : (O(e, ce), i && this.animate(i, "f-fadeOut", (() => {
                    i.remove()
                })), t.state === dt.Loading && (this.emit("loaded", t), t.state = dt.Ready))
            }
            setError(t, e) {
                if (this.isClosing()) return;
                const i = new Event("error", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("error", i, t), i.defaultPrevented) return;
                t.error = e, this.hideLoading(t), this.clearContent(t);
                const s = document.createElement("div");
                s.classList.add("fancybox-error"), s.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, s)
            }
            clearContent(t) {
                if (void 0 === t.state) return;
                this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
                const e = t.el;
                e && (O(e, "has-error"), O(e, "has-unknown"), O(e, `has-${t.type || "unknown"}`)), t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0
            }
            getSlide() {
                var t;
                const e = this.carousel;
                return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0
            }
            close(t, e) {
                if (this.isClosing()) return;
                const i = new Event("shouldClose", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
                t && t.cancelable && (t.preventDefault(), t.stopPropagation());
                const s = () => {
                    this.proceedClose(t, e)
                };
                this.startedFs && ye && ye.isFullscreen() ? Promise.resolve(ye.exit()).then((() => s())) : s()
            }
            clearIdle() {
                this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null
            }
            setIdle(t = !1) {
                const e = () => {
                    this.clearIdle(), this.idle = !0, P(this.container, "is-idle"), this.emit("setIdle")
                };
                if (this.clearIdle(), !this.isClosing())
                    if (t) e();
                    else {
                        const t = this.option("idle");
                        t && (this.idleTimer = setTimeout(e, t))
                    }
            }
            endIdle() {
                this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, O(this.container, "is-idle"), this.emit("endIdle"))
            }
            resetIdle() {
                this.endIdle(), this.setIdle()
            }
            toggleIdle() {
                this.idle ? this.endIdle() : this.setIdle(!0)
            }
            toggleFullscreen() {
                ye && (ye.isFullscreen() ? ye.exit() : ye.request().then((() => {
                    this.startedFs = !0
                })))
            }
            isClosing() {
                return [ct.Closing, ct.CustomClosing, ct.Destroy].includes(this.state)
            }
            proceedClose(t, e) {
                var i, s;
                this.state = ct.Closing, this.clearIdle(), this.detachEvents();
                const n = this.container,
                    o = this.carousel,
                    r = this.getSlide(),
                    a = r && this.option("placeFocusBack") ? r.triggerEl || this.option("triggerEl") : null;
                if (a && (it(a) ? rt(a) : a.focus()), n && (O(n, de), P(n, "is-closing"), n.setAttribute(oe, "true"), this.option("animated") && P(n, ae), n.style.pointerEvents = "none"), o) {
                    o.clearTransitions(), null === (i = o.panzoom) || void 0 === i || i.destroy(), null === (s = o.plugins.Navigation) || void 0 === s || s.detach();
                    for (const t of o.slides) {
                        t.state = dt.Closing, this.hideLoading(t);
                        const e = t.contentEl;
                        e && this.stop(e);
                        const i = null == t ? void 0 : t.panzoom;
                        i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t)
                    }
                }
                ke = window.scrollX, Te = window.scrollY, window.addEventListener("scroll", this.onScroll), this.emit("close", t), this.state !== ct.CustomClosing ? (void 0 === e && r && (e = this.optionFor(r, "hideClass")), e && r ? (this.animate(r.contentEl, e, (() => {
                    o && o.emit("removeSlide", r)
                })), setTimeout((() => {
                    this.destroy()
                }), 500)) : this.destroy()) : setTimeout((() => {
                    this.destroy()
                }), 500)
            }
            destroy() {
                var t;
                if (this.state === ct.Destroy) return;
                window.removeEventListener("scroll", this.onScroll), this.state = ct.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
                const e = this.container;
                e && e.remove(), Ee.delete(this.id);
                const i = Oe.getInstance();
                i ? i.focus() : (we && (we.remove(), we = null), Se && (Se.remove(), Se = null), O(document.documentElement, ee), (() => {
                    if (!st) return;
                    const t = document,
                        e = t.body;
                    e.classList.remove(ie), e.style.setProperty(ne, ""), t.documentElement.style.setProperty(se, "")
                })(), this.emit("destroy"))
            }
            static bind(t, e, i) {
                if (!st) return;
                let s, n = "",
                    o = {};
                if (void 0 === t ? s = document.body : ve(t) ? (s = document.body, n = t, "object" == typeof e && (o = e || {})) : (s = t, ve(e) && (n = e), "object" == typeof i && (o = i || {})), !s || !A(s)) return;
                n = n || "[data-fancybox]";
                const r = Oe.openers.get(s) || new Map;
                r.set(n, o), Oe.openers.set(s, r), 1 === r.size && s.addEventListener("click", Oe.fromEvent)
            }
            static unbind(t, e) {
                let i, s = "";
                if (ve(t) ? (i = document.body, s = t) : (i = t, ve(e) && (s = e)), !i) return;
                const n = Oe.openers.get(i);
                n && s && n.delete(s), s && n || (Oe.openers.delete(i), i.removeEventListener("click", Oe.fromEvent))
            }
            static destroy() {
                let t;
                for (; t = Oe.getInstance();) t.destroy();
                for (const t of Oe.openers.keys()) t.removeEventListener("click", Oe.fromEvent);
                Oe.openers = new Map
            }
            static fromEvent(t) {
                if (t.defaultPrevented) return;
                if (t.button && 0 !== t.button) return;
                if (t.ctrlKey || t.metaKey || t.shiftKey) return;
                let e = t.composedPath()[0];
                const i = e.closest("[data-fancybox-trigger]");
                if (i) {
                    const t = i.dataset.fancyboxTrigger || "",
                        s = document.querySelectorAll(`[data-fancybox="${t}"]`),
                        n = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
                    e = s[n] || e
                }
                if (!(e && e instanceof Element)) return;
                let s, n, o, r;
                if ([...Oe.openers].reverse().find((([t, i]) => !(!t.contains(e) || ![...i].reverse().find((([i, a]) => {
                    let l = e.closest(i);
                    return !!l && (s = t, n = i, o = l, r = a, !0)
                }))))), !s || !n || !o) return;
                r = r || {}, t.preventDefault(), e = o;
                let a = [],
                    l = v({}, lt, r);
                l.event = t, l.triggerEl = e, l.delegate = i;
                const c = l.groupAll,
                    d = l.groupAttr,
                    h = d && e ? e.getAttribute(`${d}`) : "";
                if ((!e || h || c) && (a = [].slice.call(s.querySelectorAll(n))), e && !c && (a = h ? a.filter((t => t.getAttribute(`${d}`) === h)) : [e]), !a.length) return;
                const u = Oe.getInstance();
                return u && u.options.triggerEl && a.indexOf(u.options.triggerEl) > -1 ? void 0 : (e && (l.startIndex = a.indexOf(e)), Oe.fromNodes(a, l))
            }
            static fromSelector(t, e, i) {
                let s = null,
                    n = "",
                    o = {};
                if (ve(t) ? (s = document.body, n = t, "object" == typeof e && (o = e || {})) : t instanceof HTMLElement && ve(e) && (s = t, n = e, "object" == typeof i && (o = i || {})), !s || !n) return !1;
                const r = Oe.openers.get(s);
                return !!r && (o = v({}, r.get(n) || {}, o), !!o && Oe.fromNodes(Array.from(s.querySelectorAll(n)), o))
            }
            static fromNodes(t, e) {
                e = v({}, lt, e || {});
                const i = [];
                for (const s of t) {
                    const t = s.dataset || {},
                        n = t[ge] || s.getAttribute(me) || s.getAttribute("currentSrc") || s.getAttribute(ge) || void 0;
                    let o;
                    const r = e.delegate;
                    let a;
                    r && i.length === e.startIndex && (o = r instanceof HTMLImageElement ? r : r.querySelector("img:not([aria-hidden])")), o || (o = s instanceof HTMLImageElement ? s : s.querySelector("img:not([aria-hidden])")), o && (a = o.currentSrc || o[ge] || void 0, !a && o.dataset && (a = o.dataset.lazySrc || o.dataset[ge] || void 0));
                    const l = {
                        src: n,
                        triggerEl: s,
                        thumbEl: o,
                        thumbElSrc: a,
                        thumbSrc: a
                    };
                    for (const e in t) {
                        let i = t[e] + "";
                        i = "false" !== i && ("true" === i || i), l[e] = i
                    }
                    i.push(l)
                }
                return new Oe(i, e)
            }
            static getInstance(t) {
                return t ? Ee.get(t) : Array.from(Ee.values()).reverse().find((t => !t.isClosing() && t)) || null
            }
            static getSlide() {
                var t;
                return (null === (t = Oe.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null
            }
            static show(t = [], e = {}) {
                return new Oe(t, e)
            }
            static next() {
                const t = Oe.getInstance();
                t && t.next()
            }
            static prev() {
                const t = Oe.getInstance();
                t && t.prev()
            }
            static close(t = !0, ...e) {
                if (t)
                    for (const t of Ee.values()) t.close(...e);
                else {
                    const t = Oe.getInstance();
                    t && t.close(...e)
                }
            }
        }
        Object.defineProperty(Oe, "version", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "5.0.36"
        }), Object.defineProperty(Oe, "defaults", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: lt
        }), Object.defineProperty(Oe, "Plugins", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: te
        }), Object.defineProperty(Oe, "openers", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: new Map
        });
        i(6);
        i(8);
        i(9);
        i(10);
        i(11);
        i(12);
        class Pe {
            constructor(t) {
                let e = "Menubar constructor argument menubarNode ",
                    i = t.navHold,
                    s = t.dropSelector;
                if (!i instanceof Element) throw new TypeError(e + "is not a DOM Element.");
                if (0 === i.childElementCount) throw new Error(e + "has no element children.");
                let n = i.firstElementChild;
                for (; n;) {
                    let t = n.firstElementChild;
                    if (n && t && "A" !== t.tagName) throw new Error(e + "has child elements are not A elements.");
                    n = n.nextElementSibling
                }
                this.isMenubar = !0, this.domNode = i, this.dropSelector = s, this.breakpoint = t.breakpoint || "768px", this.menubarItems = [], this.firstChars = [], this.firstItem = null, this.lastItem = null, this.hasFocus = !1, this.hasHover = !1, this.init()
            }
            init() {
                let t, e, i, s, n = this.domNode.firstElementChild;
                Array.from(document.querySelectorAll(`button:not([disabled]), a:not(.btn-back), a:not(${this.dropSelector} a):not([disabled]), [href]:not(${this.dropSelector} [href]), input, select, textarea, [tabindex]:not([tabindex="-1"])`));
                for (; n;) e = n.firstElementChild, n && e && "A" === e.tagName && (t = new $e(e, this), t.init(), this.menubarItems.push(t), i = e.textContent.trim(), this.firstChars.push(i.substring(0, 1).toLowerCase())), n = n.nextElementSibling;
                s = this.menubarItems.length, s > 0 && (this.firstItem = this.menubarItems[0], this.lastItem = this.menubarItems[s - 1]), this.blurElem = document.querySelector(".get-help-hold > a")
            }
            setFocusToItem(t) {
                let e = !1;
                for (let t = 0; t < this.menubarItems.length; t++) {
                    let i = this.menubarItems[t];
                    0 === i.domNode.tabIndex && (e = "true" === i.domNode.getAttribute("aria-expanded")), i.popupMenu && i.popupMenu.close()
                }
                t.domNode.focus(), e && t.popupMenu && t.popupMenu.open()
            }
            setFocusToFirstItem() {
                this.setFocusToItem(this.firstItem)
            }
            setFocusToLastItem() {
                this.setFocusToItem(this.lastItem)
            }
            setFocusToPreviousItem(t) {
                let e, i;
                t === this.firstItem ? i = this.lastItem : (e = this.menubarItems.indexOf(t), i = this.menubarItems[e - 1]), this.setFocusToItem(i)
            }
            setFocusToNextItem(t, e) {
                let i, s;
                e && t === this.lastItem ? setTimeout((() => {
                    this.blurElem.focus()
                }), 0) : (t === this.lastItem ? s = this.firstItem : (i = this.menubarItems.indexOf(t), s = this.menubarItems[i + 1]), this.setFocusToItem(s))
            }
            setFocusByFirstCharacter(t, e) {
                let i, s, n = e.toLowerCase();
                t.domNode.getAttribute("aria-expanded");
                i = this.menubarItems.indexOf(t) + 1, i === this.menubarItems.length && (i = 0), s = this.getIndexFirstChars(i, n), -1 === s && (s = this.getIndexFirstChars(0, n)), s > -1 && this.setFocusToItem(this.menubarItems[s])
            }
            getIndexFirstChars(t, e) {
                for (let i = t; i < this.firstChars.length; i++)
                    if (e === this.firstChars[i]) return i;
                return -1
            }
        }
        class $e {
            constructor(t, e) {
                this.menu = e, this.domNode = t, this.popupMenu = !1, this.hasFocus = !1, this.hasHover = !1, this.isMenubarItem = !0
            }
            init() {
                this.keyDownHandler = this.handleKeydown.bind(this), this.clickHandler = this.handleClick.bind(this), this.focusHandler = this.handleFocus.bind(this), this.blurHandler = this.handleBlur.bind(this), this.mouseoverHandler = this.handleMouseover.bind(this), this.mouseoutHandler = this.handleMouseout.bind(this), this.touchHandler = this.handleTouch.bind(this);
                let t = this.getDropdown(this.domNode);
                t && (this.popupMenu = new Le(t, this), this.popupMenu.init());
                const e = window.matchMedia(`(min-width: ${this.menu.breakpoint})`);

                function i(e) {
                    e.matches ? (this.domNode.addEventListener("keydown", this.keyDownHandler), this.domNode.addEventListener("click", this.clickHandler), this.domNode.addEventListener("focus", this.focusHandler), this.domNode.addEventListener("blur", this.blurHandler), t && (this.domNode.addEventListener("mouseover", this.mouseoverHandler), this.domNode.addEventListener("mouseout", this.mouseoutHandler), this.domNode.addEventListener("touchend", this.touchHandler), this.domNode.setAttribute("aria-haspopup", "true"), this.domNode.setAttribute("aria-expanded", "false"))) : (this.domNode.removeEventListener("keydown", this.keyDownHandler), this.domNode.removeEventListener("click", this.clickHandler), this.domNode.removeEventListener("focus", this.focusHandler), this.domNode.removeEventListener("blur", this.blurHandler), this.domNode.tabIndex = "", t && (this.domNode.removeEventListener("mouseover", this.mouseoverHandler), this.domNode.removeEventListener("mouseout", this.mouseoutHandler), this.domNode.removeEventListener("touchend", this.touchHandler), this.domNode.removeAttribute("aria-haspopup"), this.domNode.removeAttribute("aria-expanded")))
                }
                e.addEventListener("change", i.bind(this)), i.bind(this)(e)
            }
            getDropdown(t) {
                let e = t.nextElementSibling;
                for (; e;) {
                    if ("UL" === e.tagName) return e;
                    if ("DIV" === e.tagName) return e;
                    e = e.nextElementSibling
                }
            }
            handleKeydown(t) {
                let e = t.key,
                    i = !1;
                switch ("Tab" === e && t.shiftKey && (e = "ShiftTab"), e) {
                    case " ":
                    case "Down":
                    case "ArrowDown":
                        this.popupMenu && (this.popupMenu.open(), this.popupMenu.setFocusToFirstItem(), i = !0);
                        break;
                    case "Left":
                    case "ArrowLeft":
                        this.menu.setFocusToPreviousItem(this), i = !0;
                        break;
                    case "Right":
                    case "ArrowRight":
                        this.menu.setFocusToNextItem(this), i = !0;
                        break;
                    case "Up":
                    case "ArrowUp":
                        this.popupMenu && (this.popupMenu.open(), this.popupMenu.setFocusToLastItem(), i = !0);
                        break;
                    case "Home":
                    case "PageUp":
                        this.menu.setFocusToFirstItem(), i = !0;
                        break;
                    case "End":
                    case "PageDown":
                        this.menu.setFocusToLastItem(), i = !0;
                        break;
                    case "Tab":
                        const s = t.target === this.menu.lastItem.domNode;
                        this.menu.setFocusToNextItem(this, s), i = !0;
                        break;
                    case "Esc":
                    case "Escape":
                        this.popupMenu.close(!0);
                        break;
                    default:
                        (function (t) {
                            return 1 === t.length && t.match(/\S/)
                        })(e) && (this.menu.setFocusByFirstCharacter(this, e), i = !0)
                }
                i && (t.stopPropagation(), t.preventDefault())
            }
            setExpanded(t) {
                t ? this.domNode.setAttribute("aria-expanded", "true") : this.domNode.setAttribute("aria-expanded", "false")
            }
            handleFocus() {
                this.menu.hasFocus = !0
            }
            handleBlur() {
                this.menu.hasFocus = !1
            }
            handleClick() {
                
                if (this.hasHover == true) {
                    this.hasHover = !0, this.popupMenu.close(!0);
                }
                else {
                    this.hasHover = !0, this.popupMenu.open();
                }
                
            }
            handleMouseover() {
                //this.hasHover = !0, this.popupMenu.open();
            }
            handleMouseout() {
                this.hasHover = !1, setTimeout(this.popupMenu.close.bind(this.popupMenu), 10)
            }
            handleTouch(t) {
                "false" === this.domNode.getAttribute("aria-expanded") && t.preventDefault(), this.popupMenu && (this.popupMenu.open(), this.popupMenu.setFocusToFirstItem())
            }
        }
        class Me {
            constructor(t, e, i) {
                this.domNode = t, this.menu = e, this.popupMenu = !1, this.isMenubarItem = !1, this.breakpoint = i
            }
            init() {
                this.keyDownHandler = this.handleKeydown.bind(this), this.focusHandler = this.handleFocus.bind(this), this.blurHandler = this.handleBlur.bind(this), this.mouseoverHandler = this.handleMouseover.bind(this), this.mouseoutHandler = this.handleMouseout.bind(this), this.touchHandler = this.handleTouch.bind(this);
                let t = this.getDropdown(this.domNode);
                t && (this.popupMenu = new Le(t, this), this.popupMenu.init());
                const e = window.matchMedia(`(min-width: ${this.breakpoint})`);

                function i(e) {
                    e.matches ? (this.domNode.addEventListener("keydown", this.keyDownHandler), this.domNode.addEventListener("focus", this.focusHandler), this.domNode.addEventListener("blur", this.blurHandler), this.domNode.addEventListener("mouseover", this.mouseoverHandler), this.domNode.addEventListener("mouseout", this.mouseoutHandler), this.domNode.addEventListener("touchend", this.touchHandler), t && (this.domNode.setAttribute("aria-haspopup", "true"), this.domNode.setAttribute("aria-expanded", "false"))) : (this.domNode.removeEventListener("keydown", this.keyDownHandler), this.domNode.removeEventListener("focus", this.focusHandler), this.domNode.removeEventListener("blur", this.blurHandler), this.domNode.removeEventListener("mouseover", this.mouseoverHandler), this.domNode.removeEventListener("mouseout", this.mouseoutHandler), this.domNode.removeEventListener("touchend", this.touchHandler), this.domNode.tabIndex = "", t && (this.domNode.removeAttribute("aria-haspopup"), this.domNode.removeAttribute("aria-expanded")))
                }
                e.addEventListener("change", i.bind(this)), i.bind(this)(e)
            }
            getDropdown(t) {
                let e = t.nextElementSibling;
                for (; e;) {
                    if ("UL" === e.tagName) return e;
                    if ("DIV" === e.tagName) return e;
                    e = e.nextElementSibling
                }
            }
            handleKeydown(t) {
                let e = t.key,
                    i = !1;
                switch ("Tab" === e && t.shiftKey && (e = "ShiftTab"), e) {
                    case " ":
                    case "Enter":
                        this.popupMenu && (this.popupMenu.open(), this.popupMenu.setFocusToFirstItem(), i = !0);
                        break;
                    case "ShiftTab":
                    case "Up":
                    case "ArrowUp":
                        this.menu.setFocusToPreviousItem(this), i = !0;
                        break;
                    case "Down":
                    case "Tab":
                    case "ArrowDown":
                        this.menu.setFocusToNextItem(this), i = !0;
                        break;
                    case "Left":
                    case "ArrowLeft":
                        this.menu.setFocusToController("previous", !0), this.menu.close(!0), i = !0;
                        break;
                    case "Right":
                    case "ArrowRight":
                        this.popupMenu ? (this.popupMenu.open(), this.popupMenu.setFocusToFirstItem()) : (this.menu.setFocusToController("next", !0), this.menu.close(!0)), i = !0;
                        break;
                    case "Home":
                    case "PageUp":
                        this.menu.setFocusToFirstItem(), i = !0;
                        break;
                    case "End":
                    case "PageDown":
                        this.menu.setFocusToLastItem(), i = !0;
                        break;
                    case "Esc":
                    case "Escape":
                        this.menu.setFocusToController(), this.menu.close(!0), i = !0;
                        break;
                    default:
                        (function (t) {
                            return 1 === t.length && t.match(/\S/)
                        })(e) && (this.menu.setFocusByFirstCharacter(this, e), i = !0)
                }
                i && (t.stopPropagation(), t.preventDefault())
            }
            setExpanded(t) {
                t ? this.domNode.setAttribute("aria-expanded", "true") : this.domNode.setAttribute("aria-expanded", "false")
            }
            handleFocus() {
                this.menu.hasFocus = !0
            }
            handleBlur() {
                this.menu.hasFocus = !1, setTimeout(this.menu.close.bind(this.menu), 10)
            }
            handleMouseover() {
                this.menu.hasHover = !0, this.menu.open(), this.popupMenu && (this.popupMenu.hasHover = !0, this.popupMenu.open())
            }
            handleMouseout() {
                this.popupMenu ? (this.popupMenu.hasHover = !1, this.popupMenu.close(!0)) : (this.menu.hasHover = !1, setTimeout(this.menu.close.bind(this.menu), 10))
            }
            handleTouch(t) {
                "false" === this.domNode.getAttribute("aria-expanded") && t.preventDefault(), this.popupMenu && (this.popupMenu.open(), this.popupMenu.setFocusToFirstItem())
            }
        }
        class Le {
            constructor(t, e) {
                let i = "PopupMenu constructor argument domNode ";
                if (!t instanceof Element) throw new TypeError(i + "is not a DOM Element.");
                if (0 === t.childElementCount) throw new Error(i + "has no element children.");
                let s = t.firstElementChild;
                for (; s;) {
                    let t = s.firstElementChild;
                    if (t && "A" === t) throw new Error(i + "has descendant elements that are not A elements.");
                    s = s.nextElementSibling
                }
                this.isMenubar = !1, this.domNode = t, this.controller = e, this.menuitems = [], this.firstChars = [], this.firstItem = null, this.lastItem = null, this.hasFocus = !1, this.hasHover = !1
            }
            init() {
                let t, e, i, s, n;
                const o = this.handleMouseover.bind(this),
                    r = this.handleMouseout.bind(this),
                    a = this.handleOutsideClick.bind(this),
                    l = this.domNode,
                    c = window.matchMedia(`(min-width: ${this.controller.menu.breakpoint})`);

                function d(t) {
                    t.matches ? (l.addEventListener("mouseover", o), l.addEventListener("mouseout", r), document.addEventListener("click", a)) : (l.removeEventListener("mouseover", o), l.removeEventListener("mouseout", r), document.removeEventListener("click", a))
                }
                if (c.addEventListener("change", d), d(c), "DIV" === this.domNode.tagName) {
                    const n = this.domNode.querySelectorAll("li, .brands-info-col");
                    for (let o = 0; o < n.length; o++)
                        if (t = n[o], e = t.firstElementChild, e && "A" === e.tagName) {
                            const t = this.controller.breakpoint || this.controller.menu.breakpoint || this.controller.menu.controller.menu.breakpoint;
                            i = new Me(e, this, t), i.init(), this.menuitems.push(i), s = e.textContent.trim(), this.firstChars.push(s.substring(0, 1).toLowerCase())
                        } const o = this.domNode.querySelectorAll(".link-arrow, .text-wrap > a");
                    for (let t = 0; t < o.length; t++)
                        if ("A" === o[t].tagName) {
                            const e = this.controller.breakpoint || this.controller.menu.breakpoint || this.controller.menu.controller.menu.breakpoint,
                                i = new Me(o[t], this, e);
                            i.init(), this.menuitems.push(i), s = o[t].textContent.trim(), this.firstChars.push(s.substring(0, 1).toLowerCase())
                        }
                } else
                    for (t = this.domNode.firstElementChild; t;) {
                        if (e = t.firstElementChild, e && "A" === e.tagName) {
                            const t = this.controller.breakpoint || this.controller.menu.breakpoint || this.controller.menu.controller.menu.breakpoint;
                            i = new Me(e, this, t), i.init(), this.menuitems.push(i), s = e.textContent.trim(), this.firstChars.push(s.substring(0, 1).toLowerCase())
                        }
                        t = t.nextElementSibling
                    }
                n = this.menuitems.length, n > 0 && (this.firstItem = this.menuitems[0], this.lastItem = this.menuitems[n - 1])
            }
            eventPath(t) {
                let e = t.composedPath && t.composedPath() || t.path,
                    i = t.target;
                if (null != e) return e.indexOf(window) < 0 ? e.concat(window) : e;
                if (i === window) return [window];
                return [i].concat(function t(e, i) {
                    i = i || [];
                    let s = e.parentNode;
                    return s ? t(s, i.concat(s)) : i
                }(i), window)
            }
            handleOutsideClick(t) {
                let e = this.eventPath(t),
                    i = !1;
                e.forEach((t => {
                    let e = t === this.holder;
                    if (e) return i = e, !1
                })), i || (this.hasHover = !1, setTimeout(this.close.bind(this), 1), this.controller.menu.close && this.controller.menu.close(!0), this.controller.hasFocus = !1)
            }
            handleMouseover() {
                this.hasHover = !0
            }
            handleMouseout() {
                this.hasHover = !1, setTimeout(this.close.bind(this), 10)
            }
            setFocusToController(t, e) {
                if ("string" != typeof t && (t = ""), "" !== t) {
                    if (this.controller.isMenubarItem) "previous" === t ? this.controller.menu.setFocusToPreviousItem(this.controller, e) : "next" === t && this.controller.menu.setFocusToNextItem(this.controller, e);
                    else if (this.controller.domNode.focus(), this.close(), "next" === t) {
                        let t = function (t, e) {
                            for (; t;) {
                                if (t.isMenubarItem) return t.domNode.focus(), t;
                                e && t.menu.close(!0), t.hasFocus = !1, t = t.menu.controller
                            }
                            return !1
                        }(this.controller, !1);
                        t && t.menu.setFocusToNextItem(t, e)
                    }
                } else this.controller && this.controller.domNode && this.controller.domNode.focus()
            }
            setFocusToFirstItem() {
                setTimeout((() => {
                    this.firstItem.domNode.focus()
                }), 100)
            }
            setFocusToLastItem() {
                this.lastItem.domNode.focus()
            }
            setFocusToPreviousItem(t) {
                let e;
                t === this.firstItem ? this.lastItem.domNode.focus() : (e = this.menuitems.indexOf(t), this.menuitems[e - 1].domNode.focus())
            }
            setFocusToNextItem(t) {
                let e;
                t === this.lastItem ? this.firstItem.domNode.focus() : (e = this.menuitems.indexOf(t), this.menuitems[e + 1].domNode.focus())
            }
            setFocusByFirstCharacter(t, e) {
                let i, s, n = e.toLowerCase();
                i = this.menuitems.indexOf(t) + 1, i === this.menuitems.length && (i = 0), s = this.getIndexFirstChars(i, n), -1 === s && (s = this.getIndexFirstChars(0, n)), s > -1 && this.menuitems[s].domNode.focus()
            }
            getIndexFirstChars(t, e) {
                for (let i = t; i < this.firstChars.length; i++)
                    if (e === this.firstChars[i]) return i;
                return -1
            }
            open() {
                this.domNode.classList.add("accessibility-drop-hover"), this.domNode.closest("li").classList.add("accessibility-hover"), this.controller.setExpanded(!0)
            }
            close(t) {
                let e = this.controller.hasHover,
                    i = this.hasFocus;
                for (let t = 0; t < this.menuitems.length; t++) {
                    let e = this.menuitems[t];
                    e.popupMenu && (i = i || e.popupMenu.hasFocus)
                }
                if (this.controller.isMenubarItem || (e = !1), t || !i && !this.hasHover && !e) {
                    const t = this.domNode.closest("li");
                    this.domNode.classList.remove("accessibility-drop-hover"), t.classList.remove("accessibility-hover"), this.controller.setExpanded(!1);
                    const e = this.domNode.querySelectorAll(".accessibility-hover");
                    e.length && e.forEach((t => {
                        t.classList.remove("accessibility-hover"), t.querySelector(".accessibility-drop-hover").classList.remove("accessibility-drop-hover"), t.querySelector('[aria-expanded="true"]').setAttribute("aria-expanded", "false")
                    }))
                }
            }
        }
        class De {
            constructor(t) {
                let {
                    wrap: e,
                    holder: i,
                    opener: s,
                    slide: n,
                    btnBack: o,
                    activeClass: r = "slide-opened",
                    dropActiveClass: a = "drop-active",
                    breakpoint: l = 0
                } = t;
                this.holder = i, this.wrap = i.closest(e), this.opener = s, this.slide = n, this.btnBack = o, this.activeClass = r, this.dropActiveClass = a, this.breakpoint = l, this.isOpened = !1, this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', this.init()
            }
            events() {
                this.handleClick = this.clickHandler.bind(this), this.handleKeyPress = this.keyPressHandler.bind(this), this.keyPressHandler = this.keyPress.bind(this), this.outsideClickHandler = this.outsideClick.bind(this)
            }
            init() {
                "string" == typeof this.holder && (this.holder = document.querySelector(this.holder)), this.slide = this.holder.querySelector(`:scope ${this.slide}`), this.opener = this.holder.querySelector(`:scope ${this.opener}`), this.btnBack = this.slide.querySelector(`:scope ${this.btnBack}`), this.holder.classList.contains(this.activeClass) && this.showSlide(), this.events();
                const t = window.matchMedia(`(min-width: ${this.breakpoint})`);

                function e(t) {
                    t.matches ? this.destroy() : (this.opener.setAttribute("aria-expanded", "false"), this.opener.setAttribute("aria-haspopup", "true"), this.opener.addEventListener("click", (t => {
                        this.handleClick(t)
                    })), this.opener.addEventListener("keyup", this.handleKeyPress), this.btnBack.addEventListener("click", (t => {
                        this.handleClick(t)
                    })), this.btnBack.addEventListener("keyup", this.handleKeyPress))
                }
                t.addEventListener("change", e.bind(this)), e.bind(this)(t)
            }
            showSlide() {
                this.holder.classList.add(this.activeClass), this.isOpened = !0, this.opener.setAttribute("aria-expanded", this.isOpened), this.focusableContent = [...this.slide.querySelectorAll(this.focusableElements)].filter((t => 0 !== t.getBoundingClientRect().height)), document.addEventListener("click", this.outsideClickHandler), this.holder.addEventListener("keydown", this.keyPressHandler)
            }
            hideSlide() {
                this.holder.classList.remove(this.activeClass), this.isOpened = !1, this.opener.setAttribute("aria-expanded", this.isOpened), document.removeEventListener("click", this.outsideClickHandler), this.holder.removeEventListener("keydown", this.keyPressHandler)
            }
            clickHandler(t) {
                t.preventDefault(), this.isOpened ? this.hideSlide() : this.showSlide()
            }
            outsideClick(t) {
                this.isOpened && t.target.closest(this.holder.className) && this.hideSlide()
            }
            keyPress(t) {
                const e = this.focusableContent[this.focusableContent.length - 1];
                switch (t.key) {
                    case "Escape":
                        this.holder.querySelector('[aria-expanded="true"]') && t.stopPropagation(), this.hideSlide(), document.removeEventListener("keydown", this.keyPressHandler);
                        break;
                    case "Tab":
                        t.shiftKey ? document.activeElement === this.opener && this.isOpened && this.hideSlide() : document.activeElement !== e || document.activeElement.getAttribute("aria-haspopup") || this.isOpened && this.hideSlide()
                }
            }
            keyPressHandler(t) {
                if (" " === t.key) t.preventDefault(), this.isOpened ? this.hideSlide() : this.showSlide()
            }
            destroy() {
                this.opener.removeAttribute("aria-expanded"), this.opener.removeAttribute("aria-haspopup"), this.opener.removeEventListener("click", this.handleClick), this.opener.removeEventListener("keyup", this.handleKeyPress), this.holder.removeEventListener("keydown", this.keyPressHandler)
            }
        }
        i(13);
        i(14);
        i(15);

        function Ie() {
            let t;
            const e = document.querySelectorAll(".on-hover .star-base");
            for (let t of e) t.addEventListener("click", (function () {
                let e = t.parentElement.children;
                for (let t = 0; t < e.length; t++) e[t].hasAttribute("data-clicked") && e[t].removeAttribute("data-clicked");
                this.setAttribute("data-clicked", "true")
            }));
            document.querySelectorAll(".star-rating").forEach((function (e) {
                const i = e.querySelectorAll(".star"),
                    s = parseFloat(e.getAttribute("data-rating"));
                i.forEach((function (e, i) {
                    i < Math.floor(s) ? e.classList.add("filled") : i < s && (e.classList.add("half-filled"), t = 10 * Number(s.toFixed(1).split(".")[1][0]), function (t) {
                        document.documentElement.style.setProperty("--width-element", `${t}%`)
                    }(t))
                }))
            }))
        }
        i(16);
        i(17);
        ! function () {
            return "ontouchstart" in window || navigator.maxTouchPoints
        }() ? document.body.classList.remove("touch-device") : document.body.classList.add("touch-device"), n((() => {
            s.classList.add("is-loaded"),
                function () {
                    jQuery(".diagram-section-parts").each((function () {
                        const t = jQuery(this),
                            e = t.find(".parts-info-nav-list"),
                            i = t.find(".parts-list-wrap"),
                            s = "js-tab-hidden",
                            n = (t, e) => {
                                const n = e.eq(t).attr("href"),
                                    o = i.filter(`[data-id="${n}"]`)[0];
                                o && (i.addClass(s), jQuery(o).removeClass(s), jQuery(o).find(".slick-slider").each((function () {
                                    jQuery(this).slick("refresh")
                                })), setTimeout((() => {
                                    jQuery(o).find(".product-item-description-wrap").each((function () {
                                        const t = jQuery(this).data("CustomOpenClose");
                                        t && t.makeaRefresh()
                                    }))
                                }), 150))
                            };
                        i.addClass(s), e.tabset({
                            tabLinks: "a",
                            defaultTab: !0,
                            onInit: function () {
                                n(this.activeTabIndex, this.$tabLinks)
                            },
                            onChange: function () {
                                n(this.activeTabIndex, this.$tabLinks)
                            }
                        })
                    })), ResponsiveHelper.addRange({
                        "..1023": {
                            on: function () {
                                jQuery(".sign-in-tab-nav").tabset({
                                    tabLinks: "a",
                                    defaultTab: !0
                                })
                            },
                            off: function () {
                                jQuery(".sign-in-tab-nav").tabset("destroy")
                            }
                        }
                    })
                }(),
                function () {
                    jQuery(".side-open-close").openClose({
                        activeClass: "active",
                        opener: ".side-open-close-opener",
                        slider: ".side-open-close-slide",
                        animSpeed: 400,
                        effect: "slide"
                    }), jQuery(".product-info-sorting").openClose({
                        activeClass: "active",
                        opener: ".opener",
                        slider: ".product-info-sorting-slide",
                        animSpeed: 400,
                        effect: "slide"
                    }), jQuery(".product-item-description-open-close").openClose({
                        activeClass: "active",
                        opener: ".product-item-description-opener",
                        slider: ".product-item-description-slide",
                        animSpeed: 400,
                        effect: "slide"
                    }), jQuery(".order-history-active").openClose({
                        activeClass: "active",
                        opener: ".order-history-title",
                        slider: ".order-card-slide",
                        animSpeed: 400,
                        effect: "slide"
                    }), jQuery(".open-my-account").openClose({
                        activeClass: "active",
                        opener: ".opener",
                        slider: ".slide",
                        animSpeed: 400,
                        event: "click"
                    }), ResponsiveHelper.addRange({
                        "..1023": {
                            on: function () {
                                jQuery(".aside-category-filtering-box").openClose({
                                    activeClass: "active",
                                    opener: ".aside-category-filtering-box-opener",
                                    slider: ".aside-category-filtering-box-content",
                                    animSpeed: 400,
                                    effect: "slide"
                                }), jQuery(".form-header-wrapper").openClose({
                                    activeClass: "active",
                                    opener: ".opener-header-search",
                                    slider: ".header-search-slide",
                                    animSpeed: 400,
                                    event: "click"
                                })
                            },
                            off: function () {
                                jQuery(".aside-category-filtering-box").openClose("destroy"), jQuery(".form-header-wrapper").openClose("destroy")
                            }
                        }
                    })
                }(),
                function () {
                    Oe.bind("[data-fancybox]")
                }(),
                function () {
                    jQuery("select").each((function () {
                        const t = jQuery(this);
                        t.select2({
                            minimumResultsForSearch: 1 / 0,
                            placeholder: t.attr("data-placeholder") || " "
                        })
                    }))
                }(),
                function () {
                    jcf.replaceAll()
                }(),
                function () {
                    jQuery(".extra-offset-box").stickyScrollBlock({
                        setBoxHeight: !0,
                        activeClass: "fixed-position",
                        positionType: "fixed"
                    }), ResponsiveHelper.addRange({
                        "..1023": {
                            on: function () {
                                jQuery(".aside-category-filtering-row").stickyScrollBlock({
                                    setBoxHeight: !0,
                                    activeClass: "fixed-position",
                                    container: "#two-columns",
                                    positionType: "fixed",
                                    extraTop: function () {
                                        var t = 0;
                                        return jQuery("0").each((function () {
                                            t += jQuery(this).outerHeight()
                                        })), t
                                    }
                                })
                            },
                            off: function () {
                                jQuery(".aside-category-filtering-row").stickyScrollBlock("destroy")
                            }
                        },
                        "..9999": {
                            on: function () {
                                jQuery(".touch-device .bg-secondary-pro").stickyScrollBlock({
                                    setBoxHeight: !0,
                                    activeClass: "fixed-position",
                                    container: "#two-columns",
                                    positionType: "fixed",
                                    extraTop: function () {
                                        var t = 0;
                                        t = jQuery(".extra-offset-box").outerHeight() + 0;
                                        return jQuery("0").each((function () {
                                            t += jQuery(this).outerHeight()
                                        })), t
                                    }
                                })
                            },
                            off: function () {
                                jQuery(".touch-device .bg-secondary-pro").stickyScrollBlock("destroy")
                            }
                        },
                        "..1439": {
                            on: function () {
                                jQuery(".product-details-bar").stickyScrollBlock({
                                    setBoxHeight: !1,
                                    activeClass: "fixed-position",
                                    positionType: "fixed",
                                    extraTop: function () {
                                        var t = 0;
                                        return jQuery(".extra-offset-box").each((function () {
                                            t += jQuery(this).outerHeight()
                                        })), t
                                    }
                                }), jQuery(".selected-product-info").stickyScrollBlock({
                                    setBoxHeight: !1,
                                    activeClass: "fixed-position",
                                    positionType: "fixed"
                                })
                            },
                            off: function () {
                                jQuery(".product-details-bar").stickyScrollBlock("destroy"), jQuery(".selected-product-info").stickyScrollBlock("destroy")
                            }
                        },
                        "1440..": {
                            on: function () {
                                jQuery(".product-detail-nav-section").stickyScrollBlock({
                                    setBoxHeight: !0,
                                    activeClass: "fixed-position",
                                    positionType: "fixed",
                                    extraTop: function () {
                                        var t = 0;
                                        return jQuery(".extra-offset-box").each((function () {
                                            t += jQuery(this).outerHeight()
                                        })), t
                                    }
                                })
                            },
                            off: function () {
                                jQuery(".product-detail-nav-section").stickyScrollBlock("destroy")
                            }
                    },
                    "1282..": {
                        on: function() {
                            jQuery(".order-summary-wrap").stickyScrollBlock({
                                setBoxHeight: !0,
                                activeClass: "fixed-position",
                                container: "#two-columns",
                                positionType: "fixed",
                                extraTop: function() {
                                    var t = 0;
                                    return jQuery(".checkout-header").each((function() {
                                        t += jQuery(this).outerHeight()
                                    })), t
                                }
                            })
                        },
                        off: function() {
                            jQuery(".order-summary-wrap").stickyScrollBlock("destroy")
                        }
                    }
                })
            }(),
                function () {
                    new SmoothScroll({
                        anchorLinks: ".product-details-list a, .anchor-link",
                        extraOffset: function () {
                            var t = 0;
                            return jQuery(".extra-offset-box").each((function () {
                                var e = jQuery(this),
                                    i = e.data("StickyScrollBlock");
                                i ? (i.stickyFlag = !1, i.stickyOn(), t += e.outerHeight(), i.onResize()) : t += "fixed" === e.css("position") ? e.outerHeight() : 0
                            })), t
                        },
                        activeClasses: "link",
                        wheelBehavior: "none"
                    }), jQuery(window).on("anchorActiveClass", (function () { }))
                }(),
                function () {
                    jQuery(".product-gallery").slick({
                        slidesToScroll: 1,
                        rows: 0,
                        prevArrow: '<div class="slick-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                        nextArrow: '<div class="slick-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                        fade: !0,
                        infinite: !1,
                        dots: !0,
                        asNavFor: ".product-gallery-nav"
                    }), jQuery(".product-gallery-nav").slick({
                        slidesToScroll: 1,
                        slidesToShow: 6,
                        rows: 0,
                        prevArrow: '<div class="slick-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                        nextArrow: '<div class="slick-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                        vertical: !0,
                        infinite: !1,
                        asNavFor: ".product-gallery",
                        focusOnSelect: !0,
                        responsive: [{
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 5
                            }
                        }, {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 4
                            }
                        }]
                    }), jQuery(".product-item-visual").slick({
                        slidesToScroll: 1,
                        rows: 0,
                        prevArrow: '<div class="slick-prev slick-visual-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                        nextArrow: '<div class="slick-next slick-visual-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                        fade: !0,
                        infinite: !1,
                        dots: !0
                    }), jQuery(".product-items-gallery").slick({
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: !0,
                        rows: 0,
                        prevArrow: '<div class="slick-prev slick-item-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                        nextArrow: '<div class="slick-next slick-item-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                        infinite: !1
                    }), jQuery(".video-gallery-main").slick({
                        slidesToScroll: 1,
                        rows: 0,
                        fade: !0,
                        infinite: !1,
                        arrows: !1,
                        asNavFor: ".video-gallery-nav"
                    }), jQuery(".video-gallery-nav").slick({
                        slidesToScroll: 1,
                        slidesToShow: 4,
                        rows: 0,
                        prevArrow: '<div class="slick-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                        nextArrow: '<div class="slick-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                        infinite: !1,
                        asNavFor: ".video-gallery-main",
                        focusOnSelect: !0,
                        responsive: [{
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 1,
                            variableWidth: !0
                        }
                    }]
                }), jQuery(".product-gallery-horizontal").slick({
                    slidesToScroll: 1,
                    rows: 0,
                    prevArrow: '<div class="slick-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                    nextArrow: '<div class="slick-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                    fade: !0,
                    infinite: !1,
                    dots: !0,
                    asNavFor: ".product-gallery-nav-horizontal"
                }), jQuery(".product-gallery-nav-horizontal").slick({
                    slidesToScroll: 1,
                    slidesToShow: 6,
                    rows: 0,
                    prevArrow: '<div class="slick-prev bg-white border border-secondary radius-sm" aria-label="Prev"><i class="icon-arrow-left"></i></div>',
                    nextArrow: '<div class="slick-next bg-white border border-secondary radius-sm" aria-label="Next"><i class="icon-arrow-right"></i></div>',
                    infinite: !1,
                    asNavFor: ".product-gallery-horizontal",
                    focusOnSelect: !0,
                    responsive: [{
                        breakpoint: 1025,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 4,
                            variableWidth: !0
                        }
                    }, {
                        breakpoint: 640,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 2,
                                variableWidth: !0
                            }
                        }]
                    })
                }(),
                function () {
                    ResponsiveHelper.addRange({
                        "..1023": {
                            on: function () {
                                jQuery(".accordion").slideAccordion({
                                    opener: ".opener",
                                    slider: ".slide",
                                    activeClass: "active-acc",
                                    animSpeed: 300
                                })
                            },
                            off: function () {
                                jQuery(".accordion").slideAccordion("destroy")
                            }
                        }
                    })
                }(),
                function () {
                    jQuery("body").mobileNav({
                        menuActiveClass: "nav-active",
                        menuOpener: ".nav-opener",
                        menuDrop: ".nav-bar"
                    })
                }(),
                function () {
                    document.querySelectorAll(".menubar:not(.mobile-nav)").forEach((t => {
                        new Pe({
                            navHold: t,
                            breakpoint: "1024px",
                            dropSelector: ".slide"
                        })
                    }))
                }(),
                function () {
                    document.querySelectorAll(".menubar > li").forEach((t => {
                        (t.querySelector(":scope > ul") || t.querySelector(":scope > div")) && new De({
                            wrap: ".menubar",
                            holder: t,
                            opener: "> button.opener-btn",
                            slide: "> div",
                            btnBack: ".btn-back",
                            breakpoint: "1024px"
                        })
                    }))
                }(),
                function () {
                jQuery(".sign-in-popup-hold").contentPopup({
                    mode: "click",
                    popup: ".sign-in-popup",
                    btnOpen: ".sign-in-popup-opener",
                    btnClose: ".popup-close"
                }), jQuery(".user-account").contentPopup({
                        mode: "click",
                        popup: ".user-account-popup",
                        btnOpen: ".user-account-link",
                        btnClose: ".popup-close"
                    }), jQuery(".cart-wrap").contentPopup({
                        mode: "click",
                        popup: ".cart-holder",
                        btnOpen: ".card-link",
                        btnClose: ".popup-close"
                    }), jQuery(".track-box-popup-holder").contentPopup({
                        mode: "click",
                        popup: ".track-box-popup",
                        btnOpen: ".track-box-popup-opener",
                        btnClose: ".popup-close",
                        onShow: function () {
                            jQuery("body").addClass("popup-isactive")
                        },
                        onHide: function () {
                            jQuery("body").removeClass("popup-isactive")
                        }
                    }),

                    jQuery(".total-box-popup-holder").contentPopup({
                        mode: "click",
                        popup: ".total-box-popup",
                        btnOpen: ".total-box-popup-opener",
                        btnClose: ".popup-close",
                        onShow: function () {
                            jQuery("body").addClass("popup-isactive")
                        },
                        onHide: function () {
                            jQuery("body").removeClass("popup-isactive")
                        }
                    }),
                    jQuery(".part-popup-holder").contentPopup({
                        mode: "click",
                        popup: ".parts-info-main-list-slide",
                        btnOpen: ".parts-info-main-list-opener",
                        btnClose: ".popup-close",
                        hideOnClickOutside: !1,
                        onShow: function () {
                            const t = jQuery(window).width(),
                                e = this.holder,
                                i = this.btnOpen,
                                s = this.popup,
                                n = e.offset(),
                                o = i.offset(),
                                r = i.outerWidth(),
                                a = s.outerWidth(),
                                l = s.outerHeight(),
                                c = o.left - n.left + r / 2 - a / 2,
                                d = t - 30 - a - n.left,
                                h = o.top - n.top - l - 4,
                                u = o.top - n.top + r + 4;
                            let p, f;
                            p = n.left + c + a > t - 30 ? d : c, f = e.hasClass("top-position") ? u : h, s.css("top", f), s.css("left", p)
                        },
                        onHide: function () {
                            this.popup.css("left", "-9999px")
                        }
                    }),

                    jQuery(".model-number-locator-popup-holder").contentPopup({
                        mode: "click",
                        popup: ".model-number-locator-popup",
                        btnOpen: ".model-number-locator-popup-opener",
                        btnClose: ".popup-close",
                        onShow: function () {
                            jQuery("body").addClass("popup-isactive")
                        },
                        onHide: function () {
                            jQuery("body").removeClass("popup-isactive")
                        }
                    }), ResponsiveHelper.addRange({
                        "..1023": {
                            on: function () {
                                jQuery(".aside-category-filtering-popup-holder").contentPopup({
                                    mode: "click",
                                    popup: ".aside-category-filtering-popup",
                                    btnOpen: ".aside-category-filtering-popup-opener",
                                    btnClose: ".popup-close",
                                    onShow: function () {
                                        jQuery("body").addClass("popup-isactive");

                                        try {
                                            if (jQuery(".sticky-wrap-container-fluid.fixed-position").length > 0) {
                                                jQuery(this.popup).css("margin-top", jQuery(".sticky-wrap-container-fluid.fixed-position").height() + "px");
                                                jQuery(".product-item-visual-holder .product-info-badges").hide();
                                            }
                                        } catch (e) {}

                                    },
                                    onHide: function () {
                                        jQuery("body").removeClass("popup-isactive");

                                        try {
                                            jQuery(this.popup).css("margin-top", "");
                                            jQuery('.product-item-visual-holder .product-info-badges').show();
                                        } catch (e) { }
                                        
                                    }
                                })
                            },
                            off: function () {
                                jQuery("body").removeClass("popup-isactive"), jQuery(".aside-category-filtering-popup-holder").contentPopup("destroy")
                            }
                        },
                        "..767": {
                            on: function () {
                                jQuery(".parts-info-nav-popup").contentPopup({
                                    mode: "click",
                                    popup: ".parts-info-nav-slide",
                                    btnOpen: ".parts-info-nav-opener",
                                    btnClose: ".popup-close",
                                    onShow: function () {
                                        const t = this;
                                        jQuery(".parts-info-nav-list a").on("click", (function () {
                                            const e = jQuery(this).find(".text-hold").text();
                                            t.btnOpen.text(e), t.holder.data("ContentPopup").hidePopup()
                                        })), jQuery("body").addClass("popup-isactive")
                                    },
                                    onHide: function () {
                                        jQuery("body").removeClass("popup-isactive")
                                    }
                                })
                            },
                            off: function () {
                                jQuery("body").removeClass("popup-isactive"), jQuery(".parts-info-nav-popup").contentPopup("destroy")
                            }
                        }
                    })
                }(),
                function () {
                jQuery(".category-content-description-wrap").each((function () {
                    jQuery(this).customOpenClose({
                            opener: ".more",
                            activeClass: "opened",
                            slider: ".category-content-description",
                            altSlider: void 0,
                            mobileLines: 3,
                            desktopLines: 3,
                            animSpeed: 400,
                            isMobile: !0,
                            btnText: "Show More",
                            btnOpenedText: "Show Less"
                        })
                    })), jQuery(".product-item-description-wrap").each((function () {
                        jQuery(this).customOpenClose({
                            opener: ".more",
                            activeClass: "opened",
                            slider: ".product-item-description-slide",
                            altSlider: void 0,
                            mobileLines: 5,
                            desktopLines: 5,
                            animSpeed: 400,
                            isMobile: !0,
                            btnText: "Show More",
                            btnOpenedText: "Show Less"
                        })
                    })), jQuery(".product-question-wrap").each((function () {
                        jQuery(this).customOpenClose({
                            opener: ".more",
                            activeClass: "opened",
                            slider: ".product-question-description",
                            altSlider: void 0,
                            mobileLines: 4,
                            desktopLines: 4,
                            animSpeed: 400,
                            isMobile: !0,
                            btnText: "... Read More",
                            btnOpenedText: "... Read Less"
                        })
                    })), jQuery(".product-qa-txt-wrap").each((function () {
                        jQuery(this).customOpenClose({
                            opener: ".more",
                            activeClass: "opened",
                            slider: ".product-question-description",
                            altSlider: void 0,
                            mobileLines: 4,
                            desktopLines: 4,
                            animSpeed: 400,
                            isMobile: !0,
                            btnText: "... Read More",
                            btnOpenedText: "... Read Less"
                        })
                    })), jQuery(".product-stories-txt-wrap").each((function () {
                        jQuery(this).customOpenClose({
                            opener: ".more",
                            activeClass: "opened",
                            slider: ".product-stories-txt",
                            altSlider: void 0,
                            mobileLines: 4,
                            desktopLines: 4,
                            animSpeed: 400,
                            isMobile: !0,
                            btnText: "... Read More",
                            btnOpenedText: "... Read Less"
                        })
                    }))
                }(),
                function () {
                    jQuery(".category-items-wrapper").each((function () {
                        const t = jQuery(this),
                            e = t.find(".list-grid-item"),
                            i = t.find(".category-items-holder"),
                            s = "list-view",
                            n = "item-active";
                        e.on("click", (function (t) {
                            const o = jQuery(t.target);
                            o.hasClass(s) ? i.addClass(s) : i.removeClass(s), e.removeClass(n), o.addClass(n), jQuery(window).trigger("refreshMultiline"), jQuery(".product-item-visual").each((function () {
                                jQuery(this).slick("refresh")
                            })), setTimeout((() => { }), 10)
                        }))
                    }))
                }(),
                function () {

                    var isTouchDevice = (function () {
                        try {
                            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
                        } catch (e) {
                            return false;
                        }
                    }());

                    jQuery(".btn-tooltip").clickTooltip({
                        positionTypeX: isTouchDevice ? "left" : "center",
                        positionTypeY: isTouchDevice ? "center" : "top",
                        tooltipStructure: '<div class="click-tooltip radius bg-white"><div class="tooltip-text"></div></div>'
                    })
                }(), Ie(),
                function () {
                    jQuery(".bundle-offer-add-box").each((function () {
                        const t = jQuery(this),
                            e = t.find("input"),
                            i = "active";
                        jQuery(this).is(":checked") && t.addClass(i), e.on("change", (function () {
                            t.toggleClass(i, this.checked)
                        }))
                    }))
                }(),
                function () {
                    jQuery(".load-more-container").loadMore({
                        linkSelector: "a.load-more",
                        newContentTarget: ".load-more-holder"
                    }), jQuery(".load-more-stories-container").loadMore({
                        linkSelector: "a.load-more-stories",
                        newContentTarget: ".load-more-stories-holder"
                    }), jQuery(".show-more-container").loadMore({
                        linkSelector: "a.show-more-btn",
                        newContentTarget: ".show-more-wrap"
                    }), jQuery(".load-more-holder").loadMore({
                        linkSelector: "a.load-more"
                    })
            }(),
            //function() {
            //    jQuery(".like-button, .dislike-button").each((function() {
            //        const t = jQuery(this);
            //        t.on("click", (function() {
            //            var e = t.find("span"),
            //                i = parseInt(e.text()),
            //                s = t.siblings(),
            //                o = s.find("span"),
            //                n = parseInt(o.text());
            //            t.hasClass("active") ? (e.text(i - 1), t.removeClass("active")) : (s.hasClass("active") && (o.text(n - 1), s.removeClass("active")), e.text(i + 1), t.addClass("active"))
            //        }))
            //    }))
            //}(),
            function() {
                [...document.querySelectorAll(".your-address-form-wrap")].forEach((t => {
                    const e = t.querySelectorAll(".form-check-input"),
                        i = t.querySelectorAll(".form-radio"),
                        s = t.querySelectorAll(".change-of-address-wrap"),
                        o = t.querySelector(".add-new-address-content"),
                        n = "active-content",
                        r = "active-input";
                    if (!o) return;
                    const a = [...e].filter((t => t.checked));
                    a.length && a[0].closest(".form-radio").classList.add(r), e.forEach((function(e) {
                        const a = e.closest(".form-radio");
                        e.addEventListener("change", (function() {
                            s.forEach((t => {
                                t.classList.remove(n)
                            })), i.forEach((t => {
                                t.classList.remove(r)
                            })), a.classList.add(r), window.scrollTo({
                                top: t.offsetTop,
                                behavior: "smooth"
                            }), this.checked && this.classList.contains("add-new-address") ? o.classList.add(n) : o.classList.remove(n)
                        }))
                    }))
                }))
            }(),
            function() {
                [...document.querySelectorAll(".address-form")].forEach((t => {
                    t.querySelectorAll(".form-radio-wrap").forEach((t => {
                        const e = t.querySelector(".btn-edit"),
                            i = t.querySelector(".title"),
                            s = t.querySelector(".address"),
                            o = t.querySelector(".change-of-address-form"),
                            n = t.querySelector(".edit-address-content"),
                            r = "active-content";
                        n && e.addEventListener("click", (function() {
                            if (t.querySelector(".form-check-input").classList.contains("edit-address")) {
                                if (i) {
                                    const t = i.innerText.split(" ");
                                    o.querySelector("[data-first-name]").value = t[0].trim(), o.querySelector("[data-last-name]").value = t[1].trim()
                                }
                                if (s) {
                                    const t = s.innerText.split(","),
                                        e = o.querySelector("[data-state]");
                                    o.querySelector("[data-street1]").value = t[0].trim(), o.querySelector("[data-city]").value = t[1].trim(), o.querySelector("[data-zip]").value = t[3].trim(), jQuery(e).val(t[2].trim()), jQuery(e).trigger("change")
                                }
                                n.classList.add(r)
                            } else n.classList.remove(r)
                        }))
                    }))
                }))
            }()
        }))
    }]);
