import {Component} from 'react';

class Carousel extends Component {
  state = {
    active: 0
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg']
  }

  handleIndexClick = (event) => {
    this.setState({
      active: Number(event.target.dataset.index),
    })
  }

  render () {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal"/>
        <div className="carousel-smaller">
          {images.map((photo,idx)=>(
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={idx}
              onClick={this.handleIndexClick}
              className={idx === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;
