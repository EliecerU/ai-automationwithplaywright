// Generated from: src\feature\signup.feature
import { test } from "playwright-bdd";

test.describe('Creación de cuenta en Sauce Demo', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('que estoy en la página de registro de Sauce Demo', null, { page }); 
  });
  
  test('Registro exitoso con datos válidos', async ({ When, Then, And, page }) => { 
    await When('completo First Name con "Eliecer"', null, { page }); 
    await And('completo Last Name con "QA"', null, { page }); 
    await And('completo Email Address con un email único válido', null, { page }); 
    await And('completo Password con una contraseña válida', null, { page }); 
    await And('envío el formulario de Create Account', null, { page }); 
    await Then('la cuenta se crea correctamente', null, { page }); 
    await And('el usuario queda autenticado o redirigido a una vista de cuenta válida', null, { page }); 
  });

  test.describe('Registro fallido por campo obligatorio vacío', () => {

    test('Example #1', async ({ When, Then, And, page }) => { 
      await When('completo First Name con ""', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con "user1@mail.com"', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de validación de campo obligatorio', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

    test('Example #2', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con ""', null, { page }); 
      await And('completo Email Address con "user2@mail.com"', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de validación de campo obligatorio', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

    test('Example #3', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con ""', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de validación de campo obligatorio', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

    test('Example #4', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con "user3@mail.com"', null, { page }); 
      await And('completo Password con ""', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de validación de campo obligatorio', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

  });

  test.describe('Registro fallido por email inválido', () => {

    test('Example #1', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con "eliecer"', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de formato inválido para email', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

    test('Example #2', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con "eliecer@"', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de formato inválido para email', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

    test('Example #3', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con "@mail.com"', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de formato inválido para email', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

    test('Example #4', async ({ When, Then, And, page }) => { 
      await When('completo First Name con "Eliecer"', null, { page }); 
      await And('completo Last Name con "QA"', null, { page }); 
      await And('completo Email Address con "eliecer@mail"', null, { page }); 
      await And('completo Password con "Pass12345"', null, { page }); 
      await And('envío el formulario de Create Account', null, { page }); 
      await Then('veo un mensaje de formato inválido para email', null, { page }); 
      await And('la cuenta no se crea', null, { page }); 
    });

  });

  test('Registro fallido con email ya registrado', async ({ Given, When, Then, And, page }) => { 
    await Given('existe una cuenta previa con email "existing_user@mail.com"', null, { page }); 
    await When('intento crear cuenta con ese mismo email', null, { page }); 
    await Then('veo un mensaje indicando que el email ya está en uso', null, { page }); 
    await And('la cuenta no se crea', null, { page }); 
  });

  test('Verificación post-registro en login', async ({ Given, When, Then, And, page }) => { 
    await Given('tengo una cuenta recién creada', null, { page }); 
    await When('navego a la página de login', null, { page }); 
    await And('inicio sesión con las credenciales registradas', null, { page }); 
    await Then('accedo correctamente como cliente autenticado', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\feature\\signup.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And completo Email Address con un email único válido","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And completo Password con una contraseña válida","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then la cuenta se crea correctamente","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And el usuario queda autenticado o redirigido a una vista de cuenta válida","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When completo First Name con \"\"","stepMatchArguments":[{"group":{"start":24,"value":"\"\"","children":[{"start":25,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"user1@mail.com\"","stepMatchArguments":[{"group":{"start":27,"value":"\"user1@mail.com\"","children":[{"start":28,"value":"user1@mail.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de validación de campo obligatorio","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"\"","stepMatchArguments":[{"group":{"start":23,"value":"\"\"","children":[{"start":24,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"user2@mail.com\"","stepMatchArguments":[{"group":{"start":27,"value":"\"user2@mail.com\"","children":[{"start":28,"value":"user2@mail.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de validación de campo obligatorio","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"\"","stepMatchArguments":[{"group":{"start":27,"value":"\"\"","children":[{"start":28,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de validación de campo obligatorio","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"user3@mail.com\"","stepMatchArguments":[{"group":{"start":27,"value":"\"user3@mail.com\"","children":[{"start":28,"value":"user3@mail.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And completo Password con \"\"","stepMatchArguments":[{"group":{"start":22,"value":"\"\"","children":[{"start":23,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de validación de campo obligatorio","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":45,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":69,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"eliecer\"","stepMatchArguments":[{"group":{"start":27,"value":"\"eliecer\"","children":[{"start":28,"value":"eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":71,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de formato inválido para email","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":76,"pickleLine":46,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":78,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":79,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"eliecer@\"","stepMatchArguments":[{"group":{"start":27,"value":"\"eliecer@\"","children":[{"start":28,"value":"eliecer@","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":80,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de formato inválido para email","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":86,"pickleLine":47,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":88,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"@mail.com\"","stepMatchArguments":[{"group":{"start":27,"value":"\"@mail.com\"","children":[{"start":28,"value":"@mail.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":90,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de formato inválido para email","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":48,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When completo First Name con \"Eliecer\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Eliecer\"","children":[{"start":25,"value":"Eliecer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And completo Last Name con \"QA\"","stepMatchArguments":[{"group":{"start":23,"value":"\"QA\"","children":[{"start":24,"value":"QA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":99,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And completo Email Address con \"eliecer@mail\"","stepMatchArguments":[{"group":{"start":27,"value":"\"eliecer@mail\"","children":[{"start":28,"value":"eliecer@mail","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":100,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And completo Password con \"Pass12345\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Pass12345\"","children":[{"start":23,"value":"Pass12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":101,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And envío el formulario de Create Account","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje de formato inválido para email","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":108,"pickleLine":50,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given existe una cuenta previa con email \"existing_user@mail.com\"","stepMatchArguments":[{"group":{"start":35,"value":"\"existing_user@mail.com\"","children":[{"start":36,"value":"existing_user@mail.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When intento crear cuenta con ese mismo email","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then veo un mensaje indicando que el email ya está en uso","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And la cuenta no se crea","stepMatchArguments":[]}]},
  {"pwTestLine":115,"pickleLine":56,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given que estoy en la página de registro de Sauce Demo","isBg":true,"stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Given tengo una cuenta recién creada","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"When navego a la página de login","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"And inicio sesión con las credenciales registradas","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then accedo correctamente como cliente autenticado","stepMatchArguments":[]}]},
]; // bdd-data-end