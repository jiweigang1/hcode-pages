/* global hexo */

'use strict';

const { basename } = require('path');
const cheerio = require('cheerio');
const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support.js')(lunr);
require('lunr-languages/lunr.zh.js')(lunr);
require('lunr-languages/lunr.multi.js')(lunr);
const full_url_for = hexo.extend.helper.get('full_url_for').bind(hexo);

const localizedPath = ['docs', 'api'];

hexo.extend.helper.register('page_nav', function() {
  const type = this.page.canonical_path.split('/')[0];
  const sidebar = this.site.data.sidebar[type];
  const path = basename(this.path);
  const list = {};
  const prefix = 'sidebar.' + type + '.';

  for (const i in sidebar) {
    for (const j in sidebar[i]) {
      list[sidebar[i][j]] = j;
    }
  }

  const keys = Object.keys(list);
  const index = keys.indexOf(path);
  let result = '';

  if (index > 0) {
    result += `<a href="${keys[index - 1]}" class="article-footer-prev" title="${this.__(prefix + list[keys[index - 1]])}"><i class="fa fa-chevron-left"></i><span>${this.__('page.prev')}</span></a>`;
  }

  if (index < keys.length - 1) {
    result += `<a href="${keys[index + 1]}" class="article-footer-next" title="${this.__(prefix + list[keys[index + 1]])}"><span>${this.__('page.next')}</span><i class="fa fa-chevron-right"></i></a>`;
  }

  return result;
});

hexo.extend.helper.register('doc_sidebar', function(className) {
  const type = this.page.canonical_path.split('/')[0];
  const sidebar = this.site.data.sidebar[type];
  const path = basename(this.path);
  let result = '';
  const self = this;
  const prefix = 'sidebar.' + type + '.';

  if (typeof sidebar === 'undefined') {
    return '';
  }

  for (const [title, menu] of Object.entries(sidebar)) {
    result += '<strong class="' + className + '-title">' + self.__(prefix + title) + '</strong>';

    for (const [text, link] of Object.entries(menu)) {
      let itemClass = className + '-link';
      if (link === path) itemClass += ' current';

      result += '<a href="' + link + '" class="' + itemClass + '">' + self.__(prefix + text) + '</a>';
    }
  }

  return result;
});

hexo.extend.helper.register('header_menu', function(className) {

  /**
   * Header Menu 辅助函数 - 生成网站顶部导航菜单
   *
   * 功能说明：
   * 1. 读取站点配置中的菜单数据，动态生成导航链接
   * 2. 支持多语言环境下的路径处理
   * 3. 根据当前页面语言自动调整链接路径
   * 4. 使用国际化翻译显示菜单文本
   *
   * @param {string} className - CSS类名前缀，用于生成菜单项的样式类
   * @returns {string} - 生成的HTML导航菜单字符串
   *
   * 使用示例：
   * <%- header_menu('header') %>
   * 输出：<a href="/docs/" class="header-link">文档</a>
   *
   * 数据结构：
   * this.site.data.menu 格式：
   * {
   *   "home": "/",
   *   "docs": "/docs/",
   *   "api": "/api/",
   *   "themes": "/themes/",
   *   "plugins": "/plugins/",
   *   "news": "/news/"
   * }
   *
   * 多语言处理逻辑：
   * - 当前语言为中文(zh-cn)时，使用原始路径
   * - 当前语言为其他语言时，对特定菜单项(docs, api)添加语言前缀
   * - 例如：英文环境下，"/docs/" 会变成 "/en/docs/"
   */

  // 获取站点菜单配置数据
  const menu = this.site.data.menu;
  let result = '';
  const self = this;

  // 获取当前页面语言
  const lang = this.page.lang;

  // 判断是否为中文环境（注意：这里逻辑是反的，变量名可能有误）
  // 当语言是 zh-cn 时，isEnglish 为 true，表示使用默认中文路径
  const isEnglish = lang === 'zh-cn';

  // 遍历菜单配置，生成每个菜单项
  for (const [title, path] of Object.entries(menu)) {
    let langPath = path; // 默认使用原始路径

    // 多语言路径处理
    // 如果不是中文环境，且菜单项需要本地化（docs或api），则添加语言前缀
    if (!isEnglish && ~localizedPath.indexOf(title)) {
      langPath = lang + path; // 例如：/en/docs/
    }

    // 生成菜单项HTML
    // 使用 url_for 辅助函数生成完整的URL路径
    // 使用 __() 函数获取菜单项的国际化翻译文本
    result += `<a href="${self.url_for(langPath)}" class="${className}-link">${self.__('menu.' + title)}</a>`;
  }

  return result;
});

