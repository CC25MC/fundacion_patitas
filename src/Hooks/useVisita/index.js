import { useMutation, useQuery } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getVisita = () => {
  const { isLoading, data, error } = useQuery('/api/visita', () =>
    request.visita.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateVisita = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.visita.put(payload) : request.visita.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Visita  ${data?.message}`, {
            variant: 'success'
          })
          setPath('/visita')
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

export const destroyVisita = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.visita.deleteV(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Visita  ${data?.message}`, {
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
