import { Carousel } from "react-bootstrap";

export default function CarrouselServices({ services = [] }) {
    if (!services || services.length === 0) {
        return (
            <p className="text-center text-muted">
                Aucun service public disponible pour le moment.
            </p>
        );
    }

    return (
        <Carousel>
            {services.map((service) => (
                <Carousel.Item key={service.id}>
                    {/* TODO: Image temporaire*/}
                    <div
                        style={{
                            height: "300px",
                            backgroundColor: "#e9ecef",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h5 className="text-muted">Image à venir</h5>
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
    );
}
