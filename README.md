# v-confirm-dialog

> Confirming user choice is a good thing to do, it should also be easy to do.

Simple confirmation dialog built on top of [Vuetify dialog](https://next.vuetifyjs.com/en/components/dialogs/).

## Installation

```bash
npm install v-confirm-dialog
```

## Usage

Install the plugin (after vuetify)

```ts
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import confirmDialog from 'v-confirm-dialog'

import App from './App.vue'

const app = createApp(App)
const vuetify = createVuetify()

app.use(vuetify)
app.use(confirmDialog)

app.mount('#app')
```

Call the `useConfirm` composable wherever you need the `confirm` function.

```vue
<script setup lang="ts">
import { useConfirm } from 'v-confirm-dialog'

const confirm = useConfirm()

async function show() {
  try {
    await confirm({ content: 'This action is permanent!' })
    console.log('Confirmed')
  }
  catch {
    console.log('Cancelled')
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

| Name                                    | Type        | Default           | Description                                                                                                                                                                                                                            |
| --------------------------------------- | ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`title`**                             | `string` | `'Are you sure?'` | Dialog title.                                                                                                                                                                                                                          |
| **`content`**                       | `string` | `''`              | Dialog content.                                                                                                                                                                          |
| **`confirmationText`**                  | `string` | `'Ok'`            | Confirmation button caption.                                                                                                                                                                                                           |
| **`cancellationText`**                  | `string` | `'Cancel'`        | Cancellation button caption.                                                                                                                                                                                                           |
| **`dialogProps`**                       | `object`    | `{}`              | Vuetify [VDialog](https://next.vuetifyjs.com/en/api/v-dialog/#props) props.                                                                                                                                                             |
| **`cardProps`**                | `object`    | `{}`              | Vuetify [VCard](https://next.vuetifyjs.com/en/api/v-card/#props) props.                                                                                                                                              |
| **`confirmationButtonProps`**           | `object`    | `{}`              | Vuetify [VBtn](https://next.vuetifyjs.com/en/api/v-btn/#props) props for the confirmation button.                                                                                                                                 |
| **`cancellationButtonProps`**           | `object`    | `{}`              | Vuetify [VBtn](https://next.vuetifyjs.com/en/api/v-btn/#props) props for the cancellation button.                                                                                                                                 |
| **`cardTitleProps`**                        | `object`    | `{}`              | Vuetify [VCardTitle](https://next.vuetifyjs.com/en/api/v-card-text/#props) props for the dialog title.                                                                                                                                         |
| **`cardTextProps`**                      | `object`    | `{}`              | Vuetify [VCardText](https://mui.com/api/dialog-content/#props) props for the dialog content.                                                                                                                                   |

## License

MIT
