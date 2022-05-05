<template>
  <div class="container mt-3 mt-md-6">
    <div class="row">
      <div class="col-md-8">
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
        <ul>
          <li
            v-for="(item, index) in posts"
            :key="item._id"
            :class="{ 'mb-3': index < posts.length - 1 }"
          >
            <PostCard :post="item" />
          </li>
        </ul>
      </div>
      <div class="col-md-4 d-none d-md-block">
        <div class="px-4 py-5 border border-2 border-dark">
          <button
            type="button"
            class="post__btn btn btn-primary btn-lg w-100 border border-2 border-dark ff-azeret mb-4"
          >
            張貼動態
          </button>
          <ul class="ps-2">
            <li class="mb-4">
              <router-link to="/" class="d-flex align-items-center link-dark">
                <Avatar size="50" />
                <h2 class="fs-6 fw-bold ms-3 mb-0">邊緣小杰</h2>
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to="/composition"
                class="d-flex align-items-center link-dark"
              >
                <IconButton>
                  <IconBell />
                </IconButton>
                <h2 class="fs-6 fw-bold ms-3 mb-0">追蹤名單</h2>
              </router-link>
            </li>
            <li>
              <router-link
                to="/composition"
                class="d-flex align-items-center link-dark"
              >
                <IconButton>
                  <IconThumbsUp />
                </IconButton>
                <h2 class="fs-6 fw-bold ms-3 mb-0">我按讚的文章</h2>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconBell from '@/components/icons/IconBell.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconButton from '@/components/IconButton.vue';
import Avatar from '@/components/Avatar.vue';
import PostCard from '@/components/PostCard.vue';

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

<style lang="scss" scoped>
.post__btn {
  box-shadow: -2px 2px 0px #000400;
  border-radius: 8px;
}
</style>
