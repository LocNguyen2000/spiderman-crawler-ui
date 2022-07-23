<template>
  <div class="m-view-container">
    <!-- THANH HEADER CHỨA TIÊU ĐỀ -  CÁC NÚT TIỆN ÍCH -->
    <div class="m-title sticky" style="left: 0">
      <div class="m-row">
        <div class="title-text">URL Generator</div>
      </div>
       <div class="m-row">
        <div class="back">Generate Paginated URL(s)  -  Export URL(s) in CSV file</div>
      </div>
    </div>

    <div class="view-content">
      <div class="m-row">
        <div class="w-40 mr-4">
          <div class="m-label">Seed URL</div>
          <base-input
            v-model="this.seedUrl"
            placeholder="https://quotes.toscrape.com/"
          />
        </div>
        <div class="w-10 mr-4">
          <div class="m-label">Page Parameter</div>
          <base-input v-model="this.pageParam" placeholder="page/{number}" />
        </div>

        <div class="w-10 mr-4">
          <div class="m-label">Start Page</div>
          <base-input v-model="this.startPage" placeholder="1" />
        </div>
        <div class="w-10">
          <div class="m-label">End Page</div>
          <base-input v-model="this.endPage" placeholder="10" />
        </div>
      </div>
    </div>

      <!-- THANH TOOLBAR NẰM TRƯỚC TABLE -->
      <base-toolbar class="sticky" style="left: 0" @exportData="exportData"></base-toolbar>

      <div class="grid-table">
        <table class="m-table">
          <thead class="m-thead">
            <tr class="m-tr">
              <th class="space sticky-col left"></th>
              <th class="m-th" style="width: 20px">#</th>
              <th class="m-th">URL(s)</th>
              <th class="space sticky-col right"></th>
            </tr>
          </thead>
          <tbody class="m-tbody" v-if="this.urls.length > 0">
            <tr class="m-tr" v-for="(url, index) of this.urls" :key="index">
              <td class="space static-col left"></td>
              <td class="m-td text-align-center">{{ ++index }}</td>
              <td class="m-td">{{ url }}</td>
              <td class="space static-col right"></td>

            </tr>
          </tbody>
          <tbody class="m-tbody" v-else>
            <tr class="m-tr">
              <td class="space static-col left"></td>
              <td class="m-td"></td>
              <td class="m-td"></td>
              <td class="space static-col right"></td>

            </tr>
          </tbody>
        </table>
      <div class="w-full bg-white" style="height: 10px;"></div>

      </div>



      <!-- FOOTER CỦA FORM -->
      <div class="m-dialog-footer">
        <div class="flex-grow"></div>

        <div class="right-group-btn flex">
          <button
            class="m-btn m-btn-primary btn-size-default"
            @click.prevent="generateUrl"
          >
            Generate URL
          </button>
        </div>
      </div>

      <!-- HIỆN TOAST BÁO THÀNH CÔNG, LỖI -->
      <transition name="fast">
        <base-toast
          v-model="isShowToastMsg"
          :content="toastContent"
          :type="toastType"
        />
      </transition>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseToolbar from "@/components/base/BaseToolbar.vue";
import BaseToast from "@/components/base/popup/BaseToast.vue";
import { isNumber } from "@/js/utils";

export default {
  name: "url-page",
  components: { BaseInput, BaseToast, BaseToolbar },
  data() {
    return {
      seedUrl: null,
      pageParam: null,
      startPage: null,
      endPage: null,

      urls: [],

      // 6. Thuộc tính của ToastMsg
      // Biến hiện toast
      isShowToastMsg: false,

      // Nội dung của toast
      toastContent: null,

      // Loại của toast
      toastType: null,
    };
  },
  methods: {
    generateUrl() {
      this.urls = []
      
      if (isNumber(this.startPage) && isNumber(this.endPage)) {
        this.startPage = parseInt(this.startPage);
        this.endPage = parseInt(this.endPage);

        for (let index = this.startPage; index <= this.endPage; index++) {
          let url = this.seedUrl + this.pageParam;
          url = url.replace("{number}", index);

          this.urls.push(url);
        }
      } else {
        this.setShowToast(
          true,
          "Starting page or ending page must be a Number.",
          this.ENUM.toastEnum.error
        );
      }

      console.log(this.urls);
    },

    exportData() {
      if (this.urls.length > 0) {
        let csv = ""

        //define the heading for each row of the data
        csv = "url\n";

        //merge the data with CSV
        this.urls.forEach((url) => {
          csv += `${url}\n`;

          console.log(url);
        });

        console.log(csv);

        var hiddenElement = document.createElement("a");
        var universalBOM = "\uFEFF";

        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(universalBOM+csv);
        hiddenElement.target = "_blank";

        //provide the name for the CSV file to be downloaded
        hiddenElement.download = "url.csv";
        hiddenElement.click();
      } else {
        this.setShowToast(
          true,
          "No URL(s) exist to export.",
          this.ENUM.toastEnum.error
        );
      }
    },

    /**
     * Mô tả : Ẩn và hiện toast
     * @param isShowToast: bool ẩn và hiện của Toast
     * @param toastContent: nội dụng của Toast
     * @param toastType: loại của Toast
     * Created by: NHLOC - MF1099
     * Created date: 19:32 01/04/2022
     */
    setShowToast(_isShowToast, _toastContent = null, _toastType = null) {
      // set các trạng thái của toast
      this.toastContent = _toastContent;
      this.toastType = _toastType;
      this.isShowToastMsg = _isShowToast;
    },

    isNumber,
  },
};
</script>
<style scoped>
.m-view-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.m-view-container > div:not(.m-dialog-footer) {
  margin-right: 30px;
}

.m-dialog-footer {
  position: fixed;
  background-color: #38393d;
  width: calc(100% - 160px);
  display: flex;
  padding-right: 16px;
  align-items: center;
  height: 50px;
  bottom: 0;
  right: 0;
  z-index: 5;
}

@import url("@/css/components/title.css");
@import url("@/css/components/label.css");
@import url("@/css/components/paging.css");
@import url("@/css/components/table.css");
</style>
