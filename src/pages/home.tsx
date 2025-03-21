import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CharacterListResponse, Info } from "../interfaces/characterResponse";
import { Character } from "../interfaces/character";
import Pagination from "../components/pagination";
import { useLoading } from "./../context/LoadingContext";
import { useTranslator } from "../hook/translator";




const Home = () => {
  const { showLoading, hideLoading } = useLoading();
  const { translate } = useTranslator();

  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [responseInfo, setResponseInfo] = useState<Info | null>();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchCharacters("");
  }, []);

  const fetchCharacters = async (setUrl: string) => {
    showLoading();
    try {
      let url = `https://rickandmortyapi.com/api/character`;
      if(search != '') {
        url += `/?name=${search}`

        if(status != '') {
            url += `&status=${status}`
        }
      } else if(status != '') {
        url += `/?status=${status}`
      }

      if(setUrl != "") {
        url = setUrl
      }

      const response = await axios.get<CharacterListResponse>(url);
      setCharacters(response.data.results);
      setResponseInfo(response.data.info);

      let urlPage = ''
      if(response.data.info) {
        if(response.data.info.prev == null && response.data.info.next == null) {
          setCurrentPage(1)
        } else {
          urlPage = response.data.info.prev != null ? response.data.info.prev : response.data.info.next;

        console.log(urlPage)
        //PEGA O NUMERO DA PAGINA ATUAL
        const match = urlPage.match(/page=(\d+)/);
        let page = match ? parseInt(match[1]) : 0;

        page = response.data.info.prev ? page + 1 : page -1
        setCurrentPage(page ? page : 0)

        }
        
      }
    } catch (error) {
      console.error("Erro ao buscar personagens", error);
      setCharacters([]);
      setResponseInfo(null);
    } finally {
      hideLoading();
    }
  };

  return (
    <Container className="my-2">
      <h1>Personagens Rick & Morty</h1>
      
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar por nome"
              value={search}
              size="lg"
              className="mb-3"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select size="lg" className="mb-3" onChange={(e) => setStatus(e.target.value)}>
              <option value="">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Morto</option>
              <option value="unknown">Desconhecido</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="outline-primary" size="lg" className="w-100 mn-2   " onClick={() => fetchCharacters('')}>Buscar</Button>  
          </Col>
        </Row>
      

      
      <Row>
        <Col md={12} className="mb-3">
          <div className="d-flex justify-content-between align-items-end">
            <h5 className="small text-end">{responseInfo?.count} personagens</h5>
            <Pagination 
              prevUrl={responseInfo ? responseInfo.prev : null} 
              nextUrl={responseInfo ? responseInfo.next : null} 
              currentPage={currentPage} 
              onPageChange={(url) => fetchCharacters(url)}
            />
          </div>
        </Col>
        {characters.map((char) => (
          <Col key={char.id} md={6} className="col-12 mb-3">
            <Card className="p-0 custom-card">
              <div className="d-flex">
                <Card.Img variant="top" src={char.image} className="w-50" />
                <Row className="w-100">
                    <Col className="col-12 align-content-around">
                        <Card.Title>{char.name}</Card.Title>
                        <Card.Text className="mb-1">Status: {translate(char.status)}</Card.Text>
                        <Card.Text className="mb-1">{char.episode.length} episódios</Card.Text>
                        <Card.Text className="align-items-start card-text d-flex justify-content-center mb-1">
                          <img src="/images/location.jpg"  width={20}/>
                          {char.location.name}
                        </Card.Text>
                    </Col>
                    
                </Row>
                
              </div>
              <Button variant="primary" className="rounded-0" onClick={() => navigate(`/character-details/${char.id}`)}>+ informações</Button>  
            </Card>
          </Col>
        ))}
        <Col md={12}>
        <div className="float-end">
            <Pagination 
              prevUrl={responseInfo ? responseInfo.prev : null} 
              nextUrl={responseInfo ? responseInfo.next : null} 
              currentPage={currentPage} 
              onPageChange={(url) => fetchCharacters(url)}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