hexo.extend.helper.register('canonical_url', function(lang) {

  /**
   * Canonical URL 辅助函数 - 生成规范化的URL地址
   *
   * 功能说明：
   * 1. 根据当前页面路径和目标语言生成规范的URL
   * 2. 处理多语言环境下的URL路径规范化
   * 3. 移除路径中已有的语言前缀，重新构建正确的语言路径
   * 4. 确保生成的URL符合SEO最佳实践
   *
   * @param {string} lang - 目标语言代码（如 'zh-cn', 'en' 等）
   * @returns {string} - 完整的规范化URL地址
   *
   * 使用示例：
   * <%- canonical_url('en') %>
   * 输出：https://hexo.io/en/docs/
   *
   * 算法逻辑：
   * 1. 将当前页面路径按 '/' 分割成数组，过滤掉空字符串
   * 2. 检查路径第一段是否为已知的语言代码
   * 3. 如果是语言代码，则移除它（避免重复语言前缀）
   * 4. 如果目标语言不是中文(zh-cn)，在路径开头添加语言代码
   * 5. 重新组合路径并使用 full_url_for 生成完整URL
   *
   * 示例路径处理：
   * - 当前路径: "/en/docs/install.html", 目标语言: "en"
   * - 处理后: "docs/install.html" → "en/docs/install.html"
   * - 最终URL: "https://hexo.io/en/docs/install.html"
   *
   * - 当前路径: "/docs/install.html", 目标语言: "zh-cn"
   * - 处理后: "docs/install.html"（保持原样，中文无语言前缀）
   * - 最终URL: "https://hexo.io/docs/install.html"
   */

  // 将当前页面路径分割成数组，过滤掉空字符串
  // 例如："/en/docs/install.html" → ["en", "docs", "install.html"]
  const slugs = this.page.path.split('/').filter(v => v !== '');

  // 检查路径第一段是否为语言代码
  // 如果是，则移除它，避免重复添加语言前缀
  if (Object.keys(this.site.data.languages).includes(slugs[0])) {
    slugs.shift(); // 移除第一个元素（语言代码）
  }

  // 如果目标语言不是中文，在路径开头添加语言代码
  // 中文环境(zh-cn)不需要语言前缀，其他语言需要
  if (lang !== 'zh-cn') {
    slugs.unshift(lang); // 在数组开头添加语言代码
  }

  // 重新组合路径
  const path = slugs.join('/');

  // 使用 full_url_for 辅助函数生成完整的URL地址
  return full_url_for(path);
});

