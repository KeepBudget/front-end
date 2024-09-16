<template>
  <div id="news-component" @click="clickNewsComponent(news.originUrl)">
    <template v-if="news">
      <img id="news-img" :src="news.imgUrl" />
    </template>
    <div id="news-content">
      <div id="news-title">
        {{ news.title }}
      </div>
      <div id="news-summary">
        {{ news.summary }}
      </div>
      <div>{{ news.press }} {{ changeNewsFormat(news.date) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
    },
  },
  setup() {
    const changeNewsFormat = newsDate => {
      const date = new Date(newsDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `⏲️ ${year}.${month}.${day}. ${hours}:${minutes}`;
    };

    const clickNewsComponent = originUrl => {
      window.open(originUrl, '_blank');
    };
    return {
      changeNewsFormat,
      clickNewsComponent,
    };
  },
};
</script>

<style scoped>
#news-component {
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2px;
  display: flex;
  align-items: center;
  gap: 5px;
}

#news-img {
  width: 70px;
  height: 70px;
  background-color: #e5e5e5;
}

#news-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  font-size: small;
}

#news-title {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 5px;
}

#news-summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
</style>
