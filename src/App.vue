<template>
  <div id="app">
    <header>
      <bread-crumb></bread-crumb>
    </header>
    <div class="content">
      <nav>
        <div>categories</div>
        <ul>
          <category-item :model="treeData"></category-item>
        </ul>
      </nav>
      <section>
        <router-view></router-view>
      </section>
    </div>
    <category-modal v-if="showModal"></category-modal>
  </div>
</template>

<script>
import CategoryModal from "./components/CategoryModal";
import CategoryItem from "./components/CategoryItem";
import BreadCrumb from "./components/BreadCrumb";

export default {
  name: "app",

  components: {
    "category-item": CategoryItem,
    "bread-crumb": BreadCrumb,
    "category-modal": CategoryModal
  },

  computed: {
    showModal: function() {
      return this.$store.state.showModal;
    },
    treeData: function() {
      return this.$store.state.treeData;
    }
  }
};
</script>

<style lang="scss">
#app {
  header {
    padding: 30px;
    border-bottom: 1px solid #000;
    background: #e4e5e5;
  }

  .content {
    display: flex;
    height: calc(100vh - 81px);

    > * {
      padding: 20px;
    }

    nav {
      border-right: 1px solid #000;
      background: #fff9cd;

      > div {
        text-align: center;
        padding: 15px 0;
        font-weight: bold;
        text-transform: uppercase;
        background: lightblue;
        margin-bottom: 20px;
      }

      > ul {
        padding-left: 0;
        line-height: 1.5em;
      }
    }

    section {
      flex: 4;
    }
  }
}
</style>
