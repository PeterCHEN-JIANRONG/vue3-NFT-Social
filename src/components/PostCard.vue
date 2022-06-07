<template>
  <div class="bg-white shadow__post border border-2 border-dark p-4">
    <UserInfo
      class="mb-3"
      :name="innerPost.user?.name"
      :subTitle="$filters.dateTime(innerPost.createdAt)"
      :imgUrl="innerPost.user.photo"
      :userPageUrl="`/user/${innerPost.user._id}`"
    />
    <p
      class="space-preline"
      :class="{
        'mb-0': innerPost.image === null,
        'mb-3': innerPost.image !== null,
      }"
    >
      {{ innerPost.content }}
    </p>
    <img
      v-if="innerPost.image"
      class="w-100 h-20s img-cover border border-2 border-dark rounded-3 mb-2"
      :src="innerPost.image"
      alt="貼文照片"
    />
    <div class="d-flex align-items-center mb-3">
      <IconThumbsUp
        v-if="!innerPost.likes?.includes(userStore.user?._id)"
        class="cursor-pointer"
        @click="likePost(innerPost._id)"
      />
      <IconThumbsUpFill
        v-if="innerPost.likes?.includes(userStore.user?._id)"
        class="cursor-pointer"
        @click="deleteLikePost(innerPost._id)"
      />
      <span class="ms-2 fs-5">{{ innerPost.likes?.length }}</span>
    </div>

    <div
      class="input-group"
      :class="{ 'mb-3': innerPost.comments?.length > 0 }"
    >
      <Avatar size="40" :imgUrl="userStore.user?.photo" class="me-2" />
      <input
        type="text"
        class="form-control border border-2 border-dark"
        placeholder="留言..."
        v-model.trim="comment"
      />
      <button
        class="btn btn-primary border border-2 border-dark px-6 py-2"
        type="button"
        @click="commentPost(innerPost._id)"
        :disabled="comment.trim() === ''"
      >
        <span
          v-show="commentLoading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        留言
      </button>
    </div>
    <p
      v-if="!lookAllComments && innerPost.comments?.length > 1"
      @click="lookAllComments = true"
      class="link-primary cursor-pointer mb-2"
    >
      {{
        innerPost.comments?.length > 5
          ? '查看先前的留言...'
          : `查看前 ${innerPost.comments?.length - 1} 則留言...`
      }}
    </p>
    <ul v-if="innerPost.comments?.length > 0">
      <template v-for="(item, index) in innerPost.comments" :key="item._id">
        <li
          v-if="index === innerPost.comments?.length - 1 || lookAllComments"
          class="bg-light p-2 rounded-3"
          :class="{ 'mb-3': index < innerPost.comments?.length - 1 }"
        >
          <UserInfo
            class="mb-1"
            :name="item.user?.name"
            :subTitle="$filters.dateTime(item.createdAt)"
            :imgUrl="item.user.photo"
            :userPageUrl="`/user/${item.user._id}`"
          />
          <p class="ms-7 mb-0">{{ item.comment }}</p>
        </li>
      </template>
    </ul>
  </div>
</template>
<script setup>
import {
  ref, inject, toRaw, watch,
} from 'vue';
import UserInfo from '@/components/UserInfo.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconThumbsUpFill from '@/components/icons/IconThumbsUpFill.vue';
import useUserStore from '@/stores/user';
import Avatar from './Avatar.vue';

const userStore = useUserStore();
const axios = inject('axios');

const props = defineProps({
  post: {
    type: Object,
    default() {
      return {};
    },
  },
});

const innerPost = ref(toRaw(props.post));
watch(props, (curr) => {
  innerPost.value = toRaw(curr.post);
});

// const getPost = (postId) => {
//   const url = `${process.env.VUE_APP_API}/post/${postId}`;
//   axios
//     .get(url)
//     .then((res) => {
//       innerPost.value = res.data.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const likePost = (postId) => {
  const url = `${process.env.VUE_APP_API}/post/${postId}/likes`;
  axios
    .post(url)
    .then(() => {
      // innerPost 加入 userId
      innerPost.value.likes.push(userStore.user._id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLikePost = (postId) => {
  const url = `${process.env.VUE_APP_API}/post/${postId}/likes`;
  axios
    .delete(url)
    .then(() => {
      // innerPost 移除 userId
      const index = innerPost.value.likes.findIndex(
        (i) => i === userStore.user._id,
      );
      innerPost.value.likes.splice(index, 1); // 移除 id
    })
    .catch((err) => {
      console.log(err);
    });
};

const comment = ref('');
const lookAllComments = ref(false);
const commentLoading = ref(false);
const commentPost = (postId) => {
  commentLoading.value = true;
  const url = `${process.env.VUE_APP_API}/post/${postId}/comment`;
  axios
    .post(url, { comment: comment.value })
    .then(() => {
      commentLoading.value = false;
      // innerPost 加入 comment
      innerPost.value.comments.push({
        _id: new Date().toISOString(),
        comment: comment.value,
        createdAt: new Date().toISOString(),
        user: {
          _id: userStore.user._id,
          name: userStore.user.name,
          photo: userStore.user.photo,
        },
      });
      comment.value = ''; // 輸入框清空
    })
    .catch((err) => {
      commentLoading.value = false;
      console.log(err);
    });
};
</script>
