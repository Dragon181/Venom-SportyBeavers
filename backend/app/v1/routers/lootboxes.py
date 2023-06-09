from typing import List
from uuid import UUID

from fastapi import Depends, HTTPException, APIRouter
from fastapi.openapi.models import Response
from sqlalchemy.orm import Session

from app.core.database import engine
from app.core.models import model
from app.core.schemas.schema import LootboxResponse, CreateLootbox
from app.v1 import crud
from app.v1.routers import deps

model.Base.metadata.create_all(bind=engine)
router = APIRouter()


@router.get("/lootbox/all")
def get_all_lootboxes(
        db_session: Session = Depends(deps.get_db)
) -> List[LootboxResponse]:
    lootboxes = crud.get_closed_lootboxes(db_session=db_session)
    lootboxes_list = [
        LootboxResponse(
            lootbox_id=lootbox.lootbox_id,
            cost=lootbox.cost,
            nft_chance=lootbox.nft_chance,
            beaver_image_src=lootbox.beaver_image_src,
            owner_user_id=lootbox.owner_user_id,
            is_open=lootbox.is_open,
            is_nft=lootbox.is_nft,
            beav_count=lootbox.beav_count,
            beaver_rarity=lootbox.beaver_rarity,
        )
        for lootbox in lootboxes
    ]
    return lootboxes_list


@router.get(
    "/lootbox/{lootbox_id}",
    response_model=LootboxResponse,
)
def get_lootbox_by_id(
        lootbox_id: UUID,
        db_session: Session = Depends(deps.get_db)
):
    lootbox = crud.read_lootbox_by_id(
        db_session=db_session, lootbox_id=lootbox_id
    )
    if lootbox is None:
        raise HTTPException(status_code=404, detail="Lootbox not found")
    return lootbox


@router.post("/lootbox/create")
def create_lootbox(
    request_body: CreateLootbox,
    db_session: Session = Depends(deps.get_db)
) -> LootboxResponse:
    lootbox = crud.create_lootbox(
        db_session=db_session, request_lootbox=request_body.dict()
    )

    return lootbox


@router.put(
    "/lootbox/open",
)
def open_lootbox(
        lootbox_id: UUID,
        user_id: UUID,
        db_session: Session = Depends(deps.get_db)
):
    lootbox = crud.open_lootbox(lootbox_id=lootbox_id, user_id=user_id, db_session=db_session)

    return lootbox.is_nft
