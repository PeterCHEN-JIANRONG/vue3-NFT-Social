<template>
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    :style="`width: ${size}px; height: ${size}px;`"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: '24',
  },
});
</script>
