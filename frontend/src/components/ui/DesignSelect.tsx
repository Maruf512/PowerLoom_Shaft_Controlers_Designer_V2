import {
  colorBoxFields,
  machineTypeFields,
  startingPositionFields,
} from "@/constants/select";
import { DesignType, selectFieldsKeyType } from "@/types/data";
import React, { useEffect } from "react";
import { Select, SelectBody, SelectHeader, SelectItem } from "./Select";

const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Purple", hex: "#800080" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
];

export const SelectColorBoxes = ({
  designerData,
  setDesignerData,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
}) => {
  const colorBoxHandler = (key: selectFieldsKeyType, value: string) => {
    setDesignerData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      {colorBoxFields.map((item) => (
        <Select
          key={item.key}
          className="relative w-full"
          value={
            (designerData[item.key as selectFieldsKeyType] as string) || ""
          }
          selectHandler={colorBoxHandler}
          fieldContext={item.key}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">{item.label}:</span>
            <SelectHeader className="flex-grow" placeHolder="Select Color" />
          </div>
          <SelectBody>
            {colors.map((color) => (
              <SelectItem key={color.hex} itemValue={color.hex}>
                <div className="flex items-center gap-2 ">
                  <div
                    className="w-4 h-4 rounded-full border border-muted"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span className="font-medium">{color.name}</span>{" "}
                  <span className="font-normal text-basec">({color.hex})</span>
                </div>
              </SelectItem>
            ))}
          </SelectBody>
        </Select>
      ))}
    </div>
  );
};

export const SelectStartingPosition = ({
  designerData,
  setDesignerData,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
}) => {
  const startingPosigionHandler = (key: selectFieldsKeyType, value: string) => {
    setDesignerData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Select
        selectHandler={startingPosigionHandler}
        fieldContext="starting_position"
        value={designerData.starting_position}
        className="w-full relative"
      >
        <SelectHeader
          className="flex-grow"
          placeHolder="Select The Starting Postigon"
        />
        <SelectBody>
          {colorBoxFields.map((item) => (
            <SelectItem key={item.key} itemValue={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </SelectBody>
      </Select>
    </div>
  );
};

export const SelectMachineType = ({
  designerData,
  setDesignerData,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
}) => {
  const [machineType, setMachineType] = React.useState(
    designerData.machine_type
  );

  useEffect(() => {
    setDesignerData((prev) => ({ ...prev, machine_type: machineType }));
  }, [machineType, designerData.machine_type]);

  return (
    <div>
      <Select
        setValue={setMachineType}
        value={machineType}
        fieldContext="machine_type"
      >
        <SelectHeader placeHolder="Select Machine Type" />
        <SelectBody>
          {machineTypeFields.map((item) => (
            <SelectItem key={item.value} itemValue={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectBody>
      </Select>
    </div>
  );
};
