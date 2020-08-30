import { TreeNodeModelType } from '@/models/TreeNode';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { observer, Observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { Button, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import DraggableWrapper, {
  DraggableWrapperPassPropsType,
} from './DraggableWrapper';

interface TreeNodePropsType {
  node: TreeNodeModelType;
}

const TreeNode: React.FC<TreeNodePropsType> = ({ node }: TreeNodePropsType) => {
  const [opened, setOpened] = useState<boolean>(true);

  const handleToggleButtonclick = useCallback(() => setOpened(!opened), [
    opened,
    setOpened,
  ]);

  return (
    <DraggableWrapper node={node}>
      {({ isDragging, isOverCurrent }: DraggableWrapperPassPropsType) => (
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
      )}
    </DraggableWrapper>
  );
};

export default React.memo(observer(TreeNode));
