import type { Plugin } from 'vue'
import { inject, reactive, readonly } from 'vue'
import { useTheme } from 'vuetify'
import ConfirmDialog from './ConfirmDialog.vue'
import { ConfirmDialogKey, type ConfirmDialogKeyValue, type Options, mount } from './utils'

const plugin: Plugin = {
  install(app) {
    let unmount: Function

    const state = reactive<ConfirmDialogKeyValue['state']>({
      resolve: null,
      reject: null,
    })

    function mountDialog(options: Options) {
      unmount?.()
      const { destroy } = mount(ConfirmDialog, options, app)
      unmount = destroy
      return new Promise((resolve, reject) => {
        state.resolve = resolve
        state.reject = reject
      })
    }

    app.provide(ConfirmDialogKey, { mountDialog, state: readonly(state) })
  },
}

function useConfirm() {
  const dialog = inject(ConfirmDialogKey)
  const theme = useTheme()

  function confirm(options: Options) {
    if (!dialog)
      throw new Error('Missing dialog instance')

    return dialog.mountDialog({
      theme: theme.name.value,
      ...options,
    })
  }

  return confirm
}

export {
  plugin as default,
  useConfirm,
}
