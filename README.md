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

Se utilizó ChatGPT como apoyo para:
- Crear la estructura base del proyecto
- Implementar el CRUD de transacciones
- Resolver errores de configuración
- Guiar el uso de Git y GitHub

El código fue entendido y probado manualmente.

## Video

https://youtu.be/be-rOeFG3c8