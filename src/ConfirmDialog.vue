<script setup lang="ts">
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer, VThemeProvider } from 'vuetify/components'
import { type Component, type PropType, computed, inject, onMounted, ref } from 'vue'
import { type ConfirmDialogKeyValue } from './utils'

const props = defineProps({
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
  contentComponent: {
    type: Object as PropType<Component>,
    required: false,
  },
  confirmationKeyword: {
    type: String,
    required: false,
  },
  confirmationKeywordTextFieldProps: {
    type: Object,
    required: false,
    default: () => ({}),
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
  destroy: {
    type: Function,
    required: true,
  },
  promiseId: {
    type: String,
    required: true,
  },
})

const dialog = inject('ConfirmDialogKey') as ConfirmDialogKeyValue
const isOpen = ref(true)
const textFieldInput = ref<HTMLInputElement | null>(null)
const textField = ref('')

function confirm() {
  dialog?.state.promiseIds.get(props.promiseId)?.resolve?.(undefined)
  isOpen.value = false
}

function cancel() {
  dialog?.state.promiseIds.get(props.promiseId)?.reject?.(undefined)
  isOpen.value = false
}

onMounted(() => {
  textFieldInput.value?.focus()
})

const confirmationButtonDisabled = computed(() => {
  if (!props.confirmationKeyword)
    return false

  return props.confirmationKeyword !== textField.value
})

const finalDialogProps = computed(() => {
  return {
    ...props.dialogProps,
    onAfterLeave() {
      props.dialogProps.onAfterLeave?.()
      dialog?.state.promiseIds.delete(props.promiseId)
      props.destroy()
    },
  }
})
</script>

<template>
  <VThemeProvider :theme="theme">
    <VDialog v-bind="finalDialogProps" v-model="isOpen">
      <VCard v-bind="cardProps">
        <VCardTitle v-bind="cardTitleProps">
          {{ title }}
        </VCardTitle>
        <VCardText v-bind="cardTextProps">
          <template v-if="contentComponent">
            <Component :is="contentComponent" />
          </template>
          <template v-else-if="confirmationKeyword">
            <VTextField ref="textFieldInput" v-model="textField" v-bind="confirmationKeywordTextFieldProps" variant="underlined" />
          </template>
          <template v-else>
            {{ content }}
          </template>
        </VCardText>
        <VCardActions v-bind="cardActionsProps">
          <VSpacer />
          <VBtn v-bind="cancellationButtonProps" @click="cancel">
            {{ cancellationText }}
          </VBtn>
          <VBtn color="primary" :disabled="confirmationButtonDisabled" v-bind="confirmationButtonProps" @click="confirm">
            {{ confirmationText }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VThemeProvider>
</template>
