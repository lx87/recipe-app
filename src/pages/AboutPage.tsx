import { BreadcrumbPlus } from "../components/BreadcrumbProvider";

function AboutPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbPlus.Provider variant="link">
                <BreadcrumbPlus.Item label="Home" path="/" />
                <BreadcrumbPlus.Truncate useIcon>
                    <BreadcrumbPlus.Child label="Header" asText separated/>
                    <BreadcrumbPlus.Child label="link 1" path="/" />
                    <BreadcrumbPlus.Child label="default separated" path="/" separated />
                    <BreadcrumbPlus.Child label="Plain text" path="/" asText/>
                    <BreadcrumbPlus.Child label="link 2" path="/" />
                    <BreadcrumbPlus.Child label="Footer" asText separated />
                </BreadcrumbPlus.Truncate>
                <BreadcrumbPlus.Item label="About" />
                <BreadcrumbPlus.Item label="..." />
                <BreadcrumbPlus.Item label="About" />
            </BreadcrumbPlus.Provider>
            <h1>AboutPage</h1>
        </div>
    );
}

export default AboutPage