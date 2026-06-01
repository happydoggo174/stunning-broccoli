import { Kn as ref, _n as watchEffect, nr as unref, xt as inject } from "./vue.runtime.esm-bundler-dM5W6Okq.js";
//#region node_modules/@auth0/auth0-vue/dist/auth0-vue.production.esm.js
var r = "$auth0", i = Symbol(r);
function a(e, t) {
	var n = {};
	for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
	if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
		var r = 0;
		for (o = Object.getOwnPropertySymbols(e); r < o.length; r++) t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
	}
	return n;
}
var s = { timeoutInSeconds: 60 }, c = 1e4, u = "memory", l = {
	name: "auth0-spa-js",
	version: "2.19.2"
}, h = () => Date.now(), d = "default";
var p = class p extends Error {
	constructor(e, t) {
		super(t), this.error = e, this.error_description = t, Object.setPrototypeOf(this, p.prototype);
	}
	static fromPayload(e) {
		let { error: t, error_description: n } = e;
		return new p(t, n);
	}
};
var f = class f extends p {
	constructor(e, t, n) {
		let o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
		super(e, t), this.state = n, this.appState = o, Object.setPrototypeOf(this, f.prototype);
	}
};
var m = class m extends p {
	constructor(e, t, n, o) {
		let r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
		super(e, t), this.connection = n, this.state = o, this.appState = r, Object.setPrototypeOf(this, m.prototype);
	}
};
var y = class y extends p {
	constructor() {
		super("timeout", "Timeout"), Object.setPrototypeOf(this, y.prototype);
	}
};
var w = class w extends y {
	constructor(e) {
		super(), this.popup = e, Object.setPrototypeOf(this, w.prototype);
	}
};
var g = class g extends p {
	constructor(e) {
		super("cancelled", "Popup closed"), this.popup = e, Object.setPrototypeOf(this, g.prototype);
	}
};
var v = class v extends p {
	constructor() {
		super("popup_open", "Unable to open a popup for loginWithPopup - window.open returned `null`"), Object.setPrototypeOf(this, v.prototype);
	}
};
var b = class b extends p {
	constructor(e, t, n, o) {
		super(e, t), this.mfa_token = n, this.mfa_requirements = o, Object.setPrototypeOf(this, b.prototype);
	}
};
var _ = class _ extends p {
	constructor(e, t) {
		super("missing_refresh_token", "Missing Refresh Token (audience: '".concat(T(e, ["default"]), "', scope: '").concat(T(t), "')")), this.audience = e, this.scope = t, Object.setPrototypeOf(this, _.prototype);
	}
};
var k = class k extends p {
	constructor(e, t) {
		super("missing_scopes", "Missing requested scopes after refresh (audience: '".concat(T(e, ["default"]), "', missing scope: '").concat(T(t), "')")), this.audience = e, this.scope = t, Object.setPrototypeOf(this, k.prototype);
	}
};
var S = class S extends p {
	constructor(e) {
		super("use_dpop_nonce", "Server rejected DPoP proof: wrong nonce"), this.newDpopNonce = e, Object.setPrototypeOf(this, S.prototype);
	}
};
function T(e) {
	return e && !(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).includes(e) ? e : "";
}
var E = () => window.crypto, P = () => {
	let e = "";
	for (; e.length < 43;) {
		const t = E().getRandomValues(new Uint8Array(43 - e.length));
		for (const n of t) e.length < 43 && n < 198 && (e += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~."[n % 66]);
	}
	return e;
}, A = (e) => btoa(e), x = [
	{
		key: "name",
		type: ["string"]
	},
	{
		key: "version",
		type: ["string", "number"]
	},
	{
		key: "env",
		type: ["object"]
	}
], R = function(e) {
	let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
	return Object.keys(e).reduce((n, o) => {
		if (t && "env" === o) return n;
		const r = x.find((e) => e.key === o);
		return r && r.type.includes(typeof e[o]) && (n[o] = e[o]), n;
	}, {});
}, O = (e) => {
	var { clientId: t } = e, n = a(e, ["clientId"]);
	return new URLSearchParams(((e) => Object.keys(e).filter((t) => void 0 !== e[t]).reduce((t, n) => Object.assign(Object.assign({}, t), { [n]: e[n] }), {}))(Object.assign({ client_id: t }, n))).toString();
}, I = async (e) => {
	return await E().subtle.digest({ name: "SHA-256" }, new TextEncoder().encode(e));
}, C = (e) => ((e) => decodeURIComponent(atob(e).split("").map((e) => "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)).join("")))(e.replace(/_/g, "/").replace(/-/g, "+")), j = (e) => {
	const t = new Uint8Array(e);
	return ((e) => {
		const t = {
			"+": "-",
			"/": "_",
			"=": ""
		};
		return e.replace(/[+/=]/g, (e) => t[e]);
	})(window.btoa(String.fromCharCode(...Array.from(t))));
};
var W = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, U = {}, D = {};
Object.defineProperty(D, "__esModule", { value: !0 });
var K = function() {
	function e() {
		var e = this;
		this.locked = /* @__PURE__ */ new Map(), this.addToLocked = function(t, n) {
			var o = e.locked.get(t);
			void 0 === o ? void 0 === n ? e.locked.set(t, []) : e.locked.set(t, [n]) : void 0 !== n && (o.unshift(n), e.locked.set(t, o));
		}, this.isLocked = function(t) {
			return e.locked.has(t);
		}, this.lock = function(t) {
			return new Promise(function(n, o) {
				e.isLocked(t) ? e.addToLocked(t, n) : (e.addToLocked(t), n());
			});
		}, this.unlock = function(t) {
			var n = e.locked.get(t);
			if (void 0 !== n && 0 !== n.length) {
				var o = n.pop();
				e.locked.set(t, n), void 0 !== o && setTimeout(o, 0);
			} else e.locked.delete(t);
		};
	}
	return e.getInstance = function() {
		return void 0 === e.instance && (e.instance = new e()), e.instance;
	}, e;
}();
D.default = function() {
	return K.getInstance();
};
var N = W && W.__awaiter || function(e, t, n, o) {
	return new (n || (n = Promise))(function(r, i) {
		function a(e) {
			try {
				c(o.next(e));
			} catch (e) {
				i(e);
			}
		}
		function s(e) {
			try {
				c(o.throw(e));
			} catch (e) {
				i(e);
			}
		}
		function c(e) {
			e.done ? r(e.value) : new n(function(t) {
				t(e.value);
			}).then(a, s);
		}
		c((o = o.apply(e, t || [])).next());
	});
}, L = W && W.__generator || function(e, t) {
	var n, o, r, i, a = {
		label: 0,
		sent: function() {
			if (1 & r[0]) throw r[1];
			return r[1];
		},
		trys: [],
		ops: []
	};
	return i = {
		next: s(0),
		throw: s(1),
		return: s(2)
	}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
		return this;
	}), i;
	function s(i) {
		return function(s) {
			return function(i) {
				if (n) throw new TypeError("Generator is already executing.");
				for (; a;) try {
					if (n = 1, o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;
					switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {
						case 0:
						case 1:
							r = i;
							break;
						case 4: return a.label++, {
							value: i[1],
							done: !1
						};
						case 5:
							a.label++, o = i[1], i = [0];
							continue;
						case 7:
							i = a.ops.pop(), a.trys.pop();
							continue;
						default:
							if (!((r = (r = a.trys).length > 0 && r[r.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
								a = 0;
								continue;
							}
							if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
								a.label = i[1];
								break;
							}
							if (6 === i[0] && a.label < r[1]) {
								a.label = r[1], r = i;
								break;
							}
							if (r && a.label < r[2]) {
								a.label = r[2], a.ops.push(i);
								break;
							}
							r[2] && a.ops.pop(), a.trys.pop();
							continue;
					}
					i = t.call(e, a);
				} catch (e) {
					i = [6, e], o = 0;
				} finally {
					n = r = 0;
				}
				if (5 & i[0]) throw i[1];
				return {
					value: i[0] ? i[1] : void 0,
					done: !0
				};
			}([i, s]);
		};
	}
}, z = W;
Object.defineProperty(U, "__esModule", { value: !0 });
var H = D, J = "browser-tabs-lock-key", M = {
	key: function(e) {
		return N(z, void 0, void 0, function() {
			return L(this, function(e) {
				throw new Error("Unsupported");
			});
		});
	},
	getItem: function(e) {
		return N(z, void 0, void 0, function() {
			return L(this, function(e) {
				throw new Error("Unsupported");
			});
		});
	},
	clear: function() {
		return N(z, void 0, void 0, function() {
			return L(this, function(e) {
				return [2, window.localStorage.clear()];
			});
		});
	},
	removeItem: function(e) {
		return N(z, void 0, void 0, function() {
			return L(this, function(e) {
				throw new Error("Unsupported");
			});
		});
	},
	setItem: function(e, t) {
		return N(z, void 0, void 0, function() {
			return L(this, function(e) {
				throw new Error("Unsupported");
			});
		});
	},
	keySync: function(e) {
		return window.localStorage.key(e);
	},
	getItemSync: function(e) {
		return window.localStorage.getItem(e);
	},
	clearSync: function() {
		return window.localStorage.clear();
	},
	removeItemSync: function(e) {
		return window.localStorage.removeItem(e);
	},
	setItemSync: function(e, t) {
		return window.localStorage.setItem(e, t);
	}
};
function Z(e) {
	return new Promise(function(t) {
		return setTimeout(t, e);
	});
}
function V(e) {
	for (var t = "", n = 0; n < e; n++) t += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"[Math.floor(61 * Math.random())];
	return t;
}
var X = U.default = function() {
	function e(t) {
		this.acquiredIatSet = /* @__PURE__ */ new Set(), this.storageHandler = void 0, this.id = Date.now().toString() + V(15), this.acquireLock = this.acquireLock.bind(this), this.releaseLock = this.releaseLock.bind(this), this.releaseLock__private__ = this.releaseLock__private__.bind(this), this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this), this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this), this.storageHandler = t, void 0 === e.waiters && (e.waiters = []);
	}
	return e.prototype.acquireLock = function(t, n) {
		return void 0 === n && (n = 5e3), N(this, void 0, void 0, function() {
			var o, r, i, a, s, c, u;
			return L(this, function(l) {
				switch (l.label) {
					case 0: o = Date.now() + V(4), r = Date.now() + n, i = J + "-" + t, a = void 0 === this.storageHandler ? M : this.storageHandler, l.label = 1;
					case 1: return Date.now() < r ? [4, Z(30)] : [3, 8];
					case 2: return l.sent(), null !== a.getItemSync(i) ? [3, 5] : (s = this.id + "-" + t + "-" + o, [4, Z(Math.floor(25 * Math.random()))]);
					case 3: return l.sent(), a.setItemSync(i, JSON.stringify({
						id: this.id,
						iat: o,
						timeoutKey: s,
						timeAcquired: Date.now(),
						timeRefreshed: Date.now()
					})), [4, Z(30)];
					case 4: return l.sent(), null !== (c = a.getItemSync(i)) && (u = JSON.parse(c)).id === this.id && u.iat === o ? (this.acquiredIatSet.add(o), this.refreshLockWhileAcquired(i, o), [2, !0]) : [3, 7];
					case 5: return e.lockCorrector(void 0 === this.storageHandler ? M : this.storageHandler), [4, this.waitForSomethingToChange(r)];
					case 6: l.sent(), l.label = 7;
					case 7: return o = Date.now() + V(4), [3, 1];
					case 8: return [2, !1];
				}
			});
		});
	}, e.prototype.refreshLockWhileAcquired = function(e, t) {
		return N(this, void 0, void 0, function() {
			var n = this;
			return L(this, function(o) {
				return setTimeout(function() {
					return N(n, void 0, void 0, function() {
						var n, o, r;
						return L(this, function(i) {
							switch (i.label) {
								case 0: return [4, H.default().lock(t)];
								case 1: return i.sent(), this.acquiredIatSet.has(t) ? (n = void 0 === this.storageHandler ? M : this.storageHandler, null === (o = n.getItemSync(e)) ? (H.default().unlock(t), [2]) : ((r = JSON.parse(o)).timeRefreshed = Date.now(), n.setItemSync(e, JSON.stringify(r)), H.default().unlock(t), this.refreshLockWhileAcquired(e, t), [2])) : (H.default().unlock(t), [2]);
							}
						});
					});
				}, 1e3), [2];
			});
		});
	}, e.prototype.waitForSomethingToChange = function(t) {
		return N(this, void 0, void 0, function() {
			return L(this, function(n) {
				switch (n.label) {
					case 0: return [4, new Promise(function(n) {
						var o = !1, r = Date.now(), i = !1;
						function a() {
							if (i || (window.removeEventListener("storage", a), e.removeFromWaiting(a), clearTimeout(s), i = !0), !o) {
								o = !0;
								var t = 50 - (Date.now() - r);
								t > 0 ? setTimeout(n, t) : n(null);
							}
						}
						window.addEventListener("storage", a), e.addToWaiting(a);
						var s = setTimeout(a, Math.max(0, t - Date.now()));
					})];
					case 1: return n.sent(), [2];
				}
			});
		});
	}, e.addToWaiting = function(t) {
		this.removeFromWaiting(t), void 0 !== e.waiters && e.waiters.push(t);
	}, e.removeFromWaiting = function(t) {
		void 0 !== e.waiters && (e.waiters = e.waiters.filter(function(e) {
			return e !== t;
		}));
	}, e.notifyWaiters = function() {
		void 0 !== e.waiters && e.waiters.slice().forEach(function(e) {
			return e();
		});
	}, e.prototype.releaseLock = function(e) {
		return N(this, void 0, void 0, function() {
			return L(this, function(t) {
				switch (t.label) {
					case 0: return [4, this.releaseLock__private__(e)];
					case 1: return [2, t.sent()];
				}
			});
		});
	}, e.prototype.releaseLock__private__ = function(t) {
		return N(this, void 0, void 0, function() {
			var n, o, r, i;
			return L(this, function(a) {
				switch (a.label) {
					case 0: return n = void 0 === this.storageHandler ? M : this.storageHandler, o = J + "-" + t, null === (r = n.getItemSync(o)) ? [2] : (i = JSON.parse(r)).id !== this.id ? [3, 2] : [4, H.default().lock(i.iat)];
					case 1: a.sent(), this.acquiredIatSet.delete(i.iat), n.removeItemSync(o), H.default().unlock(i.iat), e.notifyWaiters(), a.label = 2;
					case 2: return [2];
				}
			});
		});
	}, e.lockCorrector = function(t) {
		for (var n = Date.now() - 5e3, o = t, r = [], i = 0;;) {
			var a = o.keySync(i);
			if (null === a) break;
			r.push(a), i++;
		}
		for (var s = !1, c = 0; c < r.length; c++) {
			var u = r[c];
			if (u.includes(J)) {
				var l = o.getItemSync(u);
				if (null !== l) {
					var h = JSON.parse(l);
					(void 0 === h.timeRefreshed && h.timeAcquired < n || void 0 !== h.timeRefreshed && h.timeRefreshed < n) && (o.removeItemSync(u), s = !0);
				}
			}
		}
		s && e.notifyWaiters();
	}, e.waiters = void 0, e;
}();
var G = class {
	async runWithLock(e, t, n) {
		const o = new AbortController(), r = setTimeout(() => o.abort(), t);
		try {
			return await navigator.locks.request(e, {
				mode: "exclusive",
				signal: o.signal
			}, async (e) => {
				if (clearTimeout(r), !e) throw new Error("Lock not available");
				return await n();
			});
		} catch (e) {
			if (clearTimeout(r), "AbortError" === (null == e ? void 0 : e.name)) throw new y();
			throw e;
		}
	}
};
var Y = class {
	constructor() {
		this.activeLocks = /* @__PURE__ */ new Set(), this.lock = new X(), this.pagehideHandler = () => {
			this.activeLocks.forEach((e) => this.lock.releaseLock(e)), this.activeLocks.clear();
		};
	}
	async runWithLock(e, t, n) {
		let o = !1;
		for (let n = 0; n < 10 && !o; n++) o = await this.lock.acquireLock(e, t);
		if (!o) throw new y();
		this.activeLocks.add(e), 1 === this.activeLocks.size && "undefined" != typeof window && window.addEventListener("pagehide", this.pagehideHandler);
		try {
			return await n();
		} finally {
			this.activeLocks.delete(e), await this.lock.releaseLock(e), 0 === this.activeLocks.size && "undefined" != typeof window && window.removeEventListener("pagehide", this.pagehideHandler);
		}
	}
};
var B = null;
var q = new TextEncoder(), Q = new TextDecoder();
function $(e) {
	return "string" == typeof e ? q.encode(e) : Q.decode(e);
}
function ee(e) {
	if ("number" != typeof e.modulusLength || e.modulusLength < 2048) throw new re(`${e.name} modulusLength must be at least 2048 bits`);
}
var te;
if (Uint8Array.prototype.toBase64) te = (e) => (e instanceof ArrayBuffer && (e = new Uint8Array(e)), e.toBase64({
	alphabet: "base64url",
	omitPadding: !0
}));
else {
	const e = 32768;
	te = (t) => {
		t instanceof ArrayBuffer && (t = new Uint8Array(t));
		const n = [];
		for (let o = 0; o < t.byteLength; o += e) n.push(String.fromCharCode.apply(null, t.subarray(o, o + e)));
		return btoa(n.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
	};
}
function ne(e) {
	return te(e);
}
var oe = class extends Error {
	constructor(e) {
		var t;
		super(null != e ? e : "operation not supported"), this.name = this.constructor.name, null === (t = Error.captureStackTrace) || void 0 === t || t.call(Error, this, this.constructor);
	}
};
var re = class extends Error {
	constructor(e) {
		var t;
		super(e), this.name = this.constructor.name, null === (t = Error.captureStackTrace) || void 0 === t || t.call(Error, this, this.constructor);
	}
};
function ie(e) {
	switch (e.algorithm.name) {
		case "RSA-PSS": return function(e) {
			if ("SHA-256" === e.algorithm.hash.name) return "PS256";
			throw new oe("unsupported RsaHashedKeyAlgorithm hash name");
		}(e);
		case "RSASSA-PKCS1-v1_5": return function(e) {
			if ("SHA-256" === e.algorithm.hash.name) return "RS256";
			throw new oe("unsupported RsaHashedKeyAlgorithm hash name");
		}(e);
		case "ECDSA": return function(e) {
			if ("P-256" === e.algorithm.namedCurve) return "ES256";
			throw new oe("unsupported EcKeyAlgorithm namedCurve");
		}(e);
		case "Ed25519": return "Ed25519";
		default: throw new oe("unsupported CryptoKey algorithm name");
	}
}
function ae(e) {
	return e instanceof CryptoKey;
}
function se(e) {
	return ae(e) && "public" === e.type;
}
async function ce(e, t, n, o, r, i) {
	const a = null == e ? void 0 : e.privateKey, s = null == e ? void 0 : e.publicKey;
	if (!ae(c = a) || "private" !== c.type) throw new TypeError("\"keypair.privateKey\" must be a private CryptoKey");
	var c;
	if (!se(s)) throw new TypeError("\"keypair.publicKey\" must be a public CryptoKey");
	if (!0 !== s.extractable) throw new TypeError("\"keypair.publicKey.extractable\" must be true");
	if ("string" != typeof t) throw new TypeError("\"htu\" must be a string");
	if ("string" != typeof n) throw new TypeError("\"htm\" must be a string");
	if (void 0 !== o && "string" != typeof o) throw new TypeError("\"nonce\" must be a string or undefined");
	if (void 0 !== r && "string" != typeof r) throw new TypeError("\"accessToken\" must be a string or undefined");
	if (void 0 !== i && ("object" != typeof i || null === i || Array.isArray(i))) throw new TypeError("\"additional\" must be an object");
	return async function(e, t, n) {
		if (!1 === n.usages.includes("sign")) throw new TypeError("private CryptoKey instances used for signing assertions must include \"sign\" in their \"usages\"");
		const o = `${ne($(JSON.stringify(e)))}.${ne($(JSON.stringify(t)))}`;
		return `${o}.${ne(await crypto.subtle.sign(function(e) {
			switch (e.algorithm.name) {
				case "ECDSA": return {
					name: e.algorithm.name,
					hash: "SHA-256"
				};
				case "RSA-PSS": return ee(e.algorithm), {
					name: e.algorithm.name,
					saltLength: 32
				};
				case "RSASSA-PKCS1-v1_5": return ee(e.algorithm), { name: e.algorithm.name };
				case "Ed25519": return { name: e.algorithm.name };
			}
			throw new oe();
		}(n), n, $(o)))}`;
	}({
		alg: ie(a),
		typ: "dpop+jwt",
		jwk: await ue(s)
	}, Object.assign(Object.assign({}, i), {
		iat: Math.floor(Date.now() / 1e3),
		jti: crypto.randomUUID(),
		htm: n,
		nonce: o,
		htu: t,
		ath: r ? ne(await crypto.subtle.digest("SHA-256", $(r))) : void 0
	}), a);
}
async function ue(e) {
	const { kty: t, e: n, n: o, x: r, y: i, crv: a } = await crypto.subtle.exportKey("jwk", e);
	return {
		kty: t,
		crv: a,
		e: n,
		n: o,
		x: r,
		y: i
	};
}
var le = "dpop-nonce", he = [
	"authorization_code",
	"refresh_token",
	"urn:ietf:params:oauth:grant-type:token-exchange",
	"http://auth0.com/oauth/grant-type/mfa-oob",
	"http://auth0.com/oauth/grant-type/mfa-otp",
	"http://auth0.com/oauth/grant-type/mfa-recovery-code"
];
var de = (e, t) => new Promise(function(n, o) {
	const r = new MessageChannel();
	r.port1.onmessage = function(e) {
		e.data.error ? o(new Error(e.data.error)) : n(e.data), r.port1.close();
	}, t.postMessage(e, [r.port2]);
}), pe = (e, t, n) => {
	const o = new AbortController();
	let r;
	return t.signal = o.signal, Promise.race([fetch(e, t), new Promise((e, t) => {
		r = setTimeout(() => {
			o.abort(), t(/* @__PURE__ */ new Error("Timeout when executing 'fetch'"));
		}, n);
	})]).finally(() => {
		clearTimeout(r);
	});
}, fe = async function(e, t, n, o, r, i) {
	let a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : c;
	return r ? (async (e, t, n, o, r, i, a, s) => de({
		type: "refresh",
		auth: {
			audience: t,
			scope: n
		},
		timeout: r,
		fetchUrl: e,
		fetchOptions: o,
		useFormData: a,
		useMrrt: s
	}, i))(e, t, n, o, a, r, i, arguments.length > 7 ? arguments[7] : void 0) : (async (e, t, n) => {
		const o = await pe(e, t, n);
		return {
			ok: o.ok,
			json: await o.json(),
			headers: (r = o.headers, [...r].reduce((e, t) => {
				let [n, o] = t;
				return e[n] = o, e;
			}, {}))
		};
		var r;
	})(e, o, a);
};
async function me(e, t, n, o, r, i, s, c, u, l) {
	if (u) {
		const t = await u.generateProof({
			url: e,
			method: r.method || "GET",
			nonce: await u.getNonce()
		});
		r.headers = Object.assign(Object.assign({}, r.headers), { dpop: t });
	}
	let h, d = null;
	for (let a = 0; a < 3; a++) try {
		h = await fe(e, n, o, r, i, s, t, c), d = null;
		break;
	} catch (e) {
		d = e;
	}
	if (d) throw d;
	const f = h.json, { error: m, error_description: y } = f, w = a(f, ["error", "error_description"]), { headers: g, ok: v } = h;
	let k;
	if (u && (k = g[le], k && await u.setNonce(k)), !v) {
		const a = y || "HTTP error. Unable to fetch ".concat(e);
		if ("mfa_required" === m) throw new b(m, a, w.mfa_token, w.mfa_requirements);
		if ("missing_refresh_token" === m) throw new _(n, o);
		if ("use_dpop_nonce" === m) {
			if (!u || !k || l) throw new S(k);
			return me(e, t, n, o, r, i, s, c, u, !0);
		}
		throw new p(m || "request_error", a);
	}
	return w;
}
async function ye(e, t) {
	var { baseUrl: n, timeout: o, audience: r, scope: i, auth0Client: s, useFormData: c, useMrrt: u, dpop: h } = e, p = a(e, [
		"baseUrl",
		"timeout",
		"audience",
		"scope",
		"auth0Client",
		"useFormData",
		"useMrrt",
		"dpop"
	]);
	const f = "urn:ietf:params:oauth:grant-type:token-exchange" === p.grant_type, m = "refresh_token" === p.grant_type && u, y = Object.assign(Object.assign(Object.assign(Object.assign({}, p), f && r && { audience: r }), f && i && { scope: i }), m && {
		audience: r,
		scope: i
	}), w = c ? O(y) : JSON.stringify(y), g = (v = p.grant_type, he.includes(v));
	var v;
	return await me("".concat(n, "/oauth/token"), o, r || d, i, {
		method: "POST",
		body: w,
		headers: {
			"Content-Type": c ? "application/x-www-form-urlencoded" : "application/json",
			"Auth0-Client": btoa(JSON.stringify(R(s || l)))
		}
	}, t, c, u, g ? h : void 0);
}
var we = function() {
	for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
	return (o = t.filter(Boolean).join(" ").trim().split(/\s+/), Array.from(new Set(o))).join(" ");
	var o;
}, ge = (e, t, n) => {
	let o;
	return n && (o = e[n]), o || (o = e[d]), we(o, t);
}, ve = "@@auth0spajs@@", be = "@@user@@";
var _e = class _e {
	constructor(e) {
		let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ve, n = arguments.length > 2 ? arguments[2] : void 0;
		this.prefix = t, this.suffix = n, this.clientId = e.clientId, this.scope = e.scope, this.audience = e.audience;
	}
	toKey() {
		return [
			this.prefix,
			this.clientId,
			this.audience,
			this.scope,
			this.suffix
		].filter(Boolean).join("::");
	}
	static fromKey(e) {
		const [t, n, o, r] = e.split("::");
		return new _e({
			clientId: n,
			scope: r,
			audience: o
		}, t);
	}
	static fromCacheEntry(e) {
		const { scope: t, audience: n, client_id: o } = e;
		return new _e({
			scope: t,
			audience: n,
			clientId: o
		});
	}
};
var ke = class {
	set(e, t) {
		localStorage.setItem(e, JSON.stringify(t));
	}
	get(e) {
		const t = window.localStorage.getItem(e);
		if (t) try {
			return JSON.parse(t);
		} catch (e) {
			return;
		}
	}
	remove(e) {
		localStorage.removeItem(e);
	}
	allKeys() {
		return Object.keys(window.localStorage).filter((e) => e.startsWith(ve));
	}
};
var Se = class {
	constructor() {
		this.enclosedCache = function() {
			let e = {};
			return {
				set(t, n) {
					e[t] = n;
				},
				get(t) {
					const n = e[t];
					if (n) return n;
				},
				remove(t) {
					delete e[t];
				},
				allKeys: () => Object.keys(e)
			};
		}();
	}
};
var Te = class {
	constructor(e, t, n) {
		this.cache = e, this.keyManifest = t, this.nowProvider = n || h;
	}
	async setIdToken(e, t, n) {
		var o;
		const r = this.getIdTokenCacheKey(e);
		await this.cache.set(r, {
			id_token: t,
			decodedToken: n
		}), await (null === (o = this.keyManifest) || void 0 === o ? void 0 : o.add(r));
	}
	async getIdToken(e) {
		const t = await this.cache.get(this.getIdTokenCacheKey(e.clientId));
		if (!t && e.scope && e.audience) {
			const t = await this.get(e);
			if (!t) return;
			if (!t.id_token || !t.decodedToken) return;
			return {
				id_token: t.id_token,
				decodedToken: t.decodedToken
			};
		}
		if (t) return {
			id_token: t.id_token,
			decodedToken: t.decodedToken
		};
	}
	async get(e) {
		let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o = arguments.length > 3 ? arguments[3] : void 0;
		var r;
		let i = await this.cache.get(e.toKey()), a = e;
		if (!i) {
			const t = await this.getCacheKeys();
			if (!t) return;
			const r = this.matchExistingCacheKey(e, t);
			if (r && (i = await this.cache.get(r), a = _e.fromKey(r)), !i && n && "cache-only" !== o) return this.getEntryWithRefreshToken(e, t);
		}
		if (!i) return;
		const s = await this.nowProvider(), c = Math.floor(s / 1e3);
		return i.expiresAt - t < c ? i.body.refresh_token ? this.modifiedCachedEntry(i, a) : (await this.cache.remove(a.toKey()), void await (null === (r = this.keyManifest) || void 0 === r ? void 0 : r.remove(a.toKey()))) : i.body;
	}
	async modifiedCachedEntry(e, t) {
		const n = {
			refresh_token: e.body.refresh_token,
			audience: e.body.audience,
			scope: e.body.scope
		}, o = {
			body: n,
			expiresAt: e.expiresAt
		};
		return await this.cache.set(t.toKey(), o), {
			refresh_token: n.refresh_token,
			audience: n.audience,
			scope: n.scope
		};
	}
	async set(e) {
		var t;
		const n = new _e({
			clientId: e.client_id,
			scope: e.scope,
			audience: e.audience
		}), o = await this.wrapCacheEntry(e);
		await this.cache.set(n.toKey(), o), await (null === (t = this.keyManifest) || void 0 === t ? void 0 : t.add(n.toKey()));
	}
	async remove(e, t, n) {
		const o = new _e({
			clientId: e,
			scope: n,
			audience: t
		});
		await this.cache.remove(o.toKey());
	}
	async stripRefreshToken(e) {
		var t;
		const n = await this.getCacheKeys();
		if (n) for (const o of n) {
			const n = await this.cache.get(o);
			(null === (t = null == n ? void 0 : n.body) || void 0 === t ? void 0 : t.refresh_token) === e && (delete n.body.refresh_token, await this.cache.set(o, n));
		}
	}
	async clear(e) {
		var t;
		const n = await this.getCacheKeys();
		n && (await n.filter((t) => !e || t.includes(e)).reduce(async (e, t) => {
			await e, await this.cache.remove(t);
		}, Promise.resolve()), await (null === (t = this.keyManifest) || void 0 === t ? void 0 : t.clear()));
	}
	async wrapCacheEntry(e) {
		const t = await this.nowProvider();
		return {
			body: e,
			expiresAt: Math.floor(t / 1e3) + e.expires_in
		};
	}
	async getCacheKeys() {
		var e;
		return this.keyManifest ? null === (e = await this.keyManifest.get()) || void 0 === e ? void 0 : e.keys : this.cache.allKeys ? this.cache.allKeys() : void 0;
	}
	getIdTokenCacheKey(e) {
		return new _e({ clientId: e }, ve, be).toKey();
	}
	matchExistingCacheKey(e, t) {
		return t.filter((t) => {
			var n;
			const o = _e.fromKey(t), r = new Set(o.scope && o.scope.split(" ")), i = (null === (n = e.scope) || void 0 === n ? void 0 : n.split(" ")) || [], a = o.scope && i.reduce((e, t) => e && r.has(t), !0);
			return o.prefix === ve && o.clientId === e.clientId && o.audience === e.audience && a;
		})[0];
	}
	async getEntryWithRefreshToken(e, t) {
		var n;
		for (const o of t) {
			const t = _e.fromKey(o);
			if (t.prefix === ve && t.clientId === e.clientId) {
				const e = await this.cache.get(o);
				if (null === (n = null == e ? void 0 : e.body) || void 0 === n ? void 0 : n.refresh_token) return {
					refresh_token: e.body.refresh_token,
					audience: e.body.audience,
					scope: e.body.scope
				};
			}
		}
	}
	async getRefreshTokensByAudience(e, t) {
		var n;
		const o = await this.getCacheKeys();
		if (!o) return [];
		const r = /* @__PURE__ */ new Set();
		for (const i of o) {
			const o = _e.fromKey(i);
			if (o.prefix === ve && o.clientId === t && o.audience === e) {
				const e = await this.cache.get(i);
				!(null === (n = null == e ? void 0 : e.body) || void 0 === n) && n.refresh_token && r.add(e.body.refresh_token);
			}
		}
		return Array.from(r);
	}
	async updateEntry(e, t) {
		var n;
		const o = await this.getCacheKeys();
		if (o) for (const r of o) {
			const o = await this.cache.get(r);
			(null === (n = null == o ? void 0 : o.body) || void 0 === n ? void 0 : n.refresh_token) === e && (o.body.refresh_token = t, await this.cache.set(r, o));
		}
	}
};
var Ee = class {
	constructor(e, t, n) {
		this.storage = e, this.clientId = t, this.cookieDomain = n, this.storageKey = "".concat("a0.spajs.txs", ".").concat(this.clientId);
	}
	create(e) {
		this.storage.save(this.storageKey, e, {
			daysUntilExpire: 1,
			cookieDomain: this.cookieDomain
		});
	}
	get() {
		return this.storage.get(this.storageKey);
	}
	remove() {
		this.storage.remove(this.storageKey, { cookieDomain: this.cookieDomain });
	}
};
var Pe = (e) => "number" == typeof e, Ae = [
	"iss",
	"aud",
	"exp",
	"nbf",
	"iat",
	"jti",
	"azp",
	"nonce",
	"auth_time",
	"at_hash",
	"c_hash",
	"acr",
	"amr",
	"sub_jwk",
	"cnf",
	"sip_from_tag",
	"sip_date",
	"sip_callid",
	"sip_cseq_num",
	"sip_via_branch",
	"orig",
	"dest",
	"mky",
	"events",
	"toe",
	"txn",
	"rph",
	"sid",
	"vot",
	"vtm"
];
var xe = W && W.__assign || function() {
	return xe = Object.assign || function(e) {
		for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
		return e;
	}, xe.apply(this, arguments);
};
function Re(e, t) {
	if (!t) return "";
	var n = "; " + e;
	return !0 === t ? n : n + "=" + t;
}
var Oe = function(e) {
	return function(e) {
		for (var t = {}, n = e ? e.split("; ") : [], o = /(%[\dA-F]{2})+/gi, r = 0; r < n.length; r++) {
			var i = n[r].split("="), a = i.slice(1).join("=");
			"\"" === a.charAt(0) && (a = a.slice(1, -1));
			try {
				t[i[0].replace(o, decodeURIComponent)] = a.replace(o, decodeURIComponent);
			} catch (e) {}
		}
		return t;
	}(document.cookie)[e];
};
function Ie(e, t, n) {
	document.cookie = function(e, t, n) {
		return encodeURIComponent(e).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/\(/g, "%28").replace(/\)/g, "%29") + "=" + encodeURIComponent(t).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent) + function(e) {
			if ("number" == typeof e.expires) {
				var t = /* @__PURE__ */ new Date();
				t.setMilliseconds(t.getMilliseconds() + 864e5 * e.expires), e.expires = t;
			}
			return Re("Expires", e.expires ? e.expires.toUTCString() : "") + Re("Domain", e.domain) + Re("Path", e.path) + Re("Secure", e.secure) + Re("SameSite", e.sameSite);
		}(n);
	}(e, t, xe({ path: "/" }, n));
}
var Ce = Ie, je = function(e, t) {
	Ie(e, "", xe(xe({}, t), { expires: -1 }));
};
var We = {
	get(e) {
		const t = Oe(e);
		if (void 0 !== t) return JSON.parse(t);
	},
	save(e, t, n) {
		let o = {};
		"https:" === window.location.protocol && (o = {
			secure: !0,
			sameSite: "none"
		}), null != n && n.daysUntilExpire && (o.expires = n.daysUntilExpire), null != n && n.cookieDomain && (o.domain = n.cookieDomain), Ce(e, JSON.stringify(t), o);
	},
	remove(e, t) {
		let n = {};
		null != t && t.cookieDomain && (n.domain = t.cookieDomain), je(e, n);
	}
}, Ue = "_legacy_", De = {
	get: (e) => We.get(e) || We.get("".concat(Ue).concat(e)),
	save(e, t, n) {
		let o = {};
		"https:" === window.location.protocol && (o = { secure: !0 }), null != n && n.daysUntilExpire && (o.expires = n.daysUntilExpire), null != n && n.cookieDomain && (o.domain = n.cookieDomain), Ce("".concat(Ue).concat(e), JSON.stringify(t), o), We.save(e, t, n);
	},
	remove(e, t) {
		let n = {};
		null != t && t.cookieDomain && (n.domain = t.cookieDomain), je(e, n), We.remove(e, t), We.remove("".concat(Ue).concat(e), t);
	}
}, Ke = {
	get(e) {
		if ("undefined" == typeof sessionStorage) return;
		const t = sessionStorage.getItem(e);
		return null != t ? JSON.parse(t) : void 0;
	},
	save(e, t) {
		sessionStorage.setItem(e, JSON.stringify(t));
	},
	remove(e) {
		sessionStorage.removeItem(e);
	}
};
var Ne;
(function(e) {
	e.Code = "code", e.ConnectCode = "connect_code";
})(Ne || (Ne = {}));
var Le = class {};
var ze, He = function(e) {
	return ze = ze || function(e, t, n) {
		var o = void 0 === t ? null : t, r = function(e, t) {
			var n = atob(e);
			if (t) {
				for (var o = new Uint8Array(n.length), r = 0, i = n.length; r < i; ++r) o[r] = n.charCodeAt(r);
				return String.fromCharCode.apply(null, new Uint16Array(o.buffer));
			}
			return n;
		}(e, void 0 !== n && n), i = r.indexOf("\n", 10) + 1, a = r.substring(i) + (o ? "//# sourceMappingURL=" + o : ""), s = new Blob([a], { type: "application/javascript" });
		return URL.createObjectURL(s);
	}("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y2xhc3MgZSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQscil7c3VwZXIociksdGhpcy5lcnJvcj10LHRoaXMuZXJyb3JfZGVzY3JpcHRpb249cixPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcyxlLnByb3RvdHlwZSl9c3RhdGljIGZyb21QYXlsb2FkKHQpe2xldHtlcnJvcjpyLGVycm9yX2Rlc2NyaXB0aW9uOm99PXQ7cmV0dXJuIG5ldyBlKHIsbyl9fWNsYXNzIHQgZXh0ZW5kcyBle2NvbnN0cnVjdG9yKGUsbyl7c3VwZXIoIm1pc3NpbmdfcmVmcmVzaF90b2tlbiIsIk1pc3NpbmcgUmVmcmVzaCBUb2tlbiAoYXVkaWVuY2U6ICciLmNvbmNhdChyKGUsWyJkZWZhdWx0Il0pLCInLCBzY29wZTogJyIpLmNvbmNhdChyKG8pLCInKSIpKSx0aGlzLmF1ZGllbmNlPWUsdGhpcy5zY29wZT1vLE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLHQucHJvdG90eXBlKX19ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmIShhcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06W10pLmluY2x1ZGVzKGUpP2U6IiJ9ImZ1bmN0aW9uIj09dHlwZW9mIFN1cHByZXNzZWRFcnJvciYmU3VwcHJlc3NlZEVycm9yO2NvbnN0IG89ZT0+e3ZhcntjbGllbnRJZDp0fT1lLHI9ZnVuY3Rpb24oZSx0KXt2YXIgcj17fTtmb3IodmFyIG8gaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxvKSYmdC5pbmRleE9mKG8pPDAmJihyW29dPWVbb10pO2lmKG51bGwhPWUmJiJmdW5jdGlvbiI9PXR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKXt2YXIgcz0wO2ZvcihvPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7czxvLmxlbmd0aDtzKyspdC5pbmRleE9mKG9bc10pPDAmJk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChlLG9bc10pJiYocltvW3NdXT1lW29bc11dKX1yZXR1cm4gcn0oZSxbImNsaWVudElkIl0pO3JldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKChlPT5PYmplY3Qua2V5cyhlKS5maWx0ZXIodD0+dm9pZCAwIT09ZVt0XSkucmVkdWNlKCh0LHIpPT5PYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sdCkse1tyXTplW3JdfSkse30pKShPYmplY3QuYXNzaWduKHtjbGllbnRfaWQ6dH0scikpKS50b1N0cmluZygpfTtsZXQgcz17fSxuPW51bGw7Y29uc3QgaT0oZSx0KT0+IiIuY29uY2F0KGUsInwiKS5jb25jYXQodCksYT0oZSx0KT0+dC5zdGFydHNXaXRoKCIiLmNvbmNhdChlLCJ8IikpLGM9ZT0+e09iamVjdC5lbnRyaWVzKHMpLmZvckVhY2godD0+e2xldFtyLG9dPXQ7bz09PWUmJmRlbGV0ZSBzW3JdfSl9LGw9ZT0+e2NvbnN0IHQ9bmV3IFVSTFNlYXJjaFBhcmFtcyhlKSxyPXt9O3JldHVybiB0LmZvckVhY2goKGUsdCk9PntyW3RdPWV9KSxyfSxmPWFzeW5jIGU9PntsZXQgcixuLHtkYXRhOnt0aW1lb3V0OmMsYXV0aDpmLGZldGNoVXJsOnUsZmV0Y2hPcHRpb25zOmgsdXNlRm9ybURhdGE6ZCx1c2VNcnJ0OnB9LHBvcnRzOltnXX09ZSx5PXt9O2NvbnN0e2F1ZGllbmNlOmIsc2NvcGU6T309Znx8e307dHJ5e2NvbnN0IGU9ZD9sKGguYm9keSk6SlNPTi5wYXJzZShoLmJvZHkpO2lmKCFlLnJlZnJlc2hfdG9rZW4mJiJyZWZyZXNoX3Rva2VuIj09PWUuZ3JhbnRfdHlwZSl7aWYobj0oKGUsdCk9PnNbaShlLHQpXSkoYixPKSwhbiYmcCl7Y29uc3QgZT1zLmxhdGVzdF9yZWZyZXNoX3Rva2VuLHQ9KChlLHQpPT4hIU9iamVjdC5rZXlzKHMpLmZpbmQocj0+e2lmKCJsYXRlc3RfcmVmcmVzaF90b2tlbiIhPT1yKXtjb25zdCBvPWEodCxyKSxzPXIuc3BsaXQoInwiKVsxXS5zcGxpdCgiICIpLG49ZS5zcGxpdCgiICIpLmV2ZXJ5KGU9PnMuaW5jbHVkZXMoZSkpO3JldHVybiBvJiZufX0pKShPLGIpO2UmJiF0JiYobj1lKX1pZighbil0aHJvdyBuZXcgdChiLE8pO2guYm9keT1kP28oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LGUpLHtyZWZyZXNoX3Rva2VuOm59KSk6SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LGUpLHtyZWZyZXNoX3Rva2VuOm59KSl9bGV0IGYsdzsiZnVuY3Rpb24iPT10eXBlb2YgQWJvcnRDb250cm9sbGVyJiYoZj1uZXcgQWJvcnRDb250cm9sbGVyLGguc2lnbmFsPWYuc2lnbmFsKTt0cnl7dz1hd2FpdCBQcm9taXNlLnJhY2UoWyhtPWMsbmV3IFByb21pc2UoZT0+c2V0VGltZW91dChlLG0pKSksZmV0Y2godSxPYmplY3QuYXNzaWduKHt9LGgpKV0pfWNhdGNoKGUpe3JldHVybiB2b2lkIGcucG9zdE1lc3NhZ2Uoe2Vycm9yOmUubWVzc2FnZX0pfWlmKCF3KXJldHVybiBmJiZmLmFib3J0KCksdm9pZCBnLnBvc3RNZXNzYWdlKHtlcnJvcjoiVGltZW91dCB3aGVuIGV4ZWN1dGluZyAnZmV0Y2gnIn0pO189dy5oZWFkZXJzLHk9Wy4uLl9dLnJlZHVjZSgoZSx0KT0+e2xldFtyLG9dPXQ7cmV0dXJuIGVbcl09byxlfSx7fSkscj1hd2FpdCB3Lmpzb24oKSxyLnJlZnJlc2hfdG9rZW4/KHAmJihzLmxhdGVzdF9yZWZyZXNoX3Rva2VuPXIucmVmcmVzaF90b2tlbixrPW4saj1yLnJlZnJlc2hfdG9rZW4sT2JqZWN0LmVudHJpZXMocykuZm9yRWFjaChlPT57bGV0W3Qscl09ZTtyPT09ayYmKHNbdF09ail9KSksKChlLHQscik9PntzW2kodCxyKV09ZX0pKHIucmVmcmVzaF90b2tlbixiLE8pLGRlbGV0ZSByLnJlZnJlc2hfdG9rZW4pOigoZSx0KT0+e2RlbGV0ZSBzW2koZSx0KV19KShiLE8pLGcucG9zdE1lc3NhZ2Uoe29rOncub2ssanNvbjpyLGhlYWRlcnM6eX0pfWNhdGNoKGUpe2cucG9zdE1lc3NhZ2Uoe29rOiExLGpzb246e2Vycm9yOmUuZXJyb3IsZXJyb3JfZGVzY3JpcHRpb246ZS5tZXNzYWdlfSxoZWFkZXJzOnl9KX12YXIgayxqLF8sbX0sdT1hc3luYyBlPT57bGV0e2RhdGE6e3RpbWVvdXQ6dCxhdXRoOnIsZmV0Y2hVcmw6bixmZXRjaE9wdGlvbnM6aSx1c2VGb3JtRGF0YTpmfSxwb3J0czpbdV19PWU7Y29uc3R7YXVkaWVuY2U6aH09cnx8e307dHJ5e2NvbnN0IGU9KGU9Pntjb25zdCB0PW5ldyBTZXQ7cmV0dXJuIE9iamVjdC5lbnRyaWVzKHMpLmZvckVhY2gocj0+e2xldFtvLHNdPXI7YShlLG8pJiZ0LmFkZChzKX0pLEFycmF5LmZyb20odCl9KShoKTtpZigwPT09ZS5sZW5ndGgpcmV0dXJuIHZvaWQgdS5wb3N0TWVzc2FnZSh7b2s6ITB9KTtjb25zdCByPWY/bChpLmJvZHkpOkpTT04ucGFyc2UoaS5ib2R5KTtmb3IoY29uc3QgcyBvZiBlKXtjb25zdCBlPWY/byhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30scikse3Rva2VuOnN9KSk6SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LHIpLHt0b2tlbjpzfSkpO2xldCBhLGwsaCxkOyJmdW5jdGlvbiI9PXR5cGVvZiBBYm9ydENvbnRyb2xsZXImJihhPW5ldyBBYm9ydENvbnRyb2xsZXIsbD1hLnNpZ25hbCk7dHJ5e2Q9YXdhaXQgUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShlPT57aD1zZXRUaW1lb3V0KGUsdCl9KSxmZXRjaChuLE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSxpKSx7Ym9keTplLHNpZ25hbDpsfSkpXSkuZmluYWxseSgoKT0+Y2xlYXJUaW1lb3V0KGgpKX1jYXRjaChlKXtyZXR1cm4gdm9pZCB1LnBvc3RNZXNzYWdlKHtlcnJvcjplLm1lc3NhZ2V9KX1pZighZClyZXR1cm4gYSYmYS5hYm9ydCgpLHZvaWQgdS5wb3N0TWVzc2FnZSh7ZXJyb3I6IlRpbWVvdXQgd2hlbiBleGVjdXRpbmcgJ2ZldGNoJyJ9KTtpZighZC5vayl7bGV0IGU7dHJ5e2NvbnN0e2Vycm9yX2Rlc2NyaXB0aW9uOnR9PUpTT04ucGFyc2UoYXdhaXQgZC50ZXh0KCkpO2U9dH1jYXRjaChlKXt9cmV0dXJuIHZvaWQgdS5wb3N0TWVzc2FnZSh7ZXJyb3I6ZXx8IkhUVFAgZXJyb3IgIi5jb25jYXQoZC5zdGF0dXMpfSl9YyhzKX11LnBvc3RNZXNzYWdlKHtvazohMH0pfWNhdGNoKGUpe3UucG9zdE1lc3NhZ2Uoe2Vycm9yOmUubWVzc2FnZXx8IlVua25vd24gZXJyb3IgZHVyaW5nIHRva2VuIHJldm9jYXRpb24ifSl9fSxoPShlLHQpPT57aWYoIW4pcmV0dXJuITE7dHJ5e2NvbnN0IHI9bmV3IFVSTChuKS5vcmlnaW4sbz1uZXcgVVJMKGUuZmV0Y2hVcmwpO3JldHVybiBvLm9yaWdpbj09PXImJm8ucGF0aG5hbWU9PT10fWNhdGNoKGUpe3JldHVybiExfX07YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsZT0+e2NvbnN0e2RhdGE6dCxwb3J0czpyfT1lLFtvXT1yO2lmKCEoInR5cGUiaW4gdCl8fCJpbml0IiE9PXQudHlwZSlyZXR1cm4idHlwZSJpbiB0JiYiY2xlYXIiPT09dC50eXBlPyhzPXt9LHZvaWQobnVsbD09b3x8by5wb3N0TWVzc2FnZSh7b2s6ITB9KSkpOiJ0eXBlImluIHQmJiJyZXZva2UiPT09dC50eXBlP2godCwiL29hdXRoL3Jldm9rZSIpP3ZvaWQgdShlKTp2b2lkKG51bGw9PW98fG8ucG9zdE1lc3NhZ2Uoe29rOiExLGpzb246e2Vycm9yOiJpbnZhbGlkX2ZldGNoX3VybCIsZXJyb3JfZGVzY3JpcHRpb246IlVuYXV0aG9yaXplZCBmZXRjaCBVUkwifSxoZWFkZXJzOnt9fSkpOnZvaWQoImZldGNoVXJsImluIHQmJmgodCwiL29hdXRoL3Rva2VuIik/ZihlKTpudWxsPT1vfHxvLnBvc3RNZXNzYWdlKHtvazohMSxqc29uOntlcnJvcjoiaW52YWxpZF9mZXRjaF91cmwiLGVycm9yX2Rlc2NyaXB0aW9uOiJVbmF1dGhvcml6ZWQgZmV0Y2ggVVJMIn0saGVhZGVyczp7fX0pKTtpZihudWxsPT09bil0cnl7bmV3IFVSTCh0LmFsbG93ZWRCYXNlVXJsKSxuPXQuYWxsb3dlZEJhc2VVcmx9Y2F0Y2goZSl7cmV0dXJufX0pfSgpOwoK", null, false), new Worker(ze, e);
};
var Je = {};
var Me = class {
	constructor(e, t) {
		this.cache = e, this.clientId = t, this.manifestKey = this.createManifestKeyFrom(this.clientId);
	}
	async add(e) {
		var t;
		const n = new Set((null === (t = await this.cache.get(this.manifestKey)) || void 0 === t ? void 0 : t.keys) || []);
		n.add(e), await this.cache.set(this.manifestKey, { keys: [...n] });
	}
	async remove(e) {
		const t = await this.cache.get(this.manifestKey);
		if (t) {
			const n = new Set(t.keys);
			return n.delete(e), n.size > 0 ? await this.cache.set(this.manifestKey, { keys: [...n] }) : await this.cache.remove(this.manifestKey);
		}
	}
	get() {
		return this.cache.get(this.manifestKey);
	}
	clear() {
		return this.cache.remove(this.manifestKey);
	}
	createManifestKeyFrom(e) {
		return "".concat(ve, "::").concat(e);
	}
};
var Ze = "auth0.is.authenticated", Ve = {
	memory: () => new Se().enclosedCache,
	localstorage: () => new ke()
}, Fe = (e) => Ve[e], Xe = (e) => {
	const { openUrl: t, onRedirect: n } = e, o = a(e, ["openUrl", "onRedirect"]);
	return Object.assign(Object.assign({}, o), { openUrl: !1 === t || t ? t : n });
}, Ge = (e, t) => {
	const n = (null == t ? void 0 : t.split(" ")) || [];
	return ((null == e ? void 0 : e.split(" ")) || []).every((e) => n.includes(e));
}, Ye = {
	NONCE: "nonce",
	KEYPAIR: "keypair"
};
var Be = class {
	constructor(e) {
		this.clientId = e;
	}
	getVersion() {
		return 1;
	}
	createDbHandle() {
		const e = window.indexedDB.open("auth0-spa-js", this.getVersion());
		return new Promise((t, n) => {
			e.onupgradeneeded = () => Object.values(Ye).forEach((t) => e.result.createObjectStore(t)), e.onerror = () => n(e.error), e.onsuccess = () => t(e.result);
		});
	}
	async getDbHandle() {
		return this.dbHandle || (this.dbHandle = await this.createDbHandle()), this.dbHandle;
	}
	async executeDbRequest(e, t, n) {
		const o = n((await this.getDbHandle()).transaction(e, t).objectStore(e));
		return new Promise((e, t) => {
			o.onsuccess = () => e(o.result), o.onerror = () => t(o.error);
		});
	}
	buildKey(e) {
		const t = e ? "_".concat(e) : "auth0";
		return "".concat(this.clientId, "::").concat(t);
	}
	setNonce(e, t) {
		return this.save(Ye.NONCE, this.buildKey(t), e);
	}
	setKeyPair(e) {
		return this.save(Ye.KEYPAIR, this.buildKey(), e);
	}
	async save(e, t, n) {
		await this.executeDbRequest(e, "readwrite", (e) => e.put(n, t));
	}
	findNonce(e) {
		return this.find(Ye.NONCE, this.buildKey(e));
	}
	findKeyPair() {
		return this.find(Ye.KEYPAIR, this.buildKey());
	}
	find(e, t) {
		return this.executeDbRequest(e, "readonly", (e) => e.get(t));
	}
	async deleteBy(e, t) {
		(await this.executeDbRequest(e, "readonly", (e) => e.getAllKeys()))?.filter(t).map((t) => this.executeDbRequest(e, "readwrite", (e) => e.delete(t)));
	}
	deleteByClientId(e, t) {
		return this.deleteBy(e, (e) => "string" == typeof e && e.startsWith("".concat(t, "::")));
	}
	clearNonces() {
		return this.deleteByClientId(Ye.NONCE, this.clientId);
	}
	clearKeyPairs() {
		return this.deleteByClientId(Ye.KEYPAIR, this.clientId);
	}
};
var qe = class {
	constructor(e) {
		this.storage = new Be(e);
	}
	getNonce(e) {
		return this.storage.findNonce(e);
	}
	setNonce(e, t) {
		return this.storage.setNonce(e, t);
	}
	async getOrGenerateKeyPair() {
		let e = await this.storage.findKeyPair();
		return e || (e = await async function(e, t) {
			var n;
			let o;
			return o = {
				name: "ECDSA",
				namedCurve: "P-256"
			}, crypto.subtle.generateKey(o, null !== (n = null == t ? void 0 : t.extractable) && void 0 !== n && n, ["sign", "verify"]);
		}(0, { extractable: !1 }), await this.storage.setKeyPair(e)), e;
	}
	async generateProof(e) {
		const t = await this.getOrGenerateKeyPair();
		return function(e) {
			let { keyPair: t, url: n, method: o, nonce: r, accessToken: i } = e;
			return ce(t, function(e) {
				const t = new URL(e);
				return t.search = "", t.hash = "", t.href;
			}(n), o, r, i);
		}(Object.assign({ keyPair: t }, e));
	}
	async calculateThumbprint() {
		return function(e) {
			return async function(e) {
				if (!se(e)) throw new TypeError("\"publicKey\" must be a public CryptoKey");
				if (!0 !== e.extractable) throw new TypeError("\"publicKey.extractable\" must be true");
				const t = await ue(e);
				let n;
				switch (t.kty) {
					case "EC":
						n = {
							crv: t.crv,
							kty: t.kty,
							x: t.x,
							y: t.y
						};
						break;
					case "OKP":
						n = {
							crv: t.crv,
							kty: t.kty,
							x: t.x
						};
						break;
					case "RSA":
						n = {
							e: t.e,
							kty: t.kty,
							n: t.n
						};
						break;
					default: throw new oe("unsupported JWK kty");
				}
				return ne(await crypto.subtle.digest({ name: "SHA-256" }, $(JSON.stringify(n))));
			}(e.publicKey);
		}(await this.getOrGenerateKeyPair());
	}
	async clear() {
		await Promise.all([this.storage.clearNonces(), this.storage.clearKeyPairs()]);
	}
};
var Qe;
(function(e) {
	e.Bearer = "Bearer", e.DPoP = "DPoP";
})(Qe || (Qe = {}));
var $e = class {
	constructor(e, t) {
		this.hooks = t, this.config = Object.assign(Object.assign({}, e), { fetch: e.fetch || ("undefined" == typeof window ? fetch : window.fetch.bind(window)) });
	}
	isAbsoluteUrl(e) {
		return /^(https?:)?\/\//i.test(e);
	}
	buildUrl(e, t) {
		if (t) {
			if (this.isAbsoluteUrl(t)) return t;
			if (e) return "".concat(e.replace(/\/?\/$/, ""), "/").concat(t.replace(/^\/+/, ""));
		}
		throw new TypeError("`url` must be absolute or `baseUrl` non-empty.");
	}
	getAccessToken(e) {
		return this.config.getAccessToken ? this.config.getAccessToken(e) : this.hooks.getAccessToken(e);
	}
	extractUrl(e) {
		return "string" == typeof e ? e : e instanceof URL ? e.href : e.url;
	}
	buildBaseRequest(e, t) {
		if (!this.config.baseUrl) return new Request(e, t);
		const n = this.buildUrl(this.config.baseUrl, this.extractUrl(e)), o = e instanceof Request ? new Request(n, e) : n;
		return new Request(o, t);
	}
	setAuthorizationHeader(e, t) {
		let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Qe.Bearer;
		e.headers.set("authorization", "".concat(n, " ").concat(t));
	}
	async setDpopProofHeader(e, t) {
		if (!this.config.dpopNonceId) return;
		const n = await this.hooks.getDpopNonce(), o = await this.hooks.generateDpopProof({
			accessToken: t,
			method: e.method,
			nonce: n,
			url: e.url
		});
		e.headers.set("dpop", o);
	}
	async prepareRequest(e, t) {
		const n = await this.getAccessToken(t);
		let o, r;
		"string" == typeof n ? (o = this.config.dpopNonceId ? Qe.DPoP : Qe.Bearer, r = n) : (o = n.token_type, r = n.access_token), this.setAuthorizationHeader(e, r, o), o === Qe.DPoP && await this.setDpopProofHeader(e, r);
	}
	getHeader(e, t) {
		return Array.isArray(e) ? new Headers(e).get(t) || "" : "function" == typeof e.get ? e.get(t) || "" : e[t] || "";
	}
	hasUseDpopNonceError(e) {
		if (401 !== e.status) return !1;
		const t = this.getHeader(e.headers, "www-authenticate");
		return t.includes("invalid_dpop_nonce") || t.includes("use_dpop_nonce");
	}
	async handleResponse(e, t) {
		const n = this.getHeader(e.headers, le);
		if (n && await this.hooks.setDpopNonce(n), !this.hasUseDpopNonceError(e)) return e;
		if (!n || !t.onUseDpopNonceError) throw new S(n);
		return t.onUseDpopNonceError();
	}
	async internalFetchWithAuth(e, t, n, o) {
		const r = this.buildBaseRequest(e, t);
		await this.prepareRequest(r, o);
		const i = await this.config.fetch(r);
		return this.handleResponse(i, n);
	}
	fetchWithAuth(e, t, n) {
		const o = { onUseDpopNonceError: () => this.internalFetchWithAuth(e, t, Object.assign(Object.assign({}, o), { onUseDpopNonceError: void 0 }), n) };
		return this.internalFetchWithAuth(e, t, o, n);
	}
};
var et = class {
	constructor(e, t) {
		this.myAccountFetcher = e, this.apiBase = t;
	}
	async connectAccount(e) {
		const t = await this.myAccountFetcher.fetchWithAuth("".concat(this.apiBase, "v1/connected-accounts/connect"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(e)
		});
		return this._handleResponse(t);
	}
	async completeAccount(e) {
		const t = await this.myAccountFetcher.fetchWithAuth("".concat(this.apiBase, "v1/connected-accounts/complete"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(e)
		});
		return this._handleResponse(t);
	}
	async _handleResponse(e) {
		let t;
		try {
			t = await e.text(), t = JSON.parse(t);
		} catch (n) {
			throw new tt({
				type: "invalid_json",
				status: e.status,
				title: "Invalid JSON response",
				detail: t || String(n)
			});
		}
		if (e.ok) return t;
		throw new tt(t);
	}
};
var tt = class tt extends Error {
	constructor(e) {
		let { type: t, status: n, title: o, detail: r, validation_errors: i } = e;
		super(r), this.name = "MyAccountApiError", this.type = t, this.status = n, this.title = o, this.detail = r, this.validation_errors = i, Object.setPrototypeOf(this, tt.prototype);
	}
};
var nt = {
	otp: { authenticatorTypes: ["otp"] },
	sms: {
		authenticatorTypes: ["oob"],
		oobChannels: ["sms"]
	},
	email: {
		authenticatorTypes: ["oob"],
		oobChannels: ["email"]
	},
	push: {
		authenticatorTypes: ["oob"],
		oobChannels: ["auth0"]
	},
	voice: {
		authenticatorTypes: ["oob"],
		oobChannels: ["voice"]
	}
};
function ot(e, t) {
	this.v = e, this.k = t;
}
function rt(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
function it(e) {
	return new ot(e, 0);
}
function at(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function st(e, t) {
	return e.get(rt(e, t));
}
function ct(e, t, n) {
	at(e, t), t.set(e, n);
}
function ut(e, t, n) {
	return e.set(rt(e, t), n), n;
}
function lt(e, t, n) {
	return (t = function(e) {
		var t = function(e) {
			if ("object" != typeof e || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var n = t.call(e, "string");
				if ("object" != typeof n) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e);
		return "symbol" == typeof t ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ht(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		t && (o = o.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, o);
	}
	return n;
}
function dt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? ht(Object(n), !0).forEach(function(t) {
			lt(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ht(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function pt(e, t) {
	if (null == e) return {};
	var n, o, r = function(e, t) {
		if (null == e) return {};
		var n = {};
		for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
			if (-1 !== t.indexOf(o)) continue;
			n[o] = e[o];
		}
		return n;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(e);
		for (o = 0; o < i.length; o++) n = i[o], -1 === t.indexOf(n) && {}.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
	}
	return r;
}
function ft(e) {
	var t, n;
	function o(t, n) {
		try {
			var i = e[t](n), a = i.value, s = a instanceof ot;
			Promise.resolve(s ? a.v : a).then(function(n) {
				if (s) {
					var c = "return" === t && a.k ? t : "next";
					if (!a.k || n.done) return o(c, n);
					n = e[c](n).value;
				}
				r(!!i.done, n);
			}, function(e) {
				o("throw", e);
			});
		} catch (e) {
			r(2, e);
		}
	}
	function r(e, r) {
		2 === e ? t.reject(r) : t.resolve({
			value: r,
			done: e
		}), (t = t.next) ? o(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, r) {
		return new Promise(function(i, a) {
			var s = {
				key: e,
				arg: r,
				resolve: i,
				reject: a,
				next: null
			};
			n ? n = n.next = s : (t = n = s, o(e, r));
		});
	}, "function" != typeof e.return && (this.return = void 0);
}
var mt, yt;
var wt;
if (ft.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, ft.prototype.next = function(e) {
	return this._invoke("next", e);
}, ft.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, ft.prototype.return = function(e) {
	return this._invoke("return", e);
}, "undefined" == typeof navigator || null === (mt = navigator.userAgent) || void 0 === mt || null === (yt = mt.startsWith) || void 0 === yt || !yt.call(mt, "Mozilla/5.0 ")) wt = "".concat("oauth4webapi", "/").concat("v3.8.5");
function gt(e, t) {
	if (null == e) return !1;
	try {
		return e instanceof t || Object.getPrototypeOf(e)[Symbol.toStringTag] === t.prototype[Symbol.toStringTag];
	} catch (e) {
		return !1;
	}
}
var vt = "ERR_INVALID_ARG_VALUE", bt = "ERR_INVALID_ARG_TYPE";
function _t(e, t, n) {
	const o = new TypeError(e, { cause: n });
	return Object.assign(o, { code: t }), o;
}
var kt = Symbol(), St = Symbol(), Tt = Symbol(), Et = Symbol(), Pt = Symbol(), At = Symbol(), xt = new TextEncoder(), Rt = new TextDecoder();
function Ot(e) {
	return "string" == typeof e ? xt.encode(e) : Rt.decode(e);
}
var It, Ct;
if (Uint8Array.prototype.toBase64) It = (e) => (e instanceof ArrayBuffer && (e = new Uint8Array(e)), e.toBase64({
	alphabet: "base64url",
	omitPadding: !0
}));
else {
	const e = 32768;
	It = (t) => {
		t instanceof ArrayBuffer && (t = new Uint8Array(t));
		const n = [];
		for (let o = 0; o < t.byteLength; o += e) n.push(String.fromCharCode.apply(null, t.subarray(o, o + e)));
		return btoa(n.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
	};
}
function jt(e) {
	return "string" == typeof e ? Ct(e) : It(e);
}
Ct = Uint8Array.fromBase64 ? (e) => {
	try {
		return Uint8Array.fromBase64(e, { alphabet: "base64url" });
	} catch (e) {
		throw _t("The input to be decoded is not correctly encoded.", vt, e);
	}
} : (e) => {
	try {
		const t = atob(e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), n = new Uint8Array(t.length);
		for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
		return n;
	} catch (e) {
		throw _t("The input to be decoded is not correctly encoded.", vt, e);
	}
};
var Wt = class extends Error {
	constructor(e, t) {
		var n;
		super(e, t), lt(this, "code", void 0), this.name = this.constructor.name, this.code = jn, null === (n = Error.captureStackTrace) || void 0 === n || n.call(Error, this, this.constructor);
	}
};
var Ut = class extends Error {
	constructor(e, t) {
		var n;
		super(e, t), lt(this, "code", void 0), this.name = this.constructor.name, null != t && t.code && (this.code = null == t ? void 0 : t.code), null === (n = Error.captureStackTrace) || void 0 === n || n.call(Error, this, this.constructor);
	}
};
function Dt(e, t, n) {
	return new Ut(e, {
		code: t,
		cause: n
	});
}
function Kt(e) {
	return null !== e && "object" == typeof e && !Array.isArray(e);
}
function Nt(e) {
	gt(e, Headers) && (e = Object.fromEntries(e.entries()));
	const t = new Headers(null != e ? e : {});
	if (wt && !t.has("user-agent") && t.set("user-agent", wt), t.has("authorization")) throw _t("\"options.headers\" must not include the \"authorization\" header name", vt);
	return t;
}
function Lt(e, t) {
	if (void 0 !== t) {
		if ("function" == typeof t && (t = t(e.href)), !(t instanceof AbortSignal)) throw _t("\"options.signal\" must return or be an instance of AbortSignal", bt);
		return t;
	}
}
function zt(e) {
	return e.includes("//") ? e.replace("//", "/") : e;
}
function Ht(e, t, n, o, r) {
	try {
		if ("number" != typeof e || !Number.isFinite(e)) throw _t("".concat(n, " must be a number"), bt, r);
		if (e > 0) return;
		if (t) {
			if (0 !== e) throw _t("".concat(n, " must be a non-negative number"), vt, r);
			return;
		}
		throw _t("".concat(n, " must be a positive number"), vt, r);
	} catch (e) {
		if (o) throw Dt(e.message, o, r);
		throw e;
	}
}
function Jt(e, t, n, o) {
	try {
		if ("string" != typeof e) throw _t("".concat(t, " must be a string"), bt, o);
		if (0 === e.length) throw _t("".concat(t, " must not be empty"), vt, o);
	} catch (e) {
		if (n) throw Dt(e.message, n, o);
		throw e;
	}
}
function Mt(e) {
	(function(e, t) {
		if (yn(e) !== t) throw function(e) {
			let t = "\"response\" content-type must be ";
			for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
			if (o.length > 2) {
				const e = o.pop();
				t += "".concat(o.join(", "), ", or ").concat(e);
			} else 2 === o.length ? t += "".concat(o[0], " or ").concat(o[1]) : t += o[0];
			return Dt(t, Kn, e);
		}(e, t);
	})(e, "application/json");
}
function Zt() {
	return jt(crypto.getRandomValues(new Uint8Array(32)));
}
function Vt(e) {
	switch (e.algorithm.name) {
		case "RSA-PSS": return function(e) {
			switch (e.algorithm.hash.name) {
				case "SHA-256": return "PS256";
				case "SHA-384": return "PS384";
				case "SHA-512": return "PS512";
				default: throw new Wt("unsupported RsaHashedKeyAlgorithm hash name", { cause: e });
			}
		}(e);
		case "RSASSA-PKCS1-v1_5": return function(e) {
			switch (e.algorithm.hash.name) {
				case "SHA-256": return "RS256";
				case "SHA-384": return "RS384";
				case "SHA-512": return "RS512";
				default: throw new Wt("unsupported RsaHashedKeyAlgorithm hash name", { cause: e });
			}
		}(e);
		case "ECDSA": return function(e) {
			switch (e.algorithm.namedCurve) {
				case "P-256": return "ES256";
				case "P-384": return "ES384";
				case "P-521": return "ES512";
				default: throw new Wt("unsupported EcKeyAlgorithm namedCurve", { cause: e });
			}
		}(e);
		case "Ed25519":
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87": return e.algorithm.name;
		case "EdDSA": return "Ed25519";
		default: throw new Wt("unsupported CryptoKey algorithm name", { cause: e });
	}
}
function Ft(e) {
	const t = null == e ? void 0 : e[St];
	return "number" == typeof t && Number.isFinite(t) ? t : 0;
}
function Xt(e) {
	const t = null == e ? void 0 : e[Tt];
	return "number" == typeof t && Number.isFinite(t) && -1 !== Math.sign(t) ? t : 30;
}
function Gt() {
	return Math.floor(Date.now() / 1e3);
}
function Yt(e) {
	if ("object" != typeof e || null === e) throw _t("\"as\" must be an object", bt);
	Jt(e.issuer, "\"as.issuer\"");
}
function Bt(e) {
	if ("object" != typeof e || null === e) throw _t("\"client\" must be an object", bt);
	Jt(e.client_id, "\"client.client_id\"");
}
function qt(e) {
	return Jt(e, "\"clientSecret\""), (t, n, o, r) => {
		o.set("client_id", n.client_id), o.set("client_secret", e);
	};
}
function Qt(e, t) {
	const { key: n, kid: o } = (r = e) instanceof CryptoKey ? { key: r } : (null == r ? void 0 : r.key) instanceof CryptoKey ? (void 0 !== r.kid && Jt(r.kid, "\"kid\""), {
		key: r.key,
		kid: r.kid
	}) : {};
	var r;
	return function(e, t) {
		if (function(e, t) {
			if (!(e instanceof CryptoKey)) throw _t("".concat(t, " must be a CryptoKey"), bt);
		}(e, t), "private" !== e.type) throw _t("".concat(t, " must be a private CryptoKey"), vt);
	}(n, "\"clientPrivateKey.key\""), async (e, r, i, a) => {
		var s;
		const c = {
			alg: Vt(n),
			kid: o
		}, u = function(e, t) {
			const n = Gt() + Ft(t);
			return {
				jti: Zt(),
				aud: e.issuer,
				exp: n + 60,
				iat: n,
				nbf: n,
				iss: t.client_id,
				sub: t.client_id
			};
		}(e, r);
		null == t || null === (s = t[Pt]) || void 0 === s || s.call(t, c, u), i.set("client_id", r.client_id), i.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), i.set("client_assertion", await async function(e, t, n) {
			if (!n.usages.includes("sign")) throw _t("CryptoKey instances used for signing assertions must include \"sign\" in their \"usages\"", vt);
			const o = "".concat(jt(Ot(JSON.stringify(e))), ".").concat(jt(Ot(JSON.stringify(t)))), r = jt(await crypto.subtle.sign(function(e) {
				switch (e.algorithm.name) {
					case "ECDSA": return {
						name: e.algorithm.name,
						hash: Gn(e)
					};
					case "RSA-PSS": switch (Xn(e), e.algorithm.hash.name) {
						case "SHA-256":
						case "SHA-384":
						case "SHA-512": return {
							name: e.algorithm.name,
							saltLength: parseInt(e.algorithm.hash.name.slice(-3), 10) >> 3
						};
						default: throw new Wt("unsupported RSA-PSS hash name", { cause: e });
					}
					case "RSASSA-PKCS1-v1_5": return Xn(e), e.algorithm.name;
					case "ML-DSA-44":
					case "ML-DSA-65":
					case "ML-DSA-87":
					case "Ed25519": return e.algorithm.name;
				}
				throw new Wt("unsupported CryptoKey algorithm name", { cause: e });
			}(n), n, Ot(o)));
			return "".concat(o, ".").concat(r);
		}(c, u, n));
	};
}
var $t = URL.parse ? (e, t) => URL.parse(e, t) : (e, t) => {
	try {
		return new URL(e, t);
	} catch (e) {
		return null;
	}
};
function en(e, t) {
	if (t && "https:" !== e.protocol) throw Dt("only requests to HTTPS are allowed", Ln, e);
	if ("https:" !== e.protocol && "http:" !== e.protocol) throw Dt("only HTTP and HTTPS requests are allowed", zn, e);
}
function tn(e, t, n, o) {
	let r;
	if ("string" != typeof e || !(r = $t(e))) throw Dt("authorization server metadata does not contain a valid ".concat(n ? "\"as.mtls_endpoint_aliases.".concat(t, "\"") : "\"as.".concat(t, "\"")), void 0 === e ? Zn : Vn, { attribute: n ? "mtls_endpoint_aliases.".concat(t) : t });
	return en(r, o), r;
}
function nn(e, t, n, o) {
	return n && e.mtls_endpoint_aliases && t in e.mtls_endpoint_aliases ? tn(e.mtls_endpoint_aliases[t], t, n, o) : tn(e[t], t, n, o);
}
var on = class extends Error {
	constructor(e, t) {
		var n;
		super(e, t), lt(this, "cause", void 0), lt(this, "code", void 0), lt(this, "error", void 0), lt(this, "status", void 0), lt(this, "error_description", void 0), lt(this, "response", void 0), this.name = this.constructor.name, this.code = Cn, this.cause = t.cause, this.error = t.cause.error, this.status = t.response.status, this.error_description = t.cause.error_description, Object.defineProperty(this, "response", {
			enumerable: !1,
			value: t.response
		}), null === (n = Error.captureStackTrace) || void 0 === n || n.call(Error, this, this.constructor);
	}
};
var rn = class extends Error {
	constructor(e, t) {
		var n, o;
		super(e, t), lt(this, "cause", void 0), lt(this, "code", void 0), lt(this, "error", void 0), lt(this, "error_description", void 0), this.name = this.constructor.name, this.code = Wn, this.cause = t.cause, this.error = t.cause.get("error"), this.error_description = null !== (n = t.cause.get("error_description")) && void 0 !== n ? n : void 0, null === (o = Error.captureStackTrace) || void 0 === o || o.call(Error, this, this.constructor);
	}
};
var an = class extends Error {
	constructor(e, t) {
		var n;
		super(e, t), lt(this, "cause", void 0), lt(this, "code", void 0), lt(this, "response", void 0), lt(this, "status", void 0), this.name = this.constructor.name, this.code = In, this.cause = t.cause, this.status = t.response.status, this.response = t.response, Object.defineProperty(this, "response", { enumerable: !1 }), null === (n = Error.captureStackTrace) || void 0 === n || n.call(Error, this, this.constructor);
	}
};
var ln = /* @__PURE__ */ new RegExp("^[,\\s]*([a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+)"), hn = /* @__PURE__ */ new RegExp("^[,\\s]*([a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+)\\s*=\\s*\"((?:[^\"\\\\]|\\\\[\\s\\S])*)\"[,\\s]*(.*)"), dn = /* @__PURE__ */ new RegExp("^[,\\s]*([a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+)\\s*=\\s*([a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+)[,\\s]*(.*)"), pn = /* @__PURE__ */ new RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
async function fn(e, t, n) {
	if (e.status !== t) {
		let t;
		var o;
		if (function(e) {
			let t;
			if (t = function(e) {
				if (!gt(e, Response)) throw _t("\"response\" must be an instance of Response", bt);
				const t = e.headers.get("www-authenticate");
				if (null === t) return;
				const n = [];
				let o = t;
				for (; o;) {
					var r;
					let t = o.match(ln);
					const i = null === (r = t) || void 0 === r ? void 0 : r[1].toLowerCase();
					if (!i) return;
					const a = o.substring(t[0].length);
					if (a && !a.match(/^[\s,]/)) return;
					const s = a.match(/^\s+(.*)$/), c = !!s;
					o = s ? s[1] : void 0;
					const u = {};
					let l;
					if (c) for (; o;) {
						let n, r;
						if (t = o.match(hn)) {
							if ([, n, r, o] = t, r.includes("\\")) try {
								r = JSON.parse("\"".concat(r, "\""));
							} catch (e) {}
							u[n.toLowerCase()] = r;
						} else {
							if (!(t = o.match(dn))) {
								if (t = o.match(pn)) {
									if (Object.keys(u).length) break;
									[, l, o] = t;
									break;
								}
								return;
							}
							[, n, r, o] = t, u[n.toLowerCase()] = r;
						}
					}
					else o = a || void 0;
					const h = {
						scheme: i,
						parameters: u
					};
					l && (h.token68 = l), n.push(h);
				}
				return n.length ? n : void 0;
			}(e)) throw new an("server responded with a challenge in the WWW-Authenticate HTTP Header", {
				cause: t,
				response: e
			});
		}(e), t = await async function(e) {
			if (e.status > 399 && e.status < 500) {
				Fn(e), Mt(e);
				try {
					const t = await e.clone().json();
					if (Kt(t) && "string" == typeof t.error && t.error.length) return t;
				} catch (e) {}
			}
		}(e)) throw await (null === (o = e.body) || void 0 === o ? void 0 : o.cancel()), new on("server responded with an error in the response body", {
			cause: t,
			response: e
		});
		throw Dt("\"response\" is not a conform ".concat(n, " response (unexpected HTTP status code)"), Nn, e);
	}
}
function mn(e) {
	if (!En.has(e)) throw _t("\"options.DPoP\" is not a valid DPoPHandle", vt);
}
function yn(e) {
	var t;
	return null === (t = e.headers.get("content-type")) || void 0 === t ? void 0 : t.split(";")[0];
}
async function wn(e, t, n, o, r, i, a) {
	return await n(e, t, r, i), i.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), ((null == a ? void 0 : a[Et]) || fetch)(o.href, {
		body: r,
		headers: Object.fromEntries(i.entries()),
		method: "POST",
		redirect: "manual",
		signal: Lt(o, null == a ? void 0 : a.signal)
	});
}
async function gn(e, t, n, o, r, i) {
	var a;
	const s = nn(e, "token_endpoint", t.use_mtls_endpoint_aliases, !0 !== (null == i ? void 0 : i[kt]));
	r.set("grant_type", o);
	const c = Nt(null == i ? void 0 : i.headers);
	c.set("accept", "application/json"), void 0 !== (null == i ? void 0 : i.DPoP) && (mn(i.DPoP), await i.DPoP.addProof(s, c, "POST"));
	const u = await wn(e, t, n, s, r, c, i);
	return null == i || null === (a = i.DPoP) || void 0 === a || a.cacheNonce(u, s), u;
}
var vn = /* @__PURE__ */ new WeakMap(), bn = /* @__PURE__ */ new WeakMap();
function _n(e) {
	if (!e.id_token) return;
	const t = vn.get(e);
	if (!t) throw _t("\"ref\" was already garbage collected or did not resolve from the proper sources", vt);
	return t;
}
async function kn(e, t, n, o, r, i) {
	if (Yt(e), Bt(t), !gt(n, Response)) throw _t("\"response\" must be an instance of Response", bt);
	await fn(n, 200, "Token Endpoint"), Fn(n);
	const a = await $n(n);
	if (Jt(a.access_token, "\"response\" body \"access_token\" property", Dn, { body: a }), Jt(a.token_type, "\"response\" body \"token_type\" property", Dn, { body: a }), a.token_type = a.token_type.toLowerCase(), void 0 !== a.expires_in) {
		let e = "number" != typeof a.expires_in ? parseFloat(a.expires_in) : a.expires_in;
		Ht(e, !0, "\"response\" body \"expires_in\" property", Dn, { body: a }), a.expires_in = e;
	}
	if (void 0 !== a.refresh_token && Jt(a.refresh_token, "\"response\" body \"refresh_token\" property", Dn, { body: a }), void 0 !== a.scope && "string" != typeof a.scope) throw Dt("\"response\" body \"scope\" property must be a string", Dn, { body: a });
	if (void 0 !== a.id_token) {
		Jt(a.id_token, "\"response\" body \"id_token\" property", Dn, { body: a });
		const i = [
			"aud",
			"exp",
			"iat",
			"iss",
			"sub"
		];
		!0 === t.require_auth_time && i.push("auth_time"), void 0 !== t.default_max_age && (Ht(t.default_max_age, !0, "\"client.default_max_age\""), i.push("auth_time")), null != o && o.length && i.push(...o);
		const { claims: s, jwt: c } = await async function(e, t, n, o, r) {
			let i, a, { 0: s, 1: c, length: u } = e.split(".");
			if (5 === u) {
				if (void 0 === r) throw new Wt("JWE decryption is not configured", { cause: e });
				e = await r(e), {0: s, 1: c, length: u} = e.split(".");
			}
			if (3 !== u) throw Dt("Invalid JWT", Dn, e);
			try {
				i = JSON.parse(Ot(jt(s)));
			} catch (e) {
				throw Dt("failed to parse JWT Header body as base64url encoded JSON", Un, e);
			}
			if (!Kt(i)) throw Dt("JWT Header must be a top level object", Dn, e);
			if (t(i), void 0 !== i.crit) throw new Wt("no JWT \"crit\" header parameter extensions are supported", { cause: { header: i } });
			try {
				a = JSON.parse(Ot(jt(c)));
			} catch (e) {
				throw Dt("failed to parse JWT Payload body as base64url encoded JSON", Un, e);
			}
			if (!Kt(a)) throw Dt("JWT Payload must be a top level object", Dn, e);
			const l = Gt() + n;
			if (void 0 !== a.exp) {
				if ("number" != typeof a.exp) throw Dt("unexpected JWT \"exp\" (expiration time) claim type", Dn, { claims: a });
				if (a.exp <= l - o) throw Dt("unexpected JWT \"exp\" (expiration time) claim value, expiration is past current timestamp", Hn, {
					claims: a,
					now: l,
					tolerance: o,
					claim: "exp"
				});
			}
			if (void 0 !== a.iat && "number" != typeof a.iat) throw Dt("unexpected JWT \"iat\" (issued at) claim type", Dn, { claims: a });
			if (void 0 !== a.iss && "string" != typeof a.iss) throw Dt("unexpected JWT \"iss\" (issuer) claim type", Dn, { claims: a });
			if (void 0 !== a.nbf) {
				if ("number" != typeof a.nbf) throw Dt("unexpected JWT \"nbf\" (not before) claim type", Dn, { claims: a });
				if (a.nbf > l + o) throw Dt("unexpected JWT \"nbf\" (not before) claim value", Hn, {
					claims: a,
					now: l,
					tolerance: o,
					claim: "nbf"
				});
			}
			if (void 0 !== a.aud && "string" != typeof a.aud && !Array.isArray(a.aud)) throw Dt("unexpected JWT \"aud\" (audience) claim type", Dn, { claims: a });
			return {
				header: i,
				claims: a,
				jwt: e
			};
		}(a.id_token, Yn.bind(void 0, t.id_token_signed_response_alg, e.id_token_signing_alg_values_supported, "RS256"), Ft(t), Xt(t), r).then(xn.bind(void 0, i)).then(Tn.bind(void 0, e)).then(Sn.bind(void 0, t.client_id));
		if (Array.isArray(s.aud) && 1 !== s.aud.length) {
			if (void 0 === s.azp) throw Dt("ID Token \"aud\" (audience) claim includes additional untrusted audiences", Jn, {
				claims: s,
				claim: "aud"
			});
			if (s.azp !== t.client_id) throw Dt("unexpected ID Token \"azp\" (authorized party) claim value", Jn, {
				expected: t.client_id,
				claims: s,
				claim: "azp"
			});
		}
		void 0 !== s.auth_time && Ht(s.auth_time, !0, "ID Token \"auth_time\" (authentication time)", Dn, { claims: s }), bn.set(n, c), vn.set(a, s);
	}
	if (void 0 !== (null == i ? void 0 : i[a.token_type])) i[a.token_type](n, a);
	else if ("dpop" !== a.token_type && "bearer" !== a.token_type) throw new Wt("unsupported `token_type` value", { cause: { body: a } });
	return a;
}
function Sn(e, t) {
	if (Array.isArray(t.claims.aud)) {
		if (!t.claims.aud.includes(e)) throw Dt("unexpected JWT \"aud\" (audience) claim value", Jn, {
			expected: e,
			claims: t.claims,
			claim: "aud"
		});
	} else if (t.claims.aud !== e) throw Dt("unexpected JWT \"aud\" (audience) claim value", Jn, {
		expected: e,
		claims: t.claims,
		claim: "aud"
	});
	return t;
}
function Tn(e, t) {
	var n, o;
	const r = null !== (n = null === (o = e[to]) || void 0 === o ? void 0 : o.call(e, t)) && void 0 !== n ? n : e.issuer;
	if (t.claims.iss !== r) throw Dt("unexpected JWT \"iss\" (issuer) claim value", Jn, {
		expected: r,
		claims: t.claims,
		claim: "iss"
	});
	return t;
}
var En = /* @__PURE__ */ new WeakSet(), Pn = Symbol(), An = {
	aud: "audience",
	c_hash: "code hash",
	client_id: "client id",
	exp: "expiration time",
	iat: "issued at",
	iss: "issuer",
	jti: "jwt id",
	nonce: "nonce",
	s_hash: "state hash",
	sub: "subject",
	ath: "access token hash",
	htm: "http method",
	htu: "http uri",
	cnf: "confirmation",
	auth_time: "authentication time"
};
function xn(e, t) {
	for (const n of e) if (void 0 === t.claims[n]) throw Dt("JWT \"".concat(n, "\" (").concat(An[n], ") claim missing"), Dn, { claims: t.claims });
	return t;
}
var Rn = Symbol(), On = Symbol();
var In = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", Cn = "OAUTH_RESPONSE_BODY_ERROR", jn = "OAUTH_UNSUPPORTED_OPERATION", Wn = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", Un = "OAUTH_PARSE_ERROR", Dn = "OAUTH_INVALID_RESPONSE", Kn = "OAUTH_RESPONSE_IS_NOT_JSON", Nn = "OAUTH_RESPONSE_IS_NOT_CONFORM", Ln = "OAUTH_HTTP_REQUEST_FORBIDDEN", zn = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", Hn = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", Jn = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", Mn = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", Zn = "OAUTH_MISSING_SERVER_METADATA", Vn = "OAUTH_INVALID_SERVER_METADATA";
function Fn(e) {
	if (e.bodyUsed) throw _t("\"response\" body has been used already", vt);
}
function Xn(e) {
	const { algorithm: t } = e;
	if ("number" != typeof t.modulusLength || t.modulusLength < 2048) throw new Wt("unsupported ".concat(t.name, " modulusLength"), { cause: e });
}
function Gn(e) {
	const { algorithm: t } = e;
	switch (t.namedCurve) {
		case "P-256": return "SHA-256";
		case "P-384": return "SHA-384";
		case "P-521": return "SHA-512";
		default: throw new Wt("unsupported ECDSA namedCurve", { cause: e });
	}
}
function Yn(e, t, n, o) {
	if (void 0 === e) if (Array.isArray(t)) {
		if (!t.includes(o.alg)) throw Dt("unexpected JWT \"alg\" header parameter", Dn, {
			header: o,
			expected: t,
			reason: "authorization server metadata"
		});
	} else {
		if (void 0 === n) throw Dt("missing client or server configuration to verify used JWT \"alg\" header parameter", void 0, {
			client: e,
			issuer: t,
			fallback: n
		});
		if ("string" == typeof n ? o.alg !== n : "function" == typeof n ? !n(o.alg) : !n.includes(o.alg)) throw Dt("unexpected JWT \"alg\" header parameter", Dn, {
			header: o,
			expected: n,
			reason: "default value"
		});
	}
	else if ("string" == typeof e ? o.alg !== e : !e.includes(o.alg)) throw Dt("unexpected JWT \"alg\" header parameter", Dn, {
		header: o,
		expected: e,
		reason: "client configuration"
	});
}
function Bn(e, t) {
	const { 0: n, length: o } = e.getAll(t);
	if (o > 1) throw Dt("\"".concat(t, "\" parameter must be provided only once"), Dn);
	return n;
}
var qn = Symbol(), Qn = Symbol();
async function $n(e) {
	let t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Mt;
	try {
		t = await e.json();
	} catch (t) {
		throw n(e), Dt("failed to parse \"response\" body as JSON", Un, t);
	}
	if (!Kt(t)) throw Dt("\"response\" body must be a top level object", Dn, { body: t });
	return t;
}
var eo = Symbol(), to = Symbol(), no = new TextEncoder(), oo = new TextDecoder();
function ro(e) {
	const t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) {
		const o = e.charCodeAt(n);
		if (o > 127) throw new TypeError("non-ASCII string encountered in encode()");
		t[n] = o;
	}
	return t;
}
function io(e) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e);
	const t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function ao(e) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e ? e : oo.decode(e), { alphabet: "base64url" });
	let t = e;
	t instanceof Uint8Array && (t = oo.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return io(t);
	} catch (e) {
		throw new TypeError("The input to be decoded is not correctly encoded.");
	}
}
var so = function(e) {
	return new TypeError("CryptoKey does not support this operation, its ".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "algorithm.name", " must be ").concat(e));
}, co = (e, t) => e.name === t;
function uo(e, t) {
	var n;
	if (n = e.hash, parseInt(n.name.slice(4), 10) !== t) throw so("SHA-".concat(t), "algorithm.hash");
}
function lo(e, t) {
	for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) o[r - 2] = arguments[r];
	if ((o = o.filter(Boolean)).length > 2) {
		const t = o.pop();
		e += "one of type ".concat(o.join(", "), ", or ").concat(t, ".");
	} else 2 === o.length ? e += "one of type ".concat(o[0], " or ").concat(o[1], ".") : e += "of type ".concat(o[0], ".");
	if (null == t) e += " Received ".concat(t);
	else if ("function" == typeof t && t.name) e += " Received function ".concat(t.name);
	else if ("object" == typeof t && null != t) {
		var i;
		null !== (i = t.constructor) && void 0 !== i && i.name && (e += " Received an instance of ".concat(t.constructor.name));
	}
	return e;
}
var ho = function(e, t) {
	for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) o[r - 2] = arguments[r];
	return lo("Key for the ".concat(e, " algorithm must be "), t, ...o);
};
var po = class extends Error {
	constructor(e, t) {
		var n;
		super(e, t), lt(this, "code", "ERR_JOSE_GENERIC"), this.name = this.constructor.name, null === (n = Error.captureStackTrace) || void 0 === n || n.call(Error, this, this.constructor);
	}
};
lt(po, "code", "ERR_JOSE_GENERIC");
var fo = class extends po {
	constructor(e, t) {
		let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "unspecified", o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "unspecified";
		super(e, { cause: {
			claim: n,
			reason: o,
			payload: t
		} }), lt(this, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED"), lt(this, "claim", void 0), lt(this, "reason", void 0), lt(this, "payload", void 0), this.claim = n, this.reason = o, this.payload = t;
	}
};
lt(fo, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED");
var mo = class extends po {
	constructor(e, t) {
		let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "unspecified", o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "unspecified";
		super(e, { cause: {
			claim: n,
			reason: o,
			payload: t
		} }), lt(this, "code", "ERR_JWT_EXPIRED"), lt(this, "claim", void 0), lt(this, "reason", void 0), lt(this, "payload", void 0), this.claim = n, this.reason = o, this.payload = t;
	}
};
lt(mo, "code", "ERR_JWT_EXPIRED");
var yo = class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
	}
};
lt(yo, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
var wo = class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JOSE_NOT_SUPPORTED");
	}
};
lt(wo, "code", "ERR_JOSE_NOT_SUPPORTED"), lt(class extends po {
	constructor() {
		super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "decryption operation failed", arguments.length > 1 ? arguments[1] : void 0), lt(this, "code", "ERR_JWE_DECRYPTION_FAILED");
	}
}, "code", "ERR_JWE_DECRYPTION_FAILED"), lt(class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JWE_INVALID");
	}
}, "code", "ERR_JWE_INVALID");
var go = class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JWS_INVALID");
	}
};
lt(go, "code", "ERR_JWS_INVALID");
var vo = class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JWT_INVALID");
	}
};
lt(vo, "code", "ERR_JWT_INVALID"), lt(class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JWK_INVALID");
	}
}, "code", "ERR_JWK_INVALID");
var bo = class extends po {
	constructor() {
		super(...arguments), lt(this, "code", "ERR_JWKS_INVALID");
	}
};
lt(bo, "code", "ERR_JWKS_INVALID");
var _o = class extends po {
	constructor() {
		super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "no applicable key found in the JSON Web Key Set", arguments.length > 1 ? arguments[1] : void 0), lt(this, "code", "ERR_JWKS_NO_MATCHING_KEY");
	}
};
lt(_o, "code", "ERR_JWKS_NO_MATCHING_KEY");
var ko = class extends po {
	constructor() {
		super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "multiple matching keys found in the JSON Web Key Set", arguments.length > 1 ? arguments[1] : void 0), lt(this, Symbol.asyncIterator, void 0), lt(this, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
	}
};
lt(ko, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
var So = class extends po {
	constructor() {
		super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "request timed out", arguments.length > 1 ? arguments[1] : void 0), lt(this, "code", "ERR_JWKS_TIMEOUT");
	}
};
lt(So, "code", "ERR_JWKS_TIMEOUT");
var To = class extends po {
	constructor() {
		super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "signature verification failed", arguments.length > 1 ? arguments[1] : void 0), lt(this, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
	}
};
lt(To, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
var Eo = (e) => {
	if ("CryptoKey" === (null == e ? void 0 : e[Symbol.toStringTag])) return !0;
	try {
		return e instanceof CryptoKey;
	} catch (e) {
		return !1;
	}
}, Po = (e) => "KeyObject" === (null == e ? void 0 : e[Symbol.toStringTag]), Ao = (e) => Eo(e) || Po(e);
function xo(e, t, n) {
	try {
		return ao(e);
	} catch (e) {
		throw new n("Failed to base64url decode the ".concat(t));
	}
}
function Ro(e) {
	if ("object" != typeof (t = e) || null === t || "[object Object]" !== Object.prototype.toString.call(e)) return !1;
	var t;
	if (null === Object.getPrototypeOf(e)) return !0;
	let n = e;
	for (; null !== Object.getPrototypeOf(n);) n = Object.getPrototypeOf(n);
	return Object.getPrototypeOf(e) === n;
}
var Oo = (e) => Ro(e) && "string" == typeof e.kty;
async function Io(e, t, n) {
	if (t instanceof Uint8Array) {
		if (!e.startsWith("HS")) throw new TypeError(function(e) {
			for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
			return lo("Key must be ", e, ...n);
		}(t, "CryptoKey", "KeyObject", "JSON Web Key"));
		return crypto.subtle.importKey("raw", t, {
			hash: "SHA-".concat(e.slice(-3)),
			name: "HMAC"
		}, !1, [n]);
	}
	return function(e, t, n) {
		switch (t) {
			case "HS256":
			case "HS384":
			case "HS512":
				if (!co(e.algorithm, "HMAC")) throw so("HMAC");
				uo(e.algorithm, parseInt(t.slice(2), 10));
				break;
			case "RS256":
			case "RS384":
			case "RS512":
				if (!co(e.algorithm, "RSASSA-PKCS1-v1_5")) throw so("RSASSA-PKCS1-v1_5");
				uo(e.algorithm, parseInt(t.slice(2), 10));
				break;
			case "PS256":
			case "PS384":
			case "PS512":
				if (!co(e.algorithm, "RSA-PSS")) throw so("RSA-PSS");
				uo(e.algorithm, parseInt(t.slice(2), 10));
				break;
			case "Ed25519":
			case "EdDSA":
				if (!co(e.algorithm, "Ed25519")) throw so("Ed25519");
				break;
			case "ML-DSA-44":
			case "ML-DSA-65":
			case "ML-DSA-87":
				if (!co(e.algorithm, t)) throw so(t);
				break;
			case "ES256":
			case "ES384":
			case "ES512": {
				if (!co(e.algorithm, "ECDSA")) throw so("ECDSA");
				const n = function(e) {
					switch (e) {
						case "ES256": return "P-256";
						case "ES384": return "P-384";
						case "ES512": return "P-521";
						default: throw new Error("unreachable");
					}
				}(t);
				if (e.algorithm.namedCurve !== n) throw so(n, "algorithm.namedCurve");
				break;
			}
			default: throw new TypeError("CryptoKey does not support this operation");
		}
		(function(e, t) {
			if (t && !e.usages.includes(t)) throw new TypeError("CryptoKey does not support this operation, its usages must include ".concat(t, "."));
		})(e, n);
	}(t, e, n), t;
}
var Co = "Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value";
async function jo(e) {
	var t, n;
	if (!e.alg) throw new TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	const { algorithm: o, keyUsages: r } = function(e) {
		let t, n;
		switch (e.kty) {
			case "AKP":
				switch (e.alg) {
					case "ML-DSA-44":
					case "ML-DSA-65":
					case "ML-DSA-87":
						t = { name: e.alg }, n = e.priv ? ["sign"] : ["verify"];
						break;
					default: throw new wo(Co);
				}
				break;
			case "RSA":
				switch (e.alg) {
					case "PS256":
					case "PS384":
					case "PS512":
						t = {
							name: "RSA-PSS",
							hash: "SHA-".concat(e.alg.slice(-3))
						}, n = e.d ? ["sign"] : ["verify"];
						break;
					case "RS256":
					case "RS384":
					case "RS512":
						t = {
							name: "RSASSA-PKCS1-v1_5",
							hash: "SHA-".concat(e.alg.slice(-3))
						}, n = e.d ? ["sign"] : ["verify"];
						break;
					case "RSA-OAEP":
					case "RSA-OAEP-256":
					case "RSA-OAEP-384":
					case "RSA-OAEP-512":
						t = {
							name: "RSA-OAEP",
							hash: "SHA-".concat(parseInt(e.alg.slice(-3), 10) || 1)
						}, n = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
						break;
					default: throw new wo(Co);
				}
				break;
			case "EC":
				switch (e.alg) {
					case "ES256":
					case "ES384":
					case "ES512":
						t = {
							name: "ECDSA",
							namedCurve: {
								ES256: "P-256",
								ES384: "P-384",
								ES512: "P-521"
							}[e.alg]
						}, n = e.d ? ["sign"] : ["verify"];
						break;
					case "ECDH-ES":
					case "ECDH-ES+A128KW":
					case "ECDH-ES+A192KW":
					case "ECDH-ES+A256KW":
						t = {
							name: "ECDH",
							namedCurve: e.crv
						}, n = e.d ? ["deriveBits"] : [];
						break;
					default: throw new wo(Co);
				}
				break;
			case "OKP":
				switch (e.alg) {
					case "Ed25519":
					case "EdDSA":
						t = { name: "Ed25519" }, n = e.d ? ["sign"] : ["verify"];
						break;
					case "ECDH-ES":
					case "ECDH-ES+A128KW":
					case "ECDH-ES+A192KW":
					case "ECDH-ES+A256KW":
						t = { name: e.crv }, n = e.d ? ["deriveBits"] : [];
						break;
					default: throw new wo(Co);
				}
				break;
			default: throw new wo("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
		}
		return {
			algorithm: t,
			keyUsages: n
		};
	}(e), i = dt({}, e);
	return "AKP" !== i.kty && delete i.alg, delete i.use, crypto.subtle.importKey("jwk", i, o, null !== (t = e.ext) && void 0 !== t ? t : !e.d && !e.priv, null !== (n = e.key_ops) && void 0 !== n ? n : r);
}
var Wo = "given KeyObject instance cannot be used for this algorithm";
var Uo;
var Do = async function(e, t, n) {
	let o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
	Uo || (Uo = /* @__PURE__ */ new WeakMap());
	let r = Uo.get(e);
	if (null != r && r[n]) return r[n];
	const i = await jo(dt(dt({}, t), {}, { alg: n }));
	return o && Object.freeze(e), r ? r[n] = i : Uo.set(e, { [n]: i }), i;
};
var Ko = (e, t) => {
	if (e.byteLength !== t.length) return !1;
	for (let n = 0; n < e.byteLength; n++) if (e[n] !== t[n]) return !1;
	return !0;
}, No = (e) => {
	const t = e.data[e.pos++];
	if (128 & t) {
		const n = 127 & t;
		let o = 0;
		for (let t = 0; t < n; t++) o = o << 8 | e.data[e.pos++];
		return o;
	}
	return t;
}, Lo = (e, t, n) => {
	if (e.data[e.pos++] !== t) throw new Error(n);
}, zo = (e, t) => {
	const n = e.data.subarray(e.pos, e.pos + t);
	return e.pos += t, n;
}, Ho = (e, t, n) => {
	var o;
	const r = ((e) => io(e.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "")))(e);
	let i = n;
	return null != t && null !== (o = t.startsWith) && void 0 !== o && o.call(t, "ECDH-ES") && (i || (i = {}), i.getNamedCurve = (e) => {
		const t = {
			data: e,
			pos: 0
		};
		return function(e) {
			Lo(e, 48, "Invalid PKCS#8 structure"), No(e), Lo(e, 2, "Expected version field");
			const t = No(e);
			e.pos += t, Lo(e, 48, "Expected algorithm identifier"), No(e), e.pos;
		}(t), ((e) => {
			const t = ((e) => {
				Lo(e, 6, "Expected algorithm OID");
				return zo(e, No(e));
			})(e);
			if (Ko(t, [
				43,
				101,
				110
			])) return "X25519";
			if (!Ko(t, [
				42,
				134,
				72,
				206,
				61,
				2,
				1
			])) throw new Error("Unsupported key algorithm");
			Lo(e, 6, "Expected curve OID");
			const o = zo(e, No(e));
			for (const { name: e, oid: t } of [
				{
					name: "P-256",
					oid: [
						42,
						134,
						72,
						206,
						61,
						3,
						1,
						7
					]
				},
				{
					name: "P-384",
					oid: [
						43,
						129,
						4,
						0,
						34
					]
				},
				{
					name: "P-521",
					oid: [
						43,
						129,
						4,
						0,
						35
					]
				}
			]) if (Ko(o, t)) return e;
			throw new Error("Unsupported named curve");
		})(t);
	}), (async (e, t, n, o) => {
		var r;
		let i, a;
		const s = "spki" === e, c = () => s ? ["verify"] : ["sign"];
		switch (n) {
			case "PS256":
			case "PS384":
			case "PS512":
				i = {
					name: "RSA-PSS",
					hash: "SHA-".concat(n.slice(-3))
				}, a = c();
				break;
			case "RS256":
			case "RS384":
			case "RS512":
				i = {
					name: "RSASSA-PKCS1-v1_5",
					hash: "SHA-".concat(n.slice(-3))
				}, a = c();
				break;
			case "RSA-OAEP":
			case "RSA-OAEP-256":
			case "RSA-OAEP-384":
			case "RSA-OAEP-512":
				i = {
					name: "RSA-OAEP",
					hash: "SHA-".concat(parseInt(n.slice(-3), 10) || 1)
				}, a = s ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
				break;
			case "ES256":
			case "ES384":
			case "ES512":
				i = {
					name: "ECDSA",
					namedCurve: {
						ES256: "P-256",
						ES384: "P-384",
						ES512: "P-521"
					}[n]
				}, a = c();
				break;
			case "ECDH-ES":
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW":
				try {
					const e = o.getNamedCurve(t);
					i = "X25519" === e ? { name: "X25519" } : {
						name: "ECDH",
						namedCurve: e
					};
				} catch (e) {
					throw new wo("Invalid or unsupported key format");
				}
				a = s ? [] : ["deriveBits"];
				break;
			case "Ed25519":
			case "EdDSA":
				i = { name: "Ed25519" }, a = c();
				break;
			case "ML-DSA-44":
			case "ML-DSA-65":
			case "ML-DSA-87":
				i = { name: n }, a = c();
				break;
			default: throw new wo("Invalid or unsupported \"alg\" (Algorithm) value");
		}
		return crypto.subtle.importKey(e, t, i, null !== (r = null == o ? void 0 : o.extractable) && void 0 !== r ? r : !!s, a);
	})("pkcs8", r, t, i);
}, Jo = (e) => null == e ? void 0 : e[Symbol.toStringTag], Mo = (e, t, n) => {
	if (void 0 !== t.use) {
		let e;
		switch (n) {
			case "sign":
			case "verify":
				e = "sig";
				break;
			case "encrypt":
			case "decrypt": e = "enc";
		}
		if (t.use !== e) throw new TypeError("Invalid key for this operation, its \"use\" must be \"".concat(e, "\" when present"));
	}
	if (void 0 !== t.alg && t.alg !== e) throw new TypeError("Invalid key for this operation, its \"alg\" must be \"".concat(e, "\" when present"));
	if (Array.isArray(t.key_ops)) {
		var o, r;
		let i;
		switch (!0) {
			case "sign" === n || "verify" === n:
			case "dir" === e:
			case e.includes("CBC-HS"):
				i = n;
				break;
			case e.startsWith("PBES2"):
				i = "deriveBits";
				break;
			case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e):
				i = !e.includes("GCM") && e.endsWith("KW") ? "encrypt" === n ? "wrapKey" : "unwrapKey" : n;
				break;
			case "encrypt" === n && e.startsWith("RSA"):
				i = "wrapKey";
				break;
			case "decrypt" === n: i = e.startsWith("RSA") ? "unwrapKey" : "deriveBits";
		}
		if (i && !1 === (null === (o = t.key_ops) || void 0 === o || null === (r = o.includes) || void 0 === r ? void 0 : r.call(o, i))) throw new TypeError("Invalid key for this operation, its \"key_ops\" must include \"".concat(i, "\" when present"));
	}
	return !0;
};
var Zo, Vo;
var Fo, Xo;
if ("undefined" == typeof navigator || null === (Zo = navigator.userAgent) || void 0 === Zo || null === (Vo = Zo.startsWith) || void 0 === Vo || !Vo.call(Zo, "Mozilla/5.0 ")) Xo = "".concat("openid-client", "/").concat("v6.8.3"), Fo = { "user-agent": Xo };
var Go = (e) => Yo.get(e);
var Yo, Bo;
function qo(e) {
	return void 0 !== e ? qt(e) : (Bo || (Bo = /* @__PURE__ */ new WeakMap()), (e, t, n, o) => {
		let r;
		return (r = Bo.get(t)) || (function(e, t) {
			if ("string" != typeof e) throw tr("".concat(t, " must be a string"), er);
			if (0 === e.length) throw tr("".concat(t, " must not be empty"), $o);
		}(t.client_secret, "\"metadata.client_secret\""), r = qt(t.client_secret), Bo.set(t, r)), r(e, t, n, o);
	});
}
var Qo = Et, $o = "ERR_INVALID_ARG_VALUE", er = "ERR_INVALID_ARG_TYPE";
function tr(e, t, n) {
	const o = new TypeError(e, { cause: n });
	return Object.assign(o, { code: t }), o;
}
var nr = class extends Error {
	constructor(e, t) {
		var n;
		super(e, t), lt(this, "code", void 0), this.name = this.constructor.name, this.code = null == t ? void 0 : t.code, null === (n = Error.captureStackTrace) || void 0 === n || n.call(Error, this, this.constructor);
	}
};
function or(e, t, n) {
	return new nr(e, {
		cause: t,
		code: n
	});
}
function rr(e) {
	if (e instanceof TypeError || e instanceof nr || e instanceof on || e instanceof rn || e instanceof an) throw e;
	if (e instanceof Ut) switch (e.code) {
		case Ln: throw or("only requests to HTTPS are allowed", e, e.code);
		case zn: throw or("only requests to HTTP or HTTPS are allowed", e, e.code);
		case Nn: throw or("unexpected HTTP response status code", e.cause, e.code);
		case Kn: throw or("unexpected response content-type", e.cause, e.code);
		case Un: throw or("parsing error occured", e, e.code);
		case Dn: throw or("invalid response encountered", e, e.code);
		case Jn: throw or("unexpected JWT claim value encountered", e, e.code);
		case Mn: throw or("unexpected JSON attribute value encountered", e, e.code);
		case Hn: throw or("JWT timestamp claim value failed validation", e, e.code);
		default: throw or(e.message, e, e.code);
	}
	if (e instanceof Wt) throw or("unsupported operation", e, e.code);
	if (e instanceof DOMException) switch (e.name) {
		case "OperationError": throw or("runtime operation error", e, jn);
		case "NotSupportedError": throw or("runtime unsupported operation", e, jn);
		case "TimeoutError": throw or("operation timed out", e, "OAUTH_TIMEOUT");
		case "AbortError": throw or("operation aborted", e, "OAUTH_ABORT");
	}
	throw new nr("something went wrong", { cause: e });
}
async function ir(e, t, n, o, r) {
	const a = new sr(await async function(e, t) {
		var n, o;
		if (!(e instanceof URL)) throw tr("\"server\" must be an instance of URL", er);
		const r = !e.href.includes("/.well-known/"), i = null !== (n = null == t ? void 0 : t.timeout) && void 0 !== n ? n : 30, a = AbortSignal.timeout(1e3 * i), s = await (r ? async function(e, t) {
			return async function(e, t, n, o) {
				if (!(e instanceof URL)) throw _t("\"".concat("issuerIdentifier", "\" must be an instance of URL"), bt);
				en(e, !0 !== (null == o ? void 0 : o[kt]));
				const r = n(new URL(e.href)), i = Nt(null == o ? void 0 : o.headers);
				return i.set("accept", "application/json"), ((null == o ? void 0 : o[Et]) || fetch)(r.href, {
					body: void 0,
					headers: Object.fromEntries(i.entries()),
					method: "GET",
					redirect: "manual",
					signal: Lt(r, null == o ? void 0 : o.signal)
				});
			}(e, 0, (e) => {
				switch (null == t ? void 0 : t.algorithm) {
					case void 0:
					case "oidc":
						(function(e) {
							e.pathname = zt("".concat(e.pathname, "/").concat(".well-known/openid-configuration"));
						})(e);
						break;
					case "oauth2":
						(function(e, t) {
							let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
							"/" === e.pathname ? e.pathname = t : e.pathname = zt("".concat(t, "/").concat(n ? e.pathname : e.pathname.replace(/(\/)$/, "")));
						})(e, ".well-known/oauth-authorization-server");
						break;
					default: throw _t("\"options.algorithm\" must be \"oidc\" (default), or \"oauth2\"", vt);
				}
				return e;
			}, t);
		}(e, {
			algorithm: null == t ? void 0 : t.algorithm,
			[Et]: null == t ? void 0 : t[Qo],
			[kt]: null == t || null === (o = t.execute) || void 0 === o ? void 0 : o.includes(pr),
			signal: a,
			headers: new Headers(Fo)
		}) : ((null == t ? void 0 : t[Qo]) || fetch)((en(e, null == t || null === (c = t.execute) || void 0 === c || !c.includes(pr)), e.href), {
			headers: Object.fromEntries(new Headers(dt({ accept: "application/json" }, Fo)).entries()),
			body: void 0,
			method: "GET",
			redirect: "manual",
			signal: a
		})).then((e) => async function(e, t) {
			const n = eo;
			if (!(n instanceof URL) && n !== eo) throw _t("\"expectedIssuerIdentifier\" must be an instance of URL", bt);
			if (!gt(t, Response)) throw _t("\"response\" must be an instance of Response", bt);
			if (200 !== t.status) throw Dt("\"response\" is not a conform Authorization Server Metadata response (unexpected HTTP status code)", Nn, t);
			Fn(t);
			const o = await $n(t);
			if (Jt(o.issuer, "\"response\" body \"issuer\" property", Dn, { body: o }), n !== eo && new URL(o.issuer).href !== n.href) throw Dt("\"response\" body \"issuer\" property does not match the expected value", Mn, {
				expected: n.href,
				body: o,
				attribute: "issuer"
			});
			return o;
		}(0, e)).catch(rr);
		var c;
		return r && new URL(s.issuer).href !== e.href && (function(e, t, n) {
			return !("https://login.microsoftonline.com" !== e.origin || null != n && n.algorithm && "oidc" !== n.algorithm || (t[ar] = !0, 0));
		}(e, s, t) || function(e, t) {
			return !(!e.hostname.endsWith(".b2clogin.com") || null != t && t.algorithm && "oidc" !== t.algorithm);
		}(e, t) || (() => {
			throw new nr("discovered metadata issuer does not match the expected issuer", {
				code: Mn,
				cause: {
					expected: e.href,
					body: s,
					attribute: "issuer"
				}
			});
		})()), s;
	}(e, r), t, n, o);
	let s = Go(a);
	if (null != r && r[Qo] && (s.fetch = r[Qo]), null != r && r.timeout && (s.timeout = r.timeout), null != r && r.execute) for (const e of r.execute) e(a);
	return a;
}
new TextDecoder();
var ar = Symbol();
var sr = class {
	constructor(e, t, n, o) {
		var r, i, a, s, c;
		if ("string" != typeof t || !t.length) throw tr("\"clientId\" must be a non-empty string", er);
		if ("string" == typeof n && (n = { client_secret: n }), void 0 !== (null === (r = n) || void 0 === r ? void 0 : r.client_id) && t !== n.client_id) throw tr("\"clientId\" and \"metadata.client_id\" must be the same", $o);
		const u = dt(dt({}, structuredClone(n)), {}, { client_id: t });
		let l;
		u[St] = null !== (i = null === (a = n) || void 0 === a ? void 0 : a[St]) && void 0 !== i ? i : 0, u[Tt] = null !== (s = null === (c = n) || void 0 === c ? void 0 : c[Tt]) && void 0 !== s ? s : 30, l = o || ("string" == typeof u.client_secret && u.client_secret.length ? qo(u.client_secret) : (e, t, n, o) => {
			n.set("client_id", t.client_id);
		});
		let h = Object.freeze(u);
		const d = structuredClone(e);
		ar in e && (d[to] = (t) => {
			let { claims: { tid: n } } = t;
			return e.issuer.replace("{tenantid}", n);
		});
		let p = Object.freeze(d);
		Yo || (Yo = /* @__PURE__ */ new WeakMap()), Yo.set(this, {
			__proto__: null,
			as: p,
			c: h,
			auth: l,
			tlsOnly: !0,
			jwksCache: {}
		});
	}
	serverMetadata() {
		const e = structuredClone(Go(this).as);
		return function(e) {
			Object.defineProperties(e, function(e) {
				return { supportsPKCE: {
					__proto__: null,
					value() {
						var t;
						let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "S256";
						return !0 === (null === (t = e.code_challenge_methods_supported) || void 0 === t ? void 0 : t.includes(n));
					}
				} };
			}(e));
		}(e), e;
	}
	clientMetadata() {
		return structuredClone(Go(this).c);
	}
	get timeout() {
		return Go(this).timeout;
	}
	set timeout(e) {
		Go(this).timeout = e;
	}
	get [Qo]() {
		return Go(this).fetch;
	}
	set [Qo](e) {
		Go(this).fetch = e;
	}
};
function cr(e) {
	Object.defineProperties(e, function(e) {
		let t;
		if (void 0 !== e.expires_in) {
			const n = /* @__PURE__ */ new Date();
			n.setSeconds(n.getSeconds() + e.expires_in), t = n.getTime();
		}
		return {
			expiresIn: {
				__proto__: null,
				value() {
					if (t) {
						const e = Date.now();
						return t > e ? Math.floor((t - e) / 1e3) : 0;
					}
				}
			},
			claims: {
				__proto__: null,
				value() {
					try {
						return _n(this);
					} catch (e) {
						return;
					}
				}
			}
		};
	}(e));
}
async function ur(e, t, n) {
	var o;
	let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
	const i = null === (o = e.headers.get("retry-after")) || void 0 === o ? void 0 : o.trim();
	if (void 0 === i) return;
	let a;
	if (/^\d+$/.test(i)) a = parseInt(i, 10);
	else {
		const e = new Date(i);
		if (Number.isFinite(e.getTime())) {
			const t = /* @__PURE__ */ new Date(), n = e.getTime() - t.getTime();
			n > 0 && (a = Math.ceil(n / 1e3));
		}
	}
	if (r && !Number.isFinite(a)) throw new Ut("invalid Retry-After header value", { cause: e });
	a > t && await lr(a - t, n);
}
function lr(e, t) {
	return new Promise((n, o) => {
		const r = (e) => {
			try {
				t.throwIfAborted();
			} catch (e) {
				o(e);
				return;
			}
			if (e <= 0) return void n();
			const i = Math.min(e, 5);
			setTimeout(() => r(e - i), 1e3 * i);
		};
		r(e);
	});
}
async function hr(e, t) {
	vr(e);
	const { as: n, c: o, auth: r, fetch: i, tlsOnly: a, timeout: s } = Go(e);
	return async function(e, t, n, o, r) {
		Yt(e), Bt(t);
		const i = nn(e, "backchannel_authentication_endpoint", t.use_mtls_endpoint_aliases, !0 !== (null == r ? void 0 : r[kt])), a = new URLSearchParams(o);
		a.set("client_id", t.client_id);
		const s = Nt(null == r ? void 0 : r.headers);
		return s.set("accept", "application/json"), wn(e, t, n, i, a, s, r);
	}(n, o, r, t, {
		[Et]: i,
		[kt]: !a,
		headers: new Headers(Fo),
		signal: br(s)
	}).then((e) => async function(e, t, n) {
		if (Yt(e), Bt(t), !gt(n, Response)) throw _t("\"response\" must be an instance of Response", bt);
		await fn(n, 200, "Backchannel Authentication Endpoint"), Fn(n);
		const o = await $n(n);
		Jt(o.auth_req_id, "\"response\" body \"auth_req_id\" property", Dn, { body: o });
		let r = "number" != typeof o.expires_in ? parseFloat(o.expires_in) : o.expires_in;
		return Ht(r, !0, "\"response\" body \"expires_in\" property", Dn, { body: o }), o.expires_in = r, void 0 !== o.interval && Ht(o.interval, !1, "\"response\" body \"interval\" property", Dn, { body: o }), o;
	}(n, o, e)).catch(rr);
}
async function dr(e, t, n, o) {
	var r, i;
	vr(e), n = new URLSearchParams(n);
	let a = null !== (r = t.interval) && void 0 !== r ? r : 5;
	const s = null !== (i = null == o ? void 0 : o.signal) && void 0 !== i ? i : AbortSignal.timeout(1e3 * t.expires_in);
	try {
		await lr(a, s);
	} catch (e) {
		rr(e);
	}
	const { as: c, c: u, auth: l, fetch: h, tlsOnly: d, nonRepudiation: p, timeout: f, decrypt: m } = Go(e), y = (r, i) => dr(e, dt(dt({}, t), {}, { interval: r }), n, dt(dt({}, o), {}, {
		signal: s,
		flag: i
	})), w = await async function(e, t, n, o, r) {
		Yt(e), Bt(t), Jt(o, "\"authReqId\"");
		const i = new URLSearchParams(null == r ? void 0 : r.additionalParameters);
		return i.set("auth_req_id", o), gn(e, t, n, "urn:openid:params:grant-type:ciba", i, r);
	}(c, u, l, t.auth_req_id, {
		[Et]: h,
		[kt]: !d,
		additionalParameters: n,
		DPoP: null == o ? void 0 : o.DPoP,
		headers: new Headers(Fo),
		signal: s.aborted ? s : br(f)
	}).catch(rr);
	var g;
	if (503 === w.status && w.headers.has("retry-after")) return await ur(w, a, s, !0), await (null === (g = w.body) || void 0 === g ? void 0 : g.cancel()), y(a);
	const v = async function(e, t, n, o) {
		return kn(e, t, n, void 0, null == o ? void 0 : o[At], null == o ? void 0 : o.recognizedTokenTypes);
	}(c, u, w, { [At]: m });
	let b;
	try {
		b = await v;
	} catch (e) {
		if (_r(e, o)) return y(a, kr);
		if (e instanceof on) switch (e.error) {
			case "slow_down": a += 5;
			case "authorization_pending": return await ur(e.response, a, s), y(a);
		}
		rr(e);
	}
	return b.id_token && await (null == p ? void 0 : p(w)), cr(b), b;
}
function pr(e) {
	Go(e).tlsOnly = !1;
}
async function fr(e, t, n, o, r) {
	if (vr(e), !((null == r ? void 0 : r.flag) === kr || t instanceof URL || function(e) {
		try {
			return "Request" === Object.getPrototypeOf(e)[Symbol.toStringTag];
		} catch (e) {
			return !1;
		}
	}(t))) throw tr("\"currentUrl\" must be an instance of URL, or Request", er);
	let i, a;
	const { as: s, c, auth: u, fetch: l, tlsOnly: h, jarm: d, hybrid: p, nonRepudiation: f, timeout: m, decrypt: y, implicit: w } = Go(e);
	if ((null == r ? void 0 : r.flag) === kr) i = r.authResponse, a = r.redirectUri;
	else {
		if (!(t instanceof URL)) {
			const e = t;
			switch (t = new URL(t.url), e.method) {
				case "GET": break;
				case "POST":
					const n = new URLSearchParams(await async function(e) {
						if ("POST" !== e.method) throw _t("form_post responses are expected to use the POST method", vt, { cause: e });
						if ("application/x-www-form-urlencoded" !== yn(e)) throw _t("form_post responses are expected to use the application/x-www-form-urlencoded content-type", vt, { cause: e });
						return async function(e) {
							if (e.bodyUsed) throw _t("form_post Request instances must contain a readable body", vt, { cause: e });
							return e.text();
						}(e);
					}(e));
					if (p) t.hash = n.toString();
					else for (const [e, o] of n.entries()) t.searchParams.append(e, o);
					break;
				default: throw tr("unexpected Request HTTP method", $o);
			}
		}
		switch (a = function(e) {
			return (e = new URL(e)).search = "", e.hash = "", e.href;
		}(t), !0) {
			case !!d:
				i = await d(t, null == n ? void 0 : n.expectedState);
				break;
			case !!p:
				i = await p(t, null == n ? void 0 : n.expectedNonce, null == n ? void 0 : n.expectedState, null == n ? void 0 : n.maxAge);
				break;
			case !!w: throw new TypeError("authorizationCodeGrant() cannot be used by response_type=id_token clients");
			default: try {
				i = function(e, t, n, o) {
					if (Yt(e), Bt(t), n instanceof URL && (n = n.searchParams), !(n instanceof URLSearchParams)) throw _t("\"parameters\" must be an instance of URLSearchParams, or URL", bt);
					if (Bn(n, "response")) throw Dt("\"parameters\" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()", Dn, { parameters: n });
					const r = Bn(n, "iss"), i = Bn(n, "state");
					if (!r && e.authorization_response_iss_parameter_supported) throw Dt("response parameter \"iss\" (issuer) missing", Dn, { parameters: n });
					if (r && r !== e.issuer) throw Dt("unexpected \"iss\" (issuer) response parameter value", Dn, {
						expected: e.issuer,
						parameters: n
					});
					switch (o) {
						case void 0:
						case Qn:
							if (void 0 !== i) throw Dt("unexpected \"state\" response parameter encountered", Dn, {
								expected: void 0,
								parameters: n
							});
							break;
						case qn: break;
						default: if (Jt(o, "\"expectedState\" argument"), i !== o) throw Dt(void 0 === i ? "response parameter \"state\" missing" : "unexpected \"state\" response parameter value", Dn, {
							expected: o,
							parameters: n
						});
					}
					if (Bn(n, "error")) throw new rn("authorization response from the server is an error", { cause: n });
					const a = Bn(n, "id_token"), s = Bn(n, "token");
					if (void 0 !== a || void 0 !== s) throw new Wt("implicit and hybrid flows are not supported");
					return c = new URLSearchParams(n), En.add(c), c;
					var c;
				}(s, c, t.searchParams, null == n ? void 0 : n.expectedState);
			} catch (e) {
				rr(e);
			}
		}
	}
	const g = await async function(e, t, n, o, r, i, a) {
		if (Yt(e), Bt(t), !En.has(o)) throw _t("\"callbackParameters\" must be an instance of URLSearchParams obtained from \"validateAuthResponse()\", or \"validateJwtAuthResponse()", vt);
		Jt(r, "\"redirectUri\"");
		const s = Bn(o, "code");
		if (!s) throw Dt("no authorization code in \"callbackParameters\"", Dn);
		const c = new URLSearchParams(null == a ? void 0 : a.additionalParameters);
		return c.set("redirect_uri", r), c.set("code", s), i !== Pn && (Jt(i, "\"codeVerifier\""), c.set("code_verifier", i)), gn(e, t, n, "authorization_code", c, a);
	}(s, c, u, i, a, (null == n ? void 0 : n.pkceCodeVerifier) || Pn, {
		additionalParameters: o,
		[Et]: l,
		[kt]: !h,
		DPoP: null == r ? void 0 : r.DPoP,
		headers: new Headers(Fo),
		signal: br(m)
	}).catch(rr);
	"string" != typeof (null == n ? void 0 : n.expectedNonce) && "number" != typeof (null == n ? void 0 : n.maxAge) || (n.idTokenExpected = !0);
	const v = async function(e, t, n, o) {
		return "string" == typeof (null == o ? void 0 : o.expectedNonce) || "number" == typeof (null == o ? void 0 : o.maxAge) || null != o && o.requireIdToken ? async function(e, t, n, o, r, i, a) {
			const s = [];
			switch (o) {
				case void 0:
					o = Rn;
					break;
				case Rn: break;
				default: Jt(o, "\"expectedNonce\" argument"), s.push("nonce");
			}
			switch (r ??= t.default_max_age, r) {
				case void 0:
					r = On;
					break;
				case On: break;
				default: Ht(r, !0, "\"maxAge\" argument"), s.push("auth_time");
			}
			const c = await kn(e, t, n, s, i, a);
			Jt(c.id_token, "\"response\" body \"id_token\" property", Dn, { body: c });
			const u = _n(c);
			if (r !== On) {
				const e = Gt() + Ft(t), n = Xt(t);
				if (u.auth_time + r < e - n) throw Dt("too much time has elapsed since the last End-User authentication", Hn, {
					claims: u,
					now: e,
					tolerance: n,
					claim: "auth_time"
				});
			}
			if (o === Rn) {
				if (void 0 !== u.nonce) throw Dt("unexpected ID Token \"nonce\" claim value", Jn, {
					expected: void 0,
					claims: u,
					claim: "nonce"
				});
			} else if (u.nonce !== o) throw Dt("unexpected ID Token \"nonce\" claim value", Jn, {
				expected: o,
				claims: u,
				claim: "nonce"
			});
			return c;
		}(e, t, n, o.expectedNonce, o.maxAge, o[At], o.recognizedTokenTypes) : async function(e, t, n, o, r) {
			const i = await kn(e, t, n, void 0, o, r), a = _n(i);
			if (a) {
				if (void 0 !== t.default_max_age) {
					Ht(t.default_max_age, !0, "\"client.default_max_age\"");
					const e = Gt() + Ft(t), n = Xt(t);
					if (a.auth_time + t.default_max_age < e - n) throw Dt("too much time has elapsed since the last End-User authentication", Hn, {
						claims: a,
						now: e,
						tolerance: n,
						claim: "auth_time"
					});
				}
				if (void 0 !== a.nonce) throw Dt("unexpected ID Token \"nonce\" claim value", Jn, {
					expected: void 0,
					claims: a,
					claim: "nonce"
				});
			}
			return i;
		}(e, t, n, null == o ? void 0 : o[At], null == o ? void 0 : o.recognizedTokenTypes);
	}(s, c, g, {
		expectedNonce: null == n ? void 0 : n.expectedNonce,
		maxAge: null == n ? void 0 : n.maxAge,
		requireIdToken: null == n ? void 0 : n.idTokenExpected,
		[At]: y
	});
	let b;
	try {
		b = await v;
	} catch (t) {
		if (_r(t, r)) return fr(e, void 0, n, o, dt(dt({}, r), {}, {
			flag: kr,
			authResponse: i,
			redirectUri: a
		}));
		rr(t);
	}
	return b.id_token && await (null == f ? void 0 : f(g)), cr(b), b;
}
async function mr(e, t, n, o) {
	vr(e), n = new URLSearchParams(n);
	const { as: r, c: i, auth: a, fetch: s, tlsOnly: c, nonRepudiation: u, timeout: l, decrypt: h } = Go(e), d = await async function(e, t, n, o, r) {
		Yt(e), Bt(t), Jt(o, "\"refreshToken\"");
		const i = new URLSearchParams(null == r ? void 0 : r.additionalParameters);
		return i.set("refresh_token", o), gn(e, t, n, "refresh_token", i, r);
	}(r, i, a, t, {
		[Et]: s,
		[kt]: !c,
		additionalParameters: n,
		DPoP: null == o ? void 0 : o.DPoP,
		headers: new Headers(Fo),
		signal: br(l)
	}).catch(rr), p = async function(e, t, n, o) {
		return kn(e, t, n, void 0, null == o ? void 0 : o[At], null == o ? void 0 : o.recognizedTokenTypes);
	}(r, i, d, { [At]: h });
	let f;
	try {
		f = await p;
	} catch (r) {
		if (_r(r, o)) return mr(e, t, n, dt(dt({}, o), {}, { flag: kr }));
		rr(r);
	}
	return f.id_token && await (null == u ? void 0 : u(d)), cr(f), f;
}
async function yr(e, t, n) {
	vr(e), t = new URLSearchParams(t);
	const { as: o, c: r, auth: i, fetch: a, tlsOnly: s, timeout: c } = Go(e), l = async function(e, t, n) {
		return kn(e, t, n, void 0, void 0, void 0);
	}(o, r, await async function(e, t, n, o, r) {
		return Yt(e), Bt(t), gn(e, t, n, "client_credentials", new URLSearchParams(o), r);
	}(o, r, i, t, {
		[Et]: a,
		[kt]: !s,
		DPoP: null == n ? void 0 : n.DPoP,
		headers: new Headers(Fo),
		signal: br(c)
	}).catch(rr));
	let h;
	try {
		h = await l;
	} catch (o) {
		if (_r(o, n)) return yr(e, t, dt(dt({}, n), {}, { flag: kr }));
		rr(o);
	}
	return cr(h), h;
}
function wr(e, t) {
	vr(e);
	const { as: n, c: o, tlsOnly: r, hybrid: i, jarm: a, implicit: s } = Go(e), c = nn(n, "authorization_endpoint", !1, r);
	if ((t = new URLSearchParams(t)).has("client_id") || t.set("client_id", o.client_id), !t.has("request_uri") && !t.has("request")) {
		if (t.has("response_type") || t.set("response_type", i ? "code id_token" : s ? "id_token" : "code"), s && !t.has("nonce")) throw tr("response_type=id_token clients must provide a nonce parameter in their authorization request parameters", $o);
		a && t.set("response_mode", "jwt");
	}
	for (const [e, n] of t.entries()) c.searchParams.append(e, n);
	return c;
}
async function gr(e, t, n) {
	vr(e);
	const o = wr(e, t), { as: r, c: i, auth: a, fetch: s, tlsOnly: c, timeout: u } = Go(e), h = async function(e, t, n) {
		if (Yt(e), Bt(t), !gt(n, Response)) throw _t("\"response\" must be an instance of Response", bt);
		await fn(n, 201, "Pushed Authorization Request Endpoint"), Fn(n);
		const o = await $n(n);
		Jt(o.request_uri, "\"response\" body \"request_uri\" property", Dn, { body: o });
		let r = "number" != typeof o.expires_in ? parseFloat(o.expires_in) : o.expires_in;
		return Ht(r, !0, "\"response\" body \"expires_in\" property", Dn, { body: o }), o.expires_in = r, o;
	}(r, i, await async function(e, t, n, o, r) {
		var i;
		Yt(e), Bt(t);
		const a = nn(e, "pushed_authorization_request_endpoint", t.use_mtls_endpoint_aliases, !0 !== (null == r ? void 0 : r[kt])), s = new URLSearchParams(o);
		s.set("client_id", t.client_id);
		const c = Nt(null == r ? void 0 : r.headers);
		c.set("accept", "application/json"), void 0 !== (null == r ? void 0 : r.DPoP) && (mn(r.DPoP), await r.DPoP.addProof(a, c, "POST"));
		const u = await wn(e, t, n, a, s, c, r);
		return null == r || null === (i = r.DPoP) || void 0 === i || i.cacheNonce(u, a), u;
	}(r, i, a, o.searchParams, {
		[Et]: s,
		[kt]: !c,
		DPoP: null == n ? void 0 : n.DPoP,
		headers: new Headers(Fo),
		signal: br(u)
	}).catch(rr));
	let d;
	try {
		d = await h;
	} catch (o) {
		if (_r(o, n)) return gr(e, t, dt(dt({}, n), {}, { flag: kr }));
		rr(o);
	}
	return wr(e, { request_uri: d.request_uri });
}
function vr(e) {
	if (!(e instanceof sr)) throw tr("\"config\" must be an instance of Configuration", er);
	if (Object.getPrototypeOf(e) !== sr.prototype) throw tr("subclassing Configuration is not allowed", $o);
}
function br(e) {
	return e ? AbortSignal.timeout(1e3 * e) : void 0;
}
function _r(e, t) {
	return !(null == t || !t.DPoP || t.flag === kr) && function(e) {
		if (e instanceof an) {
			const { 0: t, length: n } = e.cause;
			return 1 === n && "dpop" === t.scheme && "use_dpop_nonce" === t.parameters.error;
		}
		return e instanceof on && "use_dpop_nonce" === e.error;
	}(e);
}
Object.freeze(sr.prototype);
var kr = Symbol();
async function Sr(e, t, n, o) {
	vr(e);
	const { as: r, c: i, auth: a, fetch: s, tlsOnly: c, timeout: u, decrypt: l } = Go(e), h = await async function(e, t, n, o, r, i) {
		return Yt(e), Bt(t), Jt(o, "\"grantType\""), gn(e, t, n, o, new URLSearchParams(r), i);
	}(r, i, a, t, new URLSearchParams(n), {
		[Et]: s,
		[kt]: !c,
		DPoP: null == o ? void 0 : o.DPoP,
		headers: new Headers(Fo),
		signal: br(u)
	}).then((e) => {
		let n;
		return "urn:ietf:params:oauth:grant-type:token-exchange" === t && (n = { n_a: () => {} }), async function(e, t, n, o) {
			return kn(e, t, n, void 0, null == o ? void 0 : o[At], null == o ? void 0 : o.recognizedTokenTypes);
		}(r, i, e, {
			[At]: l,
			recognizedTokenTypes: n
		});
	}).catch(rr);
	return cr(h), h;
}
async function Tr(e, t, n) {
	if (!Ro(e)) throw new go("Flattened JWS must be an object");
	if (void 0 === e.protected && void 0 === e.header) throw new go("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (void 0 !== e.protected && "string" != typeof e.protected) throw new go("JWS Protected Header incorrect type");
	if (void 0 === e.payload) throw new go("JWS Payload missing");
	if ("string" != typeof e.signature) throw new go("JWS Signature missing or incorrect type");
	if (void 0 !== e.header && !Ro(e.header)) throw new go("JWS Unprotected Header incorrect type");
	let o = {};
	if (e.protected) try {
		const t = ao(e.protected);
		o = JSON.parse(oo.decode(t));
	} catch (e) {
		throw new go("JWS Protected Header is invalid");
	}
	if (!function() {
		for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
		const o = t.filter(Boolean);
		if (0 === o.length || 1 === o.length) return !0;
		let r;
		for (const e of o) {
			const t = Object.keys(e);
			if (r && 0 !== r.size) for (const e of t) {
				if (r.has(e)) return !1;
				r.add(e);
			}
			else r = new Set(t);
		}
		return !0;
	}(o, e.header)) throw new go("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	const r = dt(dt({}, o), e.header), i = function(e, t, n, o, r) {
		if (void 0 !== r.crit && void 0 === (null == o ? void 0 : o.crit)) throw new e("\"crit\" (Critical) Header Parameter MUST be integrity protected");
		if (!o || void 0 === o.crit) return /* @__PURE__ */ new Set();
		if (!Array.isArray(o.crit) || 0 === o.crit.length || o.crit.some((e) => "string" != typeof e || 0 === e.length)) throw new e("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
		let i;
		i = void 0 !== n ? new Map([...Object.entries(n), ...t.entries()]) : t;
		for (const t of o.crit) {
			if (!i.has(t)) throw new wo("Extension Header Parameter \"".concat(t, "\" is not recognized"));
			if (void 0 === r[t]) throw new e("Extension Header Parameter \"".concat(t, "\" is missing"));
			if (i.get(t) && void 0 === o[t]) throw new e("Extension Header Parameter \"".concat(t, "\" MUST be integrity protected"));
		}
		return new Set(o.crit);
	}(go, new Map([["b64", !0]]), null == n ? void 0 : n.crit, o, r);
	let a = !0;
	if (i.has("b64") && (a = o.b64, "boolean" != typeof a)) throw new go("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	const { alg: s } = r;
	if ("string" != typeof s || !s) throw new go("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	const c = n && function(e, t) {
		if (void 0 !== t && (!Array.isArray(t) || t.some((e) => "string" != typeof e))) throw new TypeError("\"".concat("algorithms", "\" option must be an array of strings"));
		if (t) return new Set(t);
	}(0, n.algorithms);
	if (c && !c.has(s)) throw new yo("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (a) {
		if ("string" != typeof e.payload) throw new go("JWS Payload must be a string");
	} else if ("string" != typeof e.payload && !(e.payload instanceof Uint8Array)) throw new go("JWS Payload must be a string or an Uint8Array instance");
	let u = !1;
	"function" == typeof t && (t = await t(o, e), u = !0), function(e, t, n) {
		switch (e.substring(0, 2)) {
			case "A1":
			case "A2":
			case "di":
			case "HS":
			case "PB":
				((e, t, n) => {
					if (!(t instanceof Uint8Array)) {
						if (Oo(t)) {
							if (((e) => "oct" === e.kty && "string" == typeof e.k)(t) && Mo(e, t, n)) return;
							throw new TypeError("JSON Web Key for symmetric algorithms must have JWK \"kty\" (Key Type) equal to \"oct\" and the JWK \"k\" (Key Value) present");
						}
						if (!Ao(t)) throw new TypeError(ho(e, t, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
						if ("secret" !== t.type) throw new TypeError("".concat(Jo(t), " instances for symmetric algorithms must be of type \"secret\""));
					}
				})(e, t, n);
				break;
			default: ((e, t, n) => {
				if (Oo(t)) switch (n) {
					case "decrypt":
					case "sign":
						if (((e) => "oct" !== e.kty && ("AKP" === e.kty && "string" == typeof e.priv || "string" == typeof e.d))(t) && Mo(e, t, n)) return;
						throw new TypeError("JSON Web Key for this operation must be a private JWK");
					case "encrypt":
					case "verify":
						if (((e) => "oct" !== e.kty && void 0 === e.d && void 0 === e.priv)(t) && Mo(e, t, n)) return;
						throw new TypeError("JSON Web Key for this operation must be a public JWK");
				}
				if (!Ao(t)) throw new TypeError(ho(e, t, "CryptoKey", "KeyObject", "JSON Web Key"));
				if ("secret" === t.type) throw new TypeError("".concat(Jo(t), " instances for asymmetric algorithms must not be of type \"secret\""));
				if ("public" === t.type) switch (n) {
					case "sign": throw new TypeError("".concat(Jo(t), " instances for asymmetric algorithm signing must be of type \"private\""));
					case "decrypt": throw new TypeError("".concat(Jo(t), " instances for asymmetric algorithm decryption must be of type \"private\""));
				}
				if ("private" === t.type) switch (n) {
					case "verify": throw new TypeError("".concat(Jo(t), " instances for asymmetric algorithm verifying must be of type \"public\""));
					case "encrypt": throw new TypeError("".concat(Jo(t), " instances for asymmetric algorithm encryption must be of type \"public\""));
				}
			})(e, t, n);
		}
	}(s, t, "verify");
	const l = function() {
		for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
		const o = t.reduce((e, t) => {
			let { length: n } = t;
			return e + n;
		}, 0), r = new Uint8Array(o);
		let i = 0;
		for (const e of t) r.set(e, i), i += e.length;
		return r;
	}(void 0 !== e.protected ? ro(e.protected) : new Uint8Array(), ro("."), "string" == typeof e.payload ? a ? ro(e.payload) : no.encode(e.payload) : e.payload), h = xo(e.signature, "signature", go), d = await async function(e, t) {
		if (e instanceof Uint8Array) return e;
		if (Eo(e)) return e;
		if (Po(e)) {
			if ("secret" === e.type) return e.export();
			if ("toCryptoKey" in e && "function" == typeof e.toCryptoKey) try {
				return ((e, t) => {
					Uo || (Uo = /* @__PURE__ */ new WeakMap());
					let n = Uo.get(e);
					if (null != n && n[t]) return n[t];
					const o = "public" === e.type, r = !!o;
					let i;
					if ("x25519" === e.asymmetricKeyType) {
						switch (t) {
							case "ECDH-ES":
							case "ECDH-ES+A128KW":
							case "ECDH-ES+A192KW":
							case "ECDH-ES+A256KW": break;
							default: throw new TypeError(Wo);
						}
						i = e.toCryptoKey(e.asymmetricKeyType, r, o ? [] : ["deriveBits"]);
					}
					if ("ed25519" === e.asymmetricKeyType) {
						if ("EdDSA" !== t && "Ed25519" !== t) throw new TypeError(Wo);
						i = e.toCryptoKey(e.asymmetricKeyType, r, [o ? "verify" : "sign"]);
					}
					switch (e.asymmetricKeyType) {
						case "ml-dsa-44":
						case "ml-dsa-65":
						case "ml-dsa-87":
							if (t !== e.asymmetricKeyType.toUpperCase()) throw new TypeError(Wo);
							i = e.toCryptoKey(e.asymmetricKeyType, r, [o ? "verify" : "sign"]);
					}
					if ("rsa" === e.asymmetricKeyType) {
						let n;
						switch (t) {
							case "RSA-OAEP":
								n = "SHA-1";
								break;
							case "RS256":
							case "PS256":
							case "RSA-OAEP-256":
								n = "SHA-256";
								break;
							case "RS384":
							case "PS384":
							case "RSA-OAEP-384":
								n = "SHA-384";
								break;
							case "RS512":
							case "PS512":
							case "RSA-OAEP-512":
								n = "SHA-512";
								break;
							default: throw new TypeError(Wo);
						}
						if (t.startsWith("RSA-OAEP")) return e.toCryptoKey({
							name: "RSA-OAEP",
							hash: n
						}, r, o ? ["encrypt"] : ["decrypt"]);
						i = e.toCryptoKey({
							name: t.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
							hash: n
						}, r, [o ? "verify" : "sign"]);
					}
					if ("ec" === e.asymmetricKeyType) {
						var a;
						const n = new Map([
							["prime256v1", "P-256"],
							["secp384r1", "P-384"],
							["secp521r1", "P-521"]
						]).get(null === (a = e.asymmetricKeyDetails) || void 0 === a ? void 0 : a.namedCurve);
						if (!n) throw new TypeError(Wo);
						const s = {
							ES256: "P-256",
							ES384: "P-384",
							ES512: "P-521"
						};
						s[t] && n === s[t] && (i = e.toCryptoKey({
							name: "ECDSA",
							namedCurve: n
						}, r, [o ? "verify" : "sign"])), t.startsWith("ECDH-ES") && (i = e.toCryptoKey({
							name: "ECDH",
							namedCurve: n
						}, r, o ? [] : ["deriveBits"]));
					}
					if (!i) throw new TypeError(Wo);
					return n ? n[t] = i : Uo.set(e, { [t]: i }), i;
				})(e, t);
			} catch (e) {
				if (e instanceof TypeError) throw e;
			}
			return Do(e, e.export({ format: "jwk" }), t);
		}
		if (Oo(e)) return e.k ? ao(e.k) : Do(e, e, t, !0);
		throw new Error("unreachable");
	}(t, s);
	if (!await async function(e, t, n, o) {
		const r = await Io(e, t, "verify");
		(function(e, t) {
			if (e.startsWith("RS") || e.startsWith("PS")) {
				const { modulusLength: n } = t.algorithm;
				if ("number" != typeof n || n < 2048) throw new TypeError("".concat(e, " requires key modulusLength to be 2048 bits or larger"));
			}
		})(e, r);
		const i = function(e, t) {
			const n = "SHA-".concat(e.slice(-3));
			switch (e) {
				case "HS256":
				case "HS384":
				case "HS512": return {
					hash: n,
					name: "HMAC"
				};
				case "PS256":
				case "PS384":
				case "PS512": return {
					hash: n,
					name: "RSA-PSS",
					saltLength: parseInt(e.slice(-3), 10) >> 3
				};
				case "RS256":
				case "RS384":
				case "RS512": return {
					hash: n,
					name: "RSASSA-PKCS1-v1_5"
				};
				case "ES256":
				case "ES384":
				case "ES512": return {
					hash: n,
					name: "ECDSA",
					namedCurve: t.namedCurve
				};
				case "Ed25519":
				case "EdDSA": return { name: "Ed25519" };
				case "ML-DSA-44":
				case "ML-DSA-65":
				case "ML-DSA-87": return { name: e };
				default: throw new wo("alg ".concat(e, " is not supported either by JOSE or your javascript runtime"));
			}
		}(e, r.algorithm);
		try {
			return await crypto.subtle.verify(i, r, n, o);
		} catch (e) {
			return !1;
		}
	}(s, d, h, l)) throw new To();
	let p;
	p = a ? xo(e.payload, "payload", go) : "string" == typeof e.payload ? no.encode(e.payload) : e.payload;
	const f = { payload: p };
	return void 0 !== e.protected && (f.protectedHeader = o), void 0 !== e.header && (f.unprotectedHeader = e.header), u ? dt(dt({}, f), {}, { key: d }) : f;
}
var Er = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function Pr(e) {
	const t = Er.exec(e);
	if (!t || t[4] && t[1]) throw new TypeError("Invalid time period format");
	const n = parseFloat(t[2]);
	let o;
	switch (t[3].toLowerCase()) {
		case "sec":
		case "secs":
		case "second":
		case "seconds":
		case "s":
			o = Math.round(n);
			break;
		case "minute":
		case "minutes":
		case "min":
		case "mins":
		case "m":
			o = Math.round(60 * n);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			o = Math.round(3600 * n);
			break;
		case "day":
		case "days":
		case "d":
			o = Math.round(86400 * n);
			break;
		case "week":
		case "weeks":
		case "w":
			o = Math.round(604800 * n);
			break;
		default: o = Math.round(31557600 * n);
	}
	return "-" === t[1] || "ago" === t[4] ? -o : o;
}
var Ar = (e) => e.includes("/") ? e.toLowerCase() : "application/".concat(e.toLowerCase());
function xr(e, t) {
	let n, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
	try {
		n = JSON.parse(oo.decode(t));
	} catch (e) {}
	if (!Ro(n)) throw new vo("JWT Claims Set must be a top-level JSON object");
	const { typ: r } = o;
	if (r && ("string" != typeof e.typ || Ar(e.typ) !== Ar(r))) throw new fo("unexpected \"typ\" JWT header value", n, "typ", "check_failed");
	const { requiredClaims: i = [], issuer: a, subject: s, audience: c, maxTokenAge: u } = o, l = [...i];
	void 0 !== u && l.push("iat"), void 0 !== c && l.push("aud"), void 0 !== s && l.push("sub"), void 0 !== a && l.push("iss");
	for (const e of new Set(l.reverse())) if (!(e in n)) throw new fo("missing required \"".concat(e, "\" claim"), n, e, "missing");
	if (a && !(Array.isArray(a) ? a : [a]).includes(n.iss)) throw new fo("unexpected \"iss\" claim value", n, "iss", "check_failed");
	if (s && n.sub !== s) throw new fo("unexpected \"sub\" claim value", n, "sub", "check_failed");
	if (c && (d = "string" == typeof c ? [c] : c, !("string" == typeof (h = n.aud) ? d.includes(h) : Array.isArray(h) && d.some(Set.prototype.has.bind(new Set(h)))))) throw new fo("unexpected \"aud\" claim value", n, "aud", "check_failed");
	var h, d;
	let p;
	switch (typeof o.clockTolerance) {
		case "string":
			p = Pr(o.clockTolerance);
			break;
		case "number":
			p = o.clockTolerance;
			break;
		case "undefined":
			p = 0;
			break;
		default: throw new TypeError("Invalid clockTolerance option type");
	}
	const { currentDate: f } = o, m = (y = f || /* @__PURE__ */ new Date(), Math.floor(y.getTime() / 1e3));
	var y;
	if ((void 0 !== n.iat || u) && "number" != typeof n.iat) throw new fo("\"iat\" claim must be a number", n, "iat", "invalid");
	if (void 0 !== n.nbf) {
		if ("number" != typeof n.nbf) throw new fo("\"nbf\" claim must be a number", n, "nbf", "invalid");
		if (n.nbf > m + p) throw new fo("\"nbf\" claim timestamp check failed", n, "nbf", "check_failed");
	}
	if (void 0 !== n.exp) {
		if ("number" != typeof n.exp) throw new fo("\"exp\" claim must be a number", n, "exp", "invalid");
		if (n.exp <= m - p) throw new mo("\"exp\" claim timestamp check failed", n, "exp", "check_failed");
	}
	if (u) {
		const e = m - n.iat;
		if (e - p > ("number" == typeof u ? u : Pr(u))) throw new mo("\"iat\" claim timestamp check failed (too far in the past)", n, "iat", "check_failed");
		if (e < 0 - p) throw new fo("\"iat\" claim timestamp check failed (it should be in the past)", n, "iat", "check_failed");
	}
	return n;
}
function Rr(e) {
	return Ro(e);
}
var Or, Ir, Cr = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap();
var Wr = class {
	constructor(e) {
		if (ct(this, Cr, void 0), ct(this, jr, /* @__PURE__ */ new WeakMap()), !function(e) {
			return e && "object" == typeof e && Array.isArray(e.keys) && e.keys.every(Rr);
		}(e)) throw new bo("JSON Web Key Set malformed");
		ut(Cr, this, structuredClone(e));
	}
	jwks() {
		return st(Cr, this);
	}
	async getKey(e, t) {
		const { alg: n, kid: o } = dt(dt({}, e), null == t ? void 0 : t.header), r = function(e) {
			switch ("string" == typeof e && e.slice(0, 2)) {
				case "RS":
				case "PS": return "RSA";
				case "ES": return "EC";
				case "Ed": return "OKP";
				case "ML": return "AKP";
				default: throw new wo("Unsupported \"alg\" value for a JSON Web Key Set");
			}
		}(n), i = st(Cr, this).keys.filter((e) => {
			let t = r === e.kty;
			if (t && "string" == typeof o && (t = o === e.kid), !t || "string" != typeof e.alg && "AKP" !== r || (t = n === e.alg), t && "string" == typeof e.use && (t = "sig" === e.use), t && Array.isArray(e.key_ops) && (t = e.key_ops.includes("verify")), t) switch (n) {
				case "ES256":
					t = "P-256" === e.crv;
					break;
				case "ES384":
					t = "P-384" === e.crv;
					break;
				case "ES512":
					t = "P-521" === e.crv;
					break;
				case "Ed25519":
				case "EdDSA": t = "Ed25519" === e.crv;
			}
			return t;
		}), { 0: a, length: s } = i;
		if (0 === s) throw new _o();
		if (1 !== s) {
			const e = new ko(), t = st(jr, this);
			throw e[Symbol.asyncIterator] = function(e) {
				return function() {
					return new ft(e.apply(this, arguments));
				};
			}(function* () {
				for (const e of i) try {
					yield yield it(Ur(t, e, n));
				} catch (e) {}
			}), e;
		}
		return Ur(st(jr, this), a, n);
	}
};
async function Ur(e, t, n) {
	const o = e.get(t) || e.set(t, {}).get(t);
	if (void 0 === o[n]) {
		const e = await async function(e, t) {
			if (!Ro(e)) throw new TypeError("JWK must be an object");
			let n;
			switch (t ??= e.alg, n ??= e.ext, e.kty) {
				case "oct":
					if ("string" != typeof e.k || !e.k) throw new TypeError("missing \"k\" (Key Value) Parameter value");
					return ao(e.k);
				case "RSA":
					if ("oth" in e && void 0 !== e.oth) throw new wo("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
					return jo(dt(dt({}, e), {}, {
						alg: t,
						ext: n
					}));
				case "AKP":
					if ("string" != typeof e.alg || !e.alg) throw new TypeError("missing \"alg\" (Algorithm) Parameter value");
					if (void 0 !== t && t !== e.alg) throw new TypeError("JWK alg and alg option value mismatch");
					return jo(dt(dt({}, e), {}, { ext: n }));
				case "EC":
				case "OKP": return jo(dt(dt({}, e), {}, {
					alg: t,
					ext: n
				}));
				default: throw new wo("Unsupported \"kty\" (Key Type) Parameter value");
			}
		}(dt(dt({}, t), {}, { ext: !0 }), n);
		if (e instanceof Uint8Array || "public" !== e.type) throw new bo("JSON Web Key Set members must be public keys");
		o[n] = e;
	}
	return o[n];
}
function Dr(e) {
	const t = new Wr(e), n = async (e, n) => t.getKey(e, n);
	return Object.defineProperties(n, { jwks: {
		value: () => structuredClone(t.jwks()),
		enumerable: !1,
		configurable: !1,
		writable: !1
	} }), n;
}
var Kr;
if ("undefined" == typeof navigator || null === (Or = navigator.userAgent) || void 0 === Or || null === (Ir = Or.startsWith) || void 0 === Ir || !Ir.call(Or, "Mozilla/5.0 ")) Kr = "".concat("jose", "/").concat("v6.2.2");
var Nr = Symbol(), Lr = Symbol();
var zr = /* @__PURE__ */ new WeakMap(), Hr = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap(), Fr = /* @__PURE__ */ new WeakMap(), Xr = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakMap(), Yr = /* @__PURE__ */ new WeakMap();
var Br = class {
	constructor(e, t) {
		if (ct(this, zr, void 0), ct(this, Hr, void 0), ct(this, Jr, void 0), ct(this, Mr, void 0), ct(this, Zr, void 0), ct(this, Vr, void 0), ct(this, Fr, void 0), ct(this, Xr, void 0), ct(this, Gr, void 0), ct(this, Yr, void 0), !(e instanceof URL)) throw new TypeError("url must be an instance of URL");
		var n, o;
		ut(zr, this, new URL(e.href)), ut(Hr, this, "number" == typeof (null == t ? void 0 : t.timeoutDuration) ? null == t ? void 0 : t.timeoutDuration : 5e3), ut(Jr, this, "number" == typeof (null == t ? void 0 : t.cooldownDuration) ? null == t ? void 0 : t.cooldownDuration : 3e4), ut(Mr, this, "number" == typeof (null == t ? void 0 : t.cacheMaxAge) ? null == t ? void 0 : t.cacheMaxAge : 6e5), ut(Fr, this, new Headers(null == t ? void 0 : t.headers)), Kr && !st(Fr, this).has("User-Agent") && st(Fr, this).set("User-Agent", Kr), st(Fr, this).has("accept") || (st(Fr, this).set("accept", "application/json"), st(Fr, this).append("accept", "application/jwk-set+json")), ut(Xr, this, null == t ? void 0 : t[Nr]), void 0 !== (null == t ? void 0 : t[Lr]) && (ut(Yr, this, null == t ? void 0 : t[Lr]), n = null == t ? void 0 : t[Lr], o = st(Mr, this), "object" == typeof n && null !== n && "uat" in n && "number" == typeof n.uat && !(Date.now() - n.uat >= o) && "jwks" in n && Ro(n.jwks) && Array.isArray(n.jwks.keys) && Array.prototype.every.call(n.jwks.keys, Ro) && (ut(Zr, this, st(Yr, this).uat), ut(Gr, this, Dr(st(Yr, this).jwks))));
	}
	pendingFetch() {
		return !!st(Vr, this);
	}
	coolingDown() {
		return "number" == typeof st(Zr, this) && Date.now() < st(Zr, this) + st(Jr, this);
	}
	fresh() {
		return "number" == typeof st(Zr, this) && Date.now() < st(Zr, this) + st(Mr, this);
	}
	jwks() {
		var e;
		return null === (e = st(Gr, this)) || void 0 === e ? void 0 : e.jwks();
	}
	async getKey(e, t) {
		st(Gr, this) && this.fresh() || await this.reload();
		try {
			return await st(Gr, this).call(this, e, t);
		} catch (n) {
			if (n instanceof _o && !1 === this.coolingDown()) return await this.reload(), st(Gr, this).call(this, e, t);
			throw n;
		}
	}
	async reload() {
		st(Vr, this) && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent || "undefined" != typeof EdgeRuntime && "vercel" === EdgeRuntime) && ut(Vr, this, void 0), st(Vr, this) || ut(Vr, this, async function(e, t, n) {
			const r = await (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : fetch)(e, {
				method: "GET",
				signal: n,
				redirect: "manual",
				headers: t
			}).catch((e) => {
				if ("TimeoutError" === e.name) throw new So();
				throw e;
			});
			if (200 !== r.status) throw new po("Expected 200 OK from the JSON Web Key Set HTTP response");
			try {
				return await r.json();
			} catch (e) {
				throw new po("Failed to parse the JSON Web Key Set HTTP response as JSON");
			}
		}(st(zr, this).href, st(Fr, this), AbortSignal.timeout(st(Hr, this)), st(Xr, this)).then((e) => {
			ut(Gr, this, Dr(e)), st(Yr, this) && (st(Yr, this).uat = Date.now(), st(Yr, this).jwks = e), ut(Zr, this, Date.now()), ut(Vr, this, void 0);
		}).catch((e) => {
			throw ut(Vr, this, void 0), e;
		})), await st(Vr, this);
	}
};
var qr = ["mfaToken"], Qr = ["mfaToken"];
var $r, ei, ti, ni, oi, ri, ii, ai, si, ci, ui, li, hi, di, pi, fi, mi = class extends Error {
	constructor(e, t) {
		super(t), lt(this, "code", void 0), this.name = "NotSupportedError", this.code = e;
	}
}, yi = class extends Error {
	constructor(e, t, n) {
		super(t), lt(this, "cause", void 0), lt(this, "code", void 0), this.code = e, this.cause = n && {
			error: n.error,
			error_description: n.error_description,
			message: n.message
		};
	}
}, wi = class extends yi {
	constructor(e, t) {
		super("token_by_code_error", e, t), this.name = "TokenByCodeError";
	}
}, gi = class extends yi {
	constructor(e, t) {
		super("token_by_client_credentials_error", e, t), this.name = "TokenByClientCredentialsError";
	}
}, vi = class extends yi {
	constructor(e, t) {
		super("token_by_refresh_token_error", e, t), this.name = "TokenByRefreshTokenError";
	}
}, bi = class extends yi {
	constructor(e, t) {
		super("token_by_password_error", e, t), this.name = "TokenByPasswordError";
	}
}, _i = class extends yi {
	constructor(e, t) {
		super("token_for_connection_error", e, t), this.name = "TokenForConnectionErrorCode";
	}
}, ki = class extends yi {
	constructor(e, t) {
		super("token_exchange_error", e, t), this.name = "TokenExchangeError";
	}
}, Si = class extends Error {
	constructor(e) {
		super(e), lt(this, "code", "verify_logout_token_error"), this.name = "VerifyLogoutTokenError";
	}
}, Ti = class extends yi {
	constructor(e) {
		super("backchannel_authentication_error", "There was an error when trying to use Client-Initiated Backchannel Authentication.", e), lt(this, "code", "backchannel_authentication_error"), this.name = "BackchannelAuthenticationError";
	}
}, Ei = class extends yi {
	constructor(e) {
		super("build_authorization_url_error", "There was an error when trying to build the authorization URL.", e), this.name = "BuildAuthorizationUrlError";
	}
}, Pi = class extends yi {
	constructor(e) {
		super("build_link_user_url_error", "There was an error when trying to build the Link User URL.", e), this.name = "BuildLinkUserUrlError";
	}
}, Ai = class extends yi {
	constructor(e) {
		super("build_unlink_user_url_error", "There was an error when trying to build the Unlink User URL.", e), this.name = "BuildUnlinkUserUrlError";
	}
}, xi = class extends Error {
	constructor() {
		super("The client secret or client assertion signing key must be provided."), lt(this, "code", "missing_client_auth_error"), this.name = "MissingClientAuthError";
	}
};
function Ri(e) {
	return Object.entries(e).filter((e) => {
		let [, t] = e;
		return void 0 !== t;
	}).reduce((e, t) => dt(dt({}, e), {}, { [t[0]]: t[1] }), {});
}
var Oi = class extends Error {
	constructor(e, t, n) {
		super(t), lt(this, "cause", void 0), lt(this, "code", void 0), this.code = e, this.cause = n && {
			error: n.error,
			error_description: n.error_description,
			message: n.message
		};
	}
}, Ii = class extends Oi {
	constructor(e, t) {
		super("mfa_list_authenticators_error", e, t), this.name = "MfaListAuthenticatorsError";
	}
}, Ci = class extends Oi {
	constructor(e, t) {
		super("mfa_enrollment_error", e, t), this.name = "MfaEnrollmentError";
	}
}, ji = class extends Oi {
	constructor(e, t) {
		super("mfa_delete_authenticator_error", e, t), this.name = "MfaDeleteAuthenticatorError";
	}
}, Wi = class extends Oi {
	constructor(e, t) {
		super("mfa_challenge_error", e, t), this.name = "MfaChallengeError";
	}
};
function Ui(e) {
	return {
		id: e.id,
		authenticatorType: e.authenticator_type,
		active: e.active,
		name: e.name,
		oobChannels: e.oob_channels,
		type: e.type
	};
}
var Di = ($r = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap(), class {
	constructor(e) {
		var t;
		ct(this, $r, void 0), ct(this, ei, void 0), ct(this, ti, void 0), ut($r, this, "https://".concat(e.domain)), ut(ei, this, e.clientId), ut(ti, this, null !== (t = e.customFetch) && void 0 !== t ? t : function() {
			return fetch(...arguments);
		});
	}
	async listAuthenticators(e) {
		const t = "".concat(st($r, this), "/mfa/authenticators"), { mfaToken: n } = e, o = await st(ti, this).call(this, t, {
			method: "GET",
			headers: {
				Authorization: "Bearer ".concat(n),
				"Content-Type": "application/json"
			}
		});
		if (!o.ok) {
			const e = await o.json();
			throw new Ii(e.error_description || "Failed to list authenticators", e);
		}
		return (await o.json()).map(Ui);
	}
	async enrollAuthenticator(e) {
		const t = "".concat(st($r, this), "/mfa/associate"), { mfaToken: n } = e, o = pt(e, qr), r = { authenticator_types: o.authenticatorTypes };
		"oobChannels" in o && (r.oob_channels = o.oobChannels), "phoneNumber" in o && o.phoneNumber && (r.phone_number = o.phoneNumber), "email" in o && o.email && (r.email = o.email);
		const i = await st(ti, this).call(this, t, {
			method: "POST",
			headers: {
				Authorization: "Bearer ".concat(n),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(r)
		});
		if (!i.ok) {
			const e = await i.json();
			throw new Ci(e.error_description || "Failed to enroll authenticator", e);
		}
		return function(e) {
			if ("otp" === e.authenticator_type) return {
				authenticatorType: "otp",
				secret: e.secret,
				barcodeUri: e.barcode_uri,
				recoveryCodes: e.recovery_codes,
				id: e.id
			};
			if ("oob" === e.authenticator_type) return {
				authenticatorType: "oob",
				oobChannel: e.oob_channel,
				oobCode: e.oob_code,
				bindingMethod: e.binding_method,
				id: e.id,
				barcodeUri: e.barcode_uri,
				recoveryCodes: e.recovery_codes
			};
			throw new Error("Unexpected authenticator type: ".concat(e.authenticator_type));
		}(await i.json());
	}
	async deleteAuthenticator(e) {
		const { authenticatorId: t, mfaToken: n } = e, o = "".concat(st($r, this), "/mfa/authenticators/").concat(encodeURIComponent(t)), r = await st(ti, this).call(this, o, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer ".concat(n),
				"Content-Type": "application/json"
			}
		});
		if (!r.ok) {
			const e = await r.json();
			throw new ji(e.error_description || "Failed to delete authenticator", e);
		}
	}
	async challengeAuthenticator(e) {
		const t = "".concat(st($r, this), "/mfa/challenge"), { mfaToken: n } = e, o = pt(e, Qr), r = {
			mfa_token: n,
			client_id: st(ei, this),
			challenge_type: o.challengeType
		};
		o.authenticatorId && (r.authenticator_id = o.authenticatorId);
		const i = await st(ti, this).call(this, t, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(r)
		});
		if (!i.ok) {
			const e = await i.json();
			throw new Wi(e.error_description || "Failed to challenge authenticator", e);
		}
		return function(e) {
			const t = { challengeType: e.challenge_type };
			return void 0 !== e.oob_code && (t.oobCode = e.oob_code), void 0 !== e.binding_method && (t.bindingMethod = e.binding_method), t;
		}(await i.json());
	}
}), Ki = class e {
	constructor(e, t, n, o, r, i, a) {
		lt(this, "accessToken", void 0), lt(this, "idToken", void 0), lt(this, "refreshToken", void 0), lt(this, "expiresAt", void 0), lt(this, "scope", void 0), lt(this, "claims", void 0), lt(this, "authorizationDetails", void 0), lt(this, "tokenType", void 0), lt(this, "issuedTokenType", void 0), this.accessToken = e, this.idToken = n, this.refreshToken = o, this.expiresAt = t, this.scope = r, this.claims = i, this.authorizationDetails = a;
	}
	static fromTokenEndpointResponse(t) {
		const n = t.id_token ? t.claims() : void 0, o = new e(t.access_token, Math.floor(Date.now() / 1e3) + Number(t.expires_in), t.id_token, t.refresh_token, t.scope, n, t.authorization_details);
		return o.tokenType = t.token_type, o.issuedTokenType = t.issued_token_type, o;
	}
}, Ni = (ni = /* @__PURE__ */ new WeakMap(), oi = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), class {
	constructor(e, t) {
		ct(this, ni, /* @__PURE__ */ new Map()), ct(this, oi, void 0), ct(this, ri, void 0), ut(ri, this, Math.max(1, Math.floor(e))), ut(oi, this, Math.max(0, Math.floor(t)));
	}
	get(e) {
		const t = st(ni, this).get(e);
		if (t) {
			if (!(Date.now() >= t.expiresAt)) return st(ni, this).delete(e), st(ni, this).set(e, t), t.value;
			st(ni, this).delete(e);
		}
	}
	set(e, t) {
		for (st(ni, this).has(e) && st(ni, this).delete(e), st(ni, this).set(e, {
			value: t,
			expiresAt: Date.now() + st(oi, this)
		}); st(ni, this).size > st(ri, this);) {
			const e = st(ni, this).keys().next().value;
			if (void 0 === e) break;
			st(ni, this).delete(e);
		}
	}
}), Li = /* @__PURE__ */ new Map();
function zi(e) {
	return {
		ttlMs: 1e3 * ("number" == typeof (null == e ? void 0 : e.ttl) ? e.ttl : 600),
		maxEntries: "number" == typeof (null == e ? void 0 : e.maxEntries) && e.maxEntries > 0 ? e.maxEntries : 100
	};
}
var Hi = class {
	static createDiscoveryCache(e) {
		const t = (n = e.maxEntries, o = e.ttlMs, "".concat(n, ":").concat(o));
		var n, o;
		let r = (i = t, Li.get(i));
		var i;
		return r || (r = new Ni(e.maxEntries, e.ttlMs), Li.set(t, r)), r;
	}
	static createJwksCache() {
		return {};
	}
}, Ji = "openid profile email offline_access", Mi = Object.freeze(new Set([
	"grant_type",
	"client_id",
	"client_secret",
	"client_assertion",
	"client_assertion_type",
	"subject_token",
	"subject_token_type",
	"requested_token_type",
	"actor_token",
	"actor_token_type",
	"audience",
	"aud",
	"resource",
	"resources",
	"resource_indicator",
	"scope",
	"connection",
	"login_hint",
	"organization",
	"assertion"
]));
function Zi(e) {
	if (null == e) throw new ki("subject_token is required");
	if ("string" != typeof e) throw new ki("subject_token must be a string");
	if (0 === e.trim().length) throw new ki("subject_token cannot be blank or whitespace");
	if (e !== e.trim()) throw new ki("subject_token must not include leading or trailing whitespace");
	if (/^bearer\s+/i.test(e)) throw new ki("subject_token must not include the 'Bearer ' prefix");
}
function Vi(e, t) {
	if (t) {
		for (const [n, o] of Object.entries(t)) if (!Mi.has(n)) if (Array.isArray(o)) {
			if (o.length > 20) throw new ki("Parameter '".concat(n, "' exceeds maximum array size of ").concat(20));
			o.forEach((t) => {
				e.append(n, t);
			});
		} else e.append(n, o);
	}
}
var Fi = "urn:ietf:params:oauth:token-type:access_token", Xi = (ii = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), pi = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakSet(), class {
	constructor(e) {
		var t, n, o, r;
		if (function(e, t) {
			at(e, t), t.add(e);
		}(this, fi), ct(this, ii, void 0), ct(this, ai, void 0), ct(this, si, void 0), ct(this, ci, void 0), ct(this, ui, void 0), ct(this, li, void 0), ct(this, hi, void 0), ct(this, di, void 0), ct(this, pi, void 0), lt(this, "mfa", void 0), ut(ci, this, e), e.useMtls && !e.customFetch) throw new mi("mtls_without_custom_fetch_not_supported", "Using mTLS without a custom fetch implementation is not supported");
		ut(ui, this, function(e, t) {
			if (!1 === t.enabled) return e;
			const n = {
				name: t.name,
				version: t.version
			}, o = btoa(JSON.stringify(n));
			return async (t, n) => {
				const r = t instanceof Request ? new Headers(t.headers) : new Headers();
				return null != n && n.headers && new Headers(n.headers).forEach((e, t) => {
					r.set(t, e);
				}), r.set("Auth0-Client", o), e(t, dt(dt({}, n), {}, { headers: r }));
			};
		}(null !== (t = e.customFetch) && void 0 !== t ? t : function() {
			return fetch(...arguments);
		}, !1 === (null == (n = e.telemetry) ? void 0 : n.enabled) ? n : {
			enabled: !0,
			name: null !== (o = null == n ? void 0 : n.name) && void 0 !== o ? o : "@auth0/auth0-auth-js",
			version: null !== (r = null == n ? void 0 : n.version) && void 0 !== r ? r : "1.6.0"
		}));
		const i = zi(e.discoveryCache);
		ut(hi, this, Hi.createDiscoveryCache(i)), ut(di, this, /* @__PURE__ */ new Map()), ut(pi, this, Hi.createJwksCache()), this.mfa = new Di({
			domain: st(ci, this).domain,
			clientId: st(ci, this).clientId,
			customFetch: st(ui, this)
		});
	}
	async getServerMetadata() {
		const { serverMetadata: e } = await rt(fi, this, Bi).call(this);
		return e;
	}
	async buildAuthorizationUrl(e) {
		const { serverMetadata: t } = await rt(fi, this, Bi).call(this);
		if (null != e && e.pushedAuthorizationRequests && !t.pushed_authorization_request_endpoint) throw new mi("par_not_supported_error", "The Auth0 tenant does not have pushed authorization requests enabled. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-par");
		try {
			return await rt(fi, this, ea).call(this, e);
		} catch (e) {
			throw new Ei(e);
		}
	}
	async buildLinkUserUrl(e) {
		try {
			const t = await rt(fi, this, ea).call(this, { authorizationParams: dt(dt({}, e.authorizationParams), {}, {
				requested_connection: e.connection,
				requested_connection_scope: e.connectionScope,
				scope: "openid link_account offline_access",
				id_token_hint: e.idToken
			}) });
			return {
				linkUserUrl: t.authorizationUrl,
				codeVerifier: t.codeVerifier
			};
		} catch (e) {
			throw new Pi(e);
		}
	}
	async buildUnlinkUserUrl(e) {
		try {
			const t = await rt(fi, this, ea).call(this, { authorizationParams: dt(dt({}, e.authorizationParams), {}, {
				requested_connection: e.connection,
				scope: "openid unlink_account",
				id_token_hint: e.idToken
			}) });
			return {
				unlinkUserUrl: t.authorizationUrl,
				codeVerifier: t.codeVerifier
			};
		} catch (e) {
			throw new Ai(e);
		}
	}
	async backchannelAuthentication(e) {
		const { configuration: t, serverMetadata: n } = await rt(fi, this, Bi).call(this), o = Ri(dt(dt({}, st(ci, this).authorizationParams), null == e ? void 0 : e.authorizationParams)), r = new URLSearchParams(dt(dt({ scope: Ji }, o), {}, {
			client_id: st(ci, this).clientId,
			binding_message: e.bindingMessage,
			login_hint: JSON.stringify({
				format: "iss_sub",
				iss: n.issuer,
				sub: e.loginHint.sub
			})
		}));
		e.requestedExpiry && r.append("requested_expiry", e.requestedExpiry.toString()), e.authorizationDetails && r.append("authorization_details", JSON.stringify(e.authorizationDetails));
		try {
			const n = await dr(t, await hr(t, r));
			return Ki.fromTokenEndpointResponse(n);
		} catch (e) {
			throw new Ti(e);
		}
	}
	async initiateBackchannelAuthentication(e) {
		const { configuration: t, serverMetadata: n } = await rt(fi, this, Bi).call(this), o = Ri(dt(dt({}, st(ci, this).authorizationParams), null == e ? void 0 : e.authorizationParams)), r = new URLSearchParams(dt(dt({ scope: Ji }, o), {}, {
			client_id: st(ci, this).clientId,
			binding_message: e.bindingMessage,
			login_hint: JSON.stringify({
				format: "iss_sub",
				iss: n.issuer,
				sub: e.loginHint.sub
			})
		}));
		e.requestedExpiry && r.append("requested_expiry", e.requestedExpiry.toString()), e.authorizationDetails && r.append("authorization_details", JSON.stringify(e.authorizationDetails));
		try {
			const e = await hr(t, r);
			return {
				authReqId: e.auth_req_id,
				expiresIn: e.expires_in,
				interval: e.interval
			};
		} catch (e) {
			throw new Ti(e);
		}
	}
	async backchannelAuthenticationGrant(e) {
		let { authReqId: t } = e;
		const { configuration: n } = await rt(fi, this, Bi).call(this), o = new URLSearchParams({ auth_req_id: t });
		try {
			const e = await Sr(n, "urn:openid:params:grant-type:ciba", o);
			return Ki.fromTokenEndpointResponse(e);
		} catch (e) {
			throw new Ti(e);
		}
	}
	async getTokenForConnection(e) {
		var t;
		if (e.refreshToken && e.accessToken) throw new _i("Either a refresh or access token should be specified, but not both.");
		const n = null !== (t = e.accessToken) && void 0 !== t ? t : e.refreshToken;
		if (!n) throw new _i("Either a refresh or access token must be specified.");
		try {
			return await this.exchangeToken({
				connection: e.connection,
				subjectToken: n,
				subjectTokenType: e.accessToken ? Fi : "urn:ietf:params:oauth:token-type:refresh_token",
				loginHint: e.loginHint
			});
		} catch (e) {
			if (e instanceof ki) throw new _i(e.message, e.cause);
			throw e;
		}
	}
	async exchangeToken(e) {
		return "connection" in e ? rt(fi, this, qi).call(this, e) : rt(fi, this, Qi).call(this, e);
	}
	async getTokenByCode(e, t) {
		const { configuration: n } = await rt(fi, this, Bi).call(this);
		try {
			const o = await fr(n, e, { pkceCodeVerifier: t.codeVerifier });
			return Ki.fromTokenEndpointResponse(o);
		} catch (e) {
			throw new wi("There was an error while trying to request a token.", e);
		}
	}
	async getTokenByRefreshToken(e) {
		const { configuration: t } = await rt(fi, this, Bi).call(this), n = new URLSearchParams();
		e.audience && n.append("audience", e.audience), e.scope && n.append("scope", e.scope);
		try {
			const o = await mr(t, e.refreshToken, n);
			return Ki.fromTokenEndpointResponse(o);
		} catch (e) {
			throw new vi("The access token has expired and there was an error while trying to refresh it.", e);
		}
	}
	async getTokenByPassword(e) {
		const { configuration: t } = await rt(fi, this, Bi).call(this), n = new URLSearchParams({
			username: e.username,
			password: e.password
		});
		e.audience && n.append("audience", e.audience), e.scope && n.append("scope", e.scope), e.realm && n.append("realm", e.realm);
		let o = t;
		if (e.auth0ForwardedFor) {
			const n = await rt(fi, this, $i).call(this);
			o = new sr(t.serverMetadata(), st(ci, this).clientId, st(ci, this).clientSecret, n), o[Qo] = (t, n) => st(ui, this).call(this, t, dt(dt({}, n), {}, { headers: dt(dt({}, n.headers), {}, { "auth0-forwarded-for": e.auth0ForwardedFor }) }));
		}
		try {
			const e = await Sr(o, "password", n);
			return Ki.fromTokenEndpointResponse(e);
		} catch (e) {
			throw new bi("There was an error while trying to request a token.", e);
		}
	}
	async getTokenByClientCredentials(e) {
		const { configuration: t } = await rt(fi, this, Bi).call(this);
		try {
			const n = new URLSearchParams({ audience: e.audience });
			e.organization && n.append("organization", e.organization);
			const o = await yr(t, n);
			return Ki.fromTokenEndpointResponse(o);
		} catch (e) {
			throw new gi("There was an error while trying to request a token.", e);
		}
	}
	async buildLogoutUrl(e) {
		const { configuration: t, serverMetadata: n } = await rt(fi, this, Bi).call(this);
		if (!n.end_session_endpoint) {
			const t = new URL("https://".concat(st(ci, this).domain, "/v2/logout"));
			return t.searchParams.set("returnTo", e.returnTo), t.searchParams.set("client_id", st(ci, this).clientId), t;
		}
		return function(e, t) {
			vr(e);
			const { as: n, c: o, tlsOnly: r } = Go(e), i = nn(n, "end_session_endpoint", !1, r);
			(t = new URLSearchParams(t)).has("client_id") || t.set("client_id", o.client_id);
			for (const [e, n] of t.entries()) i.searchParams.append(e, n);
			return i;
		}(t, { post_logout_redirect_uri: e.returnTo });
	}
	async verifyLogoutToken(e) {
		const { serverMetadata: t } = await rt(fi, this, Bi).call(this), n = zi(st(ci, this).discoveryCache), o = t.jwks_uri;
		st(li, this) || ut(li, this, function(e, t) {
			const n = new Br(e, t), o = async (e, t) => n.getKey(e, t);
			return Object.defineProperties(o, {
				coolingDown: {
					get: () => n.coolingDown(),
					enumerable: !0,
					configurable: !1
				},
				fresh: {
					get: () => n.fresh(),
					enumerable: !0,
					configurable: !1
				},
				reload: {
					value: () => n.reload(),
					enumerable: !0,
					configurable: !1,
					writable: !1
				},
				reloading: {
					get: () => n.pendingFetch(),
					enumerable: !0,
					configurable: !1
				},
				jwks: {
					value: () => n.jwks(),
					enumerable: !0,
					configurable: !1,
					writable: !1
				}
			}), o;
		}(new URL(o), {
			cacheMaxAge: n.ttlMs,
			[Nr]: st(ui, this),
			[Lr]: st(pi, this)
		}));
		const { payload: r } = await async function(e, t, n) {
			var o;
			const r = await async function(e, t, n) {
				if (e instanceof Uint8Array && (e = oo.decode(e)), "string" != typeof e) throw new go("Compact JWS must be a string or Uint8Array");
				const { 0: o, 1: r, 2: i, length: a } = e.split(".");
				if (3 !== a) throw new go("Invalid Compact JWS");
				const s = await Tr({
					payload: r,
					protected: o,
					signature: i
				}, t, n), c = {
					payload: s.payload,
					protectedHeader: s.protectedHeader
				};
				return "function" == typeof t ? dt(dt({}, c), {}, { key: s.key }) : c;
			}(e, t, n);
			if (null !== (o = r.protectedHeader.crit) && void 0 !== o && o.includes("b64") && !1 === r.protectedHeader.b64) throw new vo("JWTs MUST NOT use unencoded payload");
			const i = {
				payload: xr(r.protectedHeader, r.payload, n),
				protectedHeader: r.protectedHeader
			};
			return "function" == typeof t ? dt(dt({}, i), {}, { key: r.key }) : i;
		}(e.logoutToken, st(li, this), {
			issuer: t.issuer,
			audience: st(ci, this).clientId,
			algorithms: ["RS256"],
			requiredClaims: ["iat"]
		});
		if (!("sid" in r) && !("sub" in r)) throw new Si("either \"sid\" or \"sub\" (or both) claims must be present");
		if ("sid" in r && "string" != typeof r.sid) throw new Si("\"sid\" claim must be a string");
		if ("sub" in r && "string" != typeof r.sub) throw new Si("\"sub\" claim must be a string");
		if ("nonce" in r) throw new Si("\"nonce\" claim is prohibited");
		if (!("events" in r)) throw new Si("\"events\" claim is missing");
		if ("object" != typeof r.events || null === r.events) throw new Si("\"events\" claim must be an object");
		if (!("http://schemas.openid.net/event/backchannel-logout" in r.events)) throw new Si("\"http://schemas.openid.net/event/backchannel-logout\" member is missing in the \"events\" claim");
		if ("object" != typeof r.events["http://schemas.openid.net/event/backchannel-logout"]) throw new Si("\"http://schemas.openid.net/event/backchannel-logout\" member in the \"events\" claim must be an object");
		return {
			sid: r.sid,
			sub: r.sub
		};
	}
});
function Gi() {
	const e = st(ci, this).domain.toLowerCase();
	return "".concat(e, "|mtls:").concat(st(ci, this).useMtls ? "1" : "0");
}
async function Yi(e) {
	const t = await rt(fi, this, $i).call(this), n = new sr(e, st(ci, this).clientId, st(ci, this).clientSecret, t);
	return n[Qo] = st(ui, this), n;
}
async function Bi() {
	if (st(ii, this) && st(ai, this)) return {
		configuration: st(ii, this),
		serverMetadata: st(ai, this)
	};
	const e = rt(fi, this, Gi).call(this), t = st(hi, this).get(e);
	if (t) return ut(ai, this, t.serverMetadata), ut(ii, this, await rt(fi, this, Yi).call(this, t.serverMetadata)), {
		configuration: st(ii, this),
		serverMetadata: st(ai, this)
	};
	const n = st(di, this).get(e);
	if (n) {
		const e = await n;
		return ut(ai, this, e.serverMetadata), ut(ii, this, await rt(fi, this, Yi).call(this, e.serverMetadata)), {
			configuration: st(ii, this),
			serverMetadata: st(ai, this)
		};
	}
	const o = (async () => {
		const t = await rt(fi, this, $i).call(this), n = await ir(new URL("https://".concat(st(ci, this).domain)), st(ci, this).clientId, { use_mtls_endpoint_aliases: st(ci, this).useMtls }, t, { [Qo]: st(ui, this) }), o = n.serverMetadata();
		return st(hi, this).set(e, { serverMetadata: o }), {
			configuration: n,
			serverMetadata: o
		};
	})(), r = o.then((e) => {
		let { serverMetadata: t } = e;
		return { serverMetadata: t };
	});
	r.catch(() => {}), st(di, this).set(e, r);
	try {
		const { configuration: e, serverMetadata: t } = await o;
		ut(ii, this, e), ut(ai, this, t), st(ii, this)[Qo] = st(ui, this);
	} finally {
		st(di, this).delete(e);
	}
	return {
		configuration: st(ii, this),
		serverMetadata: st(ai, this)
	};
}
async function qi(e) {
	var t, n;
	const { configuration: o } = await rt(fi, this, Bi).call(this);
	if ("audience" in e || "resource" in e) throw new ki("audience and resource parameters are not supported for Token Vault exchanges");
	Zi(e.subjectToken);
	const r = new URLSearchParams({
		connection: e.connection,
		subject_token: e.subjectToken,
		subject_token_type: null !== (t = e.subjectTokenType) && void 0 !== t ? t : Fi,
		requested_token_type: null !== (n = e.requestedTokenType) && void 0 !== n ? n : "http://auth0.com/oauth/token-type/federated-connection-access-token"
	});
	e.loginHint && r.append("login_hint", e.loginHint), e.scope && r.append("scope", e.scope), Vi(r, e.extra);
	try {
		const e = await Sr(o, "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", r);
		return Ki.fromTokenEndpointResponse(e);
	} catch (t) {
		throw new ki("Failed to exchange token for connection '".concat(e.connection, "'."), t);
	}
}
async function Qi(e) {
	const { configuration: t } = await rt(fi, this, Bi).call(this);
	Zi(e.subjectToken);
	const n = new URLSearchParams({
		subject_token_type: e.subjectTokenType,
		subject_token: e.subjectToken
	});
	e.audience && n.append("audience", e.audience), e.scope && n.append("scope", e.scope), e.requestedTokenType && n.append("requested_token_type", e.requestedTokenType), e.organization && n.append("organization", e.organization), Vi(n, e.extra);
	try {
		const e = await Sr(t, "urn:ietf:params:oauth:grant-type:token-exchange", n);
		return Ki.fromTokenEndpointResponse(e);
	} catch (t) {
		throw new ki("Failed to exchange token of type '".concat(e.subjectTokenType, "'").concat(e.audience ? " for audience '".concat(e.audience, "'") : "", "."), t);
	}
}
async function $i() {
	return st(si, this) || ut(si, this, (async () => {
		if (!st(ci, this).clientSecret && !st(ci, this).clientAssertionSigningKey && !st(ci, this).useMtls) throw new xi();
		if (st(ci, this).useMtls) return (e, t, n, o) => {
			n.set("client_id", t.client_id);
		};
		let e = st(ci, this).clientAssertionSigningKey;
		return !e || e instanceof CryptoKey || (e = await async function(e, t) {
			if ("string" != typeof e || 0 !== e.indexOf("-----BEGIN PRIVATE KEY-----")) throw new TypeError("\"pkcs8\" must be PKCS#8 formatted string");
			return Ho(e, t, void 0);
		}(e, st(ci, this).clientAssertionSigningAlg || "RS256")), e ? function(e) {
			return Qt(e, void 0);
		}(e) : qo(st(ci, this).clientSecret);
	})().catch((e) => {
		throw ut(si, this, void 0), e;
	})), st(si, this);
}
async function ea(e) {
	const { configuration: t } = await rt(fi, this, Bi).call(this), n = Zt(), o = await function(e) {
		return async function(e) {
			return Jt(e, "codeVerifier"), jt(await crypto.subtle.digest("SHA-256", Ot(e)));
		}(e);
	}(n), r = Ri(dt(dt({}, st(ci, this).authorizationParams), null == e ? void 0 : e.authorizationParams)), i = new URLSearchParams(dt(dt({ scope: Ji }, r), {}, {
		client_id: st(ci, this).clientId,
		code_challenge: o,
		code_challenge_method: "S256"
	}));
	return {
		authorizationUrl: null != e && e.pushedAuthorizationRequests ? await gr(t, i) : await wr(t, i),
		codeVerifier: n
	};
}
var ta = class ta extends p {
	constructor(e, t) {
		super(e, t), Object.setPrototypeOf(this, ta.prototype);
	}
	static fromPayload(e) {
		let { error: t, error_description: n } = e;
		return new ta(t, n);
	}
};
var na = class na extends ta {
	constructor(e, t) {
		super(e, t), Object.setPrototypeOf(this, na.prototype);
	}
};
var oa = class oa extends ta {
	constructor(e, t) {
		super(e, t), Object.setPrototypeOf(this, oa.prototype);
	}
};
var ra = class ra extends ta {
	constructor(e, t) {
		super(e, t), Object.setPrototypeOf(this, ra.prototype);
	}
};
var ia = class ia extends ta {
	constructor(e, t) {
		super(e, t), Object.setPrototypeOf(this, ia.prototype);
	}
};
var aa = class aa extends ta {
	constructor(e, t) {
		super(e, t), Object.setPrototypeOf(this, aa.prototype);
	}
};
var sa = class {
	constructor() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6e5;
		this.contexts = /* @__PURE__ */ new Map(), this.ttlMs = e;
	}
	set(e, t) {
		this.cleanup(), this.contexts.set(e, Object.assign(Object.assign({}, t), { createdAt: Date.now() }));
	}
	get(e) {
		const t = this.contexts.get(e);
		if (t) {
			if (!(Date.now() - t.createdAt > this.ttlMs)) return t;
			this.contexts.delete(e);
		}
	}
	remove(e) {
		this.contexts.delete(e);
	}
	cleanup() {
		const e = Date.now();
		for (const [t, n] of this.contexts) e - n.createdAt > this.ttlMs && this.contexts.delete(t);
	}
	get size() {
		return this.contexts.size;
	}
};
var ca = class {
	constructor(e, t) {
		this.authJsMfaClient = e, this.auth0Client = t, this.contextManager = new sa();
	}
	setMFAAuthDetails(e, t, n, o) {
		this.contextManager.set(e, {
			scope: t,
			audience: n,
			mfaRequirements: o
		});
	}
	async getAuthenticators(e) {
		var t, n;
		const o = this.contextManager.get(e);
		if (!(null === (t = null == o ? void 0 : o.mfaRequirements) || void 0 === t ? void 0 : t.challenge) || 0 === o.mfaRequirements.challenge.length) throw new na("invalid_request", "challengeType is required and must contain at least one challenge type, please check mfa_required error payload");
		const r = o.mfaRequirements.challenge.map((e) => e.type);
		try {
			return (await this.authJsMfaClient.listAuthenticators({ mfaToken: e })).filter((e) => !!e.type && r.includes(e.type));
		} catch (e) {
			if (e instanceof Ii) throw new na(null === (n = e.cause) || void 0 === n ? void 0 : n.error, e.message);
			throw e;
		}
	}
	async enroll(e) {
		var t;
		const n = function(e) {
			const t = nt[e.factorType];
			return Object.assign(Object.assign(Object.assign({
				mfaToken: e.mfaToken,
				authenticatorTypes: t.authenticatorTypes
			}, t.oobChannels && { oobChannels: t.oobChannels }), "phoneNumber" in e && { phoneNumber: e.phoneNumber }), "email" in e && { email: e.email });
		}(e);
		try {
			return await this.authJsMfaClient.enrollAuthenticator(n);
		} catch (e) {
			if (e instanceof Ci) throw new oa(null === (t = e.cause) || void 0 === t ? void 0 : t.error, e.message);
			throw e;
		}
	}
	async challenge(e) {
		var t;
		try {
			const t = {
				challengeType: e.challengeType,
				mfaToken: e.mfaToken
			};
			return e.authenticatorId && (t.authenticatorId = e.authenticatorId), await this.authJsMfaClient.challengeAuthenticator(t);
		} catch (e) {
			if (e instanceof Wi) throw new ra(null === (t = e.cause) || void 0 === t ? void 0 : t.error, e.message);
			throw e;
		}
	}
	async getEnrollmentFactors(e) {
		const t = this.contextManager.get(e);
		if (!t || !t.mfaRequirements) throw new aa("mfa_context_not_found", "MFA context not found for this MFA token. Please retry the original request to get a new MFA token.");
		return t.mfaRequirements.enroll && 0 !== t.mfaRequirements.enroll.length ? t.mfaRequirements.enroll : [];
	}
	async verify(e) {
		const t = this.contextManager.get(e.mfaToken);
		if (!t) throw new ia("mfa_context_not_found", "MFA context not found for this MFA token. Please retry the original request to get a new MFA token.");
		const n = function(e) {
			return "otp" in e && e.otp ? "http://auth0.com/oauth/grant-type/mfa-otp" : "oobCode" in e && e.oobCode ? "http://auth0.com/oauth/grant-type/mfa-oob" : "recoveryCode" in e && e.recoveryCode ? "http://auth0.com/oauth/grant-type/mfa-recovery-code" : void 0;
		}(e);
		if (!n) throw new ia("invalid_request", "Unable to determine grant type. Provide one of: otp, oobCode, or recoveryCode.");
		const o = t.scope, r = t.audience;
		try {
			const t = await this.auth0Client._requestTokenForMfa({
				grant_type: n,
				mfaToken: e.mfaToken,
				scope: o,
				audience: r,
				otp: e.otp,
				oob_code: e.oobCode,
				binding_code: e.bindingCode,
				recovery_code: e.recoveryCode
			});
			return this.contextManager.remove(e.mfaToken), t;
		} catch (e) {
			if (e instanceof b) this.setMFAAuthDetails(e.mfa_token, o, r, e.mfa_requirements);
			else if (e instanceof ia) throw new ia(e.error, e.error_description);
			throw e;
		}
	}
};
var ua = class {
	constructor(e) {
		let t, n;
		if (this.userCache = new Se().enclosedCache, this.defaultOptions = {
			authorizationParams: { scope: "openid profile email" },
			useRefreshTokensFallback: !1,
			useFormData: !0
		}, this.options = Object.assign(Object.assign(Object.assign({}, this.defaultOptions), e), { authorizationParams: Object.assign(Object.assign({}, this.defaultOptions.authorizationParams), e.authorizationParams) }), "undefined" != typeof window && (() => {
			if (!E()) throw new Error("For security reasons, `window.crypto` is required to run `auth0-spa-js`.");
			if (void 0 === E().subtle) throw new Error("\n      auth0-spa-js must run on a secure origin. See https://github.com/auth0/auth0-spa-js/blob/main/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin for more information.\n    ");
		})(), this.lockManager = (B || (B = function() {
			return "undefined" != typeof navigator && "function" == typeof (null === (e = navigator.locks) || void 0 === e ? void 0 : e.request) ? new G() : new Y();
			var e;
		}()), B), e.cache && e.cacheLocation && console.warn("Both `cache` and `cacheLocation` options have been specified in the Auth0Client configuration; ignoring `cacheLocation` and using `cache`."), e.cache) n = e.cache;
		else {
			if (t = e.cacheLocation || u, !Fe(t)) throw new Error("Invalid cache location \"".concat(t, "\""));
			n = Fe(t)();
		}
		var o;
		this.httpTimeoutMs = e.httpTimeoutInSeconds ? 1e3 * e.httpTimeoutInSeconds : c, this.cookieStorage = !1 === e.legacySameSiteCookie ? We : De, this.orgHintCookieName = (o = this.options.clientId, "auth0.".concat(o, ".organization_hint")), this.isAuthenticatedCookieName = ((e) => "auth0.".concat(e, ".is.authenticated"))(this.options.clientId), this.sessionCheckExpiryDays = e.sessionCheckExpiryDays || 1;
		const r = e.useCookiesForTransactions ? this.cookieStorage : Ke;
		var i;
		this.scope = function(e, t) {
			for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) o[r - 2] = arguments[r];
			if ("object" != typeof e) return { [d]: we(t, e, ...o) };
			let i = { [d]: we(t, ...o) };
			return Object.keys(e).forEach((n) => {
				const r = e[n];
				i[n] = we(t, r, ...o);
			}), i;
		}(this.options.authorizationParams.scope, "openid", this.options.useRefreshTokens ? "offline_access" : ""), this.transactionManager = new Ee(r, this.options.clientId, this.options.cookieDomain), this.nowProvider = this.options.nowProvider || h, this.cacheManager = new Te(n, n.allKeys ? void 0 : new Me(n, this.options.clientId), this.nowProvider), this.dpop = this.options.useDpop ? new qe(this.options.clientId) : void 0, this.domainUrl = (i = this.options.domain, /^https?:\/\//.test(i) ? i : "https://".concat(i)), this.tokenIssuer = ((e, t) => e ? e.startsWith("https://") ? e : "https://".concat(e, "/") : "".concat(t, "/"))(this.options.issuer, this.domainUrl);
		const a = "".concat(this.domainUrl, "/me/"), s = this.createFetcher(Object.assign(Object.assign({}, this.options.useDpop && { dpopNonceId: "__auth0_my_account_api__" }), { getAccessToken: () => this.getTokenSilently({
			authorizationParams: {
				scope: "create:me:connected_accounts",
				audience: a
			},
			detailedResponse: !0
		}) }));
		this.myAccountApi = new et(s, a), this.authJsClient = new Xi({
			domain: this.options.domain,
			clientId: this.options.clientId
		}), this.mfa = new ca(this.authJsClient.mfa, this), "undefined" != typeof window && window.Worker && this.options.useRefreshTokens && t === u && (this.options.workerUrl ? this.worker = new Worker(this.options.workerUrl) : this.worker = new He(), this.worker.postMessage({
			type: "init",
			allowedBaseUrl: this.domainUrl
		}));
	}
	getConfiguration() {
		return Object.freeze({
			domain: this.options.domain,
			clientId: this.options.clientId
		});
	}
	_url(e) {
		const n = R(this.options.auth0Client || l, !0), o = encodeURIComponent(btoa(JSON.stringify(n)));
		return "".concat(this.domainUrl).concat(e, "&auth0Client=").concat(o);
	}
	_authorizeUrl(e) {
		return this._url("/authorize?".concat(O(e)));
	}
	async _verifyIdToken(e, t, n) {
		const o = await this.nowProvider();
		return ((e) => {
			if (!e.id_token) throw new Error("ID token is required but missing");
			const t = ((e) => {
				const t = e.split("."), [n, o, r] = t;
				if (3 !== t.length || !n || !o || !r) throw new Error("ID token could not be decoded");
				const i = JSON.parse(C(o)), a = { __raw: e }, s = {};
				return Object.keys(i).forEach((e) => {
					a[e] = i[e], Ae.includes(e) || (s[e] = i[e]);
				}), {
					encoded: {
						header: n,
						payload: o,
						signature: r
					},
					header: JSON.parse(C(n)),
					claims: a,
					user: s
				};
			})(e.id_token);
			if (!t.claims.iss) throw new Error("Issuer (iss) claim must be a string present in the ID token");
			if (t.claims.iss !== e.iss) throw new Error("Issuer (iss) claim mismatch in the ID token; expected \"".concat(e.iss, "\", found \"").concat(t.claims.iss, "\""));
			if (!t.user.sub) throw new Error("Subject (sub) claim must be a string present in the ID token");
			if ("RS256" !== t.header.alg) throw new Error("Signature algorithm of \"".concat(t.header.alg, "\" is not supported. Expected the ID token to be signed with \"RS256\"."));
			if (!t.claims.aud || "string" != typeof t.claims.aud && !Array.isArray(t.claims.aud)) throw new Error("Audience (aud) claim must be a string or array of strings present in the ID token");
			if (Array.isArray(t.claims.aud)) {
				if (!t.claims.aud.includes(e.aud)) throw new Error("Audience (aud) claim mismatch in the ID token; expected \"".concat(e.aud, "\" but was not one of \"").concat(t.claims.aud.join(", "), "\""));
				if (t.claims.aud.length > 1) {
					if (!t.claims.azp) throw new Error("Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values");
					if (t.claims.azp !== e.aud) throw new Error("Authorized Party (azp) claim mismatch in the ID token; expected \"".concat(e.aud, "\", found \"").concat(t.claims.azp, "\""));
				}
			} else if (t.claims.aud !== e.aud) throw new Error("Audience (aud) claim mismatch in the ID token; expected \"".concat(e.aud, "\" but found \"").concat(t.claims.aud, "\""));
			if (e.nonce) {
				if (!t.claims.nonce) throw new Error("Nonce (nonce) claim must be a string present in the ID token");
				if (t.claims.nonce !== e.nonce) throw new Error("Nonce (nonce) claim mismatch in the ID token; expected \"".concat(e.nonce, "\", found \"").concat(t.claims.nonce, "\""));
			}
			if (e.max_age && !Pe(t.claims.auth_time)) throw new Error("Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified");
			if (null == t.claims.exp || !Pe(t.claims.exp)) throw new Error("Expiration Time (exp) claim must be a number present in the ID token");
			if (!Pe(t.claims.iat)) throw new Error("Issued At (iat) claim must be a number present in the ID token");
			const n = e.leeway || 60, o = new Date(e.now || Date.now()), r = /* @__PURE__ */ new Date(0);
			if (r.setUTCSeconds(t.claims.exp + n), o > r) throw new Error("Expiration Time (exp) claim error in the ID token; current time (".concat(o, ") is after expiration time (").concat(r, ")"));
			if (null != t.claims.nbf && Pe(t.claims.nbf)) {
				const e = /* @__PURE__ */ new Date(0);
				if (e.setUTCSeconds(t.claims.nbf - n), o < e) throw new Error("Not Before time (nbf) claim in the ID token indicates that this token can't be used just yet. Current time (".concat(o, ") is before ").concat(e));
			}
			if (null != t.claims.auth_time && Pe(t.claims.auth_time)) {
				const r = /* @__PURE__ */ new Date(0);
				if (r.setUTCSeconds(parseInt(t.claims.auth_time) + e.max_age + n), o > r) throw new Error("Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication. Current time (".concat(o, ") is after last auth at ").concat(r));
			}
			if (e.organization) {
				const n = e.organization.trim();
				if (n.startsWith("org_")) {
					const e = n;
					if (!t.claims.org_id) throw new Error("Organization ID (org_id) claim must be a string present in the ID token");
					if (e !== t.claims.org_id) throw new Error("Organization ID (org_id) claim mismatch in the ID token; expected \"".concat(e, "\", found \"").concat(t.claims.org_id, "\""));
				} else {
					const e = n.toLowerCase();
					if (!t.claims.org_name) throw new Error("Organization Name (org_name) claim must be a string present in the ID token");
					if (e !== t.claims.org_name) throw new Error("Organization Name (org_name) claim mismatch in the ID token; expected \"".concat(e, "\", found \"").concat(t.claims.org_name, "\""));
				}
			}
			return t;
		})({
			iss: this.tokenIssuer,
			aud: this.options.clientId,
			id_token: e,
			nonce: t,
			organization: n,
			leeway: this.options.leeway,
			max_age: (r = this.options.authorizationParams.max_age, "string" != typeof r ? r : parseInt(r, 10) || void 0),
			now: o
		});
		var r;
	}
	_processOrgHint(e) {
		e ? this.cookieStorage.save(this.orgHintCookieName, e, {
			daysUntilExpire: this.sessionCheckExpiryDays,
			cookieDomain: this.options.cookieDomain
		}) : this.cookieStorage.remove(this.orgHintCookieName, { cookieDomain: this.options.cookieDomain });
	}
	_extractSessionTransferToken(e) {
		return new URLSearchParams(window.location.search).get(e) || void 0;
	}
	_clearSessionTransferTokenFromUrl(e) {
		try {
			const t = new URL(window.location.href);
			t.searchParams.has(e) && (t.searchParams.delete(e), window.history.replaceState({}, "", t.toString()));
		} catch (e) {}
	}
	_applySessionTransferToken(e) {
		const t = this.options.sessionTransferTokenQueryParamName;
		if (!t || e.session_transfer_token) return e;
		const n = this._extractSessionTransferToken(t);
		return n ? (this._clearSessionTransferTokenFromUrl(t), Object.assign(Object.assign({}, e), { session_transfer_token: n })) : e;
	}
	async _prepareAuthorizeUrl(e, t, n) {
		var o;
		const r = A(P()), i = A(P()), a = P(), c = j(await I(a)), u = await (null === (o = this.dpop) || void 0 === o ? void 0 : o.calculateThumbprint()), l = ((e, t, n, o, r, i, a, s, c) => Object.assign(Object.assign(Object.assign({ client_id: e.clientId }, e.authorizationParams), n), {
			scope: ge(t, n.scope, n.audience),
			response_type: "code",
			response_mode: s || "query",
			state: o,
			nonce: r,
			redirect_uri: a || e.authorizationParams.redirect_uri,
			code_challenge: i,
			code_challenge_method: "S256",
			dpop_jkt: c
		}))(this.options, this.scope, e, r, i, c, e.redirect_uri || this.options.authorizationParams.redirect_uri || n, null == t ? void 0 : t.response_mode, u), h = this._authorizeUrl(l);
		return {
			nonce: i,
			code_verifier: a,
			scope: l.scope,
			audience: l.audience || d,
			redirect_uri: l.redirect_uri,
			state: r,
			url: h
		};
	}
	async loginWithPopup(e, t) {
		var n;
		if (e = e || {}, !(t = t || {}).popup && (t.popup = (() => {
			const e = window.screenX + (window.innerWidth - 400) / 2, t = window.screenY + (window.innerHeight - 600) / 2;
			return window.open("", "auth0:authorize:popup", "left=".concat(e, ",top=").concat(t, ",width=").concat(400, ",height=").concat(600, ",resizable,scrollbars=yes,status=1"));
		})(), !t.popup)) throw new v();
		const o = this._applySessionTransferToken(e.authorizationParams || {}), r = await this._prepareAuthorizeUrl(o, { response_mode: "web_message" }, window.location.origin);
		t.popup.location.href = r.url;
		const i = await ((e, t) => new Promise((n, o) => {
			let r;
			const i = setInterval(() => {
				e.popup && e.popup.closed && (clearInterval(i), clearTimeout(a), window.removeEventListener("message", r, !1), o(new g(e.popup)));
			}, 1e3), a = setTimeout(() => {
				clearInterval(i), o(new w(e.popup)), window.removeEventListener("message", r, !1);
			}, 1e3 * (e.timeoutInSeconds || 60));
			r = function(s) {
				if (s.origin === t && s.data && "authorization_response" === s.data.type) {
					if (clearTimeout(a), clearInterval(i), window.removeEventListener("message", r, !1), !1 !== e.closePopup && e.popup.close(), s.data.response.error) return o(p.fromPayload(s.data.response));
					n(s.data.response);
				}
			}, window.addEventListener("message", r);
		}))(Object.assign(Object.assign({}, t), { timeoutInSeconds: t.timeoutInSeconds || this.options.authorizeTimeoutInSeconds || 60 }), new URL(r.url).origin);
		if (r.state !== i.state) throw new p("state_mismatch", "Invalid state");
		const a = (null === (n = e.authorizationParams) || void 0 === n ? void 0 : n.organization) || this.options.authorizationParams.organization;
		await this._requestToken({
			audience: r.audience,
			scope: r.scope,
			code_verifier: r.code_verifier,
			grant_type: "authorization_code",
			code: i.code,
			redirect_uri: r.redirect_uri
		}, {
			nonceIn: r.nonce,
			organization: a
		});
	}
	async getUser() {
		var e;
		const t = await this._getIdTokenFromCache();
		return null === (e = null == t ? void 0 : t.decodedToken) || void 0 === e ? void 0 : e.user;
	}
	async getIdTokenClaims() {
		var e;
		const t = await this._getIdTokenFromCache();
		return null === (e = null == t ? void 0 : t.decodedToken) || void 0 === e ? void 0 : e.claims;
	}
	async loginWithRedirect() {
		var e;
		const t = Xe(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), { openUrl: n, fragment: o, appState: r } = t, i = a(t, [
			"openUrl",
			"fragment",
			"appState"
		]), s = (null === (e = i.authorizationParams) || void 0 === e ? void 0 : e.organization) || this.options.authorizationParams.organization, c = this._applySessionTransferToken(i.authorizationParams || {}), u = await this._prepareAuthorizeUrl(c), { url: l } = u, h = a(u, ["url"]);
		this.transactionManager.create(Object.assign(Object.assign(Object.assign({}, h), {
			appState: r,
			response_type: Ne.Code
		}), s && { organization: s }));
		const d = o ? "".concat(l, "#").concat(o) : l;
		n ? await n(d) : window.location.assign(d);
	}
	async handleRedirectCallback() {
		const e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href).split("?").slice(1);
		if (0 === e.length) throw new Error("There are no query params available for parsing.");
		const t = this.transactionManager.get();
		if (!t) throw new p("missing_transaction", "Invalid state");
		this.transactionManager.remove();
		const n = ((e) => {
			e.indexOf("#") > -1 && (e = e.substring(0, e.indexOf("#")));
			const t = new URLSearchParams(e);
			return {
				state: t.get("state"),
				code: t.get("code") || void 0,
				connect_code: t.get("connect_code") || void 0,
				error: t.get("error") || void 0,
				error_description: t.get("error_description") || void 0
			};
		})(e.join(""));
		return t.response_type === Ne.ConnectCode ? this._handleConnectAccountRedirectCallback(n, t) : this._handleLoginRedirectCallback(n, t);
	}
	async _handleLoginRedirectCallback(e, t) {
		const { code: n, state: o, error: r, error_description: i } = e;
		if (r) throw new f(r, i || r, o, t.appState);
		if (!t.code_verifier || t.state && t.state !== o) throw new p("state_mismatch", "Invalid state");
		const a = t.organization, s = t.nonce, c = t.redirect_uri;
		return await this._requestToken(Object.assign({
			audience: t.audience,
			scope: t.scope,
			code_verifier: t.code_verifier,
			grant_type: "authorization_code",
			code: n
		}, c ? { redirect_uri: c } : {}), {
			nonceIn: s,
			organization: a
		}), {
			appState: t.appState,
			response_type: Ne.Code
		};
	}
	async _handleConnectAccountRedirectCallback(e, t) {
		const { connect_code: n, state: o, error: r, error_description: i } = e;
		if (r) throw new m(r, i || r, t.connection, o, t.appState);
		if (!n) throw new p("missing_connect_code", "Missing connect code");
		if (!(t.code_verifier && t.state && t.auth_session && t.redirect_uri && t.state === o)) throw new p("state_mismatch", "Invalid state");
		const a = await this.myAccountApi.completeAccount({
			auth_session: t.auth_session,
			connect_code: n,
			redirect_uri: t.redirect_uri,
			code_verifier: t.code_verifier
		});
		return Object.assign(Object.assign({}, a), {
			appState: t.appState,
			response_type: Ne.ConnectCode
		});
	}
	async checkSession(e) {
		if (!this.cookieStorage.get(this.isAuthenticatedCookieName)) {
			if (!this.cookieStorage.get(Ze)) return;
			this.cookieStorage.save(this.isAuthenticatedCookieName, !0, {
				daysUntilExpire: this.sessionCheckExpiryDays,
				cookieDomain: this.options.cookieDomain
			}), this.cookieStorage.remove(Ze);
		}
		try {
			await this.getTokenSilently(e);
		} catch (e) {}
	}
	async getTokenSilently() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		var t, n;
		const o = Object.assign(Object.assign({ cacheMode: "on" }, e), { authorizationParams: Object.assign(Object.assign(Object.assign({}, this.options.authorizationParams), e.authorizationParams), { scope: ge(this.scope, null === (t = e.authorizationParams) || void 0 === t ? void 0 : t.scope, (null === (n = e.authorizationParams) || void 0 === n ? void 0 : n.audience) || this.options.authorizationParams.audience) }) }), r = await ((e, t) => {
			let n = Je[t];
			return n || (n = e().finally(() => {
				delete Je[t], n = null;
			}), Je[t] = n), n;
		})(() => this._getTokenSilently(o), "".concat(this.options.clientId, "::").concat(o.authorizationParams.audience, "::").concat(o.authorizationParams.scope));
		return e.detailedResponse ? r : null == r ? void 0 : r.access_token;
	}
	async _getTokenSilently(e) {
		const { cacheMode: t } = e, n = a(e, ["cacheMode"]);
		if ("off" !== t) {
			const e = await this._getEntryFromCache({
				scope: n.authorizationParams.scope,
				audience: n.authorizationParams.audience || d,
				clientId: this.options.clientId,
				cacheMode: t
			});
			if (e) return e;
		}
		if ("cache-only" === t) return;
		const o = (r = this.options.clientId, i = n.authorizationParams.audience || "default", "".concat("auth0.lock.getTokenSilently", ".").concat(r, ".").concat(i));
		var r, i;
		try {
			return await this.lockManager.runWithLock(o, 5e3, async () => {
				if ("off" !== t) {
					const e = await this._getEntryFromCache({
						scope: n.authorizationParams.scope,
						audience: n.authorizationParams.audience || d,
						clientId: this.options.clientId
					});
					if (e) return e;
				}
				const { id_token: o, token_type: r, access_token: i, oauthTokenScope: a, expires_in: s } = this.options.useRefreshTokens ? await this._getTokenUsingRefreshToken(n) : await this._getTokenFromIFrame(n);
				return Object.assign(Object.assign({
					id_token: o,
					token_type: r,
					access_token: i
				}, a ? { scope: a } : null), { expires_in: s });
			});
		} catch (e) {
			if (this._isInteractiveError(e) && "popup" === this.options.interactiveErrorHandler) return await this._handleInteractiveErrorWithPopup(n);
			throw e;
		}
	}
	_isInteractiveError(e) {
		return e instanceof b || e instanceof p && this._isIframeMfaError(e);
	}
	_isIframeMfaError(e) {
		return "login_required" === e.error && "Multifactor authentication required" === e.error_description;
	}
	async _handleInteractiveErrorWithPopup(e) {
		try {
			await this.loginWithPopup({ authorizationParams: e.authorizationParams });
			const t = await this._getEntryFromCache({
				scope: e.authorizationParams.scope,
				audience: e.authorizationParams.audience || d,
				clientId: this.options.clientId
			});
			if (!t) throw new p("interactive_handler_cache_miss", "Token not found in cache after interactive authentication");
			return t;
		} catch (e) {
			throw e;
		}
	}
	async getTokenWithPopup() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
		var n, o;
		const r = Object.assign(Object.assign({}, e), { authorizationParams: Object.assign(Object.assign(Object.assign({}, this.options.authorizationParams), e.authorizationParams), { scope: ge(this.scope, null === (n = e.authorizationParams) || void 0 === n ? void 0 : n.scope, (null === (o = e.authorizationParams) || void 0 === o ? void 0 : o.audience) || this.options.authorizationParams.audience) }) });
		return t = Object.assign(Object.assign({}, s), t), await this.loginWithPopup(r, t), (await this.cacheManager.get(new _e({
			scope: r.authorizationParams.scope,
			audience: r.authorizationParams.audience || d,
			clientId: this.options.clientId
		}), void 0, this.options.useMrrt)).access_token;
	}
	async isAuthenticated() {
		return !!await this.getUser();
	}
	_buildLogoutUrl(e) {
		null !== e.clientId ? e.clientId = e.clientId || this.options.clientId : delete e.clientId;
		const t = e.logoutParams || {}, { federated: n } = t, o = a(t, ["federated"]), r = n ? "&federated" : "";
		return this._url("/v2/logout?".concat(O(Object.assign({ clientId: e.clientId }, o)))) + r;
	}
	async revokeRefreshToken() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		if (!this.options.useRefreshTokens) return;
		const t = e.audience || this.options.authorizationParams.audience || d, n = await this.cacheManager.getRefreshTokensByAudience(t, this.options.clientId);
		await async function(e, t) {
			let { baseUrl: n, timeout: o, auth0Client: r, useFormData: i, refreshTokens: a, audience: s, client_id: u, onRefreshTokenRevoked: h } = e;
			const f = o || c, m = "refresh_token", y = "".concat(n, "/oauth/revoke"), w = {
				"Content-Type": i ? "application/x-www-form-urlencoded" : "application/json",
				"Auth0-Client": btoa(JSON.stringify(R(r || l)))
			};
			if (t) {
				const n = {
					client_id: u,
					token_type_hint: m
				}, o = i ? O(n) : JSON.stringify(n);
				try {
					return await de({
						type: "revoke",
						timeout: f,
						fetchUrl: y,
						fetchOptions: {
							method: "POST",
							body: o,
							headers: w
						},
						useFormData: i,
						auth: { audience: null != s ? s : d }
					}, t);
				} catch (e) {
					throw new p("revoke_error", e.message);
				}
			}
			for (const t of a) {
				const n = {
					client_id: u,
					token_type_hint: m,
					token: t
				}, r = await pe(y, {
					method: "POST",
					body: i ? O(n) : JSON.stringify(n),
					headers: w
				}, f);
				if (!r.ok) {
					let t, n;
					try {
						({error: t, error_description: n} = JSON.parse(await r.text()));
					} catch (e) {}
					throw new p(t || "revoke_error", n || "HTTP error ".concat(r.status));
				}
				await (null == h ? void 0 : h(t));
			}
		}({
			baseUrl: this.domainUrl,
			timeout: this.httpTimeoutMs,
			auth0Client: this.options.auth0Client,
			useFormData: this.options.useFormData,
			client_id: this.options.clientId,
			refreshTokens: n,
			audience: t,
			onRefreshTokenRevoked: (e) => this.cacheManager.stripRefreshToken(e)
		}, this.worker);
	}
	async logout() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		var t;
		const n = Xe(e), { openUrl: o } = n, r = a(n, ["openUrl"]);
		if (null === e.clientId ? await this.cacheManager.clear() : await this.cacheManager.clear(e.clientId || this.options.clientId), this.cookieStorage.remove(this.orgHintCookieName, { cookieDomain: this.options.cookieDomain }), this.cookieStorage.remove(this.isAuthenticatedCookieName, { cookieDomain: this.options.cookieDomain }), this.userCache.remove(be), await (null === (t = this.dpop) || void 0 === t ? void 0 : t.clear()), this.worker) try {
			await de({ type: "clear" }, this.worker);
		} catch (e) {}
		const i = this._buildLogoutUrl(r);
		o ? await o(i) : !1 !== o && window.location.assign(i);
	}
	async _getTokenFromIFrame(e) {
		const t = (n = this.options.clientId, "".concat("auth0.lock.getTokenFromIFrame", ".").concat(n));
		var n;
		try {
			return await this.lockManager.runWithLock(t, 5e3, async () => {
				const t = Object.assign(Object.assign({}, e.authorizationParams), { prompt: "none" }), n = this.cookieStorage.get(this.orgHintCookieName);
				n && !t.organization && (t.organization = n);
				const { url: o, state: r, nonce: i, code_verifier: a, redirect_uri: s, scope: c, audience: u } = await this._prepareAuthorizeUrl(t, { response_mode: "web_message" }, window.location.origin);
				if (window.crossOriginIsolated) throw new p("login_required", "The application is running in a Cross-Origin Isolated context, silently retrieving a token without refresh token is not possible.");
				const l = e.timeoutInSeconds || this.options.authorizeTimeoutInSeconds;
				let h;
				try {
					h = new URL(this.domainUrl).origin;
				} catch (e) {
					h = this.domainUrl;
				}
				const d = await function(e, t) {
					let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 60;
					return new Promise((o, r) => {
						const i = window.document.createElement("iframe");
						i.setAttribute("width", "0"), i.setAttribute("height", "0"), i.style.display = "none";
						const a = () => {
							window.document.body.contains(i) && (window.document.body.removeChild(i), window.removeEventListener("message", s, !1));
						};
						let s;
						const c = setTimeout(() => {
							r(new y()), a();
						}, 1e3 * n);
						s = function(e) {
							if (e.origin != t) return;
							if (!e.data || "authorization_response" !== e.data.type) return;
							const n = e.source;
							n && n.close(), e.data.response.error ? r(p.fromPayload(e.data.response)) : o(e.data.response), clearTimeout(c), window.removeEventListener("message", s, !1), setTimeout(a, 2e3);
						}, window.addEventListener("message", s, !1), window.document.body.appendChild(i), i.setAttribute("src", e);
					});
				}(o, h, l);
				if (r !== d.state) throw new p("state_mismatch", "Invalid state");
				const f = await this._requestToken(Object.assign(Object.assign({}, e.authorizationParams), {
					code_verifier: a,
					code: d.code,
					grant_type: "authorization_code",
					redirect_uri: s,
					timeout: e.authorizationParams.timeout || this.httpTimeoutMs
				}), {
					nonceIn: i,
					organization: t.organization
				});
				return Object.assign(Object.assign({}, f), {
					scope: c,
					oauthTokenScope: f.scope,
					audience: u
				});
			});
		} catch (e) {
			throw "login_required" === e.error && (e instanceof p && this._isIframeMfaError(e) && "popup" === this.options.interactiveErrorHandler || this.logout({ openUrl: !1 })), e;
		}
	}
	async _getTokenUsingRefreshToken(e) {
		var t, n;
		const o = await this.cacheManager.get(new _e({
			scope: e.authorizationParams.scope,
			audience: e.authorizationParams.audience || d,
			clientId: this.options.clientId
		}), void 0, this.options.useMrrt);
		if (!(o && o.refresh_token || this.worker)) {
			if (this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e);
			throw new _(e.authorizationParams.audience || d, e.authorizationParams.scope);
		}
		const r = e.authorizationParams.redirect_uri || this.options.authorizationParams.redirect_uri || window.location.origin, i = "number" == typeof e.timeoutInSeconds ? 1e3 * e.timeoutInSeconds : null, a = ((e, t, n, o) => {
			var r;
			if (e && n && o) {
				if (t.audience !== n) return t.scope;
				const e = o.split(" "), i = (null === (r = t.scope) || void 0 === r ? void 0 : r.split(" ")) || [], a = i.every((t) => e.includes(t));
				return e.length >= i.length && a ? o : t.scope;
			}
			return t.scope;
		})(this.options.useMrrt, e.authorizationParams, null == o ? void 0 : o.audience, null == o ? void 0 : o.scope);
		try {
			const t = await this._requestToken(Object.assign(Object.assign(Object.assign({}, e.authorizationParams), {
				grant_type: "refresh_token",
				refresh_token: o && o.refresh_token,
				redirect_uri: r
			}), i && { timeout: i }), { scopesToRequest: a });
			if (t.refresh_token && null != o && o.refresh_token && await this.cacheManager.updateEntry(o.refresh_token, t.refresh_token), this.options.useMrrt && !(s = null == o ? void 0 : o.audience, c = null == o ? void 0 : o.scope, u = e.authorizationParams.audience, l = e.authorizationParams.scope, s === u && Ge(l, c) || Ge(a, t.scope))) {
				if (this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e);
				await this.cacheManager.remove(this.options.clientId, e.authorizationParams.audience, e.authorizationParams.scope);
				const n = ((e, t) => {
					const n = (null == e ? void 0 : e.split(" ")) || [], o = (null == t ? void 0 : t.split(" ")) || [];
					return n.filter((e) => -1 == o.indexOf(e)).join(",");
				})(a, t.scope);
				throw new k(e.authorizationParams.audience || "default", n);
			}
			return Object.assign(Object.assign({}, t), {
				scope: e.authorizationParams.scope,
				oauthTokenScope: t.scope,
				audience: e.authorizationParams.audience || d
			});
		} catch (o) {
			if (o.message) {
				if (o.message.includes("user is blocked")) throw await this.logout({ openUrl: !1 }), o;
				if ((o.message.includes("Missing Refresh Token") || o.message.includes("invalid refresh token")) && this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e);
			}
			throw o instanceof b && this.mfa.setMFAAuthDetails(o.mfa_token, null === (t = e.authorizationParams) || void 0 === t ? void 0 : t.scope, null === (n = e.authorizationParams) || void 0 === n ? void 0 : n.audience, o.mfa_requirements), o;
		}
		var s, c, u, l;
	}
	async _saveEntryInCache(e) {
		const { id_token: t, decodedToken: n } = e, o = a(e, ["id_token", "decodedToken"]);
		this.userCache.set(be, {
			id_token: t,
			decodedToken: n
		}), await this.cacheManager.setIdToken(this.options.clientId, e.id_token, e.decodedToken), await this.cacheManager.set(o);
	}
	async _getIdTokenFromCache() {
		const e = this.options.authorizationParams.audience || d, t = this.scope[e], n = await this.cacheManager.getIdToken(new _e({
			clientId: this.options.clientId,
			audience: e,
			scope: t
		})), o = this.userCache.get(be);
		return n && n.id_token === (null == o ? void 0 : o.id_token) ? o : (this.userCache.set(be, n), n);
	}
	async _getEntryFromCache(e) {
		let { scope: t, audience: n, clientId: o, cacheMode: r } = e;
		const i = await this.cacheManager.get(new _e({
			scope: t,
			audience: n,
			clientId: o
		}), 60, this.options.useMrrt, r);
		if (i && i.access_token) {
			const { token_type: e, access_token: t, oauthTokenScope: n, expires_in: o } = i, r = await this._getIdTokenFromCache();
			return r && Object.assign(Object.assign({
				id_token: r.id_token,
				token_type: e || "Bearer",
				access_token: t
			}, n ? { scope: n } : null), { expires_in: o });
		}
	}
	async _requestToken(e, t) {
		var n, o;
		const { nonceIn: r, organization: i, scopesToRequest: a } = t || {}, s = await ye(Object.assign(Object.assign({
			baseUrl: this.domainUrl,
			client_id: this.options.clientId,
			auth0Client: this.options.auth0Client,
			useFormData: this.options.useFormData,
			timeout: this.httpTimeoutMs,
			useMrrt: this.options.useMrrt,
			dpop: this.dpop
		}, e), { scope: a || e.scope }), this.worker), c = await this._verifyIdToken(s.id_token, r, i);
		if ("authorization_code" === e.grant_type) {
			const e = await this._getIdTokenFromCache();
			!(null === (o = null === (n = null == e ? void 0 : e.decodedToken) || void 0 === n ? void 0 : n.claims) || void 0 === o) && o.sub && e.decodedToken.claims.sub !== c.claims.sub && (await this.cacheManager.clear(this.options.clientId), this.userCache.remove(be));
		}
		return await this._saveEntryInCache(Object.assign(Object.assign(Object.assign(Object.assign({}, s), {
			decodedToken: c,
			scope: e.scope,
			audience: e.audience || d
		}), s.scope ? { oauthTokenScope: s.scope } : null), { client_id: this.options.clientId })), this.cookieStorage.save(this.isAuthenticatedCookieName, !0, {
			daysUntilExpire: this.sessionCheckExpiryDays,
			cookieDomain: this.options.cookieDomain
		}), this._processOrgHint(i || c.claims.org_id), Object.assign(Object.assign({}, s), { decodedToken: c });
	}
	async loginWithCustomTokenExchange(e) {
		return this._requestToken(Object.assign(Object.assign({}, e), {
			grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
			subject_token: e.subject_token,
			subject_token_type: e.subject_token_type,
			scope: ge(this.scope, e.scope, e.audience || this.options.authorizationParams.audience),
			audience: e.audience || this.options.authorizationParams.audience,
			organization: e.organization || this.options.authorizationParams.organization
		}));
	}
	async exchangeToken(e) {
		return this.loginWithCustomTokenExchange(e);
	}
	_assertDpop(e) {
		if (!e) throw new Error("`useDpop` option must be enabled before using DPoP.");
	}
	getDpopNonce(e) {
		return this._assertDpop(this.dpop), this.dpop.getNonce(e);
	}
	setDpopNonce(e, t) {
		return this._assertDpop(this.dpop), this.dpop.setNonce(e, t);
	}
	generateDpopProof(e) {
		return this._assertDpop(this.dpop), this.dpop.generateProof(e);
	}
	createFetcher() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		return new $e(e, {
			isDpopEnabled: () => !!this.options.useDpop,
			getAccessToken: (e) => {
				var t;
				return this.getTokenSilently({
					authorizationParams: {
						scope: null === (t = null == e ? void 0 : e.scope) || void 0 === t ? void 0 : t.join(" "),
						audience: null == e ? void 0 : e.audience
					},
					detailedResponse: !0
				});
			},
			getDpopNonce: () => this.getDpopNonce(e.dpopNonceId),
			setDpopNonce: (t) => this.setDpopNonce(t, e.dpopNonceId),
			generateDpopProof: (e) => this.generateDpopProof(e)
		});
	}
	async connectAccountWithRedirect(e) {
		const { openUrl: t, appState: n, connection: o, scopes: r, authorization_params: i, redirectUri: a = this.options.authorizationParams.redirect_uri || window.location.origin } = e;
		if (!o) throw new Error("connection is required");
		const s = A(P()), c = P(), l = j(await I(c)), { connect_uri: h, connect_params: d, auth_session: p } = await this.myAccountApi.connectAccount({
			connection: o,
			scopes: r,
			redirect_uri: a,
			state: s,
			code_challenge: l,
			code_challenge_method: "S256",
			authorization_params: i
		});
		this.transactionManager.create({
			state: s,
			code_verifier: c,
			auth_session: p,
			redirect_uri: a,
			appState: n,
			connection: o,
			response_type: Ne.ConnectCode
		});
		const f = new URL(h);
		f.searchParams.set("ticket", d.ticket), t ? await t(f.toString()) : window.location.assign(f);
	}
	async _requestTokenForMfa(e, t) {
		const { mfaToken: n } = e, o = a(e, ["mfaToken"]);
		return this._requestToken(Object.assign(Object.assign({}, o), { mfa_token: n }), t);
	}
};
function la(t) {
	return new Promise((n) => {
		(function(t, n) {
			const o = watchEffect(() => {
				t() && (n(), o());
			});
		})(t, n);
	});
}
function ha(e) {
	null != e && e.redirect_uri && (console.warn("Using `redirect_uri` has been deprecated, please use `authorizationParams.redirect_uri` instead as `redirectUri` will be no longer supported in a future version"), e.authorizationParams = e.authorizationParams || {}, e.authorizationParams.redirect_uri = e.redirect_uri, delete e.redirect_uri);
}
var da = () => {
	console.error("Please ensure Auth0's Vue plugin is correctly installed.");
}, pa = {
	isLoading: ref(!1),
	isAuthenticated: ref(!1),
	user: ref(void 0),
	idTokenClaims: ref(void 0),
	error: ref(null),
	loginWithPopup: da,
	loginWithRedirect: da,
	loginWithCustomTokenExchange: da,
	getAccessTokenSilently: da,
	getAccessTokenWithPopup: da,
	logout: da,
	checkSession: da,
	handleRedirectCallback: da,
	getDpopNonce: da,
	setDpopNonce: da,
	generateDpopProof: da,
	createFetcher: da,
	mfa: {
		setMFAAuthDetails: da,
		getAuthenticators: da,
		enroll: da,
		challenge: da,
		verify: da,
		getEnrollmentFactors: da
	}
}, fa = ref(pa);
var ma = class {
	constructor(e, n) {
		var o, r;
		this.clientOptions = e, this.pluginOptions = n, this.isLoading = ref(!0), this.isAuthenticated = ref(!1), this.user = ref({}), this.idTokenClaims = ref(), this.error = ref(null), this.mfa = pa.mfa, o = this, r = ["constructor"], Object.getOwnPropertyNames(Object.getPrototypeOf(o)).filter((e) => !r.includes(e)).forEach((e) => o[e] = o[e].bind(o));
	}
	install(e) {
		this._client = new ua(Object.assign(Object.assign({}, this.clientOptions), { auth0Client: {
			name: "auth0-vue",
			version: "2.3.1"
		} })), this.mfa = this._client.mfa, this.__checkSession(e.config.globalProperties.$router), e.config.globalProperties[r] = this, e.provide(i, this), fa.value = this;
	}
	async loginWithRedirect(e) {
		return ha(e), this._client.loginWithRedirect(e);
	}
	async loginWithPopup(e, t) {
		return ha(e), this.__proxy(() => this._client.loginWithPopup(e, t));
	}
	async logout(e) {
		return (null == e ? void 0 : e.openUrl) || !1 === (null == e ? void 0 : e.openUrl) ? this.__proxy(() => this._client.logout(e)) : this._client.logout(e);
	}
	async getAccessTokenSilently(e = {}) {
		return ha(e), this.__proxy(() => this._client.getTokenSilently(e));
	}
	async getAccessTokenWithPopup(e, t) {
		return ha(e), this.__proxy(() => this._client.getTokenWithPopup(e, t));
	}
	async loginWithCustomTokenExchange(e) {
		return this.__proxy(() => this._client.loginWithCustomTokenExchange(e));
	}
	async checkSession(e) {
		return this.__proxy(() => this._client.checkSession(e));
	}
	async handleRedirectCallback(e) {
		return this.__proxy(() => this._client.handleRedirectCallback(e));
	}
	async getDpopNonce(e) {
		return this.__proxy(() => this._client.getDpopNonce(e));
	}
	async setDpopNonce(e, t) {
		return this.__proxy(() => this._client.setDpopNonce(e, t));
	}
	async generateDpopProof(e) {
		return this.__proxy(() => this._client.generateDpopProof(e));
	}
	createFetcher(e) {
		return this._client.createFetcher(e);
	}
	async __checkSession(e) {
		var t, n;
		const o = window.location.search;
		try {
			if ((o.includes("code=") || o.includes("error=")) && o.includes("state=") && !(null === (t = this.pluginOptions) || void 0 === t ? void 0 : t.skipRedirectCallback)) {
				const t = await this.handleRedirectCallback(), n = null == t ? void 0 : t.appState, o = null == n ? void 0 : n.target, r = null != o ? o : "/";
				return e ? (window.history.replaceState({}, "", window.location.pathname), e.push(r)) : window.history.replaceState({}, "", null != o ? o : window.location.pathname), t;
			}
			await this.checkSession();
		} catch (t) {
			window.history.replaceState({}, "", "/"), e && e.push((null === (n = this.pluginOptions) || void 0 === n ? void 0 : n.errorPath) || "/");
		}
	}
	async __refreshState() {
		this.isAuthenticated.value = await this._client.isAuthenticated(), this.user.value = await this._client.getUser(), this.idTokenClaims.value = await this._client.getIdTokenClaims(), this.isLoading.value = !1;
	}
	async __proxy(e, t = !0) {
		let n;
		try {
			n = await e(), this.error.value = null;
		} catch (e) {
			throw this.error.value = e, e;
		} finally {
			t && await this.__refreshState();
		}
		return n;
	}
};
async function ya(e, t, o) {
	const r = async () => !!unref(e.isAuthenticated) || (await e.loginWithRedirect(Object.assign(Object.assign({}, o), { appState: Object.assign({ target: t.fullPath }, null == o ? void 0 : o.appState) })), !1);
	return unref(e.isLoading) ? (await la(() => !unref(e.isLoading)), r()) : r();
}
function wa(e) {
	const { app: t, redirectLoginOptions: o } = !e || "config" in e ? {
		app: e,
		redirectLoginOptions: void 0
	} : e;
	return async (e) => ya(t ? t.config.globalProperties[r] : unref(fa), e, o);
}
async function ga(e) {
	return ya(unref(fa), e);
}
function va(e, t) {
	return ha(e), new ma(e, t);
}
function ba() {
	return inject(i);
}
//#endregion
export { i as AUTH0_INJECTION_KEY, ma as Auth0Plugin, Se as InMemoryCache, ke as LocalStorageCache, ra as MfaChallengeError, oa as MfaEnrollmentError, aa as MfaEnrollmentFactorsError, ta as MfaError, na as MfaListAuthenticatorsError, b as MfaRequiredError, ia as MfaVerifyError, S as UseDpopNonceError, Le as User, ga as authGuard, va as createAuth0, wa as createAuthGuard, ba as useAuth0 };

//# sourceMappingURL=@auth0_auth0-vue.js.map