import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import LeafletMap from './LeafletMap';


const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const mapCenter: [number, number] = [51.505, -0.09]; // London
  const mapZoom = 13;
  const circleCenter: [number, number] = [51.505, -0.12]; // Example circle center
  const circleRadius = 500; // Example circle radius (meters)


  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
        <div className="App">
          <LeafletMap 
          center={mapCenter} 
          zoom={mapZoom} 
          circleCenter={circleCenter}
          circleRadius={circleRadius}
        />
        </div>
      </div>
    </main>
  );
}

export default App;
