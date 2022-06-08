<template>
  <Loading :active="isLoading" :z-index="1060" />
  <TittleBlock tittle="我按讚的文章" />
  <PostEmptyCard v-if="likeList.length === 0">
    <p class="text-center text-muted mb-0 p-4">尚無按讚任何文章！</p>
  </PostEmptyCard>
  <ul v-else>
    <li
      v-for="(item, index) in likeList"
      :key="item.user?._id"
      class="bg-white border border-2 border-dark rounded-3 shadow__post ps-3 pe-5 py-3"
      :class="{ 'mb-3': index < likeList.length - 1 }"
    >
      <div class="d-flex justify-content-between">
        <UserInfo
          :name="item.user?.name"
          :imgUrl="item.user?.photo"
          :userPageUrl="`/user/${item.user?._id}`"
          :subTitle="`發文時間：${$filters.dateTime(item.createdAt)}`"
        />
        <ul class="d-flex align-items-center gap-4">
          <li
            class="text-center cursor-pointer"
            @click="deleteLikePost(item._id)"
          >
            <IconThumbsUp class="mb-1" />
            <p class="m-0">取消</p>
          </li>
          <li
            class="text-center cursor-pointer"
            @click="router.push(`/post/${item._id}`)"
          >
            <IconArrowRight class="mb-1" />
            <p class="m-0">查看</p>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import TittleBlock from '@/components/TittleBlock.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import UserInfo from '@/components/UserInfo.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

const router = useRouter();
const axios = inject('axios');
const isLoading = ref(false);
const likeList = ref([]);

const getLikeList = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/getLikeList`;
  axios
    .get(url)
    .then((res) => {
      isLoading.value = false;
      likeList.value = res.data.data;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};
onMounted(() => {
  getLikeList();
});

const deleteLikePost = (postId) => {
  const url = `${process.env.VUE_APP_API}/post/${postId}/likes`;
  axios
    .delete(url)
    .then(() => {
      // 從 likeList 內移除該筆資料
      const index = likeList.value.findIndex((item) => item._id === postId);
      likeList.value.splice(index, 1); // 移除貼文
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
