<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { ref, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService.ts'
import { type Event } from '@/types'
import { useRoute } from 'vue-router'

const route = useRoute()

const page = computed(() => Number(route.query.page) || 1)
const pageSize = computed(() => Number(route.query.pageSize) || 2)

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

watchEffect(() => {
  EventService.getEvents(3, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>

  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <!-- pagination ใช้ tailwind -->
  <div class="flex w-[290px] mx-auto justify-between">
    <RouterLink
      v-if="page > 1"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }"
      rel="prev"
      class="flex-1 text-left no-underline text-gray-700"
    >
      &#60; Prev Page
    </RouterLink>

    <RouterLink
      v-if="hasNextPage"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }"
      rel="next"
      class="flex-1 text-right no-underline text-gray-700"
    >
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<style scoped>
/* ลบ CSS pagination เดิมออกหมด (ตาม lab) */
</style>
