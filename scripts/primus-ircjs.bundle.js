var primusIrcJS = function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e['default']
        } : function() {
            return e
        };
        return t.d(n, 'a', n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = '', t(t.s = 3)
}([function(e) {
    var t = function() {
        return this
    }();
    try {
        t = t || Function('return this')() || (1, eval)('this')
    } catch (n) {
        'object' == typeof window && (t = window)
    }
    e.exports = t
}, function(e, t, n) {
    function r(e, t) {
        this._id = e, this._clearFn = t
    }
    var o = Function.prototype.apply;
    t.setTimeout = function() {
        return new r(o.call(setTimeout, window, arguments), clearTimeout)
    }, t.setInterval = function() {
        return new r(o.call(setInterval, window, arguments), clearInterval)
    }, t.clearTimeout = t.clearInterval = function(e) {
        e && e.close()
    }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
        this._clearFn.call(window, this._id)
    }, t.enroll = function(e, t) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = t
    }, t.unenroll = function(e) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
    }, t._unrefActive = t.active = function(e) {
        clearTimeout(e._idleTimeoutId);
        var t = e._idleTimeout;
        0 <= t && (e._idleTimeoutId = setTimeout(function() {
            e._onTimeout && e._onTimeout()
        }, t))
    }, n(5);
    var s = n(7);
    t.setImmediate = s.setImmediate, t.clearImmediate = s.clearImmediate
}, function(e) {
    e.exports = {
        _from: 'ircjs@1.1.10',
        _id: 'ircjs@1.1.10',
        _inBundle: !1,
        _integrity: 'sha512-S2JcOurtWomgFtfj5ug3EtwarLXBGsMYuJeWizPh2baae2Ap43TnO7FQp3WCXyvSxchXpkTFdVeTPD1W66G6JQ==',
        _location: '/ircjs',
        _phantomChildren: {},
        _requested: {
            type: 'version',
            registry: !0,
            raw: 'ircjs@1.1.10',
            name: 'ircjs',
            escapedName: 'ircjs',
            rawSpec: '1.1.10',
            saveSpec: null,
            fetchSpec: '1.1.10'
        },
        _requiredBy: ['#USER', '/'],
        _resolved: 'https://registry.npmjs.org/ircjs/-/ircjs-1.1.10.tgz',
        _shasum: '87df2a384738077a5f551284a2e5dcabe844416f',
        _spec: 'ircjs@1.1.10',
        _where: '/Users/jd/Projects/ircjs/primus-ircjs',
        author: {
            name: 'Joshua Davison',
            email: 'joshua@davison.asia'
        },
        bugs: {
            url: 'https://github.com/ozjd/ircjs/issues'
        },
        bundleDependencies: !1,
        dependencies: {
            eventemitter3: '^2.0.3'
        },
        deprecated: !1,
        description: 'ircJS is a class designed to make it easier to connect and utilise IRC with Javascript',
        devDependencies: {},
        homepage: 'https://github.com/ozjd/ircjs#readme',
        keywords: ['ircjs', 'node', 'irc', 'bot', 'ircx', 'client', 'chat'],
        license: 'GPL-3.0',
        main: 'irc.js',
        name: 'ircjs',
        repository: {
            type: 'git',
            url: 'git+https://github.com/ozjd/ircjs.git'
        },
        scripts: {},
        version: '1.1.10'
    }
}, function(e, t, n) {
    const r = n(4),
        o = n(8);
    e.exports = class extends o {
        constructor(e, t, n) {
            super(e, t, n), this._transport = new r('https://irc.irc7.com/', {
                transformer: 'engine.io'
            }), this._setHandlers()
        }
        connect(e) {
            if (super.connect(e), this._transport.readyState === r.CLOSED) this._transport.open();
            else throw 'Transport can not be opened at this time'
        }
        send(e) {
            if (super.send(e), this._transport.readyState === r.OPEN) this._transport.write(`${e}\r\n`);
            else throw 'Transport can not be written to at this time'
        }
        _setHandlers() {
            super._setHandlers(), this._transport.on('data', (e) => {
                this.emit('data', e)
            }).on('open', () => {
                setTimeout(() => {
                    this.emit('connect', this)
                }, 1e3)
            }).on('error', (e) => {
                this.emit('error', e)
            }).on('end', () => {
                this.emit('disconnect')
            })
        }
    }
}, function(e, t, n) {
    var r = Math.floor;
    (function(o, s, a) {
        var p, c, c, c, c;
        (function(r, o, s, a) {
            o[r] = s.call(o);
            for (var c = 0; c < a.length; c++) a[c](o[r]);
            'undefined' != typeof e && e.exports ? e.exports = o[r] : (p = function() {
                return o[r]
            }.call(t, n, t, e), !(p !== void 0 && (e.exports = p)))
        })('Primus', this || {}, function() {
            var e, t = function a(p, e, t) {
                function r(s, o) {
                    if (!e[s]) {
                        if (!p[s]) {
                            if (!o && 'function' == typeof c && c) return c(s, !0);
                            if (n) return n(s, !0);
                            var i = new Error('Cannot find module \'' + s + '\'');
                            throw i.code = 'MODULE_NOT_FOUND', i
                        }
                        var d = e[s] = {
                            exports: {}
                        };
                        p[s][0].call(d.exports, function(t) {
                            var e = p[s][1][t];
                            return r(e ? e : t)
                        }, d, d.exports, a, p, e, t)
                    }
                    return e[s].exports
                }
                for (var n = 'function' == typeof c && c, s = 0; s < t.length; s++) r(t[s]);
                return r
            }({
                1: [function(e, t) {
                    'use strict';
                    t.exports = function(e, t) {
                        function n(e, n) {
                            if (t[e]) {
                                if ('string' == typeof t[e] && (t[e] = t[e].split(r)), 'function' == typeof t[e]) return t[e].call(n);
                                for (var o, s, a = 0; a < t[e].length; a++) s = t[e][a], o = typeof s, 'function' === o ? s.call(n) : 'string' === o && 'function' == typeof n[s] && n[s]()
                            }
                        }
                        var r = /[, ]+/;
                        return t = t || {}, e = e || [], 'string' == typeof e && (e = e.split(r)),
                            function() {
                                var t, r = this,
                                    o = 0;
                                if (null === r[e[0]]) return !1;
                                for (n('before', r); o < e.length; o++) t = e[o], r[t] && ('function' == typeof r[t].destroy && r[t].destroy(), r[t] = null);
                                return r.emit && r.emit('destroy'), n('after', r), !0
                            }
                    }
                }, {}],
                2: [function(e, t) {
                    'use strict';
                    t.exports = function() {
                        for (var e, t = this, n = 0, r = arguments.length, o = Array(r); n < r; n++) o[n] = arguments[n];
                        return 'function' == typeof o[o.length - 1] ? (e = o.pop(), function() {
                            for (var n = 0, r = arguments.length, s = Array(r + 1); n < r; n++) s[n + 1] = arguments[n];
                            return s[0] = function(e, n) {
                                return e ? t.emit('error', e) : void(s = void 0 === n ? s.slice(1) : null === n ? [] : n, t.emit.apply(t, o.concat(s)))
                            }, e.apply(t, s), !0
                        }) : function() {
                            for (var e = 0, n = arguments.length, r = Array(n); e < n; e++) r[e] = arguments[e];
                            return t.emit.apply(t, o.concat(r))
                        }
                    }
                }, {}],
                3: [function(e, t) {
                    'use strict';

                    function n() {}

                    function r(e, t, n) {
                        this.fn = e, this.context = t, this.once = n || !1
                    }

                    function o() {
                        this._events = new n, this._eventsCount = 0
                    }
                    var s = Object.prototype.hasOwnProperty,
                        a = '~';
                    Object.create && (n.prototype = Object.create(null), !new n().__proto__ && (a = !1)), o.prototype.eventNames = function() {
                        var e, t, n = [];
                        if (0 === this._eventsCount) return n;
                        for (t in e = this._events) s.call(e, t) && n.push(a ? t.slice(1) : t);
                        return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
                    }, o.prototype.listeners = function(e, t) {
                        var n = a ? a + e : e,
                            r = this._events[n];
                        if (t) return !!r;
                        if (!r) return [];
                        if (r.fn) return [r.fn];
                        for (var o = 0, s = r.length, i = Array(s); o < s; o++) i[o] = r[o].fn;
                        return i
                    }, o.prototype.emit = function(e, t, n, r, o, s) {
                        var p = a ? a + e : e;
                        if (!this._events[p]) return !1;
                        var c, d, i = this._events[p],
                            l = arguments.length;
                        if (i.fn) {
                            switch (i.once && this.removeListener(e, i.fn, void 0, !0), l) {
                                case 1:
                                    return i.fn.call(i.context), !0;
                                case 2:
                                    return i.fn.call(i.context, t), !0;
                                case 3:
                                    return i.fn.call(i.context, t, n), !0;
                                case 4:
                                    return i.fn.call(i.context, t, n, r), !0;
                                case 5:
                                    return i.fn.call(i.context, t, n, r, o), !0;
                                case 6:
                                    return i.fn.call(i.context, t, n, r, o, s), !0;
                            }
                            for (d = 1, c = Array(l - 1); d < l; d++) c[d - 1] = arguments[d];
                            i.fn.apply(i.context, c)
                        } else {
                            var u, m = i.length;
                            for (d = 0; d < m; d++) switch (i[d].once && this.removeListener(e, i[d].fn, void 0, !0), l) {
                                case 1:
                                    i[d].fn.call(i[d].context);
                                    break;
                                case 2:
                                    i[d].fn.call(i[d].context, t);
                                    break;
                                case 3:
                                    i[d].fn.call(i[d].context, t, n);
                                    break;
                                case 4:
                                    i[d].fn.call(i[d].context, t, n, r);
                                    break;
                                default:
                                    if (!c)
                                        for (u = 1, c = Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
                                    i[d].fn.apply(i[d].context, c);
                            }
                        }
                        return !0
                    }, o.prototype.on = function(e, t, n) {
                        var o = new r(t, n || this),
                            s = a ? a + e : e;
                        return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], o] : this._events[s].push(o) : (this._events[s] = o, this._eventsCount++), this
                    }, o.prototype.once = function(e, t, n) {
                        var o = new r(t, n || this, !0),
                            s = a ? a + e : e;
                        return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], o] : this._events[s].push(o) : (this._events[s] = o, this._eventsCount++), this
                    }, o.prototype.removeListener = function(e, t, r, o) {
                        var s = a ? a + e : e;
                        if (!this._events[s]) return this;
                        if (!t) return 0 == --this._eventsCount ? this._events = new n : delete this._events[s], this;
                        var p = this._events[s];
                        if (p.fn) p.fn !== t || o && !p.once || r && p.context !== r || (0 == --this._eventsCount ? this._events = new n : delete this._events[s]);
                        else {
                            for (var c = 0, i = [], d = p.length; c < d; c++)(p[c].fn !== t || o && !p[c].once || r && p[c].context !== r) && i.push(p[c]);
                            i.length ? this._events[s] = 1 === i.length ? i[0] : i : 0 == --this._eventsCount ? this._events = new n : delete this._events[s]
                        }
                        return this
                    }, o.prototype.removeAllListeners = function(e) {
                        var t;
                        return e ? (t = a ? a + e : e, this._events[t] && (0 == --this._eventsCount ? this._events = new n : delete this._events[t])) : (this._events = new n, this._eventsCount = 0), this
                    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prototype.setMaxListeners = function() {
                        return this
                    }, o.prefixed = a, o.EventEmitter = o, 'undefined' != typeof t && (t.exports = o)
                }, {}],
                4: [function(e, t) {
                    t.exports = 'function' == typeof Object.create ? function(e, t) {
                        e.super_ = t, e.prototype = Object.create(t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        })
                    } : function(e, t) {
                        e.super_ = t;
                        var n = function() {};
                        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
                    }
                }, {}],
                5: [function(e, t) {
                    'use strict';
                    var n = new RegExp('^((?:\\d+)?\\.?\\d+) *(' + 'milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|wks?|w|years?|yrs?|y' + ')?$', 'i'),
                        r = 1e3,
                        o = 60 * r,
                        s = 60 * o,
                        a = 24 * s;
                    t.exports = function(e) {
                        var t, i, p = typeof e;
                        if ('number' == p) return e;
                        if ('string' != p || '0' === e || !e) return 0;
                        if (+e) return +e;
                        if (1e4 < e.length || !(i = n.exec(e))) return 0;
                        switch (t = parseFloat(i[1]), i[2].toLowerCase()) {
                            case 'years':
                            case 'year':
                            case 'yrs':
                            case 'yr':
                            case 'y':
                                return t * (365 * a);
                            case 'weeks':
                            case 'week':
                            case 'wks':
                            case 'wk':
                            case 'w':
                                return t * (7 * a);
                            case 'days':
                            case 'day':
                            case 'd':
                                return t * a;
                            case 'hours':
                            case 'hour':
                            case 'hrs':
                            case 'hr':
                            case 'h':
                                return t * s;
                            case 'minutes':
                            case 'minute':
                            case 'mins':
                            case 'min':
                            case 'm':
                                return t * o;
                            case 'seconds':
                            case 'second':
                            case 'secs':
                            case 'sec':
                            case 's':
                                return t * r;
                            default:
                                return t;
                        }
                    }
                }, {}],
                6: [function(e, t) {
                    'use strict';
                    t.exports = function(e) {
                        function t() {
                            return r ? n : (r = 1, n = e.apply(this, arguments), e = null, n)
                        }
                        var n, r = 0;
                        return t.displayName = e.displayName || e.name || t.displayName || t.name, t
                    }
                }, {}],
                7: [function(e, t, n) {
                    'use strict';

                    function r(e) {
                        return decodeURIComponent(e.replace(/\+/g, ' '))
                    }
                    var o = Object.prototype.hasOwnProperty;
                    n.stringify = function(e, t) {
                        t = t || '';
                        var n = [];
                        for (var r in 'string' != typeof t && (t = '?'), e) o.call(e, r) && n.push(encodeURIComponent(r) + '=' + encodeURIComponent(e[r]));
                        return n.length ? t + n.join('&') : ''
                    }, n.parse = function(e) {
                        for (var t, n = /([^=?&]+)=?([^&]*)/g, o = {}; t = n.exec(e); o[r(t[1])] = r(t[2]));
                        return o
                    }
                }, {}],
                8: [function(e, t) {
                    'use strict';

                    function n(e, t, n) {
                        return s(e in n ? n[e] : e in t ? t[e] : r[e])
                    }

                    function r(e) {
                        var t = this;
                        return t instanceof r ? void(e = e || {}, t.attempt = null, t._fn = null, t['reconnect timeout'] = n('reconnect timeout', t, e), t.retries = n('retries', t, e), t.factor = n('factor', t, e), t.max = n('max', t, e), t.min = n('min', t, e), t.timers = new i(t)) : new r(e)
                    }
                    var o = e('eventemitter3'),
                        s = e('millisecond'),
                        a = e('demolish'),
                        i = e('tick-tock'),
                        p = e('one-time');
                    r.prototype = new o, r.prototype.constructor = r, r['reconnect timeout'] = '30 seconds', r.max = Infinity, r.min = '500 ms', r.retries = 10, r.factor = 2, r.prototype.reconnect = function() {
                        var e = this;
                        return e.backoff(function(t, n) {
                            return n.duration = +new Date - n.start, t ? e.emit('reconnect failed', t, n) : void e.emit('reconnected', n)
                        }, e.attempt)
                    }, r.prototype.backoff = function(e, t) {
                        var r = this;
                        return (t = t || r.attempt || {}, t.backoff) ? r : (t['reconnect timeout'] = n('reconnect timeout', r, t), t.retries = n('retries', r, t), t.factor = n('factor', r, t), t.max = n('max', r, t), t.min = n('min', r, t), t.start = +t.start || +new Date, t.duration = +t.duration || 0, t.attempt = +t.attempt || 0, t.attempt === t.retries) ? (e.call(r, new Error('Unable to recover'), t), r) : (t.backoff = !0, t.attempt++, r.attempt = t, t.scheduled = 1 === t.attempt ? t.min : Math.min(Math.round((Math.random() + 1) * t.min * Math.pow(t.factor, t.attempt - 1)), t.max), r.timers.setTimeout('reconnect', function() {
                            t.duration = +new Date - t.start, t.backoff = !1, r.timers.clear('reconnect, timeout');
                            var n = r._fn = p(function(n) {
                                return r.reset(), n ? r.backoff(e, t) : void e.call(r, void 0, t)
                            });
                            r.emit('reconnect', t, n), r.timers.setTimeout('timeout', function() {
                                var e = new Error('Failed to reconnect in a timely manner');
                                t.duration = +new Date - t.start, r.emit('reconnect timeout', e, t), n(e)
                            }, t['reconnect timeout'])
                        }, t.scheduled), r.emit('reconnect scheduled', t), r)
                    }, r.prototype.reconnecting = function() {
                        return !!this.attempt
                    }, r.prototype.reconnected = function(e) {
                        return this._fn && this._fn(e), this
                    }, r.prototype.reset = function() {
                        return this._fn = this.attempt = null, this.timers.clear('reconnect, timeout'), this
                    }, r.prototype.destroy = a('timers attempt _fn'), t.exports = r
                }, {
                    demolish: 1,
                    eventemitter3: 9,
                    millisecond: 5,
                    "one-time": 6,
                    "tick-tock": 11
                }],
                9: [function(e, t) {
                    'use strict';

                    function n(e, t, n) {
                        this.fn = e, this.context = t, this.once = n || !1
                    }

                    function r() {}
                    var o = 'function' != typeof Object.create && '~';
                    r.prototype._events = void 0, r.prototype.listeners = function(e, t) {
                        var n = o ? o + e : e,
                            r = this._events && this._events[n];
                        if (t) return !!r;
                        if (!r) return [];
                        if (r.fn) return [r.fn];
                        for (var s = 0, a = r.length, i = Array(a); s < a; s++) i[s] = r[s].fn;
                        return i
                    }, r.prototype.emit = function(e, t, n, r, s, a) {
                        var p = o ? o + e : e;
                        if (!this._events || !this._events[p]) return !1;
                        var c, d, i = this._events[p],
                            l = arguments.length;
                        if ('function' == typeof i.fn) {
                            switch (i.once && this.removeListener(e, i.fn, void 0, !0), l) {
                                case 1:
                                    return i.fn.call(i.context), !0;
                                case 2:
                                    return i.fn.call(i.context, t), !0;
                                case 3:
                                    return i.fn.call(i.context, t, n), !0;
                                case 4:
                                    return i.fn.call(i.context, t, n, r), !0;
                                case 5:
                                    return i.fn.call(i.context, t, n, r, s), !0;
                                case 6:
                                    return i.fn.call(i.context, t, n, r, s, a), !0;
                            }
                            for (d = 1, c = Array(l - 1); d < l; d++) c[d - 1] = arguments[d];
                            i.fn.apply(i.context, c)
                        } else {
                            var u, m = i.length;
                            for (d = 0; d < m; d++) switch (i[d].once && this.removeListener(e, i[d].fn, void 0, !0), l) {
                                case 1:
                                    i[d].fn.call(i[d].context);
                                    break;
                                case 2:
                                    i[d].fn.call(i[d].context, t);
                                    break;
                                case 3:
                                    i[d].fn.call(i[d].context, t, n);
                                    break;
                                default:
                                    if (!c)
                                        for (u = 1, c = Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
                                    i[d].fn.apply(i[d].context, c);
                            }
                        }
                        return !0
                    }, r.prototype.on = function(e, t, r) {
                        var s = new n(t, r || this),
                            a = o ? o + e : e;
                        return this._events || (this._events = o ? {} : Object.create(null)), this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], s] : this._events[a].push(s) : this._events[a] = s, this
                    }, r.prototype.once = function(e, t, r) {
                        var s = new n(t, r || this, !0),
                            a = o ? o + e : e;
                        return this._events || (this._events = o ? {} : Object.create(null)), this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], s] : this._events[a].push(s) : this._events[a] = s, this
                    }, r.prototype.removeListener = function(e, t, n, r) {
                        var s = o ? o + e : e;
                        if (!this._events || !this._events[s]) return this;
                        var a = this._events[s],
                            p = [];
                        if (t)
                            if (a.fn)(a.fn !== t || r && !a.once || n && a.context !== n) && p.push(a);
                            else
                                for (var c = 0, i = a.length; c < i; c++)(a[c].fn !== t || r && !a[c].once || n && a[c].context !== n) && p.push(a[c]);
                        return p.length ? this._events[s] = 1 === p.length ? p[0] : p : delete this._events[s], this
                    }, r.prototype.removeAllListeners = function(e) {
                        return this._events ? (e ? delete this._events[o ? o + e : e] : this._events = o ? {} : Object.create(null), this) : this
                    }, r.prototype.off = r.prototype.removeListener, r.prototype.addListener = r.prototype.on, r.prototype.setMaxListeners = function() {
                        return this
                    }, r.prefixed = o, 'undefined' != typeof t && (t.exports = r)
                }, {}],
                10: [function(e, t) {
                    'use strict';
                    t.exports = function(e, t) {
                        return (t = t.split(':')[0], e = +e, !!e) && ('http' === t || 'ws' === t ? 80 !== e : 'https' === t || 'wss' === t ? 443 !== e : 'ftp' === t ? 21 !== e : 'gopher' === t ? 70 !== e : 'file' != t && 0 !== e)
                    }
                }, {}],
                11: [function(e, t) {
                    'use strict';

                    function n(e, t, n, r) {
                        this.start = +new Date, this.duration = n, this.clear = t, this.timer = e, this.fns = [r]
                    }

                    function r(e) {
                        clearTimeout(e)
                    }

                    function a(e) {
                        clearInterval(e)
                    }

                    function i(e) {
                        o(e)
                    }

                    function p(e) {
                        return this instanceof p ? void(this.timers = {}, this.context = e || this) : new p(e)
                    }
                    var c = Object.prototype.hasOwnProperty,
                        d = e('millisecond');
                    n.prototype.remaining = function() {
                        return this.duration - this.taken()
                    }, n.prototype.taken = function() {
                        return +new Date - this.start
                    }, p.prototype.tock = function(e, t) {
                        var n = this;
                        return function() {
                            if (e in n.timers) {
                                var r = n.timers[e],
                                    o = r.fns.slice(),
                                    s = o.length,
                                    a = 0;
                                for (t ? n.clear(e) : n.start = +new Date; a < s; a++) o[a].call(n.context)
                            }
                        }
                    }, p.prototype.setTimeout = function(e, t, o) {
                        var s, a = this;
                        return a.timers[e] ? (a.timers[e].fns.push(t), a) : (s = d(o), a.timers[e] = new n(setTimeout(a.tock(e, !0), d(o)), r, s, t), a)
                    }, p.prototype.setInterval = function(e, t, r) {
                        var o, s = this;
                        return s.timers[e] ? (s.timers[e].fns.push(t), s) : (o = d(r), s.timers[e] = new n(setInterval(s.tock(e), d(r)), a, o, t), s)
                    }, p.prototype.setImmediate = function(e, t) {
                        var r = this;
                        return 'function' == typeof s ? r.timers[e] ? (r.timers[e].fns.push(t), r) : (r.timers[e] = new n(s(r.tock(e, !0)), i, 0, t), r) : r.setTimeout(e, t, 0)
                    }, p.prototype.active = function(e) {
                        return e in this.timers
                    }, p.prototype.clear = function() {
                        var e, t, n, r = arguments.length ? arguments : [],
                            o = this;
                        if (1 === r.length && 'string' == typeof r[0] && (r = r[0].split(/[, ]+/)), !r.length)
                            for (e in o.timers) c.call(o.timers, e) && r.push(e);
                        for (t = 0, n = r.length; t < n; t++) e = o.timers[r[t]], e && (e.clear(e.timer), e.fns = e.timer = e.clear = null, delete o.timers[r[t]]);
                        return o
                    }, p.prototype.adjust = function(e, t) {
                        var n, r = this,
                            o = d(t),
                            s = r.timers[e];
                        return s ? (n = s.clear === a, s.clear(s.timer), s.start = +new Date, s.duration = o, s.timer = (n ? setInterval : setTimeout)(r.tock(e, !n), o), r) : r
                    }, p.prototype.end = p.prototype.destroy = function() {
                        return !!this.context && (this.clear(), this.context = this.timers = null, !0)
                    }, p.Timer = n, t.exports = p
                }, {
                    millisecond: 5
                }],
                12: [function(e, t) {
                    (function(n) {
                        'use strict';

                        function r(e) {
                            e = e || n.location || {};
                            var t, r = {},
                                o = typeof e;
                            if ('blob:' === e.protocol) r = new a(unescape(e.pathname), {});
                            else if ('string' == o)
                                for (t in r = new a(e, {}), u) delete r[t];
                            else if ('object' == o) {
                                for (t in e) t in u || (r[t] = e[t]);
                                void 0 === r.slashes && (r.slashes = d.test(e.href))
                            }
                            return r
                        }

                        function o(e) {
                            var t = i.exec(e);
                            return {
                                protocol: t[1] ? t[1].toLowerCase() : '',
                                slashes: !!t[2],
                                rest: t[3]
                            }
                        }

                        function s(e, t) {
                            for (var n = (t || '/').split('/').slice(0, -1).concat(e.split('/')), r = n.length, o = n[r - 1], s = !1, a = 0; r--;) '.' === n[r] ? n.splice(r, 1) : '..' === n[r] ? (n.splice(r, 1), a++) : a && (0 === r && (s = !0), n.splice(r, 1), a--);
                            return s && n.unshift(''), ('.' === o || '..' === o) && n.push(''), n.join('/')
                        }

                        function a(e, t, n) {
                            if (!(this instanceof a)) return new a(e, t, n);
                            var d, u, m, f, y, h, g = l.slice(),
                                v = typeof t,
                                b = this,
                                x = 0;
                            for ('object' != v && 'string' != v && (n = t, t = null), n && 'function' != typeof n && (n = c.parse), t = r(t), u = o(e || ''), d = !u.protocol && !u.slashes, b.slashes = u.slashes || d && t.slashes, b.protocol = u.protocol || t.protocol || '', e = u.rest, u.slashes || (g[2] = [/(.*)/, 'pathname']); x < g.length; x++) f = g[x], m = f[0], h = f[1], m === m ? 'string' == typeof m ? ~(y = e.indexOf(m)) && ('number' == typeof f[2] ? (b[h] = e.slice(0, y), e = e.slice(y + f[2])) : (b[h] = e.slice(y), e = e.slice(0, y))) : (y = m.exec(e)) && (b[h] = y[1], e = e.slice(0, y.index)) : b[h] = e, b[h] = b[h] || (d && f[3] ? t[h] || '' : ''), f[4] && (b[h] = b[h].toLowerCase());
                            n && (b.query = n(b.query)), d && t.slashes && '/' !== b.pathname.charAt(0) && ('' !== b.pathname || '' !== t.pathname) && (b.pathname = s(b.pathname, t.pathname)), p(b.port, b.protocol) || (b.host = b.hostname, b.port = ''), b.username = b.password = '', b.auth && (f = b.auth.split(':'), b.username = f[0] || '', b.password = f[1] || ''), b.origin = b.protocol && b.host && 'file:' !== b.protocol ? b.protocol + '//' + b.host : 'null', b.href = b.toString()
                        }
                        var p = e('requires-port'),
                            c = e('querystringify'),
                            i = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
                            d = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
                            l = [
                                ['#', 'hash'],
                                ['?', 'query'],
                                ['/', 'pathname'],
                                ['@', 'auth', 1],
                                [NaN, 'host', void 0, 1, 1],
                                [/:(\d+)$/, 'port', void 0, 1],
                                [NaN, 'hostname', void 0, 1, 1]
                            ],
                            u = {
                                hash: 1,
                                query: 1
                            };
                        a.prototype = {
                            set: function(e, t, n) {
                                var r = this;
                                'query' === e ? ('string' == typeof t && t.length && (t = (n || c.parse)(t)), r[e] = t) : 'port' === e ? (r[e] = t, p(t, r.protocol) ? t && (r.host = r.hostname + ':' + t) : (r.host = r.hostname, r[e] = '')) : 'hostname' === e ? (r[e] = t, r.port && (t += ':' + r.port), r.host = t) : 'host' === e ? (r[e] = t, /:\d+$/.test(t) ? (t = t.split(':'), r.port = t.pop(), r.hostname = t.join(':')) : (r.hostname = t, r.port = '')) : 'protocol' === e ? (r.protocol = t.toLowerCase(), r.slashes = !n) : 'pathname' === e ? r.pathname = t.length && '/' !== t.charAt(0) ? '/' + t : t : r[e] = t;
                                for (var o, s = 0; s < l.length; s++) o = l[s], o[4] && (r[o[1]] = r[o[1]].toLowerCase());
                                return r.origin = r.protocol && r.host && 'file:' !== r.protocol ? r.protocol + '//' + r.host : 'null', r.href = r.toString(), r
                            },
                            toString: function(e) {
                                e && 'function' == typeof e || (e = c.stringify);
                                var t, n = this,
                                    r = n.protocol;
                                r && ':' !== r.charAt(r.length - 1) && (r += ':');
                                var o = r + (n.slashes ? '//' : '');
                                return n.username && (o += n.username, n.password && (o += ':' + n.password), o += '@'), o += n.host + n.pathname, t = 'object' == typeof n.query ? e(n.query) : n.query, t && (o += '?' === t.charAt(0) ? t : '?' + t), n.hash && (o += n.hash), o
                            }
                        }, a.extractProtocol = o, a.location = r, a.qs = c, t.exports = a
                    }).call(this, 'undefined' == typeof a ? 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self : a)
                }, {
                    querystringify: 7,
                    "requires-port": 10
                }],
                13: [function(e, t) {
                    'use strict';

                    function n(e) {
                        var t = '';
                        do t = a[e % p] + t, e = r(e / p); while (0 < e);
                        return t
                    }

                    function o() {
                        var e = n(+new Date);
                        return e === s ? e + '.' + n(d++) : (d = 0, s = e)
                    }
                    for (var s, a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '_'], p = 64, c = {}, d = 0, l = 0; l < p; l++) c[a[l]] = l;
                    o.encode = n, o.decode = function(e) {
                        var t = 0;
                        for (l = 0; l < e.length; l++) t = t * p + c[e.charAt(l)];
                        return t
                    }, t.exports = o
                }, {}],
                14: [function(t, n) {
                    'use strict';

                    function r(e, t) {
                        if (!(e instanceof o)) {
                            var n = new Error('Primus#' + t + '\'s context should called with a Primus instance');
                            if ('function' != typeof e.listeners || !e.listeners('error').length) throw n;
                            e.emit('error', n)
                        }
                    }

                    function o(e, t) {
                        if (!(this instanceof o)) return new o(e, t);
                        if (o.Stream.call(this), 'function' != typeof this.client) return this.critical(new Error('The client library has not been compiled correctly, see https://github.com/primus/primus#client-library for more details'));
                        if ('object' == typeof e ? (t = e, e = t.url || t.uri || s) : t = t || {}, 'ping' in t || 'pong' in t) return this.critical(new Error('The `ping` and `pong` options have been removed'));
                        var n = this;
                        t.queueSize = 'queueSize' in t ? t.queueSize : Infinity, t.timeout = 'timeout' in t ? t.timeout : 1e4, t.reconnect = 'reconnect' in t ? t.reconnect : {}, t.pingTimeout = 'pingTimeout' in t ? t.pingTimeout : 45000, t.strategy = 'strategy' in t ? t.strategy : [], t.transport = 'transport' in t ? t.transport : {}, n.buffer = [], n.writable = !0, n.readable = !0, n.url = n.parse(e || s), n.readyState = o.CLOSED, n.options = t, n.timers = new i(this), n.socket = null, n.latency = 0, n.disconnect = !1, n.transport = t.transport, n.transformers = {
                            outgoing: [],
                            incoming: []
                        }, n.recovery = new p(t.reconnect), 'string' == typeof t.strategy && (t.strategy = t.strategy.split(/\s?\,\s?/g)), !1 === t.strategy ? t.strategy = [] : !t.strategy.length && (t.strategy.push('disconnect', 'online'), !this.authorization && t.strategy.push('timeout')), t.strategy = t.strategy.join(',').toLowerCase(), 'websockets' in t && (n.AVOID_WEBSOCKETS = !t.websockets), 'network' in t && (n.NETWORK_EVENTS = t.network), t.manual || n.timers.setTimeout('open', function() {
                            n.timers.clear('open'), n.open()
                        }, 0), n.initialise(t)
                    }
                    var s, a = t('eventemitter3'),
                        i = t('tick-tock'),
                        p = t('recovery'),
                        c = t('querystringify'),
                        d = t('inherits'),
                        l = t('demolish'),
                        u = t('yeast'),
                        m = /\u2028/g,
                        f = /\u2029/g;
                    try {
                        s = location.origin ? location.origin : location.protocol + '//' + location.host
                    } catch (t) {
                        s = 'http://127.0.0.1'
                    }
                    o.requires = o.require = function(n) {
                        return 'function' == typeof t ? 'function' == typeof e && e.amd ? void 0 : t(n) : void 0
                    };
                    try {
                        o.Stream = o.requires('stream')
                    } catch (t) {}
                    o.Stream || (o.Stream = a), d(o, o.Stream), o.OPENING = 1, o.CLOSED = 2, o.OPEN = 3, o.prototype.AVOID_WEBSOCKETS = !1, o.prototype.NETWORK_EVENTS = !1, o.prototype.online = !0;
                    try {
                        (o.prototype.NETWORK_EVENTS = 'onLine' in navigator && (window.addEventListener || document.body.attachEvent)) && !navigator.onLine && (o.prototype.online = !1)
                    } catch (t) {}
                    if (o.prototype.ark = {}, o.prototype.emits = t('emits'), o.prototype.plugin = function(e) {
                            if (r(this, 'plugin'), e) return this.ark[e];
                            var t = {};
                            for (e in this.ark) t[e] = this.ark[e];
                            return t
                        }, o.prototype.reserved = function(e) {
                            return /^(incoming|outgoing)::/.test(e) || e in this.reserved.events
                        }, o.prototype.reserved.events = {
                            "reconnect scheduled": 1,
                            "reconnect timeout": 1,
                            readyStateChange: 1,
                            "reconnect failed": 1,
                            reconnected: 1,
                            reconnect: 1,
                            offline: 1,
                            timeout: 1,
                            destroy: 1,
                            online: 1,
                            error: 1,
                            close: 1,
                            open: 1,
                            data: 1,
                            end: 1
                        }, o.prototype.initialise = function(e) {
                            var t, n = this;
                            for (var r in n.recovery.on('reconnected', n.emits('reconnected')).on('reconnect failed', n.emits('reconnect failed', function(e) {
                                    n.emit('end'), e()
                                })).on('reconnect timeout', n.emits('reconnect timeout')).on('reconnect scheduled', n.emits('reconnect scheduled')).on('reconnect', n.emits('reconnect', function(e) {
                                    n.emit('outgoing::reconnect'), e()
                                })), n.on('outgoing::open', function() {
                                    var e = n.readyState;
                                    n.readyState = o.OPENING, e !== n.readyState && n.emit('readyStateChange', 'opening'), t = +new Date
                                }), n.on('incoming::open', function() {
                                    var e = n.readyState;
                                    if (n.recovery.reconnecting() && n.recovery.reconnected(), n.writable = !0, n.readable = !0, n.online || (n.online = !0, n.emit('online')), n.readyState = o.OPEN, e !== n.readyState && n.emit('readyStateChange', 'open'), n.heartbeat(), n.buffer.length) {
                                        var t = n.buffer.slice(),
                                            r = t.length,
                                            s = 0;
                                        for (n.buffer.length = 0; s < r; s++) n._write(t[s])
                                    }
                                    n.emit('open')
                                }), n.on('incoming::ping', function(e) {
                                    n.online = !0, n.heartbeat(), n.emit('outgoing::pong', e), n._write('primus::pong::' + e)
                                }), n.on('incoming::error', function(t) {
                                    var r = n.timers.active('connect'),
                                        o = t;
                                    if ('string' == typeof t) o = new Error(t);
                                    else if (!(t instanceof Error) && 'object' == typeof t)
                                        for (var s in o = new Error(t.message || t.reason), t) Object.prototype.hasOwnProperty.call(t, s) && (o[s] = t[s]);
                                    return n.recovery.reconnecting() ? n.recovery.reconnected(o) : void(n.listeners('error').length && n.emit('error', o), r && (~n.options.strategy.indexOf('timeout') ? n.recovery.reconnect() : n.end()))
                                }), n.on('incoming::data', function(e) {
                                    n.decoder(e, function(t, r) {
                                        return t ? n.listeners('error').length && n.emit('error', t) : void(n.protocol(r) || n.transforms(n, n, 'incoming', r, e))
                                    })
                                }), n.on('incoming::end', function() {
                                    var e = n.readyState;
                                    return n.disconnect ? (n.disconnect = !1, n.end()) : (n.readyState = o.CLOSED, e !== n.readyState && n.emit('readyStateChange', 'end'), n.timers.active('connect') && n.end(), e !== o.OPEN) ? !!n.recovery.reconnecting() && n.recovery.reconnect() : (this.writable = !1, this.readable = !1, this.timers.clear(), n.emit('close'), ~n.options.strategy.indexOf('disconnect') ? n.recovery.reconnect() : void(n.emit('outgoing::end'), n.emit('end')))
                                }), n.client(), n.ark) n.ark[r].call(n, n, e);
                            return n.NETWORK_EVENTS ? (n.offlineHandler = function() {
                                n.online && (n.online = !1, n.emit('offline'), n.end(), n.recovery.reset())
                            }, n.onlineHandler = function() {
                                n.online || (n.online = !0, n.emit('online'), ~n.options.strategy.indexOf('online') && n.recovery.reconnect())
                            }, window.addEventListener ? (window.addEventListener('offline', n.offlineHandler, !1), window.addEventListener('online', n.onlineHandler, !1)) : document.body.attachEvent && (document.body.attachEvent('onoffline', n.offlineHandler), document.body.attachEvent('ononline', n.onlineHandler)), n) : n
                        }, o.prototype.protocol = function(e) {
                            if ('string' != typeof e || 0 !== e.indexOf('primus::')) return !1;
                            var t = e.indexOf(':', 8),
                                n = e.slice(t + 2);
                            switch (e.slice(8, t)) {
                                case 'ping':
                                    this.emit('incoming::ping', +n);
                                    break;
                                case 'server':
                                    'close' === n && (this.disconnect = !0);
                                    break;
                                case 'id':
                                    this.emit('incoming::id', n);
                                    break;
                                default:
                                    return !1;
                            }
                            return !0
                        }, o.prototype.transforms = function(e, t, n, r, o) {
                            var s = {
                                    data: r
                                },
                                a = e.transformers[n];
                            return function e(n, r) {
                                var o = a[n++];
                                return o ? 1 === o.length ? !1 === o.call(t, s) ? void 0 : e(n, r) : void o.call(t, s, function(o, s) {
                                    return o ? t.emit('error', o) : void(!1 === s || e(n, r))
                                }) : r()
                            }(0, function() {
                                return 'incoming' === n ? t.emit('data', s.data, o) : void t._write(s.data)
                            }), this
                        }, o.prototype.id = function(e) {
                            return this.socket && this.socket.id ? e(this.socket.id) : (this._write('primus::id::'), this.once('incoming::id', e))
                        }, o.prototype.open = function() {
                            return r(this, 'open'), !this.recovery.reconnecting() && this.options.timeout && this.timeout(), this.emit('outgoing::open'), this
                        }, o.prototype.write = function(e) {
                            return r(this, 'write'), this.transforms(this, this, 'outgoing', e), !0
                        }, o.prototype._write = function(e) {
                            var t = this;
                            return o.OPEN === t.readyState ? (t.encoder(e, function(e, n) {
                                return e ? t.listeners('error').length && t.emit('error', e) : void('string' == typeof n && (~n.indexOf('\u2028') && (n = n.replace(m, '\\u2028')), ~n.indexOf('\u2029') && (n = n.replace(f, '\\u2029'))), t.emit('outgoing::data', n))
                            }), !0) : (this.buffer.length === this.options.queueSize && this.buffer.splice(0, 1), this.buffer.push(e), !1)
                        }, o.prototype.heartbeat = function() {
                            return this.options.pingTimeout ? (this.timers.clear('heartbeat'), this.timers.setTimeout('heartbeat', function() {
                                this.online && (this.online = !1, this.emit('offline'), this.emit('incoming::end'))
                            }, this.options.pingTimeout), this) : this
                        }, o.prototype.timeout = function() {
                            function e() {
                                t.removeListener('error', e).removeListener('open', e).removeListener('end', e).timers.clear('connect')
                            }
                            var t = this;
                            return t.timers.setTimeout('connect', function() {
                                e(), t.readyState === o.OPEN || t.recovery.reconnecting() || (t.emit('timeout'), ~t.options.strategy.indexOf('timeout') ? t.recovery.reconnect() : t.end())
                            }, t.options.timeout), t.on('error', e).on('open', e).on('end', e)
                        }, o.prototype.end = function(e) {
                            if (r(this, 'end'), this.readyState === o.CLOSED && !this.timers.active('connect') && !this.timers.active('open')) return this.recovery.reconnecting() && (this.recovery.reset(), this.emit('end')), this;
                            void 0 !== e && this.write(e), this.writable = !1, this.readable = !1;
                            var t = this.readyState;
                            return this.readyState = o.CLOSED, t !== this.readyState && this.emit('readyStateChange', 'end'), this.timers.clear(), this.emit('outgoing::end'), this.emit('close'), this.emit('end'), this
                        }, o.prototype.destroy = l('url timers options recovery socket transport transformers', {
                            before: 'end',
                            after: ['removeAllListeners', function() {
                                this.NETWORK_EVENTS && (window.addEventListener ? (window.removeEventListener('offline', this.offlineHandler), window.removeEventListener('online', this.onlineHandler)) : document.body.attachEvent && (document.body.detachEvent('onoffline', this.offlineHandler), document.body.detachEvent('ononline', this.onlineHandler)))
                            }]
                        }), o.prototype.clone = function(e) {
                            return this.merge({}, e)
                        }, o.prototype.merge = function(e) {
                            for (var t, n, r = 1; r < arguments.length; r++)
                                for (t in n = arguments[r], n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
                            return e
                        }, o.prototype.parse = t('url-parse'), o.prototype.querystring = c.parse, o.prototype.querystringify = c.stringify, o.prototype.uri = function(e) {
                            var t = this.url,
                                n = [],
                                r = !1;
                            e.query && (r = !0), e = e || {}, e.protocol = 'protocol' in e ? e.protocol : 'http:', e.query = t.query && r && t.query.slice(1), e.secure = 'secure' in e ? e.secure : 'https:' === t.protocol || 'wss:' === t.protocol, e.auth = 'auth' in e ? e.auth : t.auth, e.pathname = 'pathname' in e ? e.pathname : this.pathname, e.port = 'port' in e ? +e.port : +t.port || (e.secure ? 443 : 80);
                            var o = this.querystring(e.query || '');
                            return o._primuscb = u(), e.query = this.querystringify(o), this.emit('outgoing::url', e), n.push(e.secure ? e.protocol.replace(':', 's:') : e.protocol, ''), n.push(e.auth ? e.auth + '@' + t.host : t.host), e.pathname && n.push(e.pathname.slice(1)), r ? n[n.length - 1] += '?' + e.query : delete e.query, e.object ? e : n.join('/')
                        }, o.prototype.transform = function(e, t) {
                            return (r(this, 'transform'), !(e in this.transformers)) ? this.critical(new Error('Invalid transformer type')) : (this.transformers[e].push(t), this)
                        }, o.prototype.critical = function(e) {
                            if (this.emit('error', e)) return this;
                            throw e
                        }, o.connect = function(e, t) {
                            return new o(e, t)
                        }, o.EventEmitter = a, o.prototype.client = function() {
                            var e, t = this.emits('incoming::data'),
                                n = this.emits('incoming::error'),
                                r = this.emits('incoming::open'),
                                s = this.emits('incoming::end'),
                                a = this,
                                i = function() {
                                    if ('undefined' != typeof eio) return eio;
                                    try {
                                        return o.requires('engine.io-client')
                                    } catch (t) {}
                                }();
                            return i ? void(a.on('outgoing::open', function() {
                                a.emit('outgoing::end'), a.socket = e = i(a.merge(a.transport, a.url, a.uri({
                                    protocol: 'http:',
                                    query: !0,
                                    object: !0
                                }), {
                                    rememberUpgrade: !1,
                                    forceBase64: !0,
                                    enablesXDR: !1,
                                    timestampRequests: !0,
                                    path: this.pathname,
                                    transports: a.AVOID_WEBSOCKETS ? ['polling'] : ['polling', 'websocket']
                                })), i.sockets && i.sockets.length && (i.sockets.length = 0), e.on('message', t), e.on('error', n), e.on('close', s), e.on('open', r)
                            }), a.on('outgoing::data', function(t) {
                                e && e.send(t)
                            }), a.on('outgoing::reconnect', function() {
                                a.emit('outgoing::open')
                            }), a.on('outgoing::end', function() {
                                e && (e.removeListener('message', t), e.removeListener('error', n), e.removeListener('close', s), e.removeListener('open', r), e.close(), e = null)
                            })) : a.critical(new Error('Missing required `engine.io-client` module. Please run `npm install --save engine.io-client`'))
                        }, o.prototype.authorization = !1, o.prototype.pathname = '/primus', o.prototype.encoder = function(e, t) {
                            var n;
                            try {
                                e = JSON.stringify(e)
                            } catch (t) {
                                n = t
                            }
                            t(n, e)
                        }, o.prototype.decoder = function(e, t) {
                            var n;
                            if ('string' != typeof e) return t(n, e);
                            try {
                                e = JSON.parse(e)
                            } catch (t) {
                                n = t
                            }
                            t(n, e)
                        }, o.prototype.version = '7.0.2', 'undefined' != typeof document && 'undefined' != typeof navigator) {
                        document.addEventListener && document.addEventListener('keydown', function(t) {
                            27 === t.keyCode && t.preventDefault && t.preventDefault()
                        }, !1);
                        var y = (navigator.userAgent || '').toLowerCase(),
                            h = y.match(/.+(?:rv|it|ra|ie)[\/: ](\d+)\.(\d+)(?:\.(\d+))?/) || [],
                            g = +[h[1], h[2]].join('.');
                        !~y.indexOf('chrome') && ~y.indexOf('safari') && 534.54 > g && (o.prototype.AVOID_WEBSOCKETS = !0)
                    }
                    n.exports = o
                }, {
                    demolish: 1,
                    emits: 2,
                    eventemitter3: 3,
                    inherits: 4,
                    querystringify: 7,
                    recovery: 8,
                    "tick-tock": 11,
                    "url-parse": 12,
                    yeast: 13
                }]
            }, {}, [14])(14);
            return t
        }, [function() {
            (function(e) {
                var t;
                'undefined' == typeof window ? 'undefined' != typeof self && (t = self) : t = window, t.eio = e()
            })(function() {
                var e = String.fromCharCode;
                return function a(p, e, t) {
                    function r(s, o) {
                        if (!e[s]) {
                            if (!p[s]) {
                                if (!o && 'function' == typeof c && c) return c(s, !0);
                                if (n) return n(s, !0);
                                var i = new Error('Cannot find module \'' + s + '\'');
                                throw i.code = 'MODULE_NOT_FOUND', i
                            }
                            var d = e[s] = {
                                exports: {}
                            };
                            p[s][0].call(d.exports, function(t) {
                                var e = p[s][1][t];
                                return r(e ? e : t)
                            }, d, d.exports, a, p, e, t)
                        }
                        return e[s].exports
                    }
                    for (var n = 'function' == typeof c && c, s = 0; s < t.length; s++) r(t[s]);
                    return r
                }({
                    1: [function(e, t) {
                        t.exports = e('./socket'), t.exports.parser = e('engine.io-parser')
                    }, {
                        "./socket": 2,
                        "engine.io-parser": 16
                    }],
                    2: [function(e, t) {
                        (function(n) {
                            function r(e, t) {
                                if (!(this instanceof r)) return new r(e, t);
                                t = t || {}, e && 'object' == typeof e && (t = e, e = null), e ? (e = c(e), t.hostname = e.host, t.secure = 'https' === e.protocol || 'wss' === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = c(t.host).host), this.secure = null == t.secure ? n.location && 'https:' === location.protocol : t.secure, t.hostname && !t.port && (t.port = this.secure ? '443' : '80'), this.agent = t.agent || !1, this.hostname = t.hostname || (n.location ? location.hostname : 'localhost'), this.port = t.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, 'string' == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || '/engine.io').replace(/\/$/, '') + '/', this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || 't', this.timestampRequests = t.timestampRequests, this.transports = t.transports || ['polling', 'websocket'], this.transportOptions = t.transportOptions || {}, this.readyState = '', this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = !(t.rejectUnauthorized !== void 0) || t.rejectUnauthorized, this.forceNode = !!t.forceNode;
                                var o = 'object' == typeof n && n;
                                o.global === o && (t.extraHeaders && 0 < Object.keys(t.extraHeaders).length && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
                            }

                            function o(e) {
                                var t = {};
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                                return t
                            }
                            var s = e('./transports/index'),
                                a = e('component-emitter'),
                                p = e('indexof'),
                                i = e('engine.io-parser'),
                                c = e('parseuri'),
                                d = e('parsejson'),
                                l = e('parseqs');
                            t.exports = r, r.priorWebsocketSuccess = !1, a(r.prototype), r.protocol = i.protocol, r.Socket = r, r.Transport = e('./transport'), r.transports = e('./transports/index'), r.parser = e('engine.io-parser'), r.prototype.createTransport = function(e) {
                                var t = o(this.query);
                                t.EIO = i.protocol, t.transport = e;
                                var n = this.transportOptions[e] || {};
                                this.id && (t.sid = this.id);
                                var r = new s[e]({
                                    query: t,
                                    socket: this,
                                    agent: n.agent || this.agent,
                                    hostname: n.hostname || this.hostname,
                                    port: n.port || this.port,
                                    secure: n.secure || this.secure,
                                    path: n.path || this.path,
                                    forceJSONP: n.forceJSONP || this.forceJSONP,
                                    jsonp: n.jsonp || this.jsonp,
                                    forceBase64: n.forceBase64 || this.forceBase64,
                                    enablesXDR: n.enablesXDR || this.enablesXDR,
                                    timestampRequests: n.timestampRequests || this.timestampRequests,
                                    timestampParam: n.timestampParam || this.timestampParam,
                                    policyPort: n.policyPort || this.policyPort,
                                    pfx: n.pfx || this.pfx,
                                    key: n.key || this.key,
                                    passphrase: n.passphrase || this.passphrase,
                                    cert: n.cert || this.cert,
                                    ca: n.ca || this.ca,
                                    ciphers: n.ciphers || this.ciphers,
                                    rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                                    perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                                    extraHeaders: n.extraHeaders || this.extraHeaders,
                                    forceNode: n.forceNode || this.forceNode,
                                    localAddress: n.localAddress || this.localAddress,
                                    requestTimeout: n.requestTimeout || this.requestTimeout,
                                    protocols: n.protocols || void 0
                                });
                                return r
                            }, r.prototype.open = function() {
                                var e;
                                if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 !== this.transports.indexOf('websocket')) e = 'websocket';
                                else {
                                    if (0 === this.transports.length) {
                                        var t = this;
                                        return void setTimeout(function() {
                                            t.emit('error', 'No transports available')
                                        }, 0)
                                    }
                                    e = this.transports[0]
                                }
                                this.readyState = 'opening';
                                try {
                                    e = this.createTransport(e)
                                } catch (t) {
                                    return this.transports.shift(), void this.open()
                                }
                                e.open(), this.setTransport(e)
                            }, r.prototype.setTransport = function(e) {
                                var t = this;
                                this.transport && this.transport.removeAllListeners(), this.transport = e, e.on('drain', function() {
                                    t.onDrain()
                                }).on('packet', function(e) {
                                    t.onPacket(e)
                                }).on('error', function(n) {
                                    t.onError(n)
                                }).on('close', function() {
                                    t.onClose('transport close')
                                })
                            }, r.prototype.probe = function(e) {
                                function t() {
                                    if (l.onlyBinaryUpgrades) {
                                        var e = !this.supportsBinary && l.transport.supportsBinary;
                                        d = d || e
                                    }
                                    d || (c.send([{
                                        type: 'ping',
                                        data: 'probe'
                                    }]), c.once('packet', function(e) {
                                        if (!d)
                                            if ('pong' === e.type && 'probe' === e.data) {
                                                if (l.upgrading = !0, l.emit('upgrading', c), !c) return;
                                                r.priorWebsocketSuccess = 'websocket' === c.name, l.transport.pause(function() {
                                                    d || 'closed' === l.readyState || (p(), l.setTransport(c), c.send([{
                                                        type: 'upgrade'
                                                    }]), l.emit('upgrade', c), c = null, l.upgrading = !1, l.flush())
                                                })
                                            } else {
                                                var t = new Error('probe error');
                                                t.transport = c.name, l.emit('upgradeError', t)
                                            }
                                    }))
                                }

                                function n() {
                                    d || (d = !0, p(), c.close(), c = null)
                                }

                                function o(e) {
                                    var t = new Error('probe error: ' + e);
                                    t.transport = c.name, n(), l.emit('upgradeError', t)
                                }

                                function s() {
                                    o('transport closed')
                                }

                                function a() {
                                    o('socket closed')
                                }

                                function i(e) {
                                    c && e.name !== c.name && n()
                                }

                                function p() {
                                    c.removeListener('open', t), c.removeListener('error', o), c.removeListener('close', s), l.removeListener('close', a), l.removeListener('upgrading', i)
                                }
                                var c = this.createTransport(e, {
                                        probe: 1
                                    }),
                                    d = !1,
                                    l = this;
                                r.priorWebsocketSuccess = !1, c.once('open', t), c.once('error', o), c.once('close', s), this.once('close', a), this.once('upgrading', i), c.open()
                            }, r.prototype.onOpen = function() {
                                if (this.readyState = 'open', r.priorWebsocketSuccess = 'websocket' === this.transport.name, this.emit('open'), this.flush(), 'open' === this.readyState && this.upgrade && this.transport.pause)
                                    for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e])
                            }, r.prototype.onPacket = function(e) {
                                if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) switch (this.emit('packet', e), this.emit('heartbeat'), e.type) {
                                    case 'open':
                                        this.onHandshake(d(e.data));
                                        break;
                                    case 'pong':
                                        this.setPing(), this.emit('pong');
                                        break;
                                    case 'error':
                                        var t = new Error('server error');
                                        t.code = e.data, this.onError(t);
                                        break;
                                    case 'message':
                                        this.emit('data', e.data), this.emit('message', e.data);
                                } else;
                            }, r.prototype.onHandshake = function(e) {
                                this.emit('handshake', e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen();
                                'closed' === this.readyState || (this.setPing(), this.removeListener('heartbeat', this.onHeartbeat), this.on('heartbeat', this.onHeartbeat))
                            }, r.prototype.onHeartbeat = function(e) {
                                clearTimeout(this.pingTimeoutTimer);
                                var t = this;
                                t.pingTimeoutTimer = setTimeout(function() {
                                    'closed' === t.readyState || t.onClose('ping timeout')
                                }, e || t.pingInterval + t.pingTimeout)
                            }, r.prototype.setPing = function() {
                                var e = this;
                                clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function() {
                                    e.ping(), e.onHeartbeat(e.pingTimeout)
                                }, e.pingInterval)
                            }, r.prototype.ping = function() {
                                var e = this;
                                this.sendPacket('ping', function() {
                                    e.emit('ping')
                                })
                            }, r.prototype.onDrain = function() {
                                this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit('drain') : this.flush()
                            }, r.prototype.flush = function() {
                                'closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit('flush'))
                            }, r.prototype.write = r.prototype.send = function(e, t, n) {
                                return this.sendPacket('message', e, t, n), this
                            }, r.prototype.sendPacket = function(e, t, n, r) {
                                if ('function' == typeof t && (r = t, t = void 0), 'function' == typeof n && (r = n, n = null), 'closing' !== this.readyState && 'closed' !== this.readyState) {
                                    n = n || {}, n.compress = !1 !== n.compress;
                                    var o = {
                                        type: e,
                                        data: t,
                                        options: n
                                    };
                                    this.emit('packetCreate', o), this.writeBuffer.push(o), r && this.once('flush', r), this.flush()
                                }
                            }, r.prototype.close = function() {
                                function e() {
                                    r.onClose('forced close'), r.transport.close()
                                }

                                function t() {
                                    r.removeListener('upgrade', t), r.removeListener('upgradeError', t), e()
                                }

                                function n() {
                                    r.once('upgrade', t), r.once('upgradeError', t)
                                }
                                if ('opening' === this.readyState || 'open' === this.readyState) {
                                    this.readyState = 'closing';
                                    var r = this;
                                    this.writeBuffer.length ? this.once('drain', function() {
                                        this.upgrading ? n() : e()
                                    }) : this.upgrading ? n() : e()
                                }
                                return this
                            }, r.prototype.onError = function(e) {
                                r.priorWebsocketSuccess = !1, this.emit('error', e), this.onClose('transport error', e)
                            }, r.prototype.onClose = function(e, t) {
                                if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
                                    var n = this;
                                    clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners('close'), this.transport.close(), this.transport.removeAllListeners(), this.readyState = 'closed', this.id = null, this.emit('close', e, t), n.writeBuffer = [], n.prevBufferLen = 0
                                }
                            }, r.prototype.filterUpgrades = function(e) {
                                for (var t = [], n = 0, r = e.length; n < r; n++) ~p(this.transports, e[n]) && t.push(e[n]);
                                return t
                            }
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "./transport": 3,
                        "./transports/index": 4,
                        "component-emitter": 14,
                        "engine.io-parser": 16,
                        indexof: 21,
                        parsejson: 23,
                        parseqs: 24,
                        parseuri: 25
                    }],
                    3: [function(e, t) {
                        function n(e) {
                            this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = '', this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress
                        }
                        var r = e('engine.io-parser'),
                            o = e('component-emitter');
                        t.exports = n, o(n.prototype), n.prototype.onError = function(e, t) {
                            var n = new Error(e);
                            return n.type = 'TransportError', n.description = t, this.emit('error', n), this
                        }, n.prototype.open = function() {
                            return ('closed' === this.readyState || '' === this.readyState) && (this.readyState = 'opening', this.doOpen()), this
                        }, n.prototype.close = function() {
                            return ('opening' === this.readyState || 'open' === this.readyState) && (this.doClose(), this.onClose()), this
                        }, n.prototype.send = function(e) {
                            if ('open' === this.readyState) this.write(e);
                            else throw new Error('Transport not open')
                        }, n.prototype.onOpen = function() {
                            this.readyState = 'open', this.writable = !0, this.emit('open')
                        }, n.prototype.onData = function(e) {
                            var t = r.decodePacket(e, this.socket.binaryType);
                            this.onPacket(t)
                        }, n.prototype.onPacket = function(e) {
                            this.emit('packet', e)
                        }, n.prototype.onClose = function() {
                            this.readyState = 'closed', this.emit('close')
                        }
                    }, {
                        "component-emitter": 14,
                        "engine.io-parser": 16
                    }],
                    4: [function(e, t, n) {
                        (function(t) {
                            var r = e('xmlhttprequest-ssl'),
                                o = e('./polling-xhr'),
                                s = e('./polling-jsonp'),
                                a = e('./websocket');
                            n.polling = function(e) {
                                var n, a = !1,
                                    i = !1,
                                    p = !1 !== e.jsonp;
                                if (t.location) {
                                    var c = 'https:' === location.protocol,
                                        d = location.port;
                                    d || (d = c ? 443 : 80), a = e.hostname !== location.hostname || d !== e.port, i = e.secure !== c
                                }
                                if (e.xdomain = a, e.xscheme = i, n = new r(e), 'open' in n && !e.forceJSONP) return new o(e);
                                if (!p) throw new Error('JSONP disabled');
                                return new s(e)
                            }, n.websocket = a
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "./polling-jsonp": 5,
                        "./polling-xhr": 6,
                        "./websocket": 8,
                        "xmlhttprequest-ssl": 9
                    }],
                    5: [function(e, t) {
                        (function(n) {
                            function r() {}

                            function o(e) {
                                s.call(this, e), this.query = this.query || {}, i || (!n.___eio && (n.___eio = []), i = n.___eio), this.index = i.length;
                                var t = this;
                                i.push(function(e) {
                                    t.onData(e)
                                }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener('beforeunload', function() {
                                    t.script && (t.script.onerror = r)
                                }, !1)
                            }
                            var s = e('./polling'),
                                a = e('component-inherit');
                            t.exports = o;
                            var i, p = /\n/g,
                                c = /\\n/g;
                            a(o, s), o.prototype.supportsBinary = !1, o.prototype.doClose = function() {
                                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), s.prototype.doClose.call(this)
                            }, o.prototype.doPoll = function() {
                                var t = this,
                                    e = document.createElement('script');
                                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function(n) {
                                    t.onError('jsonp poll error', n)
                                };
                                var n = document.getElementsByTagName('script')[0];
                                n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e;
                                var r = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
                                r && setTimeout(function() {
                                    var e = document.createElement('iframe');
                                    document.body.appendChild(e), document.body.removeChild(e)
                                }, 100)
                            }, o.prototype.doWrite = function(e, t) {
                                function n() {
                                    r(), t()
                                }

                                function r() {
                                    if (o.iframe) try {
                                        o.form.removeChild(o.iframe)
                                    } catch (t) {
                                        o.onError('jsonp polling iframe removal error', t)
                                    }
                                    try {
                                        var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                                        s = document.createElement(e)
                                    } catch (t) {
                                        s = document.createElement('iframe'), s.name = o.iframeId, s.src = 'javascript:0'
                                    }
                                    s.id = o.iframeId, o.form.appendChild(s), o.iframe = s
                                }
                                var o = this;
                                if (!this.form) {
                                    var s, a = document.createElement('form'),
                                        i = document.createElement('textarea'),
                                        d = this.iframeId = 'eio_iframe_' + this.index;
                                    a.className = 'socketio', a.style.position = 'absolute', a.style.top = '-1000px', a.style.left = '-1000px', a.target = d, a.method = 'POST', a.setAttribute('accept-charset', 'utf-8'), i.name = 'd', a.appendChild(i), document.body.appendChild(a), this.form = a, this.area = i
                                }
                                this.form.action = this.uri(), r(), e = e.replace(c, '\\\n'), this.area.value = e.replace(p, '\\n');
                                try {
                                    this.form.submit()
                                } catch (t) {}
                                this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                                    'complete' === o.iframe.readyState && n()
                                } : this.iframe.onload = n
                            }
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "./polling": 7,
                        "component-inherit": 15
                    }],
                    6: [function(t, n) {
                        (function(r) {
                            function o() {}

                            function s(e) {
                                if (c.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, r.location) {
                                    var t = 'https:' === location.protocol,
                                        n = location.port;
                                    n || (n = t ? 443 : 80), this.xd = e.hostname !== r.location.hostname || n !== e.port, this.xs = e.secure !== t
                                }
                            }

                            function a(e) {
                                this.method = e.method || 'GET', this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 === e.data ? null : e.data, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
                            }

                            function i() {
                                for (var e in a.requests) a.requests.hasOwnProperty(e) && a.requests[e].abort()
                            }
                            var p = t('xmlhttprequest-ssl'),
                                c = t('./polling'),
                                d = t('component-emitter'),
                                l = t('component-inherit');
                            n.exports = s, n.exports.Request = a, l(s, c), s.prototype.supportsBinary = !0, s.prototype.request = function(e) {
                                return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new a(e)
                            }, s.prototype.doWrite = function(e, t) {
                                var n = this.request({
                                        method: 'POST',
                                        data: e,
                                        isBinary: 'string' != typeof e && e !== void 0
                                    }),
                                    r = this;
                                n.on('success', t), n.on('error', function(e) {
                                    r.onError('xhr post error', e)
                                }), this.sendXhr = n
                            }, s.prototype.doPoll = function() {
                                var e = this.request(),
                                    t = this;
                                e.on('data', function(e) {
                                    t.onData(e)
                                }), e.on('error', function(e) {
                                    t.onError('xhr poll error', e)
                                }), this.pollXhr = e
                            }, d(a.prototype), a.prototype.create = function() {
                                var e = {
                                        agent: this.agent,
                                        xdomain: this.xd,
                                        xscheme: this.xs,
                                        enablesXDR: this.enablesXDR,
                                        pfx: this.pfx,
                                        key: this.key,
                                        passphrase: this.passphrase,
                                        cert: this.cert,
                                        ca: this.ca,
                                        ciphers: this.ciphers,
                                        rejectUnauthorized: this.rejectUnauthorized
                                    },
                                    t = this.xhr = new p(e),
                                    n = this;
                                try {
                                    t.open(this.method, this.uri, this.async);
                                    try {
                                        if (this.extraHeaders)
                                            for (var o in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o])
                                    } catch (t) {}
                                    if (this.supportsBinary && (t.responseType = 'arraybuffer'), 'POST' === this.method) try {
                                        this.isBinary ? t.setRequestHeader('Content-type', 'application/octet-stream') : t.setRequestHeader('Content-type', 'text/plain;charset=UTF-8')
                                    } catch (t) {}
                                    try {
                                        t.setRequestHeader('Accept', '*/*')
                                    } catch (t) {}
                                    'withCredentials' in t && (t.withCredentials = !0), this.requestTimeout && (t.timeout = this.requestTimeout), this.hasXDR() ? (t.onload = function() {
                                        n.onLoad()
                                    }, t.onerror = function() {
                                        n.onError(t.responseText)
                                    }) : t.onreadystatechange = function() {
                                        4 !== t.readyState || (200 === t.status || 1223 === t.status ? n.onLoad() : setTimeout(function() {
                                            n.onError(t.status)
                                        }, 0))
                                    }, t.send(this.data)
                                } catch (t) {
                                    return void setTimeout(function() {
                                        n.onError(t)
                                    }, 0)
                                }
                                r.document && (this.index = a.requestsCount++, a.requests[this.index] = this)
                            }, a.prototype.onSuccess = function() {
                                this.emit('success'), this.cleanup()
                            }, a.prototype.onData = function(e) {
                                this.emit('data', e), this.onSuccess()
                            }, a.prototype.onError = function(e) {
                                this.emit('error', e), this.cleanup(!0)
                            }, a.prototype.cleanup = function(e) {
                                if ('undefined' != typeof this.xhr && null !== this.xhr) {
                                    if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = o : this.xhr.onreadystatechange = o, e) try {
                                        this.xhr.abort()
                                    } catch (t) {}
                                    r.document && delete a.requests[this.index], this.xhr = null
                                }
                            }, a.prototype.onLoad = function() {
                                var t;
                                try {
                                    var n;
                                    try {
                                        n = this.xhr.getResponseHeader('Content-Type').split(';')[0]
                                    } catch (t) {}
                                    if ('application/octet-stream' === n) t = this.xhr.response || this.xhr.responseText;
                                    else if (!this.supportsBinary) t = this.xhr.responseText;
                                    else try {
                                        t = e.apply(null, new Uint8Array(this.xhr.response))
                                    } catch (n) {
                                        for (var r = new Uint8Array(this.xhr.response), o = [], s = 0, a = r.length; s < a; s++) o.push(r[s]);
                                        t = e.apply(null, o)
                                    }
                                } catch (t) {
                                    this.onError(t)
                                }
                                null != t && this.onData(t)
                            }, a.prototype.hasXDR = function() {
                                return 'undefined' != typeof r.XDomainRequest && !this.xs && this.enablesXDR
                            }, a.prototype.abort = function() {
                                this.cleanup()
                            }, a.requestsCount = 0, a.requests = {}, r.document && (r.attachEvent ? r.attachEvent('onunload', i) : r.addEventListener && r.addEventListener('beforeunload', i, !1))
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "./polling": 7,
                        "component-emitter": 14,
                        "component-inherit": 15,
                        "xmlhttprequest-ssl": 9
                    }],
                    7: [function(e, t) {
                        function n(e) {
                            var t = e && e.forceBase64;
                            (!p || t) && (this.supportsBinary = !1), r.call(this, e)
                        }
                        var r = e('../transport'),
                            o = e('parseqs'),
                            s = e('engine.io-parser'),
                            a = e('component-inherit'),
                            i = e('yeast');
                        t.exports = n;
                        var p = function() {
                            var t = e('xmlhttprequest-ssl'),
                                n = new t({
                                    xdomain: !1
                                });
                            return null != n.responseType
                        }();
                        a(n, r), n.prototype.name = 'polling', n.prototype.doOpen = function() {
                            this.poll()
                        }, n.prototype.pause = function(e) {
                            function t() {
                                n.readyState = 'paused', e()
                            }
                            var n = this;
                            if (this.readyState = 'pausing', this.polling || !this.writable) {
                                var r = 0;
                                this.polling && (r++, this.once('pollComplete', function() {
                                    --r || t()
                                })), this.writable || (r++, this.once('drain', function() {
                                    --r || t()
                                }))
                            } else t()
                        }, n.prototype.poll = function() {
                            this.polling = !0, this.doPoll(), this.emit('poll')
                        }, n.prototype.onData = function(e) {
                            var t = this;
                            s.decodePayload(e, this.socket.binaryType, this.supportsBinary, function(e) {
                                return 'opening' === t.readyState && t.onOpen(), 'close' === e.type ? (t.onClose(), !1) : void t.onPacket(e)
                            }), 'closed' !== this.readyState && (this.polling = !1, this.emit('pollComplete'), 'open' === this.readyState && this.poll())
                        }, n.prototype.doClose = function() {
                            function e() {
                                t.write([{
                                    type: 'close'
                                }])
                            }
                            var t = this;
                            'open' === this.readyState ? e() : this.once('open', e)
                        }, n.prototype.write = function(e) {
                            var t = this;
                            this.writable = !1;
                            var n = function() {
                                t.writable = !0, t.emit('drain')
                            };
                            s.encodePayload(e, this.supportsBinary, function(e) {
                                t.doWrite(e, n)
                            })
                        }, n.prototype.uri = function() {
                            var e = this.query || {},
                                t = this.secure ? 'https' : 'http',
                                n = '';
                            !1 !== this.timestampRequests && (e[this.timestampParam] = i()), this.supportsBinary || e.sid || (e.b64 = 1), e = o.encode(e), this.port && ('https' == t && 443 !== +this.port || 'http' == t && 80 !== +this.port) && (n = ':' + this.port), e.length && (e = '?' + e);
                            var r = -1 !== this.hostname.indexOf(':');
                            return t + '://' + (r ? '[' + this.hostname + ']' : this.hostname) + n + this.path + e
                        }
                    }, {
                        "../transport": 3,
                        "component-inherit": 15,
                        "engine.io-parser": 16,
                        parseqs: 24,
                        "xmlhttprequest-ssl": 9,
                        yeast: 26
                    }],
                    8: [function(e, t) {
                        (function(n) {
                            function r(e) {
                                var t = e && e.forceBase64;
                                t && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = d && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (l = o), s.call(this, e)
                            }
                            var o, s = e('../transport'),
                                a = e('engine.io-parser'),
                                i = e('parseqs'),
                                p = e('component-inherit'),
                                c = e('yeast'),
                                d = n.WebSocket || n.MozWebSocket;
                            if ('undefined' == typeof window) try {
                                o = e('ws')
                            } catch (t) {}
                            var l = d;
                            l || 'undefined' != typeof window || (l = o), t.exports = r, p(r, s), r.prototype.name = 'websocket', r.prototype.supportsBinary = !0, r.prototype.doOpen = function() {
                                if (this.check()) {
                                    var e = this.uri(),
                                        t = this.protocols,
                                        n = {
                                            agent: this.agent,
                                            perMessageDeflate: this.perMessageDeflate
                                        };
                                    n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (n.headers = this.extraHeaders), this.localAddress && (n.localAddress = this.localAddress);
                                    try {
                                        this.ws = this.usingBrowserWebSocket ? t ? new l(e, t) : new l(e) : new l(e, t, n)
                                    } catch (e) {
                                        return this.emit('error', e)
                                    }
                                    void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = 'nodebuffer') : this.ws.binaryType = 'arraybuffer', this.addEventListeners()
                                }
                            }, r.prototype.addEventListeners = function() {
                                var t = this;
                                this.ws.onopen = function() {
                                    t.onOpen()
                                }, this.ws.onclose = function() {
                                    t.onClose()
                                }, this.ws.onmessage = function(e) {
                                    t.onData(e.data)
                                }, this.ws.onerror = function(n) {
                                    t.onError('websocket error', n)
                                }
                            }, r.prototype.write = function(e) {
                                function t() {
                                    r.emit('flush'), setTimeout(function() {
                                        r.writable = !0, r.emit('drain')
                                    }, 0)
                                }
                                var r = this;
                                this.writable = !1;
                                for (var o = e.length, s = 0, i = o; s < i; s++)(function(e) {
                                    a.encodePacket(e, r.supportsBinary, function(s) {
                                        if (!r.usingBrowserWebSocket) {
                                            var a = {};
                                            if (e.options && (a.compress = e.options.compress), r.perMessageDeflate) {
                                                var i = 'string' == typeof s ? n.Buffer.byteLength(s) : s.length;
                                                i < r.perMessageDeflate.threshold && (a.compress = !1)
                                            }
                                        }
                                        try {
                                            r.usingBrowserWebSocket ? r.ws.send(s) : r.ws.send(s, a)
                                        } catch (t) {}--o || t()
                                    })
                                })(e[s])
                            }, r.prototype.onClose = function() {
                                s.prototype.onClose.call(this)
                            }, r.prototype.doClose = function() {
                                'undefined' != typeof this.ws && this.ws.close()
                            }, r.prototype.uri = function() {
                                var e = this.query || {},
                                    t = this.secure ? 'wss' : 'ws',
                                    n = '';
                                this.port && ('wss' == t && 443 !== +this.port || 'ws' == t && 80 !== +this.port) && (n = ':' + this.port), this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary || (e.b64 = 1), e = i.encode(e), e.length && (e = '?' + e);
                                var r = -1 !== this.hostname.indexOf(':');
                                return t + '://' + (r ? '[' + this.hostname + ']' : this.hostname) + n + this.path + e
                            }, r.prototype.check = function() {
                                return !!l && !('__initialize' in l && this.name === r.prototype.name)
                            }
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "../transport": 3,
                        "component-inherit": 15,
                        "engine.io-parser": 16,
                        parseqs: 24,
                        ws: void 0,
                        yeast: 26
                    }],
                    9: [function(e, t) {
                        (function(n) {
                            var r = e('has-cors');
                            t.exports = function(e) {
                                var t = e.xdomain,
                                    o = e.xscheme,
                                    s = e.enablesXDR;
                                try {
                                    if ('undefined' != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest
                                } catch (t) {}
                                try {
                                    if ('undefined' != typeof XDomainRequest && !o && s) return new XDomainRequest
                                } catch (t) {}
                                if (!t) try {
                                    return new n[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP')
                                } catch (t) {}
                            }
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "has-cors": 20
                    }],
                    10: [function(e, t) {
                        function n() {}
                        t.exports = function(e, t, r) {
                            function o(e, n) {
                                if (0 >= o.count) throw new Error('after called too many times');
                                --o.count, e ? (s = !0, t(e), t = r) : 0 === o.count && !s && t(null, n)
                            }
                            var s = !1;
                            return r = r || n, o.count = e, 0 === e ? t() : o
                        }
                    }, {}],
                    11: [function(e, t) {
                        t.exports = function(e, t, n) {
                            var r = e.byteLength;
                            if (t = t || 0, n = n || r, e.slice) return e.slice(t, n);
                            if (0 > t && (t += r), 0 > n && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r) return new ArrayBuffer(0);
                            for (var o = new Uint8Array(e), s = new Uint8Array(n - t), a = t, i = 0; a < n; a++, i++) s[i] = o[a];
                            return s.buffer
                        }
                    }, {}],
                    12: [function(e, t, n) {
                        (function() {
                            'use strict';
                            for (var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', t = new Uint8Array(256), r = 0; r < e.length; r++) t[e.charCodeAt(r)] = r;
                            n.encode = function(t) {
                                var n, r = new Uint8Array(t),
                                    o = r.length,
                                    s = '';
                                for (n = 0; n < o; n += 3) s += e[r[n] >> 2], s += e[(3 & r[n]) << 4 | r[n + 1] >> 4], s += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], s += e[63 & r[n + 2]];
                                return 2 == o % 3 ? s = s.substring(0, s.length - 1) + '=' : 1 == o % 3 && (s = s.substring(0, s.length - 2) + '=='), s
                            }, n.decode = function(e) {
                                var n, r, o, s, a, i = 0.75 * e.length,
                                    c = e.length,
                                    d = 0;
                                '=' === e[e.length - 1] && (i--, '=' === e[e.length - 2] && i--);
                                var p = new ArrayBuffer(i),
                                    l = new Uint8Array(p);
                                for (n = 0; n < c; n += 4) r = t[e.charCodeAt(n)], o = t[e.charCodeAt(n + 1)], s = t[e.charCodeAt(n + 2)], a = t[e.charCodeAt(n + 3)], l[d++] = r << 2 | o >> 4, l[d++] = (15 & o) << 4 | s >> 2, l[d++] = (3 & s) << 6 | 63 & a;
                                return p
                            }
                        })()
                    }, {}],
                    13: [function(e, t) {
                        (function(e) {
                            function n(e) {
                                for (var t, n = 0; n < e.length; n++)
                                    if (t = e[n], t.buffer instanceof ArrayBuffer) {
                                        var r = t.buffer;
                                        if (t.byteLength !== r.byteLength) {
                                            var o = new Uint8Array(t.byteLength);
                                            o.set(new Uint8Array(r, t.byteOffset, t.byteLength)), r = o.buffer
                                        }
                                        e[n] = r
                                    }
                            }

                            function r(e, t) {
                                t = t || {};
                                var r = new s;
                                n(e);
                                for (var o = 0; o < e.length; o++) r.append(e[o]);
                                return t.type ? r.getBlob(t.type) : r.getBlob()
                            }

                            function o(e, t) {
                                return n(e), new Blob(e, t || {})
                            }
                            var s = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                                a = function() {
                                    try {
                                        var e = new Blob(['hi']);
                                        return 2 === e.size
                                    } catch (t) {
                                        return !1
                                    }
                                }(),
                                i = a && function() {
                                    try {
                                        var e = new Blob([new Uint8Array([1, 2])]);
                                        return 2 === e.size
                                    } catch (t) {
                                        return !1
                                    }
                                }(),
                                p = s && s.prototype.append && s.prototype.getBlob;
                            t.exports = function() {
                                return a ? i ? e.Blob : o : p ? r : void 0
                            }()
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {}],
                    14: [function(e, t) {
                        function n(e) {
                            if (e) return r(e)
                        }

                        function r(e) {
                            for (var t in n.prototype) e[t] = n.prototype[t];
                            return e
                        }
                        'undefined' != typeof t && (t.exports = n);
                        n.prototype.on = n.prototype.addEventListener = function(e, t) {
                            return this._callbacks = this._callbacks || {}, (this._callbacks['$' + e] = this._callbacks['$' + e] || []).push(t), this
                        }, n.prototype.once = function(e, t) {
                            function n() {
                                this.off(e, n), t.apply(this, arguments)
                            }
                            return n.fn = t, this.on(e, n), this
                        }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(e, t) {
                            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                            var n = this._callbacks['$' + e];
                            if (!n) return this;
                            if (1 == arguments.length) return delete this._callbacks['$' + e], this;
                            for (var r, o = 0; o < n.length; o++)
                                if (r = n[o], r === t || r.fn === t) {
                                    n.splice(o, 1);
                                    break
                                } return this
                        }, n.prototype.emit = function(e) {
                            this._callbacks = this._callbacks || {};
                            var t = [].slice.call(arguments, 1),
                                n = this._callbacks['$' + e];
                            if (n) {
                                n = n.slice(0);
                                for (var r = 0, o = n.length; r < o; ++r) n[r].apply(this, t)
                            }
                            return this
                        }, n.prototype.listeners = function(e) {
                            return this._callbacks = this._callbacks || {}, this._callbacks['$' + e] || []
                        }, n.prototype.hasListeners = function(e) {
                            return !!this.listeners(e).length
                        }
                    }, {}],
                    15: [function(e, t) {
                        t.exports = function(e, t) {
                            var n = function() {};
                            n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
                        }
                    }, {}],
                    16: [function(t, n, r) {
                        (function(n) {
                            function o(e, t) {
                                var n = 'b' + r.packets[e.type] + e.data.data;
                                return t(n)
                            }

                            function s(e, t, n) {
                                if (!t) return r.encodeBase64Packet(e, n);
                                var o = e.data,
                                    s = new Uint8Array(o),
                                    a = new Uint8Array(1 + o.byteLength);
                                a[0] = b[e.type];
                                for (var p = 0; p < s.length; p++) a[p + 1] = s[p];
                                return n(a.buffer)
                            }

                            function a(e, t, n) {
                                if (!t) return r.encodeBase64Packet(e, n);
                                var o = new FileReader;
                                return o.onload = function() {
                                    e.data = o.result, r.encodePacket(e, t, !0, n)
                                }, o.readAsArrayBuffer(e.data)
                            }

                            function i(e, t, n) {
                                if (!t) return r.encodeBase64Packet(e, n);
                                if (v) return a(e, t, n);
                                var o = new Uint8Array(1);
                                o[0] = b[e.type];
                                var s = new k([o.buffer, e.data]);
                                return n(s)
                            }

                            function p(e) {
                                try {
                                    e = y.decode(e, {
                                        strict: !1
                                    })
                                } catch (t) {
                                    return !1
                                }
                                return e
                            }

                            function c(e, t, n) {
                                for (var r = Array(e.length), o = f(e.length, n), s = function(e, n, o) {
                                        t(n, function(t, n) {
                                            r[e] = n, o(t, r)
                                        })
                                    }, a = 0; a < e.length; a++) s(a, e[a], o)
                            }
                            var d, l = t('./keys'),
                                u = t('has-binary2'),
                                m = t('arraybuffer.slice'),
                                f = t('after'),
                                y = t('./utf8');
                            n && n.ArrayBuffer && (d = t('base64-arraybuffer'));
                            var h = 'undefined' != typeof navigator && /Android/i.test(navigator.userAgent),
                                g = 'undefined' != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
                                v = h || g;
                            r.protocol = 3;
                            var b = r.packets = {
                                    open: 0,
                                    close: 1,
                                    ping: 2,
                                    pong: 3,
                                    message: 4,
                                    upgrade: 5,
                                    noop: 6
                                },
                                x = l(b),
                                _ = {
                                    type: 'error',
                                    data: 'parser error'
                                },
                                k = t('blob');
                            r.encodePacket = function(e, t, r, a) {
                                'function' == typeof t && (a = t, t = !1), 'function' == typeof r && (a = r, r = null);
                                var p = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                                if (n.ArrayBuffer && p instanceof ArrayBuffer) return s(e, t, a);
                                if (k && p instanceof n.Blob) return i(e, t, a);
                                if (p && p.base64) return o(e, a);
                                var c = b[e.type];
                                return void 0 !== e.data && (c += r ? y.encode(e.data + '', {
                                    strict: !1
                                }) : e.data + ''), a('' + c)
                            }, r.encodeBase64Packet = function(t, o) {
                                var s = 'b' + r.packets[t.type];
                                if (k && t.data instanceof n.Blob) {
                                    var a = new FileReader;
                                    return a.onload = function() {
                                        var e = a.result.split(',')[1];
                                        o(s + e)
                                    }, a.readAsDataURL(t.data)
                                }
                                var p;
                                try {
                                    p = e.apply(null, new Uint8Array(t.data))
                                } catch (n) {
                                    for (var c = new Uint8Array(t.data), d = Array(c.length), l = 0; l < c.length; l++) d[l] = c[l];
                                    p = e.apply(null, d)
                                }
                                return s += n.btoa(p), o(s)
                            }, r.decodePacket = function(e, t, n) {
                                if (void 0 === e) return _;
                                if ('string' == typeof e) {
                                    if ('b' === e.charAt(0)) return r.decodeBase64Packet(e.substr(1), t);
                                    if (n && (e = p(e), !1 === e)) return _;
                                    var o = e.charAt(0);
                                    return +o == o && x[o] ? 1 < e.length ? {
                                        type: x[o],
                                        data: e.substring(1)
                                    } : {
                                        type: x[o]
                                    } : _
                                }
                                var s = new Uint8Array(e),
                                    o = s[0],
                                    a = m(e, 1);
                                return k && 'blob' === t && (a = new k([a])), {
                                    type: x[o],
                                    data: a
                                }
                            }, r.decodeBase64Packet = function(e, t) {
                                var n = x[e.charAt(0)];
                                if (!d) return {
                                    type: n,
                                    data: {
                                        base64: !0,
                                        data: e.substr(1)
                                    }
                                };
                                var r = d.decode(e.substr(1));
                                return 'blob' === t && k && (r = new k([r])), {
                                    type: n,
                                    data: r
                                }
                            }, r.encodePayload = function(e, t, n) {
                                function o(e) {
                                    return e.length + ':' + e
                                }
                                'function' == typeof t && (n = t, t = null);
                                var s = u(e);
                                return t && s ? k && !v ? r.encodePayloadAsBlob(e, n) : r.encodePayloadAsArrayBuffer(e, n) : e.length ? void c(e, function(e, n) {
                                    r.encodePacket(e, !!s && t, !1, function(e) {
                                        n(null, o(e))
                                    })
                                }, function(e, t) {
                                    return n(t.join(''))
                                }) : n('0:')
                            }, r.decodePayload = function(e, t, o, s) {
                                if ('string' != typeof e) return r.decodePayloadAsBinary(e, t, s);
                                'function' == typeof t && (s = t, t = null), 'function' == typeof o && (s = o, o = null);
                                var a;
                                if ('' === e) return s(_, 0, 1);
                                if (o && (e = p(e), !1 === e)) return s(_, 0, 1);
                                for (var c, n, d, u = '', m = 0, i = e.length; m < i; m++) {
                                    if (d = e.charAt(m), ':' !== d) {
                                        u += d;
                                        continue
                                    }
                                    if ('' === u || u != (c = +u)) return s(_, 0, 1);
                                    if (n = e.substr(m + 1, c), u != n.length) return s(_, 0, 1);
                                    if (n.length) {
                                        if (a = r.decodePacket(n, t, !1), _.type === a.type && _.data === a.data) return s(_, 0, 1);
                                        var l = s(a, m + c, i);
                                        if (!1 === l) return
                                    }
                                    m += c, u = ''
                                }
                                if ('' !== u) return s(_, 0, 1)
                            }, r.encodePayloadAsArrayBuffer = function(e, t) {
                                return e.length ? void c(e, function(e, t) {
                                    r.encodePacket(e, !0, !0, function(e) {
                                        return t(null, e)
                                    })
                                }, function(e, n) {
                                    var r = n.reduce(function(e, t) {
                                            var n;
                                            return n = 'string' == typeof t ? t.length : t.byteLength, e + n.toString().length + n + 2
                                        }, 0),
                                        o = new Uint8Array(r),
                                        s = 0;
                                    return n.forEach(function(e) {
                                        var t = 'string' == typeof e,
                                            n = e;
                                        if (t) {
                                            for (var r = new Uint8Array(e.length), a = 0; a < e.length; a++) r[a] = e.charCodeAt(a);
                                            n = r.buffer
                                        }
                                        o[s++] = t ? 0 : 1;
                                        for (var i = n.byteLength.toString(), a = 0; a < i.length; a++) o[s++] = parseInt(i[a]);
                                        o[s++] = 255;
                                        for (var r = new Uint8Array(n), a = 0; a < r.length; a++) o[s++] = r[a]
                                    }), t(o.buffer)
                                }) : t(new ArrayBuffer(0))
                            }, r.encodePayloadAsBlob = function(e, t) {
                                c(e, function(e, t) {
                                    r.encodePacket(e, !0, !0, function(e) {
                                        var n = new Uint8Array(1);
                                        if (n[0] = 1, 'string' == typeof e) {
                                            for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                                            e = r.buffer, n[0] = 0
                                        }
                                        for (var s = e instanceof ArrayBuffer ? e.byteLength : e.size, a = s.toString(), i = new Uint8Array(a.length + 1), o = 0; o < a.length; o++) i[o] = parseInt(a[o]);
                                        if (i[a.length] = 255, k) {
                                            var p = new k([n.buffer, i.buffer, e]);
                                            t(null, p)
                                        }
                                    })
                                }, function(e, n) {
                                    return t(new k(n))
                                })
                            }, r.decodePayloadAsBinary = function(t, n, o) {
                                'function' == typeof n && (o = n, n = null);
                                for (var s = t, a = []; 0 < s.byteLength;) {
                                    for (var p = new Uint8Array(s), c = 0 === p[0], d = '', l = 1;; l++) {
                                        if (255 === p[l]) break;
                                        if (310 < d.length) return o(_, 0, 1);
                                        d += p[l]
                                    }
                                    s = m(s, 2 + d.length), d = parseInt(d);
                                    var i = m(s, 0, d);
                                    if (c) try {
                                        i = e.apply(null, new Uint8Array(i))
                                    } catch (t) {
                                        var u = new Uint8Array(i);
                                        i = '';
                                        for (var l = 0; l < u.length; l++) i += e(u[l])
                                    }
                                    a.push(i), s = m(s, d)
                                }
                                var f = a.length;
                                a.forEach(function(e, t) {
                                    o(r.decodePacket(e, n, !0), t, f)
                                })
                            }
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        "./keys": 17,
                        "./utf8": 18,
                        after: 10,
                        "arraybuffer.slice": 11,
                        "base64-arraybuffer": 12,
                        blob: 13,
                        "has-binary2": 19
                    }],
                    17: [function(e, t) {
                        t.exports = Object.keys || function(e) {
                            var t = [],
                                n = Object.prototype.hasOwnProperty;
                            for (var r in e) n.call(e, r) && t.push(r);
                            return t
                        }
                    }, {}],
                    18: [function(t, n, r) {
                        (function(t) {
                            (function(o) {
                                function s(e) {
                                    for (var t, n, r = [], o = 0, s = e.length; o < s;) t = e.charCodeAt(o++), 55296 <= t && 56319 >= t && o < s ? (n = e.charCodeAt(o++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), o--)) : r.push(t);
                                    return r
                                }

                                function a(e) {
                                    for (var t, n = e.length, r = -1, o = ''; ++r < n;) t = e[r], 65535 < t && (t -= 65536, o += v(55296 | 1023 & t >>> 10), t = 56320 | 1023 & t), o += v(t);
                                    return o
                                }

                                function i(e, t) {
                                    if (55296 <= e && 57343 >= e) {
                                        if (t) throw Error('Lone surrogate U+' + e.toString(16).toUpperCase() + ' is not a scalar value');
                                        return !1
                                    }
                                    return !0
                                }

                                function p(e, t) {
                                    return v(128 | 63 & e >> t)
                                }

                                function c(e, t) {
                                    if (0 == (4294967168 & e)) return v(e);
                                    var n = '';
                                    return 0 == (4294965248 & e) ? n = v(192 | 31 & e >> 6) : 0 == (4294901760 & e) ? (!i(e, t) && (e = 65533), n = v(224 | 15 & e >> 12), n += p(e, 6)) : 0 == (4292870144 & e) && (n = v(240 | 7 & e >> 18), n += p(e, 12), n += p(e, 6)), n += v(128 | 63 & e), n
                                }

                                function d() {
                                    if (g >= h) throw Error('Invalid byte index');
                                    var e = 255 & y[g];
                                    if (g++, 128 == (192 & e)) return 63 & e;
                                    throw Error('Invalid continuation byte')
                                }

                                function l(e) {
                                    var t, n, r, o, s;
                                    if (g > h) throw Error('Invalid byte index');
                                    if (g == h) return !1;
                                    if (t = 255 & y[g], g++, 0 == (128 & t)) return t;
                                    if (192 == (224 & t)) {
                                        if (n = d(), s = (31 & t) << 6 | n, 128 <= s) return s;
                                        throw Error('Invalid continuation byte')
                                    }
                                    if (224 == (240 & t)) {
                                        if (n = d(), r = d(), s = (15 & t) << 12 | n << 6 | r, 2048 <= s) return i(s, e) ? s : 65533;
                                        throw Error('Invalid continuation byte')
                                    }
                                    if (240 == (248 & t) && (n = d(), r = d(), o = d(), s = (7 & t) << 18 | n << 12 | r << 6 | o, 65536 <= s && 1114111 >= s)) return s;
                                    throw Error('Invalid UTF-8 detected')
                                }
                                var u = 'object' == typeof r && r,
                                    m = 'object' == typeof n && n && n.exports == u && n,
                                    f = 'object' == typeof t && t;
                                (f.global === f || f.window === f) && (o = f);
                                var y, h, g, v = e,
                                    b = {
                                        version: '2.1.2',
                                        encode: function(e, t) {
                                            t = t || {};
                                            for (var n, r = !1 !== t.strict, o = s(e), a = o.length, i = -1, p = ''; ++i < a;) n = o[i], p += c(n, r);
                                            return p
                                        },
                                        decode: function(e, t) {
                                            t = t || {};
                                            var n = !1 !== t.strict;
                                            y = s(e), h = y.length, g = 0;
                                            for (var r, o = []; !1 !== (r = l(n));) o.push(r);
                                            return a(o)
                                        }
                                    };
                                if (!(u && !u.nodeType)) o.utf8 = b;
                                else if (m) m.exports = b;
                                else {
                                    var x = {}.hasOwnProperty;
                                    for (var _ in b) x.call(b, _) && (u[_] = b[_])
                                }
                            })(this)
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {}],
                    19: [function(e, t) {
                        (function(n) {
                            function r(e) {
                                if (!e || 'object' != typeof e) return !1;
                                if (o(e)) {
                                    for (var t = 0, s = e.length; t < s; t++)
                                        if (r(e[t])) return !0;
                                    return !1
                                }
                                if ('function' == typeof n.Buffer && n.Buffer.isBuffer && n.Buffer.isBuffer(e) || 'function' == typeof n.ArrayBuffer && e instanceof ArrayBuffer || 'function' == typeof n.Blob && e instanceof Blob || 'function' == typeof n.File && e instanceof File) return !0;
                                if (e.toJSON && 'function' == typeof e.toJSON && 1 === arguments.length) return r(e.toJSON(), !0);
                                for (var a in e)
                                    if (Object.prototype.hasOwnProperty.call(e, a) && r(e[a])) return !0;
                                return !1
                            }
                            var o = e('isarray');
                            t.exports = r
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {
                        isarray: 22
                    }],
                    20: [function(e, t) {
                        try {
                            t.exports = 'undefined' != typeof XMLHttpRequest && 'withCredentials' in new XMLHttpRequest
                        } catch (e) {
                            t.exports = !1
                        }
                    }, {}],
                    21: [function(e, t) {
                        var n = [].indexOf;
                        t.exports = function(e, t) {
                            if (n) return e.indexOf(t);
                            for (var r = 0; r < e.length; ++r)
                                if (e[r] === t) return r;
                            return -1
                        }
                    }, {}],
                    22: [function(e, t) {
                        var n = {}.toString;
                        t.exports = Array.isArray || function(e) {
                            return '[object Array]' == n.call(e)
                        }
                    }, {}],
                    23: [function(e, t) {
                        (function(e) {
                            var n = /^[\],:{}\s]*$/,
                                r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                                o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                s = /(?:^|:|,)(?:\s*\[)+/g,
                                a = /^\s+/,
                                i = /\s+$/;
                            t.exports = function(t) {
                                return 'string' == typeof t && t ? (t = t.replace(a, '').replace(i, ''), e.JSON && JSON.parse ? JSON.parse(t) : n.test(t.replace(r, '@').replace(o, ']').replace(s, '')) ? new Function('return ' + t)() : void 0) : null
                            }
                        }).call(this, 'undefined' == typeof self ? 'undefined' == typeof window ? {} : window : self)
                    }, {}],
                    24: [function(e, t, n) {
                        n.encode = function(e) {
                            var t = '';
                            for (var n in e) e.hasOwnProperty(n) && (t.length && (t += '&'), t += encodeURIComponent(n) + '=' + encodeURIComponent(e[n]));
                            return t
                        }, n.decode = function(e) {
                            for (var t, n = {}, r = e.split('&'), o = 0, s = r.length; o < s; o++) t = r[o].split('='), n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
                            return n
                        }
                    }, {}],
                    25: [function(e, t) {
                        var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                            r = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
                        t.exports = function(t) {
                            var o = t,
                                s = t.indexOf('['),
                                a = t.indexOf(']'); - 1 != s && -1 != a && (t = t.substring(0, s) + t.substring(s, a).replace(/:/g, ';') + t.substring(a, t.length));
                            for (var e = n.exec(t || ''), p = {}, c = 14; c--;) p[r[c]] = e[c] || '';
                            return -1 != s && -1 != a && (p.source = o, p.host = p.host.substring(1, p.host.length - 1).replace(/;/g, ':'), p.authority = p.authority.replace('[', '').replace(']', '').replace(/;/g, ':'), p.ipv6uri = !0), p
                        }
                    }, {}],
                    26: [function(e, t) {
                        'use strict';

                        function n(e) {
                            var t = '';
                            do t = a[e % p] + t, e = r(e / p); while (0 < e);
                            return t
                        }

                        function o() {
                            var e = n(+new Date);
                            return e === s ? e + '.' + n(d++) : (d = 0, s = e)
                        }
                        for (var s, a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '_'], p = 64, c = {}, d = 0, l = 0; l < p; l++) c[a[l]] = l;
                        o.encode = n, o.decode = function(e) {
                            var t = 0;
                            for (l = 0; l < e.length; l++) t = t * p + c[e.charAt(l)];
                            return t
                        }, t.exports = o
                    }, {}],
                    27: [function(e, t) {
                        t.exports = e('./lib/index')
                    }, {
                        "./lib/index": 1
                    }]
                }, {}, [27])(27)
            })
        }])
    }).call(t, n(1).clearImmediate, n(1).setImmediate, n(0))
}, function(e, t, n) {
    (function(e, t) {
        (function(e) {
            'use strict';

            function n(e) {
                'function' != typeof e && (e = new Function('' + e));
                for (var t = Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
                var r = {
                    callback: e,
                    args: t
                };
                return f[m] = r, u(m), m++
            }

            function r(e) {
                delete f[e]
            }

            function o(e) {
                var t = e.callback,
                    n = e.args;
                switch (n.length) {
                    case 0:
                        t();
                        break;
                    case 1:
                        t(n[0]);
                        break;
                    case 2:
                        t(n[0], n[1]);
                        break;
                    case 3:
                        t(n[0], n[1], n[2]);
                        break;
                    default:
                        t.apply(void 0, n);
                }
            }

            function s(e) {
                if (y) setTimeout(s, 0, e);
                else {
                    var t = f[e];
                    if (t) {
                        y = !0;
                        try {
                            o(t)
                        } finally {
                            r(e), y = !1
                        }
                    }
                }
            }

            function a() {
                u = function(e) {
                    t.nextTick(function() {
                        s(e)
                    })
                }
            }

            function i() {
                if (e.postMessage && !e.importScripts) {
                    var t = !0,
                        n = e.onmessage;
                    return e.onmessage = function() {
                        t = !1
                    }, e.postMessage('', '*'), e.onmessage = n, t
                }
            }

            function p() {
                var t = 'setImmediate$' + Math.random() + '$',
                    n = function(n) {
                        n.source === e && 'string' == typeof n.data && 0 === n.data.indexOf(t) && s(+n.data.slice(t.length))
                    };
                e.addEventListener ? e.addEventListener('message', n, !1) : e.attachEvent('onmessage', n), u = function(n) {
                    e.postMessage(t + n, '*')
                }
            }

            function c() {
                var e = new MessageChannel;
                e.port1.onmessage = function(e) {
                    var t = e.data;
                    s(t)
                }, u = function(t) {
                    e.port2.postMessage(t)
                }
            }

            function d() {
                var e = h.documentElement;
                u = function(t) {
                    var n = h.createElement('script');
                    n.onreadystatechange = function() {
                        s(t), n.onreadystatechange = null, e.removeChild(n), n = null
                    }, e.appendChild(n)
                }
            }

            function l() {
                u = function(e) {
                    setTimeout(s, 0, e)
                }
            }
            if (!e.setImmediate) {
                var u, m = 1,
                    f = {},
                    y = !1,
                    h = e.document,
                    g = Object.getPrototypeOf && Object.getPrototypeOf(e);
                g = g && g.setTimeout ? g : e, '[object process]' === {}.toString.call(e.process) ? a() : i() ? p() : e.MessageChannel ? c() : h && 'onreadystatechange' in h.createElement('script') ? d() : l(), g.setImmediate = n, g.clearImmediate = r
            }
        })('undefined' == typeof self ? 'undefined' == typeof e ? this : e : self)
    }).call(t, n(0), n(6))
}, function(e) {
    function t() {
        throw new Error('setTimeout has not been defined')
    }

    function n() {
        throw new Error('clearTimeout has not been defined')
    }

    function r(e) {
        if (c === setTimeout) return setTimeout(e, 0);
        if ((c === t || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0);
        try {
            return c(e, 0)
        } catch (t) {
            try {
                return c.call(null, e, 0)
            } catch (t) {
                return c.call(this, e, 0)
            }
        }
    }

    function o(e) {
        if (d === clearTimeout) return clearTimeout(e);
        if ((d === n || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
        try {
            return d(e)
        } catch (t) {
            try {
                return d.call(null, e)
            } catch (t) {
                return d.call(this, e)
            }
        }
    }

    function s() {
        f && u && (f = !1, u.length ? m = u.concat(m) : y = -1, m.length && a())
    }

    function a() {
        if (!f) {
            var e = r(s);
            f = !0;
            for (var t = m.length; t;) {
                for (u = m, m = []; ++y < t;) u && u[y].run();
                y = -1, t = m.length
            }
            u = null, f = !1, o(e)
        }
    }

    function p(e, t) {
        this.fun = e, this.array = t
    }

    function i() {}
    var c, d, l = e.exports = {};
    (function() {
        try {
            c = 'function' == typeof setTimeout ? setTimeout : t
        } catch (n) {
            c = t
        }
        try {
            d = 'function' == typeof clearTimeout ? clearTimeout : n
        } catch (t) {
            d = n
        }
    })();
    var u, m = [],
        f = !1,
        y = -1;
    l.nextTick = function(e) {
        var t = Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        m.push(new p(e, t)), 1 !== m.length || f || r(a)
    }, p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, l.title = 'browser', l.browser = !0, l.env = {}, l.argv = [], l.version = '', l.versions = {}, l.on = i, l.addListener = i, l.once = i, l.off = i, l.removeListener = i, l.removeAllListeners = i, l.emit = i, l.prependListener = i, l.prependOnceListener = i, l.listeners = function() {
        return []
    }, l.binding = function() {
        throw new Error('process.binding is not supported')
    }, l.cwd = function() {
        return '/'
    }, l.chdir = function() {
        throw new Error('process.chdir is not supported')
    }, l.umask = function() {
        return 0
    }
}, function(e, t, n) {
    (function(t) {
        var n;
        n = 'undefined' == typeof window ? 'undefined' == typeof t ? 'undefined' == typeof self ? {} : self : t : window, e.exports = n
    }).call(t, n(0))
}, function(e, t, n) {
    'use strict';
    var r = Math.floor;
    const o = n(9);
    e.exports = class extends o {
        constructor(e = 'irc.irc7.com', t = 6667, o = !1) {
            if (super(), 'string' != typeof e) throw new TypeError('hostname should be of type string');
            else if ('number' != typeof t) throw new TypeError('port should be of type number');
            else if ('boolean' != typeof o) throw new TypeError('useTLS should be of type boolean');
            this.client = this.c = {
                away: !1,
                connectionState: 0,
                debug: !1,
                me: 'Guest_' + r(4294967295 * Math.random() + 1).toString(16),
                port: t,
                realName: `ircJS v${n(2).version} by JD`,
                server: null,
                serverTarget: e,
                ssl: o,
                userName: 'IRCSock',
                _versionString: `ircJS v${n(2).version} by JD`
            }, this.event = this.e = {
                address: null,
                chan: null,
                event: null,
                fullAddress: null,
                nick: null,
                numeric: null,
                rawMsg: null,
                site: null,
                target: null
            }, this._incomingBuffer = '', this.emit('start')
        }
        connect(e) {
            if ('function' == typeof e) this.on('connect', e);
            else if ('undefined' != typeof e) throw new TypeError('callback should be of type function')
        }
        ctcp(e, t) {
            this.msg(e, `\x01${t}\x01`)
        }
        ctcpReply(e, t) {
            this.notice(e, `\x01${t}\x01`)
        }
        describe(e, t) {
            this.ctcp(e, `ACTION ${t}`)
        }
        parsePrefix(e) {
            const [t, n, r, o, s] = e.match(/^([^!@\$]+?)(?:!([^!@$]+?))?(?:@([^!@$]+?))?(?:\$([^!@$]+?))?$/);
            return {
                source: t,
                name: n,
                user: r,
                host: o,
                server: s
            }
        }
        msg(e, t) {
            this.send(`PRIVMSG ${e} :${t}`)
        }
        notice(e, t) {
            this.send(`NOTICE ${e} :${t}`)
        }
        send(e = '') {
            if ('string' != typeof e) throw new TypeError('data should be of type string');
            !0 === this.debug && console.log(`--> ${e}`)
        }
        setNickname(e) {
            if ('string' != typeof e) throw new TypeError('nickname should be of type string');
            e = e.split('').map((e) => {
                return '?' === e ? r(10 * Math.random()) : e
            }).join(''), -1 === [0, 3].indexOf(this.connectionState) ? this.send(`NICK ${e}`) : this.client.me = e
        }
        showDebug(e = !1) {
            if ('boolean' != typeof e) throw new TypeError('debugEnabled should be of type boolean');
            this.debug = e
        }
        _setHandlers() {
            this.on('connect', (e) => {
                this.client.server = this.hostname, this.connectionState = 1, e.send(`IRCVERS IRC8 ircJS en-us :${this.client._versionString}`), this.send(`USER ${this.client.userName} - - :${this.client.realName}`), this.send(`NICK ${this.client.me}`)
            }), this.on('CTCP', (e, t) => {
                'PING' === e && this.ctcpReply(this.event.nick, `${e} ${t}`), '' === t && ('TIME' === e ? this.ctcpReply(this.event.nick, `${e} ${new Date}`) : 'VERSION' === e && this.ctcpReply(this.event.nick, `${e} ${this.client._versionString}`))
            }), this.on('data', (e) => {
                const t = (this._incomingBuffer + e).split('\r').join('\n').split('\n');
                this._incomingBuffer = t.pop();
                for (const n of t) '' !== n && this.emit('line', n)
            }), this.on('disconnect', () => {
                this.connectionState = 0
            }), this.on('line', (e) => {
                !0 === this.debug && console.log(`<-- ${e}`);
                const t = e.split(' '),
                    n = {
                        params: [],
                        source: e
                    };
                for (let [r, o] of t.entries())
                    if ('' !== o) {
                        if ('undefined' == typeof n.tags)
                            if ('@' === o[0] && 2 <= o.length) {
                                n.tags = o.substr(1).split(';');
                                continue
                            } else n.tags = null;
                        if ('undefined' == typeof n.prefix)
                            if (':' === o[0] && 2 <= o.length) {
                                const e = n.prefix = this.parsePrefix(o.substr(1));
                                this.event.nick = e.name, e.user && (this.event.site = e.host, this.event.address = `${e.user}@{ pfx.host }`, this.event.fullAddress = `${e.name}!${this.event.address}`);
                                continue
                            } else n.prefix = this.client.server;
                        if ('undefined' == typeof n.command) {
                            if (!0 === /^([a-zA-Z]+|[0-9]{3})$/.test(o)) n.command = o.toUpperCase();
                            else break;
                        } else if (':' !== o[0]) n.params.push(o);
                        else {
                            n.params.push(t.slice(r).join(' ').substr(1));
                            break
                        }
                    }
                'undefined' == typeof n.command ? this.emit('parseError', e) : this.emit('parsedLine', n), this.event.nick = this.event.site = this.event.address = this.event.fullAddress = null
            }), this.on('parsedLine', (e) => {
                const t = e.command.toUpperCase();
                if (this.event.rawMsg = e.source, -1 !== ['JOIN'].indexOf(t)) {
                    let t, [n] = e.params;
                    1 < e.params.length && ([t, n] = e.params), this.event.target = n, this.emit('JOIN', t), this.event.target = null
                } else if ('AUTH' === t) {
                    const [n, r, o] = e.params;
                    this.emit(t, r, o)
                } else if (-1 !== ['NOTICE', 'PRIVMSG'].indexOf(t)) {
                    const [n, r] = e.params;
                    if (this.event.target = n, 1 === r.charCodeAt(0) && 1 === r.charCodeAt(r.length - 1) && 3 < r.length) {
                        const e = 'PRIVMSG' === t ? 'CTCP' : 'CTCPREPLY';
                        let n = r.substr(1, r.length - 2).split(' ');
                        const o = n.shift().toUpperCase(),
                            s = n.join(' ');
                        'ACTION' === o ? this.emit(o, s) : this.emit(e, o, s)
                    } else this.emit(t, r);
                    this.event.target = null
                } else if (-1 !== ['ERROR', 'NICK', 'PING', 'QUIT', 'WALLOPS'].indexOf(t)) {
                    const [n] = e.params;
                    this.emit(t, n)
                } else if (-1 !== ['INVITE', 'TOPIC', 'KILL', 'PART'].indexOf(t)) {
                    const [n, r] = e.params;
                    this.event.target = n, this.emit(t, r), this.event.target = null
                } else if ('MODE' === t) {
                    const [n, ...r] = e.params;
                    this.event.target = n, this.emit(t, r.join(' ')), this.event.target = null
                } else if ('PROP' === t) {
                    const [n, r, o] = e.params;
                    this.event.target = n, this.emit(t, r, o), this.event.target = null
                } else if (-1 !== ['KICK', 'WHISPER'].indexOf(t)) {
                    const [n, r, o] = e.params;
                    this.event.target = r, this.emit(t, n, o), this.event.target = null
                } else !0 === /^[0-9]{3}$/.test(t) ? (this.event.target = e.params[0], this.event.numeric = t, this.emit(`raw ${t}`, e), this.event.target = this.event.numeric = null) : this.emit(`raw ${t}`, e);
                this.event.rawMsg = null
            }), this.on('raw 001', (e) => {
                this.connectionState = 2, this.client.me = this.event.target, this.client.server = e.prefix.name
            }), this.on('PING', (e) => this.send(`PONG :${e}`)), this.on('NICK', (e) => {
                this.event.nick === this.client.me && (this.client.me = e)
            })
        }
    }
}, function(e) {
    'use strict';

    function t() {}

    function n(e, t, n) {
        this.fn = e, this.context = t, this.once = n || !1
    }

    function r() {
        this._events = new t, this._eventsCount = 0
    }
    var o = Object.prototype.hasOwnProperty,
        s = '~';
    Object.create && (t.prototype = Object.create(null), !new t().__proto__ && (s = !1)), r.prototype.eventNames = function() {
        var e, t, n = [];
        if (0 === this._eventsCount) return n;
        for (t in e = this._events) o.call(e, t) && n.push(s ? t.slice(1) : t);
        return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
    }, r.prototype.listeners = function(e, t) {
        var n = s ? s + e : e,
            r = this._events[n];
        if (t) return !!r;
        if (!r) return [];
        if (r.fn) return [r.fn];
        for (var o = 0, a = r.length, i = Array(a); o < a; o++) i[o] = r[o].fn;
        return i
    }, r.prototype.emit = function(e, t, n, r, o, a) {
        var p = s ? s + e : e;
        if (!this._events[p]) return !1;
        var c, d, i = this._events[p],
            l = arguments.length;
        if (i.fn) {
            switch (i.once && this.removeListener(e, i.fn, void 0, !0), l) {
                case 1:
                    return i.fn.call(i.context), !0;
                case 2:
                    return i.fn.call(i.context, t), !0;
                case 3:
                    return i.fn.call(i.context, t, n), !0;
                case 4:
                    return i.fn.call(i.context, t, n, r), !0;
                case 5:
                    return i.fn.call(i.context, t, n, r, o), !0;
                case 6:
                    return i.fn.call(i.context, t, n, r, o, a), !0;
            }
            for (d = 1, c = Array(l - 1); d < l; d++) c[d - 1] = arguments[d];
            i.fn.apply(i.context, c)
        } else {
            var u, m = i.length;
            for (d = 0; d < m; d++) switch (i[d].once && this.removeListener(e, i[d].fn, void 0, !0), l) {
                case 1:
                    i[d].fn.call(i[d].context);
                    break;
                case 2:
                    i[d].fn.call(i[d].context, t);
                    break;
                case 3:
                    i[d].fn.call(i[d].context, t, n);
                    break;
                case 4:
                    i[d].fn.call(i[d].context, t, n, r);
                    break;
                default:
                    if (!c)
                        for (u = 1, c = Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
                    i[d].fn.apply(i[d].context, c);
            }
        }
        return !0
    }, r.prototype.on = function(e, t, r) {
        var o = new n(t, r || this),
            a = s ? s + e : e;
        return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], o] : this._events[a].push(o) : (this._events[a] = o, this._eventsCount++), this
    }, r.prototype.once = function(e, t, r) {
        var o = new n(t, r || this, !0),
            a = s ? s + e : e;
        return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], o] : this._events[a].push(o) : (this._events[a] = o, this._eventsCount++), this
    }, r.prototype.removeListener = function(e, n, r, o) {
        var a = s ? s + e : e;
        if (!this._events[a]) return this;
        if (!n) return 0 == --this._eventsCount ? this._events = new t : delete this._events[a], this;
        var p = this._events[a];
        if (p.fn) p.fn !== n || o && !p.once || r && p.context !== r || (0 == --this._eventsCount ? this._events = new t : delete this._events[a]);
        else {
            for (var c = 0, i = [], d = p.length; c < d; c++)(p[c].fn !== n || o && !p[c].once || r && p[c].context !== r) && i.push(p[c]);
            i.length ? this._events[a] = 1 === i.length ? i[0] : i : 0 == --this._eventsCount ? this._events = new t : delete this._events[a]
        }
        return this
    }, r.prototype.removeAllListeners = function(e) {
        var n;
        return e ? (n = s ? s + e : e, this._events[n] && (0 == --this._eventsCount ? this._events = new t : delete this._events[n])) : (this._events = new t, this._eventsCount = 0), this
    }, r.prototype.off = r.prototype.removeListener, r.prototype.addListener = r.prototype.on, r.prototype.setMaxListeners = function() {
        return this
    }, r.prefixed = s, r.EventEmitter = r, e.exports = r
}]);