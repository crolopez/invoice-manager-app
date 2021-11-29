import React, { useState } from 'react'
import './App.css'
import InvoiceForm from './components/InvoiceForm'
import InvoiceList from './components/InvoiceList'
import { DeleteInvoiceContext, FormStateContext, InvoicesContext, InvoiceSubmitHandlerContext, SetInvoicesContext, UpdateInvoiceContext } from './Contexts'
import { Invoice } from './types/Invoice'
import { defaultInvoice } from './utils/defaultInvoice'
import { ApiHandler } from './modules/ApiHandler'
import InvoiceRefresh from './components/InvoiceRefresh'
import { FormMode } from './types/FormMode'

interface Props {
  title: string
}

export function App({ title }: Props): JSX.Element {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [formInvoice, setFormInvoice] = useState<Invoice>(defaultInvoice)
  const [formMode, setFormMode] = useState<FormMode>(FormMode.Register)

  // Component functions
  const addInvoice = async (invoice: Invoice): Promise<void> => {
    try {
      invoice = await ApiHandler.addInvoice(invoice)
      setInvoices([...invoices, invoice])
    } catch(e) {
      console.log(e)
    }
  }

  const replaceInvoice = async (invoice: Invoice): Promise<void> => {
    try {
      invoice = await ApiHandler.updateInvoice(invoice)
      setInvoices(invoices.map(x => {
        if (x.invoiceId !== invoice.invoiceId) return x
        return invoice
      }))
    } catch(e) {
      console.log(e)
    }
  }

  // Card component functions
  const deleteInvoice = (id: string): void => {
    try {
      ApiHandler.deleteInvoice(id)
      setInvoices(invoices.filter(invoice => invoice.invoiceId !== id))
    } catch(e) {
      console.log(e)
    }
  }

  const updateFormInvoice = (invoice: Invoice): void => {
    setFormInvoice(invoice)
    setFormMode(FormMode.Update)
  }

  // Form component functions
  const invoiceSubmitHandler = async (invoice: Invoice): Promise<void> => {
    if (formMode == FormMode.Register) {
      await addInvoice(invoice)
      return
    }

    await replaceInvoice(invoice)
  }

  return (
    <div className="bg-dark" style={{height: '100vh'}}>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <a href='/' className='navbar-brand'>
            {title}

          </a>
          <a className='navbar-brand'>
            <SetInvoicesContext.Provider value={setInvoices}>
              <InvoiceRefresh/>
            </SetInvoicesContext.Provider>
          </a>
        </div>
      </nav>
      <main className='container p-4'>
        <div className="row">
          <div className='col-md-4'>
            <InvoiceSubmitHandlerContext.Provider value={invoiceSubmitHandler}>
              <FormStateContext.Provider value={{ invoice: formInvoice, setInvoice: setFormInvoice,
                formMode: formMode, setFormMode: setFormMode }}>
                <InvoiceForm/>
              </FormStateContext.Provider>
            </InvoiceSubmitHandlerContext.Provider>
          </div>
          <div className='col-md-8'>
            <div className='row'>
              <DeleteInvoiceContext.Provider value={deleteInvoice}>
                <UpdateInvoiceContext.Provider value={updateFormInvoice}>
                  <InvoicesContext.Provider value={invoices}>
                    <InvoiceList/>
                  </InvoicesContext.Provider>
                </UpdateInvoiceContext.Provider>
              </DeleteInvoiceContext.Provider>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
