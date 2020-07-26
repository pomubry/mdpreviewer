import React, { Component } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import markdown from './markdown.svg';
import github from './githubIcon.svg';

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

class App extends Component {
  state = {
    markdown: initialMarkdown,
    hidden: false,
  };
  getMarkdownText() {
    let rawMarkup = DOMPurify.sanitize(
      marked(this.state.markdown, {
        breaks: true,
      })
    );
    return { __html: rawMarkup };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleHide = (e) => {
    this.setState((prevState) => ({
      hidden: prevState.hidden ? false : true,
    }));
  };

  render() {
    const textarea = this.state.hidden
      ? { display: 'none' }
      : { display: 'block' };
    const editorHeight = this.state.hidden
      ? { height: '0px' }
      : { height: '240px' };

    return (
      <div className="App">
        <div className="editor" style={editorHeight}>
          <div className="prevTab">
            <img src={markdown} alt="markdown"></img>Editor
            <button onClick={this.handleHide}>Hide</button>
          </div>
          <textarea
            id="editor"
            name="markdown"
            value={this.state.markdown}
            onChange={this.handleChange}
            cols="40"
            rows="auto"
            style={textarea}
          />
        </div>
        <div className="prevTab">
          <img src={markdown} alt="markdown"></img>Previewer
        </div>
        <div
          className="previewer"
          id="preview"
          dangerouslySetInnerHTML={this.getMarkdownText()}
        />
        <div className="credits">
          <p>Designed and Coded By</p>
          <a
            href="https://github.com/pomubry"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github icon" />
            Bryan Taduran
          </a>
        </div>
      </div>
    );
  }
}

export default App;
