<template>
  <div id="btn01" @click="clickFunc">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    clickFunc: {
      type: Function,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
#btn01 {
  width: 100%;
  height: 40px;
  background-color: #60584c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  margin-top: 12px;
  border-radius: 5px;
  font-weight: bold;
}
</style>
