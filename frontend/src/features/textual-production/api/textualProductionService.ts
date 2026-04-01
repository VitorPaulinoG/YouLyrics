import { useQuery } from '@tanstack/react-query';
import { http } from '@/shared/api/http';
import type { Page } from '@/shared/types/page';
import type { TextualProduction } from '@/entities/textual-production/model/textualProduction';

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
