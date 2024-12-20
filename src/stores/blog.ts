import { defineStore } from 'pinia'
import type { Blog, BlogStatus, QueryParams } from '@/common/models'
import http from '@/assets/http'

type BlogFilter = QueryParams & { status?: BlogStatus }


export const useBlogStore = defineStore({
  id: 'blog',
  state: (): {
    blogs?: Blog[]
    blog?: Blog
  } => ({
    blogs: [],
  }),
  getters: {
    getBlogs: (state) => state.blogs,
    getBlog: (state) => state.blog,
  },
  actions: {
    async create(blogInput: Partial<Blog>) {
      await http.post('blogs', { body: JSON.stringify(blogInput) })
    },
    async update(id: string, blogInput: Partial<Blog>) {
      await http.post(`blogs/${id}`, { body: JSON.stringify(blogInput) })
    },
    async list(queryParams?: BlogFilter) {
      const { data } = await http.get<{ data: Blog[] }>('blogs', { queryParams })
      this.blogs = data;
    },
    async item(id: string) {
      const response = await http.get<{ blog: Blog }>(`blogs/${id}`)
      this.blog = response.blog;
      return this.blog
    },
    async delete(id: string) {
      await http.delete(`blogs/${id}`)
    },
  }
})