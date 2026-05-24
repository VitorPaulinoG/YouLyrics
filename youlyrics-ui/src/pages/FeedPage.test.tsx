import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedPage } from '@/pages/FeedPage';
import { useTextualProductionsQuery } from '@/features/textual-production/hooks/useTextualProductions';

vi.mock('@/features/textual-production/hooks/useTextualProductions', () => ({
  useTextualProductionsQuery: vi.fn(),
}));

const mockedUseTextualProductionsQuery = vi.mocked(useTextualProductionsQuery);

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <FeedPage />
    </QueryClientProvider>,
  );
}

describe('FeedPage', () => {
  it('renders the feed items returned by the query', () => {
    mockedUseTextualProductionsQuery.mockReturnValue({
      data: {
        content: [
          {
            id: '1',
            title: 'Meu poema',
            author: { id: 'author-1', name: 'Vitor' },
            content: [['Linha 1', 'Linha 2']],
            literaryGenre: 'Poetry',
            description: 'Uma descrição',
          },
        ],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 0,
        first: true,
        last: true,
        empty: false,
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useTextualProductionsQuery>);

    renderPage();

    expect(screen.getByText('Create Your Textual Production')).toBeInTheDocument();
    expect(screen.getByText('Meu poema')).toBeInTheDocument();
    expect(screen.getByText('Vitor')).toBeInTheDocument();
  });
});
