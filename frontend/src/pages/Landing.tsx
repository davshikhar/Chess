import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () =>{
    const navigate = useNavigate();
    return(
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-6">
                    <div className="flex justify-center items-center">
                        <img src={"/ChessBoard.png"} alt="Chess Board" className="w-full max-w-md"/>
                    </div>
                    <div>
                        <h1 className="text-4xl text-white font-bold mb-4">Welcome to the Chess Game</h1>
                        <p className="text-white text-lg mb-4 text-center">Click the button below to get started.</p>
                        <div className="mt-4 flex justify-center">
                            <Button onClick={() => navigate('/game')}>Start a game</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}