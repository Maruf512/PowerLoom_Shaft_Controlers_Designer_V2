import { DesignType } from "@/types/data";

export const designerEnitialState: DesignType = {
  name: "eafdawed",
  total_color_palettes: 4,
  color_box_1: "#FF0000",
  color_box_2: "#FF00FF",
  color_box_3: "#FFFF00",
  color_box_4: "#00FF00",
  starting_position: "2",
  machine_type: "left_handed" as any,
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

// export const designerEnitialState: DesignType = {
//   name: "",
//   total_color_palettes: 0,
//   color_box_1: "",
//   color_box_2: "",
//   color_box_3: "",
//   color_box_4: "",
//   starting_position: "",
//   machine_type: "" as any,
//   design_grids: [],
// };
