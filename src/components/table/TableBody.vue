<template>
  <td class="col-1">{{ index + 1 }}</td>
  <td class="col-2">Soheil Seyyedi</td>
  <td class="col-2">@{{ article?.author?.username }}</td>
  <td class="col-1">@fat</td>
  <td class="col-4" colspan="2">{{ truncateTextBody(article?.body) }}</td>
  <td class="col-2">
    <span class="">{{ toLocalDateString(article?.createdAt) }}</span>
    <span class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ...
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button">Edit</button>
        <button class="dropdown-item" type="button">Delete</button>
      </div>
    </span>
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