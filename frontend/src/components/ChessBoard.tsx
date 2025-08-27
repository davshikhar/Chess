import type {  Color, PieceSymbol, Square } from "chess.js";

interface ChessBoardProps{
    board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
}

export const ChessBoard = ({board}:ChessBoardProps) => {
    return(
        <div>
            ChessBoard
            {board && board.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <div 
                            key={colIndex} 
                            style={{ 
                                width: '50px', 
                                height: '50px', 
                                backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'white' : 'gray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}>
                            {cell ? `${cell.color === 'w' ? '♙' : '♟'}${cell.type.toUpperCase()}` : ''}
                        </div>
                    ))}
                </div>
            )) }
        </div>
    )
}