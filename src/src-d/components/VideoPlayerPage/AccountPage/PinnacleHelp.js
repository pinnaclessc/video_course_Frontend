import React from "react"
import { CgArrowLongDownE, CgSearch } from "react-icons/cg"
import classes from "./PinnacleHelp.module.css"
import Card from "../../BodyContent/Card/Card"
import pinnacleData from "./pinnacleData.json"

function PinnacleHelp() {
  return (
    <>
      <header className={classes.main_header}>
        <ul className={classes.unordered_list}>
          <li className={classes.ordered_list}>Back to Pinnacle</li>
          <li className={classes.ordered_list1}>
            <img
              className={classes.header_img}
              src="/images/Pinnacle logo colored.svg"
            />
          </li>
          <li className={classes.ordered_list}>UserName</li>
        </ul>
      </header>
      <section className={classes.help_main_container}>
        <div className={classes.help_ask_container}>
          <div className={classes.help_ask_container1}>
            <h3 className={classes.help_ask_heading}>How May we Help You?</h3>
            <input
              className={classes.help_ask_input}
              type="text"
              placeholder="Search for solutions"
            />
            <CgSearch className={classes.search_icon} size={20} />
          </div>
        </div>
      </section>
      <div className={classes.card_prior_container}>
        {pinnacleData.map((data, index) => (
          <Card key={index} className={classes.card_main_container}>
            <div className={classes.card_container}>
              <img
                className={classes.card_image}
                src={data.card_image}
                alt="Card"
              />
              <div className={classes.card_text}>{data.card_text}</div>
              <div className={classes.card_sub_text}>{data.card_sub_text}</div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default PinnacleHelp
