import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';

type CreateTextualProductionPayload = {
  title: string;
  content: string[][];
  literaryGenre: string;
  themes: string[];
};

async function createTextualProduction(payload: CreateTextualProductionPayload) {
  return http.post('/textual-productions', payload);
}

export function useCreateTextualProduction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTextualProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['textual-productions'] });
    },
  });
}
