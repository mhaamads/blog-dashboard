<template>
    <component :is="to ? 'RouterLink' : 'button'" :to="to" :type="type"
        class="rounded-full grid place-content-center border h-10 aspect-square border-white/40">
        <Icon :icon="icon" />
    </component>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
    to?: string,
    type?: 'button' | 'submit'
    icon: string
}>(), {
    type: 'button'
})
</script>