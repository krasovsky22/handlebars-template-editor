import TreeNodeModel, { TreeNodeModelType } from '@/models/TreeNode';
import { cast, Instance, types } from 'mobx-state-tree';
import { TreeData } from './snapshots/treeData';

const AppStore = types
  .model('AppStore', {
    treeNodes: types.array(TreeNodeModel),
    root: types.maybeNull(types.late(() => types.safeReference(TreeNodeModel))),
  })
  .actions((self) => ({
    afterCreate() {
      self.treeNodes = cast(TreeData);

      //set root
      self.root = self.treeNodes.find((treeNode) => treeNode.isRoot) ?? null;
    },

    moveTreeNodes(
      dragNodeSnapshot: TreeNodeModelType,
      hoverNode: TreeNodeModelType
    ) {
      const dragNode = self.treeNodes.find(
        (node) => node.id === dragNodeSnapshot.id
      );

      console.log('move', dragNode?.id, hoverNode.id);
      if (!dragNode) {
        return;
      }

      const hoverNodeParent = hoverNode.parent;
      const dragNodeParent = dragNode.parent;

      //cannot hover into root
      if (!hoverNodeParent || !dragNodeParent) {
        return;
      }

      const hoverNodeIndex = hoverNode.nodeIndexInParentNode;

      if (hoverNodeParent.id !== null && hoverNodeIndex !== null) {
        //clone hover nodes
        const newChildren = Array.from(
          hoverNodeParent.children.map((child: TreeNodeModelType) => child.id)
        );

        //check if dragabble node belongs to same parent
        const dragNodeIndex = newChildren.findIndex(
          (childId) => childId === dragNode.id
        );

        //it not in hover, add it
        if (dragNodeIndex === -1) {
          console.log('adding');
          newChildren.splice(hoverNodeIndex, 0, dragNode.id);
          dragNode.parent = hoverNodeParent;

          //remove from original parent
          dragNodeParent.setChildren([
            ...dragNodeParent.children.filter(
              (child: TreeNodeModelType) => child.id !== dragNode.id
            ),
          ]);
        } else {
          console.log('swapping');
          newChildren.splice(dragNodeIndex, 1, hoverNode.id);
          newChildren.splice(hoverNodeIndex, 1, dragNode.id);
        }

        //set new children
        hoverNodeParent.setChildren(newChildren);
      }
    },
  }));

export const APP_STORE: Readonly<string> = AppStore.name;
export type AppStoreType = Instance<typeof AppStore>;

export default AppStore;
