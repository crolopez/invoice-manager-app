import { ApiAttributes } from '../types/apiResponse/ApiAttributes'
import { Invoice } from '../types/Invoice'

export class ApiMapper {
  static apiAttributesToInvoice(attributes: ApiAttributes): Invoice {
    return {
      invoiceId: attributes.invoiceId,
      supplier: attributes.supplier,
      amount: attributes.amount,
      dateIssued: new Date(attributes.dateIssued),
      currency: attributes.currency,
      description: attributes.description,
    }
  }
}
