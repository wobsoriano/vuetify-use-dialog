<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    items: ['Vue', 'React', 'Solid', 'Angular', 'Svelte'],
  }),
  methods: {
    async clear() {
      // @ts-expect-error: TODO
      const result = await this.$confirm({
        title: 'Clear items',
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
        this.items = []
        // @ts-expect-error: TODO
        this.$toast({
          text: 'List cleared',
        })
      }
    },
    async removeItem(index: number) {
      // @ts-expect-error: TODO
      const result = await this.$confirm({
        content: `This will permanently delete ${this.items[index]}`,
        dialogProps: {
          persistent: true,
          width: 400,
        },
      })

      if (result) {
        this.items.splice(index, 1)
        // @ts-expect-error: TODO
        this.$toast({
          text: 'Item removed',
        })
      }
    },
  },
})
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
