import { useState } from 'react';

// Markdown dependencies
import marked from 'marked';
import DOMPurify from 'dompurify';

// Icons
import { FaMarkdown } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';

// Boilerplate Markdown
const initialMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

* This is a bulleted list
* Great for shopping lists
* You can also use hyphens
* Or plus symbols

![React Logo](https://reactjs.org/logo-og.png)

`;

const App = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [hidden, setHidden] = useState(false);

  // This function will run everytime there's a change in the editor.
  // It will pass the markdown string that is stored in the state into 'marked' function.
  const getMarkdownText = () => {
    let rawMarkup = DOMPurify.sanitize(marked(markdown, { breaks: true }));
    return { __html: rawMarkup };
  };

  return (
    <div className="App">
      {/* Editor */}
      <div className="editor" style={{ height: hidden ? '0px' : '240px' }}>
        <div className="prevTab">
          <FaMarkdown /> Editor
          <button onClick={() => setHidden((prevState) => !prevState)}>
            Hide
          </button>
        </div>
        <textarea
          id="editor"
          name="markdown"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          cols="40"
          rows="auto"
          style={{ display: hidden ? 'none' : 'block' }}
        />
      </div>

      {/* Display Preview */}
      <div className="prevTab">
        <FaMarkdown /> Previewer
      </div>
      <div
        className="previewer"
        id="preview"
        dangerouslySetInnerHTML={getMarkdownText()}
      />

      {/* Profile Link */}
      <div className="credits">
        <p>Designed and Coded By</p>
        <a
          href="https://github.com/pomubry"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub />
          Bryan Taduran
        </a>
      </div>
    </div>
  );
};

export default App;
