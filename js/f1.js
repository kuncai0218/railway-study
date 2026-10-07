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
})();
