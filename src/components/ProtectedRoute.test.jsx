import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../context/AuthContext';

// Mock Navigate component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }) => <div data-testid="navigate">Redirecting to {to}</div>,
  };
});

describe('ProtectedRoute Component', () => {
  const mockChildren = <div data-testid="protected-content">Protected Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderProtectedRoute = (token) => {
    const mockContextValue = {
      token,
      user: token ? { id: '1', email: 'test@example.com' } : null,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    return render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContextValue}>
          <ProtectedRoute>{mockChildren}</ProtectedRoute>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders children when user is authenticated (token exists)', () => {
    renderProtectedRoute('valid-token-123');

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('redirects to signin when user is not authenticated (no token)', () => {
    renderProtectedRoute(null);

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByText(/redirecting to \/signin/i)).toBeInTheDocument();
  });

  it('redirects to signin when token is empty string', () => {
    renderProtectedRoute('');

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByText(/redirecting to \/signin/i)).toBeInTheDocument();
  });

  it('renders children when token is a valid string', () => {
    renderProtectedRoute('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('handles multiple children correctly when authenticated', () => {
    const multipleChildren = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </>
    );

    const mockContextValue = {
      token: 'valid-token',
      user: { id: '1', email: 'test@example.com' },
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContextValue}>
          <ProtectedRoute>{multipleChildren}</ProtectedRoute>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});

