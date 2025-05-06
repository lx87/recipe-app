import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";
function ContactPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbPlus>
                <BreadcrumbPlus.Item label="Home" path="/" />
                <BreadcrumbPlus.Item label="Contact" />
            </BreadcrumbPlus>
            <h1>ContactPage</h1>
            <h2>Contact Us</h2><br />
            <p>We’d love to hear from you! Whether you have questions, feedback, or partnership inquiries, our team is here to help.</p><br />
            <h3>Get in Touch</h3>
            <p>📧 Email: contact@example.com<br />
                📞 Phone: +1 (123) 456-7890<br />
                📍 Address: 123 Business St, City, Country<br /></p>
        </div>
    );
}

export default ContactPage