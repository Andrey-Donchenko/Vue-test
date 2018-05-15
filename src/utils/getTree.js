export const getTree = (parentList, data) => {
  if (!parentList) {
    parentList = data.filter(item => !item.isDeleted && item.parentId === null);
  }
  return parentList.map(item => {
    let childrenList = data.filter(el => !el.isDeleted && el.parentId === item._id);
    return {
      id: item._id,
      parentId: item.parentId,
      name: item.title,
      toggled: item.isActive ? true : false,
      children: (childrenList.length ? getTree(childrenList, data) : [])
    };
  });
}