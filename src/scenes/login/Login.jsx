import React from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

// Definir esquema de validación con Yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes manejar el envío de los datos del login
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
         
          display: 'flex',
          width: "100%",
          height: "100vh",
          flexDirection: { xs: 'column', md: 'row' },

        //   flexDirection: 'column',
            justifyContent: "center",
          alignItems: 'center',
          gap: "5rem"
          
        }}
      >

        <Box>
        <img src="/assets/financeImage.png" alt="Imagen Financiera" style={{ width: '100%', height: 'auto' }} />
        </Box>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} style={{ backgroundColor: "#203466", padding: "5rem", borderRadius: "12px"}}>
          {/* Campo de correo electrónico */}
          <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Correo Electrónico"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          {/* Campo de contraseña */}
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Link to={"/register"} style={{color: "white"}}>Registrate!</Link>

          {/* Botón de envío */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;
