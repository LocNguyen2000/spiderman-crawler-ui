<template>
     <div class="m-crawler-content pt-4 ml-4 mr-4">
        <crawler-form
            :parentCrawler="parentCrawler"
            @updateElementsInChild="updateElemenetsFromEmitted"
            @updateCrawlerInChild="updateCrawlerFromEmitted"
        />
        <crawler-data
            v-model="hasChangedElement"
            :parentElements="parentElementList"
            @updateElementsInChild="updateElemenetsFromEmitted"
        />
    </div>
</template>
<script>
import CrawlerForm from "./CrawlerForm.vue"
import CrawlerData from "./CrawlerData.vue"

export default {
    name: "crawler-page",
    components: {
        CrawlerForm,
        CrawlerData
    },
    watch:{
        parentElementList: function(newVal){
            this.parentElementList = (newVal);
            this.hasChangedElement = true
                
        },
        parentCrawler: function(newVal){
            this.parentCrawler = (newVal);            
        }

    },
    methods: {
        updateElemenetsFromEmitted(elements){
            this.parentElementList = elements
        },
        updateCrawlerFromEmitted(crawler){
            this.parentCrawler = crawler
        }
    },
    data() {
        return {
            parentElementList: [{}],
            parentCrawler: {},
            hasChangedElement: false
        }
    },
}
</script>
<style scoped>
    @import url("@/css/components/button.css");
    @import url("@/css/components/input.css");
    @import url("@/css/components/form.css");
</style>