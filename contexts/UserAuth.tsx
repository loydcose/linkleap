"use client"

import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"

export const UserAuthContext = createContext(null)

export const UserAuthProvider = ({ children }: { children: any }) => {
  // const [user, setUser] = useState<any>()


  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      // setUser(currentUser)
      console.log("yes " + currentUser)
    } else {
      // setUser(null)
      console.log("nah " + currentUser)
    }
  })

  return (
    <UserAuthContext.Provider value={null}>{children}</UserAuthContext.Provider>
  )
}
