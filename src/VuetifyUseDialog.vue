<script setup lang="ts">
import { provide, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { defu } from 'defu'
import ConfirmDialog from './ConfirmDialog.vue'
import Snackbar from './Snackbar.vue'
import type { ConfirmDialogOptions, ConfirmDialogValue, SnackbarOptions, SnackbarValue } from './types'
import { VuetifyUseDialogKey } from './providerKeys'

const props = defineProps<{
  confirmDialog?: ConfirmDialogOptions
  snackbar?: SnackbarOptions
}>()

const state = reactive<{ dialogs: ConfirmDialogValue; snackbars: SnackbarValue }>({
  dialogs: new Map(),
  snackbars: new Map(),
})

function createConfirm(options: ConfirmDialogOptions): Promise<boolean> {
  const id = nanoid()
  const promise = new Promise((resolve, reject) => {
    state.dialogs.set(id, {
      resolve,
      reject,
      options: defu(options, props.confirmDialog),
    })
  })
  return promise as Promise<boolean>
}

function createSnackbar(options: SnackbarOptions) {
  const id = nanoid()
  state.snackbars.set(id, defu(options, props.snackbar))
}

provide(VuetifyUseDialogKey, {
  dialogs: state.dialogs,
  snackbars: state.snackbars,
  createConfirm,
  createSnackbar,
})
</script>

<template>
  <slot />
  <ConfirmDialog
    v-for="[key, value] in state.dialogs"
    :key="key"
    :promise-id="key"
    v-bind="value.options"
  />
  <Snackbar
    v-for="[key, value] in state.snackbars"
    :key="key"
    :promise-id="key"
    v-bind="value"
  />
</template>
