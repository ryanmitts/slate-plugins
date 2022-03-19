import React, { useState, useMemo } from "react";
import { Editor } from "@slate-legacy/slate-react";
import { Value } from "@slate-legacy/slate";
import "./index.css";

const TestEditor = React.forwardRef(
  ({ plugins, initialValue, ...props }, ref) => {
    const memoPlugins = useMemo(() => plugins);
    const [value, setValue] = useState(() => Value.fromJSON(initialValue));

    const handleChange = ({ value }) => {
      setValue(value);
    };

    const className = props.className
      ? `${props.className} test-editor`
      : "test-editor";

    return (
      <Editor
        ref={ref}
        plugins={memoPlugins}
        value={value}
        onChange={handleChange}
        {...props}
        className={className}
      />
    );
  }
);

export default TestEditor;
