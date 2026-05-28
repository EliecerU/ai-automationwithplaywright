// Generated from: src\feature\example.feature
import { test } from "playwright-bdd";

test.describe('Playwright site', () => {

  test('Check get started link', async ({ Given, When, Then, page }) => { 
    await Given('I am on home page', null, { page }); 
    await When('I click link "Get started"', null, { page }); 
    await Then('I see in title "Installation"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\feature\\example.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I am on home page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I click link \"Get started\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Get started\"","children":[{"start":14,"value":"Get started","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then I see in title \"Installation\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Installation\"","children":[{"start":16,"value":"Installation","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end