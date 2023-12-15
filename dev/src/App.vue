<script setup lang="ts">
import { VuetifyUseDialog } from 'vuetify-use-dialog'
import Demo from './Demo.vue'
</script>

<template>
  <v-app theme="dark">
    <VuetifyUseDialog>
      <v-main>
        <Demo />
      </v-main>
    </VuetifyUseDialog>
  </v-app>
</template>
