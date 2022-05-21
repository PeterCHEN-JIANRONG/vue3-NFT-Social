<template>
  <Loading :active="isLoading" :z-index="1060" />
  <Navbar />
  <div class="container mt-3 mt-md-6">
    <div class="row">
      <div class="col-md-8">
        <router-view />
      </div>
      <div class="col-md-4 d-none d-md-block">
        <div class="px-4 py-5 border border-2 border-dark">
          <router-link
            to="/send"
            class="post__btn btn btn-primary btn-lg w-100 border border-2 border-dark fw-bold ff-azeret mb-4"
          >
            張貼動態
          </router-link>
          <ul class="menu ps-2">
            <li class="mb-4">
              <router-link
                to="/personal/asdoufvhaosidfhsodifh"
                class="d-flex align-items-center link-dark"
              >
                <Avatar size="50" />
                <h2 class="ms-3 mb-0">邊緣小杰</h2>
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to="/tracks"
                class="d-flex align-items-center link-dark"
              >
                <IconButton>
                  <IconBell />
                </IconButton>
                <h2 class="ms-3 mb-0">追蹤名單</h2>
              </router-link>
            </li>
            <li>
              <router-link
                to="/likes"
                class="d-flex align-items-center link-dark"
              >
                <IconButton>
                  <IconThumbsUp />
                </IconButton>
                <h2 class="ms-3 mb-0">我按讚的文章</h2>
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
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import IconBell from '@/components/icons/IconBell.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconButton from '@/components/IconButton.vue';
import Avatar from '@/components/Avatar.vue';

import { errorAlertConstruct } from '@/libs/alertConstructHandle';

const router = useRouter();
const axios = inject('axios'); // inject axios
const Swal = inject('$swal');
const isLoading = ref(false);

const checkLogin = () => {
  // get token
  const token = localStorage.getItem('metaWall');

  if (!token) {
    Swal.fire(errorAlertConstruct('登入失敗', '請重新登入'));
    router.push('/signin');
    return;
  }

  // set axios token
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const url = `${process.env.VUE_APP_API}/user/profile`;
  isLoading.value = true;
  axios
    .get(url)
    .then(() => {
      // 儲存用戶 ID
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      Swal.fire(errorAlertConstruct('登入失敗', err.response.data.message));
      router.push('/signin');
    });
};

onMounted(() => {
  checkLogin();
});
</script>

<style lang="scss" scoped>
.post__btn {
  box-shadow: -2px 2px 0px #000400;
  border-radius: 8px;
  &:hover {
    color: #000400;
    background: #eec32a;
  }
}
.menu {
  h2 {
    font-size: 16px;
    font-weight: bold;
  }

  .active h2 {
    font-size: 20px;
    color: #03438d;
  }
}
</style>
