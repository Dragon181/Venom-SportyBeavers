from uuid import uuid4

from sqlalchemy import (TIMESTAMP, Boolean, Column, Float,
                        ForeignKey, Integer, String)
from sqlalchemy.dialects.postgresql import JSON, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Battle(Base):
    __tablename__ = "battle"
    battle_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid4,
        unique=True,
    )
    first_player_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"))
    first_player_beaver_id = Column(UUID(as_uuid=True), ForeignKey("beavers.beaver_id"))
    # Накатить миграцией после ухода от PVE логики!
    # second_player_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"))
    status = Column(Boolean, nullable=False, default=True)
    result = Column(Integer, nullable=True)
    last_turn = Column(Integer, nullable=True)
    last_time = Column(
        TIMESTAMP, server_default=func.now(), onupdate=func.current_timestamp()
    )


class Beaver(Base):
    __tablename__ = "beavers"

    beaver_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        nullable=False,
        unique=True,
    )
    name = Column(String, nullable=True)
    is_nft = Column(Boolean, nullable=False, default=False)
    level = Column(Integer, nullable=False, default=1)
    strength = Column(Integer, nullable=False)
    endurance = Column(Integer, nullable=False)
    agility = Column(Integer, nullable=False)
    picture_url = Column(String, nullable=False)
    owner_user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"))
    rarity = Column(String, nullable=False)
    max_energy = Column(Integer, nullable=False)
    energy = Column(Integer, nullable=False)
    config = Column(JSON, nullable=False)
    owner = relationship("Users", back_populates="beavers")


class Users(Base):
    __tablename__ = "users"

    user_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid4,
        unique=True,
    )
    wallet = Column(String)
    moral = Column(Integer, nullable=False, default=5)
    last_time_log_in = Column(Integer, nullable=True)
    beav = Column(Float, nullable=False, default=0)
    wins_count = Column(Integer, nullable=False, default=0)
    beavers = relationship("Beaver", back_populates="owner")

    def __init__(self, wallet: str):
        self.wallet = wallet


class OnboardingSlide(Base):
    __tablename__ = "onboardings"
    slide_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid4,
        unique=True,
    )
    onboarding_id = Column(String, nullable=False)
    slide_content = Column(String, nullable=False)
    sort = Column(Integer)


class Whack(Base):
    __tablename__ = "whacks"
    whack_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid4,
        unique=True,
    )
    beaver_id = Column(UUID(as_uuid=True), ForeignKey("beavers.beaver_id"))
    successful_touches = Column(Integer, nullable=False)
    all_touches = Column(Integer, nullable=False)


class Lootbox(Base):
    __tablename__ = "lootboxes"
    lootbox_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid4,
        unique=True,
    )
    cost = Column(Float, nullable=False, default=0)
    nft_chance = Column(Integer, nullable=False)
    beaver_image_src = Column(String, nullable=False)
    owner_user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=True)
    is_open = Column(Boolean, nullable=False, default=False)
    is_nft = Column(Boolean, nullable=False, default=False)
    beav_count = Column(Float, nullable=False, default=0)
    beaver_rarity = Column(String, nullable=False)

