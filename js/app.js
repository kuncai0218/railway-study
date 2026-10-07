/* \u5341\u7c73\u89c6\u754c\uff1a\u5e94\u7528\u903b\u8f91\uff08\u8def\u7531\u3001\u8fdb\u5ea6\u3001\u590d\u4e60\u3001\u6d4b\u9a8c\u3001\u7b14\u8bb0\u3001\u756a\u8304\u949f\u3001\u52a9\u6559\u3001\u540c\u6b65\uff09\u3002 */
(function () {
  'use strict';
  var T = window.TENM;

  /* ================= \u5de5\u5177 ================= */
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function now() { return Date.now(); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function today() { return ymd(new Date()); }
  function addDays(s, n) { var p = s.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() + n); return ymd(d); }
  function diffDays(a, b) { var pa = a.split('-'), pb = b.split('-'); return Math.round((Date.UTC(+pb[0], +pb[1] - 1, +pb[2]) - Date.UTC(+pa[0], +pa[1] - 1, +pa[2])) / 86400000); }
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function strip(html) { var d = document.createElement('div'); d.innerHTML = html || ''; $$('script,style,.demo', d).forEach(function (e) { e.remove(); }); return (d.textContent || '').replace(/\s+/g, ' ').trim(); }
  function fmtMin(m) { var h = Math.floor(m / 60), mm = m % 60; return h ? (h + ' \u5c0f\u65f6' + (mm ? ' ' + mm + ' \u5206' : '')) : (mm + ' \u5206\u949f'); }
  function clock(min) { var h = Math.floor(min / 60) % 24, m = min % 60; return pad2(h) + ':' + pad2(m); }
  function debounce(fn, ms) { var t; return function () { var a = arguments, s = this; clearTimeout(t); t = setTimeout(function () { fn.apply(s, a); }, ms); }; }
  var ICON = {
    today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    course: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    papers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4M10 12h6M10 16h6"/><path d="M4 6v15h12"/></svg>',
    review: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/><path d="M12 8v4l3 2"/></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3h11l3 3v15H5z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    method: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l9 5-9 5-9-5z"/><path d="M6 10.5V16c2 2 10 2 12 0v-5.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5 9-10"/></svg>',
    flame: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c4 0 7-2.7 7-7 0-3.5-2.3-5.6-3.6-7.4-.6 1.7-1.6 2.7-2.7 3.1C13 7 11.5 4.2 9 2c0 3.5-4 6.5-4 12 0 4.3 3 8 7 8z"/></svg>'
  };

  /* ================= \u5185\u5bb9\u7d22\u5f15 ================= */
  var NDAY = 7, DAYMIN = 480;
  function dayOf(n) { return T.days[n - 1]; }
  function lessonsOf(n) { var d = dayOf(n); return d ? d.lessons : []; }
  function allLessons() { var a = []; T.days.forEach(function (d) { if (d) a = a.concat(d.lessons); }); return a; }
  function paper(id) { return T.papers[id]; }
  function qKey(owner, i) { return owner + '#q' + i; }
  function qOwner(key) { return key.split('#q')[0]; }
  function getQ(key) { var p = key.split('#q'), o = p[0], i = +p[1]; var L = T.lessons[o]; if (L && L.quiz) return L.quiz[i]; var P = T.papers[o]; if (P && P.q) return P.q[i]; return null; }
  function ownerTitle(o) { var L = T.lessons[o]; if (L) return 'D' + L.day + ' \u00b7 ' + L.title; var P = T.papers[o]; return P ? '\u8bba\u6587 \u00b7 ' + P.short : ''; }
  function dayPaperIds(n) { var d = dayOf(n), ids = []; if (!d) return ids; d.plan.forEach(function (b) { if (b.k === 'paper' && paper(b.id)) ids.push(b.id); }); return ids; }
  function dayPool(n) {
    var keys = [];
    lessonsOf(n).forEach(function (L) { (L.quiz || []).forEach(function (q, i) { keys.push(qKey(L.id, i)); }); });
    dayPaperIds(n).forEach(function (id) { (paper(id).q || []).forEach(function (q, i) { keys.push(qKey(id, i)); }); });
    return keys;
  }
  var TIERN = { A: 'A \u7c7b\u00b7\u7cbe\u8bfb', B: 'B \u7c7b\u00b7\u9009\u8bfb', C: 'C \u7c7b\u00b7\u901f\u89c8', K: '\u7ecf\u5178\u00b7\u901f\u89c8' };
  var TARGET = { A: 2, B: 2, C: 1, K: 1 };
  function tgt(P) { return P.target || TARGET[P.tier] || 1; }
  var TOPIC = { base: '\u5f71\u50cf\u57fa\u7840', dl: '\u6df1\u5ea6\u5b66\u4e60', seg: '\u8bed\u4e49\u5206\u5272', fm: '\u57fa\u7840\u6a21\u578b', cd: '\u53d8\u5316\u68c0\u6d4b', trad: '\u4f20\u7edf\u4e0e\u65f6\u5e8f', pseudo: '\u4f2a\u53d8\u5316\u4e0e\u914d\u51c6', water: '\u6cb3\u6d41\u6c34\u4f53', hazard: '\u5c71\u533a\u707e\u5bb3', eval: '\u8bc4\u4ef7\u8bbe\u8ba1', fusion: '\u591a\u6e90\u878d\u5408', learn: '\u5b66\u4e60\u65b9\u6cd5' };

  /* ================= \u72b6\u6001\u4e0e\u5b58\u50a8 ================= */
  var LS = 'tenm.v1.state', LSN = 'tenm.v1.notes', LSU = 'tenm.v1.ui', LSP = 'tenm.v1.pomo';
  function blankS() { return { v: 1, start: null, set: { dayStart: '09:00', pomo: '50/10' }, setT: 0, les: {}, q: {}, cards: {}, pap: {}, boss: {}, pre: {}, act: {}, blk: {}, upd: 0 }; }
  function blankN() { return { les: {}, pap: {}, day: {}, upd: 0 }; }
  var S = blankS(), N = blankN();
  function lsGet(k) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* \u79c1\u5bc6\u7a97\u53e3\u7b49\u60c5\u51b5\u4e0b\u5ffd\u7565 */ } }
  function fixS(o) { var b = blankS(); if (!o || typeof o !== 'object') return b; for (var k in b) if (o[k] == null) o[k] = b[k]; if (!o.set.dayStart) o.set.dayStart = '09:00'; if (!o.set.pomo) o.set.pomo = '50/10'; return o; }
  function fixN(o) { var b = blankN(); if (!o || typeof o !== 'object') return b; for (var k in b) if (o[k] == null) o[k] = b[k]; return o; }
  function newer(a, b) { if (!a) return b; if (!b) return a; return (b.t || 0) > (a.t || 0) ? b : a; }
  function mergeMap(a, b, fn) { var o = {}, k; a = a || {}; b = b || {}; for (k in a) o[k] = a[k]; for (k in b) o[k] = (k in o) ? fn(o[k], b[k]) : b[k]; return o; }
  function mergeS(a, b) {
    a = fixS(a); b = fixS(b);
    var o = blankS();
    o.start = a.start && b.start ? (a.start < b.start ? a.start : b.start) : (a.start || b.start);
    if ((b.setT || 0) > (a.setT || 0)) { o.set = b.set; o.setT = b.setT; } else { o.set = a.set; o.setT = a.setT || 0; }
    if (b.startT && (b.startT > (a.startT || 0))) { o.start = b.start; o.startT = b.startT; } else if (a.startT) { o.start = a.start; o.startT = a.startT; }
    o.les = mergeMap(a.les, b.les, newer);
    o.q = mergeMap(a.q, b.q, newer);
    o.cards = mergeMap(a.cards, b.cards, newer);
    o.pap = mergeMap(a.pap, b.pap, newer);
    o.boss = mergeMap(a.boss, b.boss, function (x, y) { return (y.best || 0) > (x.best || 0) ? y : x; });
    o.pre = mergeMap(a.pre, b.pre, function (x, y) { return (x.t || 0) <= (y.t || 0) ? x : y; });
    o.act = mergeMap(a.act, b.act, function (x, y) { return { pomo: Math.max(x.pomo || 0, y.pomo || 0), t: Math.max(x.t || 0, y.t || 0) }; });
    o.blk = mergeMap(a.blk, b.blk, newer);
    o.upd = Math.max(a.upd || 0, b.upd || 0);
    return o;
  }
  function mergeN(a, b) {
    a = fixN(a); b = fixN(b);
    return { les: mergeMap(a.les, b.les, newer), pap: mergeMap(a.pap, b.pap, newer), day: mergeMap(a.day, b.day, newer), upd: Math.max(a.upd || 0, b.upd || 0) };
  }

  /* ---- \u4e91\u7aef\uff08claude.ai \u7684 db \u80fd\u529b\uff09\uff1a\u6bcf\u4eba\u4e00\u4efd\u79c1\u6709\u8fdb\u5ea6\uff0c\u624b\u673a\u7535\u8111\u540c\u6b65 ---- */
  var DB = { ok: false, db: null, uid: null, chain: Promise.resolve(), last: {}, status: 'local' };
  function setSync(st, msg) {
    DB.status = st;
    var el = $('#sync'); if (!el) return;
    var map = { local: ['off', '\u4ec5\u672c\u673a'], syncing: ['busy', '\u540c\u6b65\u4e2d'], synced: ['ok', '\u5df2\u540c\u6b65'], ro: ['off', '\u4ec5\u672c\u673a'], err: ['busy', '\u5f85\u91cd\u8bd5'] };
    var m = map[st] || map.local;
    el.innerHTML = '<i class="dot ' + m[0] + '"></i><span>' + m[1] + '</span>';
    el.title = msg || (st === 'synced' ? '\u8fdb\u5ea6\u4fdd\u5b58\u5728\u4f60\u7684 Claude \u8d26\u53f7\u91cc\uff0c\u624b\u673a\u548c\u7535\u8111\u6253\u5f00\u540c\u4e00\u4e2a\u94fe\u63a5\u4f1a\u81ea\u52a8\u540c\u6b65' : '\u8fdb\u5ea6\u53ea\u4fdd\u5b58\u5728\u8fd9\u4e2a\u6d4f\u89c8\u5668\u91cc\u3002\u767b\u5f55 Claude \u540e\u6253\u5f00\u540c\u4e00\u94fe\u63a5\u53ef\u8de8\u8bbe\u5907\u540c\u6b65\uff1b\u4e5f\u53ef\u4ee5\u5728\u300c\u65b9\u6cd5\u00b7\u8bbe\u7f6e\u300d\u91cc\u5bfc\u51fa\u5907\u4efd');
  }
  function noteDocs() {
    var docs = { notes_misc: { pap: N.pap, day: N.day, upd: N.upd } };
    for (var n = 1; n <= NDAY; n++) {
      var part = {};
      lessonsOf(n).forEach(function (L) { if (N.les[L.id]) part[L.id] = N.les[L.id]; });
      docs['notes_d' + n] = { les: part };
    }
    return docs;
  }
  function dref(name) { return DB.db.doc('data/users/' + DB.uid + '/' + name); }
  async function pullRemote() {
    if (!DB.ok) return;
    setSync('syncing');
    try {
      var snap = await dref('progress').get();
      var rs = snap.exists ? snap.data() : null;
      var rn = blankN();
      var ms = await dref('notes_misc').get();
      if (ms.exists) { var md = ms.data(); rn.pap = md.pap || {}; rn.day = md.day || {}; rn.upd = md.upd || 0; }
      for (var n = 1; n <= NDAY; n++) {
        var ds = await dref('notes_d' + n).get();
        if (ds.exists) { var dd = ds.data(); var l = dd.les || {}; for (var k in l) rn.les[k] = l[k]; }
      }
      if (rs) DB.last.progress = JSON.stringify(rs);
      if (ms.exists) DB.last.notes_misc = JSON.stringify(ms.data());
      S = rs ? mergeS(S, JSON.parse(JSON.stringify(rs))) : S;
      N = mergeN(N, rn);
      lsSet(LS, S); lsSet(LSN, N);
      await pushRemote();
      setSync('synced');
      render(true);
    } catch (e) { handleDbErr(e); }
  }
  function handleDbErr(e) {
    var c = e && e.code;
    if (c === 'invalid_argument' || c === 'not_granted' || c === 'revoked' || c === 'capability_disabled' || c === 'capability_removed') { DB.ok = false; setSync('ro', '\u8fd9\u4e2a\u94fe\u63a5\u5bf9\u4f60\u662f\u53ea\u8bfb\u7684\uff0c\u8fdb\u5ea6\u53ea\u4fdd\u5b58\u5728\u672c\u673a\u6d4f\u89c8\u5668\u91cc'); }
    else if (c === 'quota_exceeded') { setSync('err', '\u4e91\u7aef\u7a7a\u95f4\u5df2\u6ee1\uff0c\u8fdb\u5ea6\u6682\u5b58\u672c\u673a'); toast('\u4e91\u7aef\u7a7a\u95f4\u5df2\u6ee1\uff0c\u8fdb\u5ea6\u5148\u4fdd\u5b58\u5728\u672c\u673a'); }
    else setSync('err', '\u7f51\u7edc\u6216\u5e73\u53f0\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u7a0d\u540e\u4f1a\u518d\u8bd5');
  }
  function pushRemote() {
    if (!DB.ok) return Promise.resolve();
    DB.chain = DB.chain.then(async function () {
      var docs = noteDocs(); docs.progress = S;
      for (var name in docs) {
        var js = JSON.stringify(docs[name]);
        if (DB.last[name] === js) continue;
        if (name.indexOf('notes_d') === 0 && js === '{"les":{}}' && !DB.last[name]) continue;
        try { await dref(name).set(JSON.parse(js)); DB.last[name] = js; }
        catch (e) { if (e && e.code === 'unavailable') { await new Promise(function (r) { setTimeout(r, 800 + Math.random() * 800); }); try { await dref(name).set(JSON.parse(js)); DB.last[name] = js; } catch (e2) { handleDbErr(e2); return; } } else { handleDbErr(e); return; } }
      }
      if (DB.ok) setSync('synced');
    }).catch(function () { });
    return DB.chain;
  }
  var pushSoon = debounce(function () { pushRemote(); }, 1500);
  function save() { S.upd = now(); lsSet(LS, S); pushSoon(); }
  function saveN() { N.upd = now(); lsSet(LSN, N); pushSoon(); }
  async function initDb() {
    if (!window.claude || !window.claude.use) { setSync('local', '\u8fdb\u5ea6\u53ea\u4fdd\u5b58\u5728\u8fd9\u4e2a\u6d4f\u89c8\u5668\u91cc\uff0c\u53ef\u4ee5\u5728\u300c\u65b9\u6cd5\u00b7\u8bbe\u7f6e\u300d\u91cc\u5bfc\u51fa\u5907\u4efd'); return; }
    try {
      var user = await window.claude.use('user');
      var db = await window.claude.use('db');
      if (!db || !user) { setSync('local'); return; }
      var uid = await user.id();
      if (!uid) { setSync('local'); return; }
      DB.db = db; DB.uid = uid; DB.ok = true;
      await pullRemote();
      document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && DB.ok) pullRemote(); });
    } catch (e) { setSync('local'); }
  }

  /* ================= \u8fdb\u5ea6\u5224\u65ad ================= */
  function touch() { var d = today(); var a = S.act[d] || { pomo: 0, t: 0 }; a.t = now(); S.act[d] = a; }
  function lessonDone(id) { return !!(S.les[id] && S.les[id].done); }
  function paperPasses(id) { var p = S.pap[id] || {}; return (p.p1 ? 1 : 0) + (p.p2 ? 1 : 0) + (p.p3 ? 1 : 0); }
  function paperDone(id) { var P = paper(id); if (!P) return false; var p = S.pap[id] || {}; var tg = tgt(P); return tg === 1 ? !!p.p1 : !!(p.p1 && p.p2); }
  function lessonNo(L) { var m = L.id.match(/^d(\d)l(\d+)$/); return m ? m[1] + '.' + m[2] : String(L.idx + 1); }
  function blkKey(n, i) { return 'd' + n + ':' + i; }
  function blkDone(n, i) { var b = S.blk[blkKey(n, i)]; return !!(b && b.d); }
  function curDay() { if (!S.start) return 1; var k = diffDays(S.start, today()) + 1; return Math.max(1, Math.min(NDAY, k)); }
  function rawDay() { return S.start ? diffDays(S.start, today()) + 1 : 0; }
  function blockInfo(n, b, i) {
    var L, P;
    switch (b.k) {
      case 'lesson': case 'method':
        L = T.lessons[b.id]; if (!L) return null;
        return { title: L.title, sub: (b.k === 'method' ? '\u5f00\u5b66\u7b2c\u4e00\u8bfe' : '\u7b2c ' + lessonNo(L) + ' \u8282') + ' \u00b7 ' + b.min + ' \u5206\u949f', type: 'lesson', done: lessonDone(b.id), go: 'lesson-' + b.id };
      case 'paper':
        P = paper(b.id); if (!P) return null;
        return { title: '\u8bba\u6587 \u00b7 ' + P.short, sub: (TIERN[P.tier] || '') + ' \u00b7 \u76ee\u6807 ' + tgt(P) + ' \u904d \u00b7 ' + b.min + ' \u5206\u949f', type: 'paper', done: paperDone(b.id), go: 'paper-' + b.id };
      case 'pretest':
        return { title: '\u9884\u6d4b\u8bd5', sub: '\u5b66\u4e4b\u524d\u5148\u7b54 5 \u9898\uff0c\u7b54\u9519\u6ca1\u5173\u7cfb\uff0c\u8fd9\u4e00\u6b65\u672c\u8eab\u5c31\u80fd\u5e2e\u4f60\u8bb0\u4f4f', type: 'quiz', done: !!S.pre[n], go: 'quiz-pre-' + n };
      case 'boss':
        var bs = S.boss[n];
        return { title: n === NDAY ? '\u7ec8\u6781 Boss\uff1a20 \u9898\u6a2a\u8de8\u4e03\u5929' : 'Boss \u5173\u5361\uff1a10 \u9898', sub: bs ? ('\u6700\u597d\u6210\u7ee9 ' + Math.round(bs.best * 100) + '%' + (bs.best >= 0.8 ? ' \u00b7 \u5df2\u901a\u5173' : ' \u00b7 80% \u901a\u5173')) : '\u4eca\u65e5\u5185\u5bb9 7 \u9898 + \u5f80\u65e5 3 \u9898\uff0c80% \u901a\u5173', type: 'quiz', done: !!(bs && bs.best >= 0.8), go: 'quiz-boss-' + n };
      case 'review':
        return { title: b.t || (n === 1 ? '\u665a\u95f4\u901f\u590d\u4e60' : '\u6668\u95f4\u590d\u4e60'), sub: '\u5230\u671f\u5361\u7247 + \u9519\u9898\uff0c' + b.min + ' \u5206\u949f', type: 'quiz', done: blkDone(n, i), go: 'review', manual: true };
      default:
        return { title: b.t, sub: (b.sub ? b.sub + ' \u00b7 ' : '') + b.min + ' \u5206\u949f', type: 'other', done: blkDone(n, i), go: b.go || (b.k === 'feyn' || b.k === 'plan' ? 'notes-' + n : 'day-' + n), manual: true };
    }
  }
  function dayProgress(n) {
    var d = dayOf(n); if (!d) return 0; var tot = 0, got = 0;
    d.plan.forEach(function (b, i) { var bi = blockInfo(n, b, i); if (!bi) return; tot += b.min; if (bi.done) got += b.min; });
    return tot ? got / tot : 0;
  }
  function computeXP() {
    var xp = 0, k;
    for (k in S.les) if (S.les[k].done) xp += 50;
    for (k in S.q) if (S.q[k].ok) xp += 10;
    for (k in S.pap) { var p = S.pap[k]; if (p.p1) xp += 10; if (p.p2) xp += 30; if (p.p3) xp += 60; }
    for (k in S.boss) { var b = S.boss[k]; xp += Math.round((b.best || 0) * 100) + ((b.best || 0) >= 0.8 ? 50 : 0); }
    for (k in S.pre) xp += 20;
    for (k in S.cards) xp += 2 * (S.cards[k].r || 0);
    for (k in S.act) xp += 15 * (S.act[k].pomo || 0);
    for (k in S.blk) if (S.blk[k].d) xp += 10;
    for (k in N.les) { var f = N.les[k].feyn; if (f && f.replace(/\s/g, '').length >= 50) xp += 30; }
    return xp;
  }
  var LEVELS = [[0, '\u4e91\u4e0b\u89c2\u5bdf\u5458'], [400, '\u6ce2\u6bb5\u5b66\u5f92'], [1200, '\u5377\u79ef\u89c1\u4e60\u751f'], [2400, '\u6ce8\u610f\u529b\u7814\u7a76\u5458'], [4000, '\u53d8\u5316\u4fa6\u63a2'], [6000, '\u878d\u5408\u5de5\u7a0b\u5e08'], [8500, '\u5341\u7c73\u89c6\u754c\u5c0f\u4e13\u5bb6']];
  function level(xp) { var i = 0; while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++; var nxt = LEVELS[i + 1]; return { i: i, name: LEVELS[i][1], next: nxt ? nxt[0] : null, base: LEVELS[i][0], nextName: nxt ? nxt[1] : null }; }
  function streak() {
    var days = Object.keys(S.act).filter(function (k) { return /^\d{4}-\d\d-\d\d$/.test(k); });
    var set = {}; days.forEach(function (d) { set[d] = 1; });
    var d = today(), c = 0;
    if (!set[d]) d = addDays(d, -1);
    while (set[d]) { c++; d = addDays(d, -1); }
    return c;
  }
  function dueCards() {
    var t = today(), out = [];
    for (var k in S.cards) { var c = S.cards[k]; if (c.due <= t && cardBody(k)) out.push(k); }
    out.sort(function (a, b) { var x = S.cards[a], y = S.cards[b]; return x.due < y.due ? -1 : x.due > y.due ? 1 : (x.b || 0) - (y.b || 0); });
    return out;
  }
  function cardBody(k) {
    if (k.indexOf('e:') === 0) { var q = getQ(k.slice(2)); return q ? { type: 'mcq', qk: k.slice(2), q: q } : null; }
    var p = k.split('#c'), L = T.lessons[p[0]]; if (!L || !L.cards || !L.cards[+p[1]]) return null;
    return { type: 'flip', f: L.cards[+p[1]][0], b: L.cards[+p[1]][1], src: L };
  }
  var INT = [1, 2, 4, 7, 15, 30, 60];
  function introduce(L) {
    (L.cards || []).forEach(function (c, i) { var k = L.id + '#c' + i; if (!S.cards[k]) S.cards[k] = { b: 0, due: today(), t: now(), r: 0, l: 0 }; });
  }
  function rateCard(k, r) {
    var c = S.cards[k] || { b: 0, due: today(), r: 0, l: 0 }; var t = today();
    c = { b: c.b || 0, due: c.due, r: (c.r || 0) + 1, l: c.l || 0, t: now() };
    if (r === 0) { c.b = 0; c.due = t; c.l++; }
    else if (r === 1) { c.due = addDays(t, 1); }
    else if (r === 2) { c.due = addDays(t, INT[Math.min(c.b, INT.length - 1)]); c.b = Math.min(c.b + 1, INT.length - 1); }
    else { var nb = Math.min(c.b + 1, INT.length - 1); c.due = addDays(t, INT[nb]); c.b = Math.min(c.b + 2, INT.length - 1); }
    S.cards[k] = c; touch(); save();
  }
  function nextIvl(k, r) { var c = S.cards[k] || { b: 0 }; var b = c.b || 0; if (r === 0) return '\u4eca\u5929'; if (r === 1) return '1 \u5929'; if (r === 2) return INT[Math.min(b, 6)] + ' \u5929'; return INT[Math.min(b + 1, 6)] + ' \u5929'; }
  function addErr(qk) { var k = 'e:' + qk; var c = S.cards[k]; S.cards[k] = { b: 0, due: addDays(today(), 1), t: now(), r: c ? c.r || 0 : 0, l: c ? (c.l || 0) + 1 : 0 }; }
  function recordAnswer(qk, ok, mode) {
    var rec = S.q[qk];
    if (mode !== 'pre') {
      if (!rec) S.q[qk] = { ok: ok, n: 1, t: now() };
      else S.q[qk] = { ok: rec.ok, n: (rec.n || 1) + 1, t: now(), last: ok };
      if (!ok) addErr(qk);
    }
    touch(); save();
  }

  /* ================= \u5fbd\u7ae0\u4e0e\u77e5\u8bc6\u5f71\u50cf ================= */
  function dayLessonsDone(n) { var ls = lessonsOf(n); return ls.length > 0 && ls.every(function (L) { return lessonDone(L.id); }); }
  function badgeList() {
    var aIds = T.paperOrder.filter(function (id) { return paper(id).tier === 'A'; });
    var pd = T.paperOrder.filter(paperDone).length;
    var rv = 0, k; for (k in S.cards) rv += S.cards[k].r || 0;
    var po = 0; for (k in S.act) po += S.act[k].pomo || 0;
    var bossAll = true; for (var n = 1; n <= NDAY; n++) if (!(S.boss[n] && S.boss[n].best >= 0.8)) bossAll = false;
    var anyL = Object.keys(S.les).some(function (k) { return S.les[k].done; });
    return [
      ['\u7b2c\u4e00\u7f15\u5149', '\u5b8c\u6210\u7b2c\u4e00\u8282\u8bfe', anyL],
      ['\u6ce2\u6bb5\u730e\u4eba', '\u5b66\u5b8c\u7b2c 1 \u5929\u5168\u90e8\u8bfe\u7a0b', dayLessonsDone(1)],
      ['\u5377\u79ef\u5165\u95e8', '\u5b66\u5b8c\u7b2c 2 \u5929', dayLessonsDone(2)],
      ['\u6ce8\u610f\u529b\u96c6\u4e2d', '\u5b66\u5b8c\u7b2c 3 \u5929', dayLessonsDone(3)],
      ['\u5206\u5272\u4e0e\u4f20\u7edf', '\u5b66\u5b8c\u7b2c 4 \u5929', dayLessonsDone(4)],
      ['\u53d8\u5316\u4fa6\u63a2', '\u5b66\u5b8c\u7b2c 5 \u5929', dayLessonsDone(5)],
      ['\u4e0d\u9a97\u81ea\u5df1', '\u5b66\u5b8c\u7b2c 6 \u5929', dayLessonsDone(6)],
      ['\u5341\u7c73\u89c6\u754c', '\u5b66\u5b8c\u7b2c 7 \u5929', dayLessonsDone(7)],
      ['\u91d1\u5361\u6536\u85cf\u5bb6', '\u8bfb\u5b8c\u5168\u90e8 ' + aIds.length + ' \u7bc7 A \u7c7b\u8bba\u6587', aIds.length > 0 && aIds.every(paperDone)],
      ['\u4e09\u5341\u7bc7', '30 \u7bc7\u8bba\u6587\u8fbe\u5230\u76ee\u6807\u904d\u6570', pd >= 30],
      ['\u516d\u5341\u7bc7', '60 \u7bc7\u8bba\u6587\u8fbe\u5230\u76ee\u6807\u904d\u6570', pd >= 60],
      ['\u767e\u7bc7', '100 \u7bc7\u8bba\u6587\u8fbe\u5230\u76ee\u6807\u904d\u6570', pd >= 100],
      ['\u4e03\u65e5\u4e0d\u65ad', '\u8fde\u7eed 7 \u5929\u6709\u5b66\u4e60\u8bb0\u5f55', streak() >= 7],
      ['Boss \u5168\u901a\u5173', '7 \u4e2a Boss \u90fd\u8fbe\u5230 80%', bossAll],
      ['\u590d\u4e60\u4e09\u767e', '\u7d2f\u8ba1\u590d\u4e60 300 \u6b21', rv >= 300],
      ['\u756a\u8304\u4e09\u5341', '\u5b8c\u6210 30 \u4e2a\u4e13\u6ce8\u756a\u8304', po >= 30]
    ];
  }
  function mapItems() {
    var items = [];
    for (var n = 1; n <= NDAY; n++) {
      lessonsOf(n).forEach(function (L) { items.push({ k: 'l', id: L.id }); });
      dayPaperIds(n).forEach(function (id) { items.push({ k: 'p', id: id }); });
      items.push({ k: 'b', id: n });
    }
    return items;
  }
  function itemState(it) {
    if (it.k === 'l') return lessonDone(it.id) ? 1 : (N.les[it.id] ? 0.5 : 0);
    if (it.k === 'p') return paperDone(it.id) ? 1 : (paperPasses(it.id) ? 0.5 : 0);
    var b = S.boss[it.id]; return b ? (b.best >= 0.8 ? 1 : 0.5) : 0;
  }
  var MAPW = 32, MAPH = 18;
  var MAPCLS = (function () {
    var c = [], x, y;
    for (y = 0; y < MAPH; y++) for (x = 0; x < MAPW; x++) {
      var ry = 11.2 + 2.3 * Math.sin(x / 4.6 + 0.4) + 0.8 * Math.sin(x / 1.9);
      var hw = 1.55 + 0.35 * Math.sin(x / 3.1);
      var rail = Math.round(11.2 + 2.3 * Math.sin(x / 4.6 + 0.4) - 3.6);
      var v;
      if (Math.abs(y - ry) < hw) v = (x > 21 ? 'T' : 'W');
      else if (x >= 8 && x <= 12 && Math.abs(y - (ry + hw + 0.6)) < 0.9) v = 'S';
      else if (y === rail) v = 'R';
      else if (y < rail) {
        if (x >= 25 && y >= rail - 4 && y <= rail - 1) v = ((x + y) % 4 === 0 ? 'G' : 'B');
        else if (x >= 14 && x <= 16 && y >= 2 && y <= 5) v = 'X';
        else v = ((x * 7 + y * 13) % 11 === 0 ? 'G' : 'F');
      } else if (y > ry + hw) {
        if (x <= 5 && y >= MAPH - 4) v = 'B';
        else { var px = Math.floor(x / 4), py = Math.floor((y - 12) / 2); v = (x % 4 === 3 || y % 3 === 2) ? 'G' : (((px + py) % 3 === 0) ? 'H' : 'C'); }
      } else v = 'G';
      c.push(v);
    }
    return c;
  })();
  var MAPCOL = { W: '#0d1c2b', T: '#2c4a5c', S: '#cdb894', R: '#4c5860', F: '#b3173f', G: '#d65779', C: '#e2758f', H: '#9d6a58', B: '#8fa6b2', X: '#a8927a' };
  function drawMap(cv) {
    var items = mapItems(), st = items.map(itemState);
    var cell = 20, ctx = cv.getContext('2d'); cv.width = MAPW * cell; cv.height = MAPH * cell;
    var dark = matchMedia && matchMedia('(prefers-color-scheme: dark)').matches && document.documentElement.getAttribute('data-theme') !== 'light' || document.documentElement.getAttribute('data-theme') === 'dark';
    var r = rng(77), order = shuffle(MAPCLS.map(function (_, i) { return i; }), r);
    var owner = new Array(MAPCLS.length); order.forEach(function (ci, j) { owner[ci] = j % items.length; });
    var clear = 0;
    for (var i = 0; i < MAPCLS.length; i++) {
      var x = i % MAPW, y = Math.floor(i / MAPW);
      ctx.fillStyle = MAPCOL[MAPCLS[i]]; ctx.fillRect(x * cell, y * cell, cell, cell);
      var s = st[owner[i]], a = s >= 1 ? 0 : (s > 0 ? 0.55 : 0.93);
      if (s >= 1) clear++;
      if (a > 0) {
        var g = 0.9 + 0.1 * Math.sin(i * 12.9898) ;
        ctx.fillStyle = dark ? 'rgba(' + Math.round(70 * g) + ',' + Math.round(84 * g) + ',' + Math.round(92 * g) + ',' + a + ')' : 'rgba(' + Math.round(238 * g) + ',' + Math.round(242 * g) + ',' + Math.round(240 * g) + ',' + a + ')';
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
    ctx.strokeStyle = dark ? 'rgba(0,0,0,.25)' : 'rgba(255,255,255,.18)'; ctx.lineWidth = 1;
    for (var gx = 1; gx < MAPW; gx++) { ctx.beginPath(); ctx.moveTo(gx * cell + .5, 0); ctx.lineTo(gx * cell + .5, cv.height); ctx.stroke(); }
    for (var gy = 1; gy < MAPH; gy++) { ctx.beginPath(); ctx.moveTo(0, gy * cell + .5); ctx.lineTo(cv.width, gy * cell + .5); ctx.stroke(); }
    return { clear: clear / MAPCLS.length, items: items.length, done: st.filter(function (v) { return v >= 1; }).length };
  }

  /* ================= \u8def\u7531\u4e0e\u5bfc\u822a ================= */
  var R = { v: 'today' };
  var NAV = [['today', '\u4eca\u5929'], ['course', '\u8bfe\u7a0b'], ['papers', '\u8bba\u6587'], ['review', '\u590d\u4e60'], ['notes', '\u7b14\u8bb0'], ['map', '\u77e5\u8bc6\u5f71\u50cf'], ['method', '\u65b9\u6cd5\u4e0e\u8bbe\u7f6e']];
  function parse(s) {
    s = (s || '').replace(/^#/, '');
    var m;
    if (!s || s === 'today') return { v: 'today' };
    if ((m = s.match(/^day-(\d)$/))) return { v: 'day', n: +m[1] };
    if ((m = s.match(/^lesson-([a-z0-9]+)$/))) return T.lessons[m[1]] ? { v: 'lesson', id: m[1] } : { v: 'course' };
    if ((m = s.match(/^paper-([A-Za-z0-9_]+)$/))) return T.papers[m[1]] ? { v: 'paper', id: m[1] } : { v: 'papers' };
    if ((m = s.match(/^notes-(\d)$/))) return { v: 'notes', n: +m[1] };
    if ((m = s.match(/^quiz-(pre|boss)-(\d)$/))) return { v: 'quiz', kind: m[1], n: +m[2] };
    if (s === 'quiz-mix') return { v: 'quiz', kind: 'mix' };
    if (['course', 'papers', 'review', 'notes', 'map', 'method'].indexOf(s) >= 0) return { v: s };
    return { v: 'today' };
  }
  function routeStr(r) {
    switch (r.v) { case 'day': return 'day-' + r.n; case 'lesson': return 'lesson-' + r.id; case 'paper': return 'paper-' + r.id; case 'notes': return r.n ? 'notes-' + r.n : 'notes'; case 'quiz': return r.kind === 'mix' ? 'quiz-mix' : 'quiz-' + r.kind + '-' + r.n; default: return r.v; }
  }
  function go(s) {
    var nr = parse(s);
    if (R.v === 'quiz' && QS && nr.v !== 'quiz') QS = null;
    if (nr.v === 'review' && RV && RV.i >= RV.queue.length) RV = null;
    R = nr;
    try { if (location.hash !== '#' + s) history.pushState(null, '', '#' + s); } catch (e) { }
    render();
    window.scrollTo(0, 0);
    var m = $('#main'); if (m) m.focus({ preventScroll: true });
  }
  function navTop() { var v = R.v; if (v === 'day' || v === 'lesson') return 'course'; if (v === 'paper') return 'papers'; if (v === 'quiz') return R.kind === 'mix' ? 'review' : 'today'; return v; }
  function buildNav() {
    var due = dueCards().length, top = navTop();
    $('#rail').innerHTML = NAV.map(function (n, i) {
      return (i === 5 ? '<hr>' : '') + '<button type="button" data-go="' + n[0] + '"' + (top === n[0] ? ' aria-current="page"' : '') + '>' + ICON[n[0]] + '<span>' + n[1] + '</span>' + (n[0] === 'review' && due ? '<span class="badge">' + due + '</span>' : '') + '</button>';
    }).join('');
    $('#tabbar').innerHTML = NAV.slice(0, 5).map(function (n) {
      return '<button type="button" data-go="' + n[0] + '"' + (top === n[0] ? ' aria-current="page"' : '') + '>' + ICON[n[0]] + '<span>' + n[1] + '</span>' + (n[0] === 'review' && due ? '<span class="badge">' + due + '</span>' : '') + '</button>';
    }).join('');
    var xp = computeXP(), lv = level(xp);
    $('#lvchip').innerHTML = '<span class="num">' + xp + '</span> XP \u00b7 ' + esc(lv.name);
  }

  /* ================= \u6e32\u67d3\u5165\u53e3 ================= */
  var mainEl;
  function render(soft) {
    if (soft && (R.v === 'lesson' || R.v === 'paper' || R.v === 'quiz' || R.v === 'review' || R.v === 'notes')) {
      // \u540e\u53f0\u540c\u6b65\u65f6\u4e0d\u6253\u65ad\u6b63\u5728\u8f93\u5165\u6216\u7b54\u9898\u7684\u9875\u9762\uff0c\u53ea\u5237\u65b0\u5bfc\u822a
      buildNav(); return;
    }
    buildNav();
    var h = '';
    switch (R.v) {
      case 'today': h = vToday(); break;
      case 'course': h = vCourse(); break;
      case 'day': h = vDay(R.n); break;
      case 'lesson': h = vLesson(R.id); break;
      case 'papers': h = vPapers(); break;
      case 'paper': h = vPaper(R.id); break;
      case 'review': h = vReview(); break;
      case 'notes': h = vNotes(R.n); break;
      case 'map': h = vMap(); break;
      case 'method': h = vMethod(); break;
      case 'quiz': h = vQuiz(); break;
      default: h = vToday();
    }
    mainEl.innerHTML = h;
    after();
  }
  function after() {
    if (T.figHTML) $$('[data-fig]', mainEl).forEach(function (el) { var f = T.figHTML(el.getAttribute('data-fig')); if (f) el.outerHTML = f; });
    $$('details.deep', mainEl).forEach(function (d) { d.addEventListener('toggle', function () { if (d.open && T.demos && T.demos.mount) { try { T.demos.mount(d); } catch (e) { console.error(e); } } }); });
    if (T.demos && T.demos.mount) { try { T.demos.mount(mainEl); } catch (e) { console.error(e); } }
    var cv = $('#kmap', mainEl); if (cv) { var st = drawMap(cv); var el = $('#kmapstat', mainEl); if (el) el.textContent = '\u77e5\u8bc6\u4e91\u91cf ' + Math.round((1 - st.clear) * 100) + '%\uff1a\u5df2\u5b8c\u6210 ' + st.done + ' / ' + st.items + ' \u9879'; }
    $$('textarea[data-note]', mainEl).forEach(function (ta) { autosize(ta); });
    updateAIContext();
  }
  function autosize(ta) { ta.style.height = 'auto'; ta.style.height = Math.min(Math.max(ta.scrollHeight + 2, 96), 600) + 'px'; }

  /* ================= \u4eca\u5929 ================= */
  function schedHTML(n, compact) {
    var d = dayOf(n); if (!d) return '';
    var startMin = (function () { var p = (S.set.dayStart || '09:00').split(':'); return (+p[0]) * 60 + (+p[1] || 0); })();
    var t = startMin, work = 0, sinceBrk = 0, lunch = false, dinner = false, out = [];
    d.plan.forEach(function (b, i) {
      var bi = blockInfo(n, b, i); if (!bi) return;
      if (!lunch && work >= 90 && t >= 11 * 60 + 30 && t <= 14 * 60 + 30) { out.push('<div class="brk">' + clock(t) + ' \u5348\u996d + 20 \u5206\u949f\u5348\u7761\uff08\u7761\u7720\u5e2e\u8bb0\u5fc6\u5de9\u56fa\uff09</div>'); t += 90; lunch = true; sinceBrk = 0; }
      else if (!dinner && t >= 17 * 60 + 30 && t <= 20 * 60) { out.push('<div class="brk">' + clock(t) + ' \u665a\u996d + \u6563\u6b65</div>'); t += 60; dinner = true; sinceBrk = 0; }
      else if (sinceBrk >= 50) { out.push('<div class="brk">' + clock(t) + ' \u4f11\u606f 10 \u5206\u949f\uff1a\u8d77\u8eab\u3001\u770b\u8fdc\u5904\u3001\u559d\u6c34</div>'); t += 10; sinceBrk = 0; }
      out.push('<div class="blk t-' + bi.type + (bi.done ? ' done' : '') + '">' +
        '<button type="button" class="bgo" data-go="' + bi.go + '"><span class="tm">' + clock(t) + '</span>' +
        '<span class="tt"><b>' + esc(bi.title) + '</b><span>' + esc(bi.sub) + '</span></span></button>' +
        (bi.manual ? '<button type="button" class="mk" data-act="blk" data-n="' + n + '" data-i="' + i + '" aria-pressed="' + bi.done + '" aria-label="\u6807\u8bb0\u300c' + esc(bi.title) + '\u300d\u5b8c\u6210" title="\u70b9\u4e00\u4e0b\u6807\u8bb0\u5b8c\u6210">' + (bi.done ? ICON.check : '') + '</button>' : '<span class="mk" aria-hidden="true">' + (bi.done ? ICON.check : '') + '</span>') +
        '</div>');
      t += b.min; work += b.min; sinceBrk += b.min;
    });
    out.push('<div class="brk">' + clock(t) + ' \u6536\u5de5\u3002\u4eca\u665a\u522b\u71ac\u591c\uff1a\u5b66\u5b8c\u5f53\u665a\u7684\u7761\u7720\u6700\u80fd\u5e2e\u4f60\u8bb0\u4f4f\u4eca\u5929\u7684\u5185\u5bb9</div>');
    return '<div class="sched">' + out.join('') + '</div>';
  }
  function dayBand(n) {
    var d = dayOf(n); if (!d) return '';
    return '<div class="dayband" aria-hidden="true">' + d.plan.map(function (b, i) { var bi = blockInfo(n, b, i); if (!bi) return ''; return '<i class="t-' + bi.type + (bi.done ? ' done' : '') + '" style="width:' + (b.min / DAYMIN * 100).toFixed(2) + '%"></i>'; }).join('') + '</div>';
  }
  function nextBlock(n) {
    var d = dayOf(n); if (!d) return null;
    for (var i = 0; i < d.plan.length; i++) { var bi = blockInfo(n, d.plan[i], i); if (bi && !bi.done) return bi; }
    return null;
  }
  function vToday() {
    var raw = rawDay(), n = curDay(), d = dayOf(n);
    var xp = computeXP(), lv = level(xp), due = dueCards().length, sk = streak();
    var h = '<div class="wrap">';
    if (!S.start) {
      h += '<section class="hero card raised"><span class="lbl">\u4e03\u5929 \u00b7 \u6bcf\u5929 8 \u5c0f\u65f6 \u00b7 \u4ece\u96f6\u5230\u5c0f\u4e13\u5bb6</span><h1>\u5148\u628a\u4eca\u5929\u5b9a\u4e3a\u7b2c 1 \u5929</h1>' +
        '<p class="goal">\u8fd9\u5957\u7cfb\u7edf\u628a\u9065\u611f\u5f71\u50cf\u3001\u6df1\u5ea6\u5b66\u4e60\u3001\u5206\u5272\u3001\u53d8\u5316\u68c0\u6d4b\u3001\u6cb3\u5cb8\u6c34\u4f53\u548c\u591a\u6e90\u878d\u5408\u62c6\u6210 7 \u5929\u7684\u8bfe\u7a0b\u8868\uff0c\u914d\u597d\u8bba\u6587\u9605\u8bfb\u987a\u5e8f\u3001\u6bcf\u65e5\u590d\u4e60\u548c\u81ea\u52a8\u7b14\u8bb0\u3002\u6bcf\u4e00\u6b65\u90fd\u4f1a\u843d\u5230\u6211\u4eec\u94c1\u8def\u6cbf\u7ebf Sentinel-2 \u9879\u76ee\u4e0a\u3002</p>' +
        '<div class="row"><button class="btn veg" type="button" data-act="start">\u4ece\u4eca\u5929\u5f00\u59cb</button><button class="btn" type="button" data-go="method">\u5148\u770b\u5b66\u4e60\u65b9\u6cd5</button></div>' +
        '<p class="small muted" style="margin:0">\u5f00\u59cb\u65e5\u671f\u4ee5\u540e\u53ef\u4ee5\u5728\u300c\u65b9\u6cd5\u4e0e\u8bbe\u7f6e\u300d\u91cc\u6539\u3002\u8fdb\u5ea6\u4f1a\u81ea\u52a8\u4fdd\u5b58\u3002</p></section>';
    }
    var nb = nextBlock(n);
    h += '<section class="hero" style="margin-top:' + (S.start ? '0' : '18px') + '">' +
      '<div class="row" style="justify-content:space-between"><span class="lbl">' + (raw > NDAY ? '\u4e03\u5929\u5df2\u7ed3\u675f \u00b7 \u7ef4\u6301\u6a21\u5f0f' : '\u7b2c ' + n + ' \u5929 / \u5171 7 \u5929') + ' \u00b7 ' + today() + '</span><span class="lbl" style="color:var(--veg)">' + Math.round(dayProgress(n) * 100) + '% \u5b8c\u6210</span></div>' +
      '<h1>' + esc(d.title) + '</h1><p class="goal">' + esc(d.goal) + '</p>' + (d.story ? '<p class="small" style="margin:0;color:var(--ink2)"><b>\u4eca\u5929\u7684\u4e3b\u7ebf\uff1a</b>' + esc(d.story) + '</p>' : '') + dayBand(n) +
      '<div class="orbit" role="group" aria-label="\u4e03\u5929\u8fdb\u5ea6">' + T.days.map(function (dd, i) { var k = i + 1, p = dayProgress(k); return '<button type="button" data-go="day-' + k + '"' + (k === n ? ' aria-current="true"' : '') + ' title="\u7b2c ' + k + ' \u5929\uff1a' + esc(dd.title) + '"><span class="num">D' + k + '</span><span class="bar"><i style="width:' + Math.round(p * 100) + '%"></i></span></button>'; }).join('') + '</div>' +
      '</section>';
    if (nb) {
      h += '<section class="sec card raised next"><div class="t"><span class="lbl">\u4e0b\u4e00\u6b65</span><b>' + esc(nb.title) + '</b><span class="small muted">' + esc(nb.sub) + '</span></div><button class="btn veg" type="button" data-go="' + nb.go + '">\u5f00\u59cb</button></section>';
    } else {
      h += '<section class="sec card raised"><span class="lbl">\u4eca\u5929\u7684\u8ba1\u5212\u90fd\u5b8c\u6210\u4e86</span><p style="margin:6px 0 10px">\u53bb\u300c\u77e5\u8bc6\u5f71\u50cf\u300d\u770b\u770b\u53c8\u6563\u5f00\u4e86\u591a\u5c11\u4e91\uff1b\u660e\u65e9\u8bb0\u5f97\u5148\u590d\u4e60\u3002</p><div class="row"><button class="btn" type="button" data-go="map">\u770b\u77e5\u8bc6\u5f71\u50cf</button>' + (n < NDAY ? '<button class="btn" type="button" data-go="day-' + (n + 1) + '">\u9884\u89c8\u7b2c ' + (n + 1) + ' \u5929</button>' : '') + '</div></section>';
    }
    h += '<section class="sec stats">' +
      stat(xp, '\u7ecf\u9a8c\u503c \u00b7 ' + lv.name) +
      stat(sk, '\u8fde\u7eed\u5b66\u4e60\u5929\u6570') +
      '<button class="stat" type="button" data-go="review" style="text-align:left;cursor:pointer"><div class="v">' + due + '</div><div class="k">\u4eca\u5929\u5230\u671f\u7684\u590d\u4e60\u5361</div></button>' +
      stat(T.paperOrder.filter(paperDone).length + '/' + T.paperOrder.length, '\u8bba\u6587\u8fbe\u5230\u76ee\u6807\u904d\u6570') + '</section>';
    if (lv.next) h += '<div class="small muted" style="margin-top:-14px">\u8ddd\u300c' + esc(lv.nextName) + '\u300d\u8fd8\u5dee ' + (lv.next - xp) + ' XP</div><div class="bar" style="margin:4px 0 0"><i style="width:' + Math.round((xp - lv.base) / (lv.next - lv.base) * 100) + '%"></i></div>';
    h += '<section class="sec"><div class="row" style="justify-content:space-between;margin-bottom:8px"><h2 style="font-size:21px">\u4eca\u65e5\u8bfe\u7a0b\u8868</h2><span class="small muted">8 \u5c0f\u65f6\u6709\u6548\u5b66\u4e60\uff1b\u65f6\u95f4\u6309 ' + esc(S.set.dayStart) + ' \u5f00\u59cb\u63a8\u7b97\uff0c\u4f11\u606f\u5df2\u6392\u597d</span></div>' + schedHTML(n) + '</section>';
    if (d.extra && d.extra.length) h += '<section class="sec"><h2>\u4eca\u5929\u6709\u4f59\u529b\u518d\u770b</h2><div class="chiprow">' + d.extra.map(function (id) { var P = paper(id); return P ? '<button type="button" data-go="paper-' + id + '">' + esc(P.short) + '</button>' : ''; }).join('') + '</div></section>';
    h += '<section class="sec"><div class="row"><button class="btn sm" type="button" data-go="map">\u77e5\u8bc6\u5f71\u50cf\u4e0e\u9879\u76ee\u5168\u666f</button><button class="btn sm" type="button" data-go="method">\u5b66\u4e60\u65b9\u6cd5\u4e0e\u8bbe\u7f6e\uff08\u5f00\u59cb\u65e5\u671f\u3001\u5907\u4efd\uff09</button></div></section>';
    h += '</div>';
    return h;
  }
  function stat(v, k) { return '<div class="stat"><div class="v">' + esc(v) + '</div><div class="k">' + esc(k) + '</div></div>'; }

  /* ================= \u8bfe\u7a0b ================= */
  function vCourse() {
    var h = '<div class="wrap"><span class="lbl">\u4e03\u5929\u8bfe\u7a0b</span><h1 style="font-size:28px;margin:6px 0 4px">\u4ece\u4e00\u666f\u5f71\u50cf\u5230\u4e00\u5957\u7814\u7a76\u65b9\u6848</h1><p class="muted" style="margin:0 0 18px">\u524d\u4e09\u5929\u6253\u5730\u57fa\uff08\u5f71\u50cf\u3001\u6df1\u5ea6\u5b66\u4e60\u3001Transformer \u4e0e\u5927\u6a21\u578b\uff09\uff0c\u540e\u56db\u5929\u6309\u4e3b\u9898\u8bfb\u8bba\u6587\uff08\u5206\u5272\u3001\u53d8\u5316\u68c0\u6d4b\u3001\u4f2a\u53d8\u5316\u4e0e\u8bc4\u4ef7\u3001\u6cb3\u5cb8\u6c34\u4f53\u4e0e\u591a\u6e90\u878d\u5408\uff09\u3002\u6bcf\u5929 8 \u5c0f\u65f6\u3002</p><div class="grid">';
    T.days.forEach(function (d, i) {
      var n = i + 1, p = dayProgress(n);
      h += '<div class="card daycard"><div><div class="dn">D' + n + '</div><div class="bar" style="margin-top:8px"><i style="width:' + Math.round(p * 100) + '%"></i></div></div><div style="min-width:0"><button class="btn ghost" type="button" data-go="day-' + n + '" style="padding:0;text-align:left"><h3>' + esc(d.title) + '</h3></button><div class="small muted">' + esc(d.sub) + ' \u00b7 ' + d.lessons.length + ' \u8282\u8bfe \u00b7 ' + dayPaperIds(n).length + ' \u7bc7\u8bba\u6587</div>' +
        '<div class="lesslist">' + d.lessons.map(function (L) { return '<button type="button" data-go="lesson-' + L.id + '"><span class="mk2' + (lessonDone(L.id) ? ' done' : '') + '"></span><span>' + esc(L.title) + '</span><span class="small muted" style="margin-left:auto">' + L.min + "\u2032</span></button>"; }).join('') + '</div></div></div>';
    });
    return h + '</div></div>';
  }
  function vDay(n) {
    var d = dayOf(n); if (!d) return vCourse();
    var h = '<div class="wrap"><div class="crumb"><button type="button" data-go="course">\u8bfe\u7a0b</button><span>/</span><span>\u7b2c ' + n + ' \u5929</span></div>' +
      '<h1 style="font-size:29px;margin:6px 0 6px">D' + n + ' \u00b7 ' + esc(d.title) + '</h1><p class="muted" style="margin:0 0 6px">' + esc(d.sub) + '</p>' +
      '<div class="box tip"><span class="lbl">\u4eca\u5929\u7ed3\u675f\u65f6\u4f60\u80fd</span><p>' + esc(d.goal) + '</p></div>' +
      (d.story ? '<div class="box"><span class="lbl">\u4eca\u5929\u7684\u4e3b\u7ebf</span><p>' + esc(d.story) + '</p></div>' : '') + dayBand(n) +
      '<section class="sec"><h2>\u8bfe\u7a0b\u8868</h2>' + schedHTML(n) + '</section>';
    if (d.extra && d.extra.length) h += '<section class="sec"><h2>\u9009\u505a\uff08\u6709\u4f59\u529b\u518d\u8bfb\uff09</h2><div class="grid g2">' + d.extra.map(pcard).join('') + '</div></section>';
    if (n !== curDay() && S.start) h += '<p class="small muted">\u60f3\u6309\u8fd9\u4e00\u5929\u7684\u8ba1\u5212\u5b66\uff1f<button class="btn sm" type="button" data-act="setday" data-n="' + n + '">\u628a\u4eca\u5929\u8bbe\u4e3a\u7b2c ' + n + ' \u5929</button></p>';
    return h + '</div>';
  }

  /* ================= \u8bfe\u8282 ================= */
  function lessonNav(L) {
    var ls = lessonsOf(L.day), i = ls.indexOf(L);
    var prev = ls[i - 1], next = ls[i + 1];
    if (!next && L.day < NDAY) next = lessonsOf(L.day + 1)[0];
    return { prev: prev, next: next };
  }
  function pipeNode(id) {
    if (!T.pipeline) return null;
    for (var i = 0; i < T.pipeline.length; i++) if (T.pipeline[i].lessons.indexOf(id) >= 0) return { i: i + 1, t: T.pipeline[i].t };
    return null;
  }
  function quizSec(id, L, title, note) {
    return '<section class="panel"><h2>' + title + ' \u00b7 ' + L.quiz.length + ' \u9898</h2><p class="small muted" style="margin:0 0 6px">' + note + '</p>' + L.quiz.map(function (q, i) { return mcq(qKey(id, i), q, 'les', i + 1); }).join('') + '</section>';
  }
  function vLesson(id) {
    var L = T.lessons[id]; if (!L) return vCourse();
    var nt = N.les[id] || {}, done = lessonDone(id), nav = lessonNav(L), node = pipeNode(id);
    var hasQ = L.quiz && L.quiz.length;
    var h = '<article class="wrap lesson"><div class="crumb"><button type="button" data-go="day-' + L.day + '">\u7b2c ' + L.day + ' \u5929</button><span>/</span><span>\u7b2c ' + lessonNo(L) + ' \u8282 \u00b7 ' + L.min + ' \u5206\u949f</span>' +
      (L.fast ? '<span class="pill K">\u57fa\u7840\u901f\u901a</span>' : '') + (done ? '<span class="pill ok">\u5df2\u5b8c\u6210</span>' : '') +
      (node ? '<span>\u00b7</span><button type="button" data-go="map" title="\u5728\u201c\u77e5\u8bc6\u5f71\u50cf\u201d\u9875\u7684\u9879\u76ee\u5168\u666f\u91cc\u770b\u8fd9\u4e00\u73af">\u5168\u666f\u7b2c ' + node.i + ' \u73af\uff1a' + esc(node.t) + '</button>' : '') + '</div>' +
      '<h1>' + esc(L.title) + '</h1>' + (L.hook ? '<p class="hook">' + L.hook + '</p>' : '');
    if (L.goals && L.goals.length) h += '<div class="goals"><span class="lbl">\u5b66\u5b8c\u8fd9\u4e00\u8282\uff0c\u4f60\u5e94\u8be5\u80fd</span><ul>' + L.goals.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul></div>';
    if (L.fast) {
      h += '<div class="box tip"><span class="lbl">\u57fa\u7840\u901f\u901a \u00b7 \u5efa\u8bae ' + L.min + ' \u5206\u949f</span><p>\u8fd9\u4e00\u8282\u662f\u4f60\u5b66\u8fc7\u3001\u4f46\u53ef\u80fd\u6709\u70b9\u5fd8\u7684\u57fa\u7840\u3002\u6309\u8fd9\u4e2a\u987a\u5e8f\u8d70\uff1a\u2460 \u4e0d\u770b\u6b63\u6587\uff0c\u5148\u505a\u4e0b\u9762\u7684\u5c0f\u6d4b\uff1b\u2461 \u8bfb\u201c\u4e00\u9875\u901f\u8bb0\u201d\uff0c\u6bcf\u4e00\u884c\u90fd\u5728\u5fc3\u91cc\u8fc7\u4e00\u904d\u201c\u4e3a\u4ec0\u4e48\u201d\uff1b\u2462 \u54ea\u9053\u9898\u9519\u4e86\u3001\u54ea\u4e00\u884c\u60f3\u4e0d\u8d77\u539f\u56e0\uff0c\u518d\u5c55\u5f00\u6700\u4e0b\u9762\u7684\u201c\u7ec6\u8bb2\u201d\u770b\u5bf9\u5e94\u5c0f\u8282\u3002\u9898\u5168\u5bf9\u3001\u901f\u8bb0\u90fd\u719f\uff0c\u5c31\u76f4\u63a5\u70b9\u201c\u5b8c\u6210\u672c\u8282\u201d\u3002</p></div>';
      if (hasQ) h += quizSec(id, L, '\u5148\u6d4b\uff1a\u4e0d\u770b\u6b63\u6587\u76f4\u63a5\u7b54', '\u7b54\u9519\u6ca1\u5173\u7cfb\uff0c\u8fd9\u6b63\u662f\u9884\u6d4b\u8bd5\u7684\u4f5c\u7528\uff1b\u7b54\u9519\u7684\u9898\u660e\u5929\u4f1a\u53d8\u6210\u9519\u9898\u5361\u3002');
      if (L.recap) h += '<section class="recap"><h2>\u4e00\u9875\u901f\u8bb0</h2><div class="prose">' + L.recap + '</div></section>';
      h += '<details class="deep" id="deep-' + id + '"><summary>\u7ec6\u8bb2 <span class="small muted">\u7b54\u9519\u6216\u60f3\u5f7b\u5e95\u5f04\u61c2\u65f6\u5c55\u5f00</span></summary><div class="prose">' + L.html + '</div></details>';
    } else {
      if (hasQ) h += '<div class="preq"><span class="lbl">\u5e26\u7740\u8fd9\u51e0\u4e2a\u95ee\u9898\u8bfb</span><ol>' + L.quiz.map(function (q) { return '<li>' + q.q + '</li>'; }).join('') + '</ol><p class="small muted" style="margin:0">\u5148\u5728\u5fc3\u91cc\u731c\u4e00\u4e2a\u7b54\u6848\uff0c\u8bfb\u5b8c\u5230\u6587\u672b\u5c0f\u6d4b\u91cc\u9a8c\u8bc1\u2014\u2014\u5148\u731c\u540e\u5b66\uff0c\u8bb0\u5f97\u66f4\u7262\u3002</p></div>';
      h += '<p class="steps">\u600e\u4e48\u5b66\u8fd9\u4e00\u8282\uff1a\u6bcf\u8bfb\u5b8c\u4e00\u4e2a\u5c0f\u6807\u9898\uff0c\u5148\u5408\u4e0a\u5c4f\u5e55\u7528\u4e00\u53e5\u8bdd\u590d\u8ff0\uff1b\u9047\u5230\u201c\u60f3\u4e00\u60f3\u201d\u5148\u81ea\u5df1\u7b54\u518d\u70b9\u5f00\uff1b\u9047\u5230\u6f14\u793a\u5c31\u52a8\u624b\u62d6\u4e00\u62d6\uff1b\u6700\u540e\u505a\u5c0f\u6d4b\u3001\u5199\u8d39\u66fc\u8f93\u51fa\u3002</p>';
      h += '<div class="prose">' + L.html + '</div>';
    }
    if (L.keys && L.keys.length) h += '<div class="box"><span class="lbl">\u672c\u8282\u8981\u70b9\uff08\u4f1a\u81ea\u52a8\u8fdb\u7b14\u8bb0\uff09</span><ol class="keys">' + L.keys.map(function (k) { return '<li><span>' + k + '</span></li>'; }).join('') + '</ol></div>';
    if (L.papers && L.papers.length) h += '<div class="small" style="margin:8px 0"><span class="lbl">\u76f8\u5173\u8bba\u6587</span><div class="chiprow" style="margin-top:6px">' + L.papers.map(function (pid) { var P = paper(pid); return P ? '<button type="button" data-go="paper-' + pid + '">' + esc(P.short) + ' <span class="pill ' + P.tier + '">' + P.tier + '</span></button>' : ''; }).join('') + '</div></div>';
    if (AI.on) h += '<div class="chiprow" style="margin:14px 0"><span class="lbl" style="align-self:center">\u95ee\u52a9\u6559</span>' + AIQUICK.lesson.map(function (a, i) { return '<button type="button" data-act="aiq" data-i="' + i + '">' + a[0] + '</button>'; }).join('') + '</div>';
    if (L.feyn) h += '<section class="panel"><h2>\u8d39\u66fc\u65f6\u523b</h2><p class="small muted" style="margin:0 0 8px">\u5408\u4e0a\u4e0a\u9762\u7684\u5185\u5bb9\uff0c\u7528\u81ea\u5df1\u7684\u8bdd\u5199\u4e0b\u6765\u3002\u5199\u4e0d\u51fa\u6765\u7684\u5730\u65b9\uff0c\u5c31\u662f\u8fd8\u6ca1\u61c2\u7684\u5730\u65b9\u3002\u5199\u6ee1 50 \u5b57 +30 XP\u3002</p><div class="box"><b>' + esc(L.feyn) + '</b></div>' +
      '<textarea id="feyn-' + id + '" data-note="feyn" data-id="' + id + '" placeholder="\u6bd4\u5982\uff1a\u8fd9\u4e00\u8282\u8bf4\u7684\u662f\u2026\u2026\uff0c\u5173\u952e\u5728\u4e8e\u2026\u2026\uff0c\u5728\u6211\u4eec\u9879\u76ee\u91cc\u2026\u2026">' + esc(nt.feyn || '') + '</textarea>' +
      '<div class="row" style="justify-content:space-between;margin-top:6px"><span class="savehint" id="sh-feyn-' + id + '">' + (nt.feyn ? '\u5df2\u4fdd\u5b58' : '') + '</span>' + (AI.on ? '<button class="btn sm" type="button" data-act="grade" data-id="' + id + '">\u8bf7\u52a9\u6559\u6279\u6539</button>' : '') + '</div></section>';
    h += '<section class="panel"><h2>\u6211\u7684\u7b14\u8bb0</h2><textarea id="note-' + id + '" data-note="txt" data-id="' + id + '" placeholder="\u7591\u95ee\u3001\u8054\u60f3\u3001\u60f3\u95ee\u8001\u5e08\u7684\u95ee\u9898\u90fd\u8bb0\u5728\u8fd9\u91cc">' + esc(nt.txt || '') + '</textarea><span class="savehint" id="sh-txt-' + id + '">' + (nt.txt ? '\u5df2\u4fdd\u5b58' : '') + '</span></section>';
    if (hasQ && !L.fast) h += quizSec(id, L, '\u5c0f\u6d4b', '\u7b2c\u4e00\u6b21\u5c31\u7b54\u5bf9 +10 XP\uff1b\u7b54\u9519\u7684\u9898\u4f1a\u53d8\u6210\u9519\u9898\u5361\uff0c\u660e\u5929\u51fa\u73b0\u5728\u590d\u4e60\u91cc\u3002');
    h += '<section class="panel"><div class="row" style="justify-content:space-between">' +
      (done ? '<button class="btn" type="button" data-act="undone" data-id="' + id + '">\u6807\u4e3a\u672a\u5b8c\u6210</button>' : '<button class="btn veg" type="button" data-act="done" data-id="' + id + '">\u5b8c\u6210\u672c\u8282\uff08+50 XP\uff0c\u5361\u7247\u52a0\u5165\u590d\u4e60\uff09</button>') +
      '<span class="row">' + (nav.prev ? '<button class="btn sm" type="button" data-go="lesson-' + nav.prev.id + '">\u2190 \u4e0a\u4e00\u8282</button>' : '') + (nav.next ? '<button class="btn sm" type="button" data-go="lesson-' + nav.next.id + '">\u4e0b\u4e00\u8282 \u2192</button>' : '') + '</span></div>' +
      (L.cards && L.cards.length ? '<p class="small muted">\u5b8c\u6210\u540e\uff0c\u672c\u8282 ' + L.cards.length + ' \u5f20\u8bb0\u5fc6\u5361\u4f1a\u6309 \u5f53\u5929 \u2192 1 \u5929 \u2192 2 \u5929 \u2192 4 \u5929 \u2192 7 \u5929 \u7684\u95f4\u9694\u51fa\u73b0\u5728\u590d\u4e60\u91cc\u3002</p>' : '') + '</section></article>';
    return h;
  }
  function mcq(k, q, mode, num) {
    var rec = S.q[k];
    var h = '<div class="q" data-q="' + k + '" data-mode="' + mode + '"><div class="stem">' + (num ? num + '. ' : '') + q.q + '</div><div class="opts">';
    q.o.forEach(function (o, i) { h += '<button class="opt" type="button" data-act="ans" data-q="' + k + '" data-i="' + i + '" data-mode="' + mode + '"><span class="ol">' + 'ABCD'[i] + '</span><span>' + o + '</span></button>'; });
    h += '</div>' + (rec && mode === 'les' ? '<div class="small muted" style="margin-top:6px">\u4e4b\u524d' + (rec.ok ? '\u7b2c\u4e00\u6b21\u5c31\u7b54\u5bf9\u4e86' : '\u7b54\u9519\u8fc7') + '\uff0c\u53ef\u4ee5\u518d\u7b54\u4e00\u6b21\u3002</div>' : '') + '</div>';
    return h;
  }
  function answer(btn) {
    var k = btn.getAttribute('data-q'), i = +btn.getAttribute('data-i'), mode = btn.getAttribute('data-mode');
    var q = getQ(k); if (!q) return;
    var box = btn.closest('.q'); if (!box || box.getAttribute('data-done')) return;
    box.setAttribute('data-done', '1');
    var ok = i === q.a;
    $$('.opt', box).forEach(function (b, j) { b.disabled = true; if (j === q.a) b.classList.add('right'); else if (j === i) b.classList.add('wrong'); });
    var ex = document.createElement('div'); ex.className = 'expl ' + (ok ? 'r' : 'w');
    ex.innerHTML = '<b>' + (ok ? '\u7b54\u5bf9\u4e86\u3002' : '\u6b63\u786e\u7b54\u6848\u662f ' + 'ABCD'[q.a] + '\u3002') + '</b> ' + (q.e || '');
    box.appendChild(ex);
    if (mode === 'les' || mode === 'pap') { var first = !S.q[k]; recordAnswer(k, ok, mode); if (first && ok) toast('+10 XP'); buildNav(); }
    else if (mode === 'rv') { if (RV) rvAnswered(k, ok); }
    else if (QS) quizAnswered(k, ok);
  }

  /* ================= \u8bba\u6587 ================= */
  var PF = { topic: 'all', tier: 'all', st: 'all', q: '' };
  function pcard(id) {
    var P = typeof id === 'string' ? paper(id) : id; if (!P) return '';
    var ps = S.pap[P.id] || {}, got = paperDone(P.id);
    return '<button type="button" class="pcard' + (got ? ' got' : '') + '" data-go="paper-' + P.id + '"><span class="meta"><span class="pill ' + P.tier + '">' + (P.tier === 'K' ? '\u7ecf\u5178' : P.tier + ' \u7c7b') + '</span><span>' + (P.year || '') + '</span><span>' + esc(TOPIC[P.topic] || '') + '</span>' + (P.day ? '<span>D' + P.day + '</span>' : '') + '</span>' +
      '<span class="ttl">' + esc(P.short) + '</span><span class="one">' + esc(P.one) + '</span>' +
      '<span class="meta"><span class="passes"><i class="' + (ps.p1 ? 'on' : '') + '"></i><i class="' + (ps.p2 ? 'on' : '') + '"></i><i class="' + (ps.p3 ? 'on' : '') + '"></i></span><span>' + (got ? '\u5df2\u6536\u96c6' : '\u76ee\u6807 ' + tgt(P) + ' \u904d') + '</span></span></button>';
  }
  function vPapers() {
    var ids = T.paperOrder.slice().sort(function (a, b) { var x = paper(a), y = paper(b); return (x.day || 9) - (y.day || 9) || ('AKBC'.indexOf(x.tier) - 'AKBC'.indexOf(y.tier)); });
    var q = PF.q.trim().toLowerCase();
    var list = ids.filter(function (id) {
      var P = paper(id);
      if (PF.topic !== 'all' && P.topic !== PF.topic) return false;
      if (PF.tier !== 'all' && P.tier !== PF.tier) return false;
      if (PF.st === 'todo' && paperDone(id)) return false;
      if (PF.st === 'done' && !paperDone(id)) return false;
      if (q && (P.short + P.title + (P.zh || '') + P.one).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    var cnt = function (t) { var all = ids.filter(function (id) { return paper(id).tier === t; }); return all.filter(paperDone).length + '/' + all.length; };
    var topics = Object.keys(TOPIC).filter(function (t) { return ids.some(function (id) { return paper(id).topic === t; }); });
    var h = '<div class="wrap wide" style="max-width:1000px"><span class="lbl">\u8bba\u6587\u5e93 \u00b7 ' + ids.length + ' \u7bc7</span><h1 style="font-size:28px;margin:6px 0 4px">\u6309\u5929\u8bfb\uff0c\u6309\u5c42\u7ea7\u8bfb</h1>' +
      '<p class="muted" style="margin:0 0 12px">A \u7c7b\u8bfb\u4e24\u904d\u4ee5\u4e0a\u3001B \u7c7b\u4e24\u904d\u3001C \u7c7b\u548c\u7ecf\u5178\u8bfb\u7b2c\u4e00\u904d\u3002\u8bfb\u5230\u76ee\u6807\u904d\u6570\u5c31\u7b97\u201c\u6536\u96c6\u201d\u3002\u7cbe\u8bfb PDF \u5728\u4f60\u7684\u8d44\u6599\u5305\u91cc\uff0c\u5361\u7247\u4e0a\u5199\u4e86\u6587\u4ef6\u540d\u3002</p>' +
      '<div class="stats" style="margin-bottom:14px">' + stat(cnt('A'), 'A \u7c7b\u7cbe\u8bfb') + stat(cnt('B'), 'B \u7c7b\u9009\u8bfb') + stat(cnt('C'), 'C \u7c7b\u901f\u89c8') + stat(cnt('K'), '\u7ecf\u5178\u901f\u89c8') + '</div>' +
      '<div class="filters" style="margin-bottom:8px">' + [['all', '\u5168\u90e8\u4e3b\u9898']].concat(topics.map(function (t) { return [t, TOPIC[t]]; })).map(function (t) { return '<button type="button" data-act="pf" data-f="topic" data-v="' + t[0] + '" aria-pressed="' + (PF.topic === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div class="filters" style="margin-bottom:10px">' + [['all', '\u5168\u90e8\u5c42\u7ea7'], ['A', 'A \u7cbe\u8bfb'], ['B', 'B \u9009\u8bfb'], ['C', 'C \u901f\u89c8'], ['K', '\u7ecf\u5178']].map(function (t) { return '<button type="button" data-act="pf" data-f="tier" data-v="' + t[0] + '" aria-pressed="' + (PF.tier === t[0]) + '">' + t[1] + '</button>'; }).join('') +
      [['all', '\u5168\u90e8'], ['todo', '\u672a\u6536\u96c6'], ['done', '\u5df2\u6536\u96c6']].map(function (t) { return '<button type="button" data-act="pf" data-f="st" data-v="' + t[0] + '" aria-pressed="' + (PF.st === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<input type="text" id="pfq" placeholder="\u641c\u7d22\u6807\u9898\u3001\u7b80\u79f0\u6216\u4e00\u53e5\u8bdd" value="' + esc(PF.q) + '" style="margin-bottom:12px">' +
      (list.length ? '<div class="grid g3" id="plist">' + list.map(pcard).join('') + '</div>' : '<div class="empty">\u6ca1\u6709\u7b26\u5408\u6761\u4ef6\u7684\u8bba\u6587</div>') + '</div>';
    return h;
  }
  function vPaper(id) {
    var P = paper(id); if (!P) return vPapers();
    var ps = S.pap[id] || {}, nt = N.pap[id] || {};
    var links = '';
    if (P.link) links += '<a class="btn sm" href="' + esc(P.link) + '" target="_blank" rel="noopener">\u539f\u6587</a>';
    links += '<a class="btn sm" href="https://scholar.google.com/scholar?q=' + encodeURIComponent(P.title) + '" target="_blank" rel="noopener">Google Scholar</a>';
    links += '<a class="btn sm" href="https://xueshu.baidu.com/s?wd=' + encodeURIComponent(P.title) + '" target="_blank" rel="noopener">\u767e\u5ea6\u5b66\u672f</a>';
    var h = '<article class="wrap"><div class="crumb"><button type="button" data-go="papers">\u8bba\u6587\u5e93</button><span>/</span>' + (P.day ? '<button type="button" data-go="day-' + P.day + '">\u7b2c ' + P.day + ' \u5929</button><span>/</span>' : '') + '<span class="pill ' + P.tier + '">' + (TIERN[P.tier] || '') + '</span>' + (paperDone(id) ? '<span class="pill ok">\u5df2\u6536\u96c6</span>' : '') + '</div>' +
      '<h1 style="font-size:28px;margin:8px 0 4px">' + esc(P.short) + '</h1><p style="margin:0;font-weight:600">' + esc(P.title) + '</p>' + (P.zh ? '<p class="muted" style="margin:2px 0 0">' + esc(P.zh) + '</p>' : '') +
      '<p class="small muted">' + esc([P.authors, P.venue, P.year].filter(Boolean).join(' \u00b7 ')) + '</p>' +
      '<div class="row" style="margin:8px 0 4px">' + links + '</div>' + (P.pdf ? '<p class="small muted" style="margin:6px 0 0">\u8d44\u6599\u5305\u7cbe\u8bfb\uff1a<span class="mono">' + esc(P.pdf) + '</span></p>' : '') +
      '<div class="prose" style="margin-top:14px">' +
      '<div class="box"><span class="lbl">\u4e00\u53e5\u8bdd</span><p>' + P.one + '</p></div>' +
      (P.figs && P.figs.length ? P.figs.map(function (f) { return '<div data-fig="' + f + '"></div>'; }).join('') : '') +
      (P.problem ? '<h4>\u5b83\u8981\u89e3\u51b3\u4ec0\u4e48\u95ee\u9898</h4><p>' + P.problem + '</p>' : '') +
      (P.how ? '<h4>\u600e\u4e48\u505a\u7684</h4><p>' + P.how + '</p>' : '') +
      (P.find ? '<h4>\u4e3b\u8981\u7ed3\u8bba</h4><p>' + P.find + '</p>' : '') +
      (P.limit ? '<h4>\u5c40\u9650\u4e0e\u8bfb\u65f6\u6ce8\u610f</h4><p>' + P.limit + '</p>' : '') +
      (P.us ? '<div class="box proj"><span class="lbl">\u5bf9\u6211\u4eec\u9879\u76ee</span><p>' + P.us + '</p></div>' : '') +
      (P.first ? '<div class="box tip"><span class="lbl">\u5148\u770b\u54ea\u91cc</span><p>' + P.first + '</p></div>' : '') + '</div>';
    if (AI.on) h += '<div class="chiprow" style="margin:12px 0"><span class="lbl" style="align-self:center">\u95ee\u52a9\u6559</span>' + AIQUICK.paper.map(function (a, i) { return '<button type="button" data-act="aiqp" data-i="' + i + '">' + a[0] + '</button>'; }).join('') + '</div>';
    var tg = tgt(P);
    h += '<section class="panel"><h2>\u4e09\u904d\u8bfb\u6cd5</h2><p class="small muted" style="margin:0 0 4px">\u6309 Keshav \u7684\u4e09\u904d\u6cd5\u548c\u5434\u6069\u8fbe\u7684\u5efa\u8bae\uff1a\u4e0d\u8981\u4e00\u4e0a\u6765\u4ece\u5934\u8bfb\u5230\u5c3e\u3002\u8fd9\u7bc7\u7684\u76ee\u6807\u662f ' + tg + ' \u904d\uff1b\u7b2c 3 \u904d\u7559\u7ed9\u51c6\u5907\u590d\u73b0\u7684\u8bba\u6587\u3002</p>' +
      passRow(id, 'p1', '\u7b2c 1 \u904d \u00b7 5\u201310 \u5206\u949f', '\u8bfb\u6807\u9898\u3001\u6458\u8981\u3001\u5f15\u8a00\u3001\u5404\u8282\u6807\u9898\u3001\u7ed3\u8bba\uff0c\u626b\u4e00\u773c\u56fe\u8868\u3002\u8bfb\u5b8c\u80fd\u8bf4\u51fa\uff1a\u5b83\u5c5e\u4e8e\u54ea\u7c7b\u5de5\u4f5c\u3001\u89e3\u51b3\u4ec0\u4e48\u95ee\u9898\u3001\u4e3b\u8981\u8d21\u732e\u662f\u4ec0\u4e48\u3001\u503c\u4e0d\u503c\u5f97\u8bfb\u7b2c\u4e8c\u904d\u3002', ps.p1) +
      passRow(id, 'p2', '\u7b2c 2 \u904d \u00b7 30\u201360 \u5206\u949f', '\u4ed4\u7ec6\u770b\u56fe\u548c\u8868\uff08\u5750\u6807\u8f74\u3001\u8bef\u5dee\u68d2\u3001\u5bf9\u7167\u7ec4\uff09\uff0c\u8bfb\u61c2\u65b9\u6cd5\u4e3b\u7ebf\uff0c\u8df3\u8fc7\u8bc1\u660e\u7ec6\u8282\uff1b\u628a\u6ca1\u8bfb\u61c2\u7684\u5730\u65b9\u548c\u8981\u67e5\u7684\u5f15\u7528\u8bb0\u4e0b\u6765\u3002\u8bfb\u5b8c\u80fd\u5411\u7ec4\u5458\u8bb2\u6e05\u5b83\u7684\u65b9\u6cd5\u548c\u8bc1\u636e\u3002', ps.p2) +
      passRow(id, 'p3', '\u7b2c 3 \u904d \u00b7 1\u20135 \u5c0f\u65f6\uff08\u53ef\u9009\uff09', '\u5728\u8111\u5b50\u91cc\u628a\u5b83\u91cd\u505a\u4e00\u904d\uff1a\u5982\u679c\u662f\u4f60\u4f1a\u600e\u4e48\u505a\uff0c\u5b83\u6709\u54ea\u4e9b\u9690\u542b\u5047\u8bbe\u3001\u5b9e\u9a8c\u6f0f\u6d1e\uff0c\u54ea\u4e9b\u90e8\u5206\u80fd\u642c\u5230\u6211\u4eec\u7684\u6570\u636e\u4e0a\u3002\u80fd\u590d\u73b0\u6216\u753b\u51fa\u5b8c\u6574\u6570\u636e\u6d41\u624d\u7b97\u901a\u8fc7\u3002', ps.p3) + '</section>';
    h += '<section class="panel"><h2>\u6211\u7684\u4e00\u53e5\u8bdd\u603b\u7ed3</h2><textarea id="pnote-' + id + '" data-note="pap" data-id="' + id + '" placeholder="\u5b83\u89e3\u51b3\u4e86\u4ec0\u4e48\u95ee\u9898\uff0c\u7528\u4ec0\u4e48\u65b9\u6cd5\uff0c\u8bc1\u636e\u662f\u4ec0\u4e48\uff0c\u5bf9\u6211\u4eec\u6709\u4ec0\u4e48\u7528">' + esc(nt.txt || '') + '</textarea><span class="savehint" id="sh-pap-' + id + '">' + (nt.txt ? '\u5df2\u4fdd\u5b58' : '') + '</span></section>';
    if (P.q && P.q.length) h += '<section class="panel"><h2>\u8bfb\u540e\u81ea\u6d4b</h2>' + P.q.map(function (q, i) { return mcq(qKey(id, i), q, 'pap', i + 1); }).join('') + '</section>';
    var rel = allLessons().filter(function (L) { return (L.papers || []).indexOf(id) >= 0; });
    if (rel.length) h += '<section class="panel"><h2>\u51fa\u73b0\u5728\u8fd9\u4e9b\u8bfe\u91cc</h2><div class="chiprow">' + rel.map(function (L) { return '<button type="button" data-go="lesson-' + L.id + '">D' + L.day + ' \u00b7 ' + esc(L.title) + '</button>'; }).join('') + '</div></section>';
    return h + '</article>';
  }
  function passRow(id, p, t, d, on) {
    return '<label class="pass"><input type="checkbox" data-act="pass" data-id="' + id + '" data-p="' + p + '"' + (on ? ' checked' : '') + '><span><b>' + t + '</b><br><span class="small">' + d + '</span></span></label>';
  }

  /* ================= \u590d\u4e60 ================= */
  var RV = null;
  function startRV() { var q = dueCards(); RV = { queue: q, i: 0, shown: false, n: 0, again: 0, total: q.length }; }
  function vReview() {
    if (!RV) startRV();
    var h = '<div class="wrap"><span class="lbl">\u95f4\u9694\u590d\u4e60</span><h1 style="font-size:28px;margin:6px 0 4px">\u4eca\u5929\u8be5\u60f3\u8d77\u6765\u7684\u4e1c\u897f</h1>' +
      '<p class="muted" style="margin:0 0 14px">\u5148\u81ea\u5df1\u56de\u5fc6\uff0c\u518d\u7ffb\u7b54\u6848\u3002\u6309\u771f\u5b9e\u611f\u53d7\u6253\u5206\uff1a\u5fd8\u4e86\u7684\u4eca\u5929\u8fd8\u4f1a\u518d\u51fa\u73b0\uff0c\u8bb0\u5f97\u7684\u4f1a\u9694\u5f97\u8d8a\u6765\u8d8a\u4e45\u3002</p>';
    if (RV.i >= RV.queue.length) {
      var more = dueCards().length;
      h += '<div class="card raised" style="text-align:center;padding:24px"><div class="score">' + RV.n + '</div><p>' + (RV.n ? '\u8fd9\u4e00\u8f6e\u590d\u4e60\u4e86 ' + RV.n + ' \u5f20\u5361' + (RV.again ? '\uff0c\u5176\u4e2d ' + RV.again + ' \u6b21\u201c\u5fd8\u4e86\u201d' : '') + '\u3002' : '\u4eca\u5929\u6ca1\u6709\u5230\u671f\u7684\u5361\u7247\u3002') + '</p>' +
        (more ? '<button class="btn veg" type="button" data-act="rvagain">\u8fd8\u6709 ' + more + ' \u5f20\uff0c\u7ee7\u7eed</button>' : '<p class="small muted">\u65b0\u5361\u4f1a\u5728\u4f60\u5b8c\u6210\u4e00\u8282\u8bfe\u540e\u52a0\u5165\u3002</p>') +
        '<hr style="border:0;border-top:1px solid var(--line);margin:18px 0"><p class="small" style="margin:0 0 8px"><b>\u4ea4\u9519\u7ec3\u4e60</b>\uff1a\u4ece\u4f60\u5df2\u7ecf\u5b66\u8fc7\u7684\u6240\u6709\u5929\u91cc\u968f\u673a\u62bd 10 \u9898\uff0c\u6df7\u7740\u505a\u3002\u6df7\u7740\u7ec3\u6bd4\u6309\u7ae0\u8282\u7ec3\u66f4\u96be\uff0c\u4e5f\u8bb0\u5f97\u66f4\u7262\u3002</p><button class="btn" type="button" data-go="quiz-mix">\u5f00\u59cb\u4ea4\u9519\u7ec3\u4e60</button></div>';
      h += upcomingHTML();
      return h + '</div>';
    }
    var k = RV.queue[RV.i], cb = cardBody(k);
    if (!cb) { RV.i++; return vReview(); }
    h += '<div class="row small muted" style="justify-content:space-between;margin-bottom:6px"><span>\u7b2c ' + (RV.i + 1) + ' / ' + RV.queue.length + ' \u5f20</span><span>' + (cb.type === 'mcq' ? '\u9519\u9898\u5361 \u00b7 ' + esc(ownerTitle(qOwner(cb.qk))) : esc(ownerTitle(cb.src.id))) + '</span></div>';
    if (cb.type === 'mcq') {
      h += '<div class="card raised">' + mcq(cb.qk, cb.q, 'rv', 0) + '<div id="rvnext"></div></div>';
    } else {
      h += '<div class="card raised flash"><div class="front">' + cb.f + '</div>' + (RV.shown ? '<div class="back">' + cb.b + '</div>' : '') +
        (RV.shown ? '<div class="rate">' + [['\u5fd8\u4e86', 0], ['\u6a21\u7cca', 1], ['\u8bb0\u5f97', 2], ['\u5f88\u719f', 3]].map(function (r) { return '<button type="button" class="r' + r[1] + '" data-act="rate" data-r="' + r[1] + '">' + r[0] + '<span>' + nextIvl(k, r[1]) + '</span></button>'; }).join('') + '</div>' : '<button class="btn pri" type="button" data-act="show">\u60f3\u597d\u4e86\uff0c\u663e\u793a\u7b54\u6848</button>') + '</div>';
    }
    return h + '</div>';
  }
  function upcomingHTML() {
    var t = today(), counts = [];
    for (var i = 1; i <= 7; i++) { var d = addDays(t, i), c = 0; for (var k in S.cards) if (S.cards[k].due === d) c++; counts.push([d, c]); }
    var mx = Math.max.apply(null, counts.map(function (x) { return x[1]; }).concat([1]));
    return '<section class="sec"><h2 style="font-size:18px">\u672a\u6765 7 \u5929\u5230\u671f</h2><div class="card" style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;height:120px">' + counts.map(function (x) { return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end"><span class="num small">' + x[1] + '</span><span style="width:70%;background:var(--water);border-radius:3px;height:' + Math.round(x[1] / mx * 60) + 'px"></span><span class="small muted num">' + x[0].slice(5) + '</span></div>'; }).join('') + '</div></section>';
  }
  function rvAnswered(k, ok) {
    var ck = 'e:' + k;
    S.q[k] = S.q[k] ? { ok: S.q[k].ok, n: (S.q[k].n || 1) + 1, t: now(), last: ok } : { ok: false, n: 1, t: now(), last: ok };
    rateCard(ck, ok ? 2 : 0);
    if (!ok) { RV.queue.push(ck); RV.again++; }
    RV.n++;
    var el = $('#rvnext'); if (el) el.innerHTML = '<div class="row" style="margin-top:10px"><button class="btn pri" type="button" data-act="rvnext">\u4e0b\u4e00\u5f20</button></div>';
    buildNav();
  }

  /* ================= \u6d4b\u9a8c\u4f1a\u8bdd\uff08\u9884\u6d4b\u8bd5 / Boss / \u4ea4\u9519\uff09 ================= */
  var QS = null;
  function buildQuiz(kind, n) {
    var keys = [], r;
    if (kind === 'pre') {
      r = rng(hash('pre' + n));
      var ls = lessonsOf(n).filter(function (L) { return L.quiz && L.quiz.length; });
      ls = shuffle(ls, r).slice(0, 5);
      keys = ls.map(function (L) { return qKey(L.id, L.quiz.length > 1 ? 1 : 0); });
    } else if (kind === 'boss') {
      var att = (S.boss[n] && S.boss[n].n) || 0;
      r = rng(hash('boss' + n + ':' + att + ':' + today()));
      if (n === NDAY) {
        for (var d = 1; d <= NDAY; d++) keys = keys.concat(shuffle(dayPool(d), r).slice(0, d === NDAY ? 5 : 3 - (d % 2 === 0 ? 1 : 0)));
        keys = shuffle(keys, r).slice(0, 20);
      } else {
        keys = shuffle(dayPool(n), r).slice(0, n === 1 ? 10 : 7);
        var prev = []; for (var k = 1; k < n; k++) prev = prev.concat(dayPool(k));
        keys = keys.concat(shuffle(prev, r).slice(0, 10 - keys.length));
        keys = shuffle(keys, r);
      }
    } else {
      r = rng(now());
      var pool = []; for (var j = 1; j <= NDAY; j++) { if (lessonsOf(j).some(function (L) { return lessonDone(L.id); })) pool = pool.concat(dayPool(j)); }
      if (!pool.length) pool = dayPool(1);
      keys = shuffle(pool, r).slice(0, 10);
    }
    return { kind: kind, n: n, keys: keys, i: 0, ok: 0, answered: false, res: [] };
  }
  function vQuiz() {
    if (!QS || QS.kind !== R.kind || QS.n !== R.n) QS = buildQuiz(R.kind, R.n);
    var title = QS.kind === 'pre' ? '\u7b2c ' + QS.n + ' \u5929 \u00b7 \u9884\u6d4b\u8bd5' : QS.kind === 'boss' ? (QS.n === NDAY ? '\u7ec8\u6781 Boss' : '\u7b2c ' + QS.n + ' \u5929 \u00b7 Boss \u5173\u5361') : '\u4ea4\u9519\u7ec3\u4e60';
    var h = '<div class="wrap"><span class="lbl">' + title + '</span>';
    if (!QS.keys.length) return h + '<div class="empty">\u8fd9\u4e00\u5929\u8fd8\u6ca1\u6709\u9898\u76ee\u3002</div></div>';
    if (QS.i >= QS.keys.length) {
      var sc = QS.ok / QS.keys.length;
      var msg = '';
      if (QS.kind === 'pre') msg = '\u8fd9\u662f\u5b66\u4e4b\u524d\u7684\u6210\u7ee9\uff0c\u7b54\u5bf9\u591a\u5c11\u90fd\u6b63\u5e38\u3002\u4eca\u665a Boss \u5173\u5361\u4f1a\u51fa\u7c7b\u4f3c\u7684\u9898\uff0c\u5230\u65f6\u5019\u5bf9\u6bd4\u4e00\u4e0b\u3002';
      else if (QS.kind === 'boss') { var pre = S.pre[QS.n]; msg = (sc >= 0.8 ? '\u901a\u5173\uff01' : '\u8fd8\u5dee\u4e00\u70b9\uff0c80% \u901a\u5173\uff0c\u9519\u9898\u5df2\u7ecf\u8fdb\u4e86\u590d\u4e60\u3002') + (pre ? '\u3000\u65e9\u4e0a\u9884\u6d4b\u8bd5 ' + Math.round(pre.score * 100) + '% \u2192 \u73b0\u5728 ' + Math.round(sc * 100) + '%\u3002' : ''); }
      else msg = '\u9519\u7684\u9898\u5df2\u7ecf\u52a0\u5165\u590d\u4e60\u3002';
      h += '<div class="card raised" style="text-align:center;padding:26px"><div class="score">' + Math.round(sc * 100) + '%</div><p>' + QS.ok + ' / ' + QS.keys.length + ' \u9898\u7b54\u5bf9\u3002' + esc(msg) + '</p>' +
        '<div class="row" style="justify-content:center">' + (QS.kind === 'boss' && sc < 0.8 ? '<button class="btn veg" type="button" data-act="requiz">\u518d\u6311\u6218\u4e00\u6b21</button>' : '') + '<button class="btn" type="button" data-go="' + (QS.kind === 'mix' ? 'review' : 'today') + '">\u8fd4\u56de</button></div></div>';
      h += '<section class="sec"><h2 style="font-size:18px">\u9010\u9898\u56de\u987e</h2>' + QS.res.map(function (x, i) { var q = getQ(x.k); return '<div class="q"><div class="stem">' + (i + 1) + '. ' + q.q + ' <span class="pill ' + (x.ok ? 'ok' : 'veg') + '">' + (x.ok ? '\u5bf9' : '\u9519') + '</span></div><div class="expl ' + (x.ok ? 'r' : 'w') + '"><b>\u7b54\u6848 ' + 'ABCD'[q.a] + '\uff1a</b>' + q.o[q.a] + '\u3002' + (q.e || '') + '</div><div class="small muted">' + esc(ownerTitle(qOwner(x.k))) + '</div></div>'; }).join('') + '</section>';
      return h + '</div>';
    }
    var k = QS.keys[QS.i], q = getQ(k);
    h += '<div class="qhead"><span class="num small">' + (QS.i + 1) + ' / ' + QS.keys.length + '</span><div class="bar" style="flex:1"><i style="width:' + Math.round(QS.i / QS.keys.length * 100) + '%"></i></div><span class="num small">\u7b54\u5bf9 ' + QS.ok + '</span></div>' +
      '<div class="small muted">' + esc(ownerTitle(qOwner(k))) + '</div>' + mcq(k, q, QS.kind === 'pre' ? 'pre' : 'quiz', 0) + '<div id="qnext"></div>';
    return h + '</div>';
  }
  function quizAnswered(k, ok) {
    if (QS.answered) return; QS.answered = true;
    if (ok) QS.ok++;
    QS.res.push({ k: k, ok: ok });
    if (QS.kind === 'pre') recordAnswer(k, ok, 'pre');
    else { var first = !S.q[k]; recordAnswer(k, ok, 'quiz'); if (first && ok) toast('+10 XP'); }
    var el = $('#qnext');
    if (el) el.innerHTML = '<div class="row" style="margin-top:10px"><button class="btn pri" type="button" data-act="qnext">' + (QS.i + 1 < QS.keys.length ? '\u4e0b\u4e00\u9898' : '\u770b\u6210\u7ee9') + '</button></div>';
  }
  function quizNext() {
    QS.i++; QS.answered = false;
    if (QS.i >= QS.keys.length) {
      var sc = QS.ok / QS.keys.length;
      if (QS.kind === 'pre') { if (!S.pre[QS.n]) { S.pre[QS.n] = { score: sc, t: now() }; toast('+20 XP'); } }
      else if (QS.kind === 'boss') { var b = S.boss[QS.n]; var nb = { best: Math.max(sc, b ? b.best : 0), n: (b ? b.n || 1 : 0) + 1, t: now(), last: sc }; S.boss[QS.n] = nb; if (sc >= 0.8 && !(b && b.best >= 0.8)) toast('Boss \u901a\u5173 +150 XP'); }
      touch(); save();
    }
    render(); window.scrollTo(0, 0);
  }

  /* ================= \u7b14\u8bb0 ================= */
  function vNotes(n) {
    var cd = n || curDay();
    var h = '<div class="wrap"><span class="lbl">\u81ea\u52a8\u7b14\u8bb0</span><h1 style="font-size:28px;margin:6px 0 4px">\u6bcf\u5929\u5b66\u4e86\u4ec0\u4e48\uff0c\u81ea\u5df1\u8bf4\u8fc7\u4ec0\u4e48</h1>' +
      '<p class="muted" style="margin:0 0 12px">\u8bfe\u8282\u8981\u70b9\u3001\u4f60\u7684\u8d39\u66fc\u8bb2\u89e3\u3001\u968f\u624b\u7b14\u8bb0\u3001\u9519\u9898\u548c\u8bba\u6587\u603b\u7ed3\u4f1a\u81ea\u52a8\u6c47\u603b\u5230\u8fd9\u91cc\u3002\u53ef\u4ee5\u5bfc\u51fa\u6210 Markdown \u5b58\u6863\u6216\u53d1\u7ed9\u81ea\u5df1\u3002</p>' +
      '<div class="orbit" style="margin-bottom:14px">' + T.days.map(function (d, i) { var k = i + 1; return '<button type="button" data-go="notes-' + k + '"' + (k === cd ? ' aria-current="true"' : '') + '><span class="num">D' + k + '</span><span class="small muted" style="font-size:11px">' + countNotes(k) + ' \u6761</span></button>'; }).join('') + '</div>' +
      '<div class="row" style="margin-bottom:14px"><button class="btn" type="button" data-act="export" data-n="' + cd + '">\u5bfc\u51fa\u7b2c ' + cd + ' \u5929</button><button class="btn" type="button" data-act="export" data-n="0">\u5bfc\u51fa\u5168\u90e8</button>' + (AI.on ? '<button class="btn veg" type="button" data-act="aisum" data-n="' + cd + '">\u8bf7\u52a9\u6559\u6574\u7406\u8fd9\u4e00\u5929</button>' : '') + '</div>';
    var d = dayOf(cd);
    h += '<section class="card"><h2 style="font-size:20px">D' + cd + ' \u00b7 ' + esc(d.title) + '</h2>';
    var any = false;
    d.lessons.forEach(function (L) {
      var nt = N.les[L.id] || {}, done = lessonDone(L.id);
      var wrong = (L.quiz || []).map(function (q, i) { return qKey(L.id, i); }).filter(function (k) { return S.q[k] && !S.q[k].ok; });
      if (!done && !nt.feyn && !nt.txt && !wrong.length) return;
      any = true;
      h += '<div style="border-top:1px solid var(--line2);padding-top:12px;margin-top:12px"><div class="row" style="justify-content:space-between"><b>' + esc(L.title) + '</b>' + (done ? '<span class="pill ok">\u5df2\u5b8c\u6210</span>' : '<span class="pill">\u8fdb\u884c\u4e2d</span>') + '</div>' +
        (L.keys ? '<ol class="keys small">' + L.keys.map(function (k) { return '<li><span>' + k + '</span></li>'; }).join('') + '</ol>' : '') +
        (nt.feyn ? '<div class="box" style="margin:8px 0"><span class="lbl">\u6211\u7684\u8bb2\u89e3</span><p class="aitxt">' + esc(nt.feyn) + '</p></div>' : '') +
        (nt.txt ? '<div class="box" style="margin:8px 0"><span class="lbl">\u6211\u7684\u7b14\u8bb0</span><p class="aitxt">' + esc(nt.txt) + '</p></div>' : '') +
        (wrong.length ? '<div class="box warn" style="margin:8px 0"><span class="lbl">\u9519\u9898</span>' + wrong.map(function (k) { var q = getQ(k); return '<p>' + q.q + '<br><b>\u7b54\u6848\uff1a</b>' + q.o[q.a] + '</p>'; }).join('') + '</div>' : '') +
        '<button class="btn sm" type="button" data-go="lesson-' + L.id + '">\u6253\u5f00\u8fd9\u4e00\u8282</button></div>';
    });
    var pids = dayPaperIds(cd).concat(d.extra || []);
    var pp = pids.filter(function (id) { return paperPasses(id) || (N.pap[id] && N.pap[id].txt); });
    if (pp.length) {
      any = true;
      h += '<div style="border-top:1px solid var(--line2);padding-top:12px;margin-top:12px"><b>\u8bba\u6587</b>' + pp.map(function (id) { var P = paper(id), nt = N.pap[id] || {}; return '<p style="margin:8px 0"><button class="btn ghost sm" type="button" data-go="paper-' + id + '" style="padding:0">' + esc(P.short) + '</button> <span class="pill ' + P.tier + '">' + paperPasses(id) + ' \u904d</span><br>' + (nt.txt ? '<span class="aitxt">' + esc(nt.txt) + '</span>' : '<span class="muted small">\u8fd8\u6ca1\u5199\u4e00\u53e5\u8bdd\u603b\u7ed3</span>') + '</p>'; }).join('') + '</div>';
    }
    if (!any) h += '<div class="empty" style="margin-top:12px">\u8fd9\u4e00\u5929\u8fd8\u6ca1\u6709\u8bb0\u5f55\u3002\u5b8c\u6210\u8bfe\u8282\u3001\u5199\u8d39\u66fc\u8bb2\u89e3\u6216\u7b54\u9898\u540e\u4f1a\u81ea\u52a8\u51fa\u73b0\u3002</div>';
    var dn = N.day[cd] || {};
    h += '<div style="border-top:1px solid var(--line2);padding-top:12px;margin-top:12px"><b>\u4eca\u65e5\u53cd\u601d\u4e0e\u660e\u65e5\u8ba1\u5212</b><p class="small muted" style="margin:4px 0 6px">\u7761\u524d 10 \u5206\u949f\uff1a\u4eca\u5929\u6700\u91cd\u8981\u7684\u4e09\u4ef6\u4e8b\u662f\u4ec0\u4e48\uff1f\u54ea\u91cc\u8fd8\u7cca\u6d82\uff1f\u660e\u5929\u5148\u7528\u54ea\u4efd\u6750\u6599\u3001\u600e\u4e48\u7528\uff1f\uff08\u65af\u5766\u798f\u7684\u7814\u7a76\u53d1\u73b0\uff0c\u5148\u60f3\u6e05\u695a\u201c\u7528\u4ec0\u4e48\u8d44\u6e90\u3001\u600e\u4e48\u7528\u201d\u80fd\u660e\u663e\u63d0\u9ad8\u6210\u7ee9\u3002\uff09</p><textarea id="dnote-' + cd + '" data-note="day" data-id="' + cd + '" placeholder="1. \u4eca\u5929\u6700\u91cd\u8981\u7684\u4e09\u4ef6\u4e8b\u2026\u2026&#10;2. \u8fd8\u6ca1\u641e\u61c2\u7684\u2026\u2026&#10;3. \u660e\u5929\u5148\u2026\u2026">' + esc(dn.txt || '') + '</textarea><span class="savehint" id="sh-day-' + cd + '">' + (dn.txt ? '\u5df2\u4fdd\u5b58' : '') + '</span></div>';
    h += '<div id="aisumout"></div></section></div>';
    return h;
  }
  function countNotes(n) {
    var c = 0; lessonsOf(n).forEach(function (L) { var nt = N.les[L.id]; if (nt && (nt.feyn || nt.txt)) c++; });
    dayPaperIds(n).forEach(function (id) { if (N.pap[id] && N.pap[id].txt) c++; });
    if (N.day[n] && N.day[n].txt) c++;
    return c;
  }
  function notesMD(n) {
    var days = n ? [n] : [1, 2, 3, 4, 5, 6, 7], out = ['# \u5341\u7c73\u89c6\u754c \u00b7 \u5b66\u4e60\u7b14\u8bb0', '', '\u5bfc\u51fa\u65f6\u95f4\uff1a' + new Date().toLocaleString(), ''];
    days.forEach(function (k) {
      var d = dayOf(k); out.push('## D' + k + ' ' + d.title, '');
      d.lessons.forEach(function (L) {
        var nt = N.les[L.id] || {}, done = lessonDone(L.id);
        var wrong = (L.quiz || []).map(function (q, i) { return qKey(L.id, i); }).filter(function (x) { return S.q[x] && !S.q[x].ok; });
        if (!done && !nt.feyn && !nt.txt && !wrong.length) return;
        out.push('### ' + L.title + (done ? '' : '\uff08\u8fdb\u884c\u4e2d\uff09'), '');
        (L.keys || []).forEach(function (x) { out.push('- ' + strip(x)); });
        if (nt.feyn) out.push('', '**\u6211\u7684\u8bb2\u89e3**', '', nt.feyn);
        if (nt.txt) out.push('', '**\u6211\u7684\u7b14\u8bb0**', '', nt.txt);
        if (wrong.length) { out.push('', '**\u9519\u9898**', ''); wrong.forEach(function (x) { var q = getQ(x); out.push('- ' + strip(q.q) + ' \u2192 ' + strip(q.o[q.a])); }); }
        out.push('');
      });
      dayPaperIds(k).concat(d.extra || []).forEach(function (id) { var P = paper(id), nt = N.pap[id]; if (!paperPasses(id) && !(nt && nt.txt)) return; out.push('- \u8bba\u6587 **' + P.short + '**\uff08' + paperPasses(id) + ' \u904d\uff09\uff1a' + (nt && nt.txt ? nt.txt.replace(/\n/g, ' ') : '')); });
      if (N.day[k] && N.day[k].txt) out.push('', '**\u53cd\u601d\u4e0e\u8ba1\u5212**', '', N.day[k].txt);
      out.push('');
    });
    return out.join('\n');
  }
  async function exportNotes(n) {
    var md = notesMD(n), name = '\u5341\u7c73\u89c6\u754c\u7b14\u8bb0_' + (n ? 'D' + n + '_' : '\u5168\u90e8_') + today().replace(/-/g, '') + '.md';
    try {
      var dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
      if (dl) { await dl.save({ filename: name, data: md }); toast('\u5df2\u5bfc\u51fa'); return; }
    } catch (e) { if (e && e.code === 'declined') return; }
    try { await navigator.clipboard.writeText(md); toast('\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f\uff0c\u53ef\u4ee5\u7c98\u8d34\u5230\u4efb\u4f55\u7b14\u8bb0\u8f6f\u4ef6'); }
    catch (e) { modal('<h2 style="font-size:18px">\u590d\u5236\u4e0b\u9762\u7684\u7b14\u8bb0</h2><textarea readonly style="min-height:260px">' + esc(md) + '</textarea><div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn" type="button" data-act="mclose">\u5173\u95ed</button></div>'); }
  }

  /* ================= \u77e5\u8bc6\u5f71\u50cf ================= */
  function vMap() {
    var xp = computeXP(), lv = level(xp);
    var h = '<div class="wrap" style="max-width:780px"><span class="lbl">\u77e5\u8bc6\u5f71\u50cf</span><h1 style="font-size:28px;margin:6px 0 4px">\u628a\u4e91\u4e00\u5757\u5757\u6e05\u6389</h1>' +
      '<p class="muted" style="margin:0 0 12px">\u4e0b\u9762\u662f\u4e00\u666f\u88ab\u4e91\u76d6\u4f4f\u7684\u201c\u5047\u5f69\u8272\u5408\u6210\u201d\u94c1\u8def\u6cbf\u7ebf\u5f71\u50cf\uff1a\u690d\u88ab\u663e\u793a\u6210\u7ea2\u8272\uff0c\u6c34\u4f53\u53d1\u9ed1\uff0c\u623f\u5c4b\u504f\u9752\u7070\u3002\u6bcf\u5b8c\u6210\u4e00\u8282\u8bfe\u3001\u8bfb\u5b8c\u4e00\u7bc7\u8bba\u6587\u3001\u901a\u5173\u4e00\u4e2a Boss\uff0c\u5c31\u4f1a\u6563\u5f00\u4e00\u7247\u4e91\u3002\u4e03\u5929\u540e\u5b83\u5e94\u8be5\u662f\u4e00\u666f\u6674\u7a7a\u5f71\u50cf\u3002</p>' +
      '<canvas id="kmap" class="kmap" aria-label="\u77e5\u8bc6\u5f71\u50cf"></canvas><p class="small" id="kmapstat" style="margin:6px 0"></p>' +
      '<div class="legend"><span><i style="background:#b3173f"></i>\u6797\u5730</span><span><i style="background:#e2758f"></i>\u519c\u7530</span><span><i style="background:#0d1c2b"></i>\u6cb3\u6c34</span><span><i style="background:#2c4a5c"></i>\u6d51\u6c34</span><span><i style="background:#cdb894"></i>\u6c99\u6d32</span><span><i style="background:#4c5860"></i>\u94c1\u8def</span><span><i style="background:#8fa6b2"></i>\u5efa\u6210\u533a</span><span><i style="background:#a8927a"></i>\u88f8\u571f</span></div>' +
      '<section class="sec stats">' + stat(xp, 'XP \u00b7 ' + lv.name) + stat(streak(), '\u8fde\u7eed\u5929\u6570') + stat(allLessons().filter(function (L) { return lessonDone(L.id); }).length + '/' + allLessons().length, '\u8bfe\u8282') + stat(T.paperOrder.filter(paperDone).length + '/' + T.paperOrder.length, '\u8bba\u6587') + '</section>' +
      '<section class="sec"><h2>\u5fbd\u7ae0</h2><div class="badges">' + badgeList().map(function (b) { return '<div class="bdg' + (b[2] ? ' on' : '') + '"><b>' + b[0] + '</b>' + b[1] + '</div>'; }).join('') + '</div></section>';
    if (T.pipeline) h += '<section class="sec"><h2>\u9879\u76ee\u5168\u666f\uff1a\u77e5\u8bc6\u70b9\u843d\u5728\u54ea\u4e00\u73af</h2><p class="small muted" style="margin:0 0 10px">\u4ece\u4e00\u666f\u5f71\u50cf\u5230\u4e00\u5f20\u53ef\u7528\u7684\u53d8\u5316\u56fe\uff0c\u6bcf\u4e00\u73af\u90fd\u5bf9\u5e94\u51e0\u8282\u8bfe\u3002\u767e\u5206\u6bd4\u662f\u76f8\u5173\u8bfe\u8282\u7684\u5b8c\u6210\u5ea6\u3002</p><div class="pipe">' + T.pipeline.map(function (nd, i) {
      var ls = nd.lessons.filter(function (id) { return T.lessons[id]; }); var dn = ls.filter(lessonDone).length;
      return '<div class="node"><span class="lbl">' + (i + 1) + ' \u00b7 ' + Math.round(ls.length ? dn / ls.length * 100 : 0) + '%</span><b>' + esc(nd.t) + '</b><span class="small muted">' + esc(nd.d) + '</span><span class="chiprow">' + ls.map(function (id) { return '<button type="button" data-go="lesson-' + id + '">' + esc(T.lessons[id].title.replace(/\uff1a.*$/, '')) + '</button>'; }).join('') + '</span></div>';
    }).join('') + '</div></section>';
    return h + '</div>';
  }

  /* ================= \u65b9\u6cd5\u4e0e\u8bbe\u7f6e ================= */
  function vMethod() {
    var M = T.method || {};
    var h = '<div class="wrap"><span class="lbl">\u65b9\u6cd5\u4e0e\u8bbe\u7f6e</span>' + (M.html || '') +
      '<section class="sec card" id="settings"><h2 style="font-size:20px">\u8bbe\u7f6e</h2>' +
      '<div class="grid g2" style="margin-top:10px"><label>\u7b2c 1 \u5929\u7684\u65e5\u671f<input type="date" id="set-start" value="' + esc(S.start || today()) + '"></label>' +
      '<label>\u6bcf\u5929\u5f00\u59cb\u65f6\u95f4<input type="time" id="set-daystart" value="' + esc(S.set.dayStart) + '"></label>' +
      '<label>\u756a\u8304\u949f\u8282\u594f<select id="set-pomo"><option value="50/10"' + (S.set.pomo === '50/10' ? ' selected' : '') + '>\u4e13\u6ce8 50 \u00b7 \u4f11\u606f 10\uff08\u6df1\u5ea6\u5b66\u4e60\u63a8\u8350\uff09</option><option value="25/5"' + (S.set.pomo === '25/5' ? ' selected' : '') + '>\u4e13\u6ce8 25 \u00b7 \u4f11\u606f 5\uff08\u7ecf\u5178\u756a\u8304\uff09</option></select></label></div>' +
      '<div class="row" style="margin-top:10px"><button class="btn pri" type="button" data-act="saveset">\u4fdd\u5b58\u8bbe\u7f6e</button></div>' +
      '<hr style="border:0;border-top:1px solid var(--line);margin:18px 0"><h3 style="font-size:16px;font-family:var(--f-body)">\u8fdb\u5ea6\u5907\u4efd</h3><p class="small muted">\u767b\u5f55 Claude \u6253\u5f00\u540c\u4e00\u94fe\u63a5\u65f6\u8fdb\u5ea6\u4f1a\u81ea\u52a8\u8ddf\u7740\u8d26\u53f7\u8d70\u3002\u6ca1\u6709\u767b\u5f55\u6216\u522b\u4eba\u516c\u5f00\u67e5\u770b\u65f6\uff0c\u8fdb\u5ea6\u53ea\u5b58\u5728\u8fd9\u4e2a\u6d4f\u89c8\u5668\u91cc\uff0c\u53ef\u4ee5\u7528\u4e0b\u9762\u7684\u5907\u4efd\u7801\u5728\u53e6\u4e00\u53f0\u8bbe\u5907\u4e0a\u6062\u590d\u3002</p>' +
      '<div class="row"><button class="btn" type="button" data-act="backup">\u590d\u5236\u5907\u4efd\u7801</button><button class="btn" type="button" data-act="restore">\u7c98\u8d34\u5907\u4efd\u7801\u6062\u590d</button><button class="btn" type="button" data-act="reset" style="color:var(--bad)">\u6e05\u7a7a\u5168\u90e8\u8fdb\u5ea6</button></div><div id="bkout"></div></section></div>';
    return h;
  }

  /* ================= \u756a\u8304\u949f ================= */
  var PO = { phase: 'focus', left: 0, run: false, at: 0 };
  function pomoLens() { var p = (S.set.pomo || '50/10').split('/'); return { f: (+p[0] || 50) * 60, b: (+p[1] || 10) * 60 }; }
  function pomoInit() { var s = lsGet(LSP); var L = pomoLens(); if (s && s.left > 0) { PO = s; if (PO.run) { var el = (now() - PO.at) / 1000; PO.left = Math.max(0, PO.left - el); PO.at = now(); } } else { PO = { phase: 'focus', left: L.f, run: false, at: now() }; } pomoDraw(); setInterval(pomoTick, 1000); }
  var wake = null;
  function pomoToggle() {
    if (!PO.left) PO.left = pomoLens().f;
    PO.run = !PO.run; PO.at = now(); lsSet(LSP, PO); pomoDraw();
    if (PO.run) { toast(PO.phase === 'focus' ? '\u5f00\u59cb\u4e13\u6ce8\uff0c\u624b\u673a\u6263\u8fc7\u6765' : '\u4f11\u606f\u4e2d'); try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }).catch(function () { }); } catch (e) { } }
    else if (wake) { try { wake.release(); } catch (e) { } wake = null; }
  }
  function pomoTick() {
    if (!PO.run) return;
    var el = (now() - PO.at) / 1000; PO.at = now(); PO.left -= el;
    if (PO.left <= 0) {
      var L = pomoLens();
      if (PO.phase === 'focus') { var d = today(); var a = S.act[d] || { pomo: 0, t: 0 }; a.pomo = (a.pomo || 0) + 1; a.t = now(); S.act[d] = a; save(); buildNav(); beep(); toast('\u4e13\u6ce8\u5b8c\u6210 +15 XP\uff0c\u4f11\u606f ' + L.b / 60 + ' \u5206\u949f'); PO = { phase: 'break', left: L.b, run: true, at: now() }; }
      else { beep(); toast('\u4f11\u606f\u7ed3\u675f\uff0c\u51c6\u5907\u4e0b\u4e00\u4e2a\u4e13\u6ce8'); PO = { phase: 'focus', left: L.f, run: false, at: now() }; }
    }
    lsSet(LSP, PO); pomoDraw();
  }
  function pomoDraw() {
    var b = $('#pomo'), t = $('#pomot'); if (!b || !t) return;
    var s = Math.max(0, Math.round(PO.left)); t.textContent = pad2(Math.floor(s / 60)) + ':' + pad2(s % 60);
    b.classList.toggle('run', PO.run); b.title = (PO.phase === 'focus' ? '\u4e13\u6ce8' : '\u4f11\u606f') + (PO.run ? '\u4e2d\uff0c\u70b9\u4e00\u4e0b\u6682\u505c' : '\uff0c\u70b9\u4e00\u4e0b\u5f00\u59cb');
  }
  var actx = null;
  function beep() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); var o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = 880; g.gain.setValueAtTime(0.0001, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.2, actx.currentTime + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.9); o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + 0.95); } catch (e) { } }

  /* ================= \u52a9\u6559\uff08sample \u80fd\u529b\uff09 ================= */
  var AI = { on: false, s: null, turns: [], ctl: null, busy: false };
  var RULES = '\u4f60\u662f\u300c\u5341\u7c73\u89c6\u754c\u300d\u5b66\u4e60\u7cfb\u7edf\u91cc\u7684\u52a9\u6559\u3002\u5b66\u4e60\u8005\u662f\u521a\u5165\u95e8\u7684\u7814\u7a76\u751f\uff0c\u8981\u5728\u4e00\u5468\u5185\u638c\u63e1\u9065\u611f\u5f71\u50cf\u3001\u6df1\u5ea6\u5b66\u4e60\u3001\u8bed\u4e49\u5206\u5272\u3001\u53d8\u5316\u68c0\u6d4b\u3001\u6cb3\u5cb8\u6c34\u4f53\u4e0e\u591a\u6e90\u6570\u636e\u878d\u5408\uff0c\u670d\u52a1\u4e8e\u4e00\u4e2a\u94c1\u8def\u6cbf\u7ebf Sentinel-2 \u53d8\u5316\u68c0\u6d4b\u9879\u76ee\uff08\u4e09\u4e2a\u6d4b\u70b9\u300110 m\u3001\u53cc\u65f6\u76f8\u3001\u6807\u7b7e 1 \u53d8\u5316 / 0 \u7a33\u5b9a / 255 \u4e0d\u7528\uff0c\u8bc4\u4ef7\u7528\u7559\u4e00\u6d4b\u70b9\u548c\u65f6\u95f4\u5916\u63a8\u4e24\u79cd\u5212\u5206\uff09\u3002\n\u8981\u6c42\uff1a\u7528\u4e2d\u6587\uff1b\u5148\u7ed9\u7ed3\u8bba\u518d\u89e3\u91ca\uff1b\u5c3d\u91cf\u77ed\uff0c\u80fd\u7528 5 \u53e5\u8bdd\u8bf4\u6e05\u5c31\u522b\u5199 10 \u53e5\uff1b\u5148\u7ed9\u76f4\u89c9\u6216\u7c7b\u6bd4\uff0c\u518d\u7ed9\u4e25\u8c28\u5b9a\u4e49\uff1b\u4e0d\u786e\u5b9a\u7684\u4e8b\u5b9e\u76f4\u63a5\u8bf4\u4e0d\u786e\u5b9a\uff0c\u7edd\u4e0d\u7f16\u9020\u8bba\u6587\u6570\u5b57\u3001\u4f5c\u8005\u6216\u5e74\u4efd\uff1b\u6d89\u53ca\u9879\u76ee\u53ea\u7ed9\u65b9\u6cd5\u5c42\u9762\u7684\u5efa\u8bae\u3002';
  var AIQUICK = {
    lesson: [['\u8bb2\u5f97\u66f4\u7b80\u5355', '\u7528\u4e00\u4e2a\u9ad8\u4e2d\u751f\u80fd\u61c2\u7684\u6bd4\u55bb\uff0c\u628a\u8fd9\u4e00\u8282\u6700\u6838\u5fc3\u7684\u610f\u601d\u91cd\u65b0\u8bb2\u4e00\u904d\uff08200 \u5b57\u4ee5\u5185\uff09\uff0c\u518d\u6307\u51fa\u521d\u5b66\u8005\u6700\u5bb9\u6613\u8bef\u89e3\u7684\u4e00\u70b9\u3002'],
      ['\u4e3e\u9879\u76ee\u91cc\u7684\u4f8b\u5b50', '\u7ed3\u5408\u94c1\u8def\u6cbf\u7ebf Sentinel-2 \u53d8\u5316\u68c0\u6d4b\u9879\u76ee\uff0c\u4e3e\u4e00\u4e2a\u5177\u4f53\u4f8b\u5b50\u8bf4\u660e\u8fd9\u4e00\u8282\u7684\u6982\u5ff5\u600e\u4e48\u7528\uff0c\u4ee5\u53ca\u53ef\u80fd\u8e29\u7684\u5751\u3002'],
      ['\u51fa 3 \u9898\u8003\u6211', '\u6839\u636e\u8fd9\u4e00\u8282\u5185\u5bb9\u51fa 3 \u9053\u9009\u62e9\u9898\u8003\u6211\uff08\u6bcf\u9898 4 \u4e2a\u9009\u9879\uff09\uff0c\u9898\u76ee\u653e\u524d\u9762\uff0c\u6700\u540e\u5355\u72ec\u5217\u51fa\u7b54\u6848\u548c\u4e00\u53e5\u8bdd\u89e3\u6790\u3002'],
      ['\u6211\u54ea\u91cc\u53ef\u80fd\u6ca1\u61c2', '\u5217\u51fa\u8fd9\u4e00\u8282\u6700\u5bb9\u6613\u201c\u4ee5\u4e3a\u61c2\u4e86\u5176\u5b9e\u6ca1\u61c2\u201d\u7684 3 \u4e2a\u70b9\uff0c\u6bcf\u70b9\u7ed9\u4e00\u4e2a\u80fd\u81ea\u6d4b\u7684\u95ee\u9898\u3002']],
    paper: [['5 \u53e5\u8bdd\u6293\u4f4f\u5b83', '\u7528 5 \u53e5\u8bdd\u5e2e\u6211\u6293\u4f4f\u8fd9\u7bc7\u8bba\u6587\uff1a\u95ee\u9898\u3001\u65b9\u6cd5\u3001\u8bc1\u636e\u3001\u5c40\u9650\u3001\u5bf9\u6211\u4eec\u9879\u76ee\u7684\u7528\u5904\u3002'],
      ['\u7b2c\u4e8c\u904d\u76ef\u4ec0\u4e48', '\u6211\u51c6\u5907\u8bfb\u7b2c\u4e8c\u904d\u3002\u544a\u8bc9\u6211\u5e94\u8be5\u91cd\u70b9\u76ef\u4f4f\u54ea 3 \u4e2a\u56fe\u6216\u8868\uff0c\u5404\u81ea\u8981\u770b\u51fa\u4ec0\u4e48\uff0c\u4ee5\u53ca\u6700\u8be5\u6000\u7591\u7684\u4e00\u4e2a\u5730\u65b9\u3002'],
      ['\u548c\u522b\u7684\u65b9\u6cd5\u6bd4', '\u628a\u8fd9\u7bc7\u8bba\u6587\u548c\u540c\u4e3b\u9898\u7684\u7ecf\u5178\u65b9\u6cd5\u653e\u5728\u4e00\u8d77\u6bd4\u8f83\uff1a\u8f93\u5165\u3001\u76d1\u7763\u65b9\u5f0f\u3001\u8f93\u51fa\u3001\u9002\u4e0d\u9002\u5408 10 m Sentinel-2 \u53cc\u65f6\u76f8\u3002']]
  };
  function aiContext() {
    if (R.v === 'lesson') { var L = T.lessons[R.id]; return { title: 'D' + L.day + ' \u00b7 ' + L.title, text: '\u3010\u5f53\u524d\u8bfe\u8282\u3011' + L.title + '\n\u3010\u8981\u70b9\u3011' + (L.keys || []).map(strip).join('\uff1b') + '\n\u3010\u6b63\u6587\u8282\u9009\u3011' + strip(L.html).slice(0, 3500) }; }
    if (R.v === 'paper') { var P = paper(R.id); return { title: '\u8bba\u6587 \u00b7 ' + P.short, text: '\u3010\u5f53\u524d\u8bba\u6587\u3011' + P.title + '\uff08' + (P.venue || '') + ' ' + (P.year || '') + '\uff09\n\u4e00\u53e5\u8bdd\uff1a' + strip(P.one) + '\n\u95ee\u9898\uff1a' + strip(P.problem) + '\n\u65b9\u6cd5\uff1a' + strip(P.how) + '\n\u7ed3\u8bba\uff1a' + strip(P.find) + '\n\u5c40\u9650\uff1a' + strip(P.limit) + '\n\u5bf9\u9879\u76ee\uff1a' + strip(P.us) }; }
    if (R.v === 'day') { var d = dayOf(R.n); return { title: 'D' + R.n + ' \u00b7 ' + d.title, text: '\u3010\u5f53\u524d\u662f\u7b2c ' + R.n + ' \u5929\u3011' + d.title + '\uff1a' + d.goal }; }
    return { title: '\u5168\u5c40', text: '' };
  }
  function updateAIContext() { if (!AI.on) return; var c = aiContext(); var el = $('#aictx'); if (el) el.textContent = '\u5f53\u524d\u4e0a\u4e0b\u6587\uff1a' + c.title; var q = $('#aiq'); if (q) { var list = R.v === 'paper' ? AIQUICK.paper : R.v === 'lesson' ? AIQUICK.lesson : []; q.innerHTML = list.map(function (a, i) { return '<button type="button" data-act="' + (R.v === 'paper' ? 'aiqp' : 'aiq') + '" data-i="' + i + '">' + a[0] + '</button>'; }).join(''); } }
  async function initAI() {
    if (!window.claude || !window.claude.use) return;
    try { var s = await window.claude.use('sample'); if (!s) return; AI.s = s; AI.on = true; $('#aibtn').hidden = false; render(true); if (R.v === 'lesson' || R.v === 'paper' || R.v === 'notes') { var y = window.scrollY; render(); window.scrollTo(0, y); } } catch (e) { }
  }
  function aiOpen() { $('#ai').hidden = false; updateAIContext(); var ta = $('#aitext'); if (ta) ta.focus(); }
  function md(s) {
    var h = esc(s);
    h = h.replace(/^### (.*)$/gm, '<b>$1</b>').replace(/^## (.*)$/gm, '<b>$1</b>').replace(/^# (.*)$/gm, '<b>$1</b>');
    h = h.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
    var lines = h.split('\n'), out = [], inl = false;
    lines.forEach(function (ln) {
      var m = ln.match(/^\s*(?:[-*\u2022]|\d+[.)\u3001])\s+(.*)$/);
      if (m) { if (!inl) { out.push('<ul>'); inl = true; } out.push('<li>' + m[1] + '</li>'); }
      else { if (inl) { out.push('</ul>'); inl = false; } if (ln.trim()) out.push('<p>' + ln + '</p>'); }
    });
    if (inl) out.push('</ul>');
    return out.join('');
  }
  function aiRender() {
    var box = $('#aimsgs'); if (!box) return;
    box.innerHTML = AI.turns.length ? AI.turns.map(function (t) { return '<div class="msg ' + (t.role === 'user' ? 'u' : 'a') + '">' + (t.role === 'user' ? esc(t.show || t.content) : (t.content ? md(t.content) : '<span class="muted">\u601d\u8003\u4e2d\u2026</span>')) + '</div>'; }).join('') : '<div class="small muted">\u9009\u4e0a\u9762\u7684\u5feb\u6377\u95ee\u9898\uff0c\u6216\u76f4\u63a5\u6253\u5b57\u3002\u6bcf\u6b21\u63d0\u95ee\u90fd\u4f1a\u9644\u4e0a\u4f60\u6b63\u5728\u770b\u7684\u8bfe\u8282\u6216\u8bba\u6587\u3002</div>';
    box.scrollTop = box.scrollHeight;
    var b = $('#aisend'); if (b) b.textContent = AI.busy ? '\u505c\u6b62' : '\u53d1\u9001';
  }
  async function aiAsk(text, show, target) {
    if (!AI.on || !AI.s) return;
    if (AI.busy) { if (AI.ctl) AI.ctl.abort(); return; }
    if (!target) aiOpen();
    var ctx = aiContext();
    var turn = { role: 'user', content: text + (ctx.text ? '\n\n' + ctx.text : ''), show: show || text };
    var hist = target ? [] : AI.turns.filter(function (t) { return t.content; }).slice(-8);
    var msgs = [{ role: 'user', content: RULES }].concat(hist.map(function (t) { return { role: t.role, content: t.content }; })).concat([{ role: 'user', content: turn.content }]);
    var ans = { role: 'assistant', content: '' };
    if (!target) { AI.turns.push(turn); AI.turns.push(ans); }
    AI.busy = true; AI.ctl = new AbortController(); aiRender();
    var out = target ? $(target) : null; if (out) out.innerHTML = '<div class="msg a"><span class="muted">\u601d\u8003\u4e2d\u2026\uff08\u7b2c\u4e00\u6b21\u4f7f\u7528\u4f1a\u5148\u8be2\u95ee\u4f60\u662f\u5426\u5141\u8bb8\uff09</span></div>';
    try {
      await AI.s(msgs, { cache: false, signal: AI.ctl.signal, onText: function (u) { ans.content = u.text; if (out) out.innerHTML = '<div class="msg a">' + md(u.text) + '</div>'; else aiRender(); } });
    } catch (e) {
      var c = e && e.code;
      if (e && e.text) ans.content = e.text;
      if (c === 'not_granted' || c === 'sampling_disabled' || c === 'not_declared' || c === 'capability_disabled' || c === 'capability_removed') { AI.on = false; $('#aibtn').hidden = true; $('#ai').hidden = true; toast('\u8fd9\u4e2a\u9875\u9762\u73b0\u5728\u7528\u4e0d\u4e86\u52a9\u6559'); render(); }
      else if (c === 'rate_limited') ans.content = (ans.content || '') + '\n\n\uff08\u8bf7\u6c42\u592a\u9891\u7e41\u6216\u989d\u5ea6\u7528\u5b8c\u4e86\uff0c\u8fc7\u4e00\u4f1a\u513f\u518d\u8bd5\u3002\uff09';
      else if (c === 'session_expired') ans.content = '\u767b\u5f55\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55 Claude \u540e\u518d\u8bd5\u3002';
      else if (c !== 'cancelled') ans.content = (ans.content || '') + '\n\n\uff08\u56de\u7b54\u4e2d\u65ad\u4e86\uff0c\u53ef\u4ee5\u518d\u95ee\u4e00\u6b21\u3002\uff09';
      if (out) out.innerHTML = '<div class="msg a">' + md(ans.content || '\uff08\u6ca1\u6709\u56de\u7b54\uff09') + '</div>';
    } finally { AI.busy = false; AI.ctl = null; aiRender(); }
  }

  /* ================= \u5c0f\u90e8\u4ef6 ================= */
  function toast(msg) { var box = $('#toast'); if (!box) return; var d = document.createElement('div'); d.textContent = msg; box.appendChild(d); setTimeout(function () { d.remove(); }, 2600); }
  function modal(html) { var m = document.createElement('div'); m.className = 'modal'; m.innerHTML = '<div class="card raised">' + html + '</div>'; m.addEventListener('click', function (e) { if (e.target === m) m.remove(); }); document.body.appendChild(m); return m; }
  function confirmBox(msg, ok) { var m = modal('<p style="margin-top:0">' + msg + '</p><div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-x="no">\u53d6\u6d88</button><button class="btn veg" type="button" data-x="yes">\u786e\u5b9a</button></div>'); m.addEventListener('click', function (e) { var b = e.target.closest('[data-x]'); if (!b) return; m.remove(); if (b.getAttribute('data-x') === 'yes') ok(); }); }

  /* ================= \u4e8b\u4ef6 ================= */
  var noteTimers = {};
  function noteSave(ta) { var key = ta.id || ta.getAttribute('data-id'); clearTimeout(noteTimers[key]); noteTimers[key] = setTimeout(function () { noteSaveNow(ta); }, 700); }
  function noteSaveNow(ta) {
    var kind = ta.getAttribute('data-note'), id = ta.getAttribute('data-id'), v = ta.value;
    if (kind === 'feyn' || kind === 'txt') { var o = N.les[id] || {}; o[kind] = v; o.t = now(); N.les[id] = o; }
    else if (kind === 'pap') { N.pap[id] = { txt: v, t: now() }; }
    else if (kind === 'day') { N.day[id] = { txt: v, t: now() }; }
    touch(); saveN(); save();
    var sh = $('#sh-' + (kind === 'feyn' ? 'feyn' : kind === 'txt' ? 'txt' : kind === 'pap' ? 'pap' : 'day') + '-' + id); if (sh) sh.textContent = '\u5df2\u4fdd\u5b58 ' + clock(new Date().getHours() * 60 + new Date().getMinutes());
    buildNav();
  }
  function onClick(e) {
    var a = e.target.closest('[data-act]');
    if (a && a.getAttribute('data-act') === 'pass') return; // \u590d\u9009\u6846\u4ea4\u7ed9 change \u4e8b\u4ef6
    if (a) {
      var act = a.getAttribute('data-act');
      e.preventDefault(); e.stopPropagation();
      switch (act) {
        case 'start': S.start = today(); S.startT = now(); touch(); save(); toast('\u7b2c 1 \u5929\uff0c\u51fa\u53d1'); render(); return;
        case 'setday': var n0 = +a.getAttribute('data-n'); S.start = addDays(today(), -(n0 - 1)); S.startT = now(); save(); go('today'); return;
        case 'blk': var key = blkKey(+a.getAttribute('data-n'), +a.getAttribute('data-i')); var cur = S.blk[key]; S.blk[key] = { d: cur && cur.d ? 0 : now(), t: now() }; touch(); save(); render(); return;
        case 'done': var L = T.lessons[a.getAttribute('data-id')]; S.les[L.id] = { done: now(), t: now() }; introduce(L); touch(); save(); toast('+50 XP \u00b7 ' + (L.cards ? L.cards.length : 0) + ' \u5f20\u5361\u52a0\u5165\u590d\u4e60'); var yy = window.scrollY; render(); window.scrollTo(0, yy); return;
        case 'undone': S.les[a.getAttribute('data-id')] = { done: 0, t: now() }; save(); render(); return;
        case 'ans': answer(a); return;
        case 'show': RV.shown = true; render(); return;
        case 'rate': var k = RV.queue[RV.i], r = +a.getAttribute('data-r'); rateCard(k, r); RV.n++; if (r === 0) { RV.queue.push(k); RV.again++; } RV.i++; RV.shown = false; render(); window.scrollTo(0, 0); return;
        case 'rvnext': RV.i++; RV.shown = false; render(); window.scrollTo(0, 0); return;
        case 'rvagain': startRV(); render(); return;
        case 'qnext': quizNext(); return;
        case 'requiz': QS = buildQuiz(QS.kind, QS.n); render(); return;
        case 'pass': return;
        case 'pf': PF[a.getAttribute('data-f')] = a.getAttribute('data-v'); render(); return;
        case 'export': exportNotes(+a.getAttribute('data-n')); return;
        case 'saveset':
          var sv = $('#set-start').value, ds = $('#set-daystart').value, pm = $('#set-pomo').value;
          if (/^\d{4}-\d\d-\d\d$/.test(sv)) { S.start = sv; S.startT = now(); }
          if (/^\d\d:\d\d$/.test(ds)) S.set.dayStart = ds;
          if (pm !== S.set.pomo) { S.set.pomo = pm; if (!PO.run) { PO = { phase: 'focus', left: pomoLens().f, run: false, at: now() }; lsSet(LSP, PO); pomoDraw(); } }
          S.setT = now(); save(); toast('\u8bbe\u7f6e\u5df2\u4fdd\u5b58'); render(); return;
        case 'backup':
          var code = JSON.stringify({ s: S, n: N });
          var done2 = function () { toast('\u5907\u4efd\u7801\u5df2\u590d\u5236'); };
          if (navigator.clipboard) navigator.clipboard.writeText(code).then(done2, function () { $('#bkout').innerHTML = '<textarea readonly style="margin-top:10px">' + esc(code) + '</textarea>'; });
          else $('#bkout').innerHTML = '<textarea readonly style="margin-top:10px">' + esc(code) + '</textarea>';
          return;
        case 'restore':
          $('#bkout').innerHTML = '<textarea id="bkin" style="margin-top:10px" placeholder="\u628a\u5907\u4efd\u7801\u7c98\u8d34\u5230\u8fd9\u91cc"></textarea><button class="btn pri" type="button" data-act="restore2" style="margin-top:8px">\u5408\u5e76\u5230\u5f53\u524d\u8fdb\u5ea6</button>';
          return;
        case 'restore2':
          try { var o = JSON.parse($('#bkin').value); S = mergeS(S, o.s || {}); N = mergeN(N, o.n || {}); save(); saveN(); toast('\u5df2\u5408\u5e76'); render(); } catch (err) { toast('\u5907\u4efd\u7801\u683c\u5f0f\u4e0d\u5bf9'); }
          return;
        case 'reset':
          confirmBox('\u6e05\u7a7a\u540e\uff0c\u6240\u6709\u8bfe\u8282\u5b8c\u6210\u8bb0\u5f55\u3001\u590d\u4e60\u5361\u3001\u7b14\u8bb0\u90fd\u4f1a\u5220\u9664\uff08\u4e91\u7aef\u7684\u4e5f\u4f1a\u88ab\u8986\u76d6\uff09\u3002\u786e\u5b9a\u5417\uff1f', function () { S = blankS(); N = blankN(); RV = null; QS = null; save(); saveN(); pushRemote(); toast('\u5df2\u6e05\u7a7a'); go('today'); });
          return;
        case 'mclose': var mm = a.closest('.modal'); if (mm) mm.remove(); return;
        case 'aiq': var li = +a.getAttribute('data-i'); aiAsk(AIQUICK.lesson[li][1], AIQUICK.lesson[li][0]); return;
        case 'aiqp': var pi = +a.getAttribute('data-i'); aiAsk(AIQUICK.paper[pi][1], AIQUICK.paper[pi][0]); return;
        case 'grade':
          var lid = a.getAttribute('data-id'), LL = T.lessons[lid], ft = ($('#feyn-' + lid) || {}).value || '';
          if (ft.replace(/\s/g, '').length < 20) { toast('\u5148\u5199\u81f3\u5c11 20 \u4e2a\u5b57\u518d\u8bf7\u52a9\u6559\u6279\u6539'); return; }
          aiAsk('\u4e0b\u9762\u662f\u6211\u7528\u81ea\u5df1\u7684\u8bdd\u5199\u7684\u8bb2\u89e3\uff0c\u9898\u76ee\u662f\uff1a\u300c' + LL.feyn + '\u300d\u3002\u8bf7\u6309 \u51c6\u786e\u6027\u3001\u5b8c\u6574\u6027\u3001\u6e05\u6670\u5ea6 \u5404 0\u20135 \u5206\u6253\u5206\uff0c\u6307\u51fa 1\u20133 \u5904\u9519\u8bef\u6216\u9057\u6f0f\uff0c\u6700\u540e\u7ed9\u4e00\u4e2a 120 \u5b57\u4ee5\u5185\u7684\u6539\u8fdb\u7248\u672c\u3002\n\n\u6211\u7684\u8bb2\u89e3\uff1a\n' + ft, '\u8bf7\u6279\u6539\u6211\u7684\u8d39\u66fc\u8bb2\u89e3');
          return;
        case 'aisum':
          var dn = +a.getAttribute('data-n');
          aiAsk('\u628a\u4e0b\u9762\u8fd9\u4e00\u5929\u7684\u5b66\u4e60\u8bb0\u5f55\u6574\u7406\u6210\u4e00\u9875\u590d\u4e60\u7b14\u8bb0\uff1a\u2460 5 \u6761\u6838\u5fc3\u7ed3\u8bba\uff1b\u2461 3 \u7ec4\u6700\u5bb9\u6613\u6df7\u6dc6\u7684\u6982\u5ff5\u5bf9\u6bd4\uff1b\u2462 2 \u4e2a\u548c\u9879\u76ee\u76f8\u5173\u3001\u503c\u5f97\u7ee7\u7eed\u60f3\u7684\u95ee\u9898\uff1b\u2463 \u660e\u5929\u590d\u4e60\u5148\u770b\u4ec0\u4e48\u3002\u7528 Markdown\uff0c\u7b80\u6d01\u3002\n\n' + notesMD(dn).slice(0, 12000), '\u8bf7\u6574\u7406\u7b2c ' + dn + ' \u5929\u7684\u7b14\u8bb0', '#aisumout');
          return;
      }
      return;
    }
    var zc = e.target.closest('[data-zclose]');
    if (zc) { var zz = zc.closest('.figzoom'); if (zz) zz.remove(); return; }
    var fz = e.target.closest('figure.fig[data-zoom]');
    if (fz && !e.target.closest('a,button,input,select,textarea')) { openZoom(fz.getAttribute('data-zoom')); return; }
    var g = e.target.closest('[data-go]');
    if (g) { e.preventDefault(); go(g.getAttribute('data-go')); }
  }
  function openZoom(name) {
    var s = T.figs && T.figs[name]; if (!s) return;
    var old = $('.figzoom'); if (old) old.remove();
    var z = document.createElement('div'); z.className = 'figzoom'; z.setAttribute('role', 'dialog'); z.setAttribute('aria-label', '\u653e\u5927\u67e5\u770b\u7ed3\u6784\u56fe');
    z.innerHTML = '<div class="zbar"><b>' + esc(strip(s.cap || '\u7ed3\u6784\u56fe')).slice(0, 60) + '</b><button class="btn sm" type="button" data-zclose="1">\u5173\u95ed</button></div>' + T.figSVG(name) + '<p>' + (s.cap || '') + (s.src ? ' <span class="muted">' + s.src + '</span>' : '') + '</p><p class="small muted">\u624b\u673a\u4e0a\u53ef\u4ee5\u5de6\u53f3\u62d6\u52a8\u770b\u5168\u56fe\u3002</p>';
    document.body.appendChild(z);
    var cl = z.querySelector('[data-zclose]'); if (cl) cl.focus();
  }
  function onChange(e) {
    var t = e.target;
    if (t.matches && t.matches('input[data-act="pass"]')) {
      var id = t.getAttribute('data-id'), p = t.getAttribute('data-p');
      var o = S.pap[id] ? JSON.parse(JSON.stringify(S.pap[id])) : {};
      var wasDone = paperDone(id);
      o[p] = t.checked ? now() : 0;
      if (t.checked && p === 'p2' && !o.p1) o.p1 = now();
      if (t.checked && p === 'p3') { if (!o.p1) o.p1 = now(); if (!o.p2) o.p2 = now(); }
      o.t = now(); S.pap[id] = o; touch(); save();
      if (t.checked) toast(p === 'p1' ? '+10 XP' : p === 'p2' ? '+30 XP' : '+60 XP');
      if (!wasDone && paperDone(id)) setTimeout(function () { toast('\u6536\u96c6\u5230\u4e00\u5f20\u8bba\u6587\u5361'); }, 400);
      var y = window.scrollY; render(); window.scrollTo(0, y);
    }
  }
  function onInput(e) {
    var t = e.target;
    if (t.matches && t.matches('textarea[data-note]')) { autosize(t); noteSave(t); }
    if (t.id === 'pfq') { PF.q = t.value; var pos = t.selectionStart; render(); var nq = $('#pfq'); if (nq) { nq.focus(); try { nq.setSelectionRange(pos, pos); } catch (er) { } } }
    if (t.id === 'aitext') { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight + 2, 120) + 'px'; }
  }
  function onKey(e) {
    if (e.key === 'Escape') { var zz = $('.figzoom'); if (zz) { zz.remove(); return; } }
    if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'aitext') { e.preventDefault(); $('#aiform').requestSubmit ? $('#aiform').requestSubmit() : $('#aisend').click(); }
  }

  /* ================= \u542f\u52a8 ================= */
  function start(hot) {
    S = fixS(lsGet(LS)); N = fixN(lsGet(LSN));
    mainEl = $('#main');
    var h = (location.hash || '').replace(/^#/, '');
    R = h ? parse(h) : (hot && hot.route ? hot.route : { v: 'today' });
    document.addEventListener('click', onClick);
    document.addEventListener('change', onChange);
    document.addEventListener('input', onInput);
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', function () { R = parse((location.hash || '').replace(/^#/, '')); render(); });
    $('#pomo').addEventListener('click', function (e) { e.stopPropagation(); pomoToggle(); });
    $('#aibtn').addEventListener('click', function () { var p = $('#ai'); if (p.hidden) aiOpen(); else p.hidden = true; });
    $('#aiclose').addEventListener('click', function () { $('#ai').hidden = true; });
    $('#aiform').addEventListener('submit', function (e) { e.preventDefault(); var ta = $('#aitext'); var v = ta.value.trim(); if (AI.busy) { if (AI.ctl) AI.ctl.abort(); return; } if (!v) return; ta.value = ''; ta.style.height = '42px'; aiAsk(v); });
    setSync('local');
    render();
    pomoInit();
    try { if (window.claude && window.claude.hot && window.claude.hot.snapshot) window.claude.hot.snapshot(function () { return { route: R }; }); } catch (e) { }
    // \u5b57\u4f53\u5728\u9875\u9762\u6e32\u67d3\u540e\u518d\u52a0\u8f7d\uff0c\u907f\u514d\u7f51\u7edc\u6162\u65f6\u5361\u4f4f\u9996\u5c4f
    setTimeout(function () { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Noto+Serif+SC:wght@700;900&display=swap'; document.head.appendChild(l); }, 50);
    initDb();
    initAI();
  }
  T.app = { go: go, toast: toast };
  if (window.claude && window.claude.hot && window.claude.hot.ready) window.claude.hot.ready(start);
  else start((window.claude && window.claude.hot && window.claude.hot.data) || {});
})();
