<template>
  <div id="sentiment-view">
    <CommonHeader />
    <div id="user">
      <div id="user-header">
        <div id="user-header-text"><span>홍길동님</span>의 희망지역</div>
        <img src="@/assets/png/userEdit.png" alt="editBtn" />
      </div>
      <div id="user-body">
        <div id="user-body-text">
          <div>서울시 강남구</div>
        </div>
      </div>
    </div>
    <div id="sentiment-news-chart">차트 넣기</div>
    <div id="news-list">
      <NewsComponent />
      <NewsComponent />
      <NewsComponent />
      <NewsComponent />
      <NewsComponent />
      <NewsComponent />
      <NewsComponent />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import NewsComponent from '@/components/NewsComponent.vue';

export default {
  components: {
    CommonHeader,
    NewsComponent,
  },
  setup() {
    return {};
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
