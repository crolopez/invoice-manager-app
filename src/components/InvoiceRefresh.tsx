import { ChangeEvent, useContext, useState } from 'react'
import { ApiErrorStateContext, SetInvoicesContext } from '../Contexts'
import { ApiHandler } from '../modules/ApiHandler'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>

export default function InvoiceRefresh(): JSX.Element {
  const setInvoices = useContext(SetInvoicesContext)
  const apiErrorState = useContext(ApiErrorStateContext)
  const [refreshCurrency, setRefreshCurrency] = useState<string>('')

  const refresh = async (): Promise<void> => {
    try {
      const invoices = await ApiHandler.getInvoices(refreshCurrency)
      setInvoices(invoices)
      apiErrorState.setApiErrors([])
    } catch(e) {
      console.log(e)
    }
  }

  const handleInputChange = (event: HandleInputChange) => {
    const {value} = event.target
    setRefreshCurrency(value)
  }

  return (
    <div className='rounded-0 row'>
      <button className='btn mx-3 col-md-4' onClick={() => refresh()}>
        Refresh
      </button>
      <input name='currency' type="text" placeholder='Currency'
        className='border-0 col-md-4'
        onChange={handleInputChange}/>
    </div>
  )
}
