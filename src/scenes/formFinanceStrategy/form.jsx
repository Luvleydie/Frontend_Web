import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Paper, Typography, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Importa el ícono de información
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import Swal from 'sweetalert2';


// Esquema de validación con Yup
const schema = yup.object().shape({
  frecuenciaCompra: yup.string().required('La frecuencia de compra es requerida'),
  productosMasComprados: yup.string().required('Este campo es requerido'),
  presupuestoMensual: yup.number().required('Este campo es requerido'),
  salarioMensual: yup.number().required('El salario mensual es requerido'),
  ingresosAdicionales: yup.string().required('Este campo es requerido'),
  bonificaciones: yup.string().required('Este campo es requerido'),
  creditos: yup.string().required('Este campo es requerido'),
  ahorrosMensuales: yup.number().required('Este campo es requerido'),
  estadoSalud: yup.string().required('Este campo es requerido'),
  gastosSalud: yup.number().required('Este campo es requerido'),
  seguroMedico: yup.string().required('Este campo es requerido'),
  estadoCivil: yup.string().required('El estado civil es requerido'),
  aniosMatrimonio: yup.number().required('Este campo es requerido'),
  ingresosPareja: yup.number().required('Este campo es requerido'),
  deudasPareja:  yup.array().of(
    yup.object().shape({
      concepto: yup.string().required('El concepto es requerido'),
      monto: yup.number().required('El monto es requerido'),
    })
  ),
  numeroHijos: yup.number().required('Este campo es requerido'),
  edadesHijos: yup.string().required('Este campo es requerido'),
  gastosEducativos: yup.number().required('Este campo es requerido'),
  calificacionBuroCredito: yup.number().required('Este campo es requerido'),
  deudas: yup.array().of(
    yup.object().shape({
      concepto: yup.string().required('El concepto es requerido'),
      monto: yup.number().required('El monto es requerido'),
    })
  ),
});

