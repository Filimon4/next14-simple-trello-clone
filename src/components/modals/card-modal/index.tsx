"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@main/hooks/use-card-modal";
import { CardWthList } from "@/types";
import { fetcher } from "@/lib/fetcher";

import { Header } from "./header";
import { Card, List } from "@prisma/client";
import { Description } from "./description";
import { Actions } from "./actions";

export const CardModal = () => {
  const {id, isOpen, onClose } = useCardModal((state) => state);

  const { data: cardData } = useQuery<Card & {list: List}>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData
          ? <Header.Skeleton />
          : <Header data={cardData} />
        }
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData
                ? <Description.Skeleton />
                : <Description data={cardData} />
              }
            </div>
          </div>
          {!cardData
            ? <Actions.Skeleton />
            : <Actions data={cardData} />
          }
        </div>
      </DialogContent>
    </Dialog>
  );
};


