import { Add } from '@mui/icons-material'
import { useState } from 'react'
import { Box, Typography, Button, Divider } from '@mui/material'
import { useLocation, useLicense } from '../../Hooks'
import { titles } from '../../variables'
import { useSnackbar } from 'notistack'

export const AppBar = ({ action }) => {
  const { path, setPath } = useLocation()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          padding: 3
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          fontWeight={'bold'}
          gutterBottom
          component="div"
        >
          {titles[path]}
        </Typography>

        <Button
          sx={{ marginLeft: 'auto' }}
          onClick={() => {
            setPath(path + '/create')
            action(true)
          }}
          variant="contained"
        >
          <Add />
          Agregar
        </Button>
      </Box>
      <Divider />
    </>
  )
}
