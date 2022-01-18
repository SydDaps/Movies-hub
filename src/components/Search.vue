<template>
  <div>

    <v-toolbar 
      class=""
    >
      

      <v-toolbar-title class="tw-text-green">M Hub</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="keyWord"
        hide-details
        dense
        solo
        @click:append="sendKeyword"
        append-icon="mdi-magnify"
        
      ></v-text-field>

      
    </v-toolbar>

  </div>
</template>

<script>


export default {

  data() {
    return {
      keyWord: ""
    }
  },
  methods: {
    sendKeyword()
    {
      this.$emit('searchRequest', this.keyWord)
    }
  }
  
}
</script>
<style lang="scss">
.v-sheet {
  background-color: #232323 !important;
}
.v-toolbar__content {
  background-color: #232323;
  padding: 0 8.5% !important;
}
.v-input__slot {
  background-color: #444444 !important;
  
  #input-4 {
    color: white !important;
  }
}

.mdi-magnify {
  color: #79c142 !important;
}

.spacer {
  width: 50%;
}
@media (max-width: 480px) {
  .spacer {
  width: 0%;
}
} 
</style>