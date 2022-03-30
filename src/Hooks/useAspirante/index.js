import { useMutation, useQuery } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getAspirante = () => {
  const { isLoading, data, error } = useQuery('/api/aspirante', () =>
    request.aspirante.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateAspirante = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.aspirante.put(payload) : request.aspirante.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Aspirante Creada con exito ${data?.message}`, {
            variant: 'success'
          })
          setPath('/aspirante')
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

export const destroyAspirante= () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.aspirante.deleteA(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Aspirante ${data?.message}`, {
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
