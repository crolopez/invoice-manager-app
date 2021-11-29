import { useContext } from 'react'
import { DeleteInvoiceContext, InvoiceContext, UpdateInvoiceContext } from '../Contexts'

export default function InvoiceCard(): JSX.Element {
  const invoice = useContext(InvoiceContext)
  const deleteInvoice = useContext(DeleteInvoiceContext)
  const updateInvoice = useContext(UpdateInvoiceContext)

  return (
    <div className='card card-body bg-primary rounded-0'>
      <h2>{invoice.invoiceId}</h2>
      <p>Supplier: {invoice.supplier}</p>
      <p>Amount: {invoice.amount}</p>
      <p>Date issued: {invoice.dateIssued}</p>
      <p>Currency: {invoice.currency}</p>
      <p>Description: {invoice.description}</p>
      <button className='btn btn-warning' onClick={() => updateInvoice(invoice)}>
        Update
      </button>
      <button className='btn btn-danger' onClick={() => deleteInvoice(invoice.invoiceId)}>
        Delete
      </button>
    </div>
  )
}
