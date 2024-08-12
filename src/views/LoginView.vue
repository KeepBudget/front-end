<template>
  <div id="home-view">
    <CommonHeader />
    <div id="home-view-content">
      <img src="@/assets/png/character.png" alt="캐릭터" />
      <CommonInput :placeHolder="nicknamePlaceHolder" type="text" @changeInput="changeNickname" :value="nickname" />
      <CommonBtn01 text="로그인" :clickFunc="clickLoginBtn" />
      <CommonBtn01 text="회원가입" :clickFunc="clickSignUpBtn" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonInput from '@/components/CommonInput.vue';
import CommonBtn01 from '@/components/CommonBtn01.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    CommonHeader,
    CommonInput,
    CommonBtn01,
  },
  setup() {
    const router = useRouter();

    const nicknamePlaceHolder = '닉네임을 입력하세요';
    const nickname = ref('');
    const changeNickname = value => {
      nickname.value = value;
    };

    const clickLoginBtn = () => {
      console.log(nickname.value);
      console.log('login btn');
      nickname.value = '';
    };

    const clickSignUpBtn = () => {
      router.push({
        name: 'signUp',
      });
    };

    return {
      nicknamePlaceHolder,
      nickname,
      changeNickname,
      clickLoginBtn,
      clickSignUpBtn,
    };
  },
};
</script>

<style scoped>
#home-view {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

#home-view-content {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-10%);
}

img {
  width: 40vw;
  margin-bottom: 15px;
}
</style>
