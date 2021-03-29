

import React, { useEffect, useState } from 'react';
import Profile from './profile'

const food = 

[
    {"name": "Хлеб",
    "kcal": 260,
    "measure": "кусочков"},
    {"name": "Сдоба",
    "kcal": 300,
    "measure": "булочек"},
    {"name": "Майонез",
    "kcal": 300,
    "measure": "ложек"},
    {"name": "Колбаса",
    "kcal": 300,
    "measure": "ломтиков"},
    {"name": "Жареный картофель",
    "kcal": 260,
    "measure": "порций"},
    {"name": "Блины",
    "kcal": 200,
    "measure": "блинов"},
    {"name": "Сливочное масло",
    "kcal": 300,
    "measure": "ложек"},
    {"name": "Сахар",
    "kcal": 300,
    "measure": "ложек"
  },
    {"name": "Сметана",
    "measure": "ложек",
        "kcal": 206}
]

export default function List(){

  const productArrFromStorage = JSON.parse(localStorage.getItem('PA'));
  const [clicked, setClicked] = useState(false)
  const [selected, setSelected] = useState(0)
  const [productArr, addProductToArray] = useState([])
  const [times, setWeek] = useState(0)
  const [pieces, setPieces] = useState(0)


  useEffect(() => {
    if(productArrFromStorage) { 
      if(productArrFromStorage.length) {
        addProductToArray(productArrFromStorage)
        console.log(productArrFromStorage)
      }
      
    } else {
     console.log('niente')
    }
  }, [])


  useEffect(() => {
    setClicked(true)
    console.log(food[selected])
  }, [selected])

  useEffect(() => {
    console.log(productArr)
    localStorage.setItem("PA", JSON.stringify(productArr));
  }, [productArr])

  const addProduct = () => {
    let pr = food[selected].name.toLowerCase()
    console.log(productArr.includes(pr), 'includes')
    if(productArr.length>2 && !productArr.includes(pr)) {
      console.log('not eimpty')
      addProductToArray([productArr, food[selected].name.toLowerCase()])
     
    } else if(productArr.length==1) {
      console.log('eimpty')
      addProductToArray([productArr, food[selected].name.toLowerCase()])
    } else {
      addProductToArray(food[selected].name.toLowerCase())
    }
  }

  

    return(
      <div>
        
        <div className='profile-header'> <Profile />  </div>
     
        <div className='wrapper-list'>
          
          <div className='wrapper-inside'>
         
            <p className='title'>Нажми на продукт, чтобы узнать информацию</p>
           {food.map((f, index) => 
             <ul key={index} onClick={()=>setSelected(index)}><p>{f.name}  </p> 
           </ul>
            )}
            
            </div>
            <div className='wrapper-info'>
             {clicked&&selected>=0?  
             <div>
               <p>{food[selected].name}</p>
               <img width='50px' className='icon' src={require(`../img/${food[selected].name}.svg`).default}/>
             <div className='question'> <p>Сколько раз в неделю? <input onChange={(e) => setWeek(e.target.value)} /></p> </div>
            <div className='question'>  <p>Сколько {food[selected].measure} в день? <input onChange={(e) => setPieces(e.target.value)} /></p> </div>
           
          {times&&pieces ? 
          <div>
               <p>Если ты откажешься от этого продукта, то сможешь сбросить около:</p>
             <p>{Math.round(food[selected].kcal*30/7700)} кг в месяц <br />
             <img width='50px' className='icon' src={require(`../img/scale.svg`).default}/> </p>
             <p>Добавь этот продукт в список, чтобы отслеживать свой результат.</p>
             <button onClick={() => addProduct()}>Добавить</button> </div> : null}
             
             </div>:
             null
             } 
            
            </div>
        </div> </div>
    )
}