import apiClient from "@/lib/apiClient";
import { ActiveDesign } from "@/types/data";
import { DataTablePropsType } from "@/types/props";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useState } from "react";
import CustomContextMeny from "./CustomContextMeny";
import DeleteDesign from "./DeleteDesign";
import { Modal, ModalContent } from "./Modal";
import { useToast } from "./ToastProvider";

const DataTable = ({
  data,
  columns,
  className,
  emptyMessage = "No Data Found",
  setReload,
  loading,
}: DataTablePropsType) => {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [activeDesign, setActiveDesign] = useState<ActiveDesign>();
  const toast = useToast();

  const handelContextMenu = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: ActiveDesign
  ) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuIsOpen(true);
    setActiveDesign({ id: item.id, name: item.name });
  };

  const deleteHandler = async () => {
    if (!activeDesign) {
      toast("Error deleting designer data", "error");
      return;
    }

    const { error } = await apiClient(`designer/designs/${activeDesign.id}`, {
      method: "DELETE",
    });

    if (error) {
      toast("Error deleting designer data", "error");
      return;
    }

    setDeleteModalIsOpen(false);
    setReload((prev) => !prev);
    toast("Designer data deleted successfully", "success");
  };

  return (
    <div className="overflow-x-auto">
      <div
        className={cn(
          "md:w-full w-[45rem] bg-on-surface rounded-radius-lg border border-muted",
          className
        )}
      >
        {/* Table Header */}
        <div className="flex justify-between capitalize tracking-wide py-4 rounded-t-radius-lg font-semibold border-b border-muted bg-primary text-secondary text-sm">
          {columns.map((item, i) => (
            <p
              key={item.header}
              className={cn(
                "line-clamp-1 border-r border-muted px-3 lg:px-6",
                {
                  "border-none": i === columns.length - 1,
                },
                item.className ? item.className : "flex-1"
              )}
            >
              {item.header}
            </p>
          ))}
        </div>

        {/* Table Body */}
        <div className="lg:text-base text-sm text-strong max-h-[30rem] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
              <span className="ml-3 text-primary">Loading...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-4 text-strong">{emptyMessage}</div>
          ) : (
            data.map((item, i) => (
              <Link
                onContextMenu={(e) => handelContextMenu(e, item)}
                href={`/designer/${item.id}`}
                key={i}
                className={cn(
                  "flex justify-between border-b border-muted py-3 hover:bg-secondary rounded-radius-sm duration-50 cursor-pointer",
                  {
                    "border-none": i === data.length - 1,
                  },
                  i % 2 !== 0 ? "bg-surface" : "bg-on-surface"
                )}
              >
                {columns.map((column, colIndex) => {
                  const cellContent = column.render
                    ? column.render(item)
                    : (item[column.key] as React.ReactNode);

                  return (
                    <p
                      key={column.key as string}
                      className={cn(
                        "line-clamp-1 px-3 lg:px-6",
                        {
                          "border-none": colIndex === columns.length - 1,
                        },
                        column.className ? column.className : "flex-1"
                      )}
                    >
                      {cellContent}
                    </p>
                  );
                })}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Context Menu */}
      <CustomContextMeny setIsOpen={setContextMenuIsOpen}>
        <div
          className={cn(
            `fixed z-50 transition-all duration-200 ease-in-out bg-on-surface rounded-md text-sm shadow-lg border border-muted flex flex-col w-[10rem]`,
            contextMenuIsOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          style={{ top: menuPosition.y, left: menuPosition.x }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button className="px-3 py-2 cursor-pointer hover:bg-muted w-full items-start flex justify-between duration-200">
            <Link href={`/designer/edit/${activeDesign?.id}`}>Update</Link>
          </button>
          <div className="border-b border-muted w-full"></div>
          <button
            className="px-3 py-2 cursor-pointer hover:bg-muted w-full items-start flex justify-between duration-200"
            onClick={() => {
              setDeleteModalIsOpen(true);
              setContextMenuIsOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      </CustomContextMeny>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        className="flex items-center justify-center z-50"
      >
        <ModalContent
          className={cn(
            "duration-300 ease-in-out lg:w-[40%] w-[90%]",
            deleteModalIsOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <DeleteDesign
            data={activeDesign}
            deleteHandler={deleteHandler}
            setIsOpen={setDeleteModalIsOpen}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DataTable;
