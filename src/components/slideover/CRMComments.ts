import { useDealDetailsStore } from "~/stores/dealDetailsStore";
import { DB_ID, COLLECTION_DEALS } from "~/constants";
import { useQuery } from "@tanstack/vue-query";

export function useComments() {
    const store = useDealDetailsStore();
    const cardId = store.card?.id || '';

    return useQuery({
        queryKey: ['deal', cardId],
        queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId)
    });
}