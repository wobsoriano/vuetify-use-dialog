import type { Plugin } from 'vue'
import { inject, reactive, readonly } from 'vue'
import { useTheme } from 'vuetify'
import ConfirmDialog from './ConfirmDialog.vue'
import Snackbar from './Snackbar.vue'
import { ConfirmDialogKey, type ConfirmDialogKeyValue, type ConfirmDialogOptions, type SnackbarOptions, mount } from './utils'

interface GlobalOptions {
  confirmDialog: ConfirmDialogOptions
  snackbar: SnackbarOptions
}

const plugin: Plugin = {
  install(app, globalOptions?: GlobalOptions) {
    let unmountDialog: () => void
    let unmountSnackbar: () => void

    const state = reactive<ConfirmDialogKeyValue['state']>({
      resolve: null,
      reject: null,
    })

    function mountDialog(options: ConfirmDialogOptions) {
      unmountDialog?.()
      const { destroy } = mount(ConfirmDialog, {
        ...globalOptions?.confirmDialog ?? {},
        ...options,
      }, app)
      unmountDialog = destroy
      return new Promise((resolve, reject) => {
        state.resolve = resolve
        state.reject = reject
      })
    }

    function mountSnackbar(options: SnackbarOptions) {
      unmountSnackbar?.()
      const { destroy } = mount(Snackbar, {
        ...globalOptions?.snackbar ?? {},
        ...options,
      }, app)
      unmountSnackbar = destroy
    }

    app.provide(ConfirmDialogKey, {
      mountDialog,
      mountSnackbar,
      state: readonly(state),
    })
  },
}

function useConfirm() {
  const dialog = inject(ConfirmDialogKey)
  const theme = useTheme()

  function confirm(options: ConfirmDialogOptions) {
    if (!dialog)
      throw new Error('Missing dialog instance')

    return dialog.mountDialog({
      theme: theme.name.value,
      ...options,
    })
  }

  return confirm
}

function useSnackbar() {
  const dialog = inject(ConfirmDialogKey)

  const theme = useTheme()

  function toast(options: SnackbarOptions) {
    if (!dialog)
      throw new Error('Missing dialog instance')

    return dialog.mountSnackbar({
      theme: theme.name.value,
      ...options,
    })
  }

  return toast
}

export {
  plugin as default,
  useConfirm,
  useSnackbar,
}
