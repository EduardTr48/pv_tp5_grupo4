import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Stack
} from '@mui/material';
import {
  School as SchoolIcon,
  Code as CodeIcon,
  Group as GroupIcon,
  Star as StarIcon,
  GitHub as GitHubIcon,
  Web as WebIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AcercaDe = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate('/');
  };

  const tecnologias = [
    { nombre: 'React', color: '#61DAFB' },
    { nombre: 'JavaScript', color: '#F7DF1E' },
    { nombre: 'Material-UI', color: '#007FFF' },
    { nombre: 'CSS3', color: '#1572B6' },
    { nombre: 'HTML5', color: '#E34F26' },
    { nombre: 'React Router', color: '#CA4245' }
  ];

  const caracteristicas = [
    {
      icon: <SchoolIcon color="primary" />,
      titulo: 'Sistema Educativo',
      descripcion: 'Gestión completa de información estudiantil'
    },
    {
      icon: <CodeIcon color="primary" />,
      titulo: 'Tecnología Moderna',
      descripcion: 'Desarrollado con React y Material-UI'
    },
    {
      icon: <GroupIcon color="primary" />,
      titulo: 'Interfaz Intuitiva',
      descripcion: 'Diseño centrado en la experiencia del usuario'
    },
    {
      icon: <StarIcon color="primary" />,
      titulo: 'Funcionalidades Avanzadas',
      descripcion: 'CRUD completo con validaciones inteligentes'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2rem'
            }}
          >
            📚
          </Avatar>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Sistema de Gestión de Alumnos
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
            Una aplicación web moderna para la administración eficiente de información estudiantil
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Información del Proyecto */}
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom color="primary">
              Acerca del Proyecto
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Este sistema fue desarrollado como parte del <strong>Trabajo Práctico N°5</strong> 
              para la materia de <strong>Programación Visual</strong>. Representa una solución 
              integral para la gestión de información estudiantil, implementando las mejores 
              prácticas de desarrollo web moderno.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              El proyecto demuestra el uso avanzado de React, incluyendo hooks, manejo de estado, 
              routing, validaciones en tiempo real, y una interfaz de usuario responsiva y accesible 
              construida con Material-UI.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Información del Proyecto
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Fecha" secondary="2024" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Materia" secondary="Programación Visual" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Tipo" secondary="Trabajo Práctico N°5" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Grupo" secondary="Grupo 4" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Características */}
        <Typography variant="h4" gutterBottom color="primary" mb={3}>
          Características Principales
        </Typography>
        <Grid container spacing={3} mb={4}>
          {caracteristicas.map((caracteristica, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box mb={2}>
                    {caracteristica.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {caracteristica.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {caracteristica.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tecnologías */}
        <Typography variant="h4" gutterBottom color="primary" mb={3}>
          Tecnologías Utilizadas
        </Typography>
        <Box mb={4}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {tecnologias.map((tech, index) => (
              <Chip
                key={index}
                label={tech.nombre}
                sx={{
                  bgcolor: tech.color,
                  color: tech.nombre === 'JavaScript' ? '#000' : '#fff',
                  fontWeight: 'bold',
                  mb: 1
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Funcionalidades */}
        <Typography variant="h4" gutterBottom color="primary" mb={3}>
          Funcionalidades del Sistema
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Gestión de Alumnos
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Crear nuevos registros de alumnos" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Visualizar lista completa con filtros" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Editar información existente" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Eliminar registros con confirmación" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Características Técnicas
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Validaciones en tiempo real" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Prevención de datos duplicados" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Interfaz responsive y accesible" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary="Navegación con teclado" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Contacto */}
        <Card elevation={3} sx={{ bgcolor: 'primary.main', color: 'white', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Información de Contacto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    grupo4@
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <SchoolIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Universidad Nacional de Jujuy
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <GitHubIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                  https://github.com/EduardTr48/pv_tp5_grupo4
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Facultad de Ingeniería unju
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <Box textAlign="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleVolver}
              startIcon={<WebIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Volver al Inicio
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/alumnos')}
              startIcon={<SchoolIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Ver Alumnos
            </Button>
          </Stack>
        </Box>

        {/* Footer */}
        <Box textAlign="center" mt={4} pt={3} borderTop={1} borderColor="divider">
          <Typography variant="body2" color="text.secondary">
            © 2025 Grupo 4 - Programación Visual - Trabajo Práctico N°5
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Desarrollado con ❤️ usando React y Material-UI
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AcercaDe;
