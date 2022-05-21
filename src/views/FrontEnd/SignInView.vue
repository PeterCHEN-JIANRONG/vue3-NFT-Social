<template>
  <Loading :active="isLoading" :z-index="1060" />
  <div class="wrap bg-light vh-100">
    <div
      class="container border border-2 border-dark p-5 p-md-7 shadow__signup"
    >
      <div class="row align-items-center">
        <div class="col-md-6 d-none d-md-block">
          <img src="@/assets/images/signIn.svg" />
        </div>
        <div class="col-md-6">
          <h1 class="title text-primary ff-paytone text-center">MetaWall</h1>
          <h2 class="text-center mb-5">到元宇宙展開全新社交圈</h2>
          <Form ref="form" class="" v-slot="{ errors }" @submit="signIn">
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
                id="tel"
                name="密碼"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['密碼'] }"
                placeholder="請輸入密碼"
                v-model="formData.password"
                rules="required|min:8"
              />
              <label for="tel" class="form-label"
                >密碼<span class="text-danger">*</span>
              </label>
              <ErrorMessage name="密碼" class="invalid-feedback" />
            </div>

            <div class="mb-3">
              <button
                type="submit"
                class="btn btn-primary btn-lg w-100 shadow__btn border border-2 border-dark rounded-3"
                :disabled="Object.keys(errors).length > 0"
              >
                登入
              </button>
            </div>

            <div class="">
              <button
                type="button"
                class="btn btn-outline-primary btn-lg w-100 shadow__btn border-2 border-dark rounded-3"
                @click="router.push('/signup')"
              >
                註冊
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';

const router = useRouter();
const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const isLoading = ref(false);

const form = ref(null); // Form DOM
const formData = ref({
  email: 'apple@com.tw',
  password: 'asdfasdf',
});

const signIn = () => {
  isLoading.value = true;
  const url = `${process.env.VUE_APP_API}/user/sign_in`;
  axios
    .post(url, formData.value)
    .then((res) => {
      isLoading.value = false;
      const { token } = res.data.user; // JWT token
      localStorage.setItem('metaWall', token); // save to localStorage
      router.push('/');
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
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  @media (min-width: 768px) {
    padding-top: 100px;
  }
}
</style>
