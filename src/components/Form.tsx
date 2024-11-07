import { categories } from "../data/categories";
import { v4 as uuidv4 } from 'uuid';
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from 'react';
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

// we take the function dispatch
type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}
// reiniciar loa valores
const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {//validar que ya hay algo
          //  console.log(state.activeId);
            // filter retorna un array
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]//LA poiscion hace que retorne un objeto
            setActivity(selectedActivity);
        }
    }, [state.activeId])

    // el e: React.ChangeEvent<HTMLSelectElement> lo sacamos la sugerencia al estar sobre e
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);// retorna false si los cambios se estan haciendo en otro campos

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? + e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        // es true si el name despues de quitarle los espacios en blanco es diferente a un string y calories is major to 0
        return name.trim() !== '' && calories > 0
    }

    //! para modificar el boton
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({
            type: 'save-activity', payload: { newActivity: activity }
        })
        // reescribe todo, crea una copia y crea un id nuevo
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }
    return (
        <>
            <form
                className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}

            >
                <div className="grid grid-cols-1 gap">
                    <label htmlFor="category" className="font-bold">Categoria:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>

                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Actividad:</label>
                    <input onChange={handleChange} type="text" id="name" className="border-slate-300 p-2" placeholder="ej. comida, ensalada, torta, pastel" value={activity.name} />
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calorias:</label>
                    <input onChange={handleChange} type="number" id="calories" className="border-slate-300 p-2" placeholder="ej: 40,500,200" value={activity.calories} />
                </div>

                <input type="submit"
                    className=" disabled:opacity-10 cursor-pointer bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white"
                    value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                    disabled={!isValidActivity()}
                />
            </form>

        </>
    )
}
