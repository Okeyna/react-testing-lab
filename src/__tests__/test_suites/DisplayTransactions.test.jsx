import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Transaction from '../../components/Transaction';

describe('Transaction Component', () => {
  const mockTransaction = {
    date: '2024-01-15',
    description: 'Groceries',
    category: 'Food',
    amount: '45.99'
  };

  it('renders the transaction row correctly', () => {
    render(
      <table>
        <tbody>
          <Transaction transaction={mockTransaction} />
        </tbody>
      </table>
    );
    
    // Use text content or role-based queries
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('45.99')).toBeInTheDocument();
  });

  it('displays all transaction data correctly', () => {
    render(
      <table>
        <tbody>
          <Transaction transaction={mockTransaction} />
        </tbody>
      </table>
    );
    
    const row = screen.getByRole('row');
    const cells = screen.getAllByRole('cell');
    
    expect(cells).toHaveLength(4);
    expect(cells[0]).toHaveTextContent('2024-01-15');
    expect(cells[1]).toHaveTextContent('Groceries');
    expect(cells[2]).toHaveTextContent('Food');
    expect(cells[3]).toHaveTextContent('45.99');
  });

  it('handles different transaction data', () => {
    const anotherTransaction = {
      date: '2024-01-20',
      description: 'Rent',
      category: 'Housing',
      amount: '1200.00'
    };
    
    render(
      <table>
        <tbody>
          <Transaction transaction={anotherTransaction} />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('2024-01-20')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('1200.00')).toBeInTheDocument();
  });

  it('renders within a table context', () => {
    render(
      <table>
        <tbody>
          <Transaction transaction={mockTransaction} />
        </tbody>
      </table>
    );
    
    const table = screen.getByRole('table');
    const row = screen.getByRole('row');
    
    expect(table).toBeInTheDocument();
    expect(row).toBeInTheDocument();
    expect(row.tagName).toBe('TR');
  });
});