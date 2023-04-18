import { useState } from 'react'
import { ConnectKitButton } from 'connectkit';
import logo from '../assets/logo_theraDapp.png'
import Image from 'next/image'
import Link from 'next/link';
 const Navbar = (props) => {

  const [state, setState] = useState(false)


  const navigation = [
      { title: "My sessions", path: "/Mysessions" },
      {title:"Our counsellors" , path:"/Ourcounsellors"},
      {title : "Add Therapist", path: "/Addtherapist"},
      { title: "Add Slots", path: "/AddSlots" },
  ]

  return (
      <nav className="bg-white w-full border-b md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between  md:py-5 md:block">  
            <Link href="/">           
              <Image
      src={logo}
      alt="logo"
      className='w-24'
     
    />
    </Link> 
            
                    
                  <div className="md:hidden">
                  <ConnectKitButton />
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                  <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                      {
                          navigation.map((item, idx) => {
                              return (
                                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                    <a href={item.path}>
                                        { item.title }
                                    </a>
                                </li>
                              )
                          })
                      }
                  </ul>
              </div>
              <div className="hidden md:inline-block">
              <ConnectKitButton />
              </div>
          </div>
      </nav>
  )
}

export default Navbar