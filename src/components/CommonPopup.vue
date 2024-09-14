<template>
  <div class="black-bg">
    <div class="white-bg">
      <p class="modal-text">{{ message }}</p>
      <CommonBtn01 text="확인" :clickFunc="clickBtn" />
    </div>
  </div>
</template>

<script>
import CommonBtn01 from '@/components/CommonBtn01.vue';

export default {
  components: {
    CommonBtn01,
  },
  props: {
    message: {
      type: String,
    },
    clickBtn: {
      type: Function,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.white-bg {
  width: 90%;
  background: white;
  border-radius: 10px;
  padding: 10px;
}

.modal-text {
  margin-bottom: 20px;
  font-size: larger;
  font-weight: bold;
}
</style>
