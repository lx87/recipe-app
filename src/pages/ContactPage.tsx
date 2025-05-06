import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";
function ContactPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbPlus>
                <BreadcrumbPlus.Item path="/">Home</BreadcrumbPlus.Item>
                <BreadcrumbPlus.Item path="/contact">Contact</BreadcrumbPlus.Item>
            </BreadcrumbPlus>
            <h1>ContactPage</h1>
        </div>
    );
}

export default ContactPage