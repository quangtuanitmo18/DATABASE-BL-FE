/* eslint-disable react-hooks/rules-of-hooks */
import { User } from 'src/types/user/user.type'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { toast } from 'react-toastify'
import { Dialog, DialogTrigger } from 'src/components/ui/dialog'
import { useQueryClient } from '@tanstack/react-query'
import { queryResources } from 'src/hooks/resources/query.resources'
import useMutationDeleteClient from 'src/hooks/services/client/useMutationDeleteClient'
import { client } from 'src/types/client/client.type'
import DialogContentClient from './dialogContentClient'
// eslint-disable-next-line import/named
import { ColumnDef } from '@tanstack/react-table'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export const columns: ColumnDef<client>[] = [
  {
    accessorKey: 'client_name',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <p className='font-semibold text-red-500'>client_name</p>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'client_surname',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <p className='font-semibold text-red-500'>client_surname</p>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'client_address',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <p className='font-semibold text-red-500'>client_address</p>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'client_phone',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <p className='font-semibold text-red-500'>client_phone</p>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original
      const { deleteClientMutate } = useMutationDeleteClient()
      const queryClient = useQueryClient()
      const { profile } = useContext(AppContext)
      const isAdmin = profile?.roles.includes('admin')

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.client_id)}>
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {isAdmin && (
              <>
                <div className='mb-2'>
                  <Button
                    variant='outline'
                    onClick={() =>
                      deleteClientMutate(
                        { clientId: client.client_id },
                        {
                          onSuccess: () => {
                            toast.success('Delete client successfully!')
                            queryClient.invalidateQueries({ queryKey: [queryResources.client.list] })
                          }
                        }
                      )
                    }
                  >
                    Delete client
                  </Button>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>Update client</Button>
                  </DialogTrigger>
                  <DialogContentClient
                    dialogTitle='Update client'
                    dialogBtnTitle='Update'
                    actionType='update'
                    clientId={client.client_id}
                  ></DialogContentClient>
                </Dialog>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
