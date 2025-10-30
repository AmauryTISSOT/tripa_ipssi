import { Carousel } from "react-bootstrap";
import ImageService from "./ImageService";
import { useNavigate } from "react-router";

export default function CarrouselServices({ services = [] }) {
    const navigate = useNavigate();

    if (!services || services.length === 0) {
        return (
            <p className="text-center text-muted">
                Aucun service public disponible pour le moment.
            </p>
        );
    }

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "0 auto",
                borderRadius: "20px",
            }}
        >
            <Carousel>
                {services.map((service) => (
                    <Carousel.Item
                        key={service.id}
                        onClick={() => navigate(`/service/${service.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div
                            style={{
                                height: "300px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ImageService service={service} />
                        </div>

                        <Carousel.Caption
                            style={{
                                backgroundColor: "rgba(0,0,0,0.5)",
                                borderRadius: "8px",
                                padding: "10px",
                            }}
                        >
                            <h5>{service.nom}</h5>
                            <p className="mb-1">
                                <strong>Adresse :</strong> {service.adresse}
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
