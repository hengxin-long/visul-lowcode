// import { defineMock } from './base'
import { defineMock } from 'vite-plugin-mock-dev-server'
import { ApiCodeEnum } from '../src/enums/api'
import { FormItem } from '../src/types/form'

/** 时间戳 + 随机数 生成表单唯一id */
function generateUniqueID(): string {
  // 转成 36 进制字符串
  const time = Date.now().toString(36)
  const rand = Math.random() * 100
  const id = time + rand.toFixed(0)
  return id
}

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

      // 按状态筛选
      if (formStatus !== 'all') {
        statusData = formData.filter(item => formStatus === item.status)
        ftotal = statusData.length
      } else {
        statusData = formData
        ftotal = formData.length
      }

      // 有关键字就筛选 返回
      if (keywords?.trim()) {
        const kw = keywords.toLowerCase()
        statusData = statusData.filter((data) => {
          return data.formName.toLowerCase().includes(kw)
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
        count[s] = c
      }
      count.all = formData.length

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
      const form = body as FormItem
      let code = ApiCodeEnum.SUCCESS
      let msg = '保存成功！'

      form.id = generateUniqueID()
      let isDuplicate = formData.findIndex(item => item.id === form.id)

      if (isDuplicate === -1) {
        formData.push(form)
      } else {
        code = 404,
          msg = '添加失败！请重试'
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
      let code = ApiCodeEnum.SUCCESS
      let msg = '获取成功！'
      const form = formData.find(item => item.id === params.id)

      if (!form) {
        code = ApiCodeEnum.BAD_REQUEST
        msg = '获取失败！请重试'
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
  {
    id: "mtsaxdcy48",
    formName: "新建表单",
    formType: "普通填报表单",
    status: "draft",
    createTime: "2026-09-08 14:34:37",
    updateTime: "2026-09-08 14:42:15",
    schema: {
      formName: "表单",
      formType: "normal",
      components: [
        {
          label: "标题",
          icon: "SetUp",
          id: "2lo9sdbng10",
          componentType: "title",
          field: "title18",
          props: {
            innerText: "标题",
            fontSize: 20,
            color: "black",
            level: 1,
            textAlign: "left",
            fontWeight: "400"
          }
        },
        {
          label: "文本框",
          icon: "Document",
          id: "2lo9sdceh0",
          componentType: "input",
          field: "field19",
          props: {
            align: "left",
            label: "文本框",
            require: true,
            type: "text",
            placeholder: "请输入文本",
            clearable: true,
            disabled: false,
            readonly: false,
            maxlength: 30,
            minlength: 0,
            size: "default",
            width: "100%"
          }
        },
        {
          label: "文本框",
          icon: "Document",
          id: "2lo9sdcn32",
          componentType: "input",
          field: "field20",
          props: {
            align: "left",
            label: "文本框",
            require: true,
            type: "password",
            placeholder: "请输入文本",
            clearable: true,
            disabled: false,
            readonly: false,
            maxlength: 30,
            minlength: 0,
            size: "default",
            width: "100%"
          }
        }
      ]
    }
  },
  {
    id: "mtsbdu3m18",
    formName: "登录表单",
    formType: "普通填报表单",
    status: "published",
    createTime: "2026-09-08 14:47:59",
    updateTime: "2026-09-08 14:54:32",
    schema: {
      formName: "表单",
      formType: "login",
      components: [
        {
          label: "标题",
          icon: "SetUp",
          id: "2lo9sdctf32",
          componentType: "title",
          field: "title5",
          props: {
            innerText: "欢迎登录",
            fontSize: 20,
            color: "black",
            level: 2,
            textAlign: "left",
            fontWeight: "400",
            align: "center"
          }
        },
        {
          label: "文本框",
          icon: "Document",
          id: "2lo9sdd8197",
          componentType: "input",
          field: "field6",
          props: {
            align: "left",
            label: "用户名",
            require: true,
            type: "text",
            placeholder: "请输入用户名",
            clearable: true,
            disabled: false,
            readonly: false,
            maxlength: 30,
            minlength: 0,
            size: "default",
            width: "100%"
          }
        },
        {
          label: "文本框",
          icon: "Document",
          id: "2lo9sddfn31",
          componentType: "input",
          field: "field7",
          props: {
            align: "left",
            label: "密码",
            require: true,
            type: "password",
            placeholder: "请输入密码",
            clearable: true,
            disabled: false,
            readonly: false,
            maxlength: 30,
            minlength: 0,
            size: "default",
            width: "100%"
          }
        },
        {
          label: "下拉框",
          icon: "Tickets",
          id: "2lo9shel081",
          componentType: "select",
          field: "select9",
          props: {
            align: "left",
            multiple: false,
            disabled: false,
            options: [
              {
                label: "成都",
                value: "成都"
              },
              {
                label: "上海",
                value: "上海"
              },
              {
                label: "北京",
                value: "北京"
              },
              {
                label: "深圳",
                value: "深圳"
              }
            ],
            size: "default",
            clearable: true,
            placeholder: "选择城市",
            width: "100%"
          }
        },
        {
          label: "按钮",
          icon: "Pointer",
          id: "2lo9shet624",
          componentType: "button",
          field: "button8",
          props: {
            align: "left",
            label: "登录/注册",
            type: "primary",
            size: "default",
            color: "",
            plain: false,
            text: false,
            bg: false,
            link: false,
            round: false,
            circle: false,
            dashed: false,
            disabled: false,
            loading: false,
            width: "100%"
          }
        }
      ]
    }
  },
  {
  id: "mtsgxkdy67",
  formName: "游戏收集问卷",
  formType: "收集问卷表单",
  status: "close",
  createTime: "2026-09-10 23:03:09",
  updateTime: "2026-09-10 23:11:23",
  schema: {
    formName: "表单",
    formType: "normal",
    components: [
      {
        label: "标题",
        icon: "SetUp",
        id: "2lo9shfec48",
        componentType: "title",
        field: "title1",
        props: {
          innerText: "游戏收集问卷",
          color: "black",
          level: 2,
          textAlign: "left",
          fontWeight: "400",
          align: "center"
        }
      },
      {
        label: "标题",
        icon: "SetUp",
        id: "2lo9shfp349",
        componentType: "title",
        field: "title2",
        props: {
          innerText: "本收集问卷只做调查研究，不会做任何非法的事情",
          color: "black",
          level: 4,
          textAlign: "left",
          fontWeight: "400",
          align: "center"
        }
      },
      {
        label: "标题",
        icon: "SetUp",
        id: "2lo9shg3384",
        componentType: "title",
        field: "title8",
        props: {
          innerText: "性别",
          color: "black",
          level: 4,
          textAlign: "left",
          fontWeight: "400"
        }
      },
      {
        label: "单选框组",
        icon: "Open",
        id: "2lo9shg9742",
        componentType: "radioGroup",
        field: "radioGroup3",
        props: {
          align: "left",
          disabled: false,
          size: "default",
          type: "radio",
          textColor: "black",
          fill: "#22a02d",
          options: [
            {
              label: "男",
              value: "man"
            },
            {
              label: "女",
              value: "woman"
            }
          ]
        }
      },
      {
        label: "标题",
        icon: "SetUp",
        id: "2lo9shgod93",
        componentType: "title",
        field: "title5",
        props: {
          innerText: "年龄（岁）",
          color: "black",
          level: 4,
          textAlign: "left",
          fontWeight: "400"
        }
      },
      {
        label: "数字框",
        icon: "Coin",
        id: "2lo9shh1487",
        componentType: "inputNumber",
        field: "number4",
        props: {
          align: "flex-start",
          max: 100,
          min: 16,
          step: 1,
          precision: 0,
          disabled: false,
          controlsPosition: "",
          readonly: false,
          controls: true
        }
      },
      {
        label: "下拉框",
        icon: "Tickets",
        id: "2lo9shh8g32",
        componentType: "select",
        field: "select6",
        props: {
          align: "left",
          multiple: true,
          disabled: false,
          options: [
            {
              label: "王者荣耀",
              value: "wangzhe"
            },
            {
              label: "和平精英",
              value: "heping"
            },
            {
              label: "我的世界",
              value: "mc"
            },
            {
              label: "原神",
              value: "yuanshen"
            },
            {
              label: "三角洲",
              value: "san"
            },
            {
              label: "瓦罗兰特（瓦）",
              value: "wa"
            }
          ],
          size: "default",
          clearable: true,
          placeholder: "选择喜欢的游戏（可多选）",
          width: "100%"
        }
      },
      {
        label: "按钮",
        icon: "Pointer",
        id: "2lo9smsg692",
        componentType: "button",
        field: "button7",
        props: {
          align: "flex-end",
          label: "提交",
          type: "primary",
          size: "default",
          color: "skyblue",
          plain: false,
          text: false,
          link: false,
          round: false,
          circle: false,
          dashed: false,
          disabled: false,
          loading: false,
          width: "20%"
        }
      }
    ]
  }
}
]