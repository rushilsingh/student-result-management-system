from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Student

router = APIRouter()


@router.post(
    "/",
    response_description="Create a new student",
    status_code=status.HTTP_201_CREATED,
    response_model=Student,
)
def create_student(request: Request, student: Student = Body(...)):
    student = jsonable_encoder(student)
    new_student = request.app.database["students"].insert_one(student)
    created_student = request.app.database["students"].find_one({"_id": new_student.inserted_id})

    return created_student


@router.get("/", response_description="List all students", response_model=List[Student])
def list_students(request: Request):
    students = list(request.app.database["students"].find(limit=100))
    return students



@router.delete("/{id}", response_description="Delete a student")
def delete_student(id: str, request: Request, response: Response):
    delete_result = request.app.database["students"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Student with ID {id} not found"
    )
