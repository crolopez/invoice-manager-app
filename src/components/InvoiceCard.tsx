import { useContext } from 'react'
import { CopyInvoiceContext, DeleteInvoiceContext, InvoiceContext, UpdateInvoiceContext } from '../Contexts'

export default function InvoiceCard(): JSX.Element {
  const invoice = useContext(InvoiceContext)
  const deleteInvoice = useContext(DeleteInvoiceContext)
  const updateInvoice = useContext(UpdateInvoiceContext)
  const copyInvoice = useContext(CopyInvoiceContext)

  const getCardElement = (key: string, value: string|number): JSX.Element => {
    return (
      <p><strong>{key}</strong>  {value}</p>
    )
  }

  return (
    <div className='card card-body bg-primary'>
      <h2>{invoice.invoiceId}</h2>
      { getCardElement('Supplier', invoice.supplier) }
      { getCardElement('Amount', invoice.amount) }
      { getCardElement('Date issued', invoice.dateIssued.toString()) }
      { getCardElement('Currency', invoice.currency) }
      { getCardElement('Description', invoice.description) }
      <button className='btn btn-secondary' onClick={() => updateInvoice(invoice)}>
        Update
      </button>
      <button className='btn btn-warning' onClick={() => copyInvoice(invoice)}>
        Copy
      </button>
      <button className='btn btn-danger' onClick={() => deleteInvoice(invoice.invoiceId)}>
        Delete
      </button>
    </div>
  )
}
