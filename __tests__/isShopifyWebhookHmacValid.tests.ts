import { isShopifyWebhookHmacValid } from '../src/index';

describe('isShopifyWebhookHmacValid', () => {
  it('should return true for valid HMAC', () => {
    const secret = 'my_client_secret';
    const body = 'some-body-text';
    const hmac = 'Q7m6YV83TpROCAjMfFMH2LzsDixWU4hOBquhlLHOyAE='; 
    expect(isShopifyWebhookHmacValid(secret, body, hmac)).toBe(true);
  });

  it('should return false for invalid HMAC', () => {
    const secret = 'secret';
    const body = JSON.stringify({ message: 'some-body-text' });
    const hmac = 'wrong-hmac';
    expect(isShopifyWebhookHmacValid(secret, body, hmac)).toBe(false);
  });
});