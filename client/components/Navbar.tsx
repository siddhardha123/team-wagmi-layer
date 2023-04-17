import { useState } from 'react'
import { ConnectKitButton } from 'connectkit';

 const Navbar = () => {

  const [state, setState] = useState(false)

  // Replace javascript:void(0) path with your path
  const navigation = [
      { title: "My sessions", path: "/Sessions" },
      {title:"Our counsellors" , path:"/Ourcounsellors"},
      {title : "Add Therapist", path: "/Addtherapist"},
      { title: "Profile", path: "/Profile" },
  ]

  return (
      <nav className="bg-white w-full border-b md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                   
                      <img src="" alt="sid" />
                    
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