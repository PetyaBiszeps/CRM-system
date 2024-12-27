import type { ICard } from "~/components/board/CRMBoardTypes";

const defaultValue: { card: ICard | null, isOpen: boolean } = {
    card: null,
    isOpen: false,
}

export const useDealDetailsStore = defineStore('dealDetails', {
    state: () => defaultValue,
    actions: {
        clear() {
            this.$patch(defaultValue);
        },
        set(card: ICard) {
            const clonedCard = JSON.parse(JSON.stringify(card));
            this.$patch({ card: clonedCard, isOpen: true });
        },
        toggle() {
            this.isOpen = !this.isOpen;
        }
    }
});