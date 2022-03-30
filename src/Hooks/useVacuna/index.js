import { useMutation, useQuery } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getVacuna = () => {
  const { isLoading, data, error } = useQuery('/api/vacuna', () =>
    request.vacuna.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateVacuna = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.vacuna.put(payload) : request.vacuna.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Vacuna ${data?.message}`, {
            variant: 'success'
          })
          setPath('/vacuna')
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

export const destroyVacuna= () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.vacuna.deleteV(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Vacuna ${data?.message}`, {
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
