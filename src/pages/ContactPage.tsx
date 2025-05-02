import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";
function ContactPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbPlus>
                <BreadcrumbPlus.Item label="Home" path="/" />
                <BreadcrumbPlus.Item label="Contact" />
            </BreadcrumbPlus>
            <h1>ContactPage</h1>
        </div>
    );
}

export default ContactPage