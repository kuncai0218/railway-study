/* \u7b2c 7 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u6309\u8bba\u6587\u6587\u5b57\u63cf\u8ff0\u548c\u516c\u5f00\u7ed3\u6784\u81ea\u7ed8\u7684\u793a\u610f\u56fe\uff1b\u6807\u201c\u793a\u610f\u201d\u7684\u6570\u503c\u662f\u4e3a\u8bb2\u89e3\u6784\u9020\u7684\uff09\u3002 */
(function () {
  var F = window.TENM.fig;
  function rawRect(x, y, w, h, cls, op, rx) { return ['raw', '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + (rx ? ' rx="' + rx + '"' : '') + ' class="' + cls + '" style="fill-opacity:' + (op == null ? 0.55 : op) + '"/>']; }
  function pathFill(d, cls, op) { return ['raw', '<path d="' + d + '" class="' + cls + '" style="fill-opacity:' + op + '"/>']; }

  // 1. \u6c34\u8fb9\u7ebf vs \u5cb8\u7ebf\uff08\u6a2a\u65ad\u9762\u793a\u610f\uff09
  (function () {
    var it = [];
    var prof = 'M14 60 L120 60 L160 130 L380 160 L380 176 L526 182';
    it.push(pathFill('M149 110 L160 130 L380 160 L380 176 L526 182 L526 110 Z', 'fw', 0.18));
    it.push(pathFill('M307 150 L380 160 L380 176 L526 182 L526 150 Z', 'fw', 0.45));
    it.push(['raw', '<path d="' + prof + '" class="ln lk bold" style="fill:none"/>']);
    it.push(['raw', '<path d="M14 60 L120 60 L160 130 L380 160 L380 176 L526 182 L526 200 L14 200 Z" class="fs" style="fill-opacity:.18"/>']);
    it.push(['l', 149, 110, 526, 110, 'b', { dash: 1 }], ['l', 307, 150, 526, 150, 'b']);
    it.push(['t', 520, 102, '\u4e30\u6c34\u4f4d', 'xs w', 'end'], ['t', 520, 142, '\u67af\u6c34\u4f4d', 'xs w', 'end']);
    it.push(['c', 120, 60, 4, 2], ['t', 126, 46, '\u5cb8\u7ebf\uff08\u5cb8\u5761\u9876\uff09', 'xs v b', 'start']);
    it.push(['c', 149, 110, 4, 1], ['t', 143, 116, '\u4e30\u6c34\u671f\u6c34\u8fb9\u7ebf', 'xs w', 'end']);
    it.push(['c', 307, 150, 4, 1], ['t', 316, 138, '\u67af\u6c34\u671f\u6c34\u8fb9\u7ebf', 'xs w', 'start']);
    it.push(['t', 250, 176, '\u6ee9\u5730\uff1a\u67af\u6c34\u65f6\u9732\u51fa\uff0c\u4e30\u6c34\u65f6\u6df9\u6ca1', 'xs s']);
    it.push(['r', 44, 50, 34, 10, 6, '', { rx: 1 }], ['t', 61, 40, '\u94c1\u8def', 'xs ink b']);
    it.push(['a', 64, 76, 145, 76, 'o', { both: 1 }], ['t', 104, 88, '\u79bb\u6c34\u8fd1', 'xs o']);
    it.push(['a', 64, 96, 303, 96, 'o', { both: 1, dash: 1 }], ['t', 230, 88, '\u79bb\u6c34\u8fdc', 'xs o']);
    it.push(['t', 270, 216, '\u6c34\u8fb9\u7ebf\u5728\u6ee9\u5730\u4e0a\u6765\u56de\u8d70\uff0c\u5cb8\u7ebf\u4e00\u70b9\u6ca1\u52a8\u2014\u2014\u6bd4\u8f83\u5cb8\u7ebf\u53d8\u5316\uff0c\u8981\u5728\u76f8\u8fd1\u6c34\u4f4d\u7684\u5f71\u50cf\u4e4b\u95f4\u6bd4', 'xs ink']);
    F('water_line', {
      w: 540, h: 226, min: 480, items: it,
      cap: '\u6cb3\u5cb8\u6a2a\u65ad\u9762\u793a\u610f\u3002\u536b\u661f\u770b\u5230\u7684\u53ea\u662f\u6210\u50cf\u90a3\u4e00\u523b\u7684\u6c34\u9762\uff1a\u4e30\u6c34\u671f\u6c34\u8fb9\u7ebf\u903c\u8fd1\u5cb8\u5761\uff0c\u67af\u6c34\u671f\u9000\u5230\u6ee9\u5730\u4e2d\u95f4\u3002\u94c1\u8def\u5230\u201c\u6c34\u201d\u7684\u8ddd\u79bb\u4f1a\u968f\u6c34\u4f4d\u5927\u5e45\u53d8\u5316\uff0c\u800c\u771f\u6b63\u7684\u5cb8\u7ebf\uff08\u5cb8\u5761\u9876\uff09\u5e76\u6ca1\u6709\u52a8\u3002'
    });
  })();

  // 2. \u65ad\u9762\u91cf\u6cb3\u5bbd + \u6df7\u5408\u50cf\u5143\u8bef\u5dee
  (function () {
    var it = [['t', 135, 14, '\u4e2d\u5fc3\u7ebf + \u5782\u76f4\u65ad\u9762\uff08\u5e73\u9762\u56fe\uff09', 'xs ink b'], ['t', 405, 14, '\u4e00\u6761\u65ad\u9762\u4e0a\u7684 10 m \u50cf\u5143\uff08\u793a\u610f\uff09', 'xs ink b']];
    var top = function (x) { return 52 + 12 * Math.sin(x / 40); }, bot = function (x) { return 124 + 12 * Math.sin(x / 40); };
    var d = 'M14 ' + top(14).toFixed(1); for (var x = 18; x <= 256; x += 6) d += ' L' + x + ' ' + top(x).toFixed(1); for (x = 256; x >= 14; x -= 6) d += ' L' + x + ' ' + bot(x).toFixed(1); d += ' Z';
    it.push(pathFill(d, 'fw', 0.35));
    var cl = []; for (x = 14; x <= 256; x += 6) cl.push(x, +((top(x) + bot(x)) / 2).toFixed(1));
    it.push(['p', cl, 'b', { head: false, dash: 1 }], ['t', 30, 82, '\u4e2d\u5fc3\u7ebf', 'xs w', 'start']);
    [60, 120, 180, 236].forEach(function (x0, i) {
      var s = 0.3 * Math.cos(x0 / 40), nx = -s / Math.sqrt(1 + s * s), ny = 1 / Math.sqrt(1 + s * s), cy = (top(x0) + bot(x0)) / 2, L = 50;
      it.push(['l', +(x0 - nx * L).toFixed(1), +(cy - ny * L).toFixed(1), +(x0 + nx * L).toFixed(1), +(cy + ny * L).toFixed(1), i === 1 ? 'r' : 'k', { thin: i !== 1 }]);
    });
    it.push(['raw', '<ellipse cx="180" cy="' + ((top(180) + bot(180)) / 2).toFixed(1) + '" rx="22" ry="9" class="fs" style="fill-opacity:.7"/>']);
    it.push(['t', 180, 166, '\u6709\u6d32\u65f6\uff1a\u5404\u6c4a\u9053\u5bbd\u4e4b\u548c \u2260 \u5916\u7f18\u8de8\u5ea6', 'xs s'], ['t', 18, 32, '\u7ea2\u7ebf = \u53f3\u56fe\u90a3\u6761\u65ad\u9762', 'xs v', 'start']);
    var fr = [0, 0.45, 1, 1, 1, 1, 0.45, 0];
    fr.forEach(function (f, i) {
      var x = 296 + i * 28;
      it.push(['r', x, 40, 26, 90, 0, '', { rx: 0 }]);
      if (f > 0) it.push(rawRect(x, 130 - f * 90, 26, f * 90, 'fw', 0.6));
      it.push(['t', x + 13, 140, String(f), 'xs ink']);
    });
    it.push(['l', 292, 85, 524, 85, 'r', { dash: 1 }], ['t', 526, 78, '0.5', 'xs v', 'end']);
    it.push(['t', 410, 160, '\u771f\u5b9e\u5bbd\u5ea6 4.9 \u4e2a\u50cf\u5143 = 49 m', 'xs ink'], ['t', 410, 176, '\u6309 \u2265 0.5 \u5224\u6c34\uff1a4 \u4e2a\u50cf\u5143 = 40 m', 'xs ink']);
    it.push(['t', 410, 192, '\u4e24\u5cb8\u7684 0.45 \u82e5\u53d8\u6210 0.55\uff1a6 \u4e2a\u50cf\u5143 = 60 m', 'xs o']);
    F('transect', {
      w: 540, h: 204, min: 480, items: it,
      cap: '\u91cf\u6cb3\u5bbd\uff1a\u5148\u5728\u6e05\u6670\u5f71\u50cf\u4e0a\u5b9a\u4e2d\u5fc3\u7ebf\uff0c\u6cbf\u7ebf\u5e03\u5782\u76f4\u65ad\u9762\uff0c\u5728\u6c34\u4f53\u63a9\u819c\u4e0a\u91cf\u65ad\u9762\u7a7f\u8fc7\u7684\u6c34\u9762\u957f\u5ea6\uff08RivWidthCloud\u3001RiverScope \u90fd\u662f\u8fd9\u4e2a\u601d\u8def\uff09\u3002\u53f3\u56fe\u662f\u4e00\u6761\u65ad\u9762\u4e0a\u7684\u50cf\u5143\u6c34\u4f53\u6bd4\u4f8b\uff08\u793a\u610f\uff09\uff1a\u4e24\u5cb8\u5404\u6709\u4e00\u4e2a\u6df7\u5408\u50cf\u5143\uff0c\u5b83\u4eec\u843d\u5728 0.5 \u7684\u54ea\u4e00\u8fb9\uff0c\u5c31\u8ba9\u6cb3\u5bbd\u5728 40 m \u548c 60 m \u4e4b\u95f4\u8df3\u2014\u201410 m \u5f71\u50cf\u91cf\u6cb3\u5bbd\u7684\u8bef\u5dee\u5e95\u7ebf\u5c31\u5728\u8fd9\u91cc\u3002'
    });
  })();

  // 3. SuperRivolution \u591a\u671f\u878d\u5408
  (function () {
    var it = [['l', 30, 30, 330, 30, 'm'], ['t', 180, 14, '\u4ee5\u6807\u7b7e\u65e5\u671f\uff08\u7eff\u70b9\uff09\u4e3a\u4e2d\u5fc3 \u00b12 \u4e2a\u6708\uff0c\u53d6 8 \u666f Sentinel-2', 'xs ink']];
    var days = [-55, -40, -27, -12, 6, 19, 33, 52];
    days.forEach(function (dd, i) {
      var x = 180 + dd * 2.6;
      it.push(['l', x, 26, x, 34, 'k']);
      var tx = 30 + i * 38;
      it.push(['r', tx, 44, 32, 32, 0, '', { rx: 2 }], rawRect(tx + 4, 52, 24, 12, 'fw', 0.55, 2));
      if (i === 1 || i === 5) it.push(['raw', '<ellipse cx="' + (tx + 18) + '" cy="56" rx="13" ry="9" class="fc" style="fill-opacity:.95"/>']);
      it.push(['l', x, 34, tx + 16, 44, 'm', { thin: 1 }]);
    });
    it.push(['c', 180, 30, 4, 4]);
    it.push(['a', 180, 78, 180, 92, 'k'], ['r', 30, 92, 300, 30, 1, '\u6bcf\u666f\u5355\u72ec\u5206\u5272\uff08\u8f93\u5165\u5148\u653e\u5927\u5230 3 m \u7f51\u683c\uff09', { tc: 'xs ink' }]);
    it.push(['a', 180, 122, 180, 136, 'k'], ['r', 100, 136, 160, 28, 5, '8 \u666f\u7684 logits \u7b49\u6743\u5e73\u5747', { tc: 'xs ink' }]);
    it.push(['a', 180, 164, 180, 178, 'k'], ['r', 110, 178, 140, 28, 4, '3 m \u6c34\u4f53\u63a9\u819c', { tc: 'xs ink' }]);
    it.push(['t', 350, 50, '\u6c34\u4f53 F1', 'xs ink b', 'start'], ['t', 350, 66, '\u5355\u666f Sentinel-2\uff1a60.9%', 'xs', 'start'], ['t', 350, 82, '\u591a\u666f\u878d\u5408\uff1a80.5%', 'xs g', 'start'], ['t', 350, 98, '3 m \u5546\u4e1a\u5f71\u50cf\u4e0a\u754c\uff1a94.1%', 'xs', 'start']);
    it.push(['t', 350, 126, '\u5e73\u5747\u6cb3\u5bbd\u8bef\u5dee', 'xs ink b', 'start'], ['t', 350, 142, '116.4 m \u2192 47.8 m\uff08\u4e0a\u754c 18.5 m\uff09', 'xs g', 'start']);
    it.push(['t', 350, 172, '\u4ee3\u4ef7\uff1a\u7a97\u53e3\u5185\u7684\u771f\u5b9e\u6da8\u843d', 'xs o', 'start'], ['t', 350, 188, '\u88ab\u4e00\u8d77\u5e73\u5747\u6389', 'xs o', 'start']);
    F('multi_temp', {
      w: 540, h: 214, min: 480, items: it,
      cap: 'SuperRivolution \u7684\u201c\u7528\u65f6\u95f4\u6362\u7a7a\u95f4\u201d\uff08\u6309\u8bba\u6587\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u540c\u4e00\u6cb3\u6bb5 4 \u4e2a\u6708\u7a97\u53e3\u91cc\u7684 8 \u666f Sentinel-2 \u5404\u81ea\u5206\u5272\u3001\u5728 3 m \u7f51\u683c\u4e0a\u5e73\u5747\uff0c\u5355\u666f\u7684\u4e91\u3001\u9634\u5f71\u3001\u6df7\u5408\u50cf\u5143\u8bef\u5dee\u88ab\u5e73\u5747\u6389\uff1b\u8bad\u7ec3\u53ea\u9700\u8981\u5c11\u91cf 3 m \u4eba\u5de5\u6807\u7b7e\uff0c\u63a8\u7406\u65f6\u5b8c\u5168\u4e0d\u9700\u8981\u9ad8\u5206\u5f71\u50cf\u3002'
    });
  })();

  // 4. \u6d3b\u52a8\u6cb3\u9053\u6708\u5ea6\u9891\u7387
  (function () {
    var it = [['t', 270, 12, '\u4e00\u6761\u6a2a\u7a7f\u6cb3\u9053\u7684\u65ad\u9762\uff0c12 \u4e2a\u6708\u9010\u6708\u5206\u7c7b\uff08\u793a\u610f\uff09', 'xs ink b']];
    var pat = [
      '000000000000', '000000000000', '111110000000', '111111111000', '222222222222', '222222222222',
      '222222222222', '222222222222', '222222211100', '111000000000', '000000000000', '000000000000'
    ];
    var cnt = [];
    pat.forEach(function (col, c) {
      var n = 0;
      for (var m = 0; m < 12; m++) {
        var v = col[m], x = 90 + c * 28, y = 24 + m * 12;
        if (v === '2') it.push(rawRect(x, y, 28, 12, 'cell fw', 0.6)); else if (v === '1') it.push(rawRect(x, y, 28, 12, 'cell fs', 0.6)); else it.push(['r', x, y, 28, 12, 0, '', { rx: 0 }]);
        if (v !== '0') n++;
      }
      cnt.push(n);
    });
    for (var m = 0; m < 12; m += 2) it.push(['t', 84, 30 + m * 12, (m + 1) + ' \u6708', 'xs', 'end']);
    it.push(['t', 84, 176, '\u6708\u6570', 'xs ink b', 'end']);
    cnt.forEach(function (n, c) { it.push(['t', 104 + c * 28, 176, String(n), 'xs ink b']); });
    function row(y, thr, label) {
      it.push(['t', 84, y + 7, label, 'xs ink', 'end']);
      cnt.forEach(function (n, c) { it.push(n >= thr ? rawRect(90 + c * 28, y, 28, 14, 'cell fv', 0.55) : ['r', 90 + c * 28, y, 28, 14, 0, '', { rx: 0 }]); });
    }
    row(188, 4, '\u9608\u503c \u2265 4'); row(206, 11, '\u9608\u503c \u2265 11');
    it.push(rawRect(440, 30, 12, 10, 'fw', 0.6), ['t', 456, 35, '\u6c34\u4f53', 'xs', 'start'], rawRect(440, 48, 12, 10, 'fs', 0.6), ['t', 456, 53, '\u6c99\u6d32', 'xs', 'start'], rawRect(440, 66, 12, 10, 'fv', 0.55), ['t', 456, 71, '\u6d3b\u52a8\u6cb3\u9053', 'xs', 'start']);
    it.push(['t', 438, 100, '\u5de6\u5cb8\u6c99\u6d32\u6bcf\u5e74\u53ea\u9732', 'xs', 'start'], ['t', 438, 114, '\u51e0\u4e2a\u6708\uff0c\u690d\u88ab\u6162\u6162', 'xs', 'start'], ['t', 438, 128, '\u4fb5\u5360\u2014\u2014\u9608\u503c\u8d8a\u9ad8\uff0c', 'xs', 'start'], ['t', 438, 142, '\u8303\u56f4\u8d8a\u4fdd\u5b88', 'xs', 'start']);
    F('freq_raster', {
      w: 540, h: 228, min: 480, items: it,
      cap: '\u6d3b\u52a8\u6cb3\u9053\u7684\u6708\u5ea6\u805a\u5408\uff08\u6309 Po \u6cb3\u7814\u7a76\u7684\u601d\u8def\u81ea\u7ed8\uff0c\u6570\u503c\u793a\u610f\uff09\u3002\u6bcf\u4e2a\u6708\u628a\u5f71\u50cf\u5206\u6210\u6c34\u4f53\u3001\u6c99\u6d32\u3001\u80cc\u666f\uff0c\u518d\u6570\u6bcf\u4e2a\u4f4d\u7f6e\u4e00\u5e74\u91cc\u6709\u51e0\u4e2a\u6708\u662f\u201c\u6c34\u6216\u6c99\u6d32\u201d\uff1b\u7528\u6708\u6570\u9608\u503c\u5408\u6210\u5e74\u5ea6\u8303\u56f4\u3002\u9608\u503c\u4f4e\u65f6\u8303\u56f4\u5bbd\u3001\u5305\u542b\u5b63\u8282\u6027\u7684\u90e8\u5206\uff1b\u9608\u503c\u9ad8\u65f6\u53ea\u5269\u5e38\u5e74\u6d3b\u8dc3\u7684\u6cb3\u9053\u3002\u539f\u6587\u5728 Po \u6cb3\u4e0a\u63a8\u8350\u9608\u503c 4\u3002'
    });
  })();

  // 5. WorldFloods \u4e91\u611f\u77e5\u591a\u8f93\u51fa
  F('cloud_aware', {
    w: 540, h: 208, min: 480,
    cap: 'WorldFloods \u7684\u201c\u4e91\u611f\u77e5\u201d\u591a\u8f93\u51fa U-Net\uff08\u6309\u8bba\u6587\u56fe 5 \u7684\u6587\u5b57\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u4e0d\u628a\u201c\u9646 / \u6c34 / \u4e91\u201d\u5f53\u4e09\u4e2a\u4e92\u65a5\u7684\u7c7b\uff0c\u800c\u662f\u62c6\u6210\u4e24\u4e2a\u72ec\u7acb\u7684\u4e8c\u5206\u7c7b\uff1a\u4e00\u4e2a\u5224\u4e91\u3001\u4e00\u4e2a\u5224\u6c34\u3002\u8584\u4e91\u4e0b\u7684\u6c34\u5728\u4e09\u7c7b\u6a21\u578b\u91cc\u53ea\u80fd\u5224\u6210\u201c\u4e91\u201d\uff0c\u5728\u4e24\u5934\u6a21\u578b\u91cc\u201c\u4e91 = \u662f\u3001\u6c34 = \u662f\u201d\u540c\u65f6\u6210\u7acb\uff0c\u518d\u6309\u4eae\u5ea6\u89c4\u5219\u5224\u6210\u6c34\u3002',
    items: [
      ['r', 8, 70, 66, 44, 3, 'S2 \u5f71\u50cf\u5757', { tc: 'xs ink' }], ['a', 74, 92, 92, 92, 'k'],
      ['r', 92, 64, 82, 56, 1, '\u5171\u4eab\u7684\nU-Net++', { tc: 'xs ink' }],
      ['a', 174, 80, 196, 52, 'k'], ['a', 174, 104, 196, 132, 'k'],
      ['r', 196, 34, 96, 34, 0, '\u5934 1\uff1a\u4e91 / \u6674', { tc: 'xs ink' }], ['r', 196, 116, 96, 34, 1, '\u5934 2\uff1a\u9646 / \u6c34', { tc: 'xs ink' }],
      ['a', 292, 51, 316, 80, 'k'], ['a', 292, 133, 316, 104, 'k'],
      ['r', 316, 62, 110, 60, 5, '\u5408\u5e76\u89c4\u5219\n\u4eae\u4e14\u662f\u4e91 \u2192 \u4e91\n\u4e0d\u662f\u4e91\u4e14\u662f\u6c34 \u2192 \u6c34\n\u5176\u4f59 \u2192 \u9646', { tc: 'xs ink' }],
      ['a', 426, 92, 442, 92, 'k'], ['r', 442, 70, 92, 44, 4, '\u9646 / \u6c34 / \u4e91', { tc: 'xs ink' }],
      ['t', 270, 172, '\u6d2a\u6c34\u7c7b IoU\uff1aMNDWI 40.95\uff1b\u4e09\u7c7b\u4e92\u65a5 U-Net 48.27\uff1b\u591a\u8f93\u51fa 52.67\uff1b\u517c\u5bb9 Landsat \u7684 6 \u6ce2\u6bb5\u7248 57.89', 'xs ink'],
      ['t', 270, 190, '\u8584\u4e91\u5360\u6bd4\u8d8a\u9ad8\uff0c\u591a\u8f93\u51fa\u6bd4\u4e09\u7c7b\u6a21\u578b\u7684\u4f18\u52bf\u8d8a\u5927', 'xs']
    ]
  });

  // 6. \u6ed1\u5761\u4e0e\u6536\u5272\u7684 NDVI \u8f68\u8ff9
  (function () {
    var X = function (m) { return 50 + m / 36 * 440; }, Y = function (v) { return 180 - v / 0.9 * 150; };
    var it = [['l', 50, 180, 494, 180, 'k'], ['l', 50, 180, 50, 26, 'k'], ['t', 272, 198, '\u65f6\u95f4\uff08\u4e09\u5e74\uff0c\u793a\u610f\uff09', 'xs'], ['t', 24, 104, 'NDVI', 'xs']];
    [0.2, 0.4, 0.6, 0.8].forEach(function (v) { it.push(['t', 44, Y(v), v.toFixed(1), 'xs', 'end']); });
    var slide = [], crop = [];
    for (var m = 0; m <= 36; m += 0.5) {
      var seas = 0.08 * Math.sin(2 * Math.PI * (m - 3) / 12);
      var v1 = 0.72 + seas; if (m >= 20) v1 = 0.25 + Math.min(0.3, (m - 20) * 0.02) + seas * 0.4;
      slide.push(+X(m).toFixed(1), +Y(v1).toFixed(1));
      var ph = ((m % 12) + 12) % 12, v2 = ph < 4 ? 0.3 + ph * 0.1 : ph < 8 ? 0.7 : 0.7 - (ph - 8) * 0.1;
      crop.push(+X(m).toFixed(1), +Y(v2).toFixed(1));
    }
    it.push(['p', crop, 's', { head: false, bold: 1 }], ['p', slide, 'g', { head: false, bold: 1 }]);
    it.push(['l', X(20), 26, X(20), 180, 'r', { dash: 1 }], ['t', X(20) + 4, 32, '\u66b4\u96e8', 'xs v', 'start']);
    it.push(['c', X(18.5), Y(0.72 + 0.08 * Math.sin(2 * Math.PI * 15.5 / 12)), 4, 2], ['c', X(21.5), Y(0.25 + 0.03 + 0.032 * Math.sin(2 * Math.PI * 18.5 / 12)), 4, 2]);
    it.push(['t', X(26), Y(0.24), '\u6ed1\u5761\uff1a\u9aa4\u964d\u540e\u6162\u6162\u6062\u590d\uff0c\u4e0d\u6309\u5b63\u8282', 'xs g', 'start']);
    it.push(['t', X(9.5), Y(0.17), '\u8015\u5730\uff1a\u6bcf\u5e74\u540c\u4e00\u65f6\u5019\u201c\u6389\u201d\u4e00\u6b21', 'xs s']);
    it.push(['t', 272, 214, '\u53ea\u770b\u4e8b\u4ef6\u524d\u540e\u4e24\u671f\uff08\u7ea2\u70b9\uff09\uff0c\u6536\u5272\u548c\u6ed1\u5761\u7684 NDVI \u90fd\u660e\u663e\u4e0b\u964d\uff1b\u770b\u591a\u5e74\u8f68\u8ff9\u624d\u5206\u5f97\u5f00', 'xs ink']);
    F('landslide_ts', {
      w: 540, h: 224, min: 480, items: it,
      cap: '\u4e24\u79cd NDVI \u4e0b\u964d\uff08\u793a\u610f\u66f2\u7ebf\uff09\u3002\u6ed1\u5761\uff08\u7eff\uff09\u5728\u66b4\u96e8\u540e\u9aa4\u964d\uff0c\u6b64\u540e\u6309\u81ea\u5df1\u7684\u8282\u594f\u6162\u6162\u6062\u590d\uff1b\u8015\u5730\uff08\u8d6d\uff09\u6bcf\u5e74\u6536\u5272\u5b63\u90fd\u4f1a\u6389\u4e00\u6b21\u3002\u4e24\u671f\u5dee\u503c\u6cd5\uff08\u5982 dNDVI \u2264 \u22120.15\uff09\u5bf9\u4e24\u8005\u4e00\u89c6\u540c\u4ec1\uff0c\u6240\u4ee5\u519c\u4e8b\u6d3b\u52a8\u662f\u6d45\u5c42\u6ed1\u5761\u5236\u56fe\u7684\u4e3b\u8981\u8bef\u62a5\u6765\u6e90\u4e4b\u4e00\uff1b\u5f80\u5e74\u540c\u671f\u3001\u591a\u671f\u8f68\u8ff9\u80fd\u628a\u5b83\u4eec\u5206\u5f00\u3002'
    });
  })();

  // 7. \u4e09\u7ea7\u6f0f\u6597
  F('funnel', {
    w: 540, h: 186, min: 480,
    cap: '\u536b\u661f\u2014\u65e0\u4eba\u673a\u2014\u5730\u9762\u4e09\u7ea7\u6392\u67e5\u300210 m \u536b\u661f\u5f71\u50cf\u7684\u4efb\u52a1\u662f\u7b2c\u4e00\u7ea7\uff1a\u5728\u5927\u8303\u56f4\u91cc\u628a\u53ef\u7591\u7684\u627e\u5168\u3001\u628a\u8bef\u62a5\u538b\u4f4e\uff0c\u8ba9\u540e\u4e24\u7ea7\u7701\u529b\uff1b\u5b83\u4e0d\u8d1f\u8d23\u786e\u8ba4\u51e0\u5341\u5e73\u65b9\u7c73\u7684\u5c0f\u6e9c\u574d\u662f\u5426\u8fdb\u4e86\u94c1\u8def\u4fdd\u62a4\u533a\u3002',
    items: [
      ['raw', '<path d="M20 20 L520 20 L440 70 L100 70 Z" class="k1" style="stroke-width:1.4"/>'],
      ['raw', '<path d="M104 76 L436 76 L376 122 L164 122 Z" class="k5" style="stroke-width:1.4"/>'],
      ['raw', '<path d="M168 128 L372 128 L330 170 L210 170 Z" class="k4" style="stroke-width:1.4"/>'],
      ['t', 270, 38, '\u2460 \u536b\u661f\u666e\u67e5\uff1aSentinel-2\uff0c10 m\uff0c\u7ea6 5 \u5929\u4e00\u6b21\uff0c\u8986\u76d6\u5168\u7ebf', 'xs ink b'],
      ['t', 270, 56, '\u628a\u53ef\u7591\u7684\u627e\u5168\u3001\u8bef\u62a5\u538b\u4f4e\uff1b\u63d0\u793a\u201c\u6709\u6d3b\u52a8\u5728\u9760\u8fd1\u7ebf\u8def\u201d', 'xs ink'],
      ['t', 270, 92, '\u2461 \u65e0\u4eba\u673a\u7ec6\u67e5\uff1a\u5398\u7c73\u7ea7', 'xs ink b'], ['t', 270, 108, '\u786e\u8ba4\u8fb9\u754c\u3001\u91cf\u8303\u56f4\u3001\u770b\u662f\u5426\u8fdb\u4fdd\u62a4\u533a', 'xs ink'],
      ['t', 270, 144, '\u2462 \u5730\u9762\u786e\u8ba4', 'xs ink b'], ['t', 270, 160, '\u5de5\u52a1\u4eba\u5458\u73b0\u573a\u5904\u7f6e', 'xs ink']
    ]
  });

  // 8. FiLM
  (function () {
    var it = [['r', 8, 30, 84, 40, 3, '\u8f85\u52a9\u4fe1\u606f\n\u5730\u5f62\u3001\u8d28\u91cf\u2026', { tc: 'xs ink' }], ['a', 92, 50, 106, 50, 'k'], ['r', 106, 30, 60, 40, 5, '\u5c0f\u7f51\u7edc', { tc: 'xs ink' }]];
    it.push(['a', 166, 42, 196, 30, 'o'], ['a', 166, 58, 196, 78, 'o']);
    var gam = [1.4, 0.6, 1.0, 1.8, 0.3, 1.1], bet = [0.1, -0.2, 0, 0.3, 0, -0.1];
    it.push(['t', 206, 14, '\u03b3\uff08\u6bcf\u4e2a\u901a\u9053\u4e00\u4e2a\uff09', 'xs o', 'start'], ['t', 206, 100, '\u03b2\uff08\u6bcf\u4e2a\u901a\u9053\u4e00\u4e2a\uff09', 'xs o', 'start']);
    gam.forEach(function (g, i) { it.push(['r', 200 + i * 20, 22, 18, 18, 5, String(g), { tc: 'xs ink', rx: 2 }]); });
    bet.forEach(function (b, i) { it.push(['r', 200 + i * 20, 70, 18, 18, 5, String(b), { tc: 'xs ink', rx: 2 }]); });
    it.push(['r', 8, 132, 70, 40, 2, '\u5f71\u50cf\u7279\u5f81 F\n\uff086 \u4e2a\u901a\u9053\uff09', { tc: 'xs ink' }]);
    for (var k = 0; k < 6; k++) it.push(['raw', '<rect x="' + (100 + k * 6) + '" y="' + (124 + k * 5) + '" width="36" height="36" class="bx k1" style="fill-opacity:.5"/>']);
    it.push(['a', 78, 152, 98, 152, 'k']);
    it.push(['a', 176, 152, 330, 152, 'k'], ['r', 330, 126, 110, 52, 6, 'F\u2032 = \u03b3 \u2299 F + \u03b2\n\u9010\u901a\u9053\u7f29\u653e\u3001\u5e73\u79fb', { tc: 'xs ink' }]);
    it.push(['a', 260, 88, 340, 126, 'o', { dash: 1 }], ['a', 320, 40, 380, 126, 'o', { dash: 1 }]);
    it.push(['a', 440, 152, 460, 152, 'k'], ['r', 460, 132, 74, 40, 1, '\u7ee7\u7eed\n\u540e\u9762\u7684\u5c42', { tc: 'xs ink' }]);
    it.push(['t', 270, 206, '\u8f85\u52a9\u4fe1\u606f\u4e0d\u76f4\u63a5\u62fc\u8fdb\u53bb\uff0c\u800c\u662f\u201c\u8c03\u8282\u201d\u7f51\u7edc\u600e\u4e48\u770b\u5f71\u50cf\uff1a\u7b2c 4 \u4e2a\u901a\u9053\u88ab\u653e\u5927 1.8 \u500d\uff0c\u7b2c 5 \u4e2a\u51e0\u4e4e\u88ab\u5173\u6389', 'xs ink']);
    it.push(['t', 270, 222, '\u5e38\u89c1\u505a\u6cd5\uff1a\u9884\u6d4b 1 + \u0394\u03b3\uff0c\u5e76\u628a\u8f93\u51fa\u5c42\u521d\u59cb\u5316\u4e3a 0\u2014\u2014\u4e00\u5f00\u59cb \u03b3 = 1\u3001\u03b2 = 0\uff0c\u7b49\u4e8e\u6ca1\u52a0', 'xs']);
    F('film', {
      w: 540, h: 232, min: 480, items: it,
      cap: 'FiLM\uff08Perez \u7b49 2018\uff09\u7684\u7279\u5f81\u9010\u901a\u9053\u8c03\u5236\uff08\u81ea\u7ed8\uff0c\u6570\u503c\u793a\u610f\uff09\u3002\u6761\u4ef6\u4fe1\u606f\u7ecf\u4e00\u4e2a\u5c0f\u7f51\u7edc\u751f\u6210\u6bcf\u4e2a\u901a\u9053\u7684\u7f29\u653e \u03b3 \u548c\u5e73\u79fb \u03b2\uff0c\u4f5c\u7528\u5728\u4e3b\u5e72\u7279\u5f81\u4e0a\u3002\u539f\u6587\u7528\u95ee\u9898\u6587\u672c\u8c03\u5236\u56fe\u50cf\u7279\u5f81\uff1b\u5728\u9065\u611f\u91cc\u53ef\u4ee5\u8ba9\u5730\u5f62\u3001\u8d28\u91cf\u3001\u5b63\u8282\u8fd9\u7c7b\u8f85\u52a9\u4fe1\u606f\u53bb\u8c03\u5236\u5149\u5b66\u7279\u5f81\u3002'
    });
  })();

  // 9. \u95e8\u63a7\u3001\u4ea4\u53c9\u6ce8\u610f\u529b\u3001\u96f6\u521d\u59cb\u5316
  (function () {
    var it = [['t', 90, 12, '\u95e8\u63a7', 'sm ink b'], ['t', 270, 12, '\u4ea4\u53c9\u6ce8\u610f\u529b', 'sm ink b'], ['t', 450, 12, '\u96f6\u521d\u59cb\u5316\u63a5\u5165', 'sm ink b']];
    it.push(['r', 14, 28, 66, 30, 1, '\u5f71\u50cf\u7279\u5f81', { tc: 'xs ink' }], ['r', 100, 28, 66, 30, 3, '\u8f85\u52a9\u7279\u5f81', { tc: 'xs ink' }]);
    it.push(['a', 133, 58, 133, 76, 'k'], ['r', 100, 76, 66, 30, 5, '\u03c3 \u2192 g', { tc: 'xs ink' }]);
    it.push(['a', 47, 58, 70, 124, 'k'], ['a', 133, 106, 110, 124, 'k']);
    it.push(['r', 30, 124, 120, 34, 6, '\u5f71\u50cf + g \u2299 \u8f85\u52a9', { tc: 'xs ink' }]);
    it.push(['t', 90, 176, '\u6bcf\u4e2a\u4f4d\u7f6e\u81ea\u5df1\u51b3\u5b9a', 'xs'], ['t', 90, 190, '\u201c\u8fd9\u91cc\u4fe1\u8f85\u52a9\u591a\u5c11\u201d', 'xs']);
    it.push(['l', 180, 20, 180, 196, 'm', { dash: 1, thin: 1 }], ['l', 360, 20, 360, 196, 'm', { dash: 1, thin: 1 }]);
    it.push(['r', 194, 28, 70, 30, 1, '\u5f71\u50cf \u2192 Q', { tc: 'xs ink' }], ['r', 276, 28, 70, 30, 3, '\u8f85\u52a9 \u2192 K\u3001V', { tc: 'xs ink' }]);
    it.push(['a', 229, 58, 250, 80, 'k'], ['a', 311, 58, 290, 80, 'k']);
    it.push(['r', 214, 80, 112, 34, 5, 'softmax(QK\u1d40) \u00b7 V', { tc: 'xs ink' }]);
    it.push(['a', 270, 114, 270, 130, 'k'], ['r', 220, 130, 100, 30, 6, '\u5f71\u50cf + \u67e5\u5230\u7684\u5185\u5bb9', { tc: 'xs ink' }]);
    it.push(['t', 270, 176, '\u5f71\u50cf\u4e3b\u52a8\u53bb\u201c\u67e5\u201d\u8f85\u52a9', 'xs'], ['t', 270, 190, '\u91cc\u548c\u81ea\u5df1\u76f8\u5173\u7684\u90e8\u5206', 'xs']);
    it.push(['r', 376, 28, 70, 30, 1, '\u539f\u6a21\u578b', { tc: 'xs ink' }], ['r', 458, 28, 70, 30, 3, '\u65b0\u5206\u652f', { tc: 'xs ink' }]);
    it.push(['a', 493, 58, 493, 74, 'k'], ['r', 452, 74, 82, 30, 5, '\u00d7 w\uff08\u521d\u59cb 0\uff09', { tc: 'xs ink' }]);
    it.push(['a', 411, 58, 430, 124, 'k'], ['a', 493, 104, 470, 124, 'k']);
    it.push(['r', 400, 124, 100, 34, 6, '\u539f\u8f93\u51fa + w\u00b7\u65b0\u5206\u652f', { tc: 'xs ink' }]);
    it.push(['t', 450, 176, '\u7b2c\u4e00\u6b65\u7b49\u4e8e\u6ca1\u52a0\uff1b', 'xs'], ['t', 450, 190, '\u8bad\u7ec3\u4e2d\u6162\u6162\u5b66\u4f1a\u7528', 'xs']);
    F('gate_xattn', {
      w: 540, h: 200, min: 480, items: it,
      cap: '\u4e09\u79cd\u5e38\u89c1\u7684\u201c\u6ce8\u5165\u201d\u65b9\u5f0f\uff08\u81ea\u7ed8\uff09\u3002\u95e8\u63a7\u7528\u8f85\u52a9\u7279\u5f81\u7b97\u51fa 0\u20131 \u7684\u6743\u91cd\uff0c\u9010\u4f4d\u7f6e\u51b3\u5b9a\u63ba\u591a\u5c11\u8f85\u52a9\uff1b\u4ea4\u53c9\u6ce8\u610f\u529b\u8ba9\u5f71\u50cf\u7279\u5f81\u5f53 query \u53bb\u67e5\u8be2\u8f85\u52a9\u7279\u5f81\uff1b\u96f6\u521d\u59cb\u5316\uff08ControlNet \u7684\u601d\u8def\uff09\u8ba9\u65b0\u52a0\u7684\u5206\u652f\u4ece 0 \u5f00\u59cb\uff0c\u4e0d\u7834\u574f\u539f\u6a21\u578b\u5df2\u7ecf\u5b66\u4f1a\u7684\u4e1c\u897f\u3002'
    });
  })();

  // 10. \u5206\u7ec4\u4e22\u5f03
  (function () {
    var groups = ['\u5149\u8c31', '\u8d28\u91cf', '\u6307\u6570\u5dee', '\u5f80\u5e74\u540c\u671f', '\u96f7\u8fbe', '\u5730\u5f62', '\u7528\u9014\u5386\u53f2'];
    var drop = [[0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0]];
    var it = [['t', 270, 12, '\u8bad\u7ec3\u65f6\u6bcf\u4e00\u6b65\u968f\u673a\u5173\u6389\u51e0\u7ec4\u8f85\u52a9\u901a\u9053\uff08\u793a\u610f\uff09', 'xs ink b']];
    groups.forEach(function (g, j) { it.push(['t', 130 + j * 58, 32, g, 'xs ink']); });
    drop.forEach(function (row, i) {
      it.push(['t', 92, 52 + i * 22, '\u7b2c ' + (i + 1) + ' \u6b65', 'xs', 'end']);
      row.forEach(function (d, j) {
        var x = 104 + j * 58;
        it.push(d ? ['r', x, 42 + i * 22, 52, 18, 0, '\u5173', { tc: 'xs', rx: 2, dash: 1 }] : rawRect(x, 42 + i * 22, 52, 18, j === 0 ? 'fv' : 'fw', 0.45, 2));
      });
    });
    it.push(['t', 270, 166, '\u5149\u8c31\u4e00\u76f4\u5728\uff1b\u8f85\u52a9\u901a\u9053\u6309\u7ec4\u968f\u673a\u7f6e 0\uff08\u6216\u6362\u6210\u201c\u7f3a\u6d4b\u201d\u6807\u8bb0\uff09\uff0c\u5e76\u544a\u8bc9\u6a21\u578b\u54ea\u7ec4\u88ab\u5173\u4e86', 'xs ink']);
    it.push(['t', 270, 184, '\u597d\u5904\uff1a\u96f7\u8fbe\u7f3a\u6d4b\u65f6\u7167\u6837\u80fd\u7528\uff1b\u6a21\u578b\u4e0d\u4f1a\u53ea\u9760\u67d0\u4e00\u7ec4\u8d70\u6377\u5f84', 'xs']);
    F('moddrop', {
      w: 540, h: 194, min: 480, items: it,
      cap: '\u5206\u7ec4\u4e22\u5f03\uff08ModDrop \u7684\u601d\u8def\uff0c\u7528\u5230\u6211\u4eec\u7684 7 \u7ec4\u8f93\u5165\u4e0a\uff09\u3002\u8bad\u7ec3\u65f6\u968f\u673a\u53bb\u6389\u67d0\u4e9b\u6a21\u6001\u6216\u67d0\u4e9b\u7ec4\uff0c\u903c\u6a21\u578b\u65e2\u5b66\u4f1a\u878d\u5408\uff0c\u53c8\u80fd\u5728\u67d0\u7ec4\u7f3a\u5931\u6216\u5f88\u5435\u65f6\u7167\u6837\u5de5\u4f5c\uff1b\u5b83\u4e5f\u662f\u9632\u6b62\u201c\u53ea\u9760\u8f85\u52a9\u4fe1\u606f\u201d\u7684\u4e00\u79cd\u6b63\u5219\u3002'
    });
  })();

  // 11. \u6253\u4e71\u68c0\u9a8c\u4e0e\u53ea\u7528\u8f85\u52a9
  (function () {
    var it = [['t', 135, 12, '\u6253\u4e71\u68c0\u9a8c\uff1a\u6d4b\u8bd5\u65f6\u628a\u4e00\u7ec4\u8f85\u52a9\u5728\u6837\u672c\u4e4b\u95f4\u6253\u4e71', 'xs ink b'], ['t', 420, 12, '\u600e\u4e48\u8bfb\u7ed3\u679c', 'xs ink b']];
    var rows = [['\u5bf9 1', 'A1'], ['\u5bf9 2', 'A2'], ['\u5bf9 3', 'A3'], ['\u5bf9 4', 'A4']], perm = [2, 0, 3, 1];
    rows.forEach(function (r, i) {
      var y = 30 + i * 24;
      it.push(['r', 12, y, 58, 20, 3, r[0] + ' \u5f71\u50cf', { tc: 'xs ink', rx: 2 }], ['r', 74, y, 34, 20, 5, r[1], { tc: 'xs ink', rx: 2 }]);
      it.push(['r', 146, y, 58, 20, 3, r[0] + ' \u5f71\u50cf', { tc: 'xs ink', rx: 2 }], ['r', 208, y, 34, 20, 0, rows[perm[i]][1], { tc: 'xs ink', rx: 2, dash: 1 }]);
    });
    it.push(['a', 110, 70, 144, 70, 'k'], ['t', 127, 60, '\u6253\u4e71', 'xs o']);
    it.push(['t', 64, 136, '\u539f\u6837\uff1aF1 = a', 'xs ink'], ['t', 194, 136, '\u6253\u4e71\u540e\uff1aF1 = b', 'xs ink']);
    it.push(['t', 135, 158, '\u5dee a \u2212 b \u8d8a\u5927\uff0c\u6a21\u578b\u8d8a\u4f9d\u8d56\u8fd9\u4e00\u7ec4', 'xs ink b']);
    it.push(['t', 135, 176, '\u4e0d\u7528\u91cd\u8bad\uff0c\u51e0\u5206\u949f\u4e00\u7ec4\uff1b3 \u4e2a\u79cd\u5b50\u90fd\u8981\u505a', 'xs']);
    it.push(['l', 270, 20, 270, 190, 'm', { dash: 1, thin: 1 }]);
    var tbl = [['\u6253\u4e71\u540e\u51e0\u4e4e\u4e0d\u6389', '\u6a21\u578b\u6ca1\u7528\u8fd9\u7ec4\u2014\u2014\u52a0\u4e86\u4e5f\u767d\u52a0'], ['\u6253\u4e71\u540e\u6389\u5f88\u591a', '\u6a21\u578b\u7528\u4e86\u5b83\uff08\u6709\u7528\u8fd8\u662f\u6377\u5f84\uff0c\u770b\u4e0b\u9762\u4e24\u6761\uff09'], ['\u53bb\u6389\u91cd\u8bad\u4e5f\u6389', '\u8fd9\u7ec4\u786e\u5b9e\u5e26\u6765\u4e86\u589e\u76ca'], ['\u53ea\u7528\u8f85\u52a9\u5c31\u5f88\u51c6', '\u8b66\u60d5\u6cc4\u6f0f\uff1a\u8f85\u52a9\u548c\u6807\u6ce8\u4f9d\u636e\u540c\u6e90']];
    tbl.forEach(function (r, i) { it.push(['t', 286, 40 + i * 36, r[0], 'xs ink b', 'start'], ['t', 286, 56 + i * 36, r[1], 'xs', 'start']); });
    F('perm_test', {
      w: 540, h: 198, min: 480, items: it,
      cap: '\u201c\u8f85\u52a9\u4fe1\u606f\u6709\u6ca1\u6709\u88ab\u7528\u4e0a\u201d\u7684\u51e0\u79cd\u68c0\u9a8c\uff08\u793a\u610f\uff09\u3002\u6253\u4e71\u68c0\u9a8c\u7834\u574f\u4e86\u8f85\u52a9\u901a\u9053\u548c\u5f71\u50cf\u7684\u5bf9\u5e94\u5173\u7cfb\uff0c\u6210\u7ee9\u4e0d\u6389\u8bf4\u660e\u6a21\u578b\u6839\u672c\u6ca1\u5728\u7528\u5b83\uff1b\u6210\u7ee9\u6389\u4e86\u53ea\u8bf4\u660e\u7528\u4e86\uff0c\u662f\u4e0d\u662f\u771f\u6709\u5e2e\u52a9\u8981\u9760\u201c\u53bb\u6389\u8fd9\u7ec4\u91cd\u8bad\u201d\u6765\u56de\u7b54\uff1b\u201c\u53ea\u7528\u8f85\u52a9\u201d\u7684\u6a21\u578b\u5982\u679c\u4e5f\u5f88\u51c6\uff0c\u8981\u5148\u67e5\u6cc4\u6f0f\u3002'
    });
  })();

  // 12. \u5168\u94fe
  (function () {
    var nodes = [['\u5f71\u50cf', '\u7b2c 1 \u5929'], ['\u9884\u5904\u7406\u4e0e\u8d28\u91cf', '\u7b2c 1\u30016 \u5929'], ['\u6807\u7b7e', '\u7b2c 1\u30014 \u5929'], ['\u5212\u5206', '\u7b2c 2\u30016 \u5929'], ['\u6a21\u578b', '\u7b2c 2\u20135 \u5929'], ['\u878d\u5408', '\u7b2c 7 \u5929'], ['\u8bc4\u4ef7\u4e0e\u9608\u503c', '\u7b2c 2\u30016 \u5929'], ['\u5e94\u7528', '\u7b2c 7 \u5929']];
    var it = [];
    nodes.forEach(function (n, i) {
      var r = Math.floor(i / 4), c = r === 0 ? i : 7 - i, x = 14 + c * 132, y = 24 + r * 86;
      it.push(['r', x, y, 116, 46, [3, 0, 2, 1, 5, 5, 4, 4][i], n[0] + '\n' + n[1], { tc: 'xs ink' }]);
      if (i < 3) it.push(['a', x + 116, y + 23, x + 132, y + 23, 'k']);
      if (i === 3) it.push(['a', x + 58, y + 46, x + 58, y + 86, 'k']);
      if (i > 3 && i < 7) it.push(['a', x, y + 23, x - 16, y + 23, 'k']);
    });
    it.push(['t', 270, 168, '\u6bcf\u4e00\u73af\u90fd\u53ef\u80fd\u8ba9\u7ed3\u8bba\u5931\u6548\uff1a\u6807\u7b7e\u5b9a\u4e49\u4e0d\u4e25\u3001\u5212\u5206\u6cc4\u6f0f\u3001\u9608\u503c\u8fc1\u79fb\u3001\u8f85\u52a9\u4fe1\u606f\u6cc4\u6f0f\u2026\u2026', 'xs ink']);
    F('chain', {
      w: 540, h: 180, min: 480, items: it,
      cap: '\u4ece\u4e00\u666f\u5f71\u50cf\u5230\u4e00\u4e2a\u53ef\u7528\u7ed3\u8bba\u7684\u516b\u4e2a\u73af\u8282\uff0c\u4ee5\u53ca\u6bcf\u4e00\u73af\u5728\u8fd9\u4e00\u5468\u7684\u54ea\u51e0\u5929\u8bb2\u8fc7\u3002\u300c\u77e5\u8bc6\u5f71\u50cf\u300d\u9875\u6709\u53ef\u70b9\u51fb\u7684\u7248\u672c\u3002'
    });
  })();
})();
