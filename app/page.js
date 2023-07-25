"use client"
import { useSelector } from "react-redux"
import Dashboard from "./components/Dashboard"

export default function Home() {
  //checking user is authorized or not
  const userData = useSelector((state) => state.user)

  return (
    <div className="mt-4">
      {
        !userData?.isAuth ? (<h1 className="text-center italic font-bold">Please Login First!</h1>)
          : <Dashboard />
      }
    </div>
  )
}
