import { createGlobalStyle } from 'styled-components'
import backgroundImage0 from '../assets/images/backgroundImage0.jpg'
import backgroundImage from '../assets/images/backgroundImage1.png'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Titillium Web', monospace;
  font-size: 1.125rem;
  font-weight: 300;
  color: #fff;
  line-height: 1.7rem;
  height: 100vh;
  background-color: darkslategray;
  background-image: url(${backgroundImage}), url(${backgroundImage0});
  background-repeat: repeat, no-repeat;
  background-size: auto, cover;
  background-attachment: fixed, fixed;
  background-position: center, center;
}

h1, h2, h3{
  font-weight: 300;
    text-align: right;
    text-transform: uppercase;
    color: #eee;
}

h3 {
  margin-top: 40px;
}

input,
textarea {
  font-size: inherit;
  font-family: inherit;
}

`
export default GlobalStyle
