<template>
    <AppLayout>
        <h3 class="title">All Articles</h3>
        <Table/>
    </AppLayout>
</template>

<script>
import AppLayout from '../../components/appLayout/AppLayout.vue';
import Table from '../../components/table/Table.vue';
export default{
        components:{ AppLayout, Table }
    }
</script>
<style>
.title{
    font-size: 2.5rem;
  color: #000;
}
</style>