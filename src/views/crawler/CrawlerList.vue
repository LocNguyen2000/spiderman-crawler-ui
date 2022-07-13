<template>
  <div class="m-view-container">
    <div class="m-title sticky" style="left: 0">
      <div class="m-row">
        <div class="title-text">Crawler Dashboard</div>
        <div class="flex-grow"></div>

        <div class="m-btn-wrapper">
          <button
            class="m-btn m-btn-primary btn-size-default"
            @click.prevent="newCrawlerForm"
          >
            New Crawler
          </button>
        </div>
      </div>
    </div>
    <!-- THANH BODY CHỨA OVERVIEW VÀ TABLE -->
    <div class="m-overview sticky" style="left: 0">
      <div class="overview-item overview-dued-debit">
        <div class="overview-data">
          <div class="overview-number">{{ this.totalUrls }}</div>
          <div class="overview-label">Total URL(s)</div>
        </div>
      </div>
      <div class="overview-item overview-deposit">
        <div class="overview-data">
          <div class="overview-number">{{ this.totalDataAmount }}</div>
          <div class="overview-label">Total Data Crawled</div>
        </div>
      </div>
      <div class="overview-item overview-payment">
        <div class="overview-data">
          <div class="overview-number">{{ this.averagePfmTime }}</div>
          <div class="overview-label">Average Performance Time (s)</div>
        </div>
      </div>
    </div>
    <!-- THANH TOOLBAR NẰM TRƯỚC TABLE -->
    <base-toolbar class="sticky" style="left: 0"></base-toolbar>
    <!-- :checkedList="checkedList" -->

    <div class="table-data-control">
      <table class="m-table">
        <thead class="m-thead">
          <tr class="m-tr">
            <th class="space sticky-col left"></th>
            <th class="m-th" style="width: 50px">#</th>
            <th class="m-th" style="width: 150px">Crawler Code</th>
            <th class="m-th" style="width: 250px">Crawler Name</th>
            <th class="m-th" style="width: 300px">Description</th>
            <th class="m-th" style="width: 150px">Selector Type</th>
            <th class="m-th" style="width: 150px">Last modified</th>
            <th class="m-th">Task</th>
          </tr>
        </thead>
        <tbody class="m-tbody">
          <tr
            class="m-tr"
            v-for="(crawler, index) of crawlers"
            :key="index"
            @dblclick.prevent="dblClickRowHandler(crawler)"
          >
            <td class="space static-col left"></td>
            <td class="m-td text-align-center">{{ ++index }}</td>
            <td class="m-td text-align-center">{{ crawler.crawlerCode }}</td>
            <td class="m-td">{{ crawler.crawlerName }}</td>
            <td class="m-td">{{ crawler.description }}</td>
            <td class="m-td text-align-center">{{ crawler.selectorType }}</td>
            <td class="m-td text-align-center">
              {{ dateDifference(crawler.modifiedDate) }}
            </td>
            <td class="m-td flex align-center justify-center">
              <div class="btn-edit-data pr-2">Detail</div>
              <div
                class="m-icon icon--arrowup-bg-blue"
                @click="setShowPopover(true, data, rowIndex, $event)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- TỔNG SỐ BẢN GHI + BẢN GHI/TRANG + PAGING -->
      <div class="m-paging">
        <div class="paging-left flex flex-align-center">
          <div class="total-data">
            Total: <b>{{ this.crawlers.length }}</b> Records
          </div>
        </div>
      </div>
    </div>
    <transition name="fast">
      <crawler-detail
        v-if="this.isShowDialog"
        :formMode="this.formMode"
        :crawlerData="this.crawlerInDialog"
        :selectorsData="this.selectorsInDialog"
        :outputsData="this.outputsInDialog"
        @setShowDialog="setShowDialog"
        @setShowPopup="setShowPopup"
        @setShowToast="setShowToast"
      />
    </transition>
    <!-- HIỆN POPUP THÔNG BÁO, CẢNH BÁO, XÁC NHẬN -->
    <transition name="fast">
      <base-popup
        v-if="isShowPopup"
        :type="popupType"
        :content="popupContent"
        @closePopup="setShowPopup"
        @confirmCallback="callbackFunc"
        @declineCallback="declineCallbackFunc"
      />
    </transition>

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
import axios from "axios";
import CrawlerDetail from "./CrawlerDetail.vue";
import BaseToolbar from "@/components/base/BaseToolbar.vue";
import BasePopup from "@/components/base/popup/BasePopup.vue";
import BaseToast from "@/components/base/popup/BaseToast.vue";

