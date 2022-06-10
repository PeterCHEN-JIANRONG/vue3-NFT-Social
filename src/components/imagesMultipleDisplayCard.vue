<template>
  <div v-if="images.length < 5" class="row g-0 mb-2">
    <div
      v-for="(item, index) in images"
      :key="item"
      :class="{
        'col-12':
          images.length === 1 ||
          images.length === 2 ||
          (images.length === 3 && index === 0) ||
          (images.length === 4 && index === 0),
        'col-6': images.length === 3 && index > 0,
        'col-4': images.length === 4 && index > 0,
      }"
    >
      <img
        :src="item"
        class="w-100 img-cover"
        :class="{ 'h-20s': images.length > 1 }"
      />
    </div>
  </div>
  <div v-if="images.length >= 5" class="row row-cols-2 g-0 mb-2">
    <div class="col">
      <div class="row row-cols-1">
        <template v-for="(item, index) in images" :key="item">
          <div class="col" v-if="index < 2">
            <img :src="item" class="w-100 h-20s img-cover" />
          </div>
        </template>
      </div>
    </div>
    <div class="col">
      <div class="row row-cols-1">
        <template v-for="(item, index) in images" :key="item">
          <div class="col" v-if="index >= 2 && index < 4">
            <img :src="item" class="w-100 h-13s img-cover" />
          </div>
          <div class="col" v-if="index >= 2 && index === 4">
            <div class="position-relative">
              <img
                :src="item"
                class="w-100 h-13s img-cover"
                :class="{ 'img-brightness-1': images.length > 5 && index == 4 }"
              />
              <!-- 剩餘圖片提示 -->
              <div v-if="images.length > 5 && index == 4" class="other-images">
                <span class="fs-1 text-white">+{{ images.length - 5 }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<style lang="scss" scoped>
.other-images {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
