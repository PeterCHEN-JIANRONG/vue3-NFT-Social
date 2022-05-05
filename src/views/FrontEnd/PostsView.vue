<template>
  <div class="container mt-3 mt-md-5">
    <div class="row">
      <div class="col-md-8">
        <div class="row gx-3 gy-2 mb-3">
          <div class="col-md-4">
            <select class="form-select border border-2 border-dark">
              <option value="1">最新貼文</option>
              <option value="2">最舊貼文</option>
              <option value="3">熱門貼文</option>
            </select>
          </div>
          <div class="col-md-8">
            <div class="input-group border border-2 border-dark">
              <input
                type="text"
                class="form-control border-0"
                placeholder="搜尋貼文"
                v-model="searchKey"
              />
              <button
                class="btn btn-primary border-top-0 border-end-0 border-bottom-0 border-2 border-dark"
                type="button"
              >
                <IconSearch />
              </button>
            </div>
          </div>
        </div>
        <ul>
          <li v-for="item in posts" :key="item._id" class="mb-3">
            <PostCard :post="item" />
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <h2>POSTS</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import PostCard from '@/components/PostCard.vue';

const axios = inject('axios'); // inject axios
const posts = ref([]);
const searchKey = ref('');

const getPosts = () => {
  axios.get('https://obscure-river-56277.herokuapp.com/posts').then((res) => {
    console.log(res.data.data);
    posts.value = res.data.data;
  });
};

onMounted(() => {
  getPosts();
});
</script>
