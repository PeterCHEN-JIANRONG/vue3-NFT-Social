<template>
  <Loading :active="isLoading" :z-index="1060" />
  <TittleBlock tittle="修改個人資料" class="mb-5" />
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a
        class="nav-link"
        href="#"
        :class="{ active: sheet === 1 }"
        @click.prevent="sheet = 1"
        >修改暱稱</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        href="#"
        :class="{ active: sheet === 2 }"
        @click.prevent="sheet = 2"
        >重設密碼</a
      >
    </li>
  </ul>
  <div
    class="bg-white row justify-content-center border border-2 border-dark rounded-3 p-4"
  >
    <div class="col-md-8">
      <div v-if="sheet === 1" class="mb-3">
        <div class="mb-3 text-center">
          <img
            v-if="user.photo"
            :src="user.photo"
            class="h-7s w-7s img-cover border border-2 border-dark rounded-circle"
            alt="大頭照"
          />
          <img
            v-else
            src="@/assets/avatars/user_default.png"
            class="h-7s w-7s img-cover"
            alt="大頭照"
          />
        </div>
        <label for="formFile" class="form-label"
          >大頭照
          <span
            v-show="uploading"
            class="spinner-border spinner-border-sm"
            role="status"
          ></span>
        </label>
        <input
          type="file"
          id="formFile"
          class="form-control"
          ref="avatar"
          @change="uploadAvatar"
        />
      </div>
      <Form
        v-if="sheet === 1"
        ref="form1"
        class=""
        v-slot="{ errors }"
        @submit="modifyProfile"
      >
        <div class="mb-3">
          <label for="name" class="form-label mb-1"
            >暱稱<span class="text-danger">*</span>
          </label>
          <Field
            id="name"
            name="暱稱"
            type="text"
            class="form-control border border-2 border-dark"
            :class="{ 'is-invalid': errors['暱稱'] }"
            placeholder="請輸入暱稱"
            v-model.trim="user.name"
            rules="required"
          />
          <ErrorMessage name="暱稱" class="invalid-feedback" />
        </div>

        <ul class="mb-4">
          <h3 class="fw-normal fs-6 mb-1">
            性別<span class="text-danger">*</span>
          </h3>
          <li class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="性別"
              id="radio1"
              value="male"
              v-model="user.sex"
            />
            <label class="form-check-label" for="radio1">男性</label>
          </li>
          <li class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="性別"
              id="radio2"
              value="female"
              v-model="user.sex"
            />
            <label class="form-check-label" for="radio2">女性</label>
          </li>
        </ul>

        <div class="">
          <button
            type="submit"
            class="post__btn btn btn-primary btn-lg w-100 shadow__btn border border-2 border-dark rounded-3"
            :disabled="Object.keys(errors).length > 0"
          >
            更新
          </button>
        </div>
      </Form>
      <Form
        v-if="sheet === 2"
        ref="form2"
        class=""
        v-slot="{ errors }"
        @submit="modifyPassword"
      >
        <div class="mb-3">
          <label for="password" class="form-label mb-1"
            >輸入新密碼<span class="text-danger">*</span>
          </label>
          <Field
            id="password"
            name="密碼"
            type="password"
            class="form-control border border-2 border-dark"
            :class="{ 'is-invalid': errors['密碼'] }"
            placeholder="請輸入密碼"
            v-model.trim="passwordData.password"
            rules="required|min:8"
          />
          <ErrorMessage name="密碼" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label mb-1"
            >確認密碼<span class="text-danger">*</span>
          </label>
          <Field
            id="confirmPassword"
            name="確認密碼"
            type="password"
            class="form-control border border-2 border-dark"
            :class="{ 'is-invalid': errors['確認密碼'] }"
            placeholder="請輸入確認密碼"
            v-model.trim="passwordData.confirmPassword"
            rules="required|min:8"
          />
          <ErrorMessage name="確認密碼" class="invalid-feedback" />
        </div>

        <div class="">
          <button
            type="submit"
            class="post__btn btn btn-primary btn-lg w-100 shadow__btn border border-2 border-dark rounded-3"
            :disabled="Object.keys(errors).length > 0"
          >
            更新密碼
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import {
  errorAlertConstruct,
  successAlertConstruct,
} from '@/utils/alertConstructHandle';
import useUserStore from '@/stores/user';
import TittleBlock from '@/components/TittleBlock.vue';

const userStore = useUserStore();
const Swal = inject('$swal');
const axios = inject('axios'); // inject axios
const isLoading = ref(false);
const sheet = ref(1); // 1:修改暱稱 2:重設密碼

// 修改暱稱
const user = ref({});
const getProfile = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/profile`;
  axios
    .get(url)
    .then((res) => {
      isLoading.value = false;
      user.value = res.data.user;
      if (!user.value.sex) {
        user.value.sex = 'male';
      }
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};
onMounted(() => {
  getProfile();
});

const modifyProfile = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/profile`;

  axios
    .patch(url, user.value)
    .then((res) => {
      isLoading.value = false;
      userStore.updateUser(res.data.user);
      Swal.fire(successAlertConstruct('成功', '個人資料更新成功'));
      getProfile();
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};

// 重設密碼
const form2 = ref(null);
const passwordData = ref({});
const modifyPassword = () => {
  if (passwordData.value.password !== passwordData.value.confirmPassword) {
    document.querySelector('#password').focus();
    Swal.fire(errorAlertConstruct('失敗', '密碼不一致！'));
    return;
  }

  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/updatePassword`;
  axios
    .patch(url, passwordData.value)
    .then((res) => {
      isLoading.value = false;
      form2.value.resetForm();
      const { token } = res.data.user;
      localStorage.setItem('metaWall', token);
      Swal.fire(successAlertConstruct('成功', '密碼更新成功'));
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};

// 上傳大頭照
const avatar = ref(null);
const uploading = ref(false);
const uploadAvatar = () => {
  const formData = new FormData();
  formData.append('avatar', avatar.value.files[0]);
  const url = `${process.env.VUE_APP_API}/upload/avatar`;
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  uploading.value = true;
  axios
    .post(url, formData, { headers })
    .then((res) => {
      uploading.value = false;
      user.value.photo = res.data.data;
    })
    .catch((err) => {
      uploading.value = false;
      Swal.fire(errorAlertConstruct('失敗', err.response.data.message));
    });
};
</script>

<style lang="scss" scoped>
.nav {
  .nav-item {
    .nav-link {
      color: #000400;
      background: white;
      border-top: 2px solid #000400;
      border-left: 2px solid #000400;
      border-right: 2px solid #000400;
      border-bottom: 0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .active {
      color: white;
      background: #000400;
    }
  }
}

.post__btn {
  box-shadow: -2px 2px 0px #000400;
  border-radius: 8px;
  &:hover {
    color: #000400;
    background: #eec32a;
  }
}
</style>
