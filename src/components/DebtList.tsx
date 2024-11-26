import React from 'react';
import { Check, X, Search, DollarSign, Clock } from 'lucide-react';
import type { Debt, Payment } from '../types';
import { formatCurrency } from '../utils/debtUtils';
import { PaymentModal } from './PaymentModal';
import { DebtHistoryModal } from './DebtHistoryModal';

interface Props {
  debts: Debt[];
  onToggleDebt: (id: string) => void;
  onAddPayment: (debtId: string, payment: Omit<Payment, 'id'>) => void;
  onAddCollectionNote: (debtId: string, note: string) => void;
}

export function DebtList({ debts, onToggleDebt, onAddPayment, onAddCollectionNote }: Props) {
  const [search, setSearch] = React.useState('');
  const [selectedDebtId, setSelectedDebtId] = React.useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedDebtor, setSelectedDebtor] = React.useState<string | null>(null);
  
  const filteredDebts = debts.filter(debt => 
    debt.debtorName.toLowerCase().includes(search.toLowerCase()) ||
    debt.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalOwed = debts.reduce((sum, debt) => !debt.isPaid ? sum + debt.amount : sum, 0);

  const handleAddPayment = (payment: Omit<Payment, 'id'>) => {
    if (selectedDebtId) {
      onAddPayment(selectedDebtId, payment);
      setShowPaymentModal(false);
      setSelectedDebtId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search debts..."
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900">
            Total Outstanding: {formatCurrency(totalOwed)}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDebts.map(debt => (
            <div
              key={debt.id}
              className={`p-4 transition-colors ${
                debt.isPaid ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <button
                    onClick={() => setSelectedDebtor(debt.debtorName)}
                    className="font-medium hover:text-rose-600 transition-colors"
                  >
                    <h4 className={debt.isPaid ? 'text-gray-500 line-through' : 'text-gray-900'}>
                      {debt.debtorName}
                    </h4>
                  </button>
                  <p className="text-sm text-gray-500">{debt.description}</p>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span>Created: {new Date(debt.date).toLocaleDateString()}</span>
                    {debt.dueDate && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Due: {new Date(debt.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${debt.isPaid ? 'text-gray-500' : 'text-blue-600'}`}>
                    {formatCurrency(debt.amount)}
                  </span>
                  {!debt.isPaid && (
                    <button
                      onClick={() => {
                        setSelectedDebtId(debt.id);
                        setShowPaymentModal(true);
                      }}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                    >
                      <DollarSign size={20} className="text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={() => onToggleDebt(debt.id)}
                    className={`p-2 rounded-full transition-colors ${
                      debt.isPaid
                        ? 'bg-gray-100 hover:bg-gray-200'
                        : 'bg-green-100 hover:bg-green-200'
                    }`}
                  >
                    {debt.isPaid ? (
                      <X size={20} className="text-gray-600" />
                    ) : (
                      <Check size={20} className="text-green-600" />
                    )}
                  </button>
                </div>
              </div>

              {debt.paymentHistory?.length > 0 && (
                <div className="mt-2 p-2 bg-gray-50 rounded-md">
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Payment History</h5>
                  <div className="space-y-1">
                    {debt.paymentHistory.map(payment => (
                      <div key={payment.id} className="text-sm text-gray-600 flex justify-between">
                        <span>{new Date(payment.date).toLocaleDateString()} - {payment.method}</span>
                        <span className="font-medium">{formatCurrency(payment.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {debt.collectionNotes?.length > 0 && (
                <div className="mt-2 p-2 bg-gray-50 rounded-md">
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Collection Notes</h5>
                  <div className="space-y-1">
                    {debt.collectionNotes.map((note, index) => (
                      <p key={index} className="text-sm text-gray-600">{note}</p>
                    ))}
                  </div>
                </div>
              )}

              {!debt.isPaid && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Add collection note..."
                    className="w-full text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        onAddCollectionNote(debt.id, input.value);
                        input.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          {filteredDebts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No debts found
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedDebtId(null);
          }}
          onSubmit={handleAddPayment}
        />
      )}

      {selectedDebtor && (
        <DebtHistoryModal
          debtorName={selectedDebtor}
          debts={debts}
          onClose={() => setSelectedDebtor(null)}
        />
      )}
    </div>
  );
}