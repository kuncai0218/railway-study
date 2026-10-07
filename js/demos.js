/* \u5341\u7c73\u89c6\u754c\uff1a\u4e92\u52a8\u6f14\u793a\u3002\u5408\u6210\u4e00\u4e2a 96\u00d796\u300110 m \u7684\u201c\u865a\u62df\u6d4b\u70b9\u201d\uff08\u6cb3\u6d41 + \u94c1\u8def + \u5c71\u5761 + \u519c\u7530 + \u57ce\u9547\uff09\uff0c
   \u771f\u5f69\u8272/\u5047\u5f69\u8272\u3001\u6307\u6570\u3001\u53d8\u5316\u68c0\u6d4b\u3001\u4f2a\u53d8\u5316\u3001\u6c34\u4f53\u63d0\u53d6\u3001\u6ce8\u610f\u529b\u7b49\u6f14\u793a\u90fd\u7528\u5b83\u3002\u5149\u8c31\u503c\u662f\u6309\u5178\u578b\u5730\u8868\u53cd\u5c04\u7387\u8bbe\u5b9a\u7684\u793a\u610f\u503c\u3002 */
(function () {
  'use strict';
  var T = window.TENM;
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#888'; }
  function f2(v) { return (Math.round(v * 100) / 100).toFixed(2); }
  function f3(v) { return (Math.round(v * 1000) / 1000).toFixed(3); }
  function hex(c) { c = c.replace('#', ''); return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; }
  function ramp(stops, t) { t = clamp(t, 0, 1); for (var i = 1; i < stops.length; i++) { if (t <= stops[i][0]) { var a = stops[i - 1], b = stops[i], u = (t - a[0]) / (b[0] - a[0]), ca = hex(a[1]), cb = hex(b[1]); return [ca[0] + (cb[0] - ca[0]) * u, ca[1] + (cb[1] - ca[1]) * u, ca[2] + (cb[2] - ca[2]) * u]; } } return hex(stops[stops.length - 1][1]); }
  var INFERNO = [[0, '#000004'], [0.25, '#420a68'], [0.5, '#932667'], [0.75, '#dd513a'], [1, '#fcffa4']];
  var DIVW = [[0, '#8c510a'], [0.5, '#f2efe6'], [1, '#0b5aa8']];
  var DIVV = [[0, '#8c510a'], [0.5, '#f2efe6'], [1, '#1b7837']];

  /* ================= \u5408\u6210\u5f71\u50cf ================= */
  var SC = (function () {
    var W = 96, H = 96, NP = W * H;
    // 6 \u4e2a\u6ce2\u6bb5\uff1aB2 \u84dd\u3001B3 \u7eff\u3001B4 \u7ea2\u3001B8 \u8fd1\u7ea2\u5916\u3001B11 \u77ed\u6ce2\u7ea2\u5916 1\u3001B12 \u77ed\u6ce2\u7ea2\u5916 2\uff08\u4e0e\u9879\u76ee 6 \u6ce2\u6bb5\u4e00\u81f4\uff09
    var LIB = {
      water: [0.060, 0.052, 0.030, 0.015, 0.008, 0.005], turbid: [0.080, 0.100, 0.090, 0.050, 0.020, 0.012],
      wetsand: [0.100, 0.130, 0.150, 0.180, 0.200, 0.160], sand: [0.130, 0.170, 0.220, 0.270, 0.350, 0.290],
      forest: [0.022, 0.048, 0.028, 0.320, 0.150, 0.070], grass: [0.040, 0.080, 0.060, 0.300, 0.220, 0.120],
      crop: [0.035, 0.085, 0.045, 0.400, 0.200, 0.095], harvest: [0.075, 0.105, 0.135, 0.205, 0.285, 0.225],
      built: [0.120, 0.130, 0.140, 0.180, 0.220, 0.200], rail: [0.095, 0.105, 0.115, 0.150, 0.205, 0.190],
      bare: [0.110, 0.145, 0.190, 0.240, 0.320, 0.270], cloud: [0.55, 0.56, 0.57, 0.58, 0.42, 0.32]
    };
    var CLS = ['water', 'turbid', 'wetsand', 'forest', 'grass', 'crop', 'built', 'rail', 'bare', 'harvest', 'sand'];
    var NAME = { water: '\u6e05\u6c34', turbid: '\u6d51\u6c34', wetsand: '\u6e7f\u6c99', forest: '\u6797\u5730', grass: '\u8349\u704c', crop: '\u519c\u7530', built: '\u5efa\u6210\u533a', rail: '\u94c1\u8def', bare: '\u88f8\u571f', harvest: '\u6536\u5272\u540e\u519c\u7530', sand: '\u5e72\u6c99\u6d32' };
    function riverY(x) { return 60 + 8 * Math.sin(x / 15 + 0.5) + 2.5 * Math.sin(x / 6.2 + 1.3); }
    function halfW(x) { return 5.2 + 1.3 * Math.sin(x / 11 + 2); }
    function railY(x) { return 60 + 8 * Math.sin(x / 15 + 0.5) - 13 + 1.2 * Math.sin(x / 23); }
    // \u5e73\u6ed1\u566a\u58f0
    function vnoise(seed, scale) { var g = rng(seed), gw = Math.ceil(W / scale) + 3, gh = Math.ceil(H / scale) + 3, grid = []; for (var i = 0; i < gw * gh; i++) grid.push(g()); return function (x, y) { var gx = x / scale, gy = y / scale, x0 = Math.floor(gx), y0 = Math.floor(gy), fx = gx - x0, fy = gy - y0; fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy); var a = grid[y0 * gw + x0], b = grid[y0 * gw + x0 + 1], c = grid[(y0 + 1) * gw + x0], d = grid[(y0 + 1) * gw + x0 + 1]; return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; }; }
    var nA = vnoise(11, 14), nB = vnoise(23, 7), nC = vnoise(37, 24), nD = vnoise(41, 3);
    // \u5730\u5f62\uff1a\u94c1\u8def\u4ee5\u5317\u662f\u5c71\uff0c\u8d8a\u5f80\u5317\u8d8a\u9ad8\uff0c\u5e26\u5c71\u810a
    var elev = new Float32Array(NP);
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) { var up = Math.max(0, railY(x) - y); elev[y * W + x] = up * 0.9 + 9 * nA(x, y) + 4 * Math.sin(x / 7 + y / 9) * Math.min(1, up / 10); }
    function shade(x, y, sunEl) {
      var i = y * W + x, xl = Math.max(0, x - 1), xr = Math.min(W - 1, x + 1), yu = Math.max(0, y - 1), yd = Math.min(H - 1, y + 1);
      var dzdx = (elev[y * W + xr] - elev[y * W + xl]) / 2, dzdy = (elev[yd * W + x] - elev[yu * W + x]) / 2;
      var nx = -dzdx * 0.8, ny = -dzdy * 0.8, nz = 1, nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
      var el = sunEl * Math.PI / 180, sx = Math.cos(el) * 0.7071, sy = Math.cos(el) * 0.7071, sz = Math.sin(el); // \u592a\u9633\u5728\u4e1c\u5357
      var cosi = (nx * sx + ny * sy + nz * sz) / nl, flat = sz;
      return clamp(cosi / flat, 0.15, 1.35);
    }
    // \u57fa\u7840\u5730\u7c7b\uff08t1\uff09
    var plotState = {}; var pr = rng(5);
    function plotId(x, y) { return Math.floor(x / 9) + ':' + Math.floor((y - 70) / 7); }
    function landClass(x, y) {
      var ry = riverY(x), hw = halfW(x), rl = railY(x);
      if (y === Math.round(rl)) return 'rail';
      if (y < rl) {
        if (x >= 74 && y >= rl - 13 && y <= rl - 2) return ((x % 5 === 0) || (y % 4 === 0 && x > 76)) ? 'grass' : 'built';
        var dx = (x - 34) / 4.2, dy = (y - 17) / 3.2; if (dx * dx + dy * dy < 1) return 'bare';
        return nB(x, y) > 0.8 ? 'grass' : 'forest';
      }
      if (y < ry - hw) return 'grass';
      if (y > ry + hw) {
        if (x >= 62 && x <= 65 && Math.abs(x - (63.5 + 1.5 * Math.sin(y / 4))) < 1.3) return 'turbidstream';
        if (x < 14 && y > 84) return (x % 4 === 1 || y % 4 === 2) ? 'grass' : 'built';
        if (y > ry + hw + 3) { var px = x % 9, py = (y - 70) % 7; if (px === 0 || py === 0) return 'grass'; var id = plotId(x, y); if (plotState[id] == null) plotState[id] = pr() < 0.25 ? 'harvest' : 'crop'; return plotState[id]; }
        return 'grass';
      }
      return 'grass';
    }
    function waterFrac(x, y, extra) {
      var c = 0;
      for (var sy = 0; sy < 4; sy++) for (var sx = 0; sx < 4; sx++) { var xx = x + (sx + 0.5) / 4 - 0.5, yy = y + (sy + 0.5) / 4 - 0.5; if (Math.abs(yy - riverY(xx)) < halfW(xx) + extra) c++; }
      return c / 16;
    }
    function inBar(x, y) { var dx = (x - 30) / 6.5, dy = (y - (riverY(30) + 0.5)) / 2.0; return dx * dx + dy * dy; }
    function inPoint(x, y) { var cy = riverY(74) + halfW(74) + 1.0; var dx = (x - 74) / 7, dy = (y - cy) / 2.0; return dx * dx + dy * dy; }
    var base = { cls: [], wf: new Float32Array(NP) };
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var i = y * W + x, lc = landClass(x, y), wf = waterFrac(x, y, 0);
      if (lc === 'turbidstream') { lc = 'turbid'; wf = 1; }
      var b = inBar(x, y), p = inPoint(x, y);
      if (b < 1) { wf = 0; lc = b < 0.45 ? 'sand' : 'wetsand'; }
      else if (p < 1) { wf = Math.min(wf, 0); lc = 'wetsand'; }
      base.cls.push(lc); base.wf[i] = wf;
    }
    var cache = {};
    function key(o) { return JSON.stringify(o || {}); }
    function mix(a, b, w) { return [a[0] * (1 - w) + b[0] * w, a[1] * (1 - w) + b[1] * w, a[2] * (1 - w) + b[2] * w, a[3] * (1 - w) + b[3] * w, a[4] * (1 - w) + b[4] * w, a[5] * (1 - w) + b[5] * w]; }
    // \u751f\u6210\u4e00\u671f\u5f71\u50cf\u3002o\uff1a{t2, slope, build, flood, harvest, cloud, haze, glint, shift, winter, seed}
    function image(o) {
      o = o || {}; var k = key(o); if (cache[k]) return cache[k];
      var bands = [0, 1, 2, 3, 4, 5].map(function () { return new Float32Array(NP); });
      var cls = new Array(NP), wfa = new Float32Array(NP), r = rng(o.t2 ? 202 : 101);
      var sunEl = o.winter ? 33 : 66, extra = o.flood ? 1.9 : 0;
      for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
        var i = y * W + x, lc = base.cls[i], wf = base.wf[i];
        if (o.flood) { var nwf = waterFrac(x, y, extra); if (inBar(x, y) < 1 || inPoint(x, y) < 1.35) nwf = 1; if (lc !== 'turbid' || wf < 1) wf = Math.max(wf, nwf); }
        if (o.slope) { var dx = (x - 50) / 4.5, dy = (y - (railY(50) - 7)) / 5; if (dx * dx + dy * dy < 1 && lc !== 'rail') lc = 'bare'; }
        if (o.build) { var ry0 = Math.round(railY(87)); if (x >= 84 && x <= 90 && y >= ry0 + 2 && y <= ry0 + 4 && wf < 0.5) lc = 'built'; }
        if (o.harvest && lc === 'crop') { var id = Math.floor(x / 9) + ':' + Math.floor((y - 70) / 7); if ((Math.floor(x / 9) * 7 + Math.floor((y - 70) / 7) * 3) % 2 === 0) lc = 'harvest'; }
        var land = LIB[lc === 'turbid' ? 'turbid' : lc];
        var spec = land.slice();
        var veg = lc === 'forest' || lc === 'grass' || lc === 'crop';
        if (lc === 'forest') { var tex = 0.9 + 0.2 * nD(x, y); spec = spec.map(function (v, bi) { return bi === 3 ? v * tex : v * (1.05 - 0.1 * nD(x, y)); }); }
        if (o.winter && veg) { spec[3] *= 0.72; spec[2] *= 1.45; spec[1] *= 1.05; spec[4] *= 1.08; if (lc === 'crop') spec = mix(spec, LIB.harvest, 0.35); }
        var hilly = y < railY(x) && lc !== 'built' && lc !== 'rail';
        if (hilly) { var s = shade(x, y, sunEl); spec = spec.map(function (v, bi) { return v * s + (s < 0.6 ? [0.012, 0.008, 0.005, 0.003, 0.001, 0.0005][bi] * (0.6 - s) : 0); }); }
        if (wf > 0) { var wat = (o.flood || x > 63) ? LIB.turbid : LIB.water; if (lc === 'turbid') wat = LIB.turbid; spec = mix(spec, wat, wf); }
        if (o.glint && wf > 0) { spec = spec.map(function (v, bi) { return v + wf * 0.13 * [1, 1, 1, 0.98, 0.9, 0.85][bi]; }); }
        if (o.haze) { var hz = 0.065 * (1 - x / W) * (0.7 + 0.3 * nC(x, y)); spec = spec.map(function (v, bi) { return v + hz * [1, 0.75, 0.55, 0.3, 0.1, 0.05][bi]; }); }
        if (o.cloud) {
          var cd = Math.hypot(x - 22, y - 30) / 7.5, ca = clamp(1.25 - cd, 0, 1); ca = ca * ca * (3 - 2 * ca);
          var sd = Math.hypot(x - 15, y - 23) / 7.5, sa = clamp(1.25 - sd, 0, 1); sa = sa * sa * (3 - 2 * sa);
          if (sa > 0) spec = spec.map(function (v, bi) { return v * (1 - 0.68 * sa) + sa * [0.01, 0.007, 0.004, 0.002, 0.001, 0.0005][bi]; });
          if (ca > 0) spec = mix(spec, LIB.cloud, ca * 0.95);
        }
        for (var bb = 0; bb < 6; bb++) { var nz = 1 + (r() - 0.5) * 0.06; bands[bb][i] = Math.max(0.0005, spec[bb] * nz); }
        cls[i] = wf >= 0.5 ? (lc === 'turbid' || o.flood || x > 63 ? 'turbid' : 'water') : lc; wfa[i] = wf;
      }
      if (o.shift) { bands = bands.map(function (bd) { var nb = new Float32Array(NP); for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) nb[y * W + x] = bd[y * W + Math.max(0, x - 1)]; return nb; }); }
      var res = { b: bands, cls: cls, wf: wfa, o: o };
      cache[k] = res; return res;
    }
    function draw(cv, img, mode, opt) {
      opt = opt || {}; cv.width = W; cv.height = H; var ctx = cv.getContext('2d'), id = ctx.createImageData(W, H), d = id.data, b = img.b;
      for (var i = 0; i < NP; i++) {
        var rr, gg, bb2;
        if (mode === 'fc') { rr = b[3][i] * 2.3; gg = b[2][i] * 3.2; bb2 = b[1][i] * 3.4; }
        else if (mode === 'sw') { rr = b[5][i] * 2.6; gg = b[3][i] * 2.2; bb2 = b[2][i] * 3.2; }
        else if (mode === 'gray') { var gv = (b[0][i] + b[1][i] + b[2][i]) / 3 * 3.6; rr = gg = bb2 = gv; }
        else { rr = b[2][i] * 3.6; gg = b[1][i] * 3.5; bb2 = b[0][i] * 3.6; }
        d[i * 4] = 255 * Math.pow(clamp(rr, 0, 1), 0.8); d[i * 4 + 1] = 255 * Math.pow(clamp(gg, 0, 1), 0.8); d[i * 4 + 2] = 255 * Math.pow(clamp(bb2, 0, 1), 0.8); d[i * 4 + 3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      return ctx;
    }
    function index(img, kind) {
      var b = img.b, out = new Float32Array(NP);
      for (var i = 0; i < NP; i++) {
        var B2 = b[0][i], B3 = b[1][i], B4 = b[2][i], B8 = b[3][i], B11 = b[4][i], B12 = b[5][i];
        if (kind === 'ndvi') out[i] = (B8 - B4) / (B8 + B4);
        else if (kind === 'ndwi') out[i] = (B3 - B8) / (B3 + B8);
        else if (kind === 'mndwi') out[i] = (B3 - B11) / (B3 + B11);
        else if (kind === 'awei') out[i] = 4 * (B3 - B11) - (0.25 * B8 + 2.75 * B12);
        else if (kind === 'bsi') out[i] = ((B11 + B4) - (B8 + B2)) / ((B11 + B4) + (B8 + B2));
      }
      return out;
    }
    function drawField(cv, arr, lo, hi, stops) {
      cv.width = W; cv.height = H; var ctx = cv.getContext('2d'), id = ctx.createImageData(W, H), d = id.data;
      for (var i = 0; i < NP; i++) { var c = ramp(stops, (arr[i] - lo) / (hi - lo)); d[i * 4] = c[0]; d[i * 4 + 1] = c[1]; d[i * 4 + 2] = c[2]; d[i * 4 + 3] = 255; }
      ctx.putImageData(id, 0, 0); return ctx;
    }
    return { W: W, H: H, NP: NP, LIB: LIB, NAME: NAME, image: image, draw: draw, index: index, drawField: drawField, riverY: riverY, halfW: halfW, railY: railY };
  })();
  T.SC = SC;

  function canvasEl(scale) { var c = document.createElement('canvas'); c.style.width = '100%'; c.style.maxWidth = (scale || 384) + 'px'; c.style.aspectRatio = '1'; return c; }
  function segHTML(name, opts, cur) { return '<span class="seg" role="group">' + opts.map(function (o) { return '<button type="button" data-' + name + '="' + o[0] + '" aria-pressed="' + (o[0] === cur) + '">' + o[1] + '</button>'; }).join('') + '</span>'; }
  function setSeg(root, name, v) { $$('[data-' + name + ']', root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-' + name) === v)); }); }

  var D = {};

  /* ---------- 1. \u5149\u8c31\u66f2\u7ebf ---------- */
  var SPEC = {
    bands: [['B2', 490, 10, '\u84dd'], ['B3', 560, 10, '\u7eff'], ['B4', 665, 10, '\u7ea2'], ['B5', 705, 20, '\u7ea2\u8fb9 1'], ['B6', 740, 20, '\u7ea2\u8fb9 2'], ['B7', 783, 20, '\u7ea2\u8fb9 3'], ['B8', 842, 10, '\u8fd1\u7ea2\u5916'], ['B8A', 865, 20, '\u7a84\u8fd1\u7ea2\u5916'], ['B11', 1610, 20, '\u77ed\u6ce2\u7ea2\u5916 1'], ['B12', 2190, 20, '\u77ed\u6ce2\u7ea2\u5916 2']],
    cls: [
      ['\u6797\u5730', '#1b7837', [0.022, 0.048, 0.028, 0.085, 0.23, 0.29, 0.32, 0.33, 0.15, 0.07]],
      ['\u751f\u957f\u671f\u519c\u7530', '#7fbf3f', [0.035, 0.085, 0.045, 0.12, 0.30, 0.37, 0.40, 0.41, 0.20, 0.095]],
      ['\u6e05\u6c34', '#0b5aa8', [0.06, 0.052, 0.03, 0.022, 0.018, 0.016, 0.015, 0.013, 0.008, 0.005]],
      ['\u6d51\u6c34', '#3f8fb5', [0.08, 0.10, 0.09, 0.085, 0.07, 0.06, 0.05, 0.045, 0.02, 0.012]],
      ['\u6e7f\u6c99', '#c2a46b', [0.10, 0.13, 0.15, 0.16, 0.17, 0.175, 0.18, 0.185, 0.20, 0.16]],
      ['\u5e72\u88f8\u571f', '#9e6418', [0.13, 0.17, 0.22, 0.24, 0.255, 0.265, 0.27, 0.28, 0.35, 0.29]],
      ['\u5efa\u6210\u533a', '#7b7f86', [0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.185, 0.22, 0.20]],
      ['\u4e91', '#b9c3be', [0.55, 0.56, 0.57, 0.575, 0.58, 0.58, 0.58, 0.58, 0.42, 0.32]]
    ],
    use: { B2: '\u5927\u6c14\u548c\u6c34\u4f53\u7a7f\u900f\u6700\u597d\uff0c\u4f46\u6700\u53d7\u8584\u96fe\u5f71\u54cd', B3: '\u6c34\u4f53\u6307\u6570 NDWI\u3001MNDWI \u7684\u5206\u5b50', B4: '\u53f6\u7eff\u7d20\u5f3a\u5438\u6536\uff0cNDVI \u7684\u5206\u6bcd\u5173\u952e', B5: '\u7ea2\u8fb9\uff1a\u690d\u88ab\u5065\u5eb7\u4e0e\u80c1\u8feb\u6700\u654f\u611f', B6: '\u7ea2\u8fb9', B7: '\u7ea2\u8fb9', B8: '\u690d\u88ab\u5f3a\u53cd\u5c04\u3001\u6c34\u4f53\u5f3a\u5438\u6536\uff1a\u5206\u6c34\u9646\u6700\u597d\u7528\u7684\u6ce2\u6bb5\u4e4b\u4e00', B8A: '\u7a84\u8fd1\u7ea2\u5916\uff0c20 m\uff0c\u5e38\u548c\u7ea2\u8fb9\u4e00\u8d77\u7528', B11: '\u571f\u58e4\u4e0e\u5efa\u7b51\u4eae\u3001\u6c34\u6697\uff1aMNDWI \u7684\u5173\u952e\uff1b\u4e5f\u770b\u690d\u88ab\u542b\u6c34', B12: '\u88f8\u571f\u3001\u5ca9\u77f3\u3001\u706b\u70e7\u8ff9\u5730\u654f\u611f' }
  };
  D.spectrum = function (root) {
    var on = [true, true, true, true, false, true, true, false];
    root.innerHTML = '<div class="dh"><b>\u5149\u8c31\u66f2\u7ebf\u63a2\u7d22\u5668</b><span class="small muted">\u70b9\u7c7b\u522b\u5f00\u5173\u66f2\u7ebf\uff1b\u70b9\u6ce2\u6bb5\u770b\u7528\u9014\uff08\u793a\u610f\u503c\uff09</span></div><div class="chiprow" data-r="chips"></div><div style="overflow-x:auto"><svg data-r="svg" viewBox="0 0 640 300" style="min-width:520px;width:100%"></svg></div><div class="out" data-r="info"></div><div class="tbl" style="margin-top:8px"><table data-r="tbl"></table></div>';
    var svg = $('[data-r=svg]', root), chips = $('[data-r=chips]', root), info = $('[data-r=info]', root), tbl = $('[data-r=tbl]', root);
    var sel = 6;
    function drawIt() {
      chips.innerHTML = SPEC.cls.map(function (c, i) { return '<button type="button" data-ci="' + i + '" aria-pressed="' + on[i] + '" style="border-color:' + c[1] + ';' + (on[i] ? 'background:' + c[1] + ';color:#fff' : '') + '">' + c[0] + '</button>'; }).join('');
      var X0 = 52, X1 = 620, Y0 = 20, Y1 = 250, nb = SPEC.bands.length, dx = (X1 - X0) / (nb - 1);
      var ymax = 0.6, yy = function (v) { return Y1 - v / ymax * (Y1 - Y0); };
      var s = '';
      for (var g = 0; g <= 6; g++) { var v = g * 0.1; s += '<line x1="' + X0 + '" x2="' + X1 + '" y1="' + yy(v) + '" y2="' + yy(v) + '" stroke="currentColor" stroke-opacity=".12"/><text x="' + (X0 - 8) + '" y="' + (yy(v) + 4) + '" text-anchor="end" font-size="11">' + v.toFixed(1) + '</text>'; }
      SPEC.bands.forEach(function (b, i) { var x = X0 + i * dx; s += '<rect x="' + (x - dx / 2 + 2) + '" y="' + Y0 + '" width="' + (dx - 4) + '" height="' + (Y1 - Y0) + '" fill="' + (i === sel ? 'currentColor' : 'transparent') + '" fill-opacity=".07" data-bi="' + i + '" style="cursor:pointer"/><text x="' + x + '" y="' + (Y1 + 16) + '" text-anchor="middle" font-size="11" font-weight="' + (i === sel ? 700 : 400) + '">' + b[0] + '</text><text x="' + x + '" y="' + (Y1 + 30) + '" text-anchor="middle" font-size="9.5" opacity=".7">' + b[1] + '</text>'; });
      SPEC.cls.forEach(function (c, ci) { if (!on[ci]) return; var pts = c[2].map(function (v, i) { return (X0 + i * dx) + ',' + yy(v); }).join(' '); s += '<polyline points="' + pts + '" fill="none" stroke="' + c[1] + '" stroke-width="2.4"/>' + c[2].map(function (v, i) { return '<circle cx="' + (X0 + i * dx) + '" cy="' + yy(v) + '" r="3" fill="' + c[1] + '"/>'; }).join(''); });
      s += '<text x="12" y="' + ((Y0 + Y1) / 2) + '" font-size="11" transform="rotate(-90 12 ' + ((Y0 + Y1) / 2) + ')" text-anchor="middle">\u5730\u8868\u53cd\u5c04\u7387</text>';
      svg.innerHTML = s;
      var b = SPEC.bands[sel]; info.innerHTML = '<b>' + b[0] + '</b>\uff08' + b[3] + '\uff0c\u4e2d\u5fc3\u7ea6 ' + b[1] + ' nm\uff0c' + b[2] + ' m\uff09\uff1a' + SPEC.use[b[0]];
      var idx = function (c) { var v = c[2], B2 = v[0], B3 = v[1], B4 = v[2], B8 = v[6], B11 = v[8]; return [(B8 - B4) / (B8 + B4), (B3 - B8) / (B3 + B8), (B3 - B11) / (B3 + B11), (B11 - B8) / (B11 + B8)]; };
      tbl.innerHTML = '<tr><th>\u7c7b\u522b</th><th>NDVI</th><th>NDWI</th><th>MNDWI</th><th>NDBI</th></tr>' + SPEC.cls.map(function (c) { var v = idx(c); return '<tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + c[1] + ';margin-right:6px"></i>' + c[0] + '</td>' + v.map(function (x) { return '<td class="num" style="color:' + (x > 0 ? 'var(--ink)' : 'var(--muted)') + '">' + f2(x) + '</td>'; }).join('') + '</tr>'; }).join('');
    }
    root.addEventListener('click', function (e) { var c = e.target.closest('[data-ci]'); if (c) { var i = +c.getAttribute('data-ci'); on[i] = !on[i]; drawIt(); return; } var b = e.target.closest('[data-bi]'); if (b) { sel = +b.getAttribute('data-bi'); drawIt(); } });
    drawIt();
  };

  /* ---------- 2. \u6ce2\u6bb5\u5408\u6210 ---------- */
  D.composite = function (root) {
    var mode = 'tc';
    var MODES = [['tc', '\u771f\u5f69\u8272 4-3-2'], ['fc', '\u5047\u5f69\u8272 8-4-3'], ['sw', '\u77ed\u6ce2\u7ea2\u5916 12-8-4'], ['ndvi', 'NDVI'], ['mndwi', 'MNDWI']];
    var TXT = {
      tc: '\u4eba\u773c\u770b\u5230\u7684\u989c\u8272\u3002\u6cb3\u6c34\u504f\u6697\u7eff\u3001\u6d51\u6c34\u504f\u9ec4\uff0c\u6797\u5730\u6df1\u7eff\uff0c\u88f8\u571f\u548c\u623f\u5c4b\u53d1\u4eae\u3002\u6ce8\u610f\uff1a\u6797\u5730\u548c\u8349\u5730\u5728\u771f\u5f69\u8272\u91cc\u5dee\u522b\u5f88\u5c0f\u3002',
      fc: '\u8fd1\u7ea2\u5916\u653e\u8fdb\u7ea2\u8272\u901a\u9053\u3002\u5065\u5eb7\u690d\u88ab\u8fd1\u7ea2\u5916\u5f88\u4eae\uff0c\u6240\u4ee5\u6574\u7247\u5c71\u53d8\u6210\u7ea2\u8272\uff1b\u6c34\u4f53\u8fd1\u7ea2\u5916\u51e0\u4e4e\u4e3a\u96f6\uff0c\u53d8\u6210\u9ed1\u8272\u3002\u8fd9\u662f\u9065\u611f\u4eba\u6700\u5e38\u7528\u7684\u201c\u770b\u690d\u88ab\u201d\u5408\u6210\u3002',
      sw: '\u77ed\u6ce2\u7ea2\u5916\u5408\u6210\u3002\u88f8\u571f\u548c\u5efa\u7b51\u5728\u77ed\u6ce2\u7ea2\u5916\u5f88\u4eae\uff0c\u504f\u7c89\u7d2b\u6216\u4eae\u8272\uff1b\u6c34\u4f9d\u65e7\u6700\u6697\u3002\u5206\u8fa8\u88f8\u571f\u3001\u6c99\u6d32\u548c\u690d\u88ab\u6700\u6e05\u695a\u3002',
      ndvi: 'NDVI =\uff08B8 \u2212 B4\uff09/\uff08B8 + B4\uff09\u3002\u7eff\u8d8a\u6df1\u690d\u88ab\u8d8a\u8302\u76db\uff0c\u68d5\u8272\u662f\u88f8\u571f\u3001\u5efa\u7b51\u548c\u6c34\u3002',
      mndwi: 'MNDWI =\uff08B3 \u2212 B11\uff09/\uff08B3 + B11\uff09\u3002\u84dd\u8272\u662f\u6c34\uff1b\u5efa\u7b51\u548c\u88f8\u571f\u5728 B11 \u5f88\u4eae\uff0c\u6240\u4ee5\u88ab\u538b\u6210\u8d1f\u503c\u2014\u2014\u8fd9\u6b63\u662f\u5b83\u6bd4 NDWI \u66f4\u4e0d\u5bb9\u6613\u628a\u57ce\u9547\u8bef\u5224\u6210\u6c34\u7684\u539f\u56e0\u3002'
    };
    root.innerHTML = '<div class="dh"><b>\u865a\u62df\u6d4b\u70b9\uff1a\u6ce2\u6bb5\u5408\u6210\u4e0e\u6307\u6570</b><span class="small muted">96 \u00d7 96 \u50cf\u5143\uff0c10 m\uff0c\u7ea6 960 m \u89c1\u65b9</span></div><div class="ctrl">' + segHTML('m', MODES, mode) + '</div><div data-r="cv"></div><p class="out" data-r="txt"></p>';
    var cv = canvasEl(420); $('[data-r=cv]', root).appendChild(cv);
    function show() {
      var img = SC.image({});
      if (mode === 'ndvi') SC.drawField(cv, SC.index(img, 'ndvi'), -0.6, 0.9, DIVV);
      else if (mode === 'mndwi') SC.drawField(cv, SC.index(img, 'mndwi'), -0.8, 0.8, DIVW);
      else SC.draw(cv, img, mode);
      $('[data-r=txt]', root).textContent = TXT[mode];
      setSeg(root, 'm', mode);
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-m]'); if (b) { mode = b.getAttribute('data-m'); show(); } });
    show();
  };

  /* ---------- 3. \u50cf\u5143\u5c3a\u5ea6 ---------- */
  D.pixel = function (root) {
    root.innerHTML = '<div class="dh"><b>10 m \u50cf\u5143\u91cc\u88c5\u5f97\u4e0b\u4ec0\u4e48</b><span class="small muted">\u6bcf\u683c = \u4e00\u4e2a Sentinel-2 10 m \u50cf\u5143</span></div><div style="overflow-x:auto"><svg viewBox="0 0 620 330" style="min-width:480px;width:100%" data-r="s"></svg></div><p class="out">\u4e00\u6761\u5355\u7ebf\u94c1\u8def\u7684\u8def\u57fa\u5bbd\u7ea6 7\u201310 m\u3001\u53cc\u7ebf\u7ea6 12\u201315 m\uff0c\u5728 10 m \u5f71\u50cf\u91cc\u53ea\u5360 1\u20132 \u4e2a\u50cf\u5143\uff0c\u800c\u4e14\u51e0\u4e4e\u603b\u662f\u201c\u6df7\u5408\u50cf\u5143\u201d\uff08\u4e00\u90e8\u5206\u662f\u9053\u781f\uff0c\u4e00\u90e8\u5206\u662f\u8fb9\u5761\u8349\uff09\u3002\u4e00\u680b 12 \u00d7 8 m \u7684\u623f\u5b50\u53ef\u80fd\u88ab 4 \u4e2a\u50cf\u5143\u5207\u5f00\uff0c\u6bcf\u4e2a\u50cf\u5143\u91cc\u53ea\u5360\u4e00\u5c0f\u5757\u3002\u6240\u4ee5 10 m \u5f71\u50cf\u64c5\u957f\u53d1\u73b0<b>\u6210\u7247</b>\u7684\u53d8\u5316\uff08\u51e0\u767e\u5e73\u65b9\u7c73\u4ee5\u4e0a\u7684\u88f8\u9732\u3001\u6269\u5efa\u3001\u6c34\u9762\uff09\uff0c\u5f88\u96be\u770b\u6e05\u5355\u680b\u623f\u5b50\u6216\u4e00\u6839\u7535\u7ebf\u6746\u3002</p>';
    var s = '', C = 52, ox = 12, oy = 14, nx = 11, ny = 6;
    for (var y = 0; y < ny; y++) for (var x = 0; x < nx; x++) s += '<rect x="' + (ox + x * C) + '" y="' + (oy + y * C) + '" width="' + C + '" height="' + C + '" fill="none" stroke="currentColor" stroke-opacity=".25"/>';
    s += '<rect x="' + ox + '" y="' + (oy + 1.4 * C) + '" width="' + nx * C + '" height="' + (0.95 * C) + '" fill="#8a8f96" fill-opacity=".55"/>';
    s += '<line x1="' + ox + '" x2="' + (ox + nx * C) + '" y1="' + (oy + 1.8 * C) + '" y2="' + (oy + 1.8 * C) + '" stroke="#3a3f45" stroke-width="2"/><line x1="' + ox + '" x2="' + (ox + nx * C) + '" y1="' + (oy + 1.94 * C) + '" y2="' + (oy + 1.94 * C) + '" stroke="#3a3f45" stroke-width="2"/>';
    s += '<text x="' + (ox + 6) + '" y="' + (oy + 1.3 * C) + '" font-size="12">\u94c1\u8def\u8def\u57fa\u7ea6 10 m\uff08\u5355\u7ebf\uff09</text>';
    s += '<rect x="' + (ox + 6.3 * C) + '" y="' + (oy + 3.15 * C) + '" width="' + (1.2 * C) + '" height="' + (0.8 * C) + '" fill="#c96a3a" fill-opacity=".75"/><text x="' + (ox + 6.3 * C) + '" y="' + (oy + 3.05 * C) + '" font-size="12">\u623f\u5c4b 12 \u00d7 8 m</text>';
    s += '<path d="M' + ox + ' ' + (oy + 4.9 * C) + ' C ' + (ox + 3 * C) + ' ' + (oy + 4.3 * C) + ', ' + (ox + 6 * C) + ' ' + (oy + 5.4 * C) + ', ' + (ox + nx * C) + ' ' + (oy + 4.6 * C) + ' L ' + (ox + nx * C) + ' ' + (oy + ny * C) + ' L ' + ox + ' ' + (oy + ny * C) + ' Z" fill="#1d5f9b" fill-opacity=".55"/><text x="' + (ox + 8.3 * C) + '" y="' + (oy + 5.55 * C) + '" font-size="12" fill="#fff">\u6cb3\u6c34</text>';
    s += '<rect x="' + (ox + 2 * C) + '" y="' + (oy + 2.9 * C) + '" width="' + (2.6 * C) + '" height="' + (1.0 * C) + '" fill="#9e6418" fill-opacity=".55"/><text x="' + (ox + 2 * C) + '" y="' + (oy + 2.8 * C) + '" font-size="12">\u4e00\u7247 26 \u00d7 10 m \u7684\u88f8\u571f</text>';
    s += '<text x="' + (ox + nx * C - 2) + '" y="' + (oy + ny * C + 14) + '" text-anchor="end" font-size="11" opacity=".7">110 m \u00d7 60 m</text>';
    $('[data-r=s]', root).innerHTML = s;
  };

  /* ---------- 4. \u53d8\u5316\u68c0\u6d4b\u4e0e\u4f2a\u53d8\u5316\u4fa6\u63a2 ---------- */
  var FACT = [
    ['slope', '\u5761\u9762\u88f8\u9732\uff08\u6ed1\u584c/\u5f00\u6316\uff09', 'real'], ['build', '\u65b0\u5efa\u623f\u5c4b', 'real'], ['flood', '\u6cb3\u6c34\u4e0a\u6da8\u6df9\u6ca1\u6c99\u6d32', 'real'], ['harvest', '\u519c\u7530\u6536\u5272', 'real'],
    ['cloud', '\u4e91\u548c\u4e91\u5f71', 'pseudo'], ['haze', '\u8584\u96fe', 'pseudo'], ['glint', '\u6c34\u9762\u8000\u6591', 'pseudo'], ['shift', '\u9519\u4f4d 1 \u50cf\u5143', 'pseudo'], ['winter', '\u51ac\u5b63\uff08\u4f4e\u592a\u9633\u89d2 + \u690d\u88ab\u67af\u9ec4\uff09', 'pseudo']
  ];
  var HOT = {
    slope: [{ x: 50, y: function () { return SC.railY(50) - 7; }, a: ['rel'], why: '\u5c71\u5761\u6797\u5730\u53d8\u6210\u88f8\u571f\uff0c\u79bb\u94c1\u8def\u53ea\u6709\u7ea6 70 m\uff1a\u8fd9\u662f\u9879\u76ee\u6700\u5173\u5fc3\u7684\u201c\u76f8\u5173\u53d8\u5316\u201d\u3002' }],
    build: [{ x: 87, y: function () { return SC.railY(87) + 3; }, a: ['rel'], why: '\u94c1\u8def\u548c\u6cb3\u4e4b\u95f4\u65b0\u51fa\u73b0\u4e86\u623f\u5c4b\uff1a\u771f\u5b9e\u7684\u4eba\u4e3a\u53d8\u5316\uff0c\u9760\u8fd1\u7ebf\u8def\uff0c\u5c5e\u4e8e\u8981\u68c0\u51fa\u7684\u53d8\u5316\u3002' }],
    flood: [{ x: 30, y: function () { return SC.riverY(30); }, a: ['rel', 'irr'], why: '\u6c99\u6d32\u88ab\u6c34\u6df9\u6ca1\uff1a\u5730\u8868\u786e\u5b9e\u53d8\u4e86\uff08\u6c34\u60c5\u53d8\u5316\uff09\u3002\u6cb3\u5cb8\u7ebf\u7814\u7a76\u5173\u5fc3\u5b83\uff1b\u94c1\u8def\u5b89\u5168\u770b\u5b83\u662f\u5426\u903c\u8fd1\u94c1\u8def\u3002\u6309\u9879\u76ee\u89c4\u5219\uff0c\u6210\u7247\u3001\u6301\u7eed\u7684\u6da8\u843d\u8981\u6807\uff0c\u6240\u4ee5\u4e24\u79cd\u7b54\u6848\u90fd\u7b97\u5bf9\u3002' }],
    harvest: [{ x: 22, y: 81, a: ['irr'], why: '\u519c\u7530\u6536\u5272\u540e\u53d8\u6210\u88f8\u7530\uff1a\u771f\u5b9e\u53d8\u5316\uff0c\u4f46\u5e74\u5e74\u53d1\u751f\u3001\u662f\u5468\u671f\u6027\u519c\u4e8b\uff0c\u4e00\u822c\u4e0d\u662f\u6211\u4eec\u8981\u62a5\u8b66\u7684\u5bf9\u8c61\u3002\u9879\u76ee\u91cc\u8981\u6807\uff0c\u4f46\u8981\u8bb0\u5f55\u5b83\u7684\u5468\u671f\u6027\u3002' }],
    cloud: [{ x: 22, y: 30, a: ['pse'], why: '\u4e91\uff1a\u5730\u9762\u6ca1\u6709\u53d8\uff0c\u662f\u89c2\u6d4b\u65f6\u88ab\u6321\u4f4f\u4e86\u3002\u8fd9\u7c7b\u533a\u57df\u5e94\u6807\u4e3a\u201c\u770b\u4e0d\u6e05\u201d\uff08255\uff09\uff0c\u4e0d\u80fd\u5f53\u6210\u201c\u6ca1\u53d8\u201d\u6216\u201c\u53d8\u4e86\u201d\u3002' }, { x: 15, y: 23, a: ['pse'], why: '\u4e91\u5f71\uff1a\u4e91\u6321\u4f4f\u9633\u5149\uff0c\u6797\u5730\u53d8\u6697\uff0c\u770b\u8d77\u6765\u50cf\u6c34\u6216\u88f8\u571f\uff0c\u5176\u5b9e\u5730\u9762\u6ca1\u53d8\u3002\u6ce8\u610f\u5b83\u603b\u5728\u4e91\u80cc\u7740\u592a\u9633\u7684\u4e00\u4fa7\u3002' }],
    haze: [{ x: 8, y: 44, a: ['pse'], why: '\u8584\u96fe\uff1a\u6574\u7247\u533a\u57df\u84dd\u5149\u504f\u9ad8\u3001\u53d1\u7070\uff0c\u6240\u6709\u5730\u7269\u4e00\u8d77\u201c\u53d8\u201d\u4e86\u3002\u771f\u53d8\u5316\u4e00\u822c\u53ea\u53d1\u751f\u5728\u5c40\u90e8\u3002' }],
    glint: [{ x: 70, y: function () { return SC.riverY(70); }, a: ['pse'], why: '\u6c34\u9762\u8000\u6591\uff1a\u536b\u661f\u6b63\u597d\u63a5\u8fd1\u9633\u5149\u7684\u955c\u9762\u53cd\u5c04\u65b9\u5411\uff0c\u6c34\u9762\u4ece\u53ef\u89c1\u5149\u5230\u77ed\u6ce2\u7ea2\u5916\u4e00\u8d77\u53d8\u4eae\uff0c\u9646\u5730\u4e0d\u53d8\u3002' }],
    shift: [{ x: 40, y: function () { return SC.railY(40); }, a: ['pse'], why: '\u9519\u4f4d\uff1a\u4e24\u671f\u6ca1\u6709\u5bf9\u9f50\uff0c\u94c1\u8def\u3001\u7530\u57c2\u3001\u623f\u5c4b\u8fb9\u7f18\u4f1a\u51fa\u73b0\u6210\u5bf9\u7684\u7ec6\u957f\u6761\u5e26\u3002\u771f\u53d8\u5316\u5f88\u5c11\u662f\u4e00\u6761\u7ec6\u7ebf\u6cbf\u7740\u5730\u7269\u8fb9\u7f18\u3002' }],
    winter: [{ x: 58, y: 13, a: ['pse'], why: '\u51ac\u5b63\u592a\u9633\u4f4e\uff0c\u5c71\u5761\u80cc\u9633\u9762\u9634\u5f71\u53d8\u6df1\uff1a\u5149\u7167\u9020\u6210\u7684\u8868\u89c2\u53d8\u5316\uff0c\u5c5e\u4e8e\u4f2a\u53d8\u5316\u3002' }, { x: 52, y: 79, a: ['irr'], why: '\u4f5c\u7269\u548c\u8349\u5730\u51ac\u5b63\u67af\u9ec4\uff1a\u690d\u88ab\u786e\u5b9e\u53d8\u4e86\uff0c\u4f46\u662f\u5b63\u8282\u6027\u7684\uff0c\u5c5e\u4e8e\u201c\u771f\u5b9e\u4f46\u5468\u671f\u6027\u201d\u7684\u53d8\u5316\u3002' }]
  };
  D.cd = function (root) {
    var lite = root.getAttribute('data-mode') === 'lite';
    var st = lite ? { cloud: true, glint: true } : { slope: true, build: true, harvest: true, cloud: true, glint: true };
    var th = 0.12, view = 'mag', gt = 'focus', ans = {}, submitted = false;
    root.innerHTML = '<div class="dh"><b>' + (lite ? '\u770b\u770b\u4f2a\u53d8\u5316\u957f\u4ec0\u4e48\u6837' : '\u53d8\u5316\u68c0\u6d4b\u5b9e\u9a8c\u53f0 \u00b7 \u4f2a\u53d8\u5316\u4fa6\u63a2') + '</b><span class="small muted">\u52fe\u9009\u8fd9\u4e00\u671f\u53d1\u751f\u4e86\u4ec0\u4e48\uff0c\u5de6\u8fb9\u524d\u56fe\u3001\u53f3\u8fb9\u540e\u56fe</span></div>' +
      '<div class="ctrl" data-r="tg"></div><div class="cv2"><figure><div data-r="c1"></div><figcaption>\u524d\u56fe t1\uff08\u590f\u5b63\uff09</figcaption></figure><figure><div data-r="c2"></div><figcaption>\u540e\u56fe t2</figcaption></figure>' + (lite ? '' : '<figure><div data-r="c3"></div><figcaption data-r="cap3"></figcaption></figure>') + '</div>' +
      (lite ? '<p class="out">\u6253\u5f00\u201c\u4e91\u548c\u4e91\u5f71\u201d\u201c\u6c34\u9762\u8000\u6591\u201d\u201c\u9519\u4f4d\u201d\u201c\u51ac\u5b63\u201d\uff0c\u6bd4\u8f83\u524d\u540e\u4e24\u5f20\u56fe\uff1a\u8fd9\u4e9b\u5dee\u5f02\u90fd\u4e0d\u662f\u5730\u9762\u771f\u7684\u53d8\u4e86\u3002\u4e0b\u9762\u7b2c 4 \u5929\u4f1a\u5728\u8fd9\u4e2a\u5b9e\u9a8c\u53f0\u4e0a\u7528 CVA \u505a\u53d8\u5316\u68c0\u6d4b\uff0c\u770b\u770b\u5b83\u4eec\u4f1a\u9020\u6210\u591a\u5c11\u8bef\u62a5\u3002</p>' :
        '<div class="ctrl">' + segHTML('v', [['mag', '\u5dee\u5f02\u5f3a\u5ea6 |\u0394|'], ['det', '\u68c0\u6d4b\u7ed3\u679c']], view) + '<label>\u9608\u503c <input type="range" min="0.02" max="0.4" step="0.005" value="' + th + '" data-r="th" style="width:160px"> <span class="num" data-r="thv"></span></label>' + segHTML('g', [['focus', '\u53ea\u7b97\u5173\u6ce8\u53d8\u5316'], ['all', '\u6240\u6709\u771f\u5b9e\u53d8\u5316']], gt) + '</div>' +
        '<div class="mrow" data-r="met"></div><p class="small muted" data-r="legend"></p>' +
        '<div class="panel" style="margin-top:12px;padding-top:12px"><b>\u4fa6\u63a2\u4efb\u52a1</b>\uff1a\u53f3\u56fe\u4e0a\u7684\u7f16\u53f7\u662f\u5dee\u5f02\u6700\u5927\u7684\u51e0\u5904\u3002\u6bcf\u5904\u5224\u65ad\u5b83\u662f\u54ea\u4e00\u7c7b\uff0c\u7136\u540e\u63d0\u4ea4\u3002<div data-r="hot"></div><div class="row" style="margin-top:8px"><button class="btn pri" type="button" data-r="sub">\u63d0\u4ea4\u5224\u65ad</button><span class="small" data-r="hres"></span></div></div>');
    var tg = $('[data-r=tg]', root);
    tg.innerHTML = FACT.filter(function (f) { return !lite || f[2] === 'pseudo'; }).map(function (f) { return '<label><input type="checkbox" data-f="' + f[0] + '"' + (st[f[0]] ? ' checked' : '') + '> <span style="color:' + (f[2] === 'real' ? 'var(--veg)' : 'var(--water)') + '">' + (f[2] === 'real' ? '\u771f \u00b7 ' : '\u4f2a \u00b7 ') + '</span>' + f[1] + '</label>'; }).join('');
    var c1 = canvasEl(300), c2 = canvasEl(300), c3 = lite ? null : canvasEl(300);
    $('[data-r=c1]', root).appendChild(c1); $('[data-r=c2]', root).appendChild(c2); if (c3) $('[data-r=c3]', root).appendChild(c3);
    function opts2() { var o = { t2: true }; FACT.forEach(function (f) { if (st[f[0]]) o[f[0]] = true; }); return o; }
    function hotspots() { var hs = []; FACT.forEach(function (f) { if (st[f[0]] && HOT[f[0]]) HOT[f[0]].forEach(function (h) { hs.push({ f: f[0], x: h.x, y: typeof h.y === 'function' ? h.y() : h.y, a: h.a, why: h.why }); }); }); return hs; }
    function show() {
      var A = SC.image({}), B = SC.image(opts2());
      SC.draw(c1, A, 'tc'); var ctx2 = SC.draw(c2, B, 'tc');
      if (lite) return;
      var W = SC.W, NP = SC.NP, mag = new Float32Array(NP), mx = 0;
      for (var i = 0; i < NP; i++) { var s = 0; for (var b = 0; b < 6; b++) { var d = B.b[b][i] - A.b[b][i]; s += d * d; } mag[i] = Math.sqrt(s); if (mag[i] > mx) mx = mag[i]; }
      // \u771f\u503c\uff1a\u6240\u6709\u771f\u5b9e\u53d8\u5316 / \u5173\u6ce8\u53d8\u5316\uff08\u5761\u9762 + \u623f\u5c4b\uff09
      var G0 = SC.image({ t2: true, slope: st.slope, build: st.build, flood: st.flood, harvest: st.harvest });
      var gAll = new Uint8Array(NP), gFoc = new Uint8Array(NP);
      var Gs = SC.image({ t2: true, slope: st.slope }), Gb = SC.image({ t2: true, build: st.build });
      for (i = 0; i < NP; i++) { gAll[i] = (G0.cls[i] !== A.cls[i]) ? 1 : 0; gFoc[i] = ((st.slope && Gs.cls[i] !== A.cls[i]) || (st.build && Gb.cls[i] !== A.cls[i])) ? 1 : 0; }
      var G = gt === 'all' ? gAll : gFoc, tp = 0, fp = 0, fn = 0;
      var ctx = c3.getContext('2d'); c3.width = W; c3.height = SC.H; var id = ctx.createImageData(W, SC.H), dd = id.data;
      var gray = new Float32Array(NP); for (i = 0; i < NP; i++) gray[i] = clamp((B.b[0][i] + B.b[1][i] + B.b[2][i]) / 3 * 3.4, 0, 1);
      for (i = 0; i < NP; i++) {
        var det = mag[i] > th ? 1 : 0;
        if (det && G[i]) tp++; else if (det && !G[i]) fp++; else if (!det && G[i]) fn++;
        var c;
        if (view === 'mag') c = ramp(INFERNO, Math.sqrt(mag[i] / Math.max(mx, 1e-6)));
        else { var g = 60 + 120 * gray[i]; c = [g, g, g]; if (det && G[i]) c = [43, 210, 127]; else if (det) c = [255, 140, 58]; else if (G[i]) c = [214, 58, 255]; }
        dd[i * 4] = c[0]; dd[i * 4 + 1] = c[1]; dd[i * 4 + 2] = c[2]; dd[i * 4 + 3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      var hs = hotspots();
      [ctx, ctx2].forEach(function (cx) { cx.font = 'bold 7px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; hs.forEach(function (h, k) { cx.beginPath(); cx.arc(h.x, h.y, 4.6, 0, Math.PI * 2); cx.fillStyle = 'rgba(0,0,0,.65)'; cx.fill(); cx.strokeStyle = '#fff'; cx.lineWidth = 0.8; cx.stroke(); cx.fillStyle = '#fff'; cx.fillText(String(k + 1), h.x, h.y + 0.3); }); });
      var P = tp + fp ? tp / (tp + fp) : 0, Rr = tp + fn ? tp / (tp + fn) : 0, F = P + Rr ? 2 * P * Rr / (P + Rr) : 0, IoU = tp + fp + fn ? tp / (tp + fp + fn) : 0;
      $('[data-r=thv]', root).textContent = th.toFixed(3);
      $('[data-r=cap3]', root).textContent = view === 'mag' ? 'CVA \u5dee\u5f02\u5f3a\u5ea6\uff1a6 \u4e2a\u6ce2\u6bb5\u5dee\u5411\u91cf\u7684\u957f\u5ea6' : '\u68c0\u6d4b\u7ed3\u679c\uff08\u7eff=\u68c0\u5bf9\uff0c\u6a59=\u8bef\u62a5\uff0c\u7d2b=\u6f0f\u68c0\uff09';
      $('[data-r=met]', root).innerHTML = [['\u7cbe\u786e\u7387 P', P], ['\u53ec\u56de\u7387 R', Rr], ['F1', F], ['IoU', IoU]].map(function (m) { return '<span class="metric"><span class="v">' + f2(m[1]) + '</span><span class="k">' + m[0] + '</span></span>'; }).join('') + '<span class="metric"><span class="v">' + fp + '</span><span class="k">\u8bef\u62a5\u50cf\u5143</span></span>';
      $('[data-r=legend]', root).textContent = (gt === 'focus' ? '\u201c\u5173\u6ce8\u53d8\u5316\u201d\u53ea\u7b97\u5761\u9762\u88f8\u9732\u548c\u65b0\u5efa\u623f\u5c4b\u3002' : '\u201c\u6240\u6709\u771f\u5b9e\u53d8\u5316\u201d\u8fd8\u5305\u62ec\u6536\u5272\u548c\u6c34\u4f4d\u4e0a\u6da8\u3002') + '\u540c\u4e00\u4e2a\u68c0\u6d4b\u7ed3\u679c\uff0c\u6362\u4e00\u79cd\u53d8\u5316\u5b9a\u4e49\uff0c\u5206\u6570\u5c31\u53d8\u4e86\uff1a\u5199\u8bba\u6587\u3001\u6bd4\u65b9\u6cd5\u65f6\u4e00\u5b9a\u5148\u8bf4\u6e05\u695a\u201c\u4ec0\u4e48\u7b97\u53d8\u5316\u201d\u3002';
      var hb = $('[data-r=hot]', root);
      if (!hs.length) { hb.innerHTML = '<p class="small muted">\u52fe\u9009\u4e0a\u9762\u7684\u9009\u9879\uff0c\u5236\u9020\u4e00\u4e9b\u53d8\u5316\u3002</p>'; return; }
      hb.innerHTML = hs.map(function (h, k) {
        var a = ans[k], res = '';
        if (submitted) { var ok = h.a.indexOf(a) >= 0; res = '<div class="expl ' + (ok ? 'r' : 'w') + '">' + (ok ? '\u5bf9\u3002' : '\u4e0d\u5bf9\u3002') + h.why + '</div>'; }
        return '<div class="hot"><span class="n">' + (k + 1) + '</span><div><div class="row" style="gap:12px">' + [['rel', '\u771f\u53d8\u5316 \u00b7 \u8981\u68c0\u51fa'], ['irr', '\u771f\u53d8\u5316 \u00b7 \u5468\u671f\u6027/\u65e0\u5173'], ['pse', '\u4f2a\u53d8\u5316 \u00b7 \u89c2\u6d4b\u6761\u4ef6']].map(function (o) { return '<label class="inl"><input type="radio" name="h' + k + '_' + root.__id + '" value="' + o[0] + '" data-hk="' + k + '"' + (a === o[0] ? ' checked' : '') + (submitted ? ' disabled' : '') + '> ' + o[1] + '</label>'; }).join('') + '</div>' + res + '</div></div>';
      }).join('');
    }
    root.__id = Math.floor(Math.random() * 1e6);
    root.addEventListener('change', function (e) {
      var f = e.target.getAttribute('data-f'); if (f) { st[f] = e.target.checked; ans = {}; submitted = false; var r0 = $('[data-r=hres]', root); if (r0) r0.textContent = ''; show(); return; }
      var hk = e.target.getAttribute('data-hk'); if (hk != null) ans[+hk] = e.target.value;
    });
    root.addEventListener('input', function (e) { if (e.target.getAttribute('data-r') === 'th') { th = +e.target.value; show(); } });
    root.addEventListener('click', function (e) {
      var v = e.target.closest('[data-v]'); if (v) { view = v.getAttribute('data-v'); setSeg(root, 'v', view); show(); return; }
      var g = e.target.closest('[data-g]'); if (g) { gt = g.getAttribute('data-g'); setSeg(root, 'g', gt); show(); return; }
      if (e.target.closest('[data-r=sub]')) {
        var hs = hotspots(); if (!hs.length) return; submitted = true; var ok = 0; hs.forEach(function (h, k) { if (h.a.indexOf(ans[k]) >= 0) ok++; });
        $('[data-r=hres]', root).innerHTML = '<b>' + ok + ' / ' + hs.length + '</b> \u5224\u65ad\u6b63\u786e' + (ok === hs.length ? '\uff0c\u4fa6\u63a2\u5408\u683c\u3002' : '\u3002\u770b\u770b\u6bcf\u6761\u4e0b\u9762\u7684\u89e3\u91ca\u3002');
        show(); if (T.app && ok === hs.length) T.app.toast('\u4fa6\u63a2\u6ee1\u5206');
      }
    });
    show();
  };

  /* ---------- 5. \u5377\u79ef ---------- */
  D.conv = function (root) {
    var KS = { sobely: ['\u6c34\u5e73\u8fb9\u7f18\uff08Sobel-y\uff09', [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]], sobelx: ['\u7ad6\u76f4\u8fb9\u7f18\uff08Sobel-x\uff09', [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]], blur: ['\u5e73\u6ed1\uff083\u00d73 \u5747\u503c\uff09', [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]]], lap: ['\u62c9\u666e\u62c9\u65af\uff08\u627e\u6591\u70b9\uff09', [[0, 1, 0], [1, -4, 1], [0, 1, 0]]], id: ['\u539f\u6837\u8f93\u51fa', [[0, 0, 0], [0, 1, 0], [0, 0, 0]]] };
    var kk = 'sobely', sel = [3, 3], img = SC.image({}), x0 = 18, y0 = Math.round(SC.riverY(23) - SC.halfW(23) - 6);
    var IN = []; for (var y = 0; y < 10; y++) { var row = []; for (var x = 0; x < 10; x++) row.push(Math.round(img.b[3][(y0 + y) * SC.W + x0 + x] * 100)); IN.push(row); }
    root.innerHTML = '<div class="dh"><b>\u5377\u79ef\u6e38\u4e50\u573a</b><span class="small muted">\u8f93\u5165\uff1a\u865a\u62df\u6d4b\u70b9\u6cb3\u5cb8\u5904 10\u00d710 \u7684\u8fd1\u7ea2\u5916\uff08B8 \u00d7 100\uff09</span></div><div class="ctrl">' + segHTML('k', Object.keys(KS).map(function (k) { return [k, KS[k][0]]; }), kk) + '<button class="btn sm" type="button" data-r="play">\u64ad\u653e\u6ed1\u52a8</button></div><div class="cv2"><div><div class="small muted">\u8f93\u5165\uff08\u4e0a\u9762\u662f\u5cb8\u4e0a\u690d\u88ab\uff0c\u4e0b\u9762\u662f\u6c34\uff09</div><div data-r="in"></div></div><div><div class="small muted">\u8f93\u51fa\u7279\u5f81\u56fe 8\u00d78\uff08\u70b9\u4efb\u610f\u683c\u5b50\u770b\u8ba1\u7b97\uff09</div><div data-r="out"></div></div></div><p class="out" data-r="calc"></p>';
    function conv() { var K = KS[kk][1], O = []; for (var y = 0; y < 8; y++) { var r = []; for (var x = 0; x < 8; x++) { var s = 0; for (var j = 0; j < 3; j++) for (var i = 0; i < 3; i++) s += K[j][i] * IN[y + j][x + i]; r.push(s); } O.push(r); } return O; }
    function grid(M, hl, lo, hi, isOut) {
      var n = M.length, h = '<div style="display:grid;grid-template-columns:repeat(' + n + ',1fr);gap:1px;max-width:' + (n * 34) + 'px;font-family:var(--f-ui);font-size:10.5px">';
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) { var v = M[y][x], t = clamp((v - lo) / (hi - lo || 1), 0, 1), c = ramp(isOut ? INFERNO : [[0, '#0d1c2b'], [1, '#e3f2e8']], t), on = hl && x >= hl[0] && x < hl[0] + hl[2] && y >= hl[1] && y < hl[1] + hl[2]; h += '<div ' + (isOut ? 'data-cx="' + x + '" data-cy="' + y + '" ' : '') + 'style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:rgb(' + c.map(Math.round).join(',') + ');color:' + (t > 0.55 ? '#111' : '#fff') + ';cursor:' + (isOut ? 'pointer' : 'default') + ';outline:' + (on ? '2px solid #ff3b6b' : 'none') + ';outline-offset:-2px">' + (Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10) + '</div>'; }
      return h + '</div>';
    }
    function show() {
      var O = conv(), flat = [].concat.apply([], O), lo = Math.min.apply(null, flat), hi = Math.max.apply(null, flat);
      $('[data-r=in]', root).innerHTML = grid(IN, [sel[0], sel[1], 3], 0, 45, false);
      $('[data-r=out]', root).innerHTML = grid(O, [sel[0], sel[1], 1], lo, hi, true);
      var K = KS[kk][1], terms = [];
      for (var j = 0; j < 3; j++) for (var i = 0; i < 3; i++) if (K[j][i] !== 0) terms.push((Math.round(K[j][i] * 100) / 100) + '\u00d7' + IN[sel[1] + j][sel[0] + i]);
      $('[data-r=calc]', root).innerHTML = '\u8f93\u51fa(' + sel[0] + ',' + sel[1] + ') = ' + terms.join(' + ') + ' = <b>' + (Math.round(O[sel[1]][sel[0]] * 10) / 10) + '</b>\u3002' + (kk === 'sobely' ? '\u6c34\u5e73\u8fb9\u7f18\u6838\u5bf9\u201c\u4e0a\u4e0b\u4eae\u5ea6\u5dee\u201d\u654f\u611f\uff1a\u5cb8\u7ebf\u8fd9\u4e00\u884c\u8f93\u51fa\u6700\u5927\uff08\u8d1f\u503c\u8868\u793a\u4e0a\u4eae\u4e0b\u6697\uff09\u3002' : kk === 'sobelx' ? '\u8fd9\u4e2a\u6838\u627e\u5de6\u53f3\u4eae\u5ea6\u5dee\u3002\u5cb8\u7ebf\u5927\u81f4\u662f\u6c34\u5e73\u7684\uff0c\u6240\u4ee5\u54cd\u5e94\u5f31\u2014\u2014\u540c\u4e00\u5f20\u56fe\uff0c\u4e0d\u540c\u7684\u6838\u201c\u770b\u89c1\u201d\u4e0d\u540c\u7684\u4e1c\u897f\u3002' : kk === 'blur' ? '\u5e73\u5747\u6389\u566a\u58f0\uff0c\u4e5f\u628a\u5cb8\u7ebf\u62b9\u6a21\u7cca\u4e86\u3002' : kk === 'lap' ? '\u5bf9\u7a81\u53d8\u548c\u5b64\u7acb\u70b9\u654f\u611f\u3002' : '\u53ea\u53d6\u4e2d\u5fc3\u50cf\u5143\uff0c\u8f93\u51fa\u7b49\u4e8e\u8f93\u5165\u3002') + ' \u5377\u79ef\u7f51\u7edc\u91cc\uff0c\u8fd9\u4e9b\u6838\u7684\u6570\u5b57\u4e0d\u662f\u4eba\u8bbe\u7684\uff0c\u800c\u662f\u8bad\u7ec3\u65f6\u5b66\u51fa\u6765\u7684\u3002';
      setSeg(root, 'k', kk);
    }
    var timer = null;
    root.addEventListener('click', function (e) {
      var k = e.target.closest('[data-k]'); if (k) { kk = k.getAttribute('data-k'); show(); return; }
      var c = e.target.closest('[data-cx]'); if (c) { sel = [+c.getAttribute('data-cx'), +c.getAttribute('data-cy')]; show(); return; }
      if (e.target.closest('[data-r=play]')) { clearInterval(timer); var n = 0; timer = setInterval(function () { sel = [n % 8, Math.floor(n / 8)]; show(); n++; if (n >= 64 || !root.isConnected) clearInterval(timer); }, 140); }
    });
    show();
  };

  /* ---------- 6. \u68af\u5ea6\u4e0b\u964d ---------- */
  D.gd = function (root) {
    function L(w) { return 0.5 * (w - 3) * (w - 3) + 0.6 * Math.sin(2 * w) + 1; }
    function dL(w) { return (w - 3) + 1.2 * Math.cos(2 * w); }
    var w = -1.5, lr = 0.3, path = [w];
    root.innerHTML = '<div class="dh"><b>\u68af\u5ea6\u4e0b\u964d\uff1a\u6cbf\u7740\u5761\u5f80\u4e0b\u8d70</b><span class="small muted">\u6a2a\u8f74\u662f\u4e00\u4e2a\u53c2\u6570 w\uff0c\u7eb5\u8f74\u662f\u635f\u5931</span></div><canvas data-r="c" style="width:100%;height:220px"></canvas><div class="ctrl"><label>\u5b66\u4e60\u7387 <input type="range" min="0.02" max="1.2" step="0.01" value="0.3" data-r="lr" style="width:150px"> <span class="num" data-r="lrv"></span></label><button class="btn sm" type="button" data-r="step">\u8d70\u4e00\u6b65</button><button class="btn sm" type="button" data-r="run">\u8d70 10 \u6b65</button><button class="btn sm" type="button" data-r="reset">\u56de\u5230\u8d77\u70b9</button></div><p class="out" data-r="o"></p>';
    var cv = $('[data-r=c]', root);
    function draw() {
      var Wd = cv.clientWidth || 600, Hd = 220, dpr = window.devicePixelRatio || 1; cv.width = Wd * dpr; cv.height = Hd * dpr; var c = cv.getContext('2d'); c.scale(dpr, dpr);
      var xmin = -3, xmax = 7, ymin = 0, ymax = 15, X = function (v) { return 30 + (v - xmin) / (xmax - xmin) * (Wd - 40); }, Y = function (v) { return Hd - 20 - (v - ymin) / (ymax - ymin) * (Hd - 30); };
      c.strokeStyle = css('--line'); c.beginPath(); c.moveTo(30, Hd - 20); c.lineTo(Wd - 10, Hd - 20); c.stroke();
      c.strokeStyle = css('--water'); c.lineWidth = 2; c.beginPath(); for (var v = xmin; v <= xmax; v += 0.05) { var yy = Y(Math.min(L(v), ymax)); if (v === xmin) c.moveTo(X(v), yy); else c.lineTo(X(v), yy); } c.stroke();
      c.strokeStyle = css('--veg'); c.lineWidth = 1.2; c.beginPath(); path.forEach(function (p, i) { var px = X(clamp(p, xmin, xmax)), py = Y(Math.min(L(p), ymax)); if (i === 0) c.moveTo(px, py); else c.lineTo(px, py); }); c.stroke();
      path.forEach(function (p, i) { c.fillStyle = i === path.length - 1 ? css('--veg') : css('--muted'); c.beginPath(); c.arc(X(clamp(p, xmin, xmax)), Y(Math.min(L(p), ymax)), i === path.length - 1 ? 6 : 3, 0, Math.PI * 2); c.fill(); });
      c.fillStyle = css('--muted'); c.font = '11px sans-serif'; c.fillText('w', Wd - 18, Hd - 6);
      var msg = 'w = ' + w.toFixed(3) + '\uff0c\u635f\u5931 = ' + L(w).toFixed(3) + '\uff0c\u5df2\u8d70 ' + (path.length - 1) + ' \u6b65\u3002';
      if (Math.abs(w) > 7 || path.length > 3 && Math.abs(path[path.length - 1] - path[path.length - 3]) < 1e-3 && Math.abs(path[path.length - 1] - path[path.length - 2]) > 0.5) msg += ' \u5b66\u4e60\u7387\u592a\u5927\uff1a\u6765\u56de\u8df3\u751a\u81f3\u98de\u51fa\u53bb\u4e86\u3002';
      else if (lr < 0.06) msg += ' \u5b66\u4e60\u7387\u592a\u5c0f\uff1a\u6bcf\u6b65\u632a\u4e00\u70b9\u70b9\uff0c\u8981\u8d70\u5f88\u591a\u6b65\u3002';
      else if (w < 1.2 && path.length > 4) msg += ' \u505c\u5728\u4e86\u5de6\u8fb9\u7684\u5c0f\u5751\uff08\u5c40\u90e8\u6700\u5c0f\uff09\u91cc\uff1a\u8d77\u70b9\u548c\u5b66\u4e60\u7387\u90fd\u4f1a\u5f71\u54cd\u6700\u540e\u843d\u5728\u54ea\u3002';
      $('[data-r=o]', root).textContent = msg; $('[data-r=lrv]', root).textContent = lr.toFixed(2);
    }
    function step() { w = w - lr * dL(w); if (!isFinite(w)) w = 99; path.push(w); }
    root.addEventListener('input', function (e) { if (e.target.getAttribute('data-r') === 'lr') { lr = +e.target.value; draw(); } });
    root.addEventListener('click', function (e) { var r = e.target.getAttribute && e.target.getAttribute('data-r'); if (r === 'step') { step(); draw(); } else if (r === 'run') { for (var i = 0; i < 10; i++) step(); draw(); } else if (r === 'reset') { w = -1.5; path = [w]; draw(); } });
    draw(); if (window.ResizeObserver) new ResizeObserver(function () { draw(); }).observe(cv);
  };

  /* ---------- 7. U-Net \u7ed3\u6784 ---------- */
  D.unet = function (root) {
    var siam = false, cin = 6;
    var LV = [{ c: 64, s: 256 }, { c: 128, s: 128 }, { c: 256, s: 64 }, { c: 512, s: 32 }, { c: 1024, s: 16 }];
    root.innerHTML = '<div class="dh"><b>U-Net \u91cc\u5f20\u91cf\u7684\u5f62\u72b6</b><span class="small muted">\u8f93\u5165 = \u6211\u4eec\u7684 6 \u6ce2\u6bb5 256\u00d7256 \u5f71\u50cf\u5757\uff1b\u70b9\u65b9\u5757\u770b\u7ec6\u8282</span></div><div class="ctrl">' + segHTML('u', [['seg', '\u5355\u671f\u5206\u5272'], ['cd', '\u5b6a\u751f\u53d8\u5316\u68c0\u6d4b']], 'seg') + '</div><div style="overflow-x:auto"><svg data-r="s" viewBox="0 0 540 290" style="min-width:440px;width:100%"></svg></div><p class="small muted" style="margin:4px 0">\u7ea2\uff1a\u7f16\u7801\u5668\uff0c\u5377\u79ef + \u4e0b\u91c7\u6837\uff0c\u56fe\u53d8\u5c0f\u3001\u901a\u9053\u53d8\u591a\uff0c\u8d1f\u8d23\u770b\u61c2\u201c\u662f\u4ec0\u4e48\u201d\u3002\u84dd\uff1a\u89e3\u7801\u5668\uff0c\u4e0a\u91c7\u6837\u8fd8\u539f\u5c3a\u5bf8\uff0c\u8d1f\u8d23\u753b\u51c6\u201c\u5728\u54ea\u91cc\u201d\u3002\u865a\u7ebf\uff1a\u8df3\u8dc3\u8fde\u63a5\u3002</p><p class="out" data-r="o">\u70b9\u4efb\u610f\u65b9\u5757\u3002</p>';
    function convP(ci, co) { return 9 * ci * co + co; }
    function draw() {
      var s = '', EX = [70, 115, 160, 205, 252], DX = [440, 395, 350, 305], Y = [36, 92, 146, 198, 246], HH = [46, 40, 34, 28, 24], WW = 26;
      LV.forEach(function (l, i) {
        var x = EX[i], y = Y[i], h = HH[i];
        s += '<rect data-u2="e' + i + '" x="' + x + '" y="' + y + '" width="' + WW + '" height="' + h + '" rx="4" fill="var(--veg)" fill-opacity="' + (0.22 + i * 0.16) + '" stroke="var(--veg)" style="cursor:pointer"/>';
        s += '<text x="' + (i === 4 ? x + WW + 6 : x - 4) + '" y="' + (y + h + 13) + '" font-size="11" text-anchor="' + (i === 4 ? 'start' : 'end') + '">' + l.c + '\u00d7' + l.s + '\u00b2</text>';
        if (i < 4) {
          s += '<line x1="' + (x + WW / 2) + '" y1="' + (y + h) + '" x2="' + (EX[i + 1] + 4) + '" y2="' + (Y[i + 1] - 2) + '" stroke="currentColor" stroke-opacity=".5" marker-end="url(#ah)"/>';
          s += '<rect data-u2="d' + i + '" x="' + DX[i] + '" y="' + y + '" width="' + WW + '" height="' + h + '" rx="4" fill="var(--water)" fill-opacity="' + (0.22 + i * 0.16) + '" stroke="var(--water)" style="cursor:pointer"/>';
          s += '<line x1="' + (x + WW + 4) + '" y1="' + (y + h / 2) + '" x2="' + (DX[i] - 6) + '" y2="' + (y + h / 2) + '" stroke="var(--soil)" stroke-dasharray="5 4" marker-end="url(#ah)"/>';
          var fromX = i === 3 ? EX[4] + WW : DX[i + 1] + WW / 2, fromY = i === 3 ? Y[4] + 4 : Y[i + 1];
          s += '<line x1="' + fromX + '" y1="' + fromY + '" x2="' + (DX[i] + WW / 2) + '" y2="' + (y + h + 2) + '" stroke="currentColor" stroke-opacity=".5" marker-end="url(#ah)"/>';
        }
      });
      s += '<text x="270" y="' + (Y[0] + 14) + '" text-anchor="middle" font-size="12" fill="var(--soil)">\u8df3\u8dc3\u8fde\u63a5\uff1a\u628a\u6d45\u5c42\u7ec6\u8282\u76f4\u63a5\u9001\u7ed9\u89e3\u7801\u5668\uff08\u62fc\u63a5\uff09</text>';
      s += '<rect data-u2="in" x="8" y="110" width="30" height="46" rx="4" fill="var(--soil)" fill-opacity=".45" stroke="var(--soil)" style="cursor:pointer"/><text x="23" y="171" font-size="12" text-anchor="middle">' + (siam ? 't1' : '\u8f93\u5165') + '</text>';
      s += '<line x1="40" y1="128" x2="' + (EX[0] - 2) + '" y2="' + (Y[0] + 30) + '" stroke="currentColor" stroke-opacity=".5" marker-end="url(#ah)"/>';
      if (siam) s += '<rect data-u2="in" x="8" y="186" width="30" height="46" rx="4" fill="var(--soil)" fill-opacity=".45" stroke="var(--soil)" style="cursor:pointer"/><text x="23" y="247" font-size="12" text-anchor="middle">t2</text><text x="6" y="266" font-size="11">\u5171\u4eab\u540c\u4e00\u7f16\u7801\u5668</text><line x1="40" y1="204" x2="' + (EX[0] - 2) + '" y2="' + (Y[0] + 40) + '" stroke="currentColor" stroke-opacity=".5" stroke-dasharray="3 3" marker-end="url(#ah)"/>';
      s += '<rect data-u2="out" x="494" y="36" width="34" height="46" rx="4" fill="var(--good)" fill-opacity=".45" stroke="var(--good)" style="cursor:pointer"/><text x="511" y="96" font-size="12" text-anchor="middle">' + (siam ? '\u53d8\u5316\u56fe' : '\u5206\u5272\u56fe') + '</text><line x1="' + (DX[0] + WW + 2) + '" y1="59" x2="490" y2="59" stroke="currentColor" stroke-opacity=".5" marker-end="url(#ah)"/>';
      s = '<defs><marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" fill-opacity=".6"/></marker></defs>' + s;
      $('[data-r=s]', root).innerHTML = s;
    }
    function info(k) {
      var o = $('[data-r=o]', root);
      if (k === 'in') o.innerHTML = siam ? '\u4e24\u671f\u5f71\u50cf t1\u3001t2 \u5404 6\u00d7256\u00d7256\uff0c<b>\u5171\u7528\u540c\u4e00\u5957\u7f16\u7801\u5668\u6743\u91cd</b>\uff08\u5b6a\u751f\uff09\u3002\u5171\u4eab\u6743\u91cd\u4fdd\u8bc1\u4e24\u671f\u88ab\u201c\u540c\u4e00\u628a\u5c3a\u5b50\u201d\u91cf\uff0c\u5dee\u5f02\u53ea\u6765\u81ea\u5f71\u50cf\u672c\u8eab\u3002' : '\u8f93\u5165\u5f20\u91cf 6\u00d7256\u00d7256\uff1a6 \u4e2a\u6ce2\u6bb5\uff08B2\u3001B3\u3001B4\u3001B8\u3001B11\u3001B12\uff09\uff0c\u6bcf\u4e2a\u6ce2\u6bb5 256\u00d7256 \u50cf\u5143\uff082.56 km \u89c1\u65b9\uff09\u3002';
      else if (k === 'out') o.innerHTML = siam ? '\u6bcf\u4e2a\u50cf\u5143\u8f93\u51fa\u201c\u53d8\u5316\u201d\u7684\u5206\u6570\uff08logit\uff09\uff0c\u7ecf\u8fc7 sigmoid \u53d8\u6210 0\u20131 \u7684\u6982\u7387\uff0c\u518d\u7528\u9608\u503c\u5207\u6210 0/1\u3002\u5b6a\u751f U-Net \u901a\u5e38\u5728\u6bcf\u4e00\u5c42\u628a\u4e24\u671f\u7279\u5f81\u76f8\u51cf\uff08\u53d6\u7edd\u5bf9\u503c\uff09\u6216\u62fc\u63a5\u540e\u9001\u8fdb\u89e3\u7801\u5668\uff0cFC-Siam-diff / FC-Siam-conc \u5c31\u662f\u8fd9\u4e48\u505a\u7684\u3002' : '1\u00d71 \u5377\u79ef\u628a 64 \u4e2a\u901a\u9053\u538b\u6210 K \u4e2a\u7c7b\u522b\u7684\u5206\u6570\uff0csoftmax \u540e\u6bcf\u4e2a\u50cf\u5143\u53d6\u6700\u5927\u7c7b\uff0c\u5f97\u5230\u548c\u8f93\u5165\u540c\u6837\u5927\u5c0f\u7684\u5206\u5272\u56fe\u3002';
      else { var e = k[0] === 'e', i = +k.slice(1), l = LV[i], ci = e ? (i === 0 ? cin : LV[i - 1].c) : LV[i + 1].c; var p = e ? convP(ci, l.c) + convP(l.c, l.c) : convP(l.c * 2, l.c) + convP(l.c, l.c); o.innerHTML = (e ? '\u7f16\u7801\u5668\u7b2c ' + (i + 1) + ' \u5c42' : '\u89e3\u7801\u5668\u7b2c ' + (i + 1) + ' \u5c42') + '\uff1a\u7279\u5f81\u56fe ' + l.c + ' \u901a\u9053 \u00d7 ' + l.s + '\u00d7' + l.s + '\u3002\u6bcf\u4e2a\u4f4d\u7f6e\u7684\u201c\u611f\u53d7\u91ce\u201d' + (e ? '\u968f\u4e0b\u91c7\u6837\u4e0d\u65ad\u53d8\u5927\uff0c\u5230\u8fd9\u4e00\u5c42\u5927\u7ea6\u8986\u76d6\u8f93\u5165\u7684 ' + Math.min(256, Math.round(5 * Math.pow(2, i + 1))) + ' \u50cf\u5143\uff08\u7ea6 ' + Math.min(2560, Math.round(50 * Math.pow(2, i + 1))) + ' m\uff09' : '\u6765\u81ea\u4e0a\u91c7\u6837\u540e\u7684\u6df1\u5c42\u7279\u5f81 + \u8df3\u8dc3\u8fde\u63a5\u9001\u6765\u7684\u540c\u5c3a\u5ea6\u6d45\u5c42\u7279\u5f81\uff08\u62fc\u63a5\u540e\u901a\u9053\u7ffb\u500d\uff09') + '\u3002\u8fd9\u4e00\u5c42\u4e24\u4e2a 3\u00d73 \u5377\u79ef\u7ea6 ' + (p / 1e6).toFixed(2) + ' M \u4e2a\u53c2\u6570\u3002' + (e && i === 4 ? '\u8fd9\u662f\u6700\u6df1\u7684\u201c\u74f6\u9888\u201d\uff1a16\u00d716 \u7684\u6bcf\u4e2a\u683c\u5b50\u5bf9\u5e94\u539f\u56fe 16\u00d716 \u50cf\u5143\uff08160 m\uff09\uff0c\u8bed\u4e49\u6700\u5f3a\u3001\u4f4d\u7f6e\u6700\u7c97\u3002' : ''); }
    }
    root.addEventListener('click', function (e) { var u = e.target.closest('[data-u]'); if (u) { siam = u.getAttribute('data-u') === 'cd'; setSeg(root, 'u', siam ? 'cd' : 'seg'); draw(); info('in'); return; } var b = e.target.closest('[data-u2]'); if (b) info(b.getAttribute('data-u2')); });
    draw();
  };

  /* ---------- 8. \u6ce8\u610f\u529b ---------- */
  D.attn = function (root) {
    var P = 12, G = 8, img = SC.image({}), feats = [], q = 43, tau = 0.6, usePos = false;
    var nd = SC.index(img, 'ndvi'), mn = SC.index(img, 'mndwi');
    for (var gy = 0; gy < G; gy++) for (var gx = 0; gx < G; gx++) { var a = 0, b = 0, c = 0, d = 0; for (var y = 0; y < P; y++) for (var x = 0; x < P; x++) { var i = (gy * P + y) * SC.W + gx * P + x; a += nd[i]; b += mn[i]; c += (img.b[0][i] + img.b[1][i] + img.b[2][i]) / 3; d += img.b[4][i]; } var n = P * P; feats.push([a / n, b / n, c / n, d / n]); }
    var mu = [0, 0, 0, 0], sd = [0, 0, 0, 0]; feats.forEach(function (f) { f.forEach(function (v, k) { mu[k] += v / feats.length; }); }); feats.forEach(function (f) { f.forEach(function (v, k) { sd[k] += (v - mu[k]) * (v - mu[k]) / feats.length; }); }); sd = sd.map(Math.sqrt);
    feats = feats.map(function (f) { return f.map(function (v, k) { return (v - mu[k]) / (sd[k] || 1); }); });
    root.innerHTML = '<div class="dh"><b>\u6ce8\u610f\u529b\uff1a\u4e00\u4e2a\u56fe\u5757\u201c\u770b\u201d\u5176\u4ed6\u56fe\u5757</b><span class="small muted">\u5f71\u50cf\u5207\u6210 8\u00d78 = 64 \u4e2a\u56fe\u5757\uff08token\uff09\uff1b\u70b9\u4e00\u4e2a\u56fe\u5757\u5f53\u67e5\u8be2</span></div><div class="cv2"><div data-r="cv"></div><div><div class="ctrl"><label>\u6e29\u5ea6 \u03c4 <input type="range" min="0.3" max="4" step="0.1" value="0.6" data-r="tau" style="width:130px"> <span class="num" data-r="tv"></span></label><label><input type="checkbox" data-r="pos"> \u52a0\u4f4d\u7f6e\u7f16\u7801\uff08\u8fd1\u7684\u66f4\u4eb2\uff09</label></div><div class="out" data-r="o"></div></div></div>';
    var cv = canvasEl(380); cv.style.cursor = 'pointer'; $('[data-r=cv]', root).appendChild(cv);
    function show() {
      var ctx = SC.draw(cv, img, 'tc'), fq = feats[q], logits = feats.map(function (f, j) { var s = 0; for (var k = 0; k < 4; k++) s += fq[k] * f[k]; s = s / Math.sqrt(4) / tau; if (usePos) { var dx = (j % G) - (q % G), dy = Math.floor(j / G) - Math.floor(q / G); s -= Math.sqrt(dx * dx + dy * dy) * 0.8; } return s; });
      var m = Math.max.apply(null, logits), ex = logits.map(function (v) { return Math.exp(v - m); }), sum = ex.reduce(function (a, b) { return a + b; }, 0), w = ex.map(function (v) { return v / sum; }), wm = Math.max.apply(null, w);
      for (var j = 0; j < G * G; j++) { var x = (j % G) * P, y = Math.floor(j / G) * P; ctx.fillStyle = 'rgba(10,16,20,' + (0.78 * (1 - w[j] / wm)).toFixed(3) + ')'; ctx.fillRect(x, y, P, P); }
      ctx.strokeStyle = '#ff3b6b'; ctx.lineWidth = 1.5; ctx.strokeRect((q % G) * P + 0.75, Math.floor(q / G) * P + 0.75, P - 1.5, P - 1.5);
      var top = w.map(function (v, j) { return [v, j]; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 5);
      $('[data-r=tv]', root).textContent = tau.toFixed(1);
      $('[data-r=o]', root).innerHTML = '\u4eae\u7684\u56fe\u5757 = \u6ce8\u610f\u529b\u6743\u91cd\u9ad8\u3002\u67e5\u8be2\u56fe\u5757\uff08\u7ea2\u6846\uff09\u6700\u5173\u6ce8\uff1a<br>' + top.map(function (t) { return '\u56fe\u5757 ' + t[1] + '\uff1a<b>' + (t[0] * 100).toFixed(1) + '%</b>'; }).join('\uff0c') + '<br><span class="small muted">\u6bcf\u4e2a\u56fe\u5757\u7528 4 \u4e2a\u7279\u5f81\uff08NDVI\u3001MNDWI\u3001\u4eae\u5ea6\u3001\u77ed\u6ce2\u7ea2\u5916\uff09\u8868\u793a\uff0c\u6743\u91cd = softmax(q\u00b7k / \u221ad / \u03c4)\u3002\u6e29\u5ea6\u4f4e\uff0c\u6ce8\u610f\u529b\u96c6\u4e2d\u5728\u6700\u50cf\u7684\u51e0\u5757\uff1b\u6e29\u5ea6\u9ad8\uff0c\u5e73\u5747\u5206\u7ed9\u6240\u6709\u5757\u3002\u4e0d\u52a0\u4f4d\u7f6e\u7f16\u7801\u65f6\uff0c\u6a21\u578b\u53ea\u770b\u201c\u50cf\u4e0d\u50cf\u201d\uff0c\u4e0d\u77e5\u9053\u8c01\u6328\u7740\u8c01\u2014\u2014\u6240\u4ee5\u6c34\u4f1a\u5173\u6ce8\u8fdc\u5904\u7684\u6c34\u3002</span>';
    }
    cv.addEventListener('click', function (e) { var r = cv.getBoundingClientRect(); var gx = Math.floor((e.clientX - r.left) / r.width * G), gy = Math.floor((e.clientY - r.top) / r.height * G); q = clamp(gy, 0, G - 1) * G + clamp(gx, 0, G - 1); show(); });
    root.addEventListener('input', function (e) { if (e.target.getAttribute('data-r') === 'tau') { tau = +e.target.value; show(); } });
    root.addEventListener('change', function (e) { if (e.target.getAttribute('data-r') === 'pos') { usePos = e.target.checked; show(); } });
    show();
  };

  /* ---------- 9. \u9608\u503c\u4e0e\u6307\u6807 ---------- */
  D.thresh = function (root) {
    var Wd = 48, NP = Wd * Wd, r = rng(9), gtm = new Uint8Array(NP), lg = new Float32Array(NP);
    var blobs = [[12, 14, 3.6, 2.6], [33, 30, 2.6, 3.4], [20, 38, 1.8, 1.8], [40, 10, 2.2, 1.4]];
    var hard = [[30, 15, 4.5, 3], [10, 30, 3, 4], [38, 41, 4, 2.5]]; // \u50cf\u4e91\u5f71\u3001\u96fe\u4e00\u6837\u5bb9\u6613\u88ab\u8bef\u62a5\u7684\u533a\u57df
    var hardm = new Uint8Array(NP);
    for (var y = 0; y < Wd; y++) for (var x = 0; x < Wd; x++) { var i = y * Wd + x; blobs.forEach(function (b) { var dx = (x - b[0]) / b[2], dy = (y - b[1]) / b[3]; if (dx * dx + dy * dy < 1) gtm[i] = 1; }); hard.forEach(function (b) { var dx = (x - b[0]) / b[2], dy = (y - b[1]) / b[3]; if (dx * dx + dy * dy < 1) hardm[i] = 1; }); if (Math.abs(y - (0.55 * x + 18)) < 0.6 && x > 4 && x < 28) gtm[i] = 1; }
    function gauss() { var u = r() || 1e-9, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    var raw = new Float32Array(NP); for (var k = 0; k < NP; k++) raw[k] = gauss();
    for (k = 0; k < NP; k++) { var xx = k % Wd, yy = Math.floor(k / Wd), s = 0, c = 0; for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) { var x2 = xx + dx, y2 = yy + dy; if (x2 >= 0 && y2 >= 0 && x2 < Wd && y2 < Wd) { s += raw[y2 * Wd + x2]; c++; } } lg[k] = (gtm[k] ? 0.9 : (hardm[k] ? -0.6 : -2.6)) + 2.6 * s / c; }
    var th = 0.5, shift = false;
    root.innerHTML = '<div class="dh"><b>\u9608\u503c\u3001P/R/F1 \u548c PR \u66f2\u7ebf</b><span class="small muted">\u6a21\u578b\u7ed9\u6bcf\u4e2a\u50cf\u5143\u4e00\u4e2a\u201c\u53d8\u5316\u6982\u7387\u201d\uff0c\u9608\u503c\u51b3\u5b9a\u54ea\u4e9b\u7b97\u53d8\u5316</span></div><div class="cv2"><figure><div data-r="cv"></div><figcaption>\u7eff=\u68c0\u5bf9 TP\uff0c\u6a59=\u8bef\u62a5 FP\uff0c\u7d2b=\u6f0f\u68c0 FN</figcaption></figure><div><svg data-r="pr" viewBox="0 0 260 230" style="width:100%;max-width:340px"></svg></div></div><div class="ctrl"><label>\u9608\u503c <input type="range" min="0.02" max="0.98" step="0.01" value="0.5" data-r="th" style="width:170px"> <span class="num" data-r="thv"></span></label><label><input type="checkbox" data-r="sh"> \u6362\u5230\u65b0\u6d4b\u70b9\uff08\u6709\u96fe\uff0c\u80cc\u666f\u6574\u4f53\u504f\u9ad8\uff09</label></div><div class="mrow" data-r="m"></div><p class="out" data-r="o"></p>';
    var cv = document.createElement('canvas'); cv.style.width = '100%'; cv.style.maxWidth = '300px'; cv.style.aspectRatio = '1'; $('[data-r=cv]', root).appendChild(cv);
    function probs(sh) { var p = new Float32Array(NP); for (var i = 0; i < NP; i++) { var v = lg[i] + (sh ? 1.6 : 0); p[i] = 1 / (1 + Math.exp(-v)); } return p; }
    function metrics(p, t) { var tp = 0, fp = 0, fn = 0; for (var i = 0; i < NP; i++) { var d = p[i] >= t; if (d && gtm[i]) tp++; else if (d) fp++; else if (gtm[i]) fn++; } var P = tp + fp ? tp / (tp + fp) : 1, R = tp / (tp + fn), F = P + R ? 2 * P * R / (P + R) : 0; return { tp: tp, fp: fp, fn: fn, P: P, R: R, F: F, I: tp / (tp + fp + fn || 1) }; }
    function curve(p) { var pts = []; for (var t = 0.01; t <= 0.99; t += 0.01) { var m = metrics(p, t); pts.push([t, m.P, m.R, m.F]); } return pts; }
    function ap(p) { var idx = Array.prototype.map.call(p, function (v, i) { return i; }).sort(function (a, b) { return p[b] - p[a]; }); var tp = 0, pos = 0, s = 0; for (var i = 0; i < NP; i++) if (gtm[i]) pos++; for (var j = 0; j < NP; j++) { if (gtm[idx[j]]) { tp++; s += tp / (j + 1); } } return s / pos; }
    var pVal = probs(false), cVal = curve(pVal), bestVal = cVal.reduce(function (a, b) { return b[3] > a[3] ? b : a; });
    function show() {
      var p = probs(shift), m = metrics(p, th), c = cv.getContext('2d'); cv.width = Wd; cv.height = Wd; var id = c.createImageData(Wd, Wd), d = id.data;
      for (var i = 0; i < NP; i++) { var det = p[i] >= th, col; if (det && gtm[i]) col = [43, 210, 127]; else if (det) col = [255, 140, 58]; else if (gtm[i]) col = [214, 58, 255]; else { var g = 30 + 150 * p[i]; col = [g, g, g + 8]; } d[i * 4] = col[0]; d[i * 4 + 1] = col[1]; d[i * 4 + 2] = col[2]; d[i * 4 + 3] = 255; }
      c.putImageData(id, 0, 0);
      var cu = curve(p), best = cu.reduce(function (a, b) { return b[3] > a[3] ? b : a; }), A = ap(p);
      var X = function (v) { return 30 + v * 210; }, Y = function (v) { return 200 - v * 180; };
      var s = '<line x1="30" y1="200" x2="240" y2="200" stroke="currentColor" stroke-opacity=".4"/><line x1="30" y1="20" x2="30" y2="200" stroke="currentColor" stroke-opacity=".4"/><text x="135" y="222" font-size="10" text-anchor="middle">\u53ec\u56de\u7387 R</text><text x="10" y="110" font-size="10" transform="rotate(-90 10 110)" text-anchor="middle">\u7cbe\u786e\u7387 P</text>';
      s += '<polyline fill="none" stroke="var(--water)" stroke-width="2" points="' + cu.map(function (q) { return X(q[2]) + ',' + Y(q[1]); }).join(' ') + '"/>';
      var lx = X(m.R) > 170 ? X(m.R) - 7 : X(m.R) + 7, la = X(m.R) > 170 ? 'end' : 'start';
      s += '<circle cx="' + X(m.R) + '" cy="' + Y(m.P) + '" r="5" fill="var(--veg)"/><text x="' + lx + '" y="' + (Y(m.P) - 8) + '" font-size="10" text-anchor="' + la + '">\u9608\u503c ' + th.toFixed(2) + '</text><text x="236" y="34" font-size="11" text-anchor="end">AP = ' + A.toFixed(3) + '</text>';
      $('[data-r=pr]', root).innerHTML = s;
      $('[data-r=thv]', root).textContent = th.toFixed(2);
      $('[data-r=m]', root).innerHTML = [['P', m.P], ['R', m.R], ['F1', m.F], ['IoU', m.I]].map(function (x) { return '<span class="metric"><span class="v">' + f2(x[1]) + '</span><span class="k">' + x[0] + '</span></span>'; }).join('') + '<span class="metric"><span class="v">' + m.fp + '</span><span class="k">\u8bef\u62a5\u50cf\u5143</span></span>';
      var mv = metrics(p, bestVal[0]);
      $('[data-r=o]', root).innerHTML = '\u53d8\u5316\u50cf\u5143\u53ea\u5360 ' + (100 * Array.prototype.reduce.call(gtm, function (a, b) { return a + b; }, 0) / NP).toFixed(1) + '%\u3002\u9a8c\u8bc1\u96c6\u4e0a F1 \u6700\u9ad8\u7684\u9608\u503c\u662f <b>' + bestVal[0].toFixed(2) + '</b>\uff08F1 ' + f2(bestVal[3]) + '\uff09\u3002' + (shift ? '\u6362\u5230\u65b0\u6d4b\u70b9\u540e\uff0c\u7528\u8fd9\u4e2a\u9608\u503c F1 \u53ea\u6709 <b>' + f2(mv.F) + '</b>\uff0c\u800c\u8fd9\u91cc\u7684\u6700\u4f18\u9608\u503c\u662f ' + best[0].toFixed(2) + '\uff08F1 ' + f2(best[3]) + '\uff09\u3002\u8fd9\u91cc\u4e3a\u4e86\u6f14\u793a\uff0c\u628a\u65b0\u6d4b\u70b9\u6240\u6709\u50cf\u5143\u7684\u5206\u6570\u6574\u4f53\u62ac\u9ad8\uff08\u6bd4\u5982\u96fe\u8ba9\u4e00\u5207\u770b\u8d77\u6765\u90fd\u201c\u66f4\u50cf\u53d8\u5316\u201d\uff09\uff0c\u50cf\u5143\u4e4b\u95f4\u7684\u5148\u540e\u987a\u5e8f\u5b8c\u5168\u6ca1\u53d8\uff0c\u6240\u4ee5 <b>AP \u4e00\u70b9\u6ca1\u53d8\uff0c\u574f\u7684\u53ea\u662f\u9608\u503c</b>\uff1a\u8fd9\u5c31\u662f\u201c\u9608\u503c\u8fc1\u79fb\u201d\u95ee\u9898\u3002\u771f\u5b9e\u60c5\u51b5\u91cc\u6392\u5e8f\u53d8\u5dee\u548c\u9608\u503c\u6f02\u79fb\u5f80\u5f80\u540c\u65f6\u53d1\u751f\u3002\u6b63\u5f0f\u6210\u7ee9\u5fc5\u987b\u7528\u9a8c\u8bc1\u96c6\u5b9a\u7684\u9608\u503c\uff1b\u5728\u6d4b\u8bd5\u96c6\u4e0a\u6311\u6700\u4f18\u9608\u503c\u53ea\u80fd\u5f53\u8bca\u65ad\u4e0a\u9650\u3002' : '\u628a\u9608\u503c\u4ece 0.5 \u5f80\u4e24\u8fb9\u62d6\uff1a\u8c03\u9ad8\uff0c\u8bef\u62a5\u5c11\u4e86\u4f46\u6f0f\u68c0\u591a\u4e86\uff08P\u2191R\u2193\uff09\uff1b\u8c03\u4f4e\u5219\u76f8\u53cd\u3002F1 \u662f\u4e24\u8005\u7684\u8c03\u548c\u5e73\u5747\u3002\u52fe\u9009\u201c\u6362\u5230\u65b0\u6d4b\u70b9\u201d\u770b\u770b\u4f1a\u53d1\u751f\u4ec0\u4e48\u3002');
    }
    root.addEventListener('input', function (e) { if (e.target.getAttribute('data-r') === 'th') { th = +e.target.value; show(); } });
    root.addEventListener('change', function (e) { if (e.target.getAttribute('data-r') === 'sh') { shift = e.target.checked; show(); } });
    show();
  };

  /* ---------- 10. \u6570\u636e\u5212\u5206\u4e0e\u6cc4\u6f0f ---------- */
  D.leak = function (root) {
    var G = 24, mode = 'rand';
    function field(seed) { var g = rng(seed), gw = 7, grid = []; for (var i = 0; i < gw * gw; i++) grid.push(g()); var out = []; for (var y = 0; y < G; y++) for (var x = 0; x < G; x++) { var gx = x / G * (gw - 1.01), gy = y / G * (gw - 1.01), x0 = Math.floor(gx), y0 = Math.floor(gy), fx = gx - x0, fy = gy - y0; var a = grid[y0 * gw + x0], b = grid[y0 * gw + x0 + 1], c = grid[(y0 + 1) * gw + x0], d = grid[(y0 + 1) * gw + x0 + 1]; var v = a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; out.push(v > 0.5 ? 1 : 0); } return out; }
    var sites = [field(3), field(17), field(29)];
    root.innerHTML = '<div class="dh"><b>\u540c\u4e00\u4e2a\u201c\u5077\u61d2\u6a21\u578b\u201d\uff0c\u4e09\u79cd\u5212\u5206\u4e09\u4e2a\u5206\u6570</b><span class="small muted">\u6bcf\u4e2a\u683c\u5b50\u662f\u4e00\u5757\u5f71\u50cf\uff0c\u989c\u8272\u662f\u5b83\u7684\u7c7b\u522b\uff08\u7a7a\u95f4\u4e0a\u6210\u7247\u5206\u5e03\uff09</span></div><div class="ctrl">' + segHTML('sp', [['rand', '\u968f\u673a\u5212\u5206'], ['block', '\u7a7a\u95f4\u5206\u5757'], ['loso', '\u7559\u4e00\u6d4b\u70b9']], mode) + '</div><div class="cv2" data-r="cvs"></div><div class="mrow" data-r="m"></div><p class="out" data-r="o"></p>';
    function run() {
      var cvs = $('[data-r=cvs]', root); cvs.innerHTML = '';
      var r = rng(42), train = [], test = [];
      var nS = mode === 'loso' ? 3 : 1;
      for (var s = 0; s < nS; s++) for (var i = 0; i < G * G; i++) { var x = i % G, y = Math.floor(i / G), isTest; if (mode === 'rand') isTest = r() < 0.2; else if (mode === 'block') isTest = x >= 18; else isTest = s === 2; (isTest ? test : train).push({ s: s, x: x, y: y, c: sites[s][i] }); }
      // \u5077\u61d2\u6a21\u578b\uff1a\u7528\u6700\u8fd1\u7684\u8bad\u7ec3\u683c\u5b50\u7684\u7c7b\u522b\uff08\u53ea\u770b\u5750\u6807\uff0c\u4e0d\u770b\u5185\u5bb9\uff09
      var ok = 0; test.forEach(function (t) { var best = 1e9, bc = 0; train.forEach(function (q) { if (mode === 'loso' ? false : q.s !== t.s) return; var d = (q.x - t.x) * (q.x - t.x) + (q.y - t.y) * (q.y - t.y); if (d < best) { best = d; bc = q.c; } }); t.p = bc; if (bc === t.c) ok++; });
      for (s = 0; s < nS; s++) {
        var cv = document.createElement('canvas'); cv.width = G * 10; cv.height = G * 10; cv.style.width = '100%'; cv.style.maxWidth = (nS > 1 ? 200 : 300) + 'px'; var c = cv.getContext('2d');
        for (var j = 0; j < G * G; j++) { var xx = j % G, yy = Math.floor(j / G), cls = sites[s][j]; c.fillStyle = cls ? '#c2184b' : '#195c99'; c.globalAlpha = 0.35; c.fillRect(xx * 10, yy * 10, 10, 10); c.globalAlpha = 1; }
        test.filter(function (t) { return t.s === s; }).forEach(function (t) { c.fillStyle = t.c ? '#c2184b' : '#195c99'; c.fillRect(t.x * 10 + 1, t.y * 10 + 1, 8, 8); c.strokeStyle = t.p === t.c ? '#2bd27f' : '#ff8c3a'; c.lineWidth = 2; c.strokeRect(t.x * 10 + 1.5, t.y * 10 + 1.5, 7, 7); });
        var f = document.createElement('figure'); f.style.margin = '0'; f.appendChild(cv); var cap = document.createElement('figcaption'); cap.textContent = mode === 'loso' ? ['\u6d4b\u70b9 A\uff08\u8bad\u7ec3\uff09', '\u6d4b\u70b9 B\uff08\u8bad\u7ec3\uff09', '\u6d4b\u70b9 C\uff08\u6d4b\u8bd5\uff09'][s] : '\u5b9e\u5fc3\u5e26\u6846 = \u6d4b\u8bd5\u5757\uff08\u7eff\u6846\u5bf9\uff0c\u6a59\u6846\u9519\uff09'; f.appendChild(cap); cvs.appendChild(f);
      }
      var acc = ok / test.length;
      $('[data-r=m]', root).innerHTML = '<span class="metric"><span class="v">' + (acc * 100).toFixed(0) + '%</span><span class="k">\u6d4b\u8bd5\u7cbe\u5ea6</span></span><span class="metric"><span class="v">' + test.length + '</span><span class="k">\u6d4b\u8bd5\u5757</span></span>';
      $('[data-r=o]', root).innerHTML = mode === 'rand' ? '\u968f\u673a\u5212\u5206\uff1a\u6bcf\u4e2a\u6d4b\u8bd5\u5757\u7684\u56db\u5468\u51e0\u4e4e\u90fd\u662f\u8bad\u7ec3\u5757\uff0c\u6a21\u578b\u201c\u6284\u90bb\u5c45\u201d\u5c31\u80fd\u7b54\u5bf9\u3002\u5206\u6570\u5f88\u597d\u770b\uff0c\u4f46\u5b83\u4ec0\u4e48\u4e5f\u6ca1\u5b66\u4f1a\u3002\u8fd9\u5c31\u662f\u7a7a\u95f4\u81ea\u76f8\u5173\u9020\u6210\u7684<b>\u4e50\u89c2\u504f\u5dee</b>\uff08Kattenborn \u7b49 2022 \u5728\u65e0\u4eba\u673a\u6811\u79cd\u5206\u5272\u4e0a\u6d4b\u5230 F1 \u6700\u591a\u865a\u9ad8\u7ea6 28%\uff09\u3002' : mode === 'block' ? '\u7a7a\u95f4\u5206\u5757\uff1a\u6d4b\u8bd5\u533a\u6574\u5757\u62ff\u51fa\u6765\uff0c\u6a21\u578b\u53ea\u80fd\u4ece\u8fdc\u5904\u201c\u731c\u201d\uff0c\u5206\u6570\u6389\u4e0b\u6765\uff0c\u66f4\u63a5\u8fd1\u5b83\u5728\u65b0\u533a\u57df\u7684\u771f\u5b9e\u8868\u73b0\uff08Roberts \u7b49 2017 \u7684\u5206\u5757\u4ea4\u53c9\u9a8c\u8bc1\uff09\u3002' : '\u7559\u4e00\u6d4b\u70b9\uff1a\u5728\u4e24\u4e2a\u6d4b\u70b9\u8bad\u7ec3\u3001\u7b2c\u4e09\u4e2a\u6d4b\u70b9\u6d4b\u8bd5\u3002\u5077\u61d2\u6a21\u578b\u5b8c\u5168\u5931\u6548\uff0c\u63a5\u8fd1\u778e\u731c\u3002\u6211\u4eec\u9879\u76ee\u7528\u201c\u7559\u4e00\u6d4b\u70b9\u201d\u56de\u7b54\u201c\u6362\u4e00\u4e2a\u65b0\u5730\u65b9\u8fd8\u884c\u4e0d\u884c\u201d\uff0c\u7528\u201c\u65f6\u95f4\u5916\u63a8\u201d\u56de\u7b54\u201c\u540c\u4e00\u4e2a\u5730\u65b9\u7684\u672a\u6765\u5f71\u50cf\u884c\u4e0d\u884c\u201d\uff0c\u4e24\u8005\u8981\u5206\u5f00\u62a5\u544a\u3002';
      setSeg(root, 'sp', mode);
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-sp]'); if (b) { mode = b.getAttribute('data-sp'); run(); } });
    run();
  };

  /* ---------- 11. \u6c34\u4f53\u63d0\u53d6\u4e0e\u6cb3\u5bbd ---------- */
  D.water = function (root) {
    var kind = 'mndwi', th = 0, flood = false, glint = false, tx = 44;
    var RANGE = { ndwi: [-0.6, 0.6], mndwi: [-0.6, 0.8], awei: [-1, 0.4] };
    root.innerHTML = '<div class="dh"><b>\u6c34\u4f53\u6307\u6570\u3001\u9608\u503c\u4e0e\u6cb3\u5bbd\u8bef\u5dee</b><span class="small muted">\u9752\u8272 = \u5224\u4e3a\u6c34\uff1b\u7ad6\u7ebf = \u91cf\u6cb3\u5bbd\u7684\u65ad\u9762</span></div><div class="ctrl">' + segHTML('wk', [['ndwi', 'NDWI'], ['mndwi', 'MNDWI'], ['awei', 'AWEI']], kind) + '<label>\u9608\u503c <input type="range" min="-0.6" max="0.6" step="0.01" value="0" data-r="th" style="width:150px"> <span class="num" data-r="thv"></span></label><label><input type="checkbox" data-r="fl"> \u4e30\u6c34\u671f\uff08\u4e0a\u6da8 + \u6d51\u6c34\uff09</label><label><input type="checkbox" data-r="gl"> \u6c34\u9762\u8000\u6591</label></div><div class="cv2"><figure><div data-r="cv"></div><figcaption>\u771f\u5f69\u8272 + \u6c34\u63a9\u819c</figcaption></figure><figure><div data-r="cv2"></div><figcaption data-r="cap"></figcaption></figure></div><div class="mrow" data-r="m"></div><p class="out" data-r="o"></p>';
    var cv = canvasEl(320), cv2 = canvasEl(320); $('[data-r=cv]', root).appendChild(cv); $('[data-r=cv2]', root).appendChild(cv2);
    function show() {
      var img = SC.image({ flood: flood, glint: glint, t2: flood || glint }), ix = SC.index(img, kind), rg = RANGE[kind];
      var inp = $('[data-r=th]', root); inp.min = rg[0]; inp.max = rg[1]; if (th < rg[0] || th > rg[1]) { th = 0; inp.value = 0; }
      var ctx = SC.draw(cv, img, 'tc'), id = ctx.getImageData(0, 0, SC.W, SC.H), d = id.data, tp = 0, fp = 0, fn = 0;
      for (var i = 0; i < SC.NP; i++) { var w = ix[i] > th, tw = img.wf[i] >= 0.5; if (w && tw) tp++; else if (w) fp++; else if (tw) fn++; if (w) { d[i * 4] = d[i * 4] * 0.3 + 0; d[i * 4 + 1] = d[i * 4 + 1] * 0.3 + 0.7 * 220; d[i * 4 + 2] = d[i * 4 + 2] * 0.3 + 0.7 * 255; } }
      ctx.putImageData(id, 0, 0); ctx.strokeStyle = '#ff3b6b'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(tx + 0.5, 30); ctx.lineTo(tx + 0.5, 92); ctx.stroke();
      SC.drawField(cv2, ix, rg[0], rg[1], DIVW);
      $('[data-r=cap]', root).textContent = kind.toUpperCase() + ' \u6307\u6570\u56fe\uff08\u84dd = \u9ad8\uff09';
      var trueW = 0, cnt = 0; for (var y = 30; y < 92; y++) { var k = y * SC.W + tx; trueW += img.wf[k]; if (ix[k] > th) cnt++; }
      var iou = tp / (tp + fp + fn || 1);
      $('[data-r=thv]', root).textContent = th.toFixed(2);
      $('[data-r=m]', root).innerHTML = '<span class="metric"><span class="v">' + f2(iou) + '</span><span class="k">\u6c34\u4f53 IoU</span></span><span class="metric"><span class="v">' + fp + '</span><span class="k">\u8bef\u5224\u4e3a\u6c34</span></span><span class="metric"><span class="v">' + fn + '</span><span class="k">\u6f0f\u6389\u7684\u6c34</span></span><span class="metric"><span class="v">' + Math.round(trueW * 10) + ' m</span><span class="k">\u65ad\u9762\u771f\u5b9e\u6cb3\u5bbd</span></span><span class="metric"><span class="v">' + cnt * 10 + ' m</span><span class="k">\u6309\u50cf\u5143\u6570\u91cf\u51fa</span></span>';
      $('[data-r=o]', root).innerHTML = '\u6cb3\u5cb8\u50cf\u5143\u662f\u201c\u534a\u6c34\u534a\u5cb8\u201d\u7684\u6df7\u5408\u50cf\u5143\uff0c\u6309\u201c\u662f/\u4e0d\u662f\u6c34\u201d\u6570\u683c\u5b50\uff0c\u6bcf\u5cb8\u90fd\u53ef\u80fd\u5dee\u534a\u4e2a\u5230\u4e00\u4e2a\u50cf\u5143\uff0c\u6240\u4ee5 10 m \u5f71\u50cf\u91cf\u51fa\u7684\u6cb3\u5bbd\u5929\u7136\u6709 \u00b110\u201320 m \u7684\u8bef\u5dee\uff08RiverScope \u6307\u51fa\u4e24\u5cb8\u5404\u9519 1 \u4e2a\u50cf\u5143\u5c31\u5dee 20 m\uff09\u3002' + (kind === 'ndwi' ? ' NDWI \u7528\u7eff\u548c\u8fd1\u7ea2\u5916\uff0c\u5bf9\u6d51\u6c34\u548c\u5efa\u7b51\u533a\u4e0d\u5982 MNDWI \u7a33\u3002' : kind === 'mndwi' ? ' MNDWI \u7528\u77ed\u6ce2\u7ea2\u5916\uff0c\u628a\u5efa\u7b51\u548c\u88f8\u571f\u538b\u5f97\u66f4\u4f4e\u3002' : ' AWEI \u7528\u591a\u4e2a\u6ce2\u6bb5\u52a0\u6743\uff0c\u539f\u6587\u7528\u6765\u538b\u6697\u5730\u7269\u548c\u9634\u5f71\u3002') + (glint ? ' \u6253\u5f00\u8000\u6591\u540e\uff0c\u6c34\u9762\u6574\u4f53\u53d8\u4eae\uff0c\u6307\u6570\u503c\u4e0b\u964d\uff0c\u9608\u503c\u4e00\u9ad8\u5c31\u4f1a\u6f0f\u6c34\u3002' : '') + (flood ? ' \u4e30\u6c34\u671f\u6d51\u6c34\u628a\u7eff\u5149\u548c\u7ea2\u5149\u62ac\u9ad8\uff0c\u6c34\u548c\u6e7f\u6c99\u66f4\u96be\u5206\u3002' : '');
      setSeg(root, 'wk', kind);
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-wk]'); if (b) { kind = b.getAttribute('data-wk'); th = 0; $('[data-r=th]', root).value = 0; show(); } });
    root.addEventListener('input', function (e) { if (e.target.getAttribute('data-r') === 'th') { th = +e.target.value; show(); } });
    root.addEventListener('change', function (e) { var r = e.target.getAttribute('data-r'); if (r === 'fl') { flood = e.target.checked; show(); } if (r === 'gl') { glint = e.target.checked; show(); } });
    show();
  };

  /* ---------- 12. \u878d\u5408\u65b9\u5f0f ---------- */
  D.fusion = function (root) {
    var m = 'early', cloud = false;
    var TXT = {
      early: '<b>\u65e9\u878d\u5408\uff08\u8f93\u5165\u5c42\u62fc\u63a5\uff09</b>\uff1a\u628a\u8f85\u52a9\u901a\u9053\u548c\u5149\u5b66\u6ce2\u6bb5\u5728\u8f93\u5165\u5904\u62fc\u6210\u4e00\u4e2a\u591a\u901a\u9053\u5f20\u91cf\uff0c\u540e\u9762\u5168\u5171\u4eab\u3002\u6700\u7b80\u5355\u3001\u53c2\u6570\u6700\u5c11\uff1b\u4f46\u8f85\u52a9\u6570\u636e\u548c\u5149\u5b66\u7684\u7edf\u8ba1\u6027\u8d28\u5dee\u522b\u5927\u65f6\uff0c\u7f51\u7edc\u7b2c\u4e00\u5c42\u5c31\u8981\u540c\u65f6\u201c\u6d88\u5316\u201d\u4e24\u79cd\u4e1c\u897f\uff0c\u9884\u8bad\u7ec3\u6743\u91cd\u4e5f\u53ea\u8ba4\u8bc6\u539f\u6765\u7684\u6ce2\u6bb5\u3002\u65b0\u52a0\u7684\u901a\u9053\u5e38\u7528\u201c\u96f6\u521d\u59cb\u5316\u201d\u63a5\u5165\uff1a\u4e00\u5f00\u59cb\u7b49\u4e8e\u6ca1\u52a0\uff0c\u8bad\u7ec3\u4e2d\u6162\u6162\u5b66\u4f1a\u7528\u3002',
      mid: '<b>\u4e2d\u95f4\u878d\u5408\uff08\u7279\u5f81\u5c42\uff09</b>\uff1a\u4e24\u8def\u5404\u81ea\u63d0\u7279\u5f81\uff0c\u5728\u4e2d\u95f4\u5c42\u76f8\u52a0\u3001\u62fc\u63a5\u3001\u95e8\u63a7\u6216\u4ea4\u53c9\u6ce8\u610f\u529b\u3002FiLM \u7528\u8f85\u52a9\u7279\u5f81\u751f\u6210 \u03b3\u3001\u03b2 \u53bb\u8c03\u5236\u5149\u5b66\u7279\u5f81\uff08\u03b3\u00b7F + \u03b2\uff09\uff1b\u95e8\u63a7\u7528 0\u20131 \u7684\u6743\u91cd\u51b3\u5b9a\u6bcf\u4e2a\u4f4d\u7f6e\u4fe1\u8c01\u591a\u4e00\u70b9\uff1b\u4ea4\u53c9\u6ce8\u610f\u529b\u8ba9\u5149\u5b66\u7279\u5f81\u4e3b\u52a8\u53bb\u201c\u67e5\u201d\u8f85\u52a9\u7279\u5f81\u3002',
      late: '<b>\u665a\u878d\u5408\uff08\u51b3\u7b56\u5c42 / \u540e\u6bb5\u65c1\u652f\uff09</b>\uff1a\u4e3b\u5e72\u7167\u5e38\u5904\u7406\u5149\u5b66\u5f71\u50cf\uff0c\u8f85\u52a9\u6570\u636e\u8d70\u4e00\u6761\u5c0f\u65c1\u652f\uff0c\u5728\u89e3\u7801\u5668\u540e\u6bb5\u6216\u8f93\u51fa\u524d\u5408\u5e76\u3002\u5bf9\u9884\u8bad\u7ec3\u5927\u6a21\u578b\u6700\u53cb\u597d\uff08\u4e0d\u52a8\u5b83\u7684\u8f93\u5165\u5c42\uff09\uff0c\u4e5f\u6700\u5bb9\u6613\u5728\u8f85\u52a9\u6570\u636e\u7f3a\u5931\u65f6\u9000\u56de\u201c\u53ea\u7528\u5149\u5b66\u201d\u3002'
    };
    root.innerHTML = '<div class="dh"><b>\u4e09\u79cd\u878d\u5408\u4f4d\u7f6e</b><span class="small muted">S2 \u5149\u5b66 + \u8f85\u52a9\uff08\u96f7\u8fbe\u3001\u5730\u5f62\u3001\u8d28\u91cf\u3001\u5f80\u5e74\u540c\u671f\u2026\uff09</span></div><div class="ctrl">' + segHTML('fm', [['early', '\u65e9\u878d\u5408'], ['mid', '\u4e2d\u95f4\u878d\u5408'], ['late', '\u665a\u878d\u5408']], m) + '<label><input type="checkbox" data-r="cl"> \u5149\u5b66\u88ab\u4e91\u6321\u4f4f</label></div><div style="overflow-x:auto"><svg data-r="s" viewBox="0 0 660 230" style="min-width:540px;width:100%"></svg></div><p class="out" data-r="o"></p>';
    function box(x, y, w, h, t, col, dim) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="7" fill="' + col + '" fill-opacity="' + (dim ? 0.08 : 0.2) + '" stroke="' + col + '" stroke-opacity="' + (dim ? 0.3 : 1) + '"' + (dim ? ' stroke-dasharray="4 3"' : '') + '/><text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 4) + '" text-anchor="middle" font-size="12"' + (dim ? ' opacity=".45"' : '') + '>' + t + '</text>'; }
    function arr(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="currentColor" stroke-opacity=".55" marker-end="url(#fa)"/>'; }
    function draw() {
      var s = '<defs><marker id="fa" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" fill-opacity=".6"/></marker></defs>';
      var O = 'var(--veg)', A = 'var(--soil)', M = 'var(--water)', G = 'var(--good)';
      s += box(10, 40, 100, 44, 'S2 \u5149\u5b66', O, cloud) + box(10, 140, 100, 44, '\u8f85\u52a9\u901a\u9053', A, false);
      if (m === 'early') { s += box(150, 85, 70, 54, '\u62fc\u63a5', M) + arr(110, 62, 150, 105) + arr(110, 162, 150, 120) + box(255, 75, 220, 74, '\u5171\u4eab\u7f16\u7801\u5668 + \u89e3\u7801\u5668', M) + arr(220, 112, 255, 112) + box(515, 85, 120, 54, '\u53d8\u5316\u56fe', G) + arr(475, 112, 515, 112); }
      else if (m === 'mid') { s += box(150, 30, 130, 64, '\u5149\u5b66\u7f16\u7801\u5668', O, cloud) + box(150, 130, 130, 64, '\u8f85\u52a9\u7f16\u7801\u5668', A) + arr(110, 62, 150, 62) + arr(110, 162, 150, 162) + box(320, 80, 110, 64, '\u95e8\u63a7 / FiLM / \u4ea4\u53c9\u6ce8\u610f\u529b', M) + arr(280, 62, 320, 100) + arr(280, 162, 320, 125) + box(460, 80, 80, 64, '\u89e3\u7801\u5668', M) + arr(430, 112, 460, 112) + box(565, 85, 85, 54, '\u53d8\u5316\u56fe', G) + arr(540, 112, 565, 112); }
      else { s += box(150, 30, 250, 64, '\u4e3b\u5e72\uff08\u53ef\u4ee5\u662f\u51bb\u7ed3\u7684\u5927\u6a21\u578b\uff09', O, cloud) + arr(110, 62, 150, 62) + box(150, 140, 160, 44, '\u5c0f\u65c1\u652f', A) + arr(110, 162, 150, 162) + box(430, 60, 90, 64, '\u540e\u6bb5\u5408\u5e76', M) + arr(400, 62, 430, 80) + arr(310, 162, 430, 110) + box(550, 65, 95, 54, '\u53d8\u5316\u56fe', G) + arr(520, 92, 550, 92); }
      $('[data-r=s]', root).innerHTML = s;
      $('[data-r=o]', root).innerHTML = TXT[m] + (cloud ? '<br><b>\u5149\u5b66\u88ab\u4e91\u6321\u4f4f\u65f6\uff1a</b>' + (m === 'early' ? '\u8f93\u5165\u91cc\u4e00\u5927\u5757\u662f\u4e91\uff0c\u7f51\u7edc\u6ca1\u89c1\u8fc7\u201c\u8fd9\u4e9b\u901a\u9053\u7f3a\u5931\u201d\u7684\u60c5\u51b5\uff0c\u6700\u5bb9\u6613\u51fa\u9519\uff1b\u8bad\u7ec3\u65f6\u968f\u673a\u4e22\u6389\u4e00\u4e9b\u901a\u9053\uff08\u6a21\u6001\u4e22\u5f03\uff09\u80fd\u7f13\u89e3\u3002' : m === 'mid' ? '\u95e8\u63a7\u53ef\u4ee5\u5b66\u4f1a\u5728\u5149\u5b66\u4e0d\u53ef\u9760\u7684\u5730\u65b9\u66f4\u4fe1\u96f7\u8fbe\uff1b\u524d\u63d0\u662f\u8bad\u7ec3\u65f6\u89c1\u8fc7\u8db3\u591f\u591a\u8fd9\u6837\u7684\u6837\u672c\u3002' : '\u4e3b\u5e72\u8f93\u51fa\u4e0d\u53ef\u9760\uff0c\u65c1\u652f\u53ea\u80fd\u8865\u4e00\u90e8\u5206\uff1b\u5982\u679c\u65c1\u652f\u672c\u8eab\u5c31\u662f\u8d28\u91cf\u4fe1\u606f\uff08\u4e91\u63a9\u819c\u3001\u96fe\uff09\uff0c\u5b83\u81f3\u5c11\u80fd\u544a\u8bc9\u6a21\u578b\u201c\u8fd9\u91cc\u522b\u4fe1\u201d\u3002') : '');
      setSeg(root, 'fm', m);
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-fm]'); if (b) { m = b.getAttribute('data-fm'); draw(); } });
    root.addEventListener('change', function (e) { if (e.target.getAttribute('data-r') === 'cl') { cloud = e.target.checked; draw(); } });
    draw();
  };

  /* ---------- 13. \u9057\u5fd8\u66f2\u7ebf ---------- */
  D.forget = function (root) {
    root.innerHTML = '<div class="dh"><b>\u4e3a\u4ec0\u4e48\u8981\u95f4\u9694\u590d\u4e60</b><span class="small muted">\u793a\u610f\u56fe\uff0c\u53c2\u6570\u4e0d\u662f\u5b9e\u6d4b\u503c</span></div><div style="overflow-x:auto"><svg viewBox="0 0 620 240" style="min-width:480px;width:100%" data-r="s"></svg></div><p class="out">\u53ea\u5b66\u4e00\u904d\uff0c\u8bb0\u5fc6\u6309\u5929\u8870\u51cf\uff08\u7070\u7ebf\uff09\u3002\u6bcf\u6b21\u5728\u5feb\u5fd8\u7684\u65f6\u5019\u4e3b\u52a8\u56de\u5fc6\u4e00\u6b21\uff08\u7ea2\u7ebf\uff09\uff0c\u8bb0\u5fc6\u88ab\u62c9\u56de\u6765\uff0c\u800c\u4e14\u8870\u51cf\u5f97\u8d8a\u6765\u8d8a\u6162\u3002\u590d\u4e60\u5361\u7684\u95f4\u9694\u201c\u5f53\u5929 \u2192 1 \u5929 \u2192 2 \u5929 \u2192 4 \u5929 \u2192 7 \u5929\u201d\u5c31\u662f\u6309\u8fd9\u4e2a\u601d\u8def\u6392\u7684\u3002Cepeda \u7b49\uff082008\uff09\u53d1\u73b0\uff0c\u60f3\u8bb0\u4f4f\u4e00\u5468\uff0c\u6700\u4f73\u590d\u4e60\u95f4\u9694\u7ea6\u4e3a\u4e00\u5468\u7684 20%\u201340%\uff0c\u4e5f\u5c31\u662f 1\u20133 \u5929\u3002</p>';
    var X = function (d) { return 50 + d * 75; }, Y = function (r) { return 210 - r * 180; }, s = '';
    for (var d = 0; d <= 7; d++) s += '<line x1="' + X(d) + '" x2="' + X(d) + '" y1="25" y2="210" stroke="currentColor" stroke-opacity=".08"/><text x="' + X(d) + '" y="226" text-anchor="middle" font-size="11">\u7b2c ' + d + ' \u5929</text>';
    s += '<text x="20" y="' + Y(1) + '" font-size="11">100%</text><text x="28" y="' + Y(0) + '" font-size="11">0</text>';
    var p1 = []; for (var t = 0; t <= 7; t += 0.05) p1.push(X(t) + ',' + Y(Math.exp(-t / 1.4)));
    s += '<polyline fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2" points="' + p1.join(' ') + '"/>';
    var rev = [0, 1, 3, 7], S0 = 1.4, p2 = [];
    for (var k = 0; k < rev.length; k++) { var a = rev[k], b = rev[k + 1] == null ? 7 : rev[k + 1], Sk = S0 * Math.pow(2.3, k); for (t = a; t <= b + 1e-9; t += 0.05) p2.push(X(t) + ',' + Y(0.97 * Math.exp(-(t - a) / Sk))); if (k > 0) s += '<circle cx="' + X(a) + '" cy="' + Y(0.97) + '" r="4" fill="var(--veg)"/>'; }
    s += '<polyline fill="none" stroke="var(--veg)" stroke-width="2.4" points="' + p2.join(' ') + '"/>';
    $('[data-r=s]', root).innerHTML = s;
  };

  /* ---------- \u79cd\u5b50\u566a\u58f0\u4e0e\u201c\u6311\u6700\u597d\u201d\u7684\u9677\u9631\uff08\u6570\u503c\u4e3a\u6a21\u62df\uff09 ---------- */
  D.seeds = function (root) {
    var st = { d: 0.02, s: 0.03, n: 3, k: 9 }, r = rng(2026);
    function gauss() { var u = r() || 1e-9, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function Phi(z) { var t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp(-z * z / 2), p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; }
    function mean(a) { return a.reduce(function (x, y) { return x + y; }, 0) / a.length; }
    function sd(a) { if (a.length < 2) return 0; var m = mean(a); return Math.sqrt(a.reduce(function (x, y) { return x + (y - m) * (y - m); }, 0) / (a.length - 1)); }
    root.innerHTML = '<div class="dh"><b>\u968f\u673a\u79cd\u5b50\u4e0e\u201c\u6311\u6700\u597d\u201d\u7684\u9677\u9631</b><span class="small muted">\u6a21\u62df\uff1a\u65b9\u6cd5 A \u7684\u771f\u5b9e F1 \u8bbe\u4e3a 0.40</span></div>' +
      '<div class="ctrl"><label>B \u6bd4 A \u771f\u5b9e\u9ad8 <input type="range" min="0" max="0.05" step="0.005" value="0.02" data-r="d" style="width:120px"> <span class="num" data-r="dv"></span></label>' +
      '<label>\u79cd\u5b50\u95f4\u6807\u51c6\u5dee <input type="range" min="0.005" max="0.06" step="0.005" value="0.03" data-r="s" style="width:120px"> <span class="num" data-r="sv"></span></label>' +
      '<label>\u6bcf\u4e2a\u65b9\u6cd5\u8dd1 <select data-r="n"><option>1</option><option selected>3</option><option>5</option><option>10</option></select> \u4e2a\u79cd\u5b50</label>' +
      '<button class="btn sm" type="button" data-r="go">\u518d\u505a\u4e00\u6b21\u5b9e\u9a8c</button></div>' +
      '<svg data-r="plot" viewBox="0 0 520 150" style="width:100%;max-width:600px"></svg><p class="out" data-r="o1"></p>' +
      '<div class="ctrl" style="margin-top:16px"><label>\u540c\u65f6\u8bd5\u4e86\u51e0\u79cd\u201c\u65b0\u63a5\u6cd5\u201d\uff08\u5176\u5b9e\u5168\u90fd\u6ca1\u7528\uff09 <input type="range" min="1" max="20" step="1" value="9" data-r="k" style="width:150px"> <span class="num" data-r="kv"></span></label></div>' +
      '<svg data-r="best" viewBox="0 0 520 150" style="width:100%;max-width:600px"></svg><p class="out" data-r="o2"></p>';
    var A = [], B = [];
    function sample() { A = []; B = []; for (var i = 0; i < st.n; i++) { A.push(0.40 + st.s * gauss()); B.push(0.40 + st.d + st.s * gauss()); } }
    function X(v) { return 50 + (Math.max(0.25, Math.min(0.6, v)) - 0.25) / 0.35 * 450; }
    function show1() {
      var s = '<line x1="50" y1="128" x2="500" y2="128" stroke="currentColor" stroke-opacity=".35"/>';
      [0.3, 0.4, 0.5, 0.6].forEach(function (v) { s += '<text x="' + X(v) + '" y="144" font-size="10" text-anchor="middle">' + v.toFixed(2) + '</text><line x1="' + X(v) + '" y1="20" x2="' + X(v) + '" y2="128" stroke="currentColor" stroke-opacity=".08"/>'; });
      [[A, 'A', 50, 'var(--water)', 0.40], [B, 'B', 95, 'var(--veg)', 0.40 + st.d]].forEach(function (g) {
        s += '<text x="30" y="' + (g[2] + 4) + '" font-size="12" text-anchor="middle" font-weight="700">' + g[1] + '</text>';
        s += '<line x1="' + X(g[4]) + '" y1="' + (g[2] - 16) + '" x2="' + X(g[4]) + '" y2="' + (g[2] + 16) + '" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity=".6"/>';
        g[0].forEach(function (v) { s += '<circle cx="' + X(v) + '" cy="' + g[2] + '" r="5" fill="' + g[3] + '" fill-opacity=".75"/>'; });
        var m = mean(g[0]); s += '<line x1="' + X(m) + '" y1="' + (g[2] - 12) + '" x2="' + X(m) + '" y2="' + (g[2] + 12) + '" stroke="' + g[3] + '" stroke-width="3"/>';
      });
      s += '<text x="500" y="14" font-size="10" text-anchor="end">\u7c97\u7ad6\u7ebf = \u8fd9\u6b21\u7684\u5747\u503c\uff1b\u865a\u7ebf = \u771f\u5b9e\u503c</text>';
      $('[data-r=plot]', root).innerHTML = s;
      var mA = mean(A), mB = mean(B), z = st.d / (st.s * Math.sqrt(2 / st.n)), pw = Phi(z);
      $('[data-r=dv]', root).textContent = '+' + st.d.toFixed(3); $('[data-r=sv]', root).textContent = st.s.toFixed(3);
      $('[data-r=o1]', root).innerHTML = '\u8fd9\u4e00\u6b21\uff1aA = <b>' + f3(mA) + '</b>' + (st.n > 1 ? ' \u00b1 ' + f3(sd(A)) : '') + '\uff0cB = <b>' + f3(mB) + '</b>' + (st.n > 1 ? ' \u00b1 ' + f3(sd(B)) : '') + '\uff0cB \u2212 A = <b>' + (mB - mA >= 0 ? '+' : '\u2212') + f3(Math.abs(mB - mA)) + '</b>\u3002' +
        '\u5728\u8fd9\u6837\u7684\u566a\u58f0\u4e0b\u53cd\u590d\u505a\u540c\u4e00\u4e2a\u5b9e\u9a8c\uff0cB \u7684\u5747\u503c\u9ad8\u4e8e A \u7684\u6982\u7387\u7ea6 <b>' + Math.round(pw * 100) + '%</b>' + (st.d === 0 ? '\u2014\u2014B \u5176\u5b9e\u548c A \u4e00\u6837\u597d\uff0c\u4f60\u4ecd\u6709\u4e00\u534a\u7684\u673a\u4f1a\u770b\u5230\u201cB \u66f4\u597d\u201d\u3002' : '\uff1b\u4e5f\u5c31\u662f\u8bf4\u6709\u7ea6 ' + Math.round((1 - pw) * 100) + '% \u7684\u5b9e\u9a8c\u4f1a\u5f97\u51fa\u201cB \u4e0d\u5982 A\u201d\u7684\u53cd\u7ed3\u8bba\u3002') +
        ' \u5747\u503c\u672c\u8eab\u7684\u6296\u52a8\u7ea6\u4e3a \u6807\u51c6\u5dee \u00f7 \u221a\u79cd\u5b50\u6570\uff1a3 \u4e2a\u79cd\u5b50\u65f6\u662f\u5355\u6b21\u7684 58%\uff0c10 \u4e2a\u79cd\u5b50\u65f6\u662f 32%\u3002\u591a\u70b9\u51e0\u6b21\u201c\u518d\u505a\u4e00\u6b21\u5b9e\u9a8c\u201d\u611f\u53d7\u4e00\u4e0b\u3002';
    }
    var cache = {};
    function expMax(k, sdd) { var key = k + ':' + sdd.toFixed(4); if (cache[key] != null) return cache[key]; var rr = rng(k * 131 + 7), tot = 0, T = 1500; for (var t = 0; t < T; t++) { var mx = -1e9; for (var j = 0; j < k; j++) { var u = rr() || 1e-9, v = rr(), g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); if (g > mx) mx = g; } tot += mx; } return (cache[key] = tot / T * sdd); }
    function show2() {
      var sdd = st.s * Math.sqrt(2 / st.n), vals = [], mx = 0;
      for (var k = 1; k <= 20; k++) { var e = expMax(k, sdd); vals.push(e); if (e > mx) mx = e; }
      var s = '<line x1="40" y1="120" x2="510" y2="120" stroke="currentColor" stroke-opacity=".35"/>';
      vals.forEach(function (v, i) { var h = mx > 0 ? Math.max(0, v) / mx * 90 : 0, x = 44 + i * 23; s += '<rect x="' + x + '" y="' + (120 - h) + '" width="17" height="' + h + '" fill="' + (i + 1 === st.k ? 'var(--veg)' : 'var(--line)') + '"/>'; if (i === 0 || (i + 1) % 5 === 0) s += '<text x="' + (x + 8.5) + '" y="136" font-size="10" text-anchor="middle">' + (i + 1) + '</text>'; });
      s += '<text x="44" y="16" font-size="10">\u6311\u51fa\u7684\u201c\u6700\u597d\u90a3\u79cd\u201d\u5e73\u5747\u663e\u793a\u7684\u63d0\u5347\uff08\u771f\u5b9e\u63d0\u5347\u90fd\u662f 0\uff09</text><text x="510" y="148" font-size="10" text-anchor="end">\u8bd5\u4e86\u51e0\u79cd</text>';
      $('[data-r=best]', root).innerHTML = s;
      var e = vals[st.k - 1];
      $('[data-r=kv]', root).textContent = st.k + ' \u79cd';
      $('[data-r=o2]', root).innerHTML = '\u8bd5\u4e86 <b>' + st.k + '</b> \u79cd\u63a5\u6cd5\uff0c\u5b83\u4eec\u7684\u771f\u5b9e\u63d0\u5347<b>\u5168\u90fd\u662f 0</b>\u3002\u53ea\u6309\u9a8c\u8bc1\u5206\u6311\u51fa\u201c\u6700\u597d\u7684\u90a3\u79cd\u201d\uff0c\u5b83\u5e73\u5747\u4f1a\u663e\u793a <b>+' + f3(e) + '</b> \u7684\u63d0\u5347\u2014\u2014\u8fd9\u5b8c\u5168\u662f\u566a\u58f0\u88ab\u201c\u6311\u201d\u51fa\u6765\u4e86\uff08\u7edf\u8ba1\u4e0a\u53eb\u8d62\u5bb6\u8bc5\u5492\uff09\u3002\u5bf9\u7b56\uff1a\u4e8b\u5148\u5199\u597d\u8981\u8bd5\u54ea\u51e0\u79cd\uff1b\u53ea\u5728\u9a8c\u8bc1\u96c6\u4e0a\u6311\uff0c\u6311\u5b8c\u5230\u6d4b\u8bd5\u96c6\u4e0a<b>\u53ea\u770b\u4e00\u6b21</b>\uff1b\u628a\u6240\u6709\u8bd5\u8fc7\u7684\u90fd\u62a5\u51fa\u6765\uff0c\u4e0d\u53ea\u62a5\u6700\u597d\u7684\uff1b\u8bd5\u7684\u79cd\u7c7b\u8d8a\u591a\uff0c\u8d8a\u9700\u8981\u66f4\u591a\u79cd\u5b50\u6216\u72ec\u7acb\u7684\u786e\u8ba4\u5b9e\u9a8c\u3002';
    }
    function all() { sample(); show1(); show2(); }
    root.addEventListener('input', function (e) {
      var k = e.target.getAttribute('data-r');
      if (k === 'd') { st.d = +e.target.value; sample(); show1(); }
      else if (k === 's') { st.s = +e.target.value; all(); }
      else if (k === 'k') { st.k = +e.target.value; show2(); }
    });
    root.addEventListener('change', function (e) { if (e.target.getAttribute('data-r') === 'n') { st.n = +e.target.value; all(); } });
    root.addEventListener('click', function (e) { if (e.target.getAttribute('data-r') === 'go') { sample(); show1(); } });
    all();
  };

  /* ================= \u6302\u8f7d ================= */
  T.demos = {
    mount: function (root) {
      $$('[data-demo]', root).forEach(function (el) {
        if (el.__m) return; var n = el.getAttribute('data-demo'); if (!D[n]) return;
        el.__m = true; el.classList.add('demo');
        try { D[n](el); } catch (e) { el.innerHTML = '<p class="small muted">\u8fd9\u4e2a\u6f14\u793a\u52a0\u8f7d\u5931\u8d25\uff1a' + (e && e.message) + '</p>'; console.error(e); }
      });
    },
    list: Object.keys(D)
  };
})();
