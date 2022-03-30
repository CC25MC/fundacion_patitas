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
  Autocomplete
} from '@mui/material'
import { AppBar } from '../../components'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { useLocation } from '../../Hooks'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit } from '@mui/icons-material'
import Slide from '@mui/material/Slide'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SolicitudView = ({
  values,
  allSolicitud,
  allTrabajador,
  allAnimal,
  allVisita,
  allAspirante,
  tiempo,
  AspiranteId,
  AnimalId,
  VisitaId,
  TrabajadorId,
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
    setPath('/solicitud')
    setValues({})
    setIds(null)
  }

  const handleValues = id => {
    setIds(id)
    const res = allSolicitud.filter(x => x.id === id)
    if (res) {
      setValues(res[0])
      setOpen(true)
      setPath('/solicitud/create')
    }
  }
  const save = () => {
    saveData()
    setOpen(false)
    setIds(null)
  }

  const columns = [
    { field: 'tiempo', headerName: 'Tiempo', width: 150 },
    {
      field: 'Aspirante',
      headerName: 'Aspirante',
      width: 150,
      valueGetter: ({ row }) => row?.Aspirante?.nombre
    },
    {
      field: 'Animale',
      headerName: 'Animal',
      width: 150,
      valueGetter: ({ row }) => row?.Animale?.nombre
    },
    {
      field: 'Visita',
      headerName: 'Visita',
      width: 150,
      valueGetter: ({ row }) => row?.Visitum?.descripcion
    },
    {
      field: 'Trabajador',
      headerName: 'Trabajador',
      width: 150,
      valueGetter: ({ row }) => row?.Trabajador?.nombre
    },
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
  const datos = { rows: allSolicitud, columns }
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
      {path === '/solicitud' ? (
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
                  {ids ? 'Actualizar Solicitud' : 'Crear Solicitud'}
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
                  Solicitud:
                </Typography>
                <Box sx={{ marginTop: 2 }} />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tiempo}
                    label="Tiempo"
                    onChange={handleChange('tiempo')}
                  >
                    <MenuItem value={'3 Meses'}>3 Meses</MenuItem>
                    <MenuItem value={'6 Meses'}>6 Meses</MenuItem>
                    <MenuItem value={'12 Meses'}>12 Meses</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ marginTop: 2 }} />
                <Autocomplete
                  disablePortal
                  id="VisitaId"
                  getOptionLabel={item => item.descripcion}
                  options={allVisita}
                  onChange={(event, newValue) => {
                    setValues({
                      ...values,
                      ['VisitaId']: newValue?.id
                    })
                  }}
                  fullWidth
                  renderInput={params => (
                    <TextField {...params} label="Visita" />
                  )}
                />
                <Box sx={{ marginTop: 2 }} />
                <Autocomplete
                  disablePortal
                  id="AspiranteId"
                  getOptionLabel={item => item.nombre}
                  options={allAspirante}
                  onChange={(event, newValue) => {
                    setValues({
                      ...values,
                      ['AspiranteId']: newValue?.id
                    })
                  }}
                  fullWidth
                  renderInput={params => (
                    <TextField {...params} label="Aspirante" />
                  )}
                />
                <Box sx={{ marginTop: 2 }} />

                <Autocomplete
                  disablePortal
                  id="AnimalId"
                  getOptionLabel={item => item.nombre}
                  options={allAnimal}
                  onChange={(event, newValue) => {
                    setValues({
                      ...values,
                      ['AnimalId']: newValue?.id
                    })
                  }}
                  fullWidth
                  renderInput={params => (
                    <TextField {...params} label="Animal" />
                  )}
                />
                <Box sx={{ marginTop: 2 }} />
                <Autocomplete
                  disablePortal
                  id="TrabajadorId"
                  getOptionLabel={item => item.nombre}
                  options={allTrabajador}
                  onChange={(event, newValue) => {
                    setValues({
                      ...values,
                      ['TrabajadorId']: newValue?.id
                    })
                  }}
                  fullWidth
                  renderInput={params => (
                    <TextField {...params} label="Trabajador" />
                  )}
                />
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    </Box>
  )
}

export default SolicitudView
