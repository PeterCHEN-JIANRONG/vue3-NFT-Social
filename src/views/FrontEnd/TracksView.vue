<template>
  <Loading :active="isLoading" :z-index="1060" />
  <TittleBlock tittle="追蹤名單" />
  <PostEmptyCard v-if="followList.length === 0">
    <p class="text-center text-muted mb-0 p-4">尚無追蹤任何用戶！</p>
  </PostEmptyCard>
  <ul v-else>
    <li
      v-for="(item, index) in followList"
      :key="item.user?._id"
      class="bg-white border border-2 border-dark rounded-3 shadow__post p-3"
      :class="{ 'mb-3': index < followList.length - 1 }"
    >
      <div class="d-flex justify-content-between">
        <UserInfo
          :name="item.user?.name"
          :imgUrl="item.user?.photo"
          :userPageUrl="`/user/${item.user?._id}`"
          :subTitle="`追蹤時間：${$filters.dateTime(item.createdAt)}`"
        />
        <p class="align-self-end mb-0">{{ toFollowDate(item.createdAt) }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import TittleBlock from '@/components/TittleBlock.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import UserInfo from '@/components/UserInfo.vue';

const axios = inject('axios');
const isLoading = ref(false);
const followList = ref([]);

const getFollowList = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/following`;
  axios
    .get(url)
    .then((res) => {
      isLoading.value = false;
      followList.value = res.data.data;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};
onMounted(() => {
  getFollowList();
});

// 換算追蹤天數
const toFollowDate = (time) => {
  const timeStamp = new Date() - new Date(time);
  const days = Math.floor(timeStamp / 1000 / 3600 / 24);
  if (days < 1) {
    return '剛剛追蹤';
  }
  return `您已追蹤 ${days} 天`;
};
</script>
