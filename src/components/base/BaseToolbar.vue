<template>
  <div class="m-toolbar">
    <!-- <div class="check-all-icon">
        <div class="m-icon icon--check-arrow-all"></div>
    </div> -->
    <!-- THANH DROP DOWN THỰC HIỆN HÀNG LOẠT -->
    <!-- <div class="m-dropdown">
      <button class="m-btn-dropdown">
        <span> Mutiple Action </span>
        <div class="m-icon icon--arrowup"></div>
      </button>
    </div> -->
   

    <div class="flex-grow"></div>

    <!-- THANH TÌM KIẾM, LOAD DỮ LIỆU, XUẤT FILE, TÙY CHỈNH UI   -->
    <base-input
      placeholder="Search keyword..."
      iconName="search"
      :canFocus="true"
      @input="delaySearch"
    />

    <div class="toolbar-btn-wrapper">
      <div class="m-icon icon--refresh" title="Reload data" @click.prevent="onReloadClick"></div>
      <div class="m-icon icon--excel" title="Export data in CSV file" @click="exportData"></div>
      <div class="m-icon icon--setting-grey" @click.prevent="setShowSetting" title="Setting"></div>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";

export default {
  name: "base-toolbar",
  props: {
    checkedList: {
      type: Array,
      default: () => []
    },
    isShowDropdown: {
      type: Boolean,
    }
  },  
  methods: {
    /**
    * Mô tả : Hiện tùy chỉnh giao diện (Truyền lên cha)
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 16:50 09/05/2022
    */
    setShowSetting(){
      this.$emit("setShowSetting", true)
    },
    /**
    * Mô tả : Xuất file
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 18:06 01/06/2022
    */
   exportData(){
     this.$emit("exportData")
   },

    /**
    * Mô tả : Load lại trang
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 16:50 09/05/2022
    */
    onReloadClick(){
      this.$emit("reloadClick")
    },
    /**
    * Mô tả : Tìm kiếm
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 14:27 20/05/2022
    */
    delaySearch(e){
      this.$emit("delaySearch", e.target.value)
    },
    setShowDropdown(e, _isShowDropdown){
      this.$emit("setShowDropdown", e, _isShowDropdown);
    }
  },
  components: {
    BaseInput,
  },
  data(){
    return{
      // // 1. Thuộc tính của dropdown thực hiện hàng loạt
      //   // biến ẩn hiện danh sách thực hiện hàng loạt
      //   isShowDropdown: false,
    }
  }
};
</script>
<style scoped>
    @import url("@/css/components/toolbar.css");
</style>