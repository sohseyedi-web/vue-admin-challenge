<template>
  <div>
    <div>
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th v-for="item in items" :key="item.id" :colspan="getColspan(item)" >
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="article.slug">
            <TableBody :index="index" :article="article"/>
          </tr>
        </tbody>
      </table>
    </div>
  </div>   
</template>
  
  <script>
  import { tableHeadItems } from '../../constants/tableHead';
  import TableBody from './TableBody.vue';
  import { getArticles } from '../../services/articleService';

  
  export default {
    data() {
      return {
        items: tableHeadItems,
        articles: [],
        itemsPerPage: 10,
        currentPage: 1,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.articles.articlesCount / this.itemsPerPage);
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.articles.articles?.slice(start, end);
      },
    },
    methods: {
      async getAllArticle() {
        try {
          const data = await getArticles();
          this.articles = data.articles;
            console.log(this.articles);
        } catch (error) {
          console.log(error);
        }
      },
      getColspan(item) {
      return item.label === 'Excerpt' ? 2 : 1;
    },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      
      
    },
    mounted() {
      this.getAllArticle();
    },
    components: { TableBody },
  };
  </script>
  
  <style>
  th {
    color: #55595c;
    font-family: Helvetica;
  }
  td{
    color : #373a3c;
  }
  </style>