import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Spinner,
    Alert,
} from "react-bootstrap";
import { DepartementsService } from "../services/DepartementsService"; // adapte le chemin selon ton arborescence

export default function Recherche() {
    const [profil, setProfil] = useState("citoyen");
    const [departement, setDepartement] = useState("75"); // Exemple : Paris
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchServices = async () => {
        setLoading(true);
        setError("");
        try {
            let data;
            if (profil === "citoyen") {
                data =
                    await DepartementsService.departementsServicesPublicsCitoyenList(
                        departement
                    );
            } else if (profil === "professionnel") {
                data =
                    await DepartementsService.departementsServicesPublicsProfessionnelList(
                        departement
                    );
            } else {
                data =
                    await DepartementsService.departementsServicesPublicsAssociationList(
                        departement
                    );
            }
            setServices(data);
        } catch (err) {
            console.error(err);
            setError("Erreur de chargement des services publics.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchServices();
    }, [profil, departement]);
    return (
        <Container className="mt-4">
            <h2>🔍 Recherche de services publics</h2>
            <Form className="my-4">
                <Row className="g-3">
                    <Col md={4}>
                        <Form.Label>Profil</Form.Label>
                        <Form.Select
                            value={profil}
                            onChange={(e) => setProfil(e.target.value)}
                        >
                            <option value="citoyen">Citoyen</option>
                            <option value="professionnel">Professionnel</option>
                            <option value="association">Association</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Label>Département</Form.Label>
                        <Form.Control
                            type="text"
                            value={departement}
                            placeholder="Ex : 75"
                            onChange={(e) => setDepartement(e.target.value)}
                        />
                    </Col>
                    <Col md={4} className="d-flex align-items-end">
                        <Button
                            variant="primary"
                            onClick={fetchServices}
                            disabled={loading}
                        >
                            {loading ? "Chargement..." : "Rechercher"}
                        </Button>
                    </Col>
                </Row>
            </Form>
            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {services.map((s, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {s.nom || "Service public"}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {s.type || "Type inconnu"}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Adresse :</strong>{" "}
                                    {s.adresse || "Non renseignée"} <br />
                                    {s.telephone && (
                                        <>
                                            <strong>📞</strong> {s.telephone}{" "}
                                            <br />
                                        </>
                                    )}
                                    {s.email && (
                                        <>
                                            <strong>📧</strong> {s.email} <br />
                                        </>
                                    )}
                                </Card.Text>
                                <Button variant="outline-primary" size="sm">
                                    Voir plus
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {!loading && services.length === 0 && (
                <p className="text-center text-muted mt-4">
                    Aucun service trouvé pour ce profil / département.
                </p>
            )}
        </Container>
    );
}
