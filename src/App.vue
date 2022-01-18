<template>
  <div>
    <app-search v-on:searchRequest="passDataToResults($event)"></app-search>
    <app-result :searchData="this.keyWord"></app-result>
    
  </div>
  


 
</template>

<script>
import search from "./components/Search.vue";
import result from "./components/Results.vue"

export default {
  data(){
   return {
     keyWord: ""
   }
  },
  name: 'App',
  components: {
    appSearch: search,
    appResult: result
  },
  methods: {
    passDataToResults(data){
      this.keyWord = data
    }
  }
}
</script>
