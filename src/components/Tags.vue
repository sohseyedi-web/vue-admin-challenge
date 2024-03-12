<template>
  <h6>Tags</h6>
  <div class="form-group text-left">
    <input type="text" id="title" class="form-control" placeholder="New tag" />
  </div>
  <div class="customBoxTags">
    <div v-for="tag in tagItems" class="form-check">
      
      <input
        class="form-check-input"
        type="checkbox"
        :value="tag"
        @change="addTags(tag)"
        id="flexCheckDefault"
      />
      <label class="form-check-label" for="flexCheckDefault">
        {{ tag }}
      </label>
    </div>
  </div>
</template>
<script>
import { getAllTags } from "../services/tagsService";

export default {
  props: ["tagList"],
  data() {
    return {
      tagItems: [],
      prevTags : this.tagList
    };
  },
  methods: {
    async getTags() {
      try {
        const data = await getAllTags();
        this.tagItems = data.tags;
      } catch (error) {
        console.log(error);
      }
    },
    addTags(tag){
      this.prevTags.push(tag)
    }
  },

  mounted() {
    this.getTags();
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
