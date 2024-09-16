<template>
  <div class="black-bg">
    <div class="white-bg">
      <CommonDistricts
        :selectedId="wishDistrictId"
        @changeItem="changeDistrict"
        :items="districts"
      />
      <CommonBtn01
        text="수정하기"
        :clickFunc="() => clickBtn(wishDistrictId)"
      />
    </div>
  </div>
</template>

<script>
import CommonBtn01 from '@/components/CommonBtn01.vue';
import { fetchDistricts } from '@/libs/apis/district';
import { onMounted, reactive, ref } from 'vue';
import CommonDistricts from './CommonDistricts.vue';
import { fetchUserRaw } from '@/libs/apis/user';

export default {
  components: {
    CommonBtn01,
    CommonDistricts,
  },
  props: {
    clickBtn: {
      type: Function,
    },
  },
  setup() {
    const wishDistrictId = ref(null);
    const districts = reactive([]);
    const changeDistrict = id => {
      wishDistrictId.value = id;
    };

    onMounted(async () => {
      const fetchedDistricts = await fetchDistricts();
      fetchedDistricts.response.forEach(district => {
        districts.push(district);
      });
      const userRes = await fetchUserRaw();
      wishDistrictId.value = userRes.response.wishDistrictId;
    });

    return {
      districts,
      wishDistrictId,
      changeDistrict,
    };
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
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-text {
  margin-bottom: 20px;
  font-size: larger;
  font-weight: bold;
}
</style>
