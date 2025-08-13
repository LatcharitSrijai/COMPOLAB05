<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService.ts'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const event = ref<Event | null>(null)
const props = defineProps<{ id: number }>()

const store = useMessageStore()
const { message } = storeToRefs(store)

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

// ล้าง flash message หลัง 3 วิ เมื่อมีข้อความ
watch(message, (val) => {
  if (val) setTimeout(() => store.resetMessage(), 3000)
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 text-center text-gray-700">
    <div
      v-if="message"
      class="animate-fade inline-block px-4 py-2 rounded-md mb-6"
    >
      {{ message }}
    </div>

    <div v-if="event" class="space-y-2">
      <h1 class="text-4xl mb-2">{{ event.title }}</h1>
      <p class="text-sm text-gray-600">
        {{ event.time }} on {{ event.date }} @ {{ event.location }}
      </p>
      <p class="leading-relaxed">
        {{ event.description }}
      </p>
    </div>
  </div>
</template>
