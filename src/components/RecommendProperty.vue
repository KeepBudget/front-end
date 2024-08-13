<template>
  <div id="recommend-property-component">
    <div id="title">한신타워 8층</div>
    <div>서울특별시 서초구 잠원동 장원로 3길 8</div>
    <div>가격 : 0억 0000만원</div>
    <div>평수 : 00.00평</div>
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
#recommend-property-component {
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#title {
  font-size: large;
  font-weight: bold;
}
</style>
