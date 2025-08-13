<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
const route = useRoute()
const router = useRouter()

const pageSize = ref(Number(route.query.pageSize) || 2)

watch(pageSize, (newSize) => {
  router.replace({
    query: { ...route.query, pageSize: newSize.toString() }
  })
})
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialiased">
    <header class="max-w-3xl mx-auto">
      <div
        id="flashMessage"
        v-if="message"
        class="animate-fade inline-block px-4 py-2 rounded-md mb-6"
      >
        <h4 class="m-0 text-base">{{ message }}</h4>
      </div>

      <nav class="py-6 space-x-3">
        <RouterLink
          class="font-bold text-gray-700"
          exact-active-class="text-green-500"
          :to="{ name: 'event-list-view' }"
        >Event</RouterLink>
        |
        <RouterLink
          class="font-bold text-gray-700"
          exact-active-class="text-green-500"
          :to="{ name: 'about' }"
        >About</RouterLink>
      </nav>
    </header>

    <div class="my-5">
      Events per page:
      <select v-model="pageSize" class="border rounded px-2 py-1">
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>

    <RouterView />
  </div>
</template>

<style>
/* เหลือเฉพาะที่จำเป็นจริง ๆ เท่านั้น */
h4 { font-size: 20px; }
</style>
