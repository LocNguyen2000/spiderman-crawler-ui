<template>
  <div class="m-app-body">
    <the-sidebar/>
    <div class="m-app-content">
      <the-navbar/>
      <the-content/>
    </div>

  </div>
</template>

<script>

import TheSidebar from "@/components/layout/TheSidebar.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue"
import TheContent from "@/components/layout/TheContent.vue"

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheNavbar,
    TheContent
  }
}
</script>

<style scoped>
  @import url("@/css/main.css");
  @import url("@/css/common.css");
  @import url("@/css/width.css");
  @import url("@/css/animation.css");
  @import url("@/css/components/icon.css");
</style>
