import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router";

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

function BreadcrumbProvider({ items }: BreadcrumbProviderProps) {
  const navigate = useNavigate();

  const handleNavigate = async (path: string): Promise<void> => {
    const normalizedPath = path.toLowerCase();
    navigate(normalizedPath);
  };
  
  return (
    <Breadcrumb className="text-capitalize">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        if (isLast || !item.path) {
          return (
            <Breadcrumb.Item key={index} active>
              {item.label}
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item key={index} onClick={() => void handleNavigate(item.path!)}>
              {item.label}
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbProvider;