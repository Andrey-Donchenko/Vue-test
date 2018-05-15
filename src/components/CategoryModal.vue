<template>
     <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              {{isNew ? 'Create' : 'Update'}} category
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <input type="text" class="form-control" maxlength="20" v-model.lazy.trim="category.name">  
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary modal-default-button" @click="isNew ? createCategory() : updateCategory()">
                {{isNew ? 'Create' : 'Update'}}
              </button>
              <button class="btn btn-default modal-default-button" @click="closeModal">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createCategory, updateCategory } from "../API/categories";

export default {
  name: "CategoryModal",

  data: function() {
    return {
      category: {},
      isNew: true
    };
  },

  methods: {
    createCategory: function() {
      let data = {
        title: this.category.name,
        parentId: this.category.id
      };
      createCategory(data)
        .then(res => {
          let newCategory = {
            id: res.data._id,
            name: res.data.title,
            toggled: false,
            children: []
          };
          if (!data.parentId) {
            newCategory.parentId = null;
            this.$store.commit("addRootCategory", newCategory);
          } else {
            newCategory.parentId = res.data.parentId;
            this.$store.commit("changeCategoryTree", {
              action: "create",
              data: newCategory
            });
          }
          this.$store.commit("closeModal");
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateCategory: function() {
      let data = {
        _id: this.category.id,
        title: this.category.name,
        parentId: this.category.parentId
      };
      updateCategory(data)
        .then(res => {
          this.$store.commit("changeCategoryTree", {
            action: "update",
            data: res.data
          });
          this.$store.commit("closeModal");
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeModal: function() {
      this.$store.commit("closeModal");
    }
  },

  created: function() {
    this.category = Object.assign({}, this.$store.state.categoryData);
    if (this.$store.state.categoryData.name) {
      this.isNew = false;
    }
  }
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  font-weight: bold;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
button {
  margin-left: 20px;
}
</style>