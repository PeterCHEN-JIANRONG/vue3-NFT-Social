<template>
  <Loading :active="isLoading" :z-index="1060" />
  <PostFilter @get-posts="getPosts" />
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
import { ref, inject, onMounted } from 'vue';
import PostCard from '@/components/PostCard.vue';
import PostNoneCard from '@/components/PostNoneCard.vue';
import PostFilter from '@/components/PostFilter.vue';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';

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

onMounted(() => {
  getPosts();
});
</script>
