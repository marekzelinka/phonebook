import { useEffect, useState } from 'react'
import Filter from './Filter'
import AddPerson from './AddPerson'
import PersonList from './PersonList'
import personsService from 'services/persons'
import PersonItem from './PersonItem'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

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
      setMessage({ content: `Added ${returnedPerson.name}`, type: 'success' })
      setTimeout(() => setMessage(null), 5000)
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

    personsService
      .delete(id)
      .then(() => {
        setPersons((persons) => persons.filter((person) => person.id !== id))
      })
      .catch(() => {
        setMessage({
          content: `Info of ${personToDelete.name} has already been removed from server`,
          type: 'error',
        })
        setTimeout(() => setMessage(null), 5000)
        setPersons((persons) => persons.filter((person) => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={setFilter} />
      <h2>add a new</h2>
      <AddPerson
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
