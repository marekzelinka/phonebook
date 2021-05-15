const express = require('express')

let persons = [
  {
    name: 'Marek Zelinka',
    number: '040-1257964',
    id: 4,
  },
  {
    name: 'Tom Holland',
    number: '040-2456786',
    id: 5,
  },
  {
    name: 'Dan Abramov 2',
    number: '040-124675',
    id: 6,
  },
]

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0
  return maxId + 1
}

const app = express()

app.get('/info', (_req, res) =>
  res.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>`
  )
)

app.get('/api/persons', (_req, res) => res.json(persons))

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((person) => person.id === Number(req.params.id))
  if (person === undefined) {
    res.status(404).end()
    return
  }

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter((person) => person.id !== Number(req.params.id))
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`))
