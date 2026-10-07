/* \u5341\u7c73\u89c6\u754c\uff1a\u7ed3\u6784\u56fe\u6e32\u67d3\u5668\u3002
   \u6240\u6709\u7ed3\u6784\u56fe\u90fd\u662f\u6309\u8bba\u6587\u6587\u5b57\u63cf\u8ff0\u548c\u516c\u5f00\u7ed3\u6784\u81ea\u7ed8\u7684\u793a\u610f\u56fe\uff08\u4e0d\u590d\u5236\u8bba\u6587\u539f\u56fe\uff09\uff0c\u989c\u8272\u8d70\u4e3b\u9898\u53d8\u91cf\uff0c\u6df1\u6d45\u8272\u90fd\u80fd\u770b\u3002
   \u767b\u8bb0\uff1aTENM.fig(\u540d\u5b57, { w, h, cap, src, items: [...] })\uff1b\u8bfe\u8282\u91cc\u5199 <div data-fig="\u540d\u5b57"></div> \u5f15\u7528\u3002
   \u56fe\u5143\uff08\u6570\u7ec4\u7b2c\u4e00\u4e2a\u5143\u7d20\u662f\u7c7b\u578b\uff09\uff1a
     ['r', x, y, w, h, \u8272, \u6587\u5b57, {rx, tc:\u6587\u5b57\u7c7b, dash}]   \u5706\u89d2\u6846\uff0c\u8272 = 0 \u4e2d\u6027 1 \u84dd 2 \u7ea2 3 \u8d6d 4 \u7eff 5 \u6a59 6 \u767d\u5e95\u9ed1\u6846 n \u65e0\u586b\u5145
     ['t', x, y, \u6587\u5b57, \u7c7b, \u5bf9\u9f50]                         \u6587\u5b57\uff0c\u7c7b\u53ef\u542b sm\uff08\u5c0f\u53f7\u7070\u5b57\uff09lg\uff08\u5927\u53f7\uff09b\uff08\u7c97\u4f53\uff09w/v/s/g/o\uff08\u5f69\u8272\uff09
     ['a', x1, y1, x2, y2, \u7ebf\u8272, {dash, w, both}]        \u76f4\u7ebf\u7bad\u5934\uff0c\u7ebf\u8272 k \u58a8 b \u84dd r \u7ea2 g \u7eff o \u6a59 s \u8d6d m \u7070
     ['p', [x1,y1,x2,y2,...], \u7ebf\u8272, {dash, head:false}]  \u6298\u7ebf\u7bad\u5934
     ['l', x1, y1, x2, y2, \u7ebf\u8272, {dash, w}]              \u76f4\u7ebf\uff08\u65e0\u7bad\u5934\uff09
     ['c', cx, cy, r, \u8272, \u6587\u5b57]                          \u5706
     ['g', x, y, \u5217, \u884c, \u683c\u5bbd, \u683c\u9ad8, \u503c\u6570\u7ec4\u6216\u8272, {ramp, txt}] \u7f51\u683c\uff08\u503c 0\u20131 \u6620\u5c04\u4e3a\u989c\u8272\u6df1\u6d45\uff09
     ['raw', 'SVG \u7247\u6bb5']
*/
(function () {
  'use strict';
  var T = window.TENM;
  T.figs = T.figs || {};
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fsz(cls) { cls = ' ' + (cls || '') + ' '; return cls.indexOf(' sm ') >= 0 ? 12.5 : cls.indexOf(' lg ') >= 0 ? 17 : cls.indexOf(' xs ') >= 0 ? 11 : 14.5; }
  function text(x, y, s, cls, anchor) {
    var lines = String(s).split('\n'), n = lines.length, fs = fsz(cls), lh = fs * 1.3;
    var y0 = y - (n - 1) * lh / 2;
    return '<text x="' + x + '" y="' + y0.toFixed(1) + '" class="' + (cls || '') + '" text-anchor="' + (anchor || 'middle') + '" dominant-baseline="central">' +
      lines.map(function (l, i) { return '<tspan x="' + x + '" dy="' + (i ? lh.toFixed(1) : 0) + '">' + esc(l) + '</tspan>'; }).join('') + '</text>';
  }
  function head(x1, y1, x2, y2, c) {
    var ang = Math.atan2(y2 - y1, x2 - x1), L = 9, W = 4.2;
    var bx = x2 - L * Math.cos(ang), by = y2 - L * Math.sin(ang);
    var px = -Math.sin(ang) * W, py = Math.cos(ang) * W;
    return '<polygon class="ah a' + c + '" points="' + x2.toFixed(1) + ',' + y2.toFixed(1) + ' ' + (bx + px).toFixed(1) + ',' + (by + py).toFixed(1) + ' ' + (bx - px).toFixed(1) + ',' + (by - py).toFixed(1) + '"/>';
  }
  function trim(x1, y1, x2, y2, d) { var len = Math.hypot(x2 - x1, y2 - y1) || 1; return [x2 - (x2 - x1) / len * d, y2 - (y2 - y1) / len * d]; }
  function lnCls(c, o) { return 'ln l' + (c || 'k') + (o && o.dash ? ' dash' : '') + (o && o.thin ? ' thin' : '') + (o && o.bold ? ' bold' : ''); }
  var RAMPS = {
    r: ['--surface2', '--veg'], b: ['--surface2', '--water'], s: ['--surface2', '--soil'], g: ['--surface2', '--good'], o: ['--surface2', '--warn']
  };
  function item(it) {
    var k = it[0], o, s = '';
    switch (k) {
      case 'r':
        o = it[7] || {};
        s = '<rect x="' + it[1] + '" y="' + it[2] + '" width="' + it[3] + '" height="' + it[4] + '" rx="' + (o.rx == null ? 6 : o.rx) + '" class="bx k' + (it[5] == null ? 0 : it[5]) + (o.dash ? ' dash' : '') + (o.bold ? ' bold' : '') + '"/>';
        if (it[6] != null && it[6] !== '') s += text(it[1] + it[3] / 2, it[2] + it[4] / 2, it[6], o.tc || '', 'middle');
        return s;
      case 't': return text(it[1], it[2], it[3], it[4] || '', it[5] || 'middle');
      case 'a':
        o = it[6] || {};
        var e = trim(it[1], it[2], it[3], it[4], 7), st = o.both ? trim(it[3], it[4], it[1], it[2], 7) : [it[1], it[2]];
        s = '<line x1="' + st[0] + '" y1="' + st[1] + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" class="' + lnCls(it[5], o) + '"/>' + head(it[1], it[2], it[3], it[4], it[5] || 'k');
        if (o.both) s += head(it[3], it[4], it[1], it[2], it[5] || 'k');
        return s;
      case 'p':
        o = it[3] || {};
        var pts = it[1].slice(), n = pts.length;
        if (o.head !== false) { var e2 = trim(pts[n - 4], pts[n - 3], pts[n - 2], pts[n - 1], 7); pts[n - 2] = +e2[0].toFixed(1); pts[n - 1] = +e2[1].toFixed(1); }
        var str = ''; for (var i = 0; i < n; i += 2) str += pts[i] + ',' + pts[i + 1] + ' ';
        s = '<polyline points="' + str + '" class="' + lnCls(it[2], o) + '"/>';
        if (o.head !== false) s += head(it[1][n - 4], it[1][n - 3], it[1][n - 2], it[1][n - 1], it[2] || 'k');
        return s;
      case 'l':
        o = it[6] || {};
        return '<line x1="' + it[1] + '" y1="' + it[2] + '" x2="' + it[3] + '" y2="' + it[4] + '" class="' + lnCls(it[5], o) + '"/>';
      case 'c':
        s = '<circle cx="' + it[1] + '" cy="' + it[2] + '" r="' + it[3] + '" class="bx k' + (it[4] == null ? 0 : it[4]) + '"/>';
        if (it[5]) s += text(it[1], it[2], it[5], it[6] || '', 'middle');
        return s;
      case 'g':
        o = it[8] || {};
        var x = it[1], y = it[2], C = it[3], Rr = it[4], cw = it[5], ch = it[6], v = it[7];
        for (var r = 0; r < Rr; r++) for (var c = 0; c < C; c++) {
          var idx = r * C + c, cls = 'cell', sty = '';
          if (Array.isArray(v)) {
            var val = v[idx];
            if (val == null) cls += ' k0';
            else if (typeof val === 'string') cls += ' k' + val;
            else { var rp = RAMPS[o.ramp || 'b']; sty = ' style="fill:color-mix(in srgb,var(' + rp[1] + ') ' + Math.round(Math.max(0, Math.min(1, val)) * 100) + '%,var(' + rp[0] + '))"'; }
          } else cls += ' k' + (v == null ? 0 : v);
          s += '<rect x="' + (x + c * cw) + '" y="' + (y + r * ch) + '" width="' + cw + '" height="' + ch + '" class="' + cls + '"' + sty + '/>';
          if (o.txt && o.txt[idx] != null) s += text(x + c * cw + cw / 2, y + r * ch + ch / 2, o.txt[idx], o.tc || 'sm', 'middle');
        }
        return s;
      case 'raw': return it[1];
    }
    return '';
  }
  function render(spec) {
    var w = spec.w || 520, h = spec.h || 300;
    var sty = (spec.min ? 'min-width:' + spec.min + 'px;' : '') + (spec.maxw ? 'max-width:' + spec.maxw + 'px;' : '');
    return '<svg class="fsvg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(spec.alt || spec.cap || '') + '"' + (sty ? ' style="' + sty + '"' : '') + '>' + spec.items.map(item).join('') + '</svg>';
  }
  T.fig = function (name, spec) { T.figs[name] = spec; };
  T.figSVG = function (name) { var s = T.figs[name]; return s ? render(s) : ''; };
  T.figHTML = function (name) {
    var s = T.figs[name]; if (!s) return '';
    return '<figure class="fig" data-zoom="' + esc(name) + '"><div class="figin">' + render(s) + '</div><figcaption>' + (s.cap || '') +
      (s.src ? ' <span class="figsrc">' + s.src + '</span>' : '') + '<span class="zoomh">\u70b9\u56fe\u653e\u5927</span></figcaption></figure>';
  };
})();
