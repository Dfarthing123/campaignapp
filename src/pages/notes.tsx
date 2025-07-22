import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";




const client = generateClient<Schema>();

function Notes() {
  const [notes, setNotes] = useState<Schema["Note"]["type"][]>([]);
  const [form, setForm] = useState({ name: "", description: "", image: "" });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await client.models.Note.list();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  async function createNote(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.description || !form.image) return;

    try {
      await client.models.Note.create({ name: form.name, description: form.description, image: form.image });
      const { data } = await client.models.Note.list();
      setNotes(data);
      setForm({ name: "", description: "", image: "" });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>My Notes</h1>
      <form onSubmit={createNote} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <button type="submit">+ Create</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.name}</h3>
            <p>{note.description}</p>
            {note.image && <img src={note.image} alt={note.name} width="100" />}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Notes;
