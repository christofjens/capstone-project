import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'

export default function Splash({ setToken }) {
  return (
    <>
      <Register setToken={setToken} />
      <Login setToken={setToken} />
    </>
  )
}
