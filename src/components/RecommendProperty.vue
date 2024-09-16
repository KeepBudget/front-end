<template>
  <div id="recommend-property-component">
    <div id="title">{{ property.buildingName }} {{ property.floor }} 층</div>
    <div>서울특별시 {{ property.address }}</div>
    <div>가격 : {{ changePriceFormat(property.price) }}원</div>
    <div>평수 : {{ property.size.toFixed(2) }}평</div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
    },
  },
  setup() {
    const changePriceFormat = price => {
      const hundredMillion = Math.floor(price / 10000);
      const tenThousand = price % 10000;
      let changedPriceFormat = '';
      if (hundredMillion !== 0) {
        changedPriceFormat += hundredMillion + '억 ';
      }
      if (tenThousand !== 0) {
        changedPriceFormat += tenThousand + '만';
      }
      return changedPriceFormat;
    };

    return {
      changePriceFormat,
    };
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
