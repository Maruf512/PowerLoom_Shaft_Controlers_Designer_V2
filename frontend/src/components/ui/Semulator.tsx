import React, { useState } from "react";
import Button from "./Button";
import { DesignErrorType, DesignType } from "@/types/data";
import { designDataValidator } from "@/utils/validators";
import { cn } from "@/utils/cn";
import { Modal, ModalContent } from "./Modal";
import { useToast } from "./ToastProvider";

const Semulator = ({
  designerData,
  setDesignDataError,
  setHasError,
}: {
  designerData: DesignType;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleSimulate = () => {
    const validationResult = designDataValidator(
      designerData,
      setDesignDataError
    );

    setHasError(validationResult);

    if (validationResult) {
      toast("Can't simulat with empty fields", "error");
      return;
    }

    setIsOpen(true);
  };

  const colorBoxes = [
    designerData.color_box_1,
    designerData.color_box_2,
    designerData.color_box_3,
    designerData.color_box_4,
  ].filter(Boolean);

  return (
    <>
      <Button className="w-full h-full" onClick={handleSimulate}>
        Simulate
      </Button>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <ModalContent
          className={cn(
            "fixed top-0 left-0 h-full z-50",
            "lg:w-[40%] w-[80%] flex flex-col bg-on-surface border-r border-muted shadow-2xl",
            "transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex justify-between items-center p-5 border-b border-muted">
            <h2 className="text-lg md:text-xl font-semibold text-strong">
              Design Simulation
            </h2>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setIsOpen(false)}
              className="text-xl rounded-full border-0 md:text-2xl text-strong hover:scale-105"
              aria-label="Close simulation"
            >
              &times;
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {designerData.design_grids.length === 0 ? (
              <p className="text-center text-sm md:text-base text-muted-foreground py-10">
                No design grids to simulate.
              </p>
            ) : (
              designerData.design_grids.map((item, i) => {
                const totalPics =
                  typeof item.total_pics === "number" ? item.total_pics : 0;
                const heightInPixels = Math.max(30, totalPics * 6 + 40);

                const backgroundColor =
                  colorBoxes[(item.color_box as number) - 1];

                return (
                  <div
                    key={i}
                    className={cn(
                      "w-full",
                      "flex items-center px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium transition-all duration-300 ease-in-out"
                    )}
                    style={{
                      height: `${heightInPixels}px`,
                      backgroundColor: backgroundColor,
                    }}
                  >
                    <p className="bg-strong/80 px-2 py-0.5 rounded-radius-sm text-xs md:px-3 md:py-1 md:text-sm text-muted">
                      {item.color_box ? `Color Box ${item.color_box}` : "N/A"}
                      {" | "}
                      {totalPics} Pics
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Semulator;
