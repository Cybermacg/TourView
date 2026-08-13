import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import type { CountryTourismInfo } from "../types/rest";

export const useSearchCountry = (searchTerm: string) => {
    return useQuery<CountryTourismInfo[]>({
        queryKey: ['country', searchTerm],
        queryFn: async () => {
            const encodedTerm = encodeURIComponent(searchTerm.trim());
            const response = await axios.get(
                `/api/restcountries/countries/v5/name?q=${encodedTerm}`, {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_REST_API_KEY}`
                    },
                }
            );
            return response.data.data.objects;
        },
        enabled: !!searchTerm.trim(),
        staleTime: 1000 * 60 * 60,
    });
};

