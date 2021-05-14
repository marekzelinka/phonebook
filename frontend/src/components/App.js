import { useState } from 'react'
import Filter from './Filter'
import AddPersonForm from './AddPersonForm'
import PersonList from './PersonList'

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
      <Filter value={filter} onChange={setFilter} />
      <h2>add a new</h2>
      <AddPersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={setNewName}
        number={newNumber}
        onNumberChange={setNewNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App
