import './Navbar.css'

interface Props {
  isPlaying: boolean
  toggleIsPlaying: () => void
  clearGrid: () => void
}

export const Navbar = ({ isPlaying, toggleIsPlaying, clearGrid }: Props) => (
  <div className={'navbar'}>
    <h1>Game of Life</h1>
    <div className={'navbar_actions'}>
      <a
        className={'navbar_link'}
        href={`https://en.wikipedia.org/wiki/Conway's_Game_of_Life`}
        target={'_blank'}
        rel={'noreferrer'}>
        Info
      </a>
      <button
        className={`navbar_button ${isPlaying ? 'navbar_button_outline' : ''}`}
        onClick={toggleIsPlaying}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <button className={'navbar_button'} onClick={() => clearGrid()}>
        Clear
      </button>
    </div>
  </div>
)
