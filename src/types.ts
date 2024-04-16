import { Card, List} from '@prisma/client';

export type ListWithCatds = List &  { cards: Card[] }

export type CardWthList = Card & { list: List[] }


