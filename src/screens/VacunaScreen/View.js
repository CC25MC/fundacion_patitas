import React, { useState, forwardRef } from 'react'
import {
  Box,
  Button,
  Dialog,
  Typography,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  TextField,
} from '@mui/material'
import { AppBar } from '../../components'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { useLocation } from '../../Hooks'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit } from '@mui/icons-material'
import Slide from '@mui/material/Slide'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const VacunaView = ({
  values,
  allVacuna,
  fecha,
  lote,
  nombre,
  isLoading,
  error,
  handleChange,
  setValues,
  saveData,
  destroy
}) => {
  const { path, setPath } = useLocation()
  const [open, setOpen] = useState(true)
  const [ids, setIds] = useState(null)

  const handleClick = () => {
    setOpen(false)
    setPath('/vacuna')
    setValues({})
    setIds(null)
  }

  const handleValues = id => {
    setIds(id)
    const res = allVacuna.filter(x => x.id === id)
    if (res) {
      setValues(res[0])
      setOpen(true)
      setPath('/vacuna/create')
    }
  }
  const save = () => {
    saveData()
    setOpen(false)
    setIds(null)
  }

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'lote', headerName: 'Lote', width: 150 },
    { field: 'fecha', headerName: 'Fecha', width: 250 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleValues(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => destroy(id)}
            color="inherit"
          />
        ]
      }
    }
  ]
  const datos = { rows: allVacuna, columns }
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }}
    >
      {path === '/vacuna' ? (
        <>
          <AppBar action={setOpen} />
          <Box sx={{ height: '700px', width: '100%', padding: 3 }}>
            <DataGrid
              {...datos}
              loading={isLoading}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </>
      ) : (
        <Box>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClick}
            TransitionComponent={Transition}
          >
            <MuiAppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClick}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {ids ? 'Actualizar Vacuna' : 'Crear Vacuna'}
                </Typography>
                <Button disabled={isLoading} color="inherit" onClick={save}>
                  {ids ? 'Actualizar' : 'Crear'}
                </Button>
              </Toolbar>
            </MuiAppBar>
            <Box
              component="main"
              sx={{
                p: 3,
                width: '100%',
                height: '100%',
                backgroundColor: '#EDEFF3'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: 3,
                  width: '100%',
                  height: '100%',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" component="div">
                  Datos de la Vacuna:
                </Typography>
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="nombre"
                  label="Nombre"
                  variant="outlined"
                  value={nombre}
                  onChange={handleChange('nombre')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="lote"
                  label="Lote"
                  variant="outlined"
                  value={lote}
                  type={'number'}
                  onChange={handleChange('lote')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Fecha"
                    value={fecha}
                    onChange={newValue => {
                      setValues({
                        ...values,
                        ['fecha']: newValue
                      })
                    }}
                    size="small"
                    fullWidth
                    renderInput={params => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    </Box>
  )
}

export default VacunaView
