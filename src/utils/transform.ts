import type { FormItem } from "@/types/form"

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

/** 导出json工具 */
export const exportSchema = (data: FormItem, fileName: string) => {
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    {
      type: 'application/json'
    })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${fileName}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** 将格林威治时间转换为北京时间 */
export const getLocalDateTime = () => {
  const date = new Date()
  // 
  const offset = 8 * 60 * 60 * 1000
  //  getTime() 方法返回一个时间的格林威治时间毫秒数值。
  const local = new Date(date.getTime() + offset)
  return local.toISOString().replace('T', ' ').split('.')[0] as string
}