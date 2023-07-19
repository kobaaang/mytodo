<template>
   <div class="header">
      <ul class="header-button-left">
         <li @click="step--">Cancel</li>
      </ul>
      <ul class="header-button-right">
         <li v-if="step == 1" @click="step++">Next</li>
         <li v-if="step == 2" @click="publish">Post</li>
      </ul>
      <img src="./assets/my.png" class="logo" />
   </div>
<!-- 
   <h4>하이욤 {{ $store.state.name }} 나는 낭랑<span>{{ $store.state.age }}세</span></h4>
   payload
   <button @click="$store.commit('change')">버른</button>
   <button @click="$store.commit('ageChange',1)">버른2</button> -->
   <!-- appdata를 props로 넘김 -->
   <ContainerBox :appdata="appdata" :step="step" :urldata="urldata" @write="postdata = $event" :filterdata="filterdata" />

   <!-- moreitem -->
   <!-- <button @click="more()">더보기 </button> -->

   <div class="footer">
      <ul class="footer-button-plus">
         <input @change="upload" type="file" id="file" class="inputfile" />
         <label for="file" class="input-plus">+</label>
      </ul>
   </div>
</template>

<script>
import ContainerBox from './components/ContainerBox.vue';
import axios from 'axios';

export default {
   name: 'App',
   data() {
      return {
         appdata: [
            // 초기 데이터를 여기에 추가하세요
            {
               name: "ko_baang",
               userImage: "https://picsum.photos/100?random=3",
               postImage: "https://picsum.photos/600?random=3",
               likes: 0,
               date: "May 15",
               liked: false,
               content: "오늘 남기고 싶은 것들을 남겨주세요",
               filter: "perpetua"
            }
         ],
         moreitem: 0,
         step: 0,
         urldata: '',
         postdata: '',
         selectFilter: '',
      }
   },
   created(){
         const liveDataString  = localStorage.getItem("mydata");
         if (liveDataString) {
            const liveData  = JSON.parse(liveDataString);
            this.appdata = liveData.reverse();
         }
   },
   mounted(){
      this.emitter.on('applyFilter', (filterdata)=>{
         this.selectFilter = filterdata
      })
   }, 

   components : {
      ContainerBox,
   },
   methods : {
      more(){
         //url을 axios를 이용해서 가져올 것임
         axios.get(`https://codingapple1.github.io/vue/more${this.moreitem}.json`)
         .then((result)=>{
            // get요청으로 가져온 데이터는 함수 파라미터 자리에 들어있음 여기서는 result=url로 가져온 거
            // get요청이 성공했을 때 실행할 코드 then(()=>{})
            console.log(result.data);
            //push array에 데이터 추가
            //데이터를 가져다가 쓸 때에는 this를 앞에 사용하는 거 잊지말기!
            this.appdata.unshift(result.data);
            this.moreitem += 1  //this.더보기 += 1
         })
         .catch((error)=>{
            alert('error on',error)
         })
      },
      //파일 업로드함수
      upload(e){
         let file = e.target.files
         console.log('file???',file);
         //업로드한 이미지의 URL 생성
         let url = URL.createObjectURL(file[0]);
         // console.log(url)
         //파일 업로드 후 다음페이지로 넘어가게
         this.step++;
         this.urldata = url
      },
      //내보내기 함수
      publish(){
         let currentDate = new Date(); // 현재 시간 생성
         let formattedDate = currentDate.toLocaleString(); 
         // 현재 시간을 문자열로 변환

         let mydata = {//내 게시물
            name: "ko_baaang",
            userImage: "https://picsum.photos/100?random=3",
            postImage: this.urldata,
            likes: 36,
            date: formattedDate,
            liked: false,
            content: this.postdata,
            filter: this.selectFilter
         };    

         //로컬스토리지로 데이터 저장
         const liveDataString = localStorage.getItem("mydata");
         const liveData = liveDataString ? JSON.parse(liveDataString) : [];

         // 새로운 Data 추가 
         liveData.push(mydata);

         //문자열 형식으로 json에 배열로 저장
         localStorage.setItem("mydata", JSON.stringify(liveData));

         console.log('this.postdata????',this.postdata); // postdata 출력
         this.appdata.unshift(mydata);    
         //mydata 객체를 this.appdata 배열의 첫 번째 요소로 추가하는 것을 의미
         this.step = 0;
      },
      //자식요소에서 데이터를 받아올 함수 만들 자리
   },
}
</script>

<style>
/* css 외부에 만들어서 import해옴 */
   @import './css/app.css';
</style>
