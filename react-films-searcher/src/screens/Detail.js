import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import { ButtonBackHome } from '../components/ButtonBackHome'


const API_KEY = '4287ad07'

export class Detail extends React.Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = {
    movie: {}
  }

  componentDidMount() {
    console.log(this.props)
    const { movieId } = this.props.match.params
    this._fetchMovie({id: movieId})
  }

  _fetchMovie ({ id }) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
    .then(res => res.json()) //Datos del servicio web
    .then(movie => {
      console.log({ movie })
      this.setState({ movie })
    })
  }

  render() {
    console.log("render ->")
    const {Title, Poster, Actors, Metascore, Plot} = this.state.movie
    return(
      <div>
        <ButtonBackHome to="/" className="button is-info is-rounded">Volver al buscador</ButtonBackHome>
        <h1>{Title}</h1>
        <img src={Poster} alt={Poster}/>
        <h3>{Actors}</h3>
        <span>{Metascore}</span>
        <p>{Plot}</p>
      </div>
    )
  }
}