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
import { DepartementsService } from "../api/services/DepartementsService";
import { DepartementService } from "../api/services/DepartementService";

export default function Recherche() {
    const [profil, setProfil] = useState("citoyen");
    const [departement, setDepartement] = useState("");
    const [commune, setCommune] = useState("");
    const [typeAdmin, setTypeAdmin] = useState("");
    const [rayon, setRayon] = useState(10);
    const [pmr, setPmr] = useState(false);
    const [enLigne, setEnLigne] = useState(false);
    const [horaires, setHoraires] = useState("");   
    const [departements, setDepartements] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /** 🔹 Charger la liste des départements */
    const fetchDepartements = async () => {
        try {
            const data = await DepartementService.departementList();
            setDepartements(data);
            if (data.length > 0) setDepartement(data[0].id);
        } catch (err) {
            console.error(err);
        }
    };

    /** 🔹 Charger les services publics selon les filtres */
    const fetchServices = async () => {
        setLoading(true);
        setError("");

        try {
            let data;
            if (profil === "citoyen") {
                data = await DepartementsService.departementsServicesPublicsCitoyenList(departement);
            } else if (profil === "professionnel") {
                data = await DepartementsService.departementsServicesPublicsProfessionnelList(departement);
            } else {
                data = await DepartementsService.departementsServicesPublicsAssociationList(departement);
            }

            // 🔸 Filtrage local simulé selon les critères
            const filtered = data.filter((s) => {
                const matchType = typeAdmin ? s.type?.toLowerCase().includes(typeAdmin.toLowerCase()) : true;
                const matchCommune = commune ? s.commune?.toLowerCase().includes(commune.toLowerCase()) : true;
                const matchPmr = pmr ? s.accessibilite_pmr === true : true;
                const matchEnLigne = enLigne ? s.en_ligne === true : true;


                return matchType && matchCommune && matchPmr && matchEnLigne;
            });

            setServices(filtered);
        } catch (err) {
            console.error(err);
            setError("Erreur de chargement des services publics.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartements();
    }, []);

    return (
        <Container className="mt-4">
            <h2>🔍 Recherche de services publics</h2>

            {/* === FORMULAIRE DE FILTRES === */}
            <Form className="my-4">
                <Row className="g-3">
                    <Col md={3}>
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

                    <Col md={3}>
                        <Form.Label>Type d’administration</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex : mairie, préfecture..."
                            value={typeAdmin}
                            onChange={(e) => setTypeAdmin(e.target.value)}
                        />
                    </Col>

                    <Col md={3}>
                        <Form.Label>Département</Form.Label>
                        <Form.Select
                            value={departement}
                            onChange={(e) => setDepartement(e.target.value)}
                        >
                            {departements.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nom}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col md={3}>
                        <Form.Label>Commune</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nom de la commune"
                            value={commune}
                            onChange={(e) => setCommune(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row className="g-3 mt-3">
                    <Col md={2}>
                        <Form.Label>Rayon (km)</Form.Label>
                        <Form.Control
                            type="number"
                            value={rayon}
                            onChange={(e) => setRayon(Number(e.target.value))}
                        />
                    </Col>


                    <Col md={3} className="d-flex align-items-center">
                        <Form.Check
                            type="checkbox"
                            label="Accessibilité PMR"
                            checked={pmr}
                            onChange={(e) => setPmr(e.target.checked)}
                        />
                    </Col>

                    <Col md={3} className="d-flex align-items-center">
                        <Form.Check
                            type="checkbox"
                            label="Service en ligne disponible"
                            checked={enLigne}
                            onChange={(e) => setEnLigne(e.target.checked)}
                        />
                    </Col>

                    <Col md={1} className="d-flex align-items-end">
                        <Button
                            variant="primary"
                            onClick={fetchServices}
                            disabled={loading}
                        >
                            {loading ? "..." : "Rechercher"}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* === ÉTAT DE CHARGEMENT / ERREUR === */}
            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {/* === LISTE DES SERVICES === */}
            <Row>
                {services.map((s, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{s.nom || "Service public"}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {s.type || "Type inconnu"}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Adresse :</strong> {s.adresse || "Non renseignée"} <br />
                                    {s.telephone && (
                                        <>
                                            📞 {s.telephone} <br />
                                        </>
                                    )}
                                    {s.email && (
                                        <>
                                            📧 {s.email} <br />
                                        </>
                                    )}
                                    {s.site_web && (
                                        <>
                                            🌐{" "}
                                            <a href={s.site_web} target="_blank" rel="noreferrer">
                                                Site web
                                            </a>
                                            <br />
                                        </>
                                    )}
                                    {s.accessibilite_pmr && (
                                        <span className="badge bg-success mt-2">
                                            ♿ Accessible PMR
                                        </span>
                                    )}
                                    {s.en_ligne && (
                                        <span className="badge bg-info text-dark ms-2 mt-2">
                                            🌐 Service en ligne
                                        </span>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!loading && services.length === 0 && (
                <p className="text-center text-muted mt-4">
                    Aucun service trouvé pour ces critères.
                </p>
            )}
        </Container>
    );
}
