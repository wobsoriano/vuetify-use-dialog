import type { AllowedComponentProps, App, Component, VNode, VNodeProps } from 'vue'
import { createVNode, nextTick, render } from 'vue'
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
  closeButtonProps?: ExtractProps<typeof VBtn>
  closeButtonText?: string
  theme?: string
}

export function mount(component: Component, props: ConfirmDialogOptions & { promiseId: string } | SnackbarOptions, app: App) {
  const vNode: VNode | null = createVNode(component, {
    ...props,
    destroy() {
      render(null, app._container.firstElementChild)
    }
  })
  if (app && app._context)
    vNode.appContext = app._context

  render(vNode, app._container.firstElementChild)

  return { vNode }
}

export interface ConfirmDialogKeyValue {
  mountDialog: (options: ConfirmDialogOptions) => Promise<undefined>
  mountSnackbar: (options: SnackbarOptions) => void
  state: {
    'promiseIds': Map<string, {
      resolve: ((value: unknown) => void)
      reject: ((value: unknown) => void)
    }>
  }
}
