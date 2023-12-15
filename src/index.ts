import { inject } from 'vue'
import VuetifyUseDialog from './VuetifyUseDialog.vue'
import { VuetifyUseDialogKey } from './providerKeys'
import { type ConfirmDialogOptions, type SnackbarOptions } from './types'

const errorMessage = 'Missing dialog instance. Did you forget to wrap your app with `<VuetifyUseDialog>` component?'

function useSnackbar() {
  const state = inject<{
    createSnackbar: (options: SnackbarOptions) => void
  }>(VuetifyUseDialogKey)

  if (!state)
    throw new Error(errorMessage)

  return state.createSnackbar
}

function useConfirm() {
  const state = inject<{
    createConfirm: (options: ConfirmDialogOptions) => Promise<boolean>
  }>(VuetifyUseDialogKey)

  if (!state)
    throw new Error(errorMessage)

  return state.createConfirm
}

export {
  useConfirm,
  useSnackbar,
  VuetifyUseDialog,
}
