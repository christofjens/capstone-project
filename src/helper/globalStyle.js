import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Nova Mono', monospace;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 100vh;
  background-color: #fff;
  color: #666;
  padding: 20px;
}

h1, h2, h3{
    text-align: right;
    text-transform: uppercase;
    color: #333;
}

input,
button,
textarea {
  font-size: inherit;
  font-family: inherit;
}

`
export default GlobalStyle
