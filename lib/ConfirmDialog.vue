<script setup lang="ts">
import { VBtn, VCard, VCardActions, VCardText, VDialog, VSpacer, VThemeProvider } from 'vuetify/components'
import { type Component, type PropType, computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Are you sure?',
  },
  titleComponent: {
    type: Object as PropType<Component>,
    required: false,
  },
  titleComponentProps: {
    type: Object,
    required: false,
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
  contentComponentProps: {
    type: Object,
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
  actionsContentComponent: {
    type: Object as PropType<Component>,
    required: false,
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
  resolve: {
    type: Function as PropType<(value: boolean) => void>,
    required: true,
  },
})

const isOpen = ref(true)
const textFieldInput = ref<HTMLInputElement | null>(null)
const textField = ref('')
let isConfirmed = false

function confirm() {
  isConfirmed = true
  isOpen.value = false
}

function cancel() {
  isConfirmed = false
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

// If the dialog is closed, resolve the promise after a short delay to allow animations to finish
watch(isOpen, (val) => {
  if (!val) {
    setTimeout(() => {
      props.resolve(isConfirmed as boolean)
    }, 100)
  }
})
</script>

<template>
  <VThemeProvider :theme="theme">
    <VDialog v-bind="dialogProps" v-model="isOpen">
      <VCard v-bind="cardProps">
        <component :is="titleComponent" v-if="titleComponent" v-bind="titleComponentProps" />
        <VCardTitle v-else v-bind="cardTitleProps">
          {{ title }}
        </VCardTitle>
        <VCardText v-bind="cardTextProps">
          <component :is="contentComponent" v-if="contentComponent" v-bind="contentComponentProps" />
          <template v-else>
            <template v-if="content">
              {{ content }}
            </template>
            <VTextField v-if="confirmationKeyword" ref="textFieldInput" v-model="textField" v-bind="confirmationKeywordTextFieldProps" variant="underlined" />
          </template>
        </VCardText>
        <VCardActions v-bind="cardActionsProps">
          <component :is="actionsContentComponent" v-if="actionsContentComponent" :confirmation-button-disabled="confirmationButtonDisabled" :cancel="cancel" :confirm="confirm" />
          <template v-else>
            <VSpacer />
            <VBtn v-bind="cancellationButtonProps" @click="cancel">
              {{ cancellationText }}
            </VBtn>
            <VBtn color="primary" :disabled="confirmationButtonDisabled" v-bind="confirmationButtonProps" @click="confirm">
              {{ confirmationText }}
            </VBtn>
          </template>
        </VCardActions>
      </VCard>
    </VDialog>
  </VThemeProvider>
</template>
