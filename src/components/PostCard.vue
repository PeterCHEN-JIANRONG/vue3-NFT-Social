<template>
  <div class="shadow__post border border-2 border-dark p-4">
    <UserInfo
      class="mb-3"
      :name="post.user?.name"
      :subTitle="$filters.dateTime(post.createdAt)"
      :imgUrl="post.user.photo"
    />
    <p :class="{ 'mb-0': post.image === null, 'mb-3': post.image !== null }">
      {{ post.content }}
    </p>
    <img
      v-if="post.image"
      class="w-100 border border-2 border-dark rounded-3"
      :src="post.image"
      alt="貼文照片"
    />
  </div>
</template>
<script setup>
import UserInfo from '@/components/UserInfo.vue';

defineProps({
  post: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>
