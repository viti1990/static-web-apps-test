import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { increment } from "../../slice/counterSlice";

export const Counter =()=>{
    const theme = useSelector((state: RootState) => state.theme.value);

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return <div>
        dsa {count}
cuco:{theme}
        <button onClick={() => {
           dispatch(increment());
        }}>
            cambia
        </button>
    </div>
}