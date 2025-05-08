import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

.roboto-mono-<uniquifier> {
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}

*{
  margin: 0;
  padding: 0;
}

html,body {
  width: 100%;
  height: 100%;
}

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    // padding: 0;
    // margin: 0;
   font-family: 'Roboto Mono', monospace;
    // transition: all 0.25s linear;
    // text-shadow: ${({ theme }) => theme.textShadow};
  }


    h1{
      color:${({ theme }) => theme.text}
    }

    

    #main {
  width: 90%; /* Use percentage for better responsiveness */
  max-width: 1000px; /* Maximum width to prevent excessive stretching on large screens */
  margin: -40px auto; /* Center horizontally with some top margin */
  padding: 20px; /* Add padding for better look on smaller screens */
}

div.game {
  line-height: 35px; 
 max-height:140px;
    overflow:hidden;
    position:relative;
  min-height: 35px; /* Maintain a minimum height */
}

@media (max-width: 768px) {
  #main {
    width: 95%; /* Adjust width for smaller screens */
    margin: 20px auto; /* Reduce margin for smaller screens */
  }

  div.game {
    line-height: 35px; /* Adjust line height for smaller screens */
    min-height: 120px; /* Adjust minimum height for smaller screens */
  }
}


    .InformationBar {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  gap: 20px; /* Space between elements */
  position: relative; /* Allows for custom vertical positioning */
  height: 20vh; /* Full height to center vertically */
}

.SelectTime {
  display: flex;
  gap: 10px; /* Space between time spans */
}

.SelectTime span {
  cursor: pointer; /* Changes cursor to pointer on hover */
  padding: 10px 20px; /* Adds padding for better click area */
  border: 1px solid #ccc; /* Optional: Adds a border for better visibility */
  border-radius: 5px; /* Optional: Rounds the corners */
}

.button {
  display: flex;
  margin-left:160px;
  align-items: center;
}

.button button {
  padding: 10px 20px; /* Padding inside the button */
  border: none; /* Removes default border */
  border-radius: 5px; /* Optional: Rounds the corners */
  cursor: pointer; /* Changes cursor to pointer on hover */
}

    .time{
    color: ${({ theme }) => theme.text};
    }

  #buttons{
  text-align:right;
  }

    button{
      background:rgba(255,255,255,.2);
      border:0;
      color:rgba(255,255,255,.5);
      padding:5px 20px;
      border-radius:5px;
      cursor:pointer;
    }

   

    div.game:focus{
      outline:0;
    }

    div.word{
      display:inline-block;
     font-family: 'Roboto Mono', monospace;
      margin:0 5px; 
    }

    .words{
    // filter:blur(5px);
    color:#666;
    }

    .game:focus .words{
      filter:blur(0px);
    }

    div.focus-error{
      position:absolute;
      inset:0;
      text-align:center;
      padding-top:35px;
    }

    .game:focus .focus-error{
    display:none;
    }

    .letter.correct{
     color: ${({ theme }) => theme.text};
    }

    .letter.space{
    color:${({ theme }) => theme.background};
    }
    
    .letter.incorrect{
     color:#f55;
     border-bottom: 1px solid #f55;
    }

  @keyframes blink {
   0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.blink {
 animation: blink 1s infinite;
 font-size: 2rem;
  animation: blink 1.5s infinite;
   transition: transform 0.3s ease, opacity 0.3s ease;
}


    .letter.space.incorrect{
     color:${({ theme }) => theme.background};
     border-bottom: 1px solid #f55;
    }

    @keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
    .cursor {
    display:none;
  width:1px;
  height:1.6rem;
  background: ${({ theme }) => theme.text};
  position:fixed;
   animation: blink 0.8s infinite;
}



  .game:focus .cursor {
  display: block;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

   
`;
