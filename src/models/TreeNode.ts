import { cast, IAnyModelType, Instance, types } from 'mobx-state-tree';

const TreeNodeModel = types
  .model('TreeNode', {
    id: types.identifierNumber,
    name: types.string,
    description: types.maybeNull(types.string),
    content: types.optional(types.string, ''),
    children: types.array(
      types.safeReference(types.late((): IAnyModelType => TreeNodeModel))
    ),
    parent: types.maybeNull(
      types.safeReference(types.late((): IAnyModelType => TreeNodeModel))
    ),
    isDroppable: true,
  })
  .actions((self) => ({
    setChildren(childrenIds: number[]) {
      self.children = cast(childrenIds);
    },
    setIsDroppable(isDroppable: boolean) {
      self.isDroppable = isDroppable;
    },
  }))
  .views((self) => ({
    get isRoot() {
      return self.parent === null;
    },

    get type() {
      return 'TreeNode';
    },

    get nodeIndexInParentNode(): number | null {
      if (!self.parent) {
        return null;
      }

      return self.parent.children.findIndex(
        (node: TreeNodeModelType) => node.id === self.id
      );
    },
  }));

export type TreeNodeModelType = Instance<typeof TreeNodeModel>;

export default TreeNodeModel;
