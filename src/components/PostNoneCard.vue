<template>
  <div class="post__card border border-2 border-dark">
    <div class="border-bottom border-2 border-dark p-3">
      <span class="dot"></span>
    </div>
    <p class="text-center text-muted mb-0 p-4">
      目前尚無動態，新增一則貼文吧！
    </p>
  </div>
</template>

<style lang="scss" scoped>
.post__card {
  border-radius: 8px;
  box-shadow: 0px 3px 0px #000400;
}

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
