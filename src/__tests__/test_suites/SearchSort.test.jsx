import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Sort from '../../components/Sort';

describe('Sort', () => {
  it('renders select with options', () => {
    render(<Sort onSort={vi.fn()} />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Description' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Category' })).toBeInTheDocument();
  });

  it('calls onSort when selection changes', async () => {
    const mockOnSort = vi.fn();
    const user = userEvent.setup();
    
    render(<Sort onSort={mockOnSort} />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'category');
    
    expect(mockOnSort).toHaveBeenCalledWith('category');
  });

  it('calls onSort with description option', async () => {
    const mockOnSort = vi.fn();
    const user = userEvent.setup();
    
    render(<Sort onSort={mockOnSort} />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'description');
    
    expect(mockOnSort).toHaveBeenCalledWith('description');
  });
});