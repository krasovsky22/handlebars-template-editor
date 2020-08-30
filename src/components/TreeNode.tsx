import { TreeNodeModelType } from '@/models/TreeNode';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStore from '@hooks/useStore';
import { APP_STORE } from '@stores/AppStore';
import classNames from 'classnames';
import { debounce as _debounce } from 'lodash';
import { observer, Observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import {
  DragObjectWithType,
  DragSourceMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';
import { Button, Collapse, ListGroup, ListGroupItem } from 'reactstrap';

interface TreeNodePropsType {
  node: TreeNodeModelType;
}

const TreeNode: React.FC<TreeNodePropsType> = ({ node }: TreeNodePropsType) => {
  const { moveTreeNodes, addTreeNode } = useStore(APP_STORE);
  const [opened, setOpened] = useState<boolean>(true);

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

  const handleToggleButtonclick = useCallback(() => setOpened(!opened), [
    opened,
    setOpened,
  ]);

  drag(dropRef(ref));

  return (
    <div ref={ref} className={classNames({ 'h-100': node.isRoot })}>
      <ListGroupItem
        className={classNames({
          'tree-view-item': true,
          'border-0': true,
          'opacity-0': isDragging,
          'h-100': node.isRoot,
          'tree-node-hovered': isOverCurrent,
        })}
      >
        {node.children.length > 0 && (
          <Button
            className="pl-0 no-underline no-box-shadow"
            color="link"
            onClick={handleToggleButtonclick}
          >
            {opened ? (
              <FontAwesomeIcon icon={faMinus} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </Button>
        )}
        {node.description}
        {node.children.length > 0 && (
          <Collapse isOpen={opened}>
            <Observer>
              {() => (
                <>
                  {node.children?.map((treeNode) => (
                    <ListGroup key={treeNode.id}>
                      <TreeNode node={treeNode} />
                    </ListGroup>
                  ))}
                </>
              )}
            </Observer>
          </Collapse>
        )}
      </ListGroupItem>
    </div>
  );
};

export default React.memo(observer(TreeNode));
