import { TreeNodeModelType } from '@/models/TreeNode';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStore from '@hooks/useStore';
import { APP_STORE } from '@stores/AppStore';
import classNames from 'classnames';
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
  const { moveTreeNodes } = useStore(APP_STORE);
  const [opened, setOpened] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: node.type,
    hover(item: DragObjectWithType & TreeNodeModelType, monitor) {
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
      if (node.children.includes(dragId)) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;

      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) {
        return;
      }

      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (hoverClientY < hoverMiddleY) {
        return;
      }

      if (hoverClientY > hoverMiddleY) {
        return;
      }

      moveTreeNodes(item, node);
    },
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
    end: (_dropResult, monitor) => {
      const item = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        console.log('drop', item.id, node.id);
        moveTreeNodes(item, node);
      }
    },
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
          'opacity-0': isDragging,
          'h-100': node.isRoot,
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

export default observer(TreeNode);
