from uuid import UUID

import cv2
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import engine
from app.core.models import model
from app.core.schemas.schema import CreateBeaver, ResponseBeaver
from app.utils.main_utils import collect_beaver
from app.v1 import crud
from app.v1.routers import deps

model.Base.metadata.create_all(bind=engine)

router = APIRouter()


@router.post("/beaver/create")
def create_beaver(
    request_body: CreateBeaver,
    db_session: Session = Depends(deps.get_db),
) -> ResponseBeaver:
    new_beaver = crud.create_beaver(
        db_session=db_session, request_beaver=request_body.dict()
    )

    object_key_name = f"user_beavers/beaver_{new_beaver.beaver_id}.png"
    base_path = "/app/public"
    shadow_png_path = f"{base_path}/images/layers/Shadow.png"
    beaver_files = [
        cv2.imread(shadow_png_path, cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.lowerPaws[1:], cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.tail[1:], cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.body[1:], cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.upperPaws[1:], cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.head[1:], cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.eyes[1:], cv2.IMREAD_UNCHANGED),
        cv2.imread(base_path + request_body.config.mouth[1:], cv2.IMREAD_UNCHANGED),
    ]

    if new_beaver:
        collect_beaver(
            lst=beaver_files,
            bucket="sportybeavers-venom",
            object_name=object_key_name,
        )
    return new_beaver


@router.get(
    "/beaver/{beaver_id}",
    response_model=ResponseBeaver,
)
def read_particular_beaver_by_beaver_id(
    beaver_id: UUID,
    db_session: Session = Depends(deps.get_db),
):
    beaver = crud.read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    if beaver is None:
        raise HTTPException(status_code=404, detail="Beaver not found")
    return beaver


@router.get(
    "/beaver/{beaver_id}/level-up",
    response_model=ResponseBeaver,
)
def level_up_particular_beaver(
    beaver_id: UUID,
    db_session: Session = Depends(deps.get_db),
):
    beaver = crud.read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    if beaver is None:
        raise HTTPException(status_code=404, detail="Beaver not found")
    updated_beaver = crud.up_level_of_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    return updated_beaver


@router.put(
    "/beaver/{beaver_id}/make-nft",
    response_model=ResponseBeaver,
)
def make_beaver_nft(
    beaver_id: UUID,
    db_session: Session = Depends(deps.get_db),
) -> ResponseBeaver:
    return crud.make_beaver_nft(db_session=db_session, beaver_id=beaver_id)
