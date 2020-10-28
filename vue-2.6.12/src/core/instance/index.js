import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/*Vue 实例*/
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  /*初始化*/
  this._init(options)
}
/*包装Vue 实例*/


initMixin(Vue)/*挂载 _init 方法*/
stateMixin(Vue)/*实例vm Vue.prototype 设置$data $props $set $delete $watch 这里是设置组件和实例的 响应方法？？？*/
eventsMixin(Vue)/*实例vm Vue.prototype $on $once $off $emit*/
lifecycleMixin(Vue)/*vm生命周期 _update $forceUpdate $destroy */
renderMixin(Vue)/*vm render-helpers挂载 $nextTice _render 挂载*/

export default Vue
