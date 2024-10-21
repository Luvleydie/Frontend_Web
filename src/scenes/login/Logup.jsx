import React from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Esquema de validación con Yup
const registerSchema = yup.object().shape({
  name: yup
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

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data),
      });
      
      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Guardar el id en localStorage
      if (responseData.newUser._id) {
        const id = localStorage.setItem('userId', responseData.newUser._id);
        if(!id){
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Te has registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          navigate('/finance-form')
        }
        console.log('ID guardado en localStorage:', responseData.newUser._id);
      }
  
      console.log('Respuesta del servidor:', responseData);


    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
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
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.fullName.message : ''}
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
