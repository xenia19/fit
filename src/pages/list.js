

import React, { useEffect, useState } from 'react';
import Profile from './profile'

const food = 

[
    {"name": "Хлеб",
    "kcal": 205,
    "measure": "кусочков"},
    {"name": "Сдоба",
    "kcal": 330,
    "measure": "булочек"},
    {"name": "Майонез",
    "kcal": 100,
    "measure": "ложек"},
    {"name": "Колбаса",
    "kcal": 70,
    "measure": "ломтиков"},
    {"name": "Жареный картофель",
    "kcal": 260,
    "measure": "порций"},
    {"name": "Блины",
    "kcal": 90,
    "measure": "блинов"},
    {"name": "Сливочное масло",
    "kcal": 100,
    "measure": "ложек"},
    {"name": "Сахар",
    "kcal": 80,
    "measure": "ложек"
  },
    {"name": "Сметана",
    "measure": "ложек",
        "kcal": 96}
]


export default function List(){
  localStorage.clear()
  const productArrFromStorage = JSON.parse(localStorage.getItem('PA'));
  const [clicked, setClicked] = useState(false)
  const [selected, setSelected] = useState(0)
  const [productArr, addProductToArray] = useState([])
  const [times, setWeek] = useState(null)
  const [pieces, setPieces] = useState(0)
  const [loseKg, setLoseKg] = useState(0)
  const [amountToLose, setAmountToLose] = useState(0)
  const [age, setAge] = useState(0)
  const [weight, setWeight] = useState(0)
  const [adding, setAdding] = useState(0)

  console.log(productArr.length, 'prod')
  useEffect(() => {
    let kgToLose = (food[selected].kcal*pieces*times*4/7700).toFixed(1)
    setLoseKg(kgToLose)
  
  }, [pieces, times])


  useEffect(() => {
    const loseKgFromStorage = localStorage.getItem('loseKgTotal')
    if(productArrFromStorage) {
      addProductToArray(productArrFromStorage)
      setAmountToLose(loseKgFromStorage)
    } else {
     console.log('niente')
    }
  }, [])


  useEffect(() => {
    setClicked(true)
    console.log(food[selected])
    setLoseKg(0)
    setWeek(0)
    setPieces(0)
   
  }, [selected])

  useEffect(() => {
   
    localStorage.setItem("PA", JSON.stringify(productArr));
    console.log(productArr, "рз", localStorage.getItem('PA'))
  }, [productArr])

  const addProduct = () => {
    console.log(productArr.length, 'check')
    localStorage.setItem('weight', weight)

    let pr = food[selected].name
    console.log(productArr.includes(pr), 'includes')
    if(!productArr.includes(pr)) {
      console.log('not eimpty')
      addProductToArray([...productArr, food[selected].name])
      setAmountToLose((Number(amountToLose) + Number(loseKg)).toFixed(2))
      localStorage.setItem('loseKgTotal', amountToLose)
    } else if (productArr.includes(pr)) {
      return
    } 
  }


  


    return(
      <div>
      <div className='profile-header'> 
       <div className='profile'>
            <div className='info-food' >
   {localStorage.getItem('weight') ? <p>Ваш первоначальный вес {localStorage.getItem('weight')} кг</p> : 
  <div >
                { weight.length>1 && age.length>1 ? <div>
               Ваш первоначальный вес {weight} кг
            
                </div> :  <div className='weight'>
                <div onChange={(e)=> setWeight(e.target.value)  } 
                className='input-title'>Ваш вес 
                <input /></div>
                <div onChange={(e)=> setAge(e.target.value) } 
                className='input-title'>Ваш возраст
                <input /></div>
                </div>  
               } </div> }
                 </div>
               
                 {productArr.length  ?
         
                <div className='info-food'>
                <p>Еда, от которой Вы решили отказаться:   <br />
                {productArr.map(product => (
                   <img width='50px' className='icon-quit' src={require(`../img/${product}.svg`).default}/>
                    ))}
                    </p>
                 Если Вы не будете есть эти продукты, Вы похудеете на  {amountToLose} кг в месяц  {weight? <span> и к 1 июню будете весить  <b>{weight - amountToLose*2} кг</b></span> : null} 
                </div>  : null
         }  


       
     
           
        
           
        </div>
       
       
       
         </div>
        <div className='wrapper-list'>
       <div className='left-column'>
      
       <div className='wrapper-inside'>
         
         <p className='title'>Выберите продукт</p>
        {food.map((f, index) => 
          <ul className='list' key={index} onClick={()=>setSelected(index)}><p>{f.name}  </p> 
        </ul>
         )}
         
         </div>

       </div>
     
            <div className='wrapper-info'>
             {clicked&&selected>=0?  
             <div className='questions'>
               <p>{food[selected].name}</p>
               <img width='50px' className='icon' src={require(`../img/${food[selected].name}.svg`).default}/>
               <p>Сколько раз в неделю? <input value={times ? times : ''} onChange={(e) => setWeek(e.target.value)} /></p>
             <p>Сколько {food[selected].measure} в день? <input value={pieces ? pieces : ''} onChange={(e) => setPieces(e.target.value)} /></p> 
          
           {loseKg > 0 ? <div className='info'> 
            <p>Если Вы откажетесь от этого продукта, то сможете сбросить около:</p>
             <p>{loseKg} кг в месяц <br />
             <img width='50px' className='icon' src={require(`../img/scale.svg`).default}/> </p>
             
             
             <p>Добавьте этот продукт в список, чтобы отслеживать свой результат.</p>
             <button onClick={() =>  addProduct()}>Добавить</button>
             </div>: null}
            
             
             </div>:
            <div></div>
             } 
            
            </div>
        </div> </div>
    )
}