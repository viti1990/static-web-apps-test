import { useEffect, useRef, useState } from "react";

const initList = [
  { name: "cuquinooo", estado: "completado", id: crypto.randomUUID() },
  { name: "esaaa", estado: "iniciado", id: crypto.randomUUID() },
];

type ListItem = {
  name: string;
  estado: string;
  id: string;
};

type FormFields = Omit<ListItem, "id">;

type UpdatePayload = {
  id: string;
  name: string;
  value: string;
};

export const Todo = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [editList, setEditList] = useState<ListItem[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Carga inicial: sincroniza ambos estados
  useEffect(() => {
    setTimeout(() => {
      setList(initList);
      setEditList(initList);
    }, 2000);
  }, []);

  // Al crear un nuevo listado, añádelo a ambos estados
  const handleCreateTodo = () => {
    if (!formRef.current) return; // 👈 verifica que no sea null

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData) as FormFields;
    const allFieldsFilled = Object.values(data).every((value) => value !== "");
    if (!allFieldsFilled) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const id = crypto.randomUUID();
    const newTodo = { ...data, id };

    setList((prev) => [...prev, newTodo]);
    setEditList((prev) => [...prev, newTodo]);
    formRef.current.reset();
  };

  // Actualizar solo editList al modificar inputs
  const handleUpdate = ({ id, name, value }: UpdatePayload) => {
    setEditList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleClickDelete = (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
    setEditList((prev) => prev.filter((item) => item.id !== id));
  };

  // Al guardar, copia editList a list
  const handleSave = () => {
    setList(editList);
    console.log(editList);
    alert("Cambios guardados!");
    // Aquí podrías hacer llamada AJAX para guardar en backend
  };

  return (
    <>
      <form ref={formRef}>
        <input type="text" name="name" />
        <select id="estado" name="estado" required>
          <option value="">Seleccione estado</option>
          <option value="iniciado">Iniciado</option>
          <option value="completado">Completado</option>
        </select>
      </form>
      <button onClick={handleCreateTodo}>Agregar item</button>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> {/* muestra el valor guardado */}
            <br />
            <input
              type="text"
              defaultValue={editList.find((e) => e.id === item.id)?.name || ""}
              onChange={(e) =>
                handleUpdate({
                  id: item.id,
                  name: "name",
                  value: e.target.value,
                })
              }
            />
            <br />
            <input
              type="text"
              defaultValue={
                editList.find((e) => e.id === item.id)?.estado || ""
              }
              onChange={(e) =>
                handleUpdate({
                  id: item.id,
                  name: "estado",
                  value: e.target.value,
                })
              }
            />
            <br />
            <button onClick={() => handleClickDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSave}>Guardar</button>
    </>
  );
};
