import { useMutation } from '@tanstack/react-query'
import clientService from 'src/services/client.service'
import { ClientBody } from 'src/types/client/client.api.type'

export default function useMutationCreateClient() {
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: ({ client }: { client: ClientBody }) => clientService.createClient(client)
  })

  return {
    createclientMutate: mutate,
    isPendingCreateclient: isPending,
    isSuccessCreateclient: isSuccess,
    isErrorCreateclient: isError
  }
}
