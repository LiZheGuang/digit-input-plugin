/**
 * 使用：v-digit-input={integer:4,point:2}
 * 不传 v-digit-input  前6后4
 * @name digit-input
 * @argument {integer,point}
 * 默认 6,4 代表小数点前6位与后4位
 * keydown 限制用户输入特定的字符- + e
 */
function _debounce(func, delay) {
  let timer; // 定时器
  return function () {
    let context = this; // 记录 this 值,防止在回调函数中丢失
    let args = arguments; // 函数参数

    // 标识是否立即执行
    let isImmediately = !timer;

    //如果定时器存在，则清除定时器(如果没有,也没必要进行处理)
    timer ? clearTimeout(timer) : null;

    timer = setTimeout(() => {
      timer = null;
    }, delay);

    // isImmediately 为 true 则 执行函数(即首次触发事件)
    isImmediately ? func.apply(context, args) : null;
  };
}

const DigitInputPlugin = {
  install(Vue) {
    Vue.directive("digit-input", {
      bind(el, binding) {
        if (!binding.value) {
          binding.value = {
            integer: 6,
            point: 4,
          };
        }
        function debounce_func(event) {
          event.target.dispatchEvent(new Event("input"));
        }
        const dispatchEventInput = _debounce(debounce_func, 16.7);
        const { integer, point } = binding.value;
        let regex = new RegExp(`^\\d{0,${integer}}(\\.\\d{0,${point}})?$`);
        el.addEventListener("keydown", function (event) {
          // 获取要限制的按键数组
          console.log(event, "keydown");
          let restrictedKeys = ["-", "+", "e"];
          // 检查按下的键是否在限制的按键数组中
          if (restrictedKeys.includes(event.key)) {
            event.preventDefault();
          }
        });
        // 不可以输入
        el.addEventListener("input", function (event) {
          let inputValue = event.target.value;
          let isValid = regex.test(inputValue);
          if (!isValid) {
            event.target.value = inputValue.slice(0, -1);
          }
          // 模拟用户输入-避免v-module不同步
          dispatchEventInput(event);
        });
      },
    });
  },
};

export default DigitInputPlugin;
