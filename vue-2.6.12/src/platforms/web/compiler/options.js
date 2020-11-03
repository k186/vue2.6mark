/* @flow */

import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace
} from '../util/index'

import modules from './modules/index'
import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'
/*这里默认配置 用于创建基础的compiler */
/*编译器 基础配置*/
export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,/*默认attrs class v-model变形 style*/
  directives,/*默认节点指令 html model text*/
  isPreTag,/*是否是上一个节点*/
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
