import './Navbar.css'

interface Props {
  children: React.ReactNode
}

export const Navbar = ({ children }: Props) => (
  <div className={'navbar'}>
    <h1>Game of Life</h1>
    <div className={'navbar_actions'}>{children}</div>
  </div>
)
