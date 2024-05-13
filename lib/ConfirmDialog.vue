<script setup lang="ts">
import { VBtn, VCard, VCardActions, VCardText, VDialog, VSpacer, VThemeProvider } from 'vuetify/components'
import { type Component, type PropType, computed, nextTick, onMounted, ref } from 'vue'

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
  hideActions: {
    type: Boolean,
    default: false
  },
  hideTitle: {
    type: Boolean,
    default: false
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

function confirm() {
  props.resolve(true)
  isOpen.value = false
}

function cancel() {
  props.resolve(false)
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

function resolveIfHidden(v: boolean) {
  if (!v) {
    nextTick(() => {
      props.resolve(false)
    })
  }
}
</script>

<template>
  <VThemeProvider :theme="theme">
    <VDialog v-bind="dialogProps" v-model="isOpen" @update:model-value="resolveIfHidden">
      <VCard v-bind="cardProps">
        <component :is="titleComponent" v-if="titleComponent" v-bind="titleComponentProps" />
        <VCardTitle v-else-if="!hideTitle" v-bind="cardTitleProps">
          {{ title }}
        </VCardTitle>
        <VCardText v-bind="cardTextProps">
          <component :is="contentComponent" v-if="contentComponent" v-bind="contentComponentProps" v-on:confirm="confirm" v-on:cancel="cancel" />
          <template v-else>
            <template v-if="content">
              {{ content }}
            </template>
            <VTextField v-if="confirmationKeyword" ref="textFieldInput" v-model="textField" v-bind="confirmationKeywordTextFieldProps" variant="underlined" />
          </template>
        </VCardText>
        <VCardActions v-if="!hideActions" v-bind="cardActionsProps">
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