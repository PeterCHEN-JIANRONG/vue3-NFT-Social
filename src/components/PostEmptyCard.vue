<template>
  <div class="bg-white shadow__post border border-2 border-dark">
    <div class="border-bottom border-2 border-dark p-3">
      <span class="dot"></span>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.dot,
.dot::before,
.dot::after {
  height: 9px;
  width: 9px;
  border-radius: 50%;
  display: inline-block;
}
.dot {
  background-color: #de4b63;
  position: relative;
  &::before {
    content: '';
    background-color: #faa722;
    position: absolute;
    left: 150%;
  }
  &::after {
    content: '';
    background-color: #83c51d;
    position: absolute;
    left: 300%;
  }
}
</style>
