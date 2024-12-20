import Create from "@/views/blog/Create.vue";
import Index from "@/views/blog/Index.vue";
import Update from "@/views/blog/Update.vue";

export default [
    {
        path: '/blogs',
        name: 'blogs.index',
        component: Index,
    },
    {
        path: '/blogs/create',
        name: 'blog.create',
        component: Create,
    },
    {
        path: '/blogs/:id',
        name: 'blog.update',
        component: Update,
        props:true
    },
]