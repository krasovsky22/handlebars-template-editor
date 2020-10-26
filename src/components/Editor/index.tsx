import React, { useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TextEditorProps {
  content: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  content,
}: TextEditorProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onClickHandler = useCallback(() => setIsEditMode(true), [
    setIsEditMode,
  ]);

  const handleEditorChange = useCallback((content, editor) => {
    console.log('Content was updated:', content);
  }, []);

  return (
    <Editor
      initialValue={content}
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
  );
};

export default TextEditor;
