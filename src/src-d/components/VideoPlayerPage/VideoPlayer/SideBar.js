import React, { useState, useEffect } from "react"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { MdOndemandVideo } from "react-icons/md"
import { SiFiles } from "react-icons/si"
import Card from "../../BodyContent/Card/Card"
import { Link } from "react-router-dom"
import styles from "./Sidebar.module.css"
const Sidebar = ({ menuData, onVideoSelect, onSubMenuSelect }) => {
  const [activeMenuIds, setActiveMenuIds] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoDurations, setVideoDurations] = useState({})
  const [submenuLengths, setSubmenuLengths] = useState({})
  const [selectedSubmenu, setSelectedSubmenu] = useState(null)
  const [selectedSubmenuIndex, setSelectedSubmenuIndex] = useState(null)
  const [isMenuData, setMenuData] = useState()
  const [showCard, setShowCard] = useState(false)
  const [selectedSubmenuId, setSelectedSubmenuId] = useState(null)

  const [selectedResourceSubmenuId, setSelectedResourceSubmenuId] =
    useState(null)

  const handleResourcesClick = (submenuId) => {
    if (selectedResourceSubmenuId === submenuId) {
      // If the same "Resources" label is clicked again, close the Card
      setShowCard(false)
      setSelectedResourceSubmenuId(null)
    } else {
      const selectedSubmenu = menuData
        .flatMap((menu) => menu.submenu)
        .find((submenu) => submenu.id === submenuId)

      setSelectedSubmenu(selectedSubmenu)
      setSelectedResourceSubmenuId(submenuId) // Set the selected resource submenu ID
      setShowCard(true)
    }
  }

  // Function to toggle card visibility
  const toggleCard = () => {
    setShowCard((prevShowCard) => !prevShowCard)
  }

  const handleCheckboxChange = (menuId, submenuId) => {
    const updatedMenuData = menuData.map((menu) => {
      if (menu.id === menuId) {
        const updatedSubmenu = menu.submenu.map((submenu) => {
          if (submenu.id === submenuId) {
            return {
              ...submenu,
              isPlayed: !submenu.isPlayed,
            }
          }
          return submenu
        })
        return {
          ...menu,
          submenu: updatedSubmenu,
        }
      }
      return menu
    })

    setMenuData(updatedMenuData)
  }

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
          {" "}
          <div className={styles.accordion_title_container}>
            <div
              className={styles.accordion_title}
              onClick={() => handleMenuClick(menu.id)}
            >
              {menu.title}

              {activeMenuIds.includes(menu.id) ? (
                <RiArrowDropUpLine className={styles.arrow_icon} size={26} />
              ) : (
                <RiArrowDropDownLine className={styles.arrow_icon} size={26} />
              )}
            </div>
            <div className={styles.total_length}>
              {formatTime(submenuLengths[menu.id])}
            </div>
          </div>
          {activeMenuIds.includes(menu.id) && (
            <ul className={styles["submenu-list"]}>
              {menu.submenu.map((submenu) => (
                <li
                  key={submenu.id}
                  className={styles["submenu-item"]}
                  onClick={() => {
                    onSubMenuSelect(submenu.title)
                  }}
                >
                  <div className={styles.submenu_content}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={submenu.isPlayed}
                      onChange={() => handleCheckboxChange(menu.id, submenu.id)}
                    />
                    <button
                      className={styles["submenu-button"]}
                      onClick={() => {
                        handleVideoSelect(submenu.video)
                      }}
                    >
                      {submenu.title}
                    </button>
                    <div className={styles.options_container}>
                      <MdOndemandVideo
                        className={styles.video_icon}
                        onClick={() => {
                          handleVideoSelect(submenu.video)
                        }}
                      />
                      <div
                        className={styles.submenu_vlength}
                        onClick={() => {
                          handleVideoSelect(submenu.video)
                        }}
                      >
                        {formatTime(videoDurations[submenu.id])}
                      </div>
                      {submenu.pdf && (
                        <div className={styles.dropdown_container}>
                          <label
                            className={styles.dropdown_container1}
                            htmlFor={`pdf-dropdown-${submenu.id}`}
                            onClick={() => handleResourcesClick(submenu.id)}
                          >
                            <SiFiles className={styles.pdf_icon} size={10} />
                            Resources
                          </label>
                          {selectedResourceSubmenuId === submenu.id && (
                            <Card
                              id={`pdf-dropdown-${submenu.id}`}
                              className={styles.pdf_dropdown}
                            >
                              <ul>
                                {submenu.pdf.map((pdf, index) => (
                                  <li
                                    key={index}
                                    onClick={() => {
                                      const pdfUrl = pdf.url + "#toolbar=0"
                                      window.open(pdfUrl, "_blank")
                                    }}
                                  >
                                    {`Option ${index + 1} `}
                                  </li>
                                ))}
                              </ul>
                            </Card>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
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
