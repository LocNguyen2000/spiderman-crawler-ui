<template>
  <div class="m-navbar">
    <div class="m-icon icon--spider"></div>
    <div class="branch-name-wrapper">
      <div class="branch-name">E-COMMERCE WEB CRAWLER</div>
      <div class="m-icon icon--arrowdown"></div>
    </div>
    <div class="current-db-header">
      <div class="current-db-icon"></div>
      <div class="current-db-name">DC-01</div>
    </div>

    <div class="m-space"></div>

    <!-- <div class="navbar-icon-download">
      <div class="m-icon icon--download"></div>
    </div> -->
    <!-- <BaseInput
      propName="navBarInput"
      placeholder="Nhập từ khóa tìm kiếm"
      :hasIcon="true"
    /> -->
    <div class="m-dropdown-user">
      <div class="m-icon icon--avatar"></div>
      <div class="display-user">Nguyễn Hữu Lộc</div>
    </div>
  </div>
</template>
<script>
// import BaseInput from "@/components/base/BaseInput.vue";

export default {
  name: "the-navbar",
  component: {
    // BaseInput,
  },
};
</script>
<style scoped>
@import url("@/css/layout/navbar.css");
</style>
    