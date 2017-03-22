import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Roboto, sans-serif;
  }

  #app {
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  @keyframes show-message {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

`;
