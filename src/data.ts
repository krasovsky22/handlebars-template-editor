export type TreeNodeType = {
  id: string;
  description: string;
  children?: TreeNodeType[];
};

export const ITEM_TYPE = 'TREE_NODE';

export const TreeData: TreeNodeType = {
  id: 'root',
  description: 'Root',
  children: [
    {
      id: '1',
      description: 'Child 1',
      children: [
        {
          id: 'grand-1',
          description: 'GrandChild 1',
        },
      ],
    },
    {
      id: '2',
      description: 'Child 2',
    },
    {
      id: '3',
      description: 'Child 3',
    },
    {
      id: '4',
      description: 'Child 4',
    },
  ],
};
