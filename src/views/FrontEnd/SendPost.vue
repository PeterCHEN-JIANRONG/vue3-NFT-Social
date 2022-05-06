<template>
  <Loading :active="isLoading" :z-index="1060" />
  <div
    class="border border-2 border-dark mb-3 bg-white position-relative shadow-block"
  >
    <h1 class="text-center my-3">張貼動態</h1>
  </div>
  <form
    ref="form"
    class="shadow__post border border-2 border-dark p-5"
    @submit="createPost"
  >
    <div class="mb-3">
      <label for="content" class="form-label">貼文內容</label>
      <textarea
        class="form-control border border-2 border-dark"
        id="content"
        rows="4"
        v-model="content"
      ></textarea>
    </div>
    <div class="mb-5">
      <label for="image" class="form-label">上傳圖片</label>
      <input
        type="text"
        class="form-control border border-2 border-dark mb-2"
        id="image"
        v-model="image"
      />
      <img
        v-if="image"
        :src="image"
        class="w-100 h-20s img-cover border border-2 border-dark rounded-3"
      />
    </div>
    <div class="text-center">
      <button
        type="submit"
        class="btn btn-secondary w-50 border border-2 border-dark rounded-3"
      >
        送出貼文
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const isLoading = ref(false);
const content = ref('');
const image = ref('');

// const form = ref(null); // 取 form 洞元素
const formReset = () => {
  content.value = '';
  image.value = '';
};

// 貼文送出成功
const postSuccess = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    router.push('/');
  });
};

const createPost = () => {
  const data = {
    // user: '6270fbb7113547594f0c1bf9',
    // user: '6270fbc3113547594f0c1bfb',
    // user: '6270fbd2113547594f0c1bff',
    user: '6270fbca113547594f0c1bfd',
    content: content.value,
    image: image.value,
    tags: ['出遊', '快樂的心情'],
    type: 'person',
  };
  const url = `${process.env.VUE_APP_API}posts`;
  isLoading.value = true;
  axios
    .post(url, data)
    .then(() => {
      formReset();
      isLoading.value = false;
      postSuccess('送出成功');
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style>
.shadow-block::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid #000040;
  top: 2px;
  right: 2px;
  z-index: -1;
  box-sizing: content-box;
}
</style>
