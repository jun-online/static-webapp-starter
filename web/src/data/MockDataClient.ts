import type { IDataClient, WelcomeResponse } from './IDataClient'

const mockWelcomeData: WelcomeResponse = {
  message: 'Willkommen, Test User!'
}

export class MockDataClient implements IDataClient {
  async fetchWelcome(): Promise<WelcomeResponse> {
    // Mock-Daten mit einer kleinen Verzögerung zurückgeben
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWelcomeData), 300)
    })
  }
}
