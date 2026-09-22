export interface CreateExpensePayload {
  expense_category_id: string;
  amount: string;
  expense_date: string;
  description?: string;
}

export interface Expense {
  id: string;
  expense_date: string;
  amount: number;
  notes?: string;
  category: ExpenseCategory;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
}
