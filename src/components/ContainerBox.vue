<template>
   <div>
      <!-- 컴포넌트 안에서 반복문 돌리면 postBox.vue에 있는 데이터에 index값이 자동으로 들어가지면서 반복문이 돌아가면서 0,1,2,3,4~~~로 계속 다음 값이 들어가진다 , appdata의 데이터의 개수만큼 알아서 반복문 돌려줌 짱편함-->
      <div v-if="step == 0">
         <PostBox :applyFilter="applyFilter" :appdata="appdata[index]" v-for='(a, index) in appdata' :key='index' />
         
      </div>

      <!-- 필터선택페이지 -->
      <div v-if="step == 1">
         <div :class="selectFilter" class="upload-image" :style="{ background: `url(${urldata})`,'background-size':'contain','background-position':'center', 'background-repeat':'no-repeat' }"></div>
         <div class="filters">
            <FilterBox :urldata="urldata" :filterdata="filterdata" v-for="(filterdata ,index) in  filterdata" :key="index" >
               <span style="color:black">{{ filterdata }}</span>
            </FilterBox>
         </div>
      </div>

      <!-- 글작성페이지 -->
      <div v-if="step == 2">
         <div :class="selectFilter" class="upload-image" :style="{ background: `url(${urldata})`, 'background-size': 'contain', 'background-position':'center', 'background-repeat':'no-repeat' }"></div>
         <div class="write">
            <textarea @input="$emit('write', $event.target.value)" class="write-box" placeholder="여기다 오늘 뭐했는지 써줘"></textarea>
         </div>
      </div>

   </div>
</template>

<script>
import PostBox from './PostBox.vue'
import FilterBox from './FilterBox.vue'
import filterdata from '../data/filterdata.js'

export default {
   name: 'ContainerBox',
   data(){
      return{
         filterdata :filterdata,
         selectFilter:'',
      }
   },
   mounted(){
      this.emitter.on('applyFilter', (filterdata)=>{
         this.selectFilter = filterdata
      })
   }, 
   components: {
      PostBox,
      FilterBox,
   },
   props: {
      appdata: Object, 
      step: Number,
      urldata: String,     //이미지data
      postdata: String,   
   },
   methods:{

   },
}
</script>

<style>
   @import '../css/containerBox.css';
</style>