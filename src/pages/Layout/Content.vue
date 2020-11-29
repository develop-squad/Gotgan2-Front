<template>
  <transition name="fade" mode="out-in">
    <router-view :englishSwitch="englishSwitch"></router-view>
  </transition>
</template>

<script>
export default {
  props: {
    englishSwitch: Boolean,
  },
};
</script>

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
