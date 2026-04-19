# API Finanzas

API REST de transacciones (ingresos/egresos) con Hono + Node.js + TypeScript. Datos en memoria.

## Endpoints

- GET /transactions
- GET /transactions/:id
- POST /transactions
- PUT /transactions/:id
- DELETE /transactions/:id

## Instalación

```bash
yarn install
```

## Ejecución

```bash
yarn dev
```

Servidor en:
http://localhost:3000

## Ejemplo POST

```json
{
  "description": "Recarga bip",
  "amount": 1500,
  "type": "expense"
}
```

## Uso de IA

Se utilizó ChatGPT para:
- Crear estructura base
- Implementar CRUD
- Resolver errores de configuración

El código fue entendido y probado manualmente.