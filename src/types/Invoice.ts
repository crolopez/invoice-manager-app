export interface Invoice {
  invoiceId: string,
  supplier: string,
  amount: number,
  dateIssued: Date,
  currency: string,
  description: string
}
