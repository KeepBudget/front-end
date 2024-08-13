<template>
  <div id="items">
    <CommonBtn02
      :key="item.id"
      v-for="item in items"
      :name="item.name"
      :selectedId="selectedId"
      :id="item.id"
      @click="changeItem(item.id)"
    />
  </div>
</template>

<script>
import CommonBtn02 from '@/components/CommonBtn02.vue';
import { reactive } from 'vue';

export default {
  components: {
    CommonBtn02,
  },
  props: {
    selectedId: {
      type: Number,
    },
    items: {
      type: Array,
    },
  },
  emits: ['changeItem'],
  setup(props, context) {
    const changeItem = id => {
      context.emit('changeItem', id);
    };

    return { changeItem };
  },
};
</script>

<style scoped>
#items {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
}
</style>
