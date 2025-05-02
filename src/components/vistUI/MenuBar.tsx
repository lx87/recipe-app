import React, { ReactElement, useState, useEffect, useRef, useCallback } from "react";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Button, type ButtonProps, Dropdown } from "react-bootstrap";

type Variant = ButtonProps["variant"];

interface MenuBarProps {
  children: ReactElement[] | ReactElement
}

interface MenuBarItemProps {
  label: string
  variant?: Variant
}

interface MenuDropdownProps {
  label: string
  children: ReactElement[] | ReactElement
  variant?: Variant
}

interface MenuDropdownItemProps {
  label: string
  variant?: Variant
  disabled?: boolean
  separated?: boolean
}

const MenuBarComponent = ({ children }: MenuBarProps) => {
  return (
    <ButtonToolbar
      className="gap-1 bg-body rounded-3 border border-light-subtle"
      style={{ padding: "4px" }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<any>(child)) return null;
        return child;
      })}
    </ButtonToolbar>
  );
};

const MenuBarItem = ({ label, variant = "outline-primary" }: MenuBarItemProps) => {
  return (
    <Button
      className="border-0 text-body"
      style={{ padding: "4px 12px 4px 12px" }}
      variant={variant}
    >
      {label}
    </Button>
  );
};

const MenuItemDropdown = ({ label, children, variant = "outline-primary" }: MenuDropdownProps) => {
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
      className="position-relative d-inline-block"
      ref={ref}
      onClick={() => setShow((prev) => !prev)}
    >
      <Button
        className="border-0 text-body"
        style={{ padding: "4px 12px 4px 12px" }}
        variant={variant}>
        {label}
      </Button>
      {show && (
        <Dropdown.Menu
          show
          className="position-absolute p-1"
          style={{ top: "110%", marginTop: "5px", left: 0, zIndex: 1000 }}
        >
          {React.Children.map(children, (child, i) => {
            if (!React.isValidElement(child))
              return null
            return (
              <div key={i} className="v-stack">
                {child}
              </div>
            );
          })}
        </Dropdown.Menu>
      )}
    </div>
  );
};

const MenuDropdownItem = ({ label, variant = "outline-primary", disabled, separated }: MenuDropdownItemProps) => {
  return (
    <Button
      className="border-0 text-body w-100"
      style={{ padding: "4px 12px 4px 12px", textAlign: "start", margin: `${separated ? "5px 0 5px 0" : ""}` }}
      variant={variant}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export const MenuBar = Object.assign(MenuBarComponent, {
  Item: MenuBarItem,
  Dropdown: MenuItemDropdown,
  DropDownItem: MenuDropdownItem
});