import { useState, useEffect } from 'react'
import { destroyVisita, getVisita, mutateVisita, getTrabajador } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  descripcion: '',
  fecha: '',
  TrabajadorId: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allVisita, isLoading: getLoading } = getVisita()
  const { mutate, isLoading: posLoading, error } = mutateVisita()
  const { destroy, isLoading: destroyIsLoading } = destroyVisita()
  const { data: allTrabajador, isLoading: getTrabajadorLoading } = getTrabajador()
  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando Trabajador', {
        variant: 'error'
      })
    }
  }, [error])

  const { descripcion, fecha, TrabajadorId } = values || {}

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
    allTrabajador,
    allVisita,
    descripcion,
    fecha,
    TrabajadorId,
    isLoading: posLoading || getLoading || destroyIsLoading || getTrabajadorLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
