import { useState, useEffect } from 'react'
import {
  getAnimal,
  mutateAnimal,
  destroyAnimal,
  getVacuna,
  getTrabajador
} from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  nombre: '',
  especie: '',
  sexo: '',
  peso: 0,
  lugar_rescate: '',
  rescatador: '',
  estado_salud: '',
  VacunaId: '',
  TrabajadorId: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allTrabajador, isLoading: getLoading } = getTrabajador()
  const { data: allAnimal, isLoading: getAnimalLoading } = getAnimal()
  const { data: allVacuna, isLoading: getVacunaLoading } = getVacuna()
  const { mutate, isLoading: posLoading, error } = mutateAnimal()
  const { destroy, isLoading: destroyIsLoading } = destroyAnimal()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando Trabajador', {
        variant: 'error'
      })
    }
  }, [error])

  const {
    nombre,
    especie,
    sexo,
    peso,
    lugar_rescate,
    rescatador,
    estado_salud,
    VacunaId,
    TrabajadorId
  } = values || {}

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const saveData = () => {
    mutate({
      id: values.id,
      nombre: nombre,
      especie: especie,
      sexo: sexo,
      peso: peso,
      lugar_rescate: lugar_rescate,
      rescatador: rescatador,
      estado_salud: estado_salud,
      VacunaId: parseInt(VacunaId, 10),
      TrabajadorId: parseInt(TrabajadorId, 10)
    })
  }
  return {
    values,
    allTrabajador,
    allAnimal,
    allVacuna,
    nombre,
    especie,
    sexo,
    peso,
    lugar_rescate,
    rescatador,
    estado_salud,
    VacunaId,
    TrabajadorId,
    isLoading:
      posLoading ||
      getLoading ||
      destroyIsLoading ||
      getAnimalLoading ||
      getVacunaLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
