/* \u7b2c 6 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u6309\u8bba\u6587\u6587\u5b57\u63cf\u8ff0\u548c\u516c\u5f00\u7ed3\u6784\u81ea\u7ed8\u7684\u793a\u610f\u56fe\uff1b\u6807\u201c\u793a\u610f\u201d\u7684\u6570\u503c\u662f\u4e3a\u8bb2\u89e3\u6784\u9020\u7684\uff09\u3002 */
(function () {
  var F = window.TENM.fig;
  function rawRect(x, y, w, h, cls, op, rx) { return ['raw', '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + (rx ? ' rx="' + rx + '"' : '') + ' class="' + cls + '" style="fill-opacity:' + (op == null ? 0.55 : op) + '"/>']; }
  function erf(x) { var s = x < 0 ? -1 : 1; x = Math.abs(x); var t = 1 / (1 + 0.3275911 * x); var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
  function Phi(x) { return 0.5 * (1 + erf(x / Math.SQRT2)); }

  // 1. AnyChange
  F('anychange', {
    w: 540, h: 228, min: 480,
    cap: 'AnyChange \u7684\u96f6\u6837\u672c\u6d41\u7a0b\uff08\u6309 Zheng \u7b49 2024 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u4e0d\u8bad\u7ec3\u3001\u4e0d\u6539 SAM\uff1a\u4e24\u671f\u5404\u81ea\u81ea\u52a8\u51fa\u63a9\u819c\u548c\u56fe\u50cf\u5d4c\u5165\uff1b\u540c\u4e00\u4e2a\u63a9\u819c\u5206\u522b\u5728\u4e24\u671f\u5d4c\u5165\u4e0a\u53d6\u5e73\u5747\uff0c\u6bd4\u8f83\u4e24\u4e2a\u5411\u91cf\u7684\u5939\u89d2\uff1bt \u671f\u548c t+1 \u671f\u7684\u63a9\u819c\u5404\u67e5\u4e00\u904d\uff08\u53cc\u5411\uff09\u3002\u70b9\u67e5\u8be2\u8ba9\u7528\u6237\u53ea\u770b\u548c\u67d0\u7c7b\u5730\u7269\u6709\u5173\u7684\u53d8\u5316\u3002',
    items: [
      ['r', 8, 34, 44, 30, 3, 't', { tc: 'sm ink' }], ['r', 8, 146, 44, 30, 3, 't+1', { tc: 'sm ink' }],
      ['a', 52, 49, 66, 49, 'k'], ['a', 52, 161, 66, 161, 'k'],
      ['r', 66, 26, 82, 46, 0, '\u51bb\u7ed3\u7684 SAM\n\u81ea\u52a8\u51fa\u63a9\u819c', { tc: 'xs ink', dash: 1 }], ['r', 66, 138, 82, 46, 0, '\u51bb\u7ed3\u7684 SAM\n\u81ea\u52a8\u51fa\u63a9\u819c', { tc: 'xs ink', dash: 1 }],
      ['a', 148, 38, 162, 31, 'k'], ['a', 148, 60, 162, 67, 'k'], ['a', 148, 150, 162, 143, 'k'], ['a', 148, 172, 162, 179, 'k'],
      ['r', 162, 20, 62, 22, 1, '\u63a9\u819c M\u209c', { tc: 'xs ink' }], ['r', 162, 56, 62, 22, 1, '\u5d4c\u5165 z\u209c', { tc: 'xs ink' }],
      ['r', 162, 132, 62, 22, 3, '\u63a9\u819c M\u209c\u208a\u2081', { tc: 'xs ink' }], ['r', 162, 168, 62, 22, 3, '\u5d4c\u5165 z\u209c\u208a\u2081', { tc: 'xs ink' }],
      ['a', 224, 31, 244, 76, 'k'], ['a', 224, 67, 244, 88, 'k'], ['a', 224, 143, 244, 112, 'k'], ['a', 224, 179, 244, 124, 'k'],
      ['r', 244, 70, 130, 60, 5, '\u540c\u4e00\u4e2a\u63a9\u819c\n\u5728\u4e24\u671f\u5d4c\u5165\u4e0a\u5404\u53d6\u5e73\u5747\n\u2192 \u4e24\u4e2a\u5411\u91cf', { tc: 'xs ink' }],
      ['a', 374, 100, 388, 100, 'k'],
      ['r', 388, 70, 76, 60, 2, '\u8d1f\u4f59\u5f26\u76f8\u4f3c\u5ea6\n\u5939\u89d2\u8d8a\u5927\n\u8d8a\u50cf\u53d8\u5316', { tc: 'xs ink' }],
      ['a', 464, 100, 476, 100, 'k'], ['r', 476, 80, 58, 40, 4, '\u53d8\u5316\n\u63a9\u819c', { tc: 'xs ink' }],
      ['t', 318, 152, '\u53cc\u5411\uff1aM\u209c \u67e5\u4e00\u904d\u3001M\u209c\u208a\u2081 \u518d\u67e5\u4e00\u904d', 'xs ink'],
      ['r', 232, 176, 236, 40, 6, '\u70b9\u67e5\u8be2\uff1a\u70b9\u4e00\u4e0b\u67d0\u4e2a\u5730\u7269\uff0c\u53d6\u5b83\u7684\u5e73\u5747\u5d4c\u5165\n\u2192 \u53ea\u4fdd\u7559\u548c\u5b83\u76f8\u4f3c\u7684\u53d8\u5316', { tc: 'xs ink', dash: 1 }],
      ['p', [468, 196, 505, 196, 505, 120], 'g', { dash: 1 }]
    ]
  });

  // 2. Metric-CD \u9010\u5bf9\u4f18\u5316
  F('metric_cd', {
    w: 540, h: 214, min: 480,
    cap: 'Metric-CD \u7684\u201c\u9010\u5bf9\u4f18\u5316\u201d\uff08\u6309\u8bba\u6587\u56fe 3 \u7684\u6587\u5b57\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u6ca1\u6709\u8bad\u7ec3\u96c6\uff1a\u5bf9\u6bcf\u4e00\u5bf9\u5f71\u50cf\uff0c\u4ece\u968f\u673a\u521d\u59cb\u5316\u7684\u53d8\u5316\u6982\u7387\u7f51\u7edc\u51fa\u53d1\uff0c\u7528\u51e0\u9879\u65e0\u76d1\u7763\u635f\u5931\u8fed\u4ee3 80 \u6b65\uff0c\u4fdd\u5b58\u8fd9\u4e00\u5bf9\u7684\u53d8\u5316\u6982\u7387\u56fe\u540e\u4e22\u6389\u7f51\u7edc\u3002',
    items: [
      ['r', 8, 30, 48, 30, 3, 't1', { tc: 'sm ink' }], ['r', 8, 84, 48, 30, 3, 't2', { tc: 'sm ink' }],
      ['a', 56, 45, 72, 45, 'k'], ['r', 72, 30, 72, 30, 0, '\u989c\u8272\u6821\u6b63 PCC', { tc: 'xs ink' }],
      ['a', 144, 45, 160, 60, 'k'], ['a', 56, 99, 160, 80, 'k'],
      ['r', 160, 50, 82, 40, 5, '\u9a6c\u6c0f\u8ddd\u79bb\n\u5dee\u5f02\u56fe', { tc: 'xs ink' }],
      ['a', 242, 70, 258, 70, 'k'],
      ['r', 258, 44, 88, 52, 2, '\u53d8\u5316\u6982\u7387\u7f51\u7edc\n\u968f\u673a\u521d\u59cb\u5316\n32 \u4e2a\u6b8b\u5dee\u5757', { tc: 'xs ink' }],
      ['a', 346, 70, 362, 70, 'k'], ['r', 362, 52, 62, 36, 4, 'Pc\n\u53d8\u5316\u6982\u7387', { tc: 'xs ink' }],
      ['a', 424, 70, 440, 70, 'k'],
      ['r', 440, 22, 94, 92, 6, '\u65e0\u76d1\u7763\u635f\u5931\n\u5f71\u50cf\u57df\u76f8\u4f3c-\u76f8\u5f02\nVGG \u7279\u5f81\u57df\n\u989c\u8272\u6270\u52a8\u4e00\u81f4\n\u7a00\u758f\u60e9\u7f5a', { tc: 'xs ink' }],
      ['p', [487, 114, 487, 150, 302, 150, 302, 96], 'o', { dash: 1 }],
      ['t', 394, 164, 'Adam \u8fed\u4ee3 80 \u6b65\uff08\u53d8\u5316\u7f51\u7edc\u548c VGG \u7279\u5f81\u4e00\u8d77\u66f4\u65b0\uff09', 'xs o'],
      ['t', 270, 196, '\u6bcf\u4e00\u5bf9\u90fd\u4ece\u5934\u4f18\u5316\u4e00\u6b21\uff1b\u7ed3\u675f\u540e\u53ea\u4fdd\u5b58 Pc\uff0c\u7f51\u7edc\u53c2\u6570\u4e22\u6389\u2014\u2014\u6ca1\u6709\u201c\u8bad\u7ec3\u597d\u7684\u6a21\u578b\u201d', 'xs ink']
    ]
  });

  // 3. S2C \u7684\u5bf9\u6bd4\u8303\u5f0f
  F('s2c_ctc', {
    w: 540, h: 206, min: 480,
    cap: 'S2C \u7684\u4e24\u79cd\u5bf9\u6bd4\u5b66\u4e60\uff08\u6309\u8bba\u6587\u56fe 3 \u7684\u6587\u5b57\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u65f6\u5e8f\u5bf9\u6bd4\u628a\u201c\u53e6\u4e00\u671f\u201d\u5f53\u8d1f\u6837\u672c\uff0c\u663e\u5f0f\u5b66\u201c\u65f6\u95f4\u4e0a\u7684\u5dee\u5f02\u201d\uff1b\u7a7a\u95f4\u5bf9\u6bd4\u5728\u201c\u540c\u4e00\u533a\u57df\u62c9\u8fd1\u3001\u4e0d\u540c\u533a\u57df\u63a8\u8fdc\u201d\u4e4b\u4e0a\u53e0\u52a0\u968f\u673a\u6270\u52a8\uff0c\u5b66\u6297\u566a\u7684\u4e00\u81f4\u6027\uff1b\u518d\u52a0\u7f51\u683c\u7a00\u758f\u6b63\u5219\u538b\u6389\u96f6\u788e\u7684\u4f2a\u53d8\u5316\u3002\u9aa8\u5e72\u662f\u51bb\u7ed3\u7684\u89c6\u89c9\u5927\u6a21\u578b + LoRA\u3002',
    items: [
      ['t', 135, 14, '\u65f6\u5e8f\u5bf9\u6bd4\uff08CTC\uff09', 'sm ink b'], ['t', 405, 14, '\u7a7a\u95f4\u5bf9\u6bd4\uff08CSC\uff09', 'sm ink b'],
      ['r', 96, 36, 78, 40, 1, '\u951a\uff1at1 \u539f\u56fe', { tc: 'xs ink' }],
      ['r', 14, 112, 78, 40, 1, '\u6b63\uff1at1 \u589e\u5f3a', { tc: 'xs ink' }], ['r', 178, 112, 78, 40, 3, '\u8d1f\uff1at2', { tc: 'xs ink' }],
      ['a', 120, 76, 66, 112, 'g', { both: 1 }], ['t', 76, 90, '\u62c9\u8fd1', 'xs g'],
      ['a', 150, 76, 204, 112, 'r', { both: 1, dash: 1 }], ['t', 196, 90, '\u63a8\u8fdc', 'xs v'],
      ['t', 135, 170, '\u4e09\u5143\u7ec4\u635f\u5931\uff1a\u76f4\u63a5\u5b66\u201c\u8fd9\u4e00\u671f\u548c\u53e6\u4e00\u671f\u54ea\u91cc\u4e0d\u540c\u201d', 'xs ink'],
      ['l', 270, 24, 270, 180, 'm', { dash: 1, thin: 1 }],
      ['r', 300, 40, 60, 36, 1, '\u533a\u57df A\n\uff08t1\uff09', { tc: 'xs ink' }], ['r', 300, 112, 60, 36, 3, '\u533a\u57df A\n\uff08t2 + \u6270\u52a8\uff09', { tc: 'xs ink' }],
      ['r', 452, 76, 60, 36, 3, '\u533a\u57df B\n\uff08t2\uff09', { tc: 'xs ink' }],
      ['a', 330, 76, 330, 112, 'g', { both: 1 }], ['t', 344, 94, '\u62c9\u8fd1', 'xs g', 'start'],
      ['a', 360, 70, 452, 90, 'r', { both: 1, dash: 1 }], ['t', 410, 66, '\u63a8\u8fdc', 'xs v'],
      ['t', 405, 170, '\u9010\u50cf\u5143 InfoNCE\uff1a\u540c\u4e00\u533a\u57df\u3001\u52a0\u4e86\u6270\u52a8\u4e5f\u8981\u4e00\u81f4', 'xs ink'],
      ['t', 270, 196, '+ \u7f51\u683c\u7a00\u758f\u6b63\u5219\uff08\u4ee5\u7f51\u683c\u4e3a\u5355\u4f4d\u538b\u6389\u96f6\u788e\u53d8\u5316\uff09\u3000\u63a8\u7406\uff1a\u8d1f\u4f59\u5f26 \u2192 \u7c97\u53d8\u5316\u56fe \u2192 \u4e24\u671f\u5b9e\u4f8b\u63a9\u819c\u6309 IoU \u7cbe\u4fee', 'xs']
    ]
  });

  // 4. \u5f00\u653e\u8bcd\u6c47\u53d8\u5316\u68c0\u6d4b\u7684\u4e24\u79cd\u6846\u67b6
  (function () {
    var it = [['t', 30, 50, 'M-C-I', 'sm ink b'], ['t', 30, 128, 'I-M-C', 'sm ink b']];
    var r1 = [['\u2460 \u51fa\u5019\u9009\u63a9\u819c', 'SAM / SAM2'], ['\u2461 \u6bd4\u8f83\u4e24\u671f', 'DINOv2 \u7279\u5f81'], ['\u2462 \u8bc6\u522b\u7c7b\u522b', 'CLIP \u7b49']];
    var r2 = [['\u2460 \u6309\u6587\u5b57\u627e\u76ee\u6807', 'Grounding DINO \u7b49'], ['\u2461 \u8f6c\u6210\u7cbe\u7ec6\u63a9\u819c', 'SAM'], ['\u2462 \u6bd4\u8f83\u4e24\u671f', '\u540c\u7c7b\u5b9e\u4f8b\u53d8\u6ca1\u53d8']];
    [r1, r2].forEach(function (row, k) {
      var y = k === 0 ? 30 : 108;
      row.forEach(function (b, i) {
        var x = 64 + i * 124;
        it.push(['r', x, y, 110, 40, i === 2 && k === 0 ? 2 : (i === 0 && k === 1 ? 2 : 1), b[0] + '\n' + b[1], { tc: 'xs ink' }]);
        if (i < 2) it.push(['a', x + 110, y + 20, x + 124, y + 20, 'k']);
      });
      it.push(['a', 422, y + 20, 438, y + 20, 'k'], ['r', 438, y, 96, 40, 4, '\u7528\u6237\u6307\u5b9a\u7c7b\u522b\n\u7684\u53d8\u5316', { tc: 'xs ink' }]);
    });
    it.push(['t', 270, 168, '\u7ea2\u6846 = \u8bc6\u522b\u7c7b\u522b\u7684\u4e00\u6b65\u3002OpenDPR \u7528\u201c\u9884\u8a00\u673a\u201d\u62c6\u5f00\u6d4b\uff1a\u771f\u6b63\u62d6\u540e\u817f\u7684\u662f\u8bc6\u522b\uff0c\u4e0d\u662f\u5b9a\u4f4d', 'xs ink']);
    it.push(['t', 270, 186, '\u8f93\u5165\uff1a\u4e24\u671f\u5f71\u50cf + \u4e00\u4e2a\u6216\u51e0\u4e2a\u7c7b\u522b\u540d\uff1b\u5168\u90e8\u7528\u73b0\u6210\u7684\u57fa\u7840\u6a21\u578b\u62fc\u88c5\uff0c\u4e0d\u9700\u8981\u53d8\u5316\u6807\u7b7e', 'xs']);
    F('ovcd', {
      w: 540, h: 198, min: 480, items: it,
      cap: 'DynamicEarth \u63d0\u51fa\u7684\u4e24\u79cd\u514d\u8bad\u7ec3\u5f00\u653e\u8bcd\u6c47\u53d8\u5316\u68c0\u6d4b\u6846\u67b6\uff08\u81ea\u7ed8\uff09\u3002M-C-I \u5148\u627e\u201c\u54ea\u91cc\u53d8\u4e86\u201d\u518d\u95ee\u201c\u662f\u4ec0\u4e48\u201d\uff1bI-M-C \u5148\u6309\u6587\u5b57\u627e\u5230\u76ee\u6807\u518d\u6bd4\u8f83\u4e24\u671f\u3002\u524d\u8005\u66f4\u7a33\uff0c\u540e\u8005\u5728\u7b80\u5355\u5e72\u51c0\u7684\u6570\u636e\u4e0a\u53ef\u80fd\u66f4\u597d\uff0c\u4f46\u8bc6\u522b\u5668\u6f0f\u68c0\u4f1a\u5c42\u5c42\u7d2f\u79ef\u3002'
    });
  })();

  // 5. \u534a\u4e2a\u50cf\u5143\u7684\u9519\u4f4d\u9020\u6210\u7684\u5047\u53d8\u5316
  (function () {
    var it = [['t', 140, 14, '\u4e00\u6761\u6a2a\u7a7f\u9053\u8def\u8fb9\u7f18\u7684\u50cf\u5143\u5256\u9762\uff08\u793a\u610f\uff09', 'xs ink b'], ['t', 420, 14, '\u4e24\u671f\u4e4b\u5dee |\u0394|', 'xs ink b']];
    var t1 = [0.05, 0.05, 0.05, 0.30, 0.30, 0.30], t2 = [0.05, 0.05, 0.175, 0.30, 0.30, 0.30];
    var Y = function (v) { return 96 - v * 200; };
    it.push(['t', 22, 60, 't1', 'xs ink'], ['t', 22, 150, 't2', 'xs ink']);
    t1.forEach(function (v, i) { it.push(rawRect(40 + i * 36, Y(v), 28, v * 200, v > 0.2 ? 'fm' : 'fg', 0.7, 2)); });
    t2.forEach(function (v, i) { it.push(rawRect(40 + i * 36, Y(v) + 92, 28, v * 200, v > 0.2 ? 'fm' : v > 0.1 ? 'fs' : 'fg', 0.7, 2)); });
    it.push(['l', 36, 96, 254, 96, 'm', { thin: 1 }], ['l', 36, 188, 254, 188, 'm', { thin: 1 }]);
    it.push(['t', 162, 104, '\u690d\u88ab 0.05 \uff5c \u9053\u8def 0.30', 'xs'], ['t', 126, 196, '\u8fb9\u7f18\u50cf\u5143\uff1a\u4e00\u534a\u8def\u4e00\u534a\u8349 = 0.175', 'xs s']);
    it.push(['t', 158, 120, '\u540e\u671f\u6574\u4f53\u9519\u4e86\u534a\u4e2a\u50cf\u5143 \u2193', 'xs o']);
    var d = t1.map(function (v, i) { return Math.abs(t2[i] - v); });
    d.forEach(function (v, i) { it.push(rawRect(316 + i * 36, 160 - v * 400, 28, Math.max(v * 400, 1), v > 0 ? 'fv' : 'fm', 0.75, 2)); });
    it.push(['l', 312, 160, 530, 160, 'm', { thin: 1 }], ['l', 312, 120, 530, 120, 'r', { dash: 1 }], ['t', 528, 112, '\u9608\u503c 0.1', 'xs v', 'end']);
    it.push(['t', 406, 66, '|\u0394| = 0.125', 'xs v b'], ['t', 420, 182, '\u5730\u7269\u4e00\u70b9\u6ca1\u53d8\uff0c\u8fd9\u4e2a\u50cf\u5143\u5374\u8d85\u8fc7\u4e86\u9608\u503c', 'xs ink']);
    F('misalign_edge', {
      w: 540, h: 206, min: 480, items: it,
      cap: '\u9519\u4f4d\u600e\u6837\u53d8\u6210\u5047\u53d8\u5316\uff08\u793a\u610f\u6570\u503c\uff09\u3002\u5730\u7269\u5b8c\u5168\u6ca1\u53d8\uff0c\u53ea\u662f\u540e\u671f\u5f71\u50cf\u6574\u4f53\u504f\u4e86\u534a\u4e2a\u50cf\u5143\uff1a\u8de8\u5728\u9053\u8def\u8fb9\u7f18\u4e0a\u7684\u90a3\u4e2a\u50cf\u5143\u4ece\u201c\u5168\u662f\u8def\u201d\u53d8\u6210\u201c\u4e00\u534a\u8def\u4e00\u534a\u8349\u201d\uff0c\u53cd\u5c04\u7387\u5dee 0.125\uff0c\u6bd4\u5f88\u591a\u771f\u5b9e\u53d8\u5316\u8fd8\u5927\u300210 m \u5f71\u50cf\u4e0a\uff0c\u6bcf\u6761\u9053\u8def\u3001\u7530\u57c2\u3001\u6cb3\u5cb8\u7684\u4e24\u4fa7\u90fd\u4f1a\u51fa\u73b0\u8fd9\u6837\u4e00\u6761\u5047\u53d8\u5316\u7ec6\u7ebf\u3002'
    });
  })();

  // 6. AROSICS \u76f8\u4f4d\u76f8\u5173
  (function () {
    var it = [['t', 90, 14, '\u2460 \u91cd\u53e0\u533a\u5e03\u5bc6\u96c6\u7f51\u683c', 'xs ink b'], ['t', 270, 14, '\u2461 \u6bcf\u4e2a\u7a97\u53e3\u505a\u76f8\u4f4d\u76f8\u5173', 'xs ink b'], ['t', 450, 14, '\u2462 \u8fc7\u6ee4 + \u4eff\u5c04\u6821\u6b63', 'xs ink b']];
    it.push(['r', 16, 28, 150, 110, 0, '', { rx: 2 }]);
    it.push(['raw', '<path d="M16 112 C60 98 100 126 166 104 L166 120 C100 140 60 112 16 128 Z" class="fw" style="fill-opacity:.45"/>']);
    it.push(['raw', '<ellipse cx="128" cy="52" rx="28" ry="16" class="fc" style="fill-opacity:.9"/>']);
    for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) {
      var x = 34 + c * 28, y = 42 + r * 26, bad = (r === 0 && (c === 3 || c === 4)) || (r === 3 && c < 5 && c !== 2) || (r === 2 && c === 4);
      it.push(bad ? ['t', x, y, '\u00d7', 'sm v'] : ['c', x, y, 3, 4]);
    }
    it.push(['t', 90, 154, '\u00d7 = \u4e91\u3001\u6c34\u9762\u3001\u91cd\u590d\u7eb9\u7406\u5904\uff0c\u5254\u9664', 'xs']);
    var vals = [], txt = [];
    for (var i = 0; i < 49; i++) { var rr = Math.floor(i / 7), cc = i % 7, dx = cc - 4.3, dy = rr - 2.6; var v = Math.exp(-(dx * dx + dy * dy) / 1.2); vals.push(Math.min(1, v + 0.05)); }
    it.push(['g', 198, 30, 7, 7, 16, 16, vals, { ramp: 'o' }]);
    it.push(['raw', '<rect x="246" y="78" width="16" height="16" class="ln lm" style="fill:none"/>']);
    it.push(['t', 316, 46, '\u5cf0\u7684\u4f4d\u7f6e', 'xs o', 'start'], ['t', 316, 60, '= \u4f4d\u79fb', 'xs o', 'start']);
    it.push(['t', 254, 154, '\u65b9\u6846 = \u96f6\u4f4d\u79fb', 'xs'], ['t', 254, 170, '\u4e9a\u50cf\u5143\uff1a\u5728\u5cf0\u5468\u56f4\u63d2\u503c', 'xs']);
    it.push(['r', 380, 28, 154, 110, 6, '\u2460 \u6574\u6570\u4f4d\u79fb\u6536\u655b\n\u2461 \u4f4d\u79fb\u957f\u5ea6\u9608\u503c\n\u2462 \u5cf0\u503c\u53ef\u9760\u6027 R\n\u2463 \u7ed3\u6784\u76f8\u4f3c MSSIM\n\u2464 RANSAC \u4eff\u5c04\u4e00\u81f4\n\u2192 \u62df\u5408\u4eff\u5c04\uff0c\u4e00\u6b21\u91cd\u91c7\u6837', { tc: 'xs ink' }]);
    it.push(['t', 270, 186, '\u8bba\u6587\u4f8b\u5b50\uff1aLandsat-8 \u4e0e Sentinel-2 \u8de8\u4f20\u611f\u5668\uff0c\u6b8b\u5dee\u4ece 2.31 \u4e2a\u50cf\u5143\u964d\u5230\u7ea6 0.3 \u4e2a\u50cf\u5143', 'xs ink']);
    F('phase_corr', {
      w: 540, h: 198, min: 480, items: it,
      cap: 'AROSICS \u7684\u914d\u51c6\u601d\u8def\uff08\u6309 Scheffler \u7b49 2017 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u76f8\u4f4d\u76f8\u5173\u5728\u9891\u57df\u91cc\u6bd4\u8f83\u4e24\u4e2a\u7a97\u53e3\uff0c\u76f8\u5173\u9762\u4e0a\u5cf0\u7684\u4f4d\u7f6e\u5c31\u662f\u4e24\u7a97\u53e3\u4e4b\u95f4\u7684\u5e73\u79fb\uff1b\u4e94\u9053\u8fc7\u6ee4\u5254\u6389\u4e91\u3001\u6c34\u9762\u3001\u91cd\u590d\u7eb9\u7406\u9020\u6210\u7684\u9519\u8bef\u5339\u914d\uff1b\u5269\u4e0b\u7684\u8fde\u63a5\u70b9\u62df\u5408\u4e00\u4e2a\u4eff\u5c04\u53d8\u6362\uff0c\u5bf9\u76ee\u6807\u5f71\u50cf\u53ea\u91cd\u91c7\u6837\u4e00\u6b21\u3002'
    });
  })();

  // 7. \u4eba\u4e3a\u52a0\u5df2\u77e5\u9519\u4f4d\u7684\u5b9e\u9a8c
  (function () {
    var it = [
      ['r', 8, 40, 92, 44, 0, '\u5df2\u914d\u51c6\u7684\u5f71\u50cf\u5bf9\n+ \u53d8\u5316\u6807\u7b7e', { tc: 'xs ink' }], ['a', 100, 62, 116, 62, 'k'],
      ['r', 116, 40, 106, 44, 5, '\u7ed9\u540e\u671f\u52a0\u5df2\u77e5\u9519\u4f4d\n0\u30010.5\u30011\u30012 \u50cf\u5143', { tc: 'xs ink' }], ['a', 222, 62, 234, 62, 'k'],
      ['r', 234, 40, 66, 44, 1, '\u540c\u4e00\u4e2a\n\u6a21\u578b\u63a8\u7406', { tc: 'xs ink' }], ['a', 300, 62, 314, 62, 'k'],
      ['t', 330, 34, '\u8bef\u62a5\u7684\u53d8\u5316\u50cf\u5143\uff08\u793a\u610f\uff09', 'xs ink', 'start']
    ];
    var X = function (s) { return 340 + s * 86; }, fp = [[0, 1], [0.5, 1.6], [1, 2.9], [2, 4.4]];
    it.push(['l', 336, 150, 530, 150, 'k'], ['l', 336, 150, 336, 44, 'k']);
    var pts = []; fp.forEach(function (p) { pts.push(X(p[0]), 150 - p[1] * 22); it.push(['c', X(p[0]), 150 - p[1] * 22, 3, 2], ['t', X(p[0]), 164, String(p[0]), 'xs']); });
    it.push(['p', pts, 'r', { head: false }], ['t', 436, 180, '\u4eba\u4e3a\u52a0\u7684\u9519\u4f4d\uff08\u50cf\u5143\uff09', 'xs']);
    it.push(['t', 160, 112, '\u597d\u5904\uff1a\u4f4d\u79fb\u771f\u503c\u3001\u53d8\u5316\u771f\u503c\u90fd\u5df2\u77e5\uff0c', 'xs ink'], ['t', 160, 128, '\u6bcf\u6b21\u53ea\u6539\u4e00\u4e2a\u56e0\u7d20\uff0c\u91cf\u51fa\u201c\u5bf9\u9519\u4f4d\u6709\u591a\u654f\u611f\u201d', 'xs ink']);
    it.push(['t', 160, 156, '\u6ce8\u610f\uff1a\u9519\u4f4d\u7684\u5927\u5c0f\u8981\u8d34\u8fd1\u81ea\u5df1\u6570\u636e\u7684\u771f\u5b9e\u6b8b\u5dee', 'xs o']);
    F('misreg_sim', {
      w: 540, h: 192, min: 480, items: it,
      cap: '\u6700\u503c\u5f97\u4ece DiffRegCD\u3001ChangeRD \u501f\u6765\u7684\u4e0d\u662f\u7f51\u7edc\uff0c\u800c\u662f\u5b9e\u9a8c\u8bbe\u8ba1\uff1a\u5728\u5df2\u914d\u51c6\u7684\u6570\u636e\u4e0a\u4eba\u4e3a\u65bd\u52a0\u5df2\u77e5\u7684\u9519\u4f4d\uff0c\u5c31\u540c\u65f6\u6709\u4e86\u4f4d\u79fb\u771f\u503c\u548c\u53d8\u5316\u771f\u503c\uff0c\u53ef\u4ee5\u5e72\u51c0\u5730\u6d4b\u51fa\u6a21\u578b\u5bf9\u9519\u4f4d\u7684\u654f\u611f\u5ea6\uff0c\u4ee5\u53ca\u67d0\u4e2a\u5bf9\u9f50\u6a21\u5757\u5230\u5e95\u5e2e\u4e86\u591a\u5c11\u3002\u53f3\u56fe\u66f2\u7ebf\u662f\u793a\u610f\u3002'
    });
  })();

  // 8. DiffRegCD\uff1a\u628a\u4f4d\u79fb\u4f30\u8ba1\u5f53\u5206\u7c7b
  (function () {
    var it = [];
    var steps = ['\u51bb\u7ed3 DDPM\n\u7279\u5f81', '\u9ad8\u65af\n\u9884\u5e73\u6ed1', '\u4ea4\u53c9\u6ce8\u610f\u529b', '\u5728 r\u00b2 \u4e2a\u5019\u9009\n\u4f4d\u79fb\u4e0a softmax', '\u632a\u52a8\u540e\u671f\n\u591a\u5c3a\u5ea6\u7279\u5f81', '|\u5dee| \u4e0e \u79ef\n\u2192 \u53d8\u5316\u56fe'];
    steps.forEach(function (s, i) { var x = 6 + i * 89; it.push(['r', x, 18, 80, 40, i === 3 ? 5 : i === 5 ? 4 : 1, s, { tc: 'xs ink' }]); if (i < 5) it.push(['a', x + 80, 38, x + 89, 38, 'k']); });
    var pred = [], lab = [], ptxt = [];
    var mu = [0.8, -0.2];
    for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) {
      var dx = c - 2, dy = r - 2;
      var p = Math.exp(-((dx - 1) * (dx - 1) + (dy - 0) * (dy - 0)) / 0.7) + 0.35 * Math.exp(-((dx + 1) * (dx + 1) + dy * dy) / 0.5);
      pred.push(p); lab.push(Math.exp(-((dx - mu[0]) * (dx - mu[0]) + (dy - mu[1]) * (dy - mu[1])) / 0.8));
    }
    var sp = pred.reduce(function (a, b) { return a + b; }, 0), sl = lab.reduce(function (a, b) { return a + b; }, 0);
    pred = pred.map(function (v) { return v / sp; }); lab = lab.map(function (v) { return v / sl; });
    var ex = 0, ey = 0; pred.forEach(function (p, i) { ex += p * ((i % 5) - 2); ey += p * (Math.floor(i / 5) - 2); });
    var mx = Math.max.apply(null, pred), ml = Math.max.apply(null, lab);
    pred.forEach(function (p) { ptxt.push(p >= 0.05 ? p.toFixed(2) : ''); });
    it.push(['t', 120, 80, '\u7f51\u7edc\u8f93\u51fa\uff1a\u6bcf\u4e2a\u5019\u9009\u4f4d\u79fb\u7684\u6982\u7387\uff08\u793a\u610f\uff09', 'xs ink b'], ['t', 410, 80, '\u8bad\u7ec3\u76ee\u6807\uff1a\u9ad8\u65af\u8f6f\u6807\u7b7e', 'xs ink b']);
    it.push(['g', 50, 92, 5, 5, 28, 22, pred.map(function (v) { return v / mx; }), { ramp: 'o', txt: ptxt, tc: 'xs ink' }]);
    it.push(['g', 340, 92, 5, 5, 28, 22, lab.map(function (v) { return v / ml; }), { ramp: 'g' }]);
    it.push(['t', 40, 147, 'dy', 'xs', 'end'], ['t', 120, 212, 'dx\uff1a\u22122 \u2026 +2 \u50cf\u5143', 'xs'], ['t', 410, 212, '\u4ee5\u771f\u4f4d\u79fb\uff08+0.8, \u22120.2\uff09\u4e3a\u4e2d\u5fc3', 'xs']);
    it.push(['t', 236, 120, '\u671f\u671b\u4f4d\u79fb', 'xs o', 'start'], ['t', 236, 136, '= \u03a3 \u6982\u7387 \u00d7 \u4f4d\u79fb', 'xs o', 'start'], ['t', 236, 152, '\u2248 (' + ex.toFixed(2) + ', ' + ey.toFixed(2) + ')', 'xs o', 'start']);
    it.push(['t', 236, 176, '\u7528 KL \u6563\u5ea6', 'xs', 'start'], ['t', 236, 190, '\u62c9\u5411\u53f3\u56fe', 'xs', 'start']);
    F('diffreg_cls', {
      w: 540, h: 222, min: 480, items: it,
      cap: 'DiffRegCD \u7684\u914d\u51c6\u5206\u652f\uff08\u6309\u8bba\u6587 3.2 \u8282\u81ea\u7ed8\uff0c\u6570\u503c\u793a\u610f\uff09\u3002\u5b83\u4e0d\u76f4\u63a5\u56de\u5f52\u4e00\u4e2a (dx, dy)\uff0c\u800c\u662f\u5728\u4e00\u4e2a\u7a97\u53e3\u5185\u7684\u6240\u6709\u5019\u9009\u4f4d\u79fb\u4e0a\u8f93\u51fa\u6982\u7387\uff0c\u7528\u4ee5\u771f\u4f4d\u79fb\u4e3a\u4e2d\u5fc3\u7684\u9ad8\u65af\u8f6f\u6807\u7b7e\u76d1\u7763\uff0c\u518d\u7528\u6982\u7387\u52a0\u6743\u5e73\u5747\u5f97\u5230\u4e9a\u50cf\u5143\u4f4d\u79fb\u3002\u5de6\u56fe\u91cc\u6709\u4e00\u4e2a\u6b21\u5cf0\uff08\u6bd4\u5982\u91cd\u590d\u7eb9\u7406\u9020\u6210\u7684\u53e6\u4e00\u79cd\u53ef\u80fd\uff09\uff0c\u5206\u7c7b\u8f93\u51fa\u80fd\u628a\u8fd9\u79cd\u4e0d\u786e\u5b9a\u6027\u8868\u73b0\u51fa\u6765\u3002'
    });
  })();

  // 9. CDDGNet \u5c0f\u6ce2\u89e3\u8026
  F('wavelet_dg', {
    w: 540, h: 196, min: 480,
    cap: 'CDDGNet \u7684\u201c\u56e0\u679c\u89e3\u8026\u201d\uff08\u6309\u8bba\u6587\u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u53cc\u65f6\u76f8\u7279\u5f81\u7ecf\u79bb\u6563\u5c0f\u6ce2\u53d8\u6362\u5206\u6210\u9ad8\u9891\u548c\u4f4e\u9891\uff1a\u9ad8\u9891\uff08\u8fb9\u7f18\u3001\u7ed3\u6784\uff09\u591a\u4e0e\u771f\u5b9e\u53d8\u5316\u6709\u5173\uff0c\u4f4e\u9891\uff08\u80cc\u666f\u3001\u6574\u4f53\u98ce\u683c\uff09\u591a\u4e0e\u6210\u50cf\u57df\u6709\u5173\u3002\u7f16\u7801\u9636\u6bb5\u7528\u4f4e\u9891\u5dee\u5f02\u6821\u6b63\u9ad8\u9891\uff0c\u89e3\u7801\u9636\u6bb5\u53cd\u8fc7\u6765\u7528\u9ad8\u9891\u91cd\u65b0\u6ce8\u610f\u4f4e\u9891\u3001\u538b\u6389\u5176\u4e2d\u7684\u57df\u6210\u5206\uff0c\u6700\u540e\u53ea\u7528\u53d8\u5316\u7279\u5f81\u505a\u5224\u65ad\u3002',
    items: [
      ['r', 8, 70, 60, 40, 1, '\u4e24\u671f\u7279\u5f81', { tc: 'xs ink' }], ['a', 68, 90, 84, 90, 'k'],
      ['r', 84, 70, 70, 40, 5, '\u5c0f\u6ce2\u5206\u89e3\nDWT', { tc: 'xs ink' }],
      ['a', 154, 82, 172, 50, 'k'], ['a', 154, 98, 172, 130, 'k'],
      ['r', 172, 28, 132, 40, 2, '\u9ad8\u9891\uff1a\u8fb9\u7f18\u3001\u7ed3\u6784\n\u591a\u4e0e\u771f\u5b9e\u53d8\u5316\u6709\u5173', { tc: 'xs ink' }],
      ['r', 172, 112, 132, 40, 1, '\u4f4e\u9891\uff1a\u80cc\u666f\u3001\u98ce\u683c\n\u591a\u4e0e\u6210\u50cf\u57df\u6709\u5173', { tc: 'xs ink' }],
      ['a', 238, 112, 238, 68, 'o', { dash: 1 }], ['t', 244, 90, '\u4f4e\u9891\u5dee\u5f02\u6821\u6b63\u9ad8\u9891', 'xs o', 'start'],
      ['a', 304, 48, 330, 48, 'k'], ['a', 304, 132, 330, 132, 'k'],
      ['r', 330, 28, 92, 40, 2, '\u53d8\u5316\u7279\u5f81', { tc: 'xs ink' }], ['r', 330, 112, 92, 40, 0, '\u57df\u7279\u5f81\uff08\u538b\u6389\uff09', { tc: 'xs ink', dash: 1 }],
      ['a', 422, 48, 440, 76, 'k'], ['r', 440, 70, 94, 40, 4, '\u53ea\u7528\u53d8\u5316\u7279\u5f81\n\u5224\u65ad', { tc: 'xs ink' }],
      ['t', 270, 172, '\u8bbe\u5b9a\uff1a\u6e90\u57df\u8bad\u7ec3\uff0c\u76ee\u6807\u57df\u5b8c\u5168\u4e0d\u89c1\uff08\u57df\u6cdb\u5316\uff09\uff1b\u8de8\u57df\u8d8a\u96be\uff0c\u5b83\u6bd4\u5bf9\u7167\u65b9\u6cd5\u7684\u4f18\u52bf\u8d8a\u5927', 'xs ink'],
      ['t', 270, 188, '\u5bf9\u7167 DomainBed\uff1a\u4e25\u683c\u7edf\u4e00\u8c03\u53c2\u65f6\uff0c\u57df\u6cdb\u5316\u7b97\u6cd5\u5f88\u5c11\u6bd4\u8c03\u597d\u7684\u666e\u901a\u8bad\u7ec3\u7a33\u5b9a\u9ad8\u51fa 1 \u4e2a\u70b9', 'xs']
    ]
  });

  // 10. \u4e09\u79cd\u5212\u5206
  (function () {
    var it = [['t', 90, 14, '\u968f\u673a\u5212\u5206', 'sm ink b'], ['t', 270, 14, '\u5206\u5757\u5212\u5206\uff08\u5e26\u7f13\u51b2\uff09', 'sm ink b'], ['t', 450, 14, '\u7559\u4e00\u6d4b\u70b9', 'sm ink b']];
    var test = { 3: 1, 10: 1, 17: 1, 22: 1, 28: 1, 35: 1, 41: 1, 46: 1 };
    function cell(x, y, kind) { if (kind === 'test') it.push(rawRect(x, y, 14, 14, 'cell fv', 0.75)); else if (kind === 'train') it.push(rawRect(x, y, 14, 14, 'cell fw', 0.45)); else if (kind === 'buf') it.push(rawRect(x, y, 14, 14, 'cell fm', 0.25)); else it.push(['r', x, y, 14, 14, 0, '', { rx: 0 }]); }
    for (var r = 0; r < 6; r++) for (var c = 0; c < 8; c++) {
      var k = r * 8 + c;
      cell(34 + c * 14, 28 + r * 14, test[k] ? 'test' : 'train');
      var inT = r >= 2 && r <= 4 && c >= 4 && c <= 6, inB = r >= 1 && r <= 5 && c >= 3 && c <= 7;
      cell(214 + c * 14, 28 + r * 14, inT ? 'test' : inB ? 'buf' : 'train');
      var s1 = r <= 2 && c <= 2, s2 = r <= 2 && c >= 5, s3 = r >= 3 && c >= 2 && c <= 5;
      cell(394 + c * 14, 28 + r * 14, s3 ? 'test' : (s1 || s2) ? 'train' : null);
    }
    it.push(['t', 90, 126, '\u6d4b\u8bd5\u5757\u7684\u90bb\u5c45\u5c31\u5728\u8bad\u7ec3\u96c6\u91cc\uff1a', 'xs'], ['t', 90, 142, '\u6284\u90bb\u5c45\u5c31\u80fd\u7b54\u5bf9\uff0c\u6210\u7ee9\u865a\u9ad8', 'xs']);
    it.push(['t', 270, 126, '\u5757\u8981\u5927\u4e8e\u81ea\u76f8\u5173\u8303\u56f4\uff1b', 'xs'], ['t', 270, 142, '\u7070\u8272\u7f13\u51b2\u533a\u4e24\u8fb9\u90fd\u4e0d\u7528', 'xs']);
    it.push(['t', 450, 126, '\u6574\u4e2a\u6d4b\u70b9\u62ff\u51fa\u6765\u6d4b\uff1a', 'xs'], ['t', 450, 142, '\u56de\u7b54\u201c\u6362\u4e2a\u5730\u65b9\u8fd8\u884c\u4e0d\u884c\u201d', 'xs']);
    it.push(rawRect(150, 158, 12, 10, 'fw', 0.45), ['t', 166, 163, '\u8bad\u7ec3', 'xs', 'start'], rawRect(220, 158, 12, 10, 'fv', 0.75), ['t', 236, 163, '\u6d4b\u8bd5', 'xs', 'start'], rawRect(290, 158, 12, 10, 'fm', 0.25), ['t', 306, 163, '\u7f13\u51b2\uff08\u4e0d\u7528\uff09', 'xs', 'start']);
    F('cv_blocks', {
      w: 540, h: 176, min: 480, items: it,
      cap: '\u540c\u4e00\u6279\u6837\u672c\u7684\u4e09\u79cd\u5212\u5206\uff08\u793a\u610f\uff09\u3002\u968f\u673a\u5212\u5206\u8ba9\u6d4b\u8bd5\u6837\u672c\u51e0\u4e4e\u90fd\u6709\u8fd1\u90bb\u5728\u8bad\u7ec3\u96c6\u91cc\uff0c\u6d4b\u5230\u7684\u662f\u201c\u5185\u63d2\u201d\u80fd\u529b\uff0c\u800c\u4e14\u88ab\u7a7a\u95f4\u81ea\u76f8\u5173\u62ac\u9ad8\uff1b\u5206\u5757\u5212\u5206\u548c\u7559\u4e00\u6d4b\u70b9\u8ba9\u6d4b\u8bd5\u533a\u57df\u8fdc\u79bb\u8bad\u7ec3\u533a\u57df\uff0c\u6d4b\u5230\u7684\u624d\u662f\u201c\u5230\u65b0\u5730\u65b9\u8fd8\u884c\u4e0d\u884c\u201d\u3002'
    });
  })();

  // 11. \u5206\u5c42\u62bd\u6837\u4f30\u9762\u79ef\uff08\u793a\u610f\u6570\u503c\uff09
  (function () {
    var it = [['t', 110, 14, '\u5730\u56fe + \u5206\u5c42\u62bd\u6837\uff08\u793a\u610f\uff09', 'xs ink b'], ['t', 410, 14, '\u53d8\u5316\u9762\u79ef\uff1a\u6570\u50cf\u5143 vs \u62bd\u6837\u4f30\u8ba1', 'xs ink b']];
    it.push(['r', 14, 28, 196, 130, 0, '', { rx: 2 }]);
    [[40, 50, 30, 16], [120, 40, 22, 22], [70, 112, 36, 14], [160, 120, 24, 18]].forEach(function (b) { it.push(rawRect(b[0], b[1], b[2], b[3], 'fv', 0.45, 3)); });
    [[48, 58, 1], [60, 56, 1], [128, 50, 1], [136, 54, 0], [82, 118, 1], [94, 118, 1], [168, 128, 1], [176, 126, 1]].forEach(function (p) { it.push(['c', p[0], p[1], 3.2, p[2] ? 2 : 0]); });
    [[30, 92], [62, 82], [96, 70], [110, 96], [150, 78], [186, 60], [190, 100], [30, 140], [130, 144], [100, 136], [176, 146], [56, 120]].forEach(function (p, i) { it.push(['c', p[0], p[1], 3.2, i === 3 || i === 9 ? 2 : 1]); });
    it.push(['t', 112, 172, '\u7ea2\u6591 = \u5730\u56fe\u4e0a\u7684\u201c\u53d8\u5316\u201d\u5c42\uff1b\u70b9 = \u6837\u672c', 'xs'], ['t', 112, 188, '\u5b9e\u5fc3\u7ea2\u70b9 = \u4eba\u5de5\u5224\u8bfb\u786e\u8ba4\u662f\u53d8\u5316', 'xs']);
    var B = function (v) { return 160 - v / 6000 * 120; };
    it.push(['l', 290, 160, 530, 160, 'k'], ['l', 290, 160, 290, 34, 'k']);
    [0, 2000, 4000, 6000].forEach(function (v) { it.push(['t', 284, B(v), String(v), 'xs', 'end'], ['l', 290, B(v), 296, B(v), 'm', { thin: 1 }]); });
    it.push(rawRect(330, B(1000), 60, 160 - B(1000), 'fm', 0.6, 2), ['t', 360, B(1000) - 10, '1,000', 'xs ink']);
    it.push(rawRect(440, B(2780), 60, 160 - B(2780), 'fv', 0.6, 2), ['l', 470, B(2780 + 2731), 470, B(2780 - 2731), 'k'], ['l', 462, B(2780 + 2731), 478, B(2780 + 2731), 'k'], ['l', 462, B(49), 478, B(49), 'k']);
    it.push(['t', 504, B(2780), '2,780', 'xs ink', 'start'], ['t', 360, 176, '\u5730\u56fe\u4e0a\u6570\u7684', 'xs'], ['t', 470, 176, '\u62bd\u6837\u4f30\u8ba1 \u00b195% \u533a\u95f4', 'xs'], ['t', 410, 192, '\u5355\u4f4d\uff1a\u516c\u9877', 'xs']);
    F('strat_area', {
      w: 540, h: 202, min: 480, items: it,
      cap: '\u6309 Olofsson \u7b49 2014 \u7684\u505a\u6cd5\u4f30\u53d8\u5316\u9762\u79ef\uff08\u6784\u9020\u7684\u793a\u610f\u6570\u503c\uff0c\u7b97\u6cd5\u89c1\u6b63\u6587\uff09\u3002\u5730\u56fe\u4e0a\u7684\u53d8\u5316\u5c42\u53ea\u6709 1,000 \u516c\u9877\uff0c\u4f46\u5728\u9762\u79ef\u5927\u5f97\u591a\u7684\u201c\u672a\u53d8\u5316\u201d\u5c42\u91cc\u62bd\u5230\u4e86\u5c11\u91cf\u6f0f\u6389\u7684\u53d8\u5316\uff0c\u6309\u5c42\u7684\u9762\u79ef\u52a0\u6743\u540e\uff0c\u4f30\u8ba1\u7684\u771f\u5b9e\u53d8\u5316\u9762\u79ef\u7ea6 2,780 \u516c\u9877\u2014\u2014\u7f6e\u4fe1\u533a\u95f4\u4e5f\u5f88\u5bbd\uff0c\u56e0\u4e3a\u672a\u53d8\u5316\u5c42\u91cc\u53ea\u62bd\u5230 2 \u4e2a\u53d8\u5316\u6837\u672c\u3002'
    });
  })();

  // 12. \u540c\u4e00\u4e2a\u6a21\u578b\uff0c\u4e24\u4e2a\u6d4b\u70b9\u7684 F1\u2013\u9608\u503c\u66f2\u7ebf
  (function () {
    var lam = 1 / 0.12, mu = 0.6, sd = 0.18, Z = Phi((1 - mu) / sd) - Phi(-mu / sd);
    var fpr = function (t) { return (Math.exp(-lam * t) - Math.exp(-lam)) / (1 - Math.exp(-lam)); };
    var tpr = function (t) { return (Phi((1 - mu) / sd) - Phi((t - mu) / sd)) / Z; };
    var f1 = function (pi, t) { var R = tpr(t), P = pi * R / (pi * R + (1 - pi) * fpr(t)); return 2 * P * R / (P + R); };
    var X = function (t) { return 60 + t * 440; }, Y = function (v) { return 206 - v / 0.7 * 150; };
    var it = [['l', 60, 206, 510, 206, 'k'], ['l', 60, 206, 60, 50, 'k'], ['t', 285, 230, '\u9608\u503c', 'xs'], ['t', 26, 128, 'F1', 'xs']];
    [0, 0.2, 0.4, 0.6, 0.8, 1].forEach(function (t) { it.push(['t', X(t), 216, t.toFixed(1), 'xs']); });
    [0, 0.2, 0.4, 0.6].forEach(function (v) { it.push(['t', 54, Y(v), v.toFixed(1), 'xs', 'end'], ['l', 60, Y(v), 510, Y(v), 'm', { thin: 1, dash: 1 }]); });
    var sites = [[0.02, 'b', '\u6d4b\u70b9 A\uff1a\u53d8\u5316\u5360 2%'], [0.002, 'r', '\u6d4b\u70b9 B\uff1a\u53d8\u5316\u5360 0.2%']], best = [];
    sites.forEach(function (s) {
      var pts = [], b = [0, 0];
      for (var i = 4; i <= 96; i++) { var t = i / 100, v = f1(s[0], t); pts.push(+X(t).toFixed(1), +Y(v).toFixed(1)); if (v > b[0]) b = [v, t]; }
      it.push(['p', pts, s[1], { head: false, bold: 1 }]); best.push(b);
    });
    it.push(['l', X(best[0][1]), Y(best[0][0]), X(best[0][1]), 206, 'b', { dash: 1 }], ['c', X(best[0][1]), Y(best[0][0]), 4, 1]);
    it.push(['l', X(best[1][1]), Y(best[1][0]), X(best[1][1]), 206, 'r', { dash: 1 }], ['c', X(best[1][1]), Y(best[1][0]), 4, 2]);
    var bAtA = f1(0.002, best[0][1]);
    it.push(['c', X(best[0][1]), Y(bAtA), 4, 5], ['t', X(best[0][1]) - 8, Y(bAtA) + 2, '\u628a A \u7684\u9608\u503c\u642c\u5230 B\uff1aF1 ' + bAtA.toFixed(2), 'xs o', 'end']);
    it.push(['t', 60, 16, sites[0][2] + '\uff0c\u6700\u4f73\u9608\u503c ' + best[0][1].toFixed(2) + '\uff0cF1 ' + best[0][0].toFixed(2), 'xs w', 'start']);
    it.push(['t', 60, 34, sites[1][2] + '\uff0c\u6700\u4f73\u9608\u503c ' + best[1][1].toFixed(2) + '\uff0cF1 ' + best[1][0].toFixed(2), 'xs v', 'start']);
    F('prior_shift', {
      w: 540, h: 240, min: 480, items: it,
      cap: '\u540c\u4e00\u4e2a\u6a21\u578b\u3001\u540c\u6837\u7684\u201c\u53d8\u5316\u50cf\u5143\u957f\u4ec0\u4e48\u6837\u201d\u548c\u201c\u672a\u53d8\u50cf\u5143\u957f\u4ec0\u4e48\u6837\u201d\uff0c\u53ea\u662f\u4e24\u4e2a\u6d4b\u70b9\u7684\u53d8\u5316\u6bd4\u4f8b\u4e0d\u540c\uff08\u6784\u9020\u7684\u793a\u610f\u5206\u5e03\uff09\u3002\u53d8\u5316\u8d8a\u7a00\u5c11\uff0c\u540c\u6837\u7684\u8bef\u62a5\u7387\u9020\u6210\u7684\u8bef\u62a5\u8d8a\u591a\uff0c\u6700\u4f73\u9608\u503c\u5c31\u8d8a\u5f80\u53f3\u79fb\u3001\u80fd\u8fbe\u5230\u7684 F1 \u4e5f\u8d8a\u4f4e\u3002\u5728 A \u4e0a\u9009\u597d\u7684\u9608\u503c\u642c\u5230 B\uff0c\u4f1a\u591a\u62a5\u4e00\u5927\u7247\u3002'
    });
  })();

  // 13. \u53cc\u9608\u503c\u751f\u957f\u4e0e\u6700\u5c0f\u56fe\u6591
  (function () {
    var P = [[.05, .10, .20, .15, .05, .05, .30, .10], [.10, .45, .55, .35, .10, .05, .62, .20], [.15, .60, .85, .65, .20, .05, .25, .10], [.05, .40, .75, .50, .10, .05, .05, .45], [.05, .10, .30, .20, .05, .55, .10, .05], [.05, .05, .10, .05, .05, .10, .05, .05]];
    var R = 6, C = 8;
    function comps(mask) { var lab = [], id = 0, out = []; for (var r = 0; r < R; r++) { lab.push([]); for (var c = 0; c < C; c++) lab[r].push(-1); } for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (mask[r][c] && lab[r][c] < 0) { var st = [[r, c]], cells = []; lab[r][c] = id; while (st.length) { var q = st.pop(); cells.push(q); [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var a = q[0] + d[0], b = q[1] + d[1]; if (a >= 0 && a < R && b >= 0 && b < C && mask[a][b] && lab[a][b] < 0) { lab[a][b] = id; st.push([a, b]); } }); } out.push(cells); id++; } return out; }
    function grid(f) { var m = []; for (var r = 0; r < R; r++) { m.push([]); for (var c = 0; c < C; c++) m[r].push(f(r, c)); } return m; }
    var single = grid(function (r, c) { return P[r][c] >= 0.5; });
    var mmu = grid(function () { return false; }); comps(single).forEach(function (cs) { if (cs.length >= 3) cs.forEach(function (q) { mmu[q[0]][q[1]] = true; }); });
    var hys = grid(function () { return false; }); comps(grid(function (r, c) { return P[r][c] >= 0.4; })).forEach(function (cs) { if (cs.some(function (q) { return P[q[0]][q[1]] >= 0.7; })) cs.forEach(function (q) { hys[q[0]][q[1]] = true; }); });
    var it = [], panels = [[single, '\u5355\u9608\u503c 0.5'], [mmu, '\u5355\u9608\u503c 0.5 + \u6700\u5c0f\u56fe\u6591 \u2265 3'], [hys, '\u53cc\u9608\u503c\uff1a\u79cd\u5b50 \u2265 0.7\uff0c\u751f\u957f \u2265 0.4']];
    panels.forEach(function (pn, k) {
      var x0 = 14 + k * 178, n = 0;
      it.push(['t', x0 + 80, 16, pn[1], 'xs ink b']);
      for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) {
        var on = pn[0][r][c]; if (on) n++;
        it.push(on ? rawRect(x0 + c * 20, 28 + r * 20, 20, 20, 'cell fv', 0.65) : ['r', x0 + c * 20, 28 + r * 20, 20, 20, 0, '', { rx: 0 }]);
        it.push(['t', x0 + c * 20 + 10, 28 + r * 20 + 10, String(P[r][c]).replace('0.', '.'), 'xs ink']);
      }
      it.push(['t', x0 + 80, 160, '\u62a5\u51fa ' + n + ' \u4e2a\u50cf\u5143', 'xs']);
    });
    it.push(['t', 94, 176, '\u5b64\u7acb\u5c0f\u70b9\u4e5f\u62a5\u4e86\uff1b', 'xs'], ['t', 94, 190, '\u5927\u6591\u8fb9\u7f18\u7f3a\u4e24\u683c', 'xs']);
    it.push(['t', 272, 176, '\u5c0f\u70b9\u53bb\u6389\u4e86\uff1b', 'xs'], ['t', 272, 190, '\u8fb9\u7f18\u4ecd\u7136\u7f3a', 'xs']);
    it.push(['t', 450, 176, '\u53ea\u7559\u8fde\u5230\u9ad8\u7f6e\u4fe1\u79cd\u5b50\u7684\u533a\u57df\uff1b', 'xs'], ['t', 450, 190, '\u8fb9\u7f18\u8865\u9f50', 'xs']);
    F('hysteresis', {
      w: 540, h: 200, min: 480, items: it,
      cap: '\u540c\u4e00\u5f20\u53d8\u5316\u6982\u7387\u56fe\u7684\u4e09\u79cd\u540e\u5904\u7406\uff08\u793a\u610f\u6570\u503c\uff09\u3002\u6700\u5c0f\u56fe\u6591\u53bb\u6389\u96f6\u788e\u7684\u5c0f\u70b9\uff1b\u53cc\u9608\u503c\u751f\u957f\uff08\u9ad8\u9608\u503c\u627e\u79cd\u5b50\uff0c\u4f4e\u9608\u503c\u5f80\u5916\u957f\uff09\u65e2\u53bb\u6389\u5b64\u7acb\u7684\u4e2d\u7b49\u6982\u7387\u70b9\uff0c\u53c8\u628a\u8fde\u5728\u771f\u53d8\u5316\u4e0a\u7684\u8fb9\u7f18\u8865\u56de\u6765\u3002\u4ee3\u4ef7\u662f\uff1a\u771f\u6b63\u5f88\u5c0f\u7684\u53d8\u5316\u4e5f\u53ef\u80fd\u4e00\u8d77\u88ab\u53bb\u6389\u3002'
    });
  })();
})();
