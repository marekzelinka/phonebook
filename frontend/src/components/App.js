import { useEffect, useState } from 'react'
import Filter from './Filter'
import AddPersonForm from './AddPersonForm'
import PersonList from './PersonList'
import personsService from 'services/persons'
import PersonItem from './PersonItem'

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

    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      const shouldReplaceNumber = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a  new one? `
      )
      if (!shouldReplaceNumber) {
        return
      }

      const updatedPerson = { ...existingPerson, number: newNumber }
      personsService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons((persons) =>
            persons.map((person) =>
              person.id !== updatedPerson.id ? person : returnedPerson
            )
          )
          setNewName('')
          setNewNumber('')
        })
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

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    const shouldDeletePerson = window.confirm(`Delete ${personToDelete.name}?`)
    if (!shouldDeletePerson) {
      return
    }

    personsService.delete(id).then(() => {
      setPersons((persons) => persons.filter((person) => person.id !== id))
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
      <PersonList
        persons={personsToShow}
        renderPerson={(person) => (
          <PersonItem key={person.id} person={person} onDelete={deletePerson} />
        )}
      />
    </div>
  )
}

export default App
