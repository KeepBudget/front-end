<template>
  <input
    :type="type"
    :placeholder="placeHolder"
    @input="changeInput"
    :value="value"
  />
</template>

<script>
export default {
  props: {
    placeHolder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String || Number,
    },
  },
  emits: ['changeInput'],
  setup(props, context) {
    const changeInput = e => {
      context.emit('changeInput', e.target.value);
    };

    return { changeInput };
  },
};
</script>

<style scoped>
input {
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  text-align: center;
  font-size: larger;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
}

input::placeholder {
  color: #d5d5d5;
}

input:focus {
  outline: 1px solid #d5d5d5;
}
</style>
