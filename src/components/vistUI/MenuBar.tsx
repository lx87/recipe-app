import React, { ReactElement, useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Button, type ButtonProps, Dropdown } from "react-bootstrap";

type Variant = ButtonProps["variant"];
type ShortcutSymbol = "⌘" | "⇧";

type Shortcut = `${ShortcutSymbol}${string}`;


const MenuBarVariantContext = createContext<Variant | undefined>(undefined);

interface MenuBarProps {
  children: ReactElement<MenuBarItemProps>[] | ReactElement;
  variant?: Variant;
}

interface MenuBarItemProps {
  label: string;
}

interface MenuBarDropdownProps {
  label: string;
  children: ReactElement<MenuBarDropdownTriggerProps>[] | ReactElement;
}

interface MenuBarDropdownTriggerProps {
  label: string;
  disabled?: boolean;
  shortcut?: Shortcut
}

const MenuBarComponent = ({ children, variant = "outline-primary" }: MenuBarProps) => {
  return (
    <MenuBarVariantContext.Provider value={variant}>
      <ButtonToolbar
        className="gap-1 bg-body rounded-3 border border-light-subtle"
        style={{ padding: "4px" }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? child : null
        )}
      </ButtonToolbar>
    </MenuBarVariantContext.Provider>
  );
};

const MenuBarItemComponent = ({ label }: MenuBarItemProps) => {
  const variant = useContext(MenuBarVariantContext);
  return (
    <Button
      className="border-0 text-body"
      style={{ padding: "4px 12px", transition: "none" }}
      variant={variant}
    >
      {label}
    </Button>
  );
};

const MenuBarDropdownComponent = ({ label, children }: MenuBarDropdownProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const variant = useContext(MenuBarVariantContext);

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
        style={{ padding: "4px 12px", transition: "none" }}
        variant={variant}
      >
        {label}
      </Button>

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

const MenuBarDropdownTrigger = ({ label, disabled, shortcut }: MenuBarDropdownTriggerProps) => {
  const variant = useContext(MenuBarVariantContext);
  return (
    <Button
      className="border-0 text-body w-100 d-flex justify-content-between"
      style={{ padding: "4px 12px", textAlign: "start", transition: "none" }}
      variant={variant}
      disabled={disabled}
    >
      <span>{label}</span>
      <span className="text-muted">{shortcut}</span>
    </Button>
  );
};

const MenuBarDropdownSeparator = () => {
  return (
    <hr style={{ margin: "2px -4px" }} />
  );
}

const MenuBarDropdown = Object.assign(MenuBarDropdownComponent, {
  Trigger: MenuBarDropdownTrigger,
  Separator: MenuBarDropdownSeparator,
});

export const MenuBar = Object.assign(MenuBarComponent, {
  Trigger: MenuBarItemComponent,
  Dropdown: MenuBarDropdown,
});