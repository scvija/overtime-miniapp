import axios from 'axios';
import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { useQuery, UseQueryOptions } from 'react-query';
import { PromotionItem } from 'types/ui';

export const usePromotionsQuery = (branchName: string, options?: UseQueryOptions<PromotionItem[]>) => {
    return useQuery<PromotionItem[]>(
        QUERY_KEYS.Promotions(branchName),
        async () => {
            try {
                const response = await axios.get(
                    `${generalConfig.API_URL}/promotions?branch-name=${branchName ? branchName : 'dev'}`
                );

                if (!response.data) return [];

                return response.data;
            } catch (e) {
                console.log('error', e);
                return [];
            }
        },
        {
            ...options,
        }
    );
};
