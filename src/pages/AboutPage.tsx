import BreadcrumbProvider from "../components/BreadcrumbProvider";

function AboutPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbProvider
                items={[
                    { label: "Home", path: "/" },
                    { label: "About" }
                ]}
            />
            <h1>AboutPage</h1>
        </div>
    );
}

export default AboutPage