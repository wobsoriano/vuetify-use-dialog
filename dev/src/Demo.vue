<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { useConfirm } from '../../src'

const confirm = useConfirm()

async function show() {
  try {
    await confirm({
      content: 'Hehehe',
      dialogProps: {
        persistent: false,
        width: 400,
      },
    })
    console.log('Confirmed')
  }
  catch {
    console.log('Cancelled')
  }
}
</script>

<template>
  <VBtn @click="show">
    Open
  </VBtn>
</template>
