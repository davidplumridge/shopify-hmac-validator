# Shopify HMAC Validator

A lightweight package to validate Shopify HMAC codes

## Usage

### Validate the HMAC of a user request:

    const { isShopifyHmacValid } = require('shopify-hmac-validator')
    isShopifyHmacValid("my_secret", "full_query_string")

### Validate the HMAC of a webhook request:

    const { isShopifyWebhookHmacValid } = require('shopify-hmac-validator')
    isShopifyWebhookHmacValid("my_secret", "full_query_string")

## More examples

See the repo __tests__ for more examples.