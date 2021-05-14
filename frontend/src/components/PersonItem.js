const PersonItem = ({ person, onDelete }) => (
  <li key={person.name}>
    {person.name} {person.number}
    <button onClick={() => onDelete(person.id)}>delete</button>
  </li>
)

export default PersonItem
