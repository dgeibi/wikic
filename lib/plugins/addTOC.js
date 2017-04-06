const toc = require('html-toc')
const isObject = require('isobject')

module.exports = (context) => {
  if (!isObject(context)) throw Error('expect context to be a Object')
  if (!isObject(context.config)) throw Error('expect context.config to be a Object')
  if (!isObject(context.config.page)) throw Error('expect context.config.page to be a Object')
  if (!context.config.page.toc) return context

  const opts = Object.assign(
    {},
    {
      selectors: 'h1, h2',
      minLength: 0,
      header: '',
      id: '#toc',
    },
    context.config.toc,
    {
      anchorTemplate: id => ` <a class="anchor" href="#${id}">#</a>`,
      slugify: string => string.replace(/[\s&/\\#,.+=$~%'":*?<>{}\][()@`]/g, '').toLowerCase(),
    }
  )

  const data = toc(context.data, opts)
  return Object.assign(context, { data })
}