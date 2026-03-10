import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessApp = () => {
  const [game, setGame] = useState(new Chess());

  // Función para manejar los movimientos en el tablero
  function makeAMove(move) {
    const result = game.move(move);
    setGame(new Chess(game.fen())); // Actualizamos el estado con la posición FEN
    return result; 
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Siempre promociona a reina por simplicidad
    });

    if (move === null) return false;
    return true;
  }

  return (
    <div style={styles.container}>
      {/* SECCIÓN DEL TABLERO */}
      <div style={styles.boardContainer}>
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>

      {/* SECCIÓN DE AUDIO / VIDEO */}
      <div style={styles.sidebar}>
        <div style={styles.videoBox}>
          <p>Oponente (Video)</p>
          {/* Aquí iría el <video> tag de WebRTC */}
        </div>
        <div style={styles.videoBox}>
          <p>Tú (Video Local)</p>
          <div style={styles.placeholderCamera}>📸 Cámara Activa</div>
        </div>
        <div style={styles.chatBox}>
          <p>Chat de la partida...</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', height: '100vh', backgroundColor: '#262421', color: 'white' },
  boardContainer: { flex: 2, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  sidebar: { flex: 1, backgroundColor: '#312e2b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
  videoBox: { flex: 1, backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #45423e' },
  placeholderCamera: { color: '#666' },
  chatBox: { flex: 1, backgroundColor: '#262421', padding: '10px', borderRadius: '8px' }
};

export default ChessApp;