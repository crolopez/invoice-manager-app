import { useContext } from 'react'
import { SetInvoicesContext } from '../Contexts'
import { ApiHandler } from '../modules/ApiHandler'

export default function InvoiceRefresh(): JSX.Element {
  const setInvoices = useContext(SetInvoicesContext)

  const refresh = async (): Promise<void> => {
    try {
      const invoices = await ApiHandler.getInvoices()
      setInvoices(invoices)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className='rounded-0'>
      <button className='btn' onClick={() => refresh()}>
        Refresh
      </button>
    </div>
  )
}
