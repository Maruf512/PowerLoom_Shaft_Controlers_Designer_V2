import React, { useState } from "react";
import Button from "./Button";
import { DesignErrorType, DesignType } from "@/types/data";
import { designDataValidator } from "@/utils/validators";
import { useToast } from "./ToastProvider";
import { Modal, ModalContent } from "./Modal";
import { cn } from "@/utils/cn";
import { GoDownload } from "react-icons/go";
import { generateOutput } from "@/utils/generateOutput";

const ExportTxt = ({
  designerData,
  setDesignDataError,
  setHasError,
}: {
  designerData: DesignType;
  setDesignDataError: React.Dispatch<React.SetStateAction<DesignErrorType>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [downloadText, setDownloadText] = useState("");
  const toast = useToast();

  const handelGenerate = () => {
    const isValid = designDataValidator(designerData, setDesignDataError);

    setHasError(isValid);

    if (isValid) {
      toast("Can't generate with empty fields", "error");
      return;
    }

    setDesignName(designerData.name);
    setIsOpen(true);

    const output = generateOutput(designerData);

    if (!output) {
      toast("Error generating output", "error");
      return;
    }

    setDownloadText(output);
  };

  const handelDoanload = () => {
    const blob = new Blob([downloadText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${designName}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button className="w-full h-full" onClick={handelGenerate}>
        Export
      </Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="flex items-center justify-center"
      >
        <ModalContent className="lg:w-[40rem] w-[90%]">
          <div
            className={cn(
              "bg-on-surface w-full h-full rounded-radius-lg duration-300 lg:p-6 p-3 flex flex-col lg:flex-row gap-3",
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          >
            <div className="lg:w-[70%] space-y-3">
              <div className="flex flex-col">
                <label className="m-1 text-xs text-basec font-medium">
                  File Name
                </label>
                <input
                  type="text"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="border border-muted h-full px-3 text-sm rounded-radius-sm py-1  w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="m-1 text-xs text-basec font-medium">
                  File Content
                </label>
                <div className="h-[18rem] border border-muted rounded-radius-sm overflow-y-auto p-3 text-sm break-words">
                  {downloadText}
                </div>
              </div>
            </div>
            <div className="lg:border-r border-b border-muted lg:full"></div>
            <Button
              className="lg:w-[30%] space-x-2 text-xs"
              onClick={handelDoanload}
            >
              <GoDownload size={16} /> <span>Download</span>
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExportTxt;
