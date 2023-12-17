<script setup lang="ts">
import { ref } from 'vue'
import { useConfirm, useSnackbar } from '@/.'

const confirm = useConfirm()
const toast = useSnackbar()

const originalItems = ['Vue', 'React', 'Solid', 'Angular', 'Svelte']
const items = ref(originalItems)

async function removeItem(index: number) {
  const result = await confirm({
    content: `This will permanently delete ${items.value[index]}`,
    dialogProps: {
      persistent: true,
      width: 400,
    },
  })

  if (result) {
    items.value.splice(index, 1)
    toast({
      text: 'Item removed',
    })
  }
}

async function clear() {
  const result = await confirm({
    title: 'Clear items',
    content: 'This will permanently clear all items',
    confirmationKeyword: 'vuetify',
    dialogProps: {
      persistent: true,
      width: 400,
    },
    confirmationKeywordTextFieldProps: {
      label: 'Enter password (pw: vuetify)',
    },
  })

  if (result) {
    items.value = []
    toast({
      text: 'List cleared',
      closeButtonText: 'Undo',
      closeButtonProps: {
        // @ts-expect-error: TODO
        onClick() {
          items.value = originalItems
        },
      },
    })
  }
}
</script>

<template>
  <VCard class="mx-auto pa-2 mt-2" max-width="600">
    <VToolbar color="rgba(0, 0, 0, 0)">
      <VToolbarTitle>Demo</VToolbarTitle>
      <template #append>
        <VBtn icon="mdi-delete-sweep" @click="clear" />
      </template>
    </VToolbar>
    <VList>
      <VListItem v-for="(item, index) of items" :key="index" :title="item">
        <template #append>
          <VBtn
            color="grey-lighten-1"
            icon="mdi-delete"
            variant="text"
            @click="removeItem(index)"
          />
        </template>
      </VListItem>
    </VList>
  </VCard>
</template>
