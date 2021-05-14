const Filter = ({ value, onChange }) => (
  <div>
    filter shown with{' '}
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

export default Filter
