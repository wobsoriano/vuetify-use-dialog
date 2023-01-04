<script setup lang="ts">
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer, VThemeProvider } from 'vuetify/components'
import { type Component, type PropType, computed, inject, onMounted, ref } from 'vue'
import { ConfirmDialogKey } from './utils'

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
})

const dialog = inject(ConfirmDialogKey)
const isOpen = ref(true)
const textFieldInput = ref<HTMLInputElement | null>(null)
const textField = ref('')

function confirm() {
  dialog?.state.resolve?.(undefined)
  isOpen.value = false
}

function cancel() {
  dialog?.state.reject?.(undefined)
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
</script>

<template>
  <VThemeProvider :theme="theme">
    <VDialog v-bind="dialogProps" v-model="isOpen" @after-leave="props.destroy">
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
