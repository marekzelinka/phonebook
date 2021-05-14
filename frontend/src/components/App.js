import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Filter'
import AddPersonForm from './AddPersonForm'
import PersonList from './PersonList'
import personsService from 'services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

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

    personsService.create(personObj).then((returnedPerson) => {
      setPersons((persons) => persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
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
