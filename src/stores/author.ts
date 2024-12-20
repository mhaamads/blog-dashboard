import { defineStore } from 'pinia'
import type { Author } from '@/common/models'
import http from '@/assets/http'



export const useAuthorStore = defineStore({
  id: 'author',
  state: (): {
    authors?: Author[]
  } => ({
    authors: [],
  }),
  getters: {
    getAuthors: (state) => state.authors,
  },
  actions: {

    async list() {
      const { data } = await http.get<{ data: Author[] }>('authors')
      this.authors = data;
    },

  }
})