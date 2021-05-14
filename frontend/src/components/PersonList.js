const PersonList = ({ persons, renderPerson }) => (
  <ul>{persons.map((person) => renderPerson(person))}</ul>
)

export default PersonList
