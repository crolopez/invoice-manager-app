import { ChangeEvent, useContext, useEffect, useRef } from 'react'
import DatePicker from 'react-date-picker'
import { FormStateContext, InvoiceSubmitHandlerContext } from '../Contexts'
import { FormMode } from '../types/FormMode'
import { defaultInvoice } from '../utils/defaultInvoice'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export default function InvoiceForm(): JSX.Element {
  const headerRef = useRef<HTMLHeadingElement>(null)
  // Buttons
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const updateButtonRef = useRef<HTMLButtonElement>(null)
  // Inputs
  const invoiceIdRef = useRef<HTMLInputElement>(null)
  // Contexts
  const invoiceSubmitHandler = useContext(InvoiceSubmitHandlerContext)
  const formState = useContext(FormStateContext)

  const resetForm = () => {
    formState.setInvoice(defaultInvoice)
    formState.setFormMode(FormMode.Register)
    invoiceIdRef.current?.focus()
  }

  const handleInputChange = (event: HandleInputChange) => {
    const {name, value} = event.target
    formState.setInvoice({...formState.invoice, [name]: value})
  }

  const handleDateChange = (date: Date) => {
    formState.setInvoice({...formState.invoice, dateIssued: date})
  }

  const handleInvoiceSubmit = (event: ButtonClickEvent) => {
    event.preventDefault()
    invoiceSubmitHandler(formState.invoice)
    resetForm()
  }

  const handleClearInvoice = (event: ButtonClickEvent) => {
    event.preventDefault()
    resetForm()
  }

  useEffect(() => {
    if (headerRef.current == null
      || saveButtonRef.current == null
      || updateButtonRef.current == null) return

    const registerMode = FormMode.Register == formState.formMode

    headerRef.current.textContent = registerMode
      ? 'Register an invoice': 'Update an invoice'
    saveButtonRef.current.hidden = !registerMode
    updateButtonRef.current.hidden = registerMode
  })

  return (
    <div className='card card-body bg-none'>
      <h1 ref={headerRef}></h1>

      <form>
        <input name='invoiceId' type="text" placeholder='Write an invoice ID'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formState.invoice.invoiceId}
          autoFocus ref={invoiceIdRef}/>

        <input name='supplier' type="text" placeholder='Write a supplier'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formState.invoice.supplier}/>

        <input name='amount' type="number"
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formState.invoice.amount}/>

        <DatePicker name='dateIssued'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleDateChange} value={formState.invoice.dateIssued}/>

        <input name='currency' type="text" placeholder='Write a currency'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formState.invoice.currency}/>

        <textarea name="description" rows={2} placeholder='Write a description'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formState.invoice.description}/>

        <button className='btn btn-success' onClick={handleInvoiceSubmit}
          ref={saveButtonRef}>
          Save
        </button>

        <button className='btn btn-secondary' onClick={handleInvoiceSubmit}
          ref={updateButtonRef}>
          Update
        </button>

        <button className='btn btn-warning' onClick={handleClearInvoice}>
          Clear
        </button>
      </form>
    </div>
  )
}
