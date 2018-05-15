<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item._id">
        <div>
          <router-link active-class="active" :to="{ name: redirectName, params: { id: item._id }}">
            {{item.title}}
          </router-link>
          <i 
            class="fa fa-pencil"
            title="edit category"
            @click="updateItem(item)">
          </i>
          <i 
            class="fa fa-trash-o" 
            title="delete category"
            @click="deleteItem(item._id)">
          </i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { deleteItem } from "../utils/itemActions";

export default {
  name: "ItemsList",

  computed: {
    items: function() {
      return this.$route.name === "recipes"
        ? this.$store.state.recipesList
        : this.$store.state.articlesList;
    },
    check: function() {
      return this.$route.name === "recipes" ? false : true;
    },
    redirectName: function() {
      return this.$route.name.slice(0, -1);
    }
  },

  methods: {
    getItems: function(name, id) {
      this.$store.dispatch("getItemsList", { name, id });
    },

    deleteItem: function(id) {
      if (confirm("Are you sure?")) {
        deleteItem(this.check, id)
          .then(res => {
            this.getItems(this.$route.name, this.$route.params.id);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    updateItem: function(item) {
      this.$store.commit("setUpdateData", item);
      this.$router.push({ name: "updateItem", params: { id: item._id } });
    }
  },

  created: function() {
    this.getItems(this.$route.name, this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      this.getItems(to.name, to.params.id);
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;

  li {
    padding: 15px;
    transition: background 300ms;

    &:hover {
      background: #dedede;
    }

    div {
      display: flex;
      justify-content: space-between;
    }

    a {
      margin-right: auto;
      text-decoration: none;
    }

    i {
      margin: 0 15px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        &.fa-trash-o {
          color: darkred;
        }
        &.fa-pencil {
          color: darkgoldenrod;
        }
      }
    }
  }
}
</style>
