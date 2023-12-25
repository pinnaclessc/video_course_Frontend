import React, { useState, useEffect } from "react"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { MdOndemandVideo } from "react-icons/md"
import styles from "./Sidebar.module.css"

const Sidebar = ({ menuData, onVideoSelect, onSubMenuSelect }) => {
  const [activeMenuIds, setActiveMenuIds] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoDurations, setVideoDurations] = useState({})
  const [submenuLengths, setSubmenuLengths] = useState({})
  const [selectedSubmenu, setSelectedSubmenu] = useState(null)
  const [selectedSubmenuIndex, setSelectedSubmenuIndex] = useState(null)

  const handleMenuClick = (menuId) => {
    setActiveMenuIds((prevMenuIds) => {
      if (prevMenuIds.includes(menuId)) {
        return prevMenuIds.filter((id) => id !== menuId)
      } else {
        return [...prevMenuIds, menuId]
      }
    })
  }

  const handleVideoSelect = (videoUrl, submenuIndex, submenuTitle) => {
    onVideoSelect(videoUrl, submenuTitle)
    setSelectedSubmenuIndex(submenuIndex)
    onSubMenuSelect(submenuTitle)
  }

  const formatTime = (length) => {
    const hours = Math.floor(length / 3600)
    const minutes = Math.floor((length % 3600) / 60)
    const seconds = Math.floor(length % 60)
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const getVideoDuration = async (videoUrl) => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.src = videoUrl

      video.onloadeddata = () => {
        const duration = video.duration

        resolve(duration)
      }

      video.onerror = () => {
        resolve("Unknown")
      }

      video.load()
    })
  }

  useEffect(() => {
    const calculateSubmenuLengths = async () => {
      const lengths = {}

      for (const menu of menuData) {
        let totalLength = 0
        const durationPromises = []

        for (const submenu of menu.submenu) {
          if (!videoDurations[submenu.id]) {
            const durationPromise = getVideoDuration(submenu.video)
            durationPromises.push({
              promise: durationPromise,
              submenuId: submenu.id,
            })
          }
        }

        const durations = await Promise.all(
          durationPromises.map((item) => item.promise)
        )

        durations.forEach((duration, index) => {
          const { submenuId } = durationPromises[index]
          setVideoDurations((prevDurations) => ({
            ...prevDurations,
            [submenuId]: duration,
          }))
          totalLength += duration || 0
        })

        lengths[menu.id] = totalLength
      }

      setSubmenuLengths(lengths)
    }

    calculateSubmenuLengths()
  }, [menuData])

  return (
    <div className={styles.sidebar}>
      {menuData.map((menu) => (
        <div
          key={menu.id}
          className={`${styles.accordion} ${
            activeMenuIds.includes(menu.id) ? styles.active : ""
          }`}
        >
          <h4
            className={styles.accordion_title}
            onClick={() => handleMenuClick(menu.id)}
          >
            {menu.title}
            {activeMenuIds.includes(menu.id) ? (
              <RiArrowDropUpLine className={styles.arrow_icon} size={26} />
            ) : (
              <RiArrowDropDownLine className={styles.arrow_icon} size={26} />
            )}
          </h4>
          <span>{formatTime(submenuLengths[menu.id])}</span>
          {activeMenuIds.includes(menu.id) && (
            <ul className={styles["submenu-list"]}>
              {menu.submenu.map((submenu) => (
                <li key={submenu.id} className={styles["submenu-item"]}>
                  <button
                    className={styles["submenu-button"]}
                    onClick={() => handleVideoSelect(submenu.video)}
                  >
                    {" "}
                    {submenu.title}
                  </button>
                  <MdOndemandVideo className={styles.video_icon} />
                  <span>{formatTime(videoDurations[submenu.id])}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default Sidebar
