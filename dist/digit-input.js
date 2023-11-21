function r(i, n) {
  let e;
  return function() {
    let l = this, u = arguments, a = !e;
    e && clearTimeout(e), e = setTimeout(() => {
      e = null;
    }, n), a && i.apply(l, u);
  };
}
const p = {
  install(i) {
    i.directive("digit-input", {
      bind(n, e) {
        e.value || (e.value = {
          integer: 6,
          point: 4
        });
        function l(t) {
          t.target.dispatchEvent(new Event("input"));
        }
        const u = r(l, 16.7), { integer: a, point: c } = e.value;
        let o = new RegExp(`^\\d{0,${a}}(\\.\\d{0,${c}})?$`);
        n.addEventListener("keydown", function(t) {
          console.log(t, "keydown"), ["-", "+", "e"].includes(t.key) && t.preventDefault();
        }), n.addEventListener("input", function(t) {
          let s = t.target.value;
          o.test(s) || (t.target.value = s.slice(0, -1)), u(t);
        });
      }
    });
  }
};
export {
  p as default
};