export default {
  components: { CrawlerDetail, BaseToolbar, BasePopup, BaseToast },
  name: "crawler-list",
  watch: {
    isShowDialog: async function (newValue) {
      if (!newValue) {
        await this.loadTable();
      }
    },
  },
  async created() {
    await this.loadTable();
  },

  methods: {
    async dblClickRowHandler(data) {
      this.rowCodeSelected = data.crawlerCode;

      const result = await this.getByCode();

      let crawler = result.crawler;
      let selectors = result.selectors;
      let outputs = result.outputs;

      this.setShowDialog(
        true,
        this.ENUM.formMode.Edit,
        crawler,
        selectors,
        outputs
      );
    },

    async newCrawlerForm() {
      try {
        let localApi = this.BASE_API.CRAWLER_NEW_CODE;
        const { data } = await axios.get(localApi);

        let newCode = `CRWL-${data}`;

        this.crawlerInDialog = {
          crawlerCode: newCode,
        };

        this.setShowDialog(true, this.ENUM.formMode.Add, this.crawlerInDialog, [
          {},
        ]);
      } catch (error) {
        console.log(error);
      }
    },

    // HIỆN CÁC COMPONENT VÀ SETTER
    setShowDialog(
      _isShowDialog,
      _formMode = null,
      _crawler = {},
      _selectors = [],
      _outputs = []
    ) {
      this.isShowDialog = _isShowDialog;
      this.formMode = _formMode;
      this.crawlerInDialog = _crawler;
      this.selectorsInDialog = _selectors;
      this.outputsInDialog = _outputs;
    },
    /**
     * Mô tả : Ẩn và hiện popup
     * @param _isPopup: bool ẩn và hiện component PopupBox
     * @param _popupType: các loại của component PopupBox
     * @param _popupContent: nội dung của component PopupBox
     * @param _callbackFunc: chạy hàm callback của component PopupBox
     * @param _declineCallback: chạy hàm callback của nếu chọn không xác nhận
     * Created by: NHLOC - MF1099
     * Created date: 10:28 31/03/2022
     */
    setShowPopup(
      _isPopup,
      _popupType = null,
      _popupContent = null,
      _callback = null,
      _declineCallback = null
    ) {
      this.popupType = _popupType;
      this.popupContent = _popupContent;
      this.isShowPopup = _isPopup;
      this.callbackFunc = _callback;
      this.declineCallbackFunc = _declineCallback;
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

    // API

    async getByCode() {
      console.log(this.rowCodeSelected);
      if (this.rowCodeSelected) {
        try {
          const localApi = this.BASE_API.CRAWLER_CODE(this.rowCodeSelected);

          const { data } = await axios.get(localApi);

          console.log(data);

          return data;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async loadTable() {
      let localApi, response;
      try {
        localApi = this.BASE_API.CRAWLER;
        response = await axios.get(localApi);

        this.crawlers = response.data.Data;
        this.totalUrls = response.data.TotalUrls;
        this.totalDataAmount = response.data.TotalDataAmount;
        this.averagePfmTime = response.data.AveragePfmTime;
      } catch (error) {
        console.log(error);
      }
    },

    dateDifference(date, now = new Date()) {
      date = new Date(date);
      let Difference_In_Time = now.getTime() - date.getTime();

      let Difference_In_Days = parseInt(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      let Difference_In_Hours = parseInt(
        (Difference_In_Time % (1000 * 3600 * 24)) / 3600000
      );
      let Difference_In_Minutes = parseInt(
        ((Difference_In_Time % (1000 * 3600 * 24)) % 3600000) / 60000
      );

      if (Difference_In_Hours == 0) {
        return `${Difference_In_Minutes} minutes ago.`;
      }
      if (Difference_In_Days == 0) {
        return `${Difference_In_Hours} hours ago.`;
      }

      return `${Difference_In_Days} days ago.`;
    },
  },
  data() {
    return {
      crawlers: [{}],
      rowCodeSelected: null,

      // overview
      totalUrls: 0.0,
      totalDataAmount: 0.0,
      averagePfmTime: 0.0,

      // FORM CRAWLER
      formMode: null,
      crawlerInDialog: {},
      selectorsInDialog: [],
      outputsInDialog: [],
      isShowDialog: false,

      // thuộc tính của popup
      // Biến hiện popup
      isShowPopup: false,

      // biến thuộc tính popup để xác nhận hay không
      isConfirmPopup: false,

      // Nội dung popup
      popupContent: null,

      // Các loại popup
      popupType: null, // Delete - Warn - Notify

      // Hàm callback chạy khi bấm nút xác nhận (Có - Đồng ý)
      callbackFunc: null,

      // Hàm callback khi bấm nút ko xác nhận (Không)
      declineCallbackFunc: null,

      // 6. Thuộc tính của ToastMsg
      // Biến hiện toast
      isShowToastMsg: false,

      // Nội dung của toast
      toastContent: null,

      // Loại của toast
      toastType: null,
    };
  },
};
</script>
<style scoped>
.m-view-container {
  width: 100%;
  height: 100%;
}
.m-view-container > div {
  margin-right: 30px;
}

.m-view-container .table-data-control {
  height: 80%;
}

@import url("@/css/components/table.css");
@import url("@/css/components/title.css");
@import url("@/css/components/button.css");
@import url("@/css/components/dropdown.css");
@import url("@/css/components/overview.css");
@import url("@/css/components/paging.css");
</style>
