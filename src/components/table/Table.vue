

<template>
    <table class="table">
        <thead class="thead-light">
          <tr>
            <th v-for="item in items" :key="item.id">
                {{ item.label }}
              </th>
          </tr>
        </thead>
        <tbody>
            <TableBody/>
        </tbody>
      </table>
</template>
<script>
import { tableHeadItems } from '../../constants/tableHead';
import TableBody from './TableBody.vue';
    export default{
    data() {
        return {
            items: tableHeadItems
        };
    },
    components: { TableBody }
}
</script>
<style>
th{
    color: #55595c;
    font-family: Helvetica;
}
</style>