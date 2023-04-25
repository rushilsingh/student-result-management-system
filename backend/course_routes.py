from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from pymongo.errors import DuplicateKeyError
from models import Course

router = APIRouter()


@router.post(
    "/",
    response_description="Create a new course",
    status_code=status.HTTP_201_CREATED,
    response_model=Course,
)
def create_course(request: Request, course: Course = Body(...)):
    try:
        course = jsonable_encoder(course)
        new_course = request.app.database["courses"].insert_one(course)
        created_course = request.app.database["courses"].find_one(
            {"_id": new_course.inserted_id}
        )

        return created_course

    except DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="A course with the same name already exists."
        )


@router.get("/", response_description="List all courses", response_model=List[Course])
def list_courses(request: Request):
    courses = list(request.app.database["courses"].find(limit=100))
    return courses


@router.get(
    "/{id}", response_description="Get a single course by id", response_model=Course
)
def find_course(id: str, request: Request):
    if (course := request.app.database["courses"].find_one({"_id": id})) is not None:
        return course
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with ID {id} not found"
    )


@router.delete("/{id}", response_description="Delete a course")
def delete_course(id: str, request: Request, response: Response):

    delete_course = request.app.database["courses"].delete_one({"_id": id})

    # Delete associated results
    request.app.database["results"].delete_many({"course_id": id})

    if delete_course.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with ID {id} not found"
    )
