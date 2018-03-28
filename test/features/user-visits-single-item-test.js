const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the items/create page', () => {
    describe('submits a new item', () => {
      it('and is rendered', () => {
        const itemToCreate = buildItemObject();
        // go to the items/create page:
        browser.url('/items/create');
        // fill out the item values on the page:
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        // submit the item:
        browser.click('#submit-button');
        // click the submitted item:
        browser.click('.item-card a');
        // check that the submitted item's values appear:
        assert.include(browser.getText('body'), itemToCreate.description);
      });
    });
});
