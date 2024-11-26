import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DebtForm } from '../../components/DebtForm';

describe('DebtForm', () => {
  it('should submit form with correct data', async () => {
    const onSubmit = vi.fn();
    render(<DebtForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/debtor name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/amount/i), '100');
    await userEvent.type(screen.getByLabelText(/description/i), 'Test debt');

    fireEvent.submit(screen.getByRole('button', { name: /add debt/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      debtorName: 'John Doe',
      amount: 100,
      description: 'Test debt'
    });
  });

  it('should reset form after submission', async () => {
    render(<DebtForm onSubmit={() => {}} />);

    const nameInput = screen.getByLabelText(/debtor name/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(amountInput, '100');
    await userEvent.type(descriptionInput, 'Test debt');

    fireEvent.submit(screen.getByRole('button', { name: /add debt/i }));

    expect(nameInput).toHaveValue('');
    expect(amountInput).toHaveValue(0);
    expect(descriptionInput).toHaveValue('');
  });
});