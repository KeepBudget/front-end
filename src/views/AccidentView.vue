<template>
  <CommonPopup :message="modalText" :clickBtn="modalFunc" v-if="isModal" />
  <UpdateDistrictModal
    :clickBtn="updateDistrictModalFunc"
    v-if="isUpdateDistrictModal"
  />
  <div id="accident-view">
    <CommonHeader />
    <div id="user">
      <div id="user-header">
        <div id="user-header-text">
          <span>{{ user.nickname }}님</span>의 희망지역
        </div>
        <img
          src="@/assets/png/userEdit.png"
          alt="editBtn"
          @click="editDistrictBtn"
        />
      </div>
      <div id="user-body">
        <div id="user-body-text">
          <div>서울시 {{ user.wishDistrict }}</div>
        </div>
      </div>
    </div>
    <vue3-word-cloud
      style="height: 200px; width: 100%; padding: 3px"
      :words="keywords"
      :color="([, weight]) => colorByWeight(weight)"
      font-family="Roboto"
      :font-size-ratio="Number(3)"
    />
    <div id="news-list" @scroll="handleNewsListScroll">
      <NewsComponent v-for="news in newsList" :key="news.id" :news="news" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import NewsComponent from '@/components/NewsComponent.vue';
import UpdateDistrictModal from '@/components/UpdateDistrictModal.vue';
import { fetchNewsKeywords, fetchNewsList } from '@/libs/apis/news';
import { fetchUser, updateUserWishDistrict } from '@/libs/apis/user';
import { onMounted, reactive, ref } from 'vue';
import vue3WordCloud from 'vue3-word-cloud';
import CommonPopup from '@/components/CommonPopup.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    CommonHeader,
    NewsComponent,
    vue3WordCloud,
    UpdateDistrictModal,
    CommonPopup,
  },
  setup() {
    const router = useRouter();

    const user = ref({});
    const newsList = reactive([]);
    const page = ref(1);
    const totalCount = ref(null);
    const keywords = reactive([]);

    const addNewsList = async () => {
      const fetchedNewsList = await fetchNewsList(page.value, 20, 'ACCIDENT');
      totalCount.value = fetchedNewsList.response.pageNation.totalCount;
      fetchedNewsList.response.news.forEach(news => {
        newsList.push(news);
      });
      page.value += 1;
    };

    onMounted(async () => {
      const userRes = await fetchUser();
      user.value = userRes.response;
      await addNewsList();
      const fetchedNewsKeywords = await fetchNewsKeywords();
      fetchedNewsKeywords.response.forEach(news => {
        keywords.push([news.name, Number(news.value)]);
      });
    });

    const handleNewsListScroll = async e => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) await handleNewsListMore();
    };

    const handleNewsListMore = async () => {
      if (totalCount.value !== newsList.length) {
        await addNewsList();
      }
    };

    const kbColors = [
      '#f8a809',
      '#fab806',
      '#6e6153',
      '#4a483f',
      '#816843',
      '#848687',
    ];

    const colorByWeight = weight => {
      const randomIndex = Math.floor(Math.random() * kbColors.length);
      return kbColors[randomIndex];
    };

    const editDistrictBtn = () => {
      isUpdateDistrictModal.value = true;
    };

    const isModal = ref(false);
    const modalText = ref('');
    const modalFunc = () => {
      isModal.value = false;
    };

    const isUpdateDistrictModal = ref(false);
    const updateDistrictModalFunc = async wishDistrictId => {
      const res = await updateUserWishDistrict(wishDistrictId);
      if (res.success) {
        isUpdateDistrictModal.value = false;
        router.go(0);
      } else {
        isModal.value = true;
        modalText.value = res.error.errorMessage;
      }
    };

    return {
      user,
      newsList,
      handleNewsListScroll,
      keywords,
      colorByWeight,
      isUpdateDistrictModal,
      updateDistrictModalFunc,
      editDistrictBtn,
      isModal,
      modalText,
      modalFunc,
    };
  },
};
</script>

<style scoped>
#accident-view {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #f5f5f5 15%, white 15%);
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

#accident-keyword {
  width: 100%;
  height: 200px;
}

#news-list {
  height: 420px;
  overflow: scroll;
}

#news-list::-webkit-scrollbar {
  display: none;
  /* for Chrome, Safari, and Opera */
}
</style>
