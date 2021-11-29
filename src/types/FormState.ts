import { FormMode } from './FormMode'
import { Invoice } from './Invoice'

export type FormState = {
  invoice: Invoice,
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>,
  formMode: FormMode,
  setFormMode: React.Dispatch<React.SetStateAction<FormMode>>,
}
