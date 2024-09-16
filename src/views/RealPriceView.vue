<template>
  <div id="realPrice-view">
    <CommonHeader />
    <div id="user">
      <div id="user-header">
        <div id="user-header-text">
          <span>{{ user.nickname }}님</span>의 희망사항
        </div>
        <img src="@/assets/png/userEdit.png" alt="editBtn" />
      </div>
      <div id="user-body">
        <div id="user-body-text">
          <div><span>지역</span>서울시 {{ user.wishDistrict }}</div>
          <div>
            <span>형태</span>{{ user.wishPropertyType }}
            {{ user.wishTradeType }}
          </div>
          <div><span>가격</span>{{ user.wishPropertyPrice }}만원 이내</div>
          <div><span>평수</span>{{ user.wishPropertySize }}평</div>
        </div>
        <img src="@/assets/png/character.png" alt="캐릭터" />
      </div>
    </div>
    <div id="properties" @scroll="handlePropertiesScroll">
      <RecommendProperty v-for="property in properties" :key="property.id" :property="property" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import RecommendProperty from '@/components/RecommendProperty.vue';
import { fetchProperties } from '@/libs/apis/property';
import { fetchUser } from '@/libs/apis/user';
import { onMounted, reactive, ref } from 'vue';

export default {
  components: {
    CommonHeader,
    RecommendProperty,
  },
  setup() {
    const user = ref({});
    const properties = reactive([]);
    const page = ref(1);
    const totalCount = ref(null);

    const addProperties = async () => {
      const fetchedProperties = await fetchProperties(page.value, 20);
      totalCount.value = fetchedProperties.response.pageNation.totalCount;
      fetchedProperties.response.properties.forEach(property => {
        properties.push(property);
      });
      page.value += 1;
    };

    onMounted(async () => {
      const userRes = await fetchUser();
      user.value = userRes.response;
      await addProperties();
    });

    const handlePropertiesScroll = async e => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) await handlePropertiesMore();
    };

    const handlePropertiesMore = async () => {
      if (totalCount.value !== properties.length) {
        await addProperties();
      }
    };

    return {
      user,
      properties,
      handlePropertiesScroll,
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
  display: none;
  /* for Chrome, Safari, and Opera */
}
</style>
