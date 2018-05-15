export default {

    setTreeData(state, data) {
        state.treeData.children = data;
    },

    addRootCategory(state, data) {
        state.treeData.children.push(data);
    },

    openModal(state, data) {
        state.showModal = true;
        if (data) {
            state.categoryData = data;
        }
    },

    closeModal(state) {
        state.showModal = false;
        state.categoryData = {};
    },

    changeCategoryList(state, data) {
        state.categoryList = data;
    },

    clearCategoryList(state) {
        state.categoryList = [];
    },

    changeCategoryTree(state, payload) {
        switch (payload.action) {
            case 'create':
                createRecursive(state.treeData.children, payload.data);
                break;
            case 'update':
                updateRecursive(state.treeData.children, payload.data)
                break;
            case 'delete':
                state.article = {};
                break;
            default:
                break;
        };
        state.treeData.children;
    }
}

function createRecursive(children, data) {
    children.forEach(el => {
        if (el.id === data.parentId) {
            el.children.push(data);
            return;
        } else {
            createRecursive(el.children, data);
        }
    })
}

function updateRecursive(children, data) {
    children.forEach(el => {
        if (el.id === data._id) {
            el.name = data.title;
            return;
        } else {
            updateRecursive(el.children, data);
        }
    })
}