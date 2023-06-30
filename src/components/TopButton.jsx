import React from 'react'

function Topbuttons({setQuery}) {
    const cities = [
        {
            id:1,
            title:"London"
        },
        {
            id:2,
            title:"Berlin"
        },
        {
            id:3,
            title:"Ankara"
        },
        {
            id:4,
            title:"Istanbul"
        },
        {
            id:5,
            title:"Izmir"
        }
    ]
  return (
    <div className='flex items-center justify-around  my-6'>
        {cities.map((city)=>(
            <button key={city.id} onClick={()=>setQuery({q:city.title})} className="text-white text-lg font-medium transition ease-out hover:scale-110">{city.title}</button>
        ))}
    </div>
  )
}

export default Topbuttons