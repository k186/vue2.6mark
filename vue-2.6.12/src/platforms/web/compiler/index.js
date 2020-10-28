/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'
/*更具基础规则创建一个 compile*/
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
