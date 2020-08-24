import { TreeNodeType, ITEM_TYPE } from '@/data';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState, useRef } from 'react';
import { Button, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import {
  useDrop,
  useDrag,
  DragSourceMonitor,
  DragObjectWithType,
} from 'react-dnd';

interface TreeNodePropsType {
  node: TreeNodeType;
  moveNode: (arg0: string, arg1: string) => void;
  isRoot?: boolean;
}

const TreeNode: React.FC<TreeNodePropsType> = ({
  node,
  moveNode,
  isRoot = false,
}: TreeNodePropsType) => {
  const [opened, setOpened] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);

  const [, dropRef] = useDrop({
    accept: ITEM_TYPE,
    hover(item: DragObjectWithType & TreeNodeType, monitor) {
      if (!ref.current) {
        return;
      }
      console.log('use Drop on hover', item, node);
      const dragId = item.id;
      const hoverId = node.id;

      //if hovering itself
      if (dragId === hoverId) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;

      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) {
        return;
      }

      const hoverClientY = mousePosition.y - hoveredRect.top;
      console.log('mouse', mousePosition, hoverClientY);

      if (hoverClientY < hoverMiddleY) {
        return;
      }

      console.log('bbb');
      if (hoverClientY > hoverMiddleY) {
        return;
      }
      moveNode(dragId, hoverId);
      // item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPE, ...node },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleToggleButtonclick = useCallback(() => setOpened(!opened), [
    opened,
    setOpened,
  ]);

  drag(dropRef(ref));

  return (
    <div ref={ref}>
      <ListGroupItem
        className={classNames({
          'tree-view-item': true,
          'vh-100': isRoot,
          'opacity-0': isDragging,
        })}
      >
        {node.children && (
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
        {node.children && (
          <Collapse isOpen={opened}>
            {node.children?.map((treeNode) => (
              <ListGroup key={treeNode.id}>
                <TreeNode node={treeNode} moveNode={moveNode} />
              </ListGroup>
            ))}
          </Collapse>
        )}
      </ListGroupItem>
    </div>
  );
};

export default TreeNode;
