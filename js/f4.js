/* \u7b2c 4 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u81ea\u7ed8\u793a\u610f\u56fe\uff0c\u6570\u503c\u4e3a\u793a\u610f\uff09\u3002 */
(function () {
  var F = window.TENM.fig;
  function gauss(mu, sd, x) { return Math.exp(-0.5 * (x - mu) * (x - mu) / (sd * sd)); }
  function curve(x0, x1, y0, sx, sy, f, n) { var p = []; for (var i = 0; i <= n; i++) { var v = x0 + (x1 - x0) * i / n; p.push(+(sx(v)).toFixed(1), +(y0 - sy * f(v)).toFixed(1)); } return p; }

  // 1. \u4e94\u7c7b\u5730\u7269\u7684\u6df7\u6dc6\u77e9\u9635\uff08\u793a\u610f\uff09
  (function () {
    var cls = ['\u6c34\u4f53', '\u690d\u88ab', '\u8015\u5730', '\u88f8\u9732', '\u5efa\u6210'];
    var M = [[0.93, 0.02, 0.01, 0.02, 0.02], [0.01, 0.90, 0.07, 0.01, 0.01], [0.01, 0.10, 0.70, 0.17, 0.02], [0.02, 0.03, 0.20, 0.60, 0.15], [0.01, 0.02, 0.03, 0.14, 0.80]];
    var vals = [], txt = []; M.forEach(function (r) { r.forEach(function (v) { vals.push(v); txt.push(v.toFixed(2)); }); });
    var it = [['t', 190, 16, '\u9884\u6d4b\u4e3a \u2192', 'xs'], ['t', 34, 128, '\u771f\n\u503c', 'xs']];
    cls.forEach(function (c, i) { it.push(['t', 90 + i * 50 + 25, 34, c, 'xs ink']); it.push(['t', 84, 56 + i * 32, c, 'xs ink', 'end']); });
    it.push(['g', 90, 40, 5, 5, 50, 32, vals, { ramp: 'b', txt: txt, tc: 'xs ink' }]);
    it.push(['r', 140, 104, 50, 32, 'n', '', { rx: 0, bold: 1 }]);
    it.push(['r', 190, 104, 50, 32, 'r', '', { rx: 0 }]);
    it.push(['r', 140, 136, 50, 32, 'r', '', { rx: 0 }]);
    it.push(['r', 240, 136, 50, 32, 'r', '', { rx: 0 }]);
    it.push(['r', 190, 168, 50, 32, 'r', '', { rx: 0 }]);
    it.push(['t', 352, 66, '\u7ea2\u6846 = \u6700\u5e38\u89c1\u7684\u6df7\u6dc6', 'xs v b', 'start']);
    it.push(['t', 352, 96, '\u8015\u5730 \u2194 \u88f8\u9732\uff1a\u6536\u5272\u3001\u7ffb\u8015\u540e\u7684\u7530', 'xs ink', 'start']);
    it.push(['t', 352, 114, '\u672c\u6765\u5c31\u662f\u88f8\u571f', 'xs ink', 'start']);
    it.push(['t', 352, 142, '\u88f8\u9732 \u2194 \u5efa\u6210\uff1a\u90fd\u4eae\u3001\u90fd\u5e73\uff0c', 'xs ink', 'start']);
    it.push(['t', 352, 160, '\u77ed\u6ce2\u7ea2\u5916\u90fd\u9ad8', 'xs ink', 'start']);
    it.push(['t', 352, 188, '\u690d\u88ab \u2192 \u8015\u5730\uff1a\u751f\u957f\u671f\u7684\u4f5c\u7269', 'xs ink', 'start']);
    it.push(['t', 352, 206, '\u5728\u5149\u8c31\u4e0a\u5c31\u662f\u201c\u8349\u201d', 'xs ink', 'start']);
    it.push(['t', 270, 222, '\u6bcf\u884c\u52a0\u8d77\u6765 = 1\uff1a\u7b2c i \u884c\u7b2c j \u5217 = \u771f\u503c\u4e3a i \u7684\u50cf\u5143\u91cc\u88ab\u5224\u6210 j \u7684\u6bd4\u4f8b', 'xs']);
    F('seg_conf', {
      w: 540, h: 234, items: it,
      cap: '\u4e94\u7c7b\u5730\u7269\u5206\u5272\u7684\u6df7\u6dc6\u77e9\u9635\uff08\u793a\u610f\u6570\u503c\uff0c\u7528\u6765\u8bf4\u660e\u6df7\u6dc6\u7684\u7ed3\u6784\uff0c\u4e0d\u662f\u9879\u76ee\u7ed3\u679c\uff09\u3002\u5bf9\u89d2\u7ebf\u662f\u5404\u7c7b\u7684\u53ec\u56de\u7387\uff1b\u7ea2\u6846\u662f 10 m \u5f71\u50cf\u4e0a\u6700\u5e38\u89c1\u7684\u51e0\u79cd\u6df7\u6dc6\uff0c\u5b83\u4eec\u51e0\u4e4e\u90fd\u6765\u81ea\u201c\u7269\u7406\u4e0a\u672c\u6765\u5c31\u5f88\u50cf\u201d\u7684\u5730\u7269\uff0c\u800c\u4e0d\u662f\u6a21\u578b\u4e0d\u591f\u5927\u3002'
    });
  })();

  // 2. \u57df\u504f\u79fb
  (function () {
    var X = function (v) { return 40 + (v - 0.1) / 0.35 * 440; };
    var it = [['l', 40, 190, 490, 190, 'k'], ['t', 265, 210, '\u8fd1\u7ea2\u5916\u53cd\u5c04\u7387\uff08\u4e00\u4e2a\u7279\u5f81\uff09', 'xs']];
    [0.1, 0.2, 0.3, 0.4].forEach(function (v) { it.push(['t', X(v), 200, v.toFixed(1), 'xs']); });
    it.push(['p', curve(0.1, 0.45, 190, X, 120, function (v) { return gauss(0.20, 0.03, v); }, 70), 's', { head: false }]);
    it.push(['p', curve(0.1, 0.45, 190, X, 120, function (v) { return gauss(0.32, 0.035, v); }, 70), 'g', { head: false }]);
    it.push(['p', curve(0.1, 0.45, 190, X, 120, function (v) { return gauss(0.245, 0.03, v); }, 70), 's', { head: false, dash: 1 }]);
    it.push(['p', curve(0.1, 0.45, 190, X, 120, function (v) { return gauss(0.365, 0.035, v); }, 70), 'g', { head: false, dash: 1 }]);
    it.push(['l', X(0.26), 40, X(0.26), 190, 'r', { bold: 1 }]);
    it.push(['t', X(0.26), 30, '\u5728\u6d4b\u70b9 A \u4e0a\u5b66\u5230\u7684\u9608\u503c 0.26', 'xs v b']);
    it.push(['t', X(0.20), 58, '\u88f8\u9732\uff08A\uff09', 'xs s']);
    it.push(['t', X(0.32), 58, '\u690d\u88ab\uff08A\uff09', 'xs g']);
    it.push(['t', X(0.26) - 6, 84, '\u88f8\u9732\uff08B\uff09', 'xs s', 'end']);
    it.push(['t', X(0.395), 84, '\u690d\u88ab\uff08B\uff09', 'xs g', 'start']);
    it.push(['r', X(0.26), 120, X(0.30) - X(0.26), 66, 'r', '', { rx: 0, dash: 1 }]);
    it.push(['t', 265, 236, '\u7ea2\u865a\u6846\uff1a\u6d4b\u70b9 B \u7684\u8fd9\u90e8\u5206\u88f8\u9732\u4f1a\u88ab\u5224\u6210\u690d\u88ab', 'xs v']);
    F('domain_shift', {
      w: 520, h: 248, items: it,
      cap: '\u57df\u504f\u79fb\u793a\u610f\u3002\u5b9e\u7ebf\u662f\u6d4b\u70b9 A \u4e0a\u4e24\u7c7b\u5730\u7269\u7684\u5206\u5e03\uff0c\u865a\u7ebf\u662f\u6d4b\u70b9 B\uff08\u571f\u58e4\u66f4\u4eae\u3001\u6216\u6709\u8584\u96fe\uff0c\u6574\u4f53\u53f3\u79fb\uff09\u3002\u5728 A \u4e0a\u5b66\u5230\u7684\u5206\u754c\u7ebf\u653e\u5230 B \u4e0a\uff0c\u53f3\u79fb\u7684\u90a3\u90e8\u5206\u88f8\u9732\u5168\u88ab\u5224\u9519\u3002\u6a21\u578b\u6ca1\u6709\u201c\u53d8\u7b28\u201d\uff0c\u662f\u6570\u636e\u5206\u5e03\u53d8\u4e86\u2014\u2014\u8fd9\u5c31\u662f\u7559\u4e00\u6d4b\u70b9\u7cbe\u5ea6\u5927\u5e45\u4e0b\u964d\u7684\u4e00\u4e2a\u539f\u56e0\u3002'
    });
  })();

  // 3. \u534a\u76d1\u7763\uff08UniMatch V2 \u4e00\u7c7b\uff09
  F('semi_sup', {
    w: 540, h: 250, min: 480,
    cap: '\u534a\u76d1\u7763\u5206\u5272\u7684\u4e00\u79cd\u4e3b\u6d41\u505a\u6cd5\uff08\u4ee5 UniMatch V2 \u4e3a\u4f8b\u7684\u7b80\u5316\u793a\u610f\uff09\u3002\u65e0\u6807\u6ce8\u5f71\u50cf\u505a\u4e00\u6b21\u5f31\u589e\u5f3a\u4ea4\u7ed9\u201c\u6559\u5e08\u201d\uff08\u5b66\u751f\u53c2\u6570\u7684\u6ed1\u52a8\u5e73\u5747\uff09\u51fa\u4f2a\u6807\u7b7e\uff0c\u53ea\u4fdd\u7559\u9ad8\u7f6e\u4fe1\u7684\u50cf\u5143\uff1b\u540c\u4e00\u5f20\u56fe\u505a\u5f3a\u589e\u5f3a\u4ea4\u7ed9\u201c\u5b66\u751f\u201d\uff0c\u5e76\u7528\u4e24\u4efd\u4e92\u8865\u7684\u901a\u9053\u4e22\u5f03\u63a9\u819c\uff08M \u548c 1\u2212M\uff09\u5f97\u5230\u4e24\u4e2a\u89c6\u56fe\uff0c\u90fd\u8981\u548c\u4f2a\u6807\u7b7e\u4e00\u81f4\u3002\u6709\u6807\u6ce8\u7684\u5c11\u91cf\u5f71\u50cf\u7167\u5e38\u7b97\u76d1\u7763\u635f\u5931\u3002',
    items: [
      ['r', 8, 30, 104, 40, 4, '\u5c11\u91cf\u6709\u6807\u6ce8\u5f71\u50cf', { tc: 'xs ink' }], ['a', 112, 50, 300, 50, 'k'],
      ['r', 8, 120, 104, 40, 0, '\u5927\u91cf\u65e0\u6807\u6ce8\u5f71\u50cf', { tc: 'xs ink' }],
      ['a', 112, 132, 150, 96, 'k'], ['r', 150, 78, 92, 36, 1, '\u5f31\u589e\u5f3a', { tc: 'xs ink' }], ['a', 242, 96, 300, 96, 'k'],
      ['a', 112, 150, 150, 178, 'k'], ['r', 150, 160, 92, 36, 2, '\u5f3a\u589e\u5f3a', { tc: 'xs ink' }], ['a', 242, 178, 300, 178, 'k'],
      ['r', 300, 30, 120, 40, 6, '\u5b66\u751f\u7f51\u7edc', { tc: 'sm ink' }],
      ['r', 300, 78, 120, 36, 1, '\u6559\u5e08\u7f51\u7edc\uff08EMA\uff09', { tc: 'xs ink' }],
      ['r', 300, 160, 120, 36, 6, '\u5b66\u751f\u7f51\u7edc', { tc: 'sm ink' }],
      ['a', 420, 50, 446, 50, 'k'], ['r', 446, 30, 86, 40, 4, '\u76d1\u7763\u635f\u5931', { tc: 'xs ink' }],
      ['a', 420, 96, 446, 96, 'k'], ['r', 446, 78, 86, 36, 5, '\u4f2a\u6807\u7b7e\n\uff08\u7f6e\u4fe1 > \u03c4\uff09', { tc: 'xs ink' }],
      ['p', [420, 178, 433, 178, 433, 150, 446, 150], 'k'], ['r', 446, 132, 86, 36, 2, '\u901a\u9053\u4e22\u5f03 M', { tc: 'xs ink' }],
      ['p', [420, 186, 433, 186, 433, 214, 446, 214], 'k'], ['r', 446, 196, 86, 36, 2, '\u901a\u9053\u4e22\u5f03 1\u2212M', { tc: 'xs ink' }],
      ['a', 489, 114, 489, 132, 'o', { dash: 1 }],
      ['t', 482, 124, '\u4e00\u81f4\u6027', 'xs o', 'end'],
      ['p', [300, 60, 284, 60, 284, 88, 300, 88], 'g', { dash: 1 }], ['t', 262, 70, '\u53c2\u6570\u6ed1\u52a8\u5e73\u5747', 'xs g', 'end'],
      ['t', 270, 238, '\u65e0\u6807\u6ce8\u5f71\u50cf\u5fc5\u987b\u548c\u6d4b\u8bd5\u533a\u3001\u6d4b\u8bd5\u65f6\u6bb5\u5206\u5f00\uff0c\u5426\u5219\u5c31\u662f\u5728\u5077\u770b\u6d4b\u8bd5\u573a\u666f', 'xs v']
    ]
  });

  // 4. STEGO
  F('stego', {
    w: 540, h: 230, min: 480,
    cap: 'STEGO \u7684\u601d\u8def\u3002\u51bb\u7ed3\u4e00\u4e2a\u81ea\u76d1\u7763\u9aa8\u5e72\uff08DINO\uff09\uff0c\u5b83\u7684\u7279\u5f81\u4e4b\u95f4\u7684\u76f8\u4f3c\u5ea6\u672c\u8eab\u5c31\u5f88\u80fd\u8bf4\u660e\u201c\u4e24\u5904\u662f\u4e0d\u662f\u540c\u4e00\u7c7b\u201d\u3002STEGO \u53ea\u8bad\u7ec3\u4e00\u4e2a\u5f88\u5c0f\u7684\u5206\u5272\u5934\uff0c\u8ba9\u5206\u5272\u7279\u5f81\u4e4b\u95f4\u7684\u76f8\u4f3c\u5ea6\u53bb\u201c\u6a21\u4eff\u201d\u9aa8\u5e72\u7279\u5f81\u4e4b\u95f4\u7684\u76f8\u4f3c\u5ea6\uff08\u540c\u4e00\u5f20\u56fe\u5185\u90e8\u3001\u4e0e\u76f8\u4f3c\u7684\u56fe\u3001\u4e0e\u968f\u673a\u7684\u56fe\u4e09\u79cd\u914d\u5bf9\uff09\uff0c\u6700\u540e\u5728\u5206\u5272\u7279\u5f81\u4e0a\u505a K \u5747\u503c\u805a\u7c7b\uff0c\u518d\u7528 CRF \u4fee\u8fb9\u754c\u3002\u5168\u7a0b\u4e0d\u7528\u6807\u7b7e\u2014\u2014\u5f97\u5230\u7684\u662f\u7c07\u7f16\u53f7\uff0c\u4e0d\u662f\u7c7b\u522b\u540d\u3002',
    items: [
      ['r', 8, 30, 72, 36, 0, '\u5f71\u50cf x', { tc: 'xs ink' }], ['r', 8, 130, 72, 36, 0, '\u8fd1\u90bb\u5f71\u50cf x\u2032', { tc: 'xs ink' }],
      ['a', 80, 48, 98, 48, 'k'], ['a', 80, 148, 98, 148, 'k'],
      ['r', 98, 24, 82, 148, 1, '\u51bb\u7ed3\u7684 DINO\n\uff08\u4e0d\u8bad\u7ec3\uff09', { tc: 'xs ink' }],
      ['a', 180, 48, 198, 48, 'k'], ['a', 180, 148, 198, 148, 'k'],
      ['r', 198, 30, 62, 36, 1, '\u7279\u5f81 F', { tc: 'xs ink' }], ['r', 198, 130, 62, 36, 1, '\u7279\u5f81 F\u2032', { tc: 'xs ink' }],
      ['a', 260, 48, 280, 48, 'r'], ['a', 260, 148, 280, 148, 'r'],
      ['r', 280, 30, 76, 36, 2, '\u5c0f\u5206\u5272\u5934', { tc: 'xs ink' }], ['r', 280, 130, 76, 36, 2, '\u5c0f\u5206\u5272\u5934', { tc: 'xs ink' }],
      ['a', 356, 48, 374, 48, 'r'], ['a', 356, 148, 374, 148, 'r'],
      ['r', 374, 30, 48, 36, 2, 'S', { tc: 'sm ink' }], ['r', 374, 130, 48, 36, 2, 'S\u2032', { tc: 'sm ink' }],
      ['l', 229, 66, 229, 82, 'b'], ['l', 229, 130, 229, 114, 'b'], ['r', 196, 82, 66, 32, 1, 'F\u00b7F\u2032', { tc: 'xs ink' }],
      ['l', 398, 66, 398, 82, 'r'], ['l', 398, 130, 398, 114, 'r'], ['r', 366, 82, 64, 32, 2, 'S\u00b7S\u2032', { tc: 'xs ink' }],
      ['a', 262, 98, 366, 98, 'o', { dash: 1, both: 1 }], ['t', 314, 88, '\u8ba9\u5b83\u4eec\u4e00\u81f4', 'xs o'],
      ['t', 229, 186, '\u9aa8\u5e72\u773c\u91cc\u201c\u50cf\u4e0d\u50cf\u201d', 'xs w'], ['t', 398, 186, '\u5206\u5272\u7279\u5f81\u201c\u50cf\u4e0d\u50cf\u201d', 'xs v'],
      ['a', 422, 48, 440, 48, 'g'], ['r', 440, 28, 94, 40, 4, 'K \u5747\u503c + CRF\n\u2192 \u7c07\u7f16\u53f7', { tc: 'xs ink' }],
      ['t', 270, 216, '\u8bad\u7ec3\u53ea\u66f4\u65b0\u4e24\u4e2a\u201c\u5c0f\u5206\u5272\u5934\u201d\uff08\u5b83\u4eec\u662f\u540c\u4e00\u4e2a\u7f51\u7edc\uff09\uff0cDINO \u59cb\u7ec8\u51bb\u7ed3', 'xs']
    ]
  });

  // 5. \u5f00\u653e\u8bcd\u6c47\u5206\u5272\uff08SegEarth-OV \u4e00\u7c7b\uff09
  F('ov_seg', {
    w: 540, h: 240, min: 480,
    cap: '\u514d\u8bad\u7ec3\u5f00\u653e\u8bcd\u6c47\u5206\u5272\uff08\u4ee5 SegEarth-OV \u4e3a\u4f8b\uff09\u3002CLIP \u7684\u56fe\u50cf\u7f16\u7801\u5668\u7ed9\u6bcf\u4e2a 16\u00d716 \u7684\u5757\u4e00\u4e2a\u7279\u5f81\uff0c\u6587\u5b57\u7f16\u7801\u5668\u7ed9\u6bcf\u4e2a\u7c7b\u522b\u540d\u4e00\u4e2a\u7279\u5f81\uff0c\u4e24\u8005\u5728\u540c\u4e00\u7a7a\u95f4\u91cc\u6bd4\u4f59\u5f26\u76f8\u4f3c\u5ea6\uff0c\u6bcf\u4e2a\u50cf\u5143\u53d6\u6700\u50cf\u7684\u90a3\u4e2a\u7c7b\u522b\u3002SegEarth-OV \u52a0\u4e86\u4e24\u6b65\uff1a\u7528\u4e00\u4e2a\u4ee5\u539f\u56fe\u4e3a\u5f15\u5bfc\u7684\u8f7b\u91cf\u4e0a\u91c7\u6837\u5668\uff08SimFeatUp\uff09\u628a 1/16 \u7684\u7279\u5f81\u56fe\u653e\u5927\u3001\u627e\u56de\u8fb9\u754c\uff1b\u4ece\u6bcf\u4e2a\u5757\u7279\u5f81\u91cc\u51cf\u53bb 0.3 \u500d\u7684\u5168\u5c40 [CLS] \u7279\u5f81\uff0c\u53bb\u6389\u201c\u6574\u5f20\u56fe\u662f\u4ec0\u4e48\u201d\u7684\u504f\u7f6e\u3002',
    items: [
      ['r', 8, 34, 80, 40, 0, '\u5f71\u50cf\uff08RGB\uff09', { tc: 'xs ink' }], ['a', 88, 54, 112, 54, 'k'],
      ['r', 112, 34, 100, 40, 1, 'CLIP \u56fe\u50cf\u7f16\u7801\u5668', { tc: 'xs ink' }], ['a', 212, 54, 236, 54, 'k'],
      ['r', 236, 34, 88, 40, 1, '\u5757\u7279\u5f81\n\uff081/16 \u5206\u8fa8\u7387\uff09', { tc: 'xs ink' }], ['a', 324, 54, 348, 54, 'k'],
      ['r', 348, 34, 92, 40, 5, 'SimFeatUp\n\u4e0a\u91c7\u6837', { tc: 'xs ink' }], ['a', 440, 54, 462, 54, 'k'],
      ['r', 462, 34, 72, 40, 5, '\u2212 0.3\u00d7[CLS]', { tc: 'xs ink' }],
      ['p', [48, 34, 48, 16, 394, 16, 394, 34], 'm', { dash: 1 }], ['t', 220, 10, '\u539f\u56fe\u5f15\u5bfc\u4e0a\u91c7\u6837\uff0c\u627e\u56de\u8fb9\u754c', 'xs'],
      ['r', 8, 160, 120, 40, 3, '\u7c7b\u522b\u540d\uff1awater\u3001\nbare land\u3001building\u2026', { tc: 'xs ink' }], ['a', 128, 180, 152, 180, 'k'],
      ['r', 152, 160, 100, 40, 3, 'CLIP \u6587\u5b57\u7f16\u7801\u5668', { tc: 'xs ink' }], ['a', 252, 180, 276, 180, 'k'],
      ['r', 276, 160, 92, 40, 3, '\u6bcf\u7c7b\u4e00\u4e2a\u5411\u91cf', { tc: 'xs ink' }],
      ['a', 498, 74, 430, 120, 'k'], ['p', [368, 180, 400, 180, 400, 140], 'k'],
      ['r', 340, 104, 120, 36, 2, '\u9010\u50cf\u5143\u4f59\u5f26\u76f8\u4f3c\u5ea6', { tc: 'xs ink' }], ['a', 460, 122, 480, 150, 'k'],
      ['r', 452, 150, 82, 40, 4, '\u53d6\u6700\u5927 \u2192\n\u5206\u5272\u56fe', { tc: 'xs ink' }],
      ['t', 270, 226, '10 m \u5f71\u50cf\u4e0a 1/16 \u7279\u5f81\u7684\u4e00\u683c\u7ea6 160 m\uff1b\u800c\u4e14\u53ea\u5403 RGB\uff0c\u8fd1\u7ea2\u5916\u548c\u77ed\u6ce2\u7ea2\u5916\u7528\u4e0d\u4e0a', 'xs v']
    ]
  });

  // 6. \u53d8\u5316\u68c0\u6d4b\u7684\u51e0\u79cd\u8f93\u51fa
  (function () {
    var t1 = ['4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '1', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    var t2 = t1.slice(); t2[7] = '3'; t2[8] = '3'; t2[13] = '3'; t2[14] = '3'; t2[10] = '6'; t2[11] = '6';
    var b = t1.map(function (v, i) { return v === t2[i] ? '0' : '2'; });
    var C = { '4': 'g', '1': 'w', '0': 'w', '3': 's', '6': 'm', '2': 'v' };
    var it = [['t', 56, 14, '\u524d\u56fe t1', 'xs ink b'], ['t', 160, 14, '\u540e\u56fe t2', 'xs ink b'], ['t', 264, 14, '\u4e8c\u503c\u53d8\u5316', 'xs ink b'], ['t', 436, 14, '\u8bed\u4e49\u53d8\u5316\uff08\u4ece \u2192 \u5230\uff09', 'xs ink b']];
    function grid(x0, arr) { arr.forEach(function (v, i) { var x = x0 + (i % 6) * 14, y = 24 + Math.floor(i / 6) * 14; if (v == null) it.push(['r', x, y, 14, 14, 0, '', { rx: 0 }]); else it.push(['raw', '<rect x="' + x + '" y="' + y + '" width="14" height="14" class="cell f' + C[v] + '" style="fill-opacity:' + (v === '2' ? 0.85 : v === '0' || v === '1' ? 0.75 : 0.55) + '"/>']); }); }
    var s1 = t1.map(function (v, i) { return v === t2[i] ? null : v; }), s2 = t2.map(function (v, i) { return v === t1[i] ? null : v; });
    grid(14, t1); grid(118, t2); grid(222, b.map(function (v) { return v === '2' ? '2' : null; })); grid(344, s1); grid(448, s2);
    it.push(['t', 386, 120, '\u524d\u671f\u7c7b\u522b', 'xs'], ['t', 490, 120, '\u540e\u671f\u7c7b\u522b', 'xs']);
    [['g', '\u6797\u5730'], ['w', '\u6c34\u4f53'], ['s', '\u88f8\u571f'], ['m', '\u623f\u5c4b'], ['v', '\u53d8\u5316']].forEach(function (c, i) { it.push(['raw', '<rect x="' + (14 + i * 70) + '" y="134" width="14" height="12" rx="2" class="f' + c[0] + '" style="fill-opacity:.7"/>'], ['t', 34 + i * 70, 140, c[1], 'xs', 'start']); });
    it.push(['r', 364, 134, 14, 12, 0, '', { rx: 2 }], ['t', 384, 140, '\u7a7a\u767d = \u672a\u53d8\u5316\uff08\u65e0\u7c7b\u522b\uff09', 'xs', 'start']);
    it.push(['t', 270, 170, '\u4e8c\u503c\u53d8\u5316\u53ea\u56de\u7b54\u201c\u54ea\u91cc\u53d8\u4e86\u201d\uff1b\u8bed\u4e49\u53d8\u5316\u8fd8\u56de\u7b54\u201c\u4ece\u4ec0\u4e48\u53d8\u6210\u4ec0\u4e48\u201d\uff0c\u53ef\u4ee5\u7edf\u8ba1\u201c\u6797\u5730 \u2192 \u88f8\u571f\u201d\u591a\u5c11\u50cf\u5143\u3002', 'xs ink']);
    it.push(['t', 270, 190, '\u5bf9\u8c61\u7ea7\uff1a\u628a\u76f8\u8fde\u7684\u53d8\u5316\u50cf\u5143\u5f52\u6210\u4e00\u4e2a\u4e2a\u5bf9\u8c61\uff08\u8fd9\u91cc\u662f 1 \u5757\u88f8\u571f + 1 \u5904\u623f\u5c4b\uff09\uff0c\u53ef\u4ee5\u6570\u4e2a\u6570\u3001\u7b97\u9762\u79ef\u3002', 'xs ink']);
    F('cd_tasks', { w: 540, h: 204, items: it, cap: '\u540c\u4e00\u5bf9\u5f71\u50cf\uff0c\u4e09\u79cd\u53d8\u5316\u68c0\u6d4b\u8f93\u51fa\u3002\u6570\u636e\u96c6\u51b3\u5b9a\u8f93\u51fa\u5f62\u5f0f\uff1aLEVIR-CD\u3001OSCD \u662f\u4e8c\u503c\uff1bSECOND \u662f\u8bed\u4e49\u53d8\u5316\uff08\u4e24\u5f20\u56fe\uff0c\u672a\u53d8\u5316\u5904\u4e3a\u7a7a\uff09\u3002' });
  })();

  // 7. \u6807\u7b7e\u53ea\u6765\u81ea\u8fd9\u4e00\u5bf9\uff1a\u524d\u56fe\u9009\u62e9\u4e0e\u6301\u7eed\u6269\u5f20
  F('pair_label', {
    w: 540, h: 250, min: 480,
    cap: '\u9879\u76ee\u91cc\u6807\u7b7e\u600e\u4e48\u5b9a\u7684\u4e09\u6761\u89c4\u5219\uff0c\u7528\u4e00\u4e2a\u4f8b\u5b50\u753b\u51fa\u6765\u3002t1 \u88ab\u4e91\u6321\u4f4f\uff0c\u6240\u4ee5 t2 \u7684\u524d\u56fe\u8df3\u8fc7 t1\u3001\u7528 t0\uff08\u5e76\u8bb0\u4e0b\u524d\u56fe\u662f\u54ea\u4e00\u671f\uff09\uff1bt2 \u91cc\u51fa\u73b0\u4e86\u4e00\u5c0f\u5757\u88f8\u571f\uff0c\u8fd9\u4e00\u5bf9\u6807 1\u3002\u5230 t3 \u88f8\u571f\u6269\u5927\u4e86\uff1at3 \u8fd9\u4e00\u5bf9\u53ea\u6807\u65b0\u6269\u5927\u7684\u90a3\u4e00\u5708\u3002t4 \u91cc\u53c8\u591a\u51fa\u4e00\u5757\uff0c\u4f46\u5b83\u5728 t3 \u2192 t4 \u8fd9\u4e00\u5bf9\u91cc\u624d\u770b\u5f97\u89c1\uff0c\u4e0d\u80fd\u56de\u5934\u6807\u5230 t2 \u90a3\u4e00\u5bf9\u4e0a\u2014\u2014\u6807\u7b7e\u5fc5\u987b\u80fd\u4ece\u8fd9\u4e00\u5bf9\u5f71\u50cf\u672c\u8eab\u770b\u51fa\u6765\u3002',
    items: [
      ['l', 20, 96, 520, 96, 'm'],
      ['r', 20, 30, 70, 56, 4, '\u6797\u5730', { tc: 'xs ink' }], ['t', 55, 112, 't0 \u6e05\u6670', 'xs ink'],
      ['r', 120, 30, 70, 56, 'c', '\u4e91', { tc: 'xs ink' }], ['t', 155, 112, 't1 \u6709\u4e91', 'xs ink'],
      ['r', 220, 30, 70, 56, 4, ''], ['r', 240, 44, 22, 22, 3, ''], ['t', 255, 112, 't2 \u51fa\u73b0\u88f8\u571f', 'xs ink'],
      ['r', 320, 30, 70, 56, 4, ''], ['r', 332, 38, 40, 36, 3, ''], ['t', 355, 112, 't3 \u6269\u5927', 'xs ink'],
      ['r', 420, 30, 70, 56, 4, ''], ['r', 432, 38, 40, 36, 3, ''], ['r', 474, 62, 12, 12, 3, ''], ['t', 455, 112, 't4 \u53c8\u591a\u4e00\u5757', 'xs ink'],
      ['p', [55, 128, 55, 146, 255, 146, 255, 132], 'b'], ['t', 155, 160, '\u8fd9\u4e00\u5bf9\uff1a\u524d\u56fe\u7528 t0\uff08\u8df3\u8fc7\u6709\u4e91\u7684 t1\uff09', 'xs w'],
      ['p', [255, 176, 255, 192, 355, 192, 355, 180], 'g'], ['t', 305, 206, '\u8fd9\u4e00\u5bf9\uff1a\u53ea\u6807\u65b0\u6269\u5927\u7684\u4e00\u5708', 'xs g'],
      ['p', [355, 220, 355, 236, 455, 236, 455, 224], 'o'], ['t', 405, 248, '\u65b0\u7684\u4e00\u5757\u53ea\u5c5e\u4e8e t3 \u2192 t4 \u8fd9\u4e00\u5bf9', 'xs o']
    ]
  });

  // 8. \u4e24\u6761\u8def\u7ebf
  F('route_ab', {
    w: 540, h: 230, min: 480,
    cap: '\u53d8\u5316\u68c0\u6d4b\u7684\u4e24\u6761\u8def\u7ebf\u3002\u8def\u7ebf A \u5148\u5404\u81ea\u5206\u5272\u518d\u6bd4\u8f83\uff1a\u4e24\u671f\u5206\u5272\u5404 90% \u51c6\u3001\u9519\u8bef\u4e92\u76f8\u72ec\u7acb\u65f6\uff0c\u4e24\u671f\u90fd\u5bf9\u7684\u6982\u7387\u53ea\u6709 0.9 \u00d7 0.9 = 0.81\uff0c\u5269\u4e0b\u7684\u9519\u8bef\u91cc\u6709\u5f88\u591a\u4f1a\u88ab\u5f53\u6210\u201c\u7c7b\u522b\u53d8\u4e86\u201d\uff1b\u8fb9\u754c\u50cf\u5143\u5728\u4e24\u671f\u4e4b\u95f4\u6765\u56de\u8df3\u7c7b\u522b\uff0c\u53c8\u5236\u9020\u4e00\u5708\u5047\u53d8\u5316\u3002\u8def\u7ebf B \u628a\u4e24\u671f\u4e00\u8d77\u4ea4\u7ed9\u4e00\u4e2a\u7f51\u7edc\uff0c\u76f4\u63a5\u5b66\u201c\u8fd9\u4e00\u5bf9\u91cc\u54ea\u91cc\u53d8\u4e86\u201d\u3002',
    items: [
      ['t', 30, 16, '\u8def\u7ebf A\uff1a\u5148\u5206\u5272\uff0c\u518d\u6bd4\u8f83', 'sm ink b', 'start'],
      ['r', 20, 30, 70, 32, 0, 't1', { tc: 'xs ink' }], ['a', 90, 46, 118, 46, 'k'], ['r', 118, 30, 90, 32, 1, '\u5206\u5272\uff0890% \u51c6\uff09', { tc: 'xs ink' }], ['a', 208, 46, 236, 46, 'k'], ['r', 236, 30, 70, 32, 1, '\u7c7b\u522b\u56fe 1', { tc: 'xs ink' }],
      ['r', 20, 74, 70, 32, 0, 't2', { tc: 'xs ink' }], ['a', 90, 90, 118, 90, 'k'], ['r', 118, 74, 90, 32, 1, '\u5206\u5272\uff0890% \u51c6\uff09', { tc: 'xs ink' }], ['a', 208, 90, 236, 90, 'k'], ['r', 236, 74, 70, 32, 1, '\u7c7b\u522b\u56fe 2', { tc: 'xs ink' }],
      ['a', 306, 46, 340, 66, 'k'], ['a', 306, 90, 340, 72, 'k'], ['r', 340, 50, 84, 36, 5, '\u9010\u50cf\u5143\u6bd4\u8f83', { tc: 'xs ink' }], ['a', 424, 68, 446, 68, 'k'], ['r', 446, 50, 86, 36, 2, '\u53d8\u5316\u56fe', { tc: 'xs ink' }],
      ['t', 400, 106, '\u4e24\u671f\u90fd\u5bf9 \u2248 0.9 \u00d7 0.9 = 0.81', 'xs v b'],
      ['l', 16, 124, 530, 124, 'm', { dash: 1 }],
      ['t', 30, 142, '\u8def\u7ebf B\uff1a\u76f4\u63a5\u68c0\u6d4b', 'sm ink b', 'start'],
      ['r', 20, 158, 70, 32, 0, 't1', { tc: 'xs ink' }], ['r', 20, 194, 70, 32, 0, 't2', { tc: 'xs ink' }],
      ['a', 90, 174, 140, 190, 'k'], ['a', 90, 210, 140, 198, 'k'],
      ['r', 140, 172, 250, 40, 2, '\u53d8\u5316\u68c0\u6d4b\u7f51\u7edc\uff08\u5b6a\u751f / \u65e9\u878d\u5408 / \u4ea4\u4e92\uff09', { tc: 'xs ink' }], ['a', 390, 192, 446, 192, 'k'], ['r', 446, 174, 86, 36, 2, '\u53d8\u5316\u56fe', { tc: 'xs ink' }],
      ['t', 388, 216, '\u76f4\u63a5\u4f18\u5316\u201c\u53d8\u6ca1\u53d8\u201d', 'xs g']
    ]
  });

  // 9. CVA\uff1a\u53d8\u5316\u5411\u91cf\u7684\u957f\u5ea6\u548c\u65b9\u5411
  (function () {
    var X = function (r) { return 50 + r / 0.3 * 280; }, Y = function (n) { return 226 - n / 0.45 * 206; };
    var it = [['l', 50, 226, 336, 226, 'k'], ['l', 50, 226, 50, 14, 'k'], ['t', 193, 244, '\u7ea2\u5149 B4 \u53cd\u5c04\u7387', 'xs'], ['t', 20, 120, '\u8fd1\n\u7ea2\n\u5916\nB8', 'xs']];
    [0, 0.1, 0.2, 0.3].forEach(function (v) { it.push(['t', X(v), 236, v.toFixed(1), 'xs']); });
    [0.1, 0.2, 0.3, 0.4].forEach(function (v) { it.push(['t', 42, Y(v), v.toFixed(1), 'xs', 'end']); });
    var A = [
      [[0.03, 0.32], [0.19, 0.24], 'r', '\u690d\u88ab\u6e05\u9664'],
      [[0.06, 0.30], [0.09, 0.05], 'b', '\u88ab\u6c34\u6df9'],
      [[0.03, 0.015], [0.16, 0.145], 'o', '\u8000\u6591'],
      [[0.035, 0.335], [0.07, 0.355], 'm', '\u8584\u96fe'],
      [[0.025, 0.31], [0.04, 0.225], 'g', '\u51ac\u5b63\u67af\u9ec4']
    ];
    A.forEach(function (a) { it.push(['c', X(a[0][0]), Y(a[0][1]), 3.5, 6]); it.push(['a', X(a[0][0]), Y(a[0][1]), X(a[1][0]), Y(a[1][1]), a[2], { bold: 1 }]); });
    it.push(['t', X(0.19) + 6, Y(0.24) - 10, '\u690d\u88ab\u6e05\u9664', 'xs v', 'start'], ['t', X(0.09) + 6, Y(0.05) + 2, '\u88ab\u6c34\u6df9', 'xs w', 'start'], ['t', X(0.16) + 6, Y(0.145) - 2, '\u8000\u6591', 'xs o', 'start'], ['t', X(0.07) + 6, Y(0.355) - 8, '\u8584\u96fe', 'xs m', 'start'], ['t', X(0.04) + 6, Y(0.225) + 8, '\u51ac\u5b63\u67af\u9ec4', 'xs g', 'start']);
    it.push(['t', 350, 26, '\u4e09\u4e2a\u6ce2\u6bb5\uff08B4\u3001B8\u3001B11\uff09\u4e0a\u7684', 'xs ink b', 'start'], ['t', 350, 44, '\u53d8\u5316\u5f3a\u5ea6 |\u0394|\uff1a', 'xs ink b', 'start']);
    [['\u690d\u88ab\u6e05\u9664', '0.25', 'v'], ['\u88ab\u6c34\u6df9', '0.32', 'w'], ['\u6c34\u9762\u8000\u6591', '0.22', 'o'], ['\u51ac\u5b63\u67af\u9ec4', '0.09', 'g'], ['\u8584\u96fe', '0.04', 'm']].forEach(function (r, i) { it.push(['t', 352, 72 + i * 22, r[0], 'xs ' + r[2], 'start']); it.push(['t', 520, 72 + i * 22, r[1], 'xs ink mono', 'end']); });
    it.push(['t', 350, 196, '\u8000\u6591\u548c\u771f\u53d8\u5316\u4e00\u6837\u201c\u5f3a\u201d\uff0c', 'xs v', 'start'], ['t', 350, 214, '\u53ea\u770b\u957f\u5ea6\u5206\u4e0d\u5f00\uff1b', 'xs v', 'start'], ['t', 350, 232, '\u65b9\u5411\u4e0d\u540c\uff1a\u8000\u6591\u662f\u5404\u6ce2\u6bb5\u4e00\u8d77\u53d8\u4eae', 'xs v', 'start']);
    F('cva', {
      w: 540, h: 254, items: it,
      cap: '\u53d8\u5316\u5411\u91cf\u5206\u6790\uff08CVA\uff09\u3002\u628a\u6bcf\u4e2a\u50cf\u5143\u7684\u6ce2\u6bb5\u503c\u770b\u6210\u4e00\u4e2a\u70b9\uff0c\u524d\u540e\u4e24\u671f\u4e4b\u95f4\u7684\u7bad\u5934\u5c31\u662f\u53d8\u5316\u5411\u91cf\uff1a\u957f\u5ea6\u8bf4\u660e\u53d8\u4e86\u591a\u5c11\uff0c\u65b9\u5411\u8bf4\u660e\u600e\u4e48\u53d8\u7684\u3002\u690d\u88ab\u6e05\u9664\u662f\u201c\u7ea2\u5149\u5347\u3001\u8fd1\u7ea2\u5916\u964d\u201d\uff0c\u88ab\u6c34\u6df9\u662f\u201c\u8fd1\u7ea2\u5916\u5927\u5e45\u4e0b\u964d\u201d\uff0c\u8000\u6591\u662f\u201c\u6240\u6709\u6ce2\u6bb5\u4e00\u8d77\u53d8\u4eae\u201d\u3002\u56fe\u4e2d\u6570\u503c\u662f\u6309\u5178\u578b\u53cd\u5c04\u7387\u8bbe\u5b9a\u7684\u793a\u610f\u503c\u3002'
    });
  })();

  // 10. \u9608\u503c\uff1aOtsu \u4e0e\u6df7\u5408\u6a21\u578b
  (function () {
    var it = [['l', 40, 200, 500, 200, 'k'], ['t', 270, 220, '\u5dee\u5f02\u5f3a\u5ea6 |\u0394|', 'xs']];
    var n = 34, w = 460 / n;
    for (var i = 0; i < n; i++) {
      var v = (i + 0.5) / n * 0.34, h = 0.95 * gauss(0.04, 0.022, v) + 0.06 * gauss(0.22, 0.045, v);
      var hh = Math.sqrt(h) * 160;
      it.push(['r', 40 + i * w + 1, 200 - hh, w - 2, hh, v > 0.15 ? 2 : 1, '', { rx: 1 }]);
    }
    it.push(['l', 40 + 0.105 / 0.34 * 460, 30, 40 + 0.105 / 0.34 * 460, 200, 'o', { dash: 1, bold: 1 }]);
    it.push(['t', 40 + 0.105 / 0.34 * 460, 22, '\u67d0\u79cd\u81ea\u52a8\u9608\u503c', 'xs o']);
    it.push(['l', 40 + 0.15 / 0.34 * 460, 50, 40 + 0.15 / 0.34 * 460, 200, 'g', { bold: 1 }]);
    it.push(['t', 40 + 0.15 / 0.34 * 460 + 6, 56, '\u4e24\u7c7b\u52a0\u6743\u5bc6\u5ea6\u76f8\u7b49\u5904\uff08\u8d1d\u53f6\u65af\uff09', 'xs g', 'start']);
    it.push(['t', 150, 74, '\u2190 \u672a\u53d8\u5316\uff1a\u6570\u91cf\u5de8\u5927', 'xs w', 'start'], ['t', 410, 120, '\u53d8\u5316\uff1a\u53ea\u6709\u767e\u5206\u4e4b\u51e0', 'xs v']);
    it.push(['t', 270, 238, '\u7eb5\u8f74\u6309\u5e73\u65b9\u6839\u753b\uff0c\u5426\u5219\u53d8\u5316\u90a3\u4e00\u5c0f\u56e2\u6839\u672c\u770b\u4e0d\u89c1', 'xs']);
    F('thr_hist', {
      w: 540, h: 248, items: it,
      cap: '\u5dee\u5f02\u56fe\u7684\u76f4\u65b9\u56fe\uff08\u793a\u610f\uff09\u3002\u53d8\u5316\u50cf\u5143\u53ea\u6709\u767e\u5206\u4e4b\u51e0\uff0c\u76f4\u65b9\u56fe\u51e0\u4e4e\u662f\u5355\u5cf0\u52a0\u4e00\u6761\u957f\u5c3e\u3002Otsu \u6cd5\uff08\u8ba9\u4e24\u7c7b\u7684\u7c7b\u95f4\u65b9\u5dee\u6700\u5927\uff09\u9ed8\u8ba4\u4e24\u7c7b\u90fd\u5360\u4e00\u5b9a\u6bd4\u4f8b\uff0c\u9047\u5230\u8fd9\u79cd\u6781\u4e0d\u5e73\u8861\u7684\u60c5\u51b5\u9608\u503c\u5bb9\u6613\u4e0d\u7a33\uff1bKittler\u2013Illingworth\uff08\u6700\u5c0f\u8bef\u5dee\uff09\u6cd5\u548c EM \u6df7\u5408\u6a21\u578b\uff08Bruzzone \u548c Prieto 2000\uff09\u628a\u76f4\u65b9\u56fe\u770b\u6210\u201c\u672a\u53d8\u5316 + \u53d8\u5316\u201d\u4e24\u4e2a\u5206\u5e03\u7684\u6df7\u5408\uff0c\u6309\u8d1d\u53f6\u65af\u89c4\u5219\u5b9a\u9608\u503c\uff0c\u66f4\u5408\u7406\uff0c\u4f46\u5b83\u4eec\u4e5f\u8981\u5047\u8bbe\u5206\u5e03\u7684\u5f62\u72b6\u3002'
    });
  })();

  // 11. PCA\uff1a\u4e24\u671f\u6563\u70b9
  (function () {
    var it = [['l', 50, 220, 300, 220, 'k'], ['l', 50, 220, 50, 20, 'k'], ['t', 175, 240, '\u524d\u56fe t1 \u7684\u67d0\u4e2a\u6ce2\u6bb5', 'xs'], ['t', 22, 120, 't2\n\u7684\n\u540c\n\u4e00\n\u6ce2\n\u6bb5', 'xs']];
    var r = function (s) { var x = Math.sin(s * 12.9898) * 43758.5453; return x - Math.floor(x); };
    for (var i = 0; i < 70; i++) { var u = r(i + 1), e = (r(i + 101) - 0.5) * 16; var x = 66 + u * 210, y = 214 - (x - 60) * 0.8 + e; it.push(['c', +x.toFixed(1), +y.toFixed(1), 2.6, 1]); }
    [[110, 92], [128, 80], [96, 104], [214, 196], [238, 200], [150, 206]].forEach(function (p) { it.push(['c', p[0], p[1], 3.4, 2]); });
    it.push(['a', 64, 217, 292, 34, 'b', { bold: 1 }]);
    it.push(['t', 296, 30, 'PC1\uff1a\u4e24\u671f\u5171\u6709\u7684\u4fe1\u606f', 'xs w', 'start']);
    it.push(['a', 160, 134, 198, 182, 'r', { bold: 1 }]);
    it.push(['t', 204, 188, 'PC2\uff1a\u504f\u79bb = \u53d8\u5316', 'xs v', 'start']);
    it.push(['t', 330, 80, '\u6ca1\u53d8\u7684\u50cf\u5143\uff1at2 \u2248 a\u00b7t1 + b\uff0c', 'xs ink', 'start'], ['t', 330, 98, '\u6392\u6210\u4e00\u6761\u76f4\u7ebf\uff08\u84dd\u70b9\uff09', 'xs ink', 'start'], ['t', 330, 128, '\u53d8\u4e86\u7684\u50cf\u5143\uff1a\u79bb\u5f00\u8fd9\u6761\u7ebf\uff08\u7ea2\u70b9\uff09', 'xs ink', 'start'], ['t', 330, 158, '\u6574\u4f53\u53d8\u4eae\u53d8\u6697\u53ea\u4f1a\u8ba9\u76f4\u7ebf', 'xs ink', 'start'], ['t', 330, 176, '\u5e73\u79fb\u6216\u53d8\u659c\uff0c\u4e0d\u4f1a\u8ba9\u70b9\u79bb\u5f00\u5b83', 'xs ink', 'start']);
    F('pca_diag', {
      w: 540, h: 250, items: it,
      cap: '\u628a\u4e24\u671f\u540c\u4e00\u6ce2\u6bb5\u7684\u503c\u753b\u6210\u6563\u70b9\u3002\u6ca1\u53d8\u7684\u50cf\u5143\u6cbf\u4e00\u6761\u76f4\u7ebf\u5206\u5e03\uff08\u659c\u7387\u548c\u622a\u8ddd\u53cd\u6620\u4e24\u671f\u6574\u4f53\u7684\u4eae\u5ea6\u5dee\u5f02\uff09\uff1b\u53d8\u4e86\u7684\u50cf\u5143\u504f\u79bb\u8fd9\u6761\u7ebf\u3002\u5bf9\u4e24\u671f\u53e0\u5728\u4e00\u8d77\u7684\u6ce2\u6bb5\u505a\u4e3b\u6210\u5206\u5206\u6790\uff0c\u7b2c\u4e00\u4e3b\u6210\u5206\u6cbf\u7740\u8fd9\u6761\u7ebf\uff08\u5171\u540c\u4fe1\u606f\uff09\uff0c\u540e\u9762\u7684\u4e3b\u6210\u5206\u6355\u6349\u504f\u79bb\uff08\u53d8\u5316\uff09\u3002MAD \u548c IR-MAD \u662f\u628a\u8fd9\u4e2a\u601d\u8def\u505a\u5f97\u66f4\u4e25\u8c28\u7684\u7248\u672c\u3002'
    });
  })();

  // 12. IR-MAD \u8fed\u4ee3
  F('irmad', {
    w: 540, h: 240, min: 480,
    cap: 'IR-MAD \u7684\u8fed\u4ee3\u3002\u5178\u578b\u76f8\u5173\u5206\u6790\u4e3a\u4e24\u671f\u5404\u627e\u4e00\u7ec4\u7ebf\u6027\u7ec4\u5408\uff0c\u4f7f\u5b83\u4eec\u7684\u76f8\u5173\u6027\u6700\u5927\uff1b\u4e24\u7ec4\u7ec4\u5408\u4e4b\u5dee\uff08MAD \u53d8\u91cf\uff09\u5bf9\u53d8\u5316\u6700\u654f\u611f\uff0c\u800c\u4e14\u4e0d\u53d7\u4efb\u4f55\u4e00\u671f\u6574\u4f53\u7ebf\u6027\u4eae\u5ea6\u53d8\u5316\u7684\u5f71\u54cd\u3002\u628a\u6807\u51c6\u5316 MAD \u53d8\u91cf\u7684\u5e73\u65b9\u548c Z \u770b\u6210\u5361\u65b9\u5206\u5e03\uff0c\u5c31\u80fd\u7ed9\u6bcf\u4e2a\u50cf\u5143\u4e00\u4e2a\u201c\u6ca1\u53d8\u7684\u6982\u7387\u201d\uff1b\u4e0b\u4e00\u8f6e\u7528\u8fd9\u4e2a\u6982\u7387\u5f53\u6743\u91cd\u91cd\u505a\u5178\u578b\u76f8\u5173\uff0c\u8d8a\u6765\u8d8a\u4e13\u6ce8\u4e8e\u6ca1\u53d8\u7684\u50cf\u5143\u3002\u6536\u655b\u540e\uff0cZ \u5927\u7684\u662f\u53d8\u5316\uff0c\u201c\u6ca1\u53d8\u6982\u7387\u201d\u5f88\u9ad8\u7684\u50cf\u5143\u53ef\u4ee5\u62ff\u53bb\u505a\u4e24\u671f\u7684\u76f8\u5bf9\u8f90\u5c04\u5f52\u4e00\u5316\u3002',
    items: [
      ['r', 10, 30, 112, 44, 0, '\u4e24\u671f\u5f71\u50cf\nX\uff08t1\uff09\u3001Y\uff08t2\uff09', { tc: 'xs ink' }], ['a', 122, 52, 146, 52, 'k'],
      ['r', 146, 30, 120, 44, 1, '\u2460 \u52a0\u6743\u5178\u578b\u76f8\u5173\n\u627e a\u3001b', { tc: 'xs ink' }], ['a', 266, 52, 290, 52, 'k'],
      ['r', 290, 30, 120, 44, 1, '\u2461 MAD \u53d8\u91cf\na\u1d40X \u2212 b\u1d40Y', { tc: 'xs ink' }], ['a', 410, 52, 434, 52, 'k'],
      ['r', 434, 30, 98, 44, 1, '\u2462 Z = \u03a3(MAD/\u03c3)\u00b2\n\u2248 \u5361\u65b9\u5206\u5e03', { tc: 'xs ink' }],
      ['a', 483, 74, 483, 112, 'k'], ['r', 410, 112, 122, 44, 5, '\u2463 \u6bcf\u4e2a\u50cf\u5143\u7684\n\u201c\u6ca1\u53d8\u6982\u7387\u201d w', { tc: 'xs ink' }],
      ['p', [410, 134, 206, 134, 206, 78], 'o'], ['t', 300, 124, 'w \u4f5c\u4e3a\u4e0b\u4e00\u8f6e\u7684\u6743\u91cd', 'xs o'],
      ['a', 471, 156, 471, 184, 'k'], ['a', 420, 156, 330, 184, 'k'],
      ['r', 400, 184, 132, 40, 2, 'Z \u5927 \u2192 \u53d8\u5316\u56fe', { tc: 'xs ink' }],
      ['r', 190, 184, 190, 40, 4, 'w \u5f88\u9ad8\u7684\u50cf\u5143 \u2192 \u4e0d\u53d8\u50cf\u5143\n\u2192 \u62df\u5408\u76f4\u7ebf\u505a\u76f8\u5bf9\u8f90\u5c04\u5f52\u4e00\u5316', { tc: 'xs ink' }],
      ['t', 90, 204, '\u6536\u655b\u540e\u4e24\u4e2a\u4ea7\u51fa', 'xs', 'middle']
    ]
  });

  // 13. CCDC
  (function () {
    var X = function (d) { return 50 + d / 1095 * 440; }, Y = function (v) { return 216 - (v - 0.2) / 0.75 * 172; };
    var it = [['l', 50, 216, 500, 216, 'k'], ['l', 50, 216, 50, 30, 'k'], ['t', 275, 234, '\u65f6\u95f4\uff08\u4e09\u5e74\uff09', 'xs'], ['t', 24, 120, 'NDVI', 'xs']];
    var f = function (d) { return 0.68 + 0.14 * Math.sin(2 * Math.PI * (d - 60) / 365.25); };
    var up = [], lo = [], md = [];
    for (var d = 0; d <= 760; d += 10) { md.push(+X(d).toFixed(1), +Y(f(d)).toFixed(1)); up.push(+X(d).toFixed(1), +Y(f(d) + 0.09).toFixed(1)); lo.push(+X(d).toFixed(1), +Y(f(d) - 0.09).toFixed(1)); }
    it.push(['p', md, 'g', { head: false, bold: 1 }], ['p', up, 'g', { head: false, dash: 1, thin: 1 }], ['p', lo, 'g', { head: false, dash: 1, thin: 1 }]);
    var r = function (s) { var x = Math.sin(s * 78.233) * 43758.5453; return x - Math.floor(x); };
    for (var k = 0; k < 40; k++) { var dd = 10 + k * 18.5; if (dd > 740) break; var v = f(dd) + (r(k + 3) - 0.5) * 0.08; if (k === 17) v = f(dd) - 0.13; it.push(['c', +X(dd).toFixed(1), +Y(v).toFixed(1), 3, k === 17 ? 5 : 4]); }
    it.push(['t', X(17 * 18.5 + 10), Y(f(17 * 18.5 + 10) - 0.13) + 16, '\u5355\u6b21\u5f02\u5e38\uff08\u4e91\u5f71\uff1f\uff09\n\u4e0d\u89e6\u53d1', 'xs o']);
    [770, 790, 812, 835, 860, 885, 910, 940, 975, 1010, 1050].forEach(function (dd, i) { it.push(['c', +X(dd).toFixed(1), +Y(0.33 + (r(i + 50) - 0.5) * 0.05).toFixed(1), 3, i < 3 ? 2 : 3]); });
    it.push(['t', X(790), Y(0.33) - 22, '\u8fde\u7eed 3 \u6b21\u8d85\u51fa \u2192 \u65ad\u70b9', 'xs v b']);
    it.push(['l', X(770), 30, X(770), 216, 'r', { dash: 1 }]);
    it.push(['p', [X(770), Y(0.33), X(1080), Y(0.34)], 's', { head: false, bold: 1 }]);
    it.push(['t', X(940), Y(0.34) + 22, '\u65b0\u7684\u4e00\u6bb5\uff1a\u91cd\u65b0\u62df\u5408', 'xs s']);
    it.push(['t', X(330), 16, '\u7eff\u5b9e\u7ebf\uff1a\u5b63\u8282 + \u8d8b\u52bf\u6a21\u578b\uff08\u201c\u6b63\u5e38\u72b6\u6001\u201d\uff09\uff1b\u865a\u7ebf\uff1a\u00b1 3 \u500d\u8bef\u5dee', 'xs g']);
    F('ccdc', {
      w: 540, h: 246, items: it,
      cap: 'CCDC \u7684\u601d\u8def\uff08\u793a\u610f\uff09\u3002\u6bcf\u4e2a\u50cf\u5143\u3001\u6bcf\u4e2a\u6ce2\u6bb5\u62df\u5408\u4e00\u6761\u201c\u5e38\u6570 + \u5e74\u5185\u6b63\u4f59\u5f26 + \u7ebf\u6027\u8d8b\u52bf\u201d\u7684\u66f2\u7ebf\u5f53\u4f5c\u6b63\u5e38\u72b6\u6001\u3002\u65b0\u89c2\u6d4b\u843d\u5728 \u00b13 \u500d\u8bef\u5dee\u5e26\u91cc\u5c31\u7b97\u6b63\u5e38\uff1b\u5355\u72ec\u4e00\u6b21\u8dd1\u51fa\u53bb\uff08\u53ef\u80fd\u662f\u4e91\u5f71\uff09\u4e0d\u7b97\uff1b\u8fde\u7eed 3 \u6b21\u90fd\u8dd1\u51fa\u53bb\uff0c\u624d\u786e\u8ba4\u662f\u53d8\u5316\uff0c\u5e76\u5728\u65ad\u70b9\u4e4b\u540e\u91cd\u65b0\u62df\u5408\u4e00\u6bb5\u65b0\u7684\u6a21\u578b\u3002'
    });
  })();

  // 14. DIST-ALERT \u72b6\u6001\u673a
  F('dist_state', {
    w: 540, h: 200, min: 480,
    cap: 'DIST-ALERT \u4e00\u7c7b\u201c\u9884\u8b66\u72b6\u6001\u673a\u201d\u7684\u7b80\u5316\u793a\u610f\u3002\u6bcf\u6765\u4e00\u666f\u65b0\u89c2\u6d4b\uff0c\u5c31\u548c\u201c\u8fc7\u53bb\u4e09\u5e74\u540c\u4e00\u65f6\u6bb5\u201d\u7684\u57fa\u7ebf\u6bd4\uff1b\u504f\u79bb\u4e86\u5148\u8bb0\u4e00\u6b21\u201c\u9996\u6b21\u201d\uff0c\u540e\u7eed\u89c2\u6d4b\u518d\u504f\u79bb\u5c31\u7d2f\u79ef\u7f6e\u4fe1\u5ea6\uff0c\u5230\u6682\u5b9a\u3001\u518d\u5230\u786e\u8ba4\uff1b\u6062\u590d\u6b63\u5e38\u4e00\u6bb5\u65f6\u95f4\u540e\u8f6c\u4e3a\u7ed3\u675f\u3002\u5355\u6b21\u5f02\u5e38\u4e4b\u540e\u9a6c\u4e0a\u6062\u590d\u7684\uff0c\u4e0d\u4f1a\u5347\u7ea7\u6210\u786e\u8ba4\u2014\u2014\u8fd9\u548c CCDC \u7684\u201c\u8fde\u7eed\u4e09\u6b21\u201d\u662f\u540c\u4e00\u4e2a\u601d\u60f3\uff1a\u7528\u591a\u6b21\u89c2\u6d4b\u6362\u53ef\u4fe1\u5ea6\u3002',
    items: [
      ['r', 8, 70, 78, 40, 0, '\u6b63\u5e38', { tc: 'sm ink' }], ['a', 86, 90, 118, 90, 'k'],
      ['r', 118, 70, 78, 40, 5, '\u9996\u6b21\u5f02\u5e38', { tc: 'sm ink' }], ['a', 196, 90, 228, 90, 'k'],
      ['r', 228, 70, 78, 40, 3, '\u6682\u5b9a', { tc: 'sm ink' }], ['a', 306, 90, 338, 90, 'k'],
      ['r', 338, 70, 78, 40, 2, '\u786e\u8ba4', { tc: 'sm ink', bold: 1 }], ['a', 416, 90, 448, 90, 'k'],
      ['r', 448, 70, 84, 40, 4, '\u7ed3\u675f', { tc: 'sm ink' }],
      ['t', 102, 60, '\u504f\u79bb\u57fa\u7ebf', 'xs'], ['t', 212, 60, '\u518d\u6b21\u504f\u79bb', 'xs'], ['t', 322, 60, '\u7d2f\u8ba1\u591f\u591a', 'xs'], ['t', 432, 60, '\u6062\u590d', 'xs'],
      ['p', [157, 110, 157, 150, 47, 150, 47, 110], 'g', { dash: 1 }], ['t', 102, 164, '\u4e0b\u4e00\u6b21\u5c31\u6062\u590d\uff1a\u64a4\u9500', 'xs g'],
      ['t', 270, 30, '\u57fa\u7ebf = \u8fc7\u53bb\u4e09\u5e74\u540c\u4e00\u65e5\u5386\u7a97\u53e3\uff08\u00b115 \u5929\uff09\u7684\u89c2\u6d4b', 'xs ink b'],
      ['t', 270, 190, '\u6bcf\u4e00\u7ea7\u90fd\u662f\u201c\u53c8\u591a\u4e86\u4e00\u6b21\u72ec\u7acb\u89c2\u6d4b\u652f\u6301\u5b83\u201d', 'xs']
    ]
  });
})();
