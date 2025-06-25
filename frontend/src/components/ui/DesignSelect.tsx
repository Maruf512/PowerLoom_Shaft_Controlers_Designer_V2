import {
  colorBoxFields,
  machineTypeFields,
  startingPositionField,
} from "@/constants/select";
import {
  DesignErrorType,
  DesignType,
  selectFieldsKeyType,
  SelectStartingPositionFieldsType,
} from "@/types/data";
import React, { useEffect } from "react";
import { Select, SelectBody, SelectHeader, SelectItem } from "./Select";
import { getLabel } from "@/utils/getLabel";

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
  setDesignDataError,
  designDataError,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
  designDataError: DesignErrorType;
}) => {
  const colorBoxHandler = (key: selectFieldsKeyType, value: string) => {
    setDesignerData((prev) => ({ ...prev, [key]: value }));
    setDesignDataError((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <div className="flex flex-col gap-4">
      {colorBoxFields.map((item) => {
        const colorValue = designerData[item.key as selectFieldsKeyType] || "";

        return (
          <Select
            key={item.key}
            className="relative w-full"
            value={colorValue}
            selectHandler={colorBoxHandler}
            fieldContext={item.key}
          >
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <SelectHeader className="flex-grow" placeHolder={item.label}>
                  {colorValue && (
                    <div className="flex items-center gap-2 ">
                      <div
                        className="w-4 h-4 rounded-full border border-muted"
                        style={{ backgroundColor: colorValue }}
                      ></div>
                      <span className="font-normal text-basec">
                        ({colorValue})
                      </span>
                    </div>
                  )}
                </SelectHeader>
                <p className="error-text">
                  {designDataError[item.key as selectFieldsKeyType]}
                </p>
              </div>
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
                    <span className="font-normal text-basec">
                      ({color.hex})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectBody>
          </Select>
        );
      })}
    </div>
  );
};

export const SelectStartingPosition = ({
  designerData,
  setDesignerData,
  setDesignDataError,
  designDataError,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
  designDataError: DesignErrorType;
}) => {
  const startingPosigionHandler = (key: selectFieldsKeyType, value: string) => {
    setDesignerData((prev) => ({ ...prev, [key]: value }));
    setDesignDataError((prev) => ({ ...prev, [key]: "" }));
  };

  const label = getLabel(designerData.starting_position, startingPositionField);

  return (
    <div>
      <Select
        selectHandler={startingPosigionHandler}
        fieldContext="starting_position"
        value={designerData.starting_position}
        className="w-full relative"
      >
        <div>
          <SelectHeader
            className="flex-grow"
            placeHolder="Select The Starting Postigon"
          >
            {!!label && label}
          </SelectHeader>
          <p>{designDataError.starting_position}</p>
        </div>
        <SelectBody>
          {startingPositionField.map(
            (item: SelectStartingPositionFieldsType) => (
              <SelectItem key={item.label} itemValue={item.value}>
                {item.label}
              </SelectItem>
            )
          )}
        </SelectBody>
      </Select>
    </div>
  );
};

export const SelectMachineType = ({
  designerData,
  setDesignerData,
  setDesignDataError,
  designDataError,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
  designDataError: DesignErrorType;
}) => {
  const [machineType, setMachineType] = React.useState(
    designerData.machine_type
  );

  useEffect(() => {
    setDesignerData((prev) => ({ ...prev, machine_type: machineType }));
    setDesignDataError((prev) => ({ ...prev, machine_type: "" }));
  }, [machineType, designerData.machine_type]);

  const label = getLabel(designerData.machine_type, machineTypeFields);

  return (
    <div>
      <Select
        setValue={setMachineType}
        value={machineType}
        fieldContext="machine_type"
      >
        <div>
          <SelectHeader placeHolder="Select Machine Type">
            {!!label && label}
          </SelectHeader>
          <p>{designDataError.machine_type}</p>
        </div>
        <SelectBody>
          {machineTypeFields.map((item) => (
            <SelectItem
              key={item.value}
              itemValue={item.value}
              itemLabel={item.label}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectBody>
      </Select>
    </div>
  );
};
