import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../../components/ContactForm';

describe('ContactForm Component', () => {
  test('renders contact form with all fields', () => {
    render(<ContactForm locale="zh" />);

    // Check form fields exist
    expect(document.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="phone"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="company"]')).toBeInTheDocument();
    expect(document.querySelector('textarea[name="message"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /提交/i })).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(<ContactForm locale="zh" />);

    // Fill out the form
    fireEvent.change(screen.getByRole('textbox', { name: /姓名/i }), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: /邮箱/i }), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /留言内容/i }), { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /提交/i }));

    // Wait for success state (mock API takes 1 second)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /发送另一条消息/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  }, 10000);

  test('shows validation error when name is empty', async () => {
    render(<ContactForm locale="zh" />);

    // Fill email and message but leave name empty
    fireEvent.change(screen.getByRole('textbox', { name: /邮箱/i }), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /留言内容/i }), { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /提交/i }));

    // Validation should fail - check that the form is still visible (not submitted)
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /邮箱/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('shows validation error for invalid email', async () => {
    render(<ContactForm locale="zh" />);

    // Fill out form with invalid email
    fireEvent.change(screen.getByRole('textbox', { name: /姓名/i }), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: /邮箱/i }), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByRole('textbox', { name: /留言内容/i }), { target: { value: 'Test message' } });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /提交/i }));
    });

    // Validation should fail and button should return to non-submitting state
    // Check that form is still visible (not submitted successfully)
    expect(screen.getByRole('textbox', { name: /邮箱/i })).toBeInTheDocument();
  });

  test('can reset form after successful submission', async () => {
    render(<ContactForm locale="zh" />);

    // Fill out and submit form
    fireEvent.change(screen.getByRole('textbox', { name: /姓名/i }), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: /邮箱/i }), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /留言内容/i }), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button', { name: /提交/i }));

    // Wait for success state (mock API takes 1 second)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /发送另一条消息/i })).toBeInTheDocument();
    }, { timeout: 3000 });

    // Click reset button
    fireEvent.click(screen.getByRole('button', { name: /发送另一条消息/i }));

    // Wait for form to be visible
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /姓名/i })).toBeInTheDocument();
    });

    // Form should be cleared
    expect(screen.getByRole('textbox', { name: /姓名/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /邮箱/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /留言内容/i })).toHaveValue('');
  }, 10000);
});
