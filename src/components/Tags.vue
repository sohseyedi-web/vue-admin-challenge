<template>
  <h6>Tags</h6>
  <div class="form-group text-left">
    <input type="text" id="title" class="form-control" placeholder="New tag" />
  </div>
  <div class="customBoxTags" :class="inputError ? 'borderErr' : 'borderSucc'">
    <div v-if="!isLoading" v-for="(tag, index) in tagItems" class="form-check">
      <input
        class="form-check-input"
        name="tagList"
        type="checkbox"
        :value="tag"
        @change="$emit(`update:modelValue[${index}]`, $event.target.value)"
        :id="'tagCheckbox_' + tag"
        @blur="validate(name)"
        @keypress="validate(name)"
      />
      <label class="form-check-label" :for="'tagCheckbox_' + tag">
        {{ tag }}
      </label>
    </div>
    <span v-if="!!inputError" class="err position-absolute">{{
      inputError
    }}</span>
    <pulse-loader
      :loading="isLoading"
      color="#1c7cd5"
      size=".5rem"
    ></pulse-loader>
  </div>
</template>
<script>
import { getAllTags } from "../services/tagsService";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  props: ["inputError", "validate", "name", "label"],
  data() {
    return {
      tagItems: [],
      isLoading: false,
    };
  },
  methods: {
    async getTags() {
      this.isLoading = true;
      try {
        const data = await getAllTags();
        this.tagItems = data.tags;
        this.tagItems.sort((a, b) => a.localeCompare(b));
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    validateField(field) {
      this.validate(field);
    },
  },

  mounted() {
    this.getTags();
  },
  components: {
    PulseLoader,
  },
};
</script>
<style>
.customBoxTags {
  height: 355px;
  padding: 1rem 1.05rem;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #fff;
}
</style>
