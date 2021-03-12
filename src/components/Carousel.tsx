import {Component, MouseEvent, ReactNode } from 'react';
import { ImageProps } from '../APIResponseTypes'

class Carousel extends Component<ImageProps> {
  state = {
    active: 0
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg']
  }

  handleIndexClick = (event: MouseEvent<HTMLElement>):void => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    this.setState({
      active: Number(event.target.dataset.index),
    })
  }

  render (): ReactNode {
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
