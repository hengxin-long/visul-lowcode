// import { defineMock } from './base'
import { defineMock } from 'vite-plugin-mock-dev-server'
import { ApiCodeEnum } from '../src/enums/api'

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
      const form = body
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
  }
])

const formData = [
  // {
  //   id: '1',
  //   formName: '客户信息收集表',
  //   formType: '业务表单',
  //   status: 'published', // draft草稿 / published已发布
  //   createTime: '2026-08-01 10:20:00',
  //   updateTime: '2026-08-02 14:30:00',
  //   schema: {
  //     formName: '客户信息收集表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '输入框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '2',
  //   formName: '登记表',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-05-03 09:10:00',
  //   updateTime: '2026-06-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '输入框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '3',
  //   formName: '申请表',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '多选框',
  //         id: '1',
  //         componentType: 'checkbox',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '4',
  //   formName: '登录表单',
  //   formType: '业务表单',
  //   status: 'close',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-01 08:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '密码框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '5',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'close',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '密码框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '6',
  //   formName: '登录表单',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-01 08:11:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '密码框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '7',
  //   formName: '问卷表单',
  //   formType: '调查表单',
  //   status: 'published',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-06-02 12:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '搜索框',
  //         id: '1',
  //         componentType: 'search',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '8',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'published',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '搜索框',
  //         id: '1',
  //         componentType: 'search',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '9',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'published',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '密码框',
  //         id: '1',
  //         componentType: 'password',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '10',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '密码框',
  //         id: '1',
  //         componentType: 'password',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '11',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '输入框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '12',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '多选框',
  //         id: '1',
  //         componentType: 'checkbox',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '13',
  //   formName: '报名表',
  //   formType: '业务表单',
  //   status: 'published',
  //   createTime: '2026-03-03 09:10:00',
  //   updateTime: '2026-07-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '输入框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '14',
  //   formName: '登记表',
  //   formType: '业务表单',
  //   status: 'published',
  //   createTime: '2026-04-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '输入框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '15',
  //   formName: '登录表单',
  //   formType: '业务表单',
  //   status: 'close',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '输入框',
  //         id: '1',
  //         componentType: 'input',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '16',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'draft',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '日期面板',
  //         id: '1',
  //         componentType: 'date',
  //         props: {
  //           require: true
  //         }
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: '17',
  //   formName: '报名登记表',
  //   formType: '业务表单',
  //   status: 'published',
  //   createTime: '2026-08-03 09:10:00',
  //   updateTime: '2026-08-03 09:10:00',
  //   schema: {
  //     formName: '报名登记表',
  //     formType: '业务表单',
  //     components: [
  //       {
  //         label: '日期面板',
  //         id: '1',
  //         componentType: 'date',
  //         props: {
  //           require: false
  //         }
  //       }
  //     ]
  //   }
  // }
]