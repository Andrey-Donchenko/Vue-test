<template>
  <div class="item-info">
    <div class="item-content">
      <div>
        <label for="title">Title</label>
        <h3 id="title">{{ item.title }}</h3>
      </div>
      <div v-if="showField">
        <label for="description">Description</label>
        <p id="text">{{ item.description }}</p>
      </div>
      <div>
        <label for="text">Text</label>
        <p id="text">{{ item.text }}</p>
      </div>
    </div>
    <div class="action-btn">
      <button @click="updateItem" title="edit item">
        <i 
          class="fa fa-pencil"
          title="edit category">
        </i>
      </button>
      <button @click="deleteItem" title="delete item">
        <i 
          class="fa fa-trash-o"
          title="edit category">
        </i>
      </button>
    </div>
  </div>
</template>

<script>
import { deleteItem } from "../utils/itemActions";

export default {
  name: "ItemInfo",

  computed: {
    item: function() {
      return this.$route.name === "recipe"
        ? this.$store.state.recipe
        : this.$store.state.article;
    },
    showField: function() {
      return this.$route.name === "recipe" ? false : true;
    }
  },
  methods: {
    updateItem: function() {
      this.$store.commit("setUpdateData", this.item);
      this.$router.push({ name: "updateItem", params: { id: this.item._id } });
    },
    deleteItem: function() {
      if (confirm("Are you sure?")) {
        deleteItem(this.showField, this.item._id)
          .then(res => {
            let name = this.showField ? "articles" : "recipes";
            this.$router.push({ name, params: { id: this.item.categoryId } });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  created: function() {
    this.$store.dispatch("getItem", {
      name: this.$route.name,
      id: this.$route.params.id
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("clearItemData", this.$route.name);
    next();
  }
};
</script>

<style scoped lang="scss">
.item-info {
  width: 70%;
  margin: 0 auto;

  .item-content {
    margin-bottom: 30px;

    h3 {
      margin-top: 0;
    }

    h3,
    p {
      white-space: pre-wrap;
      padding: 20px;
      border: 1px dashed green;
    }
  }

  .action-btn {
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 30px;
      padding: 10px 15px;

      &:hover {
        .fa-trash-o {
          color: darkred;
        }
        .fa-pencil {
          color: darkgoldenrod;
        }
      }
    }
  }
}
</style>