// import { defineMock } from './base'
import { defineMock } from 'vite-plugin-mock-dev-server'
import httpStatus from '../src/types/http-status'

export default defineMock([
  {
    url: '/mock/form/list',
    method: 'GET',
    // query：查询参数，是 /form/list?page=1&pageSize=10 问号后面的参数
    body({ query }) {
      // 返回的数据
      let fdata = []
      // 总条数
      let ftotal = formData.length

      /** 当前页 */
      const currentPage = Number(query.page)
      const pageSize = Number(query.pageSize)
      const keywords = query?.keywords
      let code = httpStatus.success.code
      let msg = httpStatus.success.msg

      console.log('进入mock函数', typeof currentPage, typeof pageSize)

      // 有关键字就筛选 返回
      if (keywords?.trim()) {
        console.log('keywords ', keywords?.trim())
        const kw = keywords.toLowerCase()
        fdata = formData.filter((data) => {
          return data.id === kw || data.formName.toLowerCase().includes(kw)
        })

        ftotal = fdata.length
        if (ftotal === 0) {
          code = httpStatus.failed.code
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

      // 当前索引
      let i = (currentPage - 1) * pageSize
      // 结束索引
      let endInd = i + pageSize
      // 如果结束索引大于总条数就endId等于ftotal
      if (endInd > ftotal) {
        endInd = ftotal
      }
      for (i; i < endInd; i++) {
        fdata.push({ ...formData[i] })
      }

      if (fdata.length === 0) {
        console.log('数组为空')
        code = httpStatus.failed.code
        msg = httpStatus.failed.msg
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
      console.log('id: ', params.id, typeof params.id)

      let code = httpStatus.success.code
      let msg = httpStatus.success.msg
      const idIndex = formData.findIndex(item => item.id === params.id)
      if (idIndex === -1) {
        code = httpStatus.failed.code
        msg = '删除失败'
      }
      formData.splice(idIndex, 1)
      return {
        code,
        data: null,
        msg
      }
    }
  },
  {
    url: '/mock/form/status',
    method: 'GET',
    body({ query }) {
      console.log('进入到status接口')
      let statusForm = []
      let total = 0
      if (query?.status) {
        statusForm = formData.filter(item => query.status === item.status)
        return {
          code: 200,
          data: {
            fdata: statusForm,
            ftotal: statusForm.length
          },
          msg: 'ok'
        }
      }

      // 按表单状态筛选
      statusForm = formData.filter(item => query.formStatus === item.status)

      return {
        code: 200,
        data: {
          fdata: statusForm,
          ftotal: statusForm.length
        },
        msg: 'ok'
      }
    }
  }
])

const formData = [
  {
    id: '1',
    formName: '客户信息收集表',
    formType: '业务表单',
    status: 'published', // draft草稿 / published已发布
    createTime: '2026-08-01 10:20:00',
    updateTime: '2026-08-02 14:30:00',
    schema: {
      formName: '客户信息收集表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '2',
    formName: '登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-05-03 09:10:00',
    updateTime: '2026-06-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '3',
    formName: '申请表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'checkbox',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '4',
    formName: '登录表单',
    formType: '业务表单',
    status: 'close',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-01 08:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '5',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'close',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '6',
    formName: '登录表单',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-01 08:11:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '7',
    formName: '问卷表单',
    formType: '调查表单',
    status: 'published',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-06-02 12:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'search',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '8',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'search',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '9',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'password',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '10',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'password',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '11',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '12',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'checkbox',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '13',
    formName: '报名表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-03-03 09:10:00',
    updateTime: '2026-07-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '14',
    formName: '登记表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-04-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '15',
    formName: '登录表单',
    formType: '业务表单',
    status: 'close',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '16',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'date',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '17',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'date',
          props: {
            require: false
          }
        }
      ]
    }
  },
  {
    id: '18',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'close',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: false
          }
        }
      ]
    }
  },
  {
    id: '19',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'date',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '20',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: false
          }
        }
      ]
    }
  },
  {
    id: '21',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'published',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'button',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '22',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'button',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '23',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '24',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'input',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '25',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'checkbox',
          props: {
            require: true
          }
        }
      ]
    }
  },
  {
    id: '26',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: [
        {
          componentType: 'button',
          props: {
            require: true
          }
        }
      ]
    }
  },
]