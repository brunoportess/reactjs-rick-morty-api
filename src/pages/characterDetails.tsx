import { Container, Row, Col, CardBody, Card, Button, CardHeader, Form } from "react-bootstrap";
import { Character } from "../interfaces/character";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "./../context/LoadingContext";
import { useTranslator } from "../hook/translator";
import { useNavigate, useParams } from "react-router-dom";


const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { showLoading, hideLoading } = useLoading();
  const { translate } = useTranslator();
  const [character, setCharacter] = useState<Character | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    showLoading();
    try {
      let url = `https://rickandmortyapi.com/api/character/${id}`;
      
      const response = await axios.get<Character>(url);
      setCharacter(response.data);

      
    } catch (error) {
      console.error("Erro ao buscar personagens", error);
      setCharacter(null);
    } finally {
      hideLoading();
    }
  };

  return (
    <Container className="mt-4">
        <Card className="p-0">
          <CardHeader>
            <h2>
              {character?.name}
            </h2>
          </CardHeader>
          <CardBody className="p-0">
              {character != null ? (
                <Row>
                  <Col  md={12} className="col-12 mb-3">
                    <Card.Img variant="top" src={character.image} className="w-50" />
                    <Row className="w-100">
                      <Col md={6} className="col-12 align-content-around">
                        <Form.Group className="mb-3" >
                          <Form.Label className="fw-bolder m-0">Gênero</Form.Label>
                          <p>{translate(character.gender)}</p>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="col-12 align-content-around">
                        <Form.Group className="mb-3" >
                          <Form.Label className="fw-bolder m-0">Status</Form.Label>
                          <p>{translate(character.status)}</p>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="col-12 align-content-around">
                        <Form.Group className="mb-3" >
                          <Form.Label className="fw-bolder m-0">Qtde episódios</Form.Label>
                          <p>{character.episode.length} episódios</p>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="col-12 align-content-around">
                        <Form.Group className="mb-3" >
                          <Form.Label className="fw-bolder m-0">
                            <img src="/images/location.jpg"  width={20}/>
                            Localizaçao
                          </Form.Label>
                          <p>{character.location.name}</p>
                        </Form.Group>
                      </Col>
                    </Row> 
                  </Col>
                </Row>
             ) : (
              <Row>
                <Col md={12}>
                  <p>
                    Nenhum dado a ser exibido
                  </p>
                </Col>
              </Row>
             )}
          </CardBody>
        </Card>
        <div className="float-end mt-2">
          <Button variant="outline-primary" className="" onClick={() => navigate('/')}>Voltar</Button>  
        </div>
      
    </Container>
  );
};

export default CharacterDetails;
