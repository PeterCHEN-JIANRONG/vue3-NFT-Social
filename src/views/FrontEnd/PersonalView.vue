<template>
  <Loading :active="isLoading" :z-index="1060" />
  <div class="follow bg-white d-flex border border-2 border-dark mb-3">
    <div class="follow__img">
      <img
        v-if="profile.photo"
        :src="profile.photo"
        :alt="profile.name"
        class="h-6s h-md-7s img-cover border-end border-2 border-dark"
      />
      <img
        v-else
        src="@/assets/avatars/user_default.png"
        class="h-6s h-md-7s img-cover border-end border-2 border-dark"
      />
    </div>
    <div
      class="flex-grow-1 d-flex justify-content-between align-items-center p-3"
    >
      <div>
        <p class="fw-bold mb-1">{{ profile.name }}</p>
        <p class="mb-0">{{ profile.followers?.length }} 人追蹤</p>
      </div>
      <div v-if="userId !== userStore.user?._id">
        <button
          v-if="!profile.followers?.some((i) => i.user === userStore.user?._id)"
          type="button"
          class="btn btn-warning fw-bold border border-2 border-dark rounded-3 shadow__follow px-3 px-md-5 py-1"
          @click="follow"
        >
          <span
            v-show="followLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          追蹤
        </button>
        <button
          v-else
          type="button"
          class="btn btn-light fw-bold border border-2 border-dark rounded-3 shadow__follow px-3 px-md-5 py-1"
          @click="unFollow"
        >
          <span
            v-show="followLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          取消追蹤
        </button>
      </div>
    </div>
  </div>
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
  ref, inject, onMounted, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '@/components/PostCard.vue';
import PostNoneCard from '@/components/PostNoneCard.vue';
import PostFilter from '@/components/PostFilter.vue';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
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
});

// 取得個人資料
const profile = ref({});
const getProfile = () => {
  const url = `${process.env.VUE_APP_API}/user/${userId.value}/profile`;
  axios
    .get(url)
    .then((res) => {
      profile.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getProfile();
});

// 追蹤
const followLoading = ref(false);
const follow = () => {
  followLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/${userId.value}/follow`;
  axios
    .post(url)
    .then(() => {
      followLoading.value = false;
      profile.value.followers.push({
        user: userStore.user._id,
        createdAt: new Date().toISOString(),
      });
    })
    .catch((err) => {
      followLoading.value = false;
      console.log(err);
    });
};

// 取消追蹤
const unFollow = () => {
  followLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/${userId.value}/follow`;
  axios
    .delete(url)
    .then(() => {
      followLoading.value = false;
      const index = profile.value.followers.findIndex(
        (i) => i.user === userStore.user._id,
      );
      profile.value.followers.splice(index, 1);
    })
    .catch((err) => {
      followLoading.value = false;
      console.log(err);
    });
};

// 相同路由 /profile/:id, id 參數切換
watch(route, (curr) => {
  if (curr.name === '個人頁' && curr.params.id) {
    userId.value = curr.params.id;
    getPersonalPosts();
    getProfile();
  }
});
</script>

<style lang="scss" scoped>
.follow {
  position: relative;
  border-radius: 8px;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 2px solid #000040;
    border-radius: 8px;
    top: 2px;
    right: 2px;
    z-index: -1;
    box-sizing: content-box;
  }

  &__img {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
  }
}
</style>
