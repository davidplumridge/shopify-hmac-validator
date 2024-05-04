import crypto from 'crypto';
import { URLSearchParams } from 'url';

/**
 * Checks if a value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 */
const isString = (value: any): boolean => typeof value === 'string' || value instanceof String;

/**
 * Checks if a value is a plain object.
 * @param value - The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
const isObject = (value: any): boolean => Boolean(value && typeof value === 'object' && value.constructor === Object);

/**
 * Validates the HMAC from a query string or object.
 * @param secret - The Shopify app secret.
 * @param qs - The query string or object containing the HMAC and other data.
 * @returns True if the HMAC is valid, false otherwise.
 */
const isShopifyHmacValid = (secret: string, qs: string | Record<string, any>): boolean => {
    if (!secret || !qs) return false;

    let params: URLSearchParams;

    if (isString(qs)) {
        params = new URLSearchParams(qs as string);
    } else if (isObject(qs)) {
        params = new URLSearchParams();
        for (const [key, value] of Object.entries(qs)) {
            params.append(key, value);
        }
    } else {
        return false;  // If qs is neither a string nor an object, return false immediately
    }

    const hmac = params.get('hmac');

    if (!hmac) return false;

    params.delete('hmac');  // Remove hmac from parameters to create the hash
    const serialized = params.toString();

    const generatedHmac = crypto.createHmac('SHA256', secret)
                                 .update(serialized)
                                 .digest('hex');
    
    return hmac === generatedHmac;
};

/**
 * Validates the HMAC for a Shopify webhook. Accepts either a raw UTF-8 string or a JSON object to encode.
 * @param secret - The Shopify app secret.
 * @param body - The raw body of the request as a string or a JSON object.
 * @param hmac - The HMAC to validate.
 * @returns True if the HMAC is valid, false otherwise.
 */
const isShopifyWebhookHmacValid = (secret: string, body: string | Record<string, any>, hmac: string): boolean => {
    if (!secret || !body || !hmac) return false;

    const rawBody: string = isObject(body) ? JSON.stringify(body) : body as string;
    const bufferBody = Buffer.from(rawBody, 'utf8');

    const hash = crypto.createHmac('SHA256', secret)
                       .update(bufferBody)
                       .digest('base64');
    
    return hmac === hash;
};

export {
    isShopifyHmacValid,
    isShopifyWebhookHmacValid,
};
