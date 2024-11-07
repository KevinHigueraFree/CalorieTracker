
type CalorieDisplayProps = {
    calories: number
    texto: string
}

export default function CalorieDisplay({calories,texto}: CalorieDisplayProps) {
    return (
        <p className="text-white font-bold grid-cols-1 gat-3 text-center">
            <span className="font-black text-4xl text-orange">{calories}</span>
            {texto}
        </p >
    )
}
