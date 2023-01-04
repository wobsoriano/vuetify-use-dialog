<script setup lang="ts">
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer, VThemeProvider } from 'vuetify/components'
import { inject, ref } from 'vue'
import { ConfirmDialogKey } from './utils'

defineProps({
  title: {
    type: String,
    required: false,
    default: 'Are you sure?',
  },
  content: {
    type: String,
    required: false,
    default: '',
  },
  confirmationText: {
    type: String,
    required: false,
    default: 'Ok',
  },
  cancellationText: {
    type: String,
    required: false,
    default: 'Cancel',
  },
  dialogProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  cardProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  cardTitleProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  cardTextProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  cardActionsProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  cancellationButtonProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  confirmationButtonProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  theme: {
    type: String,
    required: true,
  },
})

const dialog = inject(ConfirmDialogKey)
const isOpen = ref(true)

function confirm() {
  dialog?.state.resolve?.(undefined)
  isOpen.value = false
}

function cancel() {
  dialog?.state.reject?.(undefined)
  isOpen.value = false
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <VThemeProvider :theme="theme">
    <VDialog v-bind="dialogProps" v-model="isOpen">
      <VCard v-bind="cardProps">
        <VCardTitle v-bind="cardTitleProps">
          {{ title }}
        </VCardTitle>
        <VCardText v-if="content" v-bind="cardTextProps">
          <p>{{ content }}</p>
        <!-- <VTextField label="Label" variant="underlined" /> -->
        </VCardText>
        <VCardActions v-bind="cardActionsProps">
          <VSpacer />
          <VBtn v-bind="cancellationButtonProps" @click="cancel">
            {{ cancellationText }}
          </VBtn>
          <VBtn color="primary" v-bind="confirmationButtonProps" @click="confirm">
            {{ confirmationText }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VThemeProvider>
</template>
