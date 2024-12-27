import type { IColumn } from "~/components/board/CRMBoardTypes";

import { EnumStatus } from "~/types/deals";

export const boardData: IColumn[] = [
    { id: EnumStatus.todo, name: 'Incoming', items: [] },
    { id: EnumStatus["to-be-agreed"], name: 'To be agreed', items: [] },
    { id: EnumStatus["in-progress"], name: 'In progress', items: [] },
    { id: EnumStatus.produced, name: 'Produced', items: [] },
    { id: EnumStatus.done, name: 'Done', items: [] }
];