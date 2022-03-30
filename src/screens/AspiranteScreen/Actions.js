import { useState, useEffect } from 'react'
import { destroyAspirante, getAspirante, mutateAspirante  } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  nombre: '',
  apellido: '',
  sexo: '',
  domicilio: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allAspirante, isLoading: getLoading } = getAspirante()
  const { mutate, isLoading: posLoading, error } = mutateAspirante()
  const { destroy, isLoading: destroyIsLoading } = destroyAspirante()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando Trabajador', {
        variant: 'error'
      })
    }
  }, [error])

  const { nombre, apellido, sexo, domicilio } = values || {}

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
    allAspirante,
    nombre,
    apellido,
    sexo,
    domicilio,
    isLoading: posLoading || getLoading || destroyIsLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
