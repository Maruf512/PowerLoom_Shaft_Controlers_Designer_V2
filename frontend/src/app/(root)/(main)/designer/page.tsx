"use client";

import {
  SelectColorBoxes,
  SelectMachineType,
  SelectStartingPosition,
} from "@/components/ui/DesignSelect";
import { DesignType } from "@/types/data";
import { useState } from "react";

const Page = () => {
  const [designerData, setDesignerData] = useState<DesignType>({
    name: "",
    total_color_palettes: 0,
    color_box_1: "",
    color_box_2: "",
    color_box_3: "",
    color_box_4: "",
    starting_position: "",
    machine_type: "" as any,
    design_grids: [],
  });

  const handleDesignerDataChange = <K extends keyof DesignType>(
    key: K,
    value: DesignType[K]
  ) => {
    setDesignerData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="flex min-h-[calc(100vh-48px)]">
      <div className="border border-muted p-7 rounded-radius-lg shadow-sm space-y-6 xl:w-[30%] w-full bg-surface/50 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-strong border-b border-muted pb-4">
          Design Parameters
        </h2>
        <div>
          <label
            htmlFor="design-name"
            className="text-lg font-semibold text-strong mb-2 block"
          >
            Design Name
          </label>
          <input
            id="design-name"
            placeholder="Enter Design Name"
            type="text"
            value={designerData.name}
            onChange={(e) => handleDesignerDataChange("name", e.target.value)}
          />
        </div>
        <div className="border-t border-muted pt-6">
          <label
            htmlFor="total-color-palettes"
            className="text-lg font-semibold text-strong mb-2 block"
          >
            Total Color Palettes
          </label>
          <input
            id="total-color-palettes"
            placeholder="Total Color Palettes"
            type="number"
            min="0"
            value={designerData.total_color_palettes}
            onChange={(e) =>
              handleDesignerDataChange(
                "total_color_palettes",
                Number(e.target.value)
              )
            }
          />
        </div>
        <div className="border-t border-muted pt-6">
          <p className="text-lg font-semibold text-strong mb-4">
            Color Palettes Settings
          </p>
          <SelectColorBoxes
            designerData={designerData}
            setDesignerData={setDesignerData}
          />
        </div>
        <div className="border-t border-muted pt-6">
          <p className="text-lg font-semibold text-strong mb-4">
            Starting Position
          </p>
          <SelectStartingPosition
            designerData={designerData}
            setDesignerData={setDesignerData}
          />
        </div>
        <div className="border-t border-muted pt-6">
          <p className="text-lg font-semibold text-strong mb-4">Machine Type</p>
          <SelectMachineType
            designerData={designerData}
            setDesignerData={setDesignerData}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
