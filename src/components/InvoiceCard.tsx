import { useContext } from 'react'
import { CopyInvoiceContext, DeleteInvoiceContext, InvoiceContext, UpdateInvoiceContext } from '../Contexts'

export default function InvoiceCard(): JSX.Element {
  const invoice = useContext(InvoiceContext)
  const deleteInvoice = useContext(DeleteInvoiceContext)
  const updateInvoice = useContext(UpdateInvoiceContext)
  const copyInvoice = useContext(CopyInvoiceContext)

  return (
    <div className='card card-body bg-primary'>
      <h2>{invoice.invoiceId}</h2>
      <p>Supplier: {invoice.supplier}</p>
      <p>Amount: {invoice.amount}</p>
      <p>Date issued: {invoice.dateIssued}</p>
      <p>Currency: {invoice.currency}</p>
      <p>Description: {invoice.description}</p>
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
