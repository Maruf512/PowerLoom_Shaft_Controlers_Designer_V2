import { DesignType } from "@/types/data";

const startingPosition1 = (currentPosition: number | null): string => {
  switch (currentPosition) {
    case 1:
      return "A";
    case 2:
      return "C";
    case 3:
      return "B";
    case 4:
      return "D";
    default:
      return "";
  }
};
const startingPosition2 = (currentPosition: number | null): string => {
  switch (currentPosition) {
    case 1:
      return "C";
    case 2:
      return "A";
    case 3:
      return "D";
    case 4:
      return "B";
    default:
      return "";
  }
};
const startingPosition3 = (currentPosition: number | null): string => {
  switch (currentPosition) {
    case 1:
      return "B";
    case 2:
      return "D";
    case 3:
      return "A";
    case 4:
      return "C";
    default:
      return "";
  }
};
const startingPosition4 = (currentPosition: number | null): string => {
  switch (currentPosition) {
    case 1:
      return "D";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "A";
    default:
      return "";
  }
};

export const generateOutput = (designerData: DesignType) => {
  let generatedOutput = "";
  let startingPosition = Number(designerData.starting_position);

  for (let i = 0; i <= designerData.design_grids.length; i++) {
    const currentPosition = designerData.design_grids[i]?.color_box;
    const totalPics = designerData.design_grids[i]?.total_pics;

    if (!currentPosition || !totalPics) return;

    if (startingPosition === 1) {
      const output = startingPosition1(currentPosition);
      generatedOutput += output + "A".repeat(totalPics - 1);
    }

    if (startingPosition === 2) {
      const output = startingPosition2(currentPosition);
      generatedOutput += output + "A".repeat(totalPics - 1);
    }

    if (startingPosition === 3) {
      const output = startingPosition3(currentPosition);
      generatedOutput += output + "A".repeat(totalPics - 1);
    }

    if (startingPosition === 4) {
      const output = startingPosition4(currentPosition);
      generatedOutput += output + "A".repeat(totalPics - 1);
    }

    startingPosition = currentPosition;
  }

  if (designerData.machine_type === "right_handed") {
    let converted = "";
    for (const char of generatedOutput) {
      if (char === "A") converted += "D";
      else if (char === "B") converted += "C";
      else if (char === "C") converted += "B";
      else if (char === "D") converted += "A";
    }
    return converted;
  }

  return generatedOutput;
};
