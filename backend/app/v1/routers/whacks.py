from uuid import UUID

from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.orm import Session

from app.core.database import engine
from app.core.models import model
from app.v1 import crud
from app.v1.routers import deps

model.Base.metadata.create_all(bind=engine)
router = APIRouter()


@router.post(
    "/whack",
    response_class=Response,
)
def set_whack_result(
    beaver_id: UUID,
    successful_touches: int,
    all_touches: int,
    db_session: Session = Depends(deps.get_db)
):
    beaver = crud.read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    if beaver is None:
        raise HTTPException(status_code=404, detail="Beaver not found")
    crud.increase_energy_of_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
