import type { Plugin } from 'vue'
import { inject, render } from 'vue'
import { useTheme } from 'vuetify'
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
    function mountDialog(options: ConfirmDialogOptions) {
      return new Promise<boolean>((resolve) => {
        return new Promise<boolean>((_resolve) => {
          mount(ConfirmDialog, {
            ...defu(options, globalOptions?.confirmDialog ?? {}),
            resolve: _resolve,
          }, app)
        }).then((value) => {
          render(null, app._container.firstElementChild)
          resolve(value)
        })
      })
    }

    function mountSnackbar(options: SnackbarOptions) {
      const mountEl = document.createElement('div')
      mount(Snackbar, {
        ...defu(options, globalOptions?.snackbar ?? {}),
        onClose() {
          app._container.removeChild(mountEl)
          render(null, mountEl)
        },
      }, app, mountEl)
    }

    app.provide('ConfirmDialogKey', {
      mountDialog,
      mountSnackbar,
    })

    app.config.globalProperties.$confirm = (options: WithRequired<ConfirmDialogOptions, 'theme' | 'resolve'>) => {
      return mountDialog(options)
    }

    app.config.globalProperties.$toast = (options: WithRequired<SnackbarOptions, 'theme' | 'onClose'>) => {
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
