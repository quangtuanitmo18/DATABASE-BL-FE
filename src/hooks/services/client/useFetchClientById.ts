import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { queryResources } from 'src/hooks/resources/query.resources'
import clientService from 'src/services/client.service'
import { client } from 'src/types/client/client.type'

export default function useFetchClientById(id: string) {
  const {
    data: ClientResponse,
    isError,
    error,
    refetch,
    isPending
  } = useQuery({
    queryKey: [queryResources.client.getById, id],
    queryFn: () => clientService.getClientById(id),
    enabled: !!id
  })

  if (isError) {
    toast('Load Client thất bại', {
      position: 'top-right',
      autoClose: 1000
    })
  }
  return {
    client: ClientResponse?.data.data as unknown as client,
    isPendingFetchClientByid: isPending,
    refetchClientById: refetch,
    isErrorFetchClientById: isError,
    error
  }
}
