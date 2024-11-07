import { useMemo } from 'react'
import { Activity } from '../types'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  //contandores
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) =>
    activity.category === 1 ?
      total + activity.calories :
      total, 0
  ), [activities])

  const caloriesBorned = useMemo(() => activities.reduce((total, activity) =>
    activity.category === 2 ?
      total + activity.calories :
      total, 0
  ), [activities])

  const caloriesNet = useMemo(() => caloriesConsumed - caloriesBorned, [activities])


  return (
    <>
      <h2 className='text-4xl font-bold text-white text-center'>Resumen de Calorías</h2>

      <div className='flex flex-xol items-center  md:flex-row justify-between md:justify-around gap-5 mt-10'>

        <CalorieDisplay
          calories={caloriesConsumed}
          texto='Consumidas'
        />

        <CalorieDisplay
          calories={caloriesBorned}
          texto='Quemadas'
        />
       
        <CalorieDisplay
          calories={caloriesNet}
          texto='Diferencia'
        />

      </div>
    </>
  )
}
