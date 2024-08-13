<template>
  <div id="btn02" :class="classFunc()">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    selectedId: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  setup(props) {
    const classFunc = () => {
      return props.selectedId === props.id ? 'select' : 'not-select';
    };
    return {
      classFunc,
    };
  },
};
</script>

<style scoped>
#btn02 {
  border: 1px solid #d5d5d5;
  color: #d5d5d5;
  padding: 4px 10px;
  display: inline;
  font-size: medium;
  width: fit-content;
  border-radius: 20px;
  font-weight: 600;
}

.not-select {
  border: 1px solid #d5d5d5;
  background-color: white;
  color: #d5d5d5;
}

.select {
  background-color: #60584c;
  color: white;
}
</style>
