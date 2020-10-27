/* @flow */

import config from '../config'//没看见使用地方
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'/*内部全局组件 keep-alive*/
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  /*全局配置 https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE*/
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  /*内部使用的一些工具函数 禁止用户使用*/
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  /*全局API https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API*/
  Vue.set = set/*全局set方法*/
  Vue.delete = del/*全局delete 方法*/
  Vue.nextTick = nextTick/*全局nextTick 方法*/

  // 2.6 explicit observable API
  /*全局observaable 方法*/
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
/*全局 components directives filters 初始结构*/
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  /*默认全局组件挂载*/
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)/*Vue.use*/
  initMixin(Vue)/*Vue.mixin*/
  initExtend(Vue)/*Vue.extend*/
  initAssetRegisters(Vue)/*挂载全局 component directive filter 方法*/
}
