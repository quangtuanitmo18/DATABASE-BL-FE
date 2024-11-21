import { useMutation } from '@tanstack/react-query'
import clientService from 'src/services/client.service'
import { ClientBody } from 'src/types/client/client.api.type'

export default function useMutationUpdateClient() {
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: ({ ClientId, body }: { ClientId: string; body: ClientBody }) =>
      clientService.updateClientById(ClientId, body)
  })

  return {
    updateClientMutate: mutate,
    isPendingUpdateClient: isPending,
    isSuccessUpdateClient: isSuccess,
    isErrorUpdateClient: isError
  }
}
