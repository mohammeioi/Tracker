import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import type { Debt } from '../types';
import { formatCurrency } from '../utils/debtUtils';

interface Props {
  debtorName: string;
  debts: Debt[];
  onClose: () => void;
}

export function DebtHistoryModal({ debtorName, debts, onClose }: Props) {
  const { t } = useTranslation();
  const debtorDebts = debts.filter(debt => debt.debtorName === debtorName);
  
  const totalOwed = debtorDebts.reduce((sum, debt) => !debt.isPaid ? sum + debt.amount : sum, 0);
  const totalPaid = debtorDebts.reduce((sum, debt) => 
    debt.paymentHistory.reduce((pSum, payment) => pSum + payment.amount, 0), 0
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{debtorName}</h2>
            <p className="text-sm text-gray-500">
              {t('stats.outstanding')}: {formatCurrency(totalOwed)} | 
              {t('stats.collected')}: {formatCurrency(totalPaid)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-auto max-h-[calc(80vh-80px)]">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="text-sm text-gray-500">
                <th className="p-3 text-start border-b border-gray-200">التاريخ</th>
                <th className="p-3 text-start border-b border-gray-200">الوصف</th>
                <th className="p-3 text-start border-b border-gray-200">المبلغ</th>
                <th className="p-3 text-start border-b border-gray-200">المدفوع</th>
                <th className="p-3 text-start border-b border-gray-200">المتبقي</th>
                <th className="p-3 text-start border-b border-gray-200">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {debtorDebts.map(debt => {
                const paidAmount = debt.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
                const remaining = debt.amount - paidAmount;
                
                return (
                  <tr key={debt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      {new Date(debt.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">{debt.description}</td>
                    <td className="p-3 whitespace-nowrap font-medium">
                      {formatCurrency(debt.amount)}
                    </td>
                    <td className="p-3 whitespace-nowrap text-green-600">
                      {formatCurrency(paidAmount)}
                    </td>
                    <td className="p-3 whitespace-nowrap text-rose-600">
                      {formatCurrency(remaining)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${debt.isPaid 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {debt.isPaid ? 'مدفوع' : 'غير مدفوع'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}