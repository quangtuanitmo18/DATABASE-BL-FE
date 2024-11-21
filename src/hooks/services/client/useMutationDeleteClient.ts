import { useMutation } from '@tanstack/react-query'
import clientService from 'src/services/client.service'

export default function useMutationDeleteClient() {
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: ({ clientId }: { clientId: string }) => clientService.deleteClientById(clientId)
  })

  return {
    deleteClientMutate: mutate,
    isPendingDeleteClient: isPending,
    isSuccessDeleteClient: isSuccess,
    isErrorDeleteClient: isError
  }
}
