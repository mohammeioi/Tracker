import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import type { Debt } from '../types';
import { formatCurrency } from '../utils/debtUtils';

interface Props {
  debts: Debt[];
}

export function DashboardStats({ debts }: Props) {
  const totalOwed = debts.reduce((sum, debt) => !debt.isPaid ? sum + debt.amount : sum, 0);
  const totalCollected = debts.reduce((sum, debt) => debt.isPaid ? sum + debt.amount : sum, 0);
  const overdueDays = (date: string) => {
    const dueDate = new Date(date);
    const today = new Date();
    const diff = today.getTime() - dueDate.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };
  const overdueDebts = debts.filter(debt => 
    !debt.isPaid && debt.dueDate && overdueDays(debt.dueDate) > 0
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Outstanding</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOwed)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingDown className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Collected</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCollected)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-lg">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Overdue</p>
            <p className="text-2xl font-bold text-gray-900">{overdueDebts.length}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}