import { defineStore } from 'pinia'
import type { EventState, Event } from '@/types'

export const useEventStore = defineStore('event', {
  state: (): EventState => ({
    event: null
  }),
  actions: {
    setEvent(event: Event) {
      this.event = event
    }
  }
})
