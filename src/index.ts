import type { Plugin } from 'vue'
import { inject, reactive } from 'vue'
import { useTheme } from 'vuetify'
import { nanoid } from 'nanoid'
import { defu } from 'defu'
import ConfirmDialog from './ConfirmDialog.vue'
import Snackbar from './Snackbar.vue'
import { type ConfirmDialogKeyValue, type ConfirmDialogOptions, type SnackbarOptions, mount } from './utils'

interface GlobalOptions {
  confirmDialog: ConfirmDialogOptions
  snackbar: SnackbarOptions
}

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

const plugin: Plugin = {
  install(app, globalOptions?: GlobalOptions) {
    const state = reactive<ConfirmDialogKeyValue['state']>({ promiseIds: new Map() })

    function mountDialog(options: ConfirmDialogOptions) {
      const promiseId = nanoid()

      mount(ConfirmDialog, {
        ...defu(options, globalOptions?.confirmDialog ?? {}),
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
        ...defu(options, globalOptions?.snackbar ?? {}),
      }, app)
    }

    app.provide('ConfirmDialogKey', {
      mountDialog,
      mountSnackbar,
      state,
    })

    app.config.globalProperties.$confirm = (options: WithRequired<ConfirmDialogOptions, 'theme'>) => {
      return mountDialog(options)
    }

    app.config.globalProperties.$toast = (options: WithRequired<SnackbarOptions, 'theme'>) => {
      return mountSnackbar(options)
    }
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
