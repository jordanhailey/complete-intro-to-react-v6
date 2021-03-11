import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Details extends Component {
  constructor () {
    super();

    this.state = { loading : true };
  }

  async componentDidMount () {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({
      loading: false
    }, json.pets[0]))
  }

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>
    }

    const {animal, breed, name, city, state, id, description, images } = this.state;
    return (
      <div className="details">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
        <pre>{JSON.stringify(this.state,null,2)}</pre>
      </div>
    );
  }
}

export default withRouter(Details);