const FinancialPlanForm = () => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);

    const userId = localStorage.getItem('userId');
  
    try {
     
      const response = await fetch(`http://localhost:5000/api/respuestas/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();

      if (responseData) {
        Swal.fire({
          title: 'Datos registrados',
          text: 'Tus datos se han enviado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        })

        navigate("/dashboard")
      }
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Algun dato del formulario es incorrecto, revisar el formulario.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      console.error('Error al enviar los datos:', error);
    }
  };
  

  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    ['Hábitos de Compra', 'Ingresos'],
    ['Salud Financiera', 'Salud'],
    ['Estado Civil', 'Situación Financiera de Pareja'],
    ['Información sobre Hijos', 'Buró de Crédito']
  ];

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleAddDebt = () => {
    const deudas = watch('deudas') || [];
    setValue('deudas', [...deudas, { concepto: '', monto: '' }]);
  };

  const handleRemoveDebt = (index) => {
    const deudas = watch('deudas') || [];
    deudas.splice(index, 1);
    setValue('deudas', deudas);
  };

  const handleAddDebtWife = () => {
    const deudas = watch('deudasPareja') || [];
    setValue('deudasPareja', [...deudas, { concepto: '', monto: '' }]);
  };

  const handleRemoveDebtWife = (index) => {
    const deudas = watch('deudasPareja') || [];
    deudas.splice(index, 1);
    setValue('deudasPareja', deudas);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h5" style={{ marginBottom: "3rem" }}>{sections[currentSection][0]}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Sección de Hábitos de Compra e Ingresos */}
        {currentSection === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
  <Controller
    name="frecuenciaCompra"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        select
        fullWidth
        label="Frecuencia de Compra"
        variant="outlined"
        error={!!errors.frecuenciaCompra}
        helperText={errors.frecuenciaCompra?.message}
      >
        <MenuItem value="semanal">Semanal</MenuItem>
        <MenuItem value="mensual">Mensual</MenuItem>
        <MenuItem value="ocasional">Ocasional</MenuItem>
      </TextField>
    )}
  />
</Grid>


            <Grid item xs={12} md={6}>
  <Controller
    name="productosMasComprados"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label="Tipo de productos más comprados"
        fullWidth
        variant="outlined"
        error={!!errors.productosMasComprados}
        helperText={errors.productosMasComprados?.message}
        InputProps={{
          style: { color: 'white' }, // Cambia el color del texto aquí
        }}
        InputLabelProps={{
          style: { color: 'white' }, // Cambia el color de la etiqueta aquí
        }}
      />
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="presupuestoMensual"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Presupuesto Mensual
            <Tooltip 
              title="Aquí puedes describir la cantidad de dinero que piensas gastar en un mes."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.presupuestoMensual}
        helperText={errors.presupuestoMensual?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="salarioMensual"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Salario Mensual
            <Tooltip 
              title="Aquí puedes describir la cantidad de dinero que ganas en un mes con tu trabajo fijo."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.salarioMensual}
        helperText={errors.salarioMensual?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="ingresosAdicionales"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Ingresos Adicionales
            <Tooltip 
              title="Aquí puedes describir cualquier bonificación que recibas dentro de tu trabajo fijo, como horas extra o recompensas adicionales."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.ingresosAdicionales}
        helperText={errors.ingresosAdicionales?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="bonificaciones"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Bonificaciones
            <Tooltip 
              title="Aquí puedes describir cualquier bonificación que recibas fuera de tu trabajo fijo, como trabajos secundarios."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.bonificaciones}
        helperText={errors.bonificaciones?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}

        {/* Sección de Salud Financiera y Salud */}
        {currentSection === 1 && (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
  <Controller
    name="creditos"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Detalles de créditos actuales
            <Tooltip 
              title="Aquí puedes describir los créditos o préstamos activos, incluyendo montos y plazos."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        error={!!errors.creditos}
        helperText={errors.creditos?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>


    <Grid item xs={12} md={6}>
  <Controller
    name="ahorrosMensuales"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Ahorros mensuales
            <Tooltip 
              title="Aquí puedes describir tus ahorros mensuales, incluyendo cualquier detalle relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.ahorrosMensuales}
        helperText={errors.ahorrosMensuales?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

    
    <Grid item xs={12} md={6}>
  <Controller
    name="estadoSalud"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Estado de salud
            <Tooltip 
              title="Aquí puedes describir tu estado de salud actual, incluyendo cualquier condición médica relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.estadoSalud}
        helperText={errors.estadoSalud?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

    
    <Grid item xs={12} md={6}>
  <Controller
    name="gastosSalud"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Gastos en salud
            <Tooltip 
              title="Aquí puedes describir los gastos relacionados con la salud, incluyendo consultas médicas, medicamentos y otros tratamientos."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.gastosSalud}
        helperText={errors.gastosSalud?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

    
    <Grid item xs={12} md={6}>
  <Controller
    name="seguroMedico"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Seguro médico
            <Tooltip 
              title="Aquí puedes describir los detalles de tu seguro médico, incluyendo cobertura y proveedor."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.seguroMedico}
        helperText={errors.seguroMedico?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>


    {/* Sección de Deudas */}
    <Grid item xs={12}>
      <Typography variant="h6" style={{ marginBottom: "1rem" }}>Deudas</Typography>
      {watch('deudas')?.map((deuda, index) => (
        <Grid container spacing={2} key={index} style={{ marginBottom: "1rem" }}>
          <Grid item xs={12} md={6}>
  <Controller
    name={`deudas[${index}].concepto`}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Concepto de la deuda
            <Tooltip 
              title="Aquí puedes describir el concepto de la deuda, incluyendo cualquier detalle relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.deudas?.[index]?.concepto}
        helperText={errors.deudas?.[index]?.concepto?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

          
          <Grid item xs={12} md={6}>
  <Controller
    name={`deudas[${index}].monto`}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Monto de la deuda
            <Tooltip 
              title="Aquí puedes describir el monto de la deuda, incluyendo cualquier detalle relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.deudas?.[index]?.monto}
        helperText={errors.deudas?.[index]?.monto?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

          
          <Grid item xs={12} md={12}>
            <Button variant="outlined" color="secondary" onClick={() => handleRemoveDebt(index)}>
              Eliminar Deuda
            </Button>
          </Grid>
        </Grid>
      ))}
      
      <Button
        onClick={handleAddDebt}
        sx={{
          backgroundColor: 'orange',  // Color de fondo del botón
          color: 'white',             // Color del texto
          '&:hover': {
            backgroundColor: 'darkred',  // Color de fondo cuando se hace hover
          },
        }}
      >
        Agregar Deuda
      </Button>
    </Grid>
  </Grid>
)}

        {/* Sección de Estado Civil y Situación Financiera de Pareja */}
        {currentSection === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
  <Controller
    name="estadoCivil"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        select
        fullWidth
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Estado Civil
            <Tooltip 
              title="Aquí puedes seleccionar tu estado civil actual, lo cual puede ser relevante para ciertos análisis o beneficios."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        variant="outlined"
        error={!!errors.estadoCivil}
        helperText={errors.estadoCivil?.message}
        
      >
        <MenuItem value="soltero">Soltero</MenuItem>
        <MenuItem value="casado">Casado</MenuItem>
        <MenuItem value="divorciado">Divorciado</MenuItem>
      </TextField>
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="aniosMatrimonio"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Años de matrimonio
            <Tooltip 
              title="Aquí puedes describir los años que has estado casado, lo cual puede ser relevante para ciertos análisis o beneficios."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.aniosMatrimonio}
        helperText={errors.aniosMatrimonio?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="ingresosPareja"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Ingresos de la pareja
            <Tooltip 
              title="Aquí puedes describir los ingresos de tu pareja, incluyendo cualquier detalle relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.ingresosPareja}
        helperText={errors.ingresosPareja?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            
            {/* Sección de Deudas */}
            <Grid item xs={12}>
              <Typography variant="h6" style={{ marginBottom: "1rem" }}>Deudas de tu pareja</Typography>
              {watch('deudasPareja')?.map((deuda, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: "1rem" }}>
                <Grid item xs={12} md={6}>
  <Controller
    name={`deudasPareja[${index}].concepto`}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Concepto de la deuda
            <Tooltip 
              title="Aquí puedes describir el concepto de la deuda de tu pareja, incluyendo cualquier detalle relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.deudasPareja?.[index]?.concepto}
        helperText={errors.deudasPareja?.[index]?.concepto?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

                  <Grid item xs={12} md={6}>
  <Controller
    name={`deudasPareja[${index}].monto`}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Monto de la deuda
            <Tooltip 
              title="Aquí puedes describir el monto de la deuda de tu pareja, incluyendo cualquier detalle relevante."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.deudasPareja?.[index]?.monto}
        helperText={errors.deudasPareja?.[index]?.monto?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

                  <Grid item xs={12} md={12}>
                    <Button variant="outlined" color="secondary" onClick={() => handleRemoveDebtWife(index)}>
                      Eliminar Deuda
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button
  onClick={handleAddDebtWife}
  sx={{
    backgroundColor: 'orange',  // Color de fondo del botón
    color: 'white',             // Color del texto
    '&:hover': {
      backgroundColor: 'darkorange',  // Color de fondo cuando se hace hover
    },
  }}
>
  Agregar Deuda
</Button>
            </Grid>
          </Grid>
        )}
          
        {/* Sección de Información sobre Hijos y Buró de Crédito */}
        {currentSection === 3 && (
          <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="numeroHijos"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                      Número de hijos
                      <Tooltip 
                        title="Aquí puedes describir el número de hijos que tienes, lo cual puede ser relevante para ciertos análisis o beneficios."
                        arrow
                        placement="top"
                        PopperProps={{
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              backgroundColor: '#333',
                              color: '#fff',
                            },
                          },
                        }}
                      >
                        <IconButton>
                          <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
                        </IconButton>
                      </Tooltip>
                    </div>
                  }
                  fullWidth
                  variant="outlined"
                  error={!!errors.numeroHijos}
                  helperText={errors.numeroHijos?.message}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                  InputProps={{
                    style: { color: '#fff' },
                  }}
                />
              )}
            />
          </Grid>
            <Grid item xs={12} md={6}>
  <Controller
    name="edadesHijos"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Edades de los hijos
            <Tooltip 
              title="Aquí puedes describir las edades de tus hijos, lo cual puede ser relevante para ciertos análisis o beneficios."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.edadesHijos}
        helperText={errors.edadesHijos?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
  <Controller
    name="gastosEducativos"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Gastos educativos
            <Tooltip 
              title="Aquí puedes describir los gastos relacionados con la educación, como matrículas, libros y otros materiales."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        error={!!errors.gastosEducativos}
        helperText={errors.gastosEducativos?.message}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>

            

<Grid item xs={12} md={6}>
  <Controller
    name="calificacionBuroCredito"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        error={!!errors.calificacionBuroCredito}
        helperText={errors.calificacionBuroCredito?.message}
        label={
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            Calificación del Buró de Crédito
            <Tooltip 
              title="La calificación del buró de crédito es una puntuación que refleja tu historial de pagos y deuda. Se utiliza para evaluar tu solvencia."
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                },
              }}
            >
              <IconButton>
                <InfoIcon sx={{ fontSize: 20, color: '#fff' }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          style: { color: '#fff' },
        }}
      />
    )}
  />
</Grid>


          </Grid>
        )}

        {/* Botones de navegación */}
        <Grid container justifyContent="space-between" marginTop={2}>
  <Button
    onClick={prevSection}
    disabled={currentSection === 0}
    sx={{
      backgroundColor: currentSection === 0 ? 'gray' : 'blue',
      color: 'white',
      '&:hover': {
        backgroundColor: currentSection === 0 ? 'gray' : 'darkblue',
      },
    }}
  >
    Anterior
  </Button>
  {currentSection === sections.length - 1 ? (
    <Button
      type="submit"
      sx={{
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkblue',
        },
      }}
    >
      Enviar
    </Button>
  ) : (
    <Button
      onClick={nextSection}
      sx={{
        backgroundColor: 'purple',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkpurple',
        },
      }}
    >
      Siguiente
    </Button>
  )}
</Grid>


      </form>
    </Paper>
  );
};

export default FinancialPlanForm;
