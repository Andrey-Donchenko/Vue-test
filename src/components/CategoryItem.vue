<template>
    <li :class="model.root ? 'head-category' : ''">
        <div class="add-category-btn" v-if="model.root" @click="createRootCategory">
            <span>Create root category</span>
        </div>
        <div v-if="!model.root">
            <i 
                class="fa fa-times" 
                title="delete category"
                @click="deleteCategory">
            </i>
            <i 
                class="fa fa-pencil"
                title="edit category"
                @click="updateCategory">
            </i>
            <i 
                class="fa fa-plus"
                title="create subcategory"
                @click="createSubCategory">
            </i>
        </div>
        <router-link 
            :to="{ name: 'category', params: { id: model.id }}"
            v-if="!model.root">
            <div :class="isActive ? 'isActive' : ''">
                <div class="category-name" :title="model.name">{{model.name}}</div>
                <span> [{{model.toggled ? '-' : '+'}}] </span>
            </div>
        </router-link>
        <ul v-show="model.toggled">
          <category-item
              v-for="item in model.children"
              :model="item"
              :key="item.id"
              @categoryDelete="cutCategory">
          </category-item>
        </ul>
    </li>
</template>

<script>
import { deleteCategory } from "../API/categories";

export default {
  name: "CategoryItem",

  props: {
    model: Object
  },

  computed: {
    isActive: function() {
      if (this.$store.getters.currentCategory) {
        return this.$store.getters.currentCategory._id === this.model.id;
      } else {
        return null;
      }
    }
  },

  methods: {
    createRootCategory: function() {
      this.$store.commit("openModal", { id: null });
    },

    createSubCategory: function() {
      this.$store.commit("openModal", { id: this.model.id });
    },

    updateCategory: function() {
      this.$store.commit("openModal", this.model);
    },

    deleteCategory: function() {
      if (confirm("Are you sure?")) {
        deleteCategory(this.model.id)
          .then(res => {
            this.$emit("categoryDelete", this.model.id);
            if (!this.$route.path.includes("category")) {
              this.$router.push("/");
            } else {
              this.model.parentId
                ? this.$router.push({
                    name: "category",
                    params: { id: this.model.parentId }
                  })
                : this.$router.push("/");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    cutCategory: function(id) {
      this.model.children.forEach((el, i, arr) => {
        if (el.id === id) {
          arr.splice(i, 1);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
li {
  margin-bottom: 10px;

  > div {
    display: inline-block;
  }

  &.head-category {
    list-style: none;

    > div.add-category-btn {
      display: flex;
      justify-content: center;
      color: darkgreen;
      background: #ffffff;
      font-weight: bold;
      border: 2px solid darkgreen;
      padding: 10px;
      margin: 0 10% 20px;
      border-radius: 20px;
      cursor: pointer;

      &:hover {
        background: darkgreen;
        color: #fff;
      }
    }
  }

  i {
    margin-right: 10px;
    color: darkgray;
    cursor: pointer;

    &:hover {
      &.fa-times {
        color: darkred;
      }
      &.fa-pencil {
        color: darkgoldenrod;
      }
      &.fa-plus {
        color: darkgreen;
      }
    }
  }

  > ul {
    padding-left: 15px;

    a {
      margin-bottom: 10px;

      > div {
        display: inline-flex;
        align-items: center;

        .category-name {
          display: inline-block;
          max-width: 100px;
          text-overflow: ellipsis;
          overflow-x: hidden;
          margin-right: 5px;
        }
      }
    }
  }

  .isActive {
    font-weight: bold;
  }
}

ul {
  list-style-type: none;
}

a {
  display: inline-block;
  text-decoration: none;
  color: #000;
}
</style>