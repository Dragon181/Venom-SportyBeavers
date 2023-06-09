from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app.core.database import engine
from app.core.models import model
from app.core.schemas.schema import Onboarding, OnboardingChange
from app.v1.routers import deps

model.Base.metadata.create_all(bind=engine)

router = APIRouter()


@router.post("/onboarding")
def create_onboarding(
    onboarding_body: Onboarding,
    db_session: Session = Depends(deps.get_db),
):
    for i, slide in enumerate(onboarding_body.slides):
        slide = model.OnboardingSlide(
            onboarding_id=onboarding_body.onboarding_id, slide_content=slide, sort=i
        )
        db_session.add(slide)
    db_session.commit()


@router.put("/onboarding/{slide_id}")
def update_slide(
    request_body: OnboardingChange,
    db_session: Session = Depends(deps.get_db),
):
    slide = (
        db_session.query(model.OnboardingSlide)
        .filter_by(slide_id=request_body.slide_id)
        .first()
    )
    slide.slide_content = request_body.slide_content
    slide.sort = request_body.sort
    db_session.commit()


@router.get("/onboarding/{onboarding_id}")
def get_onboarding(onboarding_id: str, db_session: Session = Depends(deps.get_db)):
    slides = (
        db_session.query(model.OnboardingSlide)
        .filter_by(onboarding_id=onboarding_id)
        .order_by(model.OnboardingSlide.sort)
        .all()
    )

    result = {
        "onboarding_id": onboarding_id,
        "slides": [
            {
                "slide_id": str(slide.slide_id),
                "slide_content": slide.slide_content,
                "sort": slide.sort,
            }
            for slide in slides
        ],
    }
    return result
