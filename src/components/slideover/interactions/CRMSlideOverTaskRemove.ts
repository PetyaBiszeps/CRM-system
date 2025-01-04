import { useBoardQuery } from "~/components/board/CRMBoardQuery";
import { useDealDetailsStore } from "~/stores/dealDetailsStore";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { useMutation } from "@tanstack/vue-query";

export function useRemoveTask() {
    const store = useDealDetailsStore();
    const { refetch } = useBoardQuery();

    const isLocalOpen = computed({
        get: () => store.isOpen,
        set: value => {
            store.isOpen = value;
        }
    });

    const { mutate, isPending } = useMutation(({
        mutationKey: ['delete card'],
        mutationFn: () => DB.deleteDocument(DB_ID, COLLECTION_DEALS, store.card!.id),
        onSuccess: () => {
            refetch();
        }
    }));

    const removeTask = () => {
        isLocalOpen.value = false;
        mutate();
    };

    return { store, isLocalOpen, isPending, removeTask };
}