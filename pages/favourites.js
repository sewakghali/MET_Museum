import React from "react";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

export default function Favourites() {
  const [data] = useAtom(favouritesAtom);
  if(!data) return null;

  return (<>
    <Row className='gy-4'>
      {data.length > 0 ? data.map(item => {
        return (
          <Col lg={3} key={item}><ArtworkCardDetail objectID={item}></ArtworkCardDetail></Col>
        )
      }) :
        <Card>
          <Card.Body>
            <Card.Text>
              <strong> Nothing Here!! </strong><br />
              Try adding some new artwork to the list.
            </Card.Text>
          </Card.Body>
        </Card>
      }
    </Row>
  </>);
}