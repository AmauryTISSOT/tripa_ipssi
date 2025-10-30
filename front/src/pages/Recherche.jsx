import { useEffect, useState, useCallback } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Alert,
} from "react-bootstrap";
import { DepartementsService } from "../api/services/DepartementsService";
import ServicesGrid from "../components/ServicesGrid";

export default function Recherche() {
    const [profil, setProfil] = useState("citoyen");
    const [departement, setDepartement] = useState("75"); // Exemple : Paris
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchServices = useCallback(async () => {
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
    }, [profil, departement]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

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
            <ServicesGrid services={services} />
            {!loading && services.length === 0 && (
                <p className="text-center text-muted mt-4">
                    Aucun service trouvé pour ce profil / département.
                </p>
            )}
        </Container>
    );
}
