<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { defineComponent, h } from 'vue'
import { useConfirm, useSnackbar } from '../../src'

const confirm = useConfirm()
const toast = useSnackbar()

async function show() {
  try {
    await confirm({
      content: 'Hehehe',
      dialogProps: {
        persistent: false,
        width: 400,
      },
    })
    toast({
      text: 'Confirmed',
    })
  }
  catch {
    toast({
      text: 'Cancelled',
    })
  }
}

function showToast() {
  toast({
    contentComponent: defineComponent({
      setup: () => () => h('div', 'hello world'),
    }),
  })
}
</script>

<template>
  <VBtn @click="show">
    Open
  </VBtn>
  <VBtn @click="showToast">
    Open Toast
  </VBtn>
</template>
