export interface Debt {
  id: string;
  debtorName: string;
  amount: number;
  description: string;
  date: string;
  dueDate?: string;
  isPaid: boolean;
  collectionNotes: string[];
  paymentHistory: Payment[];
}

export interface DebtFormData {
  debtorName: string;
  amount: number;
  description: string;
  dueDate?: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  method: string;
  notes?: string;
}