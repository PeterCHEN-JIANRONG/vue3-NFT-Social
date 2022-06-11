<template>
  <Loading :active="isLoading" :z-index="1060" />
  <PostCard :post="post" @delete-after="router.push('/')" />
</template>

<script setup>
import {
  ref, inject, onMounted, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostCard from '@/components/PostCard.vue';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';

const route = useRoute();
const router = useRouter();
const postId = ref(route.params.id); // 單筆貼文 ID

const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const post = ref({});
const isLoading = ref(false);

const getPost = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/post/${postId.value}`;
  axios
    .get(url)
    .then((res) => {
      isLoading.value = false;
      post.value = res.data.data;
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};

onMounted(() => {
  getPost();
});

// 監聽動態路由 :id
watch(route, (curr) => {
  if (curr.name === '單筆貼文頁' && curr.params.id) {
    postId.value = curr.params.id;
    getPost();
  }
});
</script>
