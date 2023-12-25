import React, { useState } from "react"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import classes from "./Categories.module.css"
import Card from "../../BodyContent/Card/Card"
import categoryData from "./categoryData.json"

const Categories = () => {
  const [activeSubnav, setActiveSubnav] = useState(null)
  const [activeSubsubnav, setActiveSubsubnav] = useState(null)

  const handleSubnavMouseEnter = (index) => {
    setActiveSubnav(index)
    setActiveSubsubnav(null)
  }

  const handleSubsubnavMouseEnter = (index) => {
    setActiveSubsubnav(index)
  }

  const handleSubnavMouseLeave = () => {
    setActiveSubnav(null)
    setActiveSubsubnav(null)
  }

  return (
    <div className={classes.subnav}>
      <div className={classes.subnavbtn}>Categories</div>
      <Card>
        <div className={classes.subnav_content}>
          {categoryData.map((category, index) => (
            <div
              key={index}
              className={`${classes.subnav_content_subnav} ${
                activeSubnav === index ? classes.active : ""
              }`}
              onMouseEnter={() => handleSubnavMouseEnter(index)}
              onMouseLeave={handleSubnavMouseLeave}
            >
              <div className={classes.subnavbtn2x}>
                {category.categoryName}
                <div className={classes.arrw_icon1}>
                  <MdOutlineKeyboardArrowRight
                    className={classes.arrow}
                    size={20}
                  />
                </div>
              </div>
              <div
                className={
                  classes.subnav_content2x ||
                  `${classes.subnav_content_subnav} ${
                    activeSubnav === index ? classes.active : ""
                  }`
                }
                onMouseEnter={() => handleSubnavMouseEnter(index)}
                onMouseLeave={handleSubnavMouseLeave}
              >
                {category.subcategories.map((subcategory, subIndex) => (
                  <div
                    key={subIndex}
                    className={`${classes.subnav_content_subnav} ${
                      activeSubsubnav === subIndex ? classes.active : ""
                    }`}
                    onMouseEnter={() => handleSubsubnavMouseEnter(subIndex)}
                  >
                    <div className={classes.abc}>
                      {subcategory.subcategoryName}
                      <div className={classes.arrw_icon1a}>
                        <MdOutlineKeyboardArrowRight
                          className={classes.arrow}
                          size={20}
                        />
                      </div>
                    </div>
                    <div className={classes.subnav_content2x2x}>
                      <ul className={classes.subnav_content_list}>
                        {subcategory.subsubcategories.map(
                          (subsubcategory, subSubIndex) => (
                            <li
                              key={subSubIndex}
                              className={classes.subnav_content_list}
                            >
                              <a href={subsubcategory.url}>
                                {subsubcategory.name}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Categories
