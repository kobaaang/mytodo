<template>
   <div class="post">
      <div class="post-header">
         <div class="profile"></div>
         <span class="profile-name">{{ appdata.name }}</span>
      </div>
      <div @click="likeChange" :class="appdata.filter" class="post-body" :style="{backgroundImage:`url(${appdata.postImage})`}"></div>
      <div class="post-content">
         <p>{{ likes }} Likes</p>
         <p>
            <strong>ko_baaang</strong>
            {{ appdata.content }}</p>
         <p class="date">{{ appdata.date }}</p>
      </div>
   </div>
</template>

<script>
export default {
   name:'PostBox',
   data(){
      return{
         likes: 0,
      }
   },
   props:{
      appdata:Object,   //게시물
      postdata:Object,   
   },
   methods: {
      likeChange() {
         if (this.likes % 2 === 0) {
            this.likes++;
         } else {
            this.likes--;
         }
      }
   }
}
</script>

<style>
   @import './../css/postbox.css';
</style>
