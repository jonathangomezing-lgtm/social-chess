import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessApp = () => {
  const [game, setGame] = useState(new Chess());
  const [boardWidth, setBoardWidth] = useState(400);

  // Ajustar el tamaño del tablero dinámicamente según el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setBoardWidth(width - 40); // Margen pequeño en móviles
      } else {
        setBoardWidth(500); // Tamaño fijo en escritorio
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function makeAMove(move) {
    try {
      const result = game.move(move);
      setGame(new Chess(game.fen()));
      return result;
    } catch (e) {
      return null;
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({ from: sourceSquare, to: targetSquare, promotion: 'q' });
    return move !== null;
  }

  return (
    <div className="app-container">
      {/* SECCIÓN DEL TABLERO */}
      <div className="board-section">
        <div style={{ width: boardWidth }}>
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>

      {/* SECCIÓN SOCIAL (VIDEO/CHAT) */}
      <div className="social-section">
        <div className="video-grid">
          <div className="video-box">Oponente</div>
          <div className="video-box user-video">Tú</div>
        </div>
        <div className="chat-area">
          <p>Chat de la partida...</p>
        </div>
      </div>

      {/* ESTILOS CSS (Puedes moverlos a un archivo .css) */}
      <style>{`
        .app-container {
          display: flex;
          flex-direction: row; /* Horizontal en PC */
          height: 100vh;
          background-color: #262421;
          color: white;
          font-family: sans-serif;
        }

        .board-section {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }

        .social-section {
          flex: 1;
          background-color: #312e2b;
          display: flex;
          flex-direction: column;
          padding: 15px;
          gap: 10px;
        }

        .video-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Dos videos lado a lado */
          gap: 10px;
          height: 150px;
        }

        .video-box {
          background: #000;
          border: 1px solid #45423e;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .chat-area {
          flex: 1;
          background: #262421;
          border-radius: 5px;
          padding: 10px;
          overflow-y: auto;
        }

        /* MEDIA QUERY PARA MÓVILES */
        @media (max-width: 800px) {
          .app-container {
            flex-direction: column; /* Vertical en Celulares */
            height: auto;
          }
          
          .social-section {
            height: 400px; /* Altura fija para la parte social en móvil */
          }

          .video-grid {
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChessApp;
