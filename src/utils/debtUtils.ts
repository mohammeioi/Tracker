import type { Debt } from '../types';

export const calculateTotalOwed = (debts: Debt[]): number => {
  return debts.reduce((sum, debt) => !debt.isPaid ? sum + debt.amount : sum, 0);
};

export const formatCurrency = (amount: number, currency: string = 'IQD'): string => {
  return new Intl.NumberFormat('ar-IQ', {
    style: 'currency',
    currency: 'IQD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const sortDebts = (debts: Debt[]): Debt[] => {
  return [...debts].sort((a, b) => {
    if (a.isPaid !== b.isPaid) {
      return a.isPaid ? 1 : -1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const getUniqueDebtors = (debts: Debt[]): string[] => {
  return Array.from(new Set(debts.map(debt => debt.debtorName))).sort();
};