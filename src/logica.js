  const API = 'RgQO0d6UwaRXvaEJBoq9aWL3jGS4dHKYlFg6tOW4'
  const [input, setInput] = useState('')
  const [kcal, setKcal] = useState()
  const [kcalWeek, setKcalWeek] = useState(1)
  const [kcalMonth, setKcalMonth] = useState(1)
  const [kgMonth, setKgMonth] = useState(0)
  const [text, setTextError] = useState('')
  const [statusShowProducts, setShowProducts] = useState(false)
  const [productArr, addProductToArray] = useState('')

  const searchProduct = () => {
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API}&query=${input}`)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.foods[1]) {
            const results = result.foods[1].foodNutrients.filter(i =>i.nutrientName == 'Energy')
            setKcal(results[0].value)
          } else {
            setTextError('Попробуйте написать другой продукт')
          }
          }
        ,
        (error) => {
          console.log(error)
        }
      )
  }

 useEffect(() => {
  let retrievedProducts = localStorage.getItem('products');
  
  addProductToArray(retrievedProducts)
  console.log(retrievedProducts, productArr)
 }, [])
 

  useEffect(()=> {
    console.log(input)
    if(input=='') {
      setKcal('')
      console.log('yay')
    } 
  }, [input])

  useEffect(()=> {
   setKcalWeek(kcal*7)
  }, [kcal])

  useEffect(()=> {
    setKcalMonth(kcal*30)
   }, [kcal])

   useEffect(()=> {
     let amount = Math.round(kcalMonth/7700)
    setKgMonth(amount)
   }, [kcalMonth])

   const addProduct = () => {
      if(productArr) {

        addProductToArray(prevState => [...prevState, input] )
        console.log(productArr)
       // localStorage.setItem('products', productArr);

       
      } else {
        addProductToArray([input])
        console.log(productArr)
      }
    }
     
   

   let retrievedProducts = localStorage.getItem('products');
   const showProducts = () => {
    setShowProducts(true)
    console.log(retrievedProducts)
   }

   

  return (
    <div className="App">
        <p>
        Выберите продукт:
        </p>
        <input onChange={(e)=>setInput(e.target.value)} ></input>
         {kcal? <p>{kcal} ккал / 100 гр</p> : null}  
        <p>{text}</p> 
      <p className='button' onClick={()=> searchProduct()}> Поиск </p>
     
    
      <p>Ты сбросишь {kgMonth} кг в месяц</p>
      <button onClick={()=> addProduct()}> Добавить в список </button>
      <button onClick={() => showProducts()}>Показать сохранённые продукты</button>
      {statusShowProducts ? retrievedProducts : null}
    </div>
  );
}