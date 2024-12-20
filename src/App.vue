<template>
  <div class="flex ">
    <Sidenav :show="show"  @close="toggle"/>
    <div class="w-full min-h-screen bg-slate-950">
      <div class="w-full h-20 lg:px-10 px-5  flex items-center">
        <button type="button" @click="toggle">
          <Icon :icon="`tabler:layout-sidebar-${show?'right':'left'}-expand`" class="text-white text-2xl" />
        </button>
      </div>
      <div class="lg:p-10 p-5 w-full">
        <RouterView  />
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
import Sidenav from './components/layout/Sidenav.vue';
import { useRoute } from 'vue-router';

const show = ref(true)

const toggle = () => show.value = !show.value

const route = useRoute()
onMounted(() => {
	if (window.innerWidth < 1024) show.value = false
	window.addEventListener('resize', () => {
		handleResize()
	})
})

const handleResize = () => {
	if (window.innerWidth < 1024) {
		show.value = false
	} else {
		show.value = true;
	}
}

watch(() => route, () => {
	if (window.innerWidth < 1024) {
		show.value = false
	}
}, { deep: true })
</script>
