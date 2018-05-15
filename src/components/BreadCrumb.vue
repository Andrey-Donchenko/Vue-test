<template>
<div>
    <router-link class="root-crumb" to="/">
        ROOT /
    </router-link>
    <div
    class="crumbs"
    v-for="category in categoryList"
    :key="category._id">
      <router-link :to="{ name: 'category', params: { id: category._id }}">
          {{category.title}}
      </router-link>
      <span>/</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",

  computed: {
    categoryList: function() {
      return this.$store.state.categoryList;
    }
  },
  watch: {
    $route(to, from) {
      if (!to.name) {
        this.$store.commit("clearCategoryList");
        this.$store.dispatch("getTreeData");
      } else if (
        to.params.id !== from.params.id &&
        to.path.includes("category")
      ) {
        this.$store.dispatch("getCategoryList", {
          name: to.name,
          id: to.params.id
        });
      }
    }
  },
  created: function() {
    this.$store.dispatch("getTreeData");
  }
};
</script>

<style scoped lang="scss">
.root-crumb {
  color: brown;
  font-weight: bold;
}
.crumbs {
  display: inline-block;
  &:last-child {
    font-weight: bold;
  }
}
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  font-weight: bold;
}
</style>
