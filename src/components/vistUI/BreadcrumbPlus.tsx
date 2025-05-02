import React, { useState, useRef, useEffect, ReactElement, ReactNode, createContext, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Dropdown, type ButtonProps } from "react-bootstrap";

type StaticRoutes = "/" | "/contact" | "/about";
type DynamicRoutes = `/category/${string}`;
type RoutePath = StaticRoutes | DynamicRoutes;
type Variant = ButtonProps["variant"];

const BreadcrumbVariantContext = createContext<Variant | undefined>(undefined);

type BreadcrumbPlusComponent = typeof BreadcrumbComponent & {
  Item: typeof BreadcrumbItem;
  Truncate: typeof BreadcrumbTruncate;
  Child: typeof BreadcrumbChild;
  Separator: typeof BreadcrumbTruncateSeparator
};

interface BreadcrumbItemProps {
  path?: RoutePath;
  isLast?: boolean;
}

interface BreadcrumbProviderProps {
  children: ReactElement<BreadcrumbItemProps> | ReactElement<BreadcrumbItemProps>[]
  variant?: Variant;
  className?: string
}

type BreadcrumbChildProps = | {
  asText: true;
  path?: never;

  disabled?: boolean;
  variant?: never;
} | {
  asText?: false;
  path: RoutePath;

  disabled?: boolean;
  variant?: Variant;
};


interface BreadcrumbTruncateProps {
  label?: string;
  children: ReactNode;
  useIcon?: boolean;
}


const BreadcrumbComponent = ({ children, variant, className }: BreadcrumbProviderProps) => {
  const total = React.Children.count(children);

  return (
    <BreadcrumbVariantContext.Provider value={variant}>
      <Breadcrumb className={`text-capitalize ${className ?? ""}`}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement<BreadcrumbItemProps>(child)) return null;
          return React.cloneElement(child, {
            isLast: index === total - 1,
          });
        })}
      </Breadcrumb>
    </BreadcrumbVariantContext.Provider>
  );
};

const BreadcrumbItem = ({ path, isLast, children }: React.PropsWithChildren<BreadcrumbItemProps>) => {
  const navigate = useNavigate();
  if (isLast || !path) {
    return (
      <Breadcrumb.Item active style={{ cursor: "default" }}>
        {children}
      </Breadcrumb.Item>
    );
  }

  return (
    <Breadcrumb.Item onClick={() => navigate(path)}>{children}</Breadcrumb.Item>
  );
};

const BreadcrumbChild = ({ children, path, disabled, variant: localVariant, asText }: React.PropsWithChildren<BreadcrumbChildProps>) => {
  const navigate = useNavigate();
  const contextVariant = useContext(BreadcrumbVariantContext);

  const variant = localVariant || contextVariant || "secondary";

  if (asText) {
    return <Dropdown.ItemText className="fw-bold">{children}</Dropdown.ItemText>;
  }

  return (
    <Dropdown.Item
      onClick={() => navigate(path!)}
      className="border-0 text-body w-100 text-start"
      style={{ padding: "4px 12px", transition: "none", borderRadius: "6px" }}
      disabled={disabled}
      as={Button}
      variant={variant}
    >
      {children}
    </Dropdown.Item>
  );
};

const BreadcrumbTruncate = ({ label, children, useIcon }: BreadcrumbTruncateProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className="breadcrumb-item position-relative d-inline-block active"
      ref={ref}
      onClick={() => setShow((prev) => !prev)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {label || <i className="bi bi-three-dots" />}
      {useIcon && <i className="bi bi-chevron-down ms-2" />}
      {show && (
        <Dropdown.Menu
          show
          className="position-absolute d-flex flex-column gap-1"
          style={{ top: "110%", marginTop: "5px", left: 0, zIndex: 1000, padding: "4px" }}
        >
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { key: index })
              : null
          )}
        </Dropdown.Menu>
      )}
    </div>
  );
};

const BreadcrumbTruncateSeparator = () => {
  return (
    <hr style={{ margin: "2px -4px" }} />
  );
}

export const BreadcrumbPlus: BreadcrumbPlusComponent = Object.assign(BreadcrumbComponent, {
  Item: BreadcrumbItem,
  Truncate: BreadcrumbTruncate,
  Child: BreadcrumbChild,
  Separator: BreadcrumbTruncateSeparator,
});