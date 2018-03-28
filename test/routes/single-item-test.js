const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:

  describe('GET', () => {

    it('renders an item with a title and description', async () => {
      // define test item and seed it to database:
      const item = await seedItemToDatabase({title: 'Test Item', description: 'Item description placeholder text.'});

      // request the 'single-item-view' response for the seeded test-item:
      const response = await request(app)
        .get('/items/' + item._id);

      // check that title and description from response matches expected values:
      assert.include(parseTextFromHTML(response.text, `#item-${item._id} #item-title`), item.title);
      assert.include(parseTextFromHTML(response.text, `#item-${item._id} #item-description`), item.description);
    });

  });

});
