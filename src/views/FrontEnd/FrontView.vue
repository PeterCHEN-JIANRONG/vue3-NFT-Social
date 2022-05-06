<template>
  <Navbar />
  <div class="container mt-3 mt-md-6">
    <div class="row">
      <div class="col-md-8">
        <router-view />
      </div>
      <div class="col-md-4 d-none d-md-block">
        <div class="px-4 py-5 border border-2 border-dark">
          <button
            type="button"
            class="post__btn btn btn-primary btn-lg w-100 border border-2 border-dark ff-azeret mb-4"
          >
            張貼動態
          </button>
          <ul class="ps-2">
            <li class="mb-4">
              <router-link to="/" class="d-flex align-items-center link-dark">
                <Avatar size="50" />
                <h2 class="fs-6 fw-bold ms-3 mb-0">邊緣小杰</h2>
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to="/composition"
                class="d-flex align-items-center link-dark"
              >
                <IconButton>
                  <IconBell />
                </IconButton>
                <h2 class="fs-6 fw-bold ms-3 mb-0">追蹤名單</h2>
              </router-link>
            </li>
            <li>
              <router-link
                to="/composition"
                class="d-flex align-items-center link-dark"
              >
                <IconButton>
                  <IconThumbsUp />
                </IconButton>
                <h2 class="fs-6 fw-bold ms-3 mb-0">我按讚的文章</h2>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue';
import IconBell from '@/components/icons/IconBell.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconButton from '@/components/IconButton.vue';
import Avatar from '@/components/Avatar.vue';
</script>

<style lang="scss" scoped>
.post__btn {
  box-shadow: -2px 2px 0px #000400;
  border-radius: 8px;
}
</style>
