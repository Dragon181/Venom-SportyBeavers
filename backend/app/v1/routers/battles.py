from random import choice, choices, randint
from uuid import UUID

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.core.database import engine
from app.core.models import model
from app.core.schemas.schema import (BattleResponse, Opponents, RunBeaver)
from app.v1 import crud
from app.v1.routers import deps

model.Base.metadata.create_all(bind=engine)
router = APIRouter()


@router.post(
    "/battle/{first_player_beaver_id}",
    response_model=BattleResponse,
)
def creates_battle_record(
    first_player_beaver_id: UUID,
    db_session: Session = Depends(deps.get_db),
):
    db_beaver = crud.read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=first_player_beaver_id
    )

    user_id = db_beaver.owner_user_id

    db_user = crud.read_particular_user_by_user_id(
        db_session=db_session, user_id=user_id
    )

    db_battle = crud.create_battle_record(
        db_session=db_session,
        first_player_id=user_id,
        first_player_beaver_id=first_player_beaver_id,
    )

    player_beaver = RunBeaver(
        owner_user_id=db_beaver.owner_user_id,
        strength=db_beaver.strength,
        endurance=db_beaver.endurance,
        agility=db_beaver.agility,
        picture_url=db_beaver.picture_url,
        moral=db_user.moral,
    )
    beaver_rarity = choices(population=[1, 2, 3, 4], k=1, weights=[80, 15, 4, 1])[0]
    beaver_level = db_beaver.level

    _min = 10 * (beaver_rarity - 1) + 1
    _max = 10 * beaver_rarity

    if beaver_rarity == getattr(crud.BeaverRarityEnum, db_beaver.rarity).value:
        _max = max([db_beaver.agility, db_beaver.strength, db_beaver.endurance])

    params = crud.random_parameters_amount(_min, _max, beaver_rarity)
    pve_beaver = RunBeaver(
        owner_user_id="run_bot",
        strength=params["strength"] + 3 * (beaver_level - 1),
        endurance=params["endurance"] + 3 * (beaver_level - 1),
        agility=params["agility"] + 3 * (beaver_level - 1),
        picture_url=choice(
            crud.paginative_read_beavers(db_session=db_session, limit=randint(1, 10))
        ).picture_url,
        moral=randint(5, 10),
    )

    return BattleResponse(
        battle_id=db_battle.battle_id,
        opponents=Opponents(first_beaver=player_beaver, second_beaver=pve_beaver),
    )


@router.put("/battle/{battle_id}/step/{step_value}", response_class=Response)
def make_turn_by_battle_id(
    battle_id: UUID,
    step_value: int,
    db_session: Session = Depends(deps.get_db),
):
    crud.make_step_for_first_player(
        db_session=db_session, battle_id=battle_id, step_value=step_value
    )
    return Response(content=str(randint(0, 2)), media_type="text/plain")


@router.put("/battle/{battle_id}/result/{result_value}", response_class=Response)
def set_result_for_particular_battle_by_battle_id(
    battle_id: UUID,
    result_value: int,
    db_session: Session = Depends(deps.get_db),
):
    crud.set_result_for_battle_by_battle_id(
        db_session=db_session, battle_id=battle_id, result_value=result_value
    )
    db_battle = crud.read_particular_battle_by_battle_id(
        db_session=db_session, battle_id=battle_id
    )
    if result_value != crud.GamesResultEnum.draw.value:
        crud.reduce_energy_of_particular_beaver_by_beaver_id(
            db_session=db_session, beaver_id=db_battle.first_player_beaver_id
        )
    if result_value == crud.GamesResultEnum.win.value:
        db_beaver = crud.read_particular_beaver_by_beaver_id(
            db_session=db_session, beaver_id=db_battle.first_player_beaver_id
        )
        crud.add_beaves_by_user_id(
            db_session=db_session,
            user_id=db_battle.first_player_id,
            league=db_beaver.level,
        )
        crud.increase_wins_counter_for_user_by_user_id(
            db_session=db_session, user_id=db_battle.first_player_id
        )
