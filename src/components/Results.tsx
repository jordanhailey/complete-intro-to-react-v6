import { FunctionComponent } from 'react';
import Pet from './Pet';
import { Pet as PetType } from '../APIResponseTypes'

const Results: FunctionComponent<{pets: PetType[]}> = ({ pets }) => {
  return (
    <div className="search">
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
