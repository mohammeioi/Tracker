import React from 'react';
import type { Payment } from '../types';

interface Props {
  onClose: () => void;
  onSubmit: (payment: Omit<Payment, 'id'>) => void;
}

export function PaymentModal({ onClose, onSubmit }: Props) {
  const [payment, setPayment] = React.useState<Omit<Payment, 'id'>>({
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    method: 'cash',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(payment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Record Payment</h2>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="amount"
                required
                min="0"
                step="0.01"
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={payment.amount || ''}
                onChange={(e) => setPayment({ ...payment, amount: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="method"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={payment.method}
              onChange={(e) => setPayment({ ...payment, method: e.target.value })}
            >
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Payment Date
            </label>
            <input
              type="date"
              id="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={payment.date}
              onChange={(e) => setPayment({ ...payment, date: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={payment.notes}
              onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            >
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}