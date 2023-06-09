from enum import Enum
from random import choices, gauss
from uuid import UUID, uuid4

from sqlalchemy import true
from sqlalchemy.orm import Session

from app.core.models import model
from app.core.schemas import schema
from app.core.schemas.schema import BeaverConfigurationInstance
from app.utils.main_utils import get_file_url_from_public_bucket


# Beaver region +

class BeaverRarityEnum(Enum):
    common = 1
    uncommon = 2
    rare = 3
    legendary = 4


class GamesResultEnum(Enum):
    win = 0
    lose = 1
    draw = 2


def random_parameters_amount(_min: int, _max: int, rarity: int) -> dict:
    params = {
        "strength": 0,
        "endurance": 0,
        "agility": 0,
    }
    mean = (_min + _max) / 2
    std_dev = (_min + _max) / 6

    for param in params:
        num = int(gauss(mean, std_dev))
        params[param] = min(max(_min, num), _max)

    beaver_energy = rarity + 2
    params["max_energy"] = beaver_energy
    params["energy"] = beaver_energy
    return params


def create_beaver(db_session: Session, request_beaver: dict):
    beaver = model.Beaver(**request_beaver)
    beaver.beaver_id = uuid4()
    beaver_rarity = choices(population=[1, 2, 3, 4], k=1, weights=[80, 15, 4, 1])[0]
    beaver.rarity = BeaverRarityEnum(beaver_rarity).name

    _min = 10 * (beaver_rarity - 1) + 1
    _max = 10 * beaver_rarity

    params = random_parameters_amount(_min, _max, beaver_rarity)

    beaver.strength = params["strength"]
    beaver.endurance = params["endurance"]
    beaver.agility = params["agility"]
    beaver.max_energy = params["max_energy"]
    beaver.energy = params["energy"]
    beaver_sn = db_session.query(model.Beaver).count() + 1
    beaver.name = f"Beaver #{beaver_sn}"

    object_name = f"user_beavers/beaver_{beaver.beaver_id}.png"
    beaver.picture_url = get_file_url_from_public_bucket(
        bucket="sportybeavers-venom", object_name=object_name
    )

    db_session.add(beaver)
    db_session.commit()
    db_session.refresh(beaver)

    return beaver


def create_rare_beaver(
        db_session: Session, user_id: UUID,
        config: dict, picture_url, rarity: str
):
    beaver = model.Beaver()
    beaver.config = config
    beaver.beaver_id = uuid4()
    beaver.rarity = BeaverRarityEnum[rarity].name
    beaver.strength = 30
    beaver.endurance = 30
    beaver.agility = 30
    beaver.max_energy = 5
    beaver.energy = 5
    beaver.name = "Rare Beav"
    beaver.picture_url = picture_url
    beaver.owner_user_id = user_id

    db_session.add(beaver)
    db_session.commit()
    db_session.refresh(beaver)

    return beaver


def read_particular_beaver_by_beaver_id(db_session: Session, beaver_id: UUID):
    beaver = (
        db_session.query(model.Beaver)
        .filter(model.Beaver.beaver_id == beaver_id)
        .first()
    )
    return beaver


def up_level_of_particular_beaver_by_beaver_id(db_session: Session, beaver_id: UUID):
    beaver = read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    beaver.level += 1
    beaver.strength += 3
    beaver.endurance += 3
    beaver.agility += 3

    db_session.commit()
    db_session.refresh(beaver)
    return beaver


def update_particular_beaver_by_baever_id():
    pass


def delete_particular_beaver_by_beaver_id():
    pass


# User region +

def create_user(db_session: Session, wallet: str):
    user = model.Users(wallet)

    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    return user


def read_particular_user_by_wallet(db_session: Session, wallet: str):
    return db_session.query(model.Users).filter(model.Users.wallet == wallet).first()


def read_particular_user_by_user_id(db_session: Session, user_id: UUID):
    return db_session.query(model.Users).filter(model.Users.user_id == user_id).first()


def get_top_10_users_by_wins_amount(db_session: Session):
    return list(
        db_session.query(model.Users).order_by(model.Users.wins_count.desc()).limit(10)
    )


def create_battle_record(
        db_session: Session, first_player_id: UUID, first_player_beaver_id: UUID
):
    db_battle = model.Battle(
        first_player_id=first_player_id, first_player_beaver_id=first_player_beaver_id
    )
    db_session.add(db_battle)
    db_session.commit()
    db_session.refresh(db_battle)
    return db_battle


