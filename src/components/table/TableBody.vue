<template>
  <td>{{ index + 1 }}</td>
  <td class="col-2">Soheil Seyyedi</td>
  <td class="col-2">@{{ article?.author?.username }}</td>
  <td class="col-1">@fat</td>
  <td class="col-4" colspan="2">{{ truncateTextBody(article?.body) }}</td>
  <td class="col-2 d-flex">
    <span class="mr-2">{{ toLocalDateString(article?.createdAt) }}</span>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ...
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
        <button class="dropdown-item" type="button">Edit</button>
        <div class="dropdown-divider"></div>
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