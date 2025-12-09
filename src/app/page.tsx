import Link from 'next/link';
import { Button } from '@src/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HelpDeskPro</h1>
                <p className="text-xs text-gray-500">Sistema de Gestión de Tickets de Soporte Técnico</p>
              </div>
            </div>
            <Link href="/login">
              <Button className="bg-primary-900 hover:bg-primary-800 text-white">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6">¿Qué es HelpDeskPro?</h2>
              <p className="text-xl text-primary-100 leading-relaxed mb-8">
                HelpDeskPro es una plataforma web que centraliza la gestión de tickets de soporte técnico.
                Permite a clientes reportar problemas y a agentes de soporte resolver tickets de forma
                organizada, transparente y profesional.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                    Comenzar Gratis
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-white text-primary-900 hover:bg-gray-100">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-primary-800 rounded-2xl p-8 flex items-center justify-center h-96">
              <svg className="w-48 h-48 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Problema vs Solución */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">
                El Problema
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Las empresas que manejan soporte técnico enfrentan:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700 pt-1">Tickets perdidos en correos no respondidos</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700 pt-1">Sin registro centralizado de solicitudes</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700 pt-1">Falta de seguimiento claro del estado</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700 pt-1">Agentes sin recordatorios de tickets pendientes</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700 pt-1">Gerencia sin visibilidad de métricas</p>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                Nuestra Solución
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                HelpDeskPro ofrece:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-gray-700 pt-1">Un único sistema centralizado para todos los tickets</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-gray-700 pt-1">Estados claros y bien definidos</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-gray-700 pt-1">Historial completo de conversaciones</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-gray-700 pt-1">Notificaciones automáticas por correo</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-gray-700 pt-1">Recordatorios automáticos para agentes</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-gray-700 pt-1">Dashboard con métricas en tiempo real</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características Principales */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Características Principales</h2>
            <p className="text-xl text-gray-600">Todo lo que necesitas para gestionar soporte técnico profesionalmente</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión Centralizada</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos los tickets en un único lugar. Crea, edita y actualiza tickets con campos: Título, Descripción, Prioridad y Estado.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Roles y Permisos</h3>
              <p className="text-gray-600 leading-relaxed">
                Dos tipos de usuarios. Clientes reportan problemas, Agentes resuelven. Cada uno con permisos personalizados según su rol.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunicación Clara</h3>
              <p className="text-gray-600 leading-relaxed">
                Hilo de comentarios por ticket. Conversación centralizada entre cliente y agente. Historial completo sin correos sueltos.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automatización</h3>
              <p className="text-gray-600 leading-relaxed">
                Emails automáticos en eventos clave: creación de ticket, respuesta de agente, cierre de ticket. Recordatorios de tickets sin respuesta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles de Usuario */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Quiénes usan HelpDeskPro?</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">CLIENTE</h3>
                  <p className="text-gray-600">Usuario que reporta problemas</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-semibold">Un cliente puede:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Crear nuevos tickets de soporte</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Ver el estado en tiempo real</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Agregar comentarios o seguimiento</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Recibir notificaciones por correo</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Ver historial de todos sus tickets</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AGENTE DE SOPORTE</h3>
                  <p className="text-gray-600">Usuario que resuelve tickets</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-semibold">Un agente puede:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Ver todos los tickets del sistema</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Asignar tickets a agentes específicos</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Cambiar estado y prioridad</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Responder y resolver tickets</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Ver métricas y estadísticas</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Recibir recordatorios de tickets pendientes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Flujo de Trabajo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-xl text-gray-600">Flujo simple de un ticket desde creación hasta cierre</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cliente crea ticket</h3>
                  <p className="text-gray-600">El cliente describe su problema y lo envía al sistema</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sistema recibe ticket</h3>
                  <p className="text-gray-600">El ticket queda registrado y visible en el dashboard</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Agente asignado recibe notificación</h3>
                  <p className="text-gray-600">El sistema notifica al agente asignado por email</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Agente responde al cliente</h3>
                  <p className="text-gray-600">El agente investiga y responde con soluciones</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cliente recibe email con respuesta</h3>
                  <p className="text-gray-600">El cliente es notificado automáticamente</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Agente cierra el ticket</h3>
                  <p className="text-gray-600">Una vez resuelto, el agente marca el ticket como cerrado</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cliente recibe confirmación de cierre</h3>
                  <p className="text-gray-600">El sistema notifica que el caso fue resuelto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Qué beneficios trae?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-primary-50 border-primary-200 p-6 rounded-xl border text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Centralización</h3>
              <p className="text-gray-600">Un único lugar para gestionar todo</p>
            </div>
            <div className="bg-secondary-50 border-secondary-200 p-6 rounded-xl border text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trazabilidad</h3>
              <p className="text-gray-600">Historial completo de cada solicitud</p>
            </div>
            <div className="bg-accent-50 border-accent-200 p-6 rounded-xl border text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Automatización</h3>
              <p className="text-gray-600">Procesos sin intervención manual</p>
            </div>
            <div className="bg-primary-50 border-primary-200 p-6 rounded-xl border text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparencia</h3>
              <p className="text-gray-600">Clientes ven progreso en tiempo real</p>
            </div>
            <div className="bg-secondary-50 border-secondary-200 p-6 rounded-xl border text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eficiencia</h3>
              <p className="text-gray-600">Agentes responden más rápido</p>
            </div>
            <div className="bg-accent-50 border-accent-200 p-6 rounded-xl border text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Escalabilidad</h3>
              <p className="text-gray-600">Funciona para 10 o 1000 tickets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Para quién es ideal?</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg border border-primary-200">
                <svg className="w-6 h-6 text-primary-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Empresas de soporte técnico</span>
              </div>
              <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg border border-primary-200">
                <svg className="w-6 h-6 text-primary-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Equipos de desarrollo que atienden clientes</span>
              </div>
              <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg border border-primary-200">
                <svg className="w-6 h-6 text-primary-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Departamentos de atención al cliente</span>
              </div>
              <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg border border-primary-200">
                <svg className="w-6 h-6 text-primary-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Consultorías y agencias</span>
              </div>
              <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg border border-primary-200">
                <svg className="w-6 h-6 text-primary-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Freelancers que manejan múltiples clientes</span>
              </div>
              <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg border border-primary-200">
                <svg className="w-6 h-6 text-primary-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Startups que necesitan gestión profesional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Construido con tecnología moderna</h2>
            <p className="text-xl text-primary-100">HelpDeskPro usa las mejores herramientas disponibles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-primary-800 p-4 rounded-lg text-center border border-primary-700">
              <p className="font-semibold">Next.js 16</p>
            </div>
            <div className="bg-primary-800 p-4 rounded-lg text-center border border-primary-700">
              <p className="font-semibold">React + TypeScript</p>
            </div>
            <div className="bg-primary-800 p-4 rounded-lg text-center border border-primary-700">
              <p className="font-semibold">Tailwind CSS</p>
            </div>
            <div className="bg-primary-800 p-4 rounded-lg text-center border border-primary-700">
              <p className="font-semibold">PostgreSQL + Prisma</p>
            </div>
            <div className="bg-primary-800 p-4 rounded-lg text-center border border-primary-700">
              <p className="font-semibold">Autenticación con JWT</p>
            </div>
            <div className="bg-primary-800 p-4 rounded-lg text-center border border-primary-700">
              <p className="font-semibold">Nodemailer para emails</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">HelpDeskPro</span>
            </div>
            <p className="text-gray-400 mb-4">Sistema de Gestión de Tickets de Soporte Técnico</p>
            <p className="text-gray-500 text-sm mb-4">HelpDeskPro © 2025</p>
            <div className="flex justify-center gap-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Volver a inicio
              </Link>
              <a href="mailto:contacto@helpdeskpro.com" className="text-gray-400 hover:text-white transition-colors">
                contacto@helpdeskpro.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
