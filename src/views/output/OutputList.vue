<template>
  <div class="m-output-list mt-2">
    <div class="m-crawlers-header flex mr-4 pb-4">
      <div class="m-header-txt flex">OUTPUT DATA</div>
      <div class="flex-grow"></div>
      <div class="m-btn-wrapper">
        <button class="m-btn btn-func" @click="findCrawlerOutput">
          PICK CRAWLER
        </button>
      </div>
    </div>
    <div class="table-data-control mr-4">
      <table class="m-table">
        <thead class="m-thead">
          <tr class="m-tr">
            <th
              class="m-th text-align-center"
              v-for="(header, index) in outputData.headers"
              :key="index"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="m-tbody">
          <tr class="m-tr">
            <td
              class="m-td text-align-center"
              v-for="(body, index) in outputData.body"
              :key="index"
            >
              {{ body }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "output-page",

  methods: {
    async findCrawlerOutput() {
      let crawlerCode = prompt("Enter a Crawler Code");

      if (crawlerCode) {
        try {
          const localOutputApi = `http://localhost:4000/output/:crawlerCode?crawlerCode=${crawlerCode}`;
          const response = await axios.get(localOutputApi);

          this.outputData = response.data[0]

          console.log(this.outputData);
        } catch (error) {
          console.log(error);
          alert(error.response.data);
        }
      }
    },
  },
  data() {
    return {
      outputData: {
        crawlerCode: "",
        headers: [],
        body: [],
      },
    };
  },
};
</script>
<style scoped>
.m-output-list {
  width: 100%;
  height: 100%;
}

.m-output-list .table-data-control {
  height: 80%;
}
@import url("@/css/components/table.css");
</style>