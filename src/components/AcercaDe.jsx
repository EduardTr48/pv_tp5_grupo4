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
  Stack,
  useTheme // Importa el hook useTheme
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
  const theme = useTheme(); 
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

  const integrantes = [
    { nombre: 'Eduardo Tiago Rodriguez', lu: 'LU20220202', avatar: '/src/assets/avatar1.jpg' },
    { nombre: 'Alex Gabriel Calatayud' , lu: 'LU20220203', avatar: '/src/assets/avatar2.jpg' },
    { nombre: 'Rodriguez Pablo Alejandro', lu: 'LU20220204', avatar: '/src/assets/avatar3.jpg'}
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: '12px', mb: 4, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}> 
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3,color: '#000000'}}>
          Acerca de Nuestro Proyecto
        </Typography>

        {/* Sección de Introducción */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" paragraph align="center" sx={{ color: theme.palette.text.secondary }}>
            Este proyecto fue desarrollado como Trabajo Práctico N°5 para la asignatura Programación Visual,
            perteneciente a la carrera de Analista Programador Universitario en la Facultad de Ingeniería de la UNJU.
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ color: theme.palette.text.secondary }}>
            La aplicación permite gestionar una lista de alumnos, con funcionalidades de creación, lectura, actualización y eliminación (CRUD).
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección de Tecnologías Utilizadas */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2,color: '#000000'}}>
            Tecnologías Utilizadas
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
            {tecnologias.map((tec) => (
              <Chip
                key={tec.nombre}
                label={tec.nombre}
                icon={<CodeIcon />}
                sx={{
                  backgroundColor: tec.color,
                  color: theme.palette.getContrastText(tec.color), // Asegura que el color del texto sea legible
                  fontWeight: 'bold',
                  p: 1
                }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección de Integrantes del Grupo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2,color: '#000000'}}>
            Integrantes del Grupo 4
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {integrantes.map((integrante) => (
              <Grid item xs={12} sm={6} md={4} key={integrante.lu}>
                <Card variant="outlined" sx={{ borderRadius: '8px', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 }, backgroundColor: theme.palette.background.default }}> 
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                    <Avatar
                      alt={integrante.nombre}
                      src={integrante.avatar}
                      sx={{ width: 80, height: 80, mb: 2, border: `2px solid ${theme.palette.primary.main}` }}
                    />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                      {integrante.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {integrante.lu}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip label="Estudiante" size="small" color="primary" />
                      <Chip label="Desarrollador" size="small" color="secondary" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

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

        {/* Información adicional del Proyecto */}
        <Card variant="outlined" sx={{ borderRadius: '8px', boxShadow: 3, mb: 4, backgroundColor: theme.palette.background.default }}> {/* Aplica los colores del tema */}
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2,color: '#000000'}}>
              Detalles del Proyecto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <SchoolIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Asignatura: Programación Visual
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <CalendarIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Año: 2025
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Facultad de Ingeniería UNJU
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <Box textAlign="center" mt={4}>
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

        {/* Pie de página */}
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