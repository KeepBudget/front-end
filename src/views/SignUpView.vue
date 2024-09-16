<template>
  <CommonPopup :message="modalText" :clickBtn="modalFunc" v-if="isModal" />
  <div id="signUp-view">
    <CommonHeader />
    <div class="element">
      <div class="label">닉네임</div>
      <CommonInput :placeHolder="nicknamePlaceHolder" type="text" @changeInput="changeNickname" :value="nickname" />
    </div>
    <div class="element">
      <div class="label">희망 지역</div>
      <CommonDistricts :selectedId="wishDistrictId" @changeItem="changeDistrict" :items="districts" />
    </div>
    <div class="element">
      <div class="label">희망 집 유형</div>
      <CommonDistricts :selectedId="wishPropertyType" @changeItem="changePropertyType" :items="propertyTypes" />
    </div>
    <div class="element">
      <div class="label">희망 거래 유형</div>
      <CommonDistricts :selectedId="wishTradeType" @changeItem="changeTradeType" :items="tradeTypes" />
    </div>
    <div class="element">
      <div class="label">희망 가격(단위 : 만원)</div>
      <CommonInput :placeHolder="pricePlaceHolder" type="number" @changeInput="changeWishPrice" :value="wishPrice" />
    </div>
    <div class="element">
      <div class="label">희망 평수</div>
      <CommonInput :placeHolder="sizePlaceHolder" type="number" @changeInput="changeWishSize" :value="wishSize" />
    </div>
    <div class="element">
      <CommonBtn01 :text="btnText" :clickFunc="clickBtn" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonInput from '@/components/CommonInput.vue';
import CommonDistricts from '@/components/CommonDistricts.vue';
import CommonBtn01 from '@/components/CommonBtn01.vue';
import CommonPopup from '@/components/CommonPopup.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchDistricts } from '@/libs/apis/district';
import {
  fetchUser,
  fetchUserRaw,
  signUpUser,
  updateUser,
} from '@/libs/apis/user';

export default {
  components: {
    CommonHeader,
    CommonInput,
    CommonDistricts,
    CommonBtn01,
    CommonPopup,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const btnText = ref('회원가입');

    // 닉네임
    const nicknamePlaceHolder = '닉네임을 입력하세요';
    const nickname = ref(null);
    const changeNickname = value => {
      nickname.value = value;
    };

    // 희망 지역
    const wishDistrictId = ref(null);
    const districts = reactive([]);
    const changeDistrict = id => {
      wishDistrictId.value = id;
    };

    onMounted(async () => {
      const fetchedDistricts = await fetchDistricts();
      fetchedDistricts.response.forEach(district => {
        districts.push(district);
      });
      if (route.path === '/users/edit') {
        const userRes = await fetchUserRaw();
        nickname.value = userRes.response.nickname;
        wishDistrictId.value = userRes.response.wishDistrictId;
        wishPropertyType.value = userRes.response.wishPropertyType;
        wishTradeType.value = userRes.response.wishTradeType;
        wishPrice.value = userRes.response.wishPropertyPrice;
        wishSize.value = userRes.response.wishPropertySize;
        btnText.value = '수정하기';
      }
    });

    // 희망 집 유형
    const wishPropertyType = ref(null);
    const propertyTypes = reactive([
      { id: 'APARTMENT', name: '아파트' },
      { id: 'OFFICETEL', name: '오피스텔' },
      { id: 'MULTIPLEX_HOUSING', name: '연립다주택' },
    ]);
    const changePropertyType = id => {
      wishPropertyType.value = id;
    };

    // 희망 거래 유형
    const wishTradeType = ref(null);
    const tradeTypes = reactive([
      { id: 'DEAL', name: '매매' },
      { id: 'LEASE', name: '전세' },
    ]);
    const changeTradeType = id => {
      wishTradeType.value = id;
    };

    // 희망 가격
    const pricePlaceHolder = '희망 가격을 입력하세요(단위 : 만원)';
    const wishPrice = ref(null);
    const changeWishPrice = value => {
      wishPrice.value = value;
    };

    // 희망 평수
    const sizePlaceHolder = '희망 평  수를 입력하세요(단위 : 평수)';
    const wishSize = ref(null);
    const changeWishSize = value => {
      wishSize.value = value;
    };

    const isModal = ref(false);
    const modalText = ref('');
    const modalFunc = () => {
      isModal.value = false;
    };

    const validateInputs = () => {
      if (nickname.value === null || nickname.value === '') {
        isModal.value = true;
        modalText.value = '닉네임 입력은 필수입니다.';
        return false;
      } else if (wishDistrictId.value === null) {
        isModal.value = true;
        modalText.value = '희망 지역 선택은 필수입니다.';
        return false;
      } else if (wishPropertyType.value === null) {
        isModal.value = true;
        modalText.value = '희망 집 유형 선택은 필수입니다.';
        return false;
      } else if (wishTradeType.value === null) {
        isModal.value = true;
        modalText.value = '희망 거래 유형 선택은 필수입니다.';
        return false;
      } else if (wishPrice.value === null) {
        isModal.value = true;
        modalText.value = '희망 가격 입력은 필수입니다.';
        return false;
      } else if (wishSize.value === null) {
        isModal.value = true;
        modalText.value = '희망 평수 입력은 필수입니다.';
        return false;
      }
      return true;
    };

    const clickBtn = async () => {
      const validatedInputs = validateInputs();
      if (!validatedInputs) return;
      if (route.path === '/users/edit') {
        await updateUser();
      } else {
        await clickSignupBtn();
      }

      const updateUser = async () => {
        const res = await updateUser(
          nickname.value,
          wishDistrictId.value,
          wishPropertyType.value,
          wishTradeType.value,
          wishPrice.value,
          wishSize.value,
        );
        if (res.success) {
          router.go(-1);
        } else {
          isModal.value = true;
          modalText.value = res.error.errorMessage;
        }
      };

      const clickSignupBtn = async () => {
        const res = await signUpUser(
          nickname.value,
          wishDistrictId.value,
          wishPropertyType.value,
          wishTradeType.value,
          wishPrice.value,
          wishSize.value,
        );
        if (res.success) {
          router.push({
            name: 'real-price',
          });
        } else {
          isModal.value = true;
          modalText.value = res.error.errorMessage;
        }
      };
    };

    return {
      nicknamePlaceHolder,
      nickname,
      changeNickname,
      wishDistrictId,
      changeDistrict,
      districts,
      wishPropertyType,
      propertyTypes,
      changePropertyType,
      wishTradeType,
      tradeTypes,
      changeTradeType,
      pricePlaceHolder,
      wishPrice,
      changeWishPrice,
      sizePlaceHolder,
      wishSize,
      changeWishSize,
      clickBtn,
      isModal,
      modalText,
      modalFunc,
      btnText,
    };
  },
};
</script>

<style scoped>
#signUp-view {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.element {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  color: #60584c;
  font-size: large;
  font-weight: bold;
}
</style>