hexo.extend.helper.register('url_for_lang', function(path) {

  /**
   * URL for Language 辅助函数 - 生成带语言前缀的URL地址
   *
   * 功能说明：
   * 1. 根据当前页面语言为URL路径添加对应的语言前缀
   * 2. 支持多语言环境下的链接生成
   * 3. 智能处理相对路径和绝对路径
   * 4. 中文环境下保持原始路径，其他语言添加语言前缀
   *
   * @param {string} path - 原始路径（可以是相对路径或绝对路径）
   * @returns {string} - 带语言前缀的URL路径
   *
   * 使用示例：
   * <%- url_for_lang('/docs/install.html') %>
   * 输出（英文环境）：/en/docs/install.html
   * 输出（中文环境）：/docs/install.html
   *
   * 算法逻辑：
   * 1. 获取当前页面的语言环境
   * 2. 使用 Hexo 内置的 url_for 函数处理基础路径
   * 3. 判断是否需要添加语言前缀：
   *    - 当前语言不是中文(zh-cn)
   *    - 且路径是绝对路径（以'/'开头）
   * 4. 在路径开头添加语言代码前缀
   *
   * 路径处理示例：
   * - 当前语言: "en", 输入路径: "/docs/install.html"
   *   处理结果: "/en/docs/install.html"
   *
   * - 当前语言: "zh-cn", 输入路径: "/docs/install.html"
   *   处理结果: "/docs/install.html"（中文环境，无语言前缀）
   *
   * - 当前语言: "en", 输入路径: "images/logo.png"
   *   处理结果: "images/logo.png"（相对路径，不添加语言前缀）
   *
   * 注意事项：
   * - 只对绝对路径（以'/'开头）添加语言前缀
   * - 相对路径保持不变，确保资源文件路径正确
   * - 中文环境(zh-cn)不需要语言前缀，保持URL简洁
   */

  // 获取当前页面的语言环境
  const lang = this.page.lang;

  // 使用 Hexo 内置的 url_for 函数处理基础路径
  // url_for 会处理相对路径、绝对路径和 Base URL 等配置
  let url = this.url_for(path);

  // 多语言路径处理逻辑
  // 1. 当前语言不是中文
  // 2. 且处理后的URL是绝对路径（以'/'开头）
  // 满足条件时，在路径开头添加语言代码前缀
  if (lang !== 'zh-cn' && url[0] === '/') {
    url = '/' + lang + url; // 添加语言前缀，例如：/en/docs/
  }

  return url;
});

hexo.extend.helper.register('raw_link', path => `https://github.com/hexojs/site/edit/master/source/${path}`);

hexo.extend.helper.register('page_anchor', str => {
  const $ = cheerio.load(str, {decodeEntities: false});
  const headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return str;

  headings.each(function() {
    const id = $(this).attr('id');

    $(this)
      .addClass('article-heading')
      .append(`<a class="article-anchor" href="#${id}" aria-hidden="true"></a>`);
  });

  return $.html();
});

hexo.extend.helper.register('plugin_list', function() {
  const partial = hexo.extend.helper.get('partial').bind(this);
  let html = '';

  const type = this.page.data;
  const arr = this.site.data[type];

  if (type === 'themes') {
    // Fisher–Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  if (type === 'plugins') {
    arr.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA < nameB ? -1 : 1;
    });
  }

  for (const plugin of arr) {
    html += partial('partial/' + this.page.partial, { plugin });
  }

  return html;
});

hexo.extend.helper.register('lunr_index', data => {
  const index = lunr(function() {
    this.use(lunr.multiLanguage('en', 'zh'));
    this.field('name', {boost: 10});
    this.field('tags', {boost: 50});
    this.field('description');
    this.ref('name');

    data.forEach(this.add, this);
  });

  return JSON.stringify(index);
});

// Will be replace with full_url_for after hexo v4 release
hexo.extend.helper.register('canonical_path_for_nav', function() {
  const path = this.page.canonical_path;

  if (path.startsWith('docs/') || path.startsWith('api/')) return path;
  return '';
});

hexo.extend.helper.register('lang_name', function(lang) {
  const data = this.site.data.languages[lang];
  return data.name;
});

hexo.extend.helper.register('disqus_lang', function() {
  const lang = this.page.lang;
  const data = this.site.data.languages[lang];

  return data.disqus_lang || lang;
});

hexo.extend.filter.register('template_locals', locals => {
  const { page } = locals;
  if (page.archive) page.title = 'News';
});
