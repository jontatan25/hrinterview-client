<template>
  <div>
    <h2>Candidates List</h2>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="candidate in candidates" :key="candidate.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ candidate.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ candidate.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ candidate.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const candidates = ref([])

const fetchCandidates = async () => {
  try {
    const response = await axios.get('/candidates')
    candidates.value = response.data
  } catch (error) {
    console.error('Error fetching candidates:', error)
  }
}

// Fetch candidates data when the component is mounted
onMounted(() => {
  fetchCandidates()
})
</script>
