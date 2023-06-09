from datetime import datetime
from typing import Any, List, Optional
from uuid import UUID

from pydantic import BaseModel


class Beaver(BaseModel):
    owner_user_id: UUID
    config: dict[str, Any]

    class Config:
        orm_mode = True


class ResponseBeaver(Beaver):
    beaver_id: UUID
    name: Optional[str]
    is_nft: bool
    level: int
    strength: int
    endurance: int
    agility: int
    picture_url: str
    rarity: str
    max_energy: int
    energy: Optional[int] = 3


class BaseUser(BaseModel):
    moral: Optional[int]
    last_time_log_in: Optional[int] = int(datetime.now().timestamp())
    beav: Optional[float] = 0

    class Config:
        orm_mode = True


class User(BaseUser):
    wallet: Optional[str] = 0


class ResponseUser(User):
    user_id: UUID
    beavers: List[ResponseBeaver]
    wins_count: int


class RunBeaver(BaseModel):
    owner_user_id: UUID | str
    strength: int
    endurance: int
    agility: int
    picture_url: str
    moral: int


class Opponents(BaseModel):
    first_beaver: RunBeaver
    second_beaver: RunBeaver


class BattleResponse(BaseModel):
    battle_id: UUID
    opponents: Opponents


class BeaverConfigurationInstance(BaseModel):
    body: str
    head: str
    eyes: str
    mouth: str
    upperPaws: str
    lowerPaws: str
    tail: str


class CreateBeaver(BaseModel):
    owner_user_id: UUID
    config: BeaverConfigurationInstance

    class Config:
        orm_mode = True


class Onboarding(BaseModel):
    onboarding_id: str
    slides: List[str]


class OnboardingChange(BaseModel):
    slide_id: UUID
    slide_content: str
    sort: int


class LootboxResponse(BaseModel):
    lootbox_id: UUID
    cost: float
    nft_chance: int
    beaver_image_src: str
    owner_user_id: Optional[UUID]
    is_open: bool
    is_nft: bool
    beav_count: float
    beaver_rarity: str

    class Config:
        orm_mode = True


class CreateLootbox(BaseModel):
    cost: float
    beaver_image_src: str
    beaver_rarity: str
    beav_count: float
    nft_chance: int
