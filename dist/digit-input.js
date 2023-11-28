function d(i, n) {
  let t;
  return function() {
    let l = this, u = arguments, a = !t;
    t && clearTimeout(t), t = setTimeout(() => {
      t = null;
    }, n), a && i.apply(l, u);
  };
}
const p = {
  install(i) {
    i.directive("digit-input", {
      bind(n, t) {
        t.value || (t.value = {
          integer: 6,
          point: 4
        });
        function l(e) {
          e.target.dispatchEvent(new Event("input"));
        }
        const u = d(l, 16.7), { integer: a, point: r } = t.value;
        let c = new RegExp(`^\\d{0,${a}}(\\.\\d{0,${r}})?$`);
        n.addEventListener("keydown", function(e) {
          ["-", "+", "e"].includes(e.key) && e.preventDefault();
        }), n.addEventListener("input", function(e) {
          let s = e.target.value;
          c.test(s) || (e.target.value = s.slice(0, -1)), u(e);
        });
      }
    });
  }
};
export {
  p as default
};
