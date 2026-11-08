import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import WorkComponent from './WorkComponent';

describe('WorkComponent & Case Study Modal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  test('renders architecture catalog heading and filters projects by category tabs', async () => {
    render(<WorkComponent />);

    expect(screen.getByRole('heading', { level: 2, name: /featured works & systems/i })).toBeInTheDocument();

    // Verify all category tabs
    const allTab = screen.getByRole('tab', { name: /all systems/i });
    const aiTab = screen.getByRole('tab', { name: /ai & fastmcp/i });
    expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Click AI tab
    await act(async () => {
      fireEvent.click(aiTab);
    });

    expect(aiTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Nasdaq NFN Model Context Protocol (FastMCP)')).toBeInTheDocument();
  });

  test('opens case study modal via React Portal on Inspect button click and handles close', async () => {
    render(<WorkComponent />);

    // Initially modal is not in document
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click "Inspect Case Study" button on the first project
    const inspectBtns = screen.getAllByRole('button', { name: /inspect case study/i });
    act(() => {
      fireEvent.click(inspectBtns[0]);
    });

    // Modal dialog is mounted directly in document.body via portal
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(document.body.contains(dialog)).toBe(true);

    // Close button dismisses modal
    const closeBtn = screen.getByRole('button', { name: /close modal dialog/i });
    act(() => {
      fireEvent.click(closeBtn);
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('supports screenshot carousel navigation in projects with multiple images', async () => {
    render(<WorkComponent />);

    // Open Saveo Wholesale project which has images
    const saveoTitle = screen.getByText('Saveo Wholesale & Retail Web Platform');
    act(() => {
      fireEvent.click(saveoTitle);
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Find previous and next screenshot buttons
    const nextBtn = screen.getByRole('button', { name: /next screenshot/i });
    const prevBtn = screen.getByRole('button', { name: /previous screenshot/i });
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();

    // Verify image 1 is rendered
    expect(screen.getByAltText(/saveo wholesale & retail web platform screenshot 1/i)).toBeInTheDocument();

    // Click next
    act(() => {
      fireEvent.click(nextBtn);
    });

    expect(screen.getByAltText(/saveo wholesale & retail web platform screenshot 2/i)).toBeInTheDocument();

    // Close with Escape key
    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
