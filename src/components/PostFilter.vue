<template>
  <div class="row gx-3 gy-2 mb-3">
    <div class="col-md-4">
      <select
        class="form-select border border-2 border-dark"
        v-model.number="sort"
        @change="getPosts"
      >
        <option value="1">最新貼文</option>
        <option value="2">最舊貼文</option>
      </select>
    </div>
    <div class="col-md-8">
      <div class="input-group border border-2 border-dark">
        <input
          type="text"
          class="form-control border-0"
          placeholder="搜尋貼文"
          v-model="searchKey"
          @keyup.enter="getPosts"
        />
        <button
          class="btn btn-primary border-top-0 border-end-0 border-bottom-0 border-2 border-dark"
          type="button"
          @click="getPosts"
        >
          <IconSearch />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';

const emit = defineEmits(['get-posts']);
const searchKey = ref('');
const sort = ref(1);

const getPosts = () => {
  emit('get-posts', sort.value, searchKey.value);
};
</script>
