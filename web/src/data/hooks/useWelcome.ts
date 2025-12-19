import { useQuery } from '@tanstack/react-query'
import { dataClient } from '../dataClient'

export const useWelcome = () => {
  return useQuery({
    queryKey: ['welcome'],
    queryFn: () => dataClient.fetchWelcome(),
    staleTime: 60_000,
    retry: false,
  })
}
