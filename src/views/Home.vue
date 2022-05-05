<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Vue3、BS5 樣板</h1>
    <div>
      <button type="button" class="btn btn-primary me-1">Primary</button>
      <button type="button" class="btn btn-secondary me-2">Secondary</button>
      <button type="button" class="btn btn-success me-3">Success</button>
      <button type="button" class="btn btn-danger me-4">Danger</button>
      <button type="button" class="btn btn-warning me-5">Warning</button>
      <button type="button" class="btn btn-info me-6">Info</button>
      <button type="button" class="btn btn-light me-7">Light</button>
      <button type="button" class="btn btn-dark">Dark</button>
    </div>
    <IconButton>
      <IconBell />
    </IconButton>
    <IconButton>
      <IconThumbsUp />
    </IconButton>
    <AvatarBlock size="50" />
    <UserInfo name="邊緣小杰" subTitle="2022/1/10 12:00"></UserInfo>
  </div>
</template>

<script setup>
import IconBell from '@/components/icons/IconBell.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconButton from '@/components/IconButton.vue';
import AvatarBlock from '@/components/AvatarBlock.vue';
import UserInfo from '@/components/UserInfo.vue';
</script>
