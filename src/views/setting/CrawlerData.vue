<template>
  <div class="m-crawler-output pt-4">
    <div class="m-output-header flex pb-4">
      <div class="m-header-txt flex">ELEMENT DATA</div>
      <div class="flex-grow"></div>
      <div class="m-btn-wrapper">
        <button class="m-btn btn-func" @click="saveElementsEvt">Save Element</button>
      </div>
    </div>
    <div class="table-data-control">
      <table class="m-table">
        <thead class="m-thead">
          <tr class="m-tr">
            <th class="m-th text-align-center">CRAWLER CODE</th>
            <th class="m-th text-align-center"># ELEMENT INDEX</th>
            <th class="m-th text-align-left">METADATA</th>
            <th class="m-th text-align-left">TAG</th>
            <th class="m-th text-align-left">ELEMENT ID</th>
            <th class="m-th text-align-left">ELEMENT CLASS</th>
            <th class="m-th text-align-center">ELEMENT SELECTOR</th>
            <th class="m-th text-align-center"></th>
          </tr>
        </thead>
        <tbody class="m-tbody">
          <tr class="m-tr" v-for="(element, index) of elementList" :key="index">
            <td class="m-td">{{ element.crawlerCode }}</td>
            <td class="m-td">{{ element.index }}</td>
            <td class="m-td">
              <input type="text" v-model="element.metadata"  />
            </td>
            <td class="m-td">
              <input type="text" v-model="element.tag" />
            </td>
            <td class="m-td">
              <input type="text" v-model="element.id" />
            </td>
            <td class="m-td">
              <input type="text" v-model="element.className" />
            </td>
            <td class="m-td">{{showElementSelector(element.tag, element.id, element.className)}}</td>
            <td class="m-td"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "crawler-data",
  props: ["parentElements"],
  mounted() {
    // eslint-disable-next-line
    debugger
    this.elementList = this.parentElements
    this.elementCrawlerCode = this.elementList[0]["crawlerCode"]
  },
  updated(){
    // eslint-disable-next-line
    debugger

    this.elementList = this.parentElements
    this.elementCrawlerCode = this.elementList[0]["crawlerCode"]
  },
  methods: {
    /**
    * Mô tả : Sự kiện emit
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 09:11 10/04/2022
    */
    emitElementsToParent(){
      this.$emit("updateElementsInChild", this.elementList)
    },

    /**
    * Mô tả : Lưu element List hiện tại
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 09:38 10/04/2022
    */
    async saveElementsEvt(){
      try {
        const crawlerCode = this.elementCrawlerCode
        const elements = this.elementList

        const localElementApi = `http://localhost:4000/element/`;
        const response = await axios.put(localElementApi, {
          crawlerCode,
          elements 
        })

        console.log(response.data);

        alert(response.data)

        this.emitElementsToParent()
        
      } catch (error) {
        console.log(error);
        alert(error.message);
      }

    },

    showElementSelector(_tag, _id, _class){
      let selector = ""
      if (_tag){
        selector += `${_tag}`
      }
      if (_id){
        selector += `#${_id}`
      }
      if(_class){
        selector += `.${_class}`
      }
      return selector;
    }
  },
  data() {
    return {
      elementList: [],
      elementCrawlerCode: null,
    };
  },
};
</script>
<style scoped>
@import url("@/css/components/table.css");
</style>
    