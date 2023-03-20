import { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
} from "@ionic/react";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [marketplace, setMarketplace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const shoppingItems = data.space.content.filter(
          (item) => item.shoppingItem
        );
        setShoppingItems(shoppingItems);
        setMarketplace(data.space);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!marketplace) {
    return <IonSpinner name="dots"></IonSpinner>;
  }

  return (
    <IonPage>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle color="warning">{marketplace.title_en}</IonCardTitle>
          <IonCardContent>{marketplace.description_en}</IonCardContent>
        </IonCardHeader>

        <IonImg src={marketplace.posterImage.imageUrl} />
      </IonCard>
      <IonGrid>
        <IonRow>
          {shoppingItems.map((item, index) => {
            const price = item.shoppingItem.price.find(
              (price) => price.currencyCode === "SEK"
            );
            return (
              <IonCol size="6" key={item.shoppingItem.id}>
                <IonCard routerLink={`/shopping-item/${item.shoppingItem.id}`}>
                  <IonImg
                    src={item.shoppingItem.promoSpace.posterImage.imageUrl}
                  />
                  <IonItem lines="none">
                    <IonLabel>
                      {price.value} {price.currencyCode}/MONTH
                    </IonLabel>
                  </IonItem>
                  <IonCardContent>
                    <IonCardTitle>{item.shoppingItem.name_en}</IonCardTitle>
                    <IonCardContent>
                      {item.shoppingItem.description_en}
                    </IonCardContent>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default ShoppingList;
