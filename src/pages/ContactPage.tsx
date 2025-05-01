import { BreadcrumbPlus } from "../components/BreadcrumbProvider";
function ContactPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbPlus.Provider>
                <BreadcrumbPlus.Item label="Home" path="/" />
                <BreadcrumbPlus.Item label="Contact" />
            </BreadcrumbPlus.Provider>
            <h1>ContactPage</h1>
        </div>
    );
}

export default ContactPage