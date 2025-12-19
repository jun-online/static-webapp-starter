import type { IDataClient, WelcomeResponse } from './IDataClient'

export class ApiDataClient implements IDataClient {
  async fetchWelcome(): Promise<WelcomeResponse> {
    const response = await fetch('/api/welcome', {
      headers: {
        Accept: 'application/json',
      },
    })

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED')
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json() as Promise<WelcomeResponse>
  }
}
