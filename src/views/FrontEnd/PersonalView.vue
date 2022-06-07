<template>
  <Loading :active="isLoading" :z-index="1060" />
  <PostFilter @get-posts="getPersonalPosts" />
  <PostNoneCard v-if="posts.length === 0" />
  <ul v-else>
    <li
      v-for="(item, index) in posts"
      :key="item._id"
      :class="{ 'mb-3': index < posts.length - 1 }"
    >
      <PostCard :post="item" />
    </li>
  </ul>
</template>

<script setup>
import {
  ref, inject, onMounted, onBeforeUnmount,
} from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '@/components/PostCard.vue';
import PostNoneCard from '@/components/PostNoneCard.vue';
import PostFilter from '@/components/PostFilter.vue';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';
import emitter from '@/utils/emitter';

const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const posts = ref([]);
const isLoading = ref(false);
const route = useRoute();
const userId = ref(route.params.id); // 此頁面用戶 ID

// 取得個人貼文
const getPersonalPosts = (sort = 1, searchKey = '') => {
  // sort -> 1:desc, 2:asc
  let sortValue = 'desc'; // 預設 desc
  if (sort === 2) {
    sortValue = 'asc';
  }

  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/posts/user/${userId.value}?timeSort=${sortValue}&q=${searchKey}`;
  axios
    .get(url)
    .then((res) => {
      posts.value = res.data.data;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};

onMounted(() => {
  getPersonalPosts();

  // 加入 emitter 監聽
  emitter.on('getPersonalPosts', () => {
    getPersonalPosts();
  });
});

onBeforeUnmount(() => {
  // 移除 emitter 監聽
  emitter.off('getPersonalPosts', () => {
    getPersonalPosts();
  });
});
</script>
