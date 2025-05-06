import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";

function ContactPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-start p-5">
            <BreadcrumbPlus>
                <BreadcrumbPlus.Item path="/">Home</BreadcrumbPlus.Item>
                <BreadcrumbPlus.Item>Сontact</BreadcrumbPlus.Item>
            </BreadcrumbPlus>
            <h1 className="display-1 fw-semibold mt-2">Contact Us</h1>
            <h3 className="mt-2">
                We'd love to hear from you! Whether you have questions, feedback, or partnership inquiries, our team is here to help.
            </h3>
            <p className="fs-4 mt-5">
                <span className="fw-medium">Get in Touch:</span> <br />
                📧 Email: contact@example.com<br />
                📞 Phone: +1 (123) 456-7890<br />
                📍 Address: 123 Business St, City, Country
            </p>
        </div>
    );
}

export default ContactPage