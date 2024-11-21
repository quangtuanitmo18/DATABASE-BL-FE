import LoadingSpin from 'src/components/loading'
import useFetchListClients from 'src/hooks/services/client/useFetchListclients'
import { columns } from './components/columns'
import { DataTable } from './components/dataTable'

const Client = () => {
  const { listClients, isPendingFetchListClients } = useFetchListClients()
  console.log(listClients)

  if (isPendingFetchListClients) return <LoadingSpin></LoadingSpin>
  return (
    <div className='container'>
      <DataTable columns={columns} data={listClients} />{' '}
    </div>
  )
}

export default Client
