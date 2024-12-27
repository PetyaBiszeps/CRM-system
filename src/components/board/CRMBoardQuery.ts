import type { IDeal } from "~/types/deals";
import type { IColumn } from "~/components/board/CRMBoardTypes";

import { useQuery } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_DEALS } from "~/constants";
import { boardData } from "~/components/board/CRMBoardData";

export function useBoardQuery() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data) {
            const newBoard: IColumn[] = boardData.map(column => ({ ...column, items: [] }));
            const deals = data.documents as unknown as IDeal[];

            for (const deal of deals) {
                const column = newBoard.find(col => col.id === deal.status);

                if (column) {
                    column.items.push({
                        $createdAt: deal.$createdAt,
                        id: deal.$id,
                        name: deal.name,
                        price: deal.price,
                        companyName: deal.customer.name,
                        status: column.name
                    });
                }
            }

            return newBoard;
        }
    });
}