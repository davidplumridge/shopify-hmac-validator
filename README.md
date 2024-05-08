# Shopify HMAC Validator

A lightweight package for validating Shopify HMAC codes for user and webhook requests.

## Usage

### Validate the HMAC of a user request:

    const { isShopifyHmacValid } = require('shopify-hmac-validator')
    isShopifyHmacValid("my_secret", "full_query_string")

### Validate the HMAC of a webhook request:

    const { isShopifyWebhookHmacValid } = require('shopify-hmac-validator')
    isShopifyWebhookHmacValid("my_secret", "full_query_string")

### More examples

See the __tests__ folder in the repo for more examples.