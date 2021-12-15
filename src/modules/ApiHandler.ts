import { getConfig } from '../utils/getConfig'
import axios from 'axios'
import { Invoice } from '../types/Invoice'
import { ApiResponse } from '../types/apiResponse/ApiResponse'
import { ApiMapper } from './ApiMapper'
import { ApiError } from '../types/apiResponse/ApiError'

const API_ENDPOINT = getConfig().API_ENDPOINT
const requestHeaders = {
  headers: {
    'User-Agent': 'invoice-manager-app',
    'Accept': 'application/json',
    'Accept-Encoding': 'identity',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Host': 'invoice-manager-app',
  },
}

function getNoDataError(): ApiError[] {
  return [{
    id: 'Unknown error',
    detail: '',
  }]
}

export class ApiHandler {
  static async addInvoice(invoice: Invoice): Promise<Invoice> {
    const { data } = await axios.post<ApiResponse>(API_ENDPOINT, invoice, requestHeaders)

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return ApiMapper.apiAttributesToInvoice(data.data[0].attributes)
  }

  static async deleteInvoice(id: string): Promise<void> {
    const requestUrl = `${API_ENDPOINT}/${id}`
    const { data } = await axios.delete(requestUrl, requestHeaders)

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return
  }

  static async getInvoices(currency: string): Promise<Invoice[]> {
    const requestUrl = `${API_ENDPOINT}${currency != '' ? `?currency=${currency}` : ''}`
    const { data } = await axios.get<ApiResponse>(requestUrl, requestHeaders)

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return data.data.map(x =>
      ApiMapper.apiAttributesToInvoice(x.attributes))
  }

  static async updateInvoice(invoice: Invoice): Promise<Invoice> {
    const requestUrl = `${API_ENDPOINT}/${invoice.invoiceId}`
    const { data } = await axios.put<ApiResponse>(requestUrl, invoice, requestHeaders)

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return ApiMapper.apiAttributesToInvoice(data.data[0].attributes)
  }
}