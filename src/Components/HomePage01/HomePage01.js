import React from "react";
import Header from "../HomePage01/Header/Header"
import PromotionSlider from "../../PromotionSlider/PramotionSlider";
import Body from "./Body/Body";
export default function HomePage01() {
  return (
    <div>
      <Header/>
      <div>
        <PromotionSlider />
      </div>
      <Body />
    </div>
  );
}
