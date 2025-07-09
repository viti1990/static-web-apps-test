import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { setUsers } from "../../slice/usersSlice";

export const Theme = () => {
    const users = useSelector((state: RootState) => state.users.value);
    const dispatch = useDispatch<AppDispatch>();

    return <div>
        
        <button onClick={() => {
dispatch(setUsers([{id: 13, name: 'Javier', email: 'javier'}]))
        }}>
            añade Javier
        </button>
        <button onClick={() => {
dispatch(setUsers([{id: 14, name: 'Raquel', email: 'raqueñ'}]))
        }}>
            añade Raquel
        </button>
        
        {users?.map((user)=>{
        return <div key={user.id}>{user.name} {user.email}</div>
    })}</div>;
};