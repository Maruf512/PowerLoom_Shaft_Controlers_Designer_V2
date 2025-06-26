// "use client";

// import { selectFieldsKeyType } from "@/types/data";
// import { SelectContextType } from "@/types/props";
// import { cn } from "@/utils/cn";
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { TiArrowSortedDown } from "react-icons/ti";

// const SelectContext = createContext<SelectContextType | null>(null);

// export const Select = ({
//   children,
//   value,
//   setValue,
//   fieldContext,
//   selectHandler,
//   className,
// }: {
//   children: React.ReactNode;
//   value?: string;
//   setValue?: React.Dispatch<React.SetStateAction<string>>;
//   fieldContext?: selectFieldsKeyType;
//   selectHandler?: (key: selectFieldsKeyType, value: string) => void;
//   className?: string;
// }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState<string | React.ReactNode>(
//     value
//   );
//   const selectRef = useRef<HTMLDivElement>(null);

//   const handelSelect = (
//     value: string,
//     key: selectFieldsKeyType,
//     label?: React.ReactNode
//   ) => {
//     setSelectedValue(label);

//     !!setValue && setValue(value);
//     !!selectHandler && selectHandler(key, value);
//     setOpen(false);
//   };

//   useEffect(() => {
//     if (value === "") {
//       setSelectedValue(value);
//     }
//   }, [value]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         selectRef.current &&
//         !selectRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open]);

//   const context: SelectContextType = {
//     open,
//     setOpen,
//     fieldContext,
//     handelSelect,
//     selectedValue,
//     value,
//   };

//   return (
//     <div ref={selectRef} className={cn("relative", className)}>
//       <SelectContext.Provider value={context}>
//         {children}
//       </SelectContext.Provider>
//     </div>
//   );
// };

// export const SelectHeader = ({
//   children,
//   className,
//   placeHolder,
// }: {
//   children?: React.ReactNode;
//   className?: string;
//   placeHolder?: string;
// }) => {
//   const context = useContext(SelectContext);

//   if (!context) {
//     console.error("SelectHeader must be used within a Select component.");
//     return null;
//   }

//   return (
//     <div
//       className={cn(
//         "border border-muted px-3 py-2 rounded-radius-sm cursor-pointer flex items-center justify-between text-sm bg-secondary",
//         className
//       )}
//       onClick={() => context.setOpen((prv) => !prv)}
//     >
//       <span>
//         {!!children
//           ? children
//           : !!context.selectedValue
//           ? context.selectedValue
//           : placeHolder ?? "Select a value"}
//       </span>
//       <span
//         className="ml-2 transform transition-transform duration-200"
//         style={{ transform: context.open ? "rotate(180deg)" : "rotate(0deg)" }}
//       >
//         <TiArrowSortedDown size={20} />
//       </span>
//     </div>
//   );
// };

// export const SelectBody = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   const context = useContext(SelectContext);

//   if (!context) {
//     console.error("SelectBody must be used within a Select component.");
//     return null;
//   }

//   return context.open ? (
//     <div
//       className={cn(
//         "absolute z-10 w-full mt-1 p-1 border border-muted bg-secondary",
//         "max-h-[22rem] overflow-y-auto shadow-lg",
//         className
//       )}
//     >
//       {children}
//     </div>
//   ) : null;
// };

// export const SelectItem = ({
//   children,
//   itemValue,
//   className,
//   itemLabel,
// }: {
//   children: React.ReactNode;
//   itemValue?: string;
//   className?: string;
//   itemLabel?: string;
// }) => {
//   const context = useContext(SelectContext);

//   if (!context) {
//     console.error("SelectItem must be used within a Select component.");
//     return null;
//   }

//   return (
//     <div
//       className={cn(
//         "px-2 py-2 cursor-pointer hover:bg-surface transition-colors duration-100",
//         context.value === itemValue ? "bg-muted" : "",
//         className
//       )}
//       onClick={() => {
//         const valueToSelect =
//           itemValue !== undefined
//             ? itemValue
//             : typeof children === "string"
//             ? children
//             : "";
//         context.handelSelect(valueToSelect, context.fieldContext!, itemLabel);
//       }}
//     >
//       {children}
//     </div>
//   );
// };

"use client";

import { selectFieldsKeyType } from "@/types/data";
import { SelectContextType } from "@/types/props";
import { cn } from "@/utils/cn";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoCheckmark } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

const SelectContext = createContext<SelectContextType | null>(null);

export const Select = ({
  children,
  value,
  setValue,
  fieldContext,
  selectHandler,
  className,
}: {
  children: React.ReactNode;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  fieldContext?: selectFieldsKeyType;
  selectHandler?: (key: selectFieldsKeyType, value: string) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handelSelect = (
    value: string,
    key: selectFieldsKeyType,
    label?: React.ReactNode
  ) => {
    !!setValue && setValue(value);
    !!selectHandler && selectHandler(key, value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const context: SelectContextType = {
    open,
    setOpen,
    fieldContext,
    handelSelect,
    value,
  };

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <SelectContext.Provider value={context}>
        {children}
      </SelectContext.Provider>
    </div>
  );
};

export const SelectHeader = ({
  children,
  className,
  placeHolder,
}: {
  children?: React.ReactNode;
  className?: string;
  placeHolder?: string;
}) => {
  const context = useContext(SelectContext);

  if (!context) {
    console.error("SelectHeader must be used within a Select component.");
    return null;
  }

  return (
    <div
      className={cn(
        "border border-muted px-3 py-2 rounded-radius-sm cursor-pointer flex items-center justify-between text-sm bg-secondary",
        className
      )}
      onClick={() => context.setOpen((prv) => !prv)}
    >
      <span>{!!children ? children : placeHolder ?? "Select a value"}</span>
      <span
        className="ml-2 transform transition-transform duration-200"
        style={{ transform: context.open ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <TiArrowSortedDown size={20} />
      </span>
    </div>
  );
};

export const SelectBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(SelectContext);

  if (!context) {
    console.error("SelectBody must be used within a Select component.");
    return null;
  }

  return (
    <div
      className={cn(
        "absolute z-10 w-full mt-1 px-1 border border-muted bg-on-surface shadow-lg py-1 rounded-radius-sm",
        "overflow-y-auto max-h-[22rem]",
        "transform origin-top transition-all duration-300 ease-in-out",
        context.open
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({
  children,
  itemValue,
  className,
  itemLabel,
}: {
  children: React.ReactNode;
  itemValue?: string;
  className?: string;
  itemLabel?: string;
}) => {
  const context = useContext(SelectContext);

  if (!context) {
    console.error("SelectItem must be used within a Select component.");
    return null;
  }

  return (
    <div
      className={cn(
        "px-3 py-2 cursor-pointer hover:bg-muted transition-colors duration-100 border-b border-muted last:border-0 rounded-radius-sm",
        className
      )}
      onClick={() => {
        const valueToSelect =
          itemValue !== undefined
            ? itemValue
            : typeof children === "string"
            ? children
            : "";
        context.handelSelect(valueToSelect, context.fieldContext!, itemLabel);
      }}
    >
      <div className="flex items-center justify-between">
        {children}
        <span>{context.value === itemValue && <IoCheckmark />}</span>
      </div>
    </div>
  );
};
