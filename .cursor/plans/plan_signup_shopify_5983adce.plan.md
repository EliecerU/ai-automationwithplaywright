---
name: Plan SignUp Shopify
overview: Diseñar un plan de pruebas BDD en Gherkin para el flujo de creación de cuenta en Sauce Demo (Shopify), cubriendo rutas positivas y validaciones clave del formulario.
todos: []
isProject: false
---

# Plan de pruebas Gherkin - Sign up Sauce Demo

## Alcance
- Sitio objetivo: [https://sauce-demo.myshopify.com/](https://sauce-demo.myshopify.com/)
- Flujo objetivo: [Create Account](https://sauce-demo.myshopify.com/account/register)
- Flujo de soporte para verificación posterior: [Customer Login](https://sauce-demo.myshopify.com/account/login)

## Objetivo del plan
Validar que un usuario pueda crear cuenta correctamente y que el formulario de registro maneje entradas inválidas o incompletas de forma consistente.

## Feature Gherkin propuesta
```gherkin
Feature: Creación de cuenta en Sauce Demo
  Como visitante del ecommerce
  Quiero crear una cuenta
  Para poder iniciar sesión y gestionar compras

  Background:
    Given que estoy en la página de registro de Sauce Demo

  Scenario: Registro exitoso con datos válidos
    When completo First Name con "Eliecer"
    And completo Last Name con "QA"
    And completo Email Address con un email único válido
    And completo Password con una contraseña válida
    And envío el formulario de Create Account
    Then la cuenta se crea correctamente
    And el usuario queda autenticado o redirigido a una vista de cuenta válida

  Scenario Outline: Registro fallido por campo obligatorio vacío
    When completo First Name con "<firstName>"
    And completo Last Name con "<lastName>"
    And completo Email Address con "<email>"
    And completo Password con "<password>"
    And envío el formulario de Create Account
    Then veo un mensaje de validación de campo obligatorio
    And la cuenta no se crea

    Examples:
      | firstName | lastName | email               | password   |
      |           | QA       | user1@mail.com      | Pass12345  |
      | Eliecer   |          | user2@mail.com      | Pass12345  |
      | Eliecer   | QA       |                     | Pass12345  |
      | Eliecer   | QA       | user3@mail.com      |            |

  Scenario Outline: Registro fallido por email inválido
    When completo First Name con "Eliecer"
    And completo Last Name con "QA"
    And completo Email Address con "<emailInvalido>"
    And completo Password con "Pass12345"
    And envío el formulario de Create Account
    Then veo un mensaje de formato inválido para email
    And la cuenta no se crea

    Examples:
      | emailInvalido   |
      | eliecer         |
      | eliecer@        |
      | @mail.com       |
      | eliecer@mail    |

  Scenario: Registro fallido con email ya registrado
    Given existe una cuenta previa con email "existing_user@mail.com"
    When intento crear cuenta con ese mismo email
    Then veo un mensaje indicando que el email ya está en uso
    And la cuenta no se crea

  Scenario: Verificación post-registro en login
    Given tengo una cuenta recién creada
    When navego a la página de login
    And inicio sesión con las credenciales registradas
    Then accedo correctamente como cliente autenticado
```

## Criterios de diseño de pruebas
- Usar emails únicos por ejecución para evitar colisiones (timestamp o UUID).
- Separar escenarios de validación cliente vs validación servidor según mensajes observables.
- Evitar dependencias entre escenarios (cada escenario crea/prepara sus datos).
- Mantener assertions orientadas a comportamiento visible (mensaje, redirección, estado autenticado).

## Riesgos y notas
- El sitio demo puede tener comportamiento simplificado o datos persistentes no controlados.
- Mensajes exactos de error pueden variar según tema/config de Shopify; validar por patrón semántico cuando aplique.
- Si no hay auto-login tras registro, adaptar el `Then` de éxito a confirmación/redirect real observada.

## Siguiente implementación sugerida
- Crear feature en `src/feature/signup.feature` con los escenarios priorizados (éxito + obligatorios + email duplicado).
- Implementar steps reutilizables en `src/steps/signup.ts`.
- Ejecutar con `npm run test:bdd` para validar estabilidad en Chromium/Firefox/WebKit.
