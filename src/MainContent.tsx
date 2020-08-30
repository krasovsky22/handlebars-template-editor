import TreeNode from '@components/TreeNode';
import useStore from '@hooks/useStore';
import { AppStoreType, APP_STORE } from '@stores/AppStore';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'reactstrap';
import EditorNode from './components/Editor/Node';

const MainContent: React.FC = () => {
  const { root } = useStore<AppStoreType>(APP_STORE);

  return (
    <Container fluid className="main-content vh-100">
      <Row className="h-100">
        <Col md={9}>{root && <EditorNode node={root} />}</Col>
        <Col md={3}>
          <ListGroup className="h-100 border">
            {root && <TreeNode node={root} />}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(MainContent);
