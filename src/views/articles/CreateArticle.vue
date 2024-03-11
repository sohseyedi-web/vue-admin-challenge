<template>
    <AppLayout>
        <ArticleForm text="New Article"/>
    </AppLayout>
</template>

<script>
import AppLayout from '../../components/appLayout/AppLayout.vue';
import ArticleForm from '../../components/ArticleForm.vue';
export default{
        components:{ AppLayout, ArticleForm }
    }
</script>