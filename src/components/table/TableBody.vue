<template>
  <td>{{ index + 1 }}</td>
  <td class="col-2">Soheil Seyyedi</td>
  <td class="col-2">@{{ article?.author?.username }}</td>
  <td class="col-1">
    <div class="dropdown">
      <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        tags
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
        <span class="d-block ml-1" v-for="tag in article?.tagList" :key="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </td>
  <td class="col-4" colspan="2">{{ truncateTextBody(article?.body) }}</td>
  <td class="col-2 d-flex">
    <!-- <span class="mr-2">{{ toLocalDateString(article?.createdAt) }}</span> -->
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ...
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
        <router-link
            :to="'/articles/edit/' + article?.slug"
            class="ml-2"
            style="color:#373a3c ;"
          >
            Edit
          </router-link>
        <div class="dropdown-divider"></div>
        <span class="ml-2" style="color:#373a3c ;cursor: pointer;">Delete</span>
      </div>
    </div>
  </td>
        
      
</template>
<script>
  import {truncateText} from '../../utils/truncateText';
  import {toLocalDate} from '../../utils/toLocalDate';
import Modal from '../Modal.vue';
import Tags from '../Tags.vue';
export default{
    props: ['index', 'article'],
    methods: {
        truncateTextBody(value) {
            return truncateText(value);
        },
        toLocalDateString(value) {
            return toLocalDate(value);
        },
    },
    components: { Modal, Tags }
}
</script>
<style>
</style>