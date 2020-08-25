export const TreeData = [
  {
    id: 0,
    name: 'root',
    description: 'Root',
    parent: null,
    children: [1, 2, 3, 4],
  },
  {
    id: 1,
    name: 'child-1',
    description: 'Child 1',
    children: [5, 6],
    parent: 0,
  },
  {
    id: 2,
    name: 'child-2',
    description: 'Child 2',
    parent: 0,
  },
  {
    id: 3,
    name: 'child-3',
    description: 'Child 3',
    parent: 0,
  },
  {
    id: 4,
    name: 'child-4',
    description: 'Child 4',
    parent: 0,
  },
  {
    id: 5,
    name: 'grandchild-1',
    description: 'GrandChild 1',
    parent: 1,
  },
  {
    id: 6,
    name: 'grandchild-2',
    description: 'GrandChild 2',
    parent: 1,
  },
];
