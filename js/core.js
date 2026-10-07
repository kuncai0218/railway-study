/* \u5341\u7c73\u89c6\u754c\uff1a\u5185\u5bb9\u6ce8\u518c\u8868\u3002\u5404\u5929\u7684\u8bfe\u7a0b\u3001\u8bba\u6587\u5e93\u3001\u65b9\u6cd5\u9875\u90fd\u901a\u8fc7\u8fd9\u91cc\u767b\u8bb0\uff0capp.js \u53ea\u8bfb\u8fd9\u91cc\u3002 */
(function () {
  var T = window.TENM = window.TENM || {};
  T.days = T.days || [];
  T.lessons = T.lessons || {};
  T.papers = T.papers || {};
  T.paperOrder = T.paperOrder || [];
  T.addDay = function (d) {
    T.days[d.n - 1] = d;
    d.lessons.forEach(function (l, i) { l.day = d.n; l.idx = i; T.lessons[l.id] = l; });
  };
  T.addPapers = function (arr) {
    arr.forEach(function (p) {
      if (!T.papers[p.id]) T.paperOrder.push(p.id);
      T.papers[p.id] = p;
    });
  };
})();
