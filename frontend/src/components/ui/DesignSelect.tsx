import {
  colorBoxFields,
  machineTypeFields,
  startingPositionField,
} from "@/constants/select";
import apiClient from "@/lib/apiClient";
import {
  ColorResponseType,
  ColorType,
  DesignErrorType,
  DesignType,
  selectFieldsKeyType,
  SelectStartingPositionFieldsType,
} from "@/types/data";
import { getLabel } from "@/utils/getLabel";
import React, { useEffect, useState } from "react";
import { Select, SelectBody, SelectHeader, SelectItem } from "./Select";
import { BiTrash } from "react-icons/bi";
import { useToast } from "./ToastProvider";
import Overlay from "./Overlay";
import { cn } from "@/utils/cn";

// const colors = [
//   { name: "Red", hex: "#FF0000" },
//   { name: "Green", hex: "#00FF00" },
//   { name: "Blue", hex: "#0000FF" },
//   { name: "Yellow", hex: "#FFFF00" },
//   { name: "Cyan", hex: "#00FFFF" },
//   { name: "Magenta", hex: "#FF00FF" },
//   { name: "Orange", hex: "#FFA500" },
//   { name: "Purple", hex: "#800080" },
//   { name: "White", hex: "#FFFFFF" },
//   { name: "Black", hex: "#000000" },
// ];

export const SelectColorBoxes = ({
  designerData,
  setDesignerData,
  setDesignDataError,
  designDataError,
  reload,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
  designDataError: DesignErrorType;
  reload: boolean;
}) => {
  const [colors, setColors] = useState<ColorType[] | undefined>([]);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const colorBoxHandler = (key: selectFieldsKeyType, value: string) => {
    setDesignerData((prev) => ({ ...prev, [key]: value }));
    setDesignDataError((prev) => ({ ...prev, [key]: "" }));
  };

  useEffect(() => {
    const fetchColor = async () => {
      const { data, error, status } = await apiClient<ColorResponseType[]>(
        "colors"
      );

      const colors = data?.map((item) => ({ id: item.id, color: item.color }));

      console.log(colors);

      if (data && !error) {
        setColors(colors);
      }
    };
    fetchColor();
  }, [reload]);

  const deleteColor = async (colorId: number) => {
    const { data, error, status } = await apiClient(`colors/${colorId}`, {
      method: "DELETE",
    });

    if (error) {
      toast("Error deleting color", "error");
      return;
    }
    setColors((prev) => prev?.filter((color) => color.id !== colorId));
    toast("Color deleted successfully", "success");
    console.log(data, error, status);
  };

  const handelContextMeny = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen(true);
    setMenuPosition({ x: 0, y: 0 });
    setMenuPosition({ x: e.clientX, y: e.clientY });
    console.log(menuPosition);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {colorBoxFields.map((item) => {
          const colorValue =
            designerData[item.key as selectFieldsKeyType] || "";

          return (
            <div>
              <Select
                key={item.key}
                className="relative w-full"
                value={colorValue}
                selectHandler={colorBoxHandler}
                fieldContext={item.key}
              >
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <SelectHeader
                      className="flex-grow"
                      placeHolder={item.label}
                    >
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
                  {!colors || !colors.length ? (
                    <p className="px-2 text-sm font-medium">
                      No colors available
                    </p>
                  ) : (
                    <div
                      className="relative"
                      onContextMenu={(e) => handelContextMeny(e)}
                    >
                      {colors.map((color) => (
                        <SelectItem key={color.color} itemValue={color.color}>
                          <div className="flex items-center gap-2 justify-between">
                            <div
                              className="w-4 h-4 rounded-full border border-muted"
                              style={{ backgroundColor: color.color }}
                            ></div>
                            <span className="font-normal text-basec">
                              ({color.color})
                            </span>
                            <div
                              className="hover hover:bg-on-surface p-1 rounded-full  duration-200 text-basec"
                              onClick={(e) => {
                                deleteColor(color.id);
                                e.stopPropagation();
                              }}
                            >
                              <BiTrash />
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  )}
                </SelectBody>
              </Select>
            </div>
          );
        })}
      </div>
      {/* <Overlay setIsOpen={setIsOpen}>
        <div
          className={cn(
            "fixed z-50 transition-all duration-200 ease-in-out w-10 h-10 bg-black",
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          style={{ top: menuPosition.y, left: menuPosition.x }}
        ></div>
      </Overlay> */}
    </>
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
