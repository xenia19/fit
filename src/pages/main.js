

export default function Main() {
    return (
        <div className='wrapper'>
            Главная страница
            <button onClick={()=>window.location.href = "/list"}>Посмотреть список продуктов</button>
        </div>
    )
}