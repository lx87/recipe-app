import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";
import { MenuBar } from "../components/vistUI/MenuBar";

function AboutPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <BreadcrumbPlus variant="outline-primary">
                <BreadcrumbPlus.Item path="/">Home</BreadcrumbPlus.Item>
                <BreadcrumbPlus.Truncate>
                    <BreadcrumbPlus.Child asText>Header</BreadcrumbPlus.Child>
                    <BreadcrumbPlus.Separator />
                    <BreadcrumbPlus.Child path="/">link 1</BreadcrumbPlus.Child>
                    <BreadcrumbPlus.Separator />
                    <BreadcrumbPlus.Child path="/">default separated</BreadcrumbPlus.Child>
                    <BreadcrumbPlus.Separator />
                    <BreadcrumbPlus.Child asText>Plain text</BreadcrumbPlus.Child>
                    <BreadcrumbPlus.Child path="/">link 1</BreadcrumbPlus.Child>
                </BreadcrumbPlus.Truncate>
                <BreadcrumbPlus.Item path="/">About</BreadcrumbPlus.Item>
                <BreadcrumbPlus.Item path="/">About</BreadcrumbPlus.Item>
            </BreadcrumbPlus>
            <h1>AboutPage</h1>
            <MenuBar>
                <MenuBar.Trigger>File</MenuBar.Trigger>
                <MenuBar.Trigger>Edit</MenuBar.Trigger>
                <MenuBar.Dropdown label="View">
                    <MenuBar.Dropdown.Trigger>Edit</MenuBar.Dropdown.Trigger>
                    <MenuBar.Dropdown.Separator />
                    <MenuBar.Dropdown.Trigger>Separated</MenuBar.Dropdown.Trigger>
                    <MenuBar.Dropdown.Separator />
                    <MenuBar.Dropdown.Trigger disabled>Disabled</MenuBar.Dropdown.Trigger>
                    <MenuBar.Dropdown.Trigger shortcut="⌘Z">Undo</MenuBar.Dropdown.Trigger>
                </MenuBar.Dropdown>
                <MenuBar.Trigger>Profiles</MenuBar.Trigger>
            </MenuBar>
        </div>
    );
}

export default AboutPage;
