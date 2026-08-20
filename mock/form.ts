
// import { url } from 'inspector'
import { MockMethod } from 'vite-plugin-mock'

const mockFormList = [
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
  }
]

export default [
  {
    url: '/api/form/list',
    method: 'get',
    response: (query: number) => {
      return {
        code: 200,
        data: {
          list: mockFormList,
          total: mockFormList.length
        },
        msg: 'success'
      }
    }
  },
  {
    url: '/api/form/detail',
    method: 'get',
    response: ({ query }) => {
      const item = mockFormList.find(i => i.id === query.id)
      return {
        code: 200,
        data: item,
        msg: 'ok'
      }
    }
  },
   // 保存表单 POST /api/form/save
  {
    url: '/api/form/save',
    method: 'post',
    response: ({ body }) => {
      // body 就是前端post提交的schema数据
      console.log('mock收到保存表单数据', body)
      return { code:200, msg:'保存成功', data:{id:body.id || 'mock_' + Date.now()} }
    }
  },

  // 删除表单
  {
    url:'/api/form/delete',
    method:'post',
    response:()=>{
      return {code:200, msg:'删除成功'}
    }
  }

] as MockMethod[]
