import { Row, Col, Typography, Alert } from "antd";

const { Title } = Typography;

const HATP = "https://www.hatvp.fr/consulter-les-declarations/";
const HATVP_PARSER_URL = "https://github.com/exploreopendatafr/hatvp_declarations_parser";

export const Home = () => {
    return (
        <Row justify={"center"}>
            <Col span={24}>
                <Title level={3}>HATPV: affichage centralisé des déclarations</Title>
                <p>
                    Les données proviennent de la{" "}
                    <a href={HATP}>haute-autorité pour la transparence de la vie publique</a> et sont converties par{" "}
                    <a href={HATVP_PARSER_URL}>hatvp_declarations_parser</a>
                    <br />
                    Le but est de regrouper les données de chaque déclaration pour pouvoir les consulter en un seul
                    endroit.
                </p>
                <p>
                    Vous trouverez les onglets suivants
                    <ul>
                        <li>Salaires: les salaires des 5 dernières années des déclarants</li>
                        <li>Participations: les partitipactions financières des déclarants</li>
                    </ul>
                    A venir:
                    <ul>
                        <li>Patrimoine</li>
                    </ul>
                </p>

                <p>Les projets de parsing des données et de cette interface sont open-source.</p>
            </Col>
        </Row>
    );
};
