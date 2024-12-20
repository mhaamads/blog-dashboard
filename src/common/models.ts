export type Model = {
    id: number
}

export type BlogStatus = 'published' | 'unpublished'

export type Blog = Model & {
    title: string
    content: string
    status: BlogStatus
    author: string
    author_id?: number
}

export type Author = Model & {
    name: string

}


export type QueryParams = { [key in string]: string | string[] | number | boolean | undefined }
