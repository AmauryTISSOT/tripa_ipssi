import { Card, Button, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { CompilationService } from "../api/services/CompilationService";

export default function ServiceCard({ service }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isOnCompilationPage = location.pathname === "/compilation";

    const addToCompilation = async (id) => {
        try {
            await CompilationService.compilationCreate(id);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de l'ajout d'une compilation",
                error
            );
        }
    };

    const removeCompilation = async (id) => {
        try {
            await CompilationService.compilationDeleteDelete(id);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de l'ajout d'une compilation",
                error
            );
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>{service.nom || "Service public"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {service.type || "Type inconnu"}
                </Card.Subtitle>
                <Card.Text>
                    <strong>Adresse :</strong>{" "}
                    {service.adresse || "Non renseignée"} <br />
                    {service.telephone && (
                        <>
                            <strong>📞</strong> {service.telephone} <br />
                        </>
                    )}
                    {service.email && (
                        <>
                            <strong>📧</strong> {service.email} <br />
                        </>
                    )}
                </Card.Text>
                <Row>
                    <Col sm={8}>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigate(`/service/${service.id}`)}
                        >
                            Voir plus
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Button
                            variant={
                                isOnCompilationPage ? "secondary" : "success"
                            }
                            size="sm"
                            disabled={isOnCompilationPage}
                            className="d-flex justify-content-center align-items-center h-100"
                            onClick={() => addToCompilation(service.id)}
                        >
                            <IoMdAdd />
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Button
                            variant="danger"
                            size="sm"
                            className="d-flex justify-content-center align-items-center h-100"
                            onClick={() => removeCompilation(service.id)}
                        >
                            <IoTrashOutline />
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
