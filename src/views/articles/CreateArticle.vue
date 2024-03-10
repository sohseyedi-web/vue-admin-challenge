<template>
    <AppLayout>
        <ArticleFrom text="New Article"/>
    </AppLayout>
</template>

<script>
import AppLayout from '../../components/appLayout/AppLayout.vue';
import ArticleFrom from '../../components/ArticleFrom.vue';
export default{
        components:{ AppLayout, ArticleFrom }
    }
</script>