<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)

const router = useRouter()
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'event-detail-view', params: { id: event.id } }">Detail</RouterLink> |
      <RouterLink :to="{ name: 'event-register-view', params: { id: event.id } }">Register</RouterLink> |
      <RouterLink :to="{ name: 'event-edit-view', params: { id: event.id } }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>
