<template>
  <div class="tittle bg-white border border-2 border-dark mb-3">
    <h1 class="text-center my-3">{{ tittle }}</h1>
  </div>
</template>

<script setup>
defineProps({
  tittle: {
    type: String,
    default: '標題',
  },
});
</script>

<style lang="scss" scoped>
.tittle {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 2px solid #000040;
    top: 2px;
    right: 2px;
    z-index: -1;
    box-sizing: content-box;
  }
}
</style>
o
