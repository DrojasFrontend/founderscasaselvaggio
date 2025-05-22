'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, ProgressBar, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

import Image from 'next/image';

const MultiStepForm = () => {
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

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja los cambios del campo de teléfono
  const handlePhoneChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      telefono: value
    }));
  };

  // Evita submit con Enter en el paso 1
  const handleKeyDown = (e) => {
    if (step === 1 && e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Avanza al siguiente paso
  const nextStep = () => {
    setStep(step + 1);
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
        // Mostrar el modal de agradecimiento
        setShowThankYouModal(true);
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
                    className="border-bottom rounded-0"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    className="border-bottom rounded-0"
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="border-bottom rounded-0"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Usuario de Instagram</Form.Label>
                  <Form.Control
                    className="border-bottom rounded-0 mt-1"
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Número Celular</Form.Label>
                  <PhoneInput
                    className="rounded-0 bg-white"
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
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Cómo nos conociste?</Form.Label>
                  <Form.Select
                    className="border-bottom rounded-0 bg-white"
                    name="comoNosConociste"
                    value={formData.comoNosConociste}
                    onChange={handleChange}
                    required
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Amigos">Recomendación de amigos</option>
                    <option value="Google">Búsqueda en Google</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
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
                    className="border-bottom rounded-0"
                    as="textarea"
                    rows={1}
                    name="experienciaViaje"
                    value={formData.experienciaViaje}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Qué importancia tiene para ti compartir experiencias extraordinarias con personas que comparten tu visión de vida?</Form.Label>
                  <Form.Control
                    className="border-bottom rounded-0"
                    type="text"
                    name="importanciaCompartir"
                    value={formData.importanciaCompartir}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>¿Qué ritual personal nunca falta en tus viajes?</Form.Label>
                  <Form.Control
                    className="border-bottom rounded-0"
                    type="text"
                    name="ritualPersonal"
                    value={formData.ritualPersonal}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 bg-white p-2 px-3">
                  <Form.Label>Si pudieras definir tu filosofía de viaje en tres palabras, ¿cuáles serían?</Form.Label>
                  <Form.Control
                    className="border-bottom rounded-0"
                    type="text"
                    name="filosofiaViaje"
                    value={formData.filosofiaViaje}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
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
      <Modal show={showThankYouModal} onHide={handleCloseThankYouModal} centered>
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
      </Modal>
    </Container>
  );
};

export default MultiStepForm; 