import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'

export default function Splash({ setToken }) {
  return (
    <>
      <h1>Space Traders</h1>
      <h2>Register or Log In</h2>
      <Register setToken={setToken} />
      <Login setToken={setToken} />
    </>
  )
}
