import { Invoice } from '../types/Invoice'

export const defaultInvoice: Invoice = {
  invoiceId: '',
  supplier: '',
  amount: 0,
  dateIssued: new Date(),
  currency: '',
  description: '',
}
