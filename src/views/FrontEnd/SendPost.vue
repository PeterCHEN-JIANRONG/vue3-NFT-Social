<template>
  <Loading :active="isLoading" :z-index="1060" />
  <TittleBlock tittle="張貼動態" />
  <form
    ref="form"
    class="shadow__post bg-white border border-2 border-dark p-5 mb-5"
    @submit.prevent="createPost"
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
      <label for="formFiles" class="form-label"
        >上傳圖片
        <span
          v-show="uploading"
          class="spinner-border spinner-border-sm"
          role="status"
        ></span>
      </label>
      <input
        type="file"
        id="formFiles"
        class="form-control mb-2"
        ref="formFiles"
        @change="uploadImages"
        multiple
      />
      <div
        v-if="images.length > 0"
        class="row g-2"
        :class="{ 'row-cols-2': images.length > 1 }"
      >
        <div class="col" v-for="(item, index) in images" :key="item">
          <div class="image__card position-relative">
            <img :src="item" class="w-100 h-15s img-cover" />
            <span
              class="image__delete position-absolute top-0 end-0 m-2 fs-6 badge bg-light text-dark cursor-pointer"
              @click="images.splice(index, 1)"
              >刪除</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <div class="mb-2" v-if="images.length > 8">
        <span class="fs-6 text-danger">上傳圖片超過 8 張，請刪除圖片</span>
      </div>
      <button
        type="submit"
        class="btn btn-secondary w-50 border border-2 border-dark rounded-3"
        :disabled="images.length > 8 || uploading"
      >
        送出貼文
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import TittleBlock from '@/components/TittleBlock.vue';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';

const router = useRouter();
const axios = inject('axios');
const Swal = inject('$swal');
const isLoading = ref(false);
const form = ref(null);
const content = ref('');
const images = ref([]);

const userStore = useUserStore();

// 貼文送出成功
const postSuccess = (title, text, path) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title,
    text,
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    router.push(path);
  });
};

const createPost = () => {
  if (images.value.length > 8) {
    Swal.fire(errorAlertConstruct('失敗', '上傳圖片超過 8 張，請刪除圖片'));
    return;
  }

  const data = {
    user: userStore.user._id,
    content: content.value,
    image: images.value,
    tags: ['出遊', '快樂的心情'],
    type: 'person',
  };
  const url = `${process.env.VUE_APP_API}/post`;
  isLoading.value = true;
  axios
    .post(url, data)
    .then(() => {
      form.value.reset();
      isLoading.value = false;
      postSuccess('貼文', '送出成功', '/');
    })
    .catch((err) => {
      console.log(err);
    });
};

// 上傳大頭照
const formFiles = ref(null);
const uploading = ref(false);
const uploadImages = () => {
  // 未選擇圖片
  if (formFiles.value.files.length === 0) {
    return;
  }
  // 前端阻擋
  if (formFiles.value.files.length > 8) {
    Swal.fire(errorAlertConstruct('失敗', '上傳圖片超過 8 張，請重新上傳'));
    form.value.reset();
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < formFiles.value.files.length; i += 1) {
    const file = formFiles.value.files[i];
    formData.append('photos', file);
  }

  const url = `${process.env.VUE_APP_API}/upload/photos`;
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  uploading.value = true;
  axios
    .post(url, formData, { headers })
    .then((res) => {
      uploading.value = false;
      images.value = [...images.value, ...res.data.data];
    })
    .catch((err) => {
      uploading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};
</script>

<style lang="scss" scoped>
.image {
  &__card:hover {
    img {
      transition: all 0.5s;
      filter: brightness(80%);
    }
  }
  &__delete {
    border-radius: 8px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
