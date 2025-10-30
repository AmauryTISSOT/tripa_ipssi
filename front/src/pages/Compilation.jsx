import { useEffect, useState } from "react";
import { Spinner, Container } from "react-bootstrap";
import { CompilationService } from "../api/services/CompilationService";
import ServicesGrid from "../components/ServicesGrid";

export default function Compilation() {
    const [compilationData, setCompilationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompilation = async () => {
            try {
                const data = await CompilationService.compilationList();
                console.log("data:", data);
                setCompilationData(data);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des compilations",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        fetchCompilation();
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Chargement des compilations...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <ServicesGrid services={compilationData} />
        </Container>
    );
}
