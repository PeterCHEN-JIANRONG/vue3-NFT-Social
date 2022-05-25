<template>
  <div
    class="d-inline-block bg-light border border-2 border-dark rounded-pill px-6 py-2"
  >
    <ul class="d-flex gap-4">
      <li class="cursor-pointer" @click="router.push('/')">
        <IconButton>
          <IconHome />
        </IconButton>
      </li>
      <li class="cursor-pointer" @click="router.push('/tracks')">
        <IconButton>
          <IconBell />
        </IconButton>
      </li>
      <li class="cursor-pointer" @click="router.push('/likes')">
        <IconButton>
          <IconThumbsUp />
        </IconButton>
      </li>
      <li class="cursor-pointer" @click="router.push('/send')">
        <IconButton>
          <IconPlus />
        </IconButton>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import IconBell from '@/components/icons/IconBell.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconButton from '@/components/IconButton.vue';

const router = useRouter();
</script>
