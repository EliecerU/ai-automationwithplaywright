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
            | firstName | lastName | email          | password  |
            |           | QA       | user1@mail.com | Pass12345 |
            | Eliecer   |          | user2@mail.com | Pass12345 |
            | Eliecer   | QA       |                | Pass12345 |
            | Eliecer   | QA       | user3@mail.com |           |

    Scenario Outline: Registro fallido por email inválido
        When completo First Name con "Eliecer"
        And completo Last Name con "QA"
        And completo Email Address con "<emailInvalido>"
        And completo Password con "Pass12345"
        And envío el formulario de Create Account
        Then veo un mensaje de formato inválido para email
        And la cuenta no se crea

        Examples:
            | emailInvalido |
            | eliecer       |
            | eliecer@      |
            | @mail.com     |
            | eliecer@mail  |

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
