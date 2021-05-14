import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow =
    persons.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  const addPerson = (e) => {
    e.preventDefault()

    const nameExists = persons.find((person) => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    setPersons((persons) => persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person, index) => (
        <div key={person.name + index}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App
