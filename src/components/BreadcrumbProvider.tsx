import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";

type StaticRoutes = "/" | "contact" | "about";
type DynamicRoutes = `/category/${string}`;
type RoutePath = StaticRoutes | DynamicRoutes;

interface BreadcrumbItem {
  label: string;
  path?: RoutePath;
}

interface BreadcrumbProviderProps {
  items: BreadcrumbItem[];
}

const BreadcrumbProvider = ({ items }: BreadcrumbProviderProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: RoutePath): void => {
    navigate(path);
  };

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    if (isLast || !item.path) {
      return (
        <Breadcrumb.Item key={item.path || index} active>
          {item.label}
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item key={item.path || index} onClick={() => void handleNavigate(item.path as RoutePath)}>
        {item.label}
      </Breadcrumb.Item>
    );
  }

  return (
    <Breadcrumb className="text-capitalize">
      {items.map((item, index, arr) => renderItem(item, index, index === arr.length - 1))}
    </Breadcrumb>
  );
}

export default BreadcrumbProvider;