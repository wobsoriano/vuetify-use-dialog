# vuetify-use-dialog

> Confirming user choice is a good thing to do, it should also be easy to do.

Simple confirmation dialog and snackbar composable built on top of [Vuetify](https://next.vuetifyjs.com).

Demo: https://vuetify-use-dialog.vercel.app

## Installation

```bash
npm install vuetify-use-dialog
```

## Usage

Install the plugin (after vuetify)

```ts
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import VuetifyUseDialog from 'vuetify-use-dialog'

import App from './App.vue'

const app = createApp(App)
const vuetify = createVuetify()

app.use(vuetify)
app.use(VuetifyUseDialog)

app.mount('#app')
```

Call the `useConfirm` or `useSnackbar` composable anywhere:

```vue
<script setup lang="ts">
import { useConfirm, useSnackbar } from 'vuetify-use-dialog'

const createConfirm = useConfirm()
const showSnackbar = useSnackbar()

async function handleConfirm() {
  try {
    await createConfirm({ content: 'This action is permanent!' })
    showSnackbar({ text: 'Confirmed' })
  }
  catch {
    showSnackbar({ text: 'Cancelled' })
  }
}
</script>

<template>
  <VBtn @click="handleConfirm">
    Confirm
  </VBtn>
</template>
```

## Options

### `useConfirm`

| Name                                    | Type        | Default           | Description                                                                                                                                                                                                                            |
| --------------------------------------- | ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`title`**                             | `string` | `'Are you sure?'` | Dialog title.                                                                                                                                                                                                                          |
| **`content`**                       | `string` | `''`              | Dialog content.                                                                                                                                                                          |
| **`confirmationText`**                  | `string` | `'Ok'`            | Confirmation button caption.                                                                                                                                                                                                           |
| **`cancellationText`**                  | `string` | `'Cancel'`        | Cancellation button caption.                                                                                                                                                                                                           |
| **`dialogProps`**                       | `object`    | `{}`              | [VDialog](https://next.vuetifyjs.com/en/api/v-dialog/#props) props.                                                                                                                                                             |
| **`cardProps`**                | `object`    | `{}`              | [VCard](https://next.vuetifyjs.com/en/api/v-card/#props) props.                                                                                                                                              |
| **`confirmationButtonProps`**           | `object`    | `{}`              | [VBtn](https://next.vuetifyjs.com/en/api/v-btn/#props) props for the confirmation button.                                                                                                                                 |
| **`cancellationButtonProps`**           | `object`    | `{}`              | [VBtn](https://next.vuetifyjs.com/en/api/v-btn/#props) props for the cancellation button.                                                                                                                                 |
| **`cardTitleProps`**                        | `object`    | `{}`              | [VCardTitle](https://next.vuetifyjs.com/en/api/v-card-title/#props) props for the dialog title.                                                                                                                                         |
| **`cardTextProps`**                      | `object`    | `{}`              | [VCardText](https://next.vuetifyjs.com/en/api/v-card-text/#props) props for the dialog content.                                                                                                                                   |

### `useSnackbar`

| Name                                    | Type        | Default           | Description                                                                                                                                                                                                                            |
| --------------------------------------- | ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`text`**                             | `string` | `''` | Snackbar text.                                                                                                                                                              |
| **`snackbarProps`**                       | `object`    | `{}`              | [VSnackbar](https://next.vuetifyjs.com/en/api/v-snackbar/#props) props.                                                                                                                                                             |
| **`showCloseButton`**                       | `boolean` | `true`              | Show the close button.
| **`closeButtonText`**                       | `string` | `'Close'`              | Close button text 
| **`closeButtonProps`**                       | `object`    | `{}`              | [VBtn](https://next.vuetifyjs.com/en/api/v-dialog/#props) props.                                                                                                                                                             |

Global options:

```ts
app.use(VuetifyUseDialog, {
  confirmDialog: {
    // useConfirm options
    title: 'Are you sure?'
  },
  snackbar: {
    // useSnackbar options
    snackbarProps: {
      timeout: 2000,
    }
  }
})
```

## License

MIT
