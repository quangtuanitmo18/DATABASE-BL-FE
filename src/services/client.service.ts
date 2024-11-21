import { create } from 'lodash'
import { ClientBody } from 'src/types/client/client.api.type'
import { client } from 'src/types/client/client.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const clientService = {
  getListClients() {
    return http.get<SuccessResponse<client[]>>(`client`)
  },
  getClientById(id: string) {
    return http.get<SuccessResponse<client>>(`client/${id}`)
  },
  createClient(data: ClientBody) {
    return http.post('client', data)
  },
  deleteClientById(id: string) {
    return http.delete(`client/${id}`)
  },
  updateClientById(id: string, data: ClientBody) {
    return http.put(`client/${id}`, data)
  }
}

export default clientService
