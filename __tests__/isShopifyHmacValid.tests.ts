import { isShopifyHmacValid } from '../src/index';

describe('isShopifyHmacValid', () => {
  it('should return true for valid HMAC', () => {
    const secret = 'my_client_secret';
    const queryString = 'code=0907a61c0c8d55e99db179b68161bc00&hmac=6f3e70d7fb43c04289081a1299c72131e1df5b17e1600f690284410f7869ba08&shop=abc123.myshopify.com&state=0.6784241404160823&timestamp=1337178173';
    expect(isShopifyHmacValid(secret, queryString)).toBe(true);
  });

  it('should return false for invalid HMAC', () => {
    const secret = 'my_client_secret';
    const queryString = 'code=0907a61c0c8d55e99db179b68161bc00&hmac=100e2dadb827fcc8609e9d5ce208b2e9cdaab9df07390d2cbca10d7c328fc4bf&shop={shop}.myshopify.com&state=0.6784241404160823&timestamp=1337178173';
    expect(isShopifyHmacValid(secret, queryString)).toBe(false);
  });
});