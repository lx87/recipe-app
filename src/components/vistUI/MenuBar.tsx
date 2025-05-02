import React, { ReactElement } from "react";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Button, type ButtonProps } from "react-bootstrap";

type Variant = ButtonProps["variant"];

interface MenuBarProps {
  children: ReactElement[];
}

interface MenuBarItemProps {
  label: string
  variant?: Variant
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
      variant={variant}>
      {label}
    </Button>
  );
};

export const MenuBar = Object.assign(MenuBarComponent, {
  Item: MenuBarItem
});