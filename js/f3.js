/* \u7b2c 3 \u5929\u7684\u7ed3\u6784\u56fe\uff08\u81ea\u7ed8\u793a\u610f\u56fe\uff09\u3002 */
(function () {
  var F = window.TENM.fig;

  // 1. \u5f71\u50cf\u53d8\u6210 token
  (function () {
    var it = [['t', 70, 18, '\u4e00\u5757 256\u00d7256 \u5f71\u50cf', 'sm ink b']];
    var g = []; for (var i = 0; i < 16; i++) g.push(i === 5 ? '5' : '1');
    it.push(['g', 22, 30, 4, 4, 24, 24, g]);
    it.push(['t', 70, 140, '\u5207\u6210 16\u00d716 \u50cf\u7d20\u7684\u5757', 'xs']);
    it.push(['t', 70, 156, '\u6bcf\u5757 = 160 m \u00d7 160 m', 'xs v']);
    it.push(['a', 124, 78, 160, 78, 'k']);
    it.push(['r', 160, 52, 104, 52, 3, '\u62c9\u5e73 + \u7ebf\u6027\u6295\u5f71\n\u6bcf\u5757 \u2192 768 \u7ef4\u5411\u91cf', { tc: 'xs ink' }]);
    it.push(['a', 264, 78, 292, 78, 'k']);
    var tk = []; for (var j = 0; j < 7; j++) tk.push(['r', 292 + j * 30, 60, 24, 36, j === 0 ? 2 : 1, j === 0 ? 'C' : j === 6 ? '\u2026' : String(j), { tc: 'xs ink b', rx: 4 }]);
    it = it.concat(tk);
    it.push(['t', 382, 44, '[CLS] + 256 \u4e2a token', 'xs ink']);
    var pe = []; for (var k = 0; k < 7; k++) pe.push(['r', 292 + k * 30, 106, 24, 18, 5, '+', { tc: 'xs ink', rx: 3 }]);
    it = it.concat(pe);
    it.push(['t', 382, 140, '\u52a0\u4e0a\u4f4d\u7f6e\u7f16\u7801\uff08\u6bcf\u4e2a\u4f4d\u7f6e\u4e00\u4e2a\u53ef\u5b66\u4e60\u5411\u91cf\uff09', 'xs o']);
    it.push(['a', 382, 150, 382, 172, 'k']);
    it.push(['r', 292, 172, 204, 40, 4, 'Transformer \u7f16\u7801\u5668 \u00d7 12 \u5c42', { tc: 'sm ink' }]);
    it.push(['t', 394, 230, '[CLS] \u7684\u8f93\u51fa\u505a\u5206\u7c7b\uff1b\u5176\u4f59 token \u7684\u8f93\u51fa\u63a5\u89e3\u7801\u5668\u505a\u5206\u5272', 'xs']);
    F('tokens', {
      w: 520, h: 244, items: it,
      cap: 'ViT \u628a\u5f71\u50cf\u53d8\u6210 token \u7684\u8fc7\u7a0b\u3002256\u00d7256 \u7684\u5f71\u50cf\u6309 16\u00d716 \u5207\u6210 256 \u5757\uff0c\u6bcf\u5757\u62c9\u5e73\u540e\u4e58\u4e00\u4e2a\u53ef\u5b66\u4e60\u77e9\u9635\uff0c\u53d8\u6210\u4e00\u4e2a\u5411\u91cf\uff1b\u518d\u52a0\u4e00\u4e2a\u5206\u7c7b\u7528\u7684 [CLS] token \u548c\u4f4d\u7f6e\u7f16\u7801\uff0c\u9001\u8fdb Transformer\u3002\u6ce8\u610f\u5728 10 m \u5f71\u50cf\u4e0a\uff0c\u4e00\u4e2a token \u5c31\u662f 160 m \u89c1\u65b9\u7684\u4e00\u7247\u5730\u3002'
    });
  })();

  // 2. \u6ce8\u610f\u529b\u7684\u6570\u503c\u4f8b\u5b50
  F('qkv', {
    w: 540, h: 290, min: 480,
    cap: '\u6ce8\u610f\u529b\u624b\u7b97\u4e00\u904d\uff08\u4e3a\u4e86\u597d\u7b97\uff0c\u4ee4 Q = K = V = \u8f93\u5165\u5411\u91cf\uff0c\u7ef4\u5ea6 d = 2\uff09\u3002\u67e5\u8be2\u662f 1 \u53f7\u201c\u6cb3\u6c34\u201dtoken\uff1a\u5b83\u548c\u81ea\u5df1\u3001\u548c\u8fdc\u5904\u53e6\u4e00\u7247\u6c34\u7684\u76f8\u4f3c\u5ea6\u9ad8\uff0c\u548c\u6797\u5730\u7684\u76f8\u4f3c\u5ea6\u4e3a 0\uff1b\u9664\u4ee5 \u221a2\u3001\u8fc7 softmax \u5f97\u5230\u6743\u91cd 0.41 / 0.38 / 0.20\uff1b\u65b0\u8868\u793a\u5c31\u662f\u4e09\u4e2a\u503c\u5411\u91cf\u6309\u6743\u91cd\u52a0\u8d77\u6765 [0.76, 0.24]\u2014\u2014\u4ecd\u7136\u4ee5\u201c\u6c34\u201d\u4e3a\u4e3b\uff0c\u6df7\u8fdb\u4e86\u4e00\u70b9\u201c\u6797\u5730\u201d\u3002',
    items: [
      ['t', 70, 20, '\u4e09\u4e2a token\uff082 \u7ef4\u7279\u5f81\uff09', 'sm ink b'],
      ['r', 8, 34, 124, 30, 1, 'x\u2081 \u6cb3\u6c34 [1, 0]', { tc: 'xs ink' }],
      ['r', 8, 72, 124, 30, 1, 'x\u2082 \u8fdc\u5904\u7684\u6c34 [0.9, 0.1]', { tc: 'xs ink' }],
      ['r', 8, 110, 124, 30, 4, 'x\u2083 \u6797\u5730 [0, 1]', { tc: 'xs ink' }],
      ['a', 134, 87, 158, 87, 'k'],
      ['t', 250, 20, '\u2460 \u6253\u5206\uff1aq\u2081 \u00b7 k\u2c7c', 'sm ink b'],
      ['g', 160, 34, 3, 1, 60, 30, [0.5, 0.45, 0], { ramp: 'b', txt: ['1.0', '0.9', '0'], tc: 'sm ink b' }],
      ['t', 250, 80, '\u2461 \u9664\u4ee5 \u221ad = \u221a2', 'sm ink b'],
      ['g', 160, 94, 3, 1, 60, 30, [0.36, 0.32, 0], { ramp: 'b', txt: ['0.707', '0.636', '0'], tc: 'xs ink b' }],
      ['t', 250, 140, '\u2462 softmax \u2192 \u6743\u91cd\uff08\u548c\u4e3a 1\uff09', 'sm ink b'],
      ['g', 160, 154, 3, 1, 60, 30, [0.41, 0.38, 0.2], { ramp: 'r', txt: ['0.41', '0.38', '0.20'], tc: 'sm ink b' }],
      ['t', 190, 198, 'x\u2081', 'xs'], ['t', 250, 198, 'x\u2082', 'xs'], ['t', 310, 198, 'x\u2083', 'xs'],
      ['a', 344, 169, 374, 169, 'k'],
      ['t', 456, 140, '\u2463 \u52a0\u6743\u6c42\u548c', 'sm ink b'],
      ['r', 378, 154, 156, 30, 2, '0.41\u00b7x\u2081 + 0.38\u00b7x\u2082 + 0.20\u00b7x\u2083', { tc: 'xs ink' }],
      ['t', 456, 204, '= [0.76, 0.24]', 'sm ink b'],
      ['t', 456, 224, '\u65b0\u7684 x\u2081\uff1a\u4ecd\u4ee5\u6c34\u4e3a\u4e3b', 'xs'],
      ['t', 270, 262, 'Attention(Q, K, V) = softmax(Q\u00b7K\u1d40 / \u221ad) \u00b7 V', 'sm ink mono']
    ]
  });

  // 3. Transformer \u5757
  F('tblock', {
    w: 520, h: 200,
    cap: '\u4e00\u4e2a Transformer \u5757\u3002\u5148\u5f52\u4e00\u5316\uff08LayerNorm\uff09\uff0c\u505a\u591a\u5934\u81ea\u6ce8\u610f\u529b\uff0c\u7ed3\u679c\u52a0\u56de\u8f93\u5165\uff08\u6b8b\u5dee\uff09\uff1b\u518d\u5f52\u4e00\u5316\uff0c\u8fc7\u4e00\u4e2a\u4e24\u5c42\u7684\u524d\u9988\u7f51\u7edc\uff08MLP\uff0c\u4e2d\u95f4\u7ef4\u5ea6\u901a\u5e38\u653e\u5927 4 \u500d\uff09\uff0c\u518d\u52a0\u56de\u53bb\u3002\u6574\u4e2a ViT \u5c31\u662f 12 \u4e2a\u8fd9\u6837\u7684\u5757\u4e32\u8d77\u6765\u3002\u6ce8\u610f\u529b\u8d1f\u8d23\u201ctoken \u4e4b\u95f4\u4ea4\u6362\u4fe1\u606f\u201d\uff0cMLP \u8d1f\u8d23\u201c\u6bcf\u4e2a token \u81ea\u5df1\u6d88\u5316\u4fe1\u606f\u201d\u3002',
    items: [
      ['t', 22, 104, 'x', 'lg b'],
      ['a', 32, 100, 52, 100, 'k'],
      ['r', 52, 82, 52, 36, 0, 'LN', { tc: 'sm ink' }], ['a', 104, 100, 114, 100, 'k'],
      ['r', 114, 82, 96, 36, 5, '\u591a\u5934\u81ea\u6ce8\u610f\u529b', { tc: 'sm ink' }], ['a', 210, 100, 225, 100, 'k'],
      ['c', 239, 100, 13, 6, '+'],
      ['a', 252, 100, 266, 100, 'k'],
      ['r', 266, 82, 52, 36, 0, 'LN', { tc: 'sm ink' }], ['a', 318, 100, 328, 100, 'k'],
      ['r', 328, 82, 96, 36, 1, 'MLP\n\u653e\u5927 4 \u500d\u518d\u7f29\u56de', { tc: 'xs ink' }], ['a', 424, 100, 441, 100, 'k'],
      ['c', 455, 100, 13, 6, '+'],
      ['a', 468, 100, 492, 100, 'k'], ['t', 504, 104, 'y', 'lg b'],
      ['p', [42, 100, 42, 50, 239, 50, 239, 87], 'g'],
      ['p', [258, 100, 258, 150, 455, 150, 455, 113], 'g'],
      ['t', 140, 40, '\u6b8b\u5dee', 'xs g'], ['t', 356, 166, '\u6b8b\u5dee', 'xs g'],
      ['t', 162, 138, 'token \u4e4b\u95f4\u4ea4\u6362\u4fe1\u606f', 'xs'], ['t', 376, 70, '\u6bcf\u4e2a token \u81ea\u5df1\u6d88\u5316', 'xs']
    ]
  });

  // 4. \u591a\u5934\u6ce8\u610f\u529b
  (function () {
    var it = [['r', 20, 80, 70, 40, 1, '\u8f93\u5165 token', { tc: 'xs ink' }]];
    for (var h = 0; h < 4; h++) {
      var y = 20 + h * 42;
      it.push(['a', 90, 100, 128, y + 15, 'm', { thin: 1 }]);
      it.push(['r', 128, y, 120, 30, 5, '\u5934 ' + (h + 1) + '\uff1a\u81ea\u5df1\u7684 Q K V', { tc: 'xs ink' }]);
      it.push(['a', 248, y + 15, 290, 100, 'm', { thin: 1 }]);
    }
    it.push(['r', 290, 80, 70, 40, 0, '\u62fc\u63a5', { tc: 'xs ink' }]);
    it.push(['a', 360, 100, 384, 100, 'k']);
    it.push(['r', 384, 80, 80, 40, 3, '\u7ebf\u6027\u53d8\u6362', { tc: 'xs ink' }]);
    it.push(['a', 464, 100, 500, 100, 'k']);
    it.push(['t', 188, 192, '\u4f8b\uff1a768 \u7ef4 = 12 \u4e2a\u5934 \u00d7 64 \u7ef4', 'xs ink']);
    it.push(['t', 430, 146, '\u5404\u5934\u7684\u7ed3\u679c\u5408\u5728\u4e00\u8d77', 'xs']);
    F('mhsa', {
      w: 520, h: 206, items: it,
      cap: '\u591a\u5934\u6ce8\u610f\u529b\uff1a\u628a\u5411\u91cf\u5207\u6210\u51e0\u4efd\uff0c\u6bcf\u4efd\u7528\u81ea\u5df1\u7684 Q\u3001K\u3001V \u72ec\u7acb\u505a\u4e00\u6b21\u6ce8\u610f\u529b\uff08\u201c\u5934\u201d\uff09\uff0c\u6700\u540e\u62fc\u8d77\u6765\u518d\u7ebf\u6027\u53d8\u6362\u3002\u4e0d\u540c\u7684\u5934\u53ef\u4ee5\u5b66\u5230\u4e0d\u540c\u7684\u5173\u7cfb\uff1a\u6709\u7684\u770b\u5149\u8c31\u50cf\u4e0d\u50cf\uff0c\u6709\u7684\u770b\u4f4d\u7f6e\u8fd1\u4e0d\u8fd1\uff0c\u6709\u7684\u770b\u662f\u4e0d\u662f\u540c\u4e00\u6761\u6cb3\u3002'
    });
  })();

  // 5. Swin \u7a97\u53e3
  (function () {
    var it = [['t', 120, 18, '\u7b2c l \u5c42\uff1a\u89c4\u5219\u7a97\u53e3', 'sm ink b'], ['t', 390, 18, '\u7b2c l+1 \u5c42\uff1a\u7a97\u53e3\u9519\u5f00\u534a\u683c', 'sm ink b']];
    var g = []; for (var i = 0; i < 64; i++) g.push('0');
    it.push(['g', 40, 30, 8, 8, 20, 20, g], ['g', 310, 30, 8, 8, 20, 20, g]);
    [[40, 30], [120, 30], [40, 110], [120, 110]].forEach(function (p) { it.push(['r', p[0], p[1], 80, 80, 'b', '', { rx: 0 }]); });
    [[310, 30, 40, 40], [350, 30, 80, 40], [430, 30, 40, 40], [310, 70, 40, 80], [350, 70, 80, 80], [430, 70, 40, 80], [310, 150, 40, 40], [350, 150, 80, 40], [430, 150, 40, 40]].forEach(function (p) { it.push(['r', p[0], p[1], p[2], p[3], 'r', '', { rx: 0 }]); });
    it.push(['t', 120, 210, '\u6ce8\u610f\u529b\u53ea\u5728\u6bcf\u4e2a\u84dd\u6846\uff084\u00d74 \u4e2a token\uff09\u5185\u7b97', 'xs']);
    it.push(['t', 390, 210, '\u7ea2\u6846\u8de8\u8fc7\u4e86\u4e0a\u4e00\u5c42\u7684\u8fb9\u754c\uff0c\u4fe1\u606f\u5f97\u4ee5\u4ea4\u6d41', 'xs']);
    F('swin', {
      w: 520, h: 222, items: it,
      cap: 'Swin \u7684\u79fb\u4f4d\u7a97\u53e3\uff08\u793a\u610f\uff0c\u6bcf\u683c\u662f\u4e00\u4e2a token\uff0c\u7a97\u53e3\u5927\u5c0f\u8fd9\u91cc\u753b\u6210 4\u00d74\uff0c\u539f\u6587\u662f 7\u00d77\uff09\u3002\u53ea\u5728\u7a97\u53e3\u5185\u505a\u6ce8\u610f\u529b\uff0c\u8ba1\u7b97\u91cf\u968f\u56fe\u50cf\u5927\u5c0f\u7ebf\u6027\u589e\u957f\uff1b\u4e0b\u4e00\u5c42\u628a\u7a97\u53e3\u9519\u5f00\u534a\u4e2a\u7a97\u53e3\uff0c\u539f\u6765\u5206\u5c5e\u4e0d\u540c\u7a97\u53e3\u7684 token \u73b0\u5728\u5728\u540c\u4e00\u4e2a\u7a97\u53e3\u91cc\uff0c\u4fe1\u606f\u5c31\u80fd\u9010\u5c42\u6269\u6563\u5230\u5168\u56fe\u3002'
    });
  })();

  // 6. SegFormer
  (function () {
    var st = [['1/4', 64, 50], ['1/8', 128, 40], ['1/16', 320, 30], ['1/32', 512, 22]];
    var it = [['r', 16, 90, 50, 50, 3, '\u5f71\u50cf', { tc: 'xs ink' }]];
    st.forEach(function (s, i) {
      var x = 90 + i * 70, hh = s[2] * 2;
      it.push(['r', x, 115 - hh / 2, 50, hh, 1, s[0], { tc: 'xs ink b' }]);
      it.push(['t', x + 25, 115 + hh / 2 + 12, s[1] + ' \u901a\u9053', 'xs']);
      it.push(['a', x - (i === 0 ? 24 : 20), 115, x, 115, 'k']);
      it.push(['p', [x + 25, 115 - hh / 2, x + 25, 26 + i * 8, 380, 26 + i * 8], 'm', { thin: 1 }]);
    });
    it.push(['r', 380, 20, 64, 46, 2, 'MLP \u7edf\u4e00\n\u901a\u9053 + \u4e0a\u91c7\u6837', { tc: 'xs ink' }]);
    it.push(['a', 444, 43, 462, 43, 'k']);
    it.push(['r', 462, 20, 46, 46, 2, '\u62fc\u63a5\n+ MLP', { tc: 'xs ink' }]);
    it.push(['a', 485, 66, 485, 104, 'k']);
    it.push(['r', 456, 104, 58, 30, 4, '\u5206\u5272\u56fe', { tc: 'xs ink' }]);
    it.push(['t', 230, 210, '\u7f16\u7801\u5668\uff1a\u56db\u7ea7\u5c42\u7ea7 Transformer\uff08\u91cd\u53e0\u5207\u5757\u3001\u5e8f\u5217\u7f29\u51cf\u6ce8\u610f\u529b\u3001\u5e26\u5377\u79ef\u7684\u524d\u9988\u5c42\uff0c\u4e0d\u7528\u4f4d\u7f6e\u7f16\u7801\uff09', 'xs']);
    F('segformer', {
      w: 520, h: 222, min: 460, items: it,
      cap: 'SegFormer \u7684\u7ed3\u6784\u3002\u7f16\u7801\u5668\u50cf CNN \u4e00\u6837\u9010\u7ea7\u7f29\u5c0f\uff0c\u8f93\u51fa 1/4 \u5230 1/32 \u56db\u4e2a\u5c3a\u5ea6\u7684\u7279\u5f81\uff1b\u89e3\u7801\u5668\u6781\u7b80\uff1a\u6bcf\u4e2a\u5c3a\u5ea6\u7684\u7279\u5f81\u7528\u4e00\u5c42 MLP \u7edf\u4e00\u901a\u9053\u3001\u4e0a\u91c7\u6837\u5230 1/4\uff0c\u62fc\u8d77\u6765\u518d\u8fc7\u4e00\u5c42 MLP \u51fa\u7ed3\u679c\u3002\u5b83\u8bf4\u660e\u201c\u7f16\u7801\u5668\u591f\u5f3a\uff0c\u89e3\u7801\u5668\u53ef\u4ee5\u5f88\u7b80\u5355\u201d\u3002ChangeFormer \u5c31\u662f\u628a\u5b83\u7684\u7f16\u7801\u5668\u505a\u6210\u5b6a\u751f\u3002'
    });
  })();

  // 7. SimCLR / \u5bf9\u6bd4\u5b66\u4e60
  F('simclr', {
    w: 520, h: 230,
    cap: '\u5bf9\u6bd4\u5b66\u4e60\uff08\u4ee5 SimCLR \u4e3a\u4f8b\uff09\u3002\u540c\u4e00\u5f20\u56fe\u505a\u4e24\u6b21\u968f\u673a\u589e\u5f3a\u5f97\u5230\u4e24\u4e2a\u201c\u89c6\u56fe\u201d\uff0c\u5b83\u4eec\u662f\u6b63\u6837\u672c\u5bf9\uff1b\u540c\u4e00\u6279\u91cc\u522b\u7684\u56fe\u90fd\u662f\u8d1f\u6837\u672c\u3002\u7f16\u7801\u5668\u52a0\u4e00\u4e2a\u5c0f\u6295\u5f71\u5934\u628a\u5b83\u4eec\u53d8\u6210\u5411\u91cf\uff0c\u635f\u5931\u628a\u6b63\u6837\u672c\u5bf9\u62c9\u8fd1\u3001\u628a\u8d1f\u6837\u672c\u63a8\u8fdc\u3002\u9065\u611f\u91cc\uff0c\u201c\u540c\u4e00\u5730\u70b9\u7684\u4e0d\u540c\u5b63\u8282\u201d\uff08SeCo\uff09\u6216\u201c\u540c\u4e00\u65f6\u523b\u7684\u96f7\u8fbe\u548c\u5149\u5b66\u201d\uff08CROMA\uff09\u4e5f\u53ef\u4ee5\u5f53\u6b63\u6837\u672c\u5bf9\u3002',
    items: [
      ['r', 16, 90, 64, 50, 3, '\u4e00\u5f20\u56fe', { tc: 'xs ink' }],
      ['a', 80, 105, 116, 60, 'k'], ['a', 80, 125, 116, 170, 'k'],
      ['r', 116, 40, 74, 40, 1, '\u589e\u5f3a 1\n\u88c1\u526a+\u8c03\u8272', { tc: 'xs ink' }],
      ['r', 116, 150, 74, 40, 1, '\u589e\u5f3a 2\n\u88c1\u526a+\u8c03\u8272', { tc: 'xs ink' }],
      ['a', 190, 60, 214, 60, 'k'], ['a', 190, 170, 214, 170, 'k'],
      ['r', 214, 40, 74, 40, 5, '\u7f16\u7801\u5668', { tc: 'xs ink' }], ['r', 214, 150, 74, 40, 5, '\u7f16\u7801\u5668', { tc: 'xs ink' }],
      ['t', 251, 115, '\u5171\u4eab\u6743\u91cd', 'xs'],
      ['a', 288, 60, 312, 60, 'k'], ['a', 288, 170, 312, 170, 'k'],
      ['c', 330, 60, 14, 2, 'z\u2081', 'xs ink b'], ['c', 330, 170, 14, 2, 'z\u2082', 'xs ink b'],
      ['a', 330, 78, 330, 152, 'g', { both: 1, bold: 1 }],
      ['t', 344, 115, '\u62c9\u8fd1', 'sm g', 'start'],
      ['c', 450, 70, 12, 0, ''], ['c', 480, 120, 12, 0, ''], ['c', 440, 170, 12, 0, ''],
      ['t', 462, 200, '\u6279\u91cc\u7684\u5176\u4ed6\u56fe\uff08\u8d1f\u6837\u672c\uff09', 'xs'],
      ['a', 346, 62, 436, 70, 'r', { dash: 1 }], ['a', 346, 168, 426, 168, 'r', { dash: 1 }],
      ['t', 400, 50, '\u63a8\u8fdc', 'sm v']
    ]
  });

  // 8. MAE
  (function () {
    var it = [['t', 70, 18, '\u8f93\u5165\uff1a\u906e\u4f4f 75%', 'sm ink b']];
    var g = []; var vis = [1, 6, 11, 12];
    for (var i = 0; i < 16; i++) g.push(vis.indexOf(i) >= 0 ? '1' : 'c');
    it.push(['g', 22, 30, 4, 4, 24, 24, g]);
    it.push(['t', 70, 140, '\u7070 = \u906e\u4f4f\uff0c\u84dd = \u770b\u5f97\u89c1', 'xs']);
    it.push(['a', 124, 78, 150, 78, 'k']);
    it.push(['r', 150, 50, 116, 56, 5, '\u7f16\u7801\u5668\n\u53ea\u5904\u7406 4 \u4e2a\u53ef\u89c1\u5757', { tc: 'xs ink' }]);
    it.push(['a', 266, 78, 292, 78, 'k']);
    it.push(['r', 292, 50, 100, 56, 0, '\u8865\u4e0a 12 \u4e2a\n\u201c\u906e\u6321\u5360\u4f4d\u201dtoken', { tc: 'xs ink' }]);
    it.push(['a', 392, 78, 412, 78, 'k']);
    it.push(['r', 412, 50, 92, 56, 1, '\u5c0f\u89e3\u7801\u5668\n\u91cd\u5efa\u50cf\u7d20', { tc: 'xs ink' }]);
    it.push(['t', 330, 140, '\u635f\u5931\u53ea\u7b97\u88ab\u906e\u4f4f\u7684 12 \u5757\uff1a\u91cd\u5efa\u503c\u548c\u539f\u50cf\u7d20\u7684\u5747\u65b9\u8bef\u5dee', 'xs ink']);
    it.push(['t', 330, 160, '\u9884\u8bad\u7ec3\u5b8c\u6254\u6389\u89e3\u7801\u5668\uff0c\u53ea\u7559\u7f16\u7801\u5668\u7ed9\u4e0b\u6e38\u4efb\u52a1\u7528', 'xs']);
    F('mae', {
      w: 520, h: 176, items: it,
      cap: '\u63a9\u7801\u81ea\u7f16\u7801\u5668 MAE\u3002\u968f\u673a\u906e\u4f4f\u5927\u90e8\u5206\u56fe\u5757\uff0c\u7f16\u7801\u5668\u53ea\u770b\u5269\u4e0b\u7684\u5c11\u6570\uff08\u6240\u4ee5\u9884\u8bad\u7ec3\u5f88\u7701\u7b97\u529b\uff09\uff0c\u4e00\u4e2a\u5f88\u5c0f\u7684\u89e3\u7801\u5668\u8d1f\u8d23\u628a\u88ab\u906e\u4f4f\u7684\u90e8\u5206\u753b\u56de\u6765\u3002\u906e\u5f97\u591a\uff0c\u6a21\u578b\u5c31\u4e0d\u80fd\u9760\u201c\u6284\u90bb\u5c45\u63d2\u503c\u201d\u8499\u6df7\uff0c\u53ea\u80fd\u771f\u6b63\u7406\u89e3\u5f71\u50cf\u7684\u7ed3\u6784\u3002'
    });
  })();

  // 9. DINO \u81ea\u84b8\u998f
  F('dino', {
    w: 520, h: 210,
    cap: '\u81ea\u84b8\u998f\uff08DINO \u7cfb\u5217\uff09\u3002\u5b66\u751f\u548c\u6559\u5e08\u7ed3\u6784\u76f8\u540c\uff0c\u770b\u540c\u4e00\u5f20\u56fe\u7684\u4e0d\u540c\u88c1\u526a\uff1b\u5b66\u751f\u88ab\u8bad\u7ec3\u53bb\u8f93\u51fa\u548c\u6559\u5e08\u4e00\u6837\u7684\u5206\u5e03\u3002\u6559\u5e08\u4e0d\u9760\u68af\u5ea6\u66f4\u65b0\uff0c\u800c\u662f\u5b66\u751f\u53c2\u6570\u7684\u6ed1\u52a8\u5e73\u5747\uff08\u53d8\u5316\u5f88\u6162\u3001\u5f88\u7a33\u5b9a\uff09\u3002\u518d\u914d\u5408\u201c\u4e2d\u5fc3\u5316 + \u9510\u5316\u201d\uff0c\u9632\u6b62\u4e24\u8005\u5077\u61d2\u8f93\u51fa\u540c\u4e00\u4e2a\u5e38\u6570\uff08\u574d\u584c\uff09\u3002DINOv2 \u7684\u7279\u5f81\u51bb\u7ed3\u4e86\u4e5f\u5f88\u597d\u7528\u3002',
    items: [
      ['r', 16, 80, 60, 50, 3, '\u4e00\u5f20\u56fe', { tc: 'xs ink' }],
      ['a', 76, 95, 110, 50, 'k'], ['a', 76, 115, 110, 160, 'k'],
      ['r', 110, 30, 90, 40, 1, '\u5c0f\u88c1\u526a\uff08\u5c40\u90e8\uff09', { tc: 'xs ink' }],
      ['r', 110, 140, 90, 40, 1, '\u5927\u88c1\u526a\uff08\u5168\u5c40\uff09', { tc: 'xs ink' }],
      ['a', 200, 50, 226, 50, 'k'], ['a', 200, 160, 226, 160, 'k'],
      ['r', 226, 30, 80, 40, 5, '\u5b66\u751f', { tc: 'sm ink' }], ['r', 226, 140, 80, 40, 4, '\u6559\u5e08', { tc: 'sm ink' }],
      ['a', 266, 72, 266, 136, 'g', { dash: 1 }],
      ['t', 272, 104, '\u53c2\u6570\u6ed1\u52a8\u5e73\u5747', 'xs g', 'start'],
      ['a', 306, 50, 360, 90, 'k'], ['a', 306, 160, 360, 120, 'k'],
      ['r', 360, 84, 140, 44, 2, '\u5b66\u751f\u8f93\u51fa \u2248 \u6559\u5e08\u8f93\u51fa', { tc: 'xs ink' }],
      ['t', 430, 150, '\u68af\u5ea6\u53ea\u66f4\u65b0\u5b66\u751f', 'xs']
    ]
  });

  // 10. CLIP
  (function () {
    var it = [
      ['r', 16, 30, 80, 40, 3, '\u56fe\u50cf\u7f16\u7801\u5668', { tc: 'xs ink' }],
      ['r', 16, 140, 80, 40, 2, '\u6587\u672c\u7f16\u7801\u5668', { tc: 'xs ink' }],
      ['t', 56, 20, '\u4e00\u6279 N \u5f20\u56fe', 'xs'], ['t', 56, 196, '\u5bf9\u5e94\u7684 N \u6bb5\u6587\u5b57', 'xs'],
      ['a', 96, 50, 160, 70, 'k'], ['a', 96, 160, 160, 140, 'k']
    ];
    var v = []; for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) v.push(r === c ? 0.85 : 0.1);
    it.push(['g', 170, 50, 4, 4, 28, 28, v, { ramp: 'g', txt: ['\u2713', '', '', '', '', '\u2713', '', '', '', '', '\u2713', '', '', '', '', '\u2713'], tc: 'sm ink b' }]);
    it.push(['t', 226, 40, '\u56fe \u00d7 \u6587 \u76f8\u4f3c\u5ea6\u77e9\u9635', 'xs ink']);
    it.push(['t', 226, 176, '\u5bf9\u89d2\u7ebf = \u914d\u5bf9\u7684\u56fe\u6587\uff08\u62c9\u8fd1\uff09', 'xs g']);
    it.push(['t', 226, 192, '\u5176\u4f59 = \u4e0d\u914d\u5bf9\uff08\u63a8\u8fdc\uff09', 'xs']);
    it.push(['r', 330, 70, 180, 70, 0, '\u7528\u7684\u65f6\u5019\uff1a\u628a\u7c7b\u522b\u540d\u5199\u6210\u53e5\u5b50\n\u201c\u4e00\u5f20\u6cb3\u6d41\u7684\u536b\u661f\u56fe\u201d\u2026\u2026\n\u770b\u56fe\u50cf\u548c\u54ea\u53e5\u6700\u50cf', { tc: 'xs ink' }]);
    it.push(['a', 290, 105, 330, 105, 'k']);
    F('clip', {
      w: 520, h: 210, items: it,
      cap: 'CLIP \u7684\u56fe\u6587\u5bf9\u6bd4\u9884\u8bad\u7ec3\u3002\u4e00\u6279\u91cc N \u5f20\u56fe\u548c\u5b83\u4eec\u7684 N \u6bb5\u6587\u5b57\u8bf4\u660e\uff0c\u4e24\u4e24\u7b97\u76f8\u4f3c\u5ea6\uff0c\u5f97\u5230 N\u00d7N \u77e9\u9635\uff1b\u8bad\u7ec3\u8ba9\u5bf9\u89d2\u7ebf\uff08\u771f\u6b63\u914d\u5bf9\u7684\uff09\u6700\u5927\u3002\u5b66\u5b8c\u4e4b\u540e\u56fe\u50cf\u548c\u6587\u5b57\u843d\u5728\u540c\u4e00\u4e2a\u7a7a\u95f4\u91cc\uff0c\u6240\u4ee5\u53ef\u4ee5\u7528\u6587\u5b57\u53bb\u201c\u67e5\u201d\u56fe\u50cf\u2014\u2014\u5f00\u653e\u8bcd\u6c47\u5206\u5272\u3001\u5f00\u653e\u8bcd\u6c47\u53d8\u5316\u68c0\u6d4b\u90fd\u9760\u8fd9\u4e00\u70b9\u3002'
    });
  })();

  // 11. LoRA
  F('lora', {
    w: 520, h: 210,
    cap: 'LoRA\uff1a\u51bb\u7ed3\u539f\u6765\u7684\u5927\u77e9\u9635 W\uff0c\u53ea\u5728\u65c1\u8fb9\u52a0\u4e00\u6761\u201c\u7ec6\u8def\u201d\uff1a\u5148\u7528 A \u628a 768 \u7ef4\u538b\u5230 r \u7ef4\uff08\u6bd4\u5982 8\uff09\uff0c\u518d\u7528 B \u653e\u56de 768 \u7ef4\u3002\u53ef\u8bad\u7ec3\u53c2\u6570\u4ece 768\u00d7768 = 589,824 \u4e2a\u964d\u5230 2\u00d7768\u00d78 = 12,288 \u4e2a\uff08\u7ea6 2%\uff09\u3002B \u521d\u59cb\u5316\u4e3a 0\uff0c\u6240\u4ee5\u8bad\u7ec3\u4e00\u5f00\u59cb\u6a21\u578b\u548c\u539f\u6765\u5b8c\u5168\u4e00\u6837\u3002',
    items: [
      ['t', 30, 104, 'x', 'lg b'],
      ['a', 42, 100, 90, 60, 'k'], ['a', 42, 108, 90, 150, 'k'],
      ['r', 90, 30, 160, 60, 0, 'W\uff08\u51bb\u7ed3\uff09\n768 \u00d7 768', { tc: 'sm ink', bold: 1 }],
      ['r', 90, 132, 60, 44, 5, 'A\nr \u00d7 768', { tc: 'xs ink' }],
      ['a', 150, 154, 186, 154, 'k'], ['t', 168, 144, 'r \u7ef4', 'xs'],
      ['r', 186, 132, 64, 44, 5, 'B\n768 \u00d7 r', { tc: 'xs ink' }],
      ['a', 250, 60, 300, 96, 'k'], ['a', 250, 154, 300, 114, 'k'],
      ['c', 314, 105, 14, 6, '+'],
      ['a', 328, 105, 364, 105, 'k'],
      ['t', 376, 109, 'Wx + BAx', 'sm ink mono', 'start'],
      ['t', 170, 196, '\u53ea\u8bad\u7ec3 A \u548c B\uff08r = 8 \u65f6\u7ea6 1.2 \u4e07\u4e2a\u53c2\u6570\uff09', 'xs o'],
      ['t', 400, 150, '\u8bad\u7ec3\u5b8c\u53ef\u4ee5\u628a BA \u5408\u5e76\u8fdb W\uff0c', 'xs', 'middle'], ['t', 400, 166, '\u63a8\u7406\u4e0d\u589e\u52a0\u8ba1\u7b97', 'xs', 'middle']
    ]
  });

  // 12. \u5927\u6a21\u578b\u505a\u53d8\u5316\u68c0\u6d4b\u7684\u4e24\u79cd\u63a5\u6cd5
  F('fm_siam', {
    w: 520, h: 230, min: 460,
    cap: '\u628a\u5927\u6a21\u578b\u7528\u5230\u53cc\u65f6\u76f8\u53d8\u5316\u68c0\u6d4b\u7684\u4e24\u79cd\u63a5\u6cd5\u3002\u5de6\uff1a\u5b6a\u751f\u2014\u2014\u540c\u4e00\u4e2a\u9884\u8bad\u7ec3\u7f16\u7801\u5668\u5206\u522b\u5904\u7406\u4e24\u671f\uff0c\u5f97\u5230\u4e24\u7ec4\u7279\u5f81\u540e\u76f8\u51cf\u6216\u62fc\u63a5\uff0c\u518d\u63a5\u4e00\u4e2a\u53d8\u5316\u89e3\u7801\u5668\uff08\u5355\u671f\u6a21\u578b\u90fd\u80fd\u8fd9\u6837\u7528\uff09\u3002\u53f3\uff1a\u539f\u751f\u65f6\u5e8f\u2014\u2014\u6a21\u578b\u672c\u6765\u5c31\u5403\u65f6\u95f4\u5e8f\u5217\uff08\u5982 OlmoEarth\uff09\uff0c\u76f4\u63a5\u628a\u4e24\u671f\u5f53\u957f\u5ea6\u4e3a 2 \u7684\u5e8f\u5217\u9001\u8fdb\u53bb\uff0c\u8ba9\u6a21\u578b\u5185\u90e8\u6bd4\u8f83\u3002',
    items: [
      ['t', 130, 18, '\u5b6a\u751f\u63a5\u6cd5', 'sm ink b'],
      ['r', 16, 34, 54, 34, 3, 't1', { tc: 'sm ink' }], ['r', 16, 120, 54, 34, 3, 't2', { tc: 'sm ink' }],
      ['a', 70, 51, 96, 51, 'k'], ['a', 70, 137, 96, 137, 'k'],
      ['r', 96, 30, 86, 42, 5, '\u7f16\u7801\u5668', { tc: 'xs ink' }], ['r', 96, 116, 86, 42, 5, '\u7f16\u7801\u5668', { tc: 'xs ink' }],
      ['t', 139, 94, '\u540c\u4e00\u5957\u6743\u91cd', 'xs'],
      ['a', 182, 51, 210, 86, 'k'], ['a', 182, 137, 210, 102, 'k'],
      ['r', 210, 74, 40, 40, 0, '|\u0394|\n\u6216\u62fc\u63a5', { tc: 'xs ink' }],
      ['a', 230, 114, 230, 140, 'k'],
      ['r', 186, 140, 88, 34, 2, '\u53d8\u5316\u89e3\u7801\u5668', { tc: 'xs ink' }],
      ['a', 230, 174, 230, 196, 'k'], ['r', 196, 196, 68, 26, 4, '\u53d8\u5316\u56fe', { tc: 'xs ink' }],
      ['l', 290, 20, 290, 220, 'm', { dash: 1, thin: 1 }],
      ['t', 410, 18, '\u539f\u751f\u65f6\u5e8f\u63a5\u6cd5', 'sm ink b'],
      ['r', 310, 50, 50, 34, 3, 't1', { tc: 'sm ink' }], ['r', 366, 50, 50, 34, 3, 't2', { tc: 'sm ink' }],
      ['t', 452, 67, '\u957f\u5ea6 2 \u7684\u5e8f\u5217', 'xs', 'start'],
      ['a', 363, 84, 363, 110, 'k'],
      ['r', 310, 110, 160, 44, 5, '\u65f6\u5e8f\u57fa\u7840\u6a21\u578b\n\uff08\u5185\u90e8\u6bd4\u8f83\u4e24\u671f\uff09', { tc: 'xs ink' }],
      ['a', 390, 154, 390, 176, 'k'],
      ['r', 340, 176, 100, 30, 2, '\u89e3\u7801\u5668 \u2192 \u53d8\u5316\u56fe', { tc: 'xs ink' }]
    ]
  });

  // 13. VMamba \u56db\u5411\u626b\u63cf
  (function () {
    var it = [];
    var dirs = [['\u2192 \u9010\u884c', 0], ['\u2193 \u9010\u5217', 1], ['\u2190 \u9010\u884c\u53cd\u5411', 2], ['\u2191 \u9010\u5217\u53cd\u5411', 3]];
    dirs.forEach(function (d, i) {
      var x0 = 20 + i * 126, y0 = 34, c = 22;
      var g = []; for (var k = 0; k < 16; k++) g.push('1');
      it.push(['g', x0, y0, 4, 4, c, c, g]);
      it.push(['t', x0 + 44, 20, d[0], 'xs ink b']);
      var pts = [];
      for (var s = 0; s < 4; s++) {
        if (d[1] === 0) pts.push(x0 + 6, y0 + s * c + 11, x0 + 4 * c - 6, y0 + s * c + 11);
        if (d[1] === 2) pts.push(x0 + 4 * c - 6, y0 + s * c + 11, x0 + 6, y0 + s * c + 11);
        if (d[1] === 1) pts.push(x0 + s * c + 11, y0 + 6, x0 + s * c + 11, y0 + 4 * c - 6);
        if (d[1] === 3) pts.push(x0 + s * c + 11, y0 + 4 * c - 6, x0 + s * c + 11, y0 + 6);
      }
      for (var q = 0; q < 4; q++) it.push(['a', pts[q * 4], pts[q * 4 + 1], pts[q * 4 + 2], pts[q * 4 + 3], 'r', { thin: 1 }]);
      it.push(['a', x0 + 44, 128, x0 + 44, 150, 'k']);
    });
    it.push(['r', 20, 150, 480, 34, 5, '\u56db\u6761\u5e8f\u5217\u5404\u81ea\u8fc7\u9009\u62e9\u6027\u72b6\u6001\u7a7a\u95f4\u6a21\u578b\uff0c\u518d\u6309\u4f4d\u7f6e\u52a0\u56de\u540c\u4e00\u5f20\u7279\u5f81\u56fe', { tc: 'xs ink' }]);
    F('ssm_scan', {
      w: 520, h: 196, items: it,
      cap: 'VMamba \u7684\u4e8c\u7ef4\u9009\u62e9\u6027\u626b\u63cf\u3002\u72b6\u6001\u7a7a\u95f4\u6a21\u578b\u50cf\u8bfb\u53e5\u5b50\u4e00\u6837\u6309\u987a\u5e8f\u8bfb token\uff0c\u53ea\u80fd\u201c\u8bb0\u4f4f\u524d\u9762\u7684\u201d\uff1b\u56fe\u50cf\u6ca1\u6709\u5929\u7136\u7684\u5148\u540e\uff0c\u4e8e\u662f\u6cbf\u56db\u4e2a\u65b9\u5411\u5404\u5c55\u5f00\u4e00\u6b21\uff0c\u6bcf\u4e2a\u4f4d\u7f6e\u5c31\u80fd\u7efc\u5408\u6765\u81ea\u4e0a\u4e0b\u5de6\u53f3\u7684\u4fe1\u606f\uff0c\u8ba1\u7b97\u91cf\u4ecd\u968f\u50cf\u7d20\u6570\u7ebf\u6027\u589e\u957f\u3002'
    });
  })();

  // 14. SAM
  F('sam', {
    w: 520, h: 200,
    cap: 'SAM \u7684\u4e09\u90e8\u5206\u3002\u91cd\u578b\u7684\u56fe\u50cf\u7f16\u7801\u5668\uff08ViT\uff09\u628a\u6574\u5f20\u56fe\u7f16\u7801\u4e00\u6b21\uff0c\u5f97\u5230\u8f93\u5165 1/16 \u5206\u8fa8\u7387\u7684\u5d4c\u5165\uff1b\u63d0\u793a\u7f16\u7801\u5668\u628a\u70b9\u3001\u6846\u3001\u63a9\u819c\u7f16\u7801\u6210 token\uff1b\u8f7b\u91cf\u7684\u63a9\u819c\u89e3\u7801\u5668\u628a\u4e24\u8005\u7ed3\u5408\uff0c\u51e0\u5341\u6beb\u79d2\u5c31\u8f93\u51fa\u63a9\u819c\uff08\u4e3a\u4e86\u5e94\u5bf9\u201c\u70b9\u4e00\u4e0b\u53ef\u80fd\u6307\u6574\u680b\u697c\u4e5f\u53ef\u80fd\u6307\u4e00\u6247\u7a97\u201d\u7684\u6b67\u4e49\uff0c\u4f1a\u7ed9\u51fa\u51e0\u4e2a\u5019\u9009\u5e76\u6253\u5206\uff09\u3002\u5b83\u4e0d\u77e5\u9053\u63a9\u819c\u662f\u4ec0\u4e48\u7c7b\u522b\u3002',
    items: [
      ['r', 16, 40, 64, 44, 3, '\u5f71\u50cf', { tc: 'sm ink' }],
      ['a', 80, 62, 110, 62, 'k'],
      ['r', 110, 30, 130, 64, 5, '\u56fe\u50cf\u7f16\u7801\u5668\uff08ViT\uff09\n\u53ea\u7b97\u4e00\u6b21', { tc: 'xs ink', bold: 1 }],
      ['a', 240, 62, 300, 90, 'k'], ['t', 270, 60, '1/16 \u5d4c\u5165', 'xs'],
      ['r', 16, 130, 64, 44, 1, '\u70b9 / \u6846\n/ \u63a9\u819c', { tc: 'xs ink' }],
      ['a', 80, 152, 110, 152, 'k'],
      ['r', 110, 130, 130, 44, 1, '\u63d0\u793a\u7f16\u7801\u5668', { tc: 'xs ink' }],
      ['a', 240, 152, 300, 120, 'k'],
      ['r', 300, 80, 110, 50, 2, '\u63a9\u819c\u89e3\u7801\u5668\n\uff08\u8f7b\u91cf\uff09', { tc: 'xs ink' }],
      ['a', 410, 105, 436, 105, 'k'],
      ['r', 436, 76, 72, 58, 4, '\u51e0\u4e2a\u5019\u9009\n\u63a9\u819c + \u5206\u6570', { tc: 'xs ink' }],
      ['t', 360, 160, '\u6ca1\u6709\u7c7b\u522b\uff1a\u53ea\u77e5\u9053\u201c\u8fd9\u662f\u4e00\u5757\u4e1c\u897f\u201d', 'xs v']
    ]
  });
})();
