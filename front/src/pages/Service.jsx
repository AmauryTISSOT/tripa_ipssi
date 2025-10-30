import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ServicesPublicsService } from "../api/services/ServicesPublicsService";
import ImageService from "../components/ImageService";
import MapService from "../components/MapService";

export default function Service() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await ServicesPublicsService.servicesPublicsRead(
                    id
                );
                enrichirDataWithServiceType(data);
                setService(data);
            } catch (error) {
                console.error("Erreur récupération service :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Chargement du service...</p>
            </Container>
        );
    }

    if (!service) {
        return <p className="text-center text-danger">Service non trouvé</p>;
    }

    function enrichirDataWithServiceType(data) {
        const pivotArray =
            typeof data.pivot === "string"
                ? JSON.parse(data.pivot)
                : data.pivot;
        const typeServiceLocal = pivotArray?.[0]?.type_service_local ?? null;
        data["type"] = typeServiceLocal;
    }

    function parseAdresse(adresseData) {
        if (!adresseData) return "";

        const addrList =
            typeof adresseData === "string"
                ? JSON.parse(adresseData)
                : adresseData;

        if (!Array.isArray(addrList) || addrList.length === 0) return "";

        const addrInfo = addrList[0];
        const numero_voie = addrInfo.numero_voie || "";
        const complement1 = addrInfo.complement1 || "";
        const complement2 = addrInfo.complement2 || "";
        const code_postal = addrInfo.code_postal || "";
        const nom_commune = addrInfo.nom_commune || "";

        const adresse = `${numero_voie} ${complement1} ${complement2}`
            .trim()
            .replace(/\s+/g, " ");
        const ville = `${code_postal} ${nom_commune}`.trim();

        return `${adresse} - ${ville}`;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col
                    md={5}
                    className="d-flex justify-content-center align-items-start"
                >
                    <ImageService service={service} />
                </Col>
                <Col md={1}></Col>
                <Col md={6}>
                    <h2>{service.nom}</h2>
                    <p className="mt-3">
                        <strong>Adresse :</strong>{" "}
                        {parseAdresse(service.adresse) || "N/A"}
                    </p>
                    <p>
                        <strong>Téléphone :</strong>{" "}
                        {service.telephone
                            ? JSON.parse(service.telephone)
                                  .map((t) => t.valeur)
                                  .join(", ")
                            : "N/A"}
                    </p>
                    <p>
                        <strong>Site web :</strong>{" "}
                        {service.site_internet
                            ? JSON.parse(service.site_internet).map(
                                  (s, index) => (
                                      <span key={index}>
                                          <a
                                              href={s.valeur}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                          >
                                              {s.valeur}
                                          </a>
                                          {index <
                                          JSON.parse(service.site_internet)
                                              .length -
                                              1
                                              ? ", "
                                              : ""}
                                      </span>
                                  )
                              )
                            : "N/A"}
                    </p>
                    <p>
                        <strong>Horaires :</strong>{" "}
                        {service.plage_ouverture
                            ? JSON.parse(service.plage_ouverture)
                                  .map(
                                      (p) =>
                                          `${p.nom_jour_debut}: ${p.valeur_heure_debut_1} - ${p.valeur_heure_fin_1}`
                                  )
                                  .join("; ")
                            : "N/A"}
                    </p>
                    {service.information_complementaire && (
                        <p>
                            <strong>Info :</strong>{" "}
                            {service.information_complementaire}
                        </p>
                    )}
                    <p>
                        <a
                            href={service.url_service_public}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Voir sur Service Public
                        </a>
                    </p>
                </Col>
            </Row>
            <Row className="mt-4 d-flex justify-content-center align-items-center align-self-center">
                <MapService
                    latitude={
                        service.latitude ||
                        (service.adresse
                            ? JSON.parse(service.adresse)[0].latitude
                            : null)
                    }
                    longitude={
                        service.longitude ||
                        (service.adresse
                            ? JSON.parse(service.adresse)[0].longitude
                            : null)
                    }
                    nom={service.nom}
                />
            </Row>
        </Container>
    );
}
