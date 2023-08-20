import { configureStore } from '@reduxjs/toolkit'
import chartSlice from '../features/chartSlice'
import formSlice from '../features/formSlice'
import stepSlice from '../features/stepSlice'

const steppersistedState = localStorage.getItem('stepNumber')

const firstFormPersistedState = localStorage.getItem('firstForm')
const secondFormPersistedState = localStorage.getItem('secondForm')

const chartDataPersistedState = localStorage.getItem('chartData')


const initialState = {
  step: {
    stepNumber: steppersistedState ? parseInt(JSON.parse(steppersistedState)) : 1,
  },
  formData: {
    firstForm: firstFormPersistedState ? JSON.parse(firstFormPersistedState) : null,
    secondForm: secondFormPersistedState ? JSON.parse(secondFormPersistedState) : null,
  },
  chartData: {
    data: chartDataPersistedState ? JSON.parse(chartDataPersistedState) : null
  }
}

export const store = configureStore({
  reducer: {
    step: stepSlice,
    formData: formSlice,
    chartData: chartSlice
  },
  preloadedState: initialState,
  devTools: import.meta.env.NODE_ENV !== 'production',
})
