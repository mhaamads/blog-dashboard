<template>
    <div>

        <div class="mb-10  flex items-center justify-between">
            <h2 class="page-heading "> Update Blog</h2>
            <div class="text-white text-sm font-light">Dashboard | Blogs | Update</div>
        </div>
        <form @submit.prevent="update">
            <div>
                <label for="title">Title</label>
                <input id="title" v-model="blog.title" placeholder="Title" />
            </div>
            <div>
                <label for="author">Author</label>
                <select id="author" v-model="blog.author_id">
                    <option v-for="author in authors" :value="author.id" class="capitalize">{{ author.name }}</option>
                </select>
            </div>
            <div>
                <label for="content">Content</label>
                <textarea id="content" v-model="blog.content" placeholder="Content" class="min-h-24 py-3 resize-none" />
            </div>
            <div>
                <label for="status">Status</label>
                <select id="status" v-model="blog.status">
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                </select>
            </div>
            <div v-if="errorMessages">
                <ul class="list-disc  list-inside mt-1 grid gap-y-1">
                    <li class="text-sm marker:text-red-500 marker:text-sm  text-white" v-for="error in errorMessages">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <button :disabled="!submitAllowed" type="submit"
                class="h-12 disabled:bg-gray-500 disabled:cursor-not-allowed mt-5 rounded-md bg-cyan-500 text-white">
                Update
            </button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { Blog } from '@/common/models';
import { useAuthorStore } from '@/stores/author';
import { useBlogStore } from '@/stores/blog';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const { id } = defineProps<{ id: string }>()
const blog = ref<Partial<Blog>>({
    status: 'published'
})

const errorMessages = ref<string[]>()


const blogStore = useBlogStore()
const authorStore = useAuthorStore()

onMounted(async () => {
    await authorStore.list()
    blog.value = await blogStore.item(id)
    blog.value.author_id=authors.value.find(item=>item.name===blog.value.author).id
})
const authors = computed(() => authorStore.getAuthors)

const submitAllowed = computed(() =>
    blog.value?.title &&
    blog.value?.content?.trim() !== '' &&
    blog.value?.status &&
    blog.value?.author_id
)

const update = async () => {
    try {
        await blogStore.update(id, blog.value)
        router.push({ name: 'blogs.index' })

    } catch (error) {
        errorMessages.value = error.errors
    }
}
</script>