import { useContext } from 'react'
import { ApiErrorStateContext, AuthTokenStateContext, SetInvoicesContext } from '../Contexts'
import { ApiHandler } from '../modules/ApiHandler'

export default function InvoiceRefresh(): JSX.Element {
  const setInvoices = useContext(SetInvoicesContext)
  const apiErrorState = useContext(ApiErrorStateContext)
  const { authToken } = useContext(AuthTokenStateContext)

  const refresh = async (): Promise<void> => {
    try {
      const invoices = await ApiHandler.getInvoices(authToken)
      setInvoices(invoices)
      apiErrorState.setApiErrors([])
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
