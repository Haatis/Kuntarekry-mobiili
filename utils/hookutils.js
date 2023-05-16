export function flattenItems(items) {
  const parentItems = [];
  const childItems = [];
  items.forEach((item) => {
    if (item.childs) {
      childItems.push(...item.childs);
      delete item.childs;
      parentItems.push(item);
    } else {
      childItems.push(item);
    }
  });
  // Remove child items which have the same ID as the parent item for onboarding dropdown.
  // Reverse array to fix this issue: https://github.com/hossein-zare/react-native-dropdown-picker/issues/387
  const childItemsWithoutDuplicates = childItems.filter((item) => item?.order !== -1).reverse();
  return parentItems.concat(childItemsWithoutDuplicates);
}

export function addParentToChilds(items, parentId) {
  let currentParentId = parentId ?? null;

  return items.map((item) => {
    if (item.childs) {
      currentParentId = item.id;
      addParentToChilds(item.childs, currentParentId);
      return item;
    } else {
      item.parent = currentParentId;
      return item;
    }
  });
}
