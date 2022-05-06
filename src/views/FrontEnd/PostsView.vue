<template>
  <div class="row gx-3 gy-2 mb-3">
    <div class="col-md-4">
      <select
        class="form-select border border-2 border-dark"
        v-model="sort"
        @change="getPosts"
      >
        <option value="desc">最新貼文</option>
        <option value="asc">最舊貼文</option>
      </select>
    </div>
    <div class="col-md-8">
      <div class="input-group border border-2 border-dark">
        <input
          type="text"
          class="form-control border-0"
          placeholder="搜尋貼文"
          v-model="searchKey"
          @keyup.enter="getPosts"
        />
        <button
          class="btn btn-primary border-top-0 border-end-0 border-bottom-0 border-2 border-dark"
          type="button"
          @click="getPosts"
        >
          <IconSearch />
        </button>
      </div>
    </div>
  </div>
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
import IconSearch from '@/components/icons/IconSearch.vue';
import PostCard from '@/components/PostCard.vue';
import PostNoneCard from '@/components/PostNoneCard.vue';

const axios = inject('axios'); // inject axios
const posts = ref([]);
const searchKey = ref('');
const sort = ref('desc');

const getPosts = () => {
  const url = `${process.env.VUE_APP_API}posts?timeSort=${sort.value}&q=${searchKey.value}`;
  axios.get(url).then((res) => {
    console.log(res.data.data);
    posts.value = res.data.data;
  });
};

onMounted(() => {
  getPosts();
});
</script>
