<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <RouterLink
    class="event-link no-underline text-gray-700"
    :to="{ name: 'event-detail-view', params: { id: event.id } }"
  >
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] transition
             hover:scale-101 hover:shadow-sp"
    >
      <h2 class="text-lg font-semibold">{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
/* ลบ .event-card ทั้งหมดตาม lab (ใช้ Tailwind แทน)
.event-link แค่คุมสีลิงก์ก็พอ; ถ้าอยากใช้ Tailwind ล้วน ให้ย้ายไปที่ class ของ RouterLink ด้านบน */
</style>
