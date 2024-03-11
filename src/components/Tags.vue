<template>
  <h6>Tags</h6>
  <div class="form-group text-left">
    <input
      type="text"
      id="title"
      class="form-control"
      placeholder="New tag"
    />
  </div>
  <div class="customBoxTags">
    
    <div v-for="tag in tagItems" class="form-check">
      <input class="form-check-input" type="checkbox" :value="tag"  id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        {{ tag }} {{ tags }}
      </label>
    </div>
  </div>
</template>
<script>
import { getAllTags } from '../services/tagsService';

export default {
  props:['@tags-selected'],
  data() {
    return {
      tagItems : [],
    }
  },
  methods: {
    async getTags(){
      try {
        const data = await getAllTags()
        console.log(this.prevTags);
        this.tagItems = data.tags
      } catch (error) {
        console.log(error);
      }
    },
    
  },
  
  mounted() {
    this.getTags()
  },
}
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
