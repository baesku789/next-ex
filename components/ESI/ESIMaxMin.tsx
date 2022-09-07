interface ESIMaxMinProps {
    max: number|string
    maxDate: number|string
    min: number|string
    minDate: number|string
}

export default function ESIMaxMin ({max, maxDate, minDate, min}:ESIMaxMinProps) {
    return (
        <div>
            <div>최고치 : {maxDate} {max}</div>
            <div>최소치 : {minDate} {min}</div>
        </div>
    )
}
