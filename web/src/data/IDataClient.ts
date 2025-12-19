export type WelcomeResponse = {
  message: string
}

export interface IDataClient {
  fetchWelcome(): Promise<WelcomeResponse>
}
