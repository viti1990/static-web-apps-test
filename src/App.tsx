import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";
import { Counter } from "./features/counter/Counter";
import { TestGeneral } from "./TestGeneral";
import { decrement, increment, incrementByAmount } from "./slice/counterSlice";
import { Theme } from "./features/theme/Theme";
import { changeTheme } from "./slice/themeSlice";
import { useEffect } from "react";
import { setUsers } from "./slice/usersSlice";
import AutoComplete from "./Autocomplete";
import Shipping from "./Shipping";
import { Todo } from "./Todo";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const theme = useSelector((state: RootState) => state.theme.value);
  const users = useSelector((state: RootState) => state.users.value);

  const dispatch = useDispatch<AppDispatch>();

  const setUsersFn = async () => {
    console.log("cucoqju");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    dispatch(setUsers(users));
  };

  useEffect(() => {
    console.log("dsa");
    setUsersFn();
  }, []);

  const items = [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Perú",
    "Uruguay",
    "Venezuela",
  ];

  const handleSelect = (selectedItem: string) => {
    console.log("Seleccionaste:", selectedItem);
  };

  const availablePoints = [
    { lat: 40.7128, lon: -74.006, name: "Sucursal 1 - Nueva York" },
    { lat: 34.0522, lon: -118.2437, name: "Sucursal 2 - Los Ángeles" },
    { lat: 41.8781, lon: -87.6298, name: "Sucursal 3 - Chicago" },
    { lat: 37.7749, lon: -122.4194, name: "Sucursal 4 - San Francisco" },
  ];

  return (
    <div>
      <Todo />

      {/* <Shipping availablePoints={availablePoints} />
      
            {users?.map((user)=>{
        return <div key={`home ${user.id}`}>{user.name}</div>
      })}
<TestGeneral user={{id: 1, name: 'Javier', email: 'javier', age: 25, adminLevel: 1, test: {id: 1}}} showAdminInfo={true}/>
   <div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <h1>Counter: {count}</h1>
   <button onClick={() => dispatch(decrement())}>-</button>
   <button onClick={() => dispatch(increment())}>+</button>
   <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
  </div>
{theme} 
<AutoComplete items={items} onSelect={handleSelect}/>

<button onClick={()=>{
  dispatch(changeTheme('light'));
}}>
  cambiar a light
</button>
<button onClick={()=>{
  dispatch(changeTheme('dark'));
}}>
  cambiar a oscuro
</button> */}
      {/* <Theme/>

    <Counter/> */}
    </div>
  );
}

export default App;
