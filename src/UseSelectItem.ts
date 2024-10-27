import SelectList from './SelectList.vue'
import { useConfirm } from '../lib/index'

export function useSelectItem() {
    const createConfirm = useConfirm()

    return async () => {
        const isConfirmed = await createConfirm({
            contentComponent: SelectList,
            hideActions: true,
            hideTitle: true,
            title: 'Select'
        })

        return isConfirmed
    }
}