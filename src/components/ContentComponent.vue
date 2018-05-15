<template>
  <div>
    <div class="nav-link">
      <router-link class="btn btn-default" active-class="btn-success" :to="{ name: 'recipes'}">Recipes</router-link>
      <router-link class="btn btn-default" active-class="btn-success" :to="{ name: 'articles'}">Articles</router-link>
    </div>
    <router-link class="btn btn-warning" :to="{ name: 'createItem' }">
      Create {{routeName}}
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "ContentComponent",
  data: function() {
    return {
      name: '',
      categoryId: null
    }
  },
  computed: {
    routeName: function() {
      return this.name.slice(0, -1);
    }
  },
  created: function() {
    this.name = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.categoryId = to.params.id;
      this.name = to.name;
    }
  }
};
</script>

<style scoped lang="scss">
  .nav-link {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    a {
      margin: 0 15px;
    }
  }

  a.btn-warning {
    margin-bottom: 20px;
  }
</style>