import { useDealDetailsStore } from "~/stores/dealDetailsStore";
import { DB_ID, COLLECTION_COMMENTS } from "~/constants";
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";

export function useCreateComment({ refetch }: { refetch: () => void }) {
    const store = useDealDetailsStore();
    const commentRef = ref<string>();
    const { mutate } = useMutation({
        mutationKey: ['add comments', commentRef.value],
        mutationFn: () =>
            DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), { text: commentRef.value, deal: store.card?.id }),
        onSuccess: () => {
            refetch();
            commentRef.value = '';
        }
    });

    const writeComment = () => {
        if (!commentRef.value) return;
        mutate();
    };

    return { writeComment, commentRef };
}