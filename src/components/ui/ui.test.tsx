import React, { useState } from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';

describe('Shadcn UI Primitives Suite', () => {
  test('Button renders with proper variants and size classes', () => {
    const { rerender } = render(<Button variant="default">Click me</Button>);
    let btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toHaveClass('btn-default', 'btn-size-default');

    rerender(<Button variant="destructive" size="sm">Delete</Button>);
    btn = screen.getByRole('button', { name: /delete/i });
    expect(btn).toHaveClass('btn-destructive', 'btn-size-sm');

    rerender(<Button variant="outline" size="lg">Outline</Button>);
    btn = screen.getByRole('button', { name: /outline/i });
    expect(btn).toHaveClass('btn-outline', 'btn-size-lg');
  });

  test('Badge renders with variant and custom color classes', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    let badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('badge-secondary');

    rerender(<Badge color="emerald">Active</Badge>);
    badge = screen.getByText('Active');
    expect(badge).toHaveClass('frosted-badge-emerald');
  });

  test('Card primitives render structured container with header, content, and footer', () => {
    render(
      <Card data-testid="card-root">
        <CardHeader>
          <CardTitle>Architecture Engine</CardTitle>
          <CardDescription>High-throughput pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <span>Body Content</span>
        </CardContent>
        <CardFooter>
          <Button size="sm">Inspect</Button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card-root')).toHaveClass('glass-card');
    expect(screen.getByRole('heading', { level: 3, name: /architecture engine/i })).toBeInTheDocument();
    expect(screen.getByText('High-throughput pricing')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /inspect/i })).toBeInTheDocument();
  });

  test('Tabs and TabsTrigger manage active state and trigger callbacks', () => {
    const TestTabs = () => {
      const [tab, setTab] = useState('first');
      return (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="first">Tab 1</TabsTrigger>
            <TabsTrigger value="second">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="first">Content 1</TabsContent>
          <TabsContent value="second">Content 2</TabsContent>
        </Tabs>
      );
    };

    render(<TestTabs />);

    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click Tab 2
    act(() => {
      fireEvent.click(tab2);
    });

    expect(tab1).toHaveAttribute('aria-selected', 'false');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('Dialog mounts via React Portal, supports open/close and Escape key', async () => {
    const TestDialog = () => {
      const [open, setOpen] = useState(false);
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open Modal</DialogTrigger>
          <DialogContent data-testid="dialog-body">
            <h3>Modal Header</h3>
            <p>Modal Description</p>
          </DialogContent>
        </Dialog>
      );
    };

    render(<TestDialog />);

    // Initially modal is closed
    expect(screen.queryByTestId('dialog-body')).not.toBeInTheDocument();

    // Open dialog
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /open modal/i }));
    });

    const modalBody = screen.getByTestId('dialog-body');
    expect(modalBody).toBeInTheDocument();
    expect(screen.getByText('Modal Header')).toBeInTheDocument();

    // Verify modal is mounted in document.body (React Portal)
    expect(document.body.contains(modalBody)).toBe(true);

    // Close via close button
    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    act(() => {
      fireEvent.click(closeBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-body')).not.toBeInTheDocument();
    });

    // Reopen and test Escape key dismissal
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /open modal/i }));
    });
    expect(screen.getByTestId('dialog-body')).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-body')).not.toBeInTheDocument();
    });
  });

  test('Input, Textarea, and Label support props, accessibility, and error states', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" placeholder="Type here..." error />
        <Textarea id="test-textarea" placeholder="Long message..." />
      </div>
    );

    const input = screen.getByPlaceholderText('Type here...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('frosted-form-input');

    const textarea = screen.getByPlaceholderText('Long message...');
    expect(textarea).toBeInTheDocument();

    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });
});
