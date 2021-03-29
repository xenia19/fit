import React, { useEffect, useState } from 'react';


export default function Profile()  {

   
    
    const productArr = JSON.parse(localStorage.getItem("PA"));
    const age = localStorage.getItem('age')
    const FirstWeight = localStorage.getItem('FirstWeight')
    const loseKg = localStorage.getItem('loseKg')

    console.log(productArr, 'prod')

    return(
        <div className='profile'>
            <div className='weight'>
  
                {age ? null : <div onChange={(e)=> localStorage.setItem('FirstWeight', e.target.value)} className='input-title'>Ваш вес 
                <input /></div> }  
           
               </div>
            {productArr !==null ?
            productArr.length>0 ? 
                <div>
                <p>Еда, от которой Вы решили отказаться:   <br />
                {productArr.map(product => (
                   <img width='50px' className='icon-quit' src={require(`../img/${product}.svg`).default}/>
                    ))}
                    </p>
                <p> Если Вы не будете есть это продукты, Вы похудеете на  {loseKg} кг в месяц </p> 
                </div>  : null
         
            : null }  
     
           
        
           
        </div>
    )

}