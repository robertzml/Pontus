// 辅助工具类

export default {
  treeListTransform(source) {
    let tree = []

    for (let i = 0; i < source.length; i++) {
      for (let j = i; j < source.length; j++) {
        if (source[j].parentId == source[i].id) {
          if (source[i].children == undefined) {
            source[i].children = []
          }
          source[i].children.push(source[j])
        } else if (source[j].id == source[i].parentId) {
          if (source[j].children == undefined) {
            source[j].children = []
          }
          source[j].children.push(source[i])
        }
      }
      if (source[i].parentId == null) {
        tree.push(source[i])
      }
    }

    return tree
  }
}
