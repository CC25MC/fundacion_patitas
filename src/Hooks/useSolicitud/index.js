import { useMutation, useQuery } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getSolicitud = () => {
  const { isLoading, data, error } = useQuery('/api/solicitud', () =>
    request.solicitud.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateSolicitud = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.solicitud.put(payload) : request.solicitud.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Solicitud ${data?.message}`, {
            variant: 'success'
          })
          setPath('/solicitud')
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

export const destroySolicitud= () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.solicitud.deleteS(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Solicitud ${data?.message}`, {
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
