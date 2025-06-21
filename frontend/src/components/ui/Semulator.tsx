import React, { useState } from "react";
import Button from "./Button";
import { DesignErrorType, DesignType } from "@/types/data";
import { designDataValidator } from "@/utils/validators";
import Modal from "./Modal";
import { cn } from "@/utils/cn";

const Semulator = ({
  designerData,
  setDesignDataError,
}: {
  designerData: DesignType;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
}) => {
  const [isValid, setIsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSimulate = () => {
    const deisgnDataValidator = designDataValidator(
      designerData,
      setDesignDataError
    );

    setIsValid(deisgnDataValidator);

    if (deisgnDataValidator) {
      setIsOpen(true);
    }
  };

  const colorBoxes = [
    designerData.color_box_1,
    designerData.color_box_2,
    designerData.color_box_3,
    designerData.color_box_4,
  ];

  console.log("Available colors:", colorBoxes);

  return (
    <div>
      <Button className="w-full" onClick={handleSimulate}>
        Simulate
      </Button>
      {isValid && isOpen && (
        <Modal setIsOpen={setIsOpen} className="w-[40rem]">
          <div className="flex justify-between h-full">
            <div className="h-full w-full">
              <div className="overflow-hidden rounded-radius-lg space-y-0.5 h-full overflow-y-scroll">
                {designerData.design_grids.map((item, i) => {
                  const heightInPixels = (item.total_pics as number) * 6 + 30;

                  const backgroundColor =
                    colorBoxes[(item.color_box as number) - 1];

                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-full ",
                        "transition-all duration-300 ease-in-out",
                        "flex items-center px-4  text-sm font-medium"
                      )}
                      style={{
                        height: `${heightInPixels}px`,
                        backgroundColor: backgroundColor,
                      }}
                    >
                      <p className="bg-strong/80 px-3 py-1 rounded-radius-sm text-muted">
                        {colorBoxes[(item.color_box as number) - 1]}
                        {" | "}
                        {item.total_pics}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Semulator;
