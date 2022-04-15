<template>
  <div class="m-dialog-box" :id="popupId" v-if="isShowPopup">
    <div class="m-popup m-dialog">
      <div class="m-dialog-close" @click="closePopup"></div>
      <div class="m-dialog-header">Pop-up Thông báo</div>
      <div class="m-dialog-body">
        <div class="m-dialog-avatar">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="m-dialog-text">
          {{ this.content }}
        </div>
      </div>
      <div class="m-dialog-footer">
        <button class="m-btn m-btn-cancel" @click="closePopup">
          Hủy
        </button>
        <button
          class="m-btn m-btn-confirm"
          id="dltBtn"
          @click="confirmBtnHandler"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popup-dialog",
  props: ["content", "type", "isShowPopup"],
  /**
   * Mô tả : Cài đặt type của popup dựa theo id trong popup.css (Warn-Delete-Notify)
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 12:02 31/03/2022
   */
  updated() {
    // 1. Popup confirm xóa
    if (this.type == "Delete") {
      this.popupId = "dltPopup";
    }
    // 2. Popup cảnh báo lỗi
    else if (this.type == "Warn") {
      this.popupId = "warnPopup";
    }
    // 3. Popup thông báo sự kiện
    else {
      this.popupId = "notiPopup";
    }
  },
  methods: {
    /**
     * Mô tả : đóng popup và không confirm >> emit lên component cha
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:33 31/03/2022
     */
    closePopup() {
      this.$emit("closePopup", false);
    },
    /**
     * Mô tả : Confirm sự kiện và emit lên cha
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 15:26 31/03/2022
     */
    confirmBtnHandler() {
      this.confirmMsg = true;
      this.$emit("callback")
      this.$emit("closePopup", false, this.confirmMsg);
    },
  },
  data() {
    return {
      confirmMsg: false,
      popupId: "",
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/popup.css");
@import url("@/css/components/dialog.css");
</style>