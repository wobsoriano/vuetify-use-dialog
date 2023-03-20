import type { Plugin } from 'vue'
import { inject, reactive } from 'vue'
import { useTheme } from 'vuetify'
import { nanoid } from 'nanoid'
import ConfirmDialog from './ConfirmDialog.vue'
import Snackbar from './Snackbar.vue'
import { type ConfirmDialogKeyValue, type ConfirmDialogOptions, type SnackbarOptions, mount } from './utils'

interface GlobalOptions {
  confirmDialog: ConfirmDialogOptions
  snackbar: SnackbarOptions
}

const plugin: Plugin = {
  install(app, globalOptions?: GlobalOptions) {
    const state = reactive<ConfirmDialogKeyValue['state']>({ promiseIds: new Map() })

    function mountDialog(options: ConfirmDialogOptions) {
      const promiseId = nanoid()

      mount(ConfirmDialog, {
        ...globalOptions?.confirmDialog ?? {},
        ...options,
        promiseId,
      }, app)

      return new Promise((resolve, reject) => {
        state.promiseIds.set(promiseId, {
          resolve,
          reject,
        })
      })
    }

    function mountSnackbar(options: SnackbarOptions) {
      mount(Snackbar, {
        ...globalOptions?.snackbar ?? {},
        ...options,
      }, app)
    }

    app.provide('ConfirmDialogKey', {
      mountDialog,
      mountSnackbar,
      state,
    })
  },
}

function useConfirm() {
  const dialog = inject('ConfirmDialogKey') as ConfirmDialogKeyValue
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
  const dialog = inject('ConfirmDialogKey') as ConfirmDialogKeyValue

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
