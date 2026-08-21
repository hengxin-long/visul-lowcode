import path from 'path'
import { createDefineMock } from 'vite-plugin-mock-dev-server'

export const defineMock = createDefineMock((mock) => {
  // 拼接url
  mock.url = path.join('/mock' + mock.url)
  console.log('mock.url ', mock.url)
})

