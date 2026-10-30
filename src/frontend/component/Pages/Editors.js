// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ckeditor5SyntaxHighlighting from "@ckeditor/ckeditor5-syntax-highlighting";

// // Import the styles for the plugin
// import "@ckeditor/ckeditor5-syntax-highlighting/theme/prism.css";

// // Add the syntax highlighting plugin to the ClassicEditor build
// ClassicEditor.builtinPlugins = [
//   ckeditor5SyntaxHighlighting,
//   ...ClassicEditor.builtinPlugins,
// ]

// // Customize the toolbar to include the Source Code button
// ClassicEditor.defaultConfig = {
//   toolbar: {
//     items: [
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "link",
//       "bulletedList",
//       "numberedList",
//       "|",
//       "outdent",
//       "indent",
//       "|",
//       "blockQuote",
//       "insertTable",
//       "mediaEmbed",
//       "undo",
//       "redo",
//       "|",
//       "code",
//       "codeBlock",
//       "|",
//       "highlight",
//       "removeFormat",
//       "|",
//       "sourceEditing",
//     ],
//   },
//   language: "en",
//   image: {
//     toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
//   },
//   table: {
//     contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
//   },
//   licenseKey: "",
// };

// export default function Editors() {
//   return (
//     <CKEditor
//       editor={ClassicEditor}
//       data="<p>Hello, world!</p>"
//       onChange={(event, editor) => {
//         const data = editor.getData();
//         console.log({ event, editor, data });
//       }}
//     />
//   );
// }
