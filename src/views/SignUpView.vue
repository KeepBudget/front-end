<template>
  <div id="signUp-view">
    <CommonHeader />
    <div class="element">
      <div class="label">닉네임</div>
      <CommonInput
        :placeHolder="nicknamePlaceHolder"
        type="text"
        @changeInput="changeNickname"
        :value="nickname"
      />
    </div>
    <div class="element">
      <div class="label">희망 지역</div>
      <CommonDistricts
        :selectedId="wishDistrictId"
        @changeItem="changeDistrict"
        :items="districts"
      />
    </div>
    <div class="element">
      <div class="label">희망 집 유형</div>
      <CommonDistricts
        :selectedId="wishPropertyType"
        @changeItem="changePropertyType"
        :items="propertyTypes"
      />
    </div>
    <div class="element">
      <div class="label">희망 거래 유형</div>
      <CommonDistricts
        :selectedId="wishTradeType"
        @changeItem="changeTradeType"
        :items="tradeTypes"
      />
    </div>
    <div class="element">
      <div class="label">희망 가격</div>
      <CommonInput
        :placeHolder="pricePlaceHolder"
        type="number"
        @changeInput="changeWishPrice"
        :value="wishPrice"
      />
    </div>
    <div class="element">
      <div class="label">희망 평수</div>
      <CommonInput
        :placeHolder="sizePlaceHolder"
        type="number"
        @changeInput="changeWishSize"
        :value="wishSize"
      />
    </div>
    <div class="element">
      <CommonBtn01 text="회원가입" :clickFunc="clickSignUpBtn" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonInput from '@/components/CommonInput.vue';
import CommonDistricts from '@/components/CommonDistricts.vue';
import CommonBtn01 from '@/components/CommonBtn01.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    CommonHeader,
    CommonInput,
    CommonDistricts,
    CommonBtn01,
  },
  setup() {
    const router = useRouter();

    // 닉네임
    const nicknamePlaceHolder = '닉네임을 입력하세요';
    const nickname = ref(null);
    const changeNickname = value => {
      nickname.value = value;
    };

    // 희망 지역
    const wishDistrictId = ref(null);
    const districts = reactive([
      //TODO 지역 가져오기
      { id: 1, name: '강남구' },
      { id: 2, name: '강서구' },
      { id: 3, name: '강북구' },
      { id: 4, name: '송파구' },
      { id: 5, name: '광진구' },
      { id: 6, name: '서대문구' },
      { id: 7, name: '동대문구' },
      { id: 8, name: '서초구' },
      { id: 9, name: '종로구' },
      { id: 10, name: '종구' },
      { id: 11, name: '용산구' },
    ]);
    const changeDistrict = id => {
      wishDistrictId.value = id;
    };

    // 희망 집 유형
    const wishPropertyType = ref(null);
    const propertyTypes = reactive([
      { id: 'APARTMENT', name: '아파트' },
      { id: 'OFFICETEL', name: '오피스텔' },
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
    const sizePlaceHolder = '희망 평수를 입력하세요(단위 : 평수)';
    const wishSize = ref(null);
    const changeWishSize = value => {
      wishSize.value = value;
    };

    const clickSignUpBtn = () => {
      router.push({
        name: 'realPrice',
      });
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
      clickSignUpBtn,
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
