import React from "react";
import VirtualList from "react-tiny-virtual-list";

const escapeRegex = st => st.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default ({ text, rowSeperator, rowLength, rowRender, ...listProps }) => {
  rowLength = rowLength || 120;
  rowSeperator = escapeRegex(rowSeperator) || "\n";
  let reg = `([^${rowSeperator}]{1,${rowLength}}|${rowSeperator}(?=${rowSeperator}))`;
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
