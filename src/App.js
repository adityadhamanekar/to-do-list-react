import { useState } from "react";

export default function App() {
  const allItem = JSON.parse(localStorage.getItem("notesItem")) || [];

  const [items, setItems] = useState(allItem);

  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteNote(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  localStorage.setItem("notesItem", JSON.stringify(items));

  return (
    <main className='note'>
      <h1 className='note__heading'>To Do List App</h1>
      <Form onAddItem={handleAddItem} />
      <NoteList items={items} onDeleteNote={handleDeleteNote} />
      <Footer />
    </main>
  );
}

function Form({ onAddItem }) {
  const [message, setMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (!message) return;

    const newItem = {
      message,
      id: Date.now(),
    };

    onAddItem(newItem);

    setMessage("");
  }
  return (
    <form className='note__function' onSubmit={handleSubmit}>
      <input
        type='text'
        value={message}
        onChange={e => setMessage(e.target.value)}
        className='note__input'
        placeholder='Enter Task'
      />
      <button className='note__btn'>Add</button>
    </form>
  );
}

function NoteList({ items, onDeleteNote }) {
  return (
    <div className='note__list'>
      {items.map(item => (
        <NoteItems item={item} key={item.message} onDeleteNote={onDeleteNote} />
      ))}
    </div>
  );
}

function NoteItems({ item, onDeleteNote }) {
  return (
    <div className='note__item'>
      <p className='note__text'>{item.message}</p>
      <a
        href='#'
        className='note__delete'
        onClick={() => onDeleteNote(item.id)}
      >
        Delete
      </a>
    </div>
  );
}

function Footer() {
  return <div className='copyright'>&copy; Aditya Dhamanekar.</div>;
}
