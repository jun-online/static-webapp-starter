import type { IDataClient } from './IDataClient'
import { ApiDataClient } from './ApiDataClient'
import { MockDataClient } from './MockDataClient'

const isLocalhost = (): boolean => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1'
}

const createDataClient = (): IDataClient => {
  if (isLocalhost()) {
    return new ApiDataClient()
  }
  return new MockDataClient()
}

export const dataClient: IDataClient = createDataClient()
