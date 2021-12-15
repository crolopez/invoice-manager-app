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
    'Authorization': '',
  },
}

function getNoDataError(): ApiError[] {
  return [{
    id: 'Unknown error',
    detail: '',
  }]
}

function getHeaders(authToken: string): any {
  return {
    headers:
    {
      ...requestHeaders.headers,
      'Authorization': `token ${authToken}`,
    },
  }
}

export class ApiHandler {
  static async addInvoice(invoice: Invoice, authToken: string): Promise<Invoice> {
    const { data } = await axios.post<ApiResponse>(API_ENDPOINT, invoice, getHeaders(authToken))

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return ApiMapper.apiAttributesToInvoice(data.data[0].attributes)
  }

  static async deleteInvoice(id: string, authToken: string): Promise<void> {
    const requestUrl = `${API_ENDPOINT}/${id}`
    const { data } = await axios.delete(requestUrl, getHeaders(authToken))

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return
  }

  static async getInvoices(authToken: string): Promise<Invoice[]> {
    const { data } = await axios.get<ApiResponse>(API_ENDPOINT, getHeaders(authToken))

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return data.data.map(x =>
      ApiMapper.apiAttributesToInvoice(x.attributes))
  }

  static async updateInvoice(invoice: Invoice, authToken: string): Promise<Invoice> {
    const requestUrl = `${API_ENDPOINT}/${invoice.invoiceId}`
    const { data } = await axios.put<ApiResponse>(requestUrl, invoice, getHeaders(authToken))

    if (data.errors != undefined) {
      throw data.errors
    }

    if (data.data == undefined) {
      throw getNoDataError()
    }

    return ApiMapper.apiAttributesToInvoice(data.data[0].attributes)
  }
}