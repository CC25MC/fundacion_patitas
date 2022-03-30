import { useState, useEffect } from 'react'
import {
  getAnimal,
  mutateSolicitud,
  destroySolicitud,
  getVisita,
  getAspirante,
  getTrabajador,
  getSolicitud,
} from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  tiempo: '',
  AspiranteId: '',
  AnimalId: '',
  VisitaId: '',
  TrabajadorId: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allSolicitud, isLoading: getLoading } = getSolicitud()
  const { data: allTrabajador } = getTrabajador()
  const { data: allAnimal } = getAnimal()
  const { data: allVisita } = getVisita()
  const { data: allAspirante } = getAspirante()
  const { mutate, isLoading: posLoading, error } = mutateSolicitud()
  const { destroy, isLoading: destroyIsLoading } = destroySolicitud()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando Trabajador', {
        variant: 'error'
      })
    }
  }, [error])

  const { tiempo, AspiranteId, AnimalId, VisitaId, TrabajadorId } = values || {}

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const saveData = () => {
    mutate(values)
  }
  return {
    values,
    allSolicitud,
    allTrabajador,
    allAnimal,
    allVisita,
    allAspirante,
    tiempo,
    AspiranteId,
    AnimalId,
    VisitaId,
    TrabajadorId,
    isLoading: posLoading || getLoading || destroyIsLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
