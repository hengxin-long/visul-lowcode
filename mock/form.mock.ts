// import { defineMock } from './base'
import { defineMock } from 'vite-plugin-mock-dev-server'
import { ApiCodeEnum } from '../src/enums/api'
import { FormItem } from '../src/types/form'

/** 表单唯一id */
let id = 1

export default defineMock([
  {
    url: '/mock/form/list',
    method: 'GET',
    // query：查询参数，是 /form/list?page=1&pageSize=10 问号后面的参数
    body({ query }) {
      /** 一类状态的表单数据 */
      let statusData = []
      /** 返回的数据 */
      let fdata = []
      /** 总条数 */
      let ftotal = 0

      /** 当前页 */
      const currentPage = Number(query.page)
      /** 每页条数 */
      const pageSize = Number(query.pageSize)
      /** 表单状态 */
      const formStatus = query.formStatus
      /** 关键字 */
      const keywords = query?.keywords

      let code = ApiCodeEnum.SUCCESS
      let msg = '数据获取成功'

      console.log('进入mock函数', typeof currentPage, typeof pageSize)

      // 按状态筛选
      if (formStatus !== 'all') {
        statusData = formData.filter(item => formStatus === item.status)
        console.info('statusData ', statusData.length)
        ftotal = statusData.length
      } else {
        statusData = formData
        ftotal = formData.length
      }

      // 有关键字就筛选 返回
      if (keywords?.trim()) {
        const kw = keywords.toLowerCase()
        statusData = statusData.filter((data) => {
          return data.id === kw || data.formName.toLowerCase().includes(kw)
        })
        ftotal = statusData.length
      }

      // 当前索引
      let i = (currentPage - 1) * pageSize
      // 结束索引
      let endInd = i + pageSize
      // 如果结束索引大于总条数就endId等于ftotal
      if (endInd > ftotal) {
        endInd = ftotal
      }
      for (i; i < endInd; i++) {
        fdata.push({ ...statusData[i] })
      }

      if (fdata.length === 0) {
        console.info('数组为空')
        code = ApiCodeEnum.NOT_FOUND
        msg = '暂无数据'
      }
      return {
        code,
        data: {
          fdata,
          ftotal
        },
        msg
      }
    }
  },
  {
    url: '/mock/form/delete/:id',
    method: 'DELETE',
    // params：路径参数，是 /delete/:id 路径占位符得来的
    body({ params }) {
      let code = ApiCodeEnum.NO_CONTENT
      let msg = '删除成功'
      // 表单id
      let indexes = []

      // 多id分割
      if (params.id.includes(',')) {
        indexes = params.id.split(',')
        // 删除最后一项（为空）
        indexes.pop()
      } else {
        indexes = [params.id]
      }
      console.log('indexes: ', indexes)

      // 筛选
      for (let id of indexes) {
        const idIndex = formData.findIndex(item => item.id === id)
        formData.splice(idIndex, 1)
      }

      return {
        code,
        data: null,
        msg
      }
    }
  },
  {
    url: '/mock/form/count',
    method: 'GET',
    body() {
      const status = ['published', 'draft', 'close']
      const count = {
        published: 0,
        draft: 0,
        close: 0
      }

      // 按状态筛选
      for (let s of status) {
        let c = formData.filter(item => s === item.status).length
        console.log('length', c)
        count[s] = c
      }
      count.all = formData.length
      console.log(count)

      return {
        code: ApiCodeEnum.SUCCESS,
        data: count,
        msg: '成功'
      }
    }
  },
  {
    url: '/mock/form/add',
    method: 'POST',
    /** body 属性是请求的数据体 */
    body({ body }) {
      console.log('POST请求已连接成功', body)
      const form = body as FormItem
      let code = ApiCodeEnum.SUCCESS
      let msg = '保存成功！'
      form.id = id

      let isDuplicate = formData.findIndex(item => item.id === form.id)
      console.log(isDuplicate)
      if (isDuplicate === -1) {
        formData.push(form)
        id++
      } else {
        code = 404,
          msg = '添加失败'
      }

      return {
        code,
        data: null,
        msg
      }
    }
  },
  {
    url: '/mock/form/:id/detail',
    method: 'GET',
    body({ params }) {
      console.log('进入到get detail接口')
      let code = ApiCodeEnum.SUCCESS
      let msg = '获取成功！'
      console.log('formData ', formData)
      const form = formData.find(item => item.id === Number(params.id))
      console.log('form：', form)
      if (!form) {
        code = ApiCodeEnum.BAD_REQUEST
        msg = '获取失败！'
      }

      return {
        code,
        data: form,
        msg
      }
    }
  },
  {
    url: '/mock/form/update',
    method: 'PUT',
    body({ body }) {
      console.log("进入更新接口", body)
      let code = ApiCodeEnum.SUCCESS
      let msg = '已更新'

      if (!body.id) {
        return {
          code: ApiCodeEnum.BAD_REQUEST,
          data: null,
          msg: '更新失败'
        }
      }

      const formIndex = formData.findIndex(item => body.id === item.id)
      formData[formIndex] = body as FormItem

      return {
        code,
        data: null,
        msg
      }
    }
  }
])

const formData: FormItem[] = [
  
]