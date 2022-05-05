<template>
  <div
    class="icon__button d-flex justify-content-center align-items-center border border-dark border-2 rounded-circle"
    :style="`width: ${size}px; height: ${size}px;`"
  >
    <slot></slot>
  </div>
</template>
<script setup>
defineProps({
  size: {
    type: String,
    default: '50',
  },
});
</script>
