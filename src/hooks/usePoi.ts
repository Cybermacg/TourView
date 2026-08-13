import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AttractionResponse } from "../types/attraction";

export const useSearchPlace = (lat?: number, lng?: number) => {
    return useQuery<AttractionResponse>({
        queryKey: ['places', lat, lng],
        queryFn: async () => {
            const response = await axios.get('https://api.geoapify.com/v2/places', {
                params: {
                    categories: 'tourism.sights',
                    filter: `circle:${lng},${lat},500000`,
                    limit: 10,
                    apiKey: import.meta.env.VITE_PLACES_API_KEY,
                },
            });
            console.log(response.data);
            return response.data;
        },
        enabled: lat !== undefined && lng !== undefined,
    });
};