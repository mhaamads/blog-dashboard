<template>
    <div class="min-h-screen overflow-hidden transition-all duration-700 bg-slate-900 lg:relative flex flex-col z-10   fixed inset-0"
        :class="show ? ' lg:w-[25vw] w-full' : 'w-0'">
        <div class="py-5 flex justify-between bg-cyan-800 whitespace-nowrap text-white px-5 font-bold uppercase">
            <span>
                Blog Dashboard
            </span>
            <button type="button" @click="emit('close')">
                <Icon icon="tabler:layout-sidebar-right-expand" class="text-white text-2xl" />
            </button>
        </div>
        <RouterLink v-for="item in navigationItems"
            class="text-white border-transparent border-s-4 flex items-center px-3 py-3 gap-2" :to="item.to">
            <Icon :icon="item.icon" class="text-2xl min-w-6 icon" />
            <span class="whitespace-nowrap"> {{ item.title }}</span>
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])
const navigationItems = [
    {
        icon: 'material-symbols:dashboard-outline',
        title: 'Dashboard',
        to: '/'
    },
    {
        icon: 'material-symbols:newspaper-rounded',
        title: 'Blogs',
        to: '/blogs'
    },
]
</script>
<style scoped>
.router-link-active {
    @apply border-sky-500
}

.router-link-active .icon {
    @apply text-sky-500
}
</style>