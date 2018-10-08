import React from "react";
import VirtualList from "react-tiny-virtual-list";

export default ({
  text,
  rowSeperator,
  rowEndChar,
  minRowLength,
  rowLength,
  rowRender,
  ...listProps
}) => {
  if (!text) {
    return null;
  }
  rowLength = rowLength || 120;
  rowSeperator = rowSeperator || "\n";
  let reg;
  if (rowEndChar && minRowLength) {
    reg = `([^${rowSeperator}]{${minRowLength},${rowLength}}${rowEndChar}|${rowSeperator}(?=${rowSeperator})|[^${rowSeperator}]{1,${rowLength}})`;
  } else {
    reg = `(${rowSeperator}(?=${rowSeperator})|[^${rowSeperator}]{1,${rowLength}})`;
  }
  let rows = text.match(new RegExp(reg, "g"));
  return (
    <VirtualList
      itemCount={rows.length}
      renderItem={({ style, index }) => (
        <div style={{ ...style, whiteSpace: "nowrap" }} key={index}>
          {rowRender ? rowRender(rows[index]) : rows[index]}
        </div>
      )}
      {...listProps}
    />
  );
};
