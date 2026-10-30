import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyCKEditor = () => {
    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setEditorData(data);
    };
  
    return (
      <div>
        <h2>Your CKEditor</h2>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={handleEditorChange}
        />
        <h2>HTML Source Code</h2>
        <pre>{editorData}</pre>
      </div>
    );
}

export default MyCKEditor