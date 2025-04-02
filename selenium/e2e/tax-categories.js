const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');

describe('tax categories', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:8000/admin');
  
    await driver.findElement(By.id('_username')).sendKeys('insert_your_username');
    await driver.findElement(By.id('_password')).sendKeys('insert_your_password');
    await driver.findElement(By.css('button.btn')).click();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver.get('http://localhost:8000/admin/tax-categories');
  });
  
  it('1. create a new tax category', async () => {
    await driver.findElement(By.css('.btn-list > .btn')).click();

    await driver.findElement(By.id('sylius_admin_tax_category_code')).sendKeys('Test_code');
    await driver.findElement(By.id('sylius_admin_tax_category_name')).sendKeys('Test name');
    await driver.findElement(By.id('sylius_admin_tax_category_description')).sendKeys('Test description');

    await driver.findElement(By.css('.btn-primary')).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Tax category has been successfully created.'));
  });

  it('2. create a tax category with same name and error occurs', async () => {
    await driver.findElement(By.css('.btn-list > .btn')).click();

    await driver.findElement(By.id('sylius_admin_tax_category_code')).sendKeys('Test_code');
    await driver.findElement(By.id('sylius_admin_tax_category_name')).sendKeys('Test name');
    await driver.findElement(By.id('sylius_admin_tax_category_description')).sendKeys('Test description');

    await driver.findElement(By.css('.btn-primary')).click();

    const errorText = await driver.findElement(By.css('body')).getText();
    assert(errorText.includes('This form contains errors.'));
  });

  it('3. create a new tax category with a blank code error occurs', async () => {
    await driver.findElement(By.css('.btn-list > .btn')).click();

    await driver.findElement(By.id('sylius_admin_tax_category_name')).sendKeys('Test name');
    await driver.findElement(By.id('sylius_admin_tax_category_description')).sendKeys('Test description');
    await driver.findElement(By.css('.btn-primary')).click();

    const errorText = await driver.findElement(By.css('body')).getText();
    assert(errorText.includes('Please enter tax category code.'));
  });

  it('4. create a new tax category with a blank name and error occurs', async () => {
    await driver.findElement(By.css('.btn-list > .btn')).click();

    await driver.findElement(By.id('sylius_admin_tax_category_code')).sendKeys('Test_code');
    await driver.findElement(By.id('sylius_admin_tax_category_description')).sendKeys('Test description');
    await driver.findElement(By.css('.btn-primary')).click();

    const errorText = await driver.findElement(By.css('body')).getText();
    assert(errorText.includes('Please enter tax category name.'));
  });

  it('5. create a new tax category with a blank description', async () => {
    await driver.findElement(By.css('.btn-list > .btn')).click();

    await driver.findElement(By.id('sylius_admin_tax_category_code')).sendKeys('Test_code_2');
    await driver.findElement(By.id('sylius_admin_tax_category_name')).sendKeys('Test name');
    await driver.findElement(By.css('.btn-primary')).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Tax category has been successfully created.'));
  });

  it('6. tax category edition', async () => {
    await driver.wait(until.elementLocated(By.css('.accordion-button')), 5000);

    await driver.findElement(By.css('a.btn.btn-icon')).click();
    await driver.findElement(By.id('sylius_admin_tax_category_description')).sendKeys('Test description');
    await driver.findElement(By.css('.btn-primary')).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Tax category has been successfully updated.'));
  });
  
  it('7. tax category deletion', async () => {
    await driver.wait(until.elementLocated(By.css('.accordion-button')), 5000);
    
    await driver.findElement(By.css('[data-test-modal="delete"]')).click();
    const deleteButton = await driver.wait(until.elementLocated(By.css('.modal-footer > button.btn.btn-danger')), 1000);
    await driver.wait(until.elementIsVisible(deleteButton), 5000);
    await deleteButton.click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Tax category has been successfully deleted.'));
  });

  it('8. check text count view tax category', async () => {
    await driver.wait(until.elementLocated(By.css('.accordion-button')), 5000);

    const footerText = await driver.findElement(By.css('.card-footer > .text-muted')).getText();
    assert(footerText.includes('Showing 1 to 2 of 2 entries'));
  });

  it('9. check pagination tax category', async () => {
    await driver.wait(until.elementLocated(By.css('.accordion-button')), 5000);

    const previousText = await driver.findElement(By.css('.pagination > :nth-child(1)')).getText();
    assert(previousText === 'Previous');
    const nextText = await driver.findElement(By.css('.pagination > :nth-child(3)')).getText();
    assert(nextText === 'Next');
  });
});
