import React, { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ColorContext } from '../context/colorcontext';
import { socket } from '../connection/socket';

const CreateNewGame = (props) => {
  const [didGetUserName, setDidGetUserName] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [gameId, setGameId] = React.useState('');
  const textArea = useRef(null);

  const send = () => {
    const newGameRoomId = uuid();
    setGameId(newGameRoomId);
    socket.emit('createNewGame', newGameRoomId);
  };

  const handleUserNameInput = () => {
    const typedText = textArea.current.value;
    setInputText(typedText);
  };

  return (
    <React.Fragment>
      {didGetUserName ? (
        <Navigate to={`/game/${gameId}`}>
          <button
            className="btn btn-success"
            style={{
              marginLeft: `${String((window.innerWidth / 2) - 60)}px`,
              width: '120px',
            }}
          >
            Start Game
          </button>
        </Navigate>
      ) : (
        <div>
          <h1
            style={{
              textAlign: 'center',
              marginTop: `${String(window.innerHeight / 3)}px`,
            }}
          >
            Your Username:
          </h1>
          <input
            style={{
              marginLeft: `${String((window.innerWidth / 2) - 120)}px`,
              width: '240px',
              marginTop: '62px',
            }}
            ref={textArea}
            onInput={handleUserNameInput}
          ></input>
          <button
            className="btn btn-primary"
            style={{
              marginLeft: `${String((window.innerWidth / 2) - 60)}px`,
              width: '120px',
              marginTop: '62px',
            }}
            disabled={!(inputText.length > 0)}
            onClick={() => {
              props.didRedirect();
              props.setUserName(inputText);
              setDidGetUserName(true);
              send();
            }}
          >
            Submit
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

const Onboard = (props) => {
  const color = React.useContext(ColorContext);
  return <CreateNewGame didRedirect={color.playerDidRedirect} setUserName={props.setUserName} />;
};

export default Onboard;
