import Vue from './instance/index'//vue 实例 里面就是vue实例的初始化流程了
import { initGlobalAPI /*全局API*/ } from './global-api/index'
import { isServerRendering /*是否服务端渲染*/} from 'core/util/env'
import { FunctionalRenderContext /*render函数*/} from 'core/vdom/create-functional-component'
/*初始化全局API*/
initGlobalAPI(Vue)

/*当前 Vue 实例是否运行于服务器。 https://cn.vuejs.org/v2/api/#vm-isServer*/
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
/*服务端渲染Vnode */
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

/*提供给服务端渲染函数*/
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
