<template>
   <div 
      @click="fire" 
      :class="`${ filterdata } filter-item`" :style="`background-image:url(${urldata})`">
      <slot></slot>
   </div> 
</template>


<script>
export default {
   name:'FilterBox',
   methods : {
      fire(){
         this.emitter.emit('applyFilter', this.filterdata) 
         //this.emitter.emit('작명', '데이터')
      }
   },
   props:{
      urldata:String,      //이미지 데이터
      filterdata:Object,   //filterdata.js의 데이터
   }, 
   data(){
      return{
         
      }
   } 
}
</script>


<style>
   .filter-item {
      width: 100px;
      height: 100px;
      margin: 10px 10px 10px auto;
      padding: 8px;
      display: inline-block;
      color : white;
      background-size: cover;
      background-position : center;
}
</style>