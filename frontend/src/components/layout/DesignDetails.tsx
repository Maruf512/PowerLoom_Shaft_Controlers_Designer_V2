import { Design } from "@/types/data";
import React from "react";
import { DiVim } from "react-icons/di";

const DesignDetails = ({ designer }: { designer: Design }) => {
  return (
    <div className="grid-container ">
      <div className="box-item" style={{ gridArea: "box-1" }}>
        <Microsemulator designer={designer} />
      </div>
      <div className="box-item  " style={{ gridArea: "box-2" }}>
        2
      </div>
      <div className="box-item" style={{ gridArea: "box-3" }}>
        3
      </div>
      <div className="box-item " style={{ gridArea: "box-4" }}>
        4
      </div>
      <div className="box-item " style={{ gridArea: "box-5" }}>
        5
      </div>
    </div>
  );
};

export default DesignDetails;

const Microsemulator = ({ designer }: { designer: Design }) => {
  const colorBoxes = [
    designer?.color_box_1,
    designer.color_box_2,
    designer.color_box_3,
    designer.color_box_4,
  ];
  return (
    <div className="rounded-full overflow-hidden lg:h-14 h-10 aspect-square flex flex-col ">
      {designer.design_grids.map((grid, i) => {
        const bgColor = colorBoxes[grid.color_box - 1];
        return (
          <div
            className="h-full w-full"
            style={{ backgroundColor: bgColor }}
          ></div>
        );
      })}
    </div>
  );
};
