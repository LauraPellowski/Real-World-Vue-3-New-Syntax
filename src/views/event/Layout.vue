<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../../services/EventService'
import { useRouter } from "vue-router";

const event = ref(null)
const router = useRouter()
const props = defineProps({
  id: {
    required: true,
  },
})

onMounted(() => {
  EventService
    .getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
        if (error.response && error.response.status == 404) {
            router.push({
                name: '404-resource',
                params: { resource: 'event'}
            })
        } else {
            router.push({ name: 'network-error'})
        }

    })
})
</script>

<template>
    <div v-if="event">
        <h1>{{  event.title }}</h1>
        <div>
            <nav>
                <router-link :to="{ name: 'event-details' }">Details</router-link> |
                <router-link :to="{ name: 'event-register' }">Register</router-link> |
                <router-link :to="{ name: 'event-edit' }">Edit</router-link> 
            </nav>
        </div>
        <router-view :event="event" />
    </div>
</template>
