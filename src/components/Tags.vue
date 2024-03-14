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
        :checked="isChecked[tag]"
        @change="updateInput($event, tag)"
        :id="'tagCheckbox_' + tag"
        @blur="validate('tagList')"
        @keypress="validate('tagList')"
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
  props: {
    inputError: {
      type: String,
      default: null,
    },
    validate: {
      type: Function,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Array, Boolean],
      default: null,
    },
    trueValue: {
      type: [String, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      tagItems: [],
      isLoading: false,
    };
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    async getTags() {
      this.isLoading = true;
      try {
        const data = await getAllTags();
        this.tagItems = data.tags;
        this.tagItems.sort((a, b) => a.localeCompare(b));
        this.tagItems.forEach((tag) => {
          if (
            this.modelValue instanceof Array &&
            this.modelValue.includes(tag)
          ) {
            this.$set(this.isChecked, tag, true);
          } else if (this.modelValue === tag) {
            this.$set(this.isChecked, tag, true);
          } else {
            this.$set(this.isChecked, tag, false);
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    updateInput(event, tag) {
      const isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(tag);
        } else {
          const index = newValue.indexOf(tag);
          if (index > -1) {
            newValue.splice(index, 1);
          }
        }
        this.$emit("update:modelValue", newValue);
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
