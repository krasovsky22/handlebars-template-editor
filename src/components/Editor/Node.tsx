import { TreeNodeModelType } from '@/models/TreeNode';
import DraggableWrapper, {
  DraggableWrapperPassPropsType,
} from '@components/DraggableWrapper';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { Col, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';

type EditorNodeProps = {
  node: TreeNodeModelType;
};

const EditorNode: React.FC<EditorNodeProps> = ({ node }: EditorNodeProps) => {
  const handleEditorChange = useCallback((content, editor) => {
    console.log('Content was updated:', content);
  }, []);

  return (
    <DraggableWrapper node={node}>
      {({ isDragging, isOverCurrent }: DraggableWrapperPassPropsType) => (
        <Row>
          <Editor
            initialValue={node.content}
            apiKey={process.env.REACT_APP_TINY_MCE_KEY}
            inline
            init={{
              menubar: true,
              plugins: [
                'code preview advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'code preview | undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />

          {node.children.length > 0 && (
            <Observer>
              {() => (
                <>
                  {node.children?.map((treeNode) => (
                    <Col key={treeNode.id}>
                      <EditorNode node={treeNode} />
                    </Col>
                  ))}
                </>
              )}
            </Observer>
          )}
        </Row>
      )}
    </DraggableWrapper>
  );
};

export default EditorNode;
