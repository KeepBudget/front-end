<template>
  <div id="news-component">
    <div id="news-img">img</div>
    <div id="news-content">
      <div id="news-title">
        뉴스 제목 뉴스 제목 뉴스 제목 뉴스 제목 뉴스 제목 뉴스 제목 뉴스 제목
        뉴스 제목
      </div>
      <div id="news-summary">
        뉴스 요약~~뉴스 요약~~뉴스 요약~~뉴스 요약~~뉴스 요약~~뉴스 요약~~뉴스
        요약~~뉴스 요약~~뉴스 요약~~뉴스 요약~~뉴스 요약~~뉴스 요약~~
      </div>
      <div>(신문사) (신문시간)</div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
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
