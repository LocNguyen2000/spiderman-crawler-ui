<template>
  <div class="m-crawler-list mt-2 ">
    <div class="m-crawlers-header flex mr-4 pb-4 ">
      <div class="m-header-txt flex">ELEMENT DATA</div>
      <div class="flex-grow"></div>
      <div class="m-btn-wrapper">
          <button class="m-btn btn-func">Choose Crawler</button>
      </div>
    </div>
    <div class="table-data-control mr-4">
      <table class="m-table">
        <thead class="m-thead">
          <tr class="m-tr">
            <th class="m-th text-align-center">#</th>
            <th class="m-th text-align-left">CRAWLER CODE</th>
            <th class="m-th text-align-left">CRAWLER NAME</th>
            <th
              class="m-th text-align-left"
              style="
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              URL (1)
            </th>
            <th
              class="m-th text-align-left"
              style="
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              URL (s)
            </th>
            <th class="m-th text-align-center">PAGINATED</th>
            <th class="m-th text-align-center">START PAGE</th>
            <th class="m-th text-align-center">END PAGE</th>
            <th
              class="m-th text-align-center"
              style="
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              DESCRIPTION
            </th>
          </tr>
        </thead>
        <tbody class="m-tbody">
          <tr class="m-tr" v-for="(crawler, index) of crawlers" :key="index">
            <td class="m-td">{{ ++index }}</td>
            <td class="m-td">{{ crawler.crawlerCode }}</td>
            <td class="m-td">{{ crawler.crawlerName }}</td>
            <td class="m-td">{{ crawler.urlSingle }}</td>
            <td class="m-td">{{ crawler.urlMany }}</td>
            <td class="m-td">{{ crawler.isPaginated }}</td>
            <td class="m-td">{{ crawler.startPage }}</td>
            <td class="m-td">{{ crawler.endPage }}</td>
            <td class="m-td">{{ crawler.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios"

export default {
  name: "crawler-list",
  async created() {
    try {
      const localApi = 'http://localhost:4000/crawler/'
      const response = await axios.get(localApi)

      this.crawlers = response.data;
    } catch (error) {
      console.log(error);
    }

  },
  data() {
    return {
      crawlers: [],
    };
  },
};
</script>
<style scoped>
.m-crawler-list {
  width: 100%;
  height: 100%;
}

.m-crawler-list .table-data-control {
  height: 80%
}
@import url("@/css/components/table.css");
</style>