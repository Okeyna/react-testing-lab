import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AddTransactionForm from '../../components/AddTransactionForm';

describe('AddTransactionForm', () => {
  let mockPostTransaction;
  let user;

  beforeEach(() => {
    mockPostTransaction = vi.fn();
    user = userEvent.setup();
  });

  it('renders all form inputs correctly', () => {
    render(<AddTransactionForm postTransaction={mockPostTransaction} />);
    
    // Use getByDisplayValue or getByRole with name for date input
    // Or better, use getByPlaceholderText for all inputs
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    
    // For date input, query by name attribute or use a testid
    const dateInput = screen.getByTestId('date-input');
    expect(dateInput).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Add Transaction/i })).toBeInTheDocument();
  });


  it('does not reset form after submission (current behavior)', async () => {
    render(<AddTransactionForm postTransaction={mockPostTransaction} />);
    
    const descriptionInput = screen.getByPlaceholderText('Description');
    await user.type(descriptionInput, 'Test Transaction');
    await user.click(screen.getByRole('button', { name: /add transaction/i }));
    
    // Check if values persist (current behavior doesn't reset)
    expect(descriptionInput).toHaveValue('Test Transaction');
  });


  it('maintains input values between renders', async () => {
    const { rerender } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
    
    const descriptionInput = screen.getByPlaceholderText('Description');
    await user.type(descriptionInput, 'Persistent Value');
    
    // Rerender with same props
    rerender(<AddTransactionForm postTransaction={mockPostTransaction} />);
    
    // Value should persist
    expect(descriptionInput).toHaveValue('Persistent Value');
  });
});