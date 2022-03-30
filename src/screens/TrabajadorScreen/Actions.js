import { useState, useEffect } from 'react'
import { getTrabajador, mutateTrabajador, destroyTrabajador } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  nombre: '',
  apellido: '',
  sexo: '',
  ocupacion: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allTrabajador, isLoading: getLoading } = getTrabajador()
  const { mutate, isLoading: posLoading, error } = mutateTrabajador()
  const { destroy, isLoading: destroyIsLoading } = destroyTrabajador()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando Trabajador', {
        variant: 'error'
      })
    }
  }, [error])

  const { nombre, apellido, sexo, ocupacion } = values || {}

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
    nombre,
    apellido,
    sexo,
    ocupacion,
    isLoading: posLoading || getLoading || destroyIsLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
