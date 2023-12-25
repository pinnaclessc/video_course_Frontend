// ExploreMore For SSC
import React, { useState } from "react";
import styles from "./ExploreMore.module.css";
import railwayLogo from "./railwayLogo.png";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import {TbPoint} from "react-icons/tb";
export default function Railway() {
  const [ntpc, setNtpc] = useState(true);
  const [rrbJE, setrrbJE] = useState(false);
  const [rpf, setRpf] = useState(false);
  const [sten, setSten] = useState(false);
  const [cpo, setCpo] = useState(false);
  const [je, setJe] = useState(false);
  const [jht, setJht] = useState(false);

  const ntpcHandler = () => {
    setNtpc(true);
    setrrbJE(false);
    setRpf(false);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const RRBJEHandler=() =>{
    setNtpc(false);
    setrrbJE(true);
    setRpf(false);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const rpfHandler= () => {
    setNtpc(false);
    setrrbJE(false);
    setRpf(true);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const stenHandler = () => {
    setNtpc(false);
    setrrbJE(false);
    setRpf(false);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(true);
  };
  const cpoHandler = () => {
    setNtpc(false);

    setrrbJE(false);
    setRpf(false);
    setCpo(true);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const jeHandler = () => {
    setNtpc(false);
    setrrbJE(false);
    setRpf(false);
    setCpo(false);
    setJe(true);
    setJht(false);
    setSten(false);
  };
  const jhtHandler = () => {
    setNtpc(false);
    setrrbJE(false);
    setRpf(false);
    setCpo(false);
    setJe(false);
    setJht(true);
    setSten(false);
  };
  return (
    <>
      <div className={styles["BackBtn"]}><Link to='/exploreByCategory'  className={styles["BackBtn-Link"]}><IoMdArrowBack/>&nbsp;&nbsp;Back&nbsp;&nbsp;</Link></div>
      <div className={styles["EM-header"]}>
        <div className={styles["EM-header-container01"]}>
          <img src={railwayLogo} alt="sscLogo" className={styles["EM-image"]}></img>
        </div>
        <div className={styles["EM-header-container02"]}>
          <div className={styles["EM-header-heading"]}>Railway</div>
          <div className={styles["EM-header-para"]}>
            The Railways exam is one of the best career opportunities for an
            aspirant looking for a government job. Railways Recruitment Board
            conducts the railway exams. The Indian Railways will be conducting
            recruitment exams for employment in various departments of Group A,
            B, C, D and other positions. Multiple notifications are released by
            the Indian Railways every year for vacancies. Interested candidates
            must choose their preferred field of career and then follow the
            notifications for that post. RRB will be releasing notifications for
            various regions and also the metro department.
          </div>
        </div>
      </div>

      <div className={styles["EM-body"]}>
        <div className={styles["EM-body-container1"]}>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={ntpcHandler}
            >
              RRB NTPC
            </button>
          </div>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={RRBJEHandler}
            >
            RRB JE
            </button>
          </div>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={rpfHandler}
            >
              RRB RPF 
            </button>
          </div>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={stenHandler}
            >
              SSC Stenographers Grade 'C' & 'D'
            </button>
          </div>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={cpoHandler}
            >
              SSC CPO(Central Police Organization)
            </button>
          </div>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={jeHandler}
            >
              SSC JE(Junior Engineer)
            </button>
          </div>
          <div className={styles["EM-body-buttons"]}>
            <button
              className={styles["EM-header-indi-butBtn"]}
              onClick={jhtHandler}
            >
              SSC Junior Hindi Translator
            </button>
          </div>
        </div>
        <div className={styles["EM-body-container2"]}>
          {/* ntpc section */}
          {ntpc && <div className={styles['ntpc-section']}>
            <div className={styles["EM-header-heading"]}>POSTS UNDER RRB NTPC </div>
            <div className={styles["EM-header-para"]}>1.Junior Clerk cum Typist</div>
            <div className={styles["EM-header-para"]}>2.Accounts Clerk cum Typist</div>
            <div className={styles["EM-header-para"]}>3.Junior Time Keeper</div>
            <div className={styles["EM-header-para"]}>4.Trains Clerk</div>
            <div className={styles["EM-header-para"]}>5.Commercial cum Ticket Clerk</div>
            <div className={styles["EM-header-para"]}>6.Traffic Assistant</div>
            <div className={styles["EM-header-para"]}>7.Goods Guard</div>
            <div className={styles["EM-header-para"]}>8.Senior Commercial cum Ticket Clerk</div>
            <div className={styles["EM-header-para"]}>9.Senior Clerk cum Typist</div>
            <div className={styles["EM-header-para"]}>10.Junior Account Assistant cum Typist</div>
            <div className={styles["EM-header-para"]}>11.Senior Time Keeper</div>
            <div className={styles["EM-header-para"]}>12.Commercial Apprentice</div>
            <div className={styles["EM-header-para"]}>13.Station Master</div>
            

          </div>}
          {/* RRB JE Section  */}
          {rrbJE && <div>
            <div className={styles["EM-header-heading"]}>POSTS UNDER RRB JE </div>
            <div className={styles["EM-header-para"]}>1.Junior Engineer (JE)</div>
            <div className={styles["EM-header-para"]}>2.Junior Engineer (IT)</div>
            <div className={styles["EM-header-para"]}>3.Depot Materials Superintendent (DMS)</div>
            <div className={styles["EM-header-para"]}>4.Chemical & Metallurgical Assistant (CMA)</div>
            <div className={styles["EM-header-heading"]}>ELIGIBILITY CRITERIA FOR RRB JE EXAM </div>
            <div className={styles["EM-header-para"]}><TbPoint/>Minimum age required is 18.</div>
            <div className={styles["EM-header-para"]}><TbPoint/>You must be an engineering student.</div>
            <div className={styles["EM-header-para"]}><TbPoint/>You have to clear the medical examination conducted by RRB.</div>
            <div className={styles["EM-table"]}>
              <table>
                <thead>
                  <tr>
                    <th>RRB JE SYLLABUS</th>
                  </tr>

                </thead>
                <tbody>
                  <tr className={styles}>
                    <td>RRB CBT1</td>
                    <tr><td> &nbsp;&nbsp;MATHEMATICS&nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;GENERAL SCIENCE &nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;REASONING &nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;GENERAL AWARENESS &nbsp;&nbsp;</td></tr>
                  </tr>
                 <hr/>
                 <tr className={styles}>
                    <td>RRB CBT2</td>
                    <tr><td> &nbsp;&nbsp;GENERAL AWARENESS&nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;BASICS OF COMPUTER &nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;PHYSICS AND CHEMISTRY &nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;BASICS OF ENVIRONMENTAL POLLUTION &nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;TECHNICAL DISCIPLINE &nbsp;&nbsp;</td></tr>

                  </tr>

                </tbody>
                </table>
              
            </div>
            </div>
          }

          {/*   RRB RPF SECTION */}
          {rpf && 
          <div className={styles["RPF-section"]}>RRB RPF SECTION
          <div className={styles["EM-header-heading"]}>ELIGIBILITY CRITERIA FOR RRB RPF EXAM</div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Educational Qualification</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>RPF Constable (Executive)</th>
                  <td>SSLC/Matric from a recognized Board.</td>
                </tr>
                <tr>
                  <th>RPF Sub Inspector (Executive)</th>
                  <td>Graduate from a recognized University</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          }
          {/* cgl handler */}
          {sten && <div>sten Handler</div>}
          {/* junior Engineer handler */}
          {je && <div>junior Engineer Handler</div>}
          {/* junior hindi Translator handler */}
          {jht &&
          <div>junior hindi Translator Handler</div>
          }
          {/* cpo handler */}
          {cpo && <div>cpo Handler</div>}
        </div>
      </div>
    </>
  );
}
