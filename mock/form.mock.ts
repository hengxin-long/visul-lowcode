// import { defineMock } from './base'
import {defineMock} from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/mock/form/list',
    method: 'GET',
    body(res) {
      console.log('进入mock处理函数', res.query)
      return {
        code: 200,
        data: [
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
          }
        ],
        msg: 'success'
      }
    }
  }
])