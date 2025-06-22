"use client";

import Button from "@/components/ui/Button";
import DesignBoxTable from "@/components/ui/DesignBoxTable";
import {
  SelectColorBoxes,
  SelectMachineType,
  SelectStartingPosition,
} from "@/components/ui/DesignSelect";
import ExportTxt from "@/components/ui/ExportTxt";
import Semulator from "@/components/ui/Semulator";
import {
  designerEnitialState,
  designerErrorEnitialState,
} from "@/constants/Designer";
import apiClient from "@/lib/apiClient";
import { DesignErrorType, DesignType } from "@/types/data";
import { designDataValidator } from "@/utils/validators";
import { useState } from "react";

const Page = () => {
  const [designerData, setDesignerData] =
    useState<DesignType>(designerEnitialState);
  const [designDataError, setDesignDataError] = useState<DesignErrorType>(
    designerErrorEnitialState
  );

  const handleDesignerDataChange = <K extends keyof DesignType>(
    key: K,
    value: DesignType[K]
  ) => {
    setDesignerData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setDesignDataError((prev) => ({ ...prev, [key]: "" }));
  };

  const handelSave = async () => {
    const isValid = designDataValidator(designerData, setDesignDataError);

    if (isValid) {
      const { data, error, status } = await apiClient("designs", {
        method: "POST",
        body: designerData,
      });

      console.log(data, error, status);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-on-surface text-center tracking-wide w-fit font-medium cursor-pointer">
        <Button>Go Back</Button>
      </div>
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="border border-muted lg:p-7 p-5 rounded-radius-lg space-y-6 xl:w-[30%] w-full bg-surface/50 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold text-strong border-b border-muted pb-4">
            Design Parameters
          </h2>
          <div>
            <p className="text-lg font-semibold text-strong mb-2">
              Design Name
            </p>
            <input
              className="w-full px-3 py-1 border border-muted rounded-radius-sm bg-secondary"
              id="design-name"
              placeholder="Enter Design Name"
              type="text"
              value={designerData.name}
              onChange={(e) => handleDesignerDataChange("name", e.target.value)}
            />
            <p className="error-text">{designDataError?.name}</p>
          </div>
          <div className="border-t border-muted pt-6">
            <p className="text-lg font-semibold text-strong mb-2 block">
              Total Color Palettes
            </p>
            <input
              className="w-full px-3 py-1 border border-muted rounded-radius-sm bg-secondary"
              id="total-color-palettes"
              placeholder="Total Color Palettes"
              type="number"
              min="0"
              value={designerData.total_color_palettes!}
              onChange={(e) =>
                handleDesignerDataChange(
                  "total_color_palettes",
                  Number(e.target.value)
                )
              }
            />
            <p className="error-text">
              {designDataError?.total_color_palettes}
            </p>
          </div>
          <div className="border-t border-muted pt-6">
            <p className="text-lg font-semibold text-strong mb-4">
              Color Palettes Settings
            </p>
            <SelectColorBoxes
              designerData={designerData}
              setDesignerData={setDesignerData}
              setDesignDataError={setDesignDataError}
              designDataError={designDataError}
            />
          </div>
          <div className="border-t border-muted pt-6">
            <p className="text-lg font-semibold text-strong mb-4">
              Starting Position
            </p>
            <SelectStartingPosition
              designerData={designerData}
              setDesignerData={setDesignerData}
              setDesignDataError={setDesignDataError}
              designDataError={designDataError}
            />
          </div>
          <div className="border-t border-muted pt-6">
            <p className="text-lg font-semibold text-strong mb-4">
              Machine Type
            </p>
            <SelectMachineType
              designerData={designerData}
              setDesignerData={setDesignerData}
              setDesignDataError={setDesignDataError}
              designDataError={designDataError}
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
        <div className="flex flex-col gap-5 justify-between xl:w-[70%] h-inherit">
          <div className="bg-on-surface rounded-radius-lg">
            <DesignBoxTable
              designerData={designerData}
              setDesignerData={setDesignerData}
              setDesignDataError={setDesignDataError}
              designDataError={designDataError}
            />
          </div>
          <div className="bg-on-surface rounded-radius-lg border border-muted lg:p-7 p-4 flex gap-4 text-sm lg:text-base">
            <Button className="flex-1" onClick={handelSave}>
              Save
            </Button>
            <div className="flex-1">
              <Semulator
                designerData={designerData}
                setDesignDataError={setDesignDataError}
              />
            </div>
            <div className="flex-1">
              <ExportTxt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
