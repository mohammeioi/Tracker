import { describe, it, expect } from 'vitest';
import { calculateTotalOwed, formatCurrency, sortDebts } from '../../utils/debtUtils';
import type { Debt } from '../../types';

describe('debtUtils', () => {
  const mockDebts: Debt[] = [
    {
      id: '1',
      debtorName: 'John',
      amount: 100,
      description: 'Lunch',
      date: '2024-02-20T12:00:00.000Z',
      isPaid: false
    },
    {
      id: '2',
      debtorName: 'Jane',
      amount: 50,
      description: 'Coffee',
      date: '2024-02-21T12:00:00.000Z',
      isPaid: true
    }
  ];

  describe('calculateTotalOwed', () => {
    it('should calculate total of unpaid debts only', () => {
      expect(calculateTotalOwed(mockDebts)).toBe(100);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotalOwed([])).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });
  });

  describe('sortDebts', () => {
    it('should sort debts with unpaid first and by date', () => {
      const sorted = sortDebts(mockDebts);
      expect(sorted[0].id).toBe('1'); // Unpaid debt
      expect(sorted[1].id).toBe('2'); // Paid debt
    });
  });
});