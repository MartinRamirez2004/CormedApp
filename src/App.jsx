import React, { useEffect, useState } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", correo: "" });

  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const agregarUsuario = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });
    setNuevoUsuario({ nombre: "", correo: "" });
    window.location.reload();
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <form onSubmit={agregarUsuario}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.correo}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nombre} - {u.correo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
