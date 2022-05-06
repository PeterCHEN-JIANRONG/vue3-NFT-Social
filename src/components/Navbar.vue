<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-2 border-dark"
  >
    <div class="container">
      <router-link class="navbar-brand ff-paytone" to="/">MetaWall</router-link>
      <div class="d-flex align-items-center">
        <Avatar size="30" />
        <h2
          class="ff-azeret fs-6 fw-bold border-bottom border-2 border-dark ms-2 mb-0"
        >
          Member
        </h2>
      </div>
    </div>
  </nav>
</template>
<script setup>
import Avatar from '@/components/Avatar.vue';
</script>
