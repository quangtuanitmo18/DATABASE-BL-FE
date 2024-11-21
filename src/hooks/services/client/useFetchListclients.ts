import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userService from 'src/services/user.service'
import { User } from 'src/types/user/user.type'
import clientService from 'src/services/client.service'
import { client } from 'src/types/client/client.type'
import { queryResources } from 'src/hooks/resources/query.resources'

export default function useFetchListClients() {
  const {
    data: listClientsResponse,
    isError,
    error,
    refetch,
    isPending
  } = useQuery({
    queryKey: [queryResources.client.list],
    queryFn: () => clientService.getListClients()
  })

  if (isError) {
    toast('Load list clients thất bại', {
      position: 'top-right',
      autoClose: 1000
    })
  }
  return {
    listClients: listClientsResponse?.data.data as unknown as client[],
    isPendingFetchListClients: isPending,
    refetchListClients: refetch,
    isErrorFetchListClients: isError,
    error
  }
}
