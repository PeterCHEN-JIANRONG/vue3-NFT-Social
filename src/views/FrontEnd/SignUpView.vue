<template>
  <Loading :active="isLoading" :z-index="1060" />
  <div class="wrap bg-light">
    <div class="wrap__inner">
      <div
        class="container border border-2 border-dark p-5 p-md-7 shadow__signup"
      >
        <div class="row align-items-center">
          <div class="col-md-6 d-none d-md-block">
            <img src="@/assets/images/signIn.svg" />
          </div>
          <div class="col-md-6">
            <h1 class="title text-primary ff-paytone text-center">MetaWall</h1>
            <h2 class="text-center mb-5">註冊</h2>
            <Form ref="form" class="" v-slot="{ errors }" @submit="signUp">
              <div class="form-floating mb-3">
                <Field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                  v-model="formData.name"
                  rules="required"
                />
                <label for="name" class="form-label"
                  >姓名<span class="text-danger">*</span>
                </label>
                <ErrorMessage name="姓名" class="invalid-feedback" />
              </div>

              <div class="form-floating mb-3">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email"
                  v-model="formData.email"
                  rules="email|required"
                />
                <label for="email" class="form-label"
                  >Email<span class="text-danger">*</span>
                </label>
                <ErrorMessage name="email" class="invalid-feedback" />
              </div>

              <div class="form-floating mb-3">
                <Field
                  id="password"
                  name="密碼"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['密碼'] }"
                  placeholder="請輸入密碼"
                  v-model="formData.password"
                  rules="required|min:8"
                />
                <label for="password" class="form-label"
                  >密碼<span class="text-danger">*</span>
                </label>
                <ErrorMessage name="密碼" class="invalid-feedback" />
              </div>

              <div class="form-floating mb-5">
                <Field
                  id="confirmPassword"
                  name="確認密碼"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['確認密碼'] }"
                  placeholder="請輸入確認密碼"
                  v-model="formData.confirmPassword"
                  rules="required|min:8"
                />
                <label for="confirmPassword" class="form-label"
                  >確認密碼<span class="text-danger">*</span>
                </label>
                <ErrorMessage name="確認密碼" class="invalid-feedback" />
              </div>

              <div class="mb-3">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg w-100 shadow__btn border border-2 border-dark rounded-3"
                  :disabled="Object.keys(errors).length > 0"
                >
                  註冊
                </button>
              </div>

              <div class="">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-lg w-100 shadow__btn border-2 border-dark rounded-3"
                  @click="router.push('/signin')"
                >
                  登入
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { errorAlertConstruct } from '@/utils/alertConstructHandle';

const router = useRouter();
const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const isLoading = ref(false);

const form = ref(null); // Form DOM
const formData = ref({});

// 貼文送出成功
const postSuccess = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    router.push('/signin');
  });
};

const signUp = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/sign_up`;
  axios
    .post(url, formData.value)
    .then(() => {
      isLoading.value = false;
      form.value.resetForm();
      postSuccess('註冊成功');
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('註冊失敗', err.response.data.message));
    });
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.title {
  font-size: 40px;
  @media (min-width: 768px) {
    font-size: 60px;
  }
}

.container {
  max-width: 869px;
}

.wrap {
  height: calc(100vh);
  padding: 10px;
  &__inner {
    height: 100%;
    position: relative;
    .container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
