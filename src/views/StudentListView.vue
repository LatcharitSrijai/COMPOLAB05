<template>
  <div>
    <h1>Student List</h1>
    <div v-if="students.length === 0">Loading...</div>
    <div v-else class="student-list">
      <div v-for="student in students" :key="student.id" class="student-card">
        <img :src="student.image" alt="Student Image" width="100" />
        <h3>{{ student.name }} {{ student.surname }}</h3>
        <p>Student ID: {{ student.studentId }}</p>
        <p>GPA: {{ student.gpa }}</p>
        <p>{{ student.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentServices'

const students = ref([])

onMounted(async () => {
  const response = await StudentService.getStudents()
  students.value = response.data
})
</script>

<style scoped>
.student-list {
  display: flex;
  gap: 1rem;
}
.student-card {
  border: 1px solid #ddd;
  padding: 1rem;
  width: 200px;
  border-radius: 8px;
}
</style>
