<template>
    <v-list>
        <v-list-item
            title="List item that confirms"
            subtitle="Selecting this item will confirm the dialog without card actions."
            @click="select" />

        <v-list-item
            title="List item that cancels"
            subtitle="Selecting this item will cancel the dialog without card actions."
            @click="cancel" />
    </v-list>
</template>

<script setup lang="ts">
    const emit = defineEmits(['confirm', 'cancel'])

    function select() {
        emit('confirm', { mode: 'ute' })
    }

    function cancel() {
        emit('cancel')
    }

</script>