import { Fragment, useReducer, useEffect, useMemo } from 'react';
import Form from './components/Form';
import { initialState, activityReducer } from "./reducers/activityReducer";
import ActivityList from './components/ActivityList';
import CalorieTracker from './components/CalorieTracker';
function App() {
  // dispatch is special function that let run the actions. I are the functions that are conected ib activityReducers
  // we say on which reducer(of activityReducer) we want use, beacause we can to have many reducers
  // we pass an initial state activity=[]
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])


  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities]);//pra que se active cuando cambie el state of activities

  return (
    <Fragment>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase  ">
            Calories Counter
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg twxt-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>

        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker 
          activities={state.activities}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </Fragment >
  )
}

export default App
