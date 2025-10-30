import Image from "react-bootstrap/Image";

const images = import.meta.glob("../assets/*.{jpg,jpeg}", {
    eager: true,
    import: "default",
});

export default function ImageService({ service = [] }) {
    if (!service || service.length === 0) {
        return <Image src="/assets/placeholder.jpg" />;
    }

    const findImageSrc = () => {
        const key = Object.keys(images).find((path) =>
            path.toLowerCase().includes(service.type.toLowerCase())
        );
        return key ? images[key] : "/assets/placeholder.jpg";
    };

    const altMessage = () => service.type || "Service public";

    return (
        <Image
            src={findImageSrc()}
            alt={altMessage()}
            fluid
            rounded
            style={{ maxWidth: "700px" }}
        />
    );
}
