
/** 
 * 变量名格式转换
 * kebab-case 格式转换成 kebabCase 格式 
 * kebabCase格式的属性ElementPlus组件生效
 */
export const kebabToCamel = (attrList: any) => {
  // 筛选 kebab-case 格式
  const includeUppercaseLetters = attrList.filter((item: any) => {
    // 这里是浅拷贝，还是引用了newAttrList指向的对象的地址
    if (item.prop.includes('-')) {
      return item
    }
  })

  if (!includeUppercaseLetters[0]) return

  // 拼接
  for (let attr of includeUppercaseLetters) {
    // 分隔单词
    let split = attr.prop.split('-')
    // 第一个单词，如果是undefined就给空串
    let prop = split[0] ?? ''
    for (let i = 1; i < split.length; i++) {
      // 第二个单词开始首字母转大写
      const word = split[i]
      // 空串继续下一次循环
      if (!word) continue
      const upperLetter = word[0]?.toUpperCase()
      // 切片剩下的字母
      const rest = word.slice(1)
      const letter = upperLetter + rest
      prop += letter
    }
    // 赋值，引用的还是newAttrList指向的对象的地址
    attr.prop = prop as string
  }
}