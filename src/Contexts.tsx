/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { defaultInvoice } from './utils/defaultInvoice'
import { Invoice } from './types/Invoice'
import { FormState } from './types/FormState'
import { FormMode } from './types/FormMode'
import { ErrorDisplayState } from './types/ErrorDisplayState'
import { ApiError } from './types/apiResponse/ApiError'

const dummyInvoiceFunc = (x: Invoice): void => {}
export const InvoiceSubmitHandlerContext = React.createContext<(invoice: Invoice) => void>(dummyInvoiceFunc)

export const UpdateInvoiceContext = React.createContext<(invoice: Invoice) => void>(dummyInvoiceFunc)

export const CopyInvoiceContext = React.createContext<(invoice: Invoice) => void>(dummyInvoiceFunc)

const dummyDelete = (x: string): void => {}
export const DeleteInvoiceContext = React.createContext<(id: string) => void>(dummyDelete)

export const InvoicesContext = React.createContext<Invoice[]>([defaultInvoice])
export const InvoiceContext = React.createContext<Invoice>(defaultInvoice)

const setInvoiceFunc = (x: Invoice[]): void => {}
export const SetInvoicesContext = React.createContext<(invoices: Invoice[]) => void>(setInvoiceFunc)

const dummySetInvoice = (x: React.SetStateAction<Invoice>) => void {}
const dummySetFormMode = (x: React.SetStateAction<FormMode>) => void {}
const dummyFormState: FormState = {
  invoice: defaultInvoice, setInvoice: dummySetInvoice, formMode: FormMode.Register, setFormMode: dummySetFormMode}
export const FormStateContext = React.createContext<FormState>(dummyFormState)

const dummyApiErrors: ApiError[] = [{ id: '', detail: '' }]
const dummySetErrorDisplay = (x: React.SetStateAction<ApiError[]>) => void {}
const dummyErrorDisplayState: ErrorDisplayState = {
  apiErrors: dummyApiErrors, setApiErrors: dummySetErrorDisplay }
export const ApiErrorStateContext = React.createContext<ErrorDisplayState>(dummyErrorDisplayState)
