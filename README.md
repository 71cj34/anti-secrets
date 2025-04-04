# anti-secrets

This is a worker, intended for use with Cloudflare, that intercepts traffic to an array of paths and replaces them with a response of your choosing.

The paths provided cover a wide range of hosting types, providers, and frameworks and should be suitable. However, you may also add extra relative paths if you wish.

## Usage

For Cloudflare:

1. Use the "Go To" button in the top right of the dashboard.
2. Navigate to the account-level page "Workers and Pages".
3. Create a worker.
4. Paste in the contents of the `main.js` file.
5. Deploy the worker and go to the domain-level **Workers Routes** page.
6. Add an HTTP route on the route `example.com/*`, and replace the `example.com` with your page.
7. Assign your worker to that route.
8. (optional) Test your worker by visiting a page guarded by the worker, eg. [example.com/.env](example.com/.env).