<template>
  <td class="col-1">{{ index + 1 }}</td>
  <td class="col-2">Soheil Seyyedi</td>
  <td class="col-2">@{{ article?.author?.username }}</td>
  <td class="col-1">@fat</td>
  <td class="col-4" colspan="2">{{ truncateTextBody(article?.body) }}</td>
  <td class="col-2">
    <span class="">{{ toLocalDateString(article?.createdAt) }}</span>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ...
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a  class="dropdown-item text-left" href="#">Something else here</a>
      </div>
    </div>
  </td>
        
      
</template>
<script>
  import {truncateText} from '../../utils/truncateText';
  import {toLocalDate} from '../../utils/toLocalDate';
export default{
  
  props:['index','article'],
  methods: {
    truncateTextBody(value){
        return truncateText(value)
      },
      toLocalDateString(value){
        return toLocalDate(value)
      },
  },
}
</script>
<style>
</style>