<template>
  <div
    class="overflow-hidden border border-dark border-2 rounded-circle"
    :style="`width: ${size}px; height: ${size}px;`"
  >
    <img
      v-if="imgUrl"
      :src="imgUrl"
      class="img-cover"
      :style="`height: ${size}px;`"
    />
    <img
      v-else
      src="../assets/avatars/user_default.png"
      class="img-cover"
      :style="`height: ${size}px;`"
    />
  </div>
</template>
<script setup>
defineProps({
  size: {
    type: String,
    default: '45',
  },
  imgUrl: {
    type: String,
  },
});
</script>
