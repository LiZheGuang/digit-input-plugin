# vue2 下限制数字位数自定义指令

## DEMO

```
<input type="number"  v-digit-input={integer:4,point:2}></input>
<input type="number"  v-digit-input></input>
```
## install

```
npm i digitinputplugin
```

## 怎么使用
```js
import Vue from 'vue'
import DigitInputPlugin from "digitinputplugin"

Vue.use(DigitInputPlugin)
```
## about

使用：v-digit-input={integer:4,point:2}

不传 v-digit-input 前 6 后 4

默认 6,4 代表小数点前 6 位与后 4 位

keydown 限制用户输入特定的字符- + e
