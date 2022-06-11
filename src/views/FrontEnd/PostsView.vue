<template>
  <Loading :active="isLoading" :z-index="1060" />
  <PostFilter @get-posts="getPosts" />
  <PostEmptyCard v-if="posts.length === 0">
    <p class="text-center text-muted mb-0 p-4">
      目前尚無動態，新增一則貼文吧！
    </p>
  </PostEmptyCard>
  <ul v-else>
    <li
      v-for="(item, index) in posts"
      :key="item._id"
      :class="{ 'mb-3': index < posts.length - 1 }"
    >
      <PostCard :post="item" @delete-after="deletePost" />
    </li>
  </ul>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import PostCard from '@/components/PostCard.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import PostFilter from '@/components/PostFilter.vue';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';

const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const posts = ref([]);
const isLoading = ref(false);

const getPosts = (sort = 1, searchKey = '') => {
  // sort -> 1:desc, 2:asc
  let sortValue = 'desc'; // 預設 desc
  if (sort === 2) {
    sortValue = 'asc';
  }

  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/posts?timeSort=${sortValue}&q=${searchKey}`;
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

// 刪除一個 Post, 可不用重新 getPosts
const deletePost = (postId) => {
  const index = posts.value.findIndex((i) => i._id === postId);
  posts.value.splice(index, 1);
};

onMounted(() => {
  getPosts();
});
</script>
