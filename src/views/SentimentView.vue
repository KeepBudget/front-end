<template>
  <CommonPopup :message="modalText" :clickBtn="modalFunc" v-if="isModal" />
  <UpdateDistrictModal :clickBtn="updateDistrictModalFunc" v-if="isUpdateDistrictModal" />
  <div id="sentiment-view">
    <CommonHeader />
    <div id="user">
      <div id="user-header">
        <div id="user-header-text">
          <span>{{ user.nickname }}님</span>의 희망지역
        </div>
        <img src="@/assets/png/userEdit.png" alt="editBtn" @click="editDistrictBtn"/>
      </div>
      <div id="user-body">
        <div id="user-body-text">
          <div>서울시 {{ user.wishDistrict }}</div>
        </div>
      </div>
    </div>
    <vc-donut :sections="sections" size="200" thickness="30" foreground="grey" total="1"
      @section-click="handleSectionClick">
      {{
        selectedSection.label.charAt(0).toUpperCase() +
        selectedSection.label.slice(1)
      }}
    </vc-donut>
    <div id="news-list" @scroll="handleNewsListScroll">
      <NewsComponent v-for="news in newsList" :key="news.id" :news="news" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonPopup from '@/components/CommonPopup.vue';
import NewsComponent from '@/components/NewsComponent.vue';
import UpdateDistrictModal from '@/components/UpdateDistrictModal.vue';
import { fetchNewsList, fetchNewsSentiment } from '@/libs/apis/news';
import { fetchUser, updateUserWishDistrict } from '@/libs/apis/user';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    CommonHeader,
    NewsComponent,
    UpdateDistrictModal,
    CommonPopup,
  },
  setup() {
    const router = useRouter();

    const user = ref({});
    const newsList = reactive([]);
    const page = ref(1);
    const totalCount = ref(null);

    const sections = reactive([
      { label: 'negative', value: 0.25, color: '#ff4560' },
      { label: 'neutral', value: 0.25, color: '#ffb01a' },
      { label: 'positive', value: 0.5, color: '#008ffb' },
    ]);

    const selectedSection = ref(sections[1]);

    const addNewsList = async () => {
      const fetchedNewsList = await fetchNewsList(
        page.value,
        20,
        'PROPERTY',
        selectedSection.value.label.toUpperCase(),
      );
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
      const fetchedNewsSentiment = await fetchNewsSentiment();
      sections.forEach(section => {
        if (fetchedNewsSentiment.response[section.label] !== undefined) {
          section.value = fetchedNewsSentiment.response[section.label];
        }
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

    const handleSectionClick = async section => {
      selectedSection.value = section;
      newsList.length = 0;
      page.value = 1;
      await addNewsList();
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
      sections,
      selectedSection,
      handleSectionClick,
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
#sentiment-view {
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

#sentiment-news-chart {
  width: 100%;
  height: 200px;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
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
