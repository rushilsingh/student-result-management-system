from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from pymongo.errors import DuplicateKeyError
from typing import List
from models import Student
from fastapi.encoders import jsonable_encoder


router = APIRouter()


@router.post(
    "/",
    response_description="Create a new student",
    status_code=status.HTTP_201_CREATED,
    response_model=Student,
)
def create_student(request: Request, student: Student = Body(...)):
    try:
        student = jsonable_encoder(student)
        new_student = request.app.database["students"].insert_one(student)
        created_student = request.app.database["students"].find_one(
            {"_id": new_student.inserted_id}
        )

        return created_student
    except DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="A student with the same first and last name already exists.",
        )


@router.get("/", response_description="List all students", response_model=List[Student])
def list_students(request: Request):
    students = list(request.app.database["students"].find(limit=100))
    return students


@router.get(
    "/{id}", response_description="Get a single student by id", response_model=Student
)
def find_student(id: str, request: Request):
    if (student := request.app.database["students"].find_one({"_id": id})) is not None:
        return student
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Student with ID {id} not found"
    )


@router.delete("/{id}", response_description="Delete a student")
def delete_student(id: str, request: Request, response: Response):
    delete_result = request.app.database["students"].delete_one({"_id": id})

    # Delete associated results
    request.app.database["results"].delete_many({"student_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Student with ID {id} not found"
    )
