from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import engine
from app.core.models import model
from app.core.schemas.schema import (ResponseUser)
from app.v1 import crud
from app.v1.routers import deps

model.Base.metadata.create_all(bind=engine)

router = APIRouter()


@router.get("/user/{wallet}")
def get_user_by_wallet(
    wallet: str,
    db_session: Session = Depends(deps.get_db),
) -> ResponseUser:
    db_user = crud.read_particular_user_by_wallet(db_session=db_session, wallet=wallet)
    if db_user is None:
        db_user = crud.create_user(db_session=db_session, wallet=wallet)
    db_user.last_time_log_in = datetime.now().timestamp()

    db_session.commit()
    db_session.refresh(db_user)

    return db_user
