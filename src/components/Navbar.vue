<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-2 border-dark"
  >
    <div class="container">
      <router-link class="navbar-brand ff-paytone" to="/">MetaWall</router-link>

      <div class="dropdown">
        <div
          class="d-flex align-items-center dropdown-toggle cursor-pointer"
          data-bs-toggle="dropdown"
        >
          <Avatar size="30" :imgUrl="imgUrl" />
          <h2
            class="ff-azeret fs-6 fw-bold border-bottom border-2 border-dark ms-2 mb-0"
          >
            Member
          </h2>
        </div>
        <ul class="dropdown-menu text-center border border-2 border-dark py-0">
          <li class="border-bottom border-2 border-dark">
            <a
              class="dropdown-item py-2"
              href="#"
              @click.prevent="router.push(`/user/${userStore.user._id}`)"
              >我的貼文牆</a
            >
          </li>
          <li class="border-bottom border-2 border-dark">
            <a
              class="dropdown-item py-2"
              href="#"
              @click.prevent="router.push('/profile')"
              >修改個人資料</a
            >
          </li>
          <li class="">
            <a class="dropdown-item py-2" href="#" @click.prevent="logOut"
              >登出</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from 'vue-router';
import Avatar from '@/components/Avatar.vue';
import useUserStore from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

defineProps({
  imgUrl: {
    type: String,
  },
});

const logOut = () => {
  localStorage.removeItem('metaWall'); // 移除 token
  router.push('/signin');
};
</script>

<style lang="scss" scoped></style>
