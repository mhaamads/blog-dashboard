<template>
    <div>
        <div class="flex justify-between items-center mb-10">
            <h2 class="page-heading ">Blogs</h2>
            <button type="button" @click="publishedToggle" class=" h-max p-3 capitalize rounded-md min-w-20  text-sm "
                :class="[
                    { 'bg-cyan-500  text-white': status === 'all' },
                    { 'bg-green-700 text-white ': status === 'published' },
                    { 'bg-yellow-500 ': status === 'unpublished' },
                ]">
                {{ status }}
            </button>
        </div>
        <div class="relative">
            <div class="h-full absolute inset-0 z-[1] w-full grid place-content-center bg-slate-900" v-if="loading">
                <Icon icon="svg-spinners:180-ring-with-bg" class="text-white text-4xl" />
            </div>
            <table v-if="blogs.length">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="blog in blogs">
                        <td>{{ blog.id }}</td>
                        <td>{{ blog.title }}</td>
                        <td class="capitalize">
                            <div :class="{
                                'bg-green-700 text-white': blog.status === 'published',
                                'bg-yellow-500 text-black': blog.status === 'unpublished'
                            }" class="w-max py-1 px-5 rounded-full">
                                {{ blog.status }}
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center gap-3 justify-end">
                                <RoundedButton class="border-blue-500 text-blue-500" :to="`/blogs/${blog.id}`"
                                    icon="fa6-regular:pen-to-square" />
                                <RoundedButton class="border-red-500 text-red-500" @click="deleteBlog"
                                    icon="fa6-regular:trash-can" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class=" p-5   text-white bg-slate-900 w-full flex justify-center items-center">
                No Blogs Found
            </div>
        </div>

        <RoundedButton v-if="showAddButton" class="bg-cyan-500  text-white fixed bottom-10 end-10" :to="`/blogs/create`"
            icon="fa6-solid:plus" />
    </div>
</template>
<script setup lang="ts">
import { BlogStatus } from '@/common/models';
import RoundedButton from '@/components/UI/RoundedButton.vue';
import { useBlogStore } from '@/stores/blog';
import { computed, onMounted, ref, watch } from 'vue';

defineProps<{ showAddButton?: boolean }>()
const blogStore = useBlogStore()
type Status = BlogStatus | 'all'
const status = ref<Status>('all')
const statuses: Status[] = ['all', 'published', 'unpublished']
const loading = ref(false)


const blogs = computed(() => blogStore.getBlogs)

onMounted(() => loadItems())

const deleteBlog = async (id: string) => {
    const deleteConfirmed = confirm('Are you sure you want to delete this blog?');
    if (!deleteConfirmed) return
    await blogStore.delete(id)
    loadItems()
}

const loadItems = async (status?: BlogStatus) => {
    loading.value=true
    await blogStore.list({ status })
    loading.value=false
}

const publishedToggle = () => {
    const statusIndex = statuses.indexOf(status.value)
    if (statusIndex < 2) status.value = statuses[statusIndex + 1]
    else status.value = statuses[0]
}

watch(() => status.value, async () => {
    let value: BlogStatus;
    if (status.value !== 'all') value = status.value
    await loadItems(value)
})
</script>