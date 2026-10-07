/* \u7b2c 5 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u6309\u8bba\u6587\u6587\u5b57\u63cf\u8ff0\u548c\u516c\u5f00\u7ed3\u6784\u81ea\u7ed8\u7684\u793a\u610f\u56fe\uff0c\u6570\u503c\u4e3a\u793a\u610f\uff09\u3002 */
(function () {
  var F = window.TENM.fig;
  function rawRect(x, y, w, h, cls, op, rx) { return ['raw', '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + (rx ? ' rx="' + rx + '"' : '') + ' class="' + cls + '" style="fill-opacity:' + (op == null ? 0.55 : op) + '"/>']; }

  // 1. \u4eca\u5929\u7684\u8bba\u6587\u5168\u666f
  (function () {
    var cols = [
      ['\u5b6a\u751f CNN', 1, [['OSCD \u56fe\u5757\u7f51\u7edc', '2018', 1], ['FC-EF/FC-Siam', '2018', 0], ['STANet', '2020', 0], ['SNUNet-CD', '2021', 0]]],
      ['\u6ce8\u610f\u529b\u4e0e\u4ea4\u4e92', 5, [['BIT', '2021', 0], ['ChangeFormer', '2022', 0], ['Changer', '2023', 1]]],
      ['\u65b0\u9aa8\u5e72\u00b7\u5927\u6a21\u578b', 2, [['ChangeMamba', '2024', 1], ['BAN', '2024', 1], ['AnyChange', '2024 \u00b7 \u7b2c 6 \u5929', 2]]],
      ['\u8bed\u4e49\u53d8\u5316\u00b7\u5148\u9a8c', 4, [['MapFormer', '2023', 1], ['SCanNet', '2024', 1]]],
      ['\u5c11\u6807\u6ce8\u00b7\u751f\u6210', 3, [['ChangeStar', '2021', 0], ['DDPM-CD', '2025', 1], ['HySCDG', '2025', 1], ['ChangeBridge', '2026', 1]]]
    ];
    var it = [];
    cols.forEach(function (c, i) {
      var x = 6 + i * 106;
      it.push(['t', x + 50, 16, c[0], 'xs ink b']);
      c[2].forEach(function (p, j) {
        it.push(['r', x, 30 + j * 46, 100, 38, p[2] === 2 ? 0 : c[1], p[0] + '\n' + p[1], { tc: 'xs ink', bold: p[2] === 1 ? 1 : 0, dash: p[2] === 2 ? 1 : 0 }]);
      });
    });
    it.push(['t', 270, 232, '\u7c97\u6846\uff1a\u4eca\u5929\u7cbe\u8bfb\u6216\u901f\u8bfb\u7684\u8bba\u6587\u3000\u7ec6\u6846\uff1a\u7ecf\u5178\u5361\u7247\uff08\u901f\u89c8\uff09\u3000\u865a\u6846\uff1a\u4e4b\u540e\u7684\u5185\u5bb9', 'xs']);
    F('cd_family', {
      w: 540, h: 242, min: 480, items: it,
      cap: '\u7b2c 5 \u5929\u7684\u8bba\u6587\u6309\u201c\u6539\u7684\u662f\u4ec0\u4e48\u201d\u5206\u6210\u4e94\u5217\uff0c\u5927\u81f4\u4ece\u5de6\u5230\u53f3\u3001\u4ece\u65e9\u5230\u665a\u3002\u8bfb\u6bcf\u4e00\u7bc7\u90fd\u95ee\u4e09\u4e2a\u95ee\u9898\uff1a\u4e24\u671f\u5728\u7f51\u7edc\u7684\u54ea\u4e00\u6b65\u201c\u89c1\u9762\u201d\uff1f\u8f93\u51fa\u662f\u4ec0\u4e48\uff1f\u9700\u8981\u4ec0\u4e48\u6807\u7b7e\uff1f'
    });
  })();

  // 2. FC-EF / FC-Siam-conc / FC-Siam-diff
  (function () {
    var it = [];
    function panel(ox, title, mode) {
      it.push(['t', ox + 85, 12, title, 'sm ink b']);
      it.push(['r', ox + 12, 24, 64, 24, 3, 't1', { tc: 'sm ink' }], ['r', ox + 94, 24, 64, 24, 3, 't2', { tc: 'sm ink' }]);
      if (mode === 'ef') {
        it.push(['a', ox + 44, 48, ox + 72, 64, 'k'], ['a', ox + 126, 48, ox + 98, 64, 'k']);
        it.push(['r', ox + 40, 64, 90, 24, 5, '\u62fc\u6210 2C \u4e2a\u901a\u9053', { tc: 'xs ink' }]);
        it.push(['a', ox + 85, 88, ox + 85, 104, 'k']);
        it.push(['r', ox + 35, 104, 100, 30, 1, '\u7f16\u7801\u5668', { tc: 'xs ink' }]);
        it.push(['a', ox + 60, 134, ox + 60, 176, 'k']);
        it.push(['p', [ox + 135, 119, ox + 152, 119, ox + 152, 191, ox + 135, 191], 'o', { dash: 1 }]);
        it.push(['t', ox + 108, 155, '\u8df3\u8dc3\u8fde\u63a5', 'xs o']);
      } else {
        it.push(['a', ox + 44, 48, ox + 44, 70, 'k'], ['a', ox + 126, 48, ox + 126, 70, 'k']);
        it.push(['t', ox + 85, 59, '\u540c\u4e00\u5957\u6743\u91cd', 'xs']);
        it.push(['r', ox + 12, 70, 64, 44, 1, '\u7f16\u7801\u5668', { tc: 'xs ink' }], ['r', ox + 94, 70, 64, 44, 1, '\u7f16\u7801\u5668', { tc: 'xs ink' }]);
        it.push(['l', ox + 76, 92, ox + 94, 92, 'b', { dash: 1 }]);
        it.push(['a', ox + 44, 114, ox + 68, 136, 'o'], ['a', ox + 126, 114, ox + 102, 136, 'o']);
        it.push(['r', ox + 40, 136, 90, 26, 5, mode === 'conc' ? '\u62fc\u63a5 [F\u2081, F\u2082]' : '|F\u2081 \u2212 F\u2082|', { tc: 'xs ink' }]);
        it.push(['a', ox + 85, 162, ox + 85, 176, 'k']);
      }
      it.push(['r', ox + 35, 176, 100, 30, 2, '\u89e3\u7801\u5668', { tc: 'xs ink' }]);
      it.push(['a', ox + 85, 206, ox + 85, 222, 'k'], ['r', ox + 45, 222, 80, 24, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }]);
    }
    panel(0, 'FC-EF\uff1a\u65e9\u878d\u5408', 'ef'); panel(185, 'FC-Siam-conc', 'conc'); panel(370, 'FC-Siam-diff', 'diff');
    it.push(['l', 178, 20, 178, 250, 'm', { dash: 1, thin: 1 }], ['l', 363, 20, 363, 250, 'm', { dash: 1, thin: 1 }]);
    it.push(['t', 85, 262, '\u4e24\u671f\u4ece\u7b2c\u4e00\u5c42\u5c31\u6df7\u5728\u4e00\u8d77', 'xs'], ['t', 270, 262, '\u8df3\u8dc3\u91cc\u9001\u4e24\u671f\u7279\u5f81\u7684\u62fc\u63a5', 'xs'], ['t', 455, 262, '\u8df3\u8dc3\u91cc\u9001\u4e24\u671f\u7279\u5f81\u4e4b\u5dee', 'xs']);
    F('cd_struct', {
      w: 540, h: 272, min: 480, items: it,
      cap: '\u4e09\u79cd\u5168\u5377\u79ef\u53d8\u5316\u68c0\u6d4b\u7ed3\u6784\uff08\u6309 Daudt \u7b49 2018 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u4e09\u8005\u7684\u89e3\u7801\u5668\u548c\u8f93\u51fa\u4e00\u6837\uff0c\u533a\u522b\u53ea\u5728\u4e24\u671f\u5728\u54ea\u201c\u89c1\u9762\u201d\uff1aFC-EF \u5728\u8f93\u5165\u5c42\u628a\u4e24\u671f\u62fc\u6210 2C \u4e2a\u901a\u9053\uff1b\u4e24\u4e2a\u5b6a\u751f\u7248\u672c\u7528\u540c\u4e00\u5957\u6743\u91cd\u5206\u522b\u7f16\u7801\u4e24\u671f\uff0c\u5728\u6bcf\u4e2a\u5c3a\u5ea6\u7684\u8df3\u8dc3\u8fde\u63a5\u91cc\u9001\u8fdb\u4e24\u671f\u7279\u5f81\u7684\u62fc\u63a5\uff08conc\uff09\u6216\u5dee\u7684\u7edd\u5bf9\u503c\uff08diff\uff09\u3002'
    });
  })();

  // 3. \u56fe\u5757\u5206\u7c7b vs \u5168\u5377\u79ef
  (function () {
    var it = [['t', 135, 12, '\u56fe\u5757\u5206\u7c7b\uff08OSCD \u539f\u6587\uff09', 'sm ink b'], ['t', 405, 12, '\u5168\u5377\u79ef\uff08FC-EF / FC-Siam\uff09', 'sm ink b']];
    it.push(['g', 14, 30, 7, 6, 14, 14, 0]);
    it.push(['raw', '<rect x="42" y="44" width="42" height="42" class="ln lo" style="fill:none"/>'], rawRect(56, 58, 14, 14, 'fv', 0.7));
    it.push(['a', 112, 65, 132, 65, 'k'], ['r', 132, 48, 52, 34, 1, 'CNN', { tc: 'xs ink' }], ['a', 184, 65, 200, 65, 'k'], ['r', 200, 46, 64, 38, 4, '\u4e2d\u5fc3\u50cf\u5143\n\u53d8 / \u4e0d\u53d8', { tc: 'xs ink' }]);
    it.push(['t', 135, 134, '\u6ed1\u52a8\u53d6\u5757\uff1a\u6bcf\u4e2a\u5c0f\u5757\u8dd1\u4e00\u6b21\u7f51\u7edc', 'xs ink']);
    it.push(['t', 135, 152, '\u76f8\u90bb\u5c0f\u5757\u5927\u90e8\u5206\u91cd\u53e0 \u2192 \u91cd\u590d\u8ba1\u7b97\uff1b\u51fa\u56fe\u6709\u5757\u72b6\u611f', 'xs']);
    it.push(['l', 270, 22, 270, 160, 'm', { dash: 1, thin: 1 }]);
    it.push(['g', 284, 30, 7, 6, 14, 14, 0]);
    it.push(['a', 382, 72, 398, 72, 'k'], ['r', 398, 55, 52, 34, 1, 'U-Net', { tc: 'xs ink' }], ['a', 450, 72, 462, 72, 'k']);
    var on = { 8: 1, 9: 1, 13: 1, 14: 1, 22: 1, 27: 1 };
    for (var r = 0; r < 6; r++) for (var c = 0; c < 5; c++) { var k = r * 5 + c; it.push(on[k] ? rawRect(462 + c * 14, 30 + r * 14, 14, 14, 'cell fv', 0.75) : ['r', 462 + c * 14, 30 + r * 14, 14, 14, 0, '', { rx: 0 }]); }
    it.push(['t', 405, 134, '\u6574\u5f20\u56fe\u4e00\u6b21\u524d\u5411\uff0c\u76f4\u63a5\u51fa\u6574\u5f20\u53d8\u5316\u56fe', 'xs ink']);
    it.push(['t', 405, 152, '\u76f8\u90bb\u4f4d\u7f6e\u5171\u4eab\u5377\u79ef\u8ba1\u7b97\uff1b\u50cf\u5143\u7ea7\u6807\u7b7e\u5168\u90e8\u7528\u4e0a', 'xs']);
    F('patch_vs_fcn', {
      w: 540, h: 164, min: 480, items: it,
      cap: '\u5de6\uff1aOSCD \u539f\u6587\u7684\u56fe\u5757\u5206\u7c7b\u2014\u2014\u4ee5\u50cf\u5143\u4e3a\u4e2d\u5fc3\u5207 15\u00d715 \u7684\u5c0f\u5757\uff0c\u5224\u65ad\u4e2d\u5fc3\u50cf\u5143\u53d8\u6ca1\u53d8\uff0c\u51fa\u56fe\u65f6\u6309\u6b65\u957f\u53d6\u5757\u3001\u7528\u9ad8\u65af\u52a0\u6743\u6295\u7968\u62fc\u6210\u6574\u56fe\u3002\u53f3\uff1a\u540c\u5e74\u7684\u5168\u5377\u79ef\u7f51\u7edc\u4e00\u6b21\u524d\u5411\u8f93\u51fa\u6574\u5f20\u53d8\u5316\u56fe\uff0c\u8ba1\u7b97\u5171\u4eab\u3001\u6ca1\u6709\u5757\u72b6\u611f\u3002'
    });
  })();

  // 4. BIT
  (function () {
    var it = [
      ['r', 8, 24, 44, 30, 3, 't1', { tc: 'sm ink' }], ['r', 8, 196, 44, 30, 3, 't2', { tc: 'sm ink' }],
      ['a', 52, 39, 66, 39, 'k'], ['a', 52, 211, 66, 211, 'k'],
      ['r', 66, 22, 58, 34, 1, 'CNN', { tc: 'xs ink' }], ['r', 66, 194, 58, 34, 1, 'CNN', { tc: 'xs ink' }],
      ['t', 95, 125, '\u5171\u4eab\u6743\u91cd', 'xs'],
      ['a', 124, 39, 138, 39, 'k'], ['a', 124, 211, 138, 211, 'k'],
      ['r', 138, 22, 40, 34, 1, 'X\u2081', { tc: 'sm ink' }], ['r', 138, 194, 40, 34, 1, 'X\u2082', { tc: 'sm ink' }],
      ['a', 178, 39, 372, 39, 'k'], ['t', 290, 28, '\u6bcf\u4e2a\u50cf\u5143\u7684\u7279\u5f81\uff08\u4f5c query\uff09', 'xs'],
      ['a', 178, 211, 372, 211, 'k'], ['t', 290, 222, '\u6bcf\u4e2a\u50cf\u5143\u7684\u7279\u5f81\uff08\u4f5c query\uff09', 'xs'],
      ['a', 158, 56, 158, 76, 'b'], ['a', 158, 194, 158, 174, 'b'],
      ['r', 116, 76, 84, 28, 1, 'tokenizer', { tc: 'xs ink' }], ['r', 116, 146, 84, 28, 1, 'tokenizer', { tc: 'xs ink' }],
      ['a', 200, 90, 210, 90, 'b'], ['a', 200, 160, 210, 160, 'b'],
      ['t', 236, 76, 'T\u2081', 'xs w'], ['t', 236, 176, 'T\u2082', 'xs s'],
      ['t', 232, 120, '\u6bcf\u671f\u538b\u6210\n4 \u4e2a token', 'xs'],
      ['a', 264, 90, 274, 100, 'k'], ['a', 264, 160, 274, 150, 'k'],
      ['r', 274, 84, 84, 82, 5, 'Transformer\n\u7f16\u7801\u5668\n2L \u4e2a token\n\u4e92\u76f8\u6ce8\u610f', { tc: 'xs ink' }],
      ['a', 358, 100, 408, 56, 'k'], ['t', 394, 82, "T\u2081\u2032", 'xs'],
      ['a', 358, 150, 408, 194, 'k'], ['t', 394, 168, "T\u2082\u2032", 'xs'],
      ['r', 372, 22, 76, 34, 2, 'Transformer\n\u89e3\u7801\u5668', { tc: 'xs ink' }], ['r', 372, 194, 76, 34, 2, 'Transformer\n\u89e3\u7801\u5668', { tc: 'xs ink' }],
      ['p', [448, 39, 496, 39, 496, 100], 'k'], ['p', [448, 211, 496, 211, 496, 150], 'k'],
      ['r', 456, 100, 80, 50, 4, "|X\u2081\u2032 \u2212 X\u2082\u2032|\n\u2192 \u9884\u6d4b\u5934\n\u2192 \u53d8\u5316\u56fe", { tc: 'xs ink' }],
      ['t', 270, 244, '\u6ce8\u610f\u529b\u53ea\u5728 2L \u4e2a token \u4e4b\u95f4\u505a\uff1aL = 4 \u65f6\u662f 8 \u00d7 8 = 64 \u5bf9\uff1b', 'xs ink'], ['t', 270, 260, '\u82e5\u5728 64\u00d764 \u7684\u4e24\u671f\u50cf\u5143\u4e4b\u95f4\u505a\u5168\u6ce8\u610f\u529b\uff0c\u662f 8192\u00b2 \u2248 6700 \u4e07\u5bf9', 'xs ink']
    ];
    for (var k = 0; k < 4; k++) { it.push(['raw', '<rect x="' + (212 + k * 13) + '" y="85" width="10" height="10" rx="2" class="bx k1"/>'], ['raw', '<rect x="' + (212 + k * 13) + '" y="155" width="10" height="10" rx="2" class="bx k3"/>']); }
    F('bit_tokens', {
      w: 540, h: 272, min: 500, items: it,
      cap: 'BIT \u7684\u6570\u636e\u6d41\uff08\u6309 Chen \u7b49 2021 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002CNN \u5f97\u5230\u4e24\u671f\u7279\u5f81\u56fe\u540e\uff0c\u8bed\u4e49 tokenizer \u7528 L \u5f20\u7a7a\u95f4\u6ce8\u610f\u529b\u56fe\u628a\u6bcf\u671f\u6982\u62ec\u6210 L \u4e2a token\uff1b\u4e24\u671f\u7684 2L \u4e2a token \u4e00\u8d77\u8fc7 Transformer \u7f16\u7801\u5668\u4e92\u76f8\u53c2\u8003\uff1b\u89e3\u7801\u5668\u91cc\u6bcf\u4e2a\u50cf\u5143\u7684\u7279\u5f81\u5f53 query \u53bb\u8bfb\u672c\u671f\u7cbe\u70bc\u540e\u7684 token\uff0c\u628a\u5168\u5c40\u4e0a\u4e0b\u6587\u5e26\u56de\u50cf\u5143\uff1b\u6700\u540e\u4e24\u671f\u76f8\u51cf\u3001\u8fc7\u9884\u6d4b\u5934\u3002'
    });
  })();

  // 5. ChangeFormer
  (function () {
    var it = [['r', 8, 28, 48, 24, 3, 't1', { tc: 'sm ink' }], ['r', 8, 52, 48, 24, 3, 't2', { tc: 'sm ink' }]];
    var xs = [76, 176, 276, 376], sc = ['1/4', '1/8', '1/16', '1/32'];
    it.push(['a', 56, 40, 76, 40, 'k'], ['a', 56, 64, 76, 64, 'k']);
    xs.forEach(function (x, i) {
      it.push(['t', x + 32, 14, '\u9636\u6bb5 ' + (i + 1) + ' \u00b7 ' + sc[i], 'xs ink']);
      it.push(['r', x, 28, 64, 24, 1, 'F\u2081', { tc: 'sm ink', rx: 0 }], ['r', x, 52, 64, 24, 1, 'F\u2082', { tc: 'sm ink', rx: 0 }]);
      it.push(['a', x + 32, 76, x + 32, 100, 'k']);
      it.push(['r', x + 6, 100, 52, 32, 5, '\u5dee\u5f02\n\u6a21\u5757', { tc: 'xs ink' }]);
      it.push(['a', x + 32, 132, x + 32, 160, 'k']);
      if (i < 3) it.push(['a', x + 64, 40, x + 100, 40, 'k'], ['a', x + 64, 64, x + 100, 64, 'k']);
    });
    it.push(['r', 60, 160, 400, 36, 2, 'MLP \u89e3\u7801\u5668\uff1a\u7edf\u4e00\u901a\u9053 \u2192 \u4e0a\u91c7\u6837\u5230 1/4 \u2192 \u62fc\u63a5 \u2192 \u878d\u5408', { tc: 'xs ink' }]);
    it.push(['a', 460, 178, 480, 178, 'k'], ['r', 480, 162, 54, 32, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }]);
    it.push(['t', 270, 216, '\u5dee\u5f02\u6a21\u5757 = \u62fc\u63a5\u4e24\u671f \u2192 3\u00d73 \u5377\u79ef \u2192 ReLU \u2192 BN\uff1a\u8ba9\u7f51\u7edc\u81ea\u5df1\u5b66\u201c\u600e\u4e48\u6bd4\u201d\uff0c\u800c\u4e0d\u662f\u56fa\u5b9a\u76f8\u51cf', 'xs ink']);
    it.push(['t', 270, 236, '\u7f16\u7801\u5668\uff1a\u4e24\u671f\u5171\u4eab\u6743\u91cd\u7684\u5c42\u7ea7 Transformer\uff08\u548c SegFormer \u540c\u4e00\u7c7b\u7ed3\u6784\uff09', 'xs']);
    F('cformer', {
      w: 540, h: 248, min: 480, items: it,
      cap: 'ChangeFormer\uff08\u6309 Bandara \u4e0e Patel 2022 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u5b6a\u751f\u7684\u5c42\u7ea7 Transformer \u7f16\u7801\u5668\u5728\u56db\u4e2a\u5c3a\u5ea6\u4e0a\u5404\u5f97\u5230\u4e00\u5bf9\u7279\u5f81\uff0c\u6bcf\u4e2a\u5c3a\u5ea6\u4e00\u4e2a\u5dee\u5f02\u6a21\u5757\uff0c\u56db\u4e2a\u5c3a\u5ea6\u7684\u5dee\u5f02\u7279\u5f81\u4ea4\u7ed9\u8f7b\u91cf\u7684 MLP \u89e3\u7801\u5668\u878d\u5408\u6210\u53d8\u5316\u56fe\u3002'
    });
  })();

  // 6. MetaChanger
  (function () {
    var it = [['r', 6, 30, 34, 28, 3, 't1', { tc: 'sm ink' }], ['r', 6, 150, 34, 28, 3, 't2', { tc: 'sm ink' }]];
    var xs = [50, 130, 210, 290], ex = [null, '\u7a7a\u95f4\n\u4ea4\u6362', '\u901a\u9053\n\u4ea4\u6362', '\u901a\u9053\n\u4ea4\u6362'];
    it.push(['a', 40, 44, 50, 44, 'k'], ['a', 40, 164, 50, 164, 'k']);
    xs.forEach(function (x, i) {
      it.push(['r', x, 30, 46, 28, 1, '\u9636\u6bb5 ' + (i + 1), { tc: 'xs ink' }], ['r', x, 150, 46, 28, 1, '\u9636\u6bb5 ' + (i + 1), { tc: 'xs ink' }]);
      var nx = x + 46, end = i < 3 ? xs[i + 1] : 372;
      it.push(['a', nx, 44, end, 44, 'k'], ['a', nx, 164, end, 164, 'k']);
      if (ex[i]) { var cx = nx + (end - nx) / 2; it.push(['l', cx, 44, cx, 76, 'o', { dash: 1 }], ['l', cx, 124, cx, 164, 'o', { dash: 1 }], ['r', cx - 15, 76, 30, 48, 5, ex[i], { tc: 'xs ink' }]); }
    });
    it.push(['t', 96, 100, '\u4ea4\u4e92\u5c42\uff08\u53ef\u66ff\u6362\uff09\u2192', 'xs o']);
    it.push(['r', 372, 28, 50, 32, 2, 'MLP\n\u89e3\u7801', { tc: 'xs ink' }], ['r', 372, 148, 50, 32, 2, 'MLP\n\u89e3\u7801', { tc: 'xs ink' }]);
    it.push(['a', 422, 44, 461, 78, 'k'], ['a', 422, 164, 461, 122, 'k']);
    it.push(['r', 436, 78, 50, 44, 5, 'FDAF\n\u878d\u5408', { tc: 'xs ink' }]);
    it.push(['a', 486, 100, 496, 100, 'k'], ['r', 496, 86, 40, 28, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }]);
    it.push(['t', 270, 200, '\u4ea4\u4e92\u5c42\uff1a\u6052\u7b49\uff08Vanilla\uff09\uff5c\u805a\u5408-\u5206\u53d1\u901a\u9053\u6ce8\u610f\u529b\uff08AD\uff09\uff5c\u7a7a\u95f4 / \u901a\u9053\u4ea4\u6362\uff08Ex\uff0c\u96f6\u53c2\u6570\uff09', 'xs ink']);
    it.push(['t', 270, 218, '\u878d\u5408\u5c42\uff1a\u62fc\u63a5\uff08Vanilla\uff09\uff5cFDAF\uff08\u5148\u6309\u4f30\u8ba1\u7684\u504f\u79fb\u5bf9\u9f50\uff0c\u518d\u76f8\u51cf\uff09', 'xs ink']);
    it.push(['t', 270, 236, '\u9636\u6bb5 1 \u4e4b\u540e\u4e0d\u4ea4\u4e92\uff1a\u6d45\u5c42\u4e3b\u8981\u662f\u8f90\u5c04\u548c\u7eb9\u7406\uff0c\u4ea4\u6362\u6ca1\u6709\u597d\u5904\uff08\u6d88\u878d\uff09', 'xs']);
    F('changer_meta', {
      w: 540, h: 246, min: 480, items: it,
      cap: 'MetaChanger \u6846\u67b6\u548c ChangerEx \u7684\u5177\u4f53\u914d\u7f6e\uff08\u6309 Fang \u7b49 2023 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u5171\u4eab\u6743\u91cd\u7684\u7f16\u7801\u5668\u6bcf\u4e2a\u9636\u6bb5\u4e4b\u540e\u53ef\u63d2\u4e00\u4e2a\u4ea4\u4e92\u5c42\uff0c\u6362\u6210\u4e0d\u540c\u7684\u4ea4\u4e92\u5c42\u548c\u878d\u5408\u5c42\u5c31\u5f97\u5230\u4e0d\u540c\u7684\u6a21\u578b\u3002\u56fe\u4e2d\u662f ChangerEx\uff1a\u9636\u6bb5 2 \u540e\u7a7a\u95f4\u4ea4\u6362\uff0c\u9636\u6bb5 3\u30014 \u540e\u901a\u9053\u4ea4\u6362\uff0c\u6700\u540e\u4e24\u652f\u5404\u81ea MLP \u89e3\u7801\uff0c\u518d\u7531 FDAF \u878d\u5408\u3002'
    });
  })();

  // 7. \u4ea4\u6362\u4e0d\u4e22\u5dee\u5f02
  (function () {
    var it = [['t', 135, 12, '\u7a7a\u95f4\u4ea4\u6362\uff1a\u9694\u5217\u4e92\u6362', 'sm ink b'], ['t', 405, 12, '\u901a\u9053\u4ea4\u6362\uff1a\u9694\u901a\u9053\u4e92\u6362', 'sm ink b']];
    function cells(x0, y0, colorOf) { for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) it.push(rawRect(x0 + c * 12, y0 + r * 12, 12, 12, 'cell ' + colorOf(c), 0.55)); }
    function chans(x0, y0, colorOf) { for (var k = 0; k < 6; k++) it.push(rawRect(x0 + k * 11, y0, 9, 48, colorOf(k), 0.6, 2)); }
    var A = 'fw', B = 'fs';
    cells(40, 30, function () { return A; }); cells(40, 100, function () { return B; });
    it.push(['t', 32, 54, 'F\u2081', 'sm ink', 'end'], ['t', 32, 124, 'F\u2082', 'sm ink', 'end']);
    it.push(['a', 116, 54, 160, 54, 'k'], ['a', 116, 124, 160, 124, 'k'], ['a', 118, 64, 158, 114, 'o', { dash: 1, thin: 1 }], ['a', 118, 114, 158, 64, 'o', { dash: 1, thin: 1 }]);
    cells(164, 30, function (c) { return c % 2 === 0 ? B : A; }); cells(164, 100, function (c) { return c % 2 === 0 ? A : B; });
    it.push(['t', 242, 54, '\u8f93\u51fa\u2081', 'xs ink', 'start'], ['t', 242, 124, '\u8f93\u51fa\u2082', 'xs ink', 'start']);
    chans(320, 30, function () { return A; }); chans(320, 100, function () { return B; });
    it.push(['t', 312, 54, 'F\u2081', 'sm ink', 'end'], ['t', 312, 124, 'F\u2082', 'sm ink', 'end']);
    it.push(['a', 388, 54, 420, 54, 'k'], ['a', 388, 124, 420, 124, 'k'], ['a', 390, 64, 418, 114, 'o', { dash: 1, thin: 1 }], ['a', 390, 114, 418, 64, 'o', { dash: 1, thin: 1 }]);
    chans(424, 30, function (k) { return k % 2 === 0 ? B : A; }); chans(424, 100, function (k) { return k % 2 === 0 ? A : B; });
    it.push(['t', 494, 54, '\u8f93\u51fa\u2081', 'xs ink', 'start'], ['t', 494, 124, '\u8f93\u51fa\u2082', 'xs ink', 'start']);
    it.push(['t', 135, 160, '\u84dd = \u6765\u81ea t1\uff0c\u8d6d = \u6765\u81ea t2', 'xs'], ['t', 405, 160, '\u6bcf\u4e00\u7ad6\u6761\u4ee3\u8868\u4e00\u4e2a\u901a\u9053\uff08\u4e00\u6574\u5f20\u7279\u5f81\u56fe\uff09', 'xs']);
    it.push(['r', 14, 174, 512, 52, 0, '', {}]);
    it.push(['t', 270, 190, '\u8f93\u51fa\u2081 = M\u00b7F\u2081 + (1 \u2212 M)\u00b7F\u2082\uff0c\u3000\u8f93\u51fa\u2082 = M\u00b7F\u2082 + (1 \u2212 M)\u00b7F\u2081\u3000\uff08M \u662f 0/1 \u63a9\u819c\uff09', 'xs ink']);
    it.push(['t', 270, 210, '\u21d2 \u8f93\u51fa\u2081 \u2212 \u8f93\u51fa\u2082 = (2M \u2212 1)\u00b7(F\u2081 \u2212 F\u2082)\uff1a\u5dee\u7684\u7edd\u5bf9\u503c\u548c\u4ea4\u6362\u524d\u4e00\u6a21\u4e00\u6837', 'xs ink b']);
    F('changer_ex', {
      w: 540, h: 234, min: 480, items: it,
      cap: 'ChangerEx \u7684\u4e24\u79cd\u4ea4\u6362\uff08\u793a\u610f\uff09\u3002\u4ea4\u6362\u53ea\u662f\u6309\u63a9\u819c\u91cd\u65b0\u5206\u914d\u4e24\u671f\u7684\u7279\u5f81\uff0c\u5728\u4ea4\u6362\u7684\u8fd9\u4e00\u5c42\uff0c\u6bcf\u4e2a\u4f4d\u7f6e\u4e24\u652f\u4e4b\u5dee\u7684\u7edd\u5bf9\u503c\u4e0d\u53d8\uff0c\u53d8\u5316\u4fe1\u606f\u4e00\u70b9\u6ca1\u4e22\uff1b\u53d8\u7684\u662f\u540e\u9762\u7684\u5377\u79ef\u2014\u2014\u5b83\u5728\u4e00\u4e2a\u90bb\u57df\u91cc\u3001\u6216\u540c\u4e00\u4f4d\u7f6e\u7684\u4e0d\u540c\u901a\u9053\u91cc\uff0c\u540c\u65f6\u770b\u5230\u4e86\u4e24\u671f\u7684\u7279\u5f81\u3002'
    });
  })();

  // 8. FDAF
  F('fdaf', {
    w: 540, h: 208, min: 480,
    cap: 'FDAF\uff1a\u57fa\u4e8e\u5149\u6d41\u7684\u53cc\u5411\u5bf9\u9f50\u878d\u5408\uff08\u6309 Changer \u8bba\u6587\u5f0f 8\u20139 \u81ea\u7ed8\uff09\u3002\u5c0f\u5377\u79ef\u7f51\u7edc\u4ece\u62fc\u63a5\u7684\u4e24\u671f\u7279\u5f81\u9884\u6d4b\u4e24\u7ec4\u504f\u79fb\u573a\uff0cF\u2081 \u632a\u52a8\u540e\u5bf9\u9f50\u5230 F\u2082 \u518d\u51cf\u53bb F\u2082\uff0cF\u2082 \u632a\u52a8\u540e\u5bf9\u9f50\u5230 F\u2081 \u518d\u51cf\u53bb F\u2081\uff0c\u4e24\u4e2a\u5dee\u62fc\u63a5\u540e\u8f93\u51fa\u3002',
    items: [
      ['r', 8, 30, 50, 30, 1, 'F\u2081', { tc: 'sm ink' }], ['r', 8, 120, 50, 30, 3, 'F\u2082', { tc: 'sm ink' }],
      ['a', 58, 50, 96, 80, 'k'], ['a', 58, 130, 96, 100, 'k'],
      ['r', 96, 70, 84, 40, 5, '\u5c0f\u5377\u79ef\u7f51\u7edc\n\u9884\u6d4b\u4e24\u7ec4\u504f\u79fb', { tc: 'xs ink' }],
      ['a', 180, 82, 230, 50, 'o'], ['t', 196, 58, '\u0394\u2081', 'sm o'],
      ['a', 180, 98, 230, 130, 'o'], ['t', 196, 124, '\u0394\u2082', 'sm o'],
      ['p', [33, 30, 33, 16, 273, 16, 273, 26], 'b'], ['p', [33, 150, 33, 166, 273, 166, 273, 152], 's'],
      ['r', 230, 26, 86, 36, 1, '\u6309 \u0394\u2081 \u632a\u52a8 F\u2081\n\uff08\u5bf9\u9f50\u5230 F\u2082\uff09', { tc: 'xs ink' }],
      ['r', 230, 116, 86, 36, 3, '\u6309 \u0394\u2082 \u632a\u52a8 F\u2082\n\uff08\u5bf9\u9f50\u5230 F\u2081\uff09', { tc: 'xs ink' }],
      ['a', 316, 44, 336, 44, 'k'], ['a', 316, 134, 336, 134, 'k'],
      ['r', 336, 26, 70, 36, 5, '\u51cf\u53bb F\u2082', { tc: 'xs ink' }], ['r', 336, 116, 70, 36, 5, '\u51cf\u53bb F\u2081', { tc: 'xs ink' }],
      ['a', 406, 44, 455, 70, 'k'], ['a', 406, 134, 455, 110, 'k'],
      ['r', 430, 70, 50, 40, 2, '\u62fc\u63a5', { tc: 'xs ink' }],
      ['a', 480, 90, 494, 90, 'k'], ['r', 494, 76, 42, 28, 4, '\u8f93\u51fa', { tc: 'xs ink' }],
      ['t', 270, 184, '\u4e24\u671f\u6709\u534a\u4e2a\u50cf\u5143\u7684\u9519\u4f4d\u65f6\uff1a\u76f4\u63a5\u76f8\u51cf\uff0c\u5730\u7269\u8fb9\u7f18\u4f1a\u51fa\u73b0\u4e00\u5708\u5047\u5dee\u5f02\uff1b', 'xs ink'],
      ['t', 270, 200, '\u5148\u4f30\u8ba1\u504f\u79fb\u3001\u5bf9\u9f50\u540e\u518d\u51cf\uff0c\u5047\u5dee\u5f02\u53d8\u5c0f\uff08\u8fd9\u662f FDAF \u7684\u52a8\u673a\uff0c\u5bf9 10 m \u5f71\u50cf\u7684\u6536\u76ca\u8981\u81ea\u5df1\u9a8c\u8bc1\uff09', 'xs']
    ]
  });

  // 9. ChangeMamba \u7684\u4e09\u79cd\u4e24\u671f\u6392\u5217
  (function () {
    var it = [];
    function cell(x, y, w, h, cls, t) { it.push(rawRect(x, y, w, h, 'cell ' + cls, 0.5)); if (t) it.push(['t', x + w / 2, y + h / 2, t, 'xs ink']); }
    var L = ['a', 'b', 'c', 'd'];
    it.push(['t', 36, 28, 't1 \u7279\u5f81', 'xs ink b'], ['t', 36, 108, 't2 \u7279\u5f81', 'xs ink b']);
    L.forEach(function (l, i) { cell(14 + (i % 2) * 22, 38 + Math.floor(i / 2) * 22, 22, 22, 'fw', l + '\u2081'); cell(14 + (i % 2) * 22, 118 + Math.floor(i / 2) * 22, 22, 22, 'fs', l + '\u2082'); });
    var x0 = 128;
    it.push(['t', 96, 41, '\u5148\u540e', 'xs ink b'], ['t', 96, 99, '\u4ea4\u9519', 'xs ink b'], ['t', 96, 168, '\u5e76\u884c', 'xs ink b']);
    ['a\u2081', 'b\u2081', 'c\u2081', 'd\u2081', 'a\u2082', 'b\u2082', 'c\u2082', 'd\u2082'].forEach(function (t, i) { cell(x0 + i * 22, 30, 22, 22, i < 4 ? 'fw' : 'fs', t); });
    ['a\u2081', 'a\u2082', 'b\u2081', 'b\u2082', 'c\u2081', 'c\u2082', 'd\u2081', 'd\u2082'].forEach(function (t, i) { cell(x0 + i * 22, 88, 22, 22, i % 2 === 0 ? 'fw' : 'fs', t); });
    L.forEach(function (l, i) { cell(x0 + i * 22, 146, 22, 22, 'fw', l + '\u2081'); cell(x0 + i * 22, 168, 22, 22, 'fs', l + '\u2082'); });
    it.push(['a', x0, 59, x0 + 176, 59, 'm', { thin: 1 }], ['a', x0, 117, x0 + 176, 117, 'm', { thin: 1 }], ['a', x0, 197, x0 + 88, 197, 'm', { thin: 1 }]);
    it.push(['t', x0 + 132, 208, 'SSM \u6309\u7bad\u5934\u65b9\u5411\u8bfb', 'xs']);
    it.push(['a', 304, 41, 316, 41, 'k'], ['a', 304, 99, 316, 99, 'k'], ['a', 216, 168, 316, 168, 'k']);
    it.push(['r', 316, 26, 64, 30, 1, 'VSS \u5757', { tc: 'xs ink' }], ['r', 316, 84, 64, 30, 1, 'VSS \u5757', { tc: 'xs ink' }], ['r', 316, 153, 64, 30, 1, 'VSS \u5757', { tc: 'xs ink' }]);
    it.push(['a', 380, 41, 424, 76, 'k'], ['a', 380, 99, 400, 102, 'k'], ['a', 380, 168, 424, 128, 'k']);
    it.push(['r', 400, 76, 56, 52, 5, '\u878d\u5408', { tc: 'xs ink' }], ['a', 456, 102, 470, 102, 'k'], ['r', 470, 86, 64, 32, 4, '\u53d8\u5316\u7279\u5f81', { tc: 'xs ink' }]);
    it.push(['t', 270, 226, '\u4e00\u79cd\u89e3\u91ca\uff1aSSM \u53ea\u201c\u8bb0\u5f97\u524d\u9762\u8bfb\u8fc7\u7684\u201d\uff1b\u4ea4\u9519\u6392\u5217\u8ba9\u6bcf\u4e2a t2 token', 'xs ink'], ['t', 270, 242, '\u7d27\u8ddf\u5728\u540c\u4e00\u4f4d\u7f6e\u7684 t1 token \u540e\u9762\uff0c\u4e24\u671f\u6bd4\u8f83\u7684\u8ddd\u79bb\u6700\u77ed', 'xs ink']);
    F('stss', {
      w: 540, h: 252, min: 480, items: it,
      cap: 'ChangeMamba \u89e3\u7801\u5668\u91cc\u7684\u65f6\u7a7a\u72b6\u6001\u7a7a\u95f4\u5757\uff08\u6309 Chen \u7b49 2024 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff0c2\u00d72 \u7684\u7279\u5f81\u56fe\u53ea\u662f\u793a\u610f\uff09\u3002\u540c\u4e00\u7ec4\u4e24\u671f token \u6309\u4e09\u79cd\u987a\u5e8f\u6392\u7ed9\u72b6\u6001\u7a7a\u95f4\u6a21\u578b\uff1a\u5148\u540e\u3001\u4ea4\u9519\u3001\u5e76\u884c\uff08\u901a\u9053\u62fc\u63a5\uff09\uff0c\u5404\u8fc7\u4e00\u4e2a VSS \u5757\u540e\u878d\u5408\u3002\u6d88\u878d\uff1a\u4e09\u79cd\u5355\u72ec\u7528\u90fd\u6bd4\u4e0d\u505a\u65f6\u7a7a\u5efa\u6a21\u597d\uff0c\u4ea4\u9519\u7565\u4f18\uff0c\u5408\u8d77\u6765\u6700\u597d\u3002'
    });
  })();

  // 10. BAN
  F('ban_bridge', {
    w: 540, h: 222, min: 480,
    cap: 'BAN\uff08\u6309 Li \u7b49 2024 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u51bb\u7ed3\u7684\u57fa\u7840\u6a21\u578b\u53ea\u505a\u524d\u5411\u3001\u63d0\u4f9b\u901a\u7528\u7279\u5f81\uff1b\u6865\u63a5\u6a21\u5757\u5728\u591a\u4e2a\u5c42\u7ea7\u628a\u8fd9\u4e9b\u7279\u5f81\u6311\u9009\u3001\u4e0a\u91c7\u6837\u540e\u6ce8\u5165\u53ef\u8bad\u7ec3\u7684 Bi-TAB\uff1bBi-TAB \u53ef\u4ee5\u662f\u4efb\u610f\u73b0\u6210\u7684\u53d8\u5316\u68c0\u6d4b\u6a21\u578b\uff0c\u7531\u5b83\u8f93\u51fa\u53d8\u5316\u56fe\u3002\u57fa\u7840\u6a21\u578b\u5206\u652f\u7684\u8f93\u5165\u7f29\u653e\u5230\u5b83\u9884\u8bad\u7ec3\u65f6\u7684\u5c3a\u5bf8\uff0cBi-TAB \u7528\u4efb\u52a1\u539f\u5206\u8fa8\u7387\uff08\u975e\u5bf9\u79f0\u8f93\u5165\uff09\u3002',
    items: [
      ['r', 8, 94, 50, 40, 3, 't1\u3001t2', { tc: 'xs ink' }],
      ['p', [33, 94, 33, 44, 90, 44], 'k'], ['t', 62, 34, '\u7f29\u5230 224', 'xs'],
      ['r', 90, 24, 300, 40, 0, '\u51bb\u7ed3\u7684\u57fa\u7840\u6a21\u578b\uff08\u5982 CLIP ViT-L/14\uff09\uff0c\u4e24\u671f\u5404\u524d\u5411\u4e00\u6b21', { tc: 'xs ink', dash: 1 }],
      ['a', 150, 64, 150, 90, 'm'], ['a', 240, 64, 240, 90, 'm'], ['a', 330, 64, 330, 90, 'm'],
      ['r', 122, 90, 56, 30, 5, '\u6865\u63a5', { tc: 'xs ink' }], ['r', 212, 90, 56, 30, 5, '\u6865\u63a5', { tc: 'xs ink' }], ['r', 302, 90, 56, 30, 5, '\u6865\u63a5', { tc: 'xs ink' }],
      ['a', 150, 120, 150, 146, 'o'], ['a', 240, 120, 240, 146, 'o'], ['a', 330, 120, 330, 146, 'o'],
      ['p', [33, 134, 33, 166, 90, 166], 'k'], ['t', 62, 178, '\u539f\u5206\u8fa8\u7387', 'xs'],
      ['r', 90, 146, 300, 40, 2, 'Bi-TAB\uff1a\u53ef\u8bad\u7ec3\u7684\u53d8\u5316\u68c0\u6d4b\u6a21\u578b\uff08\u53ef\u653e BIT \u7b49\uff09', { tc: 'xs ink' }],
      ['a', 390, 166, 420, 166, 'k'], ['r', 420, 150, 64, 32, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }],
      ['t', 404, 34, '\u51bb\u7ed3\uff1a\u53ea\u524d\u5411\u3001\u4e0d\u66f4\u65b0', 'xs', 'start'], ['t', 404, 52, '\u8bad\u7ec3\uff1a\u6865\u63a5 + Bi-TAB', 'xs', 'start'],
      ['t', 404, 96, 'IoU \u5e73\u5747 +4 \u4e2a\u70b9', 'xs g', 'start'], ['t', 404, 114, '\u8ba1\u7b97\u91cf\u7ea6 \u00d710\u201330', 'xs o', 'start'],
      ['t', 240, 206, '\u6865\u63a5\uff1a\u7528\u76f8\u4f3c\u5ea6\u6ce8\u610f\u529b\u6311\u51fa\u6709\u7528\u7684\u5927\u6a21\u578b\u7279\u5f81\uff0c\u4e0a\u91c7\u6837\u5230 Bi-TAB \u7684\u5206\u8fa8\u7387\uff0c\u6b8b\u5dee\u76f8\u52a0', 'xs ink']
    ]
  });

  // 11. SCanNet
  F('scannet', {
    w: 540, h: 222, min: 480,
    cap: 'SCanNet\uff08\u6309 Ding \u7b49 2024 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u4e09\u5206\u652f\u7f16\u7801\u5668-\u89e3\u7801\u5668\u5206\u522b\u5f97\u5230\u4e24\u671f\u8bed\u4e49\u7279\u5f81\u548c\u53d8\u5316\u7279\u5f81\uff0cSCanFormer \u628a\u4e09\u8def\u7279\u5f81\u62fc\u6210\u4e00\u7ec4 token \u505a\u8054\u5408\u81ea\u6ce8\u610f\u529b\uff0c\u518d\u62c6\u56de\u4e09\u8def\uff0c\u8f93\u51fa\u6bcf\u4e2a\u50cf\u5143\u7684\u4e24\u671f\u8bed\u4e49\u56fe\u548c\u53d8\u5316\u56fe\uff1b\u6700\u540e\u7528\u53d8\u5316\u56fe\u5f53\u63a9\u819c\uff0c\u5f97\u5230\u4e24\u5f20\u8bed\u4e49\u53d8\u5316\u56fe\u3002',
    items: [
      ['r', 8, 22, 40, 36, 3, 't1', { tc: 'sm ink' }], ['r', 8, 166, 40, 36, 3, 't2', { tc: 'sm ink' }],
      ['a', 48, 40, 60, 40, 'k'], ['a', 48, 184, 60, 184, 'k'],
      ['r', 60, 22, 56, 36, 1, '\u7f16\u7801\u5668', { tc: 'xs ink' }], ['r', 60, 166, 56, 36, 1, '\u7f16\u7801\u5668', { tc: 'xs ink' }],
      ['t', 84, 112, '\u5171\u4eab', 'xs'],
      ['a', 116, 40, 130, 40, 'k'], ['a', 116, 184, 130, 184, 'k'],
      ['r', 130, 22, 60, 36, 1, '\u8bed\u4e49\n\u89e3\u7801', { tc: 'xs ink' }], ['r', 130, 166, 60, 36, 1, '\u8bed\u4e49\n\u89e3\u7801', { tc: 'xs ink' }],
      ['a', 104, 58, 140, 94, 'o'], ['a', 104, 166, 140, 130, 'o'],
      ['r', 130, 94, 60, 36, 5, '\u53d8\u5316\n\u5206\u652f', { tc: 'xs ink' }],
      ['a', 190, 40, 210, 40, 'k'], ['a', 190, 112, 210, 112, 'k'], ['a', 190, 184, 210, 184, 'k'],
      ['r', 210, 22, 92, 180, 6, 'SCanFormer\n\n\u4e09\u8def\u7279\u5f81\n\u62fc\u6210\u4e00\u7ec4 token\n\u4e00\u8d77\u505a\u81ea\u6ce8\u610f\u529b\n\uff08CSWin \u00d7 2\uff09', { tc: 'xs ink' }],
      ['a', 302, 40, 320, 40, 'k'], ['a', 302, 112, 320, 112, 'k'], ['a', 302, 184, 320, 184, 'k'],
      ['r', 320, 22, 70, 36, 1, '\u8bed\u4e49\u56fe 1\n\uff08\u6bcf\u4e2a\u50cf\u5143\uff09', { tc: 'xs ink' }],
      ['r', 320, 94, 70, 36, 2, '\u53d8\u5316\u56fe', { tc: 'xs ink' }],
      ['r', 320, 166, 70, 36, 1, '\u8bed\u4e49\u56fe 2\n\uff08\u6bcf\u4e2a\u50cf\u5143\uff09', { tc: 'xs ink' }],
      ['a', 390, 40, 420, 50, 'k'], ['a', 390, 184, 420, 174, 'k'],
      ['a', 390, 104, 420, 66, 'r', { dash: 1 }], ['a', 390, 120, 420, 158, 'r', { dash: 1 }],
      ['r', 420, 36, 114, 36, 4, '\u8bed\u4e49\u53d8\u5316\u56fe Y\u2081\n\uff08\u672a\u53d8\u5904\u7f6e\u7a7a\uff09', { tc: 'xs ink' }],
      ['r', 420, 152, 114, 36, 4, '\u8bed\u4e49\u53d8\u5316\u56fe Y\u2082\n\uff08\u672a\u53d8\u5904\u7f6e\u7a7a\uff09', { tc: 'xs ink' }],
      ['t', 477, 112, '\u53d8\u5316\u56fe\u5f53\u63a9\u819c', 'xs v']
    ]
  });

  // 12. SCanNet \u7684\u5b66\u4e60\u65b9\u6848
  (function () {
    var it = [['t', 90, 12, '\u2460 \u6807\u7b7e\u53ea\u5728\u53d8\u5316\u533a', 'xs ink b'], ['t', 270, 12, '\u2461 \u672a\u53d8\u533a\uff1a\u4e00\u81f4\u624d\u5f53\u4f2a\u6807\u7b7e', 'xs ink b'], ['t', 450, 12, '\u2462 \u4e24\u671f\u7c7b\u522b\u5206\u5e03\u7684\u7ea6\u675f', 'xs ink b']];
    var chg = function (r, c) { return r >= 1 && r <= 2 && c >= 2 && c <= 4; };
    for (var r = 0; r < 6; r++) for (var c = 0; c < 6; c++) {
      it.push(chg(r, c) ? rawRect(42 + c * 16, 26 + r * 16, 16, 16, 'cell fg', 0.7) : ['r', 42 + c * 16, 26 + r * 16, 16, 16, 0, '', { rx: 0 }]);
      if (chg(r, c)) it.push(['r', 222 + c * 16, 26 + r * 16, 16, 16, 6, '', { rx: 0 }]);
      else { var unsure = (r === 4 && c === 0) || (r === 0 && c === 5) || (r === 5 && c === 3); it.push(unsure ? ['r', 222 + c * 16, 26 + r * 16, 16, 16, 0, '?', { rx: 0, tc: 'xs' }] : rawRect(222 + c * 16, 26 + r * 16, 16, 16, 'cell ' + (r >= 4 ? 'fw' : 'fg'), 0.35)); }
    }
    it.push(['t', 90, 136, '\u7eff = \u6709\u524d\u671f\u7c7b\u522b\u6807\u7b7e', 'xs'], ['t', 90, 152, '\u7070 = \u6ca1\u53d8\uff0c\u4f46\u4e0d\u77e5\u9053\u662f\u4ec0\u4e48', 'xs']);
    it.push(['t', 270, 136, '\u6d45\u8272 = \u4e24\u671f\u9884\u6d4b\u4e00\u81f4\u4e14\u9ad8\u7f6e\u4fe1', 'xs'], ['t', 270, 152, '\u201c?\u201d = \u4e0d\u4e00\u81f4\u6216\u6ca1\u628a\u63e1\uff0c\u4e0d\u7528', 'xs']);
    function bars(x, y, p, cls) { p.forEach(function (v, i) { it.push(rawRect(x + i * 12, y - v * 44, 9, v * 44, cls, 0.75, 1)); }); }
    it.push(['l', 372, 70, 528, 70, 'm', { thin: 1 }], ['l', 372, 140, 528, 140, 'm', { thin: 1 }]);
    bars(380, 70, [0.7, 0.2, 0.1], 'fw'); bars(430, 70, [0.6, 0.3, 0.1], 'fs');
    it.push(['t', 422, 50, '\u2248', 'lg g'], ['t', 498, 46, '\u6ca1\u53d8\uff1a\n\u62c9\u8fd1', 'xs g']);
    bars(380, 140, [0.7, 0.2, 0.1], 'fw'); bars(430, 140, [0.1, 0.2, 0.7], 'fs');
    it.push(['t', 422, 120, '\u2260', 'lg v'], ['t', 498, 116, '\u53d8\u4e86\uff1a\n\u63a8\u8fdc', 'xs v']);
    it.push(['t', 450, 152, '\u84dd = t1\uff0c\u8d6d = t2 \u7684\u7c7b\u522b\u6982\u7387', 'xs']);
    it.push(['t', 270, 176, '\u4f2a\u6807\u7b7e\u8865\u4e0a\u201c\u672a\u53d8\u5316\u533a\u6ca1\u6709\u8bed\u4e49\u201d\u7684\u7f3a\u53e3\uff1b\u4e00\u81f4\u6027\u7ea6\u675f\u76f4\u63a5\u9488\u5bf9\u201c\u5224\u4e3a\u53d8\u5316\u3001\u524d\u540e\u5374\u540c\u7c7b\u201d\u8fd9\u7c7b\u77db\u76fe', 'xs ink']);
    F('scd_loss', {
      w: 540, h: 188, min: 480, items: it,
      cap: 'SCanNet \u7684\u5b66\u4e60\u65b9\u6848\uff08\u793a\u610f\uff09\u3002\u2460SECOND \u5f0f\u7684\u6807\u7b7e\u53ea\u5728\u53d8\u5316\u533a\u7ed9\u51fa\u8bed\u4e49\uff1b\u2461\u672a\u53d8\u5316\u533a\u91cc\uff0c\u4e24\u671f\u9884\u6d4b\u4e00\u81f4\u4e14\u7f6e\u4fe1\u5ea6\u9ad8\u7684\u50cf\u5143\u5f53\u4f2a\u6807\u7b7e\uff1b\u2462\u6309\u53d8\u5316\u6807\u7b7e\u7ea6\u675f\u4e24\u671f\u7684\u7c7b\u522b\u6982\u7387\uff1a\u6ca1\u53d8\u7684\u5730\u65b9\u8981\u63a5\u8fd1\uff0c\u53d8\u4e86\u7684\u5730\u65b9\u8981\u4e0d\u540c\u3002'
    });
  })();

  // 13. MapFormer
  F('mapformer', {
    w: 540, h: 224, min: 480,
    cap: 'MapFormer \u7684\u6761\u4ef6\u53d8\u5316\u68c0\u6d4b\uff08\u6309 Bernhard \u7b49 2023 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u4e24\u671f\u5f71\u50cf\u548c\u524d\u671f\u5730\u56fe\u5206\u522b\u7f16\u7801\uff0c\u878d\u5408\u6a21\u5757\u7528 K \u4e2a MLP \u4ea7\u751f\u5019\u9009\u878d\u5408\uff0c\u518d\u7531\u5730\u56fe\u7279\u5f81\u51b3\u5b9a\u6bcf\u4e2a\u5019\u9009\u7684\u6743\u91cd\uff1b\u8bad\u7ec3\u65f6\u52a0\u4e00\u4e2a\u5bf9\u6bd4\u635f\u5931\u3002\u53bb\u6389 t1 \u5f71\u50cf\u3001\u53ea\u7559\u524d\u671f\u5730\u56fe\u548c t2 \u5f71\u50cf\uff0c\u6210\u7ee9\u51e0\u4e4e\u4e0d\u6389\u3002',
    items: [
      ['r', 8, 18, 50, 30, 3, 't1 \u5f71\u50cf', { tc: 'xs ink' }], ['r', 8, 68, 50, 30, 3, 't2 \u5f71\u50cf', { tc: 'xs ink' }], ['r', 8, 152, 50, 36, 4, '\u524d\u671f\n\u5730\u56fe', { tc: 'xs ink' }],
      ['a', 58, 33, 66, 33, 'k'], ['a', 58, 83, 66, 83, 'k'], ['a', 58, 170, 66, 170, 'k'],
      ['r', 66, 16, 70, 34, 1, '\u5f71\u50cf\u7f16\u7801\u5668', { tc: 'xs ink' }], ['r', 66, 66, 70, 34, 1, '\u5f71\u50cf\u7f16\u7801\u5668', { tc: 'xs ink' }], ['t', 101, 58, '\u5171\u4eab', 'xs'],
      ['r', 66, 152, 70, 36, 0, '\u5730\u56fe\u7f16\u7801\u5668\n\uff08\u8f7b\u91cf CNN\uff09', { tc: 'xs ink' }],
      ['a', 136, 33, 156, 52, 'b'], ['a', 136, 83, 156, 83, 'b'], ['a', 136, 162, 156, 118, 'g'],
      ['t', 146, 26, 'f\u2081', 'xs w'], ['t', 146, 96, 'f\u2082', 'xs w'], ['t', 138, 136, 'g\u2081', 'xs g'],
      ['r', 156, 30, 160, 120, 6, '', {}],
      ['t', 236, 44, '\u2460 \u62fc\u63a5 f\u2081\u3001f\u2082\u3001g\u2081', 'xs ink'],
      ['r', 166, 56, 30, 22, 1, 'MLP', { tc: 'xs ink' }], ['r', 202, 56, 30, 22, 1, 'MLP', { tc: 'xs ink' }], ['t', 251, 67, '\u2026', 'sm'], ['r', 270, 56, 36, 22, 1, 'MLP', { tc: 'xs ink' }],
      ['t', 236, 92, '\u2461 \u5f97\u5230 K \u4e2a\u5019\u9009\u878d\u5408', 'xs ink'],
      ['t', 236, 112, '\u2462 g\u2081 \u7ed9\u6bcf\u4e2a\u5019\u9009\u7b97\u6743\u91cd', 'xs g'],
      ['t', 236, 132, '\u2463 \u52a0\u6743\u6c42\u548c \u2192 \u878d\u5408\u7279\u5f81', 'xs ink'],
      ['p', [136, 178, 236, 178, 236, 150], 'g'],
      ['a', 316, 70, 340, 50, 'k'], ['a', 316, 110, 340, 128, 'k'],
      ['r', 340, 32, 74, 34, 2, '\u53d8\u5316\u5934', { tc: 'xs ink' }], ['r', 340, 112, 74, 34, 2, '\u8bed\u4e49\u5934\n\uff08\u505a SCD \u65f6\uff09', { tc: 'xs ink' }],
      ['a', 414, 49, 432, 49, 'k'], ['a', 414, 129, 432, 129, 'k'],
      ['r', 432, 32, 100, 34, 4, '\u4e8c\u503c\u53d8\u5316\u56fe', { tc: 'xs ink' }], ['r', 432, 112, 100, 34, 4, '\u540e\u671f\u8bed\u4e49\u56fe', { tc: 'xs ink' }],
      ['t', 270, 208, '\u8bad\u7ec3\u65f6\u52a0\u5bf9\u6bd4\u635f\u5931\uff1af\u2081 \u8981\u50cf g\u2081\uff1b\u6ca1\u53d8\u7684\u5730\u65b9 f\u2082 \u4e5f\u8981\u50cf g\u2081\uff0c\u53d8\u4e86\u7684\u5730\u65b9\u8981\u4e0d\u50cf', 'xs ink']
    ]
  });

  // 14. ChangeStar \u5355\u671f\u76d1\u7763
  (function () {
    var it = [['t', 80, 12, '\u4e24\u5f20\u4e0d\u540c\u5730\u70b9\u7684\u5355\u671f\u5f71\u50cf', 'xs ink b']];
    var mA = { 6: 1, 7: 1, 11: 1, 12: 1, 24: 1 }, mB = { 3: 1, 4: 1, 8: 1, 9: 1, 16: 1 };
    function img(x, y, m) { it.push(['r', x, y, 60, 60, 0, '', { rx: 3 }]); Object.keys(m).forEach(function (k) { k = +k; it.push(rawRect(x + (k % 5) * 12, y + Math.floor(k / 5) * 12, 12, 12, 'fm', 0.8)); }); }
    function mask(x, y, f) { for (var k = 0; k < 25; k++) { var on = f(k); it.push(on ? rawRect(x + (k % 5) * 12, y + Math.floor(k / 5) * 12, 12, 12, 'cell ' + on, 0.75) : ['r', x + (k % 5) * 12, y + Math.floor(k / 5) * 12, 12, 12, 0, '', { rx: 0 }]); } }
    img(14, 26, mA); mask(86, 26, function (k) { return mA[k] ? 'fk' : null; });
    img(14, 110, mB); mask(86, 110, function (k) { return mB[k] ? 'fk' : null; });
    it.push(['t', 44, 98, '\u5f71\u50cf A', 'xs'], ['t', 116, 98, '\u63a9\u819c A', 'xs'], ['t', 44, 182, '\u5f71\u50cf B', 'xs'], ['t', 116, 182, '\u63a9\u819c B', 'xs']);
    it.push(['a', 146, 56, 196, 86, 'k'], ['a', 146, 140, 196, 112, 'k']);
    mask(200, 68, function (k) { return (!!mA[k]) !== (!!mB[k]) ? 'fv' : null; });
    it.push(['t', 230, 140, '\u4e24\u5f20\u63a9\u819c\u4e0d\u540c\u5904', 'xs ink'], ['t', 230, 156, '= \u53d8\u5316\u6807\u7b7e', 'xs ink']);
    it.push(['t', 380, 34, '\u628a A\u3001B \u5f53\u4f5c\u201c\u524d\u540e\u4e24\u671f\u201d', 'xs ink']);
    it.push(['a', 260, 98, 320, 98, 'r', { dash: 1 }], ['t', 290, 88, '\u76d1\u7763', 'xs v']);
    it.push(['r', 320, 72, 110, 52, 2, '\u5206\u5272\u6a21\u578b\n+ ChangeMixin', { tc: 'xs ink' }], ['a', 430, 98, 450, 98, 'k'], ['r', 450, 82, 82, 32, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }]);
    it.push(['t', 426, 144, '(A, B)\u3001(B, A) \u90fd\u8bad\u7ec3\uff1a\u65f6\u95f4\u5bf9\u79f0', 'xs']);
    it.push(['t', 270, 204, '\u5c40\u9650\uff1aA\u3001B \u6765\u81ea\u4e0d\u540c\u5730\u70b9\uff0c\u6ca1\u6709\u771f\u5b9e\u5f71\u50cf\u5bf9\u91cc\u7684\u5b63\u8282\u3001\u5149\u7167\u3001\u9519\u4f4d\u2014\u2014\u5b66\u4e0d\u4f1a\u538b\u4f2a\u53d8\u5316', 'xs o']);
    F('changestar', {
      w: 540, h: 216, min: 480, items: it,
      cap: 'ChangeStar \u7684\u5355\u671f\u76d1\u7763\uff08\u6309 Zheng \u7b49 2021 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u53ea\u6709\u5355\u671f\u7684\u76ee\u6807\u6807\u6ce8\u65f6\uff0c\u628a\u4e0d\u540c\u5730\u70b9\u7684\u4e24\u5f20\u5f71\u50cf\u968f\u673a\u914d\u6210\u4e00\u5bf9\uff0c\u4e24\u5f20\u63a9\u819c\u4e0d\u540c\u7684\u5730\u65b9\u5c31\u662f\u7b54\u6848\u5df2\u77e5\u7684\u53d8\u5316\u6807\u7b7e\u3002'
    });
  })();

  // 15. DDPM-CD
  (function () {
    var it = [['t', 104, 10, '\u52a0\u4e09\u79cd\u5f3a\u5ea6\u7684\u566a\u58f0', 'xs'], ['t', 275, 10, '5 \u4e2a\u5c3a\u5ea6\u7684\u7279\u5f81', 'xs']];
    function row(y, name) {
      it.push(['r', 8, y - 15, 54, 30, 3, name, { tc: 'xs ink' }], ['a', 62, y, 76, y, 'k']);
      it.push(['r', 76, y - 31, 56, 18, 0, 't = 50', { tc: 'xs ink', rx: 3 }], ['r', 76, y - 9, 56, 18, 0, 't = 100', { tc: 'xs ink', rx: 3 }], ['r', 76, y + 13, 56, 18, 0, 't = 400', { tc: 'xs ink', rx: 3 }]);
      it.push(['a', 132, y, 148, y, 'k'], ['r', 148, y - 29, 76, 58, 0, '\u51bb\u7ed3\u7684\n\u6269\u6563 U-Net', { tc: 'xs ink', dash: 1 }], ['a', 224, y, 238, y, 'k']);
      [50, 40, 30, 20, 12].forEach(function (h, i) { it.push(rawRect(240 + i * 14, y - h / 2, 10, h, name.indexOf('\u524d') === 0 ? 'fw' : 'fs', 0.6, 2)); });
    }
    row(49, '\u524d\u671f\u5f71\u50cf'); row(149, '\u540e\u671f\u5f71\u50cf');
    it.push(['a', 306, 49, 360, 76, 'k'], ['a', 306, 149, 360, 122, 'k']);
    it.push(['r', 326, 76, 104, 46, 5, '\u9010\u5c3a\u5ea6\u4e24\u671f\u76f8\u51cf\n+ \u901a\u9053/\u7a7a\u95f4\u6ce8\u610f\u529b', { tc: 'xs ink' }]);
    it.push(['a', 430, 99, 446, 99, 'k'], ['r', 446, 76, 88, 46, 2, '\u7531\u7c97\u5230\u7ec6\n\u9010\u7ea7\u7ec6\u5316', { tc: 'xs ink' }]);
    it.push(['a', 490, 122, 490, 150, 'k'], ['r', 456, 150, 68, 28, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }]);
    it.push(['t', 270, 200, '\u6269\u6563\u6a21\u578b\u5728\u7ea6 50 \u4e07\u5f20\u65e0\u6807\u7b7e\u7684 S2 RGB \u56fe\u5757\u4e0a\u9884\u8bad\u7ec3\uff1b\u5168\u7a0b\u51bb\u7ed3\uff0c\u4e00\u5f20\u56fe\u4e5f\u4e0d\u751f\u6210\uff0c\u53ea\u63d0\u4f9b\u7279\u5f81', 'xs ink']);
    F('ddpm_feat', {
      w: 540, h: 212, min: 480, items: it,
      cap: 'DDPM-CD\uff08\u6309 Bandara \u7b49 2025 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u4e24\u671f\u5f71\u50cf\u5404\u52a0\u4e09\u79cd\u5f3a\u5ea6\u7684\u566a\u58f0\u9001\u8fdb\u51bb\u7ed3\u7684\u6269\u6563 U-Net\uff0c\u53d6\u89e3\u7801\u5668\u91cc\u591a\u4e2a\u5c3a\u5ea6\u3001\u591a\u4e2a\u65f6\u95f4\u6b65\u7684\u4e2d\u95f4\u7279\u5f81\uff1b\u53ea\u8bad\u7ec3\u4e00\u4e2a\u8f7b\u91cf\u7684\u5206\u5c42\u53d8\u5316\u89e3\u7801\u5668\u3002'
    });
  })();

  // 16. HySCDG \u5408\u6210\u6d41\u7a0b
  F('synth_pipe', {
    w: 540, h: 206, min: 480,
    cap: 'HySCDG \u7684\u201c\u9009\u62e9\u2014\u63a9\u819c\u2014\u6539\u7c7b\u2014\u91cd\u7ed8\u201d\u6d41\u7a0b\uff08\u6309 HySCDG \u8bba\u6587 2025 \u7684\u63cf\u8ff0\u81ea\u7ed8\uff09\u3002\u7b2c \u2464 \u6b65\u5728\u968f\u673a\u533a\u57df\u53ea\u91cd\u7ed8\u3001\u4e0d\u6539\u7c7b\uff0c\u53d8\u5316\u56fe\u91cc\u7167\u6837\u8bb0\u201c\u6ca1\u53d8\u201d\uff0c\u7528\u6765\u6253\u7834\u201c\u91cd\u7ed8\u75d5\u8ff9 = \u53d8\u5316\u201d\u8fd9\u6761\u6377\u5f84\u3002',
    items: [
      ['t', 270, 12, '\u8f93\u5165\uff1a\u771f\u5b9e\u7684\u5355\u671f\u5f71\u50cf I\u2081\u3001\u5b83\u7684\u8bed\u4e49\u56fe M\u2081\u3001\u516c\u5f00\u77e2\u91cf\u6570\u636e\u91cc\u7684\u5b9e\u4f8b\u8f6e\u5ed3', 'xs ink'],
      ['r', 8, 30, 92, 50, 0, '\u2460 \u9009\u5b9e\u4f8b\n\uff08\u77e2\u91cf\u8f6e\u5ed3\uff09', { tc: 'xs ink' }],
      ['r', 112, 30, 92, 50, 0, '\u2461 \u63a9\u819c\n\u8f6e\u5ed3 + \u7f13\u51b2\u533a', { tc: 'xs ink' }],
      ['r', 216, 30, 92, 50, 5, '\u2462 \u6539\u7c7b\u522b\nc\u2081 \u2192 c\u2082', { tc: 'xs ink' }],
      ['r', 320, 30, 108, 50, 2, '\u2463 \u91cd\u7ed8\nSD + ControlNet\n\u4ee5\u8bed\u4e49\u56fe\u4e3a\u6761\u4ef6', { tc: 'xs ink' }],
      ['a', 100, 55, 112, 55, 'k'], ['a', 204, 55, 216, 55, 'k'], ['a', 308, 55, 320, 55, 'k'],
      ['a', 428, 55, 444, 55, 'k'], ['r', 444, 22, 90, 66, 4, '\u751f\u6210\uff1a\n\u5f71\u50cf I\u2082\n\u8bed\u4e49\u56fe M\u2082\n\u53d8\u5316\u56fe C', { tc: 'xs ink' }],
      ['r', 112, 112, 196, 46, 5, '\u2464 \u53e6\u9009\u51e0\u5904\uff1a\u53ea\u91cd\u7ed8\u3001\u4e0d\u6539\u7c7b\n\uff08\u53d8\u5316\u56fe\u91cc\u8bb0\u201c\u6ca1\u53d8\u201d\uff09', { tc: 'xs ink', dash: 1 }],
      ['p', [308, 135, 374, 135, 374, 80], 'o', { dash: 1 }],
      ['t', 270, 186, '\u6ca1\u6709\u7b2c \u2464 \u6b65\uff0c\u6a21\u578b\u4f1a\u628a\u201c\u91cd\u7ed8\u7559\u4e0b\u7684\u7eb9\u7406\u75d5\u8ff9\u201d\u5f53\u6210\u53d8\u5316\u7684\u4fe1\u53f7\u2014\u2014\u5178\u578b\u7684\u6377\u5f84\u5b66\u4e60', 'xs v']
    ]
  });
})();
