<template>
  <CommonPopup :message="modalText" :clickBtn="modalFunc" v-if="isModal" />
  <div id="login-view">
    <CommonHeader />
    <div id="login-view-content">
      <img src="@/assets/png/character.png" alt="캐릭터" />
      <CommonInput
        :placeHolder="nicknamePlaceHolder"
        type="text"
        @changeInput="changeNickname"
        :value="nickname"
      />
      <CommonBtn01 text="로그인" :clickFunc="clickLoginBtn" />
      <CommonBtn01 text="회원가입" :clickFunc="clickSignUpBtn" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonInput from '@/components/CommonInput.vue';
import CommonBtn01 from '@/components/CommonBtn01.vue';
import CommonPopup from '@/components/CommonPopup.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/libs/apis/user';
import { useUserStore } from '@/stores/user';

export default {
  components: {
    CommonHeader,
    CommonInput,
    CommonBtn01,
    CommonPopup,
  },
  setup() {
    const router = useRouter();

    const nicknamePlaceHolder = '닉네임을 입력하세요';
    const nickname = ref('');
    const changeNickname = value => {
      nickname.value = value;
    };

    const isModal = ref(false);
    const modalText = ref('');
    const modalFunc = () => {
      isModal.value = false;
    };

    const store = useUserStore();

    const clickLoginBtn = async () => {
      if (nickname.value === '') {
        isModal.value = true;
        modalText.value = '닉네임을 입력해주세요';
      }
      const loginRes = await loginUser(nickname.value);
      if (loginRes.success) {
        router.push({
          name: 'real-price',
        });
      } else {
        isModal.value = true;
        modalText.value = loginRes.error.errorMessage;
      }
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
      isModal,
      modalText,
      modalFunc,
    };
  },
};
</script>

<style scoped>
#login-view {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

#login-view-content {
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
