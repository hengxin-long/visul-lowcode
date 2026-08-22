
interface ResponseStatus {
  [key: string]: {
    code: number,
    msg: string
  }
}

const httpStatus: ResponseStatus = {
  success: {
    code: 200,
    msg: '成功',
  },
  failed: {
    code: 404,
    msg: '失败'
  }
}

export default httpStatus