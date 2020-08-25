import TreeNode from '@components/TreeNode';
import useStore from '@hooks/useStore';
import { AppStoreType, APP_STORE } from '@stores/AppStore';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'reactstrap';

const MainContent: React.FC = () => {
  const { root } = useStore<AppStoreType>(APP_STORE);

  return (
    <Container fluid>
      <Row className="main-content vh-100">
        <Col md={9}>Main Editor</Col>
        <Col md={3} className="p-0">
          <ListGroup className="h-100">
            {root && <TreeNode node={root} />}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(MainContent);
