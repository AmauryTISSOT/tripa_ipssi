import React, { useEffect, useState } from "react";
import { Spinner, Container } from "react-bootstrap";
import { ServicesPublicsService } from "../api/services/ServicesPublicsService";
import CarrouselServices from "../components/CarrouselServices";
import MapService from "../components/MapService";

export default function Accueil() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const positions = services
        .filter(
            (s) =>
                s.latitude &&
                s.longitude &&
                !isNaN(parseFloat(s.latitude)) &&
                !isNaN(parseFloat(s.longitude))
        )
        .map((s) => ({
            latitude: s.latitude,
            longitude: s.longitude,
            nom: s.nom,
        }));

    useEffect(() => {
        const fetchTopServices = async () => {
            try {
                const data =
                    await ServicesPublicsService.servicesPublicsTopList();
                setServices(data);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des services :",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTopServices();
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Chargement des services...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">
                Services Publics les plus consultés
            </h2>
            <CarrouselServices services={services} />

            {positions.length > 0 && (
                <>
                    <h4 className="text-center mt-5 mb-3">
                        Localisation des services les plus consultés
                    </h4>
                    <div className="d-flex justify-content-center">
                        <MapService positions={positions} />
                    </div>
                </>
            )}
        </Container>
    );
}
