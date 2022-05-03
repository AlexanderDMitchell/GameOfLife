import './Navbar.css'

export const Navbar = () => (
  <div className={'navbar'}>
    <h1>Game of Life</h1>
    <a
      className={'navbar_link'}
      href={`https://en.wikipedia.org/wiki/Conway's_Game_of_Life`}
      target={'_blank'}
      rel={'noreferrer'}>
      Info
    </a>
  </div>
)
