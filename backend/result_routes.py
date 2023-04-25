from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from pymongo.errors import DuplicateKeyError
from models import Result

router = APIRouter()


@router.post(
    "/",
    response_description="Create a new result",
    status_code=status.HTTP_201_CREATED,
    response_model=Result,
)
def create_result(request: Request, result: Result = Body(...)):
    try:
        result = jsonable_encoder(result)
        new_result = request.app.database["results"].insert_one(result)
        created_result = request.app.database["results"].find_one(
            {"_id": new_result.inserted_id}
        )

        return created_result

    except DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="A result with the same student_id and course_id already exists.",
        )


@router.get("/", response_description="List all results", response_model=List[Result])
def list_results(request: Request):
    results = list(request.app.database["results"].find(limit=100))
    return results


@router.delete("/{id}", response_description="Delete a result")
def delete_result(id: str, request: Request, response: Response):
    delete_result = request.app.database["results"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Result with ID {id} not found"
    )
