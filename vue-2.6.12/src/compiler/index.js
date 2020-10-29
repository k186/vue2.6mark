/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  /*parse 将HTML 转为AST*/
  const ast = parse(template.trim(), options)
  debugger
  if (options.optimize !== false) {
    /*优化 标记静态节点 默认 type 2 false type 3 true
    * 细节判断逻辑
    *  optimize ->isStatic方法内 static 有2个标记 一个是节点 static 一个 staticRoot
    * */
    optimize(ast, options)
  }
  /*ast 转 render 方法*/
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
