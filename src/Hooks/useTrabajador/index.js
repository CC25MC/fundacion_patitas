import { useMutation, useQuery } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getTrabajador = () => {
  const { isLoading, data, error } = useQuery('/api/trabajador', () =>
    request.trabajador.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateTrabajador = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.trabajador.put(payload) : request.trabajador.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Trabajador ${data?.message}`, {
            variant: 'success'
          })
          setPath('/trabajador')
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

export const destroyTrabajador= () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.trabajador.deleteT(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Trabajador ${data?.message}`, {
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
