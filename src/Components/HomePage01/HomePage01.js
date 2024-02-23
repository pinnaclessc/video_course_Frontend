import React from "react";
import Timer from "./Header/Timer";
import PromotionSlider from "../../PromotionSlider/PramotionSlider";
import Body from "./Body/Body";

export default function HomePage01() {
  return (
    <div>
      <div>
        <PromotionSlider />
      </div>
      <Body />
    </div>
  );
}
