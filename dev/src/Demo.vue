<script setup lang="ts">
import { ref } from 'vue'
import { useConfirm, useSnackbar } from 'vuetify-use-dialog'

const confirm = useConfirm()
const toast = useSnackbar()

const items = ref(['Vue', 'React', 'Solid', 'Angular', 'Svelte'])

async function removeItem(index: number) {
  try {
    await confirm({
      content: `This will permanently delete ${items.value[index]}`,
      // confirmationKeyword: 'Hello',
      dialogProps: {
        persistent: true,
        width: 400,
      },
    })
    items.value.splice(index, 1)
    toast({
      text: 'Item removed',
    })
  }
  catch {}
}
</script>

<template>
  <VCard class="mx-auto pa-2 mt-2" max-width="600">
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
