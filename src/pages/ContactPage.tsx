import BreadcrumbProvider from "../components/BreadcrumbProvider";

function ContactPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbProvider
                items={[
                    { label: "Home", path: "/" },
                    { label: "Contact", path: "/contact" }
                ]}
            />
            <h1>ContactPage</h1>
        </div>
    );
}

export default ContactPage