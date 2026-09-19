from fastapi import APIRouter


router = APIRouter()


@router.post("/")
def verify_citizen():

    return {
        "status": "PENDING",
        "message": "Verification submitted",
    }