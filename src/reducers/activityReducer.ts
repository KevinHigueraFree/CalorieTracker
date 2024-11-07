import { Activity } from "../types"

//actions
export type ActivityActions =
    {
        // el type describe que es lo que está sucediendo
        // sera un new activity a partir de el activity que le pasamos en el 
        // el payload e sun aparametro para pasarselo al reducer con los datos que contiene
        // el activitie  contiene los datos
        // el payload son los datos que se le pasa junto  a la accion
        type: 'save-activity',
        payload: { newActivity: Activity }
    } |
    {
        type: 'set-activeId',
        payload: { id: Activity['id'] }
    } |
    {
        type: 'delete-activity',
        payload: { id: Activity['id'] }
    } |
    {
        type: 'restart-app'
    }

// si se agregan nuevas actividades
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

// validate if local storage have  registers on activities
//will be an Activity type arry
const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : []
}


export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    // va a inicializa con un activities vacio, y realizara la accion de save-activity
    state: ActivityState = initialState,
    action: ActivityActions

) => {
    //if the action es of type save-activity entoces hacemos
    if (action.type === 'save-activity') {
        // manage the logic to update the state
        let updateActivities: Activity[] = []

        if (state.activeId) {
            updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);

        } else {
            updateActivities = [...state.activities, action.payload.newActivity]

        }

        return {
            ...state,
            activities: updateActivities,
            activeId: '' //reinicia el activeId
        }


    }
    
    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    
    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)// filter the activies diferent to the activty for delete
        }
    }

    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }
    return state; // si no es de type save-activity, devuelve el state sin cambios
}
