import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Paper, Typography, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Importa el ícono de información

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

      if (!responseData) {
        alert("Formulario agregado")
      }
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
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
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                    <option value="ocasional">Ocasional</option>
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
                    label="Presupuesto mensual"
                    fullWidth
                    variant="outlined"
                    error={!!errors.presupuestoMensual}
                    helperText={errors.presupuestoMensual?.message}
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
                    label="Salario mensual"
                    fullWidth
                    variant="outlined"
                    error={!!errors.salarioMensual}
                    helperText={errors.salarioMensual?.message}
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
                    label="Ingresos adicionales"
                    fullWidth
                    variant="outlined"
                    error={!!errors.ingresosAdicionales}
                    helperText={errors.ingresosAdicionales?.message}
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
                    label="Bonificaciones"
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                Detalles de créditos actuales
                <Tooltip title="Aquí puedes describir los créditos o préstamos activos, incluyendo montos y plazos.">
                  <IconButton>
                    <InfoIcon sx={{ fontSize: 20 }} /> {/* Ícono de información */}
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
            label="Ahorros mensuales"
            fullWidth
            variant="outlined"
            error={!!errors.ahorrosMensuales}
                    helperText={errors.ahorrosMensuales?.message}
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
            label="Estado de salud"
            fullWidth
            variant="outlined"
            error={!!errors.estadoSalud}
                    helperText={errors.estadoSalud?.message}
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
            label="Gastos en salud"
            fullWidth
            variant="outlined"
            error={!!errors.gastosSalud}
                    helperText={errors.gastosSalud?.message}
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
            label="Seguro médico"
            fullWidth
            variant="outlined"
            error={!!errors.seguroMedico}
                    helperText={errors.seguroMedico?.message}
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
                  label="Concepto de la deuda"
                  fullWidth
                  variant="outlined"
                  error={!!errors.deudas?.[index]?.concepto}
                  helperText={errors.deudas?.[index]?.concepto?.message}
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
                  label="Monto de la deuda"
                  fullWidth
                  variant="outlined"
                  error={!!errors.deudas?.[index]?.monto}
                  helperText={errors.deudas?.[index]?.monto?.message}
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
            backgroundColor: 'darkorange',  // Color de fondo cuando se hace hover
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
                    label="Estado Civil"
                    variant="outlined"
                    error={!!errors.estadoCivil}
                    helperText={errors.estadoCivil?.message}
                  >
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
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
                    label="Años de matrimonio"
                    fullWidth
                    variant="outlined"
                    error={!!errors.aniosMatrimonio}
                    helperText={errors.aniosMatrimonio?.message}
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
                    label="Ingresos de la pareja"
                    fullWidth
                    variant="outlined"
                    error={!!errors.ingresosPareja}
                    helperText={errors.ingresosPareja?.message}
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
                          label="Concepto de la deuda"
                          fullWidth
                          variant="outlined"
                          error={!!errors.deudasPareja?.[index]?.concepto}
                          helperText={errors.deudasPareja?.[index]?.concepto?.message}
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
                          label="Monto de la deuda"
                          fullWidth
                          variant="outlined"
                          error={!!errors.deudasPareja?.[index]?.monto}
                          helperText={errors.deudasPareja?.[index]?.monto?.message}
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
                    label="Número de hijos"
                    fullWidth
                    variant="outlined"
                    error={!!errors.numeroHijos}
                    helperText={errors.numeroHijos?.message}
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
                    label="Edades de los hijos"
                    fullWidth
                    variant="outlined"
                    error={!!errors.edadesHijos}
                    helperText={errors.edadesHijos?.message}
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
                    label="Gastos educativos"
                    fullWidth
                    variant="outlined"
                    error={!!errors.gastosEducativos}
                    helperText={errors.gastosEducativos?.message}
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Calificación del Buró de Crédito
            <Tooltip title="La calificación del buró de crédito es una puntuación que refleja tu historial de pagos y deuda. Se utiliza para evaluar tu solvencia.">
              <IconButton>
                <InfoIcon sx={{ fontSize: 20 }} /> {/* Ícono de información */}
              </IconButton>
            </Tooltip>
          </div>
        }
        fullWidth
        variant="outlined"
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
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkgreen',
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
