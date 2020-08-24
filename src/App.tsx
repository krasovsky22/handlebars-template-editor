import TreeNode from '@components/TreeNode';
import React, { useState } from 'react';
import { Col, Container, ListGroup, Row } from 'reactstrap';
import './App.scss';
import { TreeData, TreeNodeType } from './data';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  const [root, updateRoot] = useState<TreeNodeType>(TreeData);

  // const onDrop = (item, monitor, status) => {
  //   console.log('onDrop', item, monitor, status);
  // };

  const moveNode = (dragId: string, hoverId: string) => {
    console.log('moveItem', dragId, hoverId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid>
        <Row>
          <Col md={9}>Main Editor</Col>
          <Col md={3} className="p-0">
            <ListGroup>
              <TreeNode node={root} isRoot={true} moveNode={moveNode} />
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default App;
