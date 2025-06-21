<<<<<<< HEAD
<<<<<<< HEAD
export const designerEnitialState = {
  name: "",
  total_color_palettes: 3,
  color_box_1: "",
  color_box_2: "",
  color_box_3: "",
  color_box_4: "",
  starting_position: "",
  machine_type: "" as any,
=======
import { DesignType } from "@/types/data";
=======
import { DesignErrorType, DesignType } from "@/types/data";
>>>>>>> b817afbe54cdb183eab5558a34ce2206ad613039

export const designerEnitialState: DesignType = {
  name: "eafdawed",
  total_color_palettes: 3,
  color_box_1: "#FF0000",
  color_box_2: "#FF00FF",
  color_box_3: "#FFFF00",
  color_box_4: "#00FF00",
  starting_position: "2",
<<<<<<< HEAD
  machine_type: "left_handed" as any,
>>>>>>> b88673d03acb8c7489ffe2cb5c3dc9ba00cb8cd6
=======
  machine_type: "left_handed",
>>>>>>> b817afbe54cdb183eab5558a34ce2206ad613039
  design_grids: [
    {
      color_box: 1,
      total_pics: 5,
    },
    {
      color_box: 2,
      total_pics: 8,
    },
    {
      color_box: 3,
      total_pics: 12,
    },
  ],
};

export const designerErrorEnitialState: DesignErrorType = {
  name: "",
  total_color_palettes: "",
  color_box_1: "",
  color_box_2: "",
  color_box_3: "",
  color_box_4: "",
  starting_position: "",
  machine_type: "",
  design_grids: [],
};

// export const designerEnitialState: DesignType = {
//   name: "",
//   total_color_palettes: 0,
//   color_box_1: "",
//   color_box_2: "",
//   color_box_3: "",
//   color_box_4: "",
//   starting_position: "1",
//   machine_type: "left_handed",
//   design_grids: [],
// };
