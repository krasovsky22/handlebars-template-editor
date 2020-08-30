import useStore from '@/hooks/useStore';
import { TreeNodeModelType } from '@/models/TreeNode';
import { APP_STORE } from '@/stores/AppStore';
import { debounce as _debounce } from 'lodash';
import React, { useRef, memo } from 'react';
import {
  DragObjectWithType,
  DragSourceMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';

interface DraggableWrapperProps {
  children: (arg1: DraggableWrapperPassPropsType) => React.ReactNode;
  node: TreeNodeModelType;
}

export type DraggableWrapperPassPropsType = {
  node: TreeNodeModelType;
  isDragging: boolean;
  isOverCurrent: boolean;
};

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  node,
  children,
}: DraggableWrapperProps) => {
  const { moveTreeNodes, addTreeNode } = useStore(APP_STORE);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: node.type,
    hover: _debounce(
      (item: DragObjectWithType & TreeNodeModelType, monitor) => {
        if (!ref.current || isOverCurrent === false) {
          return;
        }

        const dragId = item.id;
        const hoverId = node.id;

        //if hovering itself
        if (dragId === hoverId) {
          return;
        }

        //if dragging into parent
        if (
          node.children.findIndex(
            (node: TreeNodeModelType) => node.id === dragId
          ) >= 0
        ) {
          return;
        }

        const hoveredRect = ref.current.getBoundingClientRect();
        const hoverRectSize = hoveredRect.bottom - hoveredRect.top;
        // const hoverMiddleY = hoverRectSize / 2;

        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) {
          return;
        }

        const hoverClientY = mousePosition.y - hoveredRect.top;

        if (hoverClientY <= 10 || hoverClientY >= hoverRectSize - 10) {
          moveTreeNodes(item, node);
          return;
        }
        addTreeNode(item, node);
      },
      0.5
    ),
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { ...node, type: node.type },
    canDrag: !node.isRoot,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // end: (_dropResult, monitor) => {
    //   const item = monitor.getItem();
    //   const didDrop = monitor.didDrop();
    //   if (!didDrop) {
    //     console.log('drop', item.id, node.id);
    //     addTreeNode(item, node);
    //   }
    // },
  });

  if (isDragging) {
    //update parent to be not draggable
    //node.parent.setIsDraggable(false);
  }

  drag(dropRef(ref));

  return <div ref={ref}>{children({ node, isDragging, isOverCurrent })}</div>;
};

export default memo(DraggableWrapper);
