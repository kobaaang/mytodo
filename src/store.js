import { createStore } from 'vuex'

//집가서 세 개의 사진에 다 구현할 수 있도록 하기
const store = createStore({//data저장공간
   state() {
      return {//state  저장
         name: '병준',
         age : 28,
         likes : 0,
      }
   },
   mutations :{ //데이터 수정공간
      change(state){//수정방법 정의
         state.name = '뿌엥'
      },
      ageChange(state, payload){
         state.age += payload
      },
      likeChange(state){
         if( state.likes % 2 == 0){
            state.likes++;
         }else{
            state.likes--;
         }
         
      }
   }
})

export default store