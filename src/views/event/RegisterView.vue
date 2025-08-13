<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message'
const store = useMessageStore()


const props = defineProps<{
  event: Event,
  id: string
}>()


const { event } = toRefs(props)
const router = useRouter()
const register = () => {
  store.updateMessage(`You are successfully registered for ${props.event.title}`)

  setTimeout(() => {
    store.resetMessage()
  }, 2000)

  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}


</script>

<template>

    <p>Register event here</p>
  <button @click="register">Register</button>
</template>
