"use client";

import Button from "@/components/ui/Button";
import DesignBoxTable from "@/components/ui/DesignBoxTable";
import {
  SelectColorBoxes,
  SelectMachineType,
  SelectStartingPosition,
} from "@/components/ui/DesignSelect";
import { designerEnitialState } from "@/constants/Designer";
import { DesignType } from "@/types/data";
import { useState } from "react";

const Page = () => {
  const [designerData, setDesignerData] =
    useState<DesignType>(designerEnitialState);

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
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="border border-muted p-7 rounded-radius-lg shadow-sm space-y-6 xl:w-[30%] w-full bg-surface/50 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-strong border-b border-muted pb-4">
          Design Parameters
        </h2>
        <div>
          <p className="text-lg font-semibold text-strong mb-2">Design Name</p>
          <input
            className="shadow-none bg-secondary"
            id="design-name"
            placeholder="Enter Design Name"
            type="text"
            value={designerData.name}
            onChange={(e) => handleDesignerDataChange("name", e.target.value)}
          />
        </div>
        <div className="border-t border-muted pt-6">
          <p className="text-lg font-semibold text-strong mb-2 block">
            Total Color Palettes
          </p>
          <input
            className="shadow-none bg-secondary"
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
        <div className="border-t border-muted pt-6">
          <Button
            className="w-full"
            onClick={() => setDesignerData(designerEnitialState)}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between xl:w-[70%]">
        <div>
          <DesignBoxTable
            designerData={designerData}
            setDesignerData={setDesignerData}
          />
        </div>
        <div>w</div>
      </div>
    </div>
  );
};

export default Page;
