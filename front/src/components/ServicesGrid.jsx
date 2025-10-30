import ServiceCard from "./ServiceCard";
import { Row, Col } from "react-bootstrap";

export default function ServicesGrid({ services = [], onRemove }) {
    if (!services || services.length === 0) {
        return <p>Erreur lors du chargement de la grid : la grid est vide</p>;
    }

    return (
        <Row md={2}>
            {services.map((s, index) => (
                <Col md={4} key={index} className="mb-4">
                    <ServiceCard service={s} onRemove={onRemove} />
                </Col>
            ))}
        </Row>
    );
}
