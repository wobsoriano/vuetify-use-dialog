<script setup lang="ts">
import { VBtn, VSnackbar } from 'vuetify/components'
import { type Component, type PropType, computed, inject, ref } from 'vue'
import type { SnackbarValue } from './types'
import { VuetifyUseDialogKey } from './providerKeys'

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: '',
  },
  contentComponent: {
    type: Object as PropType<Component>,
    required: false,
  },
  snackbarProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  showCloseButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  actionButtonProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  actionButtonText: {
    type: String,
    required: false,
    default: 'Close',
  },
  promiseId: {
    type: String,
    required: true,
  },
})

const state = inject<{ snackbars: SnackbarValue }>(VuetifyUseDialogKey)

const snackbar = ref(true)

const finalSnackbarProps = computed(() => {
  return {
    ...props.snackbarProps,
    onAfterLeave() {
      props.snackbarProps.onAfterLeave?.()
      state?.snackbars.delete(props.promiseId)
    },
  }
})
</script>

<template>
  <VSnackbar v-bind="finalSnackbarProps" v-model="snackbar">
    <template v-if="contentComponent">
      <Component :is="contentComponent" />
    </template>
    <template v-else>
      {{ text }}
    </template>
    <template v-if="showCloseButton" #actions>
      <VBtn v-bind="actionButtonProps" variant="text" @click="snackbar = false">
        {{ actionButtonText }}
      </VBtn>
    </template>
  </VSnackbar>
</template>
