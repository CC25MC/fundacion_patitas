import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  Medication,
  Work,
  Pets,
  EmojiPeople,
  AssignmentInd,
  AddBox
} from '@mui/icons-material'
import { useLocation } from '../../Hooks'

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  backgroundColor: '#001922',
  color: 'white',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = theme => ({
  backgroundColor: '#001922',
  color: 'white',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(1, 1, 1)
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

const items = [
  {
    title: 'Solicitud',
    icon: <AddBox />,
    link: '/solicitud'
  },
  {
    title: 'Animales',
    icon: <Pets />,
    link: '/animal'
  },
  {
    title: 'Visitas',
    icon: <AssignmentInd />,
    link: '/visita'
  },
  {
    title: 'Trabajadores',
    icon: <Work />,
    link: '/trabajador'
  },
  {
    title: 'Aspirantes',
    icon: <EmojiPeople />,
    link: '/aspirante'
  },
  {
    title: 'Vacunas',
    icon: <Medication />,
    link: '/vacuna'
  }
]

export const Sidebar = ({ children }) => {
  const theme = useTheme()
  const { path, setPath } = useLocation()
  const [open, setOpen] = React.useState(false)

  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" theme={theme} open={open} sx={{}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            <MenuIcon
              sx={{
                color: 'white'
              }}
            />
          </IconButton>
        </DrawerHeader>
        <Divider
          sx={{
            backgroundColor: 'white'
          }}
        />
        <List>
          {items.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => {
                setPath(item.link)
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                marginTop: 2,
                backgroundColor: path === item.link && '#ffc900',
                borderRadius: path === item.link && '10px',
                ':hover': {
                  backgroundColor: '#ffc900',
                  borderRadius: '10px'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          p: 3,
          width: '100%',
          height: path === '/setting' ? '100vh' : '100%',
          backgroundColor: '#EDEFF3'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
