/* \u7b2c 1 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u81ea\u7ed8\u793a\u610f\u56fe\uff0c\u6570\u503c\u4e3a\u793a\u610f\u6216\u6309\u6587\u4e2d\u516c\u5f0f\u8ba1\u7b97\uff09\u3002 */
(function () {
  var F = window.TENM.fig;

  F('rt_path', {
    w: 520, h: 300,
    cap: '\u4ece\u592a\u9633\u5230\u4f20\u611f\u5668\u3002\u536b\u661f\u6536\u5230\u7684\u5149 = \u5730\u9762\u53cd\u5c04\u7684\u5149\uff08\u6211\u4eec\u8981\u7684\u4fe1\u53f7\uff09+ \u5927\u6c14\u76f4\u63a5\u6563\u5c04\u8fdb\u955c\u5934\u7684\u201c\u7a0b\u8f90\u5c04\u201d\uff08\u566a\u58f0\uff09\u3002\u5927\u6c14\u9876\u5c42\u53cd\u5c04\u7387\uff08TOA\uff09\u4e24\u8005\u90fd\u542b\uff1b\u5927\u6c14\u6821\u6b63\u5c31\u662f\u4f30\u8ba1\u5e76\u6263\u6389\u7a0b\u8f90\u5c04\u548c\u5927\u6c14\u8870\u51cf\uff0c\u5f97\u5230\u5730\u8868\u53cd\u5c04\u7387\uff08BOA\uff09\u3002',
    items: [
      ['r', 20, 100, 480, 62, 1, '', { rx: 4, dash: 1 }],
      ['t', 245, 122, '\u5927\u6c14\uff1a\u6563\u5c04\uff08\u53d1\u7070\u3001\u504f\u84dd\uff09', 'sm ink'],
      ['t', 245, 142, '\uff0b \u5438\u6536\uff08\u6c34\u6c7d\u3001\u4e8c\u6c27\u5316\u78b3\uff09', 'sm ink'],
      ['r', 20, 250, 480, 34, 3, '\u5730\u9762\uff1a\u5438\u6536\u4e00\u90e8\u5206\u3001\u53cd\u5c04\u4e00\u90e8\u5206 \u2192 \u53cd\u5c04\u7387 \u03c1', { rx: 4 }],
      ['c', 60, 50, 22, 5, '\u592a\u9633', 'sm ink'],
      ['r', 400, 22, 100, 40, 6, '\u536b\u661f\u4f20\u611f\u5668'],
      ['p', [82, 56, 300, 112, 412, 64], 'b', { dash: 1 }],
      ['t', 215, 40, '\u7a0b\u8f90\u5c04\uff1a\u6ca1\u78b0\u5230\u5730\u9762\uff0c\u88ab\u5927\u6c14\u76f4\u63a5\u6563\u5c04\u8fdb\u955c\u5934', 'sm w'],
      ['a', 74, 70, 200, 248, 'o', { bold: 1 }],
      ['t', 112, 200, '\u592a\u9633\u5165\u5c04', 'sm o', 'end'],
      ['a', 215, 248, 432, 64, 'g', { bold: 1 }],
      ['t', 300, 214, '\u5730\u9762\u53cd\u5c04\uff08\u6211\u4eec\u8981\u7684\u4fe1\u53f7\uff09', 'sm g', 'start']
    ]
  });

  var bands = [['B1', '443', 60, 1], ['B2', '490', 10, 1], ['B3', '560', 10, 1], ['B4', '665', 10, 1], ['B5', '705', 20, 2], ['B6', '740', 20, 2], ['B7', '783', 20, 2], ['B8', '842', 10, 5], ['B8A', '865', 20, 5], ['B9', '945', 60, 0], ['B10', '1375', 60, 0], ['B11', '1610', 20, 3], ['B12', '2190', 20, 3]];
  var six = { B2: 1, B3: 1, B4: 1, B8: 1, B11: 1, B12: 1 };
  var bItems = [
    ['t', 40, 82, '10 m', 'b'], ['t', 40, 134, '20 m', 'b'], ['t', 40, 186, '60 m', 'b'],
    ['l', 78, 44, 212, 44, 'm'], ['t', 145, 30, '\u53ef\u89c1\u5149', 'sm ink'],
    ['l', 214, 44, 314, 44, 'm'], ['t', 264, 30, '\u7ea2\u8fb9', 'sm ink'],
    ['l', 316, 44, 382, 44, 'm'], ['t', 349, 30, '\u8fd1\u7ea2\u5916', 'sm ink'],
    ['l', 384, 44, 450, 44, 'm'], ['t', 417, 30, '\u6c34\u6c7d \u5377\u4e91', 'sm ink'],
    ['l', 452, 44, 518, 44, 'm'], ['t', 485, 30, '\u77ed\u6ce2\u7ea2\u5916', 'sm ink'],
    ['t', 270, 232, '\u7c97\u6846 = \u9879\u76ee 6 \u6ce2\u6bb5\uff08B2 B3 B4 B8 B11 B12\uff09\uff1b\u865a\u6846 B10 \u53ea\u5728 L1C \u91cc', 'sm']
  ];
  bands.forEach(function (b, i) {
    var y = b[2] === 10 ? 60 : b[2] === 20 ? 112 : 164;
    bItems.push(['r', 78 + i * 34, y, 32, 44, b[3], b[0] + '\n' + b[1], { tc: 'sm ink', bold: six[b[0]] ? 1 : 0, dash: b[0] === 'B10' ? 1 : 0, rx: 4 }]);
  });
  F('s2_bands', {
    w: 540, h: 250, items: bItems,
    cap: 'Sentinel-2 \u7684 13 \u4e2a\u6ce2\u6bb5\uff0c\u6309\u6ce2\u957f\u4ece\u5de6\u5230\u53f3\u6392\uff0c\u6309\u5206\u8fa8\u7387\u5206\u4e09\u884c\u3002\u6846\u91cc\u4e0b\u9762\u7684\u6570\u5b57\u662f\u4e2d\u5fc3\u6ce2\u957f\uff08nm\uff09\u3002\u8bb0\u4f4f\u4e24\u4ef6\u4e8b\uff1a10 m \u7684\u53ea\u6709 B2\u3001B3\u3001B4\u3001B8\uff1b\u77ed\u6ce2\u7ea2\u5916 B11\u3001B12 \u53ea\u6709 20 m\u3002'
  });

  function ox(m) { return +(60 + m / 24 * 440).toFixed(1); }
  function oy(r) { return +(210 - (r - 0.2) * 680).toFixed(1); }
  var seas = [0.32, 0.31, 0.29, 0.28, 0.29, 0.31, 0.32, 0.31, 0.29, 0.28, 0.29, 0.31, 0.32];
  var good = [], bad = [];
  seas.forEach(function (r, k) { var m = k * 2; good.push(ox(m), oy(r)); if (m <= 6) bad.push(ox(m), oy(r)); });
  bad.push(ox(6.8), oy(0.282), ox(6.8), oy(0.382));
  seas.forEach(function (r, k) { var m = k * 2; if (m >= 8) bad.push(ox(m), oy(r + 0.1)); });
  F('offset_jump', {
    w: 520, h: 250,
    cap: '\u4e00\u7247\u7a33\u5b9a\u6797\u5730 B8 \u53cd\u5c04\u7387\u7684\u65f6\u95f4\u5e8f\u5217\uff08\u793a\u610f\uff09\u30022022-01-25 \u5904\u7406\u57fa\u7ebf 04.00 \u8d77\uff0cL2A \u6587\u4ef6\u91cc\u7684\u6570\u5b57\u591a\u52a0\u4e86 1000\u3002\u6309 (DN \u2212 1000)/10000 \u6362\u7b97\uff0c\u66f2\u7ebf\u53ea\u6709\u5b63\u8282\u8d77\u4f0f\uff08\u84dd\uff09\uff1b\u5fd8\u4e86\u51cf\uff0c\u5c31\u4f1a\u5728\u90a3\u4e00\u5929\u51fa\u73b0\u4e00\u4e2a\u6574\u4f53\u62ac\u9ad8\u7ea6 0.1 \u7684\u53f0\u9636\uff08\u7ea2\uff09\u2014\u2014\u5168\u666f\u201c\u4f2a\u53d8\u5316\u201d\u3002',
    items: [
      ['l', 55, 215, 505, 215, 'm'], ['l', 55, 36, 55, 215, 'm'],
      ['t', 48, 210, '0.20', 'xs mono', 'end'], ['t', 48, 142, '0.30', 'xs mono', 'end'], ['t', 48, 74, '0.40', 'xs mono', 'end'],
      ['l', 55, 142, 505, 142, 'm', { dash: 1, thin: 1 }], ['l', 55, 74, 505, 74, 'm', { dash: 1, thin: 1 }],
      ['t', 60, 232, '2021-07', 'xs mono', 'middle'], ['t', 280, 232, '2022-07', 'xs mono', 'middle'], ['t', 500, 232, '2023-07', 'xs mono', 'end'],
      ['t', 62, 20, 'B8 \u53cd\u5c04\u7387\uff08\u793a\u610f\uff09', 'sm', 'start'],
      ['l', 184.7, 36, 184.7, 215, 'o', { dash: 1 }],
      ['t', 190, 30, '2022-01-25 \u00b7 \u5904\u7406\u57fa\u7ebf 04.00', 'sm o', 'start'],
      ['p', bad, 'r', { head: false, bold: 1 }],
      ['p', good, 'b', { head: false, bold: 1 }],
      ['t', 330, 48, '\u5fd8\u4e86\u51cf 1000\uff1a\u6574\u4f53\u4eae\u4e86\u7ea6 0.1', 'sm v', 'start'],
      ['t', 300, 178, '\u6b63\u786e\u6362\u7b97\uff1a\u53ea\u6709\u5b63\u8282\u8d77\u4f0f', 'sm w', 'start']
    ]
  });

  function rx(v) { return +(60 + v * 1266.7).toFixed(1); }
  function ny(v) { return +(260 - v * 550).toFixed(1); }
  F('nd_space', {
    w: 520, h: 300,
    cap: '\u7ea2\u5149\u2014\u8fd1\u7ea2\u5916\u5e73\u9762\u3002\u5f52\u4e00\u5316\u5dee\u503c\u6307\u6570\u5728\u8fd9\u4e2a\u5e73\u9762\u4e0a\u7684\u201c\u7b49\u503c\u7ebf\u201d\u662f\u4e00\u6761\u6761\u8fc7\u539f\u70b9\u7684\u5c04\u7ebf\uff1a\u540c\u4e00\u6761\u5c04\u7ebf\u4e0a\u7684\u70b9 NDVI \u76f8\u540c\u3002\u9634\u5f71\u3001\u5149\u7167\u53d8\u5f31\u662f\u201c\u4e58\u4e00\u4e2a\u6570\u201d\uff0c\u70b9\u6cbf\u5c04\u7ebf\u5f80\u539f\u70b9\u6ed1\uff0cNDVI \u4e0d\u53d8\uff1b\u8584\u96fe\u662f\u201c\u52a0\u4e00\u4e2a\u6570\u201d\uff0c\u70b9\u88ab\u63a8\u79bb\u5c04\u7ebf\uff0cNDVI \u5c31\u53d8\u4e86\u3002',
    items: [
      ['l', 60, 260, 500, 260, 'm'], ['l', 60, 30, 60, 260, 'm'],
      ['t', 260, 286, '\u7ea2\u5149 B4 \u53cd\u5c04\u7387', 'sm'], ['t', 66, 22, '\u8fd1\u7ea2\u5916 B8 \u53cd\u5c04\u7387', 'sm', 'start'],
      ['t', rx(0.1), 274, '0.1', 'xs mono'], ['t', rx(0.2), 274, '0.2', 'xs mono'], ['t', rx(0.3), 274, '0.3', 'xs mono'],
      ['t', 52, ny(0.1), '0.1', 'xs mono', 'end'], ['t', 52, ny(0.2), '0.2', 'xs mono', 'end'], ['t', 52, ny(0.3), '0.3', 'xs mono', 'end'], ['t', 52, ny(0.4), '0.4', 'xs mono', 'end'],
      ['l', 60, 260, rx(0.30), ny(0.30), 'm', { dash: 1 }], ['t', rx(0.30) + 4, ny(0.30), 'NDVI = 0', 'xs', 'start'],
      ['l', 60, 260, rx(0.20), ny(0.40), 'm', { dash: 1 }], ['t', rx(0.20) + 4, ny(0.40) + 8, '0.33', 'xs', 'start'],
      ['l', 60, 260, rx(0.10), ny(0.40), 'm', { dash: 1 }], ['t', rx(0.10) + 4, ny(0.40) + 8, '0.6', 'xs', 'start'],
      ['l', 60, 260, rx(0.0444), ny(0.40), 'm', { dash: 1 }], ['t', rx(0.0444) + 4, ny(0.40) + 8, '0.8', 'xs', 'start'],
      ['a', rx(0.03), ny(0.30), rx(0.015), ny(0.15), 'k', { dash: 1 }],
      ['a', rx(0.03), ny(0.30), rx(0.07), ny(0.32), 'o', { bold: 1 }],
      ['c', rx(0.03), ny(0.30), 7, 4, '1', 'xs ink b'],
      ['c', rx(0.015), ny(0.15), 7, 4, '2', 'xs ink b'],
      ['c', rx(0.07), ny(0.32), 7, 5, '3', 'xs ink b'],
      ['c', rx(0.20), ny(0.25), 7, 3, '4', 'xs ink b'],
      ['c', rx(0.03), ny(0.015), 7, 1, '5', 'xs ink b'],
      ['t', 330, 166, '\u2460 \u6797\u5730\uff1a0.82', 'sm ink', 'start'],
      ['t', 330, 186, '\u2461 \u6797\u5730\u5728\u9634\u5f71\u91cc\uff08\u00d70.5\uff09\uff1a0.82', 'sm ink', 'start'],
      ['t', 330, 206, '\u2462 \u6797\u5730\u8499\u8584\u96fe\uff1a0.64', 'sm o', 'start'],
      ['t', 330, 226, '\u2463 \u88f8\u571f\uff1a0.11', 'sm ink', 'start'],
      ['t', 330, 246, '\u2464 \u6c34\uff1a\u22120.33', 'sm ink', 'start']
    ]
  });

  F('cloud_shadow', {
    w: 520, h: 250,
    cap: '\u4e91\u5f71\u4e3a\u4ec0\u4e48\u79bb\u4e91\u90a3\u4e48\u8fdc\uff1a\u9633\u5149\u659c\u7740\u7167\uff0c\u4e91\u5728\u5730\u9762\u7684\u6295\u5f71\u88ab\u63a8\u5230\u80cc\u5bf9\u592a\u9633\u7684\u4e00\u4fa7\uff0c\u8ddd\u79bb d = h\u00b7tan\u03b8s\u3002\u536b\u661f\u51e0\u4e4e\u5782\u76f4\u5f80\u4e0b\u770b\uff0c\u6240\u4ee5\u540c\u4e00\u666f\u91cc\u4e91\u548c\u5b83\u7684\u5f71\u5b50\u662f\u5206\u5f00\u7684\u4e24\u5757\u3002',
    items: [
      ['l', 20, 210, 320, 210, 'm'],
      ['r', 110, 55, 90, 34, 'c', '\u4e91', { rx: 16 }],
      ['p', [66.6, 10, 110, 72, 206.6, 210], 'o', { dash: 1, head: false }],
      ['p', [156.6, 10, 200, 72, 296.6, 210], 'o', { dash: 1, head: false }],
      ['r', 110, 205, 90, 9, 'c', '', { rx: 2 }],
      ['r', 206.6, 205, 90, 9, 7, '', { rx: 2 }],
      ['a', 95, 74, 95, 208, 'k', { both: 1 }],
      ['t', 88, 140, 'h\n\u4e91\u9ad8', 'sm ink', 'end'],
      ['t', 222, 112, '\u03b8s', 'o b'],
      ['a', 155, 230, 251.6, 230, 'k', { both: 1 }],
      ['t', 203, 244, 'd = h \u00b7 tan \u03b8s', 'sm ink mono'],
      ['t', 155, 196, '\u4e91\u7684\u6b63\u4e0b\u65b9', 'xs'], ['t', 252, 196, '\u4e91\u5f71', 'xs'],
      ['t', 340, 70, '\u4f8b\uff1a', 'sm ink b', 'start'],
      ['t', 340, 96, '\u4e91\u9ad8 h = 2 km', 'sm ink', 'start'],
      ['t', 340, 118, '\u592a\u9633\u5929\u9876\u89d2 \u03b8s = 35\u00b0', 'sm ink', 'start'],
      ['t', 340, 140, 'd = 2 \u00d7 tan35\u00b0 \u2248 1.4 km', 'sm ink', 'start'],
      ['t', 340, 162, '\u2248 140 \u4e2a 10 m \u50cf\u5143', 'sm v', 'start'],
      ['t', 340, 190, '\u5f71\u5b50\u843d\u5728\u80cc\u5bf9\u592a\u9633\u7684\u4e00\u4fa7', 'sm', 'start']
    ]
  });

  F('glint', {
    w: 520, h: 285,
    cap: '\u6c34\u9762\u8000\u6591\u7684\u51e0\u4f55\u3002\u5e73\u9759\u6c34\u9762\u50cf\u955c\u5b50\uff0c\u9633\u5149\u6309\u201c\u5165\u5c04\u89d2 = \u53cd\u5c04\u89d2\u201d\u53cd\u5c04\u51fa\u53bb\u3002\u536b\u661f\u7684\u89c6\u7ebf\u548c\u8fd9\u6761\u955c\u9762\u53cd\u5c04\u65b9\u5411\u7684\u5939\u89d2\u53eb\u8000\u6591\u89d2 \u03b8g\uff1a\u03b8g \u8d8a\u5c0f\uff0c\u8d8a\u591a\u9633\u5149\u76f4\u63a5\u8fdb\u955c\u5934\uff0c\u6c34\u9762\u6574\u7247\u53d1\u767d\u3002cos \u03b8g = cos \u03b8s\u00b7cos \u03b8v \u2212 sin \u03b8s\u00b7sin \u03b8v\u00b7cos \u0394\u03c6\uff0c\u0394\u03c6 \u662f\u592a\u9633\u65b9\u4f4d\u4e0e\u536b\u661f\u65b9\u4f4d\u4e4b\u5dee\uff1b\u536b\u661f\u5728\u592a\u9633\u5bf9\u9762\uff08\u0394\u03c6 \u2248 180\u00b0\uff09\u65f6 \u03b8g \u2248 |\u03b8s \u2212 \u03b8v|\u3002',
    items: [
      ['r', 20, 220, 480, 34, 1, '\u5e73\u9759\u6c34\u9762', { rx: 2, tc: 'sm ink' }],
      ['c', 170, 64, 16, 5, '\u592a\u9633', 'xs ink'],
      ['a', 178, 79, 258, 216, 'o', { bold: 1 }],
      ['l', 260, 220, 350, 64, 'o', { dash: 1 }],
      ['t', 356, 70, '\u955c\u9762\u53cd\u5c04\u65b9\u5411', 'sm o', 'start'],
      ['l', 260, 220, 260, 40, 'm', { dash: 1, thin: 1 }],
      ['r', 300, 22, 72, 26, 4, '\u536b\u661f A', { tc: 'sm ink' }],
      ['a', 262, 216, 331, 50, 'g', { bold: 1, both: 0 }],
      ['r', 188, 14, 64, 26, 0, '\u536b\u661f B', { tc: 'sm ink' }],
      ['l', 259, 216, 221, 42, 'm', { dash: 1 }],
      ['t', 30, 150, '\u536b\u661f B \u5728\u592a\u9633\u540c\u4fa7', 'sm ink', 'start'],
      ['t', 30, 170, '\u03b8g = \u03b8s + \u03b8v\uff0c\u5f88\u5927', 'sm', 'start'],
      ['t', 30, 190, '\u6c34\u9762\u6b63\u5e38\uff08\u5f88\u6697\uff09', 'sm', 'start'],
      ['t', 372, 150, '\u536b\u661f A \u5728\u592a\u9633\u5bf9\u9762', 'sm ink', 'start'],
      ['t', 372, 170, '\u03b8g \u2248 |\u03b8s \u2212 \u03b8v|\uff0c\u5f88\u5c0f', 'sm', 'start'],
      ['t', 372, 190, '\u6c34\u9762\u6574\u7247\u53d1\u767d', 'sm v', 'start'],
      ['t', 352, 118, '\u03b8g', 'v b'],
      ['t', 270, 270, '\u8861\u9633\u5317 R075\uff1a\u03b8s 16\u00b0\u201320\u00b0\uff0c\u03b8v \u2248 8\u00b0\uff0c\u0394\u03c6 \u2248 180\u00b0 \u2192 \u03b8g 8\u00b0\u201313\u00b0', 'sm']
    ]
  });

  F('haze_add', {
    w: 520, h: 215,
    cap: '\u8584\u96fe\u662f\u201c\u52a0\u6027\u201d\u7684\uff1a\u5b83\u7ed9\u6bcf\u4e2a\u6ce2\u6bb5\u52a0\u4e0a\u4e00\u4efd\u6563\u5c04\u5149\uff0c\u6ce2\u957f\u8d8a\u77ed\u52a0\u5f97\u8d8a\u591a\uff08\u6570\u503c\u4e3a\u793a\u610f\uff09\u3002\u6240\u4ee5\u6709\u96fe\u65f6\u5f71\u50cf\u53d1\u7070\u3001\u504f\u84dd\uff1b\u77ed\u6ce2\u7ea2\u5916\u51e0\u4e4e\u4e0d\u53d7\u5f71\u54cd\uff0c\u8fd9\u4e5f\u662f\u8ba4\u96fe\u7684\u7ebf\u7d22\u3002',
    items: [
      ['t', 20, 22, '\u8584\u96fe\u7ed9\u5404\u6ce2\u6bb5\u201c\u52a0\u4e0a\u201d\u7684\u53cd\u5c04\u7387\uff08\u793a\u610f\uff09', 'sm ink', 'start'],
      ['l', 60, 180, 500, 180, 'm'],
      ['r', 80, 60, 40, 120, 1, '', { rx: 2 }], ['t', 100, 50, '+0.050', 'xs mono'], ['t', 100, 198, 'B2 \u84dd', 'sm ink'],
      ['r', 150, 96, 40, 84, 1, '', { rx: 2 }], ['t', 170, 86, '+0.035', 'xs mono'], ['t', 170, 198, 'B3 \u7eff', 'sm ink'],
      ['r', 220, 117.6, 40, 62.4, 1, '', { rx: 2 }], ['t', 240, 107, '+0.026', 'xs mono'], ['t', 240, 198, 'B4 \u7ea2', 'sm ink'],
      ['r', 290, 144, 40, 36, 1, '', { rx: 2 }], ['t', 310, 134, '+0.015', 'xs mono'], ['t', 310, 198, 'B8 \u8fd1\u7ea2\u5916', 'sm ink'],
      ['r', 360, 170.4, 40, 9.6, 1, '', { rx: 2 }], ['t', 380, 160, '+0.004', 'xs mono'], ['t', 380, 198, 'B11', 'sm ink'],
      ['r', 430, 175.2, 40, 4.8, 1, '', { rx: 2 }], ['t', 450, 165, '+0.002', 'xs mono'], ['t', 450, 198, 'B12', 'sm ink']
    ]
  });

  F('terrain', {
    w: 520, h: 265,
    cap: '\u5730\u5f62\u9634\u5f71\u3002\u5761\u9762\u5f97\u5230\u7684\u5149\u7167\u6b63\u6bd4\u4e8e cos i = cos \u03b8s\u00b7cos S + sin \u03b8s\u00b7sin S\u00b7cos(\u03c6s \u2212 A)\uff0cS \u662f\u5761\u5ea6\u3001A \u662f\u5761\u5411\u3001\u03b8s \u548c \u03c6s \u662f\u592a\u9633\u5929\u9876\u89d2\u548c\u65b9\u4f4d\u89d2\u3002\u6309\u5317\u7eac 27\u00b0 \u6b63\u5348\u8fd1\u4f3c\uff1a30\u00b0 \u7684\u5317\u5761\u5728\u51ac\u81f3\u53ea\u5f97\u5230\u5e73\u5730\u5149\u7167\u7684\u7ea6 26%\uff0c\u590f\u81f3\u7ea6 83%\uff1b\u51ac\u5b63\u5357\u5761\u53cd\u800c\u6709\u7ea6 147%\u3002\u6240\u4ee5\u51ac\u5b63\u9634\u5761\u5927\u7247\u53d8\u6697\uff0c\u4e0d\u662f\u5730\u9762\u53d8\u4e86\u3002',
    items: [
      ['raw', '<polygon points="60,220 260,90 460,220" class="bx k4"/>'],
      ['raw', '<polygon points="260,90 460,220 260,220" class="fk" style="opacity:.28"/>'],
      ['l', 20, 220, 500, 220, 'm'],
      ['a', 17, 35, 158, 153, 'o'], ['a', 70, 40, 205, 152, 'o'], ['a', 165, 10, 258, 88, 'o'],
      ['t', 20, 22, '\u51ac\u5b63\u6b63\u5348\uff1a\u03b8s \u2248 50\u00b0', 'sm o', 'start'],
      ['a', 325, 10, 330, 133, 'g'], ['a', 375, 10, 380, 166, 'g'],
      ['t', 395, 40, '\u590f\u5b63\u6b63\u5348\uff1a\u03b8s \u2248 4\u00b0', 'sm g', 'start'],
      ['t', 150, 200, '\u5357\u5761\uff08\u5411\u9633\uff09', 'sm ink'], ['t', 372, 200, '\u5317\u5761\uff08\u80cc\u9634\uff09', 'sm ink'],
      ['t', 30, 238, '\u5357', 'sm'], ['t', 490, 238, '\u5317', 'sm'],
      ['t', 260, 252, '30\u00b0 \u5317\u5761\u7684\u5149\u7167 \u00f7 \u5e73\u5730\uff1a\u51ac\u81f3\u7ea6 26%\uff0c\u590f\u81f3\u7ea6 83%', 'sm ink']
    ]
  });

  var row1 = [], row2 = [], row3 = [], t3 = [];
  for (var c = 0; c < 12; c++) {
    row1.push(c >= 4 && c <= 6 ? '3' : '4');
    row2.push(c >= 5 && c <= 7 ? '3' : '4');
    row3.push(c === 4 ? '1' : c === 7 ? '2' : '0');
    t3.push(c === 4 ? '\u2212' : c === 7 ? '+' : null);
  }
  F('misreg', {
    w: 520, h: 240,
    cap: '\u9519\u4f4d\u4e3a\u4ec0\u4e48\u4ea7\u751f\u201c\u6210\u5bf9\u6761\u5e26\u201d\u3002\u4e00\u6761\u4eae\u8272\u9053\u8def\uff08\u8d6d\u8272\uff09\u4e24\u4fa7\u662f\u519c\u7530\uff08\u7eff\u8272\uff09\u3002\u540e\u56fe\u6574\u4f53\u53f3\u79fb\u4e00\u4e2a\u50cf\u5143\uff0c\u76f8\u51cf\u540e\uff1a\u9053\u8def\u5de6\u8fb9\u7f18\u53d8\u6697\uff08\u2212\uff09\u3001\u53f3\u8fb9\u7f18\u53d8\u4eae\uff08+\uff09\uff0c\u4e2d\u95f4\u62b5\u6d88\u4e3a 0\u3002\u771f\u5b9e\u5f71\u50cf\u91cc\u8fd9\u5c31\u662f\u6cbf\u9053\u8def\u3001\u7530\u57c2\u3001\u6c34\u8fb9\u51fa\u73b0\u7684\u4e00\u8d1f\u4e00\u6b63\u7ec6\u6761\u5e26\u3002',
    items: [
      ['t', 100, 45, '\u524d\u56fe t1', 'sm ink', 'end'],
      ['g', 110, 30, 12, 1, 30, 30, row1],
      ['t', 100, 108, '\u540e\u56fe t2\n\u53f3\u79fb 1 \u683c', 'sm ink', 'end'],
      ['g', 110, 93, 12, 1, 30, 30, row2],
      ['t', 100, 171, '\u5dee\u503c\nt2 \u2212 t1', 'sm ink', 'end'],
      ['g', 110, 156, 12, 1, 30, 30, row3, { txt: t3, tc: 'ink b' }],
      ['t', 290, 210, '\u4e00\u8d1f\u4e00\u6b63\uff0c\u6cbf\u8fb9\u7f18\u6210\u5bf9\u51fa\u73b0\uff1b\u4e2d\u95f4\u62b5\u6d88', 'sm v']
    ]
  });

  F('sar_geom', {
    w: 520, h: 262,
    cap: '\u96f7\u8fbe\u4fa7\u89c6\u9020\u6210\u7684\u4e09\u79cd\u5c71\u533a\u7578\u53d8\uff08\u5165\u5c04\u89d2\u7ea6 40\u00b0\uff0c\u793a\u610f\uff09\u3002\u671d\u5411\u96f7\u8fbe\u7684\u7f13\u5761\u88ab\u538b\u77ed\u3001\u53d8\u4eae\uff08\u900f\u89c6\u6536\u7f29\uff09\uff1b\u671d\u5411\u96f7\u8fbe\u7684\u9661\u5761\u6bd4\u5165\u5c04\u89d2\u8fd8\u9661\u65f6\uff0c\u5c71\u9876\u6bd4\u5c71\u811a\u66f4\u65e9\u88ab\u6536\u5230\uff0c\u56fe\u50cf\u91cc\u9876\u811a\u98a0\u5012\uff08\u53e0\u63a9\uff09\uff1b\u80cc\u5411\u96f7\u8fbe\u7684\u9661\u5761\u548c\u5b83\u540e\u9762\u7684\u4e00\u6bb5\u5730\u9762\u5b8c\u5168\u6536\u4e0d\u5230\u56de\u6ce2\uff08\u96f7\u8fbe\u9634\u5f71\uff09\u3002',
    items: [
      ['raw', '<polygon points="60,230 120,190 160,230" class="bx k4"/>'],
      ['raw', '<polygon points="200,230 280,110 340,230" class="bx k4"/>'],
      ['raw', '<polygon points="280,110 340,230 380.8,230" class="fk" style="opacity:.3"/>'],
      ['l', 20, 230, 500, 230, 'm'],
      ['l', 20, 71, 120, 190, 'b', { dash: 1 }],
      ['l', 20, 16, 200, 230, 'b', { dash: 1 }],
      ['l', 196, 10, 280, 110, 'b', { dash: 1 }],
      ['l', 280, 110, 380.8, 230, 'b', { dash: 1, thin: 1 }],
      ['t', 300, 30, '\u96f7\u8fbe\u6ce2\u675f\u4ece\u5de6\u4e0a\u65b9\u659c\u7167\uff08\u4fa7\u89c6\uff09', 'sm w', 'start'],
      ['a', 300, 46, 336, 88, 'b'],
      ['t', 58, 212, '\u900f\u89c6\u6536\u7f29', 'sm o', 'end'],
      ['t', 226, 150, '\u53e0\u63a9', 'sm v', 'end'],
      ['t', 360, 200, '\u96f7\u8fbe\u9634\u5f71', 'sm ink', 'start'],
      ['t', 260, 250, '\u671d\u5411\u96f7\u8fbe\uff1a\u7f13\u5761 \u2192 \u900f\u89c6\u6536\u7f29\uff1b\u9661\u5761 \u2192 \u53e0\u63a9\u3000\u80cc\u5411\u96f7\u8fbe\u7684\u9661\u5761 \u2192 \u9634\u5f71', 'xs']
    ]
  });

  function panel(x, title, note) {
    return [['r', x, 20, 118, 160, 0, '', { rx: 8 }], ['t', x + 59, 36, title, 'sm ink b'], ['t', x + 59, 168, note, 'xs']];
  }
  var sc = [].concat(
    panel(8, '\u5e73\u9759\u6c34\u9762', '\u955c\u9762\u53cd\u5c04 \u2192 \u5f88\u6697'),
    [['r', 14, 120, 106, 14, 1, '', { rx: 2 }], ['a', 20, 52, 64, 118, 'b'], ['a', 66, 118, 112, 54, 'm', { dash: 1 }], ['t', 67, 146, '\u56de\u6ce2\u51e0\u4e4e\u4e3a 0', 'xs']],
    panel(136, '\u7c97\u7cd9\u5730\u8868', '\u6f2b\u6563\u5c04 \u2192 \u4e2d\u7b49'),
    [['p', [142, 126, 152, 118, 162, 128, 172, 116, 182, 126, 192, 117, 202, 127, 212, 118, 222, 126, 248, 126], 's', { head: false }], ['a', 148, 52, 190, 116, 'b'], ['a', 192, 114, 160, 82, 'b'], ['a', 194, 114, 226, 84, 'm', { dash: 1 }], ['a', 194, 114, 196, 76, 'm', { dash: 1 }]],
    panel(264, '\u690d\u88ab', '\u4f53\u6563\u5c04 \u2192 VH \u8f83\u5f3a'),
    [['c', 300, 100, 14, 4, ''], ['c', 326, 92, 16, 4, ''], ['c', 350, 104, 13, 4, ''], ['l', 300, 114, 300, 132, 's'], ['l', 326, 108, 326, 132, 's'], ['l', 350, 117, 350, 132, 's'], ['l', 270, 132, 376, 132, 'm'], ['a', 276, 48, 318, 92, 'b'], ['p', [318, 92, 334, 104, 340, 90, 306, 70], 'b']],
    panel(392, '\u5efa\u7b51', '\u4e8c\u9762\u89d2 \u2192 \u5f88\u4eae'),
    [['r', 452, 70, 22, 62, 0, '', { rx: 1 }], ['l', 398, 132, 504, 132, 'm'], ['a', 404, 60, 440, 130, 'b'], ['p', [440, 130, 452, 108, 412, 74], 'b', { bold: 1 }]]
  );
  F('sar_scatter', {
    w: 520, h: 200, items: sc,
    cap: '\u56db\u79cd\u5178\u578b\u6563\u5c04\u3002\u96f7\u8fbe\u4ece\u5de6\u4e0a\u65b9\u7167\u5c04\uff0c\u80fd\u56de\u5230\u96f7\u8fbe\u7684\u80fd\u91cf\u8d8a\u591a\uff0c\u56fe\u50cf\u8d8a\u4eae\uff1a\u5e73\u9759\u6c34\u9762\u628a\u80fd\u91cf\u955c\u9762\u53cd\u5c04\u8d70\uff08\u5f88\u6697\uff09\uff1b\u7c97\u7cd9\u5730\u8868\u5411\u5404\u65b9\u5411\u6563\u5c04\uff08\u4e2d\u7b49\uff09\uff1b\u690d\u88ab\u51a0\u5c42\u91cc\u591a\u6b21\u6563\u5c04\uff0c\u4f1a\u6539\u53d8\u6781\u5316\u65b9\u5411\uff0c\u6240\u4ee5 VH \u4ea4\u53c9\u6781\u5316\u5bf9\u690d\u88ab\u654f\u611f\uff1b\u5efa\u7b51\u5899\u9762\u548c\u5730\u9762\u7ec4\u6210\u201c\u4e8c\u9762\u89d2\u201d\uff0c\u628a\u80fd\u91cf\u539f\u8def\u9001\u56de\uff08\u5f88\u4eae\uff09\u3002'
  });

  var steps = [
    ['Sentinel-2 L2A\uff0c\u4e09\u4e2a\u6d4b\u70b9', '2021-07 \u81f3 2026-07\uff0c\u5171 505 \u671f', '\u7b2c 1 \u5929'],
    ['\u6362\u7b97\u53cd\u5c04\u7387\uff0c\u7edf\u4e00\u56fa\u5b9a\u7f51\u683c', '2022 \u5e74\u540e\u51cf 1000 \u00b7 256\u00d7256 \u00b7 10 m', '\u7b2c 1 \u5929'],
    ['\u4e91\u63a9\u819c + \u4eba\u5de5\u5224\u8bfb', '\u770b\u4e0d\u6e05\u7684\u5730\u65b9\u6807 255', '\u7b2c 1 \u5929'],
    ['\u7cbe\u914d\u51c6', '\u524d\u56fe\u632a\u5230\u540e\u56fe\u7f51\u683c\uff0c\u8bb0\u5f55\u632a\u52a8\u91cf', '\u7b2c 6 \u5929'],
    ['\u5f71\u50cf\u5bf9 + \u6807\u7b7e', '1 \u53d8\u5316 \u00b7 0 \u6ca1\u53d8 \u00b7 255 \u4e0d\u7528', '\u7b2c 4 \u5929'],
    ['\u4e24\u79cd\u5212\u5206', '\u7559\u4e00\u6d4b\u70b9 \u00b7 \u65f6\u95f4\u5916\u63a8', '\u7b2c 6 \u5929'],
    ['\u6a21\u578b', '6 \u6ce2\u6bb5\u4e3b\u8f93\u5165\uff08+46 \u4e2a\u8f85\u52a9\u901a\u9053\uff09', '\u7b2c 2\u20135\u30017 \u5929'],
    ['\u8bc4\u4ef7', '\u9a8c\u8bc1\u9608\u503c F1 \u00b7 AP \u00b7 \u5c11\u91cf\u6807\u6ce8\u91cd\u5b9a\u9608\u503c', '\u7b2c 2\u30016 \u5929']
  ];
  var fl = [];
  steps.forEach(function (s, i) {
    var y = 10 + i * 66;
    fl.push(['r', 10, y, 282, 52, i === 6 ? 2 : i === 7 ? 4 : 1, s[0] + '\n' + s[1], { tc: 'ink' }]);
    fl.push(['t', 304, y + 26, s[2], 'sm', 'start']);
    if (i < steps.length - 1) fl.push(['a', 151, y + 52, 151, y + 66, 'k']);
  });
  F('proj_flow', {
    w: 420, h: 540, maxw: 470, items: fl,
    cap: '\u9879\u76ee\u6570\u636e\u4ece\u5f71\u50cf\u5230\u8bc4\u4ef7\u7684\u5b8c\u6574\u94fe\u6761\u3002\u53f3\u8fb9\u6807\u7740\u8fd9\u4e00\u6b65\u4e3b\u8981\u5728\u54ea\u4e00\u5929\u8bb2\u3002\u4eca\u5929\u5148\u628a\u524d\u4e09\u6b65\u548c\u201c\u5f71\u50cf\u5bf9 + \u6807\u7b7e\u201d\u7684\u89c4\u77e9\u5f04\u6e05\u695a\u3002'
  });

  var sites = ['\u682a\u6d32\u5357', '\u8861\u9633\u5317', '\u97f6\u5173\u5357'];
  var sp = [['t', 20, 20, '\u7559\u4e00\u6d4b\u70b9\uff1a\u4e24\u4e2a\u6d4b\u70b9\u8bad\u7ec3\uff0c\u7b2c\u4e09\u4e2a\u6d4b\u70b9\u6d4b\u8bd5\uff0c\u8f6e\u4e09\u6b21', 'sm ink b', 'start']];
  for (var f = 0; f < 3; f++) {
    var y = 34 + f * 38;
    sp.push(['t', 60, y + 15, '\u7b2c ' + (f + 1) + ' \u6298', 'sm ink', 'end']);
    for (var s = 0; s < 3; s++) sp.push(['r', 72 + s * 140, y, 134, 30, s === 2 - f ? 2 : 1, sites[s] + (s === 2 - f ? ' \u00b7 \u6d4b\u8bd5' : ' \u00b7 \u8bad\u7ec3'), { tc: 'sm ink' }]);
  }
  sp.push(['t', 20, 162, '\u8bad\u7ec3\u6d4b\u70b9\u91cc\u518d\u6309\u201c\u53d8\u5316\u8fc7\u7a0b\u201d\u5206\u51fa\u9a8c\u8bc1\u96c6\uff1a\u540c\u4e00\u4e2a\u8fc7\u7a0b\u4e0d\u80fd\u4e00\u534a\u8bad\u7ec3\u3001\u4e00\u534a\u9a8c\u8bc1', 'xs', 'start']);
  sp.push(['t', 20, 196, '\u65f6\u95f4\u5916\u63a8\uff1a\u540c\u4e00\u6279\u6d4b\u70b9\uff0c\u6309\u65f6\u95f4\u5207\u5f00', 'sm ink b', 'start']);
  sp.push(['r', 60, 212, 264, 34, 1, '\u8bad\u7ec3\uff1a2024-07 \u4e4b\u524d', { tc: 'sm ink', rx: 3 }]);
  sp.push(['r', 324, 212, 44, 34, 5, '\u9a8c\u8bc1', { tc: 'sm ink', rx: 3 }]);
  sp.push(['r', 368, 212, 132, 34, 2, '\u6d4b\u8bd5\uff1a2025 \u5e74\u8d77', { tc: 'sm ink', rx: 3 }]);
  sp.push(['t', 60, 260, '2021-07', 'xs mono', 'start']);
  sp.push(['t', 346, 260, '2024 \u4e0b\u534a\u5e74', 'xs']);
  sp.push(['t', 500, 260, '2026-07', 'xs mono', 'end']);
  F('splits', {
    w: 520, h: 272, items: sp,
    cap: '\u9879\u76ee\u7684\u4e24\u79cd\u5212\u5206\u3002\u7559\u4e00\u6d4b\u70b9\u56de\u7b54\u201c\u6362\u4e00\u4e2a\u6ca1\u89c1\u8fc7\u7684\u5730\u65b9\u884c\u4e0d\u884c\u201d\uff1b\u65f6\u95f4\u5916\u63a8\u56de\u7b54\u201c\u719f\u6089\u7684\u5730\u65b9\uff0c\u672a\u6765\u7684\u5f71\u50cf\u884c\u4e0d\u884c\u201d\u3002\u4e24\u79cd\u6210\u7ee9\u5dee\u522b\u5f88\u5927\uff0c\u5fc5\u987b\u5206\u5f00\u62a5\u544a\u3002'
  });

  var fr = [], ft = [];
  for (var r = 0; r < 4; r++) for (var cc = 0; cc < 6; cc++) {
    var v = 0;
    if ((r === 1 || r === 2) && cc >= 1 && cc <= 3) v = cc === 2 ? 0.5 : 0.4;
    fr.push(v); ft.push(v ? Math.round(v * 100) + '%' : null);
  }
  F('subpixel', {
    w: 520, h: 300,
    cap: '\u4e00\u5757 26 m \u00d7 10 m \u7684\u65b0\u88f8\u571f\u843d\u5728 10 m \u7f51\u683c\u4e0a\uff08\u7ea2\u8272\u865a\u6846\uff09\u3002\u683c\u5b50\u91cc\u7684\u767e\u5206\u6bd4\u662f\u88f8\u571f\u5360\u8fd9\u4e2a\u50cf\u5143\u9762\u79ef\u7684\u6bd4\u4f8b\u3002\u5b83\u7684\u603b\u9762\u79ef\u76f8\u5f53\u4e8e 2.6 \u4e2a\u50cf\u5143\uff0c\u5374\u6ca1\u6709\u4e00\u4e2a\u50cf\u5143\u8d85\u8fc7 50%\uff1a\u6bcf\u4e2a\u50cf\u5143\u8bb0\u5f55\u7684\u90fd\u662f\u201c\u4e00\u534a\u6797\u5730\u4e00\u534a\u88f8\u571f\u201d\u7684\u6df7\u5408\u5149\u8c31\uff0c\u53d8\u5316\u4fe1\u53f7\u88ab\u7a00\u91ca\u4e86\u4e00\u534a\u4ee5\u4e0a\u3002',
    items: [
      ['g', 30, 30, 6, 4, 56, 56, fr, { ramp: 's', txt: ft, tc: 'ink b' }],
      ['r', 97.2, 114, 145.6, 56, 'r', '', { rx: 0, dash: 1 }],
      ['t', 58, 20, '10 m', 'xs mono'],
      ['l', 30, 24, 86, 24, 'm'],
      ['t', 378, 50, '26 m \u00d7 10 m \u88f8\u571f', 'sm ink b', 'start'],
      ['t', 378, 72, '\u9762\u79ef = 2.6 \u4e2a\u50cf\u5143', 'sm', 'start'],
      ['t', 378, 112, '\u6ca1\u6709\u4e00\u4e2a\u50cf\u5143', 'sm ink', 'start'],
      ['t', 378, 132, '\u8d85\u8fc7 50%', 'sm v', 'start'],
      ['t', 378, 172, '\u6797\u5730\u53d8\u88f8\u571f\u65f6', 'sm', 'start'],
      ['t', 378, 192, 'B11 \u5347\u9ad8\u7ea6 0.17\uff0c', 'sm', 'start'],
      ['t', 378, 212, '\u8fd9\u91cc\u6700\u591a\u53ea\u5347', 'sm', 'start'],
      ['t', 378, 232, '0.17 \u00d7 50% \u2248 0.085', 'sm v', 'start']
    ]
  });

  /* ===== 10-18 \u6539\u7248\u65b0\u589e\uff081.1 \u8282\uff09\uff1a\u88ab\u52a8\u4e0e\u4e3b\u52a8\u3001DN\u2192TOA\u2192BOA\u3001\u53cd\u5c04\u7387\u662f\u201c\u5f97\u5206\u7387\u201d\u3001\u5927\u6c14\u7a97\u53e3\u3001\u5149\u8c31\u66f2\u7ebf ===== */
  F('rs_pa', {
    w: 540, h: 280,
    cap: '\u5149\u5b66\u9065\u611f\u662f\u201c\u88ab\u52a8\u201d\u7684\uff1a\u501f\u592a\u9633\u5149\uff0c\u8bb0\u5f55\u5730\u9762\u53cd\u5c04\u56de\u6765\u7684\u5149\uff0c\u6240\u4ee5\u53ea\u6709\u767d\u5929\u3001\u6ca1\u6709\u4e91\u65f6\u624d\u770b\u5f97\u6e05\u3002\u96f7\u8fbe\u9065\u611f\u662f\u201c\u4e3b\u52a8\u201d\u7684\uff1a\u536b\u661f\u81ea\u5df1\u53d1\u51fa\u5fae\u6ce2\uff0c\u518d\u63a5\u6536\u5730\u9762\u7684\u56de\u6ce2\uff0c\u80fd\u7a7f\u8fc7\u4e91\u5c42\uff0c\u767d\u5929\u9ed1\u591c\u90fd\u80fd\u5de5\u4f5c\uff0c\u4f46\u5b83\u8bb0\u5f55\u7684\u662f\u56de\u6ce2\u7684\u5f3a\u5f31\uff0c\u4e0d\u662f\u989c\u8272\u3002',
    items: [
      ['r', 6, 6, 260, 266, 'n', '', { rx: 10, dash: 1 }],
      ['t', 136, 26, '\u5149\u5b66\u9065\u611f\uff1a\u88ab\u52a8', 'b ink'],
      ['c', 46, 70, 18, 5, '\u592a\u9633', 'xs ink'],
      ['r', 170, 52, 82, 30, 6, '\u5149\u5b66\u536b\u661f', { tc: 'sm ink', rx: 6 }],
      ['a', 58, 86, 108, 196, 'o', { bold: 1 }],
      ['t', 70, 150, '\u592a\u9633\u5149', 'sm o', 'end'],
      ['a', 132, 196, 204, 86, 'g', { bold: 1 }],
      ['t', 184, 150, '\u53cd\u5c04\u5149', 'sm g', 'start'],
      ['r', 20, 198, 232, 30, 3, '\u5730\u9762', { tc: 'sm ink', rx: 4 }],
      ['t', 136, 252, '\u501f\u592a\u9633\u5149\uff1a\u767d\u5929\u3001\u65e0\u4e91\u624d\u770b\u5f97\u6e05', 'xs ink'],

      ['r', 274, 6, 260, 266, 'n', '', { rx: 10, dash: 1 }],
      ['t', 404, 26, '\u96f7\u8fbe\u9065\u611f\uff1a\u4e3b\u52a8', 'b ink'],
      ['r', 362, 52, 84, 30, 1, '\u96f7\u8fbe\u536b\u661f', { tc: 'sm ink', rx: 6 }],
      ['c', 372, 132, 16, 'c'], ['c', 396, 122, 21, 'c'], ['c', 422, 134, 15, 'c'],
      ['t', 452, 112, '\u4e91', 'xs m', 'start'],
      ['a', 384, 86, 360, 196, 'b', { bold: 1 }],
      ['t', 352, 176, '\u53d1\u51fa\u5fae\u6ce2', 'sm w', 'end'],
      ['a', 432, 196, 426, 86, 'b', { bold: 1, dash: 1 }],
      ['t', 442, 172, '\u63a5\u6536\u56de\u6ce2', 'sm w', 'start'],
      ['r', 288, 198, 232, 30, 3, '\u5730\u9762', { tc: 'sm ink', rx: 4 }],
      ['t', 404, 252, '\u81ea\u5e26\u201c\u624b\u7535\u201d\uff1a\u7a7f\u4e91\u3001\u663c\u591c\u90fd\u80fd\u770b\uff0c\u4f46\u6ca1\u6709\u989c\u8272', 'xs ink']
    ]
  });

  F('dn_chain', {
    w: 560, h: 236,
    cap: '\u4ece\u6587\u4ef6\u91cc\u7684\u6574\u6570\u5230\u201c\u5730\u9762\u81ea\u5df1\u7684\u201d\u53cd\u5c04\u7387\uff0c\u8981\u8d70\u4e09\u6b65\u3002\u6bcf\u8d70\u4e00\u6b65\u6263\u6389\u4e00\u79cd\u4e0e\u5730\u9762\u65e0\u5173\u7684\u5f71\u54cd\uff1a\u5b9a\u6807\u6263\u6389\u4f20\u611f\u5668\u81ea\u8eab\u7684\u653e\u5927\u500d\u6570\uff1b\u9664\u4ee5\u592a\u9633\u8f90\u7167\u5ea6\u6263\u6389\u201c\u90a3\u5929\u592a\u9633\u6709\u591a\u4eae\u3001\u591a\u659c\u201d\uff1b\u5927\u6c14\u6821\u6b63\u6263\u6389\u5927\u6c14\u6563\u5c04\u8fdb\u6765\u7684\u5149\uff08\u7a0b\u8f90\u5c04\uff09\u5e76\u8865\u4e0a\u88ab\u5927\u6c14\u5403\u6389\u7684\u5149\u3002Sentinel-2 \u7684 L1C \u4ea7\u54c1\u7ed9\u5230\u7b2c\u4e8c\u6b65\uff08TOA\uff09\uff0cL2A \u4ea7\u54c1\u7ed9\u5230\u7b2c\u4e09\u6b65\uff08BOA\uff09\u3002',
    items: [
      ['t', 350, 22, 'L1C \u4ea7\u54c1', 'sm w'], ['t', 490, 22, 'L2A \u4ea7\u54c1', 'sm g'],
      ['r', 10, 36, 120, 58, 6, 'DN\n\u4f20\u611f\u5668\u8bfb\u6570', { tc: 'sm ink' }],
      ['r', 150, 36, 120, 58, 0, '\u8f90\u4eae\u5ea6 L\n\u6709\u7269\u7406\u5355\u4f4d', { tc: 'sm ink' }],
      ['r', 290, 36, 120, 58, 1, 'TOA \u53cd\u5c04\u7387\n\u5927\u6c14\u9876\u5c42', { tc: 'sm ink' }],
      ['r', 430, 36, 120, 58, 4, 'BOA \u53cd\u5c04\u7387\n\u5730\u8868', { tc: 'sm ink', bold: 1 }],
      ['a', 130, 65, 150, 65, 'k'], ['a', 270, 65, 290, 65, 'k'], ['a', 410, 65, 430, 65, 'k'],
      ['l', 140, 72, 140, 108, 'm', { dash: 1 }], ['l', 280, 72, 280, 108, 'm', { dash: 1 }], ['l', 420, 72, 420, 108, 'm', { dash: 1 }],
      ['t', 140, 128, '\u2460 \u5b9a\u6807\n\u4e58\u589e\u76ca\u3001\u52a0\u504f\u79fb', 'xs ink'],
      ['t', 280, 128, '\u2461 \u9664\u4ee5\u592a\u9633\u8f90\u7167\u5ea6\n\u65e5\u5730\u8ddd\u79bb\u3001cos \u03b8s', 'xs ink'],
      ['t', 420, 128, '\u2462 \u5927\u6c14\u6821\u6b63\n\u6263\u7a0b\u8f90\u5c04\u3001\u8865\u8870\u51cf', 'xs ink'],
      ['t', 70, 196, '\u6ca1\u6709\u5355\u4f4d\n\u4e0d\u80fd\u76f4\u63a5\u6bd4', 'xs m'],
      ['t', 210, 196, '\u968f\u592a\u9633\u9ad8\u5ea6\u3001\n\u65e5\u5730\u8ddd\u79bb\u53d8\u5316', 'xs m'],
      ['t', 350, 196, '\u8fd8\u542b\u7740\u5927\u6c14\uff1a\n\u96fe\u3001\u6c14\u6eb6\u80f6\u3001\u6c34\u6c7d', 'xs m'],
      ['t', 490, 196, '\u5730\u9762\u81ea\u5df1\u7684\u6027\u8d28\n\u53ef\u4ee5\u8de8\u65e5\u671f\u6bd4\u8f83', 'xs g']
    ]
  });

  F('refl_ratio', {
    w: 520, h: 206,
    cap: '\u53cd\u5c04\u7387\u662f\u4e00\u4e2a\u6bd4\u4f8b\uff0c\u4e0d\u662f\u4e00\u4e2a\u7edd\u5bf9\u91cf\u3002\u540c\u4e00\u5757\u5730\uff0c\u6674\u5929\u9633\u5149\u5f3a\uff0c\u5b83\u53cd\u5c04\u56de\u6765\u7684\u5149\u591a\uff1b\u9634\u5929\u6216\u592a\u9633\u659c\u7167\u65f6\u5149\u5f31\uff0c\u53cd\u5c04\u56de\u6765\u7684\u4e5f\u5c11\u3002\u4f46\u201c\u53cd\u5c04 \u00f7 \u5165\u5c04\u201d\u90fd\u662f 0.30\uff0c\u6240\u4ee5\u53cd\u5c04\u7387\u80fd\u62ff\u6765\u6bd4\u8f83\u4e0d\u540c\u65e5\u671f\u7684\u5f71\u50cf\u3002',
    items: [
      ['t', 128, 18, '\u6674\u5929\uff1a\u9633\u5149\u5f3a', 'b ink'], ['t', 392, 18, '\u592a\u9633\u659c\u7167\uff1a\u9633\u5149\u5f31', 'b ink'],
      ['a', 60, 36, 112, 140, 'o', { bold: 1 }], ['t', 72, 92, '\u5165\u5c04 100', 'sm o', 'end'],
      ['a', 136, 140, 188, 36, 'g', { bold: 1 }], ['t', 176, 92, '\u53cd\u5c04 30', 'sm g', 'start'],
      ['r', 20, 142, 216, 24, 3, '', { rx: 4 }],
      ['t', 128, 188, '\u53cd\u5c04\u7387 = 30 \u00f7 100 = 0.30', 'sm ink'],
      ['a', 324, 36, 376, 140, 'o', { thin: 1 }], ['t', 336, 92, '\u5165\u5c04 40', 'sm o', 'end'],
      ['a', 400, 140, 452, 36, 'g', { thin: 1 }], ['t', 440, 92, '\u53cd\u5c04 12', 'sm g', 'start'],
      ['r', 284, 142, 216, 24, 3, '', { rx: 4 }],
      ['t', 392, 188, '\u53cd\u5c04\u7387 = 12 \u00f7 40 = 0.30', 'sm ink']
    ]
  });

  (function () {
    function x(l) { return +(60 + (l - 0.4) / 2.1 * 440).toFixed(1); }
    function y(t) { return +(200 - t * 150).toFixed(1); }
    var T = [[0.40, 0.55], [0.45, 0.62], [0.50, 0.68], [0.55, 0.72], [0.60, 0.75], [0.65, 0.77], [0.70, 0.78], [0.74, 0.80], [0.76, 0.45], [0.78, 0.80], [0.85, 0.83], [0.90, 0.70], [0.94, 0.35], [0.98, 0.75], [1.05, 0.85], [1.10, 0.75], [1.14, 0.40], [1.18, 0.75], [1.25, 0.88], [1.32, 0.60], [1.38, 0.05], [1.45, 0.30], [1.50, 0.80], [1.60, 0.90], [1.70, 0.88], [1.78, 0.70], [1.85, 0.10], [1.95, 0.10], [2.00, 0.50], [2.10, 0.85], [2.20, 0.88], [2.30, 0.84], [2.40, 0.70], [2.50, 0.50]];
    var pts = []; T.forEach(function (p) { pts.push(x(p[0]), y(p[1])); });
    var it = [
      ['l', 60, 200, 500, 200, 'm'], ['l', 60, 200, 60, 46, 'm'],
      ['t', 54, 50, '1', 'xs m', 'end'], ['t', 54, 200, '0', 'xs m', 'end'], ['t', 26, 125, '\u900f\u8fc7\u7387', 'xs m'],
      ['p', pts, 'b', { head: false, bold: 1 }],
      ['t', x(0.76), 38, '\u6c27\u6c14', 'xs o'], ['t', x(0.94), 26, '\u6c34\u6c7d', 'xs o'], ['t', x(1.14), 38, '\u6c34\u6c7d', 'xs o'], ['t', x(1.38), 26, '\u6c34\u6c7d', 'xs o'], ['t', x(1.88), 26, '\u6c34\u6c7d', 'xs o'],
      ['t', x(1.6), 52, '\u5927\u6c14\u7a97\u53e3', 'xs g'], ['t', x(2.2), 52, '\u5927\u6c14\u7a97\u53e3', 'xs g']
    ];
    [0.4, 1.0, 1.5, 2.0, 2.5].forEach(function (l) { it.push(['t', x(l), 212, l.toFixed(1) + (l === 2.5 ? ' \u03bcm' : ''), 'xs m']); });
    [['B2\u2013B4', 0.49, 0.665, 4], ['B8', 0.842, 0.842, 4], ['B9', 0.945, 0.945, 5], ['B10', 1.375, 1.375, 5], ['B11', 1.61, 1.61, 4], ['B12', 2.19, 2.19, 4]].forEach(function (b) {
      var x0 = x(b[1]) - 3, w = x(b[2]) - x(b[1]) + 6;
      it.push(['r', x0, 222, w, 8, b[3], '', { rx: 2 }]);
      it.push(['t', x0 + w / 2, 240, b[0], 'xs ' + (b[3] === 5 ? 'o' : 'g')]);
    });
    F('atm_window', {
      w: 540, h: 252, items: it,
      cap: '\u5927\u6c14\u900f\u8fc7\u7387\u793a\u610f\uff08\u5f62\u72b6\u793a\u610f\uff0c\u4e0d\u662f\u5b9e\u6d4b\u66f2\u7ebf\uff09\u3002\u5f80\u4e0b\u51f9\u7684\u5730\u65b9\u662f\u5438\u6536\u5e26\uff1a\u6c27\u6c14\u5728 0.76 \u03bcm\uff0c\u6c34\u6c7d\u5728 0.94\u30011.14\u30011.38\u30011.88 \u03bcm \u4e00\u5e26\uff1b\u9ad8\u800c\u5e73\u7684\u5730\u65b9\u662f\u201c\u5927\u6c14\u7a97\u53e3\u201d\u3002Sentinel-2 \u7684\u7edd\u5927\u591a\u6570\u6ce2\u6bb5\u653e\u5728\u7a97\u53e3\u91cc\uff08\u7eff\u8272\uff09\uff0cB9 \u548c B10 \u6545\u610f\u653e\u5728\u6c34\u6c7d\u5438\u6536\u5e26\u4e0a\uff08\u6a59\u8272\uff09\uff1aB9 \u7528\u6765\u4f30\u7b97\u7a7a\u6c14\u91cc\u7684\u6c34\u6c7d\uff0cB10 \u7528\u6765\u627e\u9ad8\u7a7a\u5377\u4e91\u3002'
    });
  })();

  (function () {
    function x(l) { return +(80 + (l - 0.4) * 215).toFixed(1); }
    function y(r) { return +(220 - r * 340).toFixed(1); }
    function line(arr) { var p = []; arr.forEach(function (q) { p.push(x(q[0]), y(q[1])); }); return p; }
    var veg = [[0.42, 0.04], [0.49, 0.05], [0.55, 0.10], [0.62, 0.05], [0.67, 0.03], [0.70, 0.08], [0.74, 0.30], [0.78, 0.42], [0.90, 0.45], [1.05, 0.43], [1.25, 0.38], [1.45, 0.20], [1.65, 0.26], [1.85, 0.12], [2.05, 0.16], [2.20, 0.13], [2.35, 0.10]];
    var wat = [[0.42, 0.07], [0.49, 0.07], [0.55, 0.06], [0.62, 0.04], [0.67, 0.03], [0.75, 0.02], [0.85, 0.01], [1.0, 0.005], [1.6, 0.003], [2.35, 0.002]];
    var soil = [[0.42, 0.08], [0.49, 0.10], [0.55, 0.13], [0.67, 0.18], [0.80, 0.23], [1.0, 0.27], [1.3, 0.31], [1.45, 0.28], [1.65, 0.34], [1.9, 0.26], [2.1, 0.31], [2.2, 0.29], [2.35, 0.27]];
    var it = [];
    [0.49, 0.56, 0.665, 0.842, 1.61, 2.19].forEach(function (l) { it.push(['r', x(l) - 4, 50, 8, 170, 0, '', { rx: 0 }]); });
    it.push(['t', x(0.577), 42, 'B2 B3 B4', 'xs m'], ['t', x(0.842), 42, 'B8', 'xs m'], ['t', x(1.61), 42, 'B11', 'xs m'], ['t', x(2.19), 42, 'B12', 'xs m']);
    it.push(['l', 80, 220, 505, 220, 'm'], ['l', 80, 220, 80, 46, 'm'],
      ['t', 74, y(0.5), '0.5', 'xs m', 'end'], ['t', 74, y(0.25), '0.25', 'xs m', 'end'], ['t', 74, 220, '0', 'xs m', 'end'], ['t', 10, 96, '\u53cd\u5c04\u7387', 'xs m', 'start']);
    [0.5, 1.0, 1.5, 2.0].forEach(function (l) { it.push(['t', x(l), 234, l.toFixed(1) + (l === 2.0 ? ' \u03bcm' : ''), 'xs m']); });
    it.push(['p', line(soil), 's', { head: false, bold: 1 }], ['p', line(veg), 'g', { head: false, bold: 1 }], ['p', line(wat), 'b', { head: false, bold: 1 }]);
    it.push(['t', x(1.2), y(0.40) - 12, '\u5065\u5eb7\u690d\u88ab', 'sm g b'], ['t', x(2.25), y(0.31) - 12, '\u88f8\u571f', 'sm s b'], ['t', x(1.35), y(0.0) - 10, '\u6e05\u6c34', 'sm w b']);
    it.push(['l', x(0.50), y(0.25), x(0.55), y(0.11), 'g', { thin: 1 }], ['t', x(0.48), y(0.27), '\u7eff\u5cf0', 'xs g'],
      ['l', x(0.625), y(0.205), x(0.67), y(0.04), 'g', { thin: 1 }], ['t', x(0.615), y(0.22), '\u7ea2\u8c37', 'xs g'],
      ['t', x(0.74) - 6, y(0.30), '\u7ea2\u8fb9', 'xs g', 'end'], ['t', x(0.86), y(0.45) - 12, '\u8fd1\u7ea2\u5916\u9ad8\u539f', 'xs g'],
      ['t', x(1.72), y(0.12) + 14, '\u77ed\u6ce2\u7ea2\u5916\u56de\u843d\uff08\u53f6\u7247\u542b\u6c34\uff09', 'xs g', 'start']);
    F('spec_sig', {
      w: 540, h: 246, items: it,
      cap: '\u4e09\u79cd\u5730\u7269\u7684\u5149\u8c31\u66f2\u7ebf\uff08\u793a\u610f\uff0c\u6570\u503c\u53d6\u5178\u578b\u91cf\u7ea7\uff09\u3002\u690d\u88ab\u7684\u5f62\u72b6\u6700\u6709\u7279\u70b9\uff1a\u7eff\u5cf0\u4e0d\u9ad8\uff0c\u7ea2\u8c37\u5f88\u6df1\uff0c\u7ea2\u8fb9\u9661\u5347\uff0c\u8fd1\u7ea2\u5916\u662f\u4e00\u7247\u9ad8\u539f\uff0c\u77ed\u6ce2\u7ea2\u5916\u968f\u53f6\u7247\u542b\u6c34\u56de\u843d\u3002\u6c34\u8fc7\u4e86\u8fd1\u7ea2\u5916\u51e0\u4e4e\u4e3a 0\u3002\u88f8\u571f\u968f\u6ce2\u957f\u6162\u6162\u5347\u9ad8\uff0c\u77ed\u6ce2\u7ea2\u5916\u6700\u4eae\u3002\u7070\u8272\u7ad6\u6761\u662f\u9879\u76ee\u7528\u7684 6 \u4e2a\u6ce2\u6bb5\u6240\u5728\u7684\u4f4d\u7f6e\u3002'
    });
  })();
  /* figs:d1l2 */
  F('raster_stack', {
    w: 580, h: 248,
    cap: '\u5f71\u50cf\u5728\u7535\u8111\u91cc\u5c31\u662f\u4e00\u53e0\u6570\u5b57\u8868\u3002\u4e00\u4e2a\u6ce2\u6bb5\u662f H \u884c \u00d7 W \u5217\u7684\u8868\uff0c\u6bcf\u683c\u5b58\u4e00\u4e2a\u53cd\u5c04\u7387\uff08\u5de6\u8fb9\u662f\u8fd1\u7ea2\u5916 B8\uff1a\u5de6\u4fa7\u4e24\u5217\u662f\u6c34\uff0c\u53f3\u4fa7\u662f\u6797\u5730\uff09\uff1bC \u4e2a\u6ce2\u6bb5\u53e0\u8d77\u6765\u662f\u4e00\u666f\u5f71\u50cf\uff08C \u00d7 H \u00d7 W\uff09\uff1b\u8bad\u7ec3\u65f6\u4e00\u6b21\u9001\u8fdb B \u666f\uff0c\u5c31\u662f B \u00d7 C \u00d7 H \u00d7 W\u3002',
    items: [
      ['t', 90, 22, '\u4e00\u4e2a\u6ce2\u6bb5 = \u4e00\u5f20\u6570\u5b57\u8868', 'sm ink b'],
      ['g', 20, 40, 5, 5, 28, 28, [0.04, 0.04, 0.42, 0.68, 0.72, 0.04, 0.06, 0.48, 0.7, 0.66, 0.04, 0.24, 0.52, 0.62, 0.7, 0.06, 0.28, 0.54, 0.52, 0.68, 0.04, 0.04, 0.44, 0.5, 0.6],
        { ramp: 'g', txt: ['0.02', '0.02', '0.21', '0.34', '0.36', '0.02', '0.03', '0.24', '0.35', '0.33', '0.02', '0.12', '0.26', '0.31', '0.35', '0.03', '0.14', '0.27', '0.26', '0.34', '0.02', '0.02', '0.22', '0.25', '0.30'], tc: 'xs ink' }],
      ['t', 90, 196, 'H \u884c \u00d7 W \u5217\uff08B8 \u8fd1\u7ea2\u5916\uff09', 'xs m'],
      ['t', 90, 214, '\u6c34\u22480.02\u3000\u6797\u5730\u22480.35', 'xs m'],
      ['a', 168, 110, 222, 110, 'k'],
      ['t', 300, 22, 'C \u4e2a\u6ce2\u6bb5\u53e0\u8d77\u6765', 'sm ink b'],
      ['r', 278, 46, 100, 100, 6, '', { rx: 4 }], ['t', 286, 53, 'B2', 'xs ink', 'start'],
      ['r', 264, 60, 100, 100, 6, '', { rx: 4 }], ['t', 272, 67, 'B3', 'xs ink', 'start'],
      ['r', 250, 74, 100, 100, 6, '', { rx: 4 }], ['t', 258, 81, 'B4', 'xs ink', 'start'],
      ['r', 236, 88, 100, 100, 4, 'B8\n\u8fd1\u7ea2\u5916', { rx: 4, tc: 'sm ink' }],
      ['t', 300, 214, 'C \u00d7 H \u00d7 W\uff1a\u4e00\u666f\u5f71\u50cf', 'xs ink'],
      ['t', 300, 232, '\u9879\u76ee\uff1a12 \u00d7 256 \u00d7 256', 'xs m'],
      ['a', 392, 110, 420, 110, 'k'],
      ['t', 490, 58, '\u4e00\u6279\uff1aB \u666f', 'sm ink b'],
      ['r', 444, 84, 36, 36, 6, '', { rx: 3 }], ['r', 438, 90, 36, 36, 6, '', { rx: 3 }], ['r', 432, 96, 36, 36, 4, '', { rx: 3 }],
      ['r', 500, 84, 36, 36, 6, '', { rx: 3 }], ['r', 494, 90, 36, 36, 6, '', { rx: 3 }], ['r', 488, 96, 36, 36, 4, '', { rx: 3 }],
      ['t', 548, 112, '\u2026', 'sm ink', 'start'],
      ['t', 490, 214, 'B \u00d7 C \u00d7 H \u00d7 W', 'xs ink'],
      ['t', 490, 232, 'PyTorch \u7684\u7ea6\u5b9a', 'xs m']
    ]
  });

  F('mixel', {
    w: 540, h: 244,
    cap: '\u7ebf\u6027\u6df7\u5408\uff1a\u4e00\u4e2a 10 m \u50cf\u5143\u91cc\u4e00\u534a\u662f\u6c34\u3001\u4e00\u534a\u662f\u5e72\u6c99\uff0c\u4f20\u611f\u5668\u53ea\u8bb0\u4e00\u4e2a\u6570\uff0c\u7ea6\u7b49\u4e8e\u4e24\u8005\u8fd1\u7ea2\u5916\u53cd\u5c04\u7387\u6309\u9762\u79ef\u7684\u52a0\u6743\u5e73\u5747\uff080.14\uff09\u3002\u8fd9\u4e2a\u503c\u843d\u5728\u6c34\u548c\u6c99\u4e2d\u95f4\uff0c\u7528\u9608\u503c\u5206\u7c7b\u65f6\u5f52\u54ea\u8fb9\u5168\u770b\u8fd0\u6c14\u3002\u6cb3\u5cb8\u3001\u94c1\u8def\u3001\u5c0f\u6591\u5757\u4e0a\u7684\u50cf\u5143\u5927\u591a\u662f\u8fd9\u6837\u7684\u6df7\u5408\u50cf\u5143\u3002',
    items: [
      ['t', 100, 20, '\u5730\u9762\u4e0a\uff1a\u4e00\u4e2a 10 m \u50cf\u5143', 'sm ink b'],
      ['r', 30, 36, 70, 140, 1, '\u6c34\n\u8fd1\u7ea2\u5916\n0.015', { tc: 'xs ink', rx: 0 }],
      ['r', 100, 36, 70, 140, 3, '\u5e72\u6c99\n\u8fd1\u7ea2\u5916\n0.27', { tc: 'xs ink', rx: 0 }],
      ['r', 30, 36, 140, 140, 'n', '', { rx: 0, bold: 1 }],
      ['a', 184, 106, 252, 106, 'k'], ['t', 218, 84, '\u4f20\u611f\u5668\u53ea\u8bb0\n\u4e00\u4e2a\u6570', 'xs m'],
      ['t', 336, 20, '\u5f71\u50cf\u4e0a\uff1a\u8fd9\u4e2a\u50cf\u5143', 'sm ink b'],
      ['g', 266, 36, 1, 1, 140, 140, [0.5], { ramp: 's', txt: ['0.14'], tc: 'b ink' }],
      ['t', 422, 78, '0.5 \u00d7 0.015', 'sm ink', 'start'],
      ['t', 422, 100, '+ 0.5 \u00d7 0.27', 'sm ink', 'start'],
      ['t', 422, 126, '\u2248 0.14', 'sm ink b', 'start'],
      ['l', 40, 212, 500, 212, 'm'],
      ['t', 34, 212, '\u8fd1\u7ea2\u5916', 'xs m', 'end'],
      ['t', 40, 228, '0', 'xs m'], ['t', 193, 228, '0.1', 'xs m'], ['t', 347, 228, '0.2', 'xs m'], ['t', 500, 228, '0.3', 'xs m'],
      ['c', 63, 212, 6, 1], ['c', 255, 212, 6, 5], ['c', 454, 212, 6, 3],
      ['t', 63, 194, '\u6c34', 'xs w'], ['t', 255, 194, '\u6df7\u5408\u50cf\u5143\uff1a\u65e2\u4e0d\u50cf\u6c34\uff0c\u4e5f\u4e0d\u50cf\u6c99', 'xs o'], ['t', 454, 194, '\u5e72\u6c99', 'xs s']
    ]
  });

  F('utm_zones', {
    w: 560, h: 214,
    cap: 'UTM \u6295\u5f71\u628a\u5730\u7403\u6309\u7ecf\u5ea6\u5207\u6210 60 \u6761 6\u00b0 \u5bbd\u7684\u5e26\uff0c\u6bcf\u6761\u5e26\u5355\u72ec\u5c55\u5e73\uff0c\u5e26\u5185\u7528\u7c73\u505a\u5355\u4f4d\u3001\u53d8\u5f62\u5f88\u5c0f\u3002\u7b2c 49 \u5e26\u8986\u76d6\u4e1c\u7ecf 108\u00b0\u2013114\u00b0\uff08\u4e2d\u592e\u7ecf\u7ebf 111\u00b0E\uff09\uff0c\u682a\u6d32\u3001\u8861\u9633\u3001\u97f6\u5173\u90fd\u5728\u8fd9\u4e00\u5e26\uff0c\u6240\u4ee5\u9879\u76ee\u7edf\u4e00\u7528 EPSG:32649\uff08WGS84\u3001UTM \u7b2c 49 \u5e26\u5317\uff09\u3002\u70b9\u7684\u4f4d\u7f6e\u662f\u793a\u610f\u3002',
    items: [
      ['t', 280, 20, 'UTM\uff1a\u6cbf\u7ecf\u7ebf\u5207\u6210 6\u00b0 \u5bbd\u7684\u5e26\uff0c\u6bcf\u5e26\u5355\u72ec\u5c55\u5e73', 'sm ink b'],
      ['r', 40, 38, 96, 142, 0, '', { rx: 0 }], ['t', 88, 54, '47 \u5e26', 'xs m'],
      ['r', 136, 38, 96, 142, 0, '', { rx: 0 }], ['t', 184, 54, '48 \u5e26', 'xs m'],
      ['r', 232, 38, 96, 142, 1, '', { rx: 0, bold: 1 }], ['t', 280, 54, '49 \u5e26', 'sm w b'],
      ['r', 328, 38, 96, 142, 0, '', { rx: 0 }], ['t', 376, 54, '50 \u5e26', 'xs m'],
      ['r', 424, 38, 96, 142, 0, '', { rx: 0 }], ['t', 472, 54, '51 \u5e26', 'xs m'],
      ['l', 280, 66, 280, 180, 'b', { dash: 1 }], ['t', 272, 158, '\u4e2d\u592e\u7ecf\u7ebf\n111\u00b0E', 'xs w', 'end'],
      ['c', 314, 98, 4, 7], ['c', 306, 109, 4, 7], ['c', 322, 135, 4, 7],
      ['t', 338, 100, '\u682a\u6d32', 'xs ink', 'start'], ['t', 338, 116, '\u8861\u9633', 'xs ink', 'start'], ['t', 338, 136, '\u97f6\u5173', 'xs ink', 'start'],
      ['l', 318, 98, 334, 100, 'm', { thin: 1 }], ['l', 310, 109, 334, 116, 'm', { thin: 1 }], ['l', 326, 135, 334, 136, 'm', { thin: 1 }],
      ['t', 40, 196, '96\u00b0E', 'xs m'], ['t', 136, 196, '102\u00b0', 'xs m'], ['t', 232, 196, '108\u00b0', 'xs m'], ['t', 328, 196, '114\u00b0', 'xs m'], ['t', 424, 196, '120\u00b0', 'xs m'], ['t', 520, 196, '126\u00b0', 'xs m']
    ]
  });

  F('affine_grid', {
    w: 640, h: 280,
    cap: '\u4eff\u5c04\u53d8\u6362\uff1a\u6587\u4ef6\u91cc\u53ea\u5b58\u5de6\u4e0a\u89d2\u5750\u6807 (x0, y0) \u548c\u50cf\u5143\u5927\u5c0f\uff0c\u4efb\u610f\u50cf\u5143\u4e2d\u5fc3\u7684\u5750\u6807\u90fd\u80fd\u7b97\u51fa\u6765\u3002\u5217\u53f7 c \u5f80\u53f3\u6570\u3001x \u5f80\u4e1c\u589e\u5927\uff1b\u884c\u53f7 r \u5f80\u4e0b\u6570\uff0c\u800c\u5317\u5411\u5750\u6807 y \u5f80\u4e0b\u53d8\u5c0f\uff0c\u6240\u4ee5 y \u7684\u516c\u5f0f\u91cc\u662f\u51cf\u53f7\u3002\u6a59\u8272\u683c\u662f\u7b2c 2 \u884c\u7b2c 3 \u5217\uff08\u4ece 0 \u6570\uff09\u3002',
    items: [
      ['t', 64, 22, '\u5de6\u4e0a\u89d2 (x0, y0) = (600000, 3000000)', 'xs ink', 'start'],
      ['c', 70, 60, 4, 2], ['l', 70, 56, 66, 30, 'm', { thin: 1 }],
      ['g', 70, 60, 5, 4, 44, 44, '0'],
      ['r', 202, 148, 44, 44, 5, '', { rx: 0, bold: 1 }], ['c', 224, 170, 3.5, 7],
      ['t', 92, 48, 'c=0', 'xs m'], ['t', 136, 48, 'c=1', 'xs m'], ['t', 180, 48, 'c=2', 'xs m'], ['t', 224, 48, 'c=3', 'xs m'], ['t', 268, 48, 'c=4', 'xs m'],
      ['t', 62, 82, 'r=0', 'xs m', 'end'], ['t', 62, 126, 'r=1', 'xs m', 'end'], ['t', 62, 170, 'r=2', 'xs m', 'end'], ['t', 62, 214, 'r=3', 'xs m', 'end'],
      ['a', 70, 252, 290, 252, 'm'], ['t', 180, 268, 'x \u5411\u4e1c\u589e\u5927\uff08\u5217\u53f7 c \u5f80\u53f3\u6570\uff09', 'xs m'],
      ['a', 306, 236, 306, 60, 'm'], ['t', 316, 140, 'y \u5411\u5317\u589e\u5927', 'xs m', 'start'], ['t', 316, 158, '\uff08\u884c\u53f7 r \u5374\u5f80\u4e0b\u6570\uff09', 'xs m', 'start'],
      ['t', 430, 72, '\u6bcf\u4e2a\u50cf\u5143 10 m \u00d7 10 m', 'sm ink', 'start'],
      ['t', 430, 100, '\u7b2c r \u884c\u3001\u7b2c c \u5217\u50cf\u5143\u4e2d\u5fc3\uff1a', 'sm ink', 'start'],
      ['t', 430, 124, 'x = x0 + 10\u00b7(c + 0.5)', 'sm ink mono', 'start'],
      ['t', 430, 146, 'y = y0 \u2212 10\u00b7(r + 0.5)', 'sm ink mono', 'start'],
      ['t', 430, 184, '\u4f8b\uff1ar = 2\uff0cc = 3\uff08\u6a59\u8272\u683c\uff09', 'sm o', 'start'],
      ['t', 430, 208, 'x = 600000 + 35 = 600035', 'sm ink mono', 'start'],
      ['t', 430, 230, 'y = 3000000 \u2212 25 = 2999975', 'sm ink mono', 'start']
    ]
  });

  F('resample_label', {
    w: 560, h: 214,
    cap: '\u628a\u4e00\u5f20\u7c7b\u522b\u6807\u7b7e\uff080 \u672a\u53d8\u30011 \u53d8\u5316\uff09\u642c\u5230\u548c\u539f\u7f51\u683c\u9519\u5f00\u534a\u4e2a\u50cf\u5143\u7684\u65b0\u7f51\u683c\u3002\u53cc\u7ebf\u6027\u628a\u76f8\u90bb 4 \u4e2a\u50cf\u5143\u6c42\u5e73\u5747\uff0c\u63d2\u51fa 0.25\u30010.5\u30010.75 \u8fd9\u6837\u6839\u672c\u4e0d\u5b58\u5728\u7684\u201c\u7c7b\u522b\u201d\uff1b\u6700\u8fd1\u90bb\u6bcf\u683c\u76f4\u63a5\u53d6\u6700\u8fd1\u7684\u539f\u50cf\u5143\uff0c\u53ea\u4f1a\u51fa\u73b0 0 \u548c 1\u3002\u53cd\u5c04\u7387\u662f\u8fde\u7eed\u91cf\uff0c\u53ef\u4ee5\u7528\u53cc\u7ebf\u6027\uff1b\u7c7b\u522b\u6807\u7b7e\u53ea\u80fd\u7528\u6700\u8fd1\u90bb\uff08\u7f29\u5c0f\u65f6\u7528\u591a\u6570\u7c7b\u66f4\u7a33\uff09\u3002',
    items: [
      ['t', 80, 22, '\u539f\u6807\u7b7e\uff0810 m\uff09', 'sm ink b'],
      ['g', 20, 40, 4, 4, 30, 30, ['0', '0', '2', '2', '0', '0', '2', '2', '0', '0', '0', '2', '0', '0', '0', '0'],
        { txt: ['0', '0', '1', '1', '0', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '0'], tc: 'sm ink' }],
      ['a', 156, 100, 196, 100, 'k'],
      ['t', 266, 22, '\u53cc\u7ebf\u6027\u63d2\u503c', 'sm ink b'],
      ['g', 206, 40, 3, 3, 40, 40, ['0', '5', '2', '0', '5', '5', '0', '0', '5'],
        { txt: ['0', '0.5', '1', '0', '0.25', '0.75', '0', '0', '0.25'], tc: 'sm ink' }],
      ['t', 266, 178, '0.25\u30010.5\u30010.75\uff1a', 'xs o'], ['t', 266, 194, '\u4e0d\u5b58\u5728\u7684\u201c\u7c7b\u522b\u201d', 'xs o'],
      ['t', 440, 22, '\u6700\u8fd1\u90bb', 'sm ink b'],
      ['g', 380, 40, 3, 3, 40, 40, ['0', '0', '2', '0', '0', '2', '0', '0', '0'],
        { txt: ['0', '0', '1', '0', '0', '1', '0', '0', '0'], tc: 'sm ink' }],
      ['t', 440, 178, '\u53ea\u4f1a\u51fa\u73b0 0 \u548c 1', 'xs g'], ['t', 440, 194, '\uff08\u8fb9\u7f18\u6709\u952f\u9f7f\uff09', 'xs m'],
      ['l', 353, 40, 353, 160, 'm', { dash: 1 }]
    ]
  });
  /* end:d1l2 */
  /* figs:d1l3 */
  F('sun_1030', {
    w: 580, h: 262,
    cap: '\u4fef\u89c6\u56fe\uff08\u4e0a\u5317\u4e0b\u5357\uff09\uff1a\u5317\u7eac 26\u00b0 \u5de6\u53f3\u3001\u5f53\u5730\u4e0a\u5348 10:30 \u65f6\u592a\u9633\u7684\u65b9\u5411\u548c\u4e91\u5f71\u7684\u4f4d\u7f6e\uff08\u6309\u592a\u9633\u9ad8\u5ea6\u3001\u65b9\u4f4d\u7b97\u7684\u793a\u610f\uff09\u3002\u51ac\u81f3\u524d\u540e\u592a\u9633\u4f4e\u3001\u5728\u4e1c\u5357\u504f\u5357\uff0c1.5 km \u9ad8\u7684\u4e91\uff0c\u5f71\u5b50\u5411\u897f\u5317\u504f\u5317\u504f\u51fa\u7ea6 2 km\uff1b\u590f\u81f3\u524d\u540e\u592a\u9633\u9ad8\u3001\u63a5\u8fd1\u6b63\u4e1c\uff0c\u5f71\u5b50\u53ea\u5411\u897f\u504f\u51fa\u7ea6 0.6 km\u3002\u6240\u4ee5\u4e91\u5f71\u3001\u5c71\u5f71\u603b\u5728\u76ee\u6807\u7684\u897f\u8fb9\u5230\u897f\u5317\u8fb9\u3002',
    items: [
      ['t', 145, 18, '\u51ac\u81f3\u524d\u540e\uff1a\u592a\u9633\u9ad8\u7ea6 36\u00b0', 'sm ink b'],
      ['r', 30, 30, 230, 190, 0, '', { rx: 8 }],
      ['a', 50, 70, 50, 42, 'm'], ['t', 50, 36, 'N', 'xs ink'],
      ['raw', '<circle cx="117" cy="68" r="12" style="fill:var(--muted);opacity:.5"/><circle cx="129" cy="60" r="15" style="fill:var(--muted);opacity:.5"/><circle cx="142" cy="69" r="11" style="fill:var(--muted);opacity:.5"/>'],
      ['c', 153, 142, 12, 'c'], ['c', 165, 134, 15, 'c'], ['c', 178, 143, 11, 'c'],
      ['t', 102, 46, '\u4e91\u5f71', 'xs ink', 'end'], ['t', 138, 166, '\u4e91\uff08\u9ad8 1.5 km\uff09', 'xs ink', 'end'],
      ['c', 191, 198, 10, 5], ['t', 206, 200, '\u592a\u9633', 'xs o', 'start'],
      ['a', 186, 186, 174, 162, 'o', { dash: 1 }],
      ['a', 158, 124, 136, 82, 'm', { thin: 1 }],
      ['t', 145, 238, '\u5f71\u5b50\u5411\u897f\u5317\u504f\u5317\u504f\u51fa\u7ea6 2 km', 'xs m'],
      ['t', 435, 18, '\u590f\u81f3\u524d\u540e\uff1a\u592a\u9633\u9ad8\u7ea6 69\u00b0', 'sm ink b'],
      ['r', 320, 30, 230, 190, 0, '', { rx: 8 }],
      ['a', 340, 70, 340, 42, 'm'], ['t', 340, 36, 'N', 'xs ink'],
      ['raw', '<circle cx="404" cy="127" r="12" style="fill:var(--muted);opacity:.5"/><circle cx="416" cy="119" r="15" style="fill:var(--muted);opacity:.5"/><circle cx="429" cy="128" r="11" style="fill:var(--muted);opacity:.5"/>'],
      ['c', 426, 128, 12, 'c'], ['c', 438, 120, 15, 'c'], ['c', 451, 129, 11, 'c'],
      ['t', 392, 152, '\u4e91\u5f71\uff08\u51e0\u4e4e\u5728\u4e91\u4e0b\uff09', 'xs ink', 'start'],
      ['c', 532, 122, 10, 5], ['t', 532, 146, '\u592a\u9633', 'xs o'],
      ['a', 520, 122, 470, 123, 'o', { dash: 1 }],
      ['t', 435, 238, '\u5f71\u5b50\u53ea\u5411\u897f\u504f\u51fa\u7ea6 0.6 km', 'xs m']
    ]
  });

  F('rel_orbits', {
    w: 560, h: 236,
    cap: '\u4fa7\u89c6\u793a\u610f\uff1a\u76f8\u90bb\u4e24\u6761\u76f8\u5bf9\u8f68\u9053\u7684\u626b\u63cf\u5e26\u6709\u91cd\u53e0\uff0c\u843d\u5728\u91cd\u53e0\u533a\u7684\u6d4b\u70b9\u4f1a\u88ab\u4e24\u6761\u8f68\u9053\u5404\u62cd\u4e00\u6b21\uff0c\u4e00\u6b21\u4ece\u897f\u4fa7\u659c\u770b\u3001\u4e00\u6b21\u4ece\u4e1c\u4fa7\u659c\u770b\uff08\u5e45\u5bbd\u8fb9\u7f18\u7684\u89c2\u6d4b\u5929\u9876\u89d2\u6700\u5927\u7ea6 10\u00b0\uff0c\u56fe\u4e2d\u89d2\u5ea6\u653e\u5927\u4e86\uff09\u3002\u89c2\u6d4b\u65b9\u5411\u4e0d\u540c\uff0c\u5730\u9762\u4eae\u5ea6\u4f1a\u5dee\u51e0\u4e2a\u767e\u5206\u70b9\uff0c\u6c34\u9762\u8000\u6591\u6761\u4ef6\u4e5f\u4e0d\u540c\u3002',
    items: [
      ['raw', '<polygon points="140,46 12,186 300,186" class="bx k1" style="opacity:.35;stroke:none"/><polygon points="420,46 260,186 548,186" class="bx k5" style="opacity:.35;stroke:none"/>'],
      ['r', 112, 24, 56, 22, 1, '\u536b\u661f', { tc: 'xs ink' }], ['r', 392, 24, 56, 22, 5, '\u536b\u661f', { tc: 'xs ink' }],
      ['t', 140, 12, '\u4e00\u6761\u76f8\u5bf9\u8f68\u9053', 'xs w'], ['t', 420, 12, '\u76f8\u90bb\u4e00\u6761\u76f8\u5bf9\u8f68\u9053', 'xs o'],
      ['a', 140, 46, 280, 184, 'b', { bold: 1 }], ['a', 420, 46, 280, 184, 'o', { bold: 1 }],
      ['t', 196, 106, '\u4ece\u897f\u4fa7\u659c\u770b', 'xs w', 'end'], ['t', 364, 106, '\u4ece\u4e1c\u4fa7\u659c\u770b', 'xs o', 'start'],
      ['l', 10, 188, 550, 188, 'k'],
      ['r', 260, 184, 40, 8, 2, '', { rx: 2 }], ['c', 280, 188, 4, 7],
      ['t', 280, 206, '\u6d4b\u70b9\u843d\u5728\u4e24\u6761\u626b\u63cf\u5e26\u7684\u91cd\u53e0\u533a', 'xs ink'],
      ['t', 280, 224, '\u540c\u4e00\u5757\u5730\u3001\u4e24\u79cd\u89c6\u89d2 \u2192 \u4eae\u5ea6\u548c\u8000\u6591\u6761\u4ef6\u4e0d\u540c', 'xs m'],
      ['t', 70, 206, '\u5e45\u5bbd 290 km', 'xs m'], ['t', 490, 206, '\u5e45\u5bbd 290 km', 'xs m']
    ]
  });

  F('composite_map', {
    w: 600, h: 268,
    cap: '\u4e94\u79cd\u5730\u7269\u5728\u4e09\u79cd\u5408\u6210\u56fe\u91cc\u7684\u989c\u8272\uff08\u7528 1.1 \u8282\u7684\u5178\u578b\u53cd\u5c04\u7387\u7b97\u51fa\u6765\u7684\u793a\u610f\u8272\uff0c\u771f\u5f69\u8272\u6309 0\u20130.2 \u62c9\u4f38\uff0c\u53e6\u4e24\u79cd\u6309 0\u20130.45 \u62c9\u4f38\uff09\u3002\u771f\u5f69\u8272\u91cc\u690d\u88ab\u548c\u6c34\u90fd\u53d1\u6697\uff1b\u5047\u5f69\u8272\u628a\u8fd1\u7ea2\u5916\u653e\u8fdb\u7ea2\u8272\u901a\u9053\uff0c\u690d\u88ab\u53d8\u7ea2\u3001\u6c34\u53d8\u9ed1\uff1b\u77ed\u6ce2\u7ea2\u5916\u5408\u6210\u91cc\u690d\u88ab\u662f\u7eff\u8272\uff0c\u88f8\u571f\u548c\u5efa\u7b51\u662f\u8910\u7070\u8272\uff0c\u4e91\u504f\u9752\u767d\u3002',
    items: [
      ['t', 170, 22, '\u771f\u5f69\u8272', 'sm ink b'], ['t', 170, 40, 'R=B4\u3000G=B3\u3000B=B2', 'xs m mono'],
      ['t', 330, 22, '\u5047\u5f69\u8272\uff08\u5f69\u7ea2\u5916\uff09', 'sm ink b'], ['t', 330, 40, 'R=B8\u3000G=B4\u3000B=B3', 'xs m mono'],
      ['t', 490, 22, '\u77ed\u6ce2\u7ea2\u5916\u5408\u6210', 'sm ink b'], ['t', 490, 40, 'R=B12\u3000G=B8\u3000B=B4', 'xs m mono'],
      ['t', 96, 70, '\u6797\u5730', 'sm ink', 'end'], ['t', 96, 110, '\u6c34', 'sm ink', 'end'], ['t', 96, 150, '\u88f8\u571f', 'sm ink', 'end'], ['t', 96, 190, '\u5efa\u7b51', 'sm ink', 'end'], ['t', 96, 230, '\u4e91', 'sm ink', 'end'],
      ['raw', '<rect x="110" y="54" width="120" height="32" rx="4" style="fill:rgb(51,102,51)"/><text x="170" y="70" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u6697\u7eff</text>' +
        '<rect x="110" y="94" width="120" height="32" rx="4" style="fill:rgb(51,77,89)"/><text x="170" y="110" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u6df1\u84dd\u7070</text>' +
        '<rect x="110" y="134" width="120" height="32" rx="4" style="fill:rgb(230,179,128)"/><text x="170" y="150" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u6d45\u8910</text>' +
        '<rect x="110" y="174" width="120" height="32" rx="4" style="fill:rgb(217,204,191)"/><text x="170" y="190" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u6d45\u7070</text>' +
        '<rect x="110" y="214" width="120" height="32" rx="4" style="fill:rgb(255,255,255);stroke:#bbb"/><text x="170" y="230" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u767d</text>'],
      ['raw', '<rect x="270" y="54" width="120" height="32" rx="4" style="fill:rgb(227,23,45)"/><text x="330" y="70" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u9c9c\u7ea2</text>' +
        '<rect x="270" y="94" width="120" height="32" rx="4" style="fill:rgb(6,23,34)"/><text x="330" y="110" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u8fd1\u9ed1</text>' +
        '<rect x="270" y="134" width="120" height="32" rx="4" style="fill:rgb(142,102,79)"/><text x="330" y="150" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u7070\u8910</text>' +
        '<rect x="270" y="174" width="120" height="32" rx="4" style="fill:rgb(113,96,91)"/><text x="330" y="190" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u6697\u7070</text>' +
        '<rect x="270" y="214" width="120" height="32" rx="4" style="fill:rgb(255,255,255);stroke:#bbb"/><text x="330" y="230" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u767d</text>'],
      ['raw', '<rect x="430" y="54" width="120" height="32" rx="4" style="fill:rgb(57,227,23)"/><text x="490" y="70" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u4eae\u7eff</text>' +
        '<rect x="430" y="94" width="120" height="32" rx="4" style="fill:rgb(2,6,23)"/><text x="490" y="110" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u9ed1</text>' +
        '<rect x="430" y="134" width="120" height="32" rx="4" style="fill:rgb(170,142,102)"/><text x="490" y="150" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u8910</text>' +
        '<rect x="430" y="174" width="120" height="32" rx="4" style="fill:rgb(113,113,96)"/><text x="490" y="190" text-anchor="middle" dominant-baseline="central" style="fill:#fff;font-size:12px">\u7070</text>' +
        '<rect x="430" y="214" width="120" height="32" rx="4" style="fill:rgb(170,255,255);stroke:#bbb"/><text x="490" y="230" text-anchor="middle" dominant-baseline="central" style="fill:#222;font-size:12px">\u9752\u767d</text>']
    ]
  });
  /* end:d1l3 */
  /* figs:d1l4 */
  F('ndvi_bars', {
    w: 560, h: 262,
    cap: '\u4e09\u79cd\u5730\u7269\u5728\u7ea2\u5149\uff08B4\uff09\u548c\u8fd1\u7ea2\u5916\uff08B8\uff09\u4e0a\u7684\u5178\u578b\u53cd\u5c04\u7387\uff0c\u4ee5\u53ca\u7b97\u51fa\u6765\u7684 NDVI\u3002\u6797\u5730\u7ea2\u5149\u88ab\u53f6\u7eff\u7d20\u5403\u6389\u3001\u8fd1\u7ea2\u5916\u88ab\u53f6\u7247\u5f39\u56de\uff0c\u4e24\u8005\u5dee\u5f97\u6700\u591a\uff0cNDVI \u63a5\u8fd1 0.75\uff1b\u88f8\u571f\u4e24\u4e2a\u6ce2\u6bb5\u5dee\u4e0d\u591a\uff0cNDVI \u5f88\u5c0f\uff1b\u6c34\u7684\u8fd1\u7ea2\u5916\u6bd4\u7ea2\u5149\u8fd8\u6697\uff0cNDVI \u4e3a\u8d1f\u3002',
    items: [
      ['l', 40, 200, 540, 200, 'm'], ['l', 40, 200, 40, 50, 'm'],
      ['t', 34, 200, '0', 'xs m', 'end'], ['t', 34, 140, '0.15', 'xs m', 'end'], ['t', 34, 80, '0.30', 'xs m', 'end'],
      ['l', 40, 140, 540, 140, 'm', { dash: 1, thin: 1 }], ['l', 40, 80, 540, 80, 'm', { dash: 1, thin: 1 }],
      ['r', 400, 20, 14, 12, 2, '', { rx: 2 }], ['t', 420, 26, '\u7ea2 B4', 'xs ink', 'start'],
      ['r', 470, 20, 14, 12, 5, '', { rx: 2 }], ['t', 490, 26, '\u8fd1\u7ea2\u5916 B8', 'xs ink', 'start'],
      ['r', 84, 180, 28, 20, 2, '', { rx: 2 }], ['r', 116, 60, 28, 140, 5, '', { rx: 2 }],
      ['t', 98, 172, '0.05', 'xs ink'], ['t', 130, 52, '0.35', 'xs ink'],
      ['t', 114, 218, '\u6797\u5730', 'sm ink b'], ['t', 114, 240, 'NDVI = 0.30 / 0.40 = 0.75', 'xs g'],
      ['r', 254, 128, 28, 72, 2, '', { rx: 2 }], ['r', 286, 100, 28, 100, 5, '', { rx: 2 }],
      ['t', 268, 120, '0.18', 'xs ink'], ['t', 300, 92, '0.25', 'xs ink'],
      ['t', 284, 218, '\u88f8\u571f', 'sm ink b'], ['t', 284, 240, 'NDVI = 0.07 / 0.43 \u2248 0.16', 'xs s'],
      ['r', 424, 184, 28, 16, 2, '', { rx: 2 }], ['r', 456, 196, 28, 4, 5, '', { rx: 2 }],
      ['t', 438, 176, '0.04', 'xs ink'], ['t', 470, 188, '0.01', 'xs ink'],
      ['t', 454, 218, '\u6c34', 'sm ink b'], ['t', 454, 240, 'NDVI = \u22120.03 / 0.05 = \u22120.6', 'xs w']
    ]
  });

  F('water_index_line', {
    w: 580, h: 214,
    cap: '\u628a\u5efa\u7b51\u3001\u6c34\u3001\u690d\u88ab\u4e09\u79cd\u50cf\u5143\u7684 NDWI \u548c MNDWI \u753b\u5728 \u22121 \u5230 1 \u7684\u6570\u8f74\u4e0a\uff08\u5178\u578b\u53cd\u5c04\u7387\u7b97\u7684\u793a\u610f\u503c\uff09\u3002\u4ece NDWI \u6362\u6210 MNDWI\uff0c\u5efa\u7b51\u4ece \u22120.16 \u88ab\u538b\u5230 \u22120.26\uff0c\u6c34\u4ece 0.71 \u62ac\u5230 0.85\uff0c\u4e24\u8005\u79bb\u9608\u503c 0 \u90fd\u66f4\u8fdc\u4e86\uff0c\u6240\u4ee5 MNDWI \u66f4\u4e0d\u5bb9\u6613\u628a\u57ce\u9547\u8bef\u5224\u6210\u6c34\u3002',
    items: [
      ['t', 104, 64, 'NDWI', 'sm ink b', 'end'], ['t', 104, 82, '\u7eff vs \u8fd1\u7ea2\u5916', 'xs m', 'end'],
      ['t', 104, 138, 'MNDWI', 'sm ink b', 'end'], ['t', 104, 156, '\u7eff vs \u77ed\u6ce2\u7ea2\u5916', 'xs m', 'end'],
      ['l', 120, 72, 540, 72, 'm'], ['l', 120, 146, 540, 146, 'm'],
      ['l', 330, 36, 330, 168, 'o', { dash: 1 }], ['t', 330, 26, '\u5e38\u7528\u9608\u503c 0', 'xs o'],
      ['c', 189, 72, 6, 4], ['t', 189, 54, '\u690d\u88ab \u22120.67', 'xs g'],
      ['c', 296, 72, 6, 0], ['t', 290, 54, '\u5efa\u7b51 \u22120.16', 'xs ink'],
      ['c', 479, 72, 6, 1], ['t', 479, 54, '\u6c34 0.71', 'xs w'],
      ['c', 240, 146, 6, 4], ['t', 234, 128, '\u690d\u88ab \u22120.43', 'xs g'],
      ['c', 275, 146, 6, 0], ['t', 278, 166, '\u5efa\u7b51 \u22120.26', 'xs ink'],
      ['c', 509, 146, 6, 1], ['t', 509, 128, '\u6c34 0.85', 'xs w'],
      ['a', 294, 80, 277, 138, 'm', { thin: 1, dash: 1 }], ['a', 481, 80, 507, 138, 'm', { thin: 1, dash: 1 }],
      ['t', 120, 196, '\u22121', 'xs m'], ['t', 225, 196, '\u22120.5', 'xs m'], ['t', 330, 196, '0', 'xs m'], ['t', 435, 196, '0.5', 'xs m'], ['t', 540, 196, '1', 'xs m']
    ]
  });
  /* end:d1l4 */
})();
