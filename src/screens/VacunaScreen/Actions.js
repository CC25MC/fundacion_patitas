import { useState, useEffect } from 'react'
import { getVacuna, destroyVacuna, mutateVacuna } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  fecha: new Date(),
  lote: '',
  nombre: ""
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allVacuna, isLoading: getLoading } = getVacuna()
  const { mutate, isLoading: posLoading, error } = mutateVacuna()
  const { destroy, isLoading: destroyIsLoading } = destroyVacuna()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando la vacuna', {
        variant: 'error'
      })
    }
  }, [error])

  const { fecha, lote, nombre } = values || {}

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
    allVacuna,
    fecha,
    nombre,
    lote,
    isLoading : posLoading || getLoading || destroyIsLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
