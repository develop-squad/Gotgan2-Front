<template>
  <transition name="fade" mode="out-in">
    <router-view :userInfo_Tab="userInfo_Content" :englishSwitch_Tab="englishSwitch_Content"></router-view>
  </transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<script>
export default {
  props: {
    userInfo_Content: Object,
    englishSwitch_Content: Boolean
  },
};
</script>
