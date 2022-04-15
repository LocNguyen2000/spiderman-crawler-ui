<template>
  <div class="m-crawler-form">
    <div class="m-form-header flex">
      <div class="m-header-txt flex">CRAWLER SETTINGS</div>
      <div class="flex-grow"></div>
      <div class="m-btn-wrapper">
        <button class="m-btn btn-func">Refresh</button>
        <button class="m-btn btn-func" @click="importCrawler">
          Import Crawler
        </button>
      </div>
    </div>
    <div class="m-form-grid mt-2">
      <div class="m-row">
        <div class="m-input-wrapper flex-grow">
          <label for="CrawlerCode"
            >Crawler Code <span style="color: red">*</span></label
          >
          <input
            class="m-input"
            type="text"
            ref="CrawlerCode"
            placeholder="Ex: CRWL-0001..."
            v-model="currentCrawler.crawlerCode"
          />
        </div>

        <div class="m-input-wrapper flex-grow">
          <label for="CrawlerName"
            >Crawler Name <span style="color: red">*</span></label
          >
          <input
            class="m-input"
            type="text"
            ref="CrawlerName"
            placeholder="Ex: Laptop-Crawler..."
            v-model="currentCrawler.crawlerName"
          />
        </div>
        <div class="m-input-wrapper flex-grow__2">
          <label for="URL"> URL <span style="color: red">*</span></label>
          <input
            class="m-input"
            type="text"
            ref="URL"
            placeholder="Ex: tiki.vn/..."
            v-model="currentCrawler.urlSingle"
          />
        </div>
      </div>
      <div class="m-row">
        <div class="m-input-wrapper flex-grow">
          <label for="PageType">Page Type </label>
          <div class="flex flex__align-center">
            <input
              class="m-input"
              type="radio"
              ref="Paginated"
              name="PageType"
              @click="setIsPaginated(true)"
            />
            <span> Paginated</span>
            <input
              class="m-input"
              type="radio"
              ref="NonPaginated"
              name="PageType"
              @click="setIsPaginated(false)"
            />
            <span> Non-Paginated</span>
          </div>
        </div>
        <div class="m-input-wrapper flex-grow__2" v-if="isShowStartEndPage">
          <label for="StartPage"> Start Page </label>
          <input
            class="m-input"
            type="number"
            ref="StartPage"
            placeholder="Enter first page index"
            v-model="currentCrawler.startPage"
          />
        </div>
        <div class="m-input-wrapper flex-grow__2" v-if="isShowStartEndPage">
          <label for="EndPage"> End Page </label>
          <input
            class="m-input"
            type="number"
            ref="EndPage"
            placeholder="Enter last page index"
            v-model="currentCrawler.endPage"
          />
        </div>
      </div>
      <div class="m-rpw">
        <div class="m-input-wrapper flex-grow__2">
          <label for="EndPage"> Description </label>
          <input
            class="m-input"
            type="textarea"
            ref="Description"
            placeholder="Ex: What does this crawler do?"
            v-model="currentCrawler.description"
            style="height: 100px;"
          />
        </div>
      </div>
    </div>
    <div class="m-form-footer">
      <div class="m-btn-wrapper">
        <button class="m-btn btn-clear" @click="clearCrawler">Clear</button>
        <button
          class="m-btn btn-func"
          ref="crawlElementBtn"
          @click="runCrawlElement"
          :disabled="!isImportedCrawler"
          title="Phải lưu Crawler vào hệ thống mới được chạy"
        >
          Extract Element
        </button>
        <button
          class="m-btn btn-func"
          ref="runCrawlerBtn"
          @click="runCrawlerEvt"
          :disabled="!isImportedCrawler"
          title="Phải lưu Crawler vào hệ thống mới được chạy"
        >
          Crawl Data
        </button>
        <button
          class="m-btn btn-func"
          ref="saveCrawlerBtn"
          @click="saveCrawlerEvt"
        >
          Save | Update Crawler
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "crawler-form",
  components: {},
  props: ["parentCrawler"],

  async mounted() {
    try {
      this.currentCrawler = this.parentCrawler;
      // lấy mã crawler mới
      const localNewCodeApi = `http://localhost:4000/crawler/newCrawlerCode`;
      const response = await axios.get(localNewCodeApi);

      this.currentCrawler.crawlerCode = response.data;

      if (this.currentCrawler.isPaginated) {
        this.setIsPaginated(true);
        this.$refs.Paginated.click();
      } else {
        this.setIsPaginated(false);
        this.$refs.NonPaginated.click();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data)
    }
  },
  methods: {
    emitCrawlerToParent(_crawlerData) {
      this.$emit("updateCrawlerInChild", _crawlerData);
    },
    emitElementsToParent(_elementData) {
      this.$emit("updateElementsInChild", _elementData);
    },
    /**
     * Mô tả : Chạy crawler với elements, url được cho
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:34 10/04/2022
     */
    runCrawlerEvt() {
      if (this.isImportedCrawler) {
        try {
          // validate có crawlerName & crawlerCode
          // validate có elements
          // validate có url
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Mô tả : Sự kiện lưu crawler
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 08:01 10/04/2022
     */
    async saveCrawlerEvt() {
      try {
        // kiểm tra có p crawler import vào không
        if (this.currentCrawler["crawlerCode"]) {
          if (this.isImportedCrawler) {
            // API PUT
            console.log("PUT");

            const localApi = `http://localhost:4000/crawler/`;
            await axios.put(localApi, {
              crawler: this.currentCrawler,
              elements: this.currentElementList
            });

            alert("Cập nhật thành công");
          } else {
            // API POST
            console.log("POST");

            const localApi = `http://localhost:4000/crawler/`;
            await axios.post(localApi, {
              crawler: this.currentCrawler,
              elements: this.currentElementList
            });

            // đã lưu crawler
            this.isSavedCrawler = true;

            alert("Đã tạo mới Crawler");
          }
        } else {
          alert("Không có crawler");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    },

    /**
     * Mô tả : Nhập mã Crawler Code để lấy crawler đã có
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 07:59 10/04/2022
     */
    async importCrawler() {
      let crawlerCode = prompt("Enter a Crawler Code");

      if (crawlerCode) {
        console.log("IMPORT CRAWLERx");

        // chạy api get by code
        try {
          // Lấy crawler
          const localApi = `http://localhost:4000/crawler/:crawlerCode?crawlerCode=${crawlerCode}`;
          let response = await axios.get(localApi);

          console.log(response.data);

          this.isImportedCrawler = true;
          this.currentCrawler = response.data;

          // lấy element của crawler
          const localElementApi = `http://localhost:4000/element/:crawlerCode?crawlerCode=${crawlerCode}`;
          response = await axios.get(localElementApi);

          console.log(response.data);

          this.currentElementList = response.data;

          // trả dữ liệu cho cha component để truyền vào bên CrawlerData
          this.emitElementsToParent(this.currentElementList);
          this.emitCrawlerToParent(this.currentCrawler);
        } catch (error) {
          console.log(error);
          alert(error.response.data);
        }
      }
    },
    setIsPaginated(isPaginatedURL) {
      if (isPaginatedURL) {
        this.currentCrawler.isPaginated = true;
        this.isShowStartEndPage = true;
      } else {
        this.currentCrawler.isPaginated = false;
        this.isShowStartEndPage = false;
      }
    },
    clearCrawler() {
      this.currentCrawler = {};
      this.isImportedCrawler = false;
      this.isSavedNewCrawler = false;
      this.isShowStartEndPage = false;
    },
    /**
     * Mô tả : Chạy API lấy dữ liệu element
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 07:52 10/04/2022
     */
    async runCrawlElement() {
      // validate crawler data
      let crawlerCode = prompt("Enter a Crawler Code");

      if (crawlerCode) {
        try {
          // eslint-disable-next-line
          debugger
          // chạy api
          const localApi = "http://localhost:4000/crawler/getPageElement";
          await axios.put(localApi, {
            crawlerCode
          });

          console.log("Extract Element - RUN API");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
    },
  },
  data() {
    return {
      currentCrawler: {},
      currentElementList: [],
      isShowStartEndPage: false,
      isImportedCrawler: false,
      isSavedNewCrawler: false,
    };
  },
};
</script>
<style scoped>
</style>