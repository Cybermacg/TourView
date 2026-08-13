import { useQuery } from '@tanstack/react-query';
import { PexelsClient } from '../lib/PexelsClient';
import type { PexelsSearchResponse } from '../types/pexels';

export function usePexelSearch(query: string, perPage: number = 30) {
    return useQuery<PexelsSearchResponse>({
        queryKey: ['photo', query, perPage],
        queryFn: async () => {
            const response = await PexelsClient.get<PexelsSearchResponse>('/search', {
                params: { query: `${query} tourist attraction landmark`, per_page: perPage, orientation: 'landscape', size: 'large', color: 'blue' },
            });

            return response.data;
        },
        enabled: !!query,
        staleTime: 1000 * 60 * 60
    });

}