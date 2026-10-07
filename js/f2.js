/* \u7b2c 2 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u81ea\u7ed8\u793a\u610f\u56fe\uff1b\u66f2\u7ebf\u7531\u6587\u4e2d\u516c\u5f0f\u8ba1\u7b97\uff0c\u6807\u201c\u793a\u610f\u201d\u7684\u6570\u503c\u4e3a\u6f14\u793a\u7528\uff09\u3002 */
(function () {
  var F = window.TENM.fig;
  function pts(fn, a, b, n, X, Y) { var o = []; for (var i = 0; i <= n; i++) { var t = a + (b - a) * i / n; o.push(+X(t).toFixed(1), +Y(fn(t)).toFixed(1)); } return o; }

  // 1. \u8fc7\u62df\u5408\u66f2\u7ebf
  (function () {
    var X = function (t) { return 60 + t / 40 * 440; }, Y = function (v) { return 210 - v * 180; };
    var tr = pts(function (t) { return 0.15 + 0.85 * Math.exp(-t / 6); }, 0, 40, 40, X, Y);
    var va = pts(function (t) { return 0.30 + 0.62 * Math.exp(-t / 5) + 0.0035 * t; }, 0, 40, 40, X, Y);
    F('overfit', {
      w: 520, h: 245,
      cap: '\u8bad\u7ec3\u635f\u5931\u4e00\u76f4\u5728\u964d\uff0c\u9a8c\u8bc1\u635f\u5931\u5148\u964d\u540e\u5347\u3002\u6700\u4f4e\u70b9\u5de6\u8fb9\u662f\u6b20\u62df\u5408\uff08\u4e24\u6761\u90fd\u8fd8\u5728\u964d\uff09\uff0c\u53f3\u8fb9\u662f\u8fc7\u62df\u5408\uff1a\u6a21\u578b\u5f00\u59cb\u80cc\u8bad\u7ec3\u96c6\u91cc\u7684\u566a\u58f0\uff0c\u5728\u6ca1\u89c1\u8fc7\u7684\u6570\u636e\u4e0a\u53cd\u800c\u53d8\u5dee\u3002\u65e9\u505c\u3001\u6311\u68c0\u67e5\u70b9\u90fd\u8981\u770b\u9a8c\u8bc1\u96c6\uff08\u793a\u610f\uff09\u3002',
      items: [
        ['l', 60, 212, 505, 212, 'm'], ['l', 60, 26, 60, 212, 'm'],
        ['t', 280, 232, '\u8bad\u7ec3\u8f6e\u6570\uff08epoch\uff09', 'sm'], ['t', 66, 18, '\u635f\u5931', 'sm', 'start'],
        ['p', tr, 'b', { head: false, bold: 1 }], ['p', va, 'r', { head: false, bold: 1 }],
        ['l', X(17.8), 26, X(17.8), 212, 'g', { dash: 1 }],
        ['t', X(17.8) + 6, 40, '\u9a8c\u8bc1\u635f\u5931\u6700\u4f4e\uff1a\u8be5\u505c\u4e86', 'sm g', 'start'],
        ['t', 130, 60, '\u6b20\u62df\u5408', 'sm'], ['t', 400, 60, '\u8fc7\u62df\u5408', 'sm'],
        ['t', 498, Y(0.151) - 12, '\u8bad\u7ec3\u635f\u5931', 'sm w', 'end'],
        ['t', 498, Y(0.44) - 12, '\u9a8c\u8bc1\u635f\u5931', 'sm v', 'end']
      ]
    });
  })();

  // 2. \u795e\u7ecf\u5143\u4e0e\u6fc0\u6d3b\u51fd\u6570
  (function () {
    var it = [
      ['c', 50, 50, 18, 1, 'x\u2081'], ['c', 50, 105, 18, 1, 'x\u2082'], ['c', 50, 160, 18, 1, 'x\u2083'],
      ['a', 68, 54, 202, 98, 'k'], ['a', 68, 105, 202, 105, 'k'], ['a', 68, 156, 202, 112, 'k'],
      ['t', 130, 64, 'w\u2081', 'sm ink'], ['t', 130, 96, 'w\u2082', 'sm ink'], ['t', 130, 148, 'w\u2083', 'sm ink'],
      ['c', 230, 105, 28, 5, '\u03a3 + b'],
      ['a', 258, 105, 300, 105, 'k'], ['t', 279, 92, 'z', 'sm ink'],
      ['r', 300, 85, 60, 40, 2, '\u03c3(z)'],
      ['a', 360, 105, 410, 105, 'k'],
      ['c', 430, 105, 20, 4, 'y'],
      ['t', 260, 20, 'z = w\u2081x\u2081 + w\u2082x\u2082 + w\u2083x\u2083 + b\uff0c\u3000y = \u03c3(z)', 'sm ink mono'],
      ['r', 40, 192, 200, 100, 0, '', { rx: 8 }], ['r', 280, 192, 200, 100, 0, '', { rx: 8 }],
      ['l', 60, 262, 220, 262, 'm'], ['l', 140, 202, 140, 282, 'm'],
      ['p', [60, 262, 140, 262, 210, 208], 'r', { head: false, bold: 1 }],
      ['t', 140, 284, 'ReLU\uff1amax(0, z)', 'sm ink'],
      ['l', 300, 262, 460, 262, 'm'], ['l', 380, 202, 380, 282, 'm'],
      ['p', pts(function (z) { return 1 / (1 + Math.exp(-z)); }, -6, 6, 40, function (z) { return 380 + z * 13; }, function (v) { return 262 - v * 54; }), 'b', { head: false, bold: 1 }],
      ['t', 380, 284, 'sigmoid\uff1a\u538b\u5230 0\u20131', 'sm ink']
    ];
    F('neuron', { w: 520, h: 300, items: it, cap: '\u4e00\u4e2a\u795e\u7ecf\u5143\uff1a\u8f93\u5165\u52a0\u6743\u6c42\u548c\u3001\u52a0\u504f\u7f6e\uff0c\u518d\u8fc7\u975e\u7ebf\u6027\u6fc0\u6d3b\u3002\u4e0b\u9762\u662f\u4e24\u79cd\u6700\u5e38\u7528\u7684\u6fc0\u6d3b\uff1aReLU \u8d1f\u7684\u5168\u53d8 0\u3001\u6b63\u7684\u539f\u6837\u901a\u8fc7\uff1bsigmoid \u628a\u4efb\u610f\u6570\u538b\u5230 0\u20131\uff0c\u4e8c\u5206\u7c7b\u8f93\u51fa\u7528\u5b83\u5f53\u6982\u7387\u3002' });
  })();

  // 3. \u53cd\u5411\u4f20\u64ad\u6570\u503c\u4f8b\u5b50
  F('backprop', {
    w: 560, h: 268, min: 480,
    cap: '\u4e00\u4e2a\u6700\u5c0f\u7684\u53cd\u5411\u4f20\u64ad\u4f8b\u5b50\u3002\u9ed1\u5b57\u662f\u524d\u5411\u8ba1\u7b97\u7684\u503c\uff0c\u7ea2\u5b57\u662f\u53cd\u5411\u4f20\u56de\u6765\u7684\u68af\u5ea6\u3002sigmoid \u63a5\u4e8c\u5143\u4ea4\u53c9\u71b5\u65f6\uff0c\u2202L/\u2202z \u6070\u597d\u7b49\u4e8e p \u2212 y\uff0c\u8fd9\u662f\u5b83\u4eec\u603b\u662f\u914d\u5bf9\u4f7f\u7528\u7684\u539f\u56e0\u4e4b\u4e00\u3002\u6309\u68af\u5ea6\u66f4\u65b0\u4e00\u6b65\u540e\uff0c\u635f\u5931\u4ece 0.288 \u964d\u5230 0.258\u3002',
    items: [
      ['r', 16, 30, 70, 32, 1, 'x = 2'], ['r', 16, 104, 70, 32, 1, 'w = 0.5'], ['r', 140, 172, 76, 32, 1, 'b = 0.1'],
      ['c', 140, 84, 18, 6, '\u00d7'],
      ['a', 86, 46, 125, 74, 'k'], ['a', 86, 120, 125, 94, 'k'],
      ['c', 245, 120, 18, 6, '+'],
      ['a', 158, 90, 228, 114, 'k'], ['a', 178, 172, 236, 136, 'k'],
      ['t', 190, 84, 'wx = 1.0', 'sm ink'],
      ['r', 318, 100, 52, 40, 2, '\u03c3'],
      ['a', 263, 120, 318, 120, 'k'], ['t', 290, 106, 'z = 1.1', 'sm ink'],
      ['r', 440, 100, 60, 40, 5, 'BCE'],
      ['a', 370, 120, 440, 120, 'k'], ['t', 405, 106, 'p = 0.750', 'sm ink'],
      ['t', 470, 178, 'y = 1\uff08\u771f\u503c\uff09', 'xs'],
      ['a', 500, 120, 550, 120, 'k'], ['t', 526, 90, 'L = 0.288', 'sm ink'],
      ['t', 405, 156, '\u2202L/\u2202p = \u22121.333', 'xs v'],
      ['t', 290, 150, '\u2202L/\u2202z = p \u2212 y', 'xs v'], ['t', 290, 164, '= \u22120.25', 'xs v'],
      ['t', 40, 156, '\u2202L/\u2202w = \u22120.25 \u00d7 x', 'xs v', 'start'], ['t', 40, 170, '= \u22120.5', 'xs v', 'start'],
      ['t', 230, 214, '\u2202L/\u2202b = \u22120.25', 'xs v', 'start'],
      ['t', 280, 240, '\u66f4\u65b0\uff08\u5b66\u4e60\u7387 \u03b7 = 0.1\uff09\uff1aw \u2190 0.5 \u2212 0.1\u00d7(\u22120.5) = 0.55\uff1bb \u2190 0.1 \u2212 0.1\u00d7(\u22120.25) = 0.125', 'sm ink'],
      ['t', 280, 258, '\u65b0\u7684 z = 1.225\uff0cp = 0.773\uff0cL = 0.258\uff1a\u635f\u5931\u4e0b\u964d\u4e86', 'sm g']
    ]
  });

  // 4. \u5b66\u4e60\u7387\u8ba1\u5212
  (function () {
    var X = function (s) { return 60 + s * 440; }, Y = function (v) { return 170 - v * 140; };
    var p = pts(function (s) { return s < 0.05 ? s / 0.05 : 0.5 * (1 + Math.cos(Math.PI * (s - 0.05) / 0.95)); }, 0, 1, 80, X, Y);
    F('lr_sched', {
      w: 520, h: 200,
      cap: '\u5e38\u89c1\u7684\u5b66\u4e60\u7387\u8ba1\u5212\uff1a\u5148\u7528\u5f88\u5c0f\u7684\u6b65\u5b50\u201c\u70ed\u8eab\u201d\u51e0\u767e\u6b65\uff08\u521a\u5f00\u59cb\u68af\u5ea6\u65b9\u5411\u4e0d\u53ef\u9760\uff0c\u6b65\u5b50\u5927\u4e86\u5bb9\u6613\u4e00\u4e0b\u51b2\u98de\uff09\uff0c\u518d\u6309\u4f59\u5f26\u66f2\u7ebf\u6162\u6162\u964d\u5230\u63a5\u8fd1 0\uff0c\u540e\u671f\u5c0f\u6b65\u7cbe\u4fee\u3002',
      items: [
        ['l', 60, 172, 505, 172, 'm'], ['l', 60, 20, 60, 172, 'm'],
        ['p', p, 'r', { head: false, bold: 1 }],
        ['t', 66, 14, '\u5b66\u4e60\u7387', 'sm', 'start'], ['t', 282, 192, '\u8bad\u7ec3\u8fdb\u5ea6', 'sm'],
        ['t', 84, 44, '\u70ed\u8eab', 'sm o', 'start'], ['t', 300, 80, '\u4f59\u5f26\u8870\u51cf', 'sm v', 'start']
      ]
    });
  })();

  // 5. \u5377\u79ef\u8ba1\u7b97
  (function () {
    var inV = [], inT = [];
    for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) { inV.push(r < 2 ? '4' : '1'); inT.push(r < 2 ? '0.30' : '0.02'); }
    var ker = ['1', '2', '1', '0', '0', '0', '\u22121', '\u22122', '\u22121'];
    var out = [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0, 0, 0], outT = ['1.12', '1.12', '1.12', '1.12', '1.12', '1.12', '0', '0', '0'];
    F('conv_op', {
      w: 540, h: 262, min: 480,
      cap: '\u4e00\u6b21\u5377\u79ef\u8ba1\u7b97\u3002\u8f93\u5165\u662f\u4e00\u5757 5\u00d75 \u7684\u5f71\u50cf\uff1a\u4e0a\u4e24\u884c\u662f\u9646\u5730\uff080.30\uff09\uff0c\u4e0b\u4e09\u884c\u662f\u6c34\uff080.02\uff09\u30023\u00d73 \u7684\u201c\u6c34\u5e73\u8fb9\u7f18\u201d\u6838\u5728\u4e0a\u9762\u6ed1\u52a8\uff0c\u6bcf\u4e2a\u4f4d\u7f6e\u628a\u7a97\u53e3\u91cc 9 \u4e2a\u6570\u548c\u6838\u91cc 9 \u4e2a\u6743\u91cd\u5bf9\u5e94\u76f8\u4e58\u518d\u76f8\u52a0\u3002\u7a97\u53e3\u8de8\u5728\u5cb8\u7ebf\u4e0a\u65f6\u8f93\u51fa 1.12\uff0c\u6574\u4e2a\u7a97\u53e3\u90fd\u5728\u6c34\u91cc\u65f6\u8f93\u51fa 0\u2014\u2014\u8fd9\u4e2a\u6838\u5c31\u662f\u4e00\u4e2a\u201c\u6c34\u5e73\u5cb8\u7ebf\u63a2\u6d4b\u5668\u201d\u3002',
      items: [
        ['t', 95, 22, '\u8f93\u5165\uff085\u00d75\uff09', 'sm ink b'],
        ['g', 20, 34, 5, 5, 30, 30, inV, { txt: inT, tc: 'xs ink' }],
        ['r', 20, 34, 90, 90, 'r', '', { rx: 0 }],
        ['t', 95, 200, '\u7ea2\u6846 = \u5f53\u524d\u7a97\u53e3', 'xs v'],
        ['t', 260, 22, '\u5377\u79ef\u6838\uff083\u00d73\uff09', 'sm ink b'],
        ['g', 215, 64, 3, 3, 30, 30, '5', { txt: ker, tc: 'sm ink b' }],
        ['a', 178, 109, 208, 109, 'k'], ['a', 312, 109, 352, 109, 'k'],
        ['t', 415, 22, '\u8f93\u51fa\uff083\u00d73\uff09', 'sm ink b'],
        ['g', 370, 64, 3, 3, 30, 30, out, { ramp: 'r', txt: outT, tc: 'xs ink b' }],
        ['t', 415, 172, '\u5cb8\u7ebf\u6240\u5728\u7684\u884c\u54cd\u5e94\u6700\u5927', 'xs v'],
        ['t', 270, 226, '1\u00d70.30 + 2\u00d70.30 + 1\u00d70.30 + 0 \u2212 1\u00d70.02 \u2212 2\u00d70.02 \u2212 1\u00d70.02 = 1.12', 'sm ink mono'],
        ['t', 270, 248, '6 \u4e2a\u6ce2\u6bb5\u65f6\uff0c\u6838\u662f 6\u00d73\u00d73 \u7684\u7acb\u65b9\u5757\uff1a\u6bcf\u4e2a\u6ce2\u6bb5\u4e00\u5c42\u6743\u91cd\uff0c6 \u5c42\u7ed3\u679c\u76f8\u52a0\u6210\u4e00\u4e2a\u6570', 'sm']
      ]
    });
  })();

  // 6. \u611f\u53d7\u91ce
  (function () {
    var it = [], rows = [[180, 3, 9, '\u8f93\u5165'], [140, 4, 8, '\u7b2c 1 \u5c42'], [100, 5, 7, '\u7b2c 2 \u5c42'], [60, 6, 6, '\u7b2c 3 \u5c42']];
    rows.forEach(function (rw, li) {
      var vals = [];
      for (var c = 0; c < 13; c++) vals.push(c >= rw[1] && c <= rw[2] ? '5' : '0');
      it.push(['g', 65, rw[0], 13, 1, 28, 22, vals]);
      it.push(['t', 58, rw[0] + 11, rw[3], 'sm ink', 'end']);
    });
    it.push(['l', 65 + 6 * 28 + 14, 82, 65 + 5 * 28, 100, 'o', { thin: 1 }], ['l', 65 + 6 * 28 + 14, 82, 65 + 8 * 28, 100, 'o', { thin: 1 }]);
    it.push(['l', 65 + 5 * 28, 122, 65 + 4 * 28, 140, 'o', { thin: 1 }], ['l', 65 + 8 * 28, 122, 65 + 9 * 28, 140, 'o', { thin: 1 }]);
    it.push(['l', 65 + 4 * 28, 162, 65 + 3 * 28, 180, 'o', { thin: 1 }], ['l', 65 + 9 * 28, 162, 65 + 10 * 28, 180, 'o', { thin: 1 }]);
    it.push(['t', 440, 71, '1 \u4e2a\u70b9', 'sm', 'start'], ['t', 440, 111, '\u770b 3 \u4e2a', 'sm', 'start'], ['t', 440, 151, '\u770b 5 \u4e2a', 'sm', 'start'], ['t', 440, 191, '\u770b 7 \u4e2a', 'sm v', 'start']);
    F('receptive', {
      w: 520, h: 222, items: it,
      cap: '\u611f\u53d7\u91ce\u600e\u4e48\u957f\u5927\uff08\u4e00\u7ef4\u793a\u610f\uff09\uff1a\u7b2c 3 \u5c42\u7684\u4e00\u4e2a\u70b9\uff08\u6700\u4e0a\u9762\u4e00\u683c\uff09\u4f9d\u8d56\u7b2c 2 \u5c42\u7684 3 \u4e2a\u70b9\u3001\u7b2c 1 \u5c42\u7684 5 \u4e2a\u70b9\u3001\u8f93\u5165\u7684 7 \u4e2a\u70b9\u3002\u6bcf\u53e0\u4e00\u5c42 3\u00d73 \u5377\u79ef\uff0c\u611f\u53d7\u91ce\u52a0 2\uff1b\u4e2d\u95f4\u6bcf\u505a\u4e00\u6b21 2 \u500d\u4e0b\u91c7\u6837\uff0c\u4e4b\u540e\u6bcf\u5c42\u7684\u589e\u91cf\u7ffb\u500d\u2014\u2014\u6240\u4ee5\u6df1\u5c42\u5f88\u5feb\u5c31\u80fd\u201c\u770b\u5230\u201d\u51e0\u767e\u7c73\u7684\u8303\u56f4\u3002'
    });
  })();

  // 7. \u6b8b\u5dee\u5757
  F('resblock', {
    w: 520, h: 185,
    cap: 'ResNet \u7684\u6b8b\u5dee\u5757\u3002\u4e3b\u8def\u5b66\u4e00\u4e2a\u201c\u589e\u91cf\u201dF(x)\uff0c\u6377\u5f84\u628a\u8f93\u5165\u539f\u6837\u52a0\u56de\u6765\uff1ay = ReLU(F(x) + x)\u3002\u53cd\u5411\u4f20\u64ad\u65f6\uff0c\u68af\u5ea6\u53ef\u4ee5\u6cbf\u6377\u5f84\u76f4\u63a5\u6d41\u56de\u53bb\uff0c\u4e0d\u5fc5\u7a7f\u8fc7\u6bcf\u4e00\u5c42\u5377\u79ef\u8fde\u4e58\uff0c\u6240\u4ee5\u4e00\u767e\u591a\u5c42\u7684\u7f51\u7edc\u4e5f\u8bad\u7ec3\u5f97\u52a8\u3002',
    items: [
      ['t', 22, 112, 'x', 'lg b'],
      ['a', 32, 108, 50, 108, 'k'],
      ['r', 50, 90, 66, 36, 1, '3\u00d73 \u5377\u79ef', { tc: 'sm ink' }], ['a', 116, 108, 124, 108, 'k'],
      ['r', 124, 90, 40, 36, 0, 'BN', { tc: 'sm ink' }], ['a', 164, 108, 172, 108, 'k'],
      ['r', 172, 90, 50, 36, 5, 'ReLU', { tc: 'sm ink' }], ['a', 222, 108, 230, 108, 'k'],
      ['r', 230, 90, 66, 36, 1, '3\u00d73 \u5377\u79ef', { tc: 'sm ink' }], ['a', 296, 108, 304, 108, 'k'],
      ['r', 304, 90, 40, 36, 0, 'BN', { tc: 'sm ink' }], ['a', 344, 108, 381, 108, 'k'],
      ['c', 395, 108, 14, 6, '+'],
      ['a', 409, 108, 420, 108, 'k'],
      ['r', 420, 90, 56, 36, 5, 'ReLU', { tc: 'sm ink' }], ['a', 476, 108, 494, 108, 'k'],
      ['t', 506, 112, 'y', 'lg b'],
      ['p', [40, 108, 40, 50, 395, 50, 395, 94], 'g', { bold: 1 }],
      ['t', 218, 40, '\u6052\u7b49\u6377\u5f84\uff1ax \u539f\u6837\u52a0\u56de\u6765', 'sm g'],
      ['t', 210, 146, '\u4e3b\u8def F(x)\uff1a\u53ea\u5b66\u201c\u5728 x \u4e0a\u6539\u591a\u5c11\u201d', 'sm w'],
      ['t', 260, 172, '\u2202y/\u2202x = \u2202F/\u2202x + 1\uff1a\u591a\u51fa\u6765\u7684\u201c1\u201d\u8ba9\u68af\u5ea6\u4e0d\u4f1a\u5728\u6df1\u5c42\u6d88\u5931', 'sm ink']
    ]
  });

  // 8. U-Net
  (function () {
    var enc = [['64 @ 256\u00b2', 40], ['128 @ 128\u00b2', 100], ['256 @ 64\u00b2', 160], ['512 @ 32\u00b2', 220]];
    var it = [['t', 85, 18, '\u8f93\u5165\uff1a6 \u00d7 256 \u00d7 256', 'sm ink b']];
    enc.forEach(function (e, i) {
      it.push(['r', 40, e[1], 92, 32, 1, e[0], { tc: 'sm ink' }]);
      it.push(['r', 380, e[1], 92, 32, 2, e[0], { tc: 'sm ink' }]);
      it.push(['a', 132, e[1] + 16, 380, e[1] + 16, 'm', { dash: 1 }]);
      if (i < 3) { it.push(['a', 86, e[1] + 32, 86, e[1] + 60, 'b']); it.push(['a', 426, e[1] + 60, 426, e[1] + 32, 'r']); }
    });
    it.push(['a', 86, 26, 86, 40, 'k']);
    it.push(['t', 256, 48, '\u590d\u5236\u5e76\u62fc\u63a5\uff08\u8df3\u8dc3\u8fde\u63a5\uff09', 'xs']);
    it.push(['t', 94, 80, '\u4e0b\u91c7\u6837 \u00d7\u00bd', 'xs w', 'start']);
    it.push(['t', 418, 80, '\u4e0a\u91c7\u6837 \u00d72', 'xs v', 'end']);
    it.push(['r', 200, 284, 112, 32, 5, '1024 @ 16\u00b2', { tc: 'sm ink' }]);
    it.push(['p', [86, 252, 86, 300, 200, 300], 'b']);
    it.push(['p', [312, 300, 426, 300, 426, 252], 'r']);
    it.push(['t', 256, 330, '\u74f6\u9888\uff1a\u770b\u5f97\u6700\u8fdc\u3001\u4f4d\u7f6e\u6700\u7c97\uff08\u4e00\u683c = 160 m\uff09', 'xs']);
    it.push(['a', 472, 56, 492, 56, 'k']);
    it.push(['r', 492, 40, 62, 32, 4, '1 @ 256\u00b2', { tc: 'sm ink' }]);
    it.push(['t', 556, 86, 'sigmoid \u2192 \u53d8\u5316\u6982\u7387', 'xs', 'end']);
    it.push(['t', 86, 350, '\u7f16\u7801\u5668\uff1a\u662f\u4ec0\u4e48', 'sm w']);
    it.push(['t', 426, 350, '\u89e3\u7801\u5668\uff1a\u5728\u54ea\u91cc', 'sm v']);
    F('unet', {
      w: 560, h: 362, min: 480, items: it,
      cap: 'U-Net \u7684\u6570\u636e\u6d41\uff08\u4ee5 6 \u6ce2\u6bb5\u3001256\u00d7256 \u8f93\u5165\u4e3a\u4f8b\uff0c\u6846\u91cc\u662f\u201c\u901a\u9053\u6570 @ \u8fb9\u957f\u201d\uff09\u3002\u7f16\u7801\u5668\u6bcf\u4e0b\u4e00\u7ea7\uff0c\u8fb9\u957f\u51cf\u534a\u3001\u901a\u9053\u7ffb\u500d\uff1b\u89e3\u7801\u5668\u6bcf\u4e0a\u4e00\u7ea7\uff0c\u5148\u4e0a\u91c7\u6837\uff0c\u518d\u628a\u7f16\u7801\u5668\u540c\u4e00\u7ea7\u7684\u7279\u5f81\u62fc\u63a5\u8fdb\u6765\uff08\u865a\u7ebf\uff09\uff0c\u8865\u56de\u88ab\u4e0b\u91c7\u6837\u4e22\u6389\u7684\u8fb9\u754c\u7ec6\u8282\u3002\u505a\u53d8\u5316\u68c0\u6d4b\u7684\u65e9\u878d\u5408\uff08FC-EF\uff09\u65f6\uff0c\u628a\u4e24\u671f\u62fc\u6210 12 \u901a\u9053\u8f93\u5165\u5373\u53ef\u3002'
    });
  })();

  // 9. ASPP \u4e0e\u91d1\u5b57\u5854\u6c60\u5316
  (function () {
    var it = [['t', 135, 20, 'DeepLab v3+ \u7684 ASPP', 'sm ink b'], ['r', 16, 100, 50, 64, 1, '\u7279\u5f81\u56fe', { tc: 'sm ink' }]];
    var br = ['1\u00d71 \u5377\u79ef', '3\u00d73 \u00b7 \u7a7a\u6d1e\u7387 6', '3\u00d73 \u00b7 \u7a7a\u6d1e\u7387 12', '3\u00d73 \u00b7 \u7a7a\u6d1e\u7387 18', '\u5168\u56fe\u5e73\u5747\u6c60\u5316'];
    br.forEach(function (b, i) { var y = 36 + i * 38; it.push(['r', 92, y, 112, 28, i === 4 ? 0 : 5, b, { tc: 'xs ink' }]); it.push(['a', 66, 132, 92, y + 14, 'm', { thin: 1 }]); it.push(['a', 204, y + 14, 220, 132, 'm', { thin: 1 }]); });
    it.push(['r', 220, 104, 46, 56, 4, '\u62fc\u63a5\n1\u00d71', { tc: 'xs ink' }]);
    it.push(['t', 418, 20, 'PSPNet \u7684\u91d1\u5b57\u5854\u6c60\u5316', 'sm ink b'], ['r', 296, 100, 50, 64, 1, '\u7279\u5f81\u56fe', { tc: 'sm ink' }]);
    [1, 2, 3, 6].forEach(function (n, i) {
      var y = 36 + i * 50, cs = 36 / n;
      it.push(['g', 384, y, n, n, cs, cs, '3']);
      it.push(['t', 430, y + 18, n + '\u00d7' + n, 'xs ink', 'start']);
      it.push(['a', 346, 132, 382, y + 18, 'm', { thin: 1 }]);
      it.push(['a', 460, y + 18, 482, 132, 'm', { thin: 1 }]);
    });
    it.push(['r', 482, 100, 62, 64, 4, '\u4e0a\u91c7\u6837\n+ \u62fc\u63a5', { tc: 'xs ink' }]);
    it.push(['t', 140, 236, '\u5e76\u8054\u51e0\u79cd\u201c\u89c6\u91ce\u201d\uff0c\u540c\u65f6\u770b\u8fd1\u5904\u548c\u8fdc\u5904', 'xs']);
    it.push(['t', 420, 236, '\u628a\u5168\u56fe\u3001\u534a\u56fe\u2026\u2026\u7684\u5e73\u5747\u7279\u5f81\u62fc\u56de\u6bcf\u4e2a\u50cf\u5143', 'xs']);
    F('aspp_psp', {
      w: 560, h: 246, min: 480, items: it,
      cap: '\u4e24\u79cd\u201c\u770b\u5f97\u66f4\u8fdc\u201d\u7684\u505a\u6cd5\u3002ASPP \u5e76\u8054\u51e0\u4e2a\u7a7a\u6d1e\u7387\u4e0d\u540c\u7684 3\u00d73 \u5377\u79ef\uff08\u6838\u7684\u5143\u7d20\u4e4b\u95f4\u7559\u7a7a\u9699\uff0c\u53c2\u6570\u4e0d\u53d8\u3001\u89c6\u91ce\u53d8\u5927\uff09\uff0c\u518d\u52a0\u4e00\u4e2a\u5168\u56fe\u6c60\u5316\uff1bPSPNet \u628a\u7279\u5f81\u56fe\u5206\u522b\u5e73\u5747\u6c60\u5316\u6210 1\u00d71\u30012\u00d72\u30013\u00d73\u30016\u00d76 \u7684\u683c\u5b50\uff0c\u4e0a\u91c7\u6837\u540e\u548c\u539f\u7279\u5f81\u62fc\u63a5\uff0c\u8ba9\u6bcf\u4e2a\u50cf\u5143\u90fd\u77e5\u9053\u201c\u6574\u5f20\u56fe\u3001\u8fd9\u4e00\u534a\u3001\u8fd9\u4e00\u89d2\u5927\u6982\u662f\u4ec0\u4e48\u573a\u666f\u201d\u3002'
    });
  })();

  // 10. Focal loss \u66f2\u7ebf
  (function () {
    var X = function (p) { return 60 + p * 440; }, Y = function (L) { return 212 - Math.min(L, 5) / 5 * 180; };
    var gs = [[0, 'k', '0\uff08\u666e\u901a\u4ea4\u53c9\u71b5\uff09'], [1, 'b', '1'], [2, 'r', '2'], [5, 'g', '5']];
    var it = [['l', 60, 212, 505, 212, 'm'], ['l', 60, 26, 60, 212, 'm'],
      ['t', 282, 244, '\u771f\u5b9e\u7c7b\u522b\u7684\u9884\u6d4b\u6982\u7387 p_t\uff08\u8d8a\u5927\u8d8a\u201c\u5bb9\u6613\u201d\uff09', 'sm'], ['t', 66, 18, '\u635f\u5931', 'sm', 'start'],
      ['t', X(0.5), 224, '0.5', 'xs mono'], ['t', X(1), 224, '1', 'xs mono'], ['t', 52, Y(1), '1', 'xs mono', 'end'], ['t', 52, Y(3), '3', 'xs mono', 'end'], ['t', 52, Y(5), '5', 'xs mono', 'end']];
    gs.forEach(function (g, i) {
      it.push(['p', pts(function (p) { return -Math.pow(1 - p, g[0]) * Math.log(p); }, 0.01, 1, 99, X, Y), g[1], { head: false, bold: g[0] === 0 ? 0 : 1 }]);
      it.push(['l', 330, 40 + i * 22, 356, 40 + i * 22, g[1], { bold: 1 }]);
      it.push(['t', 362, 40 + i * 22, '\u03b3 = ' + g[2], 'sm ink', 'start']);
    });
    it.push(['l', X(0.6), 140, X(0.6), 212, 'm', { dash: 1, thin: 1 }], ['t', X(0.8), 160, '\u6613\u5206\u7684\u50cf\u5143\uff1a', 'xs', 'middle'], ['t', X(0.8), 176, '\u03b3 \u8d8a\u5927\uff0c\u635f\u5931\u538b\u5f97\u8d8a\u63a5\u8fd1 0', 'xs', 'middle']);
    F('focal', {
      w: 520, h: 252, items: it,
      cap: 'Focal Loss\uff1a\u5728\u4ea4\u53c9\u71b5\u524d\u9762\u4e58 (1 \u2212 p_t)^\u03b3\u3002\u03b3 = 0 \u5c31\u662f\u666e\u901a\u4ea4\u53c9\u71b5\uff1b\u03b3 \u8d8a\u5927\uff0c\u5df2\u7ecf\u5206\u5bf9\u7684\u201c\u5bb9\u6613\u50cf\u5143\u201d\u635f\u5931\u88ab\u538b\u5f97\u8d8a\u72e0\uff0c\u8bad\u7ec3\u7684\u6ce8\u610f\u529b\u5c31\u8f6c\u5411\u96be\u5206\u7684\u5c11\u6570\u50cf\u5143\u3002\u8fd9\u4e9b\u66f2\u7ebf\u7531\u516c\u5f0f \u2212(1 \u2212 p)^\u03b3\u00b7ln p \u76f4\u63a5\u7b97\u51fa\u3002'
    });
  })();

  // 11. \u6df7\u6dc6\u77e9\u9635\u7684\u7ef4\u6069\u56fe
  F('confusion', {
    w: 520, h: 236,
    cap: '\u628a\u201c\u771f\u503c\u662f\u53d8\u5316\u201d\u548c\u201c\u9884\u6d4b\u662f\u53d8\u5316\u201d\u753b\u6210\u4e24\u5757\u533a\u57df\uff1a\u91cd\u53e0\u5904\u662f TP\uff0c\u53ea\u5728\u9884\u6d4b\u91cc\u7684\u662f FP\uff08\u8bef\u62a5\uff09\uff0c\u53ea\u5728\u771f\u503c\u91cc\u7684\u662f FN\uff08\u6f0f\u68c0\uff09\uff0c\u4e24\u5757\u4e4b\u5916\u662f TN\u3002IoU \u5c31\u662f\u91cd\u53e0\u90e8\u5206\u5360\u4e24\u5757\u5e76\u96c6\u7684\u6bd4\u4f8b\uff1bTN \u518d\u591a\u4e5f\u4e0d\u5f71\u54cd P\u3001R\u3001F1\u3001IoU\u2014\u2014\u8fd9\u6b63\u662f\u7c7b\u522b\u4e0d\u5e73\u8861\u65f6\u8981\u7528\u5b83\u4eec\u7684\u539f\u56e0\u3002',
    items: [
      ['r', 20, 20, 480, 182, 0, '', { rx: 10 }], ['t', 64, 42, 'TN\uff08\u5927\u91cf\u6ca1\u53d8\u3001\u4e5f\u6ca1\u62a5\u7684\u50cf\u5143\uff09', 'sm', 'start'],
      ['r', 220, 70, 100, 100, 5, '', { rx: 0 }],
      ['r', 120, 50, 200, 120, 'b', '', { rx: 14 }], ['r', 220, 70, 200, 120, 'r', '', { rx: 14 }],
      ['t', 170, 115, 'FN\n\u6f0f\u68c0', 'ink b'], ['t', 270, 120, 'TP\n\u68c0\u5bf9', 'ink b'], ['t', 370, 135, 'FP\n\u8bef\u62a5', 'ink b'],
      ['t', 150, 64, '\u771f\u503c\uff1a\u53d8\u5316', 'sm w', 'start'], ['t', 404, 182, '\u9884\u6d4b\uff1a\u53d8\u5316', 'sm v', 'end'],
      ['t', 260, 220, 'P = TP/(TP+FP)\u3000R = TP/(TP+FN)\u3000IoU = TP/(TP+FP+FN)\u3000F1 = 2PR/(P+R)', 'sm ink mono']
    ]
  });

  // 12. \u9608\u503c\u8fc1\u79fb
  (function () {
    function dens(m, s, h, x0) { return pts(function (v) { return Math.exp(-0.5 * Math.pow((v - m) / s, 2)); }, 0, 1, 60, function (v) { return x0 + 10 + v * 220; }, function (d) { return 190 - d * h; }); }
    var it = [
      ['t', 140, 20, '\u9a8c\u8bc1\u6d4b\u70b9', 'sm ink b'], ['t', 400, 20, '\u65b0\u6d4b\u70b9\uff08\u6bd4\u5982\u6709\u96fe\uff0c\u6574\u4f53\u201c\u66f4\u50cf\u53d8\u5316\u201d\uff09', 'sm ink b'],
      ['l', 30, 190, 250, 190, 'm'], ['l', 290, 190, 510, 190, 'm'],
      ['p', dens(0.2, 0.08, 120, 20), 'm', { head: false, bold: 1 }], ['p', dens(0.75, 0.1, 40, 20), 'r', { head: false, bold: 1 }],
      ['p', dens(0.45, 0.1, 120, 280), 'm', { head: false, bold: 1 }], ['p', dens(0.85, 0.08, 40, 280), 'r', { head: false, bold: 1 }],
      ['l', 30 + 0.5 * 220, 40, 30 + 0.5 * 220, 196, 'o', { dash: 1, bold: 1 }], ['t', 30 + 0.5 * 220 + 4, 48, '\u9a8c\u8bc1\u96c6\u5b9a\u7684\u9608\u503c 0.5', 'xs o', 'start'],
      ['l', 290 + 0.5 * 220, 40, 290 + 0.5 * 220, 196, 'o', { dash: 1, bold: 1 }], ['t', 290 + 0.5 * 220 - 4, 48, '\u7167\u642c 0.5', 'xs o', 'end'],
      ['l', 290 + 0.68 * 220, 60, 290 + 0.68 * 220, 196, 'g', { dash: 1 }], ['t', 290 + 0.68 * 220 + 4, 68, '\u8fd9\u91cc\u7684\u6700\u4f18\u9608\u503c', 'xs g', 'start'],
      ['t', 34, 60, '\u6ca1\u53d8', 'sm', 'start'], ['t', 195, 130, '\u53d8\u5316', 'sm v'],
      ['t', 296, 60, '\u6ca1\u53d8', 'sm', 'start'], ['t', 477, 130, '\u53d8\u5316', 'sm v'],
      ['t', 140, 212, '\u53d8\u5316\u6982\u7387', 'xs'], ['t', 400, 212, '\u53d8\u5316\u6982\u7387', 'xs'],
      ['t', 400, 232, '\u7167\u642c 0.5\uff1a\u7070\u8272\u66f2\u7ebf\u53f3\u8fb9\u4e00\u5927\u5757\u90fd\u6210\u4e86\u8bef\u62a5', 'xs v']
    ];
    F('thr_shift', {
      w: 540, h: 242, min: 480, items: it,
      cap: '\u9608\u503c\u8fc1\u79fb\u95ee\u9898\uff08\u793a\u610f\uff09\u3002\u7070\u8272\u662f\u201c\u6ca1\u53d8\u201d\u50cf\u5143\u7684\u6982\u7387\u5206\u5e03\uff0c\u7ea2\u8272\u662f\u201c\u53d8\u5316\u201d\u50cf\u5143\u7684\u3002\u6362\u5230\u65b0\u6d4b\u70b9\u540e\u4e24\u6761\u66f2\u7ebf\u6574\u4f53\u53f3\u79fb\uff0c\u4f46\u4ecd\u7136\u5206\u5f97\u5f00\u2014\u2014\u6a21\u578b\u7684\u6392\u5e8f\u80fd\u529b\uff08AP\uff09\u8fd8\u5728\uff1b\u574f\u7684\u662f\u9608\u503c\uff1a\u7167\u642c\u9a8c\u8bc1\u96c6\u7684 0.5\uff0c\u5927\u91cf\u6ca1\u53d8\u50cf\u5143\u8d8a\u8fc7\u9608\u503c\u6210\u4e86\u8bef\u62a5\u3002\u201c\u6d4b\u8bd5\u96c6\u6700\u4f18\u9608\u503c F1\u201d\u91cf\u7684\u5c31\u662f\u201c\u5982\u679c\u9608\u503c\u9009\u5bf9\u4e86\u80fd\u5230\u591a\u5c11\u201d\u3002'
    });
  })();

  // 13. \u6311\u68c0\u67e5\u70b9
  (function () {
    var v = [[0, 0.05], [2, 0.47], [4, 0.20], [8, 0.28], [12, 0.31], [16, 0.36], [20, 0.38], [24, 0.41], [28, 0.40], [32, 0.43], [36, 0.44], [40, 0.43], [44, 0.455], [48, 0.45], [52, 0.46], [56, 0.448], [60, 0.452], [64, 0.458], [68, 0.45], [72, 0.455], [76, 0.452], [80, 0.457]];
    var X = function (t) { return 50 + t / 80 * 450; }, Y = function (f) { return 200 - f / 0.5 * 170; };
    var p = []; v.forEach(function (q) { p.push(+X(q[0]).toFixed(1), +Y(q[1]).toFixed(1)); });
    F('ckpt', {
      w: 520, h: 236,
      cap: '\u9a8c\u8bc1 F1 \u968f\u8bad\u7ec3\u8f6e\u6570\u7684\u53d8\u5316\uff08\u793a\u610f\uff09\u3002\u8bad\u7ec3\u521a\u5f00\u59cb\u65f6\u6a21\u578b\u51e0\u4e4e\u662f\u968f\u673a\u7684\uff0c\u9a8c\u8bc1\u5206\u6570\u5927\u8d77\u5927\u843d\uff0c\u5076\u5c14\u4f1a\u5192\u51fa\u4e00\u4e2a\u201c\u5e78\u8fd0\u7684\u9ad8\u5206\u201d\u3002\u5982\u679c\u6309\u201c\u9a8c\u8bc1\u96c6\u6700\u9ad8\u5206\u201d\u6311\u68c0\u67e5\u70b9\uff0c\u5c31\u53ef\u80fd\u6311\u5230\u7b2c 2 \u8f6e\u8fd9\u4e2a\u51e0\u4e4e\u6ca1\u8bad\u7ec3\u7684\u6a21\u578b\u3002\u89c4\u5b9a\u6700\u5c11\u8bad\u7ec3\u8f6e\u6570\u4e4b\u524d\u7684\u68c0\u67e5\u70b9\u4e0d\u53c2\u4e0e\u6311\u9009\uff0c\u5c31\u80fd\u907f\u5f00\u5b83\u3002',
      items: [
        ['l', 50, 202, 505, 202, 'm'], ['l', 50, 20, 50, 202, 'm'],
        ['t', 278, 224, '\u8bad\u7ec3\u8f6e\u6570', 'sm'], ['t', 56, 14, '\u9a8c\u8bc1 F1', 'sm', 'start'],
        ['raw', '<rect x="50" y="20" width="' + (X(30) - 50) + '" height="182" class="fc" style="opacity:.25"/>'],
        ['l', X(30), 20, X(30), 202, 'o', { dash: 1 }], ['t', X(30) + 4, 196, '\u6700\u5c11\u8bad\u7ec3\u8f6e\u6570\uff0830\uff09', 'xs o', 'start'],
        ['p', p, 'b', { head: false, bold: 1 }],
        ['c', X(2), Y(0.47), 6, 2, ''], ['t', X(2) + 10, Y(0.47) - 6, '\u65e7\u6311\u6cd5\u53ef\u80fd\u9009\u4e2d\uff1a\u51e0\u4e4e\u6ca1\u8bad\u7ec3', 'xs v', 'start'],
        ['c', X(52), Y(0.46), 6, 4, ''], ['t', X(52), Y(0.46) - 16, '\u65b0\u6311\u6cd5\u9009\u4e2d', 'xs g'],
        ['t', 110, 150, '\u8fd9\u4e00\u6bb5\u4e0d\u53c2\u4e0e\u6311\u9009', 'xs']
      ]
    });
  })();

  // 14. \u9879\u76ee\u7684\u5b9e\u9a8c\u8bbe\u8ba1
  (function () {
    var qs = [
      ['Q1', '\u53ea\u7528 S2\uff0c\u5404\u4ee3\u65b9\u6cd5\u8868\u73b0\u5982\u4f55\uff1f', '\u53d8\uff1a\u65b9\u6cd5\u3000\u4e0d\u53d8\uff1a6 \u6ce2\u6bb5\u8f93\u5165\u3001\u8bad\u7ec3\u53e3\u5f84\u3001\u673a\u5668', 1],
      ['Q2', '\u52a0 46 \u4e2a\u8f85\u52a9\u901a\u9053\uff0c\u6bcf\u79cd\u65b9\u6cd5\u5404\u63d0\u5347\u591a\u5c11\uff1f', '\u53d8\uff1a\u6709\u6ca1\u6709\u8f85\u52a9\uff08\u7edf\u4e00\u65e9\u878d\u5408\uff1b\u5927\u6a21\u578b\u8d70\u540e\u6bb5\u65c1\u652f\uff09', 1],
      ['Q3', '\u8f85\u52a9\u8f93\u5165\u600e\u4e48\u63a5\u6700\u597d\uff1f', '\u53d8\uff1a\u63a5\u6cd5\u3000\u4ee3\u8868\uff1aU-Net\u3001Changer\u3001ChangeMamba\u3001OlmoEarth', 5],
      ['Q4', '\u8f85\u52a9\u771f\u7684\u88ab\u7528\u4e0a\u3001\u771f\u7684\u6709\u7528\u5417\uff1f', '\u6d4b\u8bd5\u65f6\u6253\u4e71\u6216\u7f6e\u96f6\u67d0\u7ec4\uff1b\u6700\u597d\u63a5\u6cd5\u4e0a\u9010\u7ec4\u53bb\u6389\u91cd\u8bad', 4]
    ];
    var it = [];
    qs.forEach(function (q, i) {
      var y = 14 + i * 70;
      it.push(['c', 30, y + 28, 18, q[3], q[0], 'sm ink b']);
      it.push(['r', 58, y, 452, 56, q[3], '', { rx: 8 }]);
      it.push(['t', 70, y + 18, q[1], 'ink b', 'start']);
      it.push(['t', 70, y + 40, q[2], 'sm ink', 'start']);
      if (i < 3) it.push(['a', 30, y + 46, 30, y + 80, 'k']);
    });
    it.push(['t', 260, 302, '\u6bcf\u5f20\u8868\uff1a\u7559\u4e00\u6d4b\u70b9 + \u65f6\u95f4\u5916\u63a8 \u00b7 3 \u4e2a\u79cd\u5b50 \u00b7 \u4e09\u4e2a\u6570\uff08\u9a8c\u8bc1\u9608\u503c F1\u3001AP\u3001\u6807 20 \u5bf9 F1\uff09\u00b7 \u540c\u4e00\u53f0\u673a\u5668', 'xs ink']);
    F('exp_design', {
      w: 520, h: 316, items: it,
      cap: '\u9879\u76ee\u53d8\u5316\u68c0\u6d4b\u5b9e\u9a8c\u7684\u56db\u4e2a\u7814\u7a76\u95ee\u9898\u3002\u6bcf\u4e2a\u95ee\u9898\u53ea\u6539\u4e00\u4e2a\u53d8\u91cf\uff0c\u5176\u4f59\u5168\u90e8\u56fa\u5b9a\uff1b\u540e\u4e00\u4e2a\u95ee\u9898\u5efa\u7acb\u5728\u524d\u4e00\u4e2a\u7684\u7ed3\u8bba\u4e0a\u3002\u8fd9\u662f 10 \u6708 7 \u65e5\u91cd\u65b0\u6574\u7406\u540e\u7684\u8bbe\u8ba1\uff0c\u4e4b\u540e\u53ea\u8dd1\u8bbe\u8ba1\u91cc\u7684\u5b9e\u9a8c\u3002'
    });
  })();

  // 15. \u914d\u5bf9\u6bd4\u8f83
  (function () {
    var Y = function (f) { return 196 - (f - 0.25) / 0.30 * 170; };
    var fd = [['\u682a\u6d32\u5357', 0.30, 0.33], ['\u8861\u9633\u5317', 0.50, 0.52], ['\u97f6\u5173\u5357', 0.40, 0.43]];
    var it = [['t', 150, 18, '\u65b9\u6cd5 A', 'sm ink b'], ['t', 330, 18, '\u65b9\u6cd5 B', 'sm ink b'], ['l', 150, 26, 150, 200, 'm', { thin: 1 }], ['l', 330, 26, 330, 200, 'm', { thin: 1 }]];
    [0.3, 0.4, 0.5].forEach(function (f) { it.push(['t', 120, Y(f), f.toFixed(1), 'xs mono', 'end']); });
    fd.forEach(function (d, i) {
      var col = ['b', 'r', 'g'][i];
      it.push(['l', 150, Y(d[1]), 330, Y(d[2]), col, { bold: 1 }]);
      it.push(['c', 150, Y(d[1]), 5, 6, ''], ['c', 330, Y(d[2]), 5, 6, '']);
      it.push(['t', 340, Y(d[2]), d[0] + '\uff1a+' + (d[2] - d[1]).toFixed(2), 'xs ink', 'start']);
    });
    it.push(['t', 455, 80, '\u4e09\u6298\u90fd\u8d62', 'sm g', 'middle'], ['t', 455, 100, '\u5dee\u503c\u5f88\u7a33\u5b9a', 'sm', 'middle'], ['t', 455, 140, '\u4f46\u6d4b\u70b9\u4e4b\u95f4', 'sm', 'middle'], ['t', 455, 160, '\u672c\u8eab\u5dee 0.2', 'sm', 'middle']);
    F('paired', {
      w: 520, h: 210, items: it,
      cap: '\u914d\u5bf9\u6bd4\u8f83\uff08\u793a\u610f\u6570\u5b57\uff09\u3002\u4e09\u4e2a\u6d4b\u70b9\u96be\u5ea6\u4e0d\u540c\uff0cA \u7684\u6210\u7ee9\u5728 0.30\u20130.50 \u4e4b\u95f4\uff0c\u6bd4 A\u3001B \u4e4b\u95f4\u7684\u5dee\u8ddd\u5927\u5f97\u591a\u3002\u5982\u679c\u53ea\u6bd4\u4e24\u7ec4\u5747\u503c\uff080.40 \u5bf9 0.427\uff09\uff0c\u5dee\u8ddd\u4f1a\u6df9\u6ca1\u5728\u6d4b\u70b9\u95f4\u7684\u5dee\u5f02\u91cc\uff1b\u6309\u6d4b\u70b9\u914d\u5bf9\u770b\u5dee\u503c\uff08+0.03\u3001+0.02\u3001+0.03\uff09\uff0c\u624d\u770b\u5f97\u51fa B \u6bcf\u4e00\u6298\u90fd\u66f4\u597d\u3002\u4f46\u53ea\u6709\u4e09\u6298\uff0c\u201c\u4e09\u6298\u90fd\u8d62\u201d\u7eaf\u9760\u8fd0\u6c14\u7684\u6982\u7387\u4e5f\u6709 1/8\u3002'
    });
  })();
})();
