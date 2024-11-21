import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'src/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { queryResources } from 'src/hooks/resources/query.resources'
import useFetchClientById from 'src/hooks/services/client/useFetchClientById'
import useFetchListClients from 'src/hooks/services/client/useFetchListclients'
import useMutationCreateClient from 'src/hooks/services/client/useMutationCreate'
import useMutationUpdateClient from 'src/hooks/services/client/useMutationUpdateclient'

interface DialogContentProps {
  dialogTitle: string
  dialogBtnTitle: string
  actionType: 'create' | 'update'
  clientId?: string
}
const DialogContentClient = ({ dialogTitle, dialogBtnTitle, actionType, clientId }: DialogContentProps) => {
  const [formDataClient, setFormDataClient] = useState({
    client_name: '',
    client_surname: '',
    client_address: '',
    client_phone: ''
  })

  const queryClient = useQueryClient()

  const { createclientMutate } = useMutationCreateClient()
  const { updateClientMutate } = useMutationUpdateClient()
  const { client, isPendingFetchClientByid } = useFetchClientById(clientId as string)!
  const { refetchListClients } = useFetchListClients()

  const handleChangeDataClient = (e: any) => {
    const { name, value } = e.target
    setFormDataClient({
      ...formDataClient,
      [name]: value
    })
  }

  const handleActionSubmit = (e: any, actionType: 'create' | 'update', clientId?: string) => {
    e.preventDefault()
    if (actionType === 'create') {
      createclientMutate(
        { client: formDataClient },
        {
          onSuccess: () => {
            toast.success('Create Client successfully')
            refetchListClients()
            setFormDataClient({
              client_name: '',
              client_surname: '',
              client_address: '',
              client_phone: ''
            })
          }
        }
      )
    } else if (actionType === 'update') {
      updateClientMutate(
        { ClientId: clientId as string, body: formDataClient },
        {
          onSuccess: () => {
            toast.success('Update client successfully')
            queryClient.invalidateQueries({ queryKey: [queryResources.client.list] })
          }
        }
      )
    }
  }

  useEffect(() => {
    if (actionType === 'update' && client) {
      setFormDataClient({
        client_name: client.client_name,
        client_surname: client.client_surname,
        client_address: client.client_address,
        client_phone: client.client_phone
      })
    }
  }, [clientId, client])

  if (clientId && isPendingFetchClientByid) return null

  return (
    <form>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='fullname' className='text-right'>
              Name
            </Label>
            <Input
              id='client_name'
              name='client_name'
              value={formDataClient.client_name}
              onChange={handleChangeDataClient}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='fullname' className='text-right'>
              Surname
            </Label>
            <Input
              id=''
              name='client_surname'
              value={formDataClient.client_surname}
              onChange={handleChangeDataClient}
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='university' className='text-right'>
              Address
            </Label>
            <Input
              id='client_address'
              name='client_address'
              value={formDataClient.client_address}
              onChange={handleChangeDataClient}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='university' className='text-right'>
              Phone
            </Label>
            <Input
              id='client_phone'
              name='client_phone'
              value={formDataClient.client_phone}
              onChange={handleChangeDataClient}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={(e: any) => handleActionSubmit(e, actionType, clientId)}>
            {dialogBtnTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  )
}

export default DialogContentClient
