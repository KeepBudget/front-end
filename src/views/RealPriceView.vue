<template>
  <div id="realPrice-view">
    <CommonHeader />
    <div id="user">
      <div id="user-header">
        <div id="user-header-text">
          <span>{{ nickname }}님</span>의 희망사항
        </div>
        <img src="@/assets/png/userEdit.png" alt="editBtn" />
      </div>
      <div id="user-body">
        <div id="user-body-text">
          <div><span>지역</span>서울시 강남구</div>
          <div><span>형태</span>아파트 매매</div>
          <div><span>가격</span>0억 0000만원 이내</div>
          <div><span>평수</span>25평</div>
        </div>
        <img src="@/assets/png/character.png" alt="캐릭터" />
      </div>
    </div>
    <div id="properties">
      <RecommendProperty />
      <RecommendProperty />
      <RecommendProperty />
      <RecommendProperty />
      <RecommendProperty />
      <RecommendProperty />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import RecommendProperty from '@/components/RecommendProperty.vue';
import { ref } from 'vue';

export default {
  components: {
    CommonHeader,
    RecommendProperty,
  },
  setup() {
    const nickname = ref('홍길동');
    return {
      nickname,
    };
  },
};
</script>

<style scoped>
#realPrice-view {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #f5f5f5 22%, white 22%);
}

#user {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #d5d5d5;
  border-radius: 10px;
}

#user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#user-header-text span {
  font-size: x-large;
  font-weight: bold;
  color: #60584c;
}

#user-body {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

#user-body img {
  width: 20vw;
}

#user-body-text {
  font-size: medium;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#user-body-text span {
  font-weight: bold;
  margin-right: 15px;
}

#properties {
  height: 540px;
  overflow-y: scroll;
}

#properties::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
