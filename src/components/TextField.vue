<template>
  <div class="form-group text-left mb-4 postion-relative">
    <label :for="name" :class="inputError ? 'err' : 'textInput'"
      >{{ label }}:</label
    >
    <input
      :type="type"
      :id="name"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue',$event.target.value)"
      class="form-control"
      :class="inputError ? 'borderErr' : 'borderSucc'"
      style="height: 40px"
    />
    <span v-if="inputError" class="err position-absolute">{{
      inputError
    }}</span>
  </div>
</template>
<script>
export default {
  props: ["name", "label", "modelValue", "inputError",'type'],
  
};
</script>
<style></style>
