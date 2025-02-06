import { useParams } from 'react-router-dom'

const Pokemon = () => {
  const { name } = useParams();
  return (
    <div>
      <p>{name}</p>
    </div>
  )
}

export default Pokemon
