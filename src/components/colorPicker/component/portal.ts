import { useEffect } from "react"
import { createPortal } from "react-dom"
import { dropDownCoords } from "./types"

interface portalProps {
  children: React.ReactNode
}

const Portal = ({ children }: portalProps) => {
  if (typeof window !== "undefined") {
    let mount: HTMLDivElement
    let el: HTMLDivElement
    const cpContainer = document.getElementById("color-picker--container")
    cpContainer?.setAttribute("style", "position:fixed;top:0;left:0;z-index:50")

    if (cpContainer == null) {
      mount = document.createElement("div")
      mount.setAttribute("id", "color-picker--container")
      document.body.appendChild(mount)
    } else {
      mount = document.getElementById("color-picker--container") as HTMLDivElement
    }

    el = document.createElement("div") as HTMLDivElement

    useEffect(() => {
      mount.appendChild(el)
      return () => mount.removeChild(el)
    }, [el, mount])

    return createPortal(children, el)
  }

  return null
}

export default Portal
