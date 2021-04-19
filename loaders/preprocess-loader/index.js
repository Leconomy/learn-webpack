const path = require('path')
const utils = require('loader-utils')

const {
  normalizePath
} = require('./shared/utils')

const preprocessor = require('./lib/preprocess')

const ERRORS = {
  html: `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
<!--  #ifdef  %PLATFORM% -->
模板代码
<!--  #endif -->
`,
  js: `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
// #ifdef  %PLATFORM%
js代码
// #endif
`,
  css: `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
/*  #ifdef  %PLATFORM%  */
css代码
/*  #endif  */
`
}


module.exports = function (content, map) {
  this.cacheable && this.cacheable()
  let options = utils.getOptions(this);

  let types = options.type || 'jsx'

  const context = options.context || {}

  if (!Array.isArray(types)) {
    types = [types]
  }
  const resourcePath = this.resourcePath
  types.forEach(type => {
    try {
      content = preprocessor.preprocess(content, context, {
        type
      })
    } catch (e) {
      console.error(`${ERRORS[type]} at ` + normalizePath(path.relative(__dirname,
        resourcePath)) + ':1')
    }
  });
  console.log('----------content', content)
  this.callback(null, content, map)
}
