import type { AllowedComponentProps, App, Component, InjectionKey, VNode, VNodeProps } from 'vue'
import { createVNode, render } from 'vue'
import type { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog } from 'vuetify/components'

type ExtractProps<TComponent> =
  TComponent extends new () => {
    $props: infer P
  }
    ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
    : never

export interface Options {
  title?: string
  content?: string
  confirmationText?: string
  cancellationText?: string
  dialogProps?: ExtractProps<typeof VDialog>
  cardProps?: ExtractProps<typeof VCard>
  cardTitleProps?: ExtractProps<typeof VCardTitle>
  cardTextProps?: ExtractProps<typeof VCardText>
  cardActionsProps?: ExtractProps<typeof VCardActions>
  cancellationButtonProps?: ExtractProps<typeof VBtn>
  confirmationButtonProps?: ExtractProps<typeof VBtn>
  theme?: string
}

export function mount(component: Component, props: Options, app: App) {
  let el: HTMLElement | null = null

  let vNode: VNode | null = createVNode(component, props as any)
  if (app && app._context)
    vNode.appContext = app._context
  if (el)
    render(vNode, el)
  else if (typeof document !== 'undefined')
    render(vNode, el = document.createElement('div'))

  const destroy = () => {
    if (el)
      render(null, el)
    el = null
    vNode = null
  }

  if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', () => {
      // TODO: Remount with correct theme
      destroy()
    })
  }

  return { vNode, destroy, el }
}

export interface ConfirmDialogKeyValue {
  mountDialog: (options: Options) => Promise<undefined>
  state: {
    resolve: ((value: unknown) => void) | null
    reject: ((value: unknown) => void) | null
  }
}

export const ConfirmDialogKey = Symbol('ConfirmDialogKey') as InjectionKey<ConfirmDialogKeyValue>
