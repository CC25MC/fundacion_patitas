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

const TrabajadorView = ({
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
  isLoading,
  error,
  handleChange,
  setValues,
  saveData,
  destroy
}) => {
  const { path, setPath } = useLocation()
  const [open, setOpen] = useState(true)
  const [switchs, setSwitch] = useState(true)
  const [ids, setIds] = useState(null)

  const handleClick = () => {
    setOpen(false)
    setPath('/animal')
    setValues({})
    setIds(null)
  }

  const handleValues = id => {
    setIds(id)
    const res = allAnimal.filter(x => x.id === id)
    if (res) {
      setValues(res[0])
      setOpen(true)
      setPath('/animal/create')
    }
  }
  const save = () => {
    saveData()
    setOpen(false)
    setIds(null)
  }

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'especie', headerName: 'Especie', width: 150 },
    { field: 'sexo', headerName: 'Sexo', width: 150 },
    { field: 'peso', headerName: 'Peso', width: 150 },
    { field: 'lugar_rescate', headerName: 'Lugar de rescate', width: 150 },
    { field: 'rescatador', headerName: 'Rescatador', width: 150 },
    { field: 'estado_salud', headerName: 'Estado de Salud', width: 150 },
    {
      field: 'Vacuna',
      headerName: 'Vacuna',
      width: 150,
      valueGetter: ({ row }) => row?.Vacuna?.nombre
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
  const datos = { rows: allAnimal, columns }
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
      {path === '/animal' ? (
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
                  {ids ? 'Actualizar Animal' : 'Crear Animal'}
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
                  Datos del Animal rescatado:
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
                  id="especie"
                  label="Especie"
                  variant="outlined"
                  value={especie}
                  onChange={handleChange('especie')}
                  fullWidth
                />

                <Box sx={{ marginTop: 2 }} />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sexo}
                    label="Sexo"
                    onChange={handleChange('sexo')}
                  >
                    <MenuItem value={'Macho'}>Macho</MenuItem>
                    <MenuItem value={'Hembra'}>Hembra</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="peso"
                  label="Peso"
                  variant="outlined"
                  value={peso}
                  onChange={handleChange('peso')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="lugar_rescate"
                  label="Lugar de rescate"
                  variant="outlined"
                  value={lugar_rescate}
                  onChange={handleChange('lugar_rescate')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="rescatador"
                  label="Rescatador"
                  variant="outlined"
                  value={rescatador}
                  onChange={handleChange('rescatador')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="estado_salud"
                  label="Estado de Salud"
                  variant="outlined"
                  value={estado_salud}
                  onChange={handleChange('estado_salud')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />
                <Autocomplete
                  disablePortal
                  id="VacunaId"
                  getOptionLabel={item => item.nombre}
                  options={allVacuna}
                  onChange={(event, newValue) => {
                    setValues({
                      ...values,
                      ['VacunaId']: newValue?.id
                    })
                  }}
                  fullWidth
                  renderInput={params => (
                    <TextField {...params} label="Vacuna" />
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
                    <TextField {...params} label="Trbajador" />
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

export default TrabajadorView
