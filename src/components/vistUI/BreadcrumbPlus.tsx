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
};

interface BreadcrumbItemProps {
  label: string;
  path?: RoutePath;
  isLast?: boolean;
}

interface BreadcrumbProviderProps {
  children: ReactElement<BreadcrumbItemProps>[];
  variant?: Variant;
}

type BreadcrumbChildProps = | {
  label: string;
  asText: true;
  separated?: boolean;
  disabled?: boolean;
  variant?: never;
  path?: never;
} | {
  label: string;
  path: RoutePath;
  asText?: false;
  separated?: boolean;
  disabled?: boolean;
  variant?: Variant;
};


interface BreadcrumbTruncateProps {
  label?: string;
  children: ReactNode;
  useIcon?: boolean;
}


const BreadcrumbComponent = ({ children, variant }: BreadcrumbProviderProps) => {
  const total = React.Children.count(children);

  return (
    <BreadcrumbVariantContext.Provider value={variant}>
      <Breadcrumb className="text-capitalize">
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

const BreadcrumbItem = ({ label, path, isLast }: BreadcrumbItemProps) => {
  const navigate = useNavigate();

  if (label === "..." || !label) {
    return (
      <Breadcrumb.Item active style={{ cursor: "default" }}>
        <i className="bi bi-three-dots" />
      </Breadcrumb.Item>
    );
  }

  if (isLast || !path) {
    return (
      <Breadcrumb.Item active style={{ cursor: "default" }}>
        {label}
      </Breadcrumb.Item>
    );
  }

  return (
    <Breadcrumb.Item onClick={() => navigate(path)}>{label}</Breadcrumb.Item>
  );
};

const BreadcrumbChild = ({ label, path, separated, disabled, variant: localVariant, asText }: BreadcrumbChildProps) => {
  const navigate = useNavigate();
  const contextVariant = useContext(BreadcrumbVariantContext);

  const variant = localVariant || contextVariant || "secondary";

  if (asText) {
    return <Dropdown.ItemText className="fw-bold">{label}</Dropdown.ItemText>;
  }

  return (
    <Dropdown.Item
      onClick={() => navigate(path!)}
      style={{ transition: "none", textTransform: "capitalize" }}
      disabled={disabled}
      data-separated={separated || undefined}
      as={Button}
      variant={variant}
    >
      {label}
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
          className="position-absolute"
          style={{ top: "100%", left: 0, zIndex: 1000 }}
        >
          {React.Children.map(children, (child, i) => {
            if (!React.isValidElement<{ separated?: boolean }>(child))
              return null;
            const separated = child.props.separated;
            const total = React.Children.count(children);
            const isLast = i === total - 1;

            return (
              <React.Fragment key={i}>
                {separated && i !== 0 && <Dropdown.Divider />}
                {child}
                {separated && !isLast && <Dropdown.Divider />}
              </React.Fragment>
            );
          })}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export const BreadcrumbPlus: BreadcrumbPlusComponent = Object.assign(BreadcrumbComponent, {
  Item: BreadcrumbItem,
  Truncate: BreadcrumbTruncate,
  Child: BreadcrumbChild,
});