<template>
  <div class="m-shadow-box">
    <div class="m-dialog" id="crawlerDetail">
      <!-- HEADER CỦA FORM -->
      <div class="m-dialog-header grey-background flex flex-align-center">
        <div class="m-icon icon--recent mr-4"></div>

        <div class="header-title text-overflow-hidden">CRAWLER DIALOG</div>

        <div class="detail-input"></div>

        <div class="flex-grow"></div>

        <div class="btn-detail-group flex flex-align-center">
          <div class="title__tour-guide">
            <div class="m-icon icon--tour"></div>
            <div class="tour-label">Guide</div>
          </div>
          <div class="btn-detail">
            <div class="m-icon icon--setting" title="Tùy chỉnh giao diện"></div>
          </div>
          <div class="btn-detail">
            <div class="m-icon icon--help" title="Giúp (F1)"></div>
          </div>
          <div
            class="btn-detail"
            title="Đóng (ESC)"
            @click.prevent="setCloseDialog"
          >
            <div class="m-icon icon--close"></div>
          </div>
        </div>
      </div>

      <!-- NỘI DUNG CỦA FORM -->
      <div class="m-dialog-content">
        <div class="main-info flex grey-background" style="z-index: 100">
          <!-- THÔNG TIN CƠ BẢN -->
          <div class="w-75 flex">
            <div class="w-80 right-seperate">
              <div class="m-row">
                <div class="w-40 mr-4">
                  <div class="m-label">
                    Crawler Code (<span class="required">*</span>)
                  </div>
                  <base-input
                    :isDisabled="true"
                    v-model="this.crawler.crawlerCode"
                    ref="crawlerCode"
                  />
                </div>
                <div class="w-60">
                  <div class="m-label">
                    Crawler Name (<span class="required">*</span>)
                  </div>
                  <base-input
                    v-model="this.crawler.crawlerName"
                    ref="crawlerName"
                  />
                </div>
              </div>

              <div class="m-row">
                <div class="w-full">
                  <div class="m-label">Description</div>
                  <base-input v-model="this.crawler.description" />
                </div>
              </div>
              <div class="m-row">
                <div class="w-75 mr-4">
                  <div class="m-label">URLs (<span class="required">*</span>)</div>
                  <div>
                    <table class="m-table">
                      <tbody class="m-tbody">
                        <tr
                          v-for="(url, index) of this.crawler.urls"
                          :key="index"
                          class="m-tr"
                        >
                          <td
                            v-show="index <= 3"
                            class="m-td bg-white text-align-center"
                          >
                            {{ ++index }}
                          </td>
                          <td v-show="index <= 3" class="m-td bg-white">
                            {{ url }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      v-show="this.crawler.urls && this.crawler.urls.length > 3"
                    >
                      ...
                    </div>
                  </div>
                </div>

                <!-- FILE SELECTOR -->
                <div
                  class="w-25"
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                  "
                >
                  <label class="file-select">
                    <div class="select-button">
                      <span v-if="this.selectedFile"
                        >File: {{ this.selectedFile.name }}</span
                      >
                      <span v-else>Choose File (.xlsx, .xls, .csv)</span>
                    </div>
                    <input
                      type="file"
                      @change="changeFileHandler"
                      accept=".xlsx, .xls, .csv"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="w-20">
              <div class="left-seperate">
                <div class="m-label">
                  Selector Type (<span class="required">*</span>)
                </div>
                <base-radio-group
                  v-model="this.crawler.selectorType"
                  :data="this.ENUM.selectorEnum"
                />
              </div>
            </div>
          </div>
          <div class="w-25 flex align-center flex-end">
            <button
              class="m-btn m-btn-primary btn-size-default mr-4"
              @click.prevent="extractSelector"
            >
              Extract Selectors
            </button>
            <button
              class="m-btn m-btn-primary btn-size-default"
              @click.prevent="extractData"
            >
              Extract Data
            </button>
          </div>
        </div>

        <!-- BẢNG SELECTOR CHI TIẾT  -->
        <!-- TAB BẢNG -->
        <div class="grid-tab flex flex-align-center" style="z-index: 99">
          <div class="tab-left flex">
            <div
              class="tab cur-pointer"
              :class="{ active: this.activeTab == 0 }"
              @click.prevent="
                () => {
                  this.activeTab = 0;
                }
              "
            >
              Selectors
            </div>
            <div
              class="tab cur-pointer"
              :class="{ active: this.activeTab == 1 }"
              @click.prevent="
                () => {
                  this.activeTab = 1;
                }
              "
            >
              Outputs
            </div>
          </div>

          <div class="flex-grow"></div>

          <div
            v-show="this.activeTab == 1"
            class="m-icon icon--excel"
            title="Export output to CSV file"
            @click="exportData()"
          ></div>
        </div>

        <!-- DANH SÁCH SELECTORS-->
        <div class="grid-table" v-if="this.activeTab == 0">
          <table class="m-table">
            <thead class="m-thead">
              <tr class="m-tr">
                <th class="space sticky-col left"></th>
                <th class="m-th" style="width: 16px; min-width: 16px">#</th>
                <th
                  class="m-th text-overflow-hidden"
                  style="width: 180px; min-width: 180px"
                >
                  Metadata
                </th>
                <th class="m-th" style="width: 100px; min-width: 100px">Tag</th>
                <th class="m-th" style="width: 350px; min-width: 350px">CSS</th>
                <th class="m-th" style="width: 350px; min-width: 350px">
                  XPath
                </th>
                <th class="m-th" style="width: 100px; min-width: 100px">
                  Event Type
                </th>
                <th class="space sticky-col right"></th>
              </tr>
            </thead>
            <tbody class="m-tbody">
              <tr
                class="m-tr"
                v-for="(selector, index) of this.selectors"
                @click.prevent="() => (this.detailSelectorIndex = index)"
                :key="index"
              >
                <td class="space static-col left"></td>
                <td class="m-td text-align-center">
                  {{ selector.index }}
                </td>
                <td class="m-td">
                  <base-input
                    v-if="this.detailSelectorIndex == index"
                    v-model="selector.metadata"
                  />
                  <span v-else>
                    {{ selector.metadata }}
                  </span>
                </td>
                <td class="m-td text-align-center">
                  {{ selector.tag }}
                </td>
                <td
                  class="m-td text-overflow-hidden"
                  style="width: 350px; min-width: 350px; max-width: 350px"
                  :title="selector.selectorCSS"
                >
                  <base-input
                    v-if="this.detailSelectorIndex == index"
                    v-model="selector.selectorCSS"
                  />
                  <span v-else>
                    {{ selector.selectorCSS }}
                  </span>
                </td>
                <td
                  class="m-td text-overflow-hidden"
                  style="width: 350px; min-width: 350px; max-width: 350px"
                  :title="selector.selectorXPath"
                >
                  <base-input
                    v-if="this.detailSelectorIndex == index"
                    v-model="selector.selectorXPath"
                  />
                  <span v-else>
                    {{ selector.selectorXPath }}
                  </span>
                </td>
                <td class="m-td text-align-center">
                  {{ selector.eventType }}
                </td>
                <td class="space static-col right"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- DANH SÁCH OUTPUT -->
        <div class="grid-table" v-if="this.activeTab == 1">
          <table class="m-table" v-if="this.outputs.length > 0">
            <thead class="m-thead">
              <tr class="m-tr">
                <th class="space sticky-col left"></th>
                <th class="m-th" style="max-width: 20px">#</th>
                <th
                  class="m-th"
                  v-for="(key, index) of Object.keys(this.outputs[0])"
                  :key="index"
                >
                  {{ key }}
                </th>
                <th class="space sticky-col right"></th>
              </tr>
            </thead>
            <tbody class="m-tbody">
              <tr
                class="m-tr"
                v-for="(output, rowIndex) of this.outputs"
                :key="rowIndex"
              >
                <td class="space static-col left"></td>

                <td
                  class="m-td text-align-center"
                  style="max-width: 20px; width: 20px"
                >
                  {{ ++rowIndex }}
                </td>
                <td
                  class="m-td text-overflow-hidden"
                  v-for="(value, key, index) of output"
                  :key="index"
                  style="max-width: 250px"
                >
                  {{ value }}
                </td>
                <td class="space static-col right"></td>
              </tr>
            </tbody>
          </table>

          <div class="text-align-center" v-else>No Data Output...</div>
        </div>
      </div>
      <!-- FOOTER CỦA FORM -->
      <div class="m-dialog-footer">
        <div class="left-group-btn">
          <button
            class="m-btn-footer btn-size-default mg-r-6"
            @click.prevent="setCloseDialog"
          >
            Cancel
          </button>
        </div>

        <div class="flex-grow"></div>

        <div class="right-group-btn flex">
          <div class="m-add-dropdown" id="footerCash">
            <button
              class="add-btn m-btn m-btn-primary"
              @click.prevent="saveEventHandler"
            >
              <span>Save Crawler</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseRadioGroup from "@/components/base/BaseRadioGroup.vue";
import axios from "axios";
import * as XLSX from "xlsx";

export default {
  components: {
    BaseInput,
    BaseRadioGroup,
  },
  props: {
    formMode: { type: [Number, String] },
    crawlerData: { type: Object, default: () => {} },
    selectorsData: { type: Array, default: () => [] },
    outputsData: { type: Array, default: () => [] },
  },

  mounted() {
    this.crawler = this.crawlerData;
    this.outputs = this.outputsData;
    this.selectors =
      this.selectorsData && this.selectorsData.length > 0
        ? this.selectorsData
        : [{}];

    this.currentCrawlerCode = this.crawler.crawlerCode;
  },
  methods: {
    async changeFileHandler(event) {
      this.selectedFile = event.target.files ? event.target.files[0] : null;
      if (this.selectedFile) {
        // appending file
        const reader = new FileReader();
        var result = [];
        reader.onload = function (e) {
          let binary = e.target.result;
          const workbook = XLSX.read(binary, { type: "binary" });

          const workSheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[workSheetName];

          let data = XLSX.utils.sheet_to_json(workSheet, { header: 0 });

          data.map((obj) => {
            let key = Object.keys(obj)[0];
            if (key.toLowerCase() == "url" || key.toLowerCase() == "urls") {
              result.push(obj[key]);
            }
          });
        };

        reader.readAsBinaryString(this.selectedFile);

        setTimeout(() => {
          this.crawler.urls = result;
        }, 200);
      }
    },

    // SET SHOW
    setCloseDialog() {
      this.$emit("setShowDialog", false);
    },

    /**
     * Mô tả : Ẩn và hiện popup bằng hàm emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */
    setShowPopup(
      _isPopup,
      _popupType = null,
      _popupContent = null,
      _callback = null,
      _declineCallback = null
    ) {
      this.$emit(
        "setShowPopup",
        _isPopup,
        _popupType,
        _popupContent,
        _callback,
        _declineCallback
      );
    },
    /**
     * Mô tả : ẩn hiện toast bằng hàm emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 21:47 23/04/2022
     */
    setShowToast(_isShowToast, _toastContent = null, _toastType = null) {
      this.$emit("setShowToast", _isShowToast, _toastContent, _toastType);
    },

    async saveEventHandler() {
      try {
         // khởi tạo biến check lỗi
        let isError = false;
        let contentError = "";
        let listError = [];
        
        // Validate dữ liệu
        if (!this.crawler.crawlerCode){
           // set lỗi
          isError = true;
          contentError = "Crawler's code cannot be empty." 
          listError.push(contentError);
        }

        // Validate dữ liệu
        if (!this.crawler.crawlerName){
           // set lỗi
          isError = true;
          contentError = "User must enter crawler's name." 
          listError.push(contentError);
        }

        // Validate dữ liệu
        if (!this.crawler.selectorType){
           // set lỗi
          isError = true;
          contentError = "User must choose one selector type." 
          listError.push(contentError);
        }

        // Validate dữ liệu
        if (!this.crawler.urls || this.crawler.urls.length <= 0){
           // set lỗi
          isError = true;
          contentError = "User must import a CSV or Excel file contains URLs." 
          listError.push(contentError);
        }
        
        if (isError) {
          // Lỗi > báo popup
          this.setShowPopup(true, this.ENUM.popupEnum.alert, listError[0]);
        }
        else {
          if (this.formMode == this.ENUM.formMode.Add && this.saveCounter == 0) {
            await this.addNewCrawler();
          } else if (
            this.formMode == this.ENUM.formMode.Edit ||
            this.saveCounter > 0
          ) {
            await this.editCrawler();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // API
    async extractSelector() {
      let response, localApi;
      try {
        const crawlerCode = this.currentCrawlerCode;

        localApi = this.BASE_API.CRAWLER_SLT_EXTRACT(crawlerCode);
        response = await axios.post(localApi);

        console.log(response.data);

        this.selectors = response.data;
      } catch (error) {
        // Báo lỗi >> của Axios trả về
        if (error.response) {
          if (error.response.status == 404) {
            this.setShowPopup(
              true,
              this.ENUM.popupEnum.warning,
              "Crawler must be saved before extracting data."
            );
          } else {
            console.log("Lỗi", error.response.data);
          }
        }
        // Báo lỗi >> của chung trả về
        else {
          console.log("Lỗi", error.message);
        }
      }
    },

    async extractData() {
      try {
        let localApi = this.BASE_API.CRAWLER_DATA_EXTRACT(
          this.currentCrawlerCode
        );

        let response = await axios.post(localApi);

        console.log(response.data);

        this.outputs = response.data;
      } catch (error) {
        // Báo lỗi >> của Axios trả về
        if (error.response) {
          if (error.response.status == 404) {
            let errorMsg = error.response.data

            this.setShowPopup(
              true,
              this.ENUM.popupEnum.warning,
              errorMsg
            );
          }
          else {
            console.log("Lỗi", error.response.data);
            this.setShowPopup(
              true,
              this.ENUM.popupEnum.alert,
              this.errorMsg.common,
            )
          }
        }
        // Báo lỗi >> của chung trả về
        else {
          console.log("Lỗi", error.message);
        }
      }
    },

    async addNewCrawler() {
      const crawler = this.crawler;
      const selectors = this.selectors;

      const localApi = this.BASE_API.CRAWLER;
      try {
        const response = await axios.post(localApi, { crawler, selectors });

        console.log(response);

        this.saveCounter++;

        // báo toast > thêm mới thành công > enum báo thành công
        this.setShowToast(
          true,
          this.toastMsg.addSuccessMsg,
          this.ENUM.toastEnum.success
        );
      } catch (error) {
        console.log(error);
      }
    },

    async editCrawler() {
      const crawler = this.crawler;
      const selectors = this.selectors;
      const crawlerCode = this.currentCrawlerCode;

      const localApi = this.BASE_API.CRAWLER_CODE(crawlerCode);
      try {
        const response = await axios.put(localApi, { crawler, selectors });

        console.log(response);

        this.saveCounter++;

        // báo toast > thêm mới thành công > enum báo thành công
        this.setShowToast(
          true,
          this.toastMsg.updateSuccessMsg,
          this.ENUM.toastEnum.success
        );
      } catch (error) {
        console.log(error);
      }
    },

    exportData(columnDelimiter = ",", lineDelimiter = "\n") {
      if (this.outputs && this.outputs.length > 0) {
        let keys = Object.keys(this.outputs[0]);
        let result;

        // CSV Headers
        result = keys.join(columnDelimiter) + lineDelimiter;

        // CSV Body
        this.outputs.map((item) => {
          let ctr = 0;

          keys.map((key) => {
            if (ctr > 0) {
              result += columnDelimiter;
            }
            result += (typeof item[key] === "string" && item[key].includes(columnDelimiter)) ? `"${item[key]}"` : item[key];
            ctr++
          });

          result += lineDelimiter;
        });

        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(result);
        hiddenElement.target = "_blank";

        //provide the name for the CSV file to be downloaded
        hiddenElement.download = "output.csv";
        hiddenElement.click();

      } else {
        this.setShowToast(
          true,
          "No data exist to export.",
          this.ENUM.toastEnum.error
        );
      }
    },
  },

  data() {
    return {
      currentCrawlerCode: null,
      crawler: {},
      selectors: [{}],
      outputs: [],

      detailSelectorIndex: null,

      selectedFile: null,
      activeTab: 0,
      saveCounter: 0,
    };
  },
};
</script>
<style scoped>
#crawlerDetail {
  width: 100vw;
  height: 100vh;
}

#crawlerDetail .m-dialog-content {
  height: calc(100% - 122px);
  padding: 0;
  flex: 1;
  min-height: 0;
  min-width: 0;
  position: relative;
  overflow: auto;
}
#crawlerDetail .main-info {
  padding: 8px 24px 20px;
  width: calc(100% - 48px);
  z-index: 20;
  position: sticky;
  left: 0;
}

.right-group-btn .dropdown-btn {
  border-radius: 0 3px 3px 0;
  width: 36px;
}
.right-group-btn .m-add-dropdown {
  background-color: #2ca10c;
  border-radius: 3px;
}

#crawlerDetail .m-dialog-header {
  padding: 16px 16px 20px 16px;
}

#crawlerDetail .m-dialog-footer {
  background-color: #38393d;
  padding-left: 16px;
  padding-right: 16px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.title__tour-guide {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10px;
}

.title__tour-guide .tour-label {
  white-space: nowrap;
  padding-left: 5px;
  color: rgb(0, 117, 192);
  font-size: 13px;
}

.btn-detail-group .btn-detail {
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.max-upload-size {
  margin-left: 15px;
  color: #757575;
  white-space: nowrap;
  font-size: 12px;
}

.grey-background {
  background-color: #eceef1;
}

.m-label {
  padding-bottom: 4px;
}
.w-90 {
  width: 90px !important;
}

.w-100 {
  width: 100px !important;
}

.w-max-100 {
  max-width: 100px !important;
}

.w-240 {
  width: 240px !important;
}
.w-350 {
  width: 350px !important;
}
.w-max-500 {
  max-width: 500px;
}

.m-row {
  padding-bottom: 12px;
}

.reference-title {
  margin-right: 16px;
  min-width: 75px;
}

.reference-show-more {
  cursor: pointer;
  color: #0075c0;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
}

.right-seperate {
  padding-right: 16px;
}

.root-invoice {
  white-space: nowrap;
  padding-top: 28px;
}

.left-seperate {
  padding-left: 16px;
  border-left: 1px solid rgb(212, 215, 220);
  width: 185px;
}

.summary-info {
  text-align: right;
}

.summary-info .summary-title {
  font-size: 13px;
}

.summary-info .summary-number {
  font-size: 36px;
  font-weight: 700;
  font-family: MISA NotoSans Bold;
}

/* .grid-control {
  background: #fff;
  width: 100%;
  position: relative;
} */
.grid-control-item {
  width: calc(100% - 60px);
  padding: 0 30px;
  background-color: #fff;
  position: sticky;
}

.grid-tab {
  padding: 16px 0 16px 8px;
  position: sticky;
  width: calc(100% - 32px);
  left: 0;
  display: flex;
}

.grid-tab .tab {
  color: #0075c0;
  font-weight: 700;
  margin: 0;
  padding: 0 16px;
}

.grid-tab .tab.active {
  text-decoration: underline;
}

.grid-btn-group {
  padding-bottom: 16px;
}

.label-option {
  padding-right: 10px;
  white-space: nowrap;
  padding-left: 20px;
}

.grid-option {
  align-items: center;
  justify-content: flex-end;
}

@import url("@/css/components/dialog.css");
@import url("@/css/components/label.css");
@import url("@/css/components/uploadfile.css");
</style>
