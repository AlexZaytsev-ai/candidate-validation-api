# Candidate Validation API

A minimal Express API that validates a candidate score and returns a review decision.

## Technologies

- Node.js
- Express
- Jest
- Supertest

## Endpoint

`POST http://localhost:3000/candidates/validate`

Send a JSON request body with an optional `score` field:

```json
{
  "score": 90
}
```

## Score normalization and validation

- A missing `score` or `null` is treated as `0`.
- A non-empty numeric string is converted to a number.
- Finite scores from `0` to `100`, inclusive, are accepted.
- A negative score, a score above `100`, a non-numeric or empty string, and other unsupported values are rejected with `400 Bad Request`.

For accepted scores:

- `score < 90` returns `manual_review`.
- `score >= 90` returns `approved`.

## Response examples

Approved:

```json
{
  "status": "approved"
}
```

Manual review:

```json
{
  "status": "manual_review"
}
```

Invalid score (`400 Bad Request`):

```json
{
  "error": "Invalid score"
}
```

## Local development

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Run tests:

```bash
npm test
```

## Docker

Build the image:

```bash
docker build -t candidate-validation-api .
```

Run the container on port `3000`, accessible only from the VPS itself:

```bash
docker run --rm -p 127.0.0.1:3000:3000 candidate-validation-api
```

## Project structure

```text
src/
  app.js       Express application and validation endpoint
  server.js    Server entry point
test/
  candidates.test.js  Endpoint tests
```
