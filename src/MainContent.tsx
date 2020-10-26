import TreeNode from '@components/TreeNode';
import useStore from '@hooks/useStore';
import { AppStoreType, APP_STORE } from '@stores/AppStore';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'reactstrap';
import EditorNode from './components/Editor/Node';
import Hoverable from '@components/Hoverable';
import TextEditor from './components/Editor';

const MainContent: React.FC = () => {
  const { root } = useStore<AppStoreType>(APP_STORE);

  return (
    <>
      <Container fluid>
        <Hoverable className="row">
          <>
            <Col>
              {' '}
              <Hoverable>
                <TextEditor content={'Order Info'} />
              </Hoverable>
            </Col>

            <Col>
              <Hoverable>
                <TextEditor content={'Patient Info'} />
              </Hoverable>
            </Col>

            <Col>
              <Hoverable>
                <TextEditor content={'Order Info'} />
              </Hoverable>
            </Col>
          </>
        </Hoverable>

        <Hoverable className="row">
          <>
            <Col>
              {' '}
              <Hoverable>
                <TextEditor content={'Alterations'} />
              </Hoverable>
            </Col>

            <Col>
              <Hoverable>
                <TextEditor content={'Results'} />
              </Hoverable>
            </Col>
          </>
        </Hoverable>
      </Container>

      <hr />
      <Container fluid className="main-content vh-100">
        <Row className="h-100 mt-5">
          <Col md={9}>
            <Row>{root && <EditorNode node={root} />}</Row>
          </Col>
          <Col md={3}>
            <ListGroup className="h-100 border">
              {root && <TreeNode node={root} />}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(MainContent);

// <Container fluid className="main-content vh-100">
//       <Row className="h-100 mt-5">
//         <Col md={9}>
//           <Row>{root && <EditorNode node={root} />}</Row>
//         </Col>
//         <Col md={3}>
//           <ListGroup className="h-100 border">
//             {root && <TreeNode node={root} />}
//           </ListGroup>
//         </Col>
//       </Row>
//     </Container>
