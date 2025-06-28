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
import ColorDelete from "./ColorDelete";
import { Select, SelectBody, SelectHeader, SelectItem } from "./Select";
import { useToast } from "./ToastProvider";
import { cn } from "@/utils/cn";
import Button from "./Button";

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
  const [colorToDelete, setColorToDelete] = useState<ColorType>();

  const colorBoxHandler = (key: selectFieldsKeyType, value: string) => {
    setDesignerData((prev) => ({ ...prev, [key]: value }));
    setDesignDataError((prev) => ({ ...prev, [key]: "" }));
  };

  useEffect(() => {
    const fetchColor = async () => {
      const { data, error } = await apiClient<ColorResponseType[]>("colors");

      if (data && !error) {
        const formatted = data.map((item) => ({
          id: item.id,
          color: item.color,
        }));
        setColors(formatted);
      }
    };
    fetchColor();
  }, [reload]);

  const deleteColor = async () => {
    const { error } = await apiClient(`colors/${colorToDelete?.id}`, {
      method: "DELETE",
    });

    if (error) {
      toast("Error deleting color", "error");
      return;
    }

    setColors((prev) =>
      prev?.filter((color) => color.id !== colorToDelete?.id)
    );
    toast("Color deleted successfully", "success");
    setIsOpen(false);
  };

  const handelContextMeny = (
    e: React.MouseEvent<HTMLDivElement>,
    color: ColorType
  ) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setColorToDelete(color);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {colorBoxFields.map((item) => {
          const colorValue =
            designerData[item.key as selectFieldsKeyType] || "";

          return (
            <div
              key={item.key}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <Select
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
                        <div className="flex items-center gap-2">
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
                    <p className="px-2 py-1 text-sm font-medium">
                      No colors available
                    </p>
                  ) : (
                    <div className="relative">
                      {colors.map((color) => (
                        <SelectItem key={color.color} itemValue={color.color}>
                          <div
                            className="flex items-center gap-2  w-full"
                            onContextMenu={(e) => handelContextMeny(e, color)}
                          >
                            <div
                              className="w-4 h-4 rounded-full border border-muted"
                              style={{ backgroundColor: color.color }}
                            ></div>
                            <span className="font-normal text-basec">
                              ({color.color})
                            </span>
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
      <ColorDelete setIsOpen={setIsOpen}>
        <div
          className={cn(
            `fixed z-50 transition-all duration-200 ease-in-out w-64 bg-white rounded-md text-sm shadow-lg border border-muted p-4`,
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          style={{ top: menuPosition.y, left: menuPosition.x }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-5 h-5 rounded-full border border-muted"
              style={{ backgroundColor: colorToDelete?.color }}
            />
            <p className="text-black font-medium">{colorToDelete?.color}</p>
          </div>

          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this color?
          </p>

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded-md text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteColor}
              className="px-3 py-1 rounded-md text-sm text-white transition"
            >
              Delete
            </Button>
          </div>
        </div>
      </ColorDelete>
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
