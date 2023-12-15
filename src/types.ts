import type { AllowedComponentProps, Component, InjectionKey, VNodeProps } from 'vue'
import type { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSnackbar, VTextField } from 'vuetify/components'

type ExtractProps<TComponent> =
  TComponent extends new () => {
    $props: infer P
  }
    ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
    : never

export interface ConfirmDialogOptions {
  title?: string
  titleComponent?: Component
  titleComponentProps?: Record<string, any>
  content?: string
  contentComponent?: Component
  contentComponentProps?: Record<string, any>
  confirmationText?: string
  cancellationText?: string
  dialogProps?: ExtractProps<typeof VDialog>
  cardProps?: ExtractProps<typeof VCard>
  cardTitleProps?: ExtractProps<typeof VCardTitle>
  cardTextProps?: ExtractProps<typeof VCardText>
  cardActionsProps?: ExtractProps<typeof VCardActions>
  cancellationButtonProps?: ExtractProps<typeof VBtn>
  confirmationButtonProps?: ExtractProps<typeof VBtn>
  confirmationKeyword?: string
  confirmationKeywordTextFieldProps?: ExtractProps<typeof VTextField>
  theme?: string
}

export interface SnackbarOptions {
  text?: string
  contentComponent?: Component
  snackbarProps?: ExtractProps<typeof VSnackbar>
  showCloseButton?: boolean
  actionButtonProps?: ExtractProps<typeof VBtn>
  actionButtonText?: string
  theme?: string
}

export type ConfirmDialogValue = Map<string, {
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
  options: ConfirmDialogOptions
}>

export type SnackbarValue = Map<string, SnackbarOptions>

export const VUseDialogInjectionKey = Symbol('Plugin provider key') as InjectionKey<{
  dialogs: ConfirmDialogValue
  snackbars: SnackbarValue
  createConfirm: (options: ConfirmDialogOptions) => Promise<boolean>
  createSnackbar: (options: SnackbarOptions) => void
}>
