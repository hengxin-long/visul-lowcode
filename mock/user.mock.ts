import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  // 1.GET接口：获取列表，获取url query参数
  {
    url: '/mock/user/list',
    method: 'GET',
    delay: 300, // 模拟网络延迟300ms，调试loading
    // body函数接收req对象：包含所有请求信息
    body(req) {
      // ✅ 获取get的query参数 ?page=1&size=10
      const { page, size } = req.query
      console.log('GET query参数：', page, size)

      return {
        code: 200,
        msg: '成功',
        data: {
          list: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ],
          total: 50,
          page: Number(page),
          size: Number(size)
        }
      }
    }
  },

  // 2.GET动态路由：/api/user/100  获取路径params参数
  {
    url: '/api/user/:id',
    method: 'GET',
    body(req) {
      // ✅ 获取路径占位参数 :id
      const userId = req.params.id
      return {
        code: 200,
        data: { id: userId, name: `用户${userId}` }
      }
    }
  },

  // 3.POST登录接口，读取post body、做业务校验、返回不同状态码
  {
    url: '/api/login',
    method: 'POST',
    delay: 800,
    body(req) {
      // ✅ 获取post请求体 json数据
      const { username, password } = req.body
      console.log('post请求body', req.body)

      // 模拟后端业务逻辑判断
      if (username === 'admin' && password === '123456') {
        // 返回正常数据
        return {
          code: 200,
          token: 'mock-token-xxxx123456',
          userInfo: { username: 'admin', role: 'admin' }
        }
      } else {
        // 返回业务错误码
        return {
          code: 400,
          msg: '账号密码错误'
        }
      }
    }
  },

  // 4.模拟服务端异常，返回http状态码500
  {
    url: '/api/error',
    method: 'GET',
    status: 500, // http响应状态码
    statusText: 'Internal Server Error',
    body: { code: 500, msg: '服务器内部错误' }
  }
])