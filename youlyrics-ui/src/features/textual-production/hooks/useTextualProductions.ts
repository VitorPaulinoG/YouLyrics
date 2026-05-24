import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Page } from '@/types/page';
import type { TextualProduction } from '@/types/textualProduction';

async function fetchTextualProductions() {
  const response = await http.get<Page<TextualProduction>>('/textual-productions', {
    params: {
      page: 0,
      size: 10,
    },
  });

  return response.data;
}

export function useTextualProductionsQuery() {
  return useQuery({
    queryKey: ['textual-productions'],
    queryFn: fetchTextualProductions,
  });
}
