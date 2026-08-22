// import { defineMock } from './base'
import { defineMock } from 'vite-plugin-mock-dev-server'
import httpStatus from '../src/types/http-status'

export default defineMock([
  {
    url: '/mock/form/list',
    method: 'GET',
    body(res) {
      const currentPage = Number(res.query.page)
      const pageSize = Number(res.query.pageSize)
      console.log('进入mock函数', typeof currentPage, typeof pageSize)
      console.log('进入mock处理函数', res.query)

      // 返回的数据
      const fdata = []
      // 总条数
      const ftotal = formData.length

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

      let code = httpStatus.success.code
      let msg = httpStatus.success.msg
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
      components: []
    }
  },
  {
    id: '2',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '3',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '4',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '5',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '6',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '7',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '8',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '9',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
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
      components: []
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
      components: []
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
      components: []
    }
  },
  {
    id: '13',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '14',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '15',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
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
      components: []
    }
  },
  {
    id: '17',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '18',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
    }
  },
  {
    id: '19',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
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
      components: []
    }
  },
  {
    id: '21',
    formName: '报名登记表',
    formType: '业务表单',
    status: 'draft',
    createTime: '2026-08-03 09:10:00',
    updateTime: '2026-08-03 09:10:00',
    schema: {
      formName: '报名登记表',
      formType: '业务表单',
      components: []
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
      components: []
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
      components: []
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
      components: []
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
      components: []
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
      components: []
    }
  },
]