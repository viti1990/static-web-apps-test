import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';
import { Counter } from './features/counter/Counter';
import { TestGeneral } from './TestGeneral';
import { decrement , increment , incrementByAmount}  from './slice/counterSlice';
import { Theme } from './features/theme/Theme';
import { changeTheme } from './slice/themeSlice';
import { useEffect } from 'react';
import { setUsers } from './slice/usersSlice';
 
function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const theme = useSelector((state: RootState) => state.theme.value);
  const users = useSelector((state: RootState) => state.users.value);


  const dispatch = useDispatch<AppDispatch>();

  const setUsersFn = async () => {
    console.log('cucoqju')
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json(); 
    dispatch(setUsers(users));
  };
  

useEffect(()=>{
  setUsersFn()
},[]);


console.log(users)


  return (
    <div>
            {users?.map((user)=>{
        return <div key={`home ${user.id}`}>{user.name}</div>
      })}
<TestGeneral user={{id: 1, name: 'Javier', email: 'javier', age: 25, adminLevel: 1}} showAdminInfo={true}/>
   <div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <h1>Counter: {count}</h1>
   <button onClick={() => dispatch(decrement())}>-</button>
   <button onClick={() => dispatch(increment())}>+</button>
   <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
  </div>
{theme}

<button onClick={()=>{
  dispatch(changeTheme('light'));
}}>
  cambiar a light
</button>
<button onClick={()=>{
  dispatch(changeTheme('dark'));
}}>
  cambiar a oscuro
</button>
    <Theme/>

    <Counter/>
    </div>
   
  );
}

export default App;
