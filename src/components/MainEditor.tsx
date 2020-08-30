import React, { useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MainEditor: React.FC = () => {
  const handleEditorChange = useCallback((content, editor) => {
    console.log('Content was updated:', content);
  }, []);

  return (
    <div className="pt-5 border h-100">
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        apiKey="ecj0got4g3zq5wya91v1x9wp78wtn8elj19j3j7vfmpb0cna"
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
    </div>
  );
};

export default MainEditor;
