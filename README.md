# Candidate Validation API

REST API for validating candidate scores with deterministic status rules, automated tests, and Docker deployment.

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

## Score Validation

The API accepts a numeric `score` from `0` to `100`.

* A non-empty numeric string such as `"90"` is converted to a number.
* A missing or `null` score is rejected with `400 Bad Request`.
* Negative values, scores above `100`, and non-numeric values are rejected with `400 Bad Request`.

Status rules:

* `0–49` → `rejected`
* `50–89` → `manual_review`
* `90–100` → `approved`

## Response Examples

Rejected:

```json
{
  "status": "rejected"
}
```

Manual review:

```json
{
  "status": "manual_review"
}
```

Approved:

```json
{
  "status": "approved"
}
```

Invalid score — `400 Bad Request`:

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

## Docker Compose

The existing external Docker network `n8n_default` is required.

Start the service:

```bash
docker compose up -d --build
```

Update the service after project changes:

```bash
docker compose up -d --build
```

## Project structure

```text
src/
  app.js       Express application and validation endpoint
  server.js    Server entry point
test/
  candidates.test.js  Endpoint tests
```