def read_particular_battle_by_battle_id(db_session: Session, battle_id: UUID):
    return (
        db_session.query(model.Battle)
        .filter(model.Battle.battle_id == battle_id)
        .first()
    )


def make_step_for_first_player(db_session: Session, battle_id: UUID, step_value: int):
    db_battle = read_particular_battle_by_battle_id(
        db_session=db_session, battle_id=battle_id
    )
    db_battle.last_turn = step_value
    db_session.commit()
    db_session.refresh(db_battle)
    return db_battle


def set_result_for_battle_by_battle_id(
        db_session: Session, battle_id: UUID, result_value: int
):
    db_battle = read_particular_battle_by_battle_id(
        db_session=db_session, battle_id=battle_id
    )
    db_battle.result = result_value
    db_session.commit()
    db_session.refresh(db_battle)
    return db_battle


def reduce_energy_of_particular_beaver_by_beaver_id(
        db_session: Session, beaver_id: UUID
):
    beaver = read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    beaver.energy -= 1
    db_session.commit()
    db_session.refresh(beaver)
    return beaver


def increase_energy_of_particular_beaver_by_beaver_id(
        db_session: Session, beaver_id: UUID
):
    beaver = read_particular_beaver_by_beaver_id(
        db_session=db_session, beaver_id=beaver_id
    )
    energy = beaver.energy + 1
    if energy >= beaver.max_energy:
        energy = beaver.max_energy

    beaver.energy = energy
    db_session.commit()
    db_session.refresh(beaver)
    return beaver


def paginative_read_beavers(
        db_session: Session, offset: None | int = None, limit: None | int = None
):
    return list(db_session.query(model.Beaver).offset(offset).limit(limit))


def add_beaves_by_user_id(db_session: Session, user_id: UUID, league: int):
    beavs = {1: 1, 2: 2, 3: 4, 4: 10}

    user = read_particular_user_by_user_id(db_session=db_session, user_id=user_id)
    user.beav += beavs[league]
    db_session.commit()
    db_session.refresh(user)
    return user


def increase_wins_counter_for_user_by_user_id(db_session: Session, user_id: UUID):
    db_user = read_particular_user_by_user_id(db_session=db_session, user_id=user_id)
    db_user.wins_count += 1
    db_session.commit()
    db_session.refresh(db_user)
    return db_user


def create_lootbox(db_session: Session, request_lootbox: dict):
    lootbox = model.Lootbox(**request_lootbox)

    db_session.add(lootbox)
    db_session.commit()
    db_session.refresh(lootbox)

    return lootbox


def read_lootbox_by_id(db_session: Session, lootbox_id: UUID):
    return db_session.query(model.Lootbox).filter(model.Lootbox.lootbox_id == lootbox_id).first()


def get_closed_lootboxes(db_session: Session):
    return list(db_session.query(model.Lootbox).filter(model.Lootbox.is_open == False))


def open_lootbox(lootbox_id: UUID, user_id: UUID, db_session: Session):
    lootbox = read_lootbox_by_id(
        lootbox_id=lootbox_id, db_session=db_session
    )

    lootbox.opening_result_is_nft = choices(
        population=[True, False], weights=[lootbox.nft_chance, 100 - lootbox.nft_chance]
    )
    lootbox.is_open = True
    db_session.commit()
    db_session.refresh(lootbox)

    if lootbox.opening_result_is_nft:
        config = dict(
            body="", head="", eyes="", mouth="", upperPaws="", lowerPaws="", tail=""
        )
        create_rare_beaver(
            db_session=db_session, user_id=user_id, config=config,
            picture_url=lootbox.beaver_image_src, rarity=lootbox.beaver_rarity
        )
    else:
        add_amount_beaves_by_user_id(db_session=db_session, user_id=user_id, beav_count=lootbox.beav_count)

    return lootbox


def make_beaver_nft(beaver_id: UUID, db_session: Session):
    beaver = read_particular_beaver_by_beaver_id(beaver_id=beaver_id, db_session=db_session)
    beaver.is_nft = True

    db_session.commit()
    db_session.refresh(beaver)

    return beaver


def add_amount_beaves_by_user_id(db_session: Session, user_id: UUID, beav_count: int):
    user = read_particular_user_by_user_id(db_session=db_session, user_id=user_id)
    user.beav += beav_count
    db_session.commit()
    db_session.refresh(user)
    return user
