import { serve } from '@hono/node-server'
import { Hono } from 'hono'

type Transaction = {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
}

const app = new Hono()

let transactions: Transaction[] = [
  {
    id: 1,
    description: 'Pago sueldo',
    amount: 500000,
    type: 'income',
  },
  {
    id: 2,
    description: 'Recarga Bip',
    amount: 12000,
    type: 'expense',
  },
  {
    id: 3,
    description: 'Compra de colación',
    amount: 6500,
    type: 'expense',
  },
  {
    id: 4,
    description: 'Pago de arriendo',
    amount: 250000,
    type: 'expense',
  }
]
app.get('/', (c) => {
  return c.json({ message: 'API Finanzas funcionando' }, 200)
})

app.get('/transactions', (c) => {
  return c.json(transactions, 200)
})

app.get('/transactions/:id', (c) => {
  const id = Number(c.req.param('id'))

  const transaction = transactions.find((t) => t.id === id)

  if (!transaction) {
    return c.json({ message: 'Transacción no encontrada' }, 404)
  }

  return c.json(transaction, 200)
})

app.post('/transactions', async (c) => {
  const body = await c.req.json()

  const { description, amount, type } = body as {
    description?: string
    amount?: number
    type?: 'income' | 'expense'
  }

  if (
    !description ||
    typeof amount !== 'number' ||
    (type !== 'income' && type !== 'expense')
  ) {
    return c.json({ message: 'Datos inválidos' }, 400)
  }

  const newTransaction: Transaction = {
    id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
    description,
    amount,
    type,
  }

  transactions.push(newTransaction)

  return c.json(newTransaction, 201)
})

app.put('/transactions/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()

  const transactionIndex = transactions.findIndex((t) => t.id === id)

  if (transactionIndex === -1) {
    return c.json({ message: 'Transacción no encontrada' }, 404)
  }

  const currentTransaction = transactions[transactionIndex]

  const updatedTransaction: Transaction = {
    ...currentTransaction,
    description:
      typeof body.description === 'string'
        ? body.description
        : currentTransaction.description,
    amount:
      typeof body.amount === 'number'
        ? body.amount
        : currentTransaction.amount,
    type:
      body.type === 'income' || body.type === 'expense'
        ? body.type
        : currentTransaction.type,
  }

  transactions[transactionIndex] = updatedTransaction

  return c.json(updatedTransaction, 200)
})

app.delete('/transactions/:id', (c) => {
  const id = Number(c.req.param('id'))

  const transactionIndex = transactions.findIndex((t) => t.id === id)

  if (transactionIndex === -1) {
    return c.json({ message: 'Transacción no encontrada' }, 404)
  }

  transactions.splice(transactionIndex, 1)

  return c.body(null, 204)
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log('Servidor corriendo en http://localhost:3000')
  }
)