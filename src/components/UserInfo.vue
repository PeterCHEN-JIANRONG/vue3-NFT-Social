<template>
  <div class="d-flex align-items-center">
    <AvatarBlock :size="size" :imgUrl="imgUrl" />
    <div class="ms-3">
      <RouterLink :to="userPageUrl" class="fw-bold text-black mb-0">
        {{ name }}
      </RouterLink>
      <small v-if="subTitle" class="d-block text-muted m-0">{{
        subTitle
      }}</small>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import AvatarBlock from './AvatarBlock.vue';

defineProps({
  size: {
    type: String,
    default: '45',
  },
  imgUrl: {
    type: String,
  },
  name: {
    type: String,
    default: 'Unknown',
  },
  userPageUrl: {
    type: String,
    default: '#',
  },
  subTitle: {
    type: String,
  },
});
</script>
