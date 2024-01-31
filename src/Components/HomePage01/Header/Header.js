import React, { useState,useEffect } from "react";
import classes from "./Header.module.css";
import MoreApps from "./MoreApps";
import Logo from "../../../assests/Pinnacle_colored_logo.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import SearchBar from "./SearchBar";
import { BsGlobe } from "react-icons/bs";
import { GrApps } from "react-icons/gr";
import Languages from "../Language/Languages";
import { useNavigate, Link } from "react-router-dom";
import HoverCart from "./HoverCart";
import Account from "../HeaderD/Account";
export default function Header() {
  const [showMoreApps, setShowMoreApp] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  // useEffect(() => {
  //   const handleDocumentClick = () => {
  //     setShowMoreApp(false);
  //     setShowLanguage(false);
  //   };

  //   document.addEventListener("click", handleDocumentClick);

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, []);

  const MoreAppsHandler = () => {
    setShowMoreApp(true)
    setShowLanguage(false)
    handleMoreApp()
  };

  const LanguageHandler = () => {
    setShowLanguage(true)
    setShowMoreApp(false)
    handlelLanguageHandler()
  };

  const handleMoreApp=()=>{
    setShowMoreApp(!showMoreApps)
    setShowLanguage(false)
  }



  const handlelLanguageHandler=()=>{
    setShowMoreApp(false)
    setShowLanguage(!showLanguage)
  }


return (
    <div className={classes.Header_fullPage}>
      <div className={classes.main}>
        <div className={classes.logo_div} onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className={classes.logo_img} />
        </div>
        <div className={classes.subnav}>
          <div className={classes.subnavbtn}>Categories</div>
          <div className={classes.subnav_content}>
            <div className={classes.subnav_content_subnav}>
              <div className={classes.subnavbtn2x}>
                <Link className={classes.item} to="/exploreMore" >
                  SSC
                  <div className={classes.arrw_icon1}>
                    <MdOutlineKeyboardArrowRight
                      className={classes.arrow}
                      size={20}
                    />
                  </div>
                </Link>
              </div>
              <div className={classes.subnav_content2x}>
                <Link to="/exploreMore">SSC CGL (Combined Graduate Level)</Link>
                <Link to="/exploreMore">SSC CHSL (Combined Higher Secondary Level)</Link>
                <Link to="/exploreMore">SSC Multitasking (Non-Technical)</Link>
                <Link to="/exploreMore">SSC Stenographers Grade 'C' & 'D'</Link>
                <Link to="/exploreMore">SSC CPO(Central Police Organization)</Link>
                <Link to="/exploreMore">SSC JE(Junior Engineer)</Link>
                <Link to="/exploreMore">SSC Junior Hindi Translator</Link>
              </div>
            </div>
            <div className={classes.subnav_content_subnav}>
              <div className={classes.subnavbtn2x}>
                <Link className={classes.item} to="/railwayExploreMore">
                  Railway
                  <div className={classes.arrw_icon2}>
                    <MdOutlineKeyboardArrowRight
                      className={classes.arrow}
                      size={20}
                    />
                  </div>
                </Link>
              </div>
              <div className={classes.subnav_content2x}>
                <Link to="/railwayExploreMore">RRB NTPC</Link>
                <Link to="/railwayExploreMore">RRB JE</Link>
                <Link to="/railwayExploreMore">RRB ALP</Link>
                <Link to="/railwayExploreMore">RRB Ministerial and Isolated Categori</Link>
                <Link to="/railwayExploreMore">RRB Group D</Link>
                <Link to="/railwayExploreMore">RRB Ministerial </Link>
                <Link to="/railwayExploreMore">RRB Paramedical</Link>
                <Link to="/railwayExploreMore">Goods Guard</Link>
                <Link to="/railwayExploreMore">Junior Engineer</Link>
                <Link to="/railwayExploreMore">RPF constable</Link>
                <Link to="/railwayExploreMore">RRB ntcp</Link>
                <Link to="/railwayExploreMore">Traffic Assistant</Link>
                <Link to="/railwayExploreMore">Trains Clerk</Link>

              </div>
            </div>
            <div className={classes.subnav_content_subnav}>
              <div className={classes.subnavbtn2x}>
                <Link className={classes.item} to="/railwayExploreMore">
                  Bank
                  <div className={classes.arrw_icon3}>
                    <MdOutlineKeyboardArrowRight
                      className={classes.arrow}
                      size={20}
                    />
                  </div>
                </Link>
              </div>
              <div className={classes.subnav_content2x}>
                <Link to="/">Quantative Aptitude</Link>
                <Link to="/">General Science</Link>
                <Link to="/">Computer Science</Link>
                <Link to="/">Qualitative Aptitude</Link>
              </div>
            </div>
            <div className={classes.subnav_content_subnav}>
              <div className={classes.subnavbtn2x}>
                <Link className={classes.item} to="/">
                  Other Exams
                  <div className={classes.arrw_icon4}>
                    <MdOutlineKeyboardArrowRight
                      className={classes.arrow}
                      size={20}
                    />
                  </div>
                </Link>
              </div>
              <div className={classes.subnav_content2x}>
                <Link to="/">Quantative Aptitude</Link>
                <Link to="/">General Science1</Link>
                <Link to="/">Computer Science1</Link>
                <Link to="/">Qualitative Aptitude1</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchBar />
      <div className={classes.playStore_icone}>
        <button className={classes.Playstore_btn} >
          <img
            src="/image/playstore.png"
            alt=""
            width="25px"
            height="25px"
            className={classes.playStore_image} />
        </button>
        <div className={classes.Playstore_description}>
          <a
            href="https://play.google.com/store/search?q=pinnacle&c=apps&hl=en-IN"
            target="blank"
            className={classes["Playstore-a"]}>
            Download Mobile app
          </a>
        </div>
      </div>
      <div
        className={classes.cart_icone}
        onClick={() => navigate("/cart")}
      ><HoverCart /></div>
      <div className={classes.globe_icon}>
        <BsGlobe size={20} onClick={LanguageHandler} />
      </div>

      <div className={classes.moreapp_icon}>
        <button onClick={MoreAppsHandler} className={classes["MoreApps-btn"]}>
          <GrApps size={20} />
        </button>
      </div>

      {auth ?
        <>
          <Account className={classes["Account-div"]}/>
        </> :
        <>
          <div className={classes.login}>
            <button
              className={classes.login_btn}
              onClick={() => navigate("/login")}>
              Log in
            </button>
          </div>
          <div className={classes.signup}>
            <button
              className={classes.signup_btn}
              onClick={() => navigate("/signup")}>Sign up
            </button>
          </div>
        </>}
      <div className={classes.Languages_div}>
        {showLanguage && <Languages />}
      </div>
      <div className={classes.moreApps_div}>{showMoreApps && <MoreApps />}</div>
    </div>
  );
}
