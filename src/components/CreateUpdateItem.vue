<template>
  <div>
    <form @submit.prevent="updateData ? updateItem() : createItem()">
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" maxlength="50" required v-model.lazy.trim="title">
        </div>
        <div class="form-group" v-if="showField">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" maxlength="200" rows="5" required v-model.lazy.trim="description"></textarea>
        </div>
        <div class="form-group">
            <label for="text">Text</label>
            <textarea class="form-control" id="text" maxlength="1000" rows="10" required v-model.lazy.trim="text"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          {{ updateData ? 'Update' : 'Create' }}
        </button>
        <button type="button" class="btn btn-primary" @click="$router.go(-1)">
          Cancel
        </button>
    </form>
  </div>
</template>

<script>

import { createItem, updateItem } from "../utils/itemActions";

export default {
  name: "CreateItem",

  data: function() {
    return {
      title: '',
      description: '',
      text: '',
      categoryId: null,
      updateData: null,
      showField: false
    };
  },
  
  methods: {
      createItem: function() {
          let data = {
              title: this.title,
              text: this.text,
              categoryId: this.categoryId
          };
          if (this.showField) {
            data.description = this.description;
          }
          createItem(this.showField, data)
            .then(res => {
              let name = this.showField ? 'article' : 'recipe';
              this.$router.push({ name, params: { id: res.data._id }});
            })
            .catch(error => {
                console.log(error);
            });
      },
      updateItem: function() {
        let data = {
              title: this.title,
              text: this.text,
              categoryId: this.categoryId,
              _id: this.updateData._id
          }
          if (this.showField) {
            data.description = this.description;
          }
          updateItem(this.showField, data)
            .then(res => {
              let name = this.showField ? 'article' : 'recipe';
              this.$router.push({ name, params: { id: res.data._id }});
            })
            .catch(error => {
                console.log(error);
            });
      }
  },
  created: function() {
    this.updateData = this.$store.state.itemData;
    if (this.updateData) {
      this.title = this.updateData.title;
      this.description = this.updateData.description;
      this.text = this.updateData.text;
      this.categoryId = this.updateData.categoryId;
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'recipes' || from.name === 'articles') {
        vm.categoryId = from.params.id;
      }
      if (from.name === 'articles' || from.name === 'article') {
        vm.showField = true;
      }
    });
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('clearUpdateData');
    next();
  }
};

</script>

<style lang="scss">
  form {
      width: 70%;
      margin: 0 auto;

      button {
          float: right;
          margin-left: 15px;
      }
  }
</style>