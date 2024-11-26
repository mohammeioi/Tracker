import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle, Check, ChevronDown, Search } from 'lucide-react';
import { Combobox } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DebtFormData } from '../types';
import { getUniqueDebtors } from '../utils/debtUtils';
import { cn } from '../utils/cn';

interface Props {
  debts: Array<{ debtorName: string }>;
  onSubmit: (data: DebtFormData) => void;
}

export function DebtForm({ debts, onSubmit }: Props) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<DebtFormData>({
    debtorName: '',
    amount: 0,
    description: '',
    dueDate: undefined,
  });
  const [query, setQuery] = React.useState('');

  const uniqueDebtors = getUniqueDebtors(debts);
  const filteredDebtors = query === ''
    ? uniqueDebtors
    : uniqueDebtors.filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
      );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ debtorName: '', amount: 0, description: '', dueDate: undefined });
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4">
      <div className="relative">
        <Combobox
          value={formData.debtorName}
          onChange={value => setFormData(prev => ({ ...prev, debtorName: value }))}
        >
          {({ open }) => (
            <>
              <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.selectName')}
              </Combobox.Label>
              <div className="relative">
                <div className="relative w-full">
                  <Combobox.Input
                    className={cn(
                      "input-field pl-10 pr-10",
                      open && 'rounded-b-none border-b-0'
                    )}
                    onChange={event => setQuery(event.target.value)}
                    displayValue={(name: string) => name}
                    placeholder={t('form.searchOrAddName')}
                    required
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <ChevronDown 
                    className={cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform",
                      open && 'transform rotate-180'
                    )}
                  />
                </div>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-10 w-full"
                    >
                      <Combobox.Options className="max-h-60 overflow-auto rounded-b-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredDebtors.length === 0 && query !== '' ? (
                          <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            {t('form.pressEnterToAdd')}
                          </div>
                        ) : (
                          filteredDebtors.map(name => (
                            <Combobox.Option
                              key={name}
                              value={name}
                              className={({ active }) =>
                                cn(
                                  'relative cursor-pointer select-none py-2 px-4',
                                  active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                )
                              }
                            >
                              {({ selected, active }) => (
                                <div className="flex items-center justify-between">
                                  <span className={selected ? 'font-semibold' : 'font-normal'}>
                                    {name}
                                  </span>
                                  {selected && (
                                    <Check className={cn(
                                      'h-4 w-4',
                                      active ? 'text-white' : 'text-rose-500'
                                    )} />
                                  )}
                                </div>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </Combobox>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.amount')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{t('currency')}</span>
          </div>
          <input
            type="number"
            id="amount"
            required
            min="0"
            className="input-field pl-12"
            value={formData.amount || ''}
            onChange={e => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.dueDate')}
        </label>
        <input
          type="date"
          id="dueDate"
          className="input-field"
          value={formData.dueDate || ''}
          onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.description')}
        </label>
        <textarea
          id="description"
          rows={3}
          className="input-field"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2">
        <PlusCircle size={20} />
        {t('form.addDebt')}
      </button>
    </form>
  );
}