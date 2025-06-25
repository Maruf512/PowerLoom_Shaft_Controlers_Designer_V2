import React, { useState } from "react";
import JSONView from "./JSONView";
import { Modal, ModalContent } from "./Modal";
import { cn } from "@/utils/cn";
import { DesignErrorType, DesignType } from "@/types/data";

const DataErrorModal = ({
  hasError,
  designerData,
  designDataError,
}: {
  hasError: boolean;
  designerData: DesignType;
  designDataError: DesignErrorType;
}) => {
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"data" | "error">("data");

  return (
    <div>
      <div
        className="fixed bottom-4 right-4 z-40 border border-muted rounded-full duration-200 bg-on-surface flex  cursor-pointer"
        onClick={() => setDataModalOpen(true)}
      >
        <div
          className="text-xs hover:bg-muted rounded-l-full px-3 flex items-center justify-center"
          onClick={() => setModalView("data")}
        >{`{}`}</div>
        <div className="border-l border-muted w-[1px]"></div>
        <div
          className="relative hover:bg-muted rounded-r-full flex items-center justify-center px-3"
          onClick={() => setModalView("error")}
        >
          !
          <div
            className={cn(
              "w-1 h-1 bg-error rounded-full absolute top-1 right-3  ease-in-out",
              hasError ? "scale-100" : "scale-0"
            )}
          ></div>
        </div>
      </div>
      <Modal
        isOpen={dataModalOpen}
        setIsOpen={setDataModalOpen}
        className="flex items-center justify-center"
      >
        <ModalContent
          className={cn(
            "bg-on-surface p-4 rounded-radius-lg lg:w-[50%] w-[90%] h-[70%] overflow-y-hidden duration-300 ease-in-out",
            dataModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          {modalView === "data" ? (
            <JSONView object={designerData} title="Design Data" />
          ) : (
            <JSONView object={designDataError} title="Design Data Error" />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DataErrorModal;
