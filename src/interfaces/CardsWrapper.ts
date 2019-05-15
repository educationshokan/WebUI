import CardData from "./CardData";

export default interface CardsWrapper {
    retrieveCardData(id: string): Promise<CardData> ;
}