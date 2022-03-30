import { useMutation, useQuery } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getAnimal = () => {
  const { isLoading, data, error } = useQuery('/api/animal', () =>
    request.animal.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateAnimal = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.animal.put(payload) : request.animal.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Animal Creada con exito ${data?.message}`, {
            variant: 'success'
          })
          setPath('/animal')
        }
      }
    }
  )
  return {
    isLoading,
    error,
    mutate
  }
}

export const destroyAnimal= () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.animal.deleteA(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Animal ${data?.message}`, {
          variant: 'success'
        })
      }
    }
  })

  return {
    isLoading,
    error,
    destroy
  }
}
