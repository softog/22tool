import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Button, Card } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 32,
    }}
    spin
  />
);

export default function CodeEditor({ language, customFormat }) {
  const editorRef = useRef(null);
  const [isFolded, setIsFolded] = useState(false);

  const handleFormatClick = () => {

    // 判断是否需要自定义格式化
    if (null == customFormat) {
      editorRef.current.trigger('format', 'editor.action.formatDocument');
    } else {
      editorRef.current.setValue(customFormat(editorRef.current.getValue()));
    }
    editorRef.current.setSelection({ startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 });
    // editorRef.current.setScrollPosition({
    //   scrollLeft: 0,
    //   scrollTop: 0,
    // });
  };

  const handleClearClick = () => {
    editorRef.current.setValue('');
  };

  const handleFoldClick = () => {
    if (!isFolded) {
      editorRef.current.trigger('foldAll', 'editor.foldAll');
    } else {
      editorRef.current.trigger('unfoldAll', 'editor.unfoldAll');
    }
    setIsFolded(!isFolded);
  };


  return (
    <Card
      style={{ flex: 1 }}
      bodyStyle={{ height: "calc(100vh - 200px)" }}
      title={
        <>
          <Button style={{ margin: "10px" }} onClick={handleFormatClick}>格式化</Button>
          <Button style={{ margin: "10px", marginLeft: '0px' }} onClick={handleClearClick}>清空</Button>
          <Button style={{ margin: "10px", marginLeft: '0px' }} onClick={handleFoldClick}>{isFolded ? '展开' : '折叠'}</Button>
        </>
      }
      headStyle={{ padding: "0px", margin: "0px" }}
    >
      <Editor
        defaultLanguage={language}
        loading={<Spin indicator={antIcon} tip="编辑器加载中..." />}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </Card>
  )
}
