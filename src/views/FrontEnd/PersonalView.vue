<template>
  <h1>個人頁</h1>
  <h2>{{ id }}</h2>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);

onMounted(() => {});
</script>
