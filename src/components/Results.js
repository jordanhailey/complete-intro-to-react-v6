import Pet from './Pet';

const Results = ({ pets }) => {
  return (
    <div>
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet)=>(
          <Pet
            animal={pet.animal}
            breed={pet.breed}
            name={pet.name}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
            key={pet.id}
          />
        ))
      )}
    </div>
  )
}

export default Results;
