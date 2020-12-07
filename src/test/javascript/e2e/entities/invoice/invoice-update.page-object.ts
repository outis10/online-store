import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class InvoiceUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.invoice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#invoice-date'));
  detailsInput: ElementFinder = element(by.css('input#invoice-details'));
  statusSelect: ElementFinder = element(by.css('select#invoice-status'));
  paymentMethodSelect: ElementFinder = element(by.css('select#invoice-paymentMethod'));
  paymentDateInput: ElementFinder = element(by.css('input#invoice-paymentDate'));
  paymentAmountInput: ElementFinder = element(by.css('input#invoice-paymentAmount'));
  orderSelect: ElementFinder = element(by.css('select#invoice-order'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setPaymentMethodSelect(paymentMethod) {
    await this.paymentMethodSelect.sendKeys(paymentMethod);
  }

  async getPaymentMethodSelect() {
    return this.paymentMethodSelect.element(by.css('option:checked')).getText();
  }

  async paymentMethodSelectLastOption() {
    await this.paymentMethodSelect.all(by.tagName('option')).last().click();
  }
  async setPaymentDateInput(paymentDate) {
    await this.paymentDateInput.sendKeys(paymentDate);
  }

  async getPaymentDateInput() {
    return this.paymentDateInput.getAttribute('value');
  }

  async setPaymentAmountInput(paymentAmount) {
    await this.paymentAmountInput.sendKeys(paymentAmount);
  }

  async getPaymentAmountInput() {
    return this.paymentAmountInput.getAttribute('value');
  }

  async orderSelectLastOption() {
    await this.orderSelect.all(by.tagName('option')).last().click();
  }

  async orderSelectOption(option) {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect() {
    return this.orderSelect;
  }

  async getOrderSelectedOption() {
    return this.orderSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setDetailsInput('details');
    expect(await this.getDetailsInput()).to.match(/details/);
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.paymentMethodSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getPaymentDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentAmountInput('5');
    expect(await this.getPaymentAmountInput()).to.eq('5');
    await this.orderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
