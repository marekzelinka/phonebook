const PersonItem = ({ person }) => (
  <li key={person.name}>
    {person.name} {person.number}
  </li>
)

const PersonList = ({ persons }) => (
  <ul>
    {persons.map((person, index) => (
      <PersonItem key={person.name + index} person={person} />
    ))}
  </ul>
)

export default PersonList
