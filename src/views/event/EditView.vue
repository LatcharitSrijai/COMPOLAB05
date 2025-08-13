<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event,
  id: string
}>()

const { event } = toRefs(props)

const router = useRouter()
const store = useMessageStore()

const goToDetail = () => {
  store.updateMessage('The event data has been updated')
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
  <p>Edit event here</p>

  <button @click="goToDetail">Save and Go to Detail</button>
</template>
