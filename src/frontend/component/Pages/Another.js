// This sample assumes that the application is using a CKEditor&nbsp;5 editor built from source.

import React, { Component } from 'react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Context } from '@ckeditor/ckeditor5-core';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

class Another extends Component {
    render() {
        return (
            <div className="App">
                <CKEditorContext context={ Context }>
                    <h2>Using the CKEditor&nbsp;5 context feature in React</h2>
                    <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
                        data="<p>Hello from the first editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor1 is ready to use!', editor );
                        } }
                    />

                    <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
                        data="<p>Hello from the second editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor2 is ready to use!', editor );
                        } }
                    />
                </CKEditorContext>
            </div>
        );
    }
}

export default Another;
