'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, ProgressBar, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

const MultiStepForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    instagram: '',
    comoNosConociste: '',
    experienciaViaje: '',
    importanciaCompartir: '',
    ritualPersonal: '',
    filosofiaViaje: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  // Estado para controlar si estamos en modo desarrollo
  const [isDev, setIsDev] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Verificar si estamos en desarrollo
  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Función para mostrar el modal directamente (solo para desarrollo)
  const showModalForDev = () => {
    setShowThankYouModal(true);
  };

  // Calcular el progreso basado en el paso actual
  const calculateProgress = () => {
    return (step / 2) * 100;
  };

  // Función para validar el teléfono
  const validatePhone = (phone) => {
    // Permitir números de 10 a 15 dígitos, solo números, opcionalmente '+' al inicio
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return 'El número debe tener entre 10 y 15 dígitos y solo puede contener números (y opcionalmente + al inicio)';
    }
    return '';
  };

  // Función para validar email
  const validateEmail = (email) => {
    // Validar formato general de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'El correo debe tener un formato válido (ejemplo@dominio.com)';
    }
    return '';
  };

  // Función para validar texto (mínimo 10 caracteres, sin palabras inapropiadas)
  const validateText = (text, min = 10) => {
    const inappropriateWords = ['spam', 'test', 'prueba', 'xxx', 'porn', 'sex'];
    const words = text.toLowerCase().split(' ');
    for (const word of inappropriateWords) {
      if (words.includes(word)) {
        return 'El texto contiene palabras no permitidas';
      }
    }
    if (text.length < min) {
      return `El texto debe tener al menos ${min} caracteres`;
    }
    return '';
  };

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Validar el campo específico
    let error = '';
    if (name === 'telefono') {
      error = validatePhone(value);
    } else if (name === 'email') {
      error = validateEmail(value);
    } else if ([
      'experienciaViaje',
      'importanciaCompartir',
      'ritualPersonal',
      'filosofiaViaje'
    ].includes(name)) {
      error = validateText(value, 10);
    } else if ([
      'nombre',
      'apellidos',
      'instagram'
    ].includes(name)) {
      error = validateText(value, 3);
    }
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Maneja los cambios del campo de teléfono
  const handlePhoneChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      telefono: value
    }));
    const error = validatePhone(value);
    setErrors(prev => ({
      ...prev,
      telefono: error
    }));
  };

  // Evita submit con Enter en el paso 1
  const handleKeyDown = (e) => {
    if (step === 1 && e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Validar el formulario antes de avanzar o enviar
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
      else {
        const nombreError = validateText(formData.nombre, 3);
        if (nombreError) newErrors.nombre = nombreError;
      }
      if (!formData.apellidos) newErrors.apellidos = 'Los apellidos son requeridos';
      else {
        const apellidosError = validateText(formData.apellidos, 3);
        if (apellidosError) newErrors.apellidos = apellidosError;
      }
      if (!formData.email) newErrors.email = 'El email es requerido';
      else {
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
      }
      if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
      else {
        const phoneError = validatePhone(formData.telefono);
        if (phoneError) newErrors.telefono = phoneError;
      }
      if (!formData.instagram) newErrors.instagram = 'El usuario de Instagram es requerido';
      else {
        const instaError = validateText(formData.instagram, 3);
        if (instaError) newErrors.instagram = instaError;
      }
      if (!formData.comoNosConociste) newErrors.comoNosConociste = 'Debes seleccionar cómo nos conociste';
    } else if (step === 2) {
      if (!formData.experienciaViaje) newErrors.experienciaViaje = 'Este campo es requerido';
      else {
        const experienciaError = validateText(formData.experienciaViaje, 10);
        if (experienciaError) newErrors.experienciaViaje = experienciaError;
      }
      if (!formData.importanciaCompartir) newErrors.importanciaCompartir = 'Este campo es requerido';
      else {
        const importanciaError = validateText(formData.importanciaCompartir, 10);
        if (importanciaError) newErrors.importanciaCompartir = importanciaError;
      }
      if (!formData.ritualPersonal) newErrors.ritualPersonal = 'Este campo es requerido';
      else {
        const ritualError = validateText(formData.ritualPersonal, 10);
        if (ritualError) newErrors.ritualPersonal = ritualError;
      }
      if (!formData.filosofiaViaje) newErrors.filosofiaViaje = 'Este campo es requerido';
      else {
        const filosofiaError = validateText(formData.filosofiaViaje, 10);
        if (filosofiaError) newErrors.filosofiaViaje = filosofiaError;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avanza al siguiente paso
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  // Retrocede al paso anterior
  const prevStep = () => {
    setStep(step - 1);
  };

  // Cierra el modal de agradecimiento
  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Trackear evento de formulario completado
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Formulario de Contacto',
            content_category: 'Contacto',
            value: 1,
            currency: 'COP'
          });
        }

        setSubmitStatus({
          success: true,
          message: 'Mensaje enviado con éxito. Nos pondremos en contacto pronto.'
        });
        // Resetear el formulario
        setFormData({
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          instagram: '',
          comoNosConociste: '',
          experienciaViaje: '',
          importanciaCompartir: '',
          ritualPersonal: '',
          filosofiaViaje: ''
        });
        setStep(1);
        // Redirigir a la página de gracias
        router.push('/gracias');
      } else {
        throw new Error(data.message || 'Error al enviar el formulario');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Hubo un problema al enviar el formulario. Por favor, intente de nuevo.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Renderiza el paso actual del formulario
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.nombre ? 'is-invalid' : ''}`}
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.apellidos ? 'is-invalid' : ''}`}
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                  {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.email ? 'is-invalid' : ''}`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Usuario de Instagram</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 mt-1 ${errors.instagram ? 'is-invalid' : ''}`}
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    onKeyDown={handleKeyDown}
                  />
                  {errors.instagram && <div className="invalid-feedback">{errors.instagram}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Número Celular</Form.Label>
                  <PhoneInput
                    className={`rounded-0 bg-white ${errors.telefono ? 'is-invalid' : ''}`}
                    country={'co'}
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: 'telefono',
                      required: true,
                      style: { 
                        width: '100%',
                        height: '38px',
                        fontSize: '1rem'
                      },
                      onKeyDown: handleKeyDown
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                    inputClass="form-control"
                    required
                  />
                  {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Cómo nos conociste?</Form.Label>
                  <Form.Select
                    className={`border-bottom rounded-0 bg-white ${errors.comoNosConociste ? 'is-invalid' : ''}`}
                    name="comoNosConociste"
                    value={formData.comoNosConociste}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Amigos">Recomendación de amigos</option>
                    <option value="Google">Búsqueda en Google</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                  {errors.comoNosConociste && <div className="invalid-feedback">{errors.comoNosConociste}</div>}
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-4 gap-5">
              <Button variant="outline-secondary" onClick={() => { }}>
                Cancelar
              </Button>
              <Button variant="success" type="button" onClick={nextStep}>
                Siguiente
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* <h2 className="mb-2">Aquí empieza tu viaje con Casa Selvaggio</h2>
            <p className="mb-4">Solo unos pocos son parte. Si estás entre ellos, te lo haremos saber…</p> */}

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Cuál fue la última experiencia de viaje verdaderamente transformadora que viviste en los últimos 12 meses?</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.experienciaViaje ? 'is-invalid' : ''}`}
                    as="textarea"
                    rows={1}
                    name="experienciaViaje"
                    value={formData.experienciaViaje}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  {errors.experienciaViaje && <div className="invalid-feedback">{errors.experienciaViaje}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Qué importancia tiene para ti compartir experiencias extraordinarias con personas que comparten tu visión de vida?</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.importanciaCompartir ? 'is-invalid' : ''}`}
                    type="text"
                    name="importanciaCompartir"
                    value={formData.importanciaCompartir}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  {errors.importanciaCompartir && <div className="invalid-feedback">{errors.importanciaCompartir}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Qué ritual personal nunca falta en tus viajes?</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.ritualPersonal ? 'is-invalid' : ''}`}
                    type="text"
                    name="ritualPersonal"
                    value={formData.ritualPersonal}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  {errors.ritualPersonal && <div className="invalid-feedback">{errors.ritualPersonal}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Si pudieras definir tu filosofía de viaje en tres palabras, ¿cuáles serían?</Form.Label>
                  <Form.Control
                    className={`border-bottom rounded-0 ${errors.filosofiaViaje ? 'is-invalid' : ''}`}
                    type="text"
                    name="filosofiaViaje"
                    value={formData.filosofiaViaje}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  {errors.filosofiaViaje && <div className="invalid-feedback">{errors.filosofiaViaje}</div>}
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4 gap-5">
              <Button variant="outline-secondary" onClick={() => setStep(1)}>
                Cancelar
              </Button>
              <Button variant="success" type="submit" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="my-lg-5">
      <Row className="justify-content-center">
        <Col>
          <div className="form-container p-lg-5 py-4 px-3 border rounded shadow-none">
            {/* Barra de progreso */}
            <h2 className="mb-2">Aquí empieza tu viaje con Casa Selvaggio</h2>
            <p className="mb-2">Solo unos pocos son parte. Si estás entre ellos, te lo haremos saber…</p>

            {/* Botón de prueba para mostrar el modal (solo en desarrollo) */}
            {/* {isDev && (
              <Button
                variant="warning"
                className="mb-3"
                onClick={showModalForDev}
                size="sm"
              >
                Ver Modal (Solo Dev)
              </Button>
            )} */}

            <div className="mb-4">
              <ProgressBar
                now={calculateProgress()}
                variant="success"
                className="progress-bar-custom"
              />
            </div>

            {submitStatus.message && (
              <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                {submitStatus.message}
              </div>
            )}

            {/* Renderizado condicional de pasos */}
            {step === 1 && (
              // Paso 1: solo JSX, sin form
              renderStep()
            )}
            {step === 2 && (
              // Paso 2: con form y submit
              <Form onSubmit={handleSubmit}>
                {renderStep()}
              </Form>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal de agradecimiento */}
      {/* <Modal show={showThankYouModal} onHide={handleCloseThankYouModal} centered>
        <div className='d-flex justify-content-center p-4'>
          <Image
            src="/images/logo-casaselvaggio-founders.svg"
            alt="Logo de la empresa"
            width={214}
            height={113}
            priority
          />
        </div>
        <Modal.Body>
          <p className='text-white text-center fw-bold mb-4'>Gracias por tu interés en formar parte de Casa Selvaggio</p>
          <p className='text-white text-center mb-4'>Solo unos pocos son parte. Si estás entre ellos, te lo haremos saber…</p>
        </Modal.Body>
        <Button className='d-inline-block btn btn-white m-auto mb-4' onClick={handleCloseThankYouModal}>
          Cerrar
        </Button>
      </Modal> */}
    </Container>
  );
};

export default MultiStepForm; 