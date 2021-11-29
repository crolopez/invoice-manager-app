import { ApiAttributes } from '../types/apiResponse/ApiAttributes'
import { Invoice } from '../types/Invoice'

export class ApiMapper {
  static apiAttributesToInvoice(attributes: ApiAttributes): Invoice {
    return {
      invoiceId: attributes.invoiceId,
      supplier: attributes.supplier,
      amount: attributes.amount,
      dateIssued: attributes.dateIssued,
      currency: attributes.currency,
      description: attributes.description,
    }
  }
}
