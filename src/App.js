import forca0 from "./img/forca0.png"
import forca1 from "./img/forca1.png"
import forca2 from "./img/forca2.png"
import forca3 from "./img/forca3.png"
import forca4 from "./img/forca4.png"
import forca5 from "./img/forca5.png"
import forca6 from "./img/forca6.png"
import "./css/style.css"
import palavras from "./palavras"
import { useState } from "react"
import Letras from "./Letras"



const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const images = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
let escolhida, normalizada, contaErros = 0
let auxArr = []
let clicados = [...alfabeto]


export default function App() {


    const [palavra, setPalavra] = useState('')
    const [imagem, setImagem] = useState(images[contaErros])
    const [result, setResult] = useState('word')
    const [chute, setChute] = useState()


    return (

        <div className="container">
            <div className="gameBox">
                <img src={imagem} className="image" data-identifier="game-image" alt="Forca" />
                <div className="sideBox">
                    <button className="button" onClick={escolher} data-identifier="choose-word">Escolher palavra</button>
                    <div className={result} data-identifier="word">{palavra}</div>
                </div>
            </div>
            <div className="keyboard">
                <Letras alfabeto={alfabeto} clicados={clicados} setPalavra={setPalavra} Palpite={Palpite} />
            </div>
            <div className="inputBox" data-identifier="type-guess">
                Já sei a palavra!
                <input placeholder="Digite seu chute!"
                    disabled={(result === 'correto' || result === 'errado') ? true : false}
                    onChange={e => setChute(e.target.value)}
                    value={chute}
                ></input>
                <button data-identifier="guess-button"
                    onClick={() => chutar(chute)}
                    disabled={(result === 'correto' || result === 'errado') ? true : false}
                >Chutar</button>
            </div>
        </div>

    )

    function escolher() {
        auxArr = []
        escolhida = undefined
        contaErros = 0
        clicados = []

        escolhida = (palavras[Math.floor(Math.random() * palavras.length)])
        normalizada = escolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let escondida = escolhida.replaceAll(/[^]/gi, '_')
        console.log(escolhida)

        setPalavra(escondida)
        setImagem(images[contaErros])
        setResult('word')
        setChute('')
    }

    function Palpite(letra) {

        clicados = [...clicados, letra]
        for (let i = 0; i < (escolhida.length); i++) {
            if (normalizada[i] === letra) {

                auxArr[i] = (escolhida[i])

            } else if (auxArr[i] === undefined) {
                auxArr[i] = ('_')
            }
        }

        if (!((normalizada).includes(letra)) && contaErros <= 6) {
            contaErros++
            setImagem(images[contaErros])
        }

        if (contaErros < 6 && escolhida === auxArr.join('')) {
            setResult("correto")
            clicados = [...alfabeto]
            return escolhida
        }

        if (contaErros === 6) {
            setResult("errado")
            clicados = [...alfabeto]
            return escolhida
        }

        return (auxArr.join(''))
    }

    function chutar(chute) {
        if (chute === escolhida || chute === normalizada) {
            setResult("correto")
            clicados = [...alfabeto]
            setPalavra(escolhida)

        } else {
            setResult("errado")
            clicados = [...alfabeto]
            setPalavra(escolhida)

        }
    }
}