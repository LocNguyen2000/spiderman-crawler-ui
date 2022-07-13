<template>
  <div class="m-sidebar">
    <div class="m-logo-container">
      <div class="m-icon icon--dragable m-icon-w-16"></div>
      <div class="logo-text">HOME</div>
    </div>
    <div class="m-menu-item-list">
      <router-link
        class="m-menu-item"
        v-for="(item, index) of menuItemList"
        :class="{ active: selectRowItem == item.title }"
        :to="item.page"
        :key="index"
        @click="clickMenuItem(item)"
        :title="item.title"
      >
        <div class="m-icon" :class="item.icon"></div>
        <div class="item-title">{{ item.title }}</div>
      </router-link>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "the-sidebar",
  methods: {
    /**
     * Mô tả : sự kiện click item trong danh sách menu navbar
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 14:49 04/04/2022
     */
    clickMenuItem(item) {
      this.selectRowItem = item.title;
    },
  },
  data() {
    return {
      selectRowItem: null,
      menuItemList: [
        {
          page: "CA",
          title: "Dashboard",
          icon: 'icon--overview'

        },
        {
          page: "URL",
          title: "Tools",
          icon: 'icon--tools'
        },
        
        
      ],
    };
  },
};
</script>
<style scoped>
@import url("@/css/layout/sidebar.css");
</style>