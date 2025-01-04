import { useBoardQuery } from "~/components/board/CRMBoardQuery";
import { useDealDetailsStore } from "~/stores/dealDetailsStore";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { useMutation } from "@tanstack/vue-query";

export function useEditTask() {
    const store = useDealDetailsStore();
    const { refetch } = useBoardQuery();

    const isEditActive = ref(false);
    const editableFields = reactive({
        name: store.card?.name || "",
        price: store.card?.price || 0
    });

    const isLocalOpen = computed({
        get: () => store.isOpen,
        set: value => {
            store.isOpen = value;
        }
    });

    const { mutate: updateMutate, isPending: isUpdating } = useMutation({
        mutationKey: ["update card"],
        mutationFn: () =>
            DB.updateDocument(DB_ID, COLLECTION_DEALS, store.card!.id, {
                name: editableFields.name,
                price: editableFields.price
            }),
        onSuccess: () => {
            isLocalOpen.value = false;
            refetch();
        }
    });

    const toggleEditMode = () => {
        if (isEditActive.value) {
            updateMutate();
        } else {
            editableFields.name = store.card?.name || "";
            editableFields.price = store.card?.price || 0;
        }
        isEditActive.value = !isEditActive.value;
    };

    return { isEditActive, editableFields, isUpdating, toggleEditMode };
}