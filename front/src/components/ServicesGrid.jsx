import ServiceCard from "./ServiceCard";
import { Row, Col } from "react-bootstrap";

export default function ServicesGrid({ services = [], onRemove }) {
    if (!services || services.length === 0) {
        return <p>Erreur lors du chargement de la grid : la grid est vide</p>;
    }

    return (
        <Row xs={1} sm={2} md={3} className="g-4 justify-content-center">
            {services.map((s, index) => (
                <Col key={index} className="d-flex justify-content-center">
                    <ServiceCard service={s} onRemove={onRemove} />
                </Col>
            ))}
        </Row>
    );
}
