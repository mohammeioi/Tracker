import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DebtForm } from './components/DebtForm';
import { DebtList } from './components/DebtList';
import { DashboardStats } from './components/DashboardStats';
import { LanguageSwitch } from './components/LanguageSwitch';
import type { Debt, DebtFormData, Payment } from './types';
import './i18n';

const STORAGE_KEY = 'debt-tracker-data';

function App() {
  const { t } = useTranslation();
  const [debts, setDebts] = React.useState<Debt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
  }, [debts]);

  const handleAddDebt = (data: DebtFormData) => {
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      isPaid: false,
      collectionNotes: [],
      paymentHistory: [],
      ...data,
    };
    setDebts(prev => [newDebt, ...prev]);
  };

  const handleToggleDebt = (id: string) => {
    setDebts(prev => prev.map(debt =>
      debt.id === id ? { ...debt, isPaid: !debt.isPaid } : debt
    ));
  };

  const handleAddPayment = (debtId: string, paymentData: Omit<Payment, 'id'>) => {
    setDebts(prev => prev.map(debt => {
      if (debt.id === debtId) {
        const payment: Payment = {
          id: crypto.randomUUID(),
          ...paymentData,
        };
        const totalPaid = [...debt.paymentHistory, payment]
          .reduce((sum, p) => sum + p.amount, 0);
        
        return {
          ...debt,
          paymentHistory: [...debt.paymentHistory, payment],
          isPaid: totalPaid >= debt.amount,
        };
      }
      return debt;
    }));
  };

  const handleAddCollectionNote = (debtId: string, note: string) => {
    setDebts(prev => prev.map(debt =>
      debt.id === debtId
        ? { ...debt, collectionNotes: [...debt.collectionNotes, note] }
        : debt
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <LanguageSwitch />
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.header 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 text-rose-500 mb-2">
            <Wallet size={36} className="stroke-2" />
            <h1 className="text-4xl font-bold">{t('appTitle')}</h1>
          </div>
          <p className="text-gray-600">{t('appSubtitle')}</p>
        </motion.header>

        <DashboardStats debts={debts} />

        <div className="grid gap-8 lg:grid-cols-[350px,1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DebtForm debts={debts} onSubmit={handleAddDebt} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <DebtList
              debts={debts}
              onToggleDebt={handleToggleDebt}
              onAddPayment={handleAddPayment}
              onAddCollectionNote={handleAddCollectionNote}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;