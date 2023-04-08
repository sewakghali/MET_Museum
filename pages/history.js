import React from "react";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
   const router = useRouter();
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
   if(!searchHistory) return null;

   let parsedHistory = [];
   searchHistory.forEach(elem => {
      let params = new URLSearchParams(elem);
      let entries = params.entries();
      parsedHistory.push(Object.fromEntries(entries));
   });

   const historyClicked = (e, index) => {
      e.stopPropagation();
      router.push(`/artwork?${searchHistory[index]}`);
   }
   const removeHistoryClicked = async (e, index) => {
      e.stopPropagation();
      setSearchHistory(await removeFromHistory(searchHistory[index]));
   }


   return (
      <>
         {parsedHistory.length > 0 ?
            <ListGroup>
               {
                  parsedHistory.map((historyItem, index) => (
                     <ListGroup.Item key={index} className="styles.historyListItem" onClick={e=>historyClicked(e, index)}>
                        {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}

                        <Button className="float-end" variant="danger" size="sm"                            onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                     </ListGroup.Item>

                  ))
               }
            </ListGroup>
            :
            <Card>
               <Card.Header>Nothing Here</Card.Header>
               <Card.Body>Try searching for some artwork</Card.Body>
            </Card>
         }
      </>
   )
}