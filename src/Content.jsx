import React from "react";
import ItemsList from "./ItemsList";

const Content = ({ items, handleChange, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemsList
          items={items}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ color: "red" }}>The list is empty</p>
      )}
    </main>
  );
};

export default Content;
