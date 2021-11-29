import { useContext } from 'react'
import { InvoiceContext, InvoicesContext } from '../Contexts'
import InvoiceCard from './InvoiceCard'

export default function InvoiceList(): JSX.Element {
  const invoices = useContext(InvoicesContext)

  return (
    <>
      {
        invoices.map(invoice => (
          <div className='col-md-6 pb-2' key={invoice.invoiceId}>
            <InvoiceContext.Provider value={invoice}>
              <InvoiceCard/>
            </InvoiceContext.Provider>
          </div>
        ))
      }
    </>
  )
}
