import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ItemsList = ({ items, handleChange, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li className="item" key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleChange(item.id)}
          />
          <label
            style={item.checked ? { textDecoration: "line-through" } : null}
            onDoubleClick={() => handleChange(item.id)}
          >
            {item.item}
          </label>
          <FaTrashAlt
            role="button"
            onClick={() => handleDelete(item.id)}
            tabIndex="0"
            aria-label={`Delete ${item.item}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
