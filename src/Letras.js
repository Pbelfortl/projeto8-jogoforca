export default function Letras (props) {
    return (
        props.alfabeto.map((L, index)=>
        (<div
            key={index}
            data-identifier="letter"
            className={(props.clicados.includes(L) ? "clicado":"naoClicado")} 
            onClick={()=>props.setPalavra(props.Palpite(L))}> {L} </div>))
    )
}