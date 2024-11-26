import React from 'react';
import { PlusCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="p-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
        <PlusCircle className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No debts found</h3>
      <p className="text-sm text-gray-500">
        Get started by adding a new debt using the form.
      </p>
    </div>
  );
}