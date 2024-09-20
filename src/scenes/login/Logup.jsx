import React from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

// Esquema de validación con Yup
const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('El nombre completo es requerido'),
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes manejar el envío de los datos de registro
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          width: "100%",
          height: "100vh",
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: "center",
          alignItems: 'center',
          gap: "5rem"
        }}
      >

        <Box>
          <img src="/assets/financeImage.png" alt="Imagen Financiera" style={{ width: '100%', height: 'auto' }} />
        </Box>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} style={{ backgroundColor: "#203466", padding: "5rem", borderRadius: "12px" }}>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>

          {/* Campo de nombre completo */}
          <TextField
            margin="normal"
            fullWidth
            label="Nombre Completo"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName ? errors.fullName.message : ''}
          />

          {/* Campo de correo electrónico */}
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

          {/* Campo de confirmación de contraseña */}
          <TextField
            margin="normal"
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />

          <Link to={"/"} style={{ color: "white", display: 'block', marginTop: '1rem' }}>
            Ya tienes una cuenta? Inicia sesión
          </Link>

          {/* Botón de registro */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
