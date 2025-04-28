import Breadcrumb from "react-bootstrap/Breadcrumb";

interface BreadcrumbProviderProps {
  active:string;
  prev:string;
  start:string;
}

function BreadcrumbProvider({ active, prev, start }:BreadcrumbProviderProps) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#/">{start}</Breadcrumb.Item>
      {prev && <Breadcrumb.Item>{prev}</Breadcrumb.Item>}
      <Breadcrumb.Item active>{active}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbProvider;
