import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostComposer } from '../PostComposer';

vi.mock('../../hooks/useCreateTextualProduction', () => ({
  useCreateTextualProduction: vi.fn(),
}));

import { useCreateTextualProduction } from '../../hooks/useCreateTextualProduction';

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

const mockMutate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useCreateTextualProduction as ReturnType<typeof vi.fn>).mockReturnValue({
    mutate: mockMutate,
  });
});

describe('PostComposer', () => {
  it('renders placeholder text in blur state', () => {
    renderWithQueryClient(<PostComposer />);
    expect(screen.getByText('Write Something...')).toBeInTheDocument();
  });

  it('shows form fields when clicked', async () => {
    renderWithQueryClient(<PostComposer />);

    fireEvent.click(screen.getByText('Create Your Textual Production'));

    expect(screen.getByTestId('textual-production__title')).toBeInTheDocument();
    expect(screen.getByTestId('textual-production__content')).toBeInTheDocument();
    expect(screen.getByTestId('textual-production__genre')).toBeInTheDocument();
    expect(screen.getByTestId('textual-production__theme')).toBeInTheDocument();
  });

  it('stays expanded when clicking outside with non-empty fields', async () => {
    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));

    await userEvent.type(screen.getByTestId('textual-production__title'), 'My Poem');
    fireEvent.mouseDown(document.body);

    expect(screen.getByTestId('textual-production__title')).toBeInTheDocument();
  });

  it('collapses when clicking outside with all empty fields', async () => {
    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.getByText('Write Something...')).toBeInTheDocument();
    });
  });

  it('shows add divider when hovering below a content textarea', async () => {
    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));

    const addZone = screen.getByTestId('textual-production__add-zone-0');
    fireEvent.mouseEnter(addZone);

    expect(screen.getByTestId('textual-production__add-divider-0')).toBeInTheDocument();
  });

  it('hides add divider when mouse leaves the hover zone', async () => {
    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));

    const addZone = screen.getByTestId('textual-production__add-zone-0');
    fireEvent.mouseEnter(addZone);
    fireEvent.mouseLeave(addZone);

    expect(screen.queryByTestId('textual-production__add-divider-0')).not.toBeInTheDocument();
  });

  it('adds a new content textarea when clicking the add divider', async () => {
    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));

    expect(screen.getAllByTestId('textual-production__content')).toHaveLength(1);

    const addZone = screen.getByTestId('textual-production__add-zone-0');
    fireEvent.mouseEnter(addZone);
    fireEvent.click(addZone);

    expect(screen.getAllByTestId('textual-production__content')).toHaveLength(2);
  });

  it('calls createTextualProduction with correct payload on submit', async () => {
    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));

    await userEvent.type(screen.getByTestId('textual-production__title'), 'My Poem');
    await userEvent.type(screen.getByTestId('textual-production__content'), 'First line\nSecond line');
    await userEvent.type(screen.getByTestId('textual-production__genre'), 'Poetry');
    await userEvent.type(screen.getByTestId('textual-production__theme'), 'Humor, Romance');

    fireEvent.click(screen.getByRole('button', { name: 'Criar' }));

    expect(mockMutate).toHaveBeenCalledWith(
      {
        title: 'My Poem',
        content: [['First line', 'Second line']],
        literaryGenre: 'Poetry',
        themes: ['Humor', 'Romance'],
      },
      expect.any(Object),
    );
  });

  it('shows snackbar on successful submission', async () => {
    mockMutate.mockImplementation((_payload, options) => {
      options.onSuccess();
    });

    renderWithQueryClient(<PostComposer />);
    fireEvent.click(screen.getByText('Create Your Textual Production'));

    await userEvent.type(screen.getByTestId('textual-production__title'), 'My Poem');
    await userEvent.type(screen.getByTestId('textual-production__content'), 'A verse');
    await userEvent.type(screen.getByTestId('textual-production__genre'), 'Poetry');
    await userEvent.type(screen.getByTestId('textual-production__theme'), 'Love');

    fireEvent.click(screen.getByRole('button', { name: 'Criar' }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Textual Production created successfully!');
    });
  });
});
