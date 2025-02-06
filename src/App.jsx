import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import React, { useEffect, useState } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchEr, setFetchEr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) throw Error("Data Not Retrieved");
        const listItems = await response.json();
        setItems(listItems);
        setFetchEr(null);
      } catch (err) {
        setFetchEr(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(API, postOptions);
    if (result) setFetchEr(result);
  };

  const handleChange = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.find((item) => item.id === id); 

    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: myItem.checked }), 
    };

    const reqUrl = `${API}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchEr(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchEr(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="To Do List" />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />

      <main>
        {isLoading && <p>...Loading Items</p>}
        {fetchEr && <p>Error: {fetchEr}</p>}
        {!isLoading && !fetchEr && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
