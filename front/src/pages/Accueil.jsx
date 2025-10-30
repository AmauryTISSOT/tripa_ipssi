// src/pages/Accueil.jsx
import React, { useEffect, useState } from "react";
import { Spinner, Container } from "react-bootstrap";
import { ServicesPublicsService } from "../api/services/ServicesPublicsService";
import CarrouselServices from "../components/CarrouselServices";

export default function Accueil() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

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
        </Container>
    );
}
